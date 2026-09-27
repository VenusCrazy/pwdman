import { Navigate } from "react-router-dom";
import { useUser } from "../../context/userContext";

function ProtectedRoute({ children }) {
  const { user, restoring } = useUser();

  // wait for the boot-time session restore before deciding where to go
  if (restoring) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-white/10 border-t-green-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;