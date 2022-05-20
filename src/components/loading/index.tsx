import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import loading from './image/loading.svg';
import { LoadingImg, Wrapper } from './styles/style';

const Loading = (): JSX.Element => {
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    gsap.to(img, 1, { rotate: 360, ease: 'none', repeat: -1 });
  }, []);

  return (
    <Wrapper>
      <LoadingImg ref={imgRef}>
        <img src={loading} alt="" />
      </LoadingImg>
    </Wrapper>
  );
};
export default Loading;
