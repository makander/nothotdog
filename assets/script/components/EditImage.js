import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editImage } from "../actions/imageActions";

const EditImage = () => {
  const imageId = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentImage = useSelector((state) => state.images.currentImage);

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageData = {
      name,
      description,
      id: imageId.id,
    };

    if (!name) {
      imageData.name = currentImage.name;
    }

    if (!description) {
      imageData.description = currentImage.description;
    }

    dispatch(editImage(imageData));
    setName("");
    setDescription("");
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
