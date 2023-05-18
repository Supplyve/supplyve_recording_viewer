import React from "react";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, deleteObject } from "firebase/storage";
import { cs, fs } from "./Firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import Timestamp from "./Timestamp";
import Videos from "./Videos";
import { useNavigate } from "react-router-dom";

function Video() {
  const videoName =
    window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1,
      window.location.href.indexOf("%")
    ) +
    " | " +
    window.location.href.substring(window.location.href.lastIndexOf("%") + 3);
  let email = localStorage.getItem("email");
  const [video, setVideo] = useState();
  const [timestamps, setTimestamps] = useState([]);
  const [done, setDone] = useState([]);
  const [text, setText] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pathReference = ref(cs, `${email}/${videoName}`);
    getDownloadURL(pathReference).then((url) => {
      setVideo(
        <video id="vid" width="340" height="600" controls>
          <source src={url} type="video/mp4" />
        </video>
      );
    });
    getTimestamps();
  }, []);

  async function getTimestamps() {
    const docRef = doc(fs, email, videoName);
    const docSnap = await getDoc(docRef);
    setTimestamps(docSnap.data().timestamps);
    setDone(docSnap.data().done);
    setText(docSnap.data().notes);
  }

  async function deleteVideo() {
    const docRef = doc(fs, email, videoName);
    const pathReference = ref(cs, `${email}/${videoName}`);
    deleteDoc(docRef);
    deleteObject(pathReference);
    navigate("/");
  }

  return (
    <div id="videoPage">
      <div id="videoList">
        <h1>Videos</h1>
        <Videos />
      </div>
      <div id="videoPlayer">
        <h1 id="videoName">{videoName}</h1>
        <div id="video">{video}</div>
        <div id="timestamps">
          <ul id="timestampsList">
            {timestamps.map((timestamp, index) => (
              <li key={index}>
                <Timestamp
                  done={done[index] ? "done" : "inProgress"}
                  index={index}
                  timestamp={timestamp}
                  text={text[index]}
                />
              </li>
            ))}
          </ul>
        </div>
        <button id="delete" onClick={deleteVideo}>Delete Video</button>
      </div>
    </div>
  );
}

export default Video;
