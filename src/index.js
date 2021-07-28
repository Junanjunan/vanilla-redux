import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./routes/store";

ReactDOM.render(
    <Provider store={store}>      
        <App />
    </Provider>,    // src/routes/store.js의 store와 연결시켜주기 위해 react-redux의 Provider 사용
    document.getElementById("root")
);