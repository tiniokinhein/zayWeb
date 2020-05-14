import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter , Link } from 'react-router-dom'
import { ORDERURL } from '../api'
import { db } from '../firebase'
import { removeOrder } from '../store/order/actions'
import { currency } from '../utils'
import Moment from 'react-moment'
import 'moment-timezone'
import Modal from 'react-modal'
import { Translation } from 'react-i18next'
import Layout from '../components/layout/Layout'
import { IoMdArrowBack } from 'react-icons/io'
import { RiDeleteBinLine } from 'react-icons/ri'
import Skeleton from 'react-loading-skeleton'

const FETCHIMG = process.env.REACT_APP_FETCH_IMAGES

class OrderID extends Component 
{
    state = {
        p: null,
        show: false
    }

    getOrder = () => {
        const id = this.props.match.params.id
        db 
        .ref(ORDERURL+`/${id}`)
        .on('value', snapshot => {
            const data = snapshot.val()
            this.setState({
                p: data
            })
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

    componentDidMount() {
        this.getOrder()
        window.scrollTo(0,0)
    }

    render() {

        const { p , show } = this.state

        const deleteStyle = {
            content : {
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                background: 'transparent',
                backgroundColor: 'transparent',
                border: '0',
                padding: '0',
                borderRadius: '0'
            }
        }

        const lists = p ? (
            <div className="row">
                <div className="col-12 col-lg-6 mb-5 mb-lg-0">
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
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <tbody
                                style={{
                                    fontSize: '0.9rem'
                                }}
                            >
                                <tr
                                    style={{
                                        height: '60px'
                                    }}
                                >
                                    <td
                                        className="align-middle px-3"
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.orderDate')}</>}
                                        </Translation>
                                    </td>
                                    <td
                                        className="align-middle px-3"
                                    >
                                        <small className="text-dark font-weight-bold">
                                            <Moment format="D MMMM YYYY, h:mm a">
                                                {p.checkout.contact.dateRaw}
                                            </Moment>
                                        </small>
                                    </td>
                                </tr>
                                <tr
                                    style={{
                                        height: '60px'
                                    }}
                                >
                                    <td
                                        className="align-middle px-3"
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.orderNo')}</>}
                                        </Translation>
                                    </td>
                                    <td
                                        className="align-middle px-3"
                                    >
                                        <small className="text-success font-weight-bold">{p.id}</small>
                                    </td>
                                </tr>
                                <tr
                                    style={{
                                        height: '60px'
                                    }}
                                >
                                    <td
                                        className="align-middle px-3"
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.payment')}</>}
                                        </Translation>
                                    </td>
                                    <td
                                        className="align-middle px-3"
                                    >
                                        <small className="text-dark font-weight-bold">{p.checkout.payment}</small>
                                    </td>
                                </tr>
                                <tr
                                    style={{
                                        height: '60px'
                                    }}
                                >
                                    <td
                                        className="align-middle px-3"
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.deliveryTime')}</>}
                                        </Translation>
                                    </td>
                                    <td
                                        className="align-middle px-3"
                                    >
                                        <small className="text-dark font-weight-bold">
                                            {p.products.delivery}<br />
                                            <span style={{fontSize:'9px'}}>
                                                (
                                                    <Moment 
                                                        format="D MMMM YYYY , h:mm a"
                                                    >
                                                        {p.checkout.contact.dateRaw}
                                                    </Moment> 
                                                )
                                            </span>
                                        </small>
                                    </td>
                                </tr>
                                <tr
                                >
                                    <td
                                        className="align-middle px-3 py-4"
                                        colSpan="2"
                                        style={{
                                            lineHeight: '2'
                                        }}
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.addressDetails')}</>}
                                        </Translation><br />
                                        <small className="text-dark font-weight-bold d-inline-block mt-2">
                                            {
                                                p.checkout.contact.name &&
                                                <>{p.checkout.contact.name}<br /></>
                                            }
                                            {
                                                p.checkout.contact.email &&
                                                <>{p.checkout.contact.email}<br /></>
                                            }
                                            {
                                                p.checkout.contact.phone &&
                                                <>{p.checkout.contact.phone}<br /></>
                                            }
                                            {
                                                p.checkout.contact.address &&
                                                <>{p.checkout.contact.address}</>
                                            }
                                        </small>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-12 col-lg-6 mb-5 mb-lg-0">
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
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <tbody
                                style={{
                                    fontSize: '0.9rem'
                                }}
                            >
                                {
                                    p.products.orderItems.map((po, index) => (
                                        <tr
                                            key={index}
                                        >
                                            <td
                                                className="p-3"
                                                style={{
                                                    lineHeight: '2'
                                                }}
                                            >
                                                <div className="d-flex">
                                                    <div className="pr-2">
                                                        <img
                                                            src={FETCHIMG+`/${po.image}`}
                                                            alt={po.title}
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
                                                                            title_en: po.title,
                                                                            title_mm: po.title_mm
                                                                        }
                                                                        )}
                                                                    </>
                                                                }
                                                            </Translation> 
                                                        </h6>
                                                        <small 
                                                            className="font-weight-bold" 
                                                            style={{fontSize:'10px'}}
                                                        >( {po.weight} {po.unit} )</small>
                                                        <div
                                                            className="pt-0"
                                                        >
                                                            <h5 
                                                                className="m-0 font-weight-bold"
                                                                style={{
                                                                    fontSize: '14px'
                                                                }}
                                                            >{po.price} {currency}</h5> 
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
                                                                    </Translation> - <strong className="font-weight-bold">( {po.quantity} )</strong>
                                                                </small>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <small className="font-weight-light">
                                                                <Translation>
                                                                    {(t) => <>{t('main.itemPrice')}</>}
                                                                </Translation> - <strong className="font-weight-bold">{po.price} {currency}</strong>
                                                            </small>
                                                        </div>
                                                        <div>
                                                            <small className="font-weight-light">
                                                                <Translation>
                                                                    {(t) => <>{t('main.subtotal')}</>}
                                                                </Translation> - <strong className="font-weight-bold">{po.item_total} {currency}</strong>
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td
                                        className="py-4 px-3"
                                        style={{
                                            lineHeight: '2'
                                        }}
                                    >
                                        <div 
                                            className="d-flex"
                                            style={{
                                                lineHeight: '2'
                                            }}
                                        >
                                            <div className="text-dark">
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
                                                    </Translation> <small className="font-weight-bold">( {p.products.delivery} )</small>
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
                                            <div className="ml-auto text-right text-dark">
                                                <p
                                                    className="font-weight-light mb-0"
                                                    style={{
                                                        fontSize: '14px',
                                                        lineHeight: '2'
                                                    }}
                                                >
                                                    {p.products.subtotal} {currency}
                                                </p>
                                                <p
                                                    className="font-weight-light mb-0"
                                                    style={{
                                                        fontSize: '14px',
                                                        lineHeight: '2'
                                                    }}
                                                >
                                                    {
                                                        p.products.delivery_fee === '0' ? (
                                                            <>
                                                                <Translation>
                                                                    {(t) => <>{t('main.deliveryFreeShipping')}</>}
                                                                </Translation>
                                                            </>
                                                        ) : (
                                                            <><small>( + )</small> {p.products.delivery_fee} {currency}</>
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
                                                    <small>( - )</small> {p.products.discount_price} {currency}
                                                </p>
                                                <p
                                                    className="font-weight-bold mb-0 mt-2"
                                                    style={{
                                                        fontSize: '16px',
                                                        lineHeight: '2',
                                                        letterSpacing: '0.5px'
                                                    }}
                                                >
                                                    {p.products.total} {currency}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        ) : (
            <>
                <div className="row">
                    <div className="col-12 col-lg-6 mb-5 mb-lg-0">
                        <Skeleton width={'100%'} height={500} />
                    </div>
                    <div className="col-12 col-lg-6 mb-5 mb-lg-0">
                        <Skeleton width={'100%'} height={500} />
                    </div>
                </div>
            </>
        )

        const openModalList = 
            <Modal
                isOpen={show}
                contentLabel="ဖိုင်ဖျက်မည်"
                onRequestClose={this.closeModal}
                style={deleteStyle}
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
                                {(t) => <>{t('main.orderDelete')}</>}
                            </Translation>
                            <div
                                className="mt-4"
                            >
                                <button
                                    className="btn btn-danger border-0 rounded-sm shadow-none text-white px-3 py-2"
                                    style={{
                                        lineHeight: '2'
                                    }}
                                    onClick={() => {
                                        this.props.removeOrder()
                                        this.props.history.push('/track')
                                        this.closeModal()
                                    }}
                                >
                                    <Translation>
                                        {(t) => <>{t('main.orderDeleteYes')}</>}
                                    </Translation>
                                </button>
                                <button
                                    className="btn btn-primary border-0 rounded-sm shadow-none text-white px-3 py-2 ml-4"
                                    style={{
                                        lineHeight: '2'
                                    }}
                                    onClick={this.closeModal}
                                >
                                    <Translation>
                                        {(t) => <>{t('main.orderDeleteNo')}</>}
                                    </Translation>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

        return (
            <Layout>
                <div className="bg-light pt-3 pb-5">
                    <div className="container">
                        <div
                            className="mb-5"
                        >
                            <Link
                                to="/track"
                                className="text-white bg-dark text-decoration-none d-inline-block w-48-btn-hover rounded-circle text-center"
                                style={{
                                    fontSize: '1.6rem',
                                    width: '40px',
                                    height: '40px'
                                }}
                            >
                                <IoMdArrowBack />
                            </Link>
                            <button
                                onClick={this.showModal}
                                className="float-right d-inline-block rounded-circle text-center btn p-0 shadow-none text-light btn-danger"
                                style={{
                                    width: '40px',
                                    height: '40px'
                                }}
                            >
                                <RiDeleteBinLine
                                    style={{
                                        fontSize:'1.1rem'
                                    }}
                                />
                            </button>
                        </div>
                        {lists} 
                        {openModalList} 
                    </div>
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    orderIDs: state.order
})

export default connect(mapStateToProps, {removeOrder})(withRouter(OrderID))