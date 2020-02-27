import React, { Component } from 'react'
import CardCourse from '../components/cardCourse'
import Pagination from '../components/pagination'

import Layout from '../layout';
import Datetime from 'react-datetime';
import cookie from 'react-cookies'
import axios from 'axios';


require('moment');

class Home extends Component {
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
        this.pageLoding = true
        this.forceUpdate()
        this.apiGet()
    }
   
    apiGet(page = 1){
        let form = {
            api_token : cookie.load('api_token'),
            name : this.name.value,
            date : this.state.form.date,
            page : page
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

    chagePage(page){
        console.log('chagePage')
        this.apiGet(page)
    }

    render () {
    return (
        <Layout>
            <div className="container">
                <form className="row" onSubmit={this.search}>
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
                {this.state.pageLoding ? "Loading..." :
                <div>
                    <div className="text-right">มีทั้งหมด {this.state.total} คอร์ส</div>
                    <div className="row form-group">
                        {
                            this.state.data.map((item,index)=>
                                <div className="col-6 col-md-4 col-lg-3 mb-2" key={index}>
                                <CardCourse  item={item}/>
                                </div>
                            )
                        }
                    </div>
                    <Pagination text_align ={"justify-content-end"} {...this.state} chagePage = {(page)=>this.chagePage(page)}/>
                </div>
                }
            </div>
        </Layout>
    )
    }
}

export default Home