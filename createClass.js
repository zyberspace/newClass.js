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
        "createObject": function(classId, contructArguments) { //Creates a object from the class (defined by classId)
            var classOptions = private.classes[classId];
            if (!classOptions) {
                throw "Error: There is no class registered with the id \"" + classId + "\"!";
            }

            //Build object
            var object = {
                "private": {},
                "protected": {},
                "public": {}
            };
            for (visibility in object) {
                for (key in classOptions[visibility] || {}) {
                    object[visibility][key] = private.getClone(classOptions[visibility][key]);

                    //Bind to "object" if function
                    if (object[visibility][key].bind) {
                        object[visibility][key] = object[visibility][key].bind(object);
                    }
                }
            }

            //Call constructor
            (object.public["__construct"] || object.public["__"] || function() {}).apply(object, contructArguments);

            return object.public;
        }
    };

    return function(classOptions) {
        do {
            var classId = Math.random().toString(36).substr(2);
        } while (typeof private.classes[classId] !== "undefined");
        private.classes[classId] = classOptions;

        var classCaller = function() {
            return private.createObject(this.__id, arguments);
        };
        classCaller.prototype.__id = classId;
        return classCaller;
    };
}();

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = createClass;
}
