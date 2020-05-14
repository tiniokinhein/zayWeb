import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import shortId from 'shortid'
import { withRouter } from 'react-router-dom'
import { ORDERURL } from '../api'
import { db } from '../firebase'
import { loadCart , removeProduct , changeProductQuantity } from '../store/cart/actions'
import { updateTotalCart } from '../store/total/actions'
import OrderItems from '../components/OrderItems'
import { currency } from '../utils'
import { nanoid } from 'nanoid'
import COD_IMG from '../assets/images/cod.png'
import MYKYAT_IMG from '../assets/images/myKyat.png'
import MYKYAT_LOG from '../assets/images/myKyat_log.png'
import 
    MYKYAT_API,
    {
        PROVIDER_ID,
        SECRET_KEY,
        MERCHANT_ID,
        PRE_AUTH,
        PURCHASE_NEXT
} from '../myKyat'
import Modal from 'react-modal'
import { MdArrowBack } from 'react-icons/md'
import axios from 'axios'
import { FiPlus } from 'react-icons/fi'
import { GoTrashcan } from 'react-icons/go'
import { AiFillEdit } from 'react-icons/ai'
import { Translation } from 'react-i18next'
import Layout from '../components/layout/Layout'
import { RiCloseCircleLine } from 'react-icons/ri'
import { FiCheck } from 'react-icons/fi'
import { ToastContainer , toast , Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


Modal.setAppElement('#root')

const generateDate = () => {

    const now = new Date()

    const options = {
        day: "numeric",
        month: "long",
        year: "numeric"

    }

    const year = now.getFullYear()

    let month = now.getMonth() + 1
    if(month < 10) {
        month = `0${month}`
    }

    let day = now.getDate()
    if(day < 10) {
        day = `0${day}`
    }

    const hour = now.getHours()

    const minute = now.getMinutes()

    return {
        formatted: `${year}-${month}-${day}-${hour}-${minute}`,
        pretty: now.toLocaleDateString("en-US" , options)
    }
}

class Checkout extends Component 
{
    static propTypes = {
        loadCart: PropTypes.func.isRequired,
        removeProduct: PropTypes.func,
        changeProductQuantity: PropTypes.func,
        updateTotalCart: PropTypes.func.isRequired,
        cartProducts: PropTypes.array.isRequired,
        newProduct: PropTypes.object,
        productToRemove: PropTypes.object,
        productToChange: PropTypes.object
    }

    state = {
        name: '',
        email: '',
        phone: '',
        address: '',
        delivery: 'ပုံမှန်ကြာချိန် (၂)ရက်',
        delivery_fee: 0,
        payment: 'ပစ္စည်းရောက် ငွေရှင်းစနစ်',
        mailSent: false,
        error: {},
        mykyat_login: '',
        mykyat_password: '',
        show: false,
        show1: false,
        show2: false,
        show3: false,
        showContact: false,
        encrypt_auth: '',
        decrypt_auth: '',
        encrypt_purchase: '',
        decrypt_purchase: '',
        isOpened: false
    }

    componentDidMount() {
        window.scrollTo(0,0)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.productToRemove !== this.props.productToRemove) {
            this.removeProduct(nextProps.productToRemove)
        }
        if(nextProps.productToChange !== this.props.productToChange) {
            this.changeProductQuantity(nextProps.productToChange)
        }
    }

    removeProduct = product => {
        const { cartProducts , updateTotalCart } = this.props
        const index = cartProducts.findIndex(p => p.id === product.id)
        if(index >= 0) {
            cartProducts.splice(index,1)
            updateTotalCart(cartProducts)
        }
    }

    changeProductQuantity = changedProduct => {
        const { cartProducts , updateTotalCart } = this.props
        const product = cartProducts.find(p => p.id === changedProduct.id)
        product.quantity = changedProduct.quantity
        if(product.quantity <= 0) {
            this.removeProduct(product)
        }
        updateTotalCart(cartProducts)
    }

    resetForm = () => {
        this.setState({
            name: '',
            email: '',
            phone: '',
            address: '',
        })
    }

    resetField = () => {
        this.setState({
            delivery: 'ပုံမှန်ကြာချိန် (၂)ရက်',
            delivery_fee: 0,
            payment: 'ပစ္စည်းရောက် ငွေရှင်းစနစ်',
            mailSent: false,
            error: {},
            mykyat_login: '',
            mykyat_password: '',
            show: false,
            show1: false,
            show2: false,
            show3: false,
            showContact: false,
            encrypt_auth: '',
            decrypt_auth: '',
            encrypt_purchase: '',
            decrypt_purchase: '',
            isOpened: false
        })
    }

    encryptAuthLogin = e => {
        e.preventDefault()

        const merchantId = MERCHANT_ID
        const currencyId = 'MMK'
        const amount = this.allTotalPrice()
        const purchaseMessage = `${this.state.mykyat_login} purchased`
        const mk_login = this.state.mykyat_login
        const mk_password = this.state.mykyat_password
        const ENC = `${merchantId}~${currencyId}~${amount}~${purchaseMessage}~${mk_login}~${mk_password}`

        let aes = new MYKYAT_API()
        let encrypted_auth = aes.encrypt(SECRET_KEY, ENC)

        axios
        .post(
            PRE_AUTH, 
            { 
                data: encrypted_auth, 
                providerId: PROVIDER_ID 
            },
            { 
                headers: { 
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
        )
        .then(res => {
            const data = res.data.data

            let aes = new MYKYAT_API()
            let decrypted = aes.decrypt(SECRET_KEY, data)

            var arr = decrypted.split("~")

            this.setState({
                encrypt_auth: data,
                decrypt_auth: arr
            })

            if(this.state.decrypt_auth[0] === '0') {
                this.showModal2()
            }

            if(this.state.decrypt_auth[1] === 'Cash is not enough!') {
                this.showModal1()
            }

        })
        .catch(err => console.log(err))

    }

    encryptPurchaseContinue = e => {
        e.preventDefault()

        const { encrypt_auth } = this.state
        let aes = new MYKYAT_API()
        let decrypted = aes.decrypt(SECRET_KEY, encrypt_auth)

        const merchantId = MERCHANT_ID
        const amount = this.allTotalPrice()
        const purchaseMessage = `${this.state.mykyat_login} purchased`

        var arr = decrypted.split("~")
        var decryptedCode = arr[1]+"~"+merchantId+"~"+arr[3]+"~"+amount+"~"+purchaseMessage+"~"+arr[5]+"~"+arr[6]
        
        let encrypted = aes.encrypt(SECRET_KEY, decryptedCode)

        axios
        .post(
            PURCHASE_NEXT, 
            { 
                data: encrypted, 
                providerId: PROVIDER_ID 
            },
            { 
                headers: { 
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
        )
        .then(res => {
            const data = res.data.data

            let aes = new MYKYAT_API()
            let decrypted = aes.decrypt(SECRET_KEY, data)

            var arr = decrypted.split("~")

            this.setState({
                encrypt_purchase: data,
                decrypt_purchase: arr
            })

            if(this.state.decrypt_purchase[0] === '0') {
                this.resetField()
                this.showModal3()
            }

            if(this.state.decrypt_purchase[0] === '1') {
                this.showModal3()
            }
        })
        .catch(err => console.log(err))

    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    showAlert = (type, message) => {
        this.setState({
            mailSent: true,
            error: {type,message}
        })
    }

    showModal = () => {
        this.setState({
            show: true
        })
    }

    closeModal = () => {
        this.setState({
            show: false
        })
    }

    showModal1 = () => {
        this.setState({
            show1: true
        })
    }

    closeModal1 = () => {
        this.setState({
            show1: false
        })
    }

    showModal2 = () => {
        this.setState({
            show2: true
        })
    }

    closeModal2 = () => {
        this.setState({
            show2: false
        })
    }

    showModal3 = () => {
        this.setState({
            show3: true
        })
    }

    closeModal3 = () => {
        this.setState({
            show3: false
        })
    }

    showContactModal = () => {
        this.setState({
            showContact: true
        })
    }

    closeContactModal = () => {
        this.setState({
            showContact: false
        })
    }

    handleCODSubmit = e => {
        e.preventDefault()

        const date = generateDate()

        const sID = shortId.generate()

        const invocieID = nanoid(6)

        const discount_price = this.props.cartTotal.totalPrice / 100 * 3

        const delivery_fee = this.state.delivery_fee

        const subtotal = this.props.cartTotal.totalPrice

        const total = subtotal - discount_price + delivery_fee

        const orderItems = {
            checkout: {
                contact: {
                    name: this.state.name,
                    email: this.state.email,
                    phone: this.state.phone,
                    address: this.state.address,
                    dateFormatted: date.formatted,
                    datePretty: date.pretty,
                    dateRaw: Date(Date.now()).toString()
                },
                payment: this.state.payment
            },
            id: 'order-' + sID,
            invoice_number: 'bgzay-' + invocieID,
            slug: this.state.name.toLowerCase().replace(/\s+/g,'-'),
            status: 'Pending',
            status_mm: 'ဆိုင်းငံ့',
            products: {
                orderItems: this.props.cartProducts.map(p => { 
                    const item_total = p.price * p.quantity
                    return { 
                        id: p.id,
                        title: p.title, 
                        title_mm: p.title_mm,
                        image: p.image,
                        price: p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                        weight: p.weight,
                        unit: p.unit,
                        quantity: p.quantity,
                        item_total: item_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    } 
                }),
                delivery: this.state.delivery,
                delivery_fee: this.state.delivery_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                discount_price: discount_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                discount: '3%',
                subtotal: subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                total: total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
        }

        if(orderItems.checkout.contact.phone) {
            db
            .ref(ORDERURL+`/${orderItems.id}`)
            .set(orderItems , () => {

                this.showAlert('success' , 'ဝယ်ယူထားသော ပစ္စည်းများကို အော်ဒါတင် ပြီးပါပြီ')
                this.props.history.push(`/completed/${orderItems.id}`)
                this.removeAllProducts()
                this.resetField()

            })
            .catch(() => {
                this.showAlert('danger' , 'စာကို လက်ရှိ ပို့လို့မရသေးပါ')
            })
        } else {                    
            this.resetField()
            this.showAlert(
                'warning', 
                'ပစ္စည်းပို့ရမည့်လိပ်စာကို ပြန်ကြည့်ပါ နောက်ထပ်တစ်ကြိမ် ထပ်ဖြည့်ပါ'
            )
            this.setState({
                isOpened: true
            })
        }       

    }

    handlePaymentApiSubmit = e => {
        e.preventDefault()

        const orderItems = {
            checkout: {
                contact: {
                    name: this.state.name,
                    email: this.state.email,
                    phone: this.state.phone,
                    address: this.state.address
                }
            }
        }

        if(orderItems.checkout.contact.phone) {

            this.showModal()

        } else {
            this.showAlert(
                'warning', 
                'ပစ္စည်းပို့ရမည့်လိပ်စာကို ပြန်ကြည့်ပါ နောက်ထပ်တစ်ကြိမ် ထပ်ဖြည့်ပါ'
            )
            this.setState({
                isOpened: true
            })
        }
    }

    handleMyKyatSubmit = e => {
        e.preventDefault()

        const date = generateDate()

        const sID = shortId.generate()

        const invocieID = nanoid(6)

        const discount_price = this.props.cartTotal.totalPrice / 100 * 3

        const delivery_fee = this.state.delivery_fee

        const subtotal = this.props.cartTotal.totalPrice

        const total = subtotal - discount_price + delivery_fee

        const orderItems = {
            checkout: {
                contact: {
                    name: this.state.name,
                    email: this.state.email,
                    phone: this.state.phone,
                    address: this.state.address,
                    dateFormatted: date.formatted,
                    datePretty: date.pretty,
                    dateRaw: Date(Date.now()).toString()
                },
                payment: 'MyKyat payment'
            },
            id: 'order-' + sID,
            invoice_number: 'bgzay-' + invocieID,
            slug: this.state.name.toLowerCase().replace(/\s+/g,'-'),
            status: 'Pending',
            status_mm: 'ဆိုင်းငံ့',
            products: {
                orderItems: this.props.cartProducts.map(p => { 
                    const item_total = p.price * p.quantity
                    return { 
                        id: p.id,
                        title: p.title, 
                        title_mm: p.title_mm,
                        image: p.image,
                        price: p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                        weight: p.weight,
                        unit: p.unit,
                        quantity: p.quantity,
                        item_total: item_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    } 
                }),
                delivery: this.state.delivery,
                delivery_fee: this.state.delivery_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                discount_price: discount_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                discount: '3%',
                subtotal: subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                total: total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
        }

        if(orderItems.checkout.contact.phone) {

            db
            .ref(ORDERURL+`/${orderItems.id}`)
            .set(orderItems , () => {

                this.showAlert('success' , 'ဝယ်ယူထားသော ပစ္စည်းများကို အော်ဒါတင် ပြီးပါပြီ')
                this.props.history.push(`/completed/${orderItems.id}`)
                this.removeAllProducts()
                this.resetField()

            }) 
            .catch(() => {
                this.showAlert('danger' , 'စာကို လက်ရှိ ပို့လို့မရသေးပါ')
            })

        } else {
            this.resetField()
            this.showAlert(
                'warning', 
                'ပစ္စည်းပို့ရမည့်လိပ်စာကို ပြန်ကြည့်ပါ နောက်ထပ်တစ်ကြိမ် ထပ်ဖြည့်ပါ'
            )
            this.setState({
                isOpened: true
            })
        }
    }

    removeAllProducts = product => {
        const { cartProducts , updateTotalCart } = this.props
        const index = cartProducts.filter(p => p === product)
        if(index >= 0) {
            cartProducts.splice(index)
            updateTotalCart(cartProducts)
        }
    }

    discountPrice = () => {
        const { cartTotal } = this.props
        return cartTotal.totalPrice / 100 * 3
    }


    onChangeDeliveryNormal = e => {
        this.setState({
            delivery: e.target.value,
            delivery_fee: 0
        }) 
    }

    onChangeDeliveryDay1 = e => {
        this.setState({
            delivery: e.target.value,
            delivery_fee: 1000
        }) 
    }

    onChangeDeliveryAtOnce = e => {
        this.setState({
            delivery: e.target.value,
            delivery_fee: 2000
        }) 
    }

    allTotalPrice = () => {
        const { cartTotal } = this.props
        const { delivery_fee } = this.state

        const TOTALPRICE = cartTotal.totalPrice - this.discountPrice() + delivery_fee
        return TOTALPRICE
    }

    onChangePayment = e => {
        this.setState({
            payment: e.target.value
        })
    }

    render() {

        const { cartProducts , cartTotal , changeProductQuantity } = this.props
        const { 
            delivery_fee , 
            delivery , 
            payment , 
            show , 
            show1 ,
            show2 ,
            show3 ,
            showContact,
            mykyat_login , 
            mykyat_password ,
            decrypt_auth,
            decrypt_purchase
        } = this.state

        const products = cartProducts.map(p => {
            return (
                <OrderItems key={p.id} product={p} changeProductQuantity={changeProductQuantity} />
            )
        })   

        const loginStyle = {
            content : {
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                background: '#1b1a20',
                border: '0',
                padding: '0',
                borderRadius: '0',
                position: 'fixed',
                zIndex: '9999999999'
            }
        }

        const contactStyle = {
            content : {
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                background: '#f8f9fa',
                border: '0',
                padding: '0',
                borderRadius: '0',
                position: 'fixed',
                zIndex: '9999999999'
            }
        }

        const deliveryTime = 
            <div className="field-group mb-5">
                <h4 
                    className="font-weight-bold mb-2"
                    style={{
                        lineHeight: '2',
                        fontSize: '1.1rem'
                    }}
                >
                    <Translation>
                        {(t) => <>{t('main.deliveryTime')}</>}
                    </Translation>
                </h4>
                <div 
                    className="p-4 bg-white shadow-none rounded-0"
                    // style={{
                    //     borderLeft: '5px solid #6fbd0c'
                    // }}
                >
                    <div className="position-relative">
                        <input 
                            type="radio" 
                            className="hopping-input" 
                            id="delivery_normal"
                            name="delivery"
                            value='ပုံမှန်ကြာချိန် (၂)ရက်'
                            onChange={this.onChangeDeliveryNormal.bind(this)}
                            checked={this.state.delivery === 'ပုံမှန်ကြာချိန် (၂)ရက်'}
                        />
                        <label 
                            className="hopping-label" 
                            style={{
                                fontSize: '14px',
                                letterSpacing: '0.5px'
                            }}
                            htmlFor="delivery_normal"
                        >
                            <span></span><Translation>{(t) => <>{t('main.deliveryNormal')}</>}</Translation>
                        </label>
                        
                        <input 
                            type="radio" 
                            className="hopping-input" 
                            id="delivery_day1"
                            name="delivery"
                            value='ကြာချိန် (၁)ရက်'
                            onChange={this.onChangeDeliveryDay1.bind(this)}
                            checked={this.state.delivery === 'ကြာချိန် (၁)ရက်'}
                        />
                        <label 
                            className="hopping-label" 
                            style={{
                                fontSize: '14px',
                                letterSpacing: '0.5px'
                            }}
                            htmlFor="delivery_day1"
                        >  
                            <span></span><Translation>{(t) => <>{t('main.deliveryDay1')}</>}</Translation>
                        </label>
                        
                        
                        <input 
                            type="radio" 
                            className="hopping-input" 
                            id="delivery_at_once"
                            name="delivery"
                            value='ချက်ချင်း (၂)နာရီအတွင်း'
                            onChange={this.onChangeDeliveryAtOnce.bind(this)}
                            checked={this.state.delivery === 'ချက်ချင်း (၂)နာရီအတွင်း'}
                        />  
                        <label 
                            className="hopping-label mb-0" 
                            style={{
                                fontSize: '14px',
                                letterSpacing: '0.5px'
                            }}
                            htmlFor="delivery_at_once"
                        > 
                            <span></span><Translation>{(t) => <>{t('main.deliveryUrgent')}</>}</Translation>
                        </label>

                        <div className="worm">
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                            <div className="worm__segment"></div>
                        </div>
                    </div> 
                </div>
            </div>

        const paymentMethod =
            <div className="field-group mb-0">
                <h4 
                    className="font-weight-bold mb-2"
                    style={{
                        lineHeight: '2',
                        fontSize: '1.1rem'
                    }}
                >
                    <Translation>
                        {(t) => <>{t('main.payment')}</>}
                    </Translation>
                </h4>
                
                <div
                    className="py-4 px-4 bg-white shadow-none rounded-0 d-flex payment-wrapper"
                    // style={{
                    //     borderLeft: '5px solid #6fbd0c'
                    // }}
                >
                    
                    <div 
                        className="mr-3"
                        style={{
                            width: '110px',
                            height: '110px'
                        }}
                    >
                        <input 
                            className="checkbox-payment" 
                            type="radio" 
                            name="payment" 
                            id="cash_on_delivery" 
                            value="ပစ္စည်းရောက် ငွေရှင်းစနစ်"
                            onChange={this.onChangePayment.bind(this)}
                            checked={payment === 'ပစ္စည်းရောက် ငွေရှင်းစနစ်' }
                        />
                        <label 
                            className="for-checkbox-payment cod-payment position-relative mb-0" 
                            htmlFor="cash_on_delivery"
                        >
                            <img
                                src={COD_IMG}
                                alt="Cash On Delivery"
                                style={{
                                    width: '100px'
                                }}
                            />
                            <span
                                style={{
                                    lineHeight: '2',
                                    fontSize: '10px',
                                    background: '-webkit-linear-gradient(45deg, #333, #007bff 80%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    display: 'inline-block',
                                    position: 'absolute',
                                    left: '0',
                                    right: '0',
                                    bottom: '20px',
                                    textAlign: 'center',
                                    padding: '0 5px'
                                }}
                            >
                                <Translation>
                                    {(t) => <>{t('main.cod')}</>}
                                </Translation>
                            </span>
                        </label>
                    </div>
                    <div 
                        className="mr-3"
                        style={{
                            width: '110px',
                            height: '110px'
                        }}
                    >
                        <input 
                            className="checkbox-payment" 
                            type="radio" 
                            name="payment" 
                            id="my_kyat"
                            value="MyKyat payment"
                            onChange={this.onChangePayment.bind(this)}
                            checked={payment === 'MyKyat payment'}
                        />
                        <label 
                            className="for-checkbox-payment mk-payment position-relative mb-0" 
                            htmlFor="my_kyat"
                        >
                            <img
                                src={MYKYAT_IMG}
                                alt="MyKyat"
                                style={{
                                    width: '100px'
                                }}
                            />
                            <span
                                style={{
                                    lineHeight: '2',
                                    fontSize: '10px',
                                    display: 'inline-block',
                                    position: 'absolute',
                                    left: '0',
                                    right: '0',
                                    bottom: '20px',
                                    textAlign: 'center',
                                    color: '#fff',
                                    padding: '0 5px'
                                }}
                            >
                            လုံခြုံ မြန်ဆန် ဒို့ပိုက်ဆံ
                            </span>
                        </label>
                    </div>    

                </div>

            </div>

        const placeOrder = 
            <div 
                className="field-group"
            >
                {
                    payment === 'ပစ္စည်းရောက် ငွေရှင်းစနစ်' &&
                        <button
                            className="btn py-3 rounded-0 border-0 shadow-none text-white btn-cart-hover"
                            type="submit"
                            onClick={this.handleCODSubmit.bind(this)}
                            style={{
                                background: '#6fbd0c',
                                width: '300px',
                                maxWidth: '100%'
                            }}
                        >
                            <Translation>
                                    {(t) => <>{t('main.placeOrder')}</>}
                            </Translation> 
                        </button>
                }

                {
                    payment === 'MyKyat payment' &&
                        <button
                            className="btn py-3 rounded-0 border-0 shadow-none text-white btn-cart-hover"
                            type="submit"
                            onClick={this.handlePaymentApiSubmit.bind(this)}
                            style={{
                                background: '#6fbd0c',
                                width: '300px',
                                maxWidth: '100%'
                            }}
                        >
                            <Translation>
                                {(t) => <>{t('main.placeOrder')}</>}
                            </Translation> 
                        </button>
                }
            </div>

        const smallPlaceOrder = 
            <div 
                className="border-top d-flex d-md-none py-3 px-3 shadow-sm position-fixed justify-content-between bg-white"
                style={{
                    left: '0',
                    right: '0',
                    bottom: '0',
                    zIndex: '999'
                }}
            >
                <p
                    className="font-weight-light mb-0"
                    style={{
                        fontSize: '13px',
                        lineHeight: '1.5',
                        letterSpacing: '0.5px'
                    }}
                >
                    <Translation>
                        {(t) => <>{t('main.total')}</>}
                    </Translation><br />
                    <strong style={{fontSize:'15px'}} className="font-weight-bold">{this.allTotalPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}</strong>
                </p>
                
                {
                    payment === 'ပစ္စည်းရောက် ငွေရှင်းစနစ်' &&
                        <button
                            className="btn-cart-hover btn shadow-none py-0 text-white rounded-0 flex-grow-1 ml-5"
                            type="submit"
                            onClick={this.handleCODSubmit.bind(this)}
                            style={{
                                background: '#6fbe0b',
                                lineHeight: '2'
                            }}
                        >
                            <Translation>
                                    {(t) => <>{t('main.placeOrder')}</>}
                            </Translation> 
                        </button>
                }

                {
                    payment === 'MyKyat payment' &&
                        <button
                            className="btn-cart-hover btn shadow-none py-0 text-white rounded-0 flex-grow-1 ml-5"
                            type="submit"
                            onClick={this.handlePaymentApiSubmit.bind(this)}
                            style={{
                                background: '#6fbe0b',
                                lineHeight: '2'
                            }}
                        >
                            <Translation>
                                {(t) => <>{t('main.placeOrder')}</>}
                            </Translation> 
                        </button>
                }
            </div>

        const orderItemLists = 
            <div className="field-group">
                <h4
                    className="font-weight-bold mb-2"
                    style={{
                        lineHeight: '2',
                        fontSize: '1.1rem'
                    }}
                >
                    <Translation>
                        {(t) => <>{t('main.purchaseOrders')}</>}
                    </Translation>
                </h4>

                <div className="bg-white px-4 pt-4 pb-2 mb-3">
                    <small className="mb-3 d-inline-block">
                        <strong>
                            ( {cartTotal.productQuantity}&nbsp;
                                <Translation>
                                    {(t) => <>{t('main.items')}</>}
                                </Translation> )
                        </strong>
                    </small>
                    {products}
                </div>

                <div 
                    className="d-flex bg-white px-4 py-4 shadow-none rounded-0"
                    style={{
                        // borderLeft: '5px solid #6fbd0c',
                        lineHeight: '2'
                    }}
                >
                    <div>
                        <p
                            className="font-weight-light mb-0"
                            style={{
                                fontSize: '14px',
                                lineHeight: '2'
                            }}
                        >
                            <Translation>
                                {(t) => <>{t('main.subtotal')}</>}
                            </Translation>
                        </p>
                        <p
                            className="font-weight-light mb-0"
                            style={{
                                fontSize: '14px',
                                lineHeight: '2'
                            }}
                        >
                            <Translation>
                                {(t) => <>{t('main.deliveryFee')}</>}
                            </Translation> <small className="font-weight-bold">( {delivery} )</small>
                        </p>
                        <p
                            className="font-weight-light mb-0"
                            style={{
                                fontSize: '14px',
                                lineHeight: '2'
                            }}
                        >
                            <Translation>
                                {(t) => <>{t('main.discount')}</>}
                            </Translation> <small className="font-weight-bold">(3%)</small>
                        </p>
                        <p
                            className="font-weight-bold mb-0 mt-2"
                            style={{
                                fontSize: '16px',
                                lineHeight: '2',
                                letterSpacing: '0.5px'
                            }}
                        >
                            <Translation>
                                {(t) => <>{t('main.total')}</>}
                            </Translation>
                        </p>
                    </div>
                    <div className="ml-auto text-right">
                        <p
                            className="font-weight-light mb-0"
                            style={{
                                fontSize: '14px',
                                lineHeight: '2'
                            }}
                        >
                            {cartTotal.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}
                        </p>
                        <p
                            className="font-weight-light mb-0"
                            style={{
                                fontSize: '14px',
                                lineHeight: '2'
                            }}
                        >
                            {
                                delivery_fee === 0 ? (
                                    <>
                                        <Translation>
                                            {(t) => <>{t('main.deliveryFreeShipping')}</>}
                                        </Translation>
                                    </>
                                ) : (
                                    <><small>( + )</small> {delivery_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}</>
                                )
                            }
                        </p>
                        <p
                            className="font-weight-light mb-0"
                            style={{
                                fontSize: '14px',
                                lineHeight: '2'
                            }}
                        >
                            <small>( - )</small> {this.discountPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}
                        </p>
                        <p
                            className="font-weight-bold mb-0 mt-2"
                            style={{
                                fontSize: '16px',
                                lineHeight: '2',
                                letterSpacing: '0.5px'
                            }}
                        >
                            {this.allTotalPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}
                        </p>
                    </div>
                </div>
            </div>

        const modal1 = 
            <Modal
                isOpen={show}
                contentLabel="MyKyat အကောင့်ဝင်ရန်"
                onRequestClose={this.closeModal}
                style={loginStyle}
                overlayClassName="payment-modal-wrapper"
            >
                <div className="col-12 col-lg-6 mx-auto h-100 px-0">

                    <button
                        className="btn shadow-none border-0 rounded-0 position-absolute text-light p-0"
                        style={{
                            right: '0',
                            top: '0',
                            zIndex: '9999999999',
                            fontSize: '35px',
                            width: '66px',
                            height: '66px',
                            lineHeight: '30px',
                            background: 'none',
                        }}
                        onClick={() => 
                            {
                                this.closeModal()
                                this.setState({
                                    mykyat_login: '',
                                    mykyat_password: ''
                                })
                            }}
                    >
                        <RiCloseCircleLine />
                    </button>

                    <div 
                        className="d-table w-100 h-100 px-3 position-relative"
                    >
                        <div 
                            className="d-table-cell align-middle py-3"
                            // style={{
                            //     paddingBottom: '5rem'
                            // }}
                        >
                            
                            <form
                                noValidate
                                action="#"
                                className="mx-auto"
                                style={{
                                    width: '320px',
                                    maxWidth: '100%'
                                }}
                            >
                                <p 
                                    className="text-center mb-5"
                                >
                                    <img
                                        src={MYKYAT_LOG}
                                        alt="MyKyat"
                                        className="rounded-lg"
                                        style={{
                                            width: '100px'
                                        }}
                                    />
                                </p>
                                <div className="form-group mb-4">
                                    <label
                                        htmlFor="mykyat_login"
                                        className="text-white text-uppercase"
                                    >
                                        Username
                                    </label>
                                    <input 
                                        type="text" 
                                        id="mykyat_login"
                                        name="mykyat_login"
                                        value={mykyat_login}
                                        onChange={this.handleChange.bind(this)}
                                        className="form-control w-100 bg-transparent border-white shadow-none text-white"
                                        style={{
                                            height: '50px'
                                        }}
                                    />
                                    {
                                        decrypt_auth[1] === "Customer is invalid" ? (
                                            <span 
                                                className="d-inline-block float-left pt-1 text-danger"
                                                style={{
                                                    fontSize: '11px'
                                                }}
                                            >{decrypt_auth[1]}</span>
                                        ) : null
                                    }
                                </div>
                                <div className="form-group mb-5">
                                    <label
                                        htmlFor="mykyat_login"
                                        className="text-white text-uppercase"
                                    >
                                        Password
                                    </label>
                                    <input 
                                        type="password" 
                                        id="mykyat_password"
                                        name="mykyat_password"
                                        value={mykyat_password}
                                        onChange={this.handleChange.bind(this)}
                                        className="form-control w-100 bg-transparent border-white shadow-none text-white"
                                        style={{
                                            height: '50px'
                                        }}
                                    />
                                    {
                                        decrypt_auth[1] === "Wrong Password" ? (
                                            <span 
                                                className="d-inline-block float-left pt-1 text-danger"
                                                style={{
                                                    fontSize: '11px'
                                                }}
                                            >{decrypt_auth[1]}</span>
                                        ) : null
                                    }
                                </div>
                                <div className="form-group mb-0">
                                    <button
                                        className="w-100 border-0 rounded shadow-none text-white py-2"
                                        style={{
                                            lineHeight: '2',
                                            fontSize: '20px',
                                            background: '#0a55a6'
                                        }}
                                        onClick={this.encryptAuthLogin.bind(this)}
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.mykyat.signin')}</>}
                                        </Translation>
                                    </button>
                                </div>
                                
                            </form>

                        </div>
                    </div>

                </div>
            </Modal>

        const modal2 = 
            <>
                {
                    decrypt_auth[1] === 'Cash is not enough!' ? (
                        <Modal
                            isOpen={show1}
                            onRequestClose={this.closeModal1}
                            contentLabel="MyKyat အကောင့်ထွက်ရန်"
                            style={loginStyle}
                            overlayClassName="payment-modal-wrapper"
                        >
                            <div className="col-12 col-lg-6 mx-auto h-100 px-0">
                                <button
                                    className="btn shadow-none border-0 rounded-0 position-absolute text-light p-0"
                                    style={{
                                        right: '0',
                                        top: '0',
                                        zIndex: '9999999999',
                                        fontSize: '35px',
                                        width: '66px',
                                        height: '66px',
                                        lineHeight: '30px',
                                        background: 'none',
                                    }}
                                    onClick={() => 
                                        {
                                            this.closeModal1()
                                            this.setState({
                                                mykyat_login: '',
                                                mykyat_password: ''
                                            })
                                        }}
                                >
                                    <RiCloseCircleLine />
                                </button>

                                <div 
                                    className="d-table w-100 h-100 px-4 position-relative"
                                >
                                    <div 
                                        className="d-table-cell align-middle py-3"
                                        style={{
                                            paddingBottom: '5rem'
                                        }}
                                    >
                                        <p
                                            className="mb-0 text-white text-center"
                                            style={{
                                                fontSize: '20px',
                                                lineHeight: '2'
                                            }}
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.mykyat.purchaseTotalAmount')}</>}
                                            </Translation> - <strong style={{color:'#ff0047'}}>{this.allTotalPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}</strong><br />
                                            <Translation>
                                                {(t) => <>{t('main.mykyat.amountNotEnough')}</>}
                                            </Translation> <br />
                                            <Translation>
                                                {(t) => <>{t('main.mykyat.amountCharge')}</>}
                                            </Translation>&nbsp;
                                            <Translation>
                                                {(t) => <>{t('main.mykyat.tryAgain')}</>}
                                            </Translation>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    ) : (
                        <Modal
                            isOpen={show2}
                            onRequestClose={this.closeModal2}
                            contentLabel="MyKyat အကောင့်ထွက်ရန်"
                            style={loginStyle}
                            overlayClassName="payment-modal-wrapper"
                        >
                            <div className="col-12 col-lg-6 mx-auto h-100 px-0">
                                <button
                                    className="btn shadow-none border-0 rounded-0 position-absolute text-light p-0"
                                    style={{
                                        right: '0',
                                        top: '0',
                                        zIndex: '9999999999',
                                        fontSize: '35px',
                                        width: '66px',
                                        height: '66px',
                                        lineHeight: '30px',
                                        background: 'none',
                                    }}
                                    onClick={() => 
                                        {
                                            this.closeModal2()
                                            this.setState({
                                                mykyat_login: '',
                                                mykyat_password: ''
                                            })
                                        }}
                                >
                                    <RiCloseCircleLine />
                                </button>

                                <div 
                                    className="d-table w-100 h-100 px-4 position-relative"
                                >
                                    <div 
                                        className="d-table-cell align-middle py-3 text-center"
                                        style={{
                                            paddingBottom: '5rem'
                                        }}
                                    >
                                        <p
                                            className="mb-5 text-white"
                                            style={{
                                                fontSize: '20px',
                                                lineHeight: '2'
                                            }}
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.mykyat.toBuy')}</>}
                                            </Translation> <br />
                                            <Translation>
                                                {(t) => <>{t('main.mykyat.amountEnough')}</>}
                                            </Translation>
                                        </p>
                                        <button
                                            className="border-0 rounded shadow-none text-white py-2 px-5"
                                            style={{
                                                lineHeight: '2',
                                                fontSize: '20px',
                                                background: '#0a55a6'
                                            }}
                                            onClick={this.encryptPurchaseContinue.bind(this)}
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.mykyat.payConfirm')}</>}
                                            </Translation>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    )
                }
            </>

        const modal3 = 
            <>
                {
                    decrypt_purchase[0] === '1' ? (
                        <Modal
                            isOpen={show3}
                            onRequestClose={this.closeModal3}
                            contentLabel="MyKyat အကောင့်ထွက်ရန်"
                            style={loginStyle}
                            overlayClassName="payment-modal-wrapper"
                        >
                            <div className="col-12 col-lg-6 mx-auto h-100 px-0">
                                <button
                                    className="btn shadow-none border-0 rounded-0 position-absolute text-light p-0"
                                    style={{
                                        right: '0',
                                        top: '0',
                                        zIndex: '9999999999',
                                        fontSize: '35px',
                                        width: '66px',
                                        height: '66px',
                                        lineHeight: '30px',
                                        background: 'none',
                                    }}
                                    onClick={() => 
                                        {
                                            this.closeModal3()
                                            this.setState({
                                                mykyat_login: '',
                                                mykyat_password: ''
                                            })
                                        }}
                                >
                                    <RiCloseCircleLine />
                                </button>

                                <div 
                                    className="d-table w-100 h-100 px-4 position-relative"
                                >
                                    <div 
                                        className="d-table-cell align-middle py-3"
                                        style={{
                                            paddingBottom: '5rem'
                                        }}
                                    >
                                        <p
                                            className="mb-0 text-white text-center"
                                            style={{
                                                fontSize: '20px',
                                                lineHeight: '2'
                                            }}
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.mykyat.error')}</>}
                                            </Translation>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    ) : (
                        <Modal
                            isOpen={show3}
                            // onRequestClose={() => {}}
                            contentLabel="MyKyat အကောင့်ကို အောင်မြင်စွာ လုပ်ဆောင်နိုင်ပါပီ"
                            style={loginStyle}
                            overlayClassName="payment-modal-wrapper"
                        >
                            <div className="col-12 col-lg-6 mx-auto h-100 px-0">
                                <button
                                    className="btn shadow-none border-0 rounded-0 position-absolute text-light p-0"
                                    style={{
                                        right: '0',
                                        top: '0',
                                        zIndex: '9999999999',
                                        fontSize: '35px',
                                        width: '66px',
                                        height: '66px',
                                        lineHeight: '30px',
                                        background: 'none',
                                    }}
                                    onClick={this.handleMyKyatSubmit.bind(this)}
                                >
                                    <RiCloseCircleLine />
                                </button>
                                {/* <div
                                    style={{
                                        top: '0',
                                        zIndex: '999',
                                        background: '#1b1a20'
                                    }}
                                    className="d-flex py-2 px-2 position-sticky sticky-cart-header text-center"
                                >
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="float-cart__close-btn text-left m-0 rounded-circle"
                                            style={{
                                                height: '50px',
                                                lineHeight: '50px',
                                                width: '25px'
                                            }}
                                            onClick={this.handleMyKyatSubmit.bind(this)}
                                        >
                                            <MdArrowBack style={{width:'25px',height:'25px'}} />
                                        </div>
                                    </div>
                                    <h3 
                                        className="flex-grow-1 align-self-center"
                                        style={{
                                            background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            color: 'transparent',
                                            lineHeight: '2',
                                            marginLeft: '-25px',
                                            marginBottom: '0',
                                            fontSize: '1.3rem'
                                        }}
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.mykyat.logout')}</>}
                                        </Translation>
                                    </h3>
                                </div> */}

                                <div 
                                    className="d-table w-100 h-100 px-4 position-relative"
                                >
                                    <div 
                                        className="d-table-cell align-middle py-3 text-center"
                                        style={{
                                            paddingBottom: '5rem'
                                        }}
                                    >
                                        <span
                                            className="d-inline-block mb-2 border-0 text-white rounded-circle"
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                lineHeight: '60px',
                                                fontSize: '35px',
                                                background: '#0a55a6'
                                            }}
                                        >
                                            <FiCheck />
                                        </span>
                                        <p
                                            className="mb-5 text-white text-uppercase"
                                            style={{
                                                fontSize: '20px',
                                                lineHeight: '2'
                                            }}
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.mykyat.success')}</>}
                                            </Translation><br />
                                            {/* Transaction ID - <strong>{decrypt_purchase[1]}</strong><br /> */}
                                            <Translation>
                                                {(t) => <>{t('main.mykyat.pItemTotalAmount')}</>}
                                            </Translation> - <strong className="text-warning">{this.allTotalPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}</strong>
                                        </p>
                                        <button
                                            className="border-0 rounded shadow-none text-white py-2 px-5"
                                            style={{
                                                lineHeight: '2',
                                                fontSize: '20px',
                                                background: '#0a55a6'
                                            }}
                                            onClick={this.handleMyKyatSubmit.bind(this)}
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.mykyat.checkIDList')}</>}
                                            </Translation>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    )
                }
            </>

        const errorSMS = 
            <>
                {
                    this.state.error.message ? (
                        <ToastContainer
                            position="top-left"
                            autoClose={3500}
                            hideProgressBar={true}
                            closeOnClick
                            closeButton={false}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            transition={Bounce}
                            toastClassName="shadow-lg rounded-sm m-0 bg-dark"
                            bodyClassName="px-3 py-2 text-light text-center font-weight-light"
                            style={{
                                width: '240px',
                                maxWidth: '100%',
                                top: '80px',
                                left: '15px',
                                padding: '0',
                                zIndex: '9999999999',
                                lineHeight: '2.5',
                                fontSize: '12px'
                            }}
                        >
                            {toast(`${this.state.error.message}`)}
                        </ToastContainer>
                    ) : null
                }
            </>

        const contactList = 
            <>
                {
                    this.state.name === '' &&
                    this.state.email === '' &&
                    this.state.phone === '' &&
                    this.state.address === '' ? (
                        <div className="mb-5">
                            <h4 
                                className="font-weight-bold mb-2"
                                style={{
                                    lineHeight: '2',
                                    fontSize: '1.1rem'
                                }}
                            >
                                <Translation>
                                    {(t) => <>{t('main.shippingAddress')}</>}
                                </Translation>
                            </h4>
                            <div
                                className="circle-link-hover shadow-sm rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                    width: '70px',
                                    height: '70px',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: '#000',
                                    background: '#fff'
                                }}
                                onClick={this.showContactModal}
                            >
                                <FiPlus />
                            </div>
                        </div>
                    ) : (
                        <div className="mb-5">
                            <h4 
                                className="font-weight-bold mb-2"
                                style={{
                                    lineHeight: '2',
                                    fontSize: '1.1rem'
                                }}
                            >
                                <Translation>
                                    {(t) => <>{t('main.shippingAddress')}</>}
                                </Translation>
                            </h4>

                            <div 
                                className="bg-white shadow-none rounded-0 p-4 d-flex w-100 flex-column flex-lg-row"
                            >
                                <div className="flex-grow-1">
                                    <p 
                                        className="mb-0 font-weight-light"
                                        style={{
                                            lineHeight: '2',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {
                                            this.state.phone &&
                                            <>{this.state.phone}<br /></>
                                        }
                                        {
                                            this.state.name &&
                                            <>{this.state.name}<br /></>
                                        }
                                        {
                                            this.state.email &&
                                            <>{this.state.email}<br /></>
                                        }
                                        {
                                            this.state.address &&
                                            <>{this.state.address}</>
                                        }                                     
                                    </p>
                                </div>
                                <div 
                                    className="d-flex mt-4 mt-lg-0"
                                    style={{
                                        width: '68px'
                                    }}
                                >
                                    <button
                                        className="text-white btn btn-primary shadow-sm border-0 rounded-circle p-0"
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            lineHeight: '0'
                                        }}
                                        onClick={this.showContactModal.bind(this)}
                                    >
                                        <AiFillEdit />
                                    </button>
                                    <button
                                        className="text-white btn btn-danger shadow-sm border-0 rounded-circle p-0 ml-2"
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            lineHeight: '0'
                                        }}
                                        onClick={this.resetForm}
                                    >
                                        <GoTrashcan />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    showContact === true ? (
                        <Modal
                            isOpen={showContact}
                            contentLabel="လိပ်စာ ဖြည့်ရန်"
                            style={contactStyle}
                            overlayClassName="contact-fill-wrapper"
                        >
                            <div className="col-12 col-lg-6 mx-auto px-3">
                                <div
                                    style={{
                                        padding: '0',
                                        top: '0',
                                        zIndex: '999',
                                        background: '#f8f9fa',
                                        height: '66px'
                                    }}
                                    className="d-flex p-0 position-sticky"
                                >
                                    <div className="d-flex align-items-center">
                                        {
                                            this.state.name === '' &&
                                            this.state.email === '' &&
                                            this.state.phone === '' &&
                                            this.state.address === '' ? (
                                                <div
                                                    className="text-left m-0 rounded-circle"
                                                    style={{
                                                        height: '25px',
                                                        width: '25px',
                                                        color: '#000',
                                                        cursor: 'pointer',
                                                        zIndex: '999'
                                                    }}
                                                    onClick={() => {
                                                            this.closeContactModal()
                                                            this.resetForm()
                                                        }
                                                    }
                                                >
                                                    <MdArrowBack style={{width:'25px',height:'25px'}} />
                                                </div>
                                            ) : (
                                                <div
                                                    className="text-left m-0 rounded-circle"
                                                    style={{
                                                        height: '25px',
                                                        width: '25px',
                                                        color: '#000',
                                                        cursor: 'pointer',
                                                        zIndex: '999'
                                                    }}
                                                    onClick={this.closeContactModal}
                                                >
                                                    <MdArrowBack style={{width:'25px',height:'25px'}} />
                                                </div>
                                            )
                                        }
                                        
                                    </div>
                                    <h3 
                                        className="d-flex flex-grow-1 my-0 ml-n4 align-self-center justify-content-center text-dark font-weight-bold"
                                        style={{
                                            // background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                            // WebkitBackgroundClip: 'text',
                                            // WebkitTextFillColor: 'transparent',
                                            lineHeight: '2',
                                            fontSize: '1.1rem'
                                        }}
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.fullAddress')}</>}
                                        </Translation>
                                    </h3>
                                </div>

                                <div className="px-0 py-5">
                                    <div className="field-group mb-4">
                                        <label
                                            htmlFor="name"
                                            style={{
                                                lineHeight: '2'
                                            }}
                                            className="mb-2"
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.addressName')}</>}
                                            </Translation>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.handleChange.bind(this)}
                                            className="form-control rounded bg-transparent border shadow-none text-dark mb-2"
                                            aria-describedby="name"
                                            // required
                                            style={{
                                                height: '45px'
                                            }}
                                        />
                                        {/* <small id="name" className="form-text text-danger" style={{fontSize:'10px'}}>နာမည်အပြည့်အစုံ ဖြည့်ပေးပါရန်</small> */}
                                    </div>
                                    <div className="field-group mb-4">
                                        <label
                                            htmlFor="email"
                                            style={{
                                                lineHeight: '2'
                                            }}
                                            className="mb-2"
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.addressEmail')}</>}
                                            </Translation>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={this.state.email}
                                            onChange={this.handleChange.bind(this)}
                                            className="form-control rounded border bg-transparent shadow-none text-dark mb-2"
                                            aria-describedby="email"
                                            // required
                                            style={{
                                                height: '45px'
                                            }}
                                        />
                                        {/* <small id="email" className="form-text text-danger" style={{fontSize:'10px'}}>အီးမေးလ် လိပ်စာဖြည့်ပေးပါရန်</small> */}
                                    </div>
                                    <div className="field-group mb-4">
                                        <label
                                            htmlFor="phone"
                                            style={{
                                                lineHeight: '2'
                                            }}
                                            className="mb-2"
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.addressPhone')}</>}
                                            </Translation>
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            value={this.state.phone}
                                            onChange={this.handleChange.bind(this)}
                                            className="form-control rounded border bg-transparent shadow-none text-dark mb-2"
                                            aria-describedby="phone"
                                            placeholder="09........."
                                            required
                                            style={{
                                                height: '45px'
                                            }}
                                        />
                                        {/* <small id="phone" className="form-text text-danger" style={{fontSize:'10px'}}>ဖုန်းနံပါတ် ဖြည့်ပေးပါရန်</small> */}
                                    </div>
                                    <div className="field-group mb-0">
                                        <label
                                            htmlFor="address"
                                            style={{
                                                lineHeight: '2'
                                            }}
                                            className="mb-2"
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.addressAddress')}</>}
                                            </Translation>
                                        </label>
                                        <textarea
                                            rows="4"
                                            name="address"
                                            id="address"
                                            value={this.state.address}
                                            onChange={this.handleChange.bind(this)}
                                            className="form-control rounded border bg-transparent shadow-none text-dark mb-2"
                                            aria-describedby="address"
                                        />
                                        {/* <small id="address" className="form-text text-danger" style={{fontSize:'10px'}}>လိပ်စာအပြည့်အစုံ ဖြည့်ပေးပါရန်</small> */}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        padding: '0',
                                        bottom: '0',
                                        zIndex: '999',
                                        background: '#f8f9fa',
                                    }}
                                    className="d-flex p-0 position-sticky mx-n3 mx-lg-0"
                                >
                                    <div className="w-100">

                                        {
                                            this.state.name &&
                                            this.state.phone &&
                                            this.state.address ? (
                                                    <>
                                                        <button
                                                            className="btn w-50 text-white py-2 rounded-0 shadow-none"
                                                            style={{
                                                                lineHeight: '2',
                                                                background: '#0a55a6'
                                                            }}
                                                            onClick={this.closeContactModal}
                                                        >
                                                            <Translation>
                                                                {(t) => <>{t('main.addressSave')}</>}
                                                            </Translation>
                                                        </button>
                                                        <button
                                                            className="btn w-50 text-white py-2 bg-danger rounded-0 shadow-none"
                                                            style={{
                                                                lineHeight: '2',
                                                                background: ''
                                                            }}
                                                            onClick={this.resetForm}
                                                        >
                                                            <Translation>
                                                                {(t) => <>{t('main.addressDelete')}</>}
                                                            </Translation>
                                                        </button>
                                                    </> 
                                                ) : (
                                                    <button
                                                        className="btn w-100 text-white py-2 rounded-0 shadow-none"
                                                        style={{
                                                            lineHeight: '2',
                                                            background: '#0a55a6'
                                                        }}
                                                        onClick={this.closeContactModal}
                                                    >
                                                        <Translation>
                                                            {(t) => <>{t('main.addressSave')}</>}
                                                        </Translation>
                                                    </button>
                                                )
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    ) : null
                }

            </>

        
        return (
            <Layout>
                <div className="bg-light py-5">
                    {
                        cartProducts.length <=0 ? (
                            <div className="container h-100">
                                <div 
                                    className="d-table w-100"
                                    style={{
                                        height: '400px'
                                    }}
                                >
                                    <div className="d-table-cell align-middle">
                                        <p
                                            className="text-center font-weight-bold text-danger"
                                            style={{
                                                fontSize: '1rem',
                                                lineHeight: '2'
                                            }}
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.pageAccessDenied')}</>}
                                            </Translation>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="container">
                                    
                                    {errorSMS}

                                    {modal1}

                                    {modal2}

                                    {modal3}

                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-8">
                                            {contactList}

                                            {deliveryTime}

                                            {paymentMethod}
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4 mt-5 mt-md-0">
                                            {orderItemLists}
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-8 d-none d-md-block my-md-5">
                                            {placeOrder}
                                        </div>
                                    </div>
                                </div>
                                {smallPlaceOrder}
                            </>
                        )
                    }
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    cartProducts: state.cart.products,
    cartTotal: state.total.data,
    productToRemove: state.cart.productToRemove,
    productToChange: state.cart.productToChange,
    newProduct: state.cart.productToAdd
})

export default connect(
    mapStateToProps,
    { loadCart , updateTotalCart , removeProduct , changeProductQuantity }
)(withRouter(Checkout))