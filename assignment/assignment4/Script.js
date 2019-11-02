//Author: Brody Willard
//Date: 10/31/19
//Description: script file for Assignment 4: DOM and Events

//pulls the body from the html file
var body = document.getElementsByTagName("body")[0];

///table
var table = document.createElement("table");//creates the table
table.style.border = "1px solid black";//set border of table
table.style.tableLayout = "fixed";//set layout to fixed
table.style.width = "50%"; //set width of table to 50% of page

k = -1;//starting value for id assignments

//header row
var headRow = document.createElement("tr");//creates the header row
for (var i = 0; i < 4; i++) {//creates each header cell iterativly 
    var cell = document.createElement("th");//creates header cell
    var cellText = document.createTextNode("Header " + (i + 1));//sets text for header cell
    cell.appendChild(cellText);//appeneds text to cell
    cell.style.border = "1px solid black";//sets border of cell
    cell.style.height = "40px";//sets height of cell
    cell.style.textAlign = "center";//centers text in cell
    cell.style.fontWeight = "bold";//makes text bold
    cell.style.margin = " 5px 5px 5px 5px";//adds a 5px margin to cell
    k++;//iterates k
    cell.setAttribute("id", k);//sets cell id to k
    headRow.appendChild(cell);//appends cell to header row
}
table.appendChild(headRow);//appends header row to table

//data rows
for (var i = 0; i < 3; i++) {//iteratively creates each row of table
    var row = document.createElement("tr");//create row

    for (var j = 0; j < 4; j++) {//iteratively creates each cell of row 
        var cell = document.createElement("td");//creates cell
        var cellText = document.createTextNode((i + 1) + ", " + (j + 1))//sets text of cell (i.e. 1,1)
        cell.appendChild(cellText);//appends text to cell
        cell.style.border = "1px solid black";//sets cell border 
        cell.style.height = "40px";//sets cell height
        cell.style.textAlign = "center";//centers text in cell
        cell.style.margin = " 5px 5px 5px 5px";//adds 5px margin to cell
        k++//iterates k 
        cell.setAttribute("id", k);//sets cell id to k 
        row.appendChild(cell);//appeneds cell to row
    }
    table.appendChild(row);//appeneds row to table 
}
body.appendChild(table);//appends body to table

//starting cell 
let L = 4;//location of first cell
var cCell = document.getElementById(L);//pulls cell corresponding to location L
cCell.style.border = "3px solid black";//sets border of first selected cell

//break
var brk = document.createElement("BR");//creates break element
document.body.appendChild(brk);//appends break to body

///Buttons
//upbutton
var upButton = document.createElement("button");//create button 
var buttonText = document.createTextNode("Up");//creates text for button 
upButton.appendChild(buttonText);//appends text to button 
upButton.style.height = "40px";//sets height of button 
upButton.style.width = "50px";//sets width of button 
upButton.style.marginLeft = "77px";//sets a 77px left margin for button 
upButton.setAttribute("id", "up");//sets button id
document.body.appendChild(upButton);//appends button to body

//break
var brk= document.createElement("BR");//creates break element
document.body.appendChild(brk);//appends break to body 

//left button
var leftButton = document.createElement("button");//creates button 
var buttonText = document.createTextNode("Left");//creates text for button 
leftButton.appendChild(buttonText);//appends text to button 
leftButton.style.height = "40px";//sets height of button 
leftButton.style.width = "50px";//sets width of button 
leftButton.style.margin = "10px 5px 10px 5px";//sets margin of button to 5px left/right and 10px top/bottom
leftButton.setAttribute("id", "left");//sets button id 
document.body.appendChild(leftButton);//appends button to body 

//mark button 
var markButton = document.createElement("button");//creates button 
var buttonText = document.createTextNode("Mark Cell");//creates text for button 
markButton.appendChild(buttonText);//appends text to button 
markButton.style.height = "40px";//sets height of button 
markButton.style.width = "75px";//sets button width 
markButton.style.margin = "10px 5px 10px 5px";//sets margin of button to 5px left/right and 10px top/bottom
markButton.setAttribute("id", "mark");//sets id of button 
document.body.appendChild(markButton);//appends button to body 

