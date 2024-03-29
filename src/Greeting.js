import React, { useState } from "react";
import './Greeting.css';
import { getAuth, signOut } from "firebase/auth";
// import { getFirestore ,doc, onSnapshot} from "firebase/firestore";

function Greetings({data})
{
    let calorieBalance=0;
    const [error,setError]=useState('');
    const hour = new Date().getHours();
    const welcomeTypes = ["Good Morning", "Good Afternoon", "Good Evening"];
    let welcomeText = "";

    if (hour < 12) welcomeText = welcomeTypes[0];
    else if (hour < 16) welcomeText = welcomeTypes[1];
    else welcomeText = welcomeTypes[2];

    function signoutHandler(){
        setError('');
        const auth = getAuth();
        signOut(auth)
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = errorCode.split("/");
            setError(errorMessage[1]);
        });
    }
    
    let activities=data.activity
    if(activities){
        activities.map((activity)=>
        {
        calorieBalance=calorieBalance+activity.calories
        })
    }
    
    return(
        <div className="form">
            <h1>{calorieBalance.toFixed(2)} kcal</h1>
            <h2>{welcomeText} , {data.displayName}.</h2>
            <h2>Hope you're doing great. Let's burn out !</h2>
            {error && <p className="error">{error}</p>}
            <button className="signout" onClick={signoutHandler}>Sign Out</button>   
        </div>
    )
}
export default Greetings