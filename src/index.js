import React from 'react' 
// import ReactDOM from 'react-dom'
import ReactDOM from "react-dom/client";

import "./styles/index.scss"

function App() {
    return (
        <div className="container">
            <h1>TMS</h1>
        </div>
    )
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

