import React, { Component } from 'react'
import {
    Link,
  } from "react-router-dom";
import Layout from '../layout';
import axios from 'axios';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert_message : '',
            alert_class : 'd-none',
            error : {}
        }
        this.apiSend = this.apiSend.bind(this)
    }
    apiSend(e) {
        e.preventDefault();
        let self = this
        console.log(this.username.value)
        const form = {
            firstname : this.firstname.value,
            lastname : this.lastname.value,
            nickname : this.nickname.value,
            birthday : this.birthday.value,
            username : this.username.value,
            password : this.password.value
        }
        axios.post('/api/register',form)
        .then(function (response) {
            // handle success
            self.setState({
                alert_message : 'dsadsa',
                alert_class : 'alert alert-success'
            })
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }
    render () {
    return (
        <Layout>
            <div className="container">
                <form className="page-login" onSubmit={this.apiSend}>
                    <h4 className="text-center">
                        สมัครสมาชิกแบบ Student
                    </h4>

                    <div className={this.state.alert_class} role="alert">
                        {this.state.alert_message}
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="InputFirstname">Firstname</label> */}
                        <input type="text" className="form-control" placeholder="Firstname" id="InputFirstname"
                        ref={input => this.firstname = input}/>
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="InputLastname">Lastname</label> */}
                        <input type="text" className="form-control" placeholder="Lastname" id="InputLastname"
                        ref={input => this.lastname = input}/>
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="InputNickname">Nickname</label> */}
                        <input type="text" className="form-control" placeholder="Nickname" id="InputNickname"
                        ref={input => this.nickname = input}/>
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="InputBirthday">Birthday</label> */}
                        <input type="date" className="form-control" placeholder="Birthday" id="InputBirthday"
                        ref={input => this.birthday = input}/>
                    </div>

                    <div className="form-group">
                        {/* <label htmlFor="InputUsername">Username</label> */}
                        <input type="text" className="form-control" placeholder="Username" id="InputUsername" autoComplete="off"
                        ref={input => this.username = input}/>
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="InputPassword">Password</label> */}
                        <input type="password" className="form-control" id="InputPassword" placeholder="Password" autoComplete="new-password"
                        ref={input => this.password = input}/>
                    </div>
                    <button type="submit" className="btn btn-primary active w-100">สมัครสมาชิก</button>
                    <Link className="btn btn-outline-primary w-100" to="/login">เข้าสู่ระบบ</Link>

                </form>
            </div>
        </Layout>
    )
    }
}

export default Register