import React, { useRef, useState } from 'react';
import { FatKirito } from '..';
import { useInterval } from '../../hooks';
import './FloatingFatKirito.css';

const FloatingFatKirito = () => {
  // game parameters.
  const [delay, setDelay] = useState(10); // frame rate
  const [y, setY] = useState(50); // vertical position
  const [vy, setVy] = useState(1); // vertical speed
  const [angle, setAngle] = useState(0); // view angle
  const [force, setForce] = useState(false); // force control
  const [dt, setDt] = useState(0.1); // speed of the game

  // references to elements
  const containerRef = useRef<HTMLDivElement>(null);
  const floatFKRef = useRef<HTMLDivElement>(null);

  // Game loop
  useInterval(() => {
    // const fkWidth = floatFKRef.current?.offsetWidth;
    const fkHeight = floatFKRef.current?.offsetWidth;
    // const containerWidth = containerRef.current?.offsetWidth;
    const containerHeight = containerRef.current?.offsetHeight;

    /**
     * boundary checking
     */
    // v = u + a * t
    // a = gravity | boost + friction
    let newDy = vy + ((force ? -1 : 1) - vy * 0.01) * dt;
    let newY = y;

    // upper boundary
    if (newY + newDy < 0) {
      newDy *= -1;
    }
    // lower boundary
    else if (
      fkHeight &&
      containerHeight &&
      newY + newDy + fkHeight > containerHeight
    ) {
      newDy *= -1;
    }

    // set viewing angle of fat kirito
    setAngle(50 * Math.atan2(newDy, 100 * dt));
    // update new position
    setY(newY + newDy);
    // update new velocity
    setVy(newDy);
  }, delay);

  // speed up loop.
  // speed up for each 10s.
  useInterval(() => {
    setDt((prev) => prev + 0.01);
  }, 10000);

  return (
    <div
      className="floating-fatkirito--container"
      ref={containerRef}
      onMouseDown={() => setForce(true)}
      onMouseUp={() => setForce(false)}
    >
      <FatKirito y={y} angle={angle} innerRef={floatFKRef} />
    </div>
  );
};

export default FloatingFatKirito;
