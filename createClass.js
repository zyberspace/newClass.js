/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */
var createClass = function() {
    var private = {
        "classes": {}, //All defined classes will be saved here
        "getClone": function(item) { //If item is an object it gets clonned, if not it just return the passed item
            if (typeof item === "object") {
                var itemClone = {};
                for (key in item) {
                    itemClone[key] = private.getClone(item[key]);
                }
                item = itemClone;
            }
            return item;
        },
         //Only builds the object and returns it
        "buildObject": function(classId, objectProtected, objectPublic) {
            var classOptions = private.classes[classId];
            if (!classOptions) {
                throw "Error: There is no class registered with the id \"" + classId + "\"!";
            }

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
            if (classOptions.extends && (parentClassId = classOptions.extends.prototype.__id)) {
                private.buildObject(parentClassId, object.protected, object.public);

                //Save current object as parent-object
                //( object.protected and object.public were written by private.buildObject() )
                parentObject = { //No access to the private stuff
                    protected: private.getClone(object.protected),
                    public: private.getClone(object.public),
                };
            }

            for (visibility in object) {
                for (key in classOptions[visibility] || {}) {
                    object[visibility][key] = private.getClone(classOptions[visibility][key]);

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
        "getObjectForCaller": function(classId, contructArguments) {
            //Build object
            var object = private.buildObject(classId);

            //Call constructor
            (object.public["__construct"] || object.public["__"] || function() {}).apply(object, contructArguments);

            //Return public properties and methods
            return object.public;
        }
    };

    return function(classOptions) {
        do {
            var classId = Math.random().toString(36).substr(2);
        } while (typeof private.classes[classId] !== "undefined");
        private.classes[classId] = classOptions;

        var classCaller = function() {
            return private.getObjectForCaller(this.__id, arguments);
        };
        classCaller.prototype.__id = classId;
        return classCaller;
    };
}();

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = createClass;
}
