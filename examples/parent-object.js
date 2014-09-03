if (typeof require !== "undefined") { //This example can also be used in a web browser
    var createClass = require("../createClass");
}

var MyClass = createClass({
    "private": {
        "foo": "bar"
    },
    "protected": {
        "Yin": "Yan",
        "showYin": function() {
            console.log("Yin: ", this.protected.Yin);
        }
    },
    "public": {
        "showFoo": function() {
            console.log("Foo: ", this.private.foo);
        }
    }
});

var MyExtendingClass = createClass({
    "extends": MyClass,
    "protected": {
        "Yin": "Yan-extended",
        "showYin": function() {
            console.log("Now calling this.parent.protected.showYin()...");
            this.parent.protected.showYin();
            console.log("/end");
        }
    },
    "public": {
        "showFoo": function() {
            console.log("Now calling this.parent.public.showFoo()...");
            this.parent.public.showFoo();
            console.log("/end");
        },
        "showYin": function() {
            this.protected.showYin();
        },
        "showParentYin": function() {
            console.log("this.parent.protected.Yin: ", this.parent.protected.Yin);
        }
    }
});


console.log("//Testing parent-object");
var test = new MyExtendingClass();
test.showFoo();
test.showYin();
test.showParentYin();
