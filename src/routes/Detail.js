import React from "react";
import { connect } from "react-redux";
// import { useParams } from "react-router-dom";

function Detail({ toDo }){
    // const id = useParams(); // React Hooks 라고 함, useParams() 대신에 mapStateToProps의 state에서 id를 가져와서 이용해보도록 하자
    return (
        <>
            <h1>{toDo?.text}</h1>
            <h5>Create at: {toDo?.id}</h5>
        </>
    )
}

function mapStateToProps(state, ownProps){
    // console.log(ownProps);              // console을 보면, props 중에 match가 있고 match 안에는 params:{id:"~~~"} 가 있다.
    const {match: {params: {id}}} = ownProps;   // 위에서 ownProps를 통해 얻은 id를 활용해보자.
    return { toDo: state.find(toDo => toDo.id === parseInt(id)) };   // find는 testing function에 만족하는 첫번째 요소를 반환(첫번째 요소만 반환하는 것이 filter와는 다르다)
}   

export default connect(mapStateToProps)(Detail);