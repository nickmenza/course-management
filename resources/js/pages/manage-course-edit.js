import React, { Component } from 'react'
import Layout from '../layout';
import Alert from '../components/alert'
import Input from '../components/input'
import cookie from 'react-cookies'
import axios from 'axios';
import Datetime from 'react-datetime';


class ManageCourseEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoading : false,
            loading : false,
            // alert : {
            //     class : 'd-none',
            //     text : '',
            // },
            category : [],
            errors : [],
            data : {
                // start : moment(),
                // end : moment(),
            }
        
        }
        this.apiPost = this.apiPost.bind(this)
        this.changeStartDatetime = this.changeStartDatetime.bind(this)
        this.changeEndDatetime = this.changeEndDatetime.bind(this)
        this.changeCategory = this.changeCategory.bind(this)
    }

    componentWillMount(){
        // if(this.props.match.params.id != 'create'){
        //     this.state.pageLoading = true
        //     this.forceUpdate()
        //     this.apiGet()
        // }
        this.state.pageLoading = true
        this.forceUpdate()
        this.apiGet()
    }

    apiGet(){
        let form = {
            api_token : cookie.load('api_token'),
        }
        let ar_  = [];
        let getCategory = axios.get("/api/category");
        ar_.push(getCategory);
        if(this.props.match.params.id != 'create'){
            let getCourse = axios.get('/api/course/'+this.props.match.params.id ,{params : form});
            ar_.push(getCourse);
        }

        axios.all(ar_).then(axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1] ? responses[1] : {}
            // console.log(responses)
            if(this.props.match.params.id != 'create'){
                this.setState({
                    pageLoading : false,
                    category : responseOne.data,
                    data : {
                        ...responseTwo.data,
                        start : moment(responseTwo.data.start),
                        end : moment(responseTwo.data.end),
                    }
                })
            }else{
                this.setState({
                    pageLoading : false,
                    category : responseOne.data,
                })
            }
            console.log(responseOne,responseTwo)
        })).catch(errors => {
            console.log(errors)
        // react on errors.
        })
    }

    apiPost(e){
        let self = this
        e.preventDefault();
        const form = {
            name : this.name.value,
            description : this.description.value,
            number_student : this.number_student.value,
            start : this.state.data.start.format('YYYY-MM-DD HH:mm'),
            end : this.state.data.end.format('YYYY-MM-DD HH:mm'),
            category_id : this.state.data.category_id,

            api_token : cookie.load('api_token'),

        }
        console.log(form)
        let success = (response) =>{
            console.log(response)
            this.props.history.push('/manage-course')
        }
        let axcatch = (error) => {
            this.state.errors = error.response.data.errors;
            this.forceUpdate();
        }
        // let url = '/api/course'
        if(this.props.match.params.id != 'create'){
            let ax = axios.patch('/api/course/'+this.props.match.params.id ,form).then(success).catch(axcatch)
        }else{
            let ax = axios.post('/api/course',form).then(success).catch(axcatch)
        }

       
    }

    changeStartDatetime(moment){
        // console.log('changeStartDatetime',moment.format('YYYY-MM-DD HH:mm'))
        this.state.data.start = moment
        this.forceUpdate()
    }

    changeEndDatetime(moment){
        // console.log('changeStartDatetime',moment)
        this.state.data.end = moment
        this.forceUpdate()
    }

    changeCategory(e){
        this.state.data.category_id = e.target.value
        this.forceUpdate()
    }


    render () {
        let title = "แก้ไขคอร์ส"
        if(this.props.match.params.id =="create"){
            title = "สร้างคอร์ส"
        }
    
    return (
        <Layout>
        <div className="container">
            {this.state.pageLoading ? "Loading..." : 
            <form className="page-login" onSubmit={this.apiPost}>
                <h4 className="text-center">
                    {title}
                </h4>
                <Alert {...this.state.alert}/>
                <div className="form-group">
                    <label for="Inputnumber_start">Category</label>
                    <select className="form-control" value={this.state.data.category_id}
                    onChange = {this.changeCategory}
                    >
                        <option value = "">กรุณาเลือก</option>
                        {this.state.category.map((item) =>
                        <option value = {item.id}>{item.category_name}</option>
                        )}
                    </select>
                    {this.state.errors.category_id ?
                    <div className="" style={{marginTop : '.25rem', fontSize: '80%', color: '#f44336'}}>
                        <label>
                            {this.state.errors.category_id[0]}
                        </label>
                    </div> 
                    : null}
                </div>
                <Input name="name" placeholder="Name" errors={this.state.errors}
                defaultValue = {this.state.data.name}
                type="text"
                setRef = {(value,input) => this[value] = input}
                />

                <Input name="description" placeholder="Description" errors={this.state.errors}
                defaultValue = {this.state.data.description}
                type="text"
                setRef = {(value,input) => this[value] = input}
                />
                
                <Input name="number_student" placeholder="Number_student" errors={this.state.errors}
                defaultValue = {this.state.data.number_student}
                type="text"
                setRef = {(value,input) => this[value] = input}
                />

                <div className="form-group">
                    <label htmlFor="Inputnumber_start">Start</label>
                    <Datetime timeFormat={"HH:mm"} inputProps={{placeholder : 'Time'}}
                        // closeOnSelect = {true}
                        value = { this.state.data.start}
                        onChange = {this.changeStartDatetime}
                        // className={this.state.errors.start ? "is-invalid" : ""}
                    />
                    {this.state.errors.start ?
                    <div className="" style={{marginTop : '.25rem', fontSize: '80%', color: '#f44336'}}>
                        <label>
                            {this.state.errors.start[0]}
                        </label>
                    </div> 
                    : null}
                </div>

                <div className="form-group">
                    <label htmlFor="Inputnumber_start">End</label>
                    <Datetime timeFormat={"HH:mm"} inputProps={{placeholder : 'Time'}}
                        closeOnSelect = {true}
                        value = { this.state.data.end}
                        onChange = {this.changeEndDatetime}
                    />
                    {this.state.errors.end ?
                    <div className="" style={{marginTop : '.25rem', fontSize: '80%', color: '#f44336'}}>
                        <label>
                            {this.state.errors.end[0]}
                        </label>
                    </div> 
                    : null}
                </div>

                <button type="submit" className="btn btn-primary active w-100" disabled={this.state.loading}>บันทึก</button>
            </form>
            }
        </div>
        </Layout>
    )
    }
}

export default ManageCourseEdit