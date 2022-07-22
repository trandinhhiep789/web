import React from 'react' 
import ReactDOM from 'react-dom'

import "./styles/main.scss"
import abc from "./images/Diamond.png"

// Tạo component App
function App() {
    return (
        <div className="container">
            <h1>TMS</h1>
            <img src={abc}/>
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))

