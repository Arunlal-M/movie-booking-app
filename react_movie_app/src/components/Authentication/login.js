import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import Navbar from "../Navbar";
import { useNavigate, Link } from "react-router-dom";
import "./box.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function attemptLogin() {
    // Check if username and password are provided
    if (!username || !password) {
      setErrorMessage("Please provide both username and password");
      return;
    }
  
    // Log the payload being sent
    console.log("Attempting login with:", { username, password });
  
    axios
      .post("http://127.0.0.1:8000/api/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data); // Debugging line
        setErrorMessage("");
        const user = {
          username: username,
          userId: response.data.id,
          token: response.data.token,
          userType: response.data.user_type,
        };
  
        console.log(user); // Debugging line
  
        dispatch(setUser(user));
  
        if (
          user.username === "arunl" ||
          user.userType === "admin" ||
          user.userType === "superuser"
        ) {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error(error); // Debugging line
        if (error.response) {
          console.error("Response data:", error.response.data); // Log response data
          console.error("Response status:", error.response.status); // Log status code
          console.error("Response headers:", error.response.headers); // Log headers
        }
        if (error.response.data.errors) {
          setErrorMessage(Object.values(error.response.data.errors).join(""));
        } else if (error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Invalid login user. Please contact admin");
        }
      });
  }
  

  return (
    <div>
      <Navbar />
      <br />
      <div className="container container-login text-light">
        <div className="row">
          <div className="col-8 offset-2">
            <h1 className="text-center">
              <b>Login</b>
            </h1>
            <br />
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <div className="form-group">
              <label>Username : </label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label>Password : </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <br />
            <div className="form-group text-center">
              <button className="btn btn-outline-success" onClick={attemptLogin}>
                Login
              </button><br/><br/>
              <p>Don't have an account? <br/>
                <Link to={"/register"}>Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
