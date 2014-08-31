if (typeof require !== "undefined") { //This example can also be used in a web browser
    var createClass = require("./createClass");
}

(function() {
    var closureVariable = 'Hi, i am only visible in this closure :D';

    var myClass = createClass({
        "private": {
            "privateNumber": 10,
            "bla": "foo"
        },
        "protected": {
            "protectedString": "blabla",
            "bla": "faa",
            "showProtectedVariables": function() {
                console.log("Protected:", this.protected);
            }
        },
        "public": {
            "publicBoolean": true,
            "__": function(showPrivates) { // "__construct" is also possible
                if (showPrivates === true) {
                    console.log("Private:", this.private);
                }
            },
            "publicFunction": function() {
                this.protected.showProtectedVariables();
            },
            "showClosureVariable": function() {
                console.log("Closure:", closureVariable);
            },
            "setPublicBoolean": function(value) {
                this.public.publicBoolean = Boolean(value);
            }
        }
    });

    console.log("//Testing visibility, constructors and binds");
    var test = new myClass(true);
    test.publicFunction();
    test.showClosureVariable();
    console.log("Object:", test);

    console.log("\n//Testing if variables are non-coupled");
    var test2 = new myClass(false);
    test.setPublicBoolean(false);
    test2.setPublicBoolean(true);
    console.log(test.publicBoolean, test2.publicBoolean);
})();
