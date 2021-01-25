import React, { createRef, useState, useEffect } from "react";
import classnames from "classnames";

function ScrollToTopButton() {
  let scrollToTopButton = createRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  });

  const onScroll = () => {
    const visible = pageYOffsetIsGreaterThenInnerHeight(1.25);
    setVisible(visible);
  };

  const pageYOffsetIsGreaterThenInnerHeight = (coefficient = 1) => {
    return getCurrentYOffset() > coefficient * window.innerHeight;
  };

  const getCurrentYOffset = () => {
    const btnTopOffset = scrollToTopButton.current.getBoundingClientRect().top;
    return window.pageYOffset + btnTopOffset;
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div 
      className={classnames("btn scroll-to-top-btn cursor-pointer", {
        "invisible": !visible
      })}
      ref={scrollToTopButton}
    >
      <span className="material-icons arrow-up" onClick={scrollToTop}>arrow_drop_up</span>
    </div>
  );
}

export default ScrollToTopButton;
