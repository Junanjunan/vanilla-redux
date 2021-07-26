import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (count=0, action) => {    // reducer를 countModifier로 명명 , state 초기값을 주지 않으면 0을 초기값으로 갖는다고 함
    switch (action.type){
        case ADD:                               
            return count +1;
        case MINUS:
            return count -1;
        default:
            return count;
    }
};

const countStore = createStore(countModifier);  // createStore는 reducer를 받아야 한다.() 안에가 reducer, 따라서 reducer를 위에 먼저 정의

const onChange = () => {
    number.innerText = countStore.getState();
}

countStore.subscribe(onChange);

const handleAdd = () => {
    countStore.dispatch({ type: "ADD" });
}

const handleMinus = () => {
    countStore.dispatch({ type: "MINUS" });  // Actions must be plain objects. -> objects: {type: "a"}
}

add.addEventListener("click", handleAdd);   // add.addEventListener("click", () => countStore.dispatch({type:"ADD"})) 
minus.addEventListener("click", handleMinus);