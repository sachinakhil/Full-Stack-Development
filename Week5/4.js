function isUpperCaseAtStart(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return false
  }
  
  return str[0] === str[0].toUpperCase()
}

// Test cases
console.log(isUpperCaseAtStart('Hello')); // true
console.log(isUpperCaseAtStart('hello')); // false
console.log(isUpperCaseAtStart('HELLO')); // true
console.log(isUpperCaseAtStart('123')); // false
console.log(isUpperCaseAtStart('')); // false
