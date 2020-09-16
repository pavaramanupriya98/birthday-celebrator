export default function(func) {
  let isCalled = false;
  return (...args) => {
    if(!isCalled) {
      isCalled = true;
      func(...args);
    }
  }
}