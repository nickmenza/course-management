import React, { Component } from 'react'

class Input extends Component {
    componentDidMount () {
    }
    render () {
        let error = this.props.errors[this.props.name]
       
        // this.props.errors.find((value,index) => console.log(value))
        // console.log(this.props.errors)
        // console.log( this.props.errors.findIndex(this.props.name))
        return (
           
            <div className="form-group">
                <label htmlFor={"Input"+this.props.placeholder}>{this.props.placeholder}</label>
                <input type={this.props.type} className={error ? "form-control is-invalid" : "form-control"}
                placeholder={this.props.placeholder} id={"Input"+this.props.placeholder} autoComplete="off"
                name={this.props.name}
                ref = {input => this.props.setRef(this.props.name,input)}
                max = {this.props.max ? this.props.max : null}
                defaultValue = {this.props.defaultValue}
                />
                {error ?
                <div className="invalid-feedback">
                    <label>
                        {error[0]}
                    </label>
                </div> 
                : null}
                
            </div>
        )
    }
}


export default Input