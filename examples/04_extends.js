if (typeof require !== "undefined") { //This example can also be used in a web browser
    var newClass = require("../newClass");
}

var MyClass = newClass({
    "private": {
        "foo": "bar",

        "showThis": function() {
            console.log("\"this\" out of MyClass::private:", this);
        }
    },
    "protected": {
        "Yin": "Yan",

        "showThis": function() {
            console.log("\"this\" out of MyClass::protected:", this);
        },
        "showThisPrivate": function() {
            this.private.showThis();
        }
    },
    "public": {
        "heaven": "hell",

        "showThis": function() {
            console.log("\"this\" out of MyClass::public:", this);
        },
        "showThisPrivate": function() {
            this.private.showThis();
        },
        "showThisProtected": function() {
            this.protected.showThis();
        }
    }
});

var MyExtendingClass = newClass({
    "extends": MyClass,
    "private": {
        "foo": "bar-extended"
    },
    "protected": {
        "Yin": "Yan-extended"
    },
    "public": {
        "heaven": "hell-extended",
        "showThis": function() {
            console.log("\"this\" out of MyExtendingClass::public:", this);
        }
    }
});


console.log("//Testing extends");
var test = new MyExtendingClass();
test.showThis();
test.showThisPrivate();
test.showThisProtected();
