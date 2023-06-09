import { Animator, ScrollContainer, ScrollPage, batch, Fade, Move, MoveOut, Sticky, } from "react-scroll-motion";
import React from 'react';
import logo from "./pic/exsitec.png"
import { useState } from "react";
import "./components/login.css";
 import InventoryBalance from "./components/inventoryBalance";
import Inventory from "./components/inventory";
/*import Products from "./components/products"; */
function App() {

const FadeUp = batch(Fade(), Move(), Sticky());

const [errorMessages, setErrorMessages] = useState({});
const [isSubmitted, setIsSubmitted] = useState(false);
const database = [
    {
      username: "mahdi",
      password: "pass1"
    },
    {
      username: "calle",
      password: "pass2"
    }
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
          <input type="submit" />
        </div>
      </form>
    </div>
  );

return (
<div class="container">

<img onClick={()=>{setIsSubmitted(false)}} src={logo} alt="" style={{width:"10%",zIndex:"99", position : "fixed" , top: "5%" , right:"5%" }} />
<div class="square"></div>
     <div class="square"></div>
      <div class="square"></div>
       <div class="square"></div>
        <div class="square"></div>
         <div class="square"></div>
          <div class="square"></div>
           <div class="square"></div>
            <div class="square"></div>
             <div class="square"></div>

{!isSubmitted && <ScrollContainer>
  <ScrollPage>
    <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
      <span style={{ fontSize: "40px" }}>Welcome to Exsitec</span>
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
    <div className="secondform"><InventoryBalance /></div>
    </Animator>
    </ScrollPage>
    <ScrollPage>
    <Animator animation={FadeUp}>
    <span></span>
    </Animator>
    </ScrollPage>
    <ScrollPage>
    <Animator animation={FadeUp}>
    <div className="secondform"><Inventory /></div>
    </Animator>
    </ScrollPage>
    <ScrollPage>
    <Animator animation={FadeUp}>
    <span></span>
    </Animator>
    </ScrollPage>
    <ScrollPage>
    <Animator animation={FadeUp}>
    <div className="secondform">{/* <Products /> */}</div>
    </Animator>
    </ScrollPage>
    <ScrollPage>
    <Animator animation={FadeUp}>
    <span></span>
    </Animator>
    </ScrollPage>
    <ScrollPage>
    <Animator animation={FadeUp}>
    <div className="secondform"></div>
    </Animator>
    </ScrollPage>
    </ScrollContainer>
  )}
</div>

);
}

export default App;
