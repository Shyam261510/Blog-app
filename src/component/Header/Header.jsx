import { LogoutButton } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.authReducer.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header>
      <nav>
        <div>
          <Link>Logo</Link>
        </div>
        <ul className="flex gap-3">
          {navItems.map((items) =>
            items.active ? (
              <li key={items.name}>
                <button onClick={() => navigate(items.slug)}>
                  {items.name}
                </button>
              </li>
            ) : null
          )}
        </ul>
        {authStatus && <LogoutButton />}
      </nav>
    </header>
  );
}

export default Header;
