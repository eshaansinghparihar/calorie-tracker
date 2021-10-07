import React, { useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore ,doc, onSnapshot} from "firebase/firestore";
import firebaseConfig from './config';

export default function Landing({user})
{
    const uid=user.uid
    const [data,setData]=useState({});
    const readData=()=>{
        const db=getFirestore();
        if(uid)
        {
            onSnapshot(doc(db, "users", uid), (doc) => {
                setData(doc.data());
            });
        }
    }
    useEffect(()=>{
        readData()
    },uid)
    return(
        <div>
            <h1>Hello {data.displayName}</h1>
        </div>
    )
}