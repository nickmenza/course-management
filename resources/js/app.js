import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link } from 'react-router-dom'
import Header from './header'

import Pages from './pages'
import cookie from 'react-cookies'
import Layout from './layout';
import axios from 'axios';
import { Provider, connect } from 'react-redux'
import rootReducer from './reducers'
import { createStore, combineReducers, applyMiddleware} from 'redux';

const store = createStore(rootReducer)

const NotFound = () => <h1>404.. This page is not found!</h1>
const Unauthorized = () => (<Layout><h1>This page is Unauthorized</h1></Layout>)
const NotPermission = () => (<Layout><h1>This page is Not Permission</h1></Layout>)


class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading :true,
        }
        // this.apiGetUser = this.apiGetUser.bind(this)
    }

    componentDidMount(){
        this.getUsers()
    }

    async getUsers () {
        // console.log(this.props)
        let form = {
            api_token : cookie.load('api_token'),
        }
        try {
            let res = await axios.get("/api/profile",{params : form});
            // this.state.user = res.data
            // console.log(res)
            this.props.SET_USER({user : res.data})
            this.state.loading = false;
            this.forceUpdate()
        } catch (err) {
            console.log(err)
            if( err.response.status == 401){
                // console.log(true)
                // this.props.history.push('/login')
                this.state.loading = false;
                this.forceUpdate()
            }
        }

        
        // this.props.history.push('/login')
    };

    render () {
    return (
        <Router>
            {this.state.loading ? 'loading...' :
            <Switch>
                <Route path="/login">
                    <Pages.Login/>
                </Route>
                <Route path="/register">
                    <Pages.Register/>
                </Route>
                <Route path="/course/:course_id">
                    <Pages.Course/>
                </Route>
                <PrivateRouteInstructorTest path="/manage-course/:id" component={Pages.ManageCourseEdit} ></PrivateRouteInstructorTest>
                <PrivateRouteInstructorTest path="/manage-course" component={Pages.ManageCourse} ></PrivateRouteInstructorTest>
                <PrivateRouteTest path="/profile" component={Pages.Profile}></PrivateRouteTest>
                <PrivateRouteTest path="/" component={Pages.Home} exact></PrivateRouteTest>
                <Route component={NotFound} />
            </Switch>
            }
        </Router>
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

const PrivateRoute = ((props) => (
    props.user.id ? 
    <Route {...props} >
    </Route>
    : 
    <Redirect to='/login' />
))

const PrivateRouteTest = connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)

const PrivateRouteInstructor = ((props) =>(
    props.user.id ?
        props.user.role_id == 2 ? 
        <Route {...props} > 
        </Route>
        :
        <NotPermission/>
    : 
    <Redirect to='/login' />
))

const PrivateRouteInstructorTest = connect(mapStateToProps, mapDispatchToProps)(PrivateRouteInstructor)



// const PrivateRoute1 = connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)

const AppConnect = connect(mapStateToProps, mapDispatchToProps)(App)


ReactDOM.render(<Provider store={store}><AppConnect /></Provider>, document.getElementById('main-course'))