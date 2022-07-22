import React from 'react' 
// import ReactDOM from 'react-dom'
import ReactDOM from "react-dom/client";

import "./styles/index.scss"
import abc from "./images/Diamond.png"

function App() {
    return (
        <div className="container">
            <h1>TMS</h1>
            <img src={abc}/>
        </div>
    )
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

