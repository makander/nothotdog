import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestImages } from "../actions/imageActions";
import { Link } from "react-router-dom";
import { RESET_CURRENT_IMAGE } from "../actions/actionTypes";
const ListImages = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(requestImages());
    //dispatch({ type: RESET_CURRENT_IMAGE });
  }, []);

  const Images = () => {
    return images.images ? (
      <ul>
        {images.images.map((item) => (
          <li key={item.id}>
            <Link to={`/images/${item.id}`}>
              <img height={200} width={300} src={item.image} />
            </Link>
            <h3>{item.name}</h3>
          </li>
        ))}
      </ul>
    ) : (
      ""
    );
  };

  return (
    <>
      <h1 className="header">Photos</h1>
      <div className="list-image-container">
        <Images />
      </div>
    </>
  );
};

export default ListImages;
