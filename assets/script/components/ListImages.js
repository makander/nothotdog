import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestImages } from "../actions/imageActions";
import { Link } from "react-router-dom";
const ListImages = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  useEffect(() => {
    dispatch(requestImages());
  }, []);

  const Images = () => {
    return images.images ? (
      <ul>
        {images.images.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <img height={200} width={300} src={item.image} />
            <p>{item.description}</p>
            <Link to={`/images/${item.id}`}>Detail</Link>
          </li>
        ))}
      </ul>
    ) : (
      ""
    );
  };

  return (
    <div className="list-image-container">
      <p>List images</p>
      <Images />
    </div>
  );
};

export default ListImages;
