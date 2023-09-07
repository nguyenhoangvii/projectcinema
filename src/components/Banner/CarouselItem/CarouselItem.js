import React from "react";

export const CarouselItem = ({ data, width }) => {
    return (
        <div className="carousel-item" style={{ width: width }}>
            <img className="carousel-img" src={data.imageLandscape} alt="" />
        </div>
    );
};