'use strict';
const { exec } = require('child_process');
const { writeFileSync , unlinkSync} = require('fs')

class trev {
    constructor(title) {
        this.title = title || '';
        this.n = null;
        this.c = null;
        this.q = null;
        this.o = null;
        this.m = null;
        this.d = null;
        this.D = null;
        this.T = null;
        this.t = null;
        this.a = null;
        this.x = null;
        this.A = null;
        this.H = null;
        this.url = null;
    }
    request(n) {
        // -n
        if (typeof Number(n) !== 'number') {
            throw new TypeError('request is not of type number');
        } else {
            this.n = ` -n ${n} `;
            return this;
        }
    }
    concurrency(rate) {
        // -c
        if (typeof Number(rate) !== 'number') {
            throw new TypeError('concurrency is not of type number');
        } else {
            this.c = ` -c ${rate} `;
            return this;
        }
    }
    timeout(limit) {
        // -q
        if (typeof Number(limit) !== 'number') {
            throw new TypeError('limit is not of type number');
        } else {
            this.t = ` -t ${limit} `;
            return this;
        }
    }
    rateLimit(limit) {
        // -q
        if (typeof Number(limit) !== 'number') {
            throw new TypeError('limit is not of type number');
        } else {
            this.q = ` -q ${limit} `;
            return this;
        }
    }
    outputType() {
        // -o
        this.o = ` -o csv `;
        return this;
    }
    method(verb) {
        // -m
        //GET, POST, PUT, DELETE, HEAD, OPTIONS.
        if (typeof verb !== 'string') {
            throw new TypeError('Method is not type string');
            if (verb !== 'PUT' || verb !== 'GET' || verb !== 'POST' || verb !== 'DELETE' || verb !== 'HEAD' || verb !== 'OPTIONS') {
                throw new RangeError('Method not supported. Please use one of the following GET, POST, PUT, DELETE, HEAD, or OPTIONS.');
            }
        } else {
            this.m = ` -m ${verb} `;
            return this;
        }
    }
    headers(h) {
        // -H
        if (typeof h !== 'object' || Array.isArray(h)) {
            throw new TypeError('Headers must be an object');
        } else {
            this.H = h;
            return this;
        }
    }
    acceptHeader(accept) {
        // -A
        if (typeof accept !== 'string') {
            throw new TypeError('accept header must be of type string... Example: \'application/json\'');
        } else {
            this.A = ` -A ${accept} `
            return this
        }
    }
    requestBody(body) {
        // -d
        if (typeof body !== 'object' || Array.isArray(body)) {
            throw new TypeError('Request body must be a JSON object');
        } else {
            this.d = ` -d '${JSON.stringify(body)}'`
            return this
        }
    }
    requestFile(filePath) {
        // -D request body from file
        if (typeof filePath !== 'string') {
            throw new TypeError('Request File must be of type string');
        } else {
            this.D = ` -D ${filePath} `
            return this
        }
    }
    contentType(type) {
        // -T content type appplication/json
        if (typeof type !== 'string') {
            throw new TypeError('Content-Type must be of type string');
        } else {
            this.T = ` -T ${type} `
            return this
        }
    }
    auth(username, password) {
        // -a Basic authentication, username:password.
        if (typeof type !== 'string') {
            throw new TypeError('Content-Type must be of type string');
        } else {
            this.a = ` -a '${username}:${password}' `
            return this
        }
    }
    proxy(host, port) {
        // -x  HTTP Proxy address as host:port.
        if (typeof host !== 'string') {
            throw new TypeError('Content-Type must be of type string');
        } else if (typeof Number(port) !== 'number') {
            throw new TypeError('port argument must be of type number');
        }else {
            this.a = ` -a '${host}:${port}' `
            return this
        }
    }
    hostHeader(host) {
        // HTTP Host header
        if (typeof type !== 'string') {
            throw new TypeError('Host must be of type string');
        } else {
            this.host = ` -host '${host}' `
            return this
        }
    }
    setUrl(url) {
        if (typeof url !== 'string') {
            throw new TypeError('URL must be of type string');
        } else {
            this.url = ` ${url} `
            return this
        }
    }
    normalizeHeaders(headersList) {
        var headers = '';
        for (let key in headersList) {
            headers += ` -H '${key}:${headersList[key]}'`
        }
        return headers.trim();
    }
    createCommand() {
        var command = 'hey'
        for (let key in this) {
            if (this[key] !== null && key !== 'url' && key !== 'H' && key !== 'title') {
                command += this[key];
            } else if (key === 'H' && this[key] !== null && key !== 'title') {
                command += this.normalizeHeaders(this.H);
            }
        }
        return (command + this.url).trim();
    }
    run() {
        const command = this.createCommand();
        console.log('command    ', command);
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`${this.title} \n\n ${stdout}`);
        });
    }
}


module.exports = (title) => {
    return new trev(title);
}