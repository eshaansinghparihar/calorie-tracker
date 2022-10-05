import React, { useEffect, useState } from "react";
import { getFirestore ,doc, onSnapshot} from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import Loading from "./Loading";
import Greetings from "./Greeting";
import AddRecord from "./AddRecord";
import Activities from "./Activities";

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
    const notifyDeleteSuccess=()=>
    {
        toast.error('Activity Deleted Successfully !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    const notifyRecordAdditionSuccess=()=>
    {
        toast.success('Activity Added Successfully !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    
    return(
                (data.displayName)?
                <div>
                <ToastContainer
                position="top-left"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
                <Greetings data={data}/>
                <AddRecord data={data} notifyRecordAdditionSuccess={notifyRecordAdditionSuccess}/>
                {data.activity?.map(activity=>
                    <Activities activity={activity} user={user} notifyDeleteSuccess={notifyDeleteSuccess}/>
                ).reverse()}
                </div>
                :
                <Loading/>
            

    )
}