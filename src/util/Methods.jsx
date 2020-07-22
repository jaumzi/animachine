import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Slide, useScrollTrigger } from '@material-ui/core';

export function HideOnScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export function IsMobile() {
  const [state, setState] = useState({ width: window.innerWidth, height: window.innerHeight });
  const { width, height } = state;

  let updateSize = () =>
    setState({
      ...state,
      width: window.innerWidth,
      height: window.innerHeight,
    });

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  return width <= 600;
};

export function GetScroll() {
  const [state, setState] = useState({ scroll: 0 });
  let updateScroll = (e) => {
    setState({
      ...state,
      scroll: e.target.scrollTop,
    });
  };

  useEffect(() => {
    const el = document.getElementById('main');
    el.addEventListener('scroll', updateScroll);
    return () => {
      const el = document.getElementById('main');
      el.removeEventListener('scroll', updateScroll);
    }
  });
  const { scroll } = state;
  return scroll;
}

export function goToEl(el) {
  let node = ReactDOM.findDOMNode(el.current);
  if (node) {
    window.scroll(0, node);
  }
}
