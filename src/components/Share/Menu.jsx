import React from "react";
import { NavLink } from "react-router-dom";
const Menu = ({ path, name}) => {
  return (
    <NavLink to={path}>
      <div className="flex items-center justify-center">
        <span>{name}</span>
      </div>
    </NavLink>
  );
};

export default Menu;
