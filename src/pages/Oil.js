import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Translation } from 'react-i18next'
import { db } from '../firebase'
import { FOODS } from '../api'
import Skeleton from 'react-loading-skeleton'
import CategoriesLayout from '../components/layout/CategoriesLayout'
import { FiGrid } from 'react-icons/fi'
import { RiLayoutRowLine } from 'react-icons/ri'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { currency } from '../utils'
import { addProduct } from '../store/cart/actions'
import { fetchOils } from '../store/foods/actions'
import { IoIosSearch , IoIosClose } from 'react-icons/io'


const FETCHIMG = process.env.REACT_APP_FETCH_IMAGES

class Oil extends Component 
{
    static propTypes = {
        fetchOils: PropTypes.func.isRequired,
        oils: PropTypes.array.isRequired,
        addProduct: PropTypes.func.isRequired
    }

    state = {
        oils: [],
        title_mm: '',
        title: ''
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    resetForm = () => {
        this.setState({
            title_mm: '',
            title: ''
        })
    }

    getOils = () => {
        db
        .ref(FOODS)
        .orderByChild('category/title')
        .equalTo('ဆီ')
        .on('value' , snapshot => {
            let data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })

            this.setState({
                oils: data
            })
        })
    }

    componentDidMount() {
        this.getOils()
        window.scrollTo(0,0)
    }

    render() {

        const { oils , title_mm , title } = this.state

        const data = oils.filter(p => {
            return p.title_mm.toLowerCase().indexOf(title_mm.toLowerCase()) !== -1
        })

        const searchMulti = oils.filter(p => {
            if(p.title_mm) {
                return p.title_mm
            } else {
                return p.title
            }
        })

        const gridList = data.length ? (
            <>
                {
                    data.map(oil => {

                        oil.quantity = 1

                        return(
                            <div 
                                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 px-2" 
                                key={oil.id}
                            >
                                <div 
                                    className="shadow-sm rounded-sm bg-white h-100"
                                >
                                    <div className="position-relative">
                                        <img 
                                            src={FETCHIMG+`/${oil.image}`} 
                                            alt={oil.title} 
                                            className="w-100 rounded-top"
                                            style={{
                                                height: '180px',
                                                objectFit: 'cover',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => this.props.history.push(`/oil/${oil.slug}`)}
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
                                                onClick={() => this.props.history.push(`/oil/${oil.slug}`)}
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
                                                                    title_en: oil.title,
                                                                    title_mm: oil.title_mm
                                                                }
                                                                )}
                                                            </>
                                                        }
                                                    </Translation>
                                                </h6>
                                                <small 
                                                    className="float-left font-weight-bold pr-3" 
                                                    style={{fontSize:'10px'}}
                                                >( {oil.weight} ) {oil.unit}</small>
                                                <small 
                                                    className="float-right font-weight-bold"
                                                    style={{
                                                        fontSize: '11px'
                                                    }}
                                                >{oil.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="btn-cart-hover btn border-0 w-100 py-2 text-white text-center d-inline-block rounded-sm rounded-top-custom-none shadow-none"
                                        style={{
                                            background: '#6fbd0c',
                                            fontSize: '14px'
                                        }}
                                        onClick={() => this.props.addProduct(oil)}
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
            </>
        ) : (
            <>
                <div 
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 px-2" 
                >
                    <Skeleton height={216} />
                </div>
                <div 
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 px-2" 
                >
                    <Skeleton height={216} />
                </div>
                <div 
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 px-2" 
                >
                    <Skeleton height={216} />
                </div>
                <div 
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 px-2" 
                >
                    <Skeleton height={216} />
                </div>
                <div 
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 px-2" 
                >
                    <Skeleton height={216} />
                </div>
                <div 
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 px-2" 
                >
                    <Skeleton height={216} />
                </div>
                <div 
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 px-2" 
                >
                    <Skeleton height={216} />
                </div>
                <div 
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 px-2" 
                >
                    <Skeleton height={216} />
                </div>
            </>
        )

        const rowList = data.length ? (
            <>
                {
                    data.map(oil => {

                        oil.quantity = 1

                        return(
                            <div className="col-12 col-lg-6 mb-3 px-2" key={oil.id}>
                                <div
                                    className="bg-white shadow-sm rounded"
                                    style={{
                                        borderLeft: '5px solid #6fbd0c'
                                    }}
                                >
                                    <div className="d-flex py-2">
                                        <div className="">
                                            <img
                                                src={FETCHIMG+`/${oil.image}`}
                                                alt={oil.title}
                                                className="rounded-left mr-2"
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
                                    <div
                                        className="d-block d-sm-none pr-3 pr-sm-0 pb-2 pb-sm-0 mt-n2 mt-sm-0 pl-2 pl-sm-0"
                                    >
                                        <button
                                            className="btn-cart-hover btn border-0 py-2 text-white text-center d-inline-block rounded shadow-none"
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
                            </div>
                        )
                    })
                }
            </>
        ) : (
            <>
                <div className="col-12 col-lg-6 mb-3 px-2">
                    <Skeleton height={108} width={'100%'} />
                </div>
                <div className="col-12 col-lg-6 mb-3 px-2">
                    <Skeleton height={108} width={'100%'} />
                </div>
                <div className="col-12 col-lg-6 mb-3 px-2">
                    <Skeleton height={108} width={'100%'} />
                </div>
                <div className="col-12 col-lg-6 mb-3 px-2">
                    <Skeleton height={108} width={'100%'} />
                </div>
                <div className="col-12 col-lg-6 mb-3 px-2">
                    <Skeleton height={108} width={'100%'} />
                </div>
                <div className="col-12 col-lg-6 mb-3 px-2">
                    <Skeleton height={108} width={'100%'} />
                </div>
            </>
        )

        return (
            <CategoriesLayout>
                <h4
                    className="font-weight-bold mb-0"
                    style={{
                        lineHeight: '2',
                        letterSpacing: '0.5px',
                        fontSize: '1.2rem'
                    }}
                >
                    <Translation>
                        {(t) => <>{t('main.list.oils')}</>}
                    </Translation> <small style={{fontSize:'10px'}}>( {data.length} <Translation>{(t) => <>{t('main.items')}</>}</Translation> )</small>
                </h4>

                <Tabs>
                    <TabList
                        className="mb-0 border-0 list-unstyled p-0"
                    >
                        <div className="pt-3 mt-3 border-top d-flex">
                            <div className="flex-grow-1 px-0 mr-3">
                                <div
                                    className="d-flex"
                                >
                                    <button
                                        className="btn shadow-none bg-transparent text-secondary"
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            border: '1px solid #ddd',
                                            borderRight: '0',
                                            borderRadius: '50%',
                                            borderTopRightRadius: '0',
                                            borderBottomRightRadius: '0'
                                        }}
                                    >
                                        <IoIosSearch />
                                    </button>
                                    {
                                        searchMulti ? (
                                            <div className="input-group position-relative">
                                                <input
                                                    className="form-control shadow-none bg-transparent pl-0 pr-4"
                                                    name="title_mm"
                                                    value={title_mm}
                                                    onChange={this.handleOnChange.bind(this)}
                                                    style={{
                                                        height: '40px',
                                                        fontSize: '19px',
                                                        border: '1px solid #ddd',
                                                        borderLeft: '0',
                                                        borderRadius: '40px',
                                                        borderTopLeftRadius: '0',
                                                        borderBottomLeftRadius: '0'
                                                    }}
                                                />
                                                {
                                                    title_mm.length >= 3 ? (
                                                        <div 
                                                            className="input-group-prepend position-absolute bg-transparent border-0 shadow-none rounded-0 p-0"
                                                            style={{
                                                                right: '0.75rem',
                                                                top: '0',
                                                                bottom: '0',
                                                                zIndex: '99'
                                                            }}
                                                        >
                                                            <button 
                                                                className="p-0 border-0 shadow-none rounded-0 bg-transparent text-center text-danger"
                                                                style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    fontSize: '25px',
                                                                    lineHeight: '25px'
                                                                }}
                                                                onClick={this.resetForm.bind(this)}
                                                            >
                                                                <IoIosClose />
                                                            </button>
                                                        </div>
                                                    ) : null
                                                }
                                            </div>
                                        ) : (
                                            <div className="input-group position-relative">
                                                <input
                                                    className="form-control shadow-none bg-transparent pl-0 pr-4"
                                                    name="title"
                                                    value={title}
                                                    onChange={this.handleOnChange.bind(this)}
                                                    style={{
                                                        height: '40px',
                                                        fontSize: '19px',
                                                        border: '1px solid #ddd',
                                                        borderLeft: '0',
                                                        borderRadius: '40px',
                                                        borderTopLeftRadius: '0',
                                                        borderBottomLeftRadius: '0'
                                                    }}
                                                />
                                                {
                                                    title.length >= 3 ? (
                                                        <div 
                                                            className="input-group-prepend position-absolute bg-transparent border-0 shadow-none rounded-0 p-0"
                                                            style={{
                                                                right: '0.75rem',
                                                                top: '0',
                                                                bottom: '0',
                                                                zIndex: '99'
                                                            }}
                                                        >
                                                            <button 
                                                                className="p-0 border-0 shadow-none rounded-0 bg-transparent text-center text-danger"
                                                                style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    fontSize: '25px',
                                                                    lineHeight: '25px'
                                                                }}
                                                                onClick={this.resetForm.bind(this)}
                                                            >
                                                                <IoIosClose />
                                                            </button>
                                                        </div>
                                                    ) : null
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="px-0 d-flex justify-content-end">
                                <Tab
                                    className="p-0 border-0 bg-transparent"
                                >
                                    <button
                                        className="btn p-0 border border-muted rounded-sm shadow-none mr-2 text-muted"
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            fontSize: '20px',
                                            lineHeight: '20px'
                                        }}
                                    ><FiGrid /></button>
                                </Tab>
                                <Tab
                                    className="p-0 border-0 bg-transparent"
                                >
                                    <button
                                        className="btn p-0 border border-muted rounded-sm shadow-none text-muted"
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            fontSize: '20px',
                                            lineHeight: '20px'
                                        }}
                                    ><RiLayoutRowLine /></button>
                                </Tab>
                            </div>
                        </div>
                    </TabList>
                    <TabPanel>
                        <div className="pt-3 mt-3 border-top">
                            <div className="row mx-n2">
                                {gridList}
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="pt-3 mt-3 border-top">
                            <div className="row mx-n2">
                                {rowList}
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>

            </CategoriesLayout>
        )
    }
}

const mapStateToProps = state => ({
    oils: state.foods.oils,
    addProduct: PropTypes.func.isRequired
})

export default connect(mapStateToProps , {fetchOils,addProduct})(withRouter(Oil))