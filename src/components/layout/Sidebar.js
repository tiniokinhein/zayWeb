import React, { Component } from 'react'
import { withRouter , Link } from 'react-router-dom'
import { AiOutlineShop , AiOutlineFileSearch } from 'react-icons/ai'
import { IoMdApps } from 'react-icons/io'
import LOGO from '../../assets/images/logo.jpg'
import { Translation } from 'react-i18next'
import { RiCloseCircleLine } from 'react-icons/ri'

class Sidebar extends Component 
{
    changeLanguage = code => e => {
        localStorage.setItem('language', code);
        window.location.reload();
    }

    closeSideBar = () => {
        document.getElementById('sidebar-wrap').style.left = '-100%'
    }

    render() {
        
        return (
            <div 
                id="sidebar-wrap"
                className="position-fixed"
                style={{
                    left: '-100%',
                    top: '0',
                    bottom: '0',
                    background: 'none',
                    width: '100%',
                    zIndex: '9999999999',
                    transition: '0.15s ease-in-out'
                }}
                onClick={this.closeSideBar}
            >
                <div
                    className="p-4 h-100 position-relative"
                    style={{
                        background: '#000',
                        width: '460px',
                        maxWidth: '100%'
                    }}
                >
                    <button
                        className="btn shadow-none border-0 rounded-0 position-absolute text-dark p-0"
                        style={{
                            right: '-1px',
                            top: '0',
                            zIndex: '9999999999',
                            fontSize: '35px',
                            width: '66px',
                            height: '66px',
                            lineHeight: '30px',
                            background: '#f8f9fa'
                        }}
                    >
                        <RiCloseCircleLine />
                    </button>
                    <Link
                        className="w-100 text-left text-decoration-none"
                        to="/"
                    >
                        <img
                            src={LOGO}
                            alt="Bagan Zay"
                            className=""
                            style={{
                                width: '100px',
                                marginLeft: '-25px'
                            }}
                        />
                    </Link>

                    <ul className="list-unstyled w-100 mb-0">
                        <li
                            className="mb-2"
                        >
                            <Link
                                to="/"
                                className="text-decoration-none menu-hover-ef font-weight-bold"
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '22px'
                                }}
                            >
                                <span 
                                    className="d-inline-block mr-2 text-light"
                                    style={{
                                        fontSize: '25px',
                                        lineHeight: '50px'
                                    }}
                                >
                                    <AiOutlineShop />
                                </span>
                                <span
                                    style={{
                                        background: '-webkit-linear-gradient(45deg, #007bff, #00fff3 80%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontFamily: "'Roboto', sans-serif",
                                        fontWeight: '900',
                                        letterSpacing: '-2px',
                                        lineHeight: '50px',
                                        display: 'inline-block'
                                    }}
                                >BAGAN</span> <span
                                                style={{
                                                    background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    lineHeight: '50px',
                                                    display: 'inline-block'
                                                }}
                                                >စျေး</span>
                            </Link>
                        </li>
                        <li
                            className="mb-2"
                        >
                            <Link
                                to="/categories"
                                className="text-decoration-none menu-hover-ef font-weight-bold"
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '22px'
                                }}
                            >
                                <span 
                                    className="d-inline-block mr-2 text-light"
                                    style={{
                                        fontSize: '25px',
                                        lineHeight: '50px',
                                        display: 'inline-block'
                                    }}
                                >
                                    <IoMdApps />
                                </span>
                                <span
                                    style={{
                                        background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        lineHeight: '50px',
                                        display: 'inline-block'
                                    }}
                                >
                                    <Translation>
                                        {(t) => <>{t('main.menu.categories')}</>}
                                    </Translation>
                                </span>
                            </Link>
                        </li>
                        <li
                            className="mb-2"
                        >
                            <Link
                                to="/track"
                                className="text-decoration-none menu-hover-ef font-weight-bold"
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '22px'
                                }}
                            >
                                <span 
                                    className="d-inline-block mr-2 text-light"
                                    style={{
                                        fontSize: '25px',
                                        lineHeight: '50px',
                                        display: 'inline-block'
                                    }}
                                >
                                    <AiOutlineFileSearch />
                                </span>
                                <span
                                    style={{
                                        background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        lineHeight: '50px',
                                        display: 'inline-block'
                                    }}
                                >
                                    <Translation>
                                        {(t) => <>{t('main.menu.order')}</>}
                                    </Translation>
                                </span>
                            </Link>
                        </li>
                    </ul>

                    <footer
                        className="position-absolute text-center"
                        style={{
                            bottom: '1.5rem',
                            left: '1.5rem',
                            zIndex: '99'
                        }}
                    >
                        <p 
                            className="mb-0 text-light text-uppercase font-weight-bold"
                            style={{
                                lineHeight: '2',
                                letterSpacing: '-0.5px'
                            }}
                        >
                            <small
                                style={{
                                    fontSize: '8px',
                                    background: '-webkit-linear-gradient(45deg, #007bff, #00fff3 80%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >&copy; Bagan စျေး</small>
                        </p>
                    </footer>

                </div>
            </div>
        )
    }
}

export default withRouter(Sidebar)