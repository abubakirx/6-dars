import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, user }) {
  if (user) {
    return children;
  } else {
    return <Navigate to="/Login" />;
  }
}
export default ProtectedRoute;
