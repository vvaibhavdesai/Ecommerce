import { Navigate, Route } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function PrivateRoute({ path, ...props }) {
  
  const { userToken } = useAuth()
    
  return userToken ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}

