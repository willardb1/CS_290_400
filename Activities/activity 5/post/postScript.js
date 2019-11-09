//Author: Brody Willard
//Date:11/8/19
//Description: Javascript file for part 
// one of AJAX activity

document.addEventListener('DOMContentLoaded', bindButtons);//adds eventlister to document

function bindButtons() {
    document.getElementById('submitInfo').addEventListener('click', function (event) {//adds event listner to submit button 
        var req = new XMLHttpRequest();//initates new XML request

        if (document.getElementById('input').value.length != 0) {//runs if box contains text 
            var info = { input: null };//sets info to null
            info.input = document.getElementById('input').value;//pulls user input for info
            req.open('POST', 'http://httpbin.org/post', false);//opens location
            req.setRequestHeader('Content-Type', 'application/json');//set header request
            req.send(JSON.stringify(info.input));//send request

            if (req.readyState === XMLHttpRequest.DONE && req.status >= 200 && req.status < 300) {//runs waits for page to load 
                response = JSON.parse(req.responseText);//pulls response and parses it 
                document.getElementById('output').textContent = response.data;//sets output to response
            }

        }
        else {
            document.getElementById('output').textContent = "No input provided";//set output to error

        }

    });
}
