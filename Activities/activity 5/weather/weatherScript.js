//Author: Brody Willard
//Date:11/8/19
//Description: Javascript file for part 
// one of AJAX activity

var apiKey = '4bfbaa6d844a91e5da209586856fa236';//api ke for get request 

document.addEventListener('DOMContentLoaded', bindButtons);//adds eventlistner to document

function bindButtons() {
    document.getElementById('submitInfo').addEventListener('click', function (event) {//add event listner to submit button
        var req = new XMLHttpRequest();//initiate new XML request

        if (document.getElementById('city').value.length != 0) {//runs if city text box is filled 
            var info = { city: null, COUNTRY_CODE: null, unit: null };//sets info to null
            info.city = document.getElementById('city').value;//pulls city info
            info.COUNTRY_CODE = document.getElementById('COUNTRY_CODE').value;//pulls country code

            if (info.COUNTRY_CODE.length == 0) {//if country code text box is empty
                info.COUNTRY_CODE = 'US';//sets country code to USA if left blank (default)
            }

            if (document.getElementById('metric').checked) {//checks if metric is chosen
                info.unit = 'metric';//sets units to metric
            }
            else {
                info.unit = 'imperial';//sets units to imperial
            }

            var payload = 'http://api.openweathermap.org/data/2.5/weather?q=' + info.city + ',' + info.COUNTRY_CODE + '&appid=' + apiKey + '&units=' + info.unit;//sets request location

            req.open('GET', payload, true);//opens location
            req.send();//sends request

            var response;
            req.onreadystatechange = function () {//runs on state change
                if (req.readyState === XMLHttpRequest.DONE && req.status >= 200 && req.status < 300) {//runs if the page is loaded 
                    response = JSON.parse(req.responseText);//pulls response from sight and parses 

                    var unixTime = response.dt;//pulls time from response
                    // Following chunk of code pulled from https://stackoverflow.com/a/6078873 converts unix time to dd/mm/year hr:mm:ss//////////////
                    var a = new Date(unixTime * 1000);
                    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    var year = a.getFullYear();
                    var month = months[a.getMonth()];
                    var date = a.getDate();
                    var hour = a.getHours();
                    var min = a.getMinutes();
                    var sec = a.getSeconds();
                    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    document.getElementById('locationOut').textContent = response.name + "," + response.sys.country;//outputs recording location
                    document.getElementById('time').textContent = time;//outputs recording time

                    if (info.unit == 'metric') {//runs if metric units chosen 
                        document.getElementById('forecast').textContent = response.weather[0].main;//outputs forecast
                        document.getElementById('forecastDetails').textContent = response.weather[0].description;//outputs forecast details
                        document.getElementById('temp').textContent = response.main.temp + '\u2103';//outputs temp
                        document.getElementById('tempMin').textContent = response.main.temp_min + '\u2103';//outputs temp min
                        document.getElementById('tempMax').textContent = response.main.temp_max + '\u2103';//outputs temp max
                        document.getElementById('pressure').textContent = response.main.pressure + 'hpa';//outputs pressure
                        document.getElementById('humidity').textContent = response.main.humidity + '%';//output humidity
                        document.getElementById('wind').textContent = response.wind.speed + 'm/s';//outputs windspeed
                    }
                    else {//runs if metric imperial units are chosen
                        document.getElementById('forecast').textContent = response.weather[0].main;//outputs forecast
                        document.getElementById('forecastDetails').textContent = response.weather[0].description;//outputs forecast details
                        document.getElementById('temp').textContent = response.main.temp + '\u2109';//outputs temp
                        document.getElementById('tempMin').textContent = response.main.temp_min + '\u2109';//outputs temps min
                        document.getElementById('tempMax').textContent = response.main.temp_max + '\u2109';//outputs temp max
                        document.getElementById('pressure').textContent = response.main.pressure + 'hpa';//outputs pressure
                        document.getElementById('humidity').textContent = response.main.humidity + '%';//output humidity
                        document.getElementById('wind').textContent = response.wind.speed + 'mph';//outputs windspeed
                    }
                }
                else {//opens request page if it doesnt load properly( helps give user site error codes)
                    if (req.status == 0) {
                        window.open(payload, '_blank');
                    }
                }
            }
        }
        else {
            document.getElementById('locationOut').textContent = "Invalid Location";//outputs message saying location is invalid
            document.getElementById('time').textContent = null;//clears time
            document.getElementById('forecast').textContent = null;//clears forecast
            document.getElementById('forecastDetails').textContent = null;//clears forecast details
            document.getElementById('temp').textContent = null;//clears temp
            document.getElementById('tempMin').textContent = null;//clears temp mim
            document.getElementById('tempMax').textContent = null;//clears temp max
            document.getElementById('pressure').textContent = null;//clears presure
            document.getElementById('humidity').textContent = null;//clears humidity
            document.getElementById('wind').textContent = null;//clears wind speed
        }
 
    });

    document.getElementById('submitInfo2').addEventListener('click', function (event) {//creates eventlistner for second submit button 
        var req = new XMLHttpRequest();

        if (document.getElementById('zip').value.length != 0) {//runs if zip text box has an input

            var info = { zip: null, COUNTRY_CODE: null, unit: null };//sets info to null
            info.zip = document.getElementById('zip').value;//pulls zip info
            info.COUNTRY_CODE = document.getElementById('COUNTRY_CODE').value;//pulls country code

            if (info.COUNTRY_CODE.length == 0) {//country code text box is empty
                info.COUNTRY_CODE = 'US';//sets country code to USA if left blank (default)
            }

            if (document.getElementById('metric').checked) {//checks if metric is chosen
                info.unit = 'metric';//sets units to metric
            }
            else {
                info.unit = 'imperial';//sets units to imperial
            }

            var payload = 'http://api.openweathermap.org/data/2.5/weather?q=' + info.zip + ',' + info.COUNTRY_CODE + '&appid=' + apiKey + '&units=' + info.unit;//sets request location

            req.open('GET', payload, true);//opens location
            req.send();//sends request 

            var response;
            req.onreadystatechange = function () {//runs on state chage
                if (req.readyState === XMLHttpRequest.DONE && req.status >= 200 && req.status < 300) {//runs if page is loaded 
                    response = JSON.parse(req.responseText);//pulls response from sight and parses 

                    var unixTime = response.dt;//pulls time from response
                    // Following chunk of code pulled from https://stackoverflow.com/a/6078873 converts unix time to dd/mm/year hr:mm:ss//////////////
                    var a = new Date(unixTime * 1000);
                    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    var year = a.getFullYear();
                    var month = months[a.getMonth()];
                    var date = a.getDate();
                    var hour = a.getHours();
                    var min = a.getMinutes();
                    var sec = a.getSeconds();
                    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    document.getElementById('locationOut').textContent = response.name + "," + response.sys.country;//outputs recording location
                    document.getElementById('time').textContent = time;//outputs recording time

                    if (info.unit == 'metric') {//runs if metric units chosen 
                        document.getElementById('forecast').textContent = response.weather[0].main;//outputs forecast
                        document.getElementById('forecastDetails').textContent = response.weather[0].description;//outputs forecast details
                        document.getElementById('temp').textContent = response.main.temp + '\u2103';//outputs temp
                        document.getElementById('tempMin').textContent = response.main.temp_min + '\u2103';//outputs temp min
                        document.getElementById('tempMax').textContent = response.main.temp_max + '\u2103';//outputs temp max
                        document.getElementById('pressure').textContent = response.main.pressure + 'hpa';//outputs pressure
                        document.getElementById('humidity').textContent = response.main.humidity + '%';//output humidity
                        document.getElementById('wind').textContent = response.wind.speed + 'm/s';//outputs windspeed
                    }
                    else {//runs if metric imperial units are chosen
                        document.getElementById('forecast').textContent = response.weather[0].main;//outputs forecast
                        document.getElementById('forecastDetails').textContent = response.weather[0].description;//outputs forecast details
                        document.getElementById('temp').textContent = response.main.temp + '\u2109';//outputs temp
                        document.getElementById('tempMin').textContent = response.main.temp_min + '\u2109';//outputs temps min
                        document.getElementById('tempMax').textContent = response.main.temp_max + '\u2109';//outputs temp max
                        document.getElementById('pressure').textContent = response.main.pressure + 'hpa';//outputs pressure
                        document.getElementById('humidity').textContent = response.main.humidity + '%';//output humidity
                        document.getElementById('wind').textContent = response.wind.speed + 'mph';//outputs windspeed
                    }
                }
                else {
                    if (req.status == 0) {//opens request page if it doesnt load properly( helps give user site error codes)
                        window.open(payload, '_blank');
                    }
                }
            }
        }
        else {
            document.getElementById('locationOut').textContent = "Invalid Location";//outputs message that user input is invalid
            document.getElementById('time').textContent = null;//clears time
            document.getElementById('forecast').textContent = null;//clears forecast
            document.getElementById('forecastDetails').textContent = null;//clears forecast details
            document.getElementById('temp').textContent = null;//clears temp
            document.getElementById('tempMin').textContent = null;//clears temp min
            document.getElementById('tempMax').textContent = null;//clears temp max
            document.getElementById('pressure').textContent = null;//clears pressure
            document.getElementById('humidity').textContent = null;//clears humidity
            document.getElementById('wind').textContent = null;//clears wind
        }
    });
}

//populate country codes
var countries = [' Afghanistan', ' Aland Islands', ' Albania', ' Algeria', ' American Samoa', ' Andorra', ' Angola', ' Anguilla', ' Antarctica', ' Antigua and Barbuda', ' Argentina', ' Armenia', ' Aruba', ' Australia', ' Austria', ' Azerbaijan', ' Bahamas', ' Bahrain', ' Bangladesh', ' Barbados', ' Belarus', ' Belgium', ' Belize', ' Benin', ' Bermuda', ' Bhutan', ' Bolivia (Plurinational State of)', ' Bonaire, Sint Eustatius and Saba', ' Bosnia and Herzegovina', ' Botswana', ' Bouvet Island', ' Brazil', ' British Indian Ocean Territory', ' Brunei Darussalam', ' Bulgaria', ' Burkina Faso', ' Burundi', ' Cabo Verde', ' Cambodia', ' Cameroon', ' Canada', ' Cayman Islands', ' Central African Republic', ' Chad', ' Chile', ' China', ' Christmas Island', ' Cocos (Keeling) Islands', ' Colombia', ' Comoros', ' Congo', ' Congo, Democratic Republic of the', ' Cook Islands', ' Costa Rica', ' Cote dIvoire', ' Croatia', ' Cuba', ' Curacao', ' Cyprus', ' Czechia', ' Denmark', ' Djibouti', ' Dominica', ' Dominican Republic', ' Ecuador', ' Egypt', ' El Salvador', ' Equatorial Guinea', ' Eritrea', ' Estonia', ' Eswatini', ' Ethiopia', ' Falkland Islands(Malvinas)', ' Faroe Islands', ' Fiji', ' Finland', ' France', ' French Guiana', ' French Polynesia', ' French Southern Territories', ' Gabon', ' Gambia', ' Georgia', ' Germany', ' Ghana', ' Gibraltar', ' Greece', ' Greenland', ' Grenada', ' Guadeloupe', ' Guam', ' Guatemala', ' Guernsey', ' Guinea', ' Guinea - Bissau', ' Guyana', ' Haiti', ' Heard Island and McDonald Islands', ' Holy See', ' Honduras', ' Hong Kong', ' Hungary', ' Iceland', ' India', ' Indonesia', ' Iran(Islamic Republic of)', ' Iraq', ' Ireland', ' Isle of Man', ' Israel', ' Italy', ' Jamaica', ' Japan', ' Jersey', ' Jordan', ' Kazakhstan', ' Kenya', ' Kiribati', ' Korea(Democratic Peoples Republic of)', ' Korea, Republic of', ' Kuwait', ' Kyrgyzstan', ' Lao Peoples Democratic Republic', ' Latvia', ' Lebanon', ' Lesotho', ' Liberia', ' Libya', ' Liechtenstein', ' Lithuania', ' Luxembourg', ' Macao', ' Madagascar', ' Malawi', ' Malaysia', ' Maldives', ' Mali', ' Malta', ' Marshall Islands', ' Martinique', ' Mauritania', ' Mauritius', ' Mayotte', ' Mexico', ' Micronesia(Federated States of)', ' Moldova, Republic of', ' Monaco', ' Mongolia', ' Montenegro', ' Montserrat', ' Morocco', ' Mozambique', ' Myanmar', ' Namibia', ' Nauru', ' Nepal', ' Netherlands', ' New Caledonia', ' New Zealand', ' Nicaragua', ' Niger', ' Nigeria', ' Niue', ' Norfolk Island', ' North Macedonia', ' Northern Mariana Islands', ' Norway', ' Oman', ' Pakistan', ' Palau', ' Palestine, State of', ' Panama', ' Papua New Guinea', ' Paraguay', ' Peru', ' Philippines', ' Pitcairn', ' Poland', ' Portugal', ' Puerto Rico', ' Qatar', ' Reunion', ' Romania', ' Russian Federation', ' Rwanda', ' Saint Barthelemy', ' Saint Helena, Ascension and Tristan da Cunha', ' Saint Kitts and Nevis', ' Saint Lucia', ' Saint Martin(French part)', ' Saint Pierre and Miquelon', ' Saint Vincent and the Grenadines', ' Samoa', ' San Marino', ' Sao Tome and Principe', ' Saudi Arabia', ' Senegal', ' Serbia', ' Seychelles', ' Sierra Leone', ' Singapore', ' Sint Maarten(Dutch part)', ' Slovakia', ' Slovenia', ' Solomon Islands', ' Somalia', ' South Africa', ' South Georgia and the South Sandwich Islands', ' South Sudan', ' Spain', ' Sri Lanka', ' Sudan', ' Suriname', ' Svalbard and Jan Mayen', ' Sweden', ' Switzerland', ' Syrian Arab Republic', ' Taiwan, Province of China[a]', ' Tajikistan', ' Tanzania, United Republic of', ' Thailand', ' Timor - Leste', ' Togo', ' Tokelau', ' Tonga', ' Trinidad and Tobago', ' Tunisia', ' Turkey', ' Turkmenistan', ' Turks and Caicos Islands', ' Tuvalu', ' Uganda', ' Ukraine', ' United Arab Emirates', ' United Kingdom of Great Britain and Northern Ireland', ' United States of America', ' United States Minor Outlying Islands', ' Uruguay', ' Uzbekistan', ' Vanuatu', ' Venezuela(Bolivarian Republic of)', ' Viet Nam', ' Virgin Islands(British)', ' Virgin Islands(U.S.)', ' Wallis and Futuna', ' Western Sahara', ' Yemen', ' Zambia', 'Zimbabwe'];
var codes = ['AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'CV', 'KH', 'CM', 'CA', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'CI', 'HR', 'CU', 'CW', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MK', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RE', 'RO', 'RU', 'RW', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'UY', 'UZ', 'VU', 'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW']
var table = document.getElementById('codeTable');//pulls table for reference
for (var i = 0; i < countries.length-1; i++) {//iteratively creates each row of table
    var row = document.createElement("tr");//create row

    for (var j = 0; j < 2; j++) {//iteratively creates each cell of row 
        var cell = document.createElement("td");//creates cell
        if (j == 0) {
            var cellText = document.createTextNode(countries[i].substr(1))//subtract first character from each country in the array and creates text node
        }
        else {
            var cellText = document.createTextNode(codes[i])//creates text node with country code
        }
        cell.appendChild(cellText);//appends text to cell
        cell.style.border = "1px solid black";//sets cell border 
        cell.style.height = "40px";//sets cell height

        if (j == 1) {
            cell.style.width = "100px";//sets cell width
        } else {
            cell.style.width = "500px";//sets cell width 
        }
        cell.style.textAlign = "center";//centers text in cell
        cell.style.margin = " 5px 5px 5px 5px";//adds 5px margin to cell
        cell.style.backgroundColor = "rgb(190, 215, 247)";//sets background color of cell 
        row.appendChild(cell);//appeneds cell to row
    }
    table.appendChild(row);//appeneds row to table 
}
