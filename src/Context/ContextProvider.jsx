import React from "react";
import Context from "./Context";

const ContextProvider = (props) => {
  const isLogin = JSON.parse(localStorage.getItem("OWNER_LOGIN")) || false;

  const contex = {
    isLogin:isLogin == '1' ? true:false 
  };

  return <Context.Provider value={contex}>{props.children}</Context.Provider>;
};

export default ContextProvider;
