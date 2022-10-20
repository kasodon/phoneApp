import React, { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import UserContextProvider from "../components/Context/UserContext";



const ProtectedRoutes = () => {
  const {isAuth} = useContext(UserContextProvider);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;