import React, { useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { requestImage } from "../actions/imageActions";
import { useDispatch, useSelector } from "react-redux";

const ImageDetail = () => {
  const imageId = useParams();
  const dispatch = useDispatch();

  const images = useSelector((state) => state.images);
  let imageFromRequest = useSelector((state) => state.images.currentImage);

  useEffect(() => {
    dispatch(requestImage(imageId.id));
  }, []);

  const Detail = () => {
    return images?.image ? (
      images.images
        .filter((item) => item.id === imageId.id)
        .map((item) => (
          <div className="image-detail-container">
            <div className={"header image-detail"}>
              <h1 className={"header image-detail highlight"}>{item.name}</h1>
              <h1 className={"header image-detail"}>{item.description}</h1>
              <Link
                to={{
                  pathname: `/images/edit/${item.id}`,
                }}
                className={"button bg-lightBlue"}
              >
                Edit
              </Link>
              <div className={"image image-detail"}>
                <img src={item.image} />
              </div>
            </div>
          </div>
        ))
    ) : imageFromRequest ? (
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
        </div>
      </div>
    ) : (
      ""
    );
  };

  return (
    <>
      <Detail />
    </>
  );
};

export default ImageDetail;
