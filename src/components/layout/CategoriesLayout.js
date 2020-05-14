import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { Translation } from 'react-i18next'
import Layout from '../../components/layout/Layout'
import BANNER from '../../assets/images/category.jpg'

class CategoriesLayout extends Component 
{
    render() {

        return (
            <Layout>
                <div className="position-relative">
                    <img src={BANNER} alt="" width="100%" style={{height:'290px',objectFit:'cover'}} />
                    <div 
                        className="position-absolute"
                        style={{
                            left: '0',
                            top: '0',
                            right: '0',
                            bottom: '0',
                            zIndex: '9'
                        }}
                    >
                        <div className="container h-100">
                            <div className="py-5 d-table w-100 h-100">
                                <div className="d-table-cell align-middle">
                                <h2
                                    className="mb-1 text-light font-weight-bold"
                                    style={{
                                        fontSize: '1.8rem',
                                        lineHeight: '2'
                                    }}
                                >
                                    <Translation>
                                        {(t) => <>{t('main.topbar.category.head')}</>}
                                    </Translation>
                                </h2>
                                <p
                                    className="mb-0 text-white-50 font-weight-light"
                                    style={{
                                        fontSize: '14px'
                                    }}
                                >
                                    <Translation>
                                        {(t) => <>{t('main.topbar.category.p')}</>}
                                    </Translation>
                                </p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5 bg-light">
                    <div className="container">            
                        <div className="row">
                            <div className="col-4 col-lg-3">
                                <div className="sticky-top" style={{top:'80px'}}>
                                    <h4
                                        className="font-weight-bold mb-0"
                                        style={{
                                            lineHeight: '2',
                                            letterSpacing: '0.5px',
                                            fontSize: '1.2rem',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.menu.categories')}</>}
                                        </Translation>
                                    </h4>
                                    <ul className="pt-3 mt-3 mb-0 border-top list-unstyled">
                                        <li
                                            className="p-0 mb-2 bg-transparent border-0 rounded-0 shadow-none"
                                            style={{
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            <NavLink
                                                to="/category/vegetables"
                                                className="text-decoration-none text-secondary cat-link-hover"
                                                activeClassName="cat-active"
                                                style={{
                                                    lineHeight: '2'
                                                }}
                                            >
                                                <Translation>
                                                    {(t) => <>{t('main.list.vegetables')}</>}
                                                </Translation>
                                            </NavLink>
                                        </li>
                                        <li
                                            className="p-0 mb-2 bg-transparent border-0 rounded-0 shadow-none"
                                            style={{
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            <NavLink
                                                to="/category/rices"
                                                className="text-decoration-none text-secondary cat-link-hover"
                                                activeClassName="cat-active"
                                                style={{
                                                    lineHeight: '2'
                                                }}
                                            >
                                                <Translation>
                                                    {(t) => <>{t('main.list.rices')}</>}
                                                </Translation>
                                            </NavLink>
                                        </li>
                                        <li
                                            className="p-0 mb-2 bg-transparent border-0 rounded-0 shadow-none"
                                            style={{
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            <NavLink
                                                to="/category/oils"
                                                className="text-decoration-none text-secondary cat-link-hover"
                                                activeClassName="cat-active"
                                                style={{
                                                    lineHeight: '2'
                                                }}
                                            >
                                                <Translation>
                                                    {(t) => <>{t('main.list.oils')}</>}
                                                </Translation>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-8 col-lg-9">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default withRouter(CategoriesLayout)