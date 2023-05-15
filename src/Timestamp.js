import React from "react";
import { useState, useEffect } from "react";
import { BiCheckboxChecked, BiCheckbox } from "react-icons/bi";
import { fs } from "./Firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";

function Timestamp(props) {
  let time = props.timestamp;
  const videoName =
    window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1,
      window.location.href.indexOf("%")
    ) +
    " | " +
    window.location.href.substring(window.location.href.lastIndexOf("%") + 3);
  const [done, setDone] = useState(props.done);
  const index = props.index;
  const [text, setText] = useState(props.text);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!typing) {
      handleSave();
    }
  }, [typing]);

  async function handleSave() {
    const docRef = doc(fs, "Video Timestamps", videoName);
    const docSnap = await getDoc(docRef);
    let notesArray = docSnap.data().notes;
    notesArray[index] = text;
    try {
      await updateDoc(doc(fs, "Video Timestamps", videoName), {
        notes: notesArray,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function handleChange(e) {
    handleTyping();
    setText(e.target.value);
  }

  function handleTyping() {
    let stillTyping;
    if (!typing) {
      setTyping(true);
      stillTyping = setTimeout(() => {
        setTyping(false);
      }, 3000);
    } else {
      clearTimeout(stillTyping);
      stillTyping = setTimeout(() => {
        setTyping(false);
      }, 3000);
    }
  }

  function setTime(time) {
    document.getElementById("vid").currentTime = time;
  }

  async function toggleProgress() {
    const docRef = doc(fs, "Video Timestamps", videoName);
    const docSnap = await getDoc(docRef);
    let doneArray = docSnap.data().done;
    if (done === "done") {
      setDone("inProgress");
      doneArray[index] = false;
      await updateDoc(doc(fs, "Video Timestamps", videoName), {
        done: doneArray,
      });
    } else {
      setDone("done");
      doneArray[index] = true;
      await updateDoc(doc(fs, "Video Timestamps", videoName), {
        done: doneArray,
      });
    }
  }

  return (
    <div className={done + " timestamp"}>
      <button id="timeButton" onClick={() => setTime(time)}>
        {Math.floor(time / 60)}:{time % 60 < 10 ? "0" + (time % 60) : time % 60}
      </button>
      {done === "done" ? (
        <BiCheckboxChecked
          color="#fcfcfc"
          size={30}
          id="checkbox"
          onClick={() => toggleProgress()}
        />
      ) : (
        <BiCheckbox
          color="#fcfcfc"
          size={30}
          id="checkbox"
          onClick={() => toggleProgress()}
        />
      )}
      <textarea
        name={time}
        rows={10}
        cols={50}
        value={text}
        onChange={handleChange}
        id={time}
        placeholder="Notes"
      ></textarea>
    </div>
  );
}

export default Timestamp;
