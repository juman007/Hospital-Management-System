import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appointment from "./pages/Appointment";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { Context } from "./main"; // Adjust the path to where your context is defined
import axios from "axios";
import Footer from "./components/Footer";

const App = () => {
   const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const response = await axios.get(
               "http://localhost:4000/api/v1/user/patient/me",
               { withCredentials: true }
            );
            setIsAuthenticated(true);
            setUser(response.data.user);
         } catch (error) {
            setIsAuthenticated(false);
            setUser({});
         }
      };
      fetchUser();
   }, [isAuthenticated, setIsAuthenticated, setUser]); // Include all dependencies

   return (
      <>
         <Router>
            <Navbar />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/Appointment" element={<Appointment />} />
               <Route path="/About" element={<AboutUs />} />
               <Route path="/Register" element={<Register />} />
               <Route path="/Login" element={<Login />} />
            </Routes>
            <Footer />
            <ToastContainer position="top-center" />
         </Router>
      </>
   );
};

export default App;
