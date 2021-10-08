import React, {useState, useEffect} from "react";
import './AddRecord.css';
import 'react-toastify/dist/ReactToastify.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import firebaseConfig from "./config";

function AddRecord({data,notifyRecordAdditionSuccess}){
    const [query,setQuery]=useState('')
    const [select, setSelect]=useState('nutrients')
    const [error,setError]=useState('')

    const uid=data.uid
    const app=initializeApp(firebaseConfig);
    const db=getFirestore();
    const activityRef = doc(db, "users", uid);

    function queryHandler(e)
    {
        setQuery(e.target.value)
    }
    function handleSelectChange(e)
    {
        setSelect(e.target.value)
    }
    const addFood = async (food)=>{
        await updateDoc(activityRef, {
            activity: arrayUnion({
                name:food.serving_qty+" "+food.serving_unit+" "+food.food_name,
                timestamp:Date.now(),
                calories:1*(food.nf_calories),
                imageUrl:food.photo.highres
            })
        });
        notifyRecordAdditionSuccess()    
    }

    const addExercise = async (exercise)=>{
        await updateDoc(activityRef, {
            activity: arrayUnion({
                name:exercise.duration_min+" minutes of "+ exercise.user_input,
                timestamp:Date.now(),
                calories:-1*(exercise.nf_calories),
                imageUrl:exercise.photo.highres
            })
        });
        notifyRecordAdditionSuccess()  
    }
    function submitHandler(e)
    {
        setError('')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'x-app-id':'56ca1303','x-app-key':'792b8a7c034a7191f67fb45b5836e45e' },
            body: JSON.stringify({ query: query })
        };
        fetch('https://trackapi.nutritionix.com/v2/natural/'+select, requestOptions)
        .then(response => response.json())
        .then(data => {
                if(data.foods)
                {
                    addFood(data.foods[0])
                }
                else if(data.exercises)
                {
                    addExercise(data.exercises[0])
                }
        })
        .catch(error=>
            {
                    console.log(error)
                    setError('Something went wrong ! ')
            })
        setQuery('')
    }
    return(
    <div className="form">
        {error && <p className="error">{error}</p>}
        <textarea placeholder="Add You're Hogs and Jogs Here !" value={query} onChange={queryHandler}></textarea>
        <select value={select} onChange={handleSelectChange}> //set value here
                <option value="nutrients">Food</option>
                <option value="exercise">Exercise</option>
        </select>
        <button className="add" onClick={submitHandler}>Add</button>
        
    </div>
)
}
export default AddRecord