newClass.js
===========
Create php-like classes and extend them (supports private, protected and public visibility).

###Beware
This document differs between classes and objects. Classes are created with `var MyClass = newClass({...})`, objects are created with `new MyClass()`, so the class is actually only the blueprint for the object.

Why another oop-class-thingy for javascript?
--------------------------------------------
Because i like the way how php (and most other languages) handles the visibility of properties and methods, so you can decide what the extending class shall be able to access.
I searched for other solutions but did not find any good ones, they were either too complicated (in my eyes) or too concentrated on using the normal prototype way (so they were actually just a workaround or an abstraction).

I tried to be as close to the javascript-style as possible, but still provide an easy way to create classes that can be extended with ease.

Can you give me an example?
---------------------------
There are a couple of examples in the `examples`-dir that show you how things are done, but sure, here is a simple class:
```javascript
var MyClass = newClass({
    "private": {
        "iAmPrivate": "Secret things no other class should know"
    },
    "protected": {
        "number": null
    },
    "public": {
        "__": function(number) { //"__construct" is also possible
            this.protected.number = number;
        },
        "getNumber": function() {
            return this.protected.number;
        },
        "showNumber": function() {
            console.log(this.public.getNumber());
        }
    }
});

var myClass = new MyClass(13);
myClass.showNumber(); //13
```

You don't need to declare all visibilities, every single class-option is optional. So a class can actually be also an empty object:
```javascript
var AnotherClass = newClass({});
```

Features:
---------
 - Declare properties and methods with special visibilities (private, protected and public)
 - Extend classes and override protected and public properties / methods with ease, or add new ones
 - Access the extended class via the `this.parent`-object (like in php)

TODO
----
 - implement static properties and methods
 - implement abstract classes and methods
 - implement interfaces
 - an option for something like an "instanceof"-Test (or even make the "instanceof"-statement usable by the classes and objects created with newClass)

FAQ
---
####The class-options are saved as a public property of the prototype-object, why do you still call it private?
That's right, with some hacking around you can actually even change the private properties and methods of the class you want to extend (before you extend her), but hacking is always possible. For example you could also read the text file and parse the data out of that (and then create a new class with the changed data).
####Does extending work over multiple files (with require) or even over multiple modules?
Yes, both works because the class-options are saved as a public property in the prototype of the class-object (the thing newClass() returns).
####Aren't private, protected, public, extends and so one reserved words in javascript?
Yeah, they are, but as of ECMASCript 5, reserved words are allowed as properties of objects and can be accessed with and without scare-brackets and quotes. So `this.protected.myVariable` is completely fine. :)

License
-------
This software is licensed under the [Mozilla Public License v. 2.0](http://mozilla.org/MPL/2.0/). For more information, read the file `LICENSE`.
