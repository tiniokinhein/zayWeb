import React, { Component } from 'react'
import Sticky from 'react-sticky-el'
import MenuBar from './MenuBar'
import Footer from './Footer'

export default class Layout extends Component 
{
    render() {
        return (
            <React.Fragment>
                <div
                    className="sticky-menu"
                >
                    <Sticky 
                        style={{
                            transform: 'none',
                            WebkitTransform: 'none'
                        }}
                    >
                        <MenuBar />
                    </Sticky>
                </div>

                {this.props.children}

                <Footer />
            </React.Fragment>
        )
    }
}
