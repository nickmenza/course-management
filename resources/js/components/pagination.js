
import React, { Component } from 'react'

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this)
    }
    changePage(page){
        // console.log(page)
        this.props.chagePage(page)
    }
    render () {
        const items = []
        for (let index = 1; index <= this.props.last_page; index++) {
            if(this.props.current_page == index){
                items.push(
                    <li className="page-item active" key={index}>
                        <span className="page-link">
                            {index}
                            <span className="sr-only">(current)</span>
                        </span>
                    </li>
                )
            }else{
                items.push(<li className="page-item" key={index}><span className="page-link" onClick={()=>this.changePage(index)}>{index}</span></li>)
            }
        }
    return (
        <nav aria-label="...">
            <ul className={"pagination "+this.props.text_align}>
                {/* <li class="page-item disabled">
                    <span class="page-link">Previous</span>
                </li> */}
                <li className={this.props.current_page == 1 ? "page-item disabled" : "page-item"}>
                    <span className="page-link" onClick={()=>this.changePage(this.props.current_page-1)}>Previous</span>
                </li>
                {items}
                {/* {this.props.last_page} */}
                {/* <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item active">
                <span class="page-link">
                    2
                    <span class="sr-only">(current)</span>
                </span>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li> */}
                {/* <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                </li> */}
                <li className={this.props.current_page == this.props.last_page ? "page-item disabled" : "page-item"}>
                    <span className="page-link" onClick={()=>this.changePage(this.props.current_page+1)}>Next</span>
                </li>
            </ul>
        </nav>
    )
    }
}

export default Pagination