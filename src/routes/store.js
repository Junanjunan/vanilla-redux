import { createStore } from "redux";
import { createAction } from "@reduxjs/toolkit";


const ADD = "ADD";
const DELETE = "DELETE";



// const addToDo = text => {
//     return {
//         type: ADD,
//         text
//     };
// };

const addToDo = createAction("ADD");

// const deleteToDo = id => {
//     return {
//         type: DELETE,
//         id
//     };
// };

const deleteToDo = createAction("DELETE");

console.log(addToDo(), deleteToDo());       // 이렇게 함수를 호출해보면, type과 payload과 함께 나옴을 볼 수 있다.
                                            // 또한 Add를 해도 To do 가 빈상태로 나타나는데, 이는 Home.js에서 addToDo가 text를 받는 것으로 했는데, toolkit에서는 payload로 바뀐다. 자동으로. 일종의 관행(convention)임
                                            // toolkit에서는 action에 보내고 싶어하는 정보가 무엇이던지 payload에 담겨서 보내진다.

const reducer = (state = [], action) =>{
    switch (action.type){
        case addToDo.type:
            console.log(action);            // 위에서 설명한 것을 확인해보자. console을 보면 payload에 To do 로 Add 해준 것이 들어가있음
            return [{ text: action.text, id: Date.now() }, ...state];
        case deleteToDo.type:
            return state.filter(toDo => toDo.id !== action.payload); // toolkit의 createAction으로 deleteToDo를 만들었으므로 action은 더 이상 id를 갖지 않는다. payload로 대체해야 DEL 버튼이 작동해서 삭제가 된다.
        default:
            return state;
    }
}

const store = createStore(reducer);

export const actionCreators = {
    addToDo,
    deleteToDo
}

export default store;