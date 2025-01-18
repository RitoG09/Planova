import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const currentUser = localStorage.getItem("currentUser");

  console.log("Current User:", currentUser); // Debugging log

  // Redirect to '/signin' if no user is logged in
  if (currentUser == null) {
    return <Navigate to="/signin" replace />;
  }

  // Render the children if a user is logged in
  return children;
}

export default ProtectedRoute;
