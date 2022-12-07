import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail } from "../../redux/slice/authSlice";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === process.env.REACT_APP_ADMIN_USER_KEY) {
    return children;
  }
  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>You are not supposed to be here {">"}:|</h2>
        <p>This page can only be view by an Admin user.</p>
        <br />
        <Link to="/">
          <button className="--btn">&larr; Go Home</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === process.env.REACT_APP_ADMIN_USER_KEY) {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
