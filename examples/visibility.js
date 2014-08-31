if (typeof require !== "undefined") { //This example can also be used in a web browser
    var createClass = require("../createClass");
}

var MyClass = createClass({
    "private": {
        "bla": "foo",
        "showBla": function() {
            console.log("Bla:", this.protected.bla);
        }
    },
    "protected": {
        "justANumber": 13,
        "bla": "faa",

        "showProtectedVariables": function() {
            console.log("Protected:", this.protected);
        }
    },
    "public": {
        "anotherNumber": 9,

        "giveMeTheStuff": function() {
            this.private.showBla();
            this.protected.showProtectedVariables();
        }
    }
});


console.log("//Testing visibility");
var test = new MyClass();
test.giveMeTheStuff();
console.log("Object (\"test\"):", test);
