import { useEffect, useState, useRef } from 'react';

/**
 * Hook to detect when an element enters the viewport with configurable thresholds.
 */
export function useInView(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
  } = options;

  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, inView];
}

/**
 * Hook to smoothly animate numbers from 0 to a target value when scrolled into view.
 */
export function useCountUp({ target, duration = 1800, startOnView = true }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (startOnView && !inView) return;
    if (hasAnimated) return;

    // Extract numeric part and suffix (e.g. "250+" -> num: 250, suffix: "+", prefix: "")
    const strTarget = String(target);
    const match = strTarget.match(/^([^0-9.]*)([0-9.]+)(.*)$/);

    if (!match) {
      setCount(target);
      return;
    }

    const prefix = match[1] || '';
    const numericTarget = parseFloat(match[2]);
    const suffix = match[3] || '';
    const isDecimal = match[2].includes('.');
    const decimalPlaces = isDecimal ? match[2].split('.')[1].length : 0;

    setHasAnimated(true);

    let startTime = null;
    let animationFrameId = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentVal = easedProgress * numericTarget;

      const formattedNumber = isDecimal
        ? currentVal.toFixed(decimalPlaces)
        : Math.floor(currentVal);

      setCount(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target); // Ensure exact target string at the end
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration, inView, startOnView, hasAnimated]);

  return { ref, count: hasAnimated ? count : '0' };
}
