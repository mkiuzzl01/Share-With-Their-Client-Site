import React from "react";
import { NavLink } from "react-router-dom";
const Menu = ({ path, name, icon}) => {
  return (
    <NavLink to={path}>
      <div className="flex items-center justify-center space-x-2">
        <span>{icon}</span>
        <span>{name}</span>
      </div>
    </NavLink>
  );
};

export default Menu;
