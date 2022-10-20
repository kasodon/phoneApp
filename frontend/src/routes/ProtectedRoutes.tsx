import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    const loggedIn = false;
  const user = loggedIn;
  return user;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;