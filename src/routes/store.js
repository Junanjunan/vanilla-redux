// import { createStore } from "redux";
// import { configureStore, createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { configureStore, createSlice } from "@reduxjs/toolkit";

// const ADD = "ADD";
// const DELETE = "DELETE";


// const addToDo = text => {
//     return {
//         type: ADD,
//         text
//     };
// };

// const addToDo = createAction("ADD");

// const deleteToDo = id => {
//     return {
//         type: DELETE,
//         id
//     };
// };

// const deleteToDo = createAction("DELETE");

// console.log(addToDo(), deleteToDo());       // 이렇게 함수를 호출해보면, type과 payload과 함께 나옴을 볼 수 있다.
                                            // 또한 Add를 해도 To do 가 빈상태로 나타나는데, 이는 Home.js에서 addToDo가 text를 받는 것으로 했는데, toolkit에서는 payload로 바뀐다. 자동으로. 일종의 관행(convention)임
                                            // toolkit에서는 action에 보내고 싶어하는 정보가 무엇이던지 payload에 담겨서 보내진다.

// const reducer = (state = [], action) =>{
//     switch (action.type){
//         case addToDo.type:
//             console.log(action);            // 위에서 설명한 것을 확인해보자. console을 보면 payload에 To do 로 Add 해준 것이 들어가있음
//             return [{ text: action.text, id: Date.now() }, ...state];
//         case deleteToDo.type:
//             return state.filter(toDo => toDo.id !== action.payload); // toolkit의 createAction으로 deleteToDo를 만들었으므로 action은 더 이상 id를 갖지 않는다. payload로 대체해야 DEL 버튼이 작동해서 삭제가 된다.
//         default:
//             return state;
//     }
// }

// const reducer = createReducer([],{          // default state를 []로 설정
//     [addToDo]: (state, action) => {
//         state.push({ text: action.payload, id: Date.now() });       // redux toolkit을 할때는 state.push 즉, state를 mutate 해도 괜찮다. 그 이유는? redux toolkit이 immer라는 것 아래에서 작동되기 떄문이다. immer, redux toolkit이 알아서 해준다고 함... 
//     },
//     [deleteToDo]: (state, action) => 
//     state.filter(toDo => toDo.id !== action.payload)            // 위와 다르게 얘는 => {} 이 아니라 => 로만 되어있는데, 이건 filter를 한 state를 바로 return한 것이라고 함
// })

// addToDo는 바로 return 하지 않고 {} 안에 작성, deleteToDo는 {} 없이 바로 return, 왜 이런 차이가 있을까?
// addToDO의 경우 state.push, 즉 state를 mutate 하게 되는데, 이때는 바로 return 할 수 없다.
// state를 mutate 하는 경우는 바로 return 안된다. 바로 return 할 수 있는 경우는 새로운 state를 return 하는 경우에 가능
// state.push는 기존에 있는 state에 무언가를 직접 추가하는 mutate(, mutate 자체는 값을 return 하지 않는다.?) state.filter는 state 중에서 조건 만족하는 일부만 가지고 새로운 state를 return 하는 것
// redux-toolkit의 documentaion에서 createReducer 부분을 읽어보면 나와있다.

const toDos = createSlice({
    name:'toDosReducer',
    initialState: [],
    reducers: {
        add: (state, action) => {
            state.push({ text: action.payload, id: Date.now() })
        },
        remove: (state, action) => 
            state.filter(toDo => toDo.id !== action.payload)
    }
})

// const store = createStore(reducer);
const store = configureStore({ reducer: toDos.reducer });   // toDos의 reducer를 export해서 store의 reducer를 다시 설정해주자. toDos의 createSlice가 알아서 reducer를 우리에게 준다.
// createStore 대신 configureStore를 쓰면, brower에서 redux dev tools를 사용 가능, 우선 구글에서 redux devtools를 다운해놓은 상태여야
// redux dev tools를 이용해서, redux를 이용하는 사이트들의 state 등을 볼 수 있다.

// console.log(toDos.actions); // {add:f, remove:f} 라고 출력

// export const actionCreators = {
//     addToDo,
//     deleteToDo
// }

export const { add, remove } = toDos.actions;

export default store;