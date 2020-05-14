import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import VegetableList from '../components/foods/vegetable/List'
import RiceList from '../components/foods/rice/List'
import OilList from '../components/foods/oil/List'
import Banners from '../components/Banners'
import Layout from '../components/layout/Layout'

class Home extends Component 
{

    render() {

        return (
            <Layout>
                <div className="bg-light pb-5">
                    <Banners />
                    <div className="container">
                        <VegetableList /> 
                        <OilList />
                        <RiceList />
                    </div>
                </div>
            </Layout>
        )
    }
}


export default withRouter(Home)