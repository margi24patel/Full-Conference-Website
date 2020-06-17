import React, { useRef, useEffect, useState } from "react";

const ImageTogglerOnScroll = ({ primaryImg, secondaryImg }) => {
  const imageRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const isInView = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }
    return false;
  };

  const scrollHandler = () => {
    setInView(() => {
      return isInView();
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    setInView(isInView());
    setLoading(false);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [isLoading]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <img
      src={inView ? secondaryImg : primaryImg}
      alt=""
      ref={imageRef}
      width="200"
      height="200"
    />
  );
};

export default ImageTogglerOnScroll;
