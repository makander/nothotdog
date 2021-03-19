import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const EditImage = () => {
  const imageId = useLocation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
      <h2>Edit</h2>
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

export default EditImage;
