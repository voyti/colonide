/*global requirejs*/

requirejs.config({
    baseUrl: '/',
    urlArgs: "bust=" + (new Date()).getTime()
});

requirejs(['./main']);