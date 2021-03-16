import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createImageRequest } from "../actions/imageActions";

const Upload = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageData = {
      name,
      description,
      image,
    };

    dispatch(createImageRequest(imageData));
    setName("");
    setDescription("");
    setImage();
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
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>

        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default Upload;
