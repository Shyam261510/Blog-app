import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logOut, login } from "./store/authSlice";
import authService from "./appwrite/auth";
import { Header, Footer } from "./component";
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login(userData));
        else dispatch(logOut());
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div>
      <Header />
      <Footer />
    </div>
  ) : null;
}
export default App;
