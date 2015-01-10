if (typeof require !== "undefined") { //This example can also be used in a web browser
    var newClass = require("../newClass");
}

var MyClass = newClass({
    "public": {
        "__": function() { // "__construct" is also possible
            console.log("Constructor was called.");
        }
    }
});


console.log("//Testing constructors");
var test = new MyClass();
