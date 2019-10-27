// Author: Brody Willard
// Date: 10/9/19
// Description: Activity 1: JS Functions


//Part 1:
timesTen(1.1)//calls function

function timesTen(x) {//declares function
    return x * 10;//return number multiplied by 10
}
//result of above code is: 11

//Part 2:
sqRoot(11)//calls function before it is assigned

let sqRoot = function (x) {//sets function to variable
    return x ^ (1 / 2);//returns square root of number
}
//result of above code is: "Uncaught ReferenceError: Cannot access 'sqRoot' before initialization at<anonymous>: 1: 1"
