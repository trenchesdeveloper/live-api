//In the JavaScript file, write a program to perform a GET request on the route https://coderbyte.com/api/challenges/json/json-cleaning and then clean the object according to the following rules: Remove all keys that have values of N/A, -, or empty strings. If one of these values appear in an array, remove that single item from the array. Then console log the modified object as a string.
const https = require('https');
https.get("https://coderbyte.com/api/challenges/json/json-cleaning", (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data += chunk;
    });
    response.on('end', () => {
        let json = JSON.parse(data);
        let newJson = {};
        for (let key in json) {
            if (json[key] !== "N/A" && json[key] !== "-" && json[key] !== "") {
                newJson[key] = json[key];
            }
        }
        for (let key in newJson) {
            if (Array.isArray(newJson[key])) {
                newJson[key] = newJson[key].filter(function (value) {
                    return value !== "N/A" && value !== "-" && value !== "";
                });
            }
        }
        console.log(JSON.stringify(newJson));
    });
}
);