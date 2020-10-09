import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, firebaseInitialize, handleFbLogin, handleGoogleSignIn, handleSignOut, signInWithEmailAndPassword } from './LoginManager';



function Login() {

  const [loggedInUser,setLoggedInUser] = useContext(UserContext)
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  

 
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: ''
  })

  firebaseInitialize();

  const googleSignIn = ()=>{
    handleGoogleSignIn()
        .then(response=>{
            setUser(response);
            setLoggedInUser(response);
            history.replace(from);
        })
      
  }

  const fbSignIn = ()=>{
    handleFbLogin()
      .then(response=>{
        setUser(response);
        setLoggedInUser(response);
        history.replace(from);
    })
  }

  const signOut = ()=>{
    handleSignOut()
      .then(response=>{
        setUser(response);
        setLoggedInUser(response)
    })
  }



  const handleUserState = (success, error) => {
    let newUser = { ...user };
    newUser.success = success;
    newUser.error = error;
    setUser(newUser);
    setLoggedInUser(newUser);
    history.replace(from);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser && user.email && user.password) {
        createUserWithEmailAndPassword(user.name,user.email,user.password)
        .then(response =>{
            handleUserState(response);
        })
    }
    if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email,user.password)
        .then(response =>{
            handleUserState(response);
        })
    }

  }




  const handleBlurChange = (e) => {
    let isValid = true;
    if (e.target.name === 'email') {
      // var re = /\S+@\S+\.\S+/;
      // return re.test(email);
      isValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const validPasswordLength = e.target.value.length > 6;
      const validPassValue = /\d{1}/.test(e.target.value);
      isValid = validPasswordLength && validPassValue;

    }
    if (isValid) {
      let newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      setUser(newUser);

    }
  }



  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
          <button onClick={googleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={fbSignIn}>Login Using Facebook</button>

      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Email : {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our own authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="Register" />
      <label htmlFor="Register">New User Registration</label>
      <form onSubmit={handleSubmit}>
        {
          newUser && <input type="text" name="name" onBlur={handleBlurChange} placeholder="Name" required></input>
        }
        <br />
        <input type="text" name="email" onBlur={handleBlurChange} placeholder="Email" required></input>
        <br />
        <input type="password" name="password" onBlur={handleBlurChange} placeholder="Password" required></input>
        <br></br>
        <input type="submit" value={newUser? 'Sign Up': 'Sign In'} />
      </form>
      {
        user.success ? <p style={{ color: "green" }}> User successfully {newUser ? 'created' : 'Logged In'}</p> : <p style={{ color: "red" }}>{user.error}</p>
      }

    </div>
  );
}

export default Login;
