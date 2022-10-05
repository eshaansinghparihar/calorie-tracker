import React from "react";
import './Activities.css'
import 'react-toastify/dist/ReactToastify.css';
// import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, arrayRemove } from "firebase/firestore";
// import firebaseConfig from "./config";

function Activities({activity, user , notifyDeleteSuccess})
{
    const uid=user.uid
    // const app=initializeApp(firebaseConfig);
    const db=getFirestore();
    const activityRef = doc(db, "users", uid);
    const deleteHandler=async()=>{
    await updateDoc(activityRef, {
    activity: arrayRemove({
        name:activity.name,
        timestamp:activity.timestamp,
        calories:activity.calories,
        imageUrl:activity.imageUrl
    })
    });
    notifyDeleteSuccess();
    }
    return(
        <div className="form">
            {(activity.imageUrl)?<img className="activity" src={activity.imageUrl} alt={activity.name}/>:<img className="activity" src="https://source.unsplash.com/1600x1600/?food" alt={activity.name}/>}
            {activity.calories<0?<h1 className="loss">{activity.calories} kcal</h1>:<h1 className="gain">{activity.calories} kcal</h1>}
            <h2>{activity.name}</h2>
            <h2>{new Intl.DateTimeFormat('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: '2-digit', minute: '2-digit'}).format(activity.timestamp)}</h2>
            <button className="delete" onClick={deleteHandler}>Delete Item</button>
        </div>
    )

}
export default Activities