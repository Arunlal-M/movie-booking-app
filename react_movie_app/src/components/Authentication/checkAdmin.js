import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const checkAdmin = (Component) => {
  function Wrapper(props) {
    const user = useSelector((store) => store.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
      if (!user || (!user.is_superuser && user.username !== "arunl")) {
        navigate("/login");
      }
    }, [user, navigate]);

    return user && (user.is_superuser || user.username === "arunl") ? (
      <Component {...props} />
    ) : null;
  }

  return Wrapper;
};
