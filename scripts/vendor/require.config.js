var jam = {
    "packages": [
        {
            "name": "handlebars",
            "location": "scripts/vendor/handlebars",
            "main": "handlebars.js"
        },
        {
            "name": "jquery",
            "location": "scripts/vendor/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "text",
            "location": "scripts/vendor/text",
            "main": "text.js"
        }
    ],
    "version": "0.2.17",
    "shim": {}
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [
        {
            "name": "handlebars",
            "location": "scripts/vendor/handlebars",
            "main": "handlebars.js"
        },
        {
            "name": "jquery",
            "location": "scripts/vendor/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "text",
            "location": "scripts/vendor/text",
            "main": "text.js"
        }
    ],
    "shim": {}
});
}
else {
    var require = {
    "packages": [
        {
            "name": "handlebars",
            "location": "scripts/vendor/handlebars",
            "main": "handlebars.js"
        },
        {
            "name": "jquery",
            "location": "scripts/vendor/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "text",
            "location": "scripts/vendor/text",
            "main": "text.js"
        }
    ],
    "shim": {}
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}