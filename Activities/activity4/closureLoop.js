//Brody Willard
//Date: 10/27/19
//Description: Activity 4: Fixing Closure Loop

function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
       var item = 'item' + list[i];
       result.push(function (j) { alert(item + ' ' + list[j]) }(i));//passes the value of i into the function so that it can be used in alert function
    }
    return result;
}




function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();
