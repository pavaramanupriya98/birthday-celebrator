export const isTouchDevice = function() {
    return (('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0) ||
           (navigator.msMaxTouchPoints > 0));
}

export const calculateDistance = function({x:x1, y:y1}, {x:x2, y:y2}) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

export const callOnce = function(func) {
    let isCalled = false;
    return (...args) => {
      if(!isCalled) {
        isCalled = true;
        func(...args);
      }
    }
  }

export const convertDegreeToRadians = degree => degree * Math.PI / 180;