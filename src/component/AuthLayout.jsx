import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthLayout({ children, authtication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.authReducer.status);
  useEffect(() => {
    if (authtication && authStatus !== authtication) {
      navigate("/login");
    } else if (!authtication && authStatus !== authtication) {
      navigate("/");
    }
    setLoading(false);f
  }, [authStatus, navigate, authtication]);
  return <div>AuthLayout</div>;
}
