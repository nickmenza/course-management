import React, { Component } from 'react'
import Layout from '../layout';
import Input from '../components/input'
import axios from 'axios';
import cookie from 'react-cookies'
import Alert from '../components/alert'



class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoading : false,
            loading : false,
            alert : {
                class : 'd-none',
                text : '',
            },
            errors : [],
            data : {

            }
        
        }
        this.apiGet = this.apiGet.bind(this)
        this.apiSend = this.apiSend.bind(this)
    }

    UNSAFE_componentWillMount(){
        this.state.pageLoading = true;
        this.forceUpdate()
        this.apiGet()
    }

    apiGet(){
        let form = {
            api_token : cookie.load('api_token'),
        }
        axios.get('/api/profile',{params : form})
        .then((response) => {
            // handle success
            let data = response.data

            this.setState({
                pageLoading : false,
                data : {
                    ...data
                }
            })
            console.log(this.state)
        })
        .catch(function (error) {
            console.log(error)
            // self.state.alert.class = 'alert-danger';
            // self.state.alert.text = 'เข้าระบบสำเร็จ';
            // self.state.errors = error.response.data.errors;
            // self.forceUpdate();
           
        })
    }

    apiSend(e) {
        e.preventDefault();
        let self = this

        let form = {
            firstname : this.firstname.value,
            lastname : this.lastname.value,
            nickname :this.nickname.value,
            birthday : this.birthday.value,
            gender : this.state.data.gender,
            api_token : cookie.load('api_token'),
        }
        this.state.loading = true;
        this.forceUpdate()
        axios.post('/api/profile-save',form)
        .then((response) => {
            // handle success
            let data = response.data
            this.state.alert.class = 'alert-success';
            this.state.alert.text = data.message;
            this.state.errors = {};
            this.state.loading = false;
            self.forceUpdate();
            this.forceUpdate()
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
            self.state.errors = error.response.data.errors;
            self.forceUpdate();
           
        })

    }

    render () {
    return (
        <Layout>
        <div className="container">
                {this.state.pageLoading ? "Loading..." : 
                <form className="page-login" onSubmit={this.apiSend}>
                    <h4 className="text-center">
                        โปรไฟล์
                    </h4>
                    <Alert {...this.state.alert}/>
                    <div className="form-group">
                        สถานะ : {this.state.data.role_id == 1 ? "Student" : "Instructor" }
                    </div>
                    <Input name="firstname" placeholder="Firstname" errors={this.state.errors}
                    type="text" defaultValue = {this.state.data.firstname}
                    setRef = {(value,input) => this[value] = input}
                    />
                    <Input name="lastname" placeholder="Lastname" errors={this.state.errors}
                    type="text" defaultValue = {this.state.data.lastname}
                    setRef = {(value,input) => this[value] = input}
                    />
                    <Input name="nickname" placeholder="Nickname" errors={this.state.errors}
                    type="text" defaultValue = {this.state.data.nickname}
                    setRef = {(value,input) => this[value] = input}
                    />
                    <Input name="birthday" placeholder="Birthday" errors={this.state.errors}
                    type="date" max={moment().format('Y-MM-D')} defaultValue = {this.state.data.birthday}
                    setRef = {(value,input) => this[value] = input}
                    />
                    
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" 
                            name="inlineRadioOptions" id="inlineRadio1" value="1"
                            checked = {this.state.data.gender == 1}
                            ref = {(input) => this.gender = input}
                            onChange = {(e)=>this.setState({
                                data : {
                                    ...this.state.data,
                                    gender : e.target.value
                                }
                            })}/>
                            <label className="form-check-label" htmlFor="inlineRadio1">ชาย</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" 
                            name="inlineRadioOptions" id="inlineRadio2" value="2"
                            checked = {this.state.data.gender == 2}
                            ref = {(input) => this.gender = input}
                            onChange = {(e)=>this.setState({
                                data : {
                                    ...this.state.data,
                                    gender : e.target.value
                                }
                            })}/>
                            <label className="form-check-label" htmlFor="inlineRadio2">หญิง</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary active w-100" disabled={this.state.loading}>บันทึก</button>
                </form>
                }
        </div>
        </Layout>
    )
    }
}

export default Profile