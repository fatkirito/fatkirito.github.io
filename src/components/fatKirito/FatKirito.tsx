import React from 'react';
import fatkirito from '../../assets/images/fat_kirito_bg_removed.png';
import './FatKirito.css';

const FatKirito = ({ x, y, angle, handleClick, innerRef }: any) => {
  return (
    <>
      <img
        src={fatkirito}
        alt="fatkirito"
        style={{
          top: y,
          transform: `rotate(${angle}deg)`,
        }}
        className="fatkirito"
        onClick={handleClick}
        ref={innerRef}
      ></img>
    </>
  );
};

export default FatKirito;
