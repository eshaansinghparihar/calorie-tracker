import React from "react";
import logo from './assets/logo.png'
function Loading()
{
    return(
        <div>
            <img src={logo} className="splash" alt="Loading logo"/>
            <h1>Hog 'N' Jog</h1>
        </div>

    )
}
export default Loading