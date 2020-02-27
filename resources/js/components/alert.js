import React, { Component } from 'react'

class Alert extends Component {
    
    render () {
        return (
            <div className={"alert "+this.props.class} role="alert">
                {this.props.text}
            </div>
        )
    }
}


export default Alert