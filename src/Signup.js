import React ,{useState} from 'react'
import { Link } from 'react-router-dom';
import './Login.css';
import logo from './assets/logo.png';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore ,doc, setDoc} from "firebase/firestore";
import firebaseConfig from './config';

function Login()
{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const nameChangeHandler=(e)=>{
        let Name=e.target.value
        setName(Name);
    }
    const emailChangeHandler=(e)=>{
        let Email=e.target.value
        setEmail(Email);
    }
    const passwordChangeHandler=(e)=>{
        let Password=e.target.value
        setPassword(Password);
    }
    const createUser=async (userid)=>{
        const db=getFirestore();
        const docData={
            email:email,
            displayName:name,
            uid:userid
        }
        await setDoc(doc(db, "users", userid), docData);
    }
    const handleSubmit=(e)=>{
        setError("");
        e.preventDefault();
        const app=initializeApp(firebaseConfig);
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials)=>{
            const uid=userCredentials.user.uid;
            createUser(uid);
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = errorCode.split("/");
        setError(errorMessage[1]);
        });


      }
return(
        <div className="form">
        <img src={logo}/>
        <h2>Create Account</h2>
        <h4>Continue to Calorie Tracker</h4>
        <input name="username" placeholder="Full Name" value={name} onChange={nameChangeHandler}/>   
        <input type="email" name="email" placeholder="Email" value={email} onChange={emailChangeHandler}/>
        <input type="password" name="Password" placeholder="Password" value={password} onChange={passwordChangeHandler}/>
        {error && <p className="error">{error}</p>}
        <button onClick={handleSubmit}>Create Account</button>
        <Link to="/login">
                {"Already Have An Account ?"}
        </Link>
        </div>
)
}
export default Login