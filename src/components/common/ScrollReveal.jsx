import React, { Children, isValidElement, cloneElement } from 'react';
import { useInView } from '../../hooks/useScrollAnimation';

export const ScrollReveal = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.65,
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  stagger = 0,
  className = '',
  style = {},
  as: Component = 'div',
  ...props
}) => {
  const [ref, inView] = useInView({ threshold, rootMargin, triggerOnce: true });

  // Compute CSS transform and initial state according to chosen animation
  const getInitialTransform = () => {
    switch (animation) {
      case 'fade-up':
        return 'translate3d(0, 32px, 0)';
      case 'fade-down':
        return 'translate3d(0, -32px, 0)';
      case 'fade-left':
        return 'translate3d(-36px, 0, 0)';
      case 'fade-right':
        return 'translate3d(36px, 0, 0)';
      case 'zoom-in':
        return 'scale(0.92) translate3d(0, 16px, 0)';
      case 'zoom-3d':
        return 'perspective(1000px) rotateX(10deg) translateY(24px) scale(0.95)';
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const baseStyle = {
    ...style,
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate3d(0, 0, 0) scale(1) rotate(0deg)' : getInitialTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}s`,
    transitionDelay: `${delay}s`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
  };

  // If stagger is passed, clone children with progressive transition delays
  if (stagger > 0 && Array.isArray(children)) {
    return (
      <Component ref={ref} className={className} style={{ ...style }} {...props}>
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) return child;
          const childDelay = delay + index * stagger;
          const childStyle = {
            ...child.props.style,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
            transitionProperty: 'opacity, transform',
            transitionDuration: `${duration}s`,
            transitionDelay: `${childDelay}s`,
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform, opacity',
          };
          return cloneElement(child, { style: childStyle });
        })}
      </Component>
    );
  }

  return (
    <Component ref={ref} className={className} style={baseStyle} {...props}>
      {children}
    </Component>
  );
};

export default ScrollReveal;
