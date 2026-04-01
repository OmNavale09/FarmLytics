import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { 
  FaLeaf, 
  FaThLarge, 
  FaHistory, 
  FaCloudSun, 
  FaUserCircle 

} from "react-icons/fa";
import "./index.css";

const Sidebar = () => {
  const sidebarVariants = {
    hidden: { x: -250 },
    visible: { 
      x: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20, 
        staggerChildren: 0.07,
        delayChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0 }
  };

  const menuItems = [
    { name: "Scan Plant", icon: <FaLeaf />, path: "/" },
    { name: "My Farm", icon: <FaThLarge />, path: "/farm" },
    { name: "History", icon: <FaHistory />, path: "/history" },
    { name: "Weather", icon: <FaCloudSun />, path: "/weather" },
    { name: "Logout", icon: <MdLogout />, path: null },
  ];

  const logout = (name) => {
    // Logout logic here
    if (name === "Logout") {
      Cookies.remove("token"); 
      window.location.href = "/login";
    }
  };

  return (
    <motion.div 
      className="sidebar"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    > 
    <div>
      <h1 className="nav-logo">FarmLytics</h1>

      <ul className="menu">
        {menuItems.map((item, index) => (
          <motion.li key={index} variants={itemVariants}>
            <NavLink 
              to={item.path} 
              className={({ isActive }) => (isActive && item.name !== "Logout" ? "menu-item active" : "menu-item")}
            >
              <div className="item-content" onClick={() => logout(item.name)}>
                <span className="icon">{item.icon}</span>
                <span className="label">{item.name}</span>
              </div>
            </NavLink>
          </motion.li>
        ))}
      </ul>
    </div>
    <NavLink to="/profile" className="profile-link">
    <div className="profile-container">
      <div className="profile-info">
        <FaUserCircle className="profile-icon" />
        <h2 className="profile-name">Rahul</h2>
      </div>
    </div>
    </NavLink>
    </motion.div>
  );
};

export default Sidebar;