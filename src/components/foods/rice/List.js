import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import Carousel from "react-multi-carousel"
// import "react-multi-carousel/lib/styles.css"
// import Spinner from '../../layout/Spinner'
import { withRouter } from 'react-router-dom'
import { fetchRices } from '../../../store/foods/actions'

import { FOODS } from '../../../api'
import { db } from '../../../firebase'
import { currency } from '../../../utils'
import { addProduct } from '../../../store/cart/actions'

import Skeleton from 'react-loading-skeleton'
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'
import { Translation } from 'react-i18next'


const FETCHIMG = process.env.REACT_APP_FETCH_IMAGES

class List extends React.Component 
{
    static propTypes = {
        fetchRices: PropTypes.func.isRequired,
        rices: PropTypes.array.isRequired,
        addProduct: PropTypes.func.isRequired
    }

    state = {
        rices: [],
        isLoading: false
    }

    handleFetchFoods = () => {
        db 
        .ref(FOODS)
        .orderByChild('category/title')
        .equalTo('ဆန်')
        .on('value' , snapshot => {
            let data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })
            const allItems = data.reverse()

            this.setState({
                rices: allItems,
                isLoading: true
            })
        })

    }

    componentDidMount() {
        this.handleFetchFoods()
    }

    render() {

        const { rices } = this.state

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

        const riceList = rices.length ? (
            <>
                <div
                    className="d-flex mb-2"
                >
                    <h5
                        className="mt-0 mb-0 text-dark font-weight-bold"
                        style={{
                            fontSize: '18px',
                            lineHeight: '2'
                        }}
                    >
                        <Translation>
                            {(t) => <>{t('main.list.rices')}</>}
                        </Translation>
                    </h5>
                    <div
                        className="text-dark ml-auto align-self-center cat-link-hover"
                        style={{
                            fontSize: '14px',
                            lineHeight: '2',
                            cursor: 'pointer'
                        }}
                        onClick={() => this.props.history.push('/category/rices')}
                    >
                        <Translation>
                            {(t) => <>{t('main.list.seeAll')}</>}
                        </Translation> &#10230;
                    </div>
                </div>

                <Swiper {...params}>
                    {
                        rices.map((rice,index) => {
                            rice.quantity = 1
                            return(
                                <div 
                                    className="shadow-sm rounded bg-white h-100"
                                    key={index}
                                >
                                    <div className="position-relative">
                                        <img 
                                            src={FETCHIMG+`/${rice.image}`}
                                            alt={rice.title} 
                                            className="w-100 rounded-top"
                                            style={{
                                                height: '180px',
                                                objectFit: 'cover',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => this.props.history.push(`/rice/${rice.slug}`)}
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
                                                onClick={() => this.props.history.push(`/rice/${rice.slug}`)}
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
                                                                    title_en: rice.title,
                                                                    title_mm: rice.title_mm
                                                                }
                                                                )}
                                                            </>
                                                        }
                                                    </Translation>  
                                                </h6>
                                                <small 
                                                    className="float-left font-weight-bold pr-3" 
                                                    style={{fontSize:'10px'}}
                                                >( {rice.weight} ) {rice.unit}</small>
                                                <small 
                                                    className="float-right font-weight-bold"
                                                    style={{
                                                        fontSize: '11px'
                                                    }}
                                                >{rice.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="btn-cart-hover btn border-0 w-100 py-2 text-white text-center d-inline-block rounded rounded-top-custom-none shadow-none"
                                        style={{
                                            background: '#6fbd0c',
                                            fontSize: '14px'
                                        }}
                                        onClick={() => this.props.addProduct(rice)}
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.list.addToCart')}</>}
                                        </Translation>
                                    </button>
                                </div>
                            ) 
                        })
                    }
                </Swiper>
            </>
        ) : (
            <>
                <div 
                    className="d-flex mb-2"
                >
                    <div
                        className="mt-0 mb-0"
                    >
                        <Skeleton width={100} height={28} />
                    </div>
                    <div
                        className="ml-auto"
                    >
                        <Skeleton width={108} height={28} />
                    </div>
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
        

        return(
            <div className="pt-3">
                {riceList}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    rices: state.foods.rices
})

export default connect(mapStateToProps , {fetchRices,addProduct})(withRouter(List))