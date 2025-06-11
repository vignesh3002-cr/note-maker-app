import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Header from "./Header";
import "./authpage.css"; 

function AuthPage() {
  return (
    <div>
      <Header />
      <div className="auth-container">
        <div className="form-box">
          <p className="authChoice">Already haven an account?Login</p>
          <Login />
        </div>
        <h1 id="or">OR</h1>
        <div className="form-box">
          <p className="authChoice">Your are a new user to this app?Signup</p>
          <Signup />
        </div>
      </div>
      </div>
  );
}

export default AuthPage;
