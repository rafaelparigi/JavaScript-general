/*
Write a function:
that, given an array A and an integer K, returns the array A rotated K times.

For example, given
    A = [3, 8, 9, 7, 6]
    K = 3
the function should return [9, 7, 6, 3, 8]. 
*/
function cyclingRotation(A, K) {
    let newArray = [];
    for (let i = 0; i < A.length; i++) 
        newArray[(i + K) % A.length] = A[i];
    return newArray;
}

console.log(cyclingRotation(myArray, 4));
