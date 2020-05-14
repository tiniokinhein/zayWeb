import React, { Component } from 'react'
import { withRouter , Link } from 'react-router-dom'
import { Translation } from 'react-i18next'
import VEGETABLE_IMG from '../../assets/images/vegetable.png'
import RICE_IMG from '../../assets/images/rice.png'
import OIL_IMG from '../../assets/images/oil.png'
import { db } from '../../firebase'
import { FOODS } from '../../api'

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
    }

    render() {

        const { vegetables , rices , oils } = this.state

        return (
            <>
                <h5
                    className="mt-5 mb-3 text-dark font-weight-bold"
                    style={{
                        fontSize: '18px',
                        lineHeight: '2'
                    }}
                >
                    <Translation>
                        {(t) => <>{t('main.menu.itemCategories')}</>}
                    </Translation>
                </h5>
                <div className="row mx-0">
                    <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 text-center">
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
                    <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 text-center">
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
                    <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 text-center">
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
            </>
        )
    }
}

export default withRouter(Categories)