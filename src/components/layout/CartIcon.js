import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter , Link } from 'react-router-dom'
import { FaShoppingBasket } from 'react-icons/fa'

class CartIcon extends Component 
{

    openCart = () => {
        document.getElementById('cartOpen').style.right = '0'
    }

    render() {

        const { cartTotal } = this.props

        return (
            <div
                className="text-center position-relative w-48-btn-hover rounded-circle"
                style={{
                    width: '48px',
                    height: '48px',
                    lineHeight: '48px'
                }}
            >
                <Link
                    style={{
                        fontSize:'23px',
                        color:'#6fbd0c',
                        cursor: 'pointer',
                        height: '48px'
                    }}
                    className="d-flex"
                    to="/cart"
                >
                    <span
                        className="mx-auto d-flex align-self-center mb-0"
                    ><FaShoppingBasket /></span>
                    
                    {
                        cartTotal.productQuantity <= 0 ? (
                            <></>
                        ) : (
                            <span 
                                style={{
                                    fontSize:'8px',
                                    color: '#f8f9fa',
                                    right: '-5px',
                                    top: '-2px',
                                    lineHeight: '24px',
                                    display: 'inline-block',
                                    zIndex: '9999',
                                    height: '24px',
                                    width: '24px',
                                    background: '#000'
                                }}
                                className="font-weight-bold position-absolute rounded-circle"
                            >
                                <span 
                                    className="d-inline-block"
                                >{cartTotal.productQuantity}</span>
                            </span>
                        )
                    }

                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cartTotal: state.total.data
})

export default connect(mapStateToProps)(withRouter(CartIcon))
