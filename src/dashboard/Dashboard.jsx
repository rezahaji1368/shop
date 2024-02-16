import { Link, Outlet, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import styles from "./dashboard.module.css";
import { ImProfile } from "react-icons/im";
import { useUsersActions } from "../userProvider/UserProviders";
const DashBoard = () => {
  const navigate = useNavigate();
  const setAuth = useUsersActions();
  const signOutHandler = () => {
    setAuth("false");
    localStorage.removeItem("login");
    navigate("/");
  };
  return (
    <Layout>
      <div className={styles.dashboard}>
        <div className={styles.navbar}>
          <ul>
            <li>
              <Link to="user/profile" alt="پروفایل">
                {" "}
                <ImProfile size={25} />
              </Link>
            </li>
            <li>سابقه</li>
            <li>قرعه کشی</li>
            <li>بلاگ</li>
            <li>انتقادات</li>
            <li>درباره ما</li>
            <li>
              <button className={styles.btn} onClick={signOutHandler}>signOut</button>
            </li>
          </ul>
        </div>
        <div>
        </div>
      </div>
          <Outlet />
    </Layout>
  );
};

export default DashBoard;
