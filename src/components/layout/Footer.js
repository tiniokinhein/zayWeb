import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Translation } from 'react-i18next'
import { FaFacebook } from 'react-icons/fa'
import IOS from '../../assets/images/app-store.png'
import ANDROID from '../../assets/images/playstore.png'

export default class Footer extends Component 
{
    render() {
        return (
            <div 
                className="pt-5"
                style={{
                    background: '#f1f1f1'
                }}
            >
                <div className="container">
                    <hr className="m-0" style={{borderColor:'#ddd'}} />
                    <div className="row py-5">
                        <div className="col-12 col-lg-4 mb-5 mb-lg-0">
                            <h4
                                className="mb-2 text-uppercase"
                                style={{
                                    fontSize: '16px',
                                    lineHeight: '2',
                                    color: '#000'
                                }}
                            >
                                <Translation>
                                    {(t) => <>{t('main.footer.site')}</>}
                                </Translation>
                            </h4>
                            <ul className="list-unstyled p-0 m-0">
                                <li>
                                    <Link
                                        to="/categories"
                                        className="text-decoration-none cat-link-hover font-weight-light"
                                        style={{
                                            lineHeight: '2',
                                            fontSize: '12px',
                                            color: '#666666',
                                        }}
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.menu.categories')}</>}
                                        </Translation>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/track"
                                        className="text-decoration-none cat-link-hover font-weight-light"
                                        style={{
                                            lineHeight: '2',
                                            fontSize: '12px',
                                            color: '#666666',
                                        }}
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.menu.order')}</>}
                                        </Translation>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-lg-4 mb-5 mb-lg-0">
                            <h4
                                className="mb-3 text-uppercase"
                                style={{
                                    fontSize: '16px',
                                    lineHeight: '2',
                                    color: '#000'
                                }}
                            >
                                <Translation>
                                    {(t) => <>{t('main.footer.download')}</>}
                                </Translation>
                            </h4>
                            <ul className="list-unstyled p-0 m-0">
                                <li
                                    className="mb-3"
                                >
                                    <a
                                        href="https://apple.com/ios/app-store/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none"
                                    >
                                        <img
                                            src={IOS}
                                            alt="IOS App"
                                            width="135"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://play.google.com/store/apps?hl=en"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none"
                                    >
                                        <img
                                            src={ANDROID}
                                            alt="Android App"
                                            width="135"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-lg-4 mb-5 mb-lg-0">
                            <h4
                                className="mb-3 text-uppercase"
                                style={{
                                    fontSize: '16px',
                                    lineHeight: '2',
                                    color: '#000'
                                }}
                            >
                                <Translation>
                                    {(t) => <>{t('main.footer.social')}</>}
                                </Translation>
                            </h4>
                            <ul className="list-unstyled p-0 m-0">
                                <li>
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none text-primary cat-link-hover"
                                        style={{
                                            fontSize: '35px',
                                            lineHeight: '0'
                                        }}
                                    >
                                        <FaFacebook />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr className="m-0" style={{borderColor:'#ddd'}} />
                    <div className="row pt-2 pb-3">
                        <div className="col-12 col-md-6 order-2 order-md-1 text-center text-md-left">
                            <p
                                className="mb-0"
                                style={{
                                    lineHeight: '2',
                                    color: '#666666',
                                    fontSize: '14px',
                                }}
                            >
                                <small
                                    className="font-weight-light"
                                >
                                    Copyright &copy; {(new Date().getFullYear())} &nbsp; | &nbsp;
                                    <Link
                                        to="/"
                                        className="text-dark font-weight-bold text-decoration-none text-uppercase cat-link-hover"
                                        style={{
                                            letterSpacing: '-0.8px'
                                        }}
                                    >
                                        Bagan စျေး
                                    </Link>
                                </small>
                            </p>
                        </div>
                        <div className="col-12 col-md-6 mb-3 mb-md-0 order-1 order-md-2 text-center text-md-right">
                            <Link
                                to="/"
                                className="text-decoration-none mr-3 cat-link-hover"
                                style={{
                                    color: '#666666',
                                    lineHeight: '2',
                                    fontSize: '14px',
                                }}
                            >
                                <small
                                    className="font-weight-light"
                                >
                                    <Translation>
                                        {(t) => <>{t('main.termsofuse')}</>}
                                    </Translation>
                                </small>
                            </Link>
                            <Link
                                to="/"
                                className="text-decoration-none ml-3 cat-link-hover"
                                style={{
                                    color: '#666666',
                                    lineHeight: '2',
                                    fontSize: '14px',
                                }}
                            >
                                <small
                                    className="font-weight-light"
                                >
                                    <Translation>
                                        {(t) => <>{t('main.privacynotice')}</>}
                                    </Translation>
                                </small>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
