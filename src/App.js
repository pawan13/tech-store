import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/registration-login/Register";
import Login from "./pages/registration-login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Category from "./pages/category/Category";
import Products from "./pages/products/Products";
import PaymentOptions from "./pages/payment-option/PaymentOptions";
import Orders from "./pages/order/Orders";
import Buyers from "./pages/buyer/Buyers";
import Reviews from "./pages/review/Reviews";
import Admin from "./pages/admin/Admin";
import Profile from "./pages/profile/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getUserAction } from "./pages/registration-login/userAction";
import { auth } from "./config/firebase-config";

function App() {
  const dispatch = useDispatch()
  onAuthStateChanged(auth, (user) =>{
    if(user?.uid){
      //get user data from the database and addd to the store
      dispatch(getUserAction(user?.uid))
    }
  })
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Login />} />

        {/* // private routes  */}
        <Route path="/registration" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/products" element={<Products />} />
        <Route path="/payment-options" element={<PaymentOptions />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/buyers" element={<Buyers />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
