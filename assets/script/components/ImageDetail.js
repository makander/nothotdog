import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ImageDetail = () => {
  const imageId = useParams();
  const images = useSelector((state) => state.images);
  const imageDetail = images.images.filter((item) => item.id === imageId.id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const Detail = () => {
    return imageDetail.map((item) => (
      <div>
        <p>{item.name}</p>
        <img height="400" width="600" src={item.image} />
        <p>{item.description}</p>
      </div>
    ));
  };

  const handleSubmit = () => {};

  const UpdateForm = () => {
    return <></>;
  };

  return (
    <>
      <p>Images</p>
      <Detail />
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
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default ImageDetail;
