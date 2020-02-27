import React, { Component } from 'react'
import {
    Link,
    withRouter
  } from "react-router-dom";
import Layout from '../layout';
import axios from 'axios';
import Alert from '../components/alert'
import Input from '../components/input'
import cookie from 'react-cookies'
import { connect } from 'react-redux';

  
class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            alert : {
                class : 'd-none',
                text : '',
            },
            errors : []
        
        }
        this.apiSend = this.apiSend.bind(this)
    }

    apiSend(e) {
        e.preventDefault();
        let self = this

        const form = {
            username : this.username.value,
            password : this.password.value
        }
        this.state.loading = true;
        this.forceUpdate()
        axios.post('/api/login',form)
        .then((response) => {
            // handle success
            let {data} = response
            if(data.status == 200){
                self.state.alert.class = 'alert-success';
                self.state.alert.text = data.message;
                self.state.errors = {};
                self.state.loading = false
                cookie.save('api_token', data.token, { path: '/' })
                this.props.SET_USER({user : data.user})
                self.forceUpdate();
                self.props.history.push('/profile')
            }else{
                self.state.alert.class = 'alert-danger';
                self.state.alert.text = data.message;
                self.state.errors = {};
                cookie.remove('api_token', { path: '/' })
                self.state.loading = false
                self.forceUpdate();
            }
        })
        .catch(function (error) {
            console.log(error)
            // self.state.alert.class = 'alert-danger';
            // self.state.alert.text = 'เข้าระบบสำเร็จ';
            self.state.errors = error.response.data.errors;
            self.forceUpdate();
           
        })
    }

    render () {
        // console.log(cookie.load('api_token'))
    return (
        <Layout>
            <div className="container">
                <form className="page-login" onSubmit={this.apiSend}>
                    <h4 className="text-center">
                        เข้าสู่ระบบ
                    </h4>
                    <Alert {...this.state.alert}/>
                    <Input name="username" placeholder="Username" errors={this.state.errors}
                    type="text"
                    setRef = {(value,input) => this[value] = input}
                    />

                    <Input name="password" placeholder="Password" errors={this.state.errors}
                    type="password"
                    setRef = {(value,input) => this[value] = input}
                    />
                    
                    <button type="submit" className="btn btn-primary active w-100" disabled={this.state.loading}>เข้าสู่ระบบ</button>
                    <div className="row">
                        <div className="col-6">
                            <Link className="btn btn-outline-primary w-100" to="/register">สมัครสมาชิกแบบ Student</Link>
                        </div>
                        <div className="col-6">
                            <Link className="btn btn-outline-primary w-100" to="/register">สมัครสมาชิกแบบ Instructor</Link>
                        </div>
                    </div>

                </form>
            </div>
        </Layout>
    )
    }
}

const mapStateToProps = state => ({
    ...state.UserReducer
})

const mapDispatchToProps = dispatch => ({
    SET_USER: (data) => {
        dispatch({
            type: 'SET_USER',
            data
        });
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))

// export default withRouter(Login)