import React, { useEffect } from "react";
import { useParams, Link, useHistory, NavLink } from "react-router-dom";
import { requestImage } from "../actions/imageActions";
import { useDispatch, useSelector } from "react-redux";

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
  }, []);

  const handleNext = (e) => {
    history.push(`/images/${nextImage.id}`);
    dispatch(requestImage(nextImage.id));
  };
  const handlePrev = (e) => {
    history.push(`/images/${prevImage.id}`);
    dispatch(requestImage(prevImage.id));
  };

  const Detail = () => {
    return !loading && imageFromRequest?.name ? (
      <div className="image-detail-container">
        <div className={"header image-detail container"}>
          <div>
            <h2 className={"header image-detail highlight"}>
              {imageFromRequest.name}
            </h2>
            <h2 className={"header image-detail"}>/</h2>
            <h2 className={"header image-detail"}>
              {imageFromRequest.description}
            </h2>
          </div>

          <NavLink
            to={{
              pathname: `/images/edit/${imageFromRequest.id}`,
              state: imageId.id,
            }}
            className={"button bg-lightBlue"}
          >
            Edit
          </NavLink>
        </div>
        <div className={"image image-detail"}>
          <img src={imageFromRequest.image} />
        </div>
        <div className="button-container">
          {
            <>
              {images?.images && prevImage ? (
                <>
                  <button onClick={() => handlePrev()}>
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                  </button>
                </>
              ) : (
                ""
              )}
              {images?.images && nextImage ? (
                <>
                  <button onClick={() => handleNext()}>
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </button>
                </>
              ) : (
                ""
              )}
            </>
          }
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
