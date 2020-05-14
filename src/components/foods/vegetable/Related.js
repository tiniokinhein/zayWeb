import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FOODS } from '../../../api'
import { db } from '../../../firebase'
import { currency } from '../../../utils'
import { addProduct } from '../../../store/cart/actions'
import { withRouter } from 'react-router-dom'
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'
import Skeleton from 'react-loading-skeleton'
import { Translation } from 'react-i18next'



const FETCHIMG = process.env.REACT_APP_FETCH_IMAGES

class Related extends Component 
{
    static propTypes = {
        addProduct: PropTypes.func.isRequired
    }

    state = {
        items: [],
        isLoading: false
    }

    getItems = () => {
        db 
        .ref(FOODS)
        .orderByChild('category/title')
        .equalTo('ဟင်းသီးဟင်းရွက်')
        .on('value' , snapshot => {
            let data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })
            const allItems = data.reverse()

            this.setState({
                items: allItems,
                isLoading: true
            })
        })
    }

    componentDidMount() {
        this.getItems()
    }

    render() {

        const { items } = this.state

        const params = {
            spaceBetween: 15,
            loop: true,
            lazy: true,
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: true
            },
            breakpoints: {
                0: {
                    slidesPerView: 2
                },
                561: {
                    slidesPerView: 3
                },
                768: {
                    slidesPerView: 4
                },
                992: {
                    slidesPerView: 5
                },
                1200: {
                    slidesPerView: 6
                }
            },
        }

        const Lists = items.length ? (
            <>
                <h5
                    className="mt-0 mb-3 d-inline-block text-dark font-weight-bold"
                    style={{
                        fontSize: '18px',
                        lineHeight: '2'
                    }}
                >
                    <Translation>
                        {(t) => <>{t('main.relatedItems')}</>}
                    </Translation>
                </h5>

                <Swiper {...params}>
                    {
                        items.map((vegetable,index) => {

                            vegetable.quantity = 1

                            return(
                                <div 
                                    className="shadow-sm rounded bg-white h-100"
                                    key={index}
                                >
                                    <div className="position-relative">
                                        <img 
                                            src={FETCHIMG+`/${vegetable.image}`} 
                                            alt={vegetable.title} 
                                            className="w-100 rounded-top"
                                            onClick={() => this.props.history.push(`/vegetable/${vegetable.slug}`)}
                                            style={{
                                                height: '180px',
                                                objectFit: 'cover',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <div
                                            className="position-absolute text-white"
                                            style={{
                                                left: '0',
                                                bottom: '0',
                                                right: '0'
                                            }}
                                        >
                                            <div 
                                                className="px-2 pb-2 d-table w-100 font-weight-bold"
                                                style={{
                                                    color: '#000',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => this.props.history.push(`/vegetable/${vegetable.slug}`)}
                                            >
                                                <h6 
                                                    className="mt-3 mb-1 text-dark font-weight-bold"
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
                                                                    title_en: vegetable.title,
                                                                    title_mm: vegetable.title_mm
                                                                }
                                                                )}
                                                            </>
                                                        }
                                                    </Translation>
                                                </h6>
                                                <small 
                                                    className="float-left font-weight-bold pr-3 text-dark" 
                                                    style={{fontSize:'10px'}}
                                                >( {vegetable.weight} ) {vegetable.unit}</small>
                                                <small 
                                                    className="float-right font-weight-bold text-dark"
                                                    style={{
                                                        fontSize: '11px'
                                                    }}
                                                >{vegetable.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div 
                                        className="d-flex rounded-bottom"
                                        style={{
                                            background: '#6fbd0c'
                                        }}
                                    >
                                                                             
                                        <button
                                            className="btn-cart-hover btn border-0 flex-grow-1 py-2 text-white text-center d-inline-block rounded rounded-top-custom-none shadow-none"
                                            style={{
                                                background: '#6fbd0c',
                                                fontSize: '14px'
                                            }}
                                            onClick={() => this.props.addProduct(vegetable)}
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.list.addToCart')}</>}
                                            </Translation>
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Swiper>
            </>
        ) : (
            <>
                <div
                    className="mt-0 mb-3 px-0 d-inline-block"
                >
                    <Skeleton width={100} height={24} />
                </div>
                <div className="row mx-n2">
                    <div 
                        className="rounded col-6 col-md-4 col-lg-2 px-2"
                    >
                        <Skeleton height={217} />
                    </div>
                    <div 
                        className="rounded col-6 col-md-4 col-lg-2 px-2"
                    >
                        <Skeleton height={217} />
                    </div>
                    <div 
                        className="rounded d-none d-md-block d-lg-block col-md-4 col-lg-2 px-2"
                    >
                        <Skeleton height={217} />
                    </div>
                    <div 
                        className="rounded d-none d-lg-block col-lg-2 px-2"
                    >
                        <Skeleton height={217} />
                    </div>
                    <div 
                        className="rounded d-none d-lg-block col-lg-2 px-2"
                    >
                        <Skeleton height={217} />
                    </div>
                    <div 
                        className="rounded d-none d-lg-block col-lg-2 px-2"
                    >
                        <Skeleton height={217} />
                    </div>
                </div>
            </>
        )
        

        return (
            <>
                {Lists}
            </>
        )
    }
}

export default connect(null, {addProduct})(withRouter(Related))