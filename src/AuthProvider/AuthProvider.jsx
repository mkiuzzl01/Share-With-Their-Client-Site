import React, { useState } from "react";

import { createContext } from "react";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null);

  const shareTools = {
    setUser,
    user,
  };
  return <AuthContext.Provider value={shareTools}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
