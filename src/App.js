import { Animator, ScrollContainer, ScrollPage, batch, Fade, Move, MoveOut, Sticky, } from "react-scroll-motion";
import React from 'react';
import logo from "./pic/vgr.png"
import { useState } from "react";
import "./components/login.css";
import CarBooking from "./components/delivery";

function App() {

const FadeUp = batch(Fade(), Move(), Sticky());

const [errorMessages, setErrorMessages] = useState({});
const [isSubmitted, setIsSubmitted] = useState(false);
const database = [
    {
      username: "mahdi",
      password: "pass1"
    },
  
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let { uname, pass } = document.forms[0];
    const userData = database.find((user) => user.username === uname.value);

    
    if (userData) {
      if (userData.password !== pass.value) {
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" value="Logga in" />
        </div>
      </form>
    </div>
  );

return (
<div class="container">

<img onClick={()=>{setIsSubmitted(false)}} src={logo} alt="" style={{width:"15%",zIndex:"99", position : "fixed" , top: "0" , right:"0" }} />


{!isSubmitted && <ScrollContainer>
  <ScrollPage>
    <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
      <span style={{ fontSize: "40px" }}>Välkommen till VGR bokningssystem</span>
    </Animator>
  </ScrollPage>
  <ScrollPage>
    <Animator animation={FadeUp}>
    <span></span>
    </Animator>
  </ScrollPage>
  <ScrollPage>
    <Animator animation={FadeUp}>
    <div className="form">
      {isSubmitted ?<div>blabla</div> : <div className="login-form">
        <div className="title">Sign in</div>
        {isSubmitted ? <p></p> : renderForm}
      </div>}
    </div>
    </Animator>
  </ScrollPage>
    </ScrollContainer>}
  {isSubmitted && (
    <ScrollContainer>
    <ScrollPage>
    <Animator animation={FadeUp}>
      <div className="content-form"><CarBooking /></div>
    </Animator>
    </ScrollPage>
    </ScrollContainer>
  )}
</div>

);
}

export default App;
