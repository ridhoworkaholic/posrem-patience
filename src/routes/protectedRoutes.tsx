import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to="/" replace />;
  }

  return children;
}
