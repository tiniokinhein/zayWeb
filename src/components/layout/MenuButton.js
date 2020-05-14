import React, { Component } from 'react'

export default class MenuButton extends Component 
{
    showSideBar = () => {
        document.getElementById('sidebar-wrap').style.left = '0%'
    }

    render() {
        return (
            <div className="d-flex flex-column align-self-center mr-3 mr-sm-4">
                <button
                    className="btn shadow-none border-0 rounded-0 px-0"
                    onClick={this.showSideBar}
                >
                    <span
                        className="d-block"
                        style={{
                            width: '20px',
                            height: '2px',
                            background: 'linear-gradient(45deg, #007bff, #00fff3 80%)',
                            marginLeft: '10px'
                        }}
                    />
                    <span
                        className="d-block"
                        style={{
                            width: '30px',
                            height: '2px',
                            background: 'linear-gradient(45deg, #007bff, #00fff3 80%)',
                            margin: '5px 0'
                        }}
                    />
                    <span
                        className="d-block"
                        style={{
                            width: '25px',
                            height: '2px',
                            background: 'linear-gradient(45deg, #007bff, #00fff3 80%)',
                            marginLeft: '5px'
                        }}
                    />
                </button>
            </div>
        )
    }
}
