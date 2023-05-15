import React from "react";
import { fs } from "./Firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    const querySnapshot = await getDocs(collection(fs, "Video Timestamps"));
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

  return <div>{videos}</div>;
}

export default Videos;
