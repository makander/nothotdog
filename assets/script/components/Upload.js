import axios from "axios";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createImageRequest } from "../actions/imageActions";

const Upload = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const fileRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image);

    const imageData = {
      name,
      description,
      image,
    };

    dispatch(createImageRequest(imageData));
    setName("");
    setDescription("");
    setImage(null);
    fileRef.current.value = "";
  };
  return (
    <div className="form-container upload">
      <h2>Upload</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Title</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label>File</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            ref={fileRef}
          ></input>
        </div>

        <div className="input-container">
          <label>Description</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Upload;
