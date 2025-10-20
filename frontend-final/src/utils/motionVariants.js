// motionVariants.js
export const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12
    }
  }
};

export const fadeUp = {
  hidden: {opacity: 0, y: 14},
  show: {opacity: 1, y: 0, transition: {duration: 0.6, ease: [ 0.22, 1, 0.36, 1 ]}}
};

export const fadeIn = {
  hidden: {opacity: 0},
  show: {opacity: 1, transition: {duration: 0.6, ease: 'easeOut'}}
};

export const subtleFade = {
  hidden: {opacity: 0},
  show: {opacity: 1, transition: {duration: 0.5, ease: 'easeOut'}}
};

export const imageReveal = {
  hidden: {opacity: 0, scale: 0.98, rotate: -0.5},
  show: {opacity: 1, scale: 1, rotate: 0, transition: {duration: 0.7, ease: [ 0.22, 1, 0.36, 1 ]}}
};

export const subtle = {
  hidden: {opacity: 0},
  show: {opacity: 1, transition: {duration: 0.45, ease: 'easeOut'}}
};

export const hoverLift = {
  rest: {scale: 1, boxShadow: '0px 6px 22px rgba(0,0,0,0.08)'},
  hover: {scale: 1.03, boxShadow: '0px 12px 36px rgba(0,0,0,0.12)', transition: {duration: 0.25}}
};

export const expand = {
  collapsed: {height: 0, opacity: 0, overflow: 'hidden', transition: {duration: 0.35, ease: 'easeInOut'}},
  expanded: {height: 'auto', opacity: 1, overflow: 'hidden', transition: {duration: 0.35, ease: 'easeInOut'}}
};

export const cardReveal = {
  hidden: {opacity: 0, y: 8, scale: 0.995},
  show: {opacity: 1, y: 0, scale: 1, transition: {duration: 0.48, ease: [ 0.22, 1, 0.36, 1 ]}}
};

export const progress = {
  hidden: {width: 0},
  show: ( w ) => ( {width: `${ w }%`, transition: {duration: 0.9, ease: [ 0.22, 1, 0.36, 1 ]}} )
};
