import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { 
    Tab, 
    Tabs, 
    TabList, 
    TabPanel
} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Moment from 'react-moment'
import 'moment-timezone'
import { removeOrder } from '../store/order/actions'
import { Translation } from 'react-i18next'
import Layout from '../components/layout/Layout'
import { db } from '../firebase'
import { ORDERURL } from '../api'
import { IoIosSearch , IoIosClose } from 'react-icons/io'
import { GoNote } from 'react-icons/go'


class TrackID extends Component 
{
    static propTypes = {
        removeOrder: PropTypes.func.isRequired
    }

    state = {
        orderID : '',
        orders: []
    }

    resetForm = () => {
        this.setState({
            orderID: ''
        })
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    getOrderID = () => {
        const id = this.state.orderID

        db 
        .ref(ORDERURL+`/${id}`)
        .on('value' , snapshot => {
            const data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })
            this.setState({
                orders: data
            })
        })
    }

    componentDidMount() {
        this.getOrderID()
        window.scrollTo(0,0)
    }

    render() {

        const { orders } = this.state

        const { orderIDs } = this.props

        const ordersData = orders.filter(p => {
            return p.id.toLowerCase().indexOf(this.state.orderID.toLowerCase()) !== -1
        })

        const orderIDdata = orderIDs.filter(p => {
            return p.id.toLowerCase().indexOf(this.state.orderID.toLowerCase()) !== -1
        })

        const searchOrders = 
            <div className="border-bottom mb-0 pb-5">
                <h4
                    className="mb-0 align-self-center font-weight-bold text-uppercase"
                    style={{
                        fontSize: '1.8rem',
                        lineHeight: '2',
                        letterSpacing: '-0.5px'
                    }}
                >Track <small className="" style={{fontSize:'12px',textTransform:'none'}}>by</small></h4>
                <div
                    className="d-flex col-12 col-md-6 px-0" 
                >
                    <div className="field-group flex-grow-1 position-relative">
                        <input
                            autoComplete="off"
                            type="text"
                            name="orderID"
                            value={this.state.orderID}
                            onChange={this.handleOnChange.bind(this)}
                            className="form-control border-dark bg-transparent text-dark shadow-none px-3 font-weight-normal"
                            style={{
                                height: '50px',
                                lineHeight: '2',
                                borderRadius: '50px',
                                borderTopRightRadius: '0',
                                borderBottomRightRadius: '0',
                                width: '100%'
                            }}
                            placeholder="ORDER ID"
                        />
                        {
                            this.state.orderID.length >= 3 ? (
                                <div 
                                    className="input-group-prepend position-absolute bg-transparent border-0 shadow-none rounded-0 p-0"
                                    style={{
                                        right: '0',
                                        top: '0',
                                        bottom: '0',
                                        zIndex: '99'
                                    }}
                                >
                                    <button 
                                        className="p-0 border-0 shadow-none rounded-0 bg-transparent text-center text-danger"
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            fontSize: '30px',
                                            lineHeight: '30px'
                                        }}
                                        onClick={this.resetForm.bind(this)}
                                    >
                                        <IoIosClose />
                                    </button>
                                </div>
                            ) : null
                        }
                    </div>
                    <div className="field-group">
                        <button
                            className="btn btn-dark border-dark shadow-none text-white px-4"
                            style={{
                                height: '50px',
                                borderRadius: '50px',
                                borderTopLeftRadius: '0',
                                borderBottomLeftRadius: '0',
                                fontSize: '30px',
                                lineHeight: '25px'
                            }}
                            type="submit"
                            onSubmit={this.getOrderID.bind(this)}
                        >
                            <IoIosSearch />
                        </button>
                    </div>
                </div>
            </div>

        const searchOrderID =
            <div className="border-bottom mb-0 pb-5">
                <h4
                    className="mb-0 align-self-center font-weight-bold text-uppercase"
                    style={{
                        fontSize: '1.8rem',
                        lineHeight: '2',
                        letterSpacing: '-0.5px'
                    }}
                >Track <small className="" style={{fontSize:'12px',textTransform:'none'}}>by</small></h4>
                <div
                    className="d-flex col-12 col-md-6 px-0" 
                >
                    <div className="field-group flex-grow-1 position-relative">
                        <input
                            autoComplete="off"
                            type="text"
                            name="orderID"
                            value={this.state.orderID}
                            onChange={this.handleOnChange.bind(this)}
                            className="form-control border-dark bg-transparent text-dark shadow-none px-3 font-weight-normal"
                            style={{
                                height: '50px',
                                lineHeight: '2',
                                borderRadius: '50px',
                                borderTopRightRadius: '0',
                                borderBottomRightRadius: '0',
                                width: '100%'
                            }}
                            placeholder="ORDER ID"
                        />
                        {
                            this.state.orderID.length >= 3 ? (
                                <div 
                                    className="input-group-prepend position-absolute bg-transparent border-0 shadow-none rounded-0 p-0"
                                    style={{
                                        right: '0',
                                        top: '0',
                                        bottom: '0',
                                        zIndex: '99'
                                    }}
                                >
                                    <button 
                                        className="p-0 border-0 shadow-none rounded-0 bg-transparent text-center text-danger"
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            fontSize: '30px',
                                            lineHeight: '30px'
                                        }}
                                        onClick={this.resetForm.bind(this)}
                                    >
                                        <IoIosClose />
                                    </button>
                                </div>
                            ) : null
                        }
                    </div>
                    <div className="field-group">
                        <button
                            className="btn btn-dark border-dark shadow-none text-white px-4"
                            style={{
                                height: '50px',
                                borderRadius: '50px',
                                borderTopLeftRadius: '0',
                                borderBottomLeftRadius: '0',
                                fontSize: '30px',
                                lineHeight: '25px'
                            }}
                        >
                            <IoIosSearch />
                        </button>
                    </div>
                </div>
            </div>             

        const orderList = orderIDdata.length ? (
            <>
                {
                    orderIDdata.map(p => (
                        <Link
                            to={`/order/${p.id}`}
                            className="text-dark text-decoration-none mb-3 p-3 d-block bg-white shadow-hover rounded-sm"
                            key={p.id}
                            style={{
                                transition: '0.3s ease-in-out',
                            }}
                        >
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <small 
                                        className="text-dark"
                                        style={{
                                            fontSize: '9px'
                                        }}
                                    >
                                        <Moment
                                            format="D MMMM YYYY , h:mm a"
                                        >
                                            {p.checkout.contact.dateRaw}
                                        </Moment>
                                    </small>
                                    <h2
                                        className="font-weight-bold mb-0"
                                        style={{
                                            color: '#000',
                                            fontSize: '15px',
                                            lineHeight: '2'
                                        }}
                                    >{p.id}</h2> 
                                </div>
                                <div 
                                    className="text-success"
                                    style={{
                                        fontSize: '1.6rem',
                                        lineHeight: '1.8em'
                                    }}
                                >
                                    <GoNote />
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </>
        ) : (
            <>
            </>
        )

        const invoiceList = orderIDs.length ? (
            <>
                {
                    orderIDdata.map(p => (
                        <Link
                            to={`/invoice/${p.id}`}
                            className="text-dark text-decoration-none mb-3 p-3 d-block bg-white shadow-hover rounded-sm"
                            key={p.id}
                            style={{
                                transition: '0.3s ease-in-out',
                            }}
                        >
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <small 
                                        className="text-dark"
                                        style={{
                                            fontSize: '9px'
                                        }}
                                    >
                                        <Moment
                                            format="D MMMM YYYY , h:mm a"
                                        >
                                            {p.checkout.contact.dateRaw}
                                        </Moment>
                                    </small>
                                    <h2
                                        className="font-weight-bold mb-0"
                                        style={{
                                            color: '#000',
                                            fontSize: '15px',
                                            lineHeight: '2'
                                        }}
                                    >{p.invoice_number}</h2> 
                                </div>
                                <div 
                                    className="text-success"
                                    style={{
                                        fontSize: '1.6rem',
                                        lineHeight: '1.8em'
                                    }}
                                >
                                    <GoNote />
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </>
        ) : (
            <>
            </>
        )   
        
        const tabOrders =
            <>
                {searchOrders}
                <div className="d-flex mb-5">
                    <Tabs className="w-100">
                        <TabList
                            className="list-unstyled col-4 col-lg-3 px-0 float-left d-flex flex-column search-tab-wrap mb-0"
                        >
                            <div className="py-3 mb-3 border-bottom">
                                <h4
                                    className="text-dark mb-0"
                                    style={{
                                        fontSize: '1.2rem',
                                        lineHeight: '2',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    <Translation>
                                        {(t) => <>{t('main.track.lists')}</>}
                                    </Translation>
                                </h4>
                            </div>
                            <Tab
                                className="p-0 border-0 rounded-0 shadow-none bg-transparent"
                                style={{
                                    lineHeight: '2.5',
                                    cursor: 'pointer'
                                }}
                            >
                                <Translation>
                                    {(t) => <>{t('main.orders')}</>}
                                </Translation>
                            </Tab>
                        </TabList>
                        <TabPanel className="col-8 col-lg-9 px-0 float-left border-left">
                            <div className="py-3 mb-3 border-bottom">
                                <h4
                                    className="text-dark mb-0 pl-3 pl-lg-4"
                                    style={{
                                        fontSize: '1.2rem',
                                        lineHeight: '2',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    <Translation>
                                        {(t) => <>{t('main.orders')}</>}
                                    </Translation>
                                </h4>
                            </div>
                            <div className="px-3 mb-3">

                                {
                                    this.state.orderID.length <= 14 ? (
                                        <div 
                                            className="d-table w-100"
                                            style={{
                                                height: '150px'
                                            }}
                                        >
                                            <div className="d-table-cell align-middle">
                                                <p
                                                    className="text-center mb-0 text-dark"
                                                    style={{
                                                        fontSize: '14px',
                                                        lineHeight: '2'
                                                    }}
                                                >
                                                    <Translation>
                                                        {(t) => <>{t('main.noOrder')}</>}
                                                    </Translation>
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {
                                                ordersData.map(p => (
                                                    <Link
                                                        to={`/order/${p.id}`}
                                                        className="text-dark text-decoration-none mb-3 p-3 d-block bg-white shadow-hover rounded-sm"
                                                        key={p.id}
                                                        style={{
                                                            transition: '0.3s ease-in-out',
                                                        }}
                                                    >
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1">
                                                                <small 
                                                                    className="text-dark"
                                                                    style={{
                                                                        fontSize: '9px'
                                                                    }}
                                                                >
                                                                    <Moment
                                                                        format="D MMMM YYYY , h:mm a"
                                                                    >
                                                                        {p.checkout.contact.dateRaw}
                                                                    </Moment>
                                                                </small>
                                                                <h2
                                                                    className="font-weight-bold mb-0"
                                                                    style={{
                                                                        color: '#000',
                                                                        fontSize: '15px',
                                                                        lineHeight: '2'
                                                                    }}
                                                                >{p.id}</h2> 
                                                            </div>
                                                            <div 
                                                                className="text-success"
                                                                style={{
                                                                    fontSize: '1.6rem',
                                                                    lineHeight: '1.8em'
                                                                }}
                                                            >
                                                                <GoNote />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))
                                            }
                                        </>
                                    )
                                }

                            </div>
                        </TabPanel>
                    </Tabs>                           
                </div>
            </>

        const tabOrderId =
            <>
                {searchOrderID}
                <div className="d-flex mb-5">
                    <Tabs className="w-100">
                        <TabList
                            className="list-unstyled col-4 col-lg-3 px-0 float-left d-flex flex-column search-tab-wrap mb-0"
                        >
                            <div className="py-3 mb-3 border-bottom">
                                <h4
                                    className="text-dark mb-0"
                                    style={{
                                        fontSize: '1.2rem',
                                        lineHeight: '2',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    <Translation>
                                        {(t) => <>{t('main.track.lists')}</>}
                                    </Translation>
                                </h4>
                            </div>
                            <Tab
                                className="p-0 border-0 rounded-0 shadow-none bg-transparent"
                                style={{
                                    lineHeight: '2.5',
                                    cursor: 'pointer'
                                }}
                            >
                                <Translation>
                                    {(t) => <>{t('main.orders')}</>}
                                </Translation>
                            </Tab>
                            <Tab
                                className="p-0 border-0 rounded-0 shadow-none bg-transparent"
                                style={{
                                    lineHeight: '2.5',
                                    cursor: 'pointer'
                                }}
                            >Invoices</Tab>
                        </TabList>
                        <TabPanel className="col-8 col-lg-9 px-0 float-left border-left">
                            <div className="py-3 mb-3 border-bottom">
                                <h4
                                    className="text-dark mb-0 ml-3"
                                    style={{
                                        fontSize: '1.2rem',
                                        lineHeight: '2',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    <Translation>
                                        {(t) => <>{t('main.orders')}</>}
                                    </Translation>
                                </h4>
                            </div>
                            <div className="pl-3 mb-3">
                                {orderList}
                            </div>
                        </TabPanel>
                        <TabPanel className="col-8 col-lg-9 px-0 float-left border-left">
                            <div className="py-3 mb-3 border-bottom">
                                <h4
                                    className="text-dark mb-0 ml-3"
                                    style={{
                                        fontSize: '1.2rem',
                                        lineHeight: '2',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis'
                                    }}
                                >Invoices</h4>
                            </div>
                            <div className="pl-3 mb-3">
                                {invoiceList}
                            </div>
                        </TabPanel>
                    </Tabs>                          
                </div>
            </>

        return (
            <Layout>
                <div className="bg-light py-5">
                    <div className="container">
                        {
                            orderIDs.length <= 0 ? (
                                <>{tabOrders}</>
                            ) : (
                                <>{tabOrderId}</>
                            )
                        }
                    </div>
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    orderIDs: state.order
})

export default connect(mapStateToProps, {removeOrder})(withRouter(TrackID))