import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import SpanIcon from "./SpanIcon";

function ImgCarousell({ imgList }) {
  const [currentImgIndex, setCurrentImgIndex] = React.useState(0);

  function moveToRight() {
    if (currentImgIndex === imgList.length - 1) {
      setCurrentImgIndex(0);
    } else {
      setCurrentImgIndex((currentIndex) => currentIndex + 1);
    }
  }

  function moveToLeft() {
    if (currentImgIndex === 0) {
      setCurrentImgIndex(imgList.length - 1);
    } else {
      setCurrentImgIndex((currentIndex) => currentIndex - 1);
    }
  }

  return (
    <div className="imgCarousell">
      <div className="carousellTop">
        <Button
          type="button"
          onClick={moveToLeft}
          className="carousellBtn"
          label="show previous image"
        >
          <SpanIcon iconName="chevron_left" />
        </Button>
        <div className="carousellContent">
          <div className="imgContainer">
            {imgList.map((imgData, index) => {
              if (index === currentImgIndex) {
                return (
                  <img
                    src={`${imgData.img}`}
                    key={index}
                    alt={imgData.alt}
                    data-testid="currentImg"
                    className="showImg"
                  />
                );
              }
              return <img key={index} src={imgData.img} alt={imgData.alt} />;
            })}
          </div>
          <h3 data-testid="currentImgTitle" className="roboto-condensed-600">
            {imgList[currentImgIndex].title}
          </h3>
        </div>
        <Button
          type="button"
          onClick={moveToRight}
          className="carousellBtn"
          label="show next image"
        >
          <SpanIcon iconName="chevron_right" />
        </Button>
      </div>
      <div className="imgControl">
        {imgList.map((data, index) => {
          if (currentImgIndex === index) {
            return (
              <Button
                type="button"
                content=""
                className="chooseImg currentButton"
                onClick={() => setCurrentImgIndex(index)}
                label={`show image ${index}`}
                key={index}
              />
            );
          }
          return (
            <Button
              type="button"
              className="chooseImg"
              onClick={() => setCurrentImgIndex(index)}
              label={`show image ${index}`}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

ImgCarousell.propTypes = {
  imgList: PropTypes.array.isRequired,
};

export default ImgCarousell;
