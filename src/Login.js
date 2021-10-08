import React ,{useState} from 'react'
import { Link } from 'react-router-dom';
import './Login.css';
import logo from './assets/logo.png';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from './config';

function Login()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const emailChangeHandler=(e)=>{
        let Email=e.target.value
        setEmail(Email);
    }
    const passwordChangeHandler=(e)=>{
        let Password=e.target.value
        setPassword(Password);
    }
    const handleSubmit=(e)=>{
        setError("");
        e.preventDefault();
        const app=initializeApp(firebaseConfig);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = errorCode.split("/");
        setError(errorMessage[1]);
        });
      }
return(
        <div className="form">
        <img src={logo} className="logo"/>
        <h2>Sign In</h2>
        <h4>Continue to Calorie Tracker</h4>   
        <input type="email" name="email" placeholder="Email" value={email} onChange={emailChangeHandler}/>
        <input type="password" name="Password" placeholder="Password" value={password} onChange={passwordChangeHandler}/>
        {error && <p className="error">{error}</p>}
        <button className="login" onClick={handleSubmit}>Sign in</button>
        <Link to="/signup">
                {"Create Account"}
        </Link>
        </div>
)
}
export default Login