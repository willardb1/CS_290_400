// Author: Brody Willard
// Date: 10/27/19
// Description: Assignment 3: Higher-Order Functions and Objects

function Automobile(year, make, model, type) {
    this.year = year;//year (ex. 2001, 1995)
    this.make = make;//string (ex. honda, ford)
    this.model = model;//string (ex. Accord, Focus)
    this.type = type;//string (ex. Pickup, SUV)
}

var automobiles = [
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
];

/*This function sorts arrays using an arbitrary comparator. 
 * You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr(comparator, array) {
    var sortedArray = [ ];//makes new array 
    for (let i = 0; i < array.length - 1; i++) {//copy array
        sortedArray.push(array[i]);//pushes values of old array to new array
    }

    var temp;//placeholder
    var index;//location in array
    //bubble sort the array 
    for (let index = sortedArray.length - 1; index > 0; index--) {//counts down across array
        for (let j = 0; j < index; j++) {//select value to check
            if (!comparator(sortedArray[j], sortedArray[j + 1])) {//compares value with one next to it
                temp = sortedArray[j + 1];//stores value
                sortedArray[j + 1] = sortedArray[j];//swap value
                sortedArray[j] = temp;//move old value to new location
            }
        }
    }
    return sortedArray;//returns sorted array
}

/*A comparator takes two arguments and uses some algorithm to compare them. 
 * If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. 
 * Here is an example that works on integers*/
function exComparator(int1, int2) {
    if (int1 > int2) {
        return true;
    } else {
        return false;
    }
}
/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator(auto1, auto2) {
    if (auto1.year > auto2.year) {//compares auto year
        return true;
    }
    else {
        return false;
    }
}


/*This compares two automobiles based on their make. 
 * It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later (from A-Z).*/
function makeComparator(auto1, auto2) {
    make1 = auto1.make;//pulls auto1 make
    make2 = auto2.make;//pulls auto2 make
    make1 = make1.toUpperCase();//capitalize auto1 make
    make2 = make2.toUpperCase();//capitalize auto2 make
    if (make1 < make2) {//compare makes
        return true;
    }
    else {
        return false;
    }
}

/*This compares two automobiles based on their type. 
 * The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). 
 * It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator(auto1, auto2) {

    var typeVehicle = function (auto) {//quantifies type of vehicle
        var typeV = auto.type.toUpperCase();//capitalizes type of vehicle
        if (typeV == "ROADSTER") {//checks if its a roadster
            return 5;
        }
        else if (typeV == "PICKUP") {//checks if its a pickyp
            return 4;
        }
        else if (typeV == "SUV") {//checks if its a suv
            return 2;
        }
        else if (typeV == "WAGON") {//checks if its a wagon
            return 2;
        }
        else {//type is not listed
            return 1;
        }
    }

    if (typeVehicle(auto1) > typeVehicle(auto2)) {//compares type values
        return true;
    }
    else if (typeVehicle(auto1) == typeVehicle(auto2)) {//values are the same
        yearComparator(auto1, auto2);//compares year
    }
    else {
        return false;
    }

}

/*Your program should output the following to the console.log, including the opening and closing 5 stars. 
* All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

*Each line representing a car should be produced via a logMe function. 
*This function should be added to the Automobile class and accept a single boolean argument.
*If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile.
*If the argument is 'false' then the type is ommited and just the "year make model" is logged. */
Automobile.prototype.logMe = function(bool) {//inherit from automoblie object 
    if (bool) {//true provided 
        console.log(this.year + " " + this.make + " " + this.model + " " + this.type);
    }
    else {//false provided 
        console.log(this.year + " " + this.make + " " + this.model)
    }
}

function output(arrayS, bool) {
    for (let i = 0; i < arrayS.length; i++) {//goes across each element of array
        arrayS[i].logMe(bool);//prints element info
    }
}

var yearSort = sortArr(yearComparator, automobiles);//sorts array by year
var modelSort = sortArr(makeComparator, automobiles);//sorts array by model
var typeSort = sortArr(typeComparator, automobiles);//sorts array by type 


console.log("*****");
console.log("The cars sorted by year are:")
output(yearSort, false);//prints out cars sorted by year
console.log(" ");
console.log("The cars sorted by make are:");
output(modelSort, false);//prints out cars sorted by model
console.log(" ");
console.log("The cars sorted by type are:");
output(typeSort, true);//prints out cars sorted by type 
console.log("*****");
