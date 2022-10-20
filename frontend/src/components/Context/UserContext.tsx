import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState("");
  const [id, setId] = useState("");

  const value = {
    userInfo,
    setUserInfo,
    isAuth,
    setIsAuth,
    token,
    setToken,
    id,
    setId
  };

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};

export default UserContext;