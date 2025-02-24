// import React, { useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { TiShoppingCart } from "react-icons/ti";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import logo from "../../../public/logo.png";
// import "font-awesome/css/font-awesome.min.css";
// import "./Header.css";

// const Header = () => {
//   const cart = useSelector((store) => store.cartReducer.cart);
//   const count = cart.length;
//   const [user, setUser] = React.useState(
//     JSON.parse(localStorage.getItem("user"))
//   );

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setUser(JSON.parse(localStorage.getItem("user")));
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   useEffect(() => {
//     const checkUser = () => {
//       setUser(JSON.parse(localStorage.getItem("user")));
//     };
//     checkUser();
//     const interval = setInterval(checkUser, 500);

//     return () => clearInterval(interval);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     setUser(null);
//     Swal.fire({
//       title: `Logged out Successfully `,
//       icon: "success",
//       confirmButtonText: "OK",
//     });
//   };

//   return (
//     <header className="header fixed-top">
//       <nav className="navbar">
//         <a href="/" className="logo">
//           <img src={logo} alt="Logo" />
//         </a>
//         <div className="nav-links">
//           <NavLink
//             className={({ isActive }) =>
//               isActive ? "nav-link active" : "nav-link"
//             }
//             to="/"
//           >
//             Home
//           </NavLink>
//           <NavLink
//             className={({ isActive }) =>
//               isActive ? "nav-link active" : "nav-link"
//             }
//             to="/shop"
//           >
//             Shop
//           </NavLink>
//           {user && user.role === "admin" && (
//             <NavLink
//               className={({ isActive }) =>
//                 isActive ? "nav-link active" : "nav-link"
//               }
//               to="/products"
//             >
//               Dashboard
//             </NavLink>
//           )}
//           {user && (
//             <NavLink
//               className="nav-link shopping-cart d-flex justify-content-between ms-1"
//               to="/checkout"
//             >
//               <TiShoppingCart />
//               <span className="text-decoration-none">({count})</span>
//             </NavLink>
//           )}
//           {user && (
//             <NavLink className="nav-link" to="/login" onClick={handleLogout}>
//               logout
//             </NavLink>
//           )}
//           {!user && (
//             <NavLink className="nav-link" to="/login">
//               login
//             </NavLink>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;

import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import {
  FaHome,
  FaShoppingBag,
  FaTachometerAlt,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import logo from "../../../public/logo.png";
import "./Header.css";

const Header = () => {
  const cart = useSelector((store) => store.cartReducer.cart);
  const count = cart.length;
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const checkUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    checkUser();
    const interval = setInterval(checkUser, 500);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    Swal.fire({
      title: `Logged out Successfully`,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <header className="header fixed-top">
      <nav className="navbar">
        <a href="/" className="logo">
          <img src={logo} alt="Logo" />
        </a>
        <div className="nav-links">
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/"
          >
            <FaHome className="nav-icon" />
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/shop"
          >
            <FaShoppingBag className="nav-icon" />
          </NavLink>
          {user && user.role === "admin" && (
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/products"
            >
              <FaTachometerAlt className="nav-icon" />
            </NavLink>
          )}
          {user && (
            <NavLink
              className="nav-link shopping-cart d-flex justify-content-between ms-1"
              to="/checkout"
            >
              <TiShoppingCart className="nav-icon" />
              <span className="text-decoration-none">({count})</span>
            </NavLink>
          )}
          {user && (
            <NavLink className="nav-link" to="/login" onClick={handleLogout}>
              <FaSignOutAlt className="nav-icon" />
            </NavLink>
          )}
          {!user && (
            <NavLink className="nav-link" to="/login">
              <FaSignInAlt className="nav-icon" />
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
