import React, { Component } from 'react'
import { ORDERURL } from '../api'
import { db } from '../firebase'
import { withRouter } from 'react-router-dom'
import { currency } from '../utils'
import Moment from 'react-moment'
import 'moment-timezone'
import Skeleton from 'react-loading-skeleton'
// import QRCode from 'qrcode.react'
// import FAVICON from '../assets/images/logo.jpg'
import { addOrder } from '../store/order/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { IoMdClose } from 'react-icons/io'
import { Translation } from 'react-i18next'
import Layout from '../components/layout/Layout'


const FETCHIMG = process.env.REACT_APP_FETCH_IMAGES

class CompletedOrder extends Component 
{
    static propTypes = {
        addOrder: PropTypes.func.isRequired
    }

    state = {
        item: null,
        show: false
    }
    
    getItem = () => {
        const id  = this.props.match.params.id
        db.ref(ORDERURL+`/${id}`).on('value' , snapshot => {
            const data = snapshot.val()
            this.setState({
                item: data
            })
        })
        this.showModal()
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

    // downloadQR = () => {
    //     const canvas = document.getElementById('HpQrcode')
    //     const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")

    //     let downloadLink = document.createElement("a")
    //     downloadLink.href = pngUrl
    //     downloadLink.download = "order-qr.png"
    //     document.body.appendChild(downloadLink)
    //     downloadLink.click()
    //     document.body.removeChild(downloadLink)
    // }

    // downloadInvoiceQR = () => {
    //     const canvas = document.getElementById('HpQrcode')
    //     const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")

    //     let downloadLink = document.createElement("a")
    //     downloadLink.href = pngUrl
    //     downloadLink.download = "invoice-qr.png"
    //     document.body.appendChild(downloadLink)
    //     downloadLink.click()
    //     document.body.removeChild(downloadLink)
    // }

    componentDidMount() {
        this.getItem()
        window.scrollTo(0,0)
    }

    render() {

        const { item , show } = this.state

        const successStyle = {
            content : {
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                background: 'rgba(255, 255, 255, 0.98)',
                border: '0',
                padding: '0',
                borderRadius: '0',
                zIndex: '9999999999',
                position: 'fixed'
            }
        }

        // const qr = {
        //     value: `${item ? <>{item.id}</> : null}`,
        //     size: 128,
        //     fgColor: '#000000',
        //     bgColor: '#ffffff',
        //     level: 'L',
        //     renderAs: 'canvas',
        //     includeMargin: false,
        //     includeImage: true,
        //     imageH: 15,
        //     imageW: 15,
        //     imageX: 0,
        //     imageY: 0,
        //     imageSrc: FAVICON,
        //     imageExcavate: true,
        //     centerImage: true,
        // }

        // const qr_invoice = {
        //     value: `${item ? <>{item.invoice_number}</> : null}`,
        //     size: 128,
        //     fgColor: '#000000',
        //     bgColor: '#ffffff',
        //     level: 'L',
        //     renderAs: 'canvas',
        //     includeMargin: false,
        //     includeImage: true,
        //     imageH: 15,
        //     imageW: 15,
        //     imageX: 0,
        //     imageY: 0,
        //     imageSrc: FAVICON,
        //     imageExcavate: true,
        //     centerImage: true,
        // }

        const orderList = 
                        <div className="w-100" id="capture">
                            {
                                item ? (
                                    <div key={item.id} className="row">
                                        <div className="col-12 col-lg-6 mb-5 mb-lg-0">
                                            <div className="">
                                                <h4
                                                    className="font-weight-bold mb-3 mt-0"
                                                    style={{
                                                        lineHeight: '2',
                                                        fontSize: '1.1rem'
                                                    }}
                                                >
                                                    <Translation>
                                                        {(t) => <>{t('main.summaryDetails')}</>}
                                                    </Translation>
                                                </h4>

                                                <div
                                                    className="shadow-none rounded-0 bg-white py-4 px-4"
                                                >
                                                    <h6
                                                        className="mt-0 mb-3"
                                                        style={{
                                                            lineHeight: '2',
                                                            fontSize: '0.95rem'
                                                        }}
                                                    >
                                                        <span>
                                                            <Translation>
                                                                {(t) => <>{t('main.orderDate')}</>}
                                                            </Translation> <br />
                                                            <strong>
                                                                <Moment format="D MMMM YYYY, h:mm a">{item.checkout.contact.dateRaw}</Moment>
                                                            </strong>
                                                        </span><br /><br />
                                                        <span>
                                                            <Translation>
                                                                {(t) => <>{t('main.orderNo')}</>}
                                                            </Translation> <br />
                                                            <i 
                                                                className="font-weight-bold" 
                                                                style={{
                                                                    color:'#6fbd0c'
                                                                }}
                                                            >{item.id}</i>
                                                        </span><br /><br />
                                                        <span>
                                                            <Translation>
                                                                {(t) => <>{t('main.invoiceNo')}</>}
                                                            </Translation> <br />
                                                            <i 
                                                                className="font-weight-bold" 
                                                                style={{
                                                                    color:'#6fbd0c'
                                                                }}
                                                            >{item.invoice_number}</i>
                                                        </span><br /><br />
                                                    </h6>
                                                    <p
                                                        className="mb-3 text-dark"
                                                        style={{
                                                            lineHeight: '2',
                                                            fontSize: '0.95rem'
                                                        }}
                                                    >
                                                        <strong
                                                            style={{
                                                                color: '#000',
                                                                fontSize: '1rem',
                                                                fontWeight: '500'
                                                            }}
                                                        >
                                                            <Translation>
                                                                {(t) => <>{t('main.fullAddress')}</>}
                                                            </Translation>
                                                        </strong><br />
                                                        {
                                                            item.checkout.contact.name &&
                                                            <>{item.checkout.contact.name}<br /></>
                                                        }
                                                        {
                                                            item.checkout.contact.email &&
                                                            <>{item.checkout.contact.email}<br /></>
                                                        }
                                                        {
                                                            item.checkout.contact.phone &&
                                                            <>{item.checkout.contact.phone}<br /></>
                                                        }
                                                        {
                                                            item.checkout.contact.address &&
                                                            <>{item.checkout.contact.address}<br /></>
                                                        }
                                                        <br />
                                                    </p>
                                                    <p
                                                        className="mb-3"
                                                        style={{
                                                            lineHeight: '2',
                                                            fontSize: '0.95rem'
                                                        }}
                                                    >
                                                        <Translation>
                                                            {(t) => <>{t('main.payment')}</>}
                                                        </Translation> <br />
                                                        - <strong>{item.checkout.payment}</strong>
                                                    </p>
                                                    <p
                                                        className="mb-0"
                                                        style={{
                                                            lineHeight: '2',
                                                            fontSize: '0.95rem'
                                                        }}
                                                    >
                                                        <Translation>
                                                            {(t) => <>{t('main.deliveryTime')}</>}
                                                        </Translation> <br />
                                                        - <strong>
                                                            {
                                                                item.products.delivery === 'ပုံမှန်ကြာချိန် (၂)ရက်' &&
                                                                <>
                                                                    {item.products.delivery} 
                                                                    <small className="ml-2">
                                                                        ( <Moment 
                                                                            add={{ days:2 }}
                                                                            format="D MMMM YYYY , h:mm a"
                                                                        >
                                                                            {item.checkout.contact.dateRaw}
                                                                        </Moment> )
                                                                    </small>
                                                                </>
                                                            }
                                                            {
                                                                item.products.delivery === 'ကြာချိန် (၁)ရက်' &&
                                                                <>
                                                                    {item.products.delivery} 
                                                                    <small className="ml-2">
                                                                        ( <Moment 
                                                                            add={{ days:1 }}
                                                                            format="D MMMM YYYY , h:mm a"
                                                                        >
                                                                            {item.checkout.contact.dateRaw}
                                                                        </Moment> )
                                                                    </small>
                                                                </>
                                                            }
                                                            {
                                                                item.products.delivery === 'ချက်ချင်း (၂)နာရီအတွင်း' &&
                                                                <>
                                                                    {item.products.delivery} 
                                                                    <small className="ml-2">
                                                                        ( <Moment 
                                                                            add={{ hours:2 }}
                                                                            format="D MMMM YYYY , h:mm a"
                                                                        >
                                                                            {item.checkout.contact.dateRaw}
                                                                        </Moment> )
                                                                    </small>
                                                                </>
                                                            }
                                                        </strong>                        
                                                    </p>
                                                </div>

                                                
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <h4
                                                className="font-weight-bold mb-3 mt-0"
                                                style={{
                                                    lineHeight: '2',
                                                    fontSize: '1.1rem'
                                                }}
                                            >
                                                <Translation>
                                                    {(t) => <>{t('main.purchaseOrders')}</>}
                                                </Translation>
                                            </h4>

                                            <div 
                                                className="bg-white px-4 py-4"
                                                style={{
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {
                                                    item.products.orderItems.map((p, index) => (

                                                        <div 
                                                            className="d-flex mb-2 pb-2 border-bottom pb-mb-bb-none" 
                                                            key={index}
                                                        >
                                                            <div className="mr-2">
                                                                <img
                                                                    src={FETCHIMG+`/${p.image}`}
                                                                    alt={p.title}
                                                                    className="rounded-0"
                                                                    style={{
                                                                        width: '80px'
                                                                    }}

                                                                />
                                                            </div>
                                                            <div
                                                                className="align-self-center flex-grow-1"
                                                            >
                                                                <h6 
                                                                    className="m-0 pb-0 text-dark font-weight-light"
                                                                    style={{
                                                                        fontSize: '14px'
                                                                    }}
                                                                >
                                                                    <Translation>
                                                                        {(t) => 
                                                                            <>
                                                                                {t(
                                                                                'main.post.title',
                                                                                { 
                                                                                    title_en: p.title,
                                                                                    title_mm: p.title_mm
                                                                                }
                                                                                )}
                                                                            </>
                                                                        }
                                                                    </Translation> 
                                                                </h6>
                                                                <div>
                                                                    <small 
                                                                        className="font-weight-bold" 
                                                                        style={{fontSize:'10px'}}
                                                                    >
                                                                        ( {p.weight} {p.unit} )
                                                                    </small>
                                                                </div>
                                                                <div
                                                                    className="pt-1"
                                                                >
                                                                    <h5 
                                                                        className="m-0 font-weight-bold"
                                                                        style={{
                                                                            fontSize: '14px'
                                                                        }}
                                                                    >{p.price} {currency}</h5> 
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="align-self-center ml-auto text-right"
                                                            >
                                                                <div>
                                                                    <p className="mb-0">
                                                                        <small
                                                                            className="font-weight-light"
                                                                            style={{fontSize:'10px'}}
                                                                        >
                                                                            <Translation>
                                                                                {(t) => <>{t('main.itemQuantity')}</>}
                                                                            </Translation> - <strong className="font-weight-bold">( {p.quantity} )</strong>
                                                                        </small>
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <small className="font-weight-light">                
                                                                        <Translation>
                                                                            {(t) => <>{t('main.subtotal')}</>}
                                                                        </Translation> - <strong className="font-weight-bold">{p.item_total} {currency}</strong>
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                            <div 
                                                className="d-flex bg-white p-4 shadow-none rounded-0"
                                                style={{
                                                    lineHeight: '2',
                                                    marginBottom: '20px'
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
                                                        </Translation> <small className="font-weight-bold">( {item.products.delivery} )</small>
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
                                                        {item.products.subtotal} {currency}
                                                    </p>
                                                    <p
                                                        className="font-weight-light mb-0"
                                                        style={{
                                                            fontSize: '14px',
                                                            lineHeight: '2'
                                                        }}
                                                    >
                                                        {
                                                            item.products.delivery_fee === '0' ? (
                                                                <>
                                                                    <Translation>
                                                                        {(t) => <>{t('main.deliveryFreeShipping')}</>}
                                                                    </Translation>
                                                                </>
                                                            ) : (
                                                                <><small>( + )</small> {item.products.delivery_fee} {currency}</>
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
                                                        <small>( - )</small> {item.products.discount_price} {currency}
                                                    </p>
                                                    <p
                                                        className="font-weight-bold mb-0 mt-2"
                                                        style={{
                                                            fontSize: '16px',
                                                            lineHeight: '2',
                                                            letterSpacing: '0.5px'
                                                        }}
                                                    >
                                                        {item.products.total} {currency}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="d-none d-lg-flex p-4 bg-white">
                                                <div 
                                                    className="buy-btn mt-0 py-0 w-50 float-left bg-transparent mr-2 d-flex align-items-center justify-content-center"
                                                >
                                                    <button 
                                                        onClick={() => this.props.history.push('/')}
                                                        className="btn d-block shadow-none py-2 w-100 text-white shop-btn text-uppercase rounded-0" 
                                                        style={{ 
                                                            background: '#0c0b10',
                                                            height: '56px',
                                                            whiteSpace: 'nowrap',
                                                            textOverflow: 'ellipsis',
                                                            overflow: 'hidden'
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                                                WebkitBackgroundClip: 'text',
                                                                WebkitTextFillColor: 'transparent',
                                                                lineHeight: '2',
                                                                display: 'inline-block',
                                                                fontSize: '14px'
                                                            }}
                                                        >
                                                            <Translation>
                                                                {(t) => <>{t('main.continueShopping')}</>}
                                                            </Translation>
                                                        </span>
                                                    </button>
                                                </div>
                                                <div 
                                                    className="buy-btn mt-0 w-50 float-left py-2 d-flex align-items-center justify-content-center text-white ml-2 btn-cart-hover" 
                                                    onClick={() => this.props.history.push('/track')}
                                                    style={{
                                                        background: '#6fbd0c',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            lineHeight: '2',
                                                            fontSize: '14px'
                                                        }}
                                                    >
                                                        <Translation>
                                                            {(t) => <>{t('main.search')}</>}
                                                        </Translation>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>


                                        <Modal
                                            isOpen={show}
                                            contentLabel="ကျေးဇူးတင်ပါသည်"
                                            onRequestClose={() => {
                                                this.closeModal()
                                                this.props.addOrder(item)
                                            }}
                                            style={successStyle}
                                            overlayClassName="complete-modal-wrapper"
                                        >
                                            <div
                                                className="col-12 col-lg-6 mx-auto h-100 d-table"
                                            >
                                                <div
                                                    className="d-table-cell align-middle position-relative"
                                                    style={{
                                                        height: '300px'
                                                    }}
                                                >
                                                    <button
                                                        className="position-absolute bg-white shadow-lg rounded-circle border-0"
                                                        style={{
                                                            left: '50%',
                                                            bottom: '15%',
                                                            marginLeft: '-25px',
                                                            width: '50px',
                                                            height: '50px',
                                                            fontSize: '22px'
                                                        }}
                                                        onClick={() => {
                                                            this.props.addOrder(item)
                                                            this.closeModal()
                                                        }}
                                                    >
                                                        <IoMdClose />
                                                    </button>
                                                    <div
                                                        className="rounded-lg shadow-lg bg-white text-center py-5 px-4 font-weight-bold"
                                                        style={{
                                                            lineHeight: '2',
                                                            fontSize: '22px',
                                                            color: '#6fbd0c',
                                                            margin: '0 8%',
                                                            letterSpacing: '0.5px'
                                                        }}
                                                    >
                                                        <Translation>
                                                            {(t) => <>{t('main.thankyouPurchasing')}</>}
                                                        </Translation>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>
                                        
                                        {/* <div className="row mb-5">
                                            <div className="HpQrcode col-6 d-flex flex-column">
                                                <QRCode
                                                    id="HpQrcode"
                                                    value={qr.value}
                                                    size={qr.size}
                                                    fgColor={qr.fgColor}
                                                    bgColor={qr.bgColor}
                                                    level={qr.level}
                                                    renderAs={qr.renderAs}
                                                    includeMargin={qr.includeMargin}
                                                    imageSettings={
                                                        qr.includeImage ? {
                                                            src: qr.imageSrc,
                                                            height: qr.imageH,
                                                            width: qr.imageW,
                                                            x: qr.centerImage ? null : qr.imageX,
                                                            y: qr.centerImage ? null : qr.imageY,
                                                            excavate: qr.imageExcavate,
                                                        } : null
                                                    }
                                                    style={{
                                                        width: '100%',
                                                        height: '100%'
                                                    }}
                                                />

                                                <p
                                                    className="my-3 text-center"
                                                    style={{
                                                        lineHeight: '2',
                                                        color: '#6fbd0c'
                                                    }}
                                                >အော်ဒါ QR Code</p>

                                                <button
                                                    className="d-inline-block w-100 btn btn-primary rounded-0 border-0 py-2"
                                                    style={{
                                                        lineHeight: '2'
                                                    }}
                                                    onClick={this.downloadQR}
                                                >
                                                    ဒေါင်းထားမည်
                                                </button>
                                            </div>
                                            <div className="HpQrcode col-6 d-flex flex-column">
                                                <QRCode
                                                    id="HpQrcode"
                                                    value={qr_invoice.value}
                                                    size={qr_invoice.size}
                                                    fgColor={qr_invoice.fgColor}
                                                    bgColor={qr_invoice.bgColor}
                                                    level={qr_invoice.level}
                                                    renderAs={qr_invoice.renderAs}
                                                    includeMargin={qr_invoice.includeMargin}
                                                    imageSettings={
                                                        qr_invoice.includeImage ? {
                                                            src: qr_invoice.imageSrc,
                                                            height: qr_invoice.imageH,
                                                            width: qr_invoice.imageW,
                                                            x: qr_invoice.centerImage ? null : qr_invoice.imageX,
                                                            y: qr_invoice.centerImage ? null : qr_invoice.imageY,
                                                            excavate: qr_invoice.imageExcavate,
                                                        } : null
                                                    }
                                                    style={{
                                                        width: '100%',
                                                        height: '100%'
                                                    }}
                                                />

                                                <p
                                                    className="my-3 text-center"
                                                    style={{
                                                        lineHeight: '2',
                                                        color: '#6fbd0c'
                                                    }}
                                                >Invoice QR Code</p>

                                                <button
                                                    className="d-inline-block w-100 btn btn-primary rounded-0 border-0 py-2"
                                                    style={{
                                                        lineHeight: '2'
                                                    }}
                                                    onClick={this.downloadInvoiceQR}
                                                >
                                                    ဒေါင်းထားမည်
                                                </button>
                                            </div>
                                        </div> */}
                                    </div>
                                ) : (
                                    <>
                                        <div className="row">
                                            <div className="col-lg-6 mb-5 mb-lg-0">
                                                <Skeleton width={'100%'} height={600} />
                                            </div>
                                            <div className="col-lg-6">
                                                <Skeleton width={'100%'} height={600} />
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        
        return (                    
            <Layout>
                <div className="bg-light py-5">
                    <div className="container">
                        {
                            orderList ? (
                                <>
                                    {orderList}
                                </>
                            ) : (
                                <div className="d-table w-100 h-100">
                                    <div className="d-table-cell align-middle text-center" style={{ height: '100vh' , minHeight: '600px' }}>
                                        <p>
                                            <Translation>
                                                {(t) => <>{t('main.noOrder')}</>}
                                            </Translation> <br />
                                            <button 
                                                className="btn bg-transparent rounded-0 border-0 shadow-none text-primary"
                                                onClick={() => this.props.history.push('/')}
                                            >
                                                <Translation>
                                                    {(t) => <>{t('main.goShopping')}</>}
                                                </Translation>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            )
                        }

                        <div 
                            className="d-flex d-lg-none position-fixed bg-white p-3 border-top" 
                            style={{
                                left: '0',
                                right: '0',
                                bottom: '0',
                                zIndex: '9999'
                            }}
                        >
                            <div 
                                className="buy-btn mt-0 py-0 w-50 float-left bg-transparent mr-2 d-flex align-items-center justify-content-center"
                            >
                                <button 
                                    onClick={() => this.props.history.push('/')}
                                    className="btn d-block shadow-none py-1 w-100 text-white shop-btn text-uppercase rounded-0" 
                                    style={{ 
                                        background: '#0c0b10',
                                        height: '40px',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <span
                                        style={{
                                            background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            lineHeight: '2',
                                            display: 'inline-block',
                                            fontSize: '14px'
                                        }}
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.continueShopping')}</>}
                                        </Translation>
                                    </span>
                                </button>
                            </div>
                            <div 
                                className="buy-btn mt-0 w-50 float-left py-1 d-flex align-items-center justify-content-center text-white ml-2 btn-cart-hover" 
                                onClick={() => this.props.history.push('/track')}
                                style={{
                                    background: '#6fbd0c',
                                    cursor: 'pointer'
                                }}
                            >
                                <span
                                    style={{
                                        lineHeight: '2',
                                        fontSize: '14px'
                                    }}
                                >
                                    <Translation>
                                        {(t) => <>{t('main.search')}</>}
                                    </Translation>
                                </span>
                            </div>
                         
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default connect(null, {addOrder})(withRouter(CompletedOrder))