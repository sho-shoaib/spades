import { Navigate } from "react-router-dom";

 const ProtectedRoute = ({ children }) => {
    const user = sessionStorage.getItem('user');
  if (!user) {
    // user is not authenticated
    
    window.open('/login', '_self');
  } else {
  return children;
  }
};
export default ProtectedRoute;