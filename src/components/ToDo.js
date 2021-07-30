import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { remove } from "../routes/store";


function ToDo({ text, onBtnClick, id }){
    return (
        <li>
            <Link to={`/${id}`}>
            {text}
            </Link>
            <button onClick={onBtnClick}>DEL</button>
        </li>
    )
}

function mapDispatchToProps(dispatch, ownProps){
    return{
        onBtnClick: () => dispatch(remove(ownProps.id))     //deleteToDo는 id가 필요한데, console.log(ownProps)를 해보면 id를 이미 갖고 있다. 그러니 필요한 id를 ownProps로부터 받아오자.
    }
}

export default connect(null, mapDispatchToProps)(ToDo);