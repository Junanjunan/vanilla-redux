import React, { useState } from "react";
import { connect } from "react-redux";

function Home({ toDos }) {
    const [text, setText] = useState(""); // react hooks useState()
    function onChange(e) {
        setText(e.target.value);
    };
    function onSubmit(e) {
        e.preventDefault();
        setText = "";
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

export default connect(mapStateToProps)(Home);