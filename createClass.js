/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var createClass = function() {
    var privateApi = {
        "getClone": function(item) { //If item is an object it gets clonned, if not it just return the passed item
            if (typeof item === "object") {
                var itemClone = {};
                for (var key in item) {
                    itemClone[key] = privateApi.getClone(item[key]);
                }
                item = itemClone;
            }
            return item;
        },
         //Only builds the object and returns it
        "buildObject": function(classOptions, objectProtected, objectPublic) {
            //The protected- and public-object are shared in the whole family
            if (typeof objectProtected !== "undefined" && typeof objectPublic !== "undefined") {
                var object = {
                    "private": {}, //We use our own private-object
                    "protected": objectProtected,
                    "public": objectPublic
                };
            } else {
                var object = {
                    "private": {},
                    "protected": {},
                    "public": {}
                };
            }

            //Do we have a parent class?
            if (classOptions.extends && classOptions.extends.prototype.__classOptions) {
                privateApi.buildObject(classOptions.extends.prototype.__classOptions, object.protected, object.public);

                //Save current object as parent-object
                //( object.protected and object.public were written by privateApi.buildObject() )
                var parentObject = { //No access to the private stuff
                    "protected": privateApi.getClone(object.protected),
                    "public": privateApi.getClone(object.public),
                };
            }

            for (var visibility in object) {
                for (var key in classOptions[visibility] || {}) {
                    object[visibility][key] = privateApi.getClone(classOptions[visibility][key]);

                    //Bind to "object" if function
                    if (object[visibility][key].bind) {
                        object[visibility][key] = object[visibility][key].bind(object);
                    }
                }
            }

            //Add parent-object to current object
            if (typeof parentObject !== "undefined") {
                object.parent = parentObject;
            }

            return object;
        },
         //Build the object, calls the constructor and returns the public properties and methods
        "getObjectForCaller": function(classOptions, contructArguments) {
            //Build object
            var object = privateApi.buildObject(classOptions);

            //Call constructor
            (object.public["__construct"] || object.public["__"] || function() {}).apply(object, contructArguments);

            //Return public properties and methods
            return object.public;
        }
    };

    return function(classOptions) {
        if (typeof classOptions !== "object") {
            throw "Error: classOptions must be an object and can not be undefined!";
        }

        var classCaller = function() {
            return privateApi.getObjectForCaller(this.__classOptions, arguments);
        };
        classCaller.prototype.__classOptions = classOptions;
        return classCaller;
    };
}();

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = createClass;
}
