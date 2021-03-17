import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const ImageDetail = () => {
  const imageId = useParams();
  const images = useSelector((state) => state.images);
  const imageDetail = images.images.filter((item) => item.id === imageId.id);

  const Detail = () => {
    return imageDetail.map((item) => (
      <>
        <div className={"header image-detail"}>
          <h1 className={"header image-detail highlight"}>{item.name}</h1>
          <h1 className={"header image-detail"}>{item.description}</h1>
          <Link
            to={{
              pathname: `/images/edit/${item.id}`,
              state: imageId.id,
            }}
            className={"button bg-lightBlue"}
          >
            Edit
          </Link>
          <div className={"image image-detail"}>
            <img src={item.image} />
          </div>
        </div>
      </>
    ));
  };

  return (
    <>
      <Detail />
    </>
  );
};

export default ImageDetail;
