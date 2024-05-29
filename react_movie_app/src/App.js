import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";

function App() {
  return (
    <div class="text-light">
      <Navbar />

      <div className="text-center te" style={{ marginTop: "150px" }}>
        <h1>Animix 🎬</h1>
        <br />
        <h3> Your Entertainment Partner 🍿</h3>
      </div>
      <br />
      <br />
      <div className="text-center">
        <Link to={"/register"} className="btn btn-lg btn-outline-secondary text-light">
          SignUp
        </Link>
        <p style={{ marginTop: "200px" }}>Already have an account?&nbsp;&nbsp;&nbsp;
          <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default App;
