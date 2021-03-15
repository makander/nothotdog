import axios from "axios";
import React, { useState } from "react";

const Upload = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const imageData = {
      name,
      description,
      image,
    };

    const headers = {
      //"Content-Type": "multipart/form-data",
      Authorization: "Token 459805df3300483f6be75c9de615c32e8b53f4b0",
    };

    axios.post("http://localhost:8080/api/images/", imageData, headers);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Change description</label>
        <textarea
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Change name</label>
        <input
          type="text"
          placeholder="Change name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="file"
        ></input>

        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default Upload;
