import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { currency } from '../../utils'
import { IoMdTrash } from 'react-icons/io'
import { Translation } from 'react-i18next'


const FETCHIMG = process.env.REACT_APP_FETCH_IMAGES

export default class ShoppingCartProducts extends Component 
{
    static propTypes = {
        product: PropTypes.object.isRequired,
        removeProduct: PropTypes.func.isRequired,
        changeProductQuantity: PropTypes.func.isRequired
    }

    state = {
        product: this.props.product,
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

    removeItem = product => {
        const { removeProduct } = this.props
        removeProduct(product)
    }

    render() {
        const { product } = this.state

        return (
            <div
                className="my-3 py-3 border-top"
            >
                <div className="d-flex">
                    <div className="pr-0">
                        <img
                            src={FETCHIMG+`/${product.image}`}
                            alt={product.title}
                            className="rounded-left mr-3"
                            style={{
                                width: '100px'
                            }}

                        />
                    </div>
                    <div
                        className="align-self-center flex-grow-1"
                    >
                        <h6 
                            className="m-0 pb-1 text-dark font-weight-light"
                            style={{
                                fontSize: '15px'
                            }}
                        >
                            <Translation>
                                {
                                    (t) => 
                                    <>
                                        {
                                            t(
                                                'main.post.title', 
                                                {
                                                    title_en: product.title,
                                                    title_mm: product.title_mm
                                                }
                                            )
                                        }
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
                        className="align-self-center"
                    >
                        <div className="d-flex cart-wrapper">
                            <button 
                                className="border-0 text-white rounded-circle shadow-none p-0 m-0" 
                                onClick={this.handleOnIncrease}
                                style={{
                                    background: '#6fbe0b',
                                    width: '30px',
                                    height: '30px'
                                }}
                            >+</button>
                            <p 
                                className="px-2 text-center my-0"
                                style={{
                                    lineHeight: '30px'
                                }}
                            >
                                <small className="font-weight-bold">{product.quantity}</small>
                            </p>
                            <button 
                                className="border-0 text-white rounded-circle shadow-none p-0 m-0" 
                                onClick={this.handleOnDecrease} 
                                disabled={product.quantity === 1 ? true : false}
                                style={{
                                    background: '#6fbe0b',
                                    width: '30px',
                                    height: '30px'
                                }}
                            >-</button>
                        </div>
                        <div
                            className="text-right text-danger mt-2"
                            onClick={this.removeItem.bind(this,product)}
                            style={{
                                cursor: 'pointer',
                                fontSize: '1.5rem'
                            }}
                        >
                            <IoMdTrash />
                        </div>
                    </div>
                </div>
            </div>
        )
    }                       
}
