import { Navigate, Outlet } from "react-router-dom";
import { decodeJwt } from "../utils/decode-jwt";
import { VIEWS } from "../utils/routes";

const UserProtectedRoutes = () => {
  const accessToken = localStorage.getItem("accessToken");
  const { role } = decodeJwt(accessToken);
  return accessToken && role === "USER" ? (
    <Outlet />
  ) : (
    <Navigate to={VIEWS.SIGN_IN} />
  );
};

export default UserProtectedRoutes;
