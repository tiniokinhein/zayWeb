import React, { Component } from 'react'
import Layout from '../components/layout/Layout'
import FUNNY from '../assets/images/funny.gif'
import { Translation } from 'react-i18next'

export default class Default extends Component 
{
    render() {
        return (
            <Layout>
                <div className="bg-light py-5">
                    <div className="container h-100">
                        <div 
                            className="d-table w-100"
                            style={{
                                height: '500px'
                            }}
                        >
                            <div className="d-table-cell align-middle text-center">
                                <p
                                    className="text-center font-weight-bold text-danger mb-3"
                                    style={{
                                        fontSize: '1rem',
                                        lineHeight: '2'
                                    }}
                                >
                                    <Translation>
                                        {(t) => <>{t('main.pageError')}</>}
                                    </Translation>
                                </p>
                                <img
                                    src={FUNNY}
                                    alt=""
                                    className="img-fluid"
                                    width="50"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
