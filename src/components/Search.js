import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Modal from 'react-modal'
import { db } from '../firebase'
import { FOODS } from '../api'
import { Translation } from 'react-i18next'
import VEGETABLE_IMG from '../assets/images/vegetable.png'
import RICE_IMG from '../assets/images/rice.png'
import OIL_IMG from '../assets/images/oil.png'
import { IoIosSearch , IoIosClose } from 'react-icons/io'
import { currency } from '../utils'


Modal.setAppElement('#root')

const FETCHIMG = process.env.REACT_APP_FETCH_IMAGES

class Search extends Component 
{
    state = {
        title_mm: '',
        title: '',
        posts: []
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

    closeSearch = () => {
        document.getElementById('searchID').style.top = '0'
        document.getElementById('searchID').style.bottom = '0'
        document.getElementById('searchID').style.left = '0'
        document.getElementById('searchID').style.right = '0'
        document.getElementById('searchID').style.zIndex = '-1'
        document.getElementById('searchID').style.opacity = '0'
        document.getElementById('searchID').style.transition = '0.3s ease-in-out'

        this.setState({
            title_mm: ''
        })
    }

    getPosts = () => {
        db 
        .ref(FOODS)
        .on('value' , snapshot => {
            const data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })
            this.setState({
                posts: data
            })
        })
    }

    componentDidMount() {
        this.getPosts()
        window.scrollTo(0,0)
    }

    render() {

        const { title_mm , posts , title } = this.state

        const postData = posts.filter(p => {
            if(p.title_mm) {
                return p.title_mm.toLowerCase().indexOf(title_mm.toLowerCase()) !== -1
            } else {
                return p.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
            }
        })

        const searchMulti = posts.filter(p => {
            if(p.title_mm) {
                return p.title_mm
            } else {
                return p.title
            }
        })

        const categoryData = 
            <div className="d-flex mb-5 mt-3 justify-content-center">
                <h4
                    className="font-weight-light mb-0 text-light align-self-center mr-4"
                    style={{
                        lineHeight: '2',
                        letterSpacing: '0.5px',
                        fontSize: '16px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                    }}
                >
                    <Translation>
                        {(t) => <>{t('main.menu.itemCategories')}</>}
                    </Translation>
                </h4>
                <div className="row mx-n2">
                    <div className="col-4 text-center px-2">
                        <Link
                            to="/category/vegetables"
                            className="text-decoration-none cat-link-hover text-dark"
                            onClick={this.closeSearch}
                        >
                            <img
                                src={VEGETABLE_IMG}
                                alt="ဟင်းသီးဟင်းရွက်"
                                className="rounded-circle p-1 bg-white"
                                style={{
                                    width: '80px',
                                    maxWidth: '100%'
                                }}
                            />
                        </Link>
                    </div>
                    <div className="col-4 text-center px-2">
                        <Link
                            to="/category/rices"
                            className="text-decoration-none cat-link-hover text-dark"
                            onClick={this.closeSearch}
                        >
                            <img
                                src={RICE_IMG}
                                alt="ဆန်"
                                className="rounded-circle p-1 bg-white"
                                style={{
                                    width: '80px',
                                    maxWidth: '100%'
                                }}
                            />
                        </Link>
                    </div>
                    <div className="col-4 text-center px-2">
                        <Link
                            to="/category/oils"
                            className="text-decoration-none cat-link-hover text-dark"
                            onClick={this.closeSearch}
                        >
                            <img
                                src={OIL_IMG}
                                alt="ဆီ"
                                className="rounded-circle p-1 bg-white"
                                style={{
                                    width: '80px',
                                    maxWidth: '100%'
                                }}
                            />
                        </Link>
                    </div>
                </div>
            </div>

        return (
            <div
                className="searchID position-fixed"
                id="searchID"
                style={{
                    left: '0',
                    right: '0',
                    top: '0',
                    bottom: '0',
                    backgroundColor: 'rgb(0, 123, 255)',
                    backgroundImage: 'linear-gradient(to bottom, #007bff, #6fbd0c 200%)',
                    zIndex: '-1',
                    opacity: '0',
                    transition: '0.3s ease-in-out'
                }}
            >
                <div className="search-scroll">
                    <div className="container h-100">
                        <div className="d-table w-100 h-100 py-5 position-relative">
                            <div
                                className="position-absolute"
                                style={{
                                    right: '0',
                                    top: '15px'
                                }}
                            >
                                <button
                                    onClick={this.closeSearch}
                                    className="btn rounded-0 border-0 shadow-none p-0 position-relative"
                                    style={{
                                        width: '30px',
                                        height: '30px'
                                    }}
                                >
                                    <span
                                        className="bg-white rounded position-absolute"
                                        style={{
                                            width: '30px',
                                            height: '2px',
                                            left: '0',
                                            right: '0',
                                            transform: 'rotate(45deg)',
                                            transition: 'left 0.3s ease-in-out'
                                        }}
                                    />
                                    <span
                                        className="bg-white rounded position-absolute"
                                        style={{
                                            width: '30px',
                                            height: '2px',
                                            left: '0',
                                            right: '0',
                                            transform: 'rotate(-45deg)',
                                            transition: 'left 0.3s ease-in-out'
                                        }}
                                    />
                                </button>
                            </div>
                            <div className="d-table-cell align-middle">
                                <div className="col-12 col-lg-6 mx-auto px-0 my-3">
                                    {categoryData}
                                    <div
                                        className="d-flex mb-1"
                                    >
                                        <button
                                            className="btn shadow-none bg-transparent text-light"
                                            style={{
                                                height: '50px',
                                                width: '50px',
                                                border: '2px solid #f8f9fa',
                                                borderRight: '0',
                                                borderRadius: '50%',
                                                borderTopRightRadius: '0',
                                                borderBottomRightRadius: '0',
                                                fontSize: '26px',
                                                lineHeight: '26px'
                                            }}
                                        >
                                            <IoIosSearch />
                                        </button>
                                        {
                                            searchMulti ? (
                                                <div className="input-group position-relative">
                                                    <input
                                                        className="form-control shadow-none bg-transparent pl-0 pr-4 text-light font-weight-light"
                                                        name="title_mm"
                                                        value={title_mm}
                                                        onChange={this.handleOnChange.bind(this)}
                                                        style={{
                                                            height: '50px',
                                                            fontSize: '19px',
                                                            border: '2px solid #f8f9fa',
                                                            borderLeft: '0',
                                                            borderRadius: '50px',
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
                                                                    className="p-0 border-0 shadow-none rounded-0 bg-transparent text-center text-dark"
                                                                    style={{
                                                                        width: '40px',
                                                                        height: '50px',
                                                                        fontSize: '25px',
                                                                        lineHeight: '25px'
                                                                    }}
                                                                    onClick={this.resetForm.bind(this)}
                                                                >
                                                                    <IoIosClose className="border border-dark rounded-circle" />
                                                                </button>
                                                            </div>
                                                        ) : null
                                                    }
                                                </div>
                                            ) : (
                                                <div className="input-group position-relative">
                                                    <input
                                                        className="form-control shadow-none bg-transparent pl-0 pr-4 text-light font-weight-light"
                                                        name="title"
                                                        value={title}
                                                        onChange={this.handleOnChange.bind(this)}
                                                        style={{
                                                            height: '50px',
                                                            fontSize: '19px',
                                                            border: '2px solid #f8f9fa',
                                                            borderLeft: '0',
                                                            borderRadius: '50px',
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
                                                                    className="p-0 border-0 shadow-none rounded-0 bg-transparent text-center text-dark"
                                                                    style={{
                                                                        width: '40px',
                                                                        height: '50px',
                                                                        fontSize: '25px',
                                                                        lineHeight: '25px'
                                                                    }}
                                                                    onClick={this.resetForm.bind(this)}
                                                                >
                                                                    <IoIosClose className="border border-dark rounded-circle" />
                                                                </button>
                                                            </div>
                                                        ) : null
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                    {
                                        title_mm.length >= 4 ? (
                                            <>
                                                {
                                                    postData.map(p => (
                                                        <div 
                                                            className="shadow rounded-pill p-1 mb-1" 
                                                            key={p.id}
                                                            style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.73)',
                                                                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.73), rgba(0, 0, 0, 0.95) 200%)',
                                                            }}
                                                        >                                                            
                                                            {
                                                                p.category.title === "ဟင်းသီးဟင်းရွက်" ? (                                                                    
                                                                        <div 
                                                                            className="d-flex"                                                                            
                                                                        >
                                                                            <div 
                                                                                className="mr-2"
                                                                                style={{
                                                                                    cursor: 'pointer'
                                                                                }}
                                                                                onClick={() => {
                                                                                    this.props.history.push(`/vegetable/${p.slug}`)
                                                                                    this.closeSearch()
                                                                                }}
                                                                            >
                                                                                <img
                                                                                    src={FETCHIMG+`/${p.image}`}
                                                                                    alt={p.title}
                                                                                    width="60"
                                                                                    className="bg-white rounded-circle"
                                                                                />
                                                                            </div>
                                                                            <div 
                                                                                className="flex-grow-1 align-self-center mr-2"
                                                                                style={{
                                                                                    cursor: 'pointer'
                                                                                }}
                                                                                onClick={() => {
                                                                                    this.props.history.push(`/vegetable/${p.slug}`)
                                                                                    this.closeSearch()
                                                                                }}
                                                                            >
                                                                                <p
                                                                                    className="mb-0 font-weight-light text-light"
                                                                                    style={{
                                                                                        letterSpacing: '0.5px',
                                                                                        fontSize: '12px'
                                                                                    }}
                                                                                >
                                                                                    <Translation>
                                                                                        {(t) =>
                                                                                            <>
                                                                                                {
                                                                                                    t(
                                                                                                        'main.post.title',
                                                                                                        {
                                                                                                            title_en: p.title,
                                                                                                            title_mm: p.title_mm
                                                                                                        }
                                                                                                    )
                                                                                                }
                                                                                            </>
                                                                                        }
                                                                                    </Translation>
                                                                                </p>
                                                                                <span
                                                                                    className="text-light d-inline-block w-100"
                                                                                    style={{
                                                                                        fontSize: '11px'
                                                                                    }}
                                                                                >
                                                                                    {p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}
                                                                                </span>
                                                                            </div>
                                                                            <div className="ml-auto align-self-center mr-3">
                                                                                <button
                                                                                    className="btn p-0 rounded-0 border-0 shadow-none"
                                                                                    onClick={() => {
                                                                                        this.props.history.push('/category/vegetables')
                                                                                        this.closeSearch()
                                                                                    }}
                                                                                >
                                                                                    <small
                                                                                        className="text-warning"
                                                                                        style={{
                                                                                            fontSize: '12px'
                                                                                        }}
                                                                                    >
                                                                                        <Translation>
                                                                                            {
                                                                                                (t) =>
                                                                                                <>
                                                                                                    {t('main.list.vegetables')}
                                                                                                </>
                                                                                            }
                                                                                        </Translation>
                                                                                    </small>    
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                ) : null
                                                            }       
                                                            {
                                                                p.category.title === "ဆီ" ? (                                                                    
                                                                        <div 
                                                                            className="d-flex"
                                                                        >
                                                                            <div 
                                                                                className="mr-2"
                                                                                style={{
                                                                                    cursor: 'pointer'
                                                                                }}
                                                                                onClick={() => {
                                                                                    this.props.history.push(`/oil/${p.slug}`)
                                                                                    this.closeSearch()
                                                                                }}
                                                                            >
                                                                                <img
                                                                                    src={FETCHIMG+`/${p.image}`}
                                                                                    alt={p.title}
                                                                                    width="60"
                                                                                    className="bg-white rounded-circle"
                                                                                />
                                                                            </div>
                                                                            <div 
                                                                                className="flex-grow-1 align-self-center mr-2"
                                                                                style={{
                                                                                    cursor: 'pointer'
                                                                                }}
                                                                                onClick={() => {
                                                                                    this.props.history.push(`/oil/${p.slug}`)
                                                                                    this.closeSearch()
                                                                                }}
                                                                            >
                                                                                <p
                                                                                    className="mb-0 font-weight-light text-light"
                                                                                    style={{
                                                                                        letterSpacing: '0.5px',
                                                                                        fontSize: '12px'
                                                                                    }}
                                                                                >
                                                                                    <Translation>
                                                                                        {(t) =>
                                                                                            <>
                                                                                                {
                                                                                                    t(
                                                                                                        'main.post.title',
                                                                                                        {
                                                                                                            title_en: p.title,
                                                                                                            title_mm: p.title_mm
                                                                                                        }
                                                                                                    )
                                                                                                }
                                                                                            </>
                                                                                        }
                                                                                    </Translation>
                                                                                </p>
                                                                                <span
                                                                                    className="text-light d-inline-block w-100"
                                                                                    style={{
                                                                                        fontSize: '11px'
                                                                                    }}
                                                                                >
                                                                                    {p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}
                                                                                </span>
                                                                            </div>
                                                                            <div className="ml-auto align-self-center mr-3">
                                                                                <button
                                                                                    className="btn p-0 rounded-0 border-0 shadow-none"
                                                                                    onClick={() => {
                                                                                        this.props.history.push('/category/oils')
                                                                                        this.closeSearch()
                                                                                    }}
                                                                                >
                                                                                    <small
                                                                                        className="text-warning"
                                                                                        style={{
                                                                                            fontSize: '12px'
                                                                                        }}
                                                                                    >
                                                                                        <Translation>
                                                                                            {
                                                                                                (t) =>
                                                                                                <>
                                                                                                    {t('main.list.oils')}
                                                                                                </>
                                                                                            }
                                                                                        </Translation>
                                                                                    </small>    
                                                                                </button>
                                                                            </div>
                                                                        </div>                                                               
                                                                ) : null
                                                            } 
                                                            {
                                                                p.category.title === "ဆန်" ? (                                                                  
                                                                        <div 
                                                                            className="d-flex"
                                                                        >
                                                                            <div 
                                                                                className="mr-2"
                                                                                style={{
                                                                                    cursor: 'pointer'
                                                                                }}
                                                                                onClick={() => {
                                                                                    this.props.history.push(`/rice/${p.slug}`)
                                                                                    this.closeSearch()
                                                                                }}
                                                                            >
                                                                                <img
                                                                                    src={FETCHIMG+`/${p.image}`}
                                                                                    alt={p.title}
                                                                                    width="60"
                                                                                    className="bg-white rounded-circle"
                                                                                />
                                                                            </div>
                                                                            <div 
                                                                                className="flex-grow-1 align-self-center mr-2"
                                                                                style={{
                                                                                    cursor: 'pointer'
                                                                                }}
                                                                                onClick={() => {
                                                                                    this.props.history.push(`/rice/${p.slug}`)
                                                                                    this.closeSearch()
                                                                                }}
                                                                            >
                                                                                <p
                                                                                    className="mb-0 font-weight-light text-light"
                                                                                    style={{
                                                                                        letterSpacing: '0.5px',
                                                                                        fontSize: '12px'
                                                                                    }}
                                                                                >
                                                                                    <Translation>
                                                                                        {(t) =>
                                                                                            <>
                                                                                                {
                                                                                                    t(
                                                                                                        'main.post.title',
                                                                                                        {
                                                                                                            title_en: p.title,
                                                                                                            title_mm: p.title_mm
                                                                                                        }
                                                                                                    )
                                                                                                }
                                                                                            </>
                                                                                        }
                                                                                    </Translation>
                                                                                </p>
                                                                                <span
                                                                                    className="text-light d-inline-block w-100"
                                                                                    style={{
                                                                                        fontSize: '11px'
                                                                                    }}
                                                                                >
                                                                                    {p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currency}
                                                                                </span>
                                                                            </div>
                                                                            <div className="ml-auto align-self-center mr-3">
                                                                                <button
                                                                                    className="btn p-0 rounded-0 border-0 shadow-none"
                                                                                    onClick={() => {
                                                                                        this.props.history.push('/category/rices')
                                                                                        this.closeSearch()
                                                                                    }}
                                                                                >
                                                                                    <small
                                                                                        className="text-warning"
                                                                                        style={{
                                                                                            fontSize: '12px'
                                                                                        }}
                                                                                    >
                                                                                        <Translation>
                                                                                            {
                                                                                                (t) =>
                                                                                                <>
                                                                                                    {t('main.list.rices')}
                                                                                                </>
                                                                                            }
                                                                                        </Translation>
                                                                                    </small>    
                                                                                </button>
                                                                            </div>
                                                                        </div>                                                                
                                                                ) : null
                                                            }                                                  
                                                        </div>
                                                    ))
                                                }
                                            </>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Search)