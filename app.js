const {allUrls, cDashUrl } = require('./url-array.js');
const fs = require('fs');
const path = './urllist-redirects.txt';
let fileWriter = fs.createWriteStream(path, {
    flags: 'a'
});

// Dominios
const rxDomainSlash = /^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)(\/)/;
const baseDomain = "https://www.farmacity.com.ar";
// Level 1,2,3,4 y Long Tails
const rxCSlash = ".com/c/"; 
// Fichas Producto
const rxPSlash = ".com/p/"; // /^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\dp][\/\?])/;
// Marcas
const rxMSlash = ".com/m/";
// Institucional
const rxInstSlash = "/farmacity/";


function parseUrl(line,category) {
    let mySubString = line.substring(
        line.lastIndexOf(category) + 2, 
        line.search(/\/([^a-z ]*([.0-9])*\d)/) + 1
    );
    return mySubString;
}

function parseUrlProducts(line,category) {
    let mySubString = line.substring(
        line.lastIndexOf(category) + 2, 
        line.search(/\/([^a-z ]*([.0-9])*\d)/) + 1
    );
    let urlParts = mySubString.split("/");
    return "/"+urlParts[urlParts.map(String).length-2]+"/p";
}

allUrls.map(url => { 
    if (url.search(rxCSlash) > 0) { 
        fileWriter.write(`${url},${baseDomain+parseUrl(url,"/c/")}\n`) ;
    }
    if (url.search(rxPSlash) > 0) { 
        fileWriter.write(`${url},${baseDomain+parseUrlProducts(url,"/p/")}\n`) ;
    }

    if (url.search(rxMSlash) > 0) { 
        fileWriter.write(`${url},${baseDomain+parseUrl(url,"/m/")}/\n`) ;
    }
});