import React, { Component } from 'react'
import {
    withRouter
  } from "react-router-dom";
require('moment');

class CardCourse extends Component {
    constructor(props) {
        super(props);
        this.chagePath = this.chagePath.bind(this)
    }
    chagePath(){
        console.log(this.props.history.push(`course/${this.props.item.id}`))
    }
    render () {
        return (
            <div className="card" >
                <img className="card-img-top" src="https://via.placeholder.com/150"/>
                <div className="card-body">
                    <h5 className="card-title mb-1">{this.props.item.name}</h5>
                    <p className="card-text mb-2">คอร์สประเภท : {this.props.item.category_name}</p>
                    <p className="card-text mb-1">{this.props.item.description}</p>
                    <p className="card-text mb-1">จำนวนที่เปิดรับ : {this.props.item.number_student}</p>
                    <p className="card-text mb-1">ช่วงเวลา : {moment(this.props.item.start).format('DD/MM/YYYY HH:mm')} - {moment(this.props.item.end).format('DD/MM/YYYY HH:mm')}</p>
                    <div className="text-right">
                        <button onClick={this.chagePath} className="btn btn-primary">ดูรายละเอียดเพิ่มเติม</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(CardCourse)