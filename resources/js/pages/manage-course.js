import React, { Component } from 'react'
import Layout from '../layout';
import Datetime from 'react-datetime';
import cookie from 'react-cookies'
import axios from 'axios';
import { connect } from 'react-redux';

class ManageCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoding : false,
            loading : false,
            data : [],
            form : {
                date : "",
                name : "",
            }
        }
        this.search = this.search.bind(this)
        this.apiGet = this.apiGet.bind(this)
        this.changeDatetime = this.changeDatetime.bind(this)
        
    }

    componentDidMount(){
        this.apiGet()
    }

    apiGet(){
        let form = {
            api_token : cookie.load('api_token'),
            name : this.name.value,
            date : this.state.form.date,
            user_id : this.props.user.id
        }
        this.state.loading = true;
        this.state.pageLoding = true;
        this.forceUpdate()
        axios.get('/api/course',{params : form})
        .then((response) => {
            // handle success
            let data = response.data
            console.log(response)
            this.setState({
                loading : false,
                pageLoding : false,
                ...data
            });
            // this.state.list = data.data;
            // this.state.loading = false;
            // this.state.pageLoding = false;
            // this.forceUpdate()
        })
        .catch(function (error) {
            console.log(error)
            alert('โหลดไม่สำเร็จ')
           
        })
    }

    search(e){
        e.preventDefault();
        this.apiGet()
    }

    changeDatetime(moment){
        this.state.form.date = moment.format('YYYY-MM-DD HH:mm')
    }

    render () {
    return (
        <Layout>
        <div className="container">
            <h5>
                จัดการคอร์ส
            </h5>

            <form className="row mb-1" onSubmit={this.search}>
                <div className="col-md-4 form-group">
                    <input type="text" className="form-control" placeholder="Search by name" 
                    ref = {input => this.name = input}/> 
                </div>
                <div className="col-md-4 form-group">
                    <Datetime timeFormat={"HH:mm"} inputProps={{placeholder : 'Time'}}
                    closeOnSelect = {true}
                    onChange = {this.changeDatetime}/>
                </div>
                <div className="col-md-2 form-group">
                    <button type="submit" className="btn btn-primary active w-100" disabled={this.state.loading}>ค้นหา</button>
                </div>
            </form>
            <div className="text-right">
                <button type="submit" className="btn btn-primary active " 
                onClick = {()=>this.props.history.push('/manage-course/create')}
                >สร้างคอร์ส</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">ชื่อ</th>
                    <th scope="col">รายละเอียด</th>
                    <th scope="col">ประเภท</th>
                    <th scope="col">จำนวน</th>
                    <th scope="col">เริ่ม</th>
                    <th scope="col">สิ้นสุด</th>
                    <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((item,index)=>
                    <tr>
                        <th scope="row">​{index+1}</th>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.category_name}</td>
                        <td>{item.number_student}</td>
                        <td>
                            {moment(item.start).format('YYYY-MM-DD HH:mm')}
                        </td>
                        <td>
                            {moment(item.end).format('YYYY-MM-DD HH:mm')}
                        </td>
                        <td>
                            <button type="button" className="btn btn-primary active"
                            onClick = {()=>this.props.history.push('/manage-course/'+item.id)}
                            >แก้ไข</button>
                        </td>

                    </tr>
                    )}
                </tbody>
                </table>
        </div>
        </Layout>
    )
    }
}

const mapStateToProps = state => ({
    ...state.UserReducer
})

const mapDispatchToProps = dispatch => ({
    // SET_USER: (data) => {
    //     dispatch({
    //         type: 'SET_USER',
    //         data
    //     });
    // },
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse)