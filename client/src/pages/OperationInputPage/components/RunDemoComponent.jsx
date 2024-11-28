import React from "react";
import axios from "axios";
import audio1 from "../../../assets/audio/audio1.m4a";
import audio2 from "../../../assets/audio/audio2.m4a";
import audio3 from "../../../assets/audio/audio3.m4a";
import { Button } from "@mui/material";

const FILE_READING_DELAY = 20000;

const RunDemoComponent = () => {
  const [running, setRunning] = React.useState(false);
  const audioFiles = [audio1, audio2, audio3];
  const audioRef = React.useRef(null);

  const createFileFromURL = async (fileUrl, index) => {
    const response = await fetch(fileUrl);
    const blob = await response.blob();

    // Create a new File object from the Blob
    const file = new File([blob], `audio${index}.m4a`, { type: "audio/m4a" });

    console.log("file", file);
    return file;
  };

  const handleRunDemo = async () => {
    setRunning(true);

    audioFiles.forEach(async (audioFilePath, index) => {
      setTimeout(async () => {
        console.log(`Transcribing audio file ${index + 1}...`);
        const formData = new FormData();

        audioRef.current.src = audioFilePath;
        console.log(audioFilePath);
        audioRef.current.load();
        audioRef.current.play();

        const audioFile = await createFileFromURL(audioFilePath, index);

        formData.append("audio", audioFile);
        formData.append("session_id", "test-session-1");
        try {
          await axios.post("http://127.0.0.1:8000/api/transcribe/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } catch (error) {
          console.error(error);
        }
      }, FILE_READING_DELAY * index);
    });

    setTimeout(() => {
      setRunning(false);
    }, FILE_READING_DELAY * audioFiles.length);
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          color: "#cd1c18",
          borderColor: "#cd1c18",
          height: "50px",
          fontSize: "1rem",
          width: "100%",
        }}
        onClick={handleRunDemo}
      >
        {running ? "Demo is running..." : "Run Demo"}
      </Button>
      <audio ref={audioRef}>
        <source type="audio/m4a" />
      </audio>
    </>
  );
};

export default RunDemoComponent;
