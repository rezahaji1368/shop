import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePageComponent from "./Pages/HomePage";
import CartComponent from "./Pages/CartPage";
import CartProviders from "./cartProviders/CartProviders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOut from "./Pages/CheckOut";
import UserProviders from "./userProvider/UserProviders";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import DashBoard from "./dashboard/Dashboard";
import Profile from "./Pages/ProfilePage";
import CheckInfoPage from "./Pages/CheckInfoPage";
function App() {
  return (
    <BrowserRouter>
      <UserProviders>
        <CartProviders>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<HomePageComponent />} />
            <Route path="/cart" element={<CartComponent />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/user" element={<DashBoard />}>
              <Route path="user/profile" element={<Profile />} />
            </Route>
            <Route path="/checkInfo" element={<CheckInfoPage />} />
          </Routes>
        </CartProviders>
      </UserProviders>
    </BrowserRouter>
  );
}

export default App;
