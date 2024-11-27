import React, { useState } from "react";
import axios from "axios";

const AudioUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Speichere die ausgewählte Datei im Zustand
    console.log("Datei ausgewählt:", event.target.files[0]);
  };

  const handleUpload = async () => {
    console.log("Hochladen:", file);
    if (!file) {
      alert("Bitte eine Datei auswählen!");
      return;
    }

    const formData = new FormData();
    formData.append("audio", file); // Der Schlüsselname "audio" muss mit dem Namen im Django-Backend übereinstimmen
    formData.append("session_id", "test-session-1"); // Die ID der Sitzung, zu der die Datei gehört

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/transcribe/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Erforderlich für Datei-Uploads
          },
        }
      );
      console.log("Erfolgreich hochgeladen:", response.data);
    } catch (error) {
      console.error("Fehler beim Hochladen:", error.response || error.message);
    }
  };

  return (
    <div>
      <h2>Audio hochladen</h2>
      <input type="file" accept=".m4a" onChange={handleFileChange} />
      <button onClick={handleUpload}>Hochladen</button>
    </div>
  );
};

export default AudioUpload;
