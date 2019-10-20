// Author: Brody Willard
// Date: 10/19/19
// Description: Activity 3: JS Objects 


var obja = { a: 1, b: 2, c: 3 };
var objb = { a: 1, b: 2, c: 3 };
console.log(deepEqual(obja, objb));//true

var objc = { a: 1, b: 2, c: 4 };
console.log(deepEqual(obja, objc));//false

var objd = null;
var obje = null;
console.log(deepEqual(objd, obje));//true

var objf = { a: 1, b: 2, c: 3, d: 4 };
console.log(deepEqual(obja, objf));//false

var objj = { val: "abc", word: "number" };
console.log(deepEqual(obja, objj));//false

var objk = { val: "abd", word: "jelly" };
console.log(deepEqual(objj, objk));//false

var numa = 2;
var numb = 2;
console.log(deepEqual(numa, numb));//true

var numc = 3;
console.log(deepEqual(numa, numc));//false

console.log(deepEqual(numa, obja)); //false


function deepEqual(obj1, obj2) {
    if ((typeof (obj1) == "object" && obj1 != null) && (typeof (obj2) == "object" && obj2 != null)) {//validates that they are objects and not null

        if (Object.keys(obj1).length != Object.keys(obj2).length) {//checks if objects are not the same length
            return false;
        }

        for (prop in obj1) {//pulls properties of object 1
            if (prop in obj2) {//checks if object 2 contains the property pulled from object 1
                if (!deepEqual(obj1[prop], obj2[prop])) {//recursively runs deepEqual for property to check if they are the same
                    return false;
                }
            }
            else {//property is not in object 2
                return false;
            }
        }
        return true;//all properties in object 1 are in object 2
    }
    else if (obj1 === obj2) {//compares as a value
        return true;
    }
    else {//obj1  and obj2 are not the same 
        return false;
    }
}
