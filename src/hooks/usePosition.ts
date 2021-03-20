import { useEffect, useLayoutEffect, useState } from 'react';

function getStyle(el, styleName) {
  return getComputedStyle(el)[styleName];
}

function getOffset(
  el,
): {
  top: number;
  left: number;
  bottom: number;
  right: number;
} {
  if (!el) {
    return {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    };
  }
  const rect = el.getBoundingClientRect();
  const doc = el.ownerDocument;
  if (!doc) throw new Error('Unexpectedly missing <document>.');
  const win = doc.defaultView || doc.parentWindow;

  const winX =
    win.pageXOffset !== undefined
      ? win.pageXOffset
      : (doc.documentElement || doc.body.parentNode || doc.body).scrollLeft;
  const winY =
    win.pageYOffset !== undefined
      ? win.pageYOffset
      : (doc.documentElement || doc.body.parentNode || doc.body).scrollTop;

  return {
    top: rect.top + winX,
    bottom: rect.bottom + winX,
    left: rect.left + winY,
    right: rect.right + winY,
  };
}

function getPosition(el) {
  if (!el) {
    return {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      height: 0,
      width: 0,
    };
  }
  let offset = getOffset(el);
  let parentOffset = { top: 0, left: 0 };
  const marginTop = parseInt(getStyle(el, 'marginTop')) || 0;
  const marginLeft = parseInt(getStyle(el, 'marginLeft')) || 0;
  const marginRight = parseInt(getStyle(el, 'marginRight')) || 0;
  const marginBottom = parseInt(getStyle(el, 'marginBottom')) || 0;

  if (getStyle(el, 'position') === 'fixed') {
    offset = el.getBoundingClientRect();
  } else {
    const doc = el.ownerDocument;

    let offsetParent = el.offsetParent || doc.documentElement;

    while (
      offsetParent &&
      (offsetParent === doc.body || offsetParent === doc.documentElement)
    ) {
      offsetParent = offsetParent.parentNode;
    }

    if (offsetParent && offsetParent !== el && offsetParent.nodeType === 1) {
      parentOffset = getOffset(offsetParent);
      parentOffset.top +=
        parseInt(getStyle(offsetParent, 'borderTopWidth')) || 0;
      parentOffset.left +=
        parseInt(getStyle(offsetParent, 'borderLeftWidth')) || 0;
      parentOffset.right +=
        parseInt(getStyle(offsetParent, 'borderRightWidth')) || 0;
      parentOffset.bottom +=
        parseInt(getStyle(offsetParent, 'borderBottomWidth')) || 0;
    }
  }

  return {
    top: offset.top - parentOffset.top - marginTop,
    left: offset.left - parentOffset.left - marginLeft,
    right: offset.right - parentOffset.right - marginRight,
    bottom: offset.bottom - parentOffset.bottom - marginBottom,
  };
}

function getDimensions(el) {
  if (!el) {
    return {
      height: 0,
      width: 0,
    };
  }

  const { width, height } = el.getBoundingClientRect();
  return { width, height };
}

export default function usePosition(
  ref,
): {
  top: number;
  left: number;
  bottom: number;
  right: number;
  height: number;
  width: number;
} {
  const { top, left, right, bottom } = getPosition(ref.current);
  const { width, height } = getDimensions(ref.current);
  const [elementProps, setElementProps] = useState({
    top: top,
    left: left,
    right: right,
    bottom: bottom,
    width: width,
    height: height,
  });

  useLayoutEffect(() => {
    function handleChangePosition() {
      if (ref && ref.current) {
        const { bottom, left, right, top } = getPosition(ref.current);
        const { height, width } = getDimensions(ref.current);
        setElementProps({
          bottom,
          top,
          left,
          right,
          height,
          width,
        });
      }
    }

    handleChangePosition();
    window.addEventListener('resize', handleChangePosition);

    return () => {
      window.removeEventListener('resize', handleChangePosition);
    };
  }, [ref]);

  return elementProps;
}
