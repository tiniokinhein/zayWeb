import React, { Component } from 'react'
import { withRouter , Link } from 'react-router-dom'
import { Translation } from 'react-i18next'
import MenuButton from './MenuButton'
import CartIcon from './CartIcon'
import { RiSearchLine } from 'react-icons/ri'
import { GiWorld } from 'react-icons/gi'

class MenuBar extends Component 
{
    changeLanguage = code => e => {
        localStorage.setItem('language', code);
        window.location.reload();
    }

    showSearch = () => {
        document.getElementById('searchID').style.top = '0%'
        document.getElementById('searchID').style.bottom = '0%'
        document.getElementById('searchID').style.left = '0%'
        document.getElementById('searchID').style.right = '0%'
        document.getElementById('searchID').style.zIndex = '9999999999'
        document.getElementById('searchID').style.opacity = '1' 
        document.getElementById('searchID').style.transition = '0.4s ease-in-out'
    }

    render() {

        return (
            <div 
                className="py-2 bg-light"
                style={{
                    height: '66px'
                }}
            >
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <div
                            className="align-self-center d-flex"
                        >
                            <MenuButton />
                            <Link
                                to="/"
                                className="text-decoration-none logo-title"
                                style={{
                                    fontSize: '26px'
                                }}
                            >
                                <span
                                    style={{
                                        background: '-webkit-linear-gradient(45deg, #007bff, #00fff3 80%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontFamily: "'Roboto', sans-serif",
                                        fontWeight: '900',
                                        letterSpacing: '-2px',
                                        lineHeight: '2',
                                        display: 'inline-block'
                                    }}
                                >BAGAN</span>&nbsp;
                                <span
                                    style={{
                                        background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        lineHeight: '2',
                                        display: 'inline-block'
                                    }}
                                >စျေး</span>
                            </Link>
                        </div>
                        <div
                            className="align-self-center d-none d-sm-flex"
                        >
                            <p
                                className="text-uppercase mb-0 font-weight-light text-center"
                                style={{
                                    letterSpacing: '0.5px',
                                    color: '#616161'
                                }}
                            >
                                <Translation>
                                    {(t) => <>{t('main.shopDelivery')}</>}
                                </Translation>
                            </p>
                        </div>
                        <div
                            className="align-self-center d-flex"
                        >
                            <div
                                className="dropdown dropright linkHover"
                            >
                                <button
                                    className="btn-lng btn rounded-circle border-0 shadow-none p-0 w-48-btn-hover"
                                    id="dropdownMenuLink" 
                                    data-toggle="dropdown" 
                                    aria-haspopup="true" 
                                    aria-expanded="false"
                                    style={{
                                        fontSize: '20px',
                                        color: '#616161',
                                        width: '48px',
                                        height: '48px',
                                        lineHeight: '48px'
                                    }}
                                >
                                    <GiWorld />
                                </button>
                                <div 
                                    className="dropdown-menu px-0 py-0 rounded-pill border-0 shadow-none ml-0" 
                                    aria-labelledby="dropdownMenuLink"
                                    style={{
                                        minWidth: 'auto',
                                        background: '#fff',
                                        top: '-58px',
                                        zIndex: '99999'
                                    }}
                                >
                                    <button
                                        className="text-center dropdown-item p-0 bg-transparent font-weight-bold d-block float-left rounded-circle"
                                        onClick={this.changeLanguage('en')}
                                        style={{
                                            letterSpacing: '0.5px',
                                            color: '#000',
                                            width: '48px',
                                            height: '48px',
                                            lineHeight: '48px',
                                            fontSize: '14px'
                                        }}
                                    >EN</button>
                                    <button
                                        className="text-center dropdown-item p-0 bg-transparent d-block float-left"
                                        onClick={this.changeLanguage('mm')}
                                        style={{
                                            letterSpacing: '0.5px',
                                            color: '#000',
                                            width: '48px',
                                            height: '48px',
                                            lineHeight: '48px',
                                            fontSize: '13px'
                                        }}
                                    >မြန်မာ</button>
                                </div>
                            </div>
                            <button
                                className="btn rounded-circle border-0 shadow-none p-0 w-48-btn-hover"
                                style={{
                                    fontSize: '20px',
                                    color: '#616161',
                                    width: '48px',
                                    height: '48px',
                                    lineHeight: '48px'
                                }}
                                onClick={this.showSearch}
                            >
                                <RiSearchLine />
                            </button>
                            <CartIcon />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MenuBar)