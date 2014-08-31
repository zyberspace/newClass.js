/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */
var createClass = function() {
    var private = {
        "classes": {}, //All defined classes will be saved here
        "cloneObject": function(originalObject) { //Simple deep-object-cloning-function
            var clonnedObject = {};
            for (key in originalObject) {
                if (typeof originalObject[key] !== "object") {
                    clonnedObject[key] = originalObject[key];
                } else {
                    clonnedObject[key] = private.cloneObject(originalObject[key]);
                }
            }
            return clonnedObject;
        },
        "createObject": function(classId, contructArguments) { //Creates a object from the class (defined by clasId)
            var classOptions = private.classes[classId];
            if (!classOptions) {
                throw "Error: There is no class registered with the id \"" + classId + "\"!";
            }

            //Build object
            var object = private.cloneObject(classOptions.public || {});
            var privateObject = {
                "private": private.cloneObject(classOptions.private || {}),
                "protected": private.cloneObject(classOptions.protected || {})
            };
            for (key in object) {
                if (object[key].bind) {
                    object[key] = object[key].bind(privateObject);
                }
                privateObject[key] = object[key];
            }

            //Call constructor
            (object["__construct"] || object["__"] || function() {}).apply(privateObject, contructArguments);

            return object;
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
