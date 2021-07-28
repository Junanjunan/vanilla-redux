import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators, addToDo } from "./store";

function Home({ toDos, addToDo }) {
    const [text, setText] = useState(""); // react hooks useState()
    function onChange(e) {
        setText(e.target.value);
    };
    function onSubmit(e) {
        e.preventDefault();
        addToDo(text);
        setText("");
    }
    return (
        <>
            <h1>To do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button>Add</button>
            </form>
            <ul>{JSON.stringify(toDos)}</ul>
        </>      // <></> is called a Fragment, It's a ReactJS feature. <></> = <Fragment></Fragment> / react는 하나의 태그만 return 되는데 react.fragment는 두개 리턴 시켜준다. 라고 함
    );
}

function mapStateToProps(state) { // ownProps는 필요 없어서 삭제
    return { toDos: state }
}

function mapDispatchToProps(dispatch, ownProps){
    // console.log(dispatch);   // dispatch(action){~~~} 출력. action을 받는, 내가 알고 있는 그 dispatch이다.
    return {
        addToDo: (text) => dispatch(actionCreators.addToDo(text)) // addToDo: text를 받는 actionCreators.addToDo() 를 action으로 받는 dispatch 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);