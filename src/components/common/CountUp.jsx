import React from 'react';
import { useCountUp } from '../../hooks/useScrollAnimation';

export const CountUp = ({ value, duration = 1800, className = '' }) => {
  const { ref, count } = useCountUp({ target: value, duration });

  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  );
};

export default CountUp;
