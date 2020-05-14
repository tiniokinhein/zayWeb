import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import Spinner from '../../layout/Spinner'
import { withRouter } from 'react-router-dom'
import { fetchVegetables } from '../../../store/foods/actions'

import { FOODS } from '../../../api'
import { db } from '../../../firebase'
import { currency } from '../../../utils'
import { addProduct } from '../../../store/cart/actions'
import Skeleton from 'react-loading-skeleton'
import { Translation } from 'react-i18next'

const FETCHIMG = process.env.REACT_APP_FETCH_IMAGES

class AllList extends React.Component 
{
    static propTypes = {
        fetchVegetables: PropTypes.func.isRequired,
        vegetables: PropTypes.array.isRequired,
        addProduct: PropTypes.func.isRequired
    }

    state = {
        vegetables: [],
        isLoading: false
    }

    componentDidMount() {
        this.handleFetchFoods()
    }

    handleFetchFoods = () => {
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
                vegetables: allItems,
                isLoading: true
            })
        })
    }

    render() {

        const { vegetables } = this.state

        const vegetableList = vegetables.length ? (
            <>
                <div className="row mx-n2">
                    {
                        vegetables.map((vegetable,index) => {

                            vegetable.quantity = 1

                            return(
                                <div 
                                    className="col-6 col-md-4 mb-3 px-2" 
                                    key={index}
                                >
                                    <div 
                                        className="shadow-sm rounded bg-white h-100"
                                    >
                                        <div className="position-relative">
                                            <img 
                                                src={FETCHIMG+`/${vegetable.image}`} 
                                                alt={vegetable.title} 
                                                className="w-100 rounded-top"
                                                style={{
                                                    height: '180px',
                                                    objectFit: 'cover',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => this.props.history.push(`/vegetable/${vegetable.slug}`)}
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
                                                        className="float-left font-weight-bold pr-3" 
                                                        style={{fontSize:'10px'}}
                                                    >( {vegetable.weight} ) {vegetable.unit}</small>
                                                    <small 
                                                        className="float-right font-weight-bold"
                                                        style={{
                                                            fontSize: '11px'
                                                        }}
                                                    >{vegetable.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="btn border-0 w-100 py-2 text-white text-center d-inline-block rounded rounded-top-custom-none shadow-none"
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
                </div>
            </>
        ) : (
            <>
                <div className="row mx-n2">
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={217} />
                    </div>
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={217} />
                    </div>
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={217} />
                    </div>
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={217} />
                    </div>
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={217} />
                    </div>
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={217} />
                    </div>
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={217} />
                    </div>
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={217} />
                    </div>
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={217} />
                    </div>
                </div>
            </>
        )
        

        return(
            <div>
                {vegetableList}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    vegetables: state.foods.vegetables,
    addProduct: PropTypes.func.isRequired
})

export default connect(mapStateToProps , {fetchVegetables,addProduct})(withRouter(AllList))