import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import { GiShoppingCart } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";
import { useCarts } from "../cartProviders/CartProviders";
import { BiUserCircle } from "react-icons/bi";
import { useUsers } from "../userProvider/UserProviders";
const Navigation = () => {
  const { cart } = useCarts();
  const user = useUsers();
  // console.log(user);
  const sum = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };
  return (
    <div className="mainNavigation">
      <nav>
        <ul>
          <li id="home">
            <NavLink to="/">
              <FaHome size={28} />
            </NavLink>
          </li>
          <label htmlFor="home" className="title">
            REZA SHOP
          </label>
        </ul>
        <ul>
          <li className="cartLink ">
            <NavLink to="/cart">
              <GiShoppingCart size={30} className="second" />
              <span>{sum()}</span>
            </NavLink>
          </li>
          <li>
            {user ? (
              <p>
                <Link to="/user">{user.name}</Link>
              </p>
            ) : (
              <NavLink to="/login">
                <BiLogInCircle size={30} className="second"/>
              </NavLink>
            )}
          </li>
          <li>
            {user ? (
              <p></p>
            ) : (
              <NavLink to="/signup">
                <BiUserCircle size={30} className="second"/>
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
