function isLeapYear(year) {
  // A year is a leap year if it is divisible by 4
  // However, if it's also divisible by 100, it's not a leap year
  // Unless it's also divisible by 400, then it is a leap year
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 == 0)
}

// Test the function
console.log(isLeapYear(2000)); // true
console.log(isLeapYear(2100)); // false
console.log(isLeapYear(2024)); // true
console.log(isLeapYear(1900)); // false
