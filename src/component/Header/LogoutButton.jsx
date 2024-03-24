import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logOut } from "../../store/authSlice";
export default function LogoutButton() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => dispatch(logOut()));
  };
  return (
    <button className="border-2 border-black p-2" onClick={logoutHandler}>
      Logout
    </button>
  );
}
