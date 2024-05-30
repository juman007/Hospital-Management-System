import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
   const [show, setShow] = useState(false);
   const { isAuthenticated, setIsAuthenticated } = useContext(Context);

   const handleLogout = async () => {
      axios
         .get("http://localhost:4000/api/v1/user/patient/logout", {
            withCredentials: true,
         })
         .then((res) => {
            toast.success(res.data.message);
            setIsAuthenticated(false);
         })
         .catch((err) => {
            toast.error(err.response.data.message);
         });
   };
   const navigateTo = useNavigate();
   const goToLogin = async () => {
      navigateTo("/Login");
   };

   return (
      <nav className="container">
         <div className="logo">ZeeCare</div>

         <div className={show ? "navLinks showmenu" : "navLinks"}>
            <div className="links">
               <Link to={"/"}>HOME</Link>
               <Link to={"/Appointment"}>APPOINMENT</Link>
               <Link to={"/About"}>ABOUT Us</Link>
            </div>

            {isAuthenticated ? (
               <button className="logoutBtn btn" onClick={handleLogout}>
                  LOGOUT
               </button>
            ) : (
               <button className="loginBtn btn" onClick={goToLogin}>
                  LOGIN
               </button>
            )}
         </div>

         <div className="hamburger" onClick={() => setShow(!show)}>
            <GiHamburgerMenu />
         </div>
      </nav>
   );
};

export default Navbar;
