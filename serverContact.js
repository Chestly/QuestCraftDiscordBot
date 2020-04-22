const path = "http://localhost:4567";
function getPath() {
    return path;
}

function contactServer(path, params, callBackFunc) {
    let fullPath = getPath() + "/" + path + "?";
    const keys = Object.keys(params);
    for (let i = 0; i < keys.length; i++) {
        const currentKey = keys[i];
        const currentValue = encodeURIComponent(params[currentKey]);
        fullPath += currentKey + "=" + currentValue;
        if (keys.length > 1 && i < keys.length - 1) {
            fullPath += "&";
        }
    }
    const http = require('http');

    http.get(fullPath, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            const response = JSON.parse(data);
            console.log(response);
            callBackFunc(response);
        });
    });

}
module.exports = {
    contactServer: function (path, params, callBackFunc) {
        contactServer(path, params, callBackFunc);
    },
}