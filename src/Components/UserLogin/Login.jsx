import React, { useState, useContext } from "react";
import "./Login.css";
import context from "../../Context/Context";

const OwnerId = import.meta.env.VITE_APP_USER_NAME;
const OwnerPass = import.meta.env.VITE_APP_PASSWORD;

const Login = () => {
  const ctx = useContext(context);
  const [userId, setUserID] = useState("");
  const [password, setPassword] = useState("");

  const userIdChangeHandler = (e) => {
    setUserID(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (userId === OwnerId && password === OwnerPass) {
      alert("login");
      ctx.isLogin = true;
      localStorage.setItem("OWNER_LOGIN", "1");
    }
  };
  return (
    <div className="login">
      <form onSubmit={onSubmitHandler} className="login-form">
        <div>
          <label htmlFor="userid">User</label>
          <input
            type="text"
            name="userid"
            className="userid"
            required
            onChange={(e) => userIdChangeHandler(e)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            type="text"
            required
            name="password"
            className="password"
            onChange={(e) => passwordChangeHandler(e)}
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
