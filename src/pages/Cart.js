import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ShoppingCart from '../components/shoppingCart/ShoppingCart'
import { Translation } from 'react-i18next'
import Layout from '../components/layout/Layout'


class Cart extends Component 
{
    componentDidMount() {
        window.scrollTo(0,0)
    }

    render() {

        const { cartTotal } = this.props

        return (
            <Layout>
                <div className="py-5 bg-light">
                    <div className="container">
                        <h4
                            className="font-weight-bold mb-3"
                            style={{
                                lineHeight: '2',
                                letterSpacing: '0.5px'
                            }}
                        >
                            {
                                cartTotal.productQuantity <= 0 ? (
                                    <>
                                        <Translation>
                                            {(t) => <>{t('main.cartEmpty')}</>}
                                        </Translation>
                                    </>
                                ) : (
                                    <>
                                        <Translation>
                                            {(t) => <>{t('main.shoppingCart')}</>}
                                        </Translation>
                                    </>
                                )
                            }
                        </h4>
                        <ShoppingCart />
                    </div>
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    cartTotal: state.total.data
})

export default connect(mapStateToProps)(withRouter(Cart))