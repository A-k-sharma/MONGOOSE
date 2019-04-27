import React, { Component } from 'react';
// import Itemlist from '../Itemlist/ItemList';
import '../App.css';
import axios from "axios"

class Todolist extends Component {
    constructor() {
        super()
        this.state = {
            items: [],
            newitem: ""
        }

        axios.get("http://localhost:9000/").then(response => {
            console.log(response.data);
            this.setState({
                items: response.data
            })
        })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleClick = () => {
        const obj = { desc: "" };
        obj.desc = this.state.newitem;
        // itemlist.push(obj);
        console.log(obj, "<<<itemlist")
        axios.post("http://localhost:9000/todos", obj)
            .then(response =>{ this.setState({
                items: response.data,
                newitem: ""
            })
                console.log("inside  method", obj,response.data);

            });

    }

    delete = (id) => {
        console.log(id);
        axios.delete("http://localhost:9000/todos/" + id)
            .then(res => {
                if (res.data.isSuccess === true) {
                    axios.get("http://localhost:9000/").then(response => {
                        this.setState({
                            items: response.data,
                            newitem: ""
                        })
                    })
                }
                // console.log('then' +JSON.stringify(response));
            }).catch(err => {
            console.log('err' + JSON.stringify(err));
        });
    }
    render() {
        return(
            <div>
                <h1>Todo Component</h1>
                    <input type="text" className={'text-field'} onChange={this.handleChange} name={"newitem"} required/>
                    <input type={"button"} className={"form-btn"} value={"Add"} onClick={this.handleClick}/>
                {this.state.items.map((list, index) =>{ return(
                    <div className="item">
                        <div className={"task"}>{list.description}</div>
                            <div className={"item-btn"}>
                                <button onClick={() => {
                                    this.delete(list._id)
                                }} className={"btn-del"}>Delete
                                </button>
                            </div>
                    </div>
                )})}

            </div>

        )
    }
}

export default Todolist;