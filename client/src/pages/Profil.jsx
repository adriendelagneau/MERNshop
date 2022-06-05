import React from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import Profil from "../components/Profil";





const ChangePassword = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
     
      <Profil />
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default ChangePassword;
