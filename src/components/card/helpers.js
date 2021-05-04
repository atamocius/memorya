const HOVER_HEIGHT = { min: 0.1875, max: 5 };
const SHADOW_SIZE = { min: 1, max: 1.08 };
const SHADOW_ALPHA = { min: 0.3, max: 0.5 };
const SHADOW_BLUR = { min: 0.3, max: 0 };

/**
 * @param {boolean} flipped
 */
export const calcCursor = flipped => (flipped ? 'unset' : 'pointer');

/**
 * @param {boolean} flipped
 */
export const calcOpacity = flipped => (flipped ? 1 : 0);

/**
 * @param {boolean} selected
 * @param {boolean} hovered
 */
export const calcHover = (selected, hovered) => {
  if (selected) {
    return HOVER_HEIGHT.max;
  }
  return hovered ? HOVER_HEIGHT.max : HOVER_HEIGHT.min;
};

/**
 * @param {boolean} flipped
 */
export const calcFlip = flipped => (flipped ? 180 : 0);

/**
 * @param {boolean} selected
 * @param {boolean} hovered
 */
export const calcShadowSize = (selected, hovered) => {
  if (selected) {
    return SHADOW_SIZE.max;
  }
  return hovered ? SHADOW_SIZE.max : SHADOW_SIZE.min;
};

/**
 * @param {boolean} flipped
 */
export const calcShadowFlip = flipped => (flipped ? -1 : 1);

/**
 * @param {boolean} selected
 * @param {boolean} hovered
 */
export const calcShadowAlpha = (selected, hovered) => {
  if (selected) {
    return SHADOW_ALPHA.min;
  }
  return hovered ? SHADOW_ALPHA.min : SHADOW_ALPHA.max;
};

/**
 * @param {boolean} selected
 * @param {boolean} hovered
 */
export const calcShadowBlur = (selected, hovered) => {
  if (selected) {
    return SHADOW_BLUR.min;
  }
  return hovered ? SHADOW_BLUR.min : SHADOW_BLUR.max;
};
