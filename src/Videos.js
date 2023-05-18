import React from "react";
import { fs } from "./Firebase";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Videos() {
  const [videos, setVideos] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!(localStorage.getItem("email") === null)) {
      setLoggedIn(true);
      loadVideos(localStorage.getItem("email"));
    }
  }, []);

  async function loadVideos(email) {
    const querySnapshot = await getDocs(collection(fs, email));
    querySnapshot.forEach((doc) => {
      addVideo(doc.id);
    });
  }

  function addVideo(videoName) {
    setVideos((current) => [
      ...current,
      <>
        <Link reloadDocument to={`/videos/${videoName}`}>
          {videoName}
        </Link>
        <br />
      </>,
    ]);
  }

  function handleChange(event) {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const querySnapshot = await getDocs(collection(fs, "Users"));
    querySnapshot.forEach((doc) => {
      if (
        doc.data().username === username &&
        doc.data().password === password
      ) {
        setLoggedIn(true);
        localStorage.setItem("email", doc.id);
        loadVideos(doc.id);
      } else {
        alert("Username or password is incorrect");
      }
    });
  }

  async function signOut() {
    localStorage.removeItem("email");
    setVideos([]);
    setUsername("");
    setPassword("");
    setLoggedIn(false);
    navigate("/");
  }

  return (
    <div>
      {loggedIn ? (
        <div id="videos">
          {videos.map((video) => (
            <div>{video}</div>
          ))}
          <button onClick={signOut} id="signOut">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control mt-1"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p>Don't have an account? Sign up on the app</p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Videos;
