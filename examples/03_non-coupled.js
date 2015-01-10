if (typeof require !== "undefined") { //This example can also be used in a web browser
    var newClass = require("../newClass");
}

var MyClass = newClass({
    "protected": {
        "number": 3
    },
    "public": {
        "setNumber": function(number) {
            this.protected.number = number;
        },
        "getNumber": function() {
            return this.protected.number;
        }
    }
});


console.log("//Showing that properties are non-coupled (methods are also not, but this is not shown here)");
var test = new MyClass();
var test2 = new MyClass();
test.setNumber(5);
test2.setNumber(7);
console.log(test.getNumber(), test2.getNumber());
