import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { currency } from '../utils'
import { Translation } from 'react-i18next'

class OrderItems extends Component 
{
    static propTypes = {
        product: PropTypes.object.isRequired,
        changeProductQuantity: PropTypes.func.isRequired
    }

    state = {
        product: this.props.product
    }

    handleOnIncrease = () => {
        const { changeProductQuantity } = this.props
        const { product } = this.state
        product.quantity = product.quantity + 1
        changeProductQuantity(product)
    }

    handleOnDecrease = () => {
        const { changeProductQuantity } = this.props
        const { product } = this.state
        product.quantity = product.quantity - 1
        changeProductQuantity(product)
    }

    totalPrice = productTotal => {
        const { product } = this.state
        productTotal = product.price * product.quantity
        return productTotal
    }

    render() {
        const { product } = this.state

        return (
            <div
                className="py-3 bg-white shadow-none rounded-0 border-top"
            >
                <div className="d-flex">
                    <div
                        className="align-self-center flex-grow-1 pr-2"
                    >
                        <h6 
                            className="m-0 pb-1 text-dark font-weight-light"
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
                                            title_en: product.title,
                                            title_mm: product.title_mm
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
                            >( {product.weight} {product.unit} )</small>
                        </div>
                        <div
                            className="pt-2"
                        >
                            <h5 
                                className="m-0 font-weight-bold"
                                style={{
                                    fontSize: '14px'
                                }}
                            >{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}</h5> 
                        </div>
                    </div>
                    <div
                        className="align-self-center ml-auto mr-3 text-right d-flex flex-column"
                    >
                        <div className="d-flex mb-2 ml-auto">
                            <button 
                                className="border-0 change-product-button shadow-none rounded-circle text-white font-weight-bold" 
                                onClick={this.handleOnIncrease}
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    background: '#6fbd0c'
                                }}
                            >+</button>
                            <div className="flex-grow px-2 align-self-center">
                                <small
                                    className="text-dark font-weight-bold"
                                >{product.quantity}</small>
                            </div>
                            <button 
                                className="border-0 change-product-button shadow-none rounded-circle text-white disabled-button-1 font-weight-bold" 
                                onClick={this.handleOnDecrease} 
                                disabled={product.quantity === 1 ? true : false}
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    background: '#6fbd0c'
                                }}
                            >-</button>
                        </div>
                        <div>
                            <small>
                                <Translation>
                                    {(t) => <>{t('main.subtotal')}</>}
                                </Translation> - &nbsp;
                                <strong>{this.totalPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}</strong>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderItems