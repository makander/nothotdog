import React, { useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import {
  requestImage,
  requestNextImage,
  requestPreviousImage,
} from "../actions/imageActions";
import { useDispatch, useSelector } from "react-redux";
import {
  DISPLAY_NEXT_IMAGE,
  DISPLAY_PREVIOUS_IMAGE,
} from "../actions/actionTypes";

const ImageDetail = () => {
  const imageId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const images = useSelector((state) => state.images);
  let imageFromRequest = useSelector((state) => state.images.currentImage);
  const nextImage = useSelector((state) => state.images.nextImage);
  const prevImage = useSelector((state) => state.images.previousImage);
  const loading = useSelector((state) => state.images.loading);

  useEffect(() => {
    dispatch(requestImage(imageId.id));
    console.log("running effect in list");
  }, []);

  const handleNext = (e) => {
    dispatch(requestNextImage(imageId.id));
    history.push(`/images/${nextImage.id}`);
  };
  const handlePrev = (e) => {
    dispatch(requestPreviousImage(imageId.id));
    history.push(`/images/${prevImage.id}`);
  };

  const Detail = () => {
    return !loading && imageFromRequest?.name ? (
      <div className="image-detail-container">
        <div className={"header image-detail"}>
          <h1 className={"header image-detail highlight"}>
            {imageFromRequest.name}
          </h1>
          <h1 className={"header image-detail"}>
            {imageFromRequest.description}
          </h1>
          <Link
            to={{
              pathname: `/images/edit/${imageFromRequest.id}`,
              state: imageId.id,
            }}
            className={"button bg-lightBlue"}
          >
            Edit
          </Link>
          <div className={"image image-detail"}>
            <img src={imageFromRequest.image} />
          </div>
          <div className="button-container">
            {/*        <>
              {images.images.length > 0 ? (
                <>
                  <button onClick={() => handleNext()}>Next</button>
                  <button onClick={() => handlePrev()}>Previous</button>
                </>
              ) : (
                ""
              )}
            </> */}
          </div>
        </div>
      </div>
    ) : (
      "LOADING"
    );
  };

  return (
    <>
      <Detail />
    </>
  );
};

export default ImageDetail;
