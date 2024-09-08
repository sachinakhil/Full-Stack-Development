function sumArray(arr) {
    // Initialize sum variable to 0
    let sum = 0;
    
    // Loop through the array, adding each element to the sum
    for(let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    
    // Return the computed sum
    return sum;
}

// Example usage:
const numbers = [1, 2, 3, 4, 5];
const result = sumArray(numbers);
console.log("Sum of the array:", result); // Output: Sum of the
