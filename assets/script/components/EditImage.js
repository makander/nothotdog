import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";

const EditImage = () => {
  const imageId = useLocation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post;
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
        <input onChange={(e) => setImage(e.target.value)} type="file"></input>
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default EditImage;
