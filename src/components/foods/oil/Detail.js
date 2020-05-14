import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FOODS } from '../../../api'
import { db } from '../../../firebase'
import { currency } from '../../../utils'
import Related from './Related'
import { withRouter } from 'react-router-dom'
import { addProduct } from '../../../store/cart/actions'
import Skeleton from 'react-loading-skeleton'
import { Translation } from 'react-i18next'
import Layout from '../../../components/layout/Layout'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { FiTruck } from 'react-icons/fi'
import { GrFormNext } from 'react-icons/gr'
import Categories from '../../layout/Categories'


const FETCHIMG = process.env.REACT_APP_FETCH_IMAGES

class Detail extends Component 
{
    static propTypes = {
        addProduct: PropTypes.func.isRequired,
    }

    state = {
        p: null,
        isLoading: false
    }

    getPDetail = () => {
        const slug = this.props.match.params.slug
        db
        .ref(FOODS+`/${slug}`)
        .on('value' , snapshot => {
            const data = snapshot.val()
            this.setState({
                p: {
                    ...data,
                    quantity: 1
                },
                isLoading: true
            })
        })
    }

    componentDidMount() {
        this.getPDetail()
        window.scrollTo(0,0)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.slug !== this.props.match.params.slug) {
            this.getPDetail()
            window.scrollTo(0,0)
        }
    }

    render() {

        const { p } = this.state

        const pDetail = p ? (
                        <div 
                            key={p.slug} 
                            id="pDetail"
                            className="pt-3 pb-5" 
                        >
                            <span
                                className="font-weight-light cat-link-hover"
                                onClick={() => this.props.history.push('/category/oils')}
                                style={{
                                    fontSize: '16px',
                                    lineHeight: '2',
                                    color: '000',
                                    letterSpacing: '0.5px',
                                    cursor: 'pointer'
                                }}
                            >
                                <Translation>
                                    {(t) => <>{t('main.list.oils')}</>}
                                </Translation>
                            </span>&nbsp; 
                            <span 
                                className="text-muted"
                            >
                                <GrFormNext />
                            </span>&nbsp;
                            <span
                                style={{
                                    fontSize: '16px',
                                    lineHeight: '2',
                                    color: '#6fbe0b',
                                    letterSpacing: '0.5px'
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
                            </span>
                            
                            <div
                                className="row" 
                            >
                                <div className="text-center col-12 col-sm-6 col-lg-7">
                                    <div className="post-detail-img-over">
                                        <Zoom>
                                            <picture>
                                                <source 
                                                    media="(max-width: 1200px)" 
                                                    srcSet={FETCHIMG+`/${p.image}`} 
                                                />
                                                <img
                                                    alt={p.title} 
                                                    src={FETCHIMG+`/${p.image}`} 
                                                    style={{
                                                        width: '400px',
                                                        maxWidth: '100%'
                                                    }}
                                                />
                                            </picture>
                                        </Zoom>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-5 mt-4 mt-sm-0">
                                    <small
                                        style={{
                                            fontSize: '10px',
                                            lineHeight: '2',
                                            letterSpacing: '0.5px'
                                        }}
                                        className="text-info"
                                    >
                                        {p.category.title}
                                    </small>
                                    <h6 
                                        className="mt-n2 mb-n3 font-weight-light"
                                        style={{
                                            fontSize: '30px',
                                            lineHeight: '2',
                                            letterSpacing: '0.5px'
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
                                    <small 
                                        className="font-weight-light" 
                                        style={{
                                            fontSize:'10px',
                                            lineHeight: '2',
                                            letterSpacing: '0.5px'
                                        }}
                                    >( {p.weight} ) {p.unit}</small>

                                    {
                                        p.description &&
                                        <div className="py-3">
                                            <p 
                                                className="mb-0 text-secondary"
                                                style={{
                                                    lineHeight: '2',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                {p.description}
                                            </p>
                                        </div>
                                    }

                                    <div className="my-4">
                                        <small 
                                            className="font-weight-bold"
                                            style={{
                                                fontSize: '16px'
                                            }}
                                        >{p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}</small>
                                    </div>

                                    <div className="border-top border-bottom my-4 py-4">
                                        <span
                                            className="mr-2"
                                            style={{
                                                color: '#6fbd0c'
                                            }}
                                        >
                                            <FiTruck />
                                        </span>
                                        
                                        <small 
                                            className="font-weight-light text-secondary"
                                            style={{
                                                fontSize: '11px',
                                                letterSpacing: '0.5px',
                                                lineHeight: '2'
                                            }}
                                        >
                                            <Translation>
                                                {(t) => 
                                                    <>
                                                        {t('main.deliveryNormalE')}
                                                    </>
                                                }
                                            </Translation> <strong className="font-weight-bold" style={{color:'#000'}}>|</strong>&nbsp; 
                                            <Translation>
                                                {(t) => 
                                                    <>
                                                        {t('main.deliveryDay1E')}
                                                    </>
                                                }
                                            </Translation> <strong className="font-weight-bold" style={{color:'#000'}}>|</strong>&nbsp;
                                            <Translation>
                                                {(t) => 
                                                    <>
                                                        {t('main.deliveryUrgentE')}
                                                    </>
                                                }
                                            </Translation>
                                        </small>
                                    </div>
                                    <div className="d-none d-sm-block">
                                        <button 
                                            className="btn-cart-hover btn shadow-none px-5 py-2 text-white rounded-0" 
                                            style={{
                                                background: '#6fbe0b',
                                                lineHeight: '2',
                                                letterSpacing: '0.5px'
                                            }}
                                            onClick={() => this.props.addProduct(p)}
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.list.addToCart')}</>}
                                            </Translation>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div 
                                className="border-top d-flex d-sm-none py-3 px-3 shadow-sm position-fixed justify-content-between bg-white"
                                style={{
                                    left: '0',
                                    right: '0',
                                    bottom: '0',
                                    zIndex: '999'
                                }}
                            >
                                <p
                                    className="font-weight-light mb-0 align-self-center"
                                    style={{
                                        fontSize: '13px',
                                        lineHeight: '1.5',
                                        letterSpacing: '0.5px'
                                    }}
                                >
                                    <strong style={{fontSize:'15px'}} className="font-weight-bold">{p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}</strong>
                                </p>
                                <button 
                                    className="btn-cart-hover btn shadow-none py-1 text-white rounded-0 flex-grow-1 ml-3 ml-sm-5" 
                                    onClick={() => this.props.addProduct(p)}
                                    style={{
                                        background: '#6fbe0b',
                                        lineHeight: '2'
                                    }}
                                >
                                    <Translation>
                                        {(t) => <>{t('main.list.addToCart')}</>}
                                    </Translation>
                                </button>
                            </div>

                        </div>
                    ) : (
                        <>
                            <div 
                                className="pt-3 pb-5" 
                            >
                                <Skeleton height={400} width={'100%'} />
                            </div>
                        </>
                    )

        return (
            <Layout>
                <div className="pb-5 bg-light">
                    <div className="container">
                        {pDetail}
                        <Related />
                        <Categories />
                    </div>
                </div>
            </Layout>
        )
    }
}


export default connect(null,{addProduct})(withRouter(Detail))