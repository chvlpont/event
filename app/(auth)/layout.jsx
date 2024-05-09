import React from "react";

function AuthLayout({ children }) {
  return (
    <div className="h-screen flex items-center justify-center">{children}</div>
  );
}

export default AuthLayout;
