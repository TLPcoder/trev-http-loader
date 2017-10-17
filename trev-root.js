'use strict';
const exec = require('child_process').execSync;

class trev{
    constructor(){
        this.n = null;
        this.c = null;
        this.q = null;
        this.o = null;
        this.m = null;
        this.H = null;
        this.A = null;
        this.d = null;
        this.D = null;
        this.T = null;
        this.a = null;
        this.x = null;
        this.url =  null;
    }
    request(n) {
        // -n
        if (typeof n !== 'number') {
            throw new TypeError('request is not of type number');
        } else {
            this.n = ` -n ${n} `;
            return this;
        }
    }
    concurrency(rate) {
        // -c
        if (typeof rate !== 'number') {
            throw new TypeError('concurrency is not of type number');
        } else {
            this.c = ` -c ${rate} `;
            return this;
        }
    }
    rateLimit(limit) {
        // -q
        if (typeof limit !== 'number') {
            throw new TypeError('limit is not of type number');
        } else {
            this.q = ` -q ${limit} `;
            return this;
        }
    }
    outputType(type) {
        // -o
        return this;
    }
    method(verb) {
        // -m
        //GET, POST, PUT, DELETE, HEAD, OPTIONS.
        if (typeof verb !== 'string') {
            throw new TypeError('Method is not type string');
        if (verb !== 'PUT' || verb !== 'GET' || verb !== 'POST' || verb !== 'DELETE' || verb !== 'HEAD' || verb !== 'OPTIONS'){
            throw new RangeError('Method stated is not supported. Please use one of the following GET, POST, PUT, DELETE, HEAD, or OPTIONS.');
        }
        } else {
            this.m = ` -m ${verb} `;
            return this;
        }
    }
    headers(h) {
        // -H
        if (typeof h !== 'object' || Array.isArray(h)){
            throw new TypeError('Headers must be an object');
        } else {
            this.H = h;
        }
        return this;
    }
    acceptHeader() {
        // -A
        //HTTP Accept header.
        return this
    }
    requestBody() {
        // -d
        return this
    }
    requestFile(file) {
        // -D request body from file
        if (typeof file !== 'string'){
            throw new TypeError('Request File must be of type string');
        } else {
            this.D = ` -D ${file} `
            return this
        }
        return this
    }
    contentType(type) {
        // -T content type appplication/json
        if (typeof type !== 'string'){
            throw new TypeError('Content-Type must be of type string');
        } else {
            this.T = ` -T ${type} `
            return this
        }
    }
    auth() {
        // -a Basic authentication, username:password.
        return this
    }
    proxy() {
        // -x  HTTP Proxy address as host:port.
        return this
    }
    hostHeader() {
        // TTP Host header
        return this
    }
    setUrl(url) {
        if (typeof url !== 'string'){
            throw new TypeError('URL must be of type string');
        } else {
            this.url = ` ${url} `
            return this
        }
    }
    normalizeHeaders(headersList) {
        var headers = '';
        for(let key in headersList) {
            headers += ` -H '${key}:${headersList[key]}'`
        }
        return headers.trim();
    }
    createCommandString() {
        var command = 'hey'
        for(let key in this){
            if(this[key] !== null && key !== 'url' && key !== 'H'){
                command += this[key];
            }else if(key === 'H' && this[key] !== null){
                command += this.normalizeHeaders(this.H); 
            }
        }
        console.log('command', (command + this.url).trim());
        exec(command + this.url).trim();
    }
    run () {
        this.createCommandString();
    }
}


module.exports = () => {
    return new trev;
}