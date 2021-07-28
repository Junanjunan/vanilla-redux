import { createStore } from "redux";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = text => {
    return { type: ADD_TODO, text };     // {text:text} -> {text} 로 표현한 것과 동일
}

const deleteToDo = id => {
    return { type: DELETE_TODO, id };
}


const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            const newToDoObj = { text: action.text, id: Date.now() }
            return [...state, newToDoObj ];    // ...state: ES6 spread, 두개 순서를 바꾸면 새로작성하는게 먼저 온다 [{ text: action.text, id: Date.now() }, ...state ]
        case DELETE_TODO:
            const cleaned = state.filter(toDo => toDo.id !== action.id); // action.id는 삭제할 li의 id, filter()는 테스트 통과한 거는 남겨두는 method, 따라서 filter test를 해주는 toDo.id는 남겨놓을 li의 id이기 때문에 toDo.id !== action.id! 이어야 한다.
            return cleaned;
        default:
            return state;
    }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const paintToDos = () => {
    const toDos = store.getState();
    ul.innerHTML = "";      // 중복되서 추가되는걸 막기 위해
    toDos.forEach(toDo => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.innerText = "DEL";
        btn.addEventListener("click", dispatchDeleteToDo);
        li.id = toDo.id;
        li.innerText = toDo.text;
        ul.appendChild(li);
        li.appendChild(btn);
    });
};

store.subscribe(paintToDos)

const dispatchAddToDo = text => {
    store.dispatch(addToDo(text));     // {text:text} -> {text} 로 표현한 것과 동일
};

const dispatchDeleteToDo = (e) => {
    // console.log(e.target);      // <button>DEL</button> 으로 e.target이 출력, 우리는 target의 parentNode를 알아야 한다.
    // console.log(e.target.parentNode); // <li id="~~">...</li> 출력 -> 하는 이유는 삭제할 todo의 id가 필요하기 때문
    // console.log(e.target.parentNode.id); // 이렇게 하면 id 값만 출력 이를 이용
    const id = parseInt(e.target.parentNode.id);    // HTML으로부터 string으로 넘어올테니까 parseInt를 해주자
    store.dispatch(deleteToDo(id));
};

const onSubmit = e => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);