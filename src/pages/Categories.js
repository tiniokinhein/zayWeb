import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import CategoriesLayout from '../components/layout/CategoriesLayout'
import { Translation } from 'react-i18next'
import VEGETABLE_IMG from '../assets/images/vegetable.png'
import RICE_IMG from '../assets/images/rice.png'
import OIL_IMG from '../assets/images/oil.png'
import { db } from '../firebase'
import { FOODS } from '../api'

class Categories extends Component 
{
    state = {
        vegetables: [],
        rices: [],
        oils: []
    }

    getVegetables = () => {
        db
        .ref(FOODS)
        .orderByChild('category/title')
        .equalTo('ဟင်းသီးဟင်းရွက်')
        .on('value' , snapshot => {
            let data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })

            this.setState({
                vegetables: data
            })
        })
    }

    getRices = () => {
        db
        .ref(FOODS)
        .orderByChild('category/title')
        .equalTo('ဆန်')
        .on('value' , snapshot => {
            let data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })

            this.setState({
                rices: data
            })
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
        this.getVegetables()
        this.getRices()
        this.getOils()
        window.scrollTo(0,0)
    }

    render() {

        const { vegetables , rices , oils } = this.state

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
                        {(t) => <>{t('main.menu.itemCategories')}</>}
                    </Translation>
                </h4>
                <div className="pt-4 mt-3 border-top">
                    <div className="row">
                        <div className="col-6 col-lg-3 mb-4 text-center">
                            <Link
                                to="/category/vegetables"
                                className="text-decoration-none cat-link-hover text-dark"
                            >
                                <img
                                    src={VEGETABLE_IMG}
                                    alt="ဟင်းသီးဟင်းရွက်"
                                    className="rounded-circle p-1 bg-white"
                                    style={{
                                        width: '140px',
                                        maxWidth: '100%'
                                    }}
                                /><br />
                                <span 
                                    className="d-inline-block mt-2"
                                >
                                    <Translation>
                                        {(t) => <>{t('main.list.vegetables')}</>}
                                    </Translation><br /><small className="text-muted">( {vegetables.length} <Translation>{(t) =><>{t('main.items')}</>}</Translation> )</small>
                                </span>
                            </Link>
                        </div>
                        <div className="col-6 col-lg-3 mb-4 text-center">
                            <Link
                                to="/category/rices"
                                className="text-decoration-none cat-link-hover text-dark"
                            >
                                <img
                                    src={RICE_IMG}
                                    alt="ဆန်"
                                    className="rounded-circle p-1 bg-white"
                                    style={{
                                        width: '140px',
                                        maxWidth: '100%'
                                    }}
                                /><br />
                                <span 
                                    className="d-inline-block mt-2"
                                >
                                    <Translation>
                                        {(t) => <>{t('main.list.rices')}</>}
                                    </Translation><br /><small className="text-muted">( {rices.length} <Translation>{(t) =><>{t('main.items')}</>}</Translation> )</small>
                                </span>
                            </Link>
                        </div>
                        <div className="col-6 col-lg-3 mb-4 text-center">
                            <Link
                                to="/category/oils"
                                className="text-decoration-none cat-link-hover text-dark"
                            >
                                <img
                                    src={OIL_IMG}
                                    alt="ဆီ"
                                    className="rounded-circle p-1 bg-white"
                                    style={{
                                        width: '140px',
                                        maxWidth: '100%'
                                    }}
                                /><br />
                                <span 
                                    className="d-inline-block mt-2"
                                >
                                    <Translation>
                                        {(t) => <>{t('main.list.oils')}</>}
                                    </Translation><br /><small className="text-muted">( {oils.length} <Translation>{(t) =><>{t('main.items')}</>}</Translation> )</small>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </CategoriesLayout>
        )
    }
}

export default withRouter(Categories)