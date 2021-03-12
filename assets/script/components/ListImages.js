import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestImages } from "../actions/imageActions";

const ListImages = () => {
  useEffect;
  const dispatch = useDispatch();
  useSelector;

  useEffect(() => {
    dispatch(requestImages());
    console.log("hi");
  }, []);

  return (
    <div className="list-image-container">
      <p>List images</p>
    </div>
  );
};

export default ListImages;