//right button
var rightButton = document.createElement("button");//creates button 
var buttonText = document.createTextNode("Right");//creates text for button 
rightButton.appendChild(buttonText);//appends text to button 
rightButton.style.height = "40px";//sets height of button 
rightButton.style.width = "50px";//sets width of button 
rightButton.style.margin = "10px 5px 10px 5px";//sets margin of button to 5px left/right and 10px top/bottom
rightButton.setAttribute("id", "right");//sets id of button 
document.body.appendChild(rightButton);//appends button to body 

//break
var brk = document.createElement("BR");//creates break element
document.body.appendChild(brk);//appends break element to body 

//down button 
var downButton = document.createElement("button");//creates button 
var buttonText = document.createTextNode("Down");//creates text for button 
downButton.appendChild(buttonText);//appends text to button 
downButton.style.height = "40px";//sets button height 
downButton.style.width = "50px";//sets width of button 
downButton.style.marginLeft = "77px";//sets 77px left margin to button 
downButton.setAttribute("id", "down");//sets id of button 
document.body.appendChild(downButton);//appends button to body 



//events 
function rightEdgeCheck(){//checks if selected cell(L) is at right edge
    var check = [7, 11, 15];//id of cells on right edge
    for (var i = 0; i < 3; i++) {//iterates through list
        if (L == check[i]) {//checks if L matches edge cell id 
            return true;
        }
    }
    return false;
}

function leftEdgeCheck() {//checks if selected cell(L) is at left edge
    var check = [4, 8, 12];//id of cells on left edge
    for (var i = 0; i < 3; i++) {//iterates through list
        if (L == check[i]) {//checks if L matches edge cell id 
            return true;
        }
    }
    return false;
}


function bottomCheck() {//checks if selected cell(L) is at bottom edge 
    if (L + 4 > 15) {//checks if L + 4 is greater than 15(the final cell(3,4))
        return true;
    }
    else {
        return false;
    }
}

function topCheck() {//checks if selected cell(L) is at top edge 
    if (L - 4 < 4) {//checks if L - 4 is less than 4(the first selectable cell (1,1))
        return true;
    }
    else {
        return false;
    }
}

function upCell() {//move selected cell(L) up 
    if (!topCheck()) {//checks if L is not at top edge
        var pCell = document.getElementById(L);//calls currently selected cell(L)
        pCell.style.border = "1px solid black";//return border of cell to 1px
        L -= 4;//subtracts 4 from L 
        var nCell = document.getElementById(L);//selects new cell
        nCell.style.border = "3px solid black";//sets border of new selected cell to 3px
    }
}
document.getElementById("up").addEventListener("click", upCell);//runs event on click 

function downCell() {//moves selected cell(L) down
    if (!bottomCheck()) {//checks if L is not at bottom edge
        var pCell = document.getElementById(L);//calls current selected cell(L)
        pCell.style.border = "1px solid black";//returns border of cell to 1px
        L += 4;//adds 4 to L
        var nCell = document.getElementById(L);//selects new cell
        nCell.style.border = "3px solid black";//set border of new selected cell to 3px
    }
}
document.getElementById("down").addEventListener("click", downCell);//runs event on click

function rightCell() {//moves selected cell(L) to the right 
    if (!rightEdgeCheck()) {//checks if L is not at the right edge
        var pCell = document.getElementById(L);//calls current selected cell
        pCell.style.border = "1px solid black";//return border of cell to 1px
        L += 1;//adds 1 to L
        var nCell = document.getElementById(L);//selects new cell
        nCell.style.border = "3px solid black";//sets border of new selected cell to 3px
    }
}
document.getElementById("right").addEventListener("click", rightCell);//runs event on click 

function leftCell() {//moves selected cell(L) to left 
    if (!leftEdgeCheck()) {//checks if L is not at the left edge 
        var pCell = document.getElementById(L);//calls current selecetd cell 
        pCell.style.border = "1px solid black";//returns border of cell to 1px
        L -= 1;//subtracts 1 from L
        var nCell = document.getElementById(L);//selects new cell
        nCell.style.border = "3px solid black";//sets border of new selected cell to 3px
    }
}
document.getElementById("left").addEventListener("click", leftCell);//runs event

function mark() {//marks selected cell by turning background yellow
    var cCell = document.getElementById(L);//calls selected cell
    cCell.style.background = "yellow";//sets background to yellow
}
document.getElementById("mark").addEventListener("click", mark);//runs event on click 
