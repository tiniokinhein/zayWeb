import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import Spinner from '../../layout/Spinner'
import { withRouter } from 'react-router-dom'
import { fetchOils } from '../../../store/foods/actions'

import { FOODS } from '../../../api'
import { db } from '../../../firebase'
import { currency } from '../../../utils'
import { addProduct } from '../../../store/cart/actions'

import Skeleton from 'react-loading-skeleton'
import { Translation } from 'react-i18next'



const FETCHIMG = process.env.REACT_APP_FETCH_IMAGES

class List extends React.Component 
{
    static propTypes = {
        fetchOils: PropTypes.func.isRequired,
        oils: PropTypes.array.isRequired,
        addProduct: PropTypes.func.isRequired
    }

    state = {
        oils: [],
        isLoading: false
    }

    handleFetchFoods = () => {
        db 
        .ref(FOODS)
        .orderByChild('category/title')
        .equalTo('ဆီ')
        .on('value' , snapshot => {
            let data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })
            const allItems = data.reverse()

            this.setState({
                oils: allItems,
                isLoading: true
            })
        })

    }

    componentDidMount() {
        this.handleFetchFoods()
    }

    render() {

        const { oils } = this.state

        const oilList = oils.length ? (
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
                            {(t) => <>{t('main.list.oils')}</>}
                        </Translation>
                    </h5>
                    <div
                        className="text-dark ml-auto align-self-center cat-link-hover"
                        style={{
                            fontSize: '14px',
                            lineHeight: '2',
                            cursor: 'pointer'
                        }}
                        onClick={() => this.props.history.push('/category/oils')}
                    >
                        <Translation>
                            {(t) => <>{t('main.list.seeAll')}</>}
                        </Translation> &#10230;
                    </div>
                </div>
                
                <div className="row mx-n2">
                    {
                        oils.slice(0,6).map((oil,index) => {

                            oil.quantity = 1

                            return(
                                <div className="col-12 col-md-6 px-2" key={index}>
                                    <div
                                        className="mb-3 bg-white shadow-sm rounded"
                                        style={{
                                            borderLeft: '5px solid #6fbd0c'
                                        }}
                                    >
                                        <div className="d-flex py-2">
                                            <div className="">
                                                <img
                                                    src={FETCHIMG+`/${oil.image}`}
                                                    alt={oil.title}
                                                    className="rounded-left"
                                                    style={{
                                                        width: '100px',
                                                        objectFit: 'cover',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => this.props.history.push(`/oil/${oil.slug}`)}
                                                />
                                            </div>
                                            <div
                                                className="align-self-center flex-grow-1 mr-3"
                                                style={{
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => this.props.history.push(`/oil/${oil.slug}`)}
                                            >
                                                <h6 
                                                    className="m-0 pb-0 text-dark"
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
                                                                    title_en: oil.title,
                                                                    title_mm: oil.title_mm
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
                                                    >( {oil.weight} ) {oil.unit}</small>
                                                </div>
                                                <div
                                                    className="pt-0"
                                                >
                                                    <small 
                                                        className="font-weight-bold"
                                                        style={{
                                                            fontSize: '11px'
                                                        }}
                                                    >{oil.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}</small> 
                                                </div>
                                                <div
                                                    className="d-block d-sm-none pt-2 pt-sm-0"
                                                >
                                                    <button
                                                        className="btn border-0 py-2 text-white text-center d-inline-block rounded shadow-none"
                                                        style={{
                                                            background: '#6fbd0c',
                                                            fontSize: '13px',
                                                            width: '100%'
                                                        }}
                                                        onClick={() => this.props.addProduct(oil)}
                                                    >
                                                        <Translation>
                                                            {(t) => <>{t('main.list.addToCart')}</>}
                                                        </Translation>
                                                    </button>
                                                </div>
                                            </div>

                                            <div
                                                className="align-self-center mr-3 d-none d-sm-flex"
                                            >
                                                <button
                                                    className="btn-cart-hover btn border-0 py-2 text-white text-center d-inline-block rounded shadow-none"
                                                    style={{
                                                        background: '#6fbd0c',
                                                        fontSize: '13px',
                                                        width: '118px'
                                                    }}
                                                    onClick={() => this.props.addProduct(oil)}
                                                >
                                                    <Translation>
                                                        {(t) => <>{t('main.list.addToCart')}</>}
                                                    </Translation>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            )
                        })
                    }
                </div>
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
                        className="col-12 col-md-6 mb-3 rounded px-2"
                    >
                        <Skeleton height={108} width={'100%'} />
                    </div>
                    <div
                        className="col-12 col-md-6 mb-3 rounded px-2"
                    >
                        <Skeleton height={108} width={'100%'} />
                    </div>
                    <div
                        className="col-12 col-md-6 mb-3 rounded px-2"
                    >
                        <Skeleton height={108} width={'100%'} />
                    </div>
                    <div
                        className="col-12 col-md-6 mb-3 rounded px-2"
                    >
                        <Skeleton height={108} width={'100%'} />
                    </div>
                    <div
                        className="col-12 col-md-6 mb-3 rounded px-2"
                    >
                        <Skeleton height={108} width={'100%'} />
                    </div>
                    <div
                        className="col-12 col-md-6 mb-3 rounded px-2"
                    >
                        <Skeleton height={108} width={'100%'} />
                    </div>
                </div>
                
            </>
        )
        

        return(
            <div
                className="pb-3 pt-4"
            >
                {oilList}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    oils: state.foods.oils
})

export default connect(mapStateToProps , {fetchOils,addProduct})(withRouter(List))