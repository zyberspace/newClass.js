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
            "bla": "faa"
        },
        "public": {
            "publicBoolean": true,
            "__": function(showPrivates) { // "__construct" is also possible
                if (showPrivates === true) {
                    console.log("Private:", this.private);
                }
            },
            "publicFunction": function() {
                console.log("Protected:", this.protected);
            },
            "showClosureVariable": function() {
                console.log("Closure:", closureVariable);
            }
        }
    });

    console.log("//Testing visibility and constructors");
    var test = new myClass(true);
    test.publicFunction();
    test.showClosureVariable();
    console.log("Object:", test);

    console.log("\n//Testing if variables are non-coupled");
    var test2 = new myClass(false);
    test.publicBoolean = 12;
    test2.publicBoolean = 13;
    console.log(test.publicBoolean, test2.publicBoolean);
})();
