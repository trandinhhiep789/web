import React from 'react' 
import ReactDOM from 'react-dom'

import "./styles/main.scss"

// Tạo component App
function App() {
    return (
        <div className="container">
            <h1>TMS</h1>
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))

