// jQuery in here
/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

    "use strict";

    if ( typeof module === "object" && typeof module.exports === "object" ) {

        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info.
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "jQuery requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
    "use strict";

    var arr = [];

    var document = window.document;

    var getProto = Object.getPrototypeOf;

    var slice = arr.slice;

    var concat = arr.concat;

    var push = arr.push;

    var indexOf = arr.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var fnToString = hasOwn.toString;

    var ObjectFunctionString = fnToString.call( Object );

    var support = {};

    var isFunction = function isFunction( obj ) {

        // Support: Chrome <=57, Firefox <=52
        // In some browsers, typeof returns "function" for HTML <object> elements
        // (i.e., `typeof document.createElement( "object" ) === "function"`).
        // We don't want to classify *any* DOM node as a function.
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };


    var isWindow = function isWindow( obj ) {
        return obj != null && obj === obj.window;
    };




    var preservedScriptAttributes = {
        type: true,
        src: true,
        noModule: true
    };

    function DOMEval( code, doc, node ) {
        doc = doc || document;

        var i,
            script = doc.createElement( "script" );

        script.text = code;
        if ( node ) {
            for ( i in preservedScriptAttributes ) {
                if ( node[ i ] ) {
                    script[ i ] = node[ i ];
                }
            }
        }
        doc.head.appendChild( script ).parentNode.removeChild( script );
    }


    function toType( obj ) {
        if ( obj == null ) {
            return obj + "";
        }

        // Support: Android <=2.3 only (functionish RegExp)
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[ toString.call( obj ) ] || "object" :
            typeof obj;
    }
    /* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



    var
        version = "3.3.1",

        // Define a local copy of jQuery
        jQuery = function( selector, context ) {

            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init( selector, context );
        },

        // Support: Android <=4.0 only
        // Make sure we trim BOM and NBSP
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    jQuery.fn = jQuery.prototype = {

        // The current version of jQuery being used
        jquery: version,

        constructor: jQuery,

        // The default length of a jQuery object is 0
        length: 0,

        toArray: function() {
            return slice.call( this );
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function( num ) {

            // Return all the elements in a clean array
            if ( num == null ) {
                return slice.call( this );
            }

            // Return just the one element from the set
            return num < 0 ? this[ num + this.length ] : this[ num ];
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function( elems ) {

            // Build a new jQuery matched element set
            var ret = jQuery.merge( this.constructor(), elems );

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;

            // Return the newly-formed element set
            return ret;
        },

        // Execute a callback for every element in the matched set.
        each: function( callback ) {
            return jQuery.each( this, callback );
        },

        map: function( callback ) {
            return this.pushStack( jQuery.map( this, function( elem, i ) {
                return callback.call( elem, i, elem );
            } ) );
        },

        slice: function() {
            return this.pushStack( slice.apply( this, arguments ) );
        },

        first: function() {
            return this.eq( 0 );
        },

        last: function() {
            return this.eq( -1 );
        },

        eq: function( i ) {
            var len = this.length,
                j = +i + ( i < 0 ? len : 0 );
            return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
        },

        end: function() {
            return this.prevObject || this.constructor();
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: arr.sort,
        splice: arr.splice
    };

    jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[ 0 ] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;

            // Skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !isFunction( target ) ) {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {

            // Only deal with non-null/undefined values
            if ( ( options = arguments[ i ] ) != null ) {

                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
                            ( copyIsArray = Array.isArray( copy ) ) ) ) {

                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && Array.isArray( src ) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject( src ) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = jQuery.extend( deep, clone, copy );

                        // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    jQuery.extend( {

        // Unique for each copy of jQuery on the page
        expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

        // Assume jQuery is ready without the ready module
        isReady: true,

        error: function( msg ) {
            throw new Error( msg );
        },

        noop: function() {},

        isPlainObject: function( obj ) {
            var proto, Ctor;

            // Detect obvious negatives
            // Use toString instead of jQuery.type to catch host objects
            if ( !obj || toString.call( obj ) !== "[object Object]" ) {
                return false;
            }

            proto = getProto( obj );

            // Objects with no prototype (e.g., `Object.create( null )`) are plain
            if ( !proto ) {
                return true;
            }

            // Objects with prototype are plain iff they were constructed by a global Object function
            Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
            return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
        },

        isEmptyObject: function( obj ) {

            /* eslint-disable no-unused-vars */
            // See https://github.com/eslint/eslint/issues/6125
            var name;

            for ( name in obj ) {
                return false;
            }
            return true;
        },

        // Evaluates a script in a global context
        globalEval: function( code ) {
            DOMEval( code );
        },

        each: function( obj, callback ) {
            var length, i = 0;

            if ( isArrayLike( obj ) ) {
                length = obj.length;
                for ( ; i < length; i++ ) {
                    if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                        break;
                    }
                }
            } else {
                for ( i in obj ) {
                    if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                        break;
                    }
                }
            }

            return obj;
        },

        // Support: Android <=4.0 only
        trim: function( text ) {
            return text == null ?
                "" :
                ( text + "" ).replace( rtrim, "" );
        },

        // results is for internal usage only
        makeArray: function( arr, results ) {
            var ret = results || [];

            if ( arr != null ) {
                if ( isArrayLike( Object( arr ) ) ) {
                    jQuery.merge( ret,
                        typeof arr === "string" ?
                            [ arr ] : arr
                    );
                } else {
                    push.call( ret, arr );
                }
            }

            return ret;
        },

        inArray: function( elem, arr, i ) {
            return arr == null ? -1 : indexOf.call( arr, elem, i );
        },

        // Support: Android <=4.0 only, PhantomJS 1 only
        // push.apply(_, arraylike) throws on ancient WebKit
        merge: function( first, second ) {
            var len = +second.length,
                j = 0,
                i = first.length;

            for ( ; j < len; j++ ) {
                first[ i++ ] = second[ j ];
            }

            first.length = i;

            return first;
        },

        grep: function( elems, callback, invert ) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for ( ; i < length; i++ ) {
                callbackInverse = !callback( elems[ i ], i );
                if ( callbackInverse !== callbackExpect ) {
                    matches.push( elems[ i ] );
                }
            }

            return matches;
        },

        // arg is for internal usage only
        map: function( elems, callback, arg ) {
            var length, value,
                i = 0,
                ret = [];

            // Go through the array, translating each of the items to their new values
            if ( isArrayLike( elems ) ) {
                length = elems.length;
                for ( ; i < length; i++ ) {
                    value = callback( elems[ i ], i, arg );

                    if ( value != null ) {
                        ret.push( value );
                    }
                }

                // Go through every key on the object,
            } else {
                for ( i in elems ) {
                    value = callback( elems[ i ], i, arg );

                    if ( value != null ) {
                        ret.push( value );
                    }
                }
            }

            // Flatten any nested arrays
            return concat.apply( [], ret );
        },

        // A global GUID counter for objects
        guid: 1,

        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    } );

    if ( typeof Symbol === "function" ) {
        jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
    }

// Populate the class2type map
    jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
        function( i, name ) {
            class2type[ "[object " + name + "]" ] = name.toLowerCase();
        } );

    function isArrayLike( obj ) {

        // Support: real iOS 8.2 only (not reproducible in simulator)
        // `in` check used to prevent JIT error (gh-2145)
        // hasOwn isn't used here due to false negatives
        // regarding Nodelist length in IE
        var length = !!obj && "length" in obj && obj.length,
            type = toType( obj );

        if ( isFunction( obj ) || isWindow( obj ) ) {
            return false;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    }
    var Sizzle =
        /*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
        (function( window ) {

            var i,
                support,
                Expr,
                getText,
                isXML,
                tokenize,
                compile,
                select,
                outermostContext,
                sortInput,
                hasDuplicate,

                // Local document vars
                setDocument,
                document,
                docElem,
                documentIsHTML,
                rbuggyQSA,
                rbuggyMatches,
                matches,
                contains,

                // Instance-specific data
                expando = "sizzle" + 1 * new Date(),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function( a, b ) {
                    if ( a === b ) {
                        hasDuplicate = true;
                    }
                    return 0;
                },

                // Instance methods
                hasOwn = ({}).hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
                // Use a stripped-down indexOf as it's faster than native
                // https://jsperf.com/thor-indexof-vs-for/5
                indexOf = function( list, elem ) {
                    var i = 0,
                        len = list.length;
                    for ( ; i < len; i++ ) {
                        if ( list[i] === elem ) {
                            return i;
                        }
                    }
                    return -1;
                },

                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

                // Regular expressions

                // http://www.w3.org/TR/css3-selectors/#whitespace
                whitespace = "[\\x20\\t\\r\\n\\f]",

                // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
                identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

                // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
                attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
                    // Operator (capture 2)
                    "*([*^$|!~]?=)" + whitespace +
                    // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
                    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
                    "*\\]",

                pseudos = ":(" + identifier + ")(?:\\((" +
                    // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                    // 1. quoted (capture 3; capture 4 or capture 5)
                    "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                    // 2. simple (capture 6)
                    "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
                    // 3. anything else (capture 2)
                    ".*" +
                    ")\\)|)",

                // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                rwhitespace = new RegExp( whitespace + "+", "g" ),
                rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

                rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
                rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

                rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

                rpseudo = new RegExp( pseudos ),
                ridentifier = new RegExp( "^" + identifier + "$" ),

                matchExpr = {
                    "ID": new RegExp( "^#(" + identifier + ")" ),
                    "CLASS": new RegExp( "^\\.(" + identifier + ")" ),
                    "TAG": new RegExp( "^(" + identifier + "|[*])" ),
                    "ATTR": new RegExp( "^" + attributes ),
                    "PSEUDO": new RegExp( "^" + pseudos ),
                    "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                        "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                        "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
                    "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
                    // For use in libraries implementing .is()
                    // We use this for POS matching in `select`
                    "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                        whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
                },

                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,

                rnative = /^[^{]+\{\s*\[native \w/,

                // Easily-parseable/retrievable ID or TAG or CLASS selectors
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

                rsibling = /[+~]/,

                // CSS escapes
                // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
                runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
                funescape = function( _, escaped, escapedWhitespace ) {
                    var high = "0x" + escaped - 0x10000;
                    // NaN means non-codepoint
                    // Support: Firefox<24
                    // Workaround erroneous numeric interpretation of +"0x"
                    return high !== high || escapedWhitespace ?
                        escaped :
                        high < 0 ?
                            // BMP codepoint
                            String.fromCharCode( high + 0x10000 ) :
                            // Supplemental Plane codepoint (surrogate pair)
                            String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
                },

                // CSS string/identifier serialization
                // https://drafts.csswg.org/cssom/#common-serializing-idioms
                rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                fcssescape = function( ch, asCodePoint ) {
                    if ( asCodePoint ) {

                        // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                        if ( ch === "\0" ) {
                            return "\uFFFD";
                        }

                        // Control characters and (dependent upon position) numbers get escaped as code points
                        return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
                    }

                    // Other potentially-special ASCII characters get backslash-escaped
                    return "\\" + ch;
                },

                // Used for iframes
                // See setDocument()
                // Removing the function wrapper causes a "Permission Denied"
                // error in IE
                unloadHandler = function() {
                    setDocument();
                },

                disabledAncestor = addCombinator(
                    function( elem ) {
                        return elem.disabled === true && ("form" in elem || "label" in elem);
                    },
                    { dir: "parentNode", next: "legend" }
                );

// Optimize for push.apply( _, NodeList )
            try {
                push.apply(
                    (arr = slice.call( preferredDoc.childNodes )),
                    preferredDoc.childNodes
                );
                // Support: Android<4.0
                // Detect silently failing push.apply
                arr[ preferredDoc.childNodes.length ].nodeType;
            } catch ( e ) {
                push = { apply: arr.length ?

                        // Leverage slice if possible
                        function( target, els ) {
                            push_native.apply( target, slice.call(els) );
                        } :

                        // Support: IE<9
                        // Otherwise append directly
                        function( target, els ) {
                            var j = target.length,
                                i = 0;
                            // Can't trust NodeList.length
                            while ( (target[j++] = els[i++]) ) {}
                            target.length = j - 1;
                        }
                };
            }

            function Sizzle( selector, context, results, seed ) {
                var m, i, elem, nid, match, groups, newSelector,
                    newContext = context && context.ownerDocument,

                    // nodeType defaults to 9, since context defaults to document
                    nodeType = context ? context.nodeType : 9;

                results = results || [];

                // Return early from calls with invalid selector or context
                if ( typeof selector !== "string" || !selector ||
                    nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

                    return results;
                }

                // Try to shortcut find operations (as opposed to filters) in HTML documents
                if ( !seed ) {

                    if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
                        setDocument( context );
                    }
                    context = context || document;

                    if ( documentIsHTML ) {

                        // If the selector is sufficiently simple, try using a "get*By*" DOM method
                        // (excepting DocumentFragment context, where the methods don't exist)
                        if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

                            // ID selector
                            if ( (m = match[1]) ) {

                                // Document context
                                if ( nodeType === 9 ) {
                                    if ( (elem = context.getElementById( m )) ) {

                                        // Support: IE, Opera, Webkit
                                        // TODO: identify versions
                                        // getElementById can match elements by name instead of ID
                                        if ( elem.id === m ) {
                                            results.push( elem );
                                            return results;
                                        }
                                    } else {
                                        return results;
                                    }

                                    // Element context
                                } else {

                                    // Support: IE, Opera, Webkit
                                    // TODO: identify versions
                                    // getElementById can match elements by name instead of ID
                                    if ( newContext && (elem = newContext.getElementById( m )) &&
                                        contains( context, elem ) &&
                                        elem.id === m ) {

                                        results.push( elem );
                                        return results;
                                    }
                                }

                                // Type selector
                            } else if ( match[2] ) {
                                push.apply( results, context.getElementsByTagName( selector ) );
                                return results;

                                // Class selector
                            } else if ( (m = match[3]) && support.getElementsByClassName &&
                                context.getElementsByClassName ) {

                                push.apply( results, context.getElementsByClassName( m ) );
                                return results;
                            }
                        }

                        // Take advantage of querySelectorAll
                        if ( support.qsa &&
                            !compilerCache[ selector + " " ] &&
                            (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

                            if ( nodeType !== 1 ) {
                                newContext = context;
                                newSelector = selector;

                                // qSA looks outside Element context, which is not what we want
                                // Thanks to Andrew Dupont for this workaround technique
                                // Support: IE <=8
                                // Exclude object elements
                            } else if ( context.nodeName.toLowerCase() !== "object" ) {

                                // Capture the context ID, setting it first if necessary
                                if ( (nid = context.getAttribute( "id" )) ) {
                                    nid = nid.replace( rcssescape, fcssescape );
                                } else {
                                    context.setAttribute( "id", (nid = expando) );
                                }

                                // Prefix every selector in the list
                                groups = tokenize( selector );
                                i = groups.length;
                                while ( i-- ) {
                                    groups[i] = "#" + nid + " " + toSelector( groups[i] );
                                }
                                newSelector = groups.join( "," );

                                // Expand context for sibling selectors
                                newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
                                    context;
                            }

                            if ( newSelector ) {
                                try {
                                    push.apply( results,
                                        newContext.querySelectorAll( newSelector )
                                    );
                                    return results;
                                } catch ( qsaError ) {
                                } finally {
                                    if ( nid === expando ) {
                                        context.removeAttribute( "id" );
                                    }
                                }
                            }
                        }
                    }
                }

                // All others
                return select( selector.replace( rtrim, "$1" ), context, results, seed );
            }

            /**
             * Create key-value caches of limited size
             * @returns {function(string, object)} Returns the Object data after storing it on itself with
             *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
             *	deleting the oldest entry
             */
            function createCache() {
                var keys = [];

                function cache( key, value ) {
                    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                    if ( keys.push( key + " " ) > Expr.cacheLength ) {
                        // Only keep the most recent entries
                        delete cache[ keys.shift() ];
                    }
                    return (cache[ key + " " ] = value);
                }
                return cache;
            }

            /**
             * Mark a function for special use by Sizzle
             * @param {Function} fn The function to mark
             */
            function markFunction( fn ) {
                fn[ expando ] = true;
                return fn;
            }

            /**
             * Support testing using an element
             * @param {Function} fn Passed the created element and returns a boolean result
             */
            function assert( fn ) {
                var el = document.createElement("fieldset");

                try {
                    return !!fn( el );
                } catch (e) {
                    return false;
                } finally {
                    // Remove from its parent by default
                    if ( el.parentNode ) {
                        el.parentNode.removeChild( el );
                    }
                    // release memory in IE
                    el = null;
                }
            }

            /**
             * Adds the same handler for all of the specified attrs
             * @param {String} attrs Pipe-separated list of attributes
             * @param {Function} handler The method that will be applied
             */
            function addHandle( attrs, handler ) {
                var arr = attrs.split("|"),
                    i = arr.length;

                while ( i-- ) {
                    Expr.attrHandle[ arr[i] ] = handler;
                }
            }

            /**
             * Checks document order of two siblings
             * @param {Element} a
             * @param {Element} b
             * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
             */
            function siblingCheck( a, b ) {
                var cur = b && a,
                    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                        a.sourceIndex - b.sourceIndex;

                // Use IE sourceIndex if available on both nodes
                if ( diff ) {
                    return diff;
                }

                // Check if b follows a
                if ( cur ) {
                    while ( (cur = cur.nextSibling) ) {
                        if ( cur === b ) {
                            return -1;
                        }
                    }
                }

                return a ? 1 : -1;
            }

            /**
             * Returns a function to use in pseudos for input types
             * @param {String} type
             */
            function createInputPseudo( type ) {
                return function( elem ) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for buttons
             * @param {String} type
             */
            function createButtonPseudo( type ) {
                return function( elem ) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for :enabled/:disabled
             * @param {Boolean} disabled true for :disabled; false for :enabled
             */
            function createDisabledPseudo( disabled ) {

                // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
                return function( elem ) {

                    // Only certain elements can match :enabled or :disabled
                    // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
                    // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
                    if ( "form" in elem ) {

                        // Check for inherited disabledness on relevant non-disabled elements:
                        // * listed form-associated elements in a disabled fieldset
                        //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
                        //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
                        // * option elements in a disabled optgroup
                        //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
                        // All such elements have a "form" property.
                        if ( elem.parentNode && elem.disabled === false ) {

                            // Option elements defer to a parent optgroup if present
                            if ( "label" in elem ) {
                                if ( "label" in elem.parentNode ) {
                                    return elem.parentNode.disabled === disabled;
                                } else {
                                    return elem.disabled === disabled;
                                }
                            }

                            // Support: IE 6 - 11
                            // Use the isDisabled shortcut property to check for disabled fieldset ancestors
                            return elem.isDisabled === disabled ||

                                // Where there is no isDisabled, check manually
                                /* jshint -W018 */
                                elem.isDisabled !== !disabled &&
                                disabledAncestor( elem ) === disabled;
                        }

                        return elem.disabled === disabled;

                        // Try to winnow out elements that can't be disabled before trusting the disabled property.
                        // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
                        // even exist on them, let alone have a boolean value.
                    } else if ( "label" in elem ) {
                        return elem.disabled === disabled;
                    }

                    // Remaining elements are neither :enabled nor :disabled
                    return false;
                };
            }

            /**
             * Returns a function to use in pseudos for positionals
             * @param {Function} fn
             */
            function createPositionalPseudo( fn ) {
                return markFunction(function( argument ) {
                    argument = +argument;
                    return markFunction(function( seed, matches ) {
                        var j,
                            matchIndexes = fn( [], seed.length, argument ),
                            i = matchIndexes.length;

                        // Match elements found at the specified indexes
                        while ( i-- ) {
                            if ( seed[ (j = matchIndexes[i]) ] ) {
                                seed[j] = !(matches[j] = seed[j]);
                            }
                        }
                    });
                });
            }

            /**
             * Checks a node for validity as a Sizzle context
             * @param {Element|Object=} context
             * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
             */
            function testContext( context ) {
                return context && typeof context.getElementsByTagName !== "undefined" && context;
            }

// Expose support vars for convenience
            support = Sizzle.support = {};

            /**
             * Detects XML nodes
             * @param {Element|Object} elem An element or a document
             * @returns {Boolean} True iff elem is a non-HTML XML node
             */
            isXML = Sizzle.isXML = function( elem ) {
                // documentElement is verified for cases where it doesn't yet exist
                // (such as loading iframes in IE - #4833)
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            };

            /**
             * Sets document-related variables once based on the current document
             * @param {Element|Object} [doc] An element or document object to use to set the document
             * @returns {Object} Returns the current document
             */
            setDocument = Sizzle.setDocument = function( node ) {
                var hasCompare, subWindow,
                    doc = node ? node.ownerDocument || node : preferredDoc;

                // Return early if doc is invalid or already selected
                if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
                    return document;
                }

                // Update global variables
                document = doc;
                docElem = document.documentElement;
                documentIsHTML = !isXML( document );

                // Support: IE 9-11, Edge
                // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
                if ( preferredDoc !== document &&
                    (subWindow = document.defaultView) && subWindow.top !== subWindow ) {

                    // Support: IE 11, Edge
                    if ( subWindow.addEventListener ) {
                        subWindow.addEventListener( "unload", unloadHandler, false );

                        // Support: IE 9 - 10 only
                    } else if ( subWindow.attachEvent ) {
                        subWindow.attachEvent( "onunload", unloadHandler );
                    }
                }

                /* Attributes
	---------------------------------------------------------------------- */

                // Support: IE<8
                // Verify that getAttribute really returns attributes and not properties
                // (excepting IE8 booleans)
                support.attributes = assert(function( el ) {
                    el.className = "i";
                    return !el.getAttribute("className");
                });

                /* getElement(s)By*
	---------------------------------------------------------------------- */

                // Check if getElementsByTagName("*") returns only elements
                support.getElementsByTagName = assert(function( el ) {
                    el.appendChild( document.createComment("") );
                    return !el.getElementsByTagName("*").length;
                });

                // Support: IE<9
                support.getElementsByClassName = rnative.test( document.getElementsByClassName );

                // Support: IE<10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programmatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function( el ) {
                    docElem.appendChild( el ).id = expando;
                    return !document.getElementsByName || !document.getElementsByName( expando ).length;
                });

                // ID filter and find
                if ( support.getById ) {
                    Expr.filter["ID"] = function( id ) {
                        var attrId = id.replace( runescape, funescape );
                        return function( elem ) {
                            return elem.getAttribute("id") === attrId;
                        };
                    };
                    Expr.find["ID"] = function( id, context ) {
                        if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
                            var elem = context.getElementById( id );
                            return elem ? [ elem ] : [];
                        }
                    };
                } else {
                    Expr.filter["ID"] =  function( id ) {
                        var attrId = id.replace( runescape, funescape );
                        return function( elem ) {
                            var node = typeof elem.getAttributeNode !== "undefined" &&
                                elem.getAttributeNode("id");
                            return node && node.value === attrId;
                        };
                    };

                    // Support: IE 6 - 7 only
                    // getElementById is not reliable as a find shortcut
                    Expr.find["ID"] = function( id, context ) {
                        if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
                            var node, i, elems,
                                elem = context.getElementById( id );

                            if ( elem ) {

                                // Verify the id attribute
                                node = elem.getAttributeNode("id");
                                if ( node && node.value === id ) {
                                    return [ elem ];
                                }

                                // Fall back on getElementsByName
                                elems = context.getElementsByName( id );
                                i = 0;
                                while ( (elem = elems[i++]) ) {
                                    node = elem.getAttributeNode("id");
                                    if ( node && node.value === id ) {
                                        return [ elem ];
                                    }
                                }
                            }

                            return [];
                        }
                    };
                }

                // Tag
                Expr.find["TAG"] = support.getElementsByTagName ?
                    function( tag, context ) {
                        if ( typeof context.getElementsByTagName !== "undefined" ) {
                            return context.getElementsByTagName( tag );

                            // DocumentFragment nodes don't have gEBTN
                        } else if ( support.qsa ) {
                            return context.querySelectorAll( tag );
                        }
                    } :

                    function( tag, context ) {
                        var elem,
                            tmp = [],
                            i = 0,
                            // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                            results = context.getElementsByTagName( tag );

                        // Filter out possible comments
                        if ( tag === "*" ) {
                            while ( (elem = results[i++]) ) {
                                if ( elem.nodeType === 1 ) {
                                    tmp.push( elem );
                                }
                            }

                            return tmp;
                        }
                        return results;
                    };

                // Class
                Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
                    if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
                        return context.getElementsByClassName( className );
                    }
                };

                /* QSA/matchesSelector
	---------------------------------------------------------------------- */

                // QSA and matchesSelector support

                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                rbuggyMatches = [];

                // qSa(:focus) reports false when true (Chrome 21)
                // We allow this because of a bug in IE8/9 that throws an error
                // whenever `document.activeElement` is accessed on an iframe
                // So, we allow :focus to pass through QSA all the time to avoid the IE error
                // See https://bugs.jquery.com/ticket/13378
                rbuggyQSA = [];

                if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
                    // Build QSA regex
                    // Regex strategy adopted from Diego Perini
                    assert(function( el ) {
                        // Select is set to empty string on purpose
                        // This is to test IE's treatment of not explicitly
                        // setting a boolean content attribute,
                        // since its presence should be enough
                        // https://bugs.jquery.com/ticket/12359
                        docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
                            "<select id='" + expando + "-\r\\' msallowcapture=''>" +
                            "<option selected=''></option></select>";

                        // Support: IE8, Opera 11-12.16
                        // Nothing should be selected when empty strings follow ^= or $= or *=
                        // The test attribute must be unknown in Opera but "safe" for WinRT
                        // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                        if ( el.querySelectorAll("[msallowcapture^='']").length ) {
                            rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
                        }

                        // Support: IE8
                        // Boolean attributes and "value" are not treated correctly
                        if ( !el.querySelectorAll("[selected]").length ) {
                            rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
                        }

                        // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
                        if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
                            rbuggyQSA.push("~=");
                        }

                        // Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here and will not see later tests
                        if ( !el.querySelectorAll(":checked").length ) {
                            rbuggyQSA.push(":checked");
                        }

                        // Support: Safari 8+, iOS 8+
                        // https://bugs.webkit.org/show_bug.cgi?id=136851
                        // In-page `selector#id sibling-combinator selector` fails
                        if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
                            rbuggyQSA.push(".#.+[+~]");
                        }
                    });

                    assert(function( el ) {
                        el.innerHTML = "<a href='' disabled='disabled'></a>" +
                            "<select disabled='disabled'><option/></select>";

                        // Support: Windows 8 Native Apps
                        // The type and name attributes are restricted during .innerHTML assignment
                        var input = document.createElement("input");
                        input.setAttribute( "type", "hidden" );
                        el.appendChild( input ).setAttribute( "name", "D" );

                        // Support: IE8
                        // Enforce case-sensitivity of name attribute
                        if ( el.querySelectorAll("[name=d]").length ) {
                            rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
                        }

                        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here and will not see later tests
                        if ( el.querySelectorAll(":enabled").length !== 2 ) {
                            rbuggyQSA.push( ":enabled", ":disabled" );
                        }

                        // Support: IE9-11+
                        // IE's :disabled selector does not pick up the children of disabled fieldsets
                        docElem.appendChild( el ).disabled = true;
                        if ( el.querySelectorAll(":disabled").length !== 2 ) {
                            rbuggyQSA.push( ":enabled", ":disabled" );
                        }

                        // Opera 10-11 does not throw on post-comma invalid pseudos
                        el.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:");
                    });
                }

                if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
                        docElem.webkitMatchesSelector ||
                        docElem.mozMatchesSelector ||
                        docElem.oMatchesSelector ||
                        docElem.msMatchesSelector) )) ) {

                    assert(function( el ) {
                        // Check to see if it's possible to do matchesSelector
                        // on a disconnected node (IE 9)
                        support.disconnectedMatch = matches.call( el, "*" );

                        // This should fail with an exception
                        // Gecko does not error, returns false instead
                        matches.call( el, "[s!='']:x" );
                        rbuggyMatches.push( "!=", pseudos );
                    });
                }

                rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
                rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

                /* Contains
	---------------------------------------------------------------------- */
                hasCompare = rnative.test( docElem.compareDocumentPosition );

                // Element contains another
                // Purposefully self-exclusive
                // As in, an element does not contain itself
                contains = hasCompare || rnative.test( docElem.contains ) ?
                    function( a, b ) {
                        var adown = a.nodeType === 9 ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !!( bup && bup.nodeType === 1 && (
                            adown.contains ?
                                adown.contains( bup ) :
                                a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
                        ));
                    } :
                    function( a, b ) {
                        if ( b ) {
                            while ( (b = b.parentNode) ) {
                                if ( b === a ) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };

                /* Sorting
	---------------------------------------------------------------------- */

                // Document order sorting
                sortOrder = hasCompare ?
                    function( a, b ) {

                        // Flag for duplicate removal
                        if ( a === b ) {
                            hasDuplicate = true;
                            return 0;
                        }

                        // Sort on method existence if only one input has compareDocumentPosition
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        if ( compare ) {
                            return compare;
                        }

                        // Calculate position if both inputs belong to the same document
                        compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
                            a.compareDocumentPosition( b ) :

                            // Otherwise we know they are disconnected
                            1;

                        // Disconnected nodes
                        if ( compare & 1 ||
                            (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

                            // Choose the first element that is related to our preferred document
                            if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
                                return -1;
                            }
                            if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
                                return 1;
                            }

                            // Maintain original order
                            return sortInput ?
                                ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
                                0;
                        }

                        return compare & 4 ? -1 : 1;
                    } :
                    function( a, b ) {
                        // Exit early if the nodes are identical
                        if ( a === b ) {
                            hasDuplicate = true;
                            return 0;
                        }

                        var cur,
                            i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [ a ],
                            bp = [ b ];

                        // Parentless nodes are either documents or disconnected
                        if ( !aup || !bup ) {
                            return a === document ? -1 :
                                b === document ? 1 :
                                    aup ? -1 :
                                        bup ? 1 :
                                            sortInput ?
                                                ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
                                                0;

                            // If the nodes are siblings, we can do a quick check
                        } else if ( aup === bup ) {
                            return siblingCheck( a, b );
                        }

                        // Otherwise we need full lists of their ancestors for comparison
                        cur = a;
                        while ( (cur = cur.parentNode) ) {
                            ap.unshift( cur );
                        }
                        cur = b;
                        while ( (cur = cur.parentNode) ) {
                            bp.unshift( cur );
                        }

                        // Walk down the tree looking for a discrepancy
                        while ( ap[i] === bp[i] ) {
                            i++;
                        }

                        return i ?
                            // Do a sibling check if the nodes have a common ancestor
                            siblingCheck( ap[i], bp[i] ) :

                            // Otherwise nodes in our document sort first
                            ap[i] === preferredDoc ? -1 :
                                bp[i] === preferredDoc ? 1 :
                                    0;
                    };

                return document;
            };

            Sizzle.matches = function( expr, elements ) {
                return Sizzle( expr, null, null, elements );
            };

            Sizzle.matchesSelector = function( elem, expr ) {
                // Set document vars if needed
                if ( ( elem.ownerDocument || elem ) !== document ) {
                    setDocument( elem );
                }

                // Make sure that attribute selectors are quoted
                expr = expr.replace( rattributeQuotes, "='$1']" );

                if ( support.matchesSelector && documentIsHTML &&
                    !compilerCache[ expr + " " ] &&
                    ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
                    ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

                    try {
                        var ret = matches.call( elem, expr );

                        // IE 9's matchesSelector returns false on disconnected nodes
                        if ( ret || support.disconnectedMatch ||
                            // As well, disconnected nodes are said to be in a document
                            // fragment in IE 9
                            elem.document && elem.document.nodeType !== 11 ) {
                            return ret;
                        }
                    } catch (e) {}
                }

                return Sizzle( expr, document, null, [ elem ] ).length > 0;
            };

            Sizzle.contains = function( context, elem ) {
                // Set document vars if needed
                if ( ( context.ownerDocument || context ) !== document ) {
                    setDocument( context );
                }
                return contains( context, elem );
            };

            Sizzle.attr = function( elem, name ) {
                // Set document vars if needed
                if ( ( elem.ownerDocument || elem ) !== document ) {
                    setDocument( elem );
                }

                var fn = Expr.attrHandle[ name.toLowerCase() ],
                    // Don't get fooled by Object.prototype properties (jQuery #13807)
                    val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
                        fn( elem, name, !documentIsHTML ) :
                        undefined;

                return val !== undefined ?
                    val :
                    support.attributes || !documentIsHTML ?
                        elem.getAttribute( name ) :
                        (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            null;
            };

            Sizzle.escape = function( sel ) {
                return (sel + "").replace( rcssescape, fcssescape );
            };

            Sizzle.error = function( msg ) {
                throw new Error( "Syntax error, unrecognized expression: " + msg );
            };

            /**
             * Document sorting and removing duplicates
             * @param {ArrayLike} results
             */
            Sizzle.uniqueSort = function( results ) {
                var elem,
                    duplicates = [],
                    j = 0,
                    i = 0;

                // Unless we *know* we can detect duplicates, assume their presence
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice( 0 );
                results.sort( sortOrder );

                if ( hasDuplicate ) {
                    while ( (elem = results[i++]) ) {
                        if ( elem === results[ i ] ) {
                            j = duplicates.push( i );
                        }
                    }
                    while ( j-- ) {
                        results.splice( duplicates[ j ], 1 );
                    }
                }

                // Clear input after sorting to release objects
                // See https://github.com/jquery/sizzle/pull/225
                sortInput = null;

                return results;
            };

            /**
             * Utility function for retrieving the text value of an array of DOM nodes
             * @param {Array|Element} elem
             */
            getText = Sizzle.getText = function( elem ) {
                var node,
                    ret = "",
                    i = 0,
                    nodeType = elem.nodeType;

                if ( !nodeType ) {
                    // If no nodeType, this is expected to be an array
                    while ( (node = elem[i++]) ) {
                        // Do not traverse comment nodes
                        ret += getText( node );
                    }
                } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (jQuery #11153)
                    if ( typeof elem.textContent === "string" ) {
                        return elem.textContent;
                    } else {
                        // Traverse its children
                        for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                            ret += getText( elem );
                        }
                    }
                } else if ( nodeType === 3 || nodeType === 4 ) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes

                return ret;
            };

            Expr = Sizzle.selectors = {

                // Can be adjusted by the user
                cacheLength: 50,

                createPseudo: markFunction,

                match: matchExpr,

                attrHandle: {},

                find: {},

                relative: {
                    ">": { dir: "parentNode", first: true },
                    " ": { dir: "parentNode" },
                    "+": { dir: "previousSibling", first: true },
                    "~": { dir: "previousSibling" }
                },

                preFilter: {
                    "ATTR": function( match ) {
                        match[1] = match[1].replace( runescape, funescape );

                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

                        if ( match[2] === "~=" ) {
                            match[3] = " " + match[3] + " ";
                        }

                        return match.slice( 0, 4 );
                    },

                    "CHILD": function( match ) {
                        /* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
                        match[1] = match[1].toLowerCase();

                        if ( match[1].slice( 0, 3 ) === "nth" ) {
                            // nth-* requires argument
                            if ( !match[3] ) {
                                Sizzle.error( match[0] );
                            }

                            // numeric x and y parameters for Expr.filter.CHILD
                            // remember that false/true cast respectively to 0/1
                            match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
                            match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

                            // other types prohibit arguments
                        } else if ( match[3] ) {
                            Sizzle.error( match[0] );
                        }

                        return match;
                    },

                    "PSEUDO": function( match ) {
                        var excess,
                            unquoted = !match[6] && match[2];

                        if ( matchExpr["CHILD"].test( match[0] ) ) {
                            return null;
                        }

                        // Accept quoted arguments as-is
                        if ( match[3] ) {
                            match[2] = match[4] || match[5] || "";

                            // Strip excess characters from unquoted arguments
                        } else if ( unquoted && rpseudo.test( unquoted ) &&
                            // Get excess from tokenize (recursively)
                            (excess = tokenize( unquoted, true )) &&
                            // advance to the next closing parenthesis
                            (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

                            // excess is a negative index
                            match[0] = match[0].slice( 0, excess );
                            match[2] = unquoted.slice( 0, excess );
                        }

                        // Return only captures needed by the pseudo filter method (type and argument)
                        return match.slice( 0, 3 );
                    }
                },

                filter: {

                    "TAG": function( nodeNameSelector ) {
                        var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
                        return nodeNameSelector === "*" ?
                            function() { return true; } :
                            function( elem ) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                    },

                    "CLASS": function( className ) {
                        var pattern = classCache[ className + " " ];

                        return pattern ||
                            (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
                            classCache( className, function( elem ) {
                                return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
                            });
                    },

                    "ATTR": function( name, operator, check ) {
                        return function( elem ) {
                            var result = Sizzle.attr( elem, name );

                            if ( result == null ) {
                                return operator === "!=";
                            }
                            if ( !operator ) {
                                return true;
                            }

                            result += "";

                            return operator === "=" ? result === check :
                                operator === "!=" ? result !== check :
                                    operator === "^=" ? check && result.indexOf( check ) === 0 :
                                        operator === "*=" ? check && result.indexOf( check ) > -1 :
                                            operator === "$=" ? check && result.slice( -check.length ) === check :
                                                operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
                                                    operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
                                                        false;
                        };
                    },

                    "CHILD": function( type, what, argument, first, last ) {
                        var simple = type.slice( 0, 3 ) !== "nth",
                            forward = type.slice( -4 ) !== "last",
                            ofType = what === "of-type";

                        return first === 1 && last === 0 ?

                            // Shortcut for :nth-*(n)
                            function( elem ) {
                                return !!elem.parentNode;
                            } :

                            function( elem, context, xml ) {
                                var cache, uniqueCache, outerCache, node, nodeIndex, start,
                                    dir = simple !== forward ? "nextSibling" : "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem.nodeName.toLowerCase(),
                                    useCache = !xml && !ofType,
                                    diff = false;

                                if ( parent ) {

                                    // :(first|last|only)-(child|of-type)
                                    if ( simple ) {
                                        while ( dir ) {
                                            node = elem;
                                            while ( (node = node[ dir ]) ) {
                                                if ( ofType ?
                                                        node.nodeName.toLowerCase() === name :
                                                        node.nodeType === 1 ) {

                                                    return false;
                                                }
                                            }
                                            // Reverse direction for :only-* (if we haven't yet done so)
                                            start = dir = type === "only" && !start && "nextSibling";
                                        }
                                        return true;
                                    }

                                    start = [ forward ? parent.firstChild : parent.lastChild ];

                                    // non-xml :nth-child(...) stores cache data on `parent`
                                    if ( forward && useCache ) {

                                        // Seek `elem` from a previously-cached index

                                        // ...in a gzip-friendly way
                                        node = parent;
                                        outerCache = node[ expando ] || (node[ expando ] = {});

                                        // Support: IE <9 only
                                        // Defend against cloned attroperties (jQuery gh-1709)
                                        uniqueCache = outerCache[ node.uniqueID ] ||
                                            (outerCache[ node.uniqueID ] = {});

                                        cache = uniqueCache[ type ] || [];
                                        nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
                                        diff = nodeIndex && cache[ 2 ];
                                        node = nodeIndex && parent.childNodes[ nodeIndex ];

                                        while ( (node = ++nodeIndex && node && node[ dir ] ||

                                            // Fallback to seeking `elem` from the start
                                            (diff = nodeIndex = 0) || start.pop()) ) {

                                            // When found, cache indexes on `parent` and break
                                            if ( node.nodeType === 1 && ++diff && node === elem ) {
                                                uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
                                                break;
                                            }
                                        }

                                    } else {
                                        // Use previously-cached element index if available
                                        if ( useCache ) {
                                            // ...in a gzip-friendly way
                                            node = elem;
                                            outerCache = node[ expando ] || (node[ expando ] = {});

                                            // Support: IE <9 only
                                            // Defend against cloned attroperties (jQuery gh-1709)
                                            uniqueCache = outerCache[ node.uniqueID ] ||
                                                (outerCache[ node.uniqueID ] = {});

                                            cache = uniqueCache[ type ] || [];
                                            nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
                                            diff = nodeIndex;
                                        }

                                        // xml :nth-child(...)
                                        // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                        if ( diff === false ) {
                                            // Use the same loop as above to seek `elem` from the start
                                            while ( (node = ++nodeIndex && node && node[ dir ] ||
                                                (diff = nodeIndex = 0) || start.pop()) ) {

                                                if ( ( ofType ?
                                                        node.nodeName.toLowerCase() === name :
                                                        node.nodeType === 1 ) &&
                                                    ++diff ) {

                                                    // Cache the index of each encountered element
                                                    if ( useCache ) {
                                                        outerCache = node[ expando ] || (node[ expando ] = {});

                                                        // Support: IE <9 only
                                                        // Defend against cloned attroperties (jQuery gh-1709)
                                                        uniqueCache = outerCache[ node.uniqueID ] ||
                                                            (outerCache[ node.uniqueID ] = {});

                                                        uniqueCache[ type ] = [ dirruns, diff ];
                                                    }

                                                    if ( node === elem ) {
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    // Incorporate the offset, then check against cycle size
                                    diff -= last;
                                    return diff === first || ( diff % first === 0 && diff / first >= 0 );
                                }
                            };
                    },

                    "PSEUDO": function( pseudo, argument ) {
                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        var args,
                            fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
                                Sizzle.error( "unsupported pseudo: " + pseudo );

                        // The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as Sizzle does
                        if ( fn[ expando ] ) {
                            return fn( argument );
                        }

                        // But maintain support for old signatures
                        if ( fn.length > 1 ) {
                            args = [ pseudo, pseudo, "", argument ];
                            return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
                                markFunction(function( seed, matches ) {
                                    var idx,
                                        matched = fn( seed, argument ),
                                        i = matched.length;
                                    while ( i-- ) {
                                        idx = indexOf( seed, matched[i] );
                                        seed[ idx ] = !( matches[ idx ] = matched[i] );
                                    }
                                }) :
                                function( elem ) {
                                    return fn( elem, 0, args );
                                };
                        }

                        return fn;
                    }
                },

                pseudos: {
                    // Potentially complex pseudos
                    "not": markFunction(function( selector ) {
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var input = [],
                            results = [],
                            matcher = compile( selector.replace( rtrim, "$1" ) );

                        return matcher[ expando ] ?
                            markFunction(function( seed, matches, context, xml ) {
                                var elem,
                                    unmatched = matcher( seed, null, xml, [] ),
                                    i = seed.length;

                                // Match elements unmatched by `matcher`
                                while ( i-- ) {
                                    if ( (elem = unmatched[i]) ) {
                                        seed[i] = !(matches[i] = elem);
                                    }
                                }
                            }) :
                            function( elem, context, xml ) {
                                input[0] = elem;
                                matcher( input, null, xml, results );
                                // Don't keep the element (issue #299)
                                input[0] = null;
                                return !results.pop();
                            };
                    }),

                    "has": markFunction(function( selector ) {
                        return function( elem ) {
                            return Sizzle( selector, elem ).length > 0;
                        };
                    }),

                    "contains": markFunction(function( text ) {
                        text = text.replace( runescape, funescape );
                        return function( elem ) {
                            return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
                        };
                    }),

                    // "Whether an element is represented by a :lang() selector
                    // is based solely on the element's language value
                    // being equal to the identifier C,
                    // or beginning with the identifier C immediately followed by "-".
                    // The matching of C against the element's language value is performed case-insensitively.
                    // The identifier C does not have to be a valid language name."
                    // http://www.w3.org/TR/selectors/#lang-pseudo
                    "lang": markFunction( function( lang ) {
                        // lang value must be a valid identifier
                        if ( !ridentifier.test(lang || "") ) {
                            Sizzle.error( "unsupported lang: " + lang );
                        }
                        lang = lang.replace( runescape, funescape ).toLowerCase();
                        return function( elem ) {
                            var elemLang;
                            do {
                                if ( (elemLang = documentIsHTML ?
                                        elem.lang :
                                        elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
                                }
                            } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
                            return false;
                        };
                    }),

                    // Miscellaneous
                    "target": function( elem ) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice( 1 ) === elem.id;
                    },

                    "root": function( elem ) {
                        return elem === docElem;
                    },

                    "focus": function( elem ) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                    },

                    // Boolean properties
                    "enabled": createDisabledPseudo( false ),
                    "disabled": createDisabledPseudo( true ),

                    "checked": function( elem ) {
                        // In CSS3, :checked should return both checked and selected elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                    },

                    "selected": function( elem ) {
                        // Accessing this property makes selected-by-default
                        // options in Safari work properly
                        if ( elem.parentNode ) {
                            elem.parentNode.selectedIndex;
                        }

                        return elem.selected === true;
                    },

                    // Contents
                    "empty": function( elem ) {
                        // http://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                        //   but not by others (comment: 8; processing instruction: 7; etc.)
                        // nodeType < 6 works because attributes (2) do not appear as children
                        for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                            if ( elem.nodeType < 6 ) {
                                return false;
                            }
                        }
                        return true;
                    },

                    "parent": function( elem ) {
                        return !Expr.pseudos["empty"]( elem );
                    },

                    // Element/input types
                    "header": function( elem ) {
                        return rheader.test( elem.nodeName );
                    },

                    "input": function( elem ) {
                        return rinputs.test( elem.nodeName );
                    },

                    "button": function( elem ) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                    },

                    "text": function( elem ) {
                        var attr;
                        return elem.nodeName.toLowerCase() === "input" &&
                            elem.type === "text" &&

                            // Support: IE<8
                            // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                            ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
                    },

                    // Position-in-collection
                    "first": createPositionalPseudo(function() {
                        return [ 0 ];
                    }),

                    "last": createPositionalPseudo(function( matchIndexes, length ) {
                        return [ length - 1 ];
                    }),

                    "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        return [ argument < 0 ? argument + length : argument ];
                    }),

                    "even": createPositionalPseudo(function( matchIndexes, length ) {
                        var i = 0;
                        for ( ; i < length; i += 2 ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    }),

                    "odd": createPositionalPseudo(function( matchIndexes, length ) {
                        var i = 1;
                        for ( ; i < length; i += 2 ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    }),

                    "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        var i = argument < 0 ? argument + length : argument;
                        for ( ; --i >= 0; ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    }),

                    "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        var i = argument < 0 ? argument + length : argument;
                        for ( ; ++i < length; ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    })
                }
            };

            Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
            for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
                Expr.pseudos[ i ] = createInputPseudo( i );
            }
            for ( i in { submit: true, reset: true } ) {
                Expr.pseudos[ i ] = createButtonPseudo( i );
            }

// Easy API for creating new setFilters
            function setFilters() {}
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();

            tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
                var matched, match, tokens, type,
                    soFar, groups, preFilters,
                    cached = tokenCache[ selector + " " ];

                if ( cached ) {
                    return parseOnly ? 0 : cached.slice( 0 );
                }

                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;

                while ( soFar ) {

                    // Comma and first run
                    if ( !matched || (match = rcomma.exec( soFar )) ) {
                        if ( match ) {
                            // Don't consume trailing commas as valid
                            soFar = soFar.slice( match[0].length ) || soFar;
                        }
                        groups.push( (tokens = []) );
                    }

                    matched = false;

                    // Combinators
                    if ( (match = rcombinators.exec( soFar )) ) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            // Cast descendant combinators to space
                            type: match[0].replace( rtrim, " " )
                        });
                        soFar = soFar.slice( matched.length );
                    }

                    // Filters
                    for ( type in Expr.filter ) {
                        if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
                                (match = preFilters[ type ]( match ))) ) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice( matched.length );
                        }
                    }

                    if ( !matched ) {
                        break;
                    }
                }

                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                return parseOnly ?
                    soFar.length :
                    soFar ?
                        Sizzle.error( selector ) :
                        // Cache the tokens
                        tokenCache( selector, groups ).slice( 0 );
            };

            function toSelector( tokens ) {
                var i = 0,
                    len = tokens.length,
                    selector = "";
                for ( ; i < len; i++ ) {
                    selector += tokens[i].value;
                }
                return selector;
            }

            function addCombinator( matcher, combinator, base ) {
                var dir = combinator.dir,
                    skip = combinator.next,
                    key = skip || dir,
                    checkNonElements = base && key === "parentNode",
                    doneName = done++;

                return combinator.first ?
                    // Check against closest ancestor/preceding element
                    function( elem, context, xml ) {
                        while ( (elem = elem[ dir ]) ) {
                            if ( elem.nodeType === 1 || checkNonElements ) {
                                return matcher( elem, context, xml );
                            }
                        }
                        return false;
                    } :

                    // Check against all ancestor/preceding elements
                    function( elem, context, xml ) {
                        var oldCache, uniqueCache, outerCache,
                            newCache = [ dirruns, doneName ];

                        // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
                        if ( xml ) {
                            while ( (elem = elem[ dir ]) ) {
                                if ( elem.nodeType === 1 || checkNonElements ) {
                                    if ( matcher( elem, context, xml ) ) {
                                        return true;
                                    }
                                }
                            }
                        } else {
                            while ( (elem = elem[ dir ]) ) {
                                if ( elem.nodeType === 1 || checkNonElements ) {
                                    outerCache = elem[ expando ] || (elem[ expando ] = {});

                                    // Support: IE <9 only
                                    // Defend against cloned attroperties (jQuery gh-1709)
                                    uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

                                    if ( skip && skip === elem.nodeName.toLowerCase() ) {
                                        elem = elem[ dir ] || elem;
                                    } else if ( (oldCache = uniqueCache[ key ]) &&
                                        oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

                                        // Assign to newCache so results back-propagate to previous elements
                                        return (newCache[ 2 ] = oldCache[ 2 ]);
                                    } else {
                                        // Reuse newcache so results back-propagate to previous elements
                                        uniqueCache[ key ] = newCache;

                                        // A match means we're done; a fail means we have to keep checking
                                        if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                        return false;
                    };
            }

            function elementMatcher( matchers ) {
                return matchers.length > 1 ?
                    function( elem, context, xml ) {
                        var i = matchers.length;
                        while ( i-- ) {
                            if ( !matchers[i]( elem, context, xml ) ) {
                                return false;
                            }
                        }
                        return true;
                    } :
                    matchers[0];
            }

            function multipleContexts( selector, contexts, results ) {
                var i = 0,
                    len = contexts.length;
                for ( ; i < len; i++ ) {
                    Sizzle( selector, contexts[i], results );
                }
                return results;
            }

            function condense( unmatched, map, filter, context, xml ) {
                var elem,
                    newUnmatched = [],
                    i = 0,
                    len = unmatched.length,
                    mapped = map != null;

                for ( ; i < len; i++ ) {
                    if ( (elem = unmatched[i]) ) {
                        if ( !filter || filter( elem, context, xml ) ) {
                            newUnmatched.push( elem );
                            if ( mapped ) {
                                map.push( i );
                            }
                        }
                    }
                }

                return newUnmatched;
            }

            function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
                if ( postFilter && !postFilter[ expando ] ) {
                    postFilter = setMatcher( postFilter );
                }
                if ( postFinder && !postFinder[ expando ] ) {
                    postFinder = setMatcher( postFinder, postSelector );
                }
                return markFunction(function( seed, results, context, xml ) {
                    var temp, i, elem,
                        preMap = [],
                        postMap = [],
                        preexisting = results.length,

                        // Get initial elements from seed or context
                        elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

                        // Prefilter to get matcher input, preserving a map for seed-results synchronization
                        matcherIn = preFilter && ( seed || !selector ) ?
                            condense( elems, preMap, preFilter, context, xml ) :
                            elems,

                        matcherOut = matcher ?
                            // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                            postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

                                // ...intermediate processing is necessary
                                [] :

                                // ...otherwise use results directly
                                results :
                            matcherIn;

                    // Find primary matches
                    if ( matcher ) {
                        matcher( matcherIn, matcherOut, context, xml );
                    }

                    // Apply postFilter
                    if ( postFilter ) {
                        temp = condense( matcherOut, postMap );
                        postFilter( temp, [], context, xml );

                        // Un-match failing elements by moving them back to matcherIn
                        i = temp.length;
                        while ( i-- ) {
                            if ( (elem = temp[i]) ) {
                                matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
                            }
                        }
                    }

                    if ( seed ) {
                        if ( postFinder || preFilter ) {
                            if ( postFinder ) {
                                // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                temp = [];
                                i = matcherOut.length;
                                while ( i-- ) {
                                    if ( (elem = matcherOut[i]) ) {
                                        // Restore matcherIn since elem is not yet a final match
                                        temp.push( (matcherIn[i] = elem) );
                                    }
                                }
                                postFinder( null, (matcherOut = []), temp, xml );
                            }

                            // Move matched elements from seed to results to keep them synchronized
                            i = matcherOut.length;
                            while ( i-- ) {
                                if ( (elem = matcherOut[i]) &&
                                    (temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

                                    seed[temp] = !(results[temp] = elem);
                                }
                            }
                        }

                        // Add elements to results, through postFinder if defined
                    } else {
                        matcherOut = condense(
                            matcherOut === results ?
                                matcherOut.splice( preexisting, matcherOut.length ) :
                                matcherOut
                        );
                        if ( postFinder ) {
                            postFinder( null, results, matcherOut, xml );
                        } else {
                            push.apply( results, matcherOut );
                        }
                    }
                });
            }

            function matcherFromTokens( tokens ) {
                var checkContext, matcher, j,
                    len = tokens.length,
                    leadingRelative = Expr.relative[ tokens[0].type ],
                    implicitRelative = leadingRelative || Expr.relative[" "],
                    i = leadingRelative ? 1 : 0,

                    // The foundational matcher ensures that elements are reachable from top-level context(s)
                    matchContext = addCombinator( function( elem ) {
                        return elem === checkContext;
                    }, implicitRelative, true ),
                    matchAnyContext = addCombinator( function( elem ) {
                        return indexOf( checkContext, elem ) > -1;
                    }, implicitRelative, true ),
                    matchers = [ function( elem, context, xml ) {
                        var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                            (checkContext = context).nodeType ?
                                matchContext( elem, context, xml ) :
                                matchAnyContext( elem, context, xml ) );
                        // Avoid hanging onto element (issue #299)
                        checkContext = null;
                        return ret;
                    } ];

                for ( ; i < len; i++ ) {
                    if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
                        matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
                    } else {
                        matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

                        // Return special upon seeing a positional matcher
                        if ( matcher[ expando ] ) {
                            // Find the next relative operator (if any) for proper handling
                            j = ++i;
                            for ( ; j < len; j++ ) {
                                if ( Expr.relative[ tokens[j].type ] ) {
                                    break;
                                }
                            }
                            return setMatcher(
                                i > 1 && elementMatcher( matchers ),
                                i > 1 && toSelector(
                                // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
                                ).replace( rtrim, "$1" ),
                                matcher,
                                i < j && matcherFromTokens( tokens.slice( i, j ) ),
                                j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
                                j < len && toSelector( tokens )
                            );
                        }
                        matchers.push( matcher );
                    }
                }

                return elementMatcher( matchers );
            }

            function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
                var bySet = setMatchers.length > 0,
                    byElement = elementMatchers.length > 0,
                    superMatcher = function( seed, context, xml, results, outermost ) {
                        var elem, j, matcher,
                            matchedCount = 0,
                            i = "0",
                            unmatched = seed && [],
                            setMatched = [],
                            contextBackup = outermostContext,
                            // We must always have either seed elements or outermost context
                            elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
                            // Use integer dirruns iff this is the outermost matcher
                            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                            len = elems.length;

                        if ( outermost ) {
                            outermostContext = context === document || context || outermost;
                        }

                        // Add elements passing elementMatchers directly to results
                        // Support: IE<9, Safari
                        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                        for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
                            if ( byElement && elem ) {
                                j = 0;
                                if ( !context && elem.ownerDocument !== document ) {
                                    setDocument( elem );
                                    xml = !documentIsHTML;
                                }
                                while ( (matcher = elementMatchers[j++]) ) {
                                    if ( matcher( elem, context || document, xml) ) {
                                        results.push( elem );
                                        break;
                                    }
                                }
                                if ( outermost ) {
                                    dirruns = dirrunsUnique;
                                }
                            }

                            // Track unmatched elements for set filters
                            if ( bySet ) {
                                // They will have gone through all possible matchers
                                if ( (elem = !matcher && elem) ) {
                                    matchedCount--;
                                }

                                // Lengthen the array for every element, matched or not
                                if ( seed ) {
                                    unmatched.push( elem );
                                }
                            }
                        }

                        // `i` is now the count of elements visited above, and adding it to `matchedCount`
                        // makes the latter nonnegative.
                        matchedCount += i;

                        // Apply set filters to unmatched elements
                        // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
                        // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
                        // no element matchers and no seed.
                        // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
                        // case, which will result in a "00" `matchedCount` that differs from `i` but is also
                        // numerically zero.
                        if ( bySet && i !== matchedCount ) {
                            j = 0;
                            while ( (matcher = setMatchers[j++]) ) {
                                matcher( unmatched, setMatched, context, xml );
                            }

                            if ( seed ) {
                                // Reintegrate element matches to eliminate the need for sorting
                                if ( matchedCount > 0 ) {
                                    while ( i-- ) {
                                        if ( !(unmatched[i] || setMatched[i]) ) {
                                            setMatched[i] = pop.call( results );
                                        }
                                    }
                                }

                                // Discard index placeholder values to get only actual matches
                                setMatched = condense( setMatched );
                            }

                            // Add matches to results
                            push.apply( results, setMatched );

                            // Seedless set matches succeeding multiple successful matchers stipulate sorting
                            if ( outermost && !seed && setMatched.length > 0 &&
                                ( matchedCount + setMatchers.length ) > 1 ) {

                                Sizzle.uniqueSort( results );
                            }
                        }

                        // Override manipulation of globals by nested matchers
                        if ( outermost ) {
                            dirruns = dirrunsUnique;
                            outermostContext = contextBackup;
                        }

                        return unmatched;
                    };

                return bySet ?
                    markFunction( superMatcher ) :
                    superMatcher;
            }

            compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
                var i,
                    setMatchers = [],
                    elementMatchers = [],
                    cached = compilerCache[ selector + " " ];

                if ( !cached ) {
                    // Generate a function of recursive functions that can be used to check each element
                    if ( !match ) {
                        match = tokenize( selector );
                    }
                    i = match.length;
                    while ( i-- ) {
                        cached = matcherFromTokens( match[i] );
                        if ( cached[ expando ] ) {
                            setMatchers.push( cached );
                        } else {
                            elementMatchers.push( cached );
                        }
                    }

                    // Cache the compiled function
                    cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

                    // Save selector and tokenization
                    cached.selector = selector;
                }
                return cached;
            };

            /**
             * A low-level selection function that works with Sizzle's compiled
             *  selector functions
             * @param {String|Function} selector A selector or a pre-compiled
             *  selector function built with Sizzle.compile
             * @param {Element} context
             * @param {Array} [results]
             * @param {Array} [seed] A set of elements to match against
             */
            select = Sizzle.select = function( selector, context, results, seed ) {
                var i, tokens, token, type, find,
                    compiled = typeof selector === "function" && selector,
                    match = !seed && tokenize( (selector = compiled.selector || selector) );

                results = results || [];

                // Try to minimize operations if there is only one selector in the list and no seed
                // (the latter of which guarantees us context)
                if ( match.length === 1 ) {

                    // Reduce context if the leading compound selector is an ID
                    tokens = match[0] = match[0].slice( 0 );
                    if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                        context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

                        context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
                        if ( !context ) {
                            return results;

                            // Precompiled matchers will still verify ancestry, so step up a level
                        } else if ( compiled ) {
                            context = context.parentNode;
                        }

                        selector = selector.slice( tokens.shift().value.length );
                    }

                    // Fetch a seed set for right-to-left matching
                    i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
                    while ( i-- ) {
                        token = tokens[i];

                        // Abort if we hit a combinator
                        if ( Expr.relative[ (type = token.type) ] ) {
                            break;
                        }
                        if ( (find = Expr.find[ type ]) ) {
                            // Search, expanding context for leading sibling combinators
                            if ( (seed = find(
                                    token.matches[0].replace( runescape, funescape ),
                                    rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
                                )) ) {

                                // If seed is empty or no tokens remain, we can return early
                                tokens.splice( i, 1 );
                                selector = seed.length && toSelector( tokens );
                                if ( !selector ) {
                                    push.apply( results, seed );
                                    return results;
                                }

                                break;
                            }
                        }
                    }
                }

                // Compile and execute a filtering function if one is not provided
                // Provide `match` to avoid retokenization if we modified the selector above
                ( compiled || compile( selector, match ) )(
                    seed,
                    context,
                    !documentIsHTML,
                    results,
                    !context || rsibling.test( selector ) && testContext( context.parentNode ) || context
                );
                return results;
            };

// One-time assignments

// Sort stability
            support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
            support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
            setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
            support.sortDetached = assert(function( el ) {
                // Should return 1, but returns 4 (following)
                return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
            });

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
            if ( !assert(function( el ) {
                    el.innerHTML = "<a href='#'></a>";
                    return el.firstChild.getAttribute("href") === "#" ;
                }) ) {
                addHandle( "type|href|height|width", function( elem, name, isXML ) {
                    if ( !isXML ) {
                        return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
                    }
                });
            }

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
            if ( !support.attributes || !assert(function( el ) {
                    el.innerHTML = "<input/>";
                    el.firstChild.setAttribute( "value", "" );
                    return el.firstChild.getAttribute( "value" ) === "";
                }) ) {
                addHandle( "value", function( elem, name, isXML ) {
                    if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
                        return elem.defaultValue;
                    }
                });
            }

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
            if ( !assert(function( el ) {
                    return el.getAttribute("disabled") == null;
                }) ) {
                addHandle( booleans, function( elem, name, isXML ) {
                    var val;
                    if ( !isXML ) {
                        return elem[ name ] === true ? name.toLowerCase() :
                            (val = elem.getAttributeNode( name )) && val.specified ?
                                val.value :
                                null;
                    }
                });
            }

            return Sizzle;

        })( window );



    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;

// Deprecated
    jQuery.expr[ ":" ] = jQuery.expr.pseudos;
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    jQuery.escapeSelector = Sizzle.escape;




    var dir = function( elem, dir, until ) {
        var matched = [],
            truncate = until !== undefined;

        while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
            if ( elem.nodeType === 1 ) {
                if ( truncate && jQuery( elem ).is( until ) ) {
                    break;
                }
                matched.push( elem );
            }
        }
        return matched;
    };


    var siblings = function( n, elem ) {
        var matched = [];

        for ( ; n; n = n.nextSibling ) {
            if ( n.nodeType === 1 && n !== elem ) {
                matched.push( n );
            }
        }

        return matched;
    };


    var rneedsContext = jQuery.expr.match.needsContext;



    function nodeName( elem, name ) {

        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

    };
    var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
    function winnow( elements, qualifier, not ) {
        if ( isFunction( qualifier ) ) {
            return jQuery.grep( elements, function( elem, i ) {
                return !!qualifier.call( elem, i, elem ) !== not;
            } );
        }

        // Single element
        if ( qualifier.nodeType ) {
            return jQuery.grep( elements, function( elem ) {
                return ( elem === qualifier ) !== not;
            } );
        }

        // Arraylike of elements (jQuery, arguments, Array)
        if ( typeof qualifier !== "string" ) {
            return jQuery.grep( elements, function( elem ) {
                return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
            } );
        }

        // Filtered directly for both simple and complex selectors
        return jQuery.filter( qualifier, elements, not );
    }

    jQuery.filter = function( expr, elems, not ) {
        var elem = elems[ 0 ];

        if ( not ) {
            expr = ":not(" + expr + ")";
        }

        if ( elems.length === 1 && elem.nodeType === 1 ) {
            return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
        }

        return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
            return elem.nodeType === 1;
        } ) );
    };

    jQuery.fn.extend( {
        find: function( selector ) {
            var i, ret,
                len = this.length,
                self = this;

            if ( typeof selector !== "string" ) {
                return this.pushStack( jQuery( selector ).filter( function() {
                    for ( i = 0; i < len; i++ ) {
                        if ( jQuery.contains( self[ i ], this ) ) {
                            return true;
                        }
                    }
                } ) );
            }

            ret = this.pushStack( [] );

            for ( i = 0; i < len; i++ ) {
                jQuery.find( selector, self[ i ], ret );
            }

            return len > 1 ? jQuery.uniqueSort( ret ) : ret;
        },
        filter: function( selector ) {
            return this.pushStack( winnow( this, selector || [], false ) );
        },
        not: function( selector ) {
            return this.pushStack( winnow( this, selector || [], true ) );
        },
        is: function( selector ) {
            return !!winnow(
                this,

                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test( selector ) ?
                    jQuery( selector ) :
                    selector || [],
                false
            ).length;
        }
    } );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
    var rootjQuery,

        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
        // Strict HTML recognition (#11290: must start with <)
        // Shortcut simple #id case for speed
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

        init = jQuery.fn.init = function( selector, context, root ) {
            var match, elem;

            // HANDLE: $(""), $(null), $(undefined), $(false)
            if ( !selector ) {
                return this;
            }

            // Method init() accepts an alternate rootjQuery
            // so migrate can support jQuery.sub (gh-2101)
            root = root || rootjQuery;

            // Handle HTML strings
            if ( typeof selector === "string" ) {
                if ( selector[ 0 ] === "<" &&
                    selector[ selector.length - 1 ] === ">" &&
                    selector.length >= 3 ) {

                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [ null, selector, null ];

                } else {
                    match = rquickExpr.exec( selector );
                }

                // Match html or make sure no context is specified for #id
                if ( match && ( match[ 1 ] || !context ) ) {

                    // HANDLE: $(html) -> $(array)
                    if ( match[ 1 ] ) {
                        context = context instanceof jQuery ? context[ 0 ] : context;

                        // Option to run scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge( this, jQuery.parseHTML(
                            match[ 1 ],
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ) );

                        // HANDLE: $(html, props)
                        if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
                            for ( match in context ) {

                                // Properties of context are called as methods if possible
                                if ( isFunction( this[ match ] ) ) {
                                    this[ match ]( context[ match ] );

                                    // ...and otherwise set as attributes
                                } else {
                                    this.attr( match, context[ match ] );
                                }
                            }
                        }

                        return this;

                        // HANDLE: $(#id)
                    } else {
                        elem = document.getElementById( match[ 2 ] );

                        if ( elem ) {

                            // Inject the element directly into the jQuery object
                            this[ 0 ] = elem;
                            this.length = 1;
                        }
                        return this;
                    }

                    // HANDLE: $(expr, $(...))
                } else if ( !context || context.jquery ) {
                    return ( context || root ).find( selector );

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                } else {
                    return this.constructor( context ).find( selector );
                }

                // HANDLE: $(DOMElement)
            } else if ( selector.nodeType ) {
                this[ 0 ] = selector;
                this.length = 1;
                return this;

                // HANDLE: $(function)
                // Shortcut for document ready
            } else if ( isFunction( selector ) ) {
                return root.ready !== undefined ?
                    root.ready( selector ) :

                    // Execute immediately if ready is not present
                    selector( jQuery );
            }

            return jQuery.makeArray( selector, this );
        };

// Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

// Initialize central reference
    rootjQuery = jQuery( document );


    var rparentsprev = /^(?:parents|prev(?:Until|All))/,

        // Methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };

    jQuery.fn.extend( {
        has: function( target ) {
            var targets = jQuery( target, this ),
                l = targets.length;

            return this.filter( function() {
                var i = 0;
                for ( ; i < l; i++ ) {
                    if ( jQuery.contains( this, targets[ i ] ) ) {
                        return true;
                    }
                }
            } );
        },

        closest: function( selectors, context ) {
            var cur,
                i = 0,
                l = this.length,
                matched = [],
                targets = typeof selectors !== "string" && jQuery( selectors );

            // Positional selectors never match, since there's no _selection_ context
            if ( !rneedsContext.test( selectors ) ) {
                for ( ; i < l; i++ ) {
                    for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

                        // Always skip document fragments
                        if ( cur.nodeType < 11 && ( targets ?
                                targets.index( cur ) > -1 :

                                // Don't pass non-elements to Sizzle
                                cur.nodeType === 1 &&
                                jQuery.find.matchesSelector( cur, selectors ) ) ) {

                            matched.push( cur );
                            break;
                        }
                    }
                }
            }

            return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
        },

        // Determine the position of an element within the set
        index: function( elem ) {

            // No argument, return index in parent
            if ( !elem ) {
                return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
            }

            // Index in selector
            if ( typeof elem === "string" ) {
                return indexOf.call( jQuery( elem ), this[ 0 ] );
            }

            // Locate the position of the desired element
            return indexOf.call( this,

                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[ 0 ] : elem
            );
        },

        add: function( selector, context ) {
            return this.pushStack(
                jQuery.uniqueSort(
                    jQuery.merge( this.get(), jQuery( selector, context ) )
                )
            );
        },

        addBack: function( selector ) {
            return this.add( selector == null ?
                this.prevObject : this.prevObject.filter( selector )
            );
        }
    } );

    function sibling( cur, dir ) {
        while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
        return cur;
    }

    jQuery.each( {
        parent: function( elem ) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function( elem ) {
            return dir( elem, "parentNode" );
        },
        parentsUntil: function( elem, i, until ) {
            return dir( elem, "parentNode", until );
        },
        next: function( elem ) {
            return sibling( elem, "nextSibling" );
        },
        prev: function( elem ) {
            return sibling( elem, "previousSibling" );
        },
        nextAll: function( elem ) {
            return dir( elem, "nextSibling" );
        },
        prevAll: function( elem ) {
            return dir( elem, "previousSibling" );
        },
        nextUntil: function( elem, i, until ) {
            return dir( elem, "nextSibling", until );
        },
        prevUntil: function( elem, i, until ) {
            return dir( elem, "previousSibling", until );
        },
        siblings: function( elem ) {
            return siblings( ( elem.parentNode || {} ).firstChild, elem );
        },
        children: function( elem ) {
            return siblings( elem.firstChild );
        },
        contents: function( elem ) {
            if ( nodeName( elem, "iframe" ) ) {
                return elem.contentDocument;
            }

            // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
            // Treat the template element as a regular one in browsers that
            // don't support it.
            if ( nodeName( elem, "template" ) ) {
                elem = elem.content || elem;
            }

            return jQuery.merge( [], elem.childNodes );
        }
    }, function( name, fn ) {
        jQuery.fn[ name ] = function( until, selector ) {
            var matched = jQuery.map( this, fn, until );

            if ( name.slice( -5 ) !== "Until" ) {
                selector = until;
            }

            if ( selector && typeof selector === "string" ) {
                matched = jQuery.filter( selector, matched );
            }

            if ( this.length > 1 ) {

                // Remove duplicates
                if ( !guaranteedUnique[ name ] ) {
                    jQuery.uniqueSort( matched );
                }

                // Reverse order for parents* and prev-derivatives
                if ( rparentsprev.test( name ) ) {
                    matched.reverse();
                }
            }

            return this.pushStack( matched );
        };
    } );
    var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
    function createOptions( options ) {
        var object = {};
        jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
            object[ flag ] = true;
        } );
        return object;
    }

    /*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
    jQuery.Callbacks = function( options ) {

        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ?
            createOptions( options ) :
            jQuery.extend( {}, options );

        var // Flag to know if list is currently firing
            firing,

            // Last fire value for non-forgettable lists
            memory,

            // Flag to know if list was already fired
            fired,

            // Flag to prevent firing
            locked,

            // Actual callback list
            list = [],

            // Queue of execution data for repeatable lists
            queue = [],

            // Index of currently firing callback (modified by add/remove as needed)
            firingIndex = -1,

            // Fire callbacks
            fire = function() {

                // Enforce single-firing
                locked = locked || options.once;

                // Execute callbacks for all pending executions,
                // respecting firingIndex overrides and runtime changes
                fired = firing = true;
                for ( ; queue.length; firingIndex = -1 ) {
                    memory = queue.shift();
                    while ( ++firingIndex < list.length ) {

                        // Run callback and check for early termination
                        if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
                            options.stopOnFalse ) {

                            // Jump to end and forget the data so .add doesn't re-fire
                            firingIndex = list.length;
                            memory = false;
                        }
                    }
                }

                // Forget the data if we're done with it
                if ( !options.memory ) {
                    memory = false;
                }

                firing = false;

                // Clean up if we're done firing for good
                if ( locked ) {

                    // Keep an empty list if we have data for future add calls
                    if ( memory ) {
                        list = [];

                        // Otherwise, this object is spent
                    } else {
                        list = "";
                    }
                }
            },

            // Actual Callbacks object
            self = {

                // Add a callback or a collection of callbacks to the list
                add: function() {
                    if ( list ) {

                        // If we have memory from a past run, we should fire after adding
                        if ( memory && !firing ) {
                            firingIndex = list.length - 1;
                            queue.push( memory );
                        }

                        ( function add( args ) {
                            jQuery.each( args, function( _, arg ) {
                                if ( isFunction( arg ) ) {
                                    if ( !options.unique || !self.has( arg ) ) {
                                        list.push( arg );
                                    }
                                } else if ( arg && arg.length && toType( arg ) !== "string" ) {

                                    // Inspect recursively
                                    add( arg );
                                }
                            } );
                        } )( arguments );

                        if ( memory && !firing ) {
                            fire();
                        }
                    }
                    return this;
                },

                // Remove a callback from the list
                remove: function() {
                    jQuery.each( arguments, function( _, arg ) {
                        var index;
                        while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
                            list.splice( index, 1 );

                            // Handle firing indexes
                            if ( index <= firingIndex ) {
                                firingIndex--;
                            }
                        }
                    } );
                    return this;
                },

                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function( fn ) {
                    return fn ?
                        jQuery.inArray( fn, list ) > -1 :
                        list.length > 0;
                },

                // Remove all callbacks from the list
                empty: function() {
                    if ( list ) {
                        list = [];
                    }
                    return this;
                },

                // Disable .fire and .add
                // Abort any current/pending executions
                // Clear all callbacks and values
                disable: function() {
                    locked = queue = [];
                    list = memory = "";
                    return this;
                },
                disabled: function() {
                    return !list;
                },

                // Disable .fire
                // Also disable .add unless we have memory (since it would have no effect)
                // Abort any pending executions
                lock: function() {
                    locked = queue = [];
                    if ( !memory && !firing ) {
                        list = memory = "";
                    }
                    return this;
                },
                locked: function() {
                    return !!locked;
                },

                // Call all callbacks with the given context and arguments
                fireWith: function( context, args ) {
                    if ( !locked ) {
                        args = args || [];
                        args = [ context, args.slice ? args.slice() : args ];
                        queue.push( args );
                        if ( !firing ) {
                            fire();
                        }
                    }
                    return this;
                },

                // Call all the callbacks with the given arguments
                fire: function() {
                    self.fireWith( this, arguments );
                    return this;
                },

                // To know if the callbacks have already been called at least once
                fired: function() {
                    return !!fired;
                }
            };

        return self;
    };


    function Identity( v ) {
        return v;
    }
    function Thrower( ex ) {
        throw ex;
    }

    function adoptValue( value, resolve, reject, noValue ) {
        var method;

        try {

            // Check for promise aspect first to privilege synchronous behavior
            if ( value && isFunction( ( method = value.promise ) ) ) {
                method.call( value ).done( resolve ).fail( reject );

                // Other thenables
            } else if ( value && isFunction( ( method = value.then ) ) ) {
                method.call( value, resolve, reject );

                // Other non-thenables
            } else {

                // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
                // * false: [ value ].slice( 0 ) => resolve( value )
                // * true: [ value ].slice( 1 ) => resolve()
                resolve.apply( undefined, [ value ].slice( noValue ) );
            }

            // For Promises/A+, convert exceptions into rejections
            // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
            // Deferred#then to conditionally suppress rejection.
        } catch ( value ) {

            // Support: Android 4.0 only
            // Strict mode functions invoked without .call/.apply get global-object context
            reject.apply( undefined, [ value ] );
        }
    }

    jQuery.extend( {

        Deferred: function( func ) {
            var tuples = [

                    // action, add listener, callbacks,
                    // ... .then handlers, argument index, [final state]
                    [ "notify", "progress", jQuery.Callbacks( "memory" ),
                        jQuery.Callbacks( "memory" ), 2 ],
                    [ "resolve", "done", jQuery.Callbacks( "once memory" ),
                        jQuery.Callbacks( "once memory" ), 0, "resolved" ],
                    [ "reject", "fail", jQuery.Callbacks( "once memory" ),
                        jQuery.Callbacks( "once memory" ), 1, "rejected" ]
                ],
                state = "pending",
                promise = {
                    state: function() {
                        return state;
                    },
                    always: function() {
                        deferred.done( arguments ).fail( arguments );
                        return this;
                    },
                    "catch": function( fn ) {
                        return promise.then( null, fn );
                    },

                    // Keep pipe for back-compat
                    pipe: function( /* fnDone, fnFail, fnProgress */ ) {
                        var fns = arguments;

                        return jQuery.Deferred( function( newDefer ) {
                            jQuery.each( tuples, function( i, tuple ) {

                                // Map tuples (progress, done, fail) to arguments (done, fail, progress)
                                var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

                                // deferred.progress(function() { bind to newDefer or newDefer.notify })
                                // deferred.done(function() { bind to newDefer or newDefer.resolve })
                                // deferred.fail(function() { bind to newDefer or newDefer.reject })
                                deferred[ tuple[ 1 ] ]( function() {
                                    var returned = fn && fn.apply( this, arguments );
                                    if ( returned && isFunction( returned.promise ) ) {
                                        returned.promise()
                                            .progress( newDefer.notify )
                                            .done( newDefer.resolve )
                                            .fail( newDefer.reject );
                                    } else {
                                        newDefer[ tuple[ 0 ] + "With" ](
                                            this,
                                            fn ? [ returned ] : arguments
                                        );
                                    }
                                } );
                            } );
                            fns = null;
                        } ).promise();
                    },
                    then: function( onFulfilled, onRejected, onProgress ) {
                        var maxDepth = 0;
                        function resolve( depth, deferred, handler, special ) {
                            return function() {
                                var that = this,
                                    args = arguments,
                                    mightThrow = function() {
                                        var returned, then;

                                        // Support: Promises/A+ section 2.3.3.3.3
                                        // https://promisesaplus.com/#point-59
                                        // Ignore double-resolution attempts
                                        if ( depth < maxDepth ) {
                                            return;
                                        }

                                        returned = handler.apply( that, args );

                                        // Support: Promises/A+ section 2.3.1
                                        // https://promisesaplus.com/#point-48
                                        if ( returned === deferred.promise() ) {
                                            throw new TypeError( "Thenable self-resolution" );
                                        }

                                        // Support: Promises/A+ sections 2.3.3.1, 3.5
                                        // https://promisesaplus.com/#point-54
                                        // https://promisesaplus.com/#point-75
                                        // Retrieve `then` only once
                                        then = returned &&

                                            // Support: Promises/A+ section 2.3.4
                                            // https://promisesaplus.com/#point-64
                                            // Only check objects and functions for thenability
                                            ( typeof returned === "object" ||
                                                typeof returned === "function" ) &&
                                            returned.then;

                                        // Handle a returned thenable
                                        if ( isFunction( then ) ) {

                                            // Special processors (notify) just wait for resolution
                                            if ( special ) {
                                                then.call(
                                                    returned,
                                                    resolve( maxDepth, deferred, Identity, special ),
                                                    resolve( maxDepth, deferred, Thrower, special )
                                                );

                                                // Normal processors (resolve) also hook into progress
                                            } else {

                                                // ...and disregard older resolution values
                                                maxDepth++;

                                                then.call(
                                                    returned,
                                                    resolve( maxDepth, deferred, Identity, special ),
                                                    resolve( maxDepth, deferred, Thrower, special ),
                                                    resolve( maxDepth, deferred, Identity,
                                                        deferred.notifyWith )
                                                );
                                            }

                                            // Handle all other returned values
                                        } else {

                                            // Only substitute handlers pass on context
                                            // and multiple values (non-spec behavior)
                                            if ( handler !== Identity ) {
                                                that = undefined;
                                                args = [ returned ];
                                            }

                                            // Process the value(s)
                                            // Default process is resolve
                                            ( special || deferred.resolveWith )( that, args );
                                        }
                                    },

                                    // Only normal processors (resolve) catch and reject exceptions
                                    process = special ?
                                        mightThrow :
                                        function() {
                                            try {
                                                mightThrow();
                                            } catch ( e ) {

                                                if ( jQuery.Deferred.exceptionHook ) {
                                                    jQuery.Deferred.exceptionHook( e,
                                                        process.stackTrace );
                                                }

                                                // Support: Promises/A+ section 2.3.3.3.4.1
                                                // https://promisesaplus.com/#point-61
                                                // Ignore post-resolution exceptions
                                                if ( depth + 1 >= maxDepth ) {

                                                    // Only substitute handlers pass on context
                                                    // and multiple values (non-spec behavior)
                                                    if ( handler !== Thrower ) {
                                                        that = undefined;
                                                        args = [ e ];
                                                    }

                                                    deferred.rejectWith( that, args );
                                                }
                                            }
                                        };

                                // Support: Promises/A+ section 2.3.3.3.1
                                // https://promisesaplus.com/#point-57
                                // Re-resolve promises immediately to dodge false rejection from
                                // subsequent errors
                                if ( depth ) {
                                    process();
                                } else {

                                    // Call an optional hook to record the stack, in case of exception
                                    // since it's otherwise lost when execution goes async
                                    if ( jQuery.Deferred.getStackHook ) {
                                        process.stackTrace = jQuery.Deferred.getStackHook();
                                    }
                                    window.setTimeout( process );
                                }
                            };
                        }

                        return jQuery.Deferred( function( newDefer ) {

                            // progress_handlers.add( ... )
                            tuples[ 0 ][ 3 ].add(
                                resolve(
                                    0,
                                    newDefer,
                                    isFunction( onProgress ) ?
                                        onProgress :
                                        Identity,
                                    newDefer.notifyWith
                                )
                            );

                            // fulfilled_handlers.add( ... )
                            tuples[ 1 ][ 3 ].add(
                                resolve(
                                    0,
                                    newDefer,
                                    isFunction( onFulfilled ) ?
                                        onFulfilled :
                                        Identity
                                )
                            );

                            // rejected_handlers.add( ... )
                            tuples[ 2 ][ 3 ].add(
                                resolve(
                                    0,
                                    newDefer,
                                    isFunction( onRejected ) ?
                                        onRejected :
                                        Thrower
                                )
                            );
                        } ).promise();
                    },

                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function( obj ) {
                        return obj != null ? jQuery.extend( obj, promise ) : promise;
                    }
                },
                deferred = {};

            // Add list-specific methods
            jQuery.each( tuples, function( i, tuple ) {
                var list = tuple[ 2 ],
                    stateString = tuple[ 5 ];

                // promise.progress = list.add
                // promise.done = list.add
                // promise.fail = list.add
                promise[ tuple[ 1 ] ] = list.add;

                // Handle state
                if ( stateString ) {
                    list.add(
                        function() {

                            // state = "resolved" (i.e., fulfilled)
                            // state = "rejected"
                            state = stateString;
                        },

                        // rejected_callbacks.disable
                        // fulfilled_callbacks.disable
                        tuples[ 3 - i ][ 2 ].disable,

                        // rejected_handlers.disable
                        // fulfilled_handlers.disable
                        tuples[ 3 - i ][ 3 ].disable,

                        // progress_callbacks.lock
                        tuples[ 0 ][ 2 ].lock,

                        // progress_handlers.lock
                        tuples[ 0 ][ 3 ].lock
                    );
                }

                // progress_handlers.fire
                // fulfilled_handlers.fire
                // rejected_handlers.fire
                list.add( tuple[ 3 ].fire );

                // deferred.notify = function() { deferred.notifyWith(...) }
                // deferred.resolve = function() { deferred.resolveWith(...) }
                // deferred.reject = function() { deferred.rejectWith(...) }
                deferred[ tuple[ 0 ] ] = function() {
                    deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
                    return this;
                };

                // deferred.notifyWith = list.fireWith
                // deferred.resolveWith = list.fireWith
                // deferred.rejectWith = list.fireWith
                deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
            } );

            // Make the deferred a promise
            promise.promise( deferred );

            // Call given func if any
            if ( func ) {
                func.call( deferred, deferred );
            }

            // All done!
            return deferred;
        },

        // Deferred helper
        when: function( singleValue ) {
            var

                // count of uncompleted subordinates
                remaining = arguments.length,

                // count of unprocessed arguments
                i = remaining,

                // subordinate fulfillment data
                resolveContexts = Array( i ),
                resolveValues = slice.call( arguments ),

                // the master Deferred
                master = jQuery.Deferred(),

                // subordinate callback factory
                updateFunc = function( i ) {
                    return function( value ) {
                        resolveContexts[ i ] = this;
                        resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
                        if ( !( --remaining ) ) {
                            master.resolveWith( resolveContexts, resolveValues );
                        }
                    };
                };

            // Single- and empty arguments are adopted like Promise.resolve
            if ( remaining <= 1 ) {
                adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
                    !remaining );

                // Use .then() to unwrap secondary thenables (cf. gh-3000)
                if ( master.state() === "pending" ||
                    isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

                    return master.then();
                }
            }

            // Multiple arguments are aggregated like Promise.all array elements
            while ( i-- ) {
                adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
            }

            return master.promise();
        }
    } );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

    jQuery.Deferred.exceptionHook = function( error, stack ) {

        // Support: IE 8 - 9 only
        // Console exists when dev tools are open, which can happen at any time
        if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
            window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
        }
    };




    jQuery.readyException = function( error ) {
        window.setTimeout( function() {
            throw error;
        } );
    };




// The deferred used on DOM ready
    var readyList = jQuery.Deferred();

    jQuery.fn.ready = function( fn ) {

        readyList
            .then( fn )

            // Wrap jQuery.readyException in a function so that the lookup
            // happens at the time of error handling instead of callback
            // registration.
            .catch( function( error ) {
                jQuery.readyException( error );
            } );

        return this;
    };

    jQuery.extend( {

        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,

        // Handle when the DOM is ready
        ready: function( wait ) {

            // Abort if there are pending holds or we're already ready
            if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
                return;
            }

            // Remember that the DOM is ready
            jQuery.isReady = true;

            // If a normal DOM Ready event fired, decrement, and wait if need be
            if ( wait !== true && --jQuery.readyWait > 0 ) {
                return;
            }

            // If there are functions bound, to execute
            readyList.resolveWith( document, [ jQuery ] );
        }
    } );

    jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
    function completed() {
        document.removeEventListener( "DOMContentLoaded", completed );
        window.removeEventListener( "load", completed );
        jQuery.ready();
    }

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
    if ( document.readyState === "complete" ||
        ( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

        // Handle it asynchronously to allow scripts the opportunity to delay ready
        window.setTimeout( jQuery.ready );

    } else {

        // Use the handy event callback
        document.addEventListener( "DOMContentLoaded", completed );

        // A fallback to window.onload, that will always work
        window.addEventListener( "load", completed );
    }




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
    var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
        var i = 0,
            len = elems.length,
            bulk = key == null;

        // Sets many values
        if ( toType( key ) === "object" ) {
            chainable = true;
            for ( i in key ) {
                access( elems, fn, i, key[ i ], true, emptyGet, raw );
            }

            // Sets one value
        } else if ( value !== undefined ) {
            chainable = true;

            if ( !isFunction( value ) ) {
                raw = true;
            }

            if ( bulk ) {

                // Bulk operations run against the entire set
                if ( raw ) {
                    fn.call( elems, value );
                    fn = null;

                    // ...except when executing function values
                } else {
                    bulk = fn;
                    fn = function( elem, key, value ) {
                        return bulk.call( jQuery( elem ), value );
                    };
                }
            }

            if ( fn ) {
                for ( ; i < len; i++ ) {
                    fn(
                        elems[ i ], key, raw ?
                            value :
                            value.call( elems[ i ], i, fn( elems[ i ], key ) )
                    );
                }
            }
        }

        if ( chainable ) {
            return elems;
        }

        // Gets
        if ( bulk ) {
            return fn.call( elems );
        }

        return len ? fn( elems[ 0 ], key ) : emptyGet;
    };


// Matches dashed string for camelizing
    var rmsPrefix = /^-ms-/,
        rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
    function fcamelCase( all, letter ) {
        return letter.toUpperCase();
    }

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
    function camelCase( string ) {
        return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
    }
    var acceptData = function( owner ) {

        // Accepts only:
        //  - Node
        //    - Node.ELEMENT_NODE
        //    - Node.DOCUMENT_NODE
        //  - Object
        //    - Any
        return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
    };




    function Data() {
        this.expando = jQuery.expando + Data.uid++;
    }

    Data.uid = 1;

    Data.prototype = {

        cache: function( owner ) {

            // Check if the owner object already has a cache
            var value = owner[ this.expando ];

            // If not, create one
            if ( !value ) {
                value = {};

                // We can accept data for non-element nodes in modern browsers,
                // but we should not, see #8335.
                // Always return an empty object.
                if ( acceptData( owner ) ) {

                    // If it is a node unlikely to be stringify-ed or looped over
                    // use plain assignment
                    if ( owner.nodeType ) {
                        owner[ this.expando ] = value;

                        // Otherwise secure it in a non-enumerable property
                        // configurable must be true to allow the property to be
                        // deleted when data is removed
                    } else {
                        Object.defineProperty( owner, this.expando, {
                            value: value,
                            configurable: true
                        } );
                    }
                }
            }

            return value;
        },
        set: function( owner, data, value ) {
            var prop,
                cache = this.cache( owner );

            // Handle: [ owner, key, value ] args
            // Always use camelCase key (gh-2257)
            if ( typeof data === "string" ) {
                cache[ camelCase( data ) ] = value;

                // Handle: [ owner, { properties } ] args
            } else {

                // Copy the properties one-by-one to the cache object
                for ( prop in data ) {
                    cache[ camelCase( prop ) ] = data[ prop ];
                }
            }
            return cache;
        },
        get: function( owner, key ) {
            return key === undefined ?
                this.cache( owner ) :

                // Always use camelCase key (gh-2257)
                owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
        },
        access: function( owner, key, value ) {

            // In cases where either:
            //
            //   1. No key was specified
            //   2. A string key was specified, but no value provided
            //
            // Take the "read" path and allow the get method to determine
            // which value to return, respectively either:
            //
            //   1. The entire cache object
            //   2. The data stored at the key
            //
            if ( key === undefined ||
                ( ( key && typeof key === "string" ) && value === undefined ) ) {

                return this.get( owner, key );
            }

            // When the key is not a string, or both a key and value
            // are specified, set or extend (existing objects) with either:
            //
            //   1. An object of properties
            //   2. A key and value
            //
            this.set( owner, key, value );

            // Since the "set" path can have two possible entry points
            // return the expected data based on which path was taken[*]
            return value !== undefined ? value : key;
        },
        remove: function( owner, key ) {
            var i,
                cache = owner[ this.expando ];

            if ( cache === undefined ) {
                return;
            }

            if ( key !== undefined ) {

                // Support array or space separated string of keys
                if ( Array.isArray( key ) ) {

                    // If key is an array of keys...
                    // We always set camelCase keys, so remove that.
                    key = key.map( camelCase );
                } else {
                    key = camelCase( key );

                    // If a key with the spaces exists, use it.
                    // Otherwise, create an array by matching non-whitespace
                    key = key in cache ?
                        [ key ] :
                        ( key.match( rnothtmlwhite ) || [] );
                }

                i = key.length;

                while ( i-- ) {
                    delete cache[ key[ i ] ];
                }
            }

            // Remove the expando if there's no more data
            if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

                // Support: Chrome <=35 - 45
                // Webkit & Blink performance suffers when deleting properties
                // from DOM nodes, so set to undefined instead
                // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
                if ( owner.nodeType ) {
                    owner[ this.expando ] = undefined;
                } else {
                    delete owner[ this.expando ];
                }
            }
        },
        hasData: function( owner ) {
            var cache = owner[ this.expando ];
            return cache !== undefined && !jQuery.isEmptyObject( cache );
        }
    };
    var dataPriv = new Data();

    var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /[A-Z]/g;

    function getData( data ) {
        if ( data === "true" ) {
            return true;
        }

        if ( data === "false" ) {
            return false;
        }

        if ( data === "null" ) {
            return null;
        }

        // Only convert to a number if it doesn't change the string
        if ( data === +data + "" ) {
            return +data;
        }

        if ( rbrace.test( data ) ) {
            return JSON.parse( data );
        }

        return data;
    }

    function dataAttr( elem, key, data ) {
        var name;

        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if ( data === undefined && elem.nodeType === 1 ) {
            name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
            data = elem.getAttribute( name );

            if ( typeof data === "string" ) {
                try {
                    data = getData( data );
                } catch ( e ) {}

                // Make sure we set the data so it isn't changed later
                dataUser.set( elem, key, data );
            } else {
                data = undefined;
            }
        }
        return data;
    }

    jQuery.extend( {
        hasData: function( elem ) {
            return dataUser.hasData( elem ) || dataPriv.hasData( elem );
        },

        data: function( elem, name, data ) {
            return dataUser.access( elem, name, data );
        },

        removeData: function( elem, name ) {
            dataUser.remove( elem, name );
        },

        // TODO: Now that all calls to _data and _removeData have been replaced
        // with direct calls to dataPriv methods, these can be deprecated.
        _data: function( elem, name, data ) {
            return dataPriv.access( elem, name, data );
        },

        _removeData: function( elem, name ) {
            dataPriv.remove( elem, name );
        }
    } );

    jQuery.fn.extend( {
        data: function( key, value ) {
            var i, name, data,
                elem = this[ 0 ],
                attrs = elem && elem.attributes;

            // Gets all values
            if ( key === undefined ) {
                if ( this.length ) {
                    data = dataUser.get( elem );

                    if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
                        i = attrs.length;
                        while ( i-- ) {

                            // Support: IE 11 only
                            // The attrs elements can be null (#14894)
                            if ( attrs[ i ] ) {
                                name = attrs[ i ].name;
                                if ( name.indexOf( "data-" ) === 0 ) {
                                    name = camelCase( name.slice( 5 ) );
                                    dataAttr( elem, name, data[ name ] );
                                }
                            }
                        }
                        dataPriv.set( elem, "hasDataAttrs", true );
                    }
                }

                return data;
            }

            // Sets multiple values
            if ( typeof key === "object" ) {
                return this.each( function() {
                    dataUser.set( this, key );
                } );
            }

            return access( this, function( value ) {
                var data;

                // The calling jQuery object (element matches) is not empty
                // (and therefore has an element appears at this[ 0 ]) and the
                // `value` parameter was not undefined. An empty jQuery object
                // will result in `undefined` for elem = this[ 0 ] which will
                // throw an exception if an attempt to read a data cache is made.
                if ( elem && value === undefined ) {

                    // Attempt to get data from the cache
                    // The key will always be camelCased in Data
                    data = dataUser.get( elem, key );
                    if ( data !== undefined ) {
                        return data;
                    }

                    // Attempt to "discover" the data in
                    // HTML5 custom data-* attrs
                    data = dataAttr( elem, key );
                    if ( data !== undefined ) {
                        return data;
                    }

                    // We tried really hard, but the data doesn't exist.
                    return;
                }

                // Set the data...
                this.each( function() {

                    // We always store the camelCased key
                    dataUser.set( this, key, value );
                } );
            }, null, value, arguments.length > 1, null, true );
        },

        removeData: function( key ) {
            return this.each( function() {
                dataUser.remove( this, key );
            } );
        }
    } );


    jQuery.extend( {
        queue: function( elem, type, data ) {
            var queue;

            if ( elem ) {
                type = ( type || "fx" ) + "queue";
                queue = dataPriv.get( elem, type );

                // Speed up dequeue by getting out quickly if this is just a lookup
                if ( data ) {
                    if ( !queue || Array.isArray( data ) ) {
                        queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
                    } else {
                        queue.push( data );
                    }
                }
                return queue || [];
            }
        },

        dequeue: function( elem, type ) {
            type = type || "fx";

            var queue = jQuery.queue( elem, type ),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks( elem, type ),
                next = function() {
                    jQuery.dequeue( elem, type );
                };

            // If the fx queue is dequeued, always remove the progress sentinel
            if ( fn === "inprogress" ) {
                fn = queue.shift();
                startLength--;
            }

            if ( fn ) {

                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if ( type === "fx" ) {
                    queue.unshift( "inprogress" );
                }

                // Clear up the last queue stop function
                delete hooks.stop;
                fn.call( elem, next, hooks );
            }

            if ( !startLength && hooks ) {
                hooks.empty.fire();
            }
        },

        // Not public - generate a queueHooks object, or return the current one
        _queueHooks: function( elem, type ) {
            var key = type + "queueHooks";
            return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
                empty: jQuery.Callbacks( "once memory" ).add( function() {
                    dataPriv.remove( elem, [ type + "queue", key ] );
                } )
            } );
        }
    } );

    jQuery.fn.extend( {
        queue: function( type, data ) {
            var setter = 2;

            if ( typeof type !== "string" ) {
                data = type;
                type = "fx";
                setter--;
            }

            if ( arguments.length < setter ) {
                return jQuery.queue( this[ 0 ], type );
            }

            return data === undefined ?
                this :
                this.each( function() {
                    var queue = jQuery.queue( this, type, data );

                    // Ensure a hooks for this queue
                    jQuery._queueHooks( this, type );

                    if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
                        jQuery.dequeue( this, type );
                    }
                } );
        },
        dequeue: function( type ) {
            return this.each( function() {
                jQuery.dequeue( this, type );
            } );
        },
        clearQueue: function( type ) {
            return this.queue( type || "fx", [] );
        },

        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function( type, obj ) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    if ( !( --count ) ) {
                        defer.resolveWith( elements, [ elements ] );
                    }
                };

            if ( typeof type !== "string" ) {
                obj = type;
                type = undefined;
            }
            type = type || "fx";

            while ( i-- ) {
                tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
                if ( tmp && tmp.empty ) {
                    count++;
                    tmp.empty.add( resolve );
                }
            }
            resolve();
            return defer.promise( obj );
        }
    } );
    var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

    var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


    var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

    var isHiddenWithinTree = function( elem, el ) {

        // isHiddenWithinTree might be called from jQuery#filter function;
        // in that case, element will be second argument
        elem = el || elem;

        // Inline style trumps all
        return elem.style.display === "none" ||
            elem.style.display === "" &&

            // Otherwise, check computed style
            // Support: Firefox <=43 - 45
            // Disconnected elements can have computed display: none, so first confirm that elem is
            // in the document.
            jQuery.contains( elem.ownerDocument, elem ) &&

            jQuery.css( elem, "display" ) === "none";
    };

    var swap = function( elem, options, callback, args ) {
        var ret, name,
            old = {};

        // Remember the old values, and insert the new ones
        for ( name in options ) {
            old[ name ] = elem.style[ name ];
            elem.style[ name ] = options[ name ];
        }

        ret = callback.apply( elem, args || [] );

        // Revert the old values
        for ( name in options ) {
            elem.style[ name ] = old[ name ];
        }

        return ret;
    };




    function adjustCSS( elem, prop, valueParts, tween ) {
        var adjusted, scale,
            maxIterations = 20,
            currentValue = tween ?
                function() {
                    return tween.cur();
                } :
                function() {
                    return jQuery.css( elem, prop, "" );
                },
            initial = currentValue(),
            unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

            // Starting value computation is required for potential unit mismatches
            initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
                rcssNum.exec( jQuery.css( elem, prop ) );

        if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

            // Support: Firefox <=54
            // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
            initial = initial / 2;

            // Trust units reported by jQuery.css
            unit = unit || initialInUnit[ 3 ];

            // Iteratively approximate from a nonzero starting point
            initialInUnit = +initial || 1;

            while ( maxIterations-- ) {

                // Evaluate and update our best guess (doubling guesses that zero out).
                // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
                jQuery.style( elem, prop, initialInUnit + unit );
                if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
                    maxIterations = 0;
                }
                initialInUnit = initialInUnit / scale;

            }

            initialInUnit = initialInUnit * 2;
            jQuery.style( elem, prop, initialInUnit + unit );

            // Make sure we update the tween properties later on
            valueParts = valueParts || [];
        }

        if ( valueParts ) {
            initialInUnit = +initialInUnit || +initial || 0;

            // Apply relative offset (+=/-=) if specified
            adjusted = valueParts[ 1 ] ?
                initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
                +valueParts[ 2 ];
            if ( tween ) {
                tween.unit = unit;
                tween.start = initialInUnit;
                tween.end = adjusted;
            }
        }
        return adjusted;
    }


    var defaultDisplayMap = {};

    function getDefaultDisplay( elem ) {
        var temp,
            doc = elem.ownerDocument,
            nodeName = elem.nodeName,
            display = defaultDisplayMap[ nodeName ];

        if ( display ) {
            return display;
        }

        temp = doc.body.appendChild( doc.createElement( nodeName ) );
        display = jQuery.css( temp, "display" );

        temp.parentNode.removeChild( temp );

        if ( display === "none" ) {
            display = "block";
        }
        defaultDisplayMap[ nodeName ] = display;

        return display;
    }

    function showHide( elements, show ) {
        var display, elem,
            values = [],
            index = 0,
            length = elements.length;

        // Determine new display value for elements that need to change
        for ( ; index < length; index++ ) {
            elem = elements[ index ];
            if ( !elem.style ) {
                continue;
            }

            display = elem.style.display;
            if ( show ) {

                // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
                // check is required in this first loop unless we have a nonempty display value (either
                // inline or about-to-be-restored)
                if ( display === "none" ) {
                    values[ index ] = dataPriv.get( elem, "display" ) || null;
                    if ( !values[ index ] ) {
                        elem.style.display = "";
                    }
                }
                if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
                    values[ index ] = getDefaultDisplay( elem );
                }
            } else {
                if ( display !== "none" ) {
                    values[ index ] = "none";

                    // Remember what we're overwriting
                    dataPriv.set( elem, "display", display );
                }
            }
        }

        // Set the display of the elements in a second loop to avoid constant reflow
        for ( index = 0; index < length; index++ ) {
            if ( values[ index ] != null ) {
                elements[ index ].style.display = values[ index ];
            }
        }

        return elements;
    }

    jQuery.fn.extend( {
        show: function() {
            return showHide( this, true );
        },
        hide: function() {
            return showHide( this );
        },
        toggle: function( state ) {
            if ( typeof state === "boolean" ) {
                return state ? this.show() : this.hide();
            }

            return this.each( function() {
                if ( isHiddenWithinTree( this ) ) {
                    jQuery( this ).show();
                } else {
                    jQuery( this ).hide();
                }
            } );
        }
    } );
    var rcheckableType = ( /^(?:checkbox|radio)$/i );

    var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

    var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
    var wrapMap = {

        // Support: IE <=9 only
        option: [ 1, "<select multiple='multiple'>", "</select>" ],

        // XHTML parsers do not magically insert elements in the
        // same way that tag soup parsers do. So we cannot shorten
        // this by omitting <tbody> or other required elements.
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

        _default: [ 0, "", "" ]
    };

// Support: IE <=9 only
    wrapMap.optgroup = wrapMap.option;

    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;


    function getAll( context, tag ) {

        // Support: IE <=9 - 11 only
        // Use typeof to avoid zero-argument method invocation on host objects (#15151)
        var ret;

        if ( typeof context.getElementsByTagName !== "undefined" ) {
            ret = context.getElementsByTagName( tag || "*" );

        } else if ( typeof context.querySelectorAll !== "undefined" ) {
            ret = context.querySelectorAll( tag || "*" );

        } else {
            ret = [];
        }

        if ( tag === undefined || tag && nodeName( context, tag ) ) {
            return jQuery.merge( [ context ], ret );
        }

        return ret;
    }


// Mark scripts as having already been evaluated
    function setGlobalEval( elems, refElements ) {
        var i = 0,
            l = elems.length;

        for ( ; i < l; i++ ) {
            dataPriv.set(
                elems[ i ],
                "globalEval",
                !refElements || dataPriv.get( refElements[ i ], "globalEval" )
            );
        }
    }


    var rhtml = /<|&#?\w+;/;

    function buildFragment( elems, context, scripts, selection, ignored ) {
        var elem, tmp, tag, wrap, contains, j,
            fragment = context.createDocumentFragment(),
            nodes = [],
            i = 0,
            l = elems.length;

        for ( ; i < l; i++ ) {
            elem = elems[ i ];

            if ( elem || elem === 0 ) {

                // Add nodes directly
                if ( toType( elem ) === "object" ) {

                    // Support: Android <=4.0 only, PhantomJS 1 only
                    // push.apply(_, arraylike) throws on ancient WebKit
                    jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

                    // Convert non-html into a text node
                } else if ( !rhtml.test( elem ) ) {
                    nodes.push( context.createTextNode( elem ) );

                    // Convert html into DOM nodes
                } else {
                    tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

                    // Deserialize a standard representation
                    tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
                    wrap = wrapMap[ tag ] || wrapMap._default;
                    tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

                    // Descend through wrappers to the right content
                    j = wrap[ 0 ];
                    while ( j-- ) {
                        tmp = tmp.lastChild;
                    }

                    // Support: Android <=4.0 only, PhantomJS 1 only
                    // push.apply(_, arraylike) throws on ancient WebKit
                    jQuery.merge( nodes, tmp.childNodes );

                    // Remember the top-level container
                    tmp = fragment.firstChild;

                    // Ensure the created nodes are orphaned (#12392)
                    tmp.textContent = "";
                }
            }
        }

        // Remove wrapper from fragment
        fragment.textContent = "";

        i = 0;
        while ( ( elem = nodes[ i++ ] ) ) {

            // Skip elements already in the context collection (trac-4087)
            if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
                if ( ignored ) {
                    ignored.push( elem );
                }
                continue;
            }

            contains = jQuery.contains( elem.ownerDocument, elem );

            // Append to fragment
            tmp = getAll( fragment.appendChild( elem ), "script" );

            // Preserve script evaluation history
            if ( contains ) {
                setGlobalEval( tmp );
            }

            // Capture executables
            if ( scripts ) {
                j = 0;
                while ( ( elem = tmp[ j++ ] ) ) {
                    if ( rscriptType.test( elem.type || "" ) ) {
                        scripts.push( elem );
                    }
                }
            }
        }

        return fragment;
    }


    ( function() {
        var fragment = document.createDocumentFragment(),
            div = fragment.appendChild( document.createElement( "div" ) ),
            input = document.createElement( "input" );

        // Support: Android 4.0 - 4.3 only
        // Check state lost if the name is set (#11217)
        // Support: Windows Web Apps (WWA)
        // `name` and `type` must use .setAttribute for WWA (#14901)
        input.setAttribute( "type", "radio" );
        input.setAttribute( "checked", "checked" );
        input.setAttribute( "name", "t" );

        div.appendChild( input );

        // Support: Android <=4.1 only
        // Older WebKit doesn't clone checked state correctly in fragments
        support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

        // Support: IE <=11 only
        // Make sure textarea (and checkbox) defaultValue is properly cloned
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
    } )();
    var documentElement = document.documentElement;



    var
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

// Support: IE <=9 only
// See #13393 for more info
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch ( err ) { }
    }

    function on( elem, types, selector, data, fn, one ) {
        var origFn, type;

        // Types can be a map of types/handlers
        if ( typeof types === "object" ) {

            // ( types-Object, selector, data )
            if ( typeof selector !== "string" ) {

                // ( types-Object, data )
                data = data || selector;
                selector = undefined;
            }
            for ( type in types ) {
                on( elem, type, selector, data, types[ type ], one );
            }
            return elem;
        }

        if ( data == null && fn == null ) {

            // ( types, fn )
            fn = selector;
            data = selector = undefined;
        } else if ( fn == null ) {
            if ( typeof selector === "string" ) {

                // ( types, selector, fn )
                fn = data;
                data = undefined;
            } else {

                // ( types, data, fn )
                fn = data;
                data = selector;
                selector = undefined;
            }
        }
        if ( fn === false ) {
            fn = returnFalse;
        } else if ( !fn ) {
            return elem;
        }

        if ( one === 1 ) {
            origFn = fn;
            fn = function( event ) {

                // Can use an empty set, since event contains the info
                jQuery().off( event );
                return origFn.apply( this, arguments );
            };

            // Use same guid so caller can remove using origFn
            fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
        }
        return elem.each( function() {
            jQuery.event.add( this, types, fn, data, selector );
        } );
    }

    /*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
    jQuery.event = {

        global: {},

        add: function( elem, types, handler, data, selector ) {

            var handleObjIn, eventHandle, tmp,
                events, t, handleObj,
                special, handlers, type, namespaces, origType,
                elemData = dataPriv.get( elem );

            // Don't attach events to noData or text/comment nodes (but allow plain objects)
            if ( !elemData ) {
                return;
            }

            // Caller can pass in an object of custom data in lieu of the handler
            if ( handler.handler ) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }

            // Ensure that invalid selectors throw exceptions at attach time
            // Evaluate against documentElement in case elem is a non-element node (e.g., document)
            if ( selector ) {
                jQuery.find.matchesSelector( documentElement, selector );
            }

            // Make sure that the handler has a unique ID, used to find/remove it later
            if ( !handler.guid ) {
                handler.guid = jQuery.guid++;
            }

            // Init the element's event structure and main handler, if this is the first
            if ( !( events = elemData.events ) ) {
                events = elemData.events = {};
            }
            if ( !( eventHandle = elemData.handle ) ) {
                eventHandle = elemData.handle = function( e ) {

                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
                        jQuery.event.dispatch.apply( elem, arguments ) : undefined;
                };
            }

            // Handle multiple events separated by a space
            types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
            t = types.length;
            while ( t-- ) {
                tmp = rtypenamespace.exec( types[ t ] ) || [];
                type = origType = tmp[ 1 ];
                namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

                // There *must* be a type, no attaching namespace-only handlers
                if ( !type ) {
                    continue;
                }

                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[ type ] || {};

                // If selector defined, determine special event api type, otherwise given type
                type = ( selector ? special.delegateType : special.bindType ) || type;

                // Update special based on newly reset type
                special = jQuery.event.special[ type ] || {};

                // handleObj is passed to all event handlers
                handleObj = jQuery.extend( {
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
                    namespace: namespaces.join( "." )
                }, handleObjIn );

                // Init the event handler queue if we're the first
                if ( !( handlers = events[ type ] ) ) {
                    handlers = events[ type ] = [];
                    handlers.delegateCount = 0;

                    // Only use addEventListener if the special events handler returns false
                    if ( !special.setup ||
                        special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

                        if ( elem.addEventListener ) {
                            elem.addEventListener( type, eventHandle );
                        }
                    }
                }

                if ( special.add ) {
                    special.add.call( elem, handleObj );

                    if ( !handleObj.handler.guid ) {
                        handleObj.handler.guid = handler.guid;
                    }
                }

                // Add to the element's handler list, delegates in front
                if ( selector ) {
                    handlers.splice( handlers.delegateCount++, 0, handleObj );
                } else {
                    handlers.push( handleObj );
                }

                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[ type ] = true;
            }

        },

        // Detach an event or set of events from an element
        remove: function( elem, types, handler, selector, mappedTypes ) {

            var j, origCount, tmp,
                events, t, handleObj,
                special, handlers, type, namespaces, origType,
                elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

            if ( !elemData || !( events = elemData.events ) ) {
                return;
            }

            // Once for each type.namespace in types; type may be omitted
            types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
            t = types.length;
            while ( t-- ) {
                tmp = rtypenamespace.exec( types[ t ] ) || [];
                type = origType = tmp[ 1 ];
                namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

                // Unbind all events (on this namespace, if provided) for the element
                if ( !type ) {
                    for ( type in events ) {
                        jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
                    }
                    continue;
                }

                special = jQuery.event.special[ type ] || {};
                type = ( selector ? special.delegateType : special.bindType ) || type;
                handlers = events[ type ] || [];
                tmp = tmp[ 2 ] &&
                    new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

                // Remove matching events
                origCount = j = handlers.length;
                while ( j-- ) {
                    handleObj = handlers[ j ];

                    if ( ( mappedTypes || origType === handleObj.origType ) &&
                        ( !handler || handler.guid === handleObj.guid ) &&
                        ( !tmp || tmp.test( handleObj.namespace ) ) &&
                        ( !selector || selector === handleObj.selector ||
                            selector === "**" && handleObj.selector ) ) {
                        handlers.splice( j, 1 );

                        if ( handleObj.selector ) {
                            handlers.delegateCount--;
                        }
                        if ( special.remove ) {
                            special.remove.call( elem, handleObj );
                        }
                    }
                }

                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if ( origCount && !handlers.length ) {
                    if ( !special.teardown ||
                        special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

                        jQuery.removeEvent( elem, type, elemData.handle );
                    }

                    delete events[ type ];
                }
            }

            // Remove data and the expando if it's no longer used
            if ( jQuery.isEmptyObject( events ) ) {
                dataPriv.remove( elem, "handle events" );
            }
        },

        dispatch: function( nativeEvent ) {

            // Make a writable jQuery.Event from the native event object
            var event = jQuery.event.fix( nativeEvent );

            var i, j, ret, matched, handleObj, handlerQueue,
                args = new Array( arguments.length ),
                handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
                special = jQuery.event.special[ event.type ] || {};

            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[ 0 ] = event;

            for ( i = 1; i < arguments.length; i++ ) {
                args[ i ] = arguments[ i ];
            }

            event.delegateTarget = this;

            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
                return;
            }

            // Determine handlers
            handlerQueue = jQuery.event.handlers.call( this, event, handlers );

            // Run delegates first; they may want to stop propagation beneath us
            i = 0;
            while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
                event.currentTarget = matched.elem;

                j = 0;
                while ( ( handleObj = matched.handlers[ j++ ] ) &&
                !event.isImmediatePropagationStopped() ) {

                    // Triggered event must either 1) have no namespace, or 2) have namespace(s)
                    // a subset or equal to those in the bound event (both can have no namespace).
                    if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

                        event.handleObj = handleObj;
                        event.data = handleObj.data;

                        ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
                            handleObj.handler ).apply( matched.elem, args );

                        if ( ret !== undefined ) {
                            if ( ( event.result = ret ) === false ) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }

            // Call the postDispatch hook for the mapped type
            if ( special.postDispatch ) {
                special.postDispatch.call( this, event );
            }

            return event.result;
        },

        handlers: function( event, handlers ) {
            var i, handleObj, sel, matchedHandlers, matchedSelectors,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;

            // Find delegate handlers
            if ( delegateCount &&

                // Support: IE <=9
                // Black-hole SVG <use> instance trees (trac-13180)
                cur.nodeType &&

                // Support: Firefox <=42
                // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
                // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
                // Support: IE 11 only
                // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
                !( event.type === "click" && event.button >= 1 ) ) {

                for ( ; cur !== this; cur = cur.parentNode || this ) {

                    // Don't check non-elements (#13208)
                    // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                    if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
                        matchedHandlers = [];
                        matchedSelectors = {};
                        for ( i = 0; i < delegateCount; i++ ) {
                            handleObj = handlers[ i ];

                            // Don't conflict with Object.prototype properties (#13203)
                            sel = handleObj.selector + " ";

                            if ( matchedSelectors[ sel ] === undefined ) {
                                matchedSelectors[ sel ] = handleObj.needsContext ?
                                    jQuery( sel, this ).index( cur ) > -1 :
                                    jQuery.find( sel, this, null, [ cur ] ).length;
                            }
                            if ( matchedSelectors[ sel ] ) {
                                matchedHandlers.push( handleObj );
                            }
                        }
                        if ( matchedHandlers.length ) {
                            handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
                        }
                    }
                }
            }

            // Add the remaining (directly-bound) handlers
            cur = this;
            if ( delegateCount < handlers.length ) {
                handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
            }

            return handlerQueue;
        },

        addProp: function( name, hook ) {
            Object.defineProperty( jQuery.Event.prototype, name, {
                enumerable: true,
                configurable: true,

                get: isFunction( hook ) ?
                    function() {
                        if ( this.originalEvent ) {
                            return hook( this.originalEvent );
                        }
                    } :
                    function() {
                        if ( this.originalEvent ) {
                            return this.originalEvent[ name ];
                        }
                    },

                set: function( value ) {
                    Object.defineProperty( this, name, {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: value
                    } );
                }
            } );
        },

        fix: function( originalEvent ) {
            return originalEvent[ jQuery.expando ] ?
                originalEvent :
                new jQuery.Event( originalEvent );
        },

        special: {
            load: {

                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
            },
            focus: {

                // Fire native event if possible so blur/focus sequence is correct
                trigger: function() {
                    if ( this !== safeActiveElement() && this.focus ) {
                        this.focus();
                        return false;
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if ( this === safeActiveElement() && this.blur ) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {

                // For checkbox, fire native event so checked state will be right
                trigger: function() {
                    if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
                        this.click();
                        return false;
                    }
                },

                // For cross-browser consistency, don't fire native .click() on links
                _default: function( event ) {
                    return nodeName( event.target, "a" );
                }
            },

            beforeunload: {
                postDispatch: function( event ) {

                    // Support: Firefox 20+
                    // Firefox doesn't alert if the returnValue field is not set.
                    if ( event.result !== undefined && event.originalEvent ) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        }
    };

    jQuery.removeEvent = function( elem, type, handle ) {

        // This "if" is needed for plain objects
        if ( elem.removeEventListener ) {
            elem.removeEventListener( type, handle );
        }
    };

    jQuery.Event = function( src, props ) {

        // Allow instantiation without the 'new' keyword
        if ( !( this instanceof jQuery.Event ) ) {
            return new jQuery.Event( src, props );
        }

        // Event object
        if ( src && src.type ) {
            this.originalEvent = src;
            this.type = src.type;

            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src.defaultPrevented ||
            src.defaultPrevented === undefined &&

            // Support: Android <=2.3 only
            src.returnValue === false ?
                returnTrue :
                returnFalse;

            // Create target properties
            // Support: Safari <=6 - 7 only
            // Target should not be a text node (#504, #13143)
            this.target = ( src.target && src.target.nodeType === 3 ) ?
                src.target.parentNode :
                src.target;

            this.currentTarget = src.currentTarget;
            this.relatedTarget = src.relatedTarget;

            // Event type
        } else {
            this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if ( props ) {
            jQuery.extend( this, props );
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || Date.now();

        // Mark it as fixed
        this[ jQuery.expando ] = true;
    };

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: false,

        preventDefault: function() {
            var e = this.originalEvent;

            this.isDefaultPrevented = returnTrue;

            if ( e && !this.isSimulated ) {
                e.preventDefault();
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;

            this.isPropagationStopped = returnTrue;

            if ( e && !this.isSimulated ) {
                e.stopPropagation();
            }
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;

            this.isImmediatePropagationStopped = returnTrue;

            if ( e && !this.isSimulated ) {
                e.stopImmediatePropagation();
            }

            this.stopPropagation();
        }
    };

// Includes all common event props including KeyEvent and MouseEvent specific props
    jQuery.each( {
        altKey: true,
        bubbles: true,
        cancelable: true,
        changedTouches: true,
        ctrlKey: true,
        detail: true,
        eventPhase: true,
        metaKey: true,
        pageX: true,
        pageY: true,
        shiftKey: true,
        view: true,
        "char": true,
        charCode: true,
        key: true,
        keyCode: true,
        button: true,
        buttons: true,
        clientX: true,
        clientY: true,
        offsetX: true,
        offsetY: true,
        pointerId: true,
        pointerType: true,
        screenX: true,
        screenY: true,
        targetTouches: true,
        toElement: true,
        touches: true,

        which: function( event ) {
            var button = event.button;

            // Add which for key events
            if ( event.which == null && rkeyEvent.test( event.type ) ) {
                return event.charCode != null ? event.charCode : event.keyCode;
            }

            // Add which for click: 1 === left; 2 === middle; 3 === right
            if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
                if ( button & 1 ) {
                    return 1;
                }

                if ( button & 2 ) {
                    return 3;
                }

                if ( button & 4 ) {
                    return 2;
                }

                return 0;
            }

            return event.which;
        }
    }, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
    jQuery.each( {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function( orig, fix ) {
        jQuery.event.special[ orig ] = {
            delegateType: fix,
            bindType: fix,

            handle: function( event ) {
                var ret,
                    target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;

                // For mouseenter/leave call the handler if related is outside the target.
                // NB: No relatedTarget if the mouse left/entered the browser window
                if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply( this, arguments );
                    event.type = fix;
                }
                return ret;
            }
        };
    } );

    jQuery.fn.extend( {

        on: function( types, selector, data, fn ) {
            return on( this, types, selector, data, fn );
        },
        one: function( types, selector, data, fn ) {
            return on( this, types, selector, data, fn, 1 );
        },
        off: function( types, selector, fn ) {
            var handleObj, type;
            if ( types && types.preventDefault && types.handleObj ) {

                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery( types.delegateTarget ).off(
                    handleObj.namespace ?
                        handleObj.origType + "." + handleObj.namespace :
                        handleObj.origType,
                    handleObj.selector,
                    handleObj.handler
                );
                return this;
            }
            if ( typeof types === "object" ) {

                // ( types-object [, selector] )
                for ( type in types ) {
                    this.off( type, selector, types[ type ] );
                }
                return this;
            }
            if ( selector === false || typeof selector === "function" ) {

                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            if ( fn === false ) {
                fn = returnFalse;
            }
            return this.each( function() {
                jQuery.event.remove( this, types, fn, selector );
            } );
        }
    } );


    var

        /* eslint-disable max-len */

        // See https://github.com/eslint/eslint/issues/3229
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

        /* eslint-enable */

        // Support: IE <=10 - 11, Edge 12 - 13 only
        // In IE/Edge using regex groups here causes severe slowdowns.
        // See https://connect.microsoft.com/IE/feedback/details/1736512/
        rnoInnerhtml = /<script|<style|<link/i,

        // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
    function manipulationTarget( elem, content ) {
        if ( nodeName( elem, "table" ) &&
            nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

            return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
        }

        return elem;
    }

// Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript( elem ) {
        elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
        return elem;
    }
    function restoreScript( elem ) {
        if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
            elem.type = elem.type.slice( 5 );
        } else {
            elem.removeAttribute( "type" );
        }

        return elem;
    }

    function cloneCopyEvent( src, dest ) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

        if ( dest.nodeType !== 1 ) {
            return;
        }

        // 1. Copy private data: events, handlers, etc.
        if ( dataPriv.hasData( src ) ) {
            pdataOld = dataPriv.access( src );
            pdataCur = dataPriv.set( dest, pdataOld );
            events = pdataOld.events;

            if ( events ) {
                delete pdataCur.handle;
                pdataCur.events = {};

                for ( type in events ) {
                    for ( i = 0, l = events[ type ].length; i < l; i++ ) {
                        jQuery.event.add( dest, type, events[ type ][ i ] );
                    }
                }
            }
        }

        // 2. Copy user data
        if ( dataUser.hasData( src ) ) {
            udataOld = dataUser.access( src );
            udataCur = jQuery.extend( {}, udataOld );

            dataUser.set( dest, udataCur );
        }
    }

// Fix IE bugs, see support tests
    function fixInput( src, dest ) {
        var nodeName = dest.nodeName.toLowerCase();

        // Fails to persist the checked state of a cloned checkbox or radio button.
        if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
            dest.checked = src.checked;

            // Fails to return the selected option to the default selected state when cloning options
        } else if ( nodeName === "input" || nodeName === "textarea" ) {
            dest.defaultValue = src.defaultValue;
        }
    }

    function domManip( collection, args, callback, ignored ) {

        // Flatten any nested arrays
        args = concat.apply( [], args );

        var fragment, first, scripts, hasScripts, node, doc,
            i = 0,
            l = collection.length,
            iNoClone = l - 1,
            value = args[ 0 ],
            valueIsFunction = isFunction( value );

        // We can't cloneNode fragments that contain checked, in WebKit
        if ( valueIsFunction ||
            ( l > 1 && typeof value === "string" &&
                !support.checkClone && rchecked.test( value ) ) ) {
            return collection.each( function( index ) {
                var self = collection.eq( index );
                if ( valueIsFunction ) {
                    args[ 0 ] = value.call( this, index, self.html() );
                }
                domManip( self, args, callback, ignored );
            } );
        }

        if ( l ) {
            fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
            first = fragment.firstChild;

            if ( fragment.childNodes.length === 1 ) {
                fragment = first;
            }

            // Require either new content or an interest in ignored elements to invoke the callback
            if ( first || ignored ) {
                scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
                hasScripts = scripts.length;

                // Use the original fragment for the last item
                // instead of the first because it can end up
                // being emptied incorrectly in certain situations (#8070).
                for ( ; i < l; i++ ) {
                    node = fragment;

                    if ( i !== iNoClone ) {
                        node = jQuery.clone( node, true, true );

                        // Keep references to cloned scripts for later restoration
                        if ( hasScripts ) {

                            // Support: Android <=4.0 only, PhantomJS 1 only
                            // push.apply(_, arraylike) throws on ancient WebKit
                            jQuery.merge( scripts, getAll( node, "script" ) );
                        }
                    }

                    callback.call( collection[ i ], node, i );
                }

                if ( hasScripts ) {
                    doc = scripts[ scripts.length - 1 ].ownerDocument;

                    // Reenable scripts
                    jQuery.map( scripts, restoreScript );

                    // Evaluate executable scripts on first document insertion
                    for ( i = 0; i < hasScripts; i++ ) {
                        node = scripts[ i ];
                        if ( rscriptType.test( node.type || "" ) &&
                            !dataPriv.access( node, "globalEval" ) &&
                            jQuery.contains( doc, node ) ) {

                            if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

                                // Optional AJAX dependency, but won't run scripts if not present
                                if ( jQuery._evalUrl ) {
                                    jQuery._evalUrl( node.src );
                                }
                            } else {
                                DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
                            }
                        }
                    }
                }
            }
        }

        return collection;
    }

    function remove( elem, selector, keepData ) {
        var node,
            nodes = selector ? jQuery.filter( selector, elem ) : elem,
            i = 0;

        for ( ; ( node = nodes[ i ] ) != null; i++ ) {
            if ( !keepData && node.nodeType === 1 ) {
                jQuery.cleanData( getAll( node ) );
            }

            if ( node.parentNode ) {
                if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
                    setGlobalEval( getAll( node, "script" ) );
                }
                node.parentNode.removeChild( node );
            }
        }

        return elem;
    }

    jQuery.extend( {
        htmlPrefilter: function( html ) {
            return html.replace( rxhtmlTag, "<$1></$2>" );
        },

        clone: function( elem, dataAndEvents, deepDataAndEvents ) {
            var i, l, srcElements, destElements,
                clone = elem.cloneNode( true ),
                inPage = jQuery.contains( elem.ownerDocument, elem );

            // Fix IE cloning issues
            if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
                !jQuery.isXMLDoc( elem ) ) {

                // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
                destElements = getAll( clone );
                srcElements = getAll( elem );

                for ( i = 0, l = srcElements.length; i < l; i++ ) {
                    fixInput( srcElements[ i ], destElements[ i ] );
                }
            }

            // Copy the events from the original to the clone
            if ( dataAndEvents ) {
                if ( deepDataAndEvents ) {
                    srcElements = srcElements || getAll( elem );
                    destElements = destElements || getAll( clone );

                    for ( i = 0, l = srcElements.length; i < l; i++ ) {
                        cloneCopyEvent( srcElements[ i ], destElements[ i ] );
                    }
                } else {
                    cloneCopyEvent( elem, clone );
                }
            }

            // Preserve script evaluation history
            destElements = getAll( clone, "script" );
            if ( destElements.length > 0 ) {
                setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
            }

            // Return the cloned set
            return clone;
        },

        cleanData: function( elems ) {
            var data, elem, type,
                special = jQuery.event.special,
                i = 0;

            for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
                if ( acceptData( elem ) ) {
                    if ( ( data = elem[ dataPriv.expando ] ) ) {
                        if ( data.events ) {
                            for ( type in data.events ) {
                                if ( special[ type ] ) {
                                    jQuery.event.remove( elem, type );

                                    // This is a shortcut to avoid jQuery.event.remove's overhead
                                } else {
                                    jQuery.removeEvent( elem, type, data.handle );
                                }
                            }
                        }

                        // Support: Chrome <=35 - 45+
                        // Assign undefined instead of using delete, see Data#remove
                        elem[ dataPriv.expando ] = undefined;
                    }
                    if ( elem[ dataUser.expando ] ) {

                        // Support: Chrome <=35 - 45+
                        // Assign undefined instead of using delete, see Data#remove
                        elem[ dataUser.expando ] = undefined;
                    }
                }
            }
        }
    } );

    jQuery.fn.extend( {
        detach: function( selector ) {
            return remove( this, selector, true );
        },

        remove: function( selector ) {
            return remove( this, selector );
        },

        text: function( value ) {
            return access( this, function( value ) {
                return value === undefined ?
                    jQuery.text( this ) :
                    this.empty().each( function() {
                        if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                            this.textContent = value;
                        }
                    } );
            }, null, value, arguments.length );
        },

        append: function() {
            return domManip( this, arguments, function( elem ) {
                if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                    var target = manipulationTarget( this, elem );
                    target.appendChild( elem );
                }
            } );
        },

        prepend: function() {
            return domManip( this, arguments, function( elem ) {
                if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                    var target = manipulationTarget( this, elem );
                    target.insertBefore( elem, target.firstChild );
                }
            } );
        },

        before: function() {
            return domManip( this, arguments, function( elem ) {
                if ( this.parentNode ) {
                    this.parentNode.insertBefore( elem, this );
                }
            } );
        },

        after: function() {
            return domManip( this, arguments, function( elem ) {
                if ( this.parentNode ) {
                    this.parentNode.insertBefore( elem, this.nextSibling );
                }
            } );
        },

        empty: function() {
            var elem,
                i = 0;

            for ( ; ( elem = this[ i ] ) != null; i++ ) {
                if ( elem.nodeType === 1 ) {

                    // Prevent memory leaks
                    jQuery.cleanData( getAll( elem, false ) );

                    // Remove any remaining nodes
                    elem.textContent = "";
                }
            }

            return this;
        },

        clone: function( dataAndEvents, deepDataAndEvents ) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

            return this.map( function() {
                return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
            } );
        },

        html: function( value ) {
            return access( this, function( value ) {
                var elem = this[ 0 ] || {},
                    i = 0,
                    l = this.length;

                if ( value === undefined && elem.nodeType === 1 ) {
                    return elem.innerHTML;
                }

                // See if we can take a shortcut and just use innerHTML
                if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
                    !wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

                    value = jQuery.htmlPrefilter( value );

                    try {
                        for ( ; i < l; i++ ) {
                            elem = this[ i ] || {};

                            // Remove element nodes and prevent memory leaks
                            if ( elem.nodeType === 1 ) {
                                jQuery.cleanData( getAll( elem, false ) );
                                elem.innerHTML = value;
                            }
                        }

                        elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                    } catch ( e ) {}
                }

                if ( elem ) {
                    this.empty().append( value );
                }
            }, null, value, arguments.length );
        },

        replaceWith: function() {
            var ignored = [];

            // Make the changes, replacing each non-ignored context element with the new content
            return domManip( this, arguments, function( elem ) {
                var parent = this.parentNode;

                if ( jQuery.inArray( this, ignored ) < 0 ) {
                    jQuery.cleanData( getAll( this ) );
                    if ( parent ) {
                        parent.replaceChild( elem, this );
                    }
                }

                // Force callback invocation
            }, ignored );
        }
    } );

    jQuery.each( {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function( name, original ) {
        jQuery.fn[ name ] = function( selector ) {
            var elems,
                ret = [],
                insert = jQuery( selector ),
                last = insert.length - 1,
                i = 0;

            for ( ; i <= last; i++ ) {
                elems = i === last ? this : this.clone( true );
                jQuery( insert[ i ] )[ original ]( elems );

                // Support: Android <=4.0 only, PhantomJS 1 only
                // .get() because push.apply(_, arraylike) throws on ancient WebKit
                push.apply( ret, elems.get() );
            }

            return this.pushStack( ret );
        };
    } );
    var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

    var getStyles = function( elem ) {

        // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        var view = elem.ownerDocument.defaultView;

        if ( !view || !view.opener ) {
            view = window;
        }

        return view.getComputedStyle( elem );
    };

    var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



    ( function() {

        // Executing both pixelPosition & boxSizingReliable tests require only one layout
        // so they're executed at the same time to save the second computation.
        function computeStyleTests() {

            // This is a singleton, we need to execute it only once
            if ( !div ) {
                return;
            }

            container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
                "margin-top:1px;padding:0;border:0";
            div.style.cssText =
                "position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
                "margin:auto;border:1px;padding:1px;" +
                "width:60%;top:1%";
            documentElement.appendChild( container ).appendChild( div );

            var divStyle = window.getComputedStyle( div );
            pixelPositionVal = divStyle.top !== "1%";

            // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
            reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

            // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
            // Some styles come back with percentage values, even though they shouldn't
            div.style.right = "60%";
            pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

            // Support: IE 9 - 11 only
            // Detect misreporting of content dimensions for box-sizing:border-box elements
            boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

            // Support: IE 9 only
            // Detect overflow:scroll screwiness (gh-3699)
            div.style.position = "absolute";
            scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

            documentElement.removeChild( container );

            // Nullify the div so it wouldn't be stored in the memory and
            // it will also be a sign that checks already performed
            div = null;
        }

        function roundPixelMeasures( measure ) {
            return Math.round( parseFloat( measure ) );
        }

        var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
            reliableMarginLeftVal,
            container = document.createElement( "div" ),
            div = document.createElement( "div" );

        // Finish early in limited (non-browser) environments
        if ( !div.style ) {
            return;
        }

        // Support: IE <=9 - 11 only
        // Style of cloned element affects source element cloned (#8908)
        div.style.backgroundClip = "content-box";
        div.cloneNode( true ).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";

        jQuery.extend( support, {
            boxSizingReliable: function() {
                computeStyleTests();
                return boxSizingReliableVal;
            },
            pixelBoxStyles: function() {
                computeStyleTests();
                return pixelBoxStylesVal;
            },
            pixelPosition: function() {
                computeStyleTests();
                return pixelPositionVal;
            },
            reliableMarginLeft: function() {
                computeStyleTests();
                return reliableMarginLeftVal;
            },
            scrollboxSize: function() {
                computeStyleTests();
                return scrollboxSizeVal;
            }
        } );
    } )();


    function curCSS( elem, name, computed ) {
        var width, minWidth, maxWidth, ret,

            // Support: Firefox 51+
            // Retrieving style before computed somehow
            // fixes an issue with getting wrong values
            // on detached elements
            style = elem.style;

        computed = computed || getStyles( elem );

        // getPropertyValue is needed for:
        //   .css('filter') (IE 9 only, #12537)
        //   .css('--customProperty) (#3144)
        if ( computed ) {
            ret = computed.getPropertyValue( name ) || computed[ name ];

            if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
                ret = jQuery.style( elem, name );
            }

            // A tribute to the "awesome hack by Dean Edwards"
            // Android Browser returns percentage for some values,
            // but width seems to be reliably pixels.
            // This is against the CSSOM draft spec:
            // https://drafts.csswg.org/cssom/#resolved-values
            if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

                // Remember the original values
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;

                // Put in the new values to get a computed value out
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;

                // Revert the changed values
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }

        return ret !== undefined ?

            // Support: IE <=9 - 11 only
            // IE returns zIndex value as an integer.
            ret + "" :
            ret;
    }


    function addGetHookIf( conditionFn, hookFn ) {

        // Define the hook, we'll check on the first run if it's really needed.
        return {
            get: function() {
                if ( conditionFn() ) {

                    // Hook not needed (or it's not possible to use it due
                    // to missing dependency), remove it.
                    delete this.get;
                    return;
                }

                // Hook needed; redefine it so that the support test is not executed again.
                return ( this.get = hookFn ).apply( this, arguments );
            }
        };
    }


    var

        // Swappable if display is none or starts with table
        // except "table", "table-cell", or "table-caption"
        // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rcustomProp = /^--/,
        cssShow = { position: "absolute", visibility: "hidden", display: "block" },
        cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        },

        cssPrefixes = [ "Webkit", "Moz", "ms" ],
        emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
    function vendorPropName( name ) {

        // Shortcut for names that are not vendor prefixed
        if ( name in emptyStyle ) {
            return name;
        }

        // Check for vendor prefixed names
        var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
            i = cssPrefixes.length;

        while ( i-- ) {
            name = cssPrefixes[ i ] + capName;
            if ( name in emptyStyle ) {
                return name;
            }
        }
    }

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
    function finalPropName( name ) {
        var ret = jQuery.cssProps[ name ];
        if ( !ret ) {
            ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
        }
        return ret;
    }

    function setPositiveNumber( elem, value, subtract ) {

        // Any relative (+/-) values have already been
        // normalized at this point
        var matches = rcssNum.exec( value );
        return matches ?

            // Guard against undefined "subtract", e.g., when used as in cssHooks
            Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
            value;
    }

    function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
        var i = dimension === "width" ? 1 : 0,
            extra = 0,
            delta = 0;

        // Adjustment may not be necessary
        if ( box === ( isBorderBox ? "border" : "content" ) ) {
            return 0;
        }

        for ( ; i < 4; i += 2 ) {

            // Both box models exclude margin
            if ( box === "margin" ) {
                delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
            }

            // If we get here with a content-box, we're seeking "padding" or "border" or "margin"
            if ( !isBorderBox ) {

                // Add padding
                delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

                // For "border" or "margin", add border
                if ( box !== "padding" ) {
                    delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

                    // But still keep track of it otherwise
                } else {
                    extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
                }

                // If we get here with a border-box (content + padding + border), we're seeking "content" or
                // "padding" or "margin"
            } else {

                // For "content", subtract padding
                if ( box === "content" ) {
                    delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
                }

                // For "content" or "padding", subtract border
                if ( box !== "margin" ) {
                    delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
                }
            }
        }

        // Account for positive content-box scroll gutter when requested by providing computedVal
        if ( !isBorderBox && computedVal >= 0 ) {

            // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
            // Assuming integer scroll gutter, subtract the rest and round down
            delta += Math.max( 0, Math.ceil(
                elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
                computedVal -
                delta -
                extra -
                0.5
            ) );
        }

        return delta;
    }

    function getWidthOrHeight( elem, dimension, extra ) {

        // Start with computed style
        var styles = getStyles( elem ),
            val = curCSS( elem, dimension, styles ),
            isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
            valueIsBorderBox = isBorderBox;

        // Support: Firefox <=54
        // Return a confounding non-pixel value or feign ignorance, as appropriate.
        if ( rnumnonpx.test( val ) ) {
            if ( !extra ) {
                return val;
            }
            val = "auto";
        }

        // Check for style in case a browser which returns unreliable values
        // for getComputedStyle silently falls back to the reliable elem.style
        valueIsBorderBox = valueIsBorderBox &&
            ( support.boxSizingReliable() || val === elem.style[ dimension ] );

        // Fall back to offsetWidth/offsetHeight when value is "auto"
        // This happens for inline elements with no explicit setting (gh-3571)
        // Support: Android <=4.1 - 4.3 only
        // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
        if ( val === "auto" ||
            !parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

            val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

            // offsetWidth/offsetHeight provide border-box values
            valueIsBorderBox = true;
        }

        // Normalize "" and auto
        val = parseFloat( val ) || 0;

        // Adjust for the element's box model
        return ( val +
            boxModelAdjustment(
                elem,
                dimension,
                extra || ( isBorderBox ? "border" : "content" ),
                valueIsBorderBox,
                styles,

                // Provide the current computed size to request scroll gutter calculation (gh-3589)
                val
            )
        ) + "px";
    }

    jQuery.extend( {

        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function( elem, computed ) {
                    if ( computed ) {

                        // We should always get a number back from opacity
                        var ret = curCSS( elem, "opacity" );
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },

        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
            "animationIterationCount": true,
            "columnCount": true,
            "fillOpacity": true,
            "flexGrow": true,
            "flexShrink": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },

        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {},

        // Get and set the style property on a DOM Node
        style: function( elem, name, value, extra ) {

            // Don't set styles on text and comment nodes
            if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
                return;
            }

            // Make sure that we're working with the right name
            var ret, type, hooks,
                origName = camelCase( name ),
                isCustomProp = rcustomProp.test( name ),
                style = elem.style;

            // Make sure that we're working with the right name. We don't
            // want to query the value if it is a CSS custom property
            // since they are user-defined.
            if ( !isCustomProp ) {
                name = finalPropName( origName );
            }

            // Gets hook for the prefixed version, then unprefixed version
            hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

            // Check if we're setting a value
            if ( value !== undefined ) {
                type = typeof value;

                // Convert "+=" or "-=" to relative numbers (#7345)
                if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
                    value = adjustCSS( elem, name, ret );

                    // Fixes bug #9237
                    type = "number";
                }

                // Make sure that null and NaN values aren't set (#7116)
                if ( value == null || value !== value ) {
                    return;
                }

                // If a number was passed in, add the unit (except for certain CSS properties)
                if ( type === "number" ) {
                    value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
                }

                // background-* props affect original clone's values
                if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
                    style[ name ] = "inherit";
                }

                // If a hook was provided, use that value, otherwise just set the specified value
                if ( !hooks || !( "set" in hooks ) ||
                    ( value = hooks.set( elem, value, extra ) ) !== undefined ) {

                    if ( isCustomProp ) {
                        style.setProperty( name, value );
                    } else {
                        style[ name ] = value;
                    }
                }

            } else {

                // If a hook was provided get the non-computed value from there
                if ( hooks && "get" in hooks &&
                    ( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

                    return ret;
                }

                // Otherwise just get the value from the style object
                return style[ name ];
            }
        },

        css: function( elem, name, extra, styles ) {
            var val, num, hooks,
                origName = camelCase( name ),
                isCustomProp = rcustomProp.test( name );

            // Make sure that we're working with the right name. We don't
            // want to modify the value if it is a CSS custom property
            // since they are user-defined.
            if ( !isCustomProp ) {
                name = finalPropName( origName );
            }

            // Try prefixed name followed by the unprefixed name
            hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

            // If a hook was provided get the computed value from there
            if ( hooks && "get" in hooks ) {
                val = hooks.get( elem, true, extra );
            }

            // Otherwise, if a way to get the computed value exists, use that
            if ( val === undefined ) {
                val = curCSS( elem, name, styles );
            }

            // Convert "normal" to computed value
            if ( val === "normal" && name in cssNormalTransform ) {
                val = cssNormalTransform[ name ];
            }

            // Make numeric if forced or a qualifier was provided and val looks numeric
            if ( extra === "" || extra ) {
                num = parseFloat( val );
                return extra === true || isFinite( num ) ? num || 0 : val;
            }

            return val;
        }
    } );

    jQuery.each( [ "height", "width" ], function( i, dimension ) {
        jQuery.cssHooks[ dimension ] = {
            get: function( elem, computed, extra ) {
                if ( computed ) {

                    // Certain elements can have dimension info if we invisibly show them
                    // but it must have a current display style that would benefit
                    return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

                    // Support: Safari 8+
                    // Table columns in Safari have non-zero offsetWidth & zero
                    // getBoundingClientRect().width unless display is changed.
                    // Support: IE <=11 only
                    // Running getBoundingClientRect on a disconnected node
                    // in IE throws an error.
                    ( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
                        swap( elem, cssShow, function() {
                            return getWidthOrHeight( elem, dimension, extra );
                        } ) :
                        getWidthOrHeight( elem, dimension, extra );
                }
            },

            set: function( elem, value, extra ) {
                var matches,
                    styles = getStyles( elem ),
                    isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
                    subtract = extra && boxModelAdjustment(
                        elem,
                        dimension,
                        extra,
                        isBorderBox,
                        styles
                    );

                // Account for unreliable border-box dimensions by comparing offset* to computed and
                // faking a content-box to get border and padding (gh-3699)
                if ( isBorderBox && support.scrollboxSize() === styles.position ) {
                    subtract -= Math.ceil(
                        elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
                        parseFloat( styles[ dimension ] ) -
                        boxModelAdjustment( elem, dimension, "border", false, styles ) -
                        0.5
                    );
                }

                // Convert to pixels if value adjustment is needed
                if ( subtract && ( matches = rcssNum.exec( value ) ) &&
                    ( matches[ 3 ] || "px" ) !== "px" ) {

                    elem.style[ dimension ] = value;
                    value = jQuery.css( elem, dimension );
                }

                return setPositiveNumber( elem, value, subtract );
            }
        };
    } );

    jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
        function( elem, computed ) {
            if ( computed ) {
                return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
                    elem.getBoundingClientRect().left -
                    swap( elem, { marginLeft: 0 }, function() {
                        return elem.getBoundingClientRect().left;
                    } )
                ) + "px";
            }
        }
    );

// These hooks are used by animate to expand properties
    jQuery.each( {
        margin: "",
        padding: "",
        border: "Width"
    }, function( prefix, suffix ) {
        jQuery.cssHooks[ prefix + suffix ] = {
            expand: function( value ) {
                var i = 0,
                    expanded = {},

                    // Assumes a single number if not a string
                    parts = typeof value === "string" ? value.split( " " ) : [ value ];

                for ( ; i < 4; i++ ) {
                    expanded[ prefix + cssExpand[ i ] + suffix ] =
                        parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
                }

                return expanded;
            }
        };

        if ( prefix !== "margin" ) {
            jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
        }
    } );

    jQuery.fn.extend( {
        css: function( name, value ) {
            return access( this, function( elem, name, value ) {
                var styles, len,
                    map = {},
                    i = 0;

                if ( Array.isArray( name ) ) {
                    styles = getStyles( elem );
                    len = name.length;

                    for ( ; i < len; i++ ) {
                        map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
                    }

                    return map;
                }

                return value !== undefined ?
                    jQuery.style( elem, name, value ) :
                    jQuery.css( elem, name );
            }, name, value, arguments.length > 1 );
        }
    } );


    function Tween( elem, options, prop, end, easing ) {
        return new Tween.prototype.init( elem, options, prop, end, easing );
    }
    jQuery.Tween = Tween;

    Tween.prototype = {
        constructor: Tween,
        init: function( elem, options, prop, end, easing, unit ) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || jQuery.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
        },
        cur: function() {
            var hooks = Tween.propHooks[ this.prop ];

            return hooks && hooks.get ?
                hooks.get( this ) :
                Tween.propHooks._default.get( this );
        },
        run: function( percent ) {
            var eased,
                hooks = Tween.propHooks[ this.prop ];

            if ( this.options.duration ) {
                this.pos = eased = jQuery.easing[ this.easing ](
                    percent, this.options.duration * percent, 0, 1, this.options.duration
                );
            } else {
                this.pos = eased = percent;
            }
            this.now = ( this.end - this.start ) * eased + this.start;

            if ( this.options.step ) {
                this.options.step.call( this.elem, this.now, this );
            }

            if ( hooks && hooks.set ) {
                hooks.set( this );
            } else {
                Tween.propHooks._default.set( this );
            }
            return this;
        }
    };

    Tween.prototype.init.prototype = Tween.prototype;

    Tween.propHooks = {
        _default: {
            get: function( tween ) {
                var result;

                // Use a property on the element directly when it is not a DOM element,
                // or when there is no matching style property that exists.
                if ( tween.elem.nodeType !== 1 ||
                    tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
                    return tween.elem[ tween.prop ];
                }

                // Passing an empty string as a 3rd parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails.
                // Simple values such as "10px" are parsed to Float;
                // complex values such as "rotate(1rad)" are returned as-is.
                result = jQuery.css( tween.elem, tween.prop, "" );

                // Empty strings, null, undefined and "auto" are converted to 0.
                return !result || result === "auto" ? 0 : result;
            },
            set: function( tween ) {

                // Use step hook for back compat.
                // Use cssHook if its there.
                // Use .style if available and use plain properties where available.
                if ( jQuery.fx.step[ tween.prop ] ) {
                    jQuery.fx.step[ tween.prop ]( tween );
                } else if ( tween.elem.nodeType === 1 &&
                    ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
                        jQuery.cssHooks[ tween.prop ] ) ) {
                    jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
                } else {
                    tween.elem[ tween.prop ] = tween.now;
                }
            }
        }
    };

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function( tween ) {
            if ( tween.elem.nodeType && tween.elem.parentNode ) {
                tween.elem[ tween.prop ] = tween.now;
            }
        }
    };

    jQuery.easing = {
        linear: function( p ) {
            return p;
        },
        swing: function( p ) {
            return 0.5 - Math.cos( p * Math.PI ) / 2;
        },
        _default: "swing"
    };

    jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
    jQuery.fx.step = {};




    var
        fxNow, inProgress,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rrun = /queueHooks$/;

    function schedule() {
        if ( inProgress ) {
            if ( document.hidden === false && window.requestAnimationFrame ) {
                window.requestAnimationFrame( schedule );
            } else {
                window.setTimeout( schedule, jQuery.fx.interval );
            }

            jQuery.fx.tick();
        }
    }

// Animations created synchronously will run synchronously
    function createFxNow() {
        window.setTimeout( function() {
            fxNow = undefined;
        } );
        return ( fxNow = Date.now() );
    }

// Generate parameters to create a standard animation
    function genFx( type, includeWidth ) {
        var which,
            i = 0,
            attrs = { height: type };

        // If we include width, step value is 1 to do all cssExpand values,
        // otherwise step value is 2 to skip over Left and Right
        includeWidth = includeWidth ? 1 : 0;
        for ( ; i < 4; i += 2 - includeWidth ) {
            which = cssExpand[ i ];
            attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
        }

        if ( includeWidth ) {
            attrs.opacity = attrs.width = type;
        }

        return attrs;
    }

    function createTween( value, prop, animation ) {
        var tween,
            collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
            index = 0,
            length = collection.length;
        for ( ; index < length; index++ ) {
            if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

                // We're done with this property
                return tween;
            }
        }
    }

    function defaultPrefilter( elem, props, opts ) {
        var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
            isBox = "width" in props || "height" in props,
            anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHiddenWithinTree( elem ),
            dataShow = dataPriv.get( elem, "fxshow" );

        // Queue-skipping animations hijack the fx hooks
        if ( !opts.queue ) {
            hooks = jQuery._queueHooks( elem, "fx" );
            if ( hooks.unqueued == null ) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if ( !hooks.unqueued ) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;

            anim.always( function() {

                // Ensure the complete handler is called before this completes
                anim.always( function() {
                    hooks.unqueued--;
                    if ( !jQuery.queue( elem, "fx" ).length ) {
                        hooks.empty.fire();
                    }
                } );
            } );
        }

        // Detect show/hide animations
        for ( prop in props ) {
            value = props[ prop ];
            if ( rfxtypes.test( value ) ) {
                delete props[ prop ];
                toggle = toggle || value === "toggle";
                if ( value === ( hidden ? "hide" : "show" ) ) {

                    // Pretend to be hidden if this is a "show" and
                    // there is still data from a stopped show/hide
                    if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
                        hidden = true;

                        // Ignore all other no-op show/hide data
                    } else {
                        continue;
                    }
                }
                orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
            }
        }

        // Bail out if this is a no-op like .hide().hide()
        propTween = !jQuery.isEmptyObject( props );
        if ( !propTween && jQuery.isEmptyObject( orig ) ) {
            return;
        }

        // Restrict "overflow" and "display" styles during box animations
        if ( isBox && elem.nodeType === 1 ) {

            // Support: IE <=9 - 11, Edge 12 - 15
            // Record all 3 overflow attributes because IE does not infer the shorthand
            // from identically-valued overflowX and overflowY and Edge just mirrors
            // the overflowX value there.
            opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

            // Identify a display type, preferring old show/hide data over the CSS cascade
            restoreDisplay = dataShow && dataShow.display;
            if ( restoreDisplay == null ) {
                restoreDisplay = dataPriv.get( elem, "display" );
            }
            display = jQuery.css( elem, "display" );
            if ( display === "none" ) {
                if ( restoreDisplay ) {
                    display = restoreDisplay;
                } else {

                    // Get nonempty value(s) by temporarily forcing visibility
                    showHide( [ elem ], true );
                    restoreDisplay = elem.style.display || restoreDisplay;
                    display = jQuery.css( elem, "display" );
                    showHide( [ elem ] );
                }
            }

            // Animate inline elements as inline-block
            if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
                if ( jQuery.css( elem, "float" ) === "none" ) {

                    // Restore the original display value at the end of pure show/hide animations
                    if ( !propTween ) {
                        anim.done( function() {
                            style.display = restoreDisplay;
                        } );
                        if ( restoreDisplay == null ) {
                            display = style.display;
                            restoreDisplay = display === "none" ? "" : display;
                        }
                    }
                    style.display = "inline-block";
                }
            }
        }

        if ( opts.overflow ) {
            style.overflow = "hidden";
            anim.always( function() {
                style.overflow = opts.overflow[ 0 ];
                style.overflowX = opts.overflow[ 1 ];
                style.overflowY = opts.overflow[ 2 ];
            } );
        }

        // Implement show/hide animations
        propTween = false;
        for ( prop in orig ) {

            // General show/hide setup for this element animation
            if ( !propTween ) {
                if ( dataShow ) {
                    if ( "hidden" in dataShow ) {
                        hidden = dataShow.hidden;
                    }
                } else {
                    dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
                }

                // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
                if ( toggle ) {
                    dataShow.hidden = !hidden;
                }

                // Show elements before animating them
                if ( hidden ) {
                    showHide( [ elem ], true );
                }

                /* eslint-disable no-loop-func */

                anim.done( function() {

                    /* eslint-enable no-loop-func */

                    // The final step of a "hide" animation is actually hiding the element
                    if ( !hidden ) {
                        showHide( [ elem ] );
                    }
                    dataPriv.remove( elem, "fxshow" );
                    for ( prop in orig ) {
                        jQuery.style( elem, prop, orig[ prop ] );
                    }
                } );
            }

            // Per-property setup
            propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
            if ( !( prop in dataShow ) ) {
                dataShow[ prop ] = propTween.start;
                if ( hidden ) {
                    propTween.end = propTween.start;
                    propTween.start = 0;
                }
            }
        }
    }

    function propFilter( props, specialEasing ) {
        var index, name, easing, value, hooks;

        // camelCase, specialEasing and expand cssHook pass
        for ( index in props ) {
            name = camelCase( index );
            easing = specialEasing[ name ];
            value = props[ index ];
            if ( Array.isArray( value ) ) {
                easing = value[ 1 ];
                value = props[ index ] = value[ 0 ];
            }

            if ( index !== name ) {
                props[ name ] = value;
                delete props[ index ];
            }

            hooks = jQuery.cssHooks[ name ];
            if ( hooks && "expand" in hooks ) {
                value = hooks.expand( value );
                delete props[ name ];

                // Not quite $.extend, this won't overwrite existing keys.
                // Reusing 'index' because we have the correct "name"
                for ( index in value ) {
                    if ( !( index in props ) ) {
                        props[ index ] = value[ index ];
                        specialEasing[ index ] = easing;
                    }
                }
            } else {
                specialEasing[ name ] = easing;
            }
        }
    }

    function Animation( elem, properties, options ) {
        var result,
            stopped,
            index = 0,
            length = Animation.prefilters.length,
            deferred = jQuery.Deferred().always( function() {

                // Don't match elem in the :animated selector
                delete tick.elem;
            } ),
            tick = function() {
                if ( stopped ) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

                    // Support: Android 2.3 only
                    // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;

                for ( ; index < length; index++ ) {
                    animation.tweens[ index ].run( percent );
                }

                deferred.notifyWith( elem, [ animation, percent, remaining ] );

                // If there's more to do, yield
                if ( percent < 1 && length ) {
                    return remaining;
                }

                // If this was an empty animation, synthesize a final progress notification
                if ( !length ) {
                    deferred.notifyWith( elem, [ animation, 1, 0 ] );
                }

                // Resolve the animation and report its conclusion
                deferred.resolveWith( elem, [ animation ] );
                return false;
            },
            animation = deferred.promise( {
                elem: elem,
                props: jQuery.extend( {}, properties ),
                opts: jQuery.extend( true, {
                    specialEasing: {},
                    easing: jQuery.easing._default
                }, options ),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function( prop, end ) {
                    var tween = jQuery.Tween( elem, animation.opts, prop, end,
                        animation.opts.specialEasing[ prop ] || animation.opts.easing );
                    animation.tweens.push( tween );
                    return tween;
                },
                stop: function( gotoEnd ) {
                    var index = 0,

                        // If we are going to the end, we want to run all the tweens
                        // otherwise we skip this part
                        length = gotoEnd ? animation.tweens.length : 0;
                    if ( stopped ) {
                        return this;
                    }
                    stopped = true;
                    for ( ; index < length; index++ ) {
                        animation.tweens[ index ].run( 1 );
                    }

                    // Resolve when we played the last frame; otherwise, reject
                    if ( gotoEnd ) {
                        deferred.notifyWith( elem, [ animation, 1, 0 ] );
                        deferred.resolveWith( elem, [ animation, gotoEnd ] );
                    } else {
                        deferred.rejectWith( elem, [ animation, gotoEnd ] );
                    }
                    return this;
                }
            } ),
            props = animation.props;

        propFilter( props, animation.opts.specialEasing );

        for ( ; index < length; index++ ) {
            result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
            if ( result ) {
                if ( isFunction( result.stop ) ) {
                    jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
                        result.stop.bind( result );
                }
                return result;
            }
        }

        jQuery.map( props, createTween, animation );

        if ( isFunction( animation.opts.start ) ) {
            animation.opts.start.call( elem, animation );
        }

        // Attach callbacks from options
        animation
            .progress( animation.opts.progress )
            .done( animation.opts.done, animation.opts.complete )
            .fail( animation.opts.fail )
            .always( animation.opts.always );

        jQuery.fx.timer(
            jQuery.extend( tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            } )
        );

        return animation;
    }

    jQuery.Animation = jQuery.extend( Animation, {

        tweeners: {
            "*": [ function( prop, value ) {
                var tween = this.createTween( prop, value );
                adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
                return tween;
            } ]
        },

        tweener: function( props, callback ) {
            if ( isFunction( props ) ) {
                callback = props;
                props = [ "*" ];
            } else {
                props = props.match( rnothtmlwhite );
            }

            var prop,
                index = 0,
                length = props.length;

            for ( ; index < length; index++ ) {
                prop = props[ index ];
                Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
                Animation.tweeners[ prop ].unshift( callback );
            }
        },

        prefilters: [ defaultPrefilter ],

        prefilter: function( callback, prepend ) {
            if ( prepend ) {
                Animation.prefilters.unshift( callback );
            } else {
                Animation.prefilters.push( callback );
            }
        }
    } );

    jQuery.speed = function( speed, easing, fn ) {
        var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
            complete: fn || !fn && easing ||
            isFunction( speed ) && speed,
            duration: speed,
            easing: fn && easing || easing && !isFunction( easing ) && easing
        };

        // Go to the end state if fx are off
        if ( jQuery.fx.off ) {
            opt.duration = 0;

        } else {
            if ( typeof opt.duration !== "number" ) {
                if ( opt.duration in jQuery.fx.speeds ) {
                    opt.duration = jQuery.fx.speeds[ opt.duration ];

                } else {
                    opt.duration = jQuery.fx.speeds._default;
                }
            }
        }

        // Normalize opt.queue - true/undefined/null -> "fx"
        if ( opt.queue == null || opt.queue === true ) {
            opt.queue = "fx";
        }

        // Queueing
        opt.old = opt.complete;

        opt.complete = function() {
            if ( isFunction( opt.old ) ) {
                opt.old.call( this );
            }

            if ( opt.queue ) {
                jQuery.dequeue( this, opt.queue );
            }
        };

        return opt;
    };

    jQuery.fn.extend( {
        fadeTo: function( speed, to, easing, callback ) {

            // Show any hidden elements after setting opacity to 0
            return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

            // Animate to the value specified
                .end().animate( { opacity: to }, speed, easing, callback );
        },
        animate: function( prop, speed, easing, callback ) {
            var empty = jQuery.isEmptyObject( prop ),
                optall = jQuery.speed( speed, easing, callback ),
                doAnimation = function() {

                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation( this, jQuery.extend( {}, prop ), optall );

                    // Empty animations, or finishing resolves immediately
                    if ( empty || dataPriv.get( this, "finish" ) ) {
                        anim.stop( true );
                    }
                };
            doAnimation.finish = doAnimation;

            return empty || optall.queue === false ?
                this.each( doAnimation ) :
                this.queue( optall.queue, doAnimation );
        },
        stop: function( type, clearQueue, gotoEnd ) {
            var stopQueue = function( hooks ) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop( gotoEnd );
            };

            if ( typeof type !== "string" ) {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if ( clearQueue && type !== false ) {
                this.queue( type || "fx", [] );
            }

            return this.each( function() {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = dataPriv.get( this );

                if ( index ) {
                    if ( data[ index ] && data[ index ].stop ) {
                        stopQueue( data[ index ] );
                    }
                } else {
                    for ( index in data ) {
                        if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
                            stopQueue( data[ index ] );
                        }
                    }
                }

                for ( index = timers.length; index--; ) {
                    if ( timers[ index ].elem === this &&
                        ( type == null || timers[ index ].queue === type ) ) {

                        timers[ index ].anim.stop( gotoEnd );
                        dequeue = false;
                        timers.splice( index, 1 );
                    }
                }

                // Start the next in the queue if the last step wasn't forced.
                // Timers currently will call their complete callbacks, which
                // will dequeue but only if they were gotoEnd.
                if ( dequeue || !gotoEnd ) {
                    jQuery.dequeue( this, type );
                }
            } );
        },
        finish: function( type ) {
            if ( type !== false ) {
                type = type || "fx";
            }
            return this.each( function() {
                var index,
                    data = dataPriv.get( this ),
                    queue = data[ type + "queue" ],
                    hooks = data[ type + "queueHooks" ],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;

                // Enable finishing flag on private data
                data.finish = true;

                // Empty the queue first
                jQuery.queue( this, type, [] );

                if ( hooks && hooks.stop ) {
                    hooks.stop.call( this, true );
                }

                // Look for any active animations, and finish them
                for ( index = timers.length; index--; ) {
                    if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
                        timers[ index ].anim.stop( true );
                        timers.splice( index, 1 );
                    }
                }

                // Look for any animations in the old queue and finish them
                for ( index = 0; index < length; index++ ) {
                    if ( queue[ index ] && queue[ index ].finish ) {
                        queue[ index ].finish.call( this );
                    }
                }

                // Turn off finishing flag
                delete data.finish;
            } );
        }
    } );

    jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
        var cssFn = jQuery.fn[ name ];
        jQuery.fn[ name ] = function( speed, easing, callback ) {
            return speed == null || typeof speed === "boolean" ?
                cssFn.apply( this, arguments ) :
                this.animate( genFx( name, true ), speed, easing, callback );
        };
    } );

// Generate shortcuts for custom animations
    jQuery.each( {
        slideDown: genFx( "show" ),
        slideUp: genFx( "hide" ),
        slideToggle: genFx( "toggle" ),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
    }, function( name, props ) {
        jQuery.fn[ name ] = function( speed, easing, callback ) {
            return this.animate( props, speed, easing, callback );
        };
    } );

    jQuery.timers = [];
    jQuery.fx.tick = function() {
        var timer,
            i = 0,
            timers = jQuery.timers;

        fxNow = Date.now();

        for ( ; i < timers.length; i++ ) {
            timer = timers[ i ];

            // Run the timer and safely remove it when done (allowing for external removal)
            if ( !timer() && timers[ i ] === timer ) {
                timers.splice( i--, 1 );
            }
        }

        if ( !timers.length ) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };

    jQuery.fx.timer = function( timer ) {
        jQuery.timers.push( timer );
        jQuery.fx.start();
    };

    jQuery.fx.interval = 13;
    jQuery.fx.start = function() {
        if ( inProgress ) {
            return;
        }

        inProgress = true;
        schedule();
    };

    jQuery.fx.stop = function() {
        inProgress = null;
    };

    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,

        // Default speed
        _default: 400
    };


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function( time, type ) {
        time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
        type = type || "fx";

        return this.queue( type, function( next, hooks ) {
            var timeout = window.setTimeout( next, time );
            hooks.stop = function() {
                window.clearTimeout( timeout );
            };
        } );
    };


    ( function() {
        var input = document.createElement( "input" ),
            select = document.createElement( "select" ),
            opt = select.appendChild( document.createElement( "option" ) );

        input.type = "checkbox";

        // Support: Android <=4.3 only
        // Default value for a checkbox should be "on"
        support.checkOn = input.value !== "";

        // Support: IE <=11 only
        // Must access selectedIndex to make default options select
        support.optSelected = opt.selected;

        // Support: IE <=11 only
        // An input loses its value after becoming a radio
        input = document.createElement( "input" );
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
    } )();


    var boolHook,
        attrHandle = jQuery.expr.attrHandle;

    jQuery.fn.extend( {
        attr: function( name, value ) {
            return access( this, jQuery.attr, name, value, arguments.length > 1 );
        },

        removeAttr: function( name ) {
            return this.each( function() {
                jQuery.removeAttr( this, name );
            } );
        }
    } );

    jQuery.extend( {
        attr: function( elem, name, value ) {
            var ret, hooks,
                nType = elem.nodeType;

            // Don't get/set attributes on text, comment and attribute nodes
            if ( nType === 3 || nType === 8 || nType === 2 ) {
                return;
            }

            // Fallback to prop when attributes are not supported
            if ( typeof elem.getAttribute === "undefined" ) {
                return jQuery.prop( elem, name, value );
            }

            // Attribute hooks are determined by the lowercase version
            // Grab necessary hook if one is defined
            if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
                hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
                    ( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
            }

            if ( value !== undefined ) {
                if ( value === null ) {
                    jQuery.removeAttr( elem, name );
                    return;
                }

                if ( hooks && "set" in hooks &&
                    ( ret = hooks.set( elem, value, name ) ) !== undefined ) {
                    return ret;
                }

                elem.setAttribute( name, value + "" );
                return value;
            }

            if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
                return ret;
            }

            ret = jQuery.find.attr( elem, name );

            // Non-existent attributes return null, we normalize to undefined
            return ret == null ? undefined : ret;
        },

        attrHooks: {
            type: {
                set: function( elem, value ) {
                    if ( !support.radioValue && value === "radio" &&
                        nodeName( elem, "input" ) ) {
                        var val = elem.value;
                        elem.setAttribute( "type", value );
                        if ( val ) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        },

        removeAttr: function( elem, value ) {
            var name,
                i = 0,

                // Attribute names can contain non-HTML whitespace characters
                // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
                attrNames = value && value.match( rnothtmlwhite );

            if ( attrNames && elem.nodeType === 1 ) {
                while ( ( name = attrNames[ i++ ] ) ) {
                    elem.removeAttribute( name );
                }
            }
        }
    } );

// Hooks for boolean attributes
    boolHook = {
        set: function( elem, value, name ) {
            if ( value === false ) {

                // Remove boolean attributes when set to false
                jQuery.removeAttr( elem, name );
            } else {
                elem.setAttribute( name, name );
            }
            return name;
        }
    };

    jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
        var getter = attrHandle[ name ] || jQuery.find.attr;

        attrHandle[ name ] = function( elem, name, isXML ) {
            var ret, handle,
                lowercaseName = name.toLowerCase();

            if ( !isXML ) {

                // Avoid an infinite loop by temporarily removing this function from the getter
                handle = attrHandle[ lowercaseName ];
                attrHandle[ lowercaseName ] = ret;
                ret = getter( elem, name, isXML ) != null ?
                    lowercaseName :
                    null;
                attrHandle[ lowercaseName ] = handle;
            }
            return ret;
        };
    } );




    var rfocusable = /^(?:input|select|textarea|button)$/i,
        rclickable = /^(?:a|area)$/i;

    jQuery.fn.extend( {
        prop: function( name, value ) {
            return access( this, jQuery.prop, name, value, arguments.length > 1 );
        },

        removeProp: function( name ) {
            return this.each( function() {
                delete this[ jQuery.propFix[ name ] || name ];
            } );
        }
    } );

    jQuery.extend( {
        prop: function( elem, name, value ) {
            var ret, hooks,
                nType = elem.nodeType;

            // Don't get/set properties on text, comment and attribute nodes
            if ( nType === 3 || nType === 8 || nType === 2 ) {
                return;
            }

            if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

                // Fix name and attach hooks
                name = jQuery.propFix[ name ] || name;
                hooks = jQuery.propHooks[ name ];
            }

            if ( value !== undefined ) {
                if ( hooks && "set" in hooks &&
                    ( ret = hooks.set( elem, value, name ) ) !== undefined ) {
                    return ret;
                }

                return ( elem[ name ] = value );
            }

            if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
                return ret;
            }

            return elem[ name ];
        },

        propHooks: {
            tabIndex: {
                get: function( elem ) {

                    // Support: IE <=9 - 11 only
                    // elem.tabIndex doesn't always return the
                    // correct value when it hasn't been explicitly set
                    // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    // Use proper attribute retrieval(#12072)
                    var tabindex = jQuery.find.attr( elem, "tabindex" );

                    if ( tabindex ) {
                        return parseInt( tabindex, 10 );
                    }

                    if (
                        rfocusable.test( elem.nodeName ) ||
                        rclickable.test( elem.nodeName ) &&
                        elem.href
                    ) {
                        return 0;
                    }

                    return -1;
                }
            }
        },

        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    } );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
    if ( !support.optSelected ) {
        jQuery.propHooks.selected = {
            get: function( elem ) {

                /* eslint no-unused-expressions: "off" */

                var parent = elem.parentNode;
                if ( parent && parent.parentNode ) {
                    parent.parentNode.selectedIndex;
                }
                return null;
            },
            set: function( elem ) {

                /* eslint no-unused-expressions: "off" */

                var parent = elem.parentNode;
                if ( parent ) {
                    parent.selectedIndex;

                    if ( parent.parentNode ) {
                        parent.parentNode.selectedIndex;
                    }
                }
            }
        };
    }

    jQuery.each( [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
    ], function() {
        jQuery.propFix[ this.toLowerCase() ] = this;
    } );




    // Strip and collapse whitespace according to HTML spec
    // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
    function stripAndCollapse( value ) {
        var tokens = value.match( rnothtmlwhite ) || [];
        return tokens.join( " " );
    }


    function getClass( elem ) {
        return elem.getAttribute && elem.getAttribute( "class" ) || "";
    }

    function classesToArray( value ) {
        if ( Array.isArray( value ) ) {
            return value;
        }
        if ( typeof value === "string" ) {
            return value.match( rnothtmlwhite ) || [];
        }
        return [];
    }

    jQuery.fn.extend( {
        addClass: function( value ) {
            var classes, elem, cur, curValue, clazz, j, finalValue,
                i = 0;

            if ( isFunction( value ) ) {
                return this.each( function( j ) {
                    jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
                } );
            }

            classes = classesToArray( value );

            if ( classes.length ) {
                while ( ( elem = this[ i++ ] ) ) {
                    curValue = getClass( elem );
                    cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

                    if ( cur ) {
                        j = 0;
                        while ( ( clazz = classes[ j++ ] ) ) {
                            if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
                                cur += clazz + " ";
                            }
                        }

                        // Only assign if different to avoid unneeded rendering.
                        finalValue = stripAndCollapse( cur );
                        if ( curValue !== finalValue ) {
                            elem.setAttribute( "class", finalValue );
                        }
                    }
                }
            }

            return this;
        },

        removeClass: function( value ) {
            var classes, elem, cur, curValue, clazz, j, finalValue,
                i = 0;

            if ( isFunction( value ) ) {
                return this.each( function( j ) {
                    jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
                } );
            }

            if ( !arguments.length ) {
                return this.attr( "class", "" );
            }

            classes = classesToArray( value );

            if ( classes.length ) {
                while ( ( elem = this[ i++ ] ) ) {
                    curValue = getClass( elem );

                    // This expression is here for better compressibility (see addClass)
                    cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

                    if ( cur ) {
                        j = 0;
                        while ( ( clazz = classes[ j++ ] ) ) {

                            // Remove *all* instances
                            while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
                                cur = cur.replace( " " + clazz + " ", " " );
                            }
                        }

                        // Only assign if different to avoid unneeded rendering.
                        finalValue = stripAndCollapse( cur );
                        if ( curValue !== finalValue ) {
                            elem.setAttribute( "class", finalValue );
                        }
                    }
                }
            }

            return this;
        },

        toggleClass: function( value, stateVal ) {
            var type = typeof value,
                isValidValue = type === "string" || Array.isArray( value );

            if ( typeof stateVal === "boolean" && isValidValue ) {
                return stateVal ? this.addClass( value ) : this.removeClass( value );
            }

            if ( isFunction( value ) ) {
                return this.each( function( i ) {
                    jQuery( this ).toggleClass(
                        value.call( this, i, getClass( this ), stateVal ),
                        stateVal
                    );
                } );
            }

            return this.each( function() {
                var className, i, self, classNames;

                if ( isValidValue ) {

                    // Toggle individual class names
                    i = 0;
                    self = jQuery( this );
                    classNames = classesToArray( value );

                    while ( ( className = classNames[ i++ ] ) ) {

                        // Check each className given, space separated list
                        if ( self.hasClass( className ) ) {
                            self.removeClass( className );
                        } else {
                            self.addClass( className );
                        }
                    }

                    // Toggle whole class name
                } else if ( value === undefined || type === "boolean" ) {
                    className = getClass( this );
                    if ( className ) {

                        // Store className if set
                        dataPriv.set( this, "__className__", className );
                    }

                    // If the element has a class name or if we're passed `false`,
                    // then remove the whole classname (if there was one, the above saved it).
                    // Otherwise bring back whatever was previously saved (if anything),
                    // falling back to the empty string if nothing was stored.
                    if ( this.setAttribute ) {
                        this.setAttribute( "class",
                            className || value === false ?
                                "" :
                                dataPriv.get( this, "__className__" ) || ""
                        );
                    }
                }
            } );
        },

        hasClass: function( selector ) {
            var className, elem,
                i = 0;

            className = " " + selector + " ";
            while ( ( elem = this[ i++ ] ) ) {
                if ( elem.nodeType === 1 &&
                    ( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
                    return true;
                }
            }

            return false;
        }
    } );




    var rreturn = /\r/g;

    jQuery.fn.extend( {
        val: function( value ) {
            var hooks, ret, valueIsFunction,
                elem = this[ 0 ];

            if ( !arguments.length ) {
                if ( elem ) {
                    hooks = jQuery.valHooks[ elem.type ] ||
                        jQuery.valHooks[ elem.nodeName.toLowerCase() ];

                    if ( hooks &&
                        "get" in hooks &&
                        ( ret = hooks.get( elem, "value" ) ) !== undefined
                    ) {
                        return ret;
                    }

                    ret = elem.value;

                    // Handle most common string cases
                    if ( typeof ret === "string" ) {
                        return ret.replace( rreturn, "" );
                    }

                    // Handle cases where value is null/undef or number
                    return ret == null ? "" : ret;
                }

                return;
            }

            valueIsFunction = isFunction( value );

            return this.each( function( i ) {
                var val;

                if ( this.nodeType !== 1 ) {
                    return;
                }

                if ( valueIsFunction ) {
                    val = value.call( this, i, jQuery( this ).val() );
                } else {
                    val = value;
                }

                // Treat null/undefined as ""; convert numbers to string
                if ( val == null ) {
                    val = "";

                } else if ( typeof val === "number" ) {
                    val += "";

                } else if ( Array.isArray( val ) ) {
                    val = jQuery.map( val, function( value ) {
                        return value == null ? "" : value + "";
                    } );
                }

                hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

                // If set returns undefined, fall back to normal setting
                if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
                    this.value = val;
                }
            } );
        }
    } );

    jQuery.extend( {
        valHooks: {
            option: {
                get: function( elem ) {

                    var val = jQuery.find.attr( elem, "value" );
                    return val != null ?
                        val :

                        // Support: IE <=10 - 11 only
                        // option.text throws exceptions (#14686, #14858)
                        // Strip and collapse whitespace
                        // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                        stripAndCollapse( jQuery.text( elem ) );
                }
            },
            select: {
                get: function( elem ) {
                    var value, option, i,
                        options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one",
                        values = one ? null : [],
                        max = one ? index + 1 : options.length;

                    if ( index < 0 ) {
                        i = max;

                    } else {
                        i = one ? index : 0;
                    }

                    // Loop through all the selected options
                    for ( ; i < max; i++ ) {
                        option = options[ i ];

                        // Support: IE <=9 only
                        // IE8-9 doesn't update selected after form reset (#2551)
                        if ( ( option.selected || i === index ) &&

                            // Don't return options that are disabled or in a disabled optgroup
                            !option.disabled &&
                            ( !option.parentNode.disabled ||
                                !nodeName( option.parentNode, "optgroup" ) ) ) {

                            // Get the specific value for the option
                            value = jQuery( option ).val();

                            // We don't need an array for one selects
                            if ( one ) {
                                return value;
                            }

                            // Multi-Selects return an array
                            values.push( value );
                        }
                    }

                    return values;
                },

                set: function( elem, value ) {
                    var optionSet, option,
                        options = elem.options,
                        values = jQuery.makeArray( value ),
                        i = options.length;

                    while ( i-- ) {
                        option = options[ i ];

                        /* eslint-disable no-cond-assign */

                        if ( option.selected =
                                jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
                        ) {
                            optionSet = true;
                        }

                        /* eslint-enable no-cond-assign */
                    }

                    // Force browsers to behave consistently when non-matching value is set
                    if ( !optionSet ) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        }
    } );

// Radios and checkboxes getter/setter
    jQuery.each( [ "radio", "checkbox" ], function() {
        jQuery.valHooks[ this ] = {
            set: function( elem, value ) {
                if ( Array.isArray( value ) ) {
                    return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
                }
            }
        };
        if ( !support.checkOn ) {
            jQuery.valHooks[ this ].get = function( elem ) {
                return elem.getAttribute( "value" ) === null ? "on" : elem.value;
            };
        }
    } );




// Return jQuery for attributes-only inclusion


    support.focusin = "onfocusin" in window;


    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        stopPropagationCallback = function( e ) {
            e.stopPropagation();
        };

    jQuery.extend( jQuery.event, {

        trigger: function( event, data, elem, onlyHandlers ) {

            var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
                eventPath = [ elem || document ],
                type = hasOwn.call( event, "type" ) ? event.type : event,
                namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

            cur = lastElement = tmp = elem = elem || document;

            // Don't do events on text and comment nodes
            if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
                return;
            }

            // focus/blur morphs to focusin/out; ensure we're not firing them right now
            if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
                return;
            }

            if ( type.indexOf( "." ) > -1 ) {

                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split( "." );
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf( ":" ) < 0 && "on" + type;

            // Caller can pass in a jQuery.Event object, Object, or just an event type string
            event = event[ jQuery.expando ] ?
                event :
                new jQuery.Event( type, typeof event === "object" && event );

            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join( "." );
            event.rnamespace = event.namespace ?
                new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
                null;

            // Clean up the event in case it is being reused
            event.result = undefined;
            if ( !event.target ) {
                event.target = elem;
            }

            // Clone any incoming data and prepend the event, creating the handler arg list
            data = data == null ?
                [ event ] :
                jQuery.makeArray( data, [ event ] );

            // Allow special events to draw outside the lines
            special = jQuery.event.special[ type ] || {};
            if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
                return;
            }

            // Determine event propagation path in advance, per W3C events spec (#9951)
            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
            if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

                bubbleType = special.delegateType || type;
                if ( !rfocusMorph.test( bubbleType + type ) ) {
                    cur = cur.parentNode;
                }
                for ( ; cur; cur = cur.parentNode ) {
                    eventPath.push( cur );
                    tmp = cur;
                }

                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if ( tmp === ( elem.ownerDocument || document ) ) {
                    eventPath.push( tmp.defaultView || tmp.parentWindow || window );
                }
            }

            // Fire handlers on the event path
            i = 0;
            while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
                lastElement = cur;
                event.type = i > 1 ?
                    bubbleType :
                    special.bindType || type;

                // jQuery handler
                handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
                    dataPriv.get( cur, "handle" );
                if ( handle ) {
                    handle.apply( cur, data );
                }

                // Native handler
                handle = ontype && cur[ ontype ];
                if ( handle && handle.apply && acceptData( cur ) ) {
                    event.result = handle.apply( cur, data );
                    if ( event.result === false ) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;

            // If nobody prevented the default action, do it now
            if ( !onlyHandlers && !event.isDefaultPrevented() ) {

                if ( ( !special._default ||
                        special._default.apply( eventPath.pop(), data ) === false ) &&
                    acceptData( elem ) ) {

                    // Call a native DOM method on the target with the same name as the event.
                    // Don't do default actions on window, that's where global variables be (#6170)
                    if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

                        // Don't re-trigger an onFOO event when we call its FOO() method
                        tmp = elem[ ontype ];

                        if ( tmp ) {
                            elem[ ontype ] = null;
                        }

                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery.event.triggered = type;

                        if ( event.isPropagationStopped() ) {
                            lastElement.addEventListener( type, stopPropagationCallback );
                        }

                        elem[ type ]();

                        if ( event.isPropagationStopped() ) {
                            lastElement.removeEventListener( type, stopPropagationCallback );
                        }

                        jQuery.event.triggered = undefined;

                        if ( tmp ) {
                            elem[ ontype ] = tmp;
                        }
                    }
                }
            }

            return event.result;
        },

        // Piggyback on a donor event to simulate a different one
        // Used only for `focus(in | out)` events
        simulate: function( type, elem, event ) {
            var e = jQuery.extend(
                new jQuery.Event(),
                event,
                {
                    type: type,
                    isSimulated: true
                }
            );

            jQuery.event.trigger( e, null, elem );
        }

    } );

    jQuery.fn.extend( {

        trigger: function( type, data ) {
            return this.each( function() {
                jQuery.event.trigger( type, data, this );
            } );
        },
        triggerHandler: function( type, data ) {
            var elem = this[ 0 ];
            if ( elem ) {
                return jQuery.event.trigger( type, data, elem, true );
            }
        }
    } );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
    if ( !support.focusin ) {
        jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

            // Attach a single capturing handler on the document while someone wants focusin/focusout
            var handler = function( event ) {
                jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
            };

            jQuery.event.special[ fix ] = {
                setup: function() {
                    var doc = this.ownerDocument || this,
                        attaches = dataPriv.access( doc, fix );

                    if ( !attaches ) {
                        doc.addEventListener( orig, handler, true );
                    }
                    dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
                },
                teardown: function() {
                    var doc = this.ownerDocument || this,
                        attaches = dataPriv.access( doc, fix ) - 1;

                    if ( !attaches ) {
                        doc.removeEventListener( orig, handler, true );
                        dataPriv.remove( doc, fix );

                    } else {
                        dataPriv.access( doc, fix, attaches );
                    }
                }
            };
        } );
    }
    var location = window.location;

    var nonce = Date.now();

    var rquery = ( /\?/ );



// Cross-browser xml parsing
    jQuery.parseXML = function( data ) {
        var xml;
        if ( !data || typeof data !== "string" ) {
            return null;
        }

        // Support: IE 9 - 11 only
        // IE throws on parseFromString with invalid input.
        try {
            xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
        } catch ( e ) {
            xml = undefined;
        }

        if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
            jQuery.error( "Invalid XML: " + data );
        }
        return xml;
    };


    var
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams( prefix, obj, traditional, add ) {
        var name;

        if ( Array.isArray( obj ) ) {

            // Serialize array item.
            jQuery.each( obj, function( i, v ) {
                if ( traditional || rbracket.test( prefix ) ) {

                    // Treat each array item as a scalar.
                    add( prefix, v );

                } else {

                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams(
                        prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
                        v,
                        traditional,
                        add
                    );
                }
            } );

        } else if ( !traditional && toType( obj ) === "object" ) {

            // Serialize object item.
            for ( name in obj ) {
                buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
            }

        } else {

            // Serialize scalar item.
            add( prefix, obj );
        }
    }

// Serialize an array of form elements or a set of
// key/values into a query string
    jQuery.param = function( a, traditional ) {
        var prefix,
            s = [],
            add = function( key, valueOrFunction ) {

                // If value is a function, invoke it and use its return value
                var value = isFunction( valueOrFunction ) ?
                    valueOrFunction() :
                    valueOrFunction;

                s[ s.length ] = encodeURIComponent( key ) + "=" +
                    encodeURIComponent( value == null ? "" : value );
            };

        // If an array was passed in, assume that it is an array of form elements.
        if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

            // Serialize the form elements
            jQuery.each( a, function() {
                add( this.name, this.value );
            } );

        } else {

            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for ( prefix in a ) {
                buildParams( prefix, a[ prefix ], traditional, add );
            }
        }

        // Return the resulting serialization
        return s.join( "&" );
    };

    jQuery.fn.extend( {
        serialize: function() {
            return jQuery.param( this.serializeArray() );
        },
        serializeArray: function() {
            return this.map( function() {

                // Can add propHook for "elements" to filter or add form elements
                var elements = jQuery.prop( this, "elements" );
                return elements ? jQuery.makeArray( elements ) : this;
            } )
                .filter( function() {
                    var type = this.type;

                    // Use .is( ":disabled" ) so that fieldset[disabled] works
                    return this.name && !jQuery( this ).is( ":disabled" ) &&
                        rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
                        ( this.checked || !rcheckableType.test( type ) );
                } )
                .map( function( i, elem ) {
                    var val = jQuery( this ).val();

                    if ( val == null ) {
                        return null;
                    }

                    if ( Array.isArray( val ) ) {
                        return jQuery.map( val, function( val ) {
                            return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                        } );
                    }

                    return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                } ).get();
        }
    } );


    var
        r20 = /%20/g,
        rhash = /#.*$/,
        rantiCache = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

        // #7653, #8125, #8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,

        /* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
        prefilters = {},

        /* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
        transports = {},

        // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes = "*/".concat( "*" ),

        // Anchor tag for parsing the document origin
        originAnchor = document.createElement( "a" );
    originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports( structure ) {

        // dataTypeExpression is optional and defaults to "*"
        return function( dataTypeExpression, func ) {

            if ( typeof dataTypeExpression !== "string" ) {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }

            var dataType,
                i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

            if ( isFunction( func ) ) {

                // For each dataType in the dataTypeExpression
                while ( ( dataType = dataTypes[ i++ ] ) ) {

                    // Prepend if requested
                    if ( dataType[ 0 ] === "+" ) {
                        dataType = dataType.slice( 1 ) || "*";
                        ( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

                        // Otherwise append
                    } else {
                        ( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
                    }
                }
            }
        };
    }

// Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

        var inspected = {},
            seekingTransport = ( structure === transports );

        function inspect( dataType ) {
            var selected;
            inspected[ dataType ] = true;
            jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
                var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
                if ( typeof dataTypeOrTransport === "string" &&
                    !seekingTransport && !inspected[ dataTypeOrTransport ] ) {

                    options.dataTypes.unshift( dataTypeOrTransport );
                    inspect( dataTypeOrTransport );
                    return false;
                } else if ( seekingTransport ) {
                    return !( selected = dataTypeOrTransport );
                }
            } );
            return selected;
        }

        return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
    }

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
    function ajaxExtend( target, src ) {
        var key, deep,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};

        for ( key in src ) {
            if ( src[ key ] !== undefined ) {
                ( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
            }
        }
        if ( deep ) {
            jQuery.extend( true, target, deep );
        }

        return target;
    }

    /* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
    function ajaxHandleResponses( s, jqXHR, responses ) {

        var ct, type, finalDataType, firstDataType,
            contents = s.contents,
            dataTypes = s.dataTypes;

        // Remove auto dataType and get content-type in the process
        while ( dataTypes[ 0 ] === "*" ) {
            dataTypes.shift();
            if ( ct === undefined ) {
                ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
            }
        }

        // Check if we're dealing with a known content-type
        if ( ct ) {
            for ( type in contents ) {
                if ( contents[ type ] && contents[ type ].test( ct ) ) {
                    dataTypes.unshift( type );
                    break;
                }
            }
        }

        // Check to see if we have a response for the expected dataType
        if ( dataTypes[ 0 ] in responses ) {
            finalDataType = dataTypes[ 0 ];
        } else {

            // Try convertible dataTypes
            for ( type in responses ) {
                if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
                    finalDataType = type;
                    break;
                }
                if ( !firstDataType ) {
                    firstDataType = type;
                }
            }

            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }

        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if ( finalDataType ) {
            if ( finalDataType !== dataTypes[ 0 ] ) {
                dataTypes.unshift( finalDataType );
            }
            return responses[ finalDataType ];
        }
    }

    /* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
    function ajaxConvert( s, response, jqXHR, isSuccess ) {
        var conv2, current, conv, tmp, prev,
            converters = {},

            // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice();

        // Create converters map with lowercased keys
        if ( dataTypes[ 1 ] ) {
            for ( conv in s.converters ) {
                converters[ conv.toLowerCase() ] = s.converters[ conv ];
            }
        }

        current = dataTypes.shift();

        // Convert to each sequential dataType
        while ( current ) {

            if ( s.responseFields[ current ] ) {
                jqXHR[ s.responseFields[ current ] ] = response;
            }

            // Apply the dataFilter if provided
            if ( !prev && isSuccess && s.dataFilter ) {
                response = s.dataFilter( response, s.dataType );
            }

            prev = current;
            current = dataTypes.shift();

            if ( current ) {

                // There's only work to do if current dataType is non-auto
                if ( current === "*" ) {

                    current = prev;

                    // Convert response if prev dataType is non-auto and differs from current
                } else if ( prev !== "*" && prev !== current ) {

                    // Seek a direct converter
                    conv = converters[ prev + " " + current ] || converters[ "* " + current ];

                    // If none found, seek a pair
                    if ( !conv ) {
                        for ( conv2 in converters ) {

                            // If conv2 outputs current
                            tmp = conv2.split( " " );
                            if ( tmp[ 1 ] === current ) {

                                // If prev can be converted to accepted input
                                conv = converters[ prev + " " + tmp[ 0 ] ] ||
                                    converters[ "* " + tmp[ 0 ] ];
                                if ( conv ) {

                                    // Condense equivalence converters
                                    if ( conv === true ) {
                                        conv = converters[ conv2 ];

                                        // Otherwise, insert the intermediate dataType
                                    } else if ( converters[ conv2 ] !== true ) {
                                        current = tmp[ 0 ];
                                        dataTypes.unshift( tmp[ 1 ] );
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    // Apply converter (if not an equivalence)
                    if ( conv !== true ) {

                        // Unless errors are allowed to bubble, catch and return them
                        if ( conv && s.throws ) {
                            response = conv( response );
                        } else {
                            try {
                                response = conv( response );
                            } catch ( e ) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }

        return { state: "success", data: response };
    }

    jQuery.extend( {

        // Counter for holding the number of active queries
        active: 0,

        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},

        ajaxSettings: {
            url: location.href,
            type: "GET",
            isLocal: rlocalProtocol.test( location.protocol ),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",

            /*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },

            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },

            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },

            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {

                // Convert anything to text
                "* text": String,

                // Text to html (true = no transformation)
                "text html": true,

                // Evaluate text as a json expression
                "text json": JSON.parse,

                // Parse text as xml
                "text xml": jQuery.parseXML
            },

            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },

        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function( target, settings ) {
            return settings ?

                // Building a settings object
                ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

                // Extending ajaxSettings
                ajaxExtend( jQuery.ajaxSettings, target );
        },

        ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
        ajaxTransport: addToPrefiltersOrTransports( transports ),

        // Main method
        ajax: function( url, options ) {

            // If url is an object, simulate pre-1.5 signature
            if ( typeof url === "object" ) {
                options = url;
                url = undefined;
            }

            // Force options to be an object
            options = options || {};

            var transport,

                // URL without anti-cache param
                cacheURL,

                // Response headers
                responseHeadersString,
                responseHeaders,

                // timeout handle
                timeoutTimer,

                // Url cleanup var
                urlAnchor,

                // Request state (becomes false upon send and true upon completion)
                completed,

                // To know if global events are to be dispatched
                fireGlobals,

                // Loop variable
                i,

                // uncached part of the url
                uncached,

                // Create the final options object
                s = jQuery.ajaxSetup( {}, options ),

                // Callbacks context
                callbackContext = s.context || s,

                // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext = s.context &&
                ( callbackContext.nodeType || callbackContext.jquery ) ?
                    jQuery( callbackContext ) :
                    jQuery.event,

                // Deferreds
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks( "once memory" ),

                // Status-dependent callbacks
                statusCode = s.statusCode || {},

                // Headers (they are sent all at once)
                requestHeaders = {},
                requestHeadersNames = {},

                // Default abort message
                strAbort = "canceled",

                // Fake xhr
                jqXHR = {
                    readyState: 0,

                    // Builds headers hashtable if needed
                    getResponseHeader: function( key ) {
                        var match;
                        if ( completed ) {
                            if ( !responseHeaders ) {
                                responseHeaders = {};
                                while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
                                    responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
                                }
                            }
                            match = responseHeaders[ key.toLowerCase() ];
                        }
                        return match == null ? null : match;
                    },

                    // Raw string
                    getAllResponseHeaders: function() {
                        return completed ? responseHeadersString : null;
                    },

                    // Caches the header
                    setRequestHeader: function( name, value ) {
                        if ( completed == null ) {
                            name = requestHeadersNames[ name.toLowerCase() ] =
                                requestHeadersNames[ name.toLowerCase() ] || name;
                            requestHeaders[ name ] = value;
                        }
                        return this;
                    },

                    // Overrides response content-type header
                    overrideMimeType: function( type ) {
                        if ( completed == null ) {
                            s.mimeType = type;
                        }
                        return this;
                    },

                    // Status-dependent callbacks
                    statusCode: function( map ) {
                        var code;
                        if ( map ) {
                            if ( completed ) {

                                // Execute the appropriate callbacks
                                jqXHR.always( map[ jqXHR.status ] );
                            } else {

                                // Lazy-add the new callbacks in a way that preserves old ones
                                for ( code in map ) {
                                    statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
                                }
                            }
                        }
                        return this;
                    },

                    // Cancel the request
                    abort: function( statusText ) {
                        var finalText = statusText || strAbort;
                        if ( transport ) {
                            transport.abort( finalText );
                        }
                        done( 0, finalText );
                        return this;
                    }
                };

            // Attach deferreds
            deferred.promise( jqXHR );

            // Add protocol if not provided (prefilters might expect it)
            // Handle falsy url in the settings object (#10093: consistency with old signature)
            // We also use the url parameter if available
            s.url = ( ( url || s.url || location.href ) + "" )
                .replace( rprotocol, location.protocol + "//" );

            // Alias method option to type as per ticket #12004
            s.type = options.method || options.type || s.method || s.type;

            // Extract dataTypes list
            s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

            // A cross-domain request is in order when the origin doesn't match the current origin.
            if ( s.crossDomain == null ) {
                urlAnchor = document.createElement( "a" );

                // Support: IE <=8 - 11, Edge 12 - 15
                // IE throws exception on accessing the href property if url is malformed,
                // e.g. http://example.com:80x/
                try {
                    urlAnchor.href = s.url;

                    // Support: IE <=8 - 11 only
                    // Anchor's host property isn't correctly set when s.url is relative
                    urlAnchor.href = urlAnchor.href;
                    s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
                        urlAnchor.protocol + "//" + urlAnchor.host;
                } catch ( e ) {

                    // If there is an error parsing the URL, assume it is crossDomain,
                    // it can be rejected by the transport if it is invalid
                    s.crossDomain = true;
                }
            }

            // Convert data if not already a string
            if ( s.data && s.processData && typeof s.data !== "string" ) {
                s.data = jQuery.param( s.data, s.traditional );
            }

            // Apply prefilters
            inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

            // If request was aborted inside a prefilter, stop there
            if ( completed ) {
                return jqXHR;
            }

            // We can fire global events as of now if asked to
            // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
            fireGlobals = jQuery.event && s.global;

            // Watch for a new set of requests
            if ( fireGlobals && jQuery.active++ === 0 ) {
                jQuery.event.trigger( "ajaxStart" );
            }

            // Uppercase the type
            s.type = s.type.toUpperCase();

            // Determine if request has content
            s.hasContent = !rnoContent.test( s.type );

            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            // Remove hash to simplify url manipulation
            cacheURL = s.url.replace( rhash, "" );

            // More options handling for requests with no content
            if ( !s.hasContent ) {

                // Remember the hash so we can put it back
                uncached = s.url.slice( cacheURL.length );

                // If data is available and should be processed, append data to url
                if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
                    cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

                    // #9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }

                // Add or update anti-cache param if needed
                if ( s.cache === false ) {
                    cacheURL = cacheURL.replace( rantiCache, "$1" );
                    uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
                }

                // Put hash and anti-cache on the URL that will be requested (gh-1732)
                s.url = cacheURL + uncached;

                // Change '%20' to '+' if this is encoded form body content (gh-2658)
            } else if ( s.data && s.processData &&
                ( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
                s.data = s.data.replace( r20, "+" );
            }

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if ( s.ifModified ) {
                if ( jQuery.lastModified[ cacheURL ] ) {
                    jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
                }
                if ( jQuery.etag[ cacheURL ] ) {
                    jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
                }
            }

            // Set the correct header, if data is being sent
            if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
                jqXHR.setRequestHeader( "Content-Type", s.contentType );
            }

            // Set the Accepts header for the server, depending on the dataType
            jqXHR.setRequestHeader(
                "Accept",
                s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
                    s.accepts[ s.dataTypes[ 0 ] ] +
                    ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
                    s.accepts[ "*" ]
            );

            // Check for headers option
            for ( i in s.headers ) {
                jqXHR.setRequestHeader( i, s.headers[ i ] );
            }

            // Allow custom headers/mimetypes and early abort
            if ( s.beforeSend &&
                ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

                // Abort if not done already and return
                return jqXHR.abort();
            }

            // Aborting is no longer a cancellation
            strAbort = "abort";

            // Install callbacks on deferreds
            completeDeferred.add( s.complete );
            jqXHR.done( s.success );
            jqXHR.fail( s.error );

            // Get transport
            transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

            // If no transport, we auto-abort
            if ( !transport ) {
                done( -1, "No Transport" );
            } else {
                jqXHR.readyState = 1;

                // Send global event
                if ( fireGlobals ) {
                    globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
                }

                // If request was aborted inside ajaxSend, stop there
                if ( completed ) {
                    return jqXHR;
                }

                // Timeout
                if ( s.async && s.timeout > 0 ) {
                    timeoutTimer = window.setTimeout( function() {
                        jqXHR.abort( "timeout" );
                    }, s.timeout );
                }

                try {
                    completed = false;
                    transport.send( requestHeaders, done );
                } catch ( e ) {

                    // Rethrow post-completion exceptions
                    if ( completed ) {
                        throw e;
                    }

                    // Propagate others as results
                    done( -1, e );
                }
            }

            // Callback for when everything is done
            function done( status, nativeStatusText, responses, headers ) {
                var isSuccess, success, error, response, modified,
                    statusText = nativeStatusText;

                // Ignore repeat invocations
                if ( completed ) {
                    return;
                }

                completed = true;

                // Clear timeout if it exists
                if ( timeoutTimer ) {
                    window.clearTimeout( timeoutTimer );
                }

                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;

                // Cache response headers
                responseHeadersString = headers || "";

                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;

                // Determine if successful
                isSuccess = status >= 200 && status < 300 || status === 304;

                // Get response data
                if ( responses ) {
                    response = ajaxHandleResponses( s, jqXHR, responses );
                }

                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert( s, response, jqXHR, isSuccess );

                // If successful, handle type chaining
                if ( isSuccess ) {

                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if ( s.ifModified ) {
                        modified = jqXHR.getResponseHeader( "Last-Modified" );
                        if ( modified ) {
                            jQuery.lastModified[ cacheURL ] = modified;
                        }
                        modified = jqXHR.getResponseHeader( "etag" );
                        if ( modified ) {
                            jQuery.etag[ cacheURL ] = modified;
                        }
                    }

                    // if no content
                    if ( status === 204 || s.type === "HEAD" ) {
                        statusText = "nocontent";

                        // if not modified
                    } else if ( status === 304 ) {
                        statusText = "notmodified";

                        // If we have data, let's convert it
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {

                    // Extract error from statusText and normalize for non-aborts
                    error = statusText;
                    if ( status || !statusText ) {
                        statusText = "error";
                        if ( status < 0 ) {
                            status = 0;
                        }
                    }
                }

                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = ( nativeStatusText || statusText ) + "";

                // Success/Error
                if ( isSuccess ) {
                    deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
                } else {
                    deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
                }

                // Status-dependent callbacks
                jqXHR.statusCode( statusCode );
                statusCode = undefined;

                if ( fireGlobals ) {
                    globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
                        [ jqXHR, s, isSuccess ? success : error ] );
                }

                // Complete
                completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

                if ( fireGlobals ) {
                    globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

                    // Handle the global AJAX counter
                    if ( !( --jQuery.active ) ) {
                        jQuery.event.trigger( "ajaxStop" );
                    }
                }
            }

            return jqXHR;
        },

        getJSON: function( url, data, callback ) {
            return jQuery.get( url, data, callback, "json" );
        },

        getScript: function( url, callback ) {
            return jQuery.get( url, undefined, callback, "script" );
        }
    } );

    jQuery.each( [ "get", "post" ], function( i, method ) {
        jQuery[ method ] = function( url, data, callback, type ) {

            // Shift arguments if data argument was omitted
            if ( isFunction( data ) ) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            // The url can be an options object (which then must have .url)
            return jQuery.ajax( jQuery.extend( {
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            }, jQuery.isPlainObject( url ) && url ) );
        };
    } );


    jQuery._evalUrl = function( url ) {
        return jQuery.ajax( {
            url: url,

            // Make this explicit, since user can override this through ajaxSetup (#11264)
            type: "GET",
            dataType: "script",
            cache: true,
            async: false,
            global: false,
            "throws": true
        } );
    };


    jQuery.fn.extend( {
        wrapAll: function( html ) {
            var wrap;

            if ( this[ 0 ] ) {
                if ( isFunction( html ) ) {
                    html = html.call( this[ 0 ] );
                }

                // The elements to wrap the target around
                wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

                if ( this[ 0 ].parentNode ) {
                    wrap.insertBefore( this[ 0 ] );
                }

                wrap.map( function() {
                    var elem = this;

                    while ( elem.firstElementChild ) {
                        elem = elem.firstElementChild;
                    }

                    return elem;
                } ).append( this );
            }

            return this;
        },

        wrapInner: function( html ) {
            if ( isFunction( html ) ) {
                return this.each( function( i ) {
                    jQuery( this ).wrapInner( html.call( this, i ) );
                } );
            }

            return this.each( function() {
                var self = jQuery( this ),
                    contents = self.contents();

                if ( contents.length ) {
                    contents.wrapAll( html );

                } else {
                    self.append( html );
                }
            } );
        },

        wrap: function( html ) {
            var htmlIsFunction = isFunction( html );

            return this.each( function( i ) {
                jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
            } );
        },

        unwrap: function( selector ) {
            this.parent( selector ).not( "body" ).each( function() {
                jQuery( this ).replaceWith( this.childNodes );
            } );
            return this;
        }
    } );


    jQuery.expr.pseudos.hidden = function( elem ) {
        return !jQuery.expr.pseudos.visible( elem );
    };
    jQuery.expr.pseudos.visible = function( elem ) {
        return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
    };




    jQuery.ajaxSettings.xhr = function() {
        try {
            return new window.XMLHttpRequest();
        } catch ( e ) {}
    };

    var xhrSuccessStatus = {

            // File protocol always yields status code 0, assume 200
            0: 200,

            // Support: IE <=9 only
            // #1450: sometimes IE returns 1223 when it should be 204
            1223: 204
        },
        xhrSupported = jQuery.ajaxSettings.xhr();

    support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
    support.ajax = xhrSupported = !!xhrSupported;

    jQuery.ajaxTransport( function( options ) {
        var callback, errorCallback;

        // Cross domain only allowed if supported through XMLHttpRequest
        if ( support.cors || xhrSupported && !options.crossDomain ) {
            return {
                send: function( headers, complete ) {
                    var i,
                        xhr = options.xhr();

                    xhr.open(
                        options.type,
                        options.url,
                        options.async,
                        options.username,
                        options.password
                    );

                    // Apply custom fields if provided
                    if ( options.xhrFields ) {
                        for ( i in options.xhrFields ) {
                            xhr[ i ] = options.xhrFields[ i ];
                        }
                    }

                    // Override mime type if needed
                    if ( options.mimeType && xhr.overrideMimeType ) {
                        xhr.overrideMimeType( options.mimeType );
                    }

                    // X-Requested-With header
                    // For cross-domain requests, seeing as conditions for a preflight are
                    // akin to a jigsaw puzzle, we simply never set it to be sure.
                    // (it can always be set on a per-request basis or even using ajaxSetup)
                    // For same-domain requests, won't change header if already provided.
                    if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
                        headers[ "X-Requested-With" ] = "XMLHttpRequest";
                    }

                    // Set headers
                    for ( i in headers ) {
                        xhr.setRequestHeader( i, headers[ i ] );
                    }

                    // Callback
                    callback = function( type ) {
                        return function() {
                            if ( callback ) {
                                callback = errorCallback = xhr.onload =
                                    xhr.onerror = xhr.onabort = xhr.ontimeout =
                                        xhr.onreadystatechange = null;

                                if ( type === "abort" ) {
                                    xhr.abort();
                                } else if ( type === "error" ) {

                                    // Support: IE <=9 only
                                    // On a manual native abort, IE9 throws
                                    // errors on any property access that is not readyState
                                    if ( typeof xhr.status !== "number" ) {
                                        complete( 0, "error" );
                                    } else {
                                        complete(

                                            // File: protocol always yields status 0; see #8605, #14207
                                            xhr.status,
                                            xhr.statusText
                                        );
                                    }
                                } else {
                                    complete(
                                        xhrSuccessStatus[ xhr.status ] || xhr.status,
                                        xhr.statusText,

                                        // Support: IE <=9 only
                                        // IE9 has no XHR2 but throws on binary (trac-11426)
                                        // For XHR2 non-text, let the caller handle it (gh-2498)
                                        ( xhr.responseType || "text" ) !== "text"  ||
                                        typeof xhr.responseText !== "string" ?
                                            { binary: xhr.response } :
                                            { text: xhr.responseText },
                                        xhr.getAllResponseHeaders()
                                    );
                                }
                            }
                        };
                    };

                    // Listen to events
                    xhr.onload = callback();
                    errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

                    // Support: IE 9 only
                    // Use onreadystatechange to replace onabort
                    // to handle uncaught aborts
                    if ( xhr.onabort !== undefined ) {
                        xhr.onabort = errorCallback;
                    } else {
                        xhr.onreadystatechange = function() {

                            // Check readyState before timeout as it changes
                            if ( xhr.readyState === 4 ) {

                                // Allow onerror to be called first,
                                // but that will not handle a native abort
                                // Also, save errorCallback to a variable
                                // as xhr.onerror cannot be accessed
                                window.setTimeout( function() {
                                    if ( callback ) {
                                        errorCallback();
                                    }
                                } );
                            }
                        };
                    }

                    // Create the abort callback
                    callback = callback( "abort" );

                    try {

                        // Do send the request (this may raise an exception)
                        xhr.send( options.hasContent && options.data || null );
                    } catch ( e ) {

                        // #14683: Only rethrow if this hasn't been notified as an error yet
                        if ( callback ) {
                            throw e;
                        }
                    }
                },

                abort: function() {
                    if ( callback ) {
                        callback();
                    }
                }
            };
        }
    } );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
    jQuery.ajaxPrefilter( function( s ) {
        if ( s.crossDomain ) {
            s.contents.script = false;
        }
    } );

// Install script dataType
    jQuery.ajaxSetup( {
        accepts: {
            script: "text/javascript, application/javascript, " +
            "application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function( text ) {
                jQuery.globalEval( text );
                return text;
            }
        }
    } );

// Handle cache's special case and crossDomain
    jQuery.ajaxPrefilter( "script", function( s ) {
        if ( s.cache === undefined ) {
            s.cache = false;
        }
        if ( s.crossDomain ) {
            s.type = "GET";
        }
    } );

// Bind script tag hack transport
    jQuery.ajaxTransport( "script", function( s ) {

        // This transport only deals with cross domain requests
        if ( s.crossDomain ) {
            var script, callback;
            return {
                send: function( _, complete ) {
                    script = jQuery( "<script>" ).prop( {
                        charset: s.scriptCharset,
                        src: s.url
                    } ).on(
                        "load error",
                        callback = function( evt ) {
                            script.remove();
                            callback = null;
                            if ( evt ) {
                                complete( evt.type === "error" ? 404 : 200, evt.type );
                            }
                        }
                    );

                    // Use native DOM manipulation to avoid our domManip AJAX trickery
                    document.head.appendChild( script[ 0 ] );
                },
                abort: function() {
                    if ( callback ) {
                        callback();
                    }
                }
            };
        }
    } );




    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
    jQuery.ajaxSetup( {
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
            this[ callback ] = true;
            return callback;
        }
    } );

// Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

        var callbackName, overwritten, responseContainer,
            jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
                    "url" :
                    typeof s.data === "string" &&
                    ( s.contentType || "" )
                        .indexOf( "application/x-www-form-urlencoded" ) === 0 &&
                    rjsonp.test( s.data ) && "data"
            );

        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
                s.jsonpCallback() :
                s.jsonpCallback;

            // Insert callback into url or form data
            if ( jsonProp ) {
                s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
            } else if ( s.jsonp !== false ) {
                s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
            }

            // Use data converter to retrieve json after script execution
            s.converters[ "script json" ] = function() {
                if ( !responseContainer ) {
                    jQuery.error( callbackName + " was not called" );
                }
                return responseContainer[ 0 ];
            };

            // Force json dataType
            s.dataTypes[ 0 ] = "json";

            // Install callback
            overwritten = window[ callbackName ];
            window[ callbackName ] = function() {
                responseContainer = arguments;
            };

            // Clean-up function (fires after converters)
            jqXHR.always( function() {

                // If previous value didn't exist - remove it
                if ( overwritten === undefined ) {
                    jQuery( window ).removeProp( callbackName );

                    // Otherwise restore preexisting value
                } else {
                    window[ callbackName ] = overwritten;
                }

                // Save back as free
                if ( s[ callbackName ] ) {

                    // Make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;

                    // Save the callback name for future use
                    oldCallbacks.push( callbackName );
                }

                // Call if it was a function and we have a response
                if ( responseContainer && isFunction( overwritten ) ) {
                    overwritten( responseContainer[ 0 ] );
                }

                responseContainer = overwritten = undefined;
            } );

            // Delegate to script
            return "script";
        }
    } );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
    support.createHTMLDocument = ( function() {
        var body = document.implementation.createHTMLDocument( "" ).body;
        body.innerHTML = "<form></form><form></form>";
        return body.childNodes.length === 2;
    } )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function( data, context, keepScripts ) {
        if ( typeof data !== "string" ) {
            return [];
        }
        if ( typeof context === "boolean" ) {
            keepScripts = context;
            context = false;
        }

        var base, parsed, scripts;

        if ( !context ) {

            // Stop scripts or inline event handlers from being executed immediately
            // by using document.implementation
            if ( support.createHTMLDocument ) {
                context = document.implementation.createHTMLDocument( "" );

                // Set the base href for the created document
                // so any parsed elements with URLs
                // are based on the document's URL (gh-2965)
                base = context.createElement( "base" );
                base.href = document.location.href;
                context.head.appendChild( base );
            } else {
                context = document;
            }
        }

        parsed = rsingleTag.exec( data );
        scripts = !keepScripts && [];

        // Single tag
        if ( parsed ) {
            return [ context.createElement( parsed[ 1 ] ) ];
        }

        parsed = buildFragment( [ data ], context, scripts );

        if ( scripts && scripts.length ) {
            jQuery( scripts ).remove();
        }

        return jQuery.merge( [], parsed.childNodes );
    };


    /**
     * Load a url into a page
     */
    jQuery.fn.load = function( url, params, callback ) {
        var selector, type, response,
            self = this,
            off = url.indexOf( " " );

        if ( off > -1 ) {
            selector = stripAndCollapse( url.slice( off ) );
            url = url.slice( 0, off );
        }

        // If it's a function
        if ( isFunction( params ) ) {

            // We assume that it's the callback
            callback = params;
            params = undefined;

            // Otherwise, build a param string
        } else if ( params && typeof params === "object" ) {
            type = "POST";
        }

        // If we have elements to modify, make the request
        if ( self.length > 0 ) {
            jQuery.ajax( {
                url: url,

                // If "type" variable is undefined, then "GET" method will be used.
                // Make value of this field explicit since
                // user can override it through ajaxSetup method
                type: type || "GET",
                dataType: "html",
                data: params
            } ).done( function( responseText ) {

                // Save response for use in complete callback
                response = arguments;

                self.html( selector ?

                    // If a selector was specified, locate the right elements in a dummy div
                    // Exclude scripts to avoid IE 'Permission Denied' errors
                    jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

                    // Otherwise use the full result
                    responseText );

                // If the request succeeds, this function gets "data", "status", "jqXHR"
                // but they are ignored because response was set above.
                // If it fails, this function gets "jqXHR", "status", "error"
            } ).always( callback && function( jqXHR, status ) {
                self.each( function() {
                    callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
                } );
            } );
        }

        return this;
    };




// Attach a bunch of functions for handling common AJAX events
    jQuery.each( [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend"
    ], function( i, type ) {
        jQuery.fn[ type ] = function( fn ) {
            return this.on( type, fn );
        };
    } );




    jQuery.expr.pseudos.animated = function( elem ) {
        return jQuery.grep( jQuery.timers, function( fn ) {
            return elem === fn.elem;
        } ).length;
    };




    jQuery.offset = {
        setOffset: function( elem, options, i ) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
                position = jQuery.css( elem, "position" ),
                curElem = jQuery( elem ),
                props = {};

            // Set position first, in-case top/left are set even on static elem
            if ( position === "static" ) {
                elem.style.position = "relative";
            }

            curOffset = curElem.offset();
            curCSSTop = jQuery.css( elem, "top" );
            curCSSLeft = jQuery.css( elem, "left" );
            calculatePosition = ( position === "absolute" || position === "fixed" ) &&
                ( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

            // Need to be able to calculate position if either
            // top or left is auto and position is either absolute or fixed
            if ( calculatePosition ) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;

            } else {
                curTop = parseFloat( curCSSTop ) || 0;
                curLeft = parseFloat( curCSSLeft ) || 0;
            }

            if ( isFunction( options ) ) {

                // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
                options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
            }

            if ( options.top != null ) {
                props.top = ( options.top - curOffset.top ) + curTop;
            }
            if ( options.left != null ) {
                props.left = ( options.left - curOffset.left ) + curLeft;
            }

            if ( "using" in options ) {
                options.using.call( elem, props );

            } else {
                curElem.css( props );
            }
        }
    };

    jQuery.fn.extend( {

        // offset() relates an element's border box to the document origin
        offset: function( options ) {

            // Preserve chaining for setter
            if ( arguments.length ) {
                return options === undefined ?
                    this :
                    this.each( function( i ) {
                        jQuery.offset.setOffset( this, options, i );
                    } );
            }

            var rect, win,
                elem = this[ 0 ];

            if ( !elem ) {
                return;
            }

            // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
            // Support: IE <=11 only
            // Running getBoundingClientRect on a
            // disconnected node in IE throws an error
            if ( !elem.getClientRects().length ) {
                return { top: 0, left: 0 };
            }

            // Get document-relative position by adding viewport scroll to viewport-relative gBCR
            rect = elem.getBoundingClientRect();
            win = elem.ownerDocument.defaultView;
            return {
                top: rect.top + win.pageYOffset,
                left: rect.left + win.pageXOffset
            };
        },

        // position() relates an element's margin box to its offset parent's padding box
        // This corresponds to the behavior of CSS absolute positioning
        position: function() {
            if ( !this[ 0 ] ) {
                return;
            }

            var offsetParent, offset, doc,
                elem = this[ 0 ],
                parentOffset = { top: 0, left: 0 };

            // position:fixed elements are offset from the viewport, which itself always has zero offset
            if ( jQuery.css( elem, "position" ) === "fixed" ) {

                // Assume position:fixed implies availability of getBoundingClientRect
                offset = elem.getBoundingClientRect();

            } else {
                offset = this.offset();

                // Account for the *real* offset parent, which can be the document or its root element
                // when a statically positioned element is identified
                doc = elem.ownerDocument;
                offsetParent = elem.offsetParent || doc.documentElement;
                while ( offsetParent &&
                ( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
                jQuery.css( offsetParent, "position" ) === "static" ) {

                    offsetParent = offsetParent.parentNode;
                }
                if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

                    // Incorporate borders into its offset, since they are outside its content origin
                    parentOffset = jQuery( offsetParent ).offset();
                    parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
                    parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
                }
            }

            // Subtract parent offsets and element margins
            return {
                top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
                left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
            };
        },

        // This method will return documentElement in the following cases:
        // 1) For the element inside the iframe without offsetParent, this method will return
        //    documentElement of the parent window
        // 2) For the hidden or detached element
        // 3) For body or html element, i.e. in case of the html node - it will return itself
        //
        // but those exceptions were never presented as a real life use-cases
        // and might be considered as more preferable results.
        //
        // This logic, however, is not guaranteed and can change at any point in the future
        offsetParent: function() {
            return this.map( function() {
                var offsetParent = this.offsetParent;

                while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
                    offsetParent = offsetParent.offsetParent;
                }

                return offsetParent || documentElement;
            } );
        }
    } );

// Create scrollLeft and scrollTop methods
    jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
        var top = "pageYOffset" === prop;

        jQuery.fn[ method ] = function( val ) {
            return access( this, function( elem, method, val ) {

                // Coalesce documents and windows
                var win;
                if ( isWindow( elem ) ) {
                    win = elem;
                } else if ( elem.nodeType === 9 ) {
                    win = elem.defaultView;
                }

                if ( val === undefined ) {
                    return win ? win[ prop ] : elem[ method ];
                }

                if ( win ) {
                    win.scrollTo(
                        !top ? val : win.pageXOffset,
                        top ? val : win.pageYOffset
                    );

                } else {
                    elem[ method ] = val;
                }
            }, method, val, arguments.length );
        };
    } );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
    jQuery.each( [ "top", "left" ], function( i, prop ) {
        jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
            function( elem, computed ) {
                if ( computed ) {
                    computed = curCSS( elem, prop );

                    // If curCSS returns percentage, fallback to offset
                    return rnumnonpx.test( computed ) ?
                        jQuery( elem ).position()[ prop ] + "px" :
                        computed;
                }
            }
        );
    } );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
        jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
            function( defaultExtra, funcName ) {

                // Margin is only for outerHeight, outerWidth
                jQuery.fn[ funcName ] = function( margin, value ) {
                    var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
                        extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

                    return access( this, function( elem, type, value ) {
                        var doc;

                        if ( isWindow( elem ) ) {

                            // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
                            return funcName.indexOf( "outer" ) === 0 ?
                                elem[ "inner" + name ] :
                                elem.document.documentElement[ "client" + name ];
                        }

                        // Get document width or height
                        if ( elem.nodeType === 9 ) {
                            doc = elem.documentElement;

                            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                            // whichever is greatest
                            return Math.max(
                                elem.body[ "scroll" + name ], doc[ "scroll" + name ],
                                elem.body[ "offset" + name ], doc[ "offset" + name ],
                                doc[ "client" + name ]
                            );
                        }

                        return value === undefined ?

                            // Get width or height on the element, requesting but not forcing parseFloat
                            jQuery.css( elem, type, extra ) :

                            // Set width or height on the element
                            jQuery.style( elem, type, value, extra );
                    }, type, chainable ? margin : undefined, chainable );
                };
            } );
    } );


    jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup contextmenu" ).split( " " ),
        function( i, name ) {

            // Handle event binding
            jQuery.fn[ name ] = function( data, fn ) {
                return arguments.length > 0 ?
                    this.on( name, null, data, fn ) :
                    this.trigger( name );
            };
        } );

    jQuery.fn.extend( {
        hover: function( fnOver, fnOut ) {
            return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
        }
    } );




    jQuery.fn.extend( {

        bind: function( types, data, fn ) {
            return this.on( types, null, data, fn );
        },
        unbind: function( types, fn ) {
            return this.off( types, null, fn );
        },

        delegate: function( selector, types, data, fn ) {
            return this.on( types, selector, data, fn );
        },
        undelegate: function( selector, types, fn ) {

            // ( namespace ) or ( selector, types [, fn] )
            return arguments.length === 1 ?
                this.off( selector, "**" ) :
                this.off( types, selector || "**", fn );
        }
    } );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
    jQuery.proxy = function( fn, context ) {
        var tmp, args, proxy;

        if ( typeof context === "string" ) {
            tmp = fn[ context ];
            context = fn;
            fn = tmp;
        }

        // Quick check to determine if target is callable, in the spec
        // this throws a TypeError, but we will just return undefined.
        if ( !isFunction( fn ) ) {
            return undefined;
        }

        // Simulated bind
        args = slice.call( arguments, 2 );
        proxy = function() {
            return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
        };

        // Set the guid of unique handler to the same of original handler, so it can be removed
        proxy.guid = fn.guid = fn.guid || jQuery.guid++;

        return proxy;
    };

    jQuery.holdReady = function( hold ) {
        if ( hold ) {
            jQuery.readyWait++;
        } else {
            jQuery.ready( true );
        }
    };
    jQuery.isArray = Array.isArray;
    jQuery.parseJSON = JSON.parse;
    jQuery.nodeName = nodeName;
    jQuery.isFunction = isFunction;
    jQuery.isWindow = isWindow;
    jQuery.camelCase = camelCase;
    jQuery.type = toType;

    jQuery.now = Date.now;

    jQuery.isNumeric = function( obj ) {

        // As of jQuery 3.0, isNumeric is limited to
        // strings and numbers (primitives or objects)
        // that can be coerced to finite numbers (gh-2662)
        var type = jQuery.type( obj );
        return ( type === "number" || type === "string" ) &&

            // parseFloat NaNs numeric-cast false positives ("")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            !isNaN( obj - parseFloat( obj ) );
    };




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

    if ( typeof define === "function" && define.amd ) {
        define( "jquery", [], function() {
            return jQuery;
        } );
    }




    var

        // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,

        // Map over the $ in case of overwrite
        _$ = window.$;

    jQuery.noConflict = function( deep ) {
        if ( window.$ === jQuery ) {
            window.$ = _$;
        }

        if ( deep && window.jQuery === jQuery ) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    };

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
    if ( !noGlobal ) {
        window.jQuery = window.$ = jQuery;
    }




    return jQuery;
} );
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAxLWpxdWVyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY29tcG9uZW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGpRdWVyeSBpbiBoZXJlXG4vKiFcbiAqIGpRdWVyeSBKYXZhU2NyaXB0IExpYnJhcnkgdjMuMy4xXG4gKiBodHRwczovL2pxdWVyeS5jb20vXG4gKlxuICogSW5jbHVkZXMgU2l6emxlLmpzXG4gKiBodHRwczovL3NpenpsZWpzLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgSlMgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogRGF0ZTogMjAxOC0wMS0yMFQxNzoyNFpcbiAqL1xuKCBmdW5jdGlvbiggZ2xvYmFsLCBmYWN0b3J5ICkge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiICkge1xuXG4gICAgICAgIC8vIEZvciBDb21tb25KUyBhbmQgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgd2hlcmUgYSBwcm9wZXIgYHdpbmRvd2BcbiAgICAgICAgLy8gaXMgcHJlc2VudCwgZXhlY3V0ZSB0aGUgZmFjdG9yeSBhbmQgZ2V0IGpRdWVyeS5cbiAgICAgICAgLy8gRm9yIGVudmlyb25tZW50cyB0aGF0IGRvIG5vdCBoYXZlIGEgYHdpbmRvd2Agd2l0aCBhIGBkb2N1bWVudGBcbiAgICAgICAgLy8gKHN1Y2ggYXMgTm9kZS5qcyksIGV4cG9zZSBhIGZhY3RvcnkgYXMgbW9kdWxlLmV4cG9ydHMuXG4gICAgICAgIC8vIFRoaXMgYWNjZW50dWF0ZXMgdGhlIG5lZWQgZm9yIHRoZSBjcmVhdGlvbiBvZiBhIHJlYWwgYHdpbmRvd2AuXG4gICAgICAgIC8vIGUuZy4gdmFyIGpRdWVyeSA9IHJlcXVpcmUoXCJqcXVlcnlcIikod2luZG93KTtcbiAgICAgICAgLy8gU2VlIHRpY2tldCAjMTQ1NDkgZm9yIG1vcmUgaW5mby5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWwuZG9jdW1lbnQgP1xuICAgICAgICAgICAgZmFjdG9yeSggZ2xvYmFsLCB0cnVlICkgOlxuICAgICAgICAgICAgZnVuY3Rpb24oIHcgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhdy5kb2N1bWVudCApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCBcImpRdWVyeSByZXF1aXJlcyBhIHdpbmRvdyB3aXRoIGEgZG9jdW1lbnRcIiApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFjdG9yeSggdyApO1xuICAgICAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmYWN0b3J5KCBnbG9iYWwgKTtcbiAgICB9XG5cbi8vIFBhc3MgdGhpcyBpZiB3aW5kb3cgaXMgbm90IGRlZmluZWQgeWV0XG59ICkoIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB0aGlzLCBmdW5jdGlvbiggd2luZG93LCBub0dsb2JhbCApIHtcblxuLy8gRWRnZSA8PSAxMiAtIDEzKywgRmlyZWZveCA8PTE4IC0gNDUrLCBJRSAxMCAtIDExLCBTYWZhcmkgNS4xIC0gOSssIGlPUyA2IC0gOS4xXG4vLyB0aHJvdyBleGNlcHRpb25zIHdoZW4gbm9uLXN0cmljdCBjb2RlIChlLmcuLCBBU1AuTkVUIDQuNSkgYWNjZXNzZXMgc3RyaWN0IG1vZGVcbi8vIGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyICh0cmFjLTEzMzM1KS4gQnV0IGFzIG9mIGpRdWVyeSAzLjAgKDIwMTYpLCBzdHJpY3QgbW9kZSBzaG91bGQgYmUgY29tbW9uXG4vLyBlbm91Z2ggdGhhdCBhbGwgc3VjaCBhdHRlbXB0cyBhcmUgZ3VhcmRlZCBpbiBhIHRyeSBibG9jay5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBhcnIgPSBbXTtcblxuICAgIHZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcblxuICAgIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcblxuICAgIHZhciBzbGljZSA9IGFyci5zbGljZTtcblxuICAgIHZhciBjb25jYXQgPSBhcnIuY29uY2F0O1xuXG4gICAgdmFyIHB1c2ggPSBhcnIucHVzaDtcblxuICAgIHZhciBpbmRleE9mID0gYXJyLmluZGV4T2Y7XG5cbiAgICB2YXIgY2xhc3MydHlwZSA9IHt9O1xuXG4gICAgdmFyIHRvU3RyaW5nID0gY2xhc3MydHlwZS50b1N0cmluZztcblxuICAgIHZhciBoYXNPd24gPSBjbGFzczJ0eXBlLmhhc093blByb3BlcnR5O1xuXG4gICAgdmFyIGZuVG9TdHJpbmcgPSBoYXNPd24udG9TdHJpbmc7XG5cbiAgICB2YXIgT2JqZWN0RnVuY3Rpb25TdHJpbmcgPSBmblRvU3RyaW5nLmNhbGwoIE9iamVjdCApO1xuXG4gICAgdmFyIHN1cHBvcnQgPSB7fTtcblxuICAgIHZhciBpc0Z1bmN0aW9uID0gZnVuY3Rpb24gaXNGdW5jdGlvbiggb2JqICkge1xuXG4gICAgICAgIC8vIFN1cHBvcnQ6IENocm9tZSA8PTU3LCBGaXJlZm94IDw9NTJcbiAgICAgICAgLy8gSW4gc29tZSBicm93c2VycywgdHlwZW9mIHJldHVybnMgXCJmdW5jdGlvblwiIGZvciBIVE1MIDxvYmplY3Q+IGVsZW1lbnRzXG4gICAgICAgIC8vIChpLmUuLCBgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwib2JqZWN0XCIgKSA9PT0gXCJmdW5jdGlvblwiYCkuXG4gICAgICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gY2xhc3NpZnkgKmFueSogRE9NIG5vZGUgYXMgYSBmdW5jdGlvbi5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2Ygb2JqLm5vZGVUeXBlICE9PSBcIm51bWJlclwiO1xuICAgIH07XG5cblxuICAgIHZhciBpc1dpbmRvdyA9IGZ1bmN0aW9uIGlzV2luZG93KCBvYmogKSB7XG4gICAgICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT09IG9iai53aW5kb3c7XG4gICAgfTtcblxuXG5cblxuICAgIHZhciBwcmVzZXJ2ZWRTY3JpcHRBdHRyaWJ1dGVzID0ge1xuICAgICAgICB0eXBlOiB0cnVlLFxuICAgICAgICBzcmM6IHRydWUsXG4gICAgICAgIG5vTW9kdWxlOiB0cnVlXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIERPTUV2YWwoIGNvZGUsIGRvYywgbm9kZSApIHtcbiAgICAgICAgZG9jID0gZG9jIHx8IGRvY3VtZW50O1xuXG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoIFwic2NyaXB0XCIgKTtcblxuICAgICAgICBzY3JpcHQudGV4dCA9IGNvZGU7XG4gICAgICAgIGlmICggbm9kZSApIHtcbiAgICAgICAgICAgIGZvciAoIGkgaW4gcHJlc2VydmVkU2NyaXB0QXR0cmlidXRlcyApIHtcbiAgICAgICAgICAgICAgICBpZiAoIG5vZGVbIGkgXSApIHtcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0WyBpIF0gPSBub2RlWyBpIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRvYy5oZWFkLmFwcGVuZENoaWxkKCBzY3JpcHQgKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBzY3JpcHQgKTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHRvVHlwZSggb2JqICkge1xuICAgICAgICBpZiAoIG9iaiA9PSBudWxsICkge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiArIFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdXBwb3J0OiBBbmRyb2lkIDw9Mi4zIG9ubHkgKGZ1bmN0aW9uaXNoIFJlZ0V4cClcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiID9cbiAgICAgICAgICAgIGNsYXNzMnR5cGVbIHRvU3RyaW5nLmNhbGwoIG9iaiApIF0gfHwgXCJvYmplY3RcIiA6XG4gICAgICAgICAgICB0eXBlb2Ygb2JqO1xuICAgIH1cbiAgICAvKiBnbG9iYWwgU3ltYm9sICovXG4vLyBEZWZpbmluZyB0aGlzIGdsb2JhbCBpbiAuZXNsaW50cmMuanNvbiB3b3VsZCBjcmVhdGUgYSBkYW5nZXIgb2YgdXNpbmcgdGhlIGdsb2JhbFxuLy8gdW5ndWFyZGVkIGluIGFub3RoZXIgcGxhY2UsIGl0IHNlZW1zIHNhZmVyIHRvIGRlZmluZSBnbG9iYWwgb25seSBmb3IgdGhpcyBtb2R1bGVcblxuXG5cbiAgICB2YXJcbiAgICAgICAgdmVyc2lvbiA9IFwiMy4zLjFcIixcblxuICAgICAgICAvLyBEZWZpbmUgYSBsb2NhbCBjb3B5IG9mIGpRdWVyeVxuICAgICAgICBqUXVlcnkgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQgKSB7XG5cbiAgICAgICAgICAgIC8vIFRoZSBqUXVlcnkgb2JqZWN0IGlzIGFjdHVhbGx5IGp1c3QgdGhlIGluaXQgY29uc3RydWN0b3IgJ2VuaGFuY2VkJ1xuICAgICAgICAgICAgLy8gTmVlZCBpbml0IGlmIGpRdWVyeSBpcyBjYWxsZWQgKGp1c3QgYWxsb3cgZXJyb3IgdG8gYmUgdGhyb3duIGlmIG5vdCBpbmNsdWRlZClcbiAgICAgICAgICAgIHJldHVybiBuZXcgalF1ZXJ5LmZuLmluaXQoIHNlbGVjdG9yLCBjb250ZXh0ICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSB0cmltIEJPTSBhbmQgTkJTUFxuICAgICAgICBydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZztcblxuICAgIGpRdWVyeS5mbiA9IGpRdWVyeS5wcm90b3R5cGUgPSB7XG5cbiAgICAgICAgLy8gVGhlIGN1cnJlbnQgdmVyc2lvbiBvZiBqUXVlcnkgYmVpbmcgdXNlZFxuICAgICAgICBqcXVlcnk6IHZlcnNpb24sXG5cbiAgICAgICAgY29uc3RydWN0b3I6IGpRdWVyeSxcblxuICAgICAgICAvLyBUaGUgZGVmYXVsdCBsZW5ndGggb2YgYSBqUXVlcnkgb2JqZWN0IGlzIDBcbiAgICAgICAgbGVuZ3RoOiAwLFxuXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHNsaWNlLmNhbGwoIHRoaXMgKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBHZXQgdGhlIE50aCBlbGVtZW50IGluIHRoZSBtYXRjaGVkIGVsZW1lbnQgc2V0IE9SXG4gICAgICAgIC8vIEdldCB0aGUgd2hvbGUgbWF0Y2hlZCBlbGVtZW50IHNldCBhcyBhIGNsZWFuIGFycmF5XG4gICAgICAgIGdldDogZnVuY3Rpb24oIG51bSApIHtcblxuICAgICAgICAgICAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgaW4gYSBjbGVhbiBhcnJheVxuICAgICAgICAgICAgaWYgKCBudW0gPT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2xpY2UuY2FsbCggdGhpcyApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZXR1cm4ganVzdCB0aGUgb25lIGVsZW1lbnQgZnJvbSB0aGUgc2V0XG4gICAgICAgICAgICByZXR1cm4gbnVtIDwgMCA/IHRoaXNbIG51bSArIHRoaXMubGVuZ3RoIF0gOiB0aGlzWyBudW0gXTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUYWtlIGFuIGFycmF5IG9mIGVsZW1lbnRzIGFuZCBwdXNoIGl0IG9udG8gdGhlIHN0YWNrXG4gICAgICAgIC8vIChyZXR1cm5pbmcgdGhlIG5ldyBtYXRjaGVkIGVsZW1lbnQgc2V0KVxuICAgICAgICBwdXNoU3RhY2s6IGZ1bmN0aW9uKCBlbGVtcyApIHtcblxuICAgICAgICAgICAgLy8gQnVpbGQgYSBuZXcgalF1ZXJ5IG1hdGNoZWQgZWxlbWVudCBzZXRcbiAgICAgICAgICAgIHZhciByZXQgPSBqUXVlcnkubWVyZ2UoIHRoaXMuY29uc3RydWN0b3IoKSwgZWxlbXMgKTtcblxuICAgICAgICAgICAgLy8gQWRkIHRoZSBvbGQgb2JqZWN0IG9udG8gdGhlIHN0YWNrIChhcyBhIHJlZmVyZW5jZSlcbiAgICAgICAgICAgIHJldC5wcmV2T2JqZWN0ID0gdGhpcztcblxuICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBuZXdseS1mb3JtZWQgZWxlbWVudCBzZXRcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gRXhlY3V0ZSBhIGNhbGxiYWNrIGZvciBldmVyeSBlbGVtZW50IGluIHRoZSBtYXRjaGVkIHNldC5cbiAgICAgICAgZWFjaDogZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5lYWNoKCB0aGlzLCBjYWxsYmFjayApO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1hcDogZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkubWFwKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2suY2FsbCggZWxlbSwgaSwgZWxlbSApO1xuICAgICAgICAgICAgfSApICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2xpY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKCBzbGljZS5hcHBseSggdGhpcywgYXJndW1lbnRzICkgKTtcbiAgICAgICAgfSxcblxuICAgICAgICBmaXJzdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lcSggMCApO1xuICAgICAgICB9LFxuXG4gICAgICAgIGxhc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXEoIC0xICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZXE6IGZ1bmN0aW9uKCBpICkge1xuICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGogPSAraSArICggaSA8IDAgPyBsZW4gOiAwICk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2soIGogPj0gMCAmJiBqIDwgbGVuID8gWyB0aGlzWyBqIF0gXSA6IFtdICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZPYmplY3QgfHwgdGhpcy5jb25zdHJ1Y3RvcigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cbiAgICAgICAgLy8gQmVoYXZlcyBsaWtlIGFuIEFycmF5J3MgbWV0aG9kLCBub3QgbGlrZSBhIGpRdWVyeSBtZXRob2QuXG4gICAgICAgIHB1c2g6IHB1c2gsXG4gICAgICAgIHNvcnQ6IGFyci5zb3J0LFxuICAgICAgICBzcGxpY2U6IGFyci5zcGxpY2VcbiAgICB9O1xuXG4gICAgalF1ZXJ5LmV4dGVuZCA9IGpRdWVyeS5mbi5leHRlbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuICAgICAgICAgICAgdGFyZ2V0ID0gYXJndW1lbnRzWyAwIF0gfHwge30sXG4gICAgICAgICAgICBpID0gMSxcbiAgICAgICAgICAgIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG4gICAgICAgICAgICBkZWVwID0gZmFsc2U7XG5cbiAgICAgICAgLy8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuICAgICAgICBpZiAoIHR5cGVvZiB0YXJnZXQgPT09IFwiYm9vbGVhblwiICkge1xuICAgICAgICAgICAgZGVlcCA9IHRhcmdldDtcblxuICAgICAgICAgICAgLy8gU2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuICAgICAgICAgICAgdGFyZ2V0ID0gYXJndW1lbnRzWyBpIF0gfHwge307XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIYW5kbGUgY2FzZSB3aGVuIHRhcmdldCBpcyBhIHN0cmluZyBvciBzb21ldGhpbmcgKHBvc3NpYmxlIGluIGRlZXAgY29weSlcbiAgICAgICAgaWYgKCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiICYmICFpc0Z1bmN0aW9uKCB0YXJnZXQgKSApIHtcbiAgICAgICAgICAgIHRhcmdldCA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRXh0ZW5kIGpRdWVyeSBpdHNlbGYgaWYgb25seSBvbmUgYXJndW1lbnQgaXMgcGFzc2VkXG4gICAgICAgIGlmICggaSA9PT0gbGVuZ3RoICkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGhpcztcbiAgICAgICAgICAgIGktLTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXG4gICAgICAgICAgICAvLyBPbmx5IGRlYWwgd2l0aCBub24tbnVsbC91bmRlZmluZWQgdmFsdWVzXG4gICAgICAgICAgICBpZiAoICggb3B0aW9ucyA9IGFyZ3VtZW50c1sgaSBdICkgIT0gbnVsbCApIHtcblxuICAgICAgICAgICAgICAgIC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3RcbiAgICAgICAgICAgICAgICBmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNyYyA9IHRhcmdldFsgbmFtZSBdO1xuICAgICAgICAgICAgICAgICAgICBjb3B5ID0gb3B0aW9uc1sgbmFtZSBdO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3BcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0YXJnZXQgPT09IGNvcHkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlY3Vyc2UgaWYgd2UncmUgbWVyZ2luZyBwbGFpbiBvYmplY3RzIG9yIGFycmF5c1xuICAgICAgICAgICAgICAgICAgICBpZiAoIGRlZXAgJiYgY29weSAmJiAoIGpRdWVyeS5pc1BsYWluT2JqZWN0KCBjb3B5ICkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIGNvcHlJc0FycmF5ID0gQXJyYXkuaXNBcnJheSggY29weSApICkgKSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBjb3B5SXNBcnJheSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3B5SXNBcnJheSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lID0gc3JjICYmIEFycmF5LmlzQXJyYXkoIHNyYyApID8gc3JjIDogW107XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmUgPSBzcmMgJiYgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIHNyYyApID8gc3JjIDoge307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0WyBuYW1lIF0gPSBqUXVlcnkuZXh0ZW5kKCBkZWVwLCBjbG9uZSwgY29weSApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIGNvcHkgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFsgbmFtZSBdID0gY29weTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfTtcblxuICAgIGpRdWVyeS5leHRlbmQoIHtcblxuICAgICAgICAvLyBVbmlxdWUgZm9yIGVhY2ggY29weSBvZiBqUXVlcnkgb24gdGhlIHBhZ2VcbiAgICAgICAgZXhwYW5kbzogXCJqUXVlcnlcIiArICggdmVyc2lvbiArIE1hdGgucmFuZG9tKCkgKS5yZXBsYWNlKCAvXFxEL2csIFwiXCIgKSxcblxuICAgICAgICAvLyBBc3N1bWUgalF1ZXJ5IGlzIHJlYWR5IHdpdGhvdXQgdGhlIHJlYWR5IG1vZHVsZVxuICAgICAgICBpc1JlYWR5OiB0cnVlLFxuXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiggbXNnICkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCBtc2cgKTtcbiAgICAgICAgfSxcblxuICAgICAgICBub29wOiBmdW5jdGlvbigpIHt9LFxuXG4gICAgICAgIGlzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XG4gICAgICAgICAgICB2YXIgcHJvdG8sIEN0b3I7XG5cbiAgICAgICAgICAgIC8vIERldGVjdCBvYnZpb3VzIG5lZ2F0aXZlc1xuICAgICAgICAgICAgLy8gVXNlIHRvU3RyaW5nIGluc3RlYWQgb2YgalF1ZXJ5LnR5cGUgdG8gY2F0Y2ggaG9zdCBvYmplY3RzXG4gICAgICAgICAgICBpZiAoICFvYmogfHwgdG9TdHJpbmcuY2FsbCggb2JqICkgIT09IFwiW29iamVjdCBPYmplY3RdXCIgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcm90byA9IGdldFByb3RvKCBvYmogKTtcblxuICAgICAgICAgICAgLy8gT2JqZWN0cyB3aXRoIG5vIHByb3RvdHlwZSAoZS5nLiwgYE9iamVjdC5jcmVhdGUoIG51bGwgKWApIGFyZSBwbGFpblxuICAgICAgICAgICAgaWYgKCAhcHJvdG8gKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE9iamVjdHMgd2l0aCBwcm90b3R5cGUgYXJlIHBsYWluIGlmZiB0aGV5IHdlcmUgY29uc3RydWN0ZWQgYnkgYSBnbG9iYWwgT2JqZWN0IGZ1bmN0aW9uXG4gICAgICAgICAgICBDdG9yID0gaGFzT3duLmNhbGwoIHByb3RvLCBcImNvbnN0cnVjdG9yXCIgKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgQ3RvciA9PT0gXCJmdW5jdGlvblwiICYmIGZuVG9TdHJpbmcuY2FsbCggQ3RvciApID09PSBPYmplY3RGdW5jdGlvblN0cmluZztcbiAgICAgICAgfSxcblxuICAgICAgICBpc0VtcHR5T2JqZWN0OiBmdW5jdGlvbiggb2JqICkge1xuXG4gICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lc2xpbnQvZXNsaW50L2lzc3Vlcy82MTI1XG4gICAgICAgICAgICB2YXIgbmFtZTtcblxuICAgICAgICAgICAgZm9yICggbmFtZSBpbiBvYmogKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gRXZhbHVhdGVzIGEgc2NyaXB0IGluIGEgZ2xvYmFsIGNvbnRleHRcbiAgICAgICAgZ2xvYmFsRXZhbDogZnVuY3Rpb24oIGNvZGUgKSB7XG4gICAgICAgICAgICBET01FdmFsKCBjb2RlICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZWFjaDogZnVuY3Rpb24oIG9iaiwgY2FsbGJhY2sgKSB7XG4gICAgICAgICAgICB2YXIgbGVuZ3RoLCBpID0gMDtcblxuICAgICAgICAgICAgaWYgKCBpc0FycmF5TGlrZSggb2JqICkgKSB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBjYWxsYmFjay5jYWxsKCBvYmpbIGkgXSwgaSwgb2JqWyBpIF0gKSA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yICggaSBpbiBvYmogKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggY2FsbGJhY2suY2FsbCggb2JqWyBpIF0sIGksIG9ialsgaSBdICkgPT09IGZhbHNlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5XG4gICAgICAgIHRyaW06IGZ1bmN0aW9uKCB0ZXh0ICkge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQgPT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgXCJcIiA6XG4gICAgICAgICAgICAgICAgKCB0ZXh0ICsgXCJcIiApLnJlcGxhY2UoIHJ0cmltLCBcIlwiICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gcmVzdWx0cyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuICAgICAgICBtYWtlQXJyYXk6IGZ1bmN0aW9uKCBhcnIsIHJlc3VsdHMgKSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0gcmVzdWx0cyB8fCBbXTtcblxuICAgICAgICAgICAgaWYgKCBhcnIgIT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgICBpZiAoIGlzQXJyYXlMaWtlKCBPYmplY3QoIGFyciApICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5tZXJnZSggcmV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGFyciA9PT0gXCJzdHJpbmdcIiA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWyBhcnIgXSA6IGFyclxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHB1c2guY2FsbCggcmV0LCBhcnIgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5BcnJheTogZnVuY3Rpb24oIGVsZW0sIGFyciwgaSApIHtcbiAgICAgICAgICAgIHJldHVybiBhcnIgPT0gbnVsbCA/IC0xIDogaW5kZXhPZi5jYWxsKCBhcnIsIGVsZW0sIGkgKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcbiAgICAgICAgLy8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuICAgICAgICBtZXJnZTogZnVuY3Rpb24oIGZpcnN0LCBzZWNvbmQgKSB7XG4gICAgICAgICAgICB2YXIgbGVuID0gK3NlY29uZC5sZW5ndGgsXG4gICAgICAgICAgICAgICAgaiA9IDAsXG4gICAgICAgICAgICAgICAgaSA9IGZpcnN0Lmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yICggOyBqIDwgbGVuOyBqKysgKSB7XG4gICAgICAgICAgICAgICAgZmlyc3RbIGkrKyBdID0gc2Vjb25kWyBqIF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpcnN0Lmxlbmd0aCA9IGk7XG5cbiAgICAgICAgICAgIHJldHVybiBmaXJzdDtcbiAgICAgICAgfSxcblxuICAgICAgICBncmVwOiBmdW5jdGlvbiggZWxlbXMsIGNhbGxiYWNrLCBpbnZlcnQgKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2tJbnZlcnNlLFxuICAgICAgICAgICAgICAgIG1hdGNoZXMgPSBbXSxcbiAgICAgICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgICAgICBsZW5ndGggPSBlbGVtcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tFeHBlY3QgPSAhaW52ZXJ0O1xuXG4gICAgICAgICAgICAvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgb25seSBzYXZpbmcgdGhlIGl0ZW1zXG4gICAgICAgICAgICAvLyB0aGF0IHBhc3MgdGhlIHZhbGlkYXRvciBmdW5jdGlvblxuICAgICAgICAgICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tJbnZlcnNlID0gIWNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpICk7XG4gICAgICAgICAgICAgICAgaWYgKCBjYWxsYmFja0ludmVyc2UgIT09IGNhbGxiYWNrRXhwZWN0ICkge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVzLnB1c2goIGVsZW1zWyBpIF0gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGFyZyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuICAgICAgICBtYXA6IGZ1bmN0aW9uKCBlbGVtcywgY2FsbGJhY2ssIGFyZyApIHtcbiAgICAgICAgICAgIHZhciBsZW5ndGgsIHZhbHVlLFxuICAgICAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgICAgIHJldCA9IFtdO1xuXG4gICAgICAgICAgICAvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgdHJhbnNsYXRpbmcgZWFjaCBvZiB0aGUgaXRlbXMgdG8gdGhlaXIgbmV3IHZhbHVlc1xuICAgICAgICAgICAgaWYgKCBpc0FycmF5TGlrZSggZWxlbXMgKSApIHtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSBlbGVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2soIGVsZW1zWyBpIF0sIGksIGFyZyApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggdmFsdWUgIT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldC5wdXNoKCB2YWx1ZSApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gR28gdGhyb3VnaCBldmVyeSBrZXkgb24gdGhlIG9iamVjdCxcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yICggaSBpbiBlbGVtcyApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCB2YWx1ZSAhPSBudWxsICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0LnB1c2goIHZhbHVlICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEZsYXR0ZW4gYW55IG5lc3RlZCBhcnJheXNcbiAgICAgICAgICAgIHJldHVybiBjb25jYXQuYXBwbHkoIFtdLCByZXQgKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBBIGdsb2JhbCBHVUlEIGNvdW50ZXIgZm9yIG9iamVjdHNcbiAgICAgICAgZ3VpZDogMSxcblxuICAgICAgICAvLyBqUXVlcnkuc3VwcG9ydCBpcyBub3QgdXNlZCBpbiBDb3JlIGJ1dCBvdGhlciBwcm9qZWN0cyBhdHRhY2ggdGhlaXJcbiAgICAgICAgLy8gcHJvcGVydGllcyB0byBpdCBzbyBpdCBuZWVkcyB0byBleGlzdC5cbiAgICAgICAgc3VwcG9ydDogc3VwcG9ydFxuICAgIH0gKTtcblxuICAgIGlmICggdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICkge1xuICAgICAgICBqUXVlcnkuZm5bIFN5bWJvbC5pdGVyYXRvciBdID0gYXJyWyBTeW1ib2wuaXRlcmF0b3IgXTtcbiAgICB9XG5cbi8vIFBvcHVsYXRlIHRoZSBjbGFzczJ0eXBlIG1hcFxuICAgIGpRdWVyeS5lYWNoKCBcIkJvb2xlYW4gTnVtYmVyIFN0cmluZyBGdW5jdGlvbiBBcnJheSBEYXRlIFJlZ0V4cCBPYmplY3QgRXJyb3IgU3ltYm9sXCIuc3BsaXQoIFwiIFwiICksXG4gICAgICAgIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuICAgICAgICAgICAgY2xhc3MydHlwZVsgXCJbb2JqZWN0IFwiICsgbmFtZSArIFwiXVwiIF0gPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0gKTtcblxuICAgIGZ1bmN0aW9uIGlzQXJyYXlMaWtlKCBvYmogKSB7XG5cbiAgICAgICAgLy8gU3VwcG9ydDogcmVhbCBpT1MgOC4yIG9ubHkgKG5vdCByZXByb2R1Y2libGUgaW4gc2ltdWxhdG9yKVxuICAgICAgICAvLyBgaW5gIGNoZWNrIHVzZWQgdG8gcHJldmVudCBKSVQgZXJyb3IgKGdoLTIxNDUpXG4gICAgICAgIC8vIGhhc093biBpc24ndCB1c2VkIGhlcmUgZHVlIHRvIGZhbHNlIG5lZ2F0aXZlc1xuICAgICAgICAvLyByZWdhcmRpbmcgTm9kZWxpc3QgbGVuZ3RoIGluIElFXG4gICAgICAgIHZhciBsZW5ndGggPSAhIW9iaiAmJiBcImxlbmd0aFwiIGluIG9iaiAmJiBvYmoubGVuZ3RoLFxuICAgICAgICAgICAgdHlwZSA9IHRvVHlwZSggb2JqICk7XG5cbiAgICAgICAgaWYgKCBpc0Z1bmN0aW9uKCBvYmogKSB8fCBpc1dpbmRvdyggb2JqICkgKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHlwZSA9PT0gXCJhcnJheVwiIHx8IGxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgICAgdHlwZW9mIGxlbmd0aCA9PT0gXCJudW1iZXJcIiAmJiBsZW5ndGggPiAwICYmICggbGVuZ3RoIC0gMSApIGluIG9iajtcbiAgICB9XG4gICAgdmFyIFNpenpsZSA9XG4gICAgICAgIC8qIVxuICogU2l6emxlIENTUyBTZWxlY3RvciBFbmdpbmUgdjIuMy4zXG4gKiBodHRwczovL3NpenpsZWpzLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogRGF0ZTogMjAxNi0wOC0wOFxuICovXG4gICAgICAgIChmdW5jdGlvbiggd2luZG93ICkge1xuXG4gICAgICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgICAgICBzdXBwb3J0LFxuICAgICAgICAgICAgICAgIEV4cHIsXG4gICAgICAgICAgICAgICAgZ2V0VGV4dCxcbiAgICAgICAgICAgICAgICBpc1hNTCxcbiAgICAgICAgICAgICAgICB0b2tlbml6ZSxcbiAgICAgICAgICAgICAgICBjb21waWxlLFxuICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICBvdXRlcm1vc3RDb250ZXh0LFxuICAgICAgICAgICAgICAgIHNvcnRJbnB1dCxcbiAgICAgICAgICAgICAgICBoYXNEdXBsaWNhdGUsXG5cbiAgICAgICAgICAgICAgICAvLyBMb2NhbCBkb2N1bWVudCB2YXJzXG4gICAgICAgICAgICAgICAgc2V0RG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgZG9jRWxlbSxcbiAgICAgICAgICAgICAgICBkb2N1bWVudElzSFRNTCxcbiAgICAgICAgICAgICAgICByYnVnZ3lRU0EsXG4gICAgICAgICAgICAgICAgcmJ1Z2d5TWF0Y2hlcyxcbiAgICAgICAgICAgICAgICBtYXRjaGVzLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5zLFxuXG4gICAgICAgICAgICAgICAgLy8gSW5zdGFuY2Utc3BlY2lmaWMgZGF0YVxuICAgICAgICAgICAgICAgIGV4cGFuZG8gPSBcInNpenpsZVwiICsgMSAqIG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgcHJlZmVycmVkRG9jID0gd2luZG93LmRvY3VtZW50LFxuICAgICAgICAgICAgICAgIGRpcnJ1bnMgPSAwLFxuICAgICAgICAgICAgICAgIGRvbmUgPSAwLFxuICAgICAgICAgICAgICAgIGNsYXNzQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuICAgICAgICAgICAgICAgIHRva2VuQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuICAgICAgICAgICAgICAgIGNvbXBpbGVyQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuICAgICAgICAgICAgICAgIHNvcnRPcmRlciA9IGZ1bmN0aW9uKCBhLCBiICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIGEgPT09IGIgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNEdXBsaWNhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAvLyBJbnN0YW5jZSBtZXRob2RzXG4gICAgICAgICAgICAgICAgaGFzT3duID0gKHt9KS5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBhcnIgPSBbXSxcbiAgICAgICAgICAgICAgICBwb3AgPSBhcnIucG9wLFxuICAgICAgICAgICAgICAgIHB1c2hfbmF0aXZlID0gYXJyLnB1c2gsXG4gICAgICAgICAgICAgICAgcHVzaCA9IGFyci5wdXNoLFxuICAgICAgICAgICAgICAgIHNsaWNlID0gYXJyLnNsaWNlLFxuICAgICAgICAgICAgICAgIC8vIFVzZSBhIHN0cmlwcGVkLWRvd24gaW5kZXhPZiBhcyBpdCdzIGZhc3RlciB0aGFuIG5hdGl2ZVxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vanNwZXJmLmNvbS90aG9yLWluZGV4b2YtdnMtZm9yLzVcbiAgICAgICAgICAgICAgICBpbmRleE9mID0gZnVuY3Rpb24oIGxpc3QsIGVsZW0gKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9IGxpc3QubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbGlzdFtpXSA9PT0gZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGJvb2xlYW5zID0gXCJjaGVja2VkfHNlbGVjdGVkfGFzeW5jfGF1dG9mb2N1c3xhdXRvcGxheXxjb250cm9sc3xkZWZlcnxkaXNhYmxlZHxoaWRkZW58aXNtYXB8bG9vcHxtdWx0aXBsZXxvcGVufHJlYWRvbmx5fHJlcXVpcmVkfHNjb3BlZFwiLFxuXG4gICAgICAgICAgICAgICAgLy8gUmVndWxhciBleHByZXNzaW9uc1xuXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1zZWxlY3RvcnMvI3doaXRlc3BhY2VcbiAgICAgICAgICAgICAgICB3aGl0ZXNwYWNlID0gXCJbXFxcXHgyMFxcXFx0XFxcXHJcXFxcblxcXFxmXVwiLFxuXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvQ1NTMjEvc3luZGF0YS5odG1sI3ZhbHVlLWRlZi1pZGVudGlmaWVyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllciA9IFwiKD86XFxcXFxcXFwufFtcXFxcdy1dfFteXFwwLVxcXFx4YTBdKStcIixcblxuICAgICAgICAgICAgICAgIC8vIEF0dHJpYnV0ZSBzZWxlY3RvcnM6IGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jYXR0cmlidXRlLXNlbGVjdG9yc1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSBcIlxcXFxbXCIgKyB3aGl0ZXNwYWNlICsgXCIqKFwiICsgaWRlbnRpZmllciArIFwiKSg/OlwiICsgd2hpdGVzcGFjZSArXG4gICAgICAgICAgICAgICAgICAgIC8vIE9wZXJhdG9yIChjYXB0dXJlIDIpXG4gICAgICAgICAgICAgICAgICAgIFwiKihbKl4kfCF+XT89KVwiICsgd2hpdGVzcGFjZSArXG4gICAgICAgICAgICAgICAgICAgIC8vIFwiQXR0cmlidXRlIHZhbHVlcyBtdXN0IGJlIENTUyBpZGVudGlmaWVycyBbY2FwdHVyZSA1XSBvciBzdHJpbmdzIFtjYXB0dXJlIDMgb3IgY2FwdHVyZSA0XVwiXG4gICAgICAgICAgICAgICAgICAgIFwiKig/OicoKD86XFxcXFxcXFwufFteXFxcXFxcXFwnXSkqKSd8XFxcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXFxcXCJdKSopXFxcInwoXCIgKyBpZGVudGlmaWVyICsgXCIpKXwpXCIgKyB3aGl0ZXNwYWNlICtcbiAgICAgICAgICAgICAgICAgICAgXCIqXFxcXF1cIixcblxuICAgICAgICAgICAgICAgIHBzZXVkb3MgPSBcIjooXCIgKyBpZGVudGlmaWVyICsgXCIpKD86XFxcXCgoXCIgK1xuICAgICAgICAgICAgICAgICAgICAvLyBUbyByZWR1Y2UgdGhlIG51bWJlciBvZiBzZWxlY3RvcnMgbmVlZGluZyB0b2tlbml6ZSBpbiB0aGUgcHJlRmlsdGVyLCBwcmVmZXIgYXJndW1lbnRzOlxuICAgICAgICAgICAgICAgICAgICAvLyAxLiBxdW90ZWQgKGNhcHR1cmUgMzsgY2FwdHVyZSA0IG9yIGNhcHR1cmUgNSlcbiAgICAgICAgICAgICAgICAgICAgXCIoJygoPzpcXFxcXFxcXC58W15cXFxcXFxcXCddKSopJ3xcXFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcIl0pKilcXFwiKXxcIiArXG4gICAgICAgICAgICAgICAgICAgIC8vIDIuIHNpbXBsZSAoY2FwdHVyZSA2KVxuICAgICAgICAgICAgICAgICAgICBcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpW1xcXFxdXXxcIiArIGF0dHJpYnV0ZXMgKyBcIikqKXxcIiArXG4gICAgICAgICAgICAgICAgICAgIC8vIDMuIGFueXRoaW5nIGVsc2UgKGNhcHR1cmUgMilcbiAgICAgICAgICAgICAgICAgICAgXCIuKlwiICtcbiAgICAgICAgICAgICAgICAgICAgXCIpXFxcXCl8KVwiLFxuXG4gICAgICAgICAgICAgICAgLy8gTGVhZGluZyBhbmQgbm9uLWVzY2FwZWQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgY2FwdHVyaW5nIHNvbWUgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVycyBwcmVjZWRpbmcgdGhlIGxhdHRlclxuICAgICAgICAgICAgICAgIHJ3aGl0ZXNwYWNlID0gbmV3IFJlZ0V4cCggd2hpdGVzcGFjZSArIFwiK1wiLCBcImdcIiApLFxuICAgICAgICAgICAgICAgIHJ0cmltID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIrfCgoPzpefFteXFxcXFxcXFxdKSg/OlxcXFxcXFxcLikqKVwiICsgd2hpdGVzcGFjZSArIFwiKyRcIiwgXCJnXCIgKSxcblxuICAgICAgICAgICAgICAgIHJjb21tYSA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKixcIiArIHdoaXRlc3BhY2UgKyBcIipcIiApLFxuICAgICAgICAgICAgICAgIHJjb21iaW5hdG9ycyA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKihbPit+XXxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIHdoaXRlc3BhY2UgKyBcIipcIiApLFxuXG4gICAgICAgICAgICAgICAgcmF0dHJpYnV0ZVF1b3RlcyA9IG5ldyBSZWdFeHAoIFwiPVwiICsgd2hpdGVzcGFjZSArIFwiKihbXlxcXFxdJ1xcXCJdKj8pXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXF1cIiwgXCJnXCIgKSxcblxuICAgICAgICAgICAgICAgIHJwc2V1ZG8gPSBuZXcgUmVnRXhwKCBwc2V1ZG9zICksXG4gICAgICAgICAgICAgICAgcmlkZW50aWZpZXIgPSBuZXcgUmVnRXhwKCBcIl5cIiArIGlkZW50aWZpZXIgKyBcIiRcIiApLFxuXG4gICAgICAgICAgICAgICAgbWF0Y2hFeHByID0ge1xuICAgICAgICAgICAgICAgICAgICBcIklEXCI6IG5ldyBSZWdFeHAoIFwiXiMoXCIgKyBpZGVudGlmaWVyICsgXCIpXCIgKSxcbiAgICAgICAgICAgICAgICAgICAgXCJDTEFTU1wiOiBuZXcgUmVnRXhwKCBcIl5cXFxcLihcIiArIGlkZW50aWZpZXIgKyBcIilcIiApLFxuICAgICAgICAgICAgICAgICAgICBcIlRBR1wiOiBuZXcgUmVnRXhwKCBcIl4oXCIgKyBpZGVudGlmaWVyICsgXCJ8WypdKVwiICksXG4gICAgICAgICAgICAgICAgICAgIFwiQVRUUlwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIGF0dHJpYnV0ZXMgKSxcbiAgICAgICAgICAgICAgICAgICAgXCJQU0VVRE9cIjogbmV3IFJlZ0V4cCggXCJeXCIgKyBwc2V1ZG9zICksXG4gICAgICAgICAgICAgICAgICAgIFwiQ0hJTERcIjogbmV3IFJlZ0V4cCggXCJeOihvbmx5fGZpcnN0fGxhc3R8bnRofG50aC1sYXN0KS0oY2hpbGR8b2YtdHlwZSkoPzpcXFxcKFwiICsgd2hpdGVzcGFjZSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiooZXZlbnxvZGR8KChbKy1dfCkoXFxcXGQqKW58KVwiICsgd2hpdGVzcGFjZSArIFwiKig/OihbKy1dfClcIiArIHdoaXRlc3BhY2UgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIqKFxcXFxkKyl8KSlcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpXCIsIFwiaVwiICksXG4gICAgICAgICAgICAgICAgICAgIFwiYm9vbFwiOiBuZXcgUmVnRXhwKCBcIl4oPzpcIiArIGJvb2xlYW5zICsgXCIpJFwiLCBcImlcIiApLFxuICAgICAgICAgICAgICAgICAgICAvLyBGb3IgdXNlIGluIGxpYnJhcmllcyBpbXBsZW1lbnRpbmcgLmlzKClcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgdXNlIHRoaXMgZm9yIFBPUyBtYXRjaGluZyBpbiBgc2VsZWN0YFxuICAgICAgICAgICAgICAgICAgICBcIm5lZWRzQ29udGV4dFwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIipbPit+XXw6KGV2ZW58b2RkfGVxfGd0fGx0fG50aHxmaXJzdHxsYXN0KSg/OlxcXFwoXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpdGVzcGFjZSArIFwiKigoPzotXFxcXGQpP1xcXFxkKilcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpKD89W14tXXwkKVwiLCBcImlcIiApXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHJpbnB1dHMgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pLFxuICAgICAgICAgICAgICAgIHJoZWFkZXIgPSAvXmhcXGQkL2ksXG5cbiAgICAgICAgICAgICAgICBybmF0aXZlID0gL15bXntdK1xce1xccypcXFtuYXRpdmUgXFx3LyxcblxuICAgICAgICAgICAgICAgIC8vIEVhc2lseS1wYXJzZWFibGUvcmV0cmlldmFibGUgSUQgb3IgVEFHIG9yIENMQVNTIHNlbGVjdG9yc1xuICAgICAgICAgICAgICAgIHJxdWlja0V4cHIgPSAvXig/OiMoW1xcdy1dKyl8KFxcdyspfFxcLihbXFx3LV0rKSkkLyxcblxuICAgICAgICAgICAgICAgIHJzaWJsaW5nID0gL1srfl0vLFxuXG4gICAgICAgICAgICAgICAgLy8gQ1NTIGVzY2FwZXNcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9DU1MyMS9zeW5kYXRhLmh0bWwjZXNjYXBlZC1jaGFyYWN0ZXJzXG4gICAgICAgICAgICAgICAgcnVuZXNjYXBlID0gbmV3IFJlZ0V4cCggXCJcXFxcXFxcXChbXFxcXGRhLWZdezEsNn1cIiArIHdoaXRlc3BhY2UgKyBcIj98KFwiICsgd2hpdGVzcGFjZSArIFwiKXwuKVwiLCBcImlnXCIgKSxcbiAgICAgICAgICAgICAgICBmdW5lc2NhcGUgPSBmdW5jdGlvbiggXywgZXNjYXBlZCwgZXNjYXBlZFdoaXRlc3BhY2UgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoaWdoID0gXCIweFwiICsgZXNjYXBlZCAtIDB4MTAwMDA7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5hTiBtZWFucyBub24tY29kZXBvaW50XG4gICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IEZpcmVmb3g8MjRcbiAgICAgICAgICAgICAgICAgICAgLy8gV29ya2Fyb3VuZCBlcnJvbmVvdXMgbnVtZXJpYyBpbnRlcnByZXRhdGlvbiBvZiArXCIweFwiXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoaWdoICE9PSBoaWdoIHx8IGVzY2FwZWRXaGl0ZXNwYWNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGVzY2FwZWQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgaGlnaCA8IDAgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJNUCBjb2RlcG9pbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKCBoaWdoICsgMHgxMDAwMCApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwbGVtZW50YWwgUGxhbmUgY29kZXBvaW50IChzdXJyb2dhdGUgcGFpcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKCBoaWdoID4+IDEwIHwgMHhEODAwLCBoaWdoICYgMHgzRkYgfCAweERDMDAgKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgLy8gQ1NTIHN0cmluZy9pZGVudGlmaWVyIHNlcmlhbGl6YXRpb25cbiAgICAgICAgICAgICAgICAvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3Nzb20vI2NvbW1vbi1zZXJpYWxpemluZy1pZGlvbXNcbiAgICAgICAgICAgICAgICByY3NzZXNjYXBlID0gLyhbXFwwLVxceDFmXFx4N2ZdfF4tP1xcZCl8Xi0kfFteXFwwLVxceDFmXFx4N2YtXFx1RkZGRlxcdy1dL2csXG4gICAgICAgICAgICAgICAgZmNzc2VzY2FwZSA9IGZ1bmN0aW9uKCBjaCwgYXNDb2RlUG9pbnQgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggYXNDb2RlUG9pbnQgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFUrMDAwMCBOVUxMIGJlY29tZXMgVStGRkZEIFJFUExBQ0VNRU5UIENIQVJBQ1RFUlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBjaCA9PT0gXCJcXDBcIiApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcXHVGRkZEXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbnRyb2wgY2hhcmFjdGVycyBhbmQgKGRlcGVuZGVudCB1cG9uIHBvc2l0aW9uKSBudW1iZXJzIGdldCBlc2NhcGVkIGFzIGNvZGUgcG9pbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2guc2xpY2UoIDAsIC0xICkgKyBcIlxcXFxcIiArIGNoLmNoYXJDb2RlQXQoIGNoLmxlbmd0aCAtIDEgKS50b1N0cmluZyggMTYgKSArIFwiIFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXIgcG90ZW50aWFsbHktc3BlY2lhbCBBU0NJSSBjaGFyYWN0ZXJzIGdldCBiYWNrc2xhc2gtZXNjYXBlZFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcXFxcXCIgKyBjaDtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgLy8gVXNlZCBmb3IgaWZyYW1lc1xuICAgICAgICAgICAgICAgIC8vIFNlZSBzZXREb2N1bWVudCgpXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZpbmcgdGhlIGZ1bmN0aW9uIHdyYXBwZXIgY2F1c2VzIGEgXCJQZXJtaXNzaW9uIERlbmllZFwiXG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaW4gSUVcbiAgICAgICAgICAgICAgICB1bmxvYWRIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldERvY3VtZW50KCk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGRpc2FibGVkQW5jZXN0b3IgPSBhZGRDb21iaW5hdG9yKFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLmRpc2FibGVkID09PSB0cnVlICYmIChcImZvcm1cIiBpbiBlbGVtIHx8IFwibGFiZWxcIiBpbiBlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBkaXI6IFwicGFyZW50Tm9kZVwiLCBuZXh0OiBcImxlZ2VuZFwiIH1cbiAgICAgICAgICAgICAgICApO1xuXG4vLyBPcHRpbWl6ZSBmb3IgcHVzaC5hcHBseSggXywgTm9kZUxpc3QgKVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwdXNoLmFwcGx5KFxuICAgICAgICAgICAgICAgICAgICAoYXJyID0gc2xpY2UuY2FsbCggcHJlZmVycmVkRG9jLmNoaWxkTm9kZXMgKSksXG4gICAgICAgICAgICAgICAgICAgIHByZWZlcnJlZERvYy5jaGlsZE5vZGVzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMFxuICAgICAgICAgICAgICAgIC8vIERldGVjdCBzaWxlbnRseSBmYWlsaW5nIHB1c2guYXBwbHlcbiAgICAgICAgICAgICAgICBhcnJbIHByZWZlcnJlZERvYy5jaGlsZE5vZGVzLmxlbmd0aCBdLm5vZGVUeXBlO1xuICAgICAgICAgICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICAgICAgICAgICAgcHVzaCA9IHsgYXBwbHk6IGFyci5sZW5ndGggP1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMZXZlcmFnZSBzbGljZSBpZiBwb3NzaWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oIHRhcmdldCwgZWxzICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hfbmF0aXZlLmFwcGx5KCB0YXJnZXQsIHNsaWNlLmNhbGwoZWxzKSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSA6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFPDlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBhcHBlbmQgZGlyZWN0bHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCB0YXJnZXQsIGVscyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaiA9IHRhcmdldC5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhbid0IHRydXN0IE5vZGVMaXN0Lmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggKHRhcmdldFtqKytdID0gZWxzW2krK10pICkge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQubGVuZ3RoID0gaiAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gU2l6emxlKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcbiAgICAgICAgICAgICAgICB2YXIgbSwgaSwgZWxlbSwgbmlkLCBtYXRjaCwgZ3JvdXBzLCBuZXdTZWxlY3RvcixcbiAgICAgICAgICAgICAgICAgICAgbmV3Q29udGV4dCA9IGNvbnRleHQgJiYgY29udGV4dC5vd25lckRvY3VtZW50LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vZGVUeXBlIGRlZmF1bHRzIHRvIDksIHNpbmNlIGNvbnRleHQgZGVmYXVsdHMgdG8gZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgbm9kZVR5cGUgPSBjb250ZXh0ID8gY29udGV4dC5ub2RlVHlwZSA6IDk7XG5cbiAgICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblxuICAgICAgICAgICAgICAgIC8vIFJldHVybiBlYXJseSBmcm9tIGNhbGxzIHdpdGggaW52YWxpZCBzZWxlY3RvciBvciBjb250ZXh0XG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgfHwgIXNlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgIG5vZGVUeXBlICE9PSAxICYmIG5vZGVUeXBlICE9PSA5ICYmIG5vZGVUeXBlICE9PSAxMSApIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBUcnkgdG8gc2hvcnRjdXQgZmluZCBvcGVyYXRpb25zIChhcyBvcHBvc2VkIHRvIGZpbHRlcnMpIGluIEhUTUwgZG9jdW1lbnRzXG4gICAgICAgICAgICAgICAgaWYgKCAhc2VlZCApIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoICggY29udGV4dCA/IGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0IDogcHJlZmVycmVkRG9jICkgIT09IGRvY3VtZW50ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RG9jdW1lbnQoIGNvbnRleHQgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIGRvY3VtZW50SXNIVE1MICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc2VsZWN0b3IgaXMgc3VmZmljaWVudGx5IHNpbXBsZSwgdHJ5IHVzaW5nIGEgXCJnZXQqQnkqXCIgRE9NIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKGV4Y2VwdGluZyBEb2N1bWVudEZyYWdtZW50IGNvbnRleHQsIHdoZXJlIHRoZSBtZXRob2RzIGRvbid0IGV4aXN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBub2RlVHlwZSAhPT0gMTEgJiYgKG1hdGNoID0gcnF1aWNrRXhwci5leGVjKCBzZWxlY3RvciApKSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElEIHNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAobSA9IG1hdGNoWzFdKSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEb2N1bWVudCBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbm9kZVR5cGUgPT09IDkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIChlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggbSApKSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFLCBPcGVyYSwgV2Via2l0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogaWRlbnRpZnkgdmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXRFbGVtZW50QnlJZCBjYW4gbWF0Y2ggZWxlbWVudHMgYnkgbmFtZSBpbnN0ZWFkIG9mIElEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBlbGVtLmlkID09PSBtICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goIGVsZW0gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRWxlbWVudCBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFLCBPcGVyYSwgV2Via2l0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBpZGVudGlmeSB2ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0RWxlbWVudEJ5SWQgY2FuIG1hdGNoIGVsZW1lbnRzIGJ5IG5hbWUgaW5zdGVhZCBvZiBJRFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBuZXdDb250ZXh0ICYmIChlbGVtID0gbmV3Q29udGV4dC5nZXRFbGVtZW50QnlJZCggbSApKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5zKCBjb250ZXh0LCBlbGVtICkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmlkID09PSBtICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKCBlbGVtICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUeXBlIHNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggbWF0Y2hbMl0gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2guYXBwbHkoIHJlc3VsdHMsIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHNlbGVjdG9yICkgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2xhc3Mgc2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCAobSA9IG1hdGNoWzNdKSAmJiBzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2guYXBwbHkoIHJlc3VsdHMsIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggbSApICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGFrZSBhZHZhbnRhZ2Ugb2YgcXVlcnlTZWxlY3RvckFsbFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBzdXBwb3J0LnFzYSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFjb21waWxlckNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIXJidWdneVFTQSB8fCAhcmJ1Z2d5UVNBLnRlc3QoIHNlbGVjdG9yICkpICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBub2RlVHlwZSAhPT0gMSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NlbGVjdG9yID0gc2VsZWN0b3I7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcVNBIGxvb2tzIG91dHNpZGUgRWxlbWVudCBjb250ZXh0LCB3aGljaCBpcyBub3Qgd2hhdCB3ZSB3YW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoYW5rcyB0byBBbmRyZXcgRHVwb250IGZvciB0aGlzIHdvcmthcm91bmQgdGVjaG5pcXVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFIDw9OFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGNsdWRlIG9iamVjdCBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIGNvbnRleHQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gXCJvYmplY3RcIiApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDYXB0dXJlIHRoZSBjb250ZXh0IElELCBzZXR0aW5nIGl0IGZpcnN0IGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIChuaWQgPSBjb250ZXh0LmdldEF0dHJpYnV0ZSggXCJpZFwiICkpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmlkID0gbmlkLnJlcGxhY2UoIHJjc3Nlc2NhcGUsIGZjc3Nlc2NhcGUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc2V0QXR0cmlidXRlKCBcImlkXCIsIChuaWQgPSBleHBhbmRvKSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJlZml4IGV2ZXJ5IHNlbGVjdG9yIGluIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwcyA9IHRva2VuaXplKCBzZWxlY3RvciApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gZ3JvdXBzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cHNbaV0gPSBcIiNcIiArIG5pZCArIFwiIFwiICsgdG9TZWxlY3RvciggZ3JvdXBzW2ldICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VsZWN0b3IgPSBncm91cHMuam9pbiggXCIsXCIgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeHBhbmQgY29udGV4dCBmb3Igc2libGluZyBzZWxlY3RvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29udGV4dCA9IHJzaWJsaW5nLnRlc3QoIHNlbGVjdG9yICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbmV3U2VsZWN0b3IgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoLmFwcGx5KCByZXN1bHRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbCggbmV3U2VsZWN0b3IgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoICggcXNhRXJyb3IgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG5pZCA9PT0gZXhwYW5kbyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnJlbW92ZUF0dHJpYnV0ZSggXCJpZFwiICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBBbGwgb3RoZXJzXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGVjdCggc2VsZWN0b3IucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ3JlYXRlIGtleS12YWx1ZSBjYWNoZXMgb2YgbGltaXRlZCBzaXplXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb24oc3RyaW5nLCBvYmplY3QpfSBSZXR1cm5zIHRoZSBPYmplY3QgZGF0YSBhZnRlciBzdG9yaW5nIGl0IG9uIGl0c2VsZiB3aXRoXG4gICAgICAgICAgICAgKlx0cHJvcGVydHkgbmFtZSB0aGUgKHNwYWNlLXN1ZmZpeGVkKSBzdHJpbmcgYW5kIChpZiB0aGUgY2FjaGUgaXMgbGFyZ2VyIHRoYW4gRXhwci5jYWNoZUxlbmd0aClcbiAgICAgICAgICAgICAqXHRkZWxldGluZyB0aGUgb2xkZXN0IGVudHJ5XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNhY2hlKCkge1xuICAgICAgICAgICAgICAgIHZhciBrZXlzID0gW107XG5cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjYWNoZSgga2V5LCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlIChrZXkgKyBcIiBcIikgdG8gYXZvaWQgY29sbGlzaW9uIHdpdGggbmF0aXZlIHByb3RvdHlwZSBwcm9wZXJ0aWVzIChzZWUgSXNzdWUgIzE1NylcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBrZXlzLnB1c2goIGtleSArIFwiIFwiICkgPiBFeHByLmNhY2hlTGVuZ3RoICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT25seSBrZWVwIHRoZSBtb3N0IHJlY2VudCBlbnRyaWVzXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2FjaGVbIGtleXMuc2hpZnQoKSBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoY2FjaGVbIGtleSArIFwiIFwiIF0gPSB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBNYXJrIGEgZnVuY3Rpb24gZm9yIHNwZWNpYWwgdXNlIGJ5IFNpenpsZVxuICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIG1hcmtcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gbWFya0Z1bmN0aW9uKCBmbiApIHtcbiAgICAgICAgICAgICAgICBmblsgZXhwYW5kbyBdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogU3VwcG9ydCB0ZXN0aW5nIHVzaW5nIGFuIGVsZW1lbnRcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFBhc3NlZCB0aGUgY3JlYXRlZCBlbGVtZW50IGFuZCByZXR1cm5zIGEgYm9vbGVhbiByZXN1bHRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gYXNzZXJ0KCBmbiApIHtcbiAgICAgICAgICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIik7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFmbiggZWwgKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgZnJvbSBpdHMgcGFyZW50IGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBlbC5wYXJlbnROb2RlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZWwgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyByZWxlYXNlIG1lbW9yeSBpbiBJRVxuICAgICAgICAgICAgICAgICAgICBlbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEFkZHMgdGhlIHNhbWUgaGFuZGxlciBmb3IgYWxsIG9mIHRoZSBzcGVjaWZpZWQgYXR0cnNcbiAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhdHRycyBQaXBlLXNlcGFyYXRlZCBsaXN0IG9mIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgVGhlIG1ldGhvZCB0aGF0IHdpbGwgYmUgYXBwbGllZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRIYW5kbGUoIGF0dHJzLCBoYW5kbGVyICkge1xuICAgICAgICAgICAgICAgIHZhciBhcnIgPSBhdHRycy5zcGxpdChcInxcIiksXG4gICAgICAgICAgICAgICAgICAgIGkgPSBhcnIubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICAgICAgICAgICAgICAgIEV4cHIuYXR0ckhhbmRsZVsgYXJyW2ldIF0gPSBoYW5kbGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDaGVja3MgZG9jdW1lbnQgb3JkZXIgb2YgdHdvIHNpYmxpbmdzXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGFcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gYlxuICAgICAgICAgICAgICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyBsZXNzIHRoYW4gMCBpZiBhIHByZWNlZGVzIGIsIGdyZWF0ZXIgdGhhbiAwIGlmIGEgZm9sbG93cyBiXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNpYmxpbmdDaGVjayggYSwgYiApIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VyID0gYiAmJiBhLFxuICAgICAgICAgICAgICAgICAgICBkaWZmID0gY3VyICYmIGEubm9kZVR5cGUgPT09IDEgJiYgYi5ub2RlVHlwZSA9PT0gMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgYS5zb3VyY2VJbmRleCAtIGIuc291cmNlSW5kZXg7XG5cbiAgICAgICAgICAgICAgICAvLyBVc2UgSUUgc291cmNlSW5kZXggaWYgYXZhaWxhYmxlIG9uIGJvdGggbm9kZXNcbiAgICAgICAgICAgICAgICBpZiAoIGRpZmYgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkaWZmO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGIgZm9sbG93cyBhXG4gICAgICAgICAgICAgICAgaWYgKCBjdXIgKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICggKGN1ciA9IGN1ci5uZXh0U2libGluZykgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGN1ciA9PT0gYiApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYSA/IDEgOiAtMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGlucHV0IHR5cGVzXG4gICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBjcmVhdGVJbnB1dFBzZXVkbyggdHlwZSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgYnV0dG9uc1xuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlQnV0dG9uUHNldWRvKCB0eXBlICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAobmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCIpICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgOmVuYWJsZWQvOmRpc2FibGVkXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRpc2FibGVkIHRydWUgZm9yIDpkaXNhYmxlZDsgZmFsc2UgZm9yIDplbmFibGVkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZURpc2FibGVkUHNldWRvKCBkaXNhYmxlZCApIHtcblxuICAgICAgICAgICAgICAgIC8vIEtub3duIDpkaXNhYmxlZCBmYWxzZSBwb3NpdGl2ZXM6IGZpZWxkc2V0W2Rpc2FibGVkXSA+IGxlZ2VuZDpudGgtb2YtdHlwZShuKzIpIDpjYW4tZGlzYWJsZVxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IGNlcnRhaW4gZWxlbWVudHMgY2FuIG1hdGNoIDplbmFibGVkIG9yIDpkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zY3JpcHRpbmcuaHRtbCNzZWxlY3Rvci1lbmFibGVkXG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3NjcmlwdGluZy5odG1sI3NlbGVjdG9yLWRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgIGlmICggXCJmb3JtXCIgaW4gZWxlbSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGluaGVyaXRlZCBkaXNhYmxlZG5lc3Mgb24gcmVsZXZhbnQgbm9uLWRpc2FibGVkIGVsZW1lbnRzOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKiBsaXN0ZWQgZm9ybS1hc3NvY2lhdGVkIGVsZW1lbnRzIGluIGEgZGlzYWJsZWQgZmllbGRzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCNjYXRlZ29yeS1saXN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCNjb25jZXB0LWZlLWRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAqIG9wdGlvbiBlbGVtZW50cyBpbiBhIGRpc2FibGVkIG9wdGdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjY29uY2VwdC1vcHRpb24tZGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFsbCBzdWNoIGVsZW1lbnRzIGhhdmUgYSBcImZvcm1cIiBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZWxlbS5wYXJlbnROb2RlICYmIGVsZW0uZGlzYWJsZWQgPT09IGZhbHNlICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3B0aW9uIGVsZW1lbnRzIGRlZmVyIHRvIGEgcGFyZW50IG9wdGdyb3VwIGlmIHByZXNlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIFwibGFiZWxcIiBpbiBlbGVtICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIFwibGFiZWxcIiBpbiBlbGVtLnBhcmVudE5vZGUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS5wYXJlbnROb2RlLmRpc2FibGVkID09PSBkaXNhYmxlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLmRpc2FibGVkID09PSBkaXNhYmxlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFIDYgLSAxMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSB0aGUgaXNEaXNhYmxlZCBzaG9ydGN1dCBwcm9wZXJ0eSB0byBjaGVjayBmb3IgZGlzYWJsZWQgZmllbGRzZXQgYW5jZXN0b3JzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uaXNEaXNhYmxlZCA9PT0gZGlzYWJsZWQgfHxcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXaGVyZSB0aGVyZSBpcyBubyBpc0Rpc2FibGVkLCBjaGVjayBtYW51YWxseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBqc2hpbnQgLVcwMTggKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5pc0Rpc2FibGVkICE9PSAhZGlzYWJsZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWRBbmNlc3RvciggZWxlbSApID09PSBkaXNhYmxlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGRpc2FibGVkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcnkgdG8gd2lubm93IG91dCBlbGVtZW50cyB0aGF0IGNhbid0IGJlIGRpc2FibGVkIGJlZm9yZSB0cnVzdGluZyB0aGUgZGlzYWJsZWQgcHJvcGVydHkuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTb21lIHZpY3RpbXMgZ2V0IGNhdWdodCBpbiBvdXIgbmV0IChsYWJlbCwgbGVnZW5kLCBtZW51LCB0cmFjayksIGJ1dCBpdCBzaG91bGRuJ3RcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV2ZW4gZXhpc3Qgb24gdGhlbSwgbGV0IGFsb25lIGhhdmUgYSBib29sZWFuIHZhbHVlLlxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBcImxhYmVsXCIgaW4gZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLmRpc2FibGVkID09PSBkaXNhYmxlZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbWFpbmluZyBlbGVtZW50cyBhcmUgbmVpdGhlciA6ZW5hYmxlZCBub3IgOmRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgcG9zaXRpb25hbHNcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZuICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIGFyZ3VtZW50ICkge1xuICAgICAgICAgICAgICAgICAgICBhcmd1bWVudCA9ICthcmd1bWVudDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBqLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoSW5kZXhlcyA9IGZuKCBbXSwgc2VlZC5sZW5ndGgsIGFyZ3VtZW50ICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IG1hdGNoSW5kZXhlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1hdGNoIGVsZW1lbnRzIGZvdW5kIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXhlc1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBzZWVkWyAoaiA9IG1hdGNoSW5kZXhlc1tpXSkgXSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VlZFtqXSA9ICEobWF0Y2hlc1tqXSA9IHNlZWRbal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ2hlY2tzIGEgbm9kZSBmb3IgdmFsaWRpdHkgYXMgYSBTaXp6bGUgY29udGV4dFxuICAgICAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fE9iamVjdD19IGNvbnRleHRcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHtFbGVtZW50fE9iamVjdHxCb29sZWFufSBUaGUgaW5wdXQgbm9kZSBpZiBhY2NlcHRhYmxlLCBvdGhlcndpc2UgYSBmYWxzeSB2YWx1ZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiB0ZXN0Q29udGV4dCggY29udGV4dCApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dCAmJiB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb250ZXh0O1xuICAgICAgICAgICAgfVxuXG4vLyBFeHBvc2Ugc3VwcG9ydCB2YXJzIGZvciBjb252ZW5pZW5jZVxuICAgICAgICAgICAgc3VwcG9ydCA9IFNpenpsZS5zdXBwb3J0ID0ge307XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGV0ZWN0cyBYTUwgbm9kZXNcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IGVsZW0gQW4gZWxlbWVudCBvciBhIGRvY3VtZW50XG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZmYgZWxlbSBpcyBhIG5vbi1IVE1MIFhNTCBub2RlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlzWE1MID0gU2l6emxlLmlzWE1MID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgICAgICAgICAgLy8gZG9jdW1lbnRFbGVtZW50IGlzIHZlcmlmaWVkIGZvciBjYXNlcyB3aGVyZSBpdCBkb2Vzbid0IHlldCBleGlzdFxuICAgICAgICAgICAgICAgIC8vIChzdWNoIGFzIGxvYWRpbmcgaWZyYW1lcyBpbiBJRSAtICM0ODMzKVxuICAgICAgICAgICAgICAgIHZhciBkb2N1bWVudEVsZW1lbnQgPSBlbGVtICYmIChlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSkuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudEVsZW1lbnQgPyBkb2N1bWVudEVsZW1lbnQubm9kZU5hbWUgIT09IFwiSFRNTFwiIDogZmFsc2U7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFNldHMgZG9jdW1lbnQtcmVsYXRlZCB2YXJpYWJsZXMgb25jZSBiYXNlZCBvbiB0aGUgY3VycmVudCBkb2N1bWVudFxuICAgICAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gW2RvY10gQW4gZWxlbWVudCBvciBkb2N1bWVudCBvYmplY3QgdG8gdXNlIHRvIHNldCB0aGUgZG9jdW1lbnRcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGN1cnJlbnQgZG9jdW1lbnRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc2V0RG9jdW1lbnQgPSBTaXp6bGUuc2V0RG9jdW1lbnQgPSBmdW5jdGlvbiggbm9kZSApIHtcbiAgICAgICAgICAgICAgICB2YXIgaGFzQ29tcGFyZSwgc3ViV2luZG93LFxuICAgICAgICAgICAgICAgICAgICBkb2MgPSBub2RlID8gbm9kZS5vd25lckRvY3VtZW50IHx8IG5vZGUgOiBwcmVmZXJyZWREb2M7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gZWFybHkgaWYgZG9jIGlzIGludmFsaWQgb3IgYWxyZWFkeSBzZWxlY3RlZFxuICAgICAgICAgICAgICAgIGlmICggZG9jID09PSBkb2N1bWVudCB8fCBkb2Mubm9kZVR5cGUgIT09IDkgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgZ2xvYmFsIHZhcmlhYmxlc1xuICAgICAgICAgICAgICAgIGRvY3VtZW50ID0gZG9jO1xuICAgICAgICAgICAgICAgIGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnRJc0hUTUwgPSAhaXNYTUwoIGRvY3VtZW50ICk7XG5cbiAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRSA5LTExLCBFZGdlXG4gICAgICAgICAgICAgICAgLy8gQWNjZXNzaW5nIGlmcmFtZSBkb2N1bWVudHMgYWZ0ZXIgdW5sb2FkIHRocm93cyBcInBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3JzIChqUXVlcnkgIzEzOTM2KVxuICAgICAgICAgICAgICAgIGlmICggcHJlZmVycmVkRG9jICE9PSBkb2N1bWVudCAmJlxuICAgICAgICAgICAgICAgICAgICAoc3ViV2luZG93ID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcpICYmIHN1YldpbmRvdy50b3AgIT09IHN1YldpbmRvdyApIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRSAxMSwgRWRnZVxuICAgICAgICAgICAgICAgICAgICBpZiAoIHN1YldpbmRvdy5hZGRFdmVudExpc3RlbmVyICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIFwidW5sb2FkXCIsIHVubG9hZEhhbmRsZXIsIGZhbHNlICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFIDkgLSAxMCBvbmx5XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHN1YldpbmRvdy5hdHRhY2hFdmVudCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YldpbmRvdy5hdHRhY2hFdmVudCggXCJvbnVubG9hZFwiLCB1bmxvYWRIYW5kbGVyICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKiBBdHRyaWJ1dGVzXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFPDhcbiAgICAgICAgICAgICAgICAvLyBWZXJpZnkgdGhhdCBnZXRBdHRyaWJ1dGUgcmVhbGx5IHJldHVybnMgYXR0cmlidXRlcyBhbmQgbm90IHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAvLyAoZXhjZXB0aW5nIElFOCBib29sZWFucylcbiAgICAgICAgICAgICAgICBzdXBwb3J0LmF0dHJpYnV0ZXMgPSBhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc05hbWUgPSBcImlcIjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFlbC5nZXRBdHRyaWJ1dGUoXCJjbGFzc05hbWVcIik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvKiBnZXRFbGVtZW50KHMpQnkqXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKSByZXR1cm5zIG9ubHkgZWxlbWVudHNcbiAgICAgICAgICAgICAgICBzdXBwb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lID0gYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoXCJcIikgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFlbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OVxuICAgICAgICAgICAgICAgIHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA9IHJuYXRpdmUudGVzdCggZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApO1xuXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8MTBcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBnZXRFbGVtZW50QnlJZCByZXR1cm5zIGVsZW1lbnRzIGJ5IG5hbWVcbiAgICAgICAgICAgICAgICAvLyBUaGUgYnJva2VuIGdldEVsZW1lbnRCeUlkIG1ldGhvZHMgZG9uJ3QgcGljayB1cCBwcm9ncmFtbWF0aWNhbGx5LXNldCBuYW1lcyxcbiAgICAgICAgICAgICAgICAvLyBzbyB1c2UgYSByb3VuZGFib3V0IGdldEVsZW1lbnRzQnlOYW1lIHRlc3RcbiAgICAgICAgICAgICAgICBzdXBwb3J0LmdldEJ5SWQgPSBhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuICAgICAgICAgICAgICAgICAgICBkb2NFbGVtLmFwcGVuZENoaWxkKCBlbCApLmlkID0gZXhwYW5kbztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSB8fCAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoIGV4cGFuZG8gKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBJRCBmaWx0ZXIgYW5kIGZpbmRcbiAgICAgICAgICAgICAgICBpZiAoIHN1cHBvcnQuZ2V0QnlJZCApIHtcbiAgICAgICAgICAgICAgICAgICAgRXhwci5maWx0ZXJbXCJJRFwiXSA9IGZ1bmN0aW9uKCBpZCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZShcImlkXCIpID09PSBhdHRySWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBFeHByLmZpbmRbXCJJRFwiXSA9IGZ1bmN0aW9uKCBpZCwgY29udGV4dCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW0gPSBjb250ZXh0LmdldEVsZW1lbnRCeUlkKCBpZCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtID8gWyBlbGVtIF0gOiBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBFeHByLmZpbHRlcltcIklEXCJdID0gIGZ1bmN0aW9uKCBpZCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub2RlID0gdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlTm9kZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZSAmJiBub2RlLnZhbHVlID09PSBhdHRySWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFIDYgLSA3IG9ubHlcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0RWxlbWVudEJ5SWQgaXMgbm90IHJlbGlhYmxlIGFzIGEgZmluZCBzaG9ydGN1dFxuICAgICAgICAgICAgICAgICAgICBFeHByLmZpbmRbXCJJRFwiXSA9IGZ1bmN0aW9uKCBpZCwgY29udGV4dCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUsIGksIGVsZW1zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggaWQgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZWxlbSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWZXJpZnkgdGhlIGlkIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKFwiaWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbm9kZSAmJiBub2RlLnZhbHVlID09PSBpZCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbIGVsZW0gXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZhbGwgYmFjayBvbiBnZXRFbGVtZW50c0J5TmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtcyA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeU5hbWUoIGlkICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIChlbGVtID0gZWxlbXNbaSsrXSkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKFwiaWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gaWQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsgZWxlbSBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFRhZ1xuICAgICAgICAgICAgICAgIEV4cHIuZmluZFtcIlRBR1wiXSA9IHN1cHBvcnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgP1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggdGFnLCBjb250ZXh0ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEb2N1bWVudEZyYWdtZW50IG5vZGVzIGRvbid0IGhhdmUgZ0VCVE5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHN1cHBvcnQucXNhICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IDpcblxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggdGFnLCBjb250ZXh0ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQnkgaGFwcHkgY29pbmNpZGVuY2UsIGEgKGJyb2tlbikgZ0VCVE4gYXBwZWFycyBvbiBEb2N1bWVudEZyYWdtZW50IG5vZGVzIHRvb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlsdGVyIG91dCBwb3NzaWJsZSBjb21tZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB0YWcgPT09IFwiKlwiICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggKGVsZW0gPSByZXN1bHRzW2krK10pICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXAucHVzaCggZWxlbSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gQ2xhc3NcbiAgICAgICAgICAgICAgICBFeHByLmZpbmRbXCJDTEFTU1wiXSA9IHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAmJiBmdW5jdGlvbiggY2xhc3NOYW1lLCBjb250ZXh0ICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBjbGFzc05hbWUgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvKiBRU0EvbWF0Y2hlc1NlbGVjdG9yXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgICAgICAgICAgICAgIC8vIFFTQSBhbmQgbWF0Y2hlc1NlbGVjdG9yIHN1cHBvcnRcblxuICAgICAgICAgICAgICAgIC8vIG1hdGNoZXNTZWxlY3Rvcig6YWN0aXZlKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoSUU5L09wZXJhIDExLjUpXG4gICAgICAgICAgICAgICAgcmJ1Z2d5TWF0Y2hlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgLy8gcVNhKDpmb2N1cykgcmVwb3J0cyBmYWxzZSB3aGVuIHRydWUgKENocm9tZSAyMSlcbiAgICAgICAgICAgICAgICAvLyBXZSBhbGxvdyB0aGlzIGJlY2F1c2Ugb2YgYSBidWcgaW4gSUU4LzkgdGhhdCB0aHJvd3MgYW4gZXJyb3JcbiAgICAgICAgICAgICAgICAvLyB3aGVuZXZlciBgZG9jdW1lbnQuYWN0aXZlRWxlbWVudGAgaXMgYWNjZXNzZWQgb24gYW4gaWZyYW1lXG4gICAgICAgICAgICAgICAgLy8gU28sIHdlIGFsbG93IDpmb2N1cyB0byBwYXNzIHRocm91Z2ggUVNBIGFsbCB0aGUgdGltZSB0byBhdm9pZCB0aGUgSUUgZXJyb3JcbiAgICAgICAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEzMzc4XG4gICAgICAgICAgICAgICAgcmJ1Z2d5UVNBID0gW107XG5cbiAgICAgICAgICAgICAgICBpZiAoIChzdXBwb3J0LnFzYSA9IHJuYXRpdmUudGVzdCggZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCApKSApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQnVpbGQgUVNBIHJlZ2V4XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlZ2V4IHN0cmF0ZWd5IGFkb3B0ZWQgZnJvbSBEaWVnbyBQZXJpbmlcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNlbGVjdCBpcyBzZXQgdG8gZW1wdHkgc3RyaW5nIG9uIHB1cnBvc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgdG8gdGVzdCBJRSdzIHRyZWF0bWVudCBvZiBub3QgZXhwbGljaXRseVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0dGluZyBhIGJvb2xlYW4gY29udGVudCBhdHRyaWJ1dGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzaW5jZSBpdHMgcHJlc2VuY2Ugc2hvdWxkIGJlIGVub3VnaFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEyMzU5XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2NFbGVtLmFwcGVuZENoaWxkKCBlbCApLmlubmVySFRNTCA9IFwiPGEgaWQ9J1wiICsgZXhwYW5kbyArIFwiJz48L2E+XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNlbGVjdCBpZD0nXCIgKyBleHBhbmRvICsgXCItXFxyXFxcXCcgbXNhbGxvd2NhcHR1cmU9Jyc+XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPG9wdGlvbiBzZWxlY3RlZD0nJz48L29wdGlvbj48L3NlbGVjdD5cIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU4LCBPcGVyYSAxMS0xMi4xNlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm90aGluZyBzaG91bGQgYmUgc2VsZWN0ZWQgd2hlbiBlbXB0eSBzdHJpbmdzIGZvbGxvdyBePSBvciAkPSBvciAqPVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHRlc3QgYXR0cmlidXRlIG11c3QgYmUgdW5rbm93biBpbiBPcGVyYSBidXQgXCJzYWZlXCIgZm9yIFdpblJUXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2hoNDY1Mzg4LmFzcHgjYXR0cmlidXRlX3NlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZWwucXVlcnlTZWxlY3RvckFsbChcIlttc2FsbG93Y2FwdHVyZV49JyddXCIpLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYnVnZ3lRU0EucHVzaCggXCJbKl4kXT1cIiArIHdoaXRlc3BhY2UgKyBcIiooPzonJ3xcXFwiXFxcIilcIiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRThcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJvb2xlYW4gYXR0cmlidXRlcyBhbmQgXCJ2YWx1ZVwiIGFyZSBub3QgdHJlYXRlZCBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbc2VsZWN0ZWRdXCIpLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYnVnZ3lRU0EucHVzaCggXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKig/OnZhbHVlfFwiICsgYm9vbGVhbnMgKyBcIilcIiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBDaHJvbWU8MjksIEFuZHJvaWQ8NC40LCBTYWZhcmk8Ny4wKywgaU9TPDcuMCssIFBoYW50b21KUzwxLjkuOCtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiW2lkfj1cIiArIGV4cGFuZG8gKyBcIi1dXCIgKS5sZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmJ1Z2d5UVNBLnB1c2goXCJ+PVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2Via2l0L09wZXJhIC0gOmNoZWNrZWQgc2hvdWxkIHJldHVybiBzZWxlY3RlZCBvcHRpb24gZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvUkVDLWNzczMtc2VsZWN0b3JzLTIwMTEwOTI5LyNjaGVja2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJRTggdGhyb3dzIGVycm9yIGhlcmUgYW5kIHdpbGwgbm90IHNlZSBsYXRlciB0ZXN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbChcIjpjaGVja2VkXCIpLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYnVnZ3lRU0EucHVzaChcIjpjaGVja2VkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBTYWZhcmkgOCssIGlPUyA4K1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEzNjg1MVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW4tcGFnZSBgc2VsZWN0b3IjaWQgc2libGluZy1jb21iaW5hdG9yIHNlbGVjdG9yYCBmYWlsc1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbCggXCJhI1wiICsgZXhwYW5kbyArIFwiKypcIiApLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYnVnZ3lRU0EucHVzaChcIi4jLitbK35dXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gXCI8YSBocmVmPScnIGRpc2FibGVkPSdkaXNhYmxlZCc+PC9hPlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzZWxlY3QgZGlzYWJsZWQ9J2Rpc2FibGVkJz48b3B0aW9uLz48L3NlbGVjdD5cIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogV2luZG93cyA4IE5hdGl2ZSBBcHBzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgdHlwZSBhbmQgbmFtZSBhdHRyaWJ1dGVzIGFyZSByZXN0cmljdGVkIGR1cmluZyAuaW5uZXJIVE1MIGFzc2lnbm1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIFwiaGlkZGVuXCIgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKCBpbnB1dCApLnNldEF0dHJpYnV0ZSggXCJuYW1lXCIsIFwiRFwiICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFOFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRW5mb3JjZSBjYXNlLXNlbnNpdGl2aXR5IG9mIG5hbWUgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbmFtZT1kXVwiKS5sZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmJ1Z2d5UVNBLnB1c2goIFwibmFtZVwiICsgd2hpdGVzcGFjZSArIFwiKlsqXiR8IX5dPz1cIiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGRiAzLjUgLSA6ZW5hYmxlZC86ZGlzYWJsZWQgYW5kIGhpZGRlbiBlbGVtZW50cyAoaGlkZGVuIGVsZW1lbnRzIGFyZSBzdGlsbCBlbmFibGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSUU4IHRocm93cyBlcnJvciBoZXJlIGFuZCB3aWxsIG5vdCBzZWUgbGF0ZXIgdGVzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZWwucXVlcnlTZWxlY3RvckFsbChcIjplbmFibGVkXCIpLmxlbmd0aCAhPT0gMiApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYnVnZ3lRU0EucHVzaCggXCI6ZW5hYmxlZFwiLCBcIjpkaXNhYmxlZFwiICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFOS0xMStcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElFJ3MgOmRpc2FibGVkIHNlbGVjdG9yIGRvZXMgbm90IHBpY2sgdXAgdGhlIGNoaWxkcmVuIG9mIGRpc2FibGVkIGZpZWxkc2V0c1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jRWxlbS5hcHBlbmRDaGlsZCggZWwgKS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCI6ZGlzYWJsZWRcIikubGVuZ3RoICE9PSAyICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJidWdneVFTQS5wdXNoKCBcIjplbmFibGVkXCIsIFwiOmRpc2FibGVkXCIgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3BlcmEgMTAtMTEgZG9lcyBub3QgdGhyb3cgb24gcG9zdC1jb21tYSBpbnZhbGlkIHBzZXVkb3NcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCIqLDp4XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmJ1Z2d5UVNBLnB1c2goXCIsLio6XCIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIChzdXBwb3J0Lm1hdGNoZXNTZWxlY3RvciA9IHJuYXRpdmUudGVzdCggKG1hdGNoZXMgPSBkb2NFbGVtLm1hdGNoZXMgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY0VsZW0ud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2NFbGVtLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jRWxlbS5vTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2NFbGVtLm1zTWF0Y2hlc1NlbGVjdG9yKSApKSApIHtcblxuICAgICAgICAgICAgICAgICAgICBhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIGl0J3MgcG9zc2libGUgdG8gZG8gbWF0Y2hlc1NlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbiBhIGRpc2Nvbm5lY3RlZCBub2RlIChJRSA5KVxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydC5kaXNjb25uZWN0ZWRNYXRjaCA9IG1hdGNoZXMuY2FsbCggZWwsIFwiKlwiICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgc2hvdWxkIGZhaWwgd2l0aCBhbiBleGNlcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdlY2tvIGRvZXMgbm90IGVycm9yLCByZXR1cm5zIGZhbHNlIGluc3RlYWRcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMuY2FsbCggZWwsIFwiW3MhPScnXTp4XCIgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJidWdneU1hdGNoZXMucHVzaCggXCIhPVwiLCBwc2V1ZG9zICk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJidWdneVFTQSA9IHJidWdneVFTQS5sZW5ndGggJiYgbmV3IFJlZ0V4cCggcmJ1Z2d5UVNBLmpvaW4oXCJ8XCIpICk7XG4gICAgICAgICAgICAgICAgcmJ1Z2d5TWF0Y2hlcyA9IHJidWdneU1hdGNoZXMubGVuZ3RoICYmIG5ldyBSZWdFeHAoIHJidWdneU1hdGNoZXMuam9pbihcInxcIikgKTtcblxuICAgICAgICAgICAgICAgIC8qIENvbnRhaW5zXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgICAgICAgICAgICAgICBoYXNDb21wYXJlID0gcm5hdGl2ZS50ZXN0KCBkb2NFbGVtLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uICk7XG5cbiAgICAgICAgICAgICAgICAvLyBFbGVtZW50IGNvbnRhaW5zIGFub3RoZXJcbiAgICAgICAgICAgICAgICAvLyBQdXJwb3NlZnVsbHkgc2VsZi1leGNsdXNpdmVcbiAgICAgICAgICAgICAgICAvLyBBcyBpbiwgYW4gZWxlbWVudCBkb2VzIG5vdCBjb250YWluIGl0c2VsZlxuICAgICAgICAgICAgICAgIGNvbnRhaW5zID0gaGFzQ29tcGFyZSB8fCBybmF0aXZlLnRlc3QoIGRvY0VsZW0uY29udGFpbnMgKSA/XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCBhLCBiICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFkb3duID0gYS5ub2RlVHlwZSA9PT0gOSA/IGEuZG9jdW1lbnRFbGVtZW50IDogYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXAgPSBiICYmIGIucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhID09PSBidXAgfHwgISEoIGJ1cCAmJiBidXAubm9kZVR5cGUgPT09IDEgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkb3duLmNvbnRhaW5zID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRvd24uY29udGFpbnMoIGJ1cCApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAmJiBhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBidXAgKSAmIDE2XG4gICAgICAgICAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCBhLCBiICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBiICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggKGIgPSBiLnBhcmVudE5vZGUpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGIgPT09IGEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8qIFNvcnRpbmdcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgICAgICAgICAgICAgLy8gRG9jdW1lbnQgb3JkZXIgc29ydGluZ1xuICAgICAgICAgICAgICAgIHNvcnRPcmRlciA9IGhhc0NvbXBhcmUgP1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggYSwgYiApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmxhZyBmb3IgZHVwbGljYXRlIHJlbW92YWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggYSA9PT0gYiApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNEdXBsaWNhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTb3J0IG9uIG1ldGhvZCBleGlzdGVuY2UgaWYgb25seSBvbmUgaW5wdXQgaGFzIGNvbXBhcmVEb2N1bWVudFBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29tcGFyZSA9ICFhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uIC0gIWIuY29tcGFyZURvY3VtZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGNvbXBhcmUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBwb3NpdGlvbiBpZiBib3RoIGlucHV0cyBiZWxvbmcgdG8gdGhlIHNhbWUgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhcmUgPSAoIGEub3duZXJEb2N1bWVudCB8fCBhICkgPT09ICggYi5vd25lckRvY3VtZW50IHx8IGIgKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYiApIDpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSB3ZSBrbm93IHRoZXkgYXJlIGRpc2Nvbm5lY3RlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERpc2Nvbm5lY3RlZCBub2Rlc1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBjb21wYXJlICYgMSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICghc3VwcG9ydC5zb3J0RGV0YWNoZWQgJiYgYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYSApID09PSBjb21wYXJlKSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENob29zZSB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIHJlbGF0ZWQgdG8gb3VyIHByZWZlcnJlZCBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggYSA9PT0gZG9jdW1lbnQgfHwgYS5vd25lckRvY3VtZW50ID09PSBwcmVmZXJyZWREb2MgJiYgY29udGFpbnMocHJlZmVycmVkRG9jLCBhKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGIgPT09IGRvY3VtZW50IHx8IGIub3duZXJEb2N1bWVudCA9PT0gcHJlZmVycmVkRG9jICYmIGNvbnRhaW5zKHByZWZlcnJlZERvYywgYikgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1haW50YWluIG9yaWdpbmFsIG9yZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNvcnRJbnB1dCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICggaW5kZXhPZiggc29ydElucHV0LCBhICkgLSBpbmRleE9mKCBzb3J0SW5wdXQsIGIgKSApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmUgJiA0ID8gLTEgOiAxO1xuICAgICAgICAgICAgICAgICAgICB9IDpcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oIGEsIGIgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGl0IGVhcmx5IGlmIHRoZSBub2RlcyBhcmUgaWRlbnRpY2FsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGEgPT09IGIgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzRHVwbGljYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXAgPSBhLnBhcmVudE5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVwID0gYi5wYXJlbnROb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwID0gWyBhIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnAgPSBbIGIgXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFyZW50bGVzcyBub2RlcyBhcmUgZWl0aGVyIGRvY3VtZW50cyBvciBkaXNjb25uZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggIWF1cCB8fCAhYnVwICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhID09PSBkb2N1bWVudCA/IC0xIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYiA9PT0gZG9jdW1lbnQgPyAxIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1cCA/IC0xIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXAgPyAxIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydElucHV0ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICggaW5kZXhPZiggc29ydElucHV0LCBhICkgLSBpbmRleE9mKCBzb3J0SW5wdXQsIGIgKSApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgbm9kZXMgYXJlIHNpYmxpbmdzLCB3ZSBjYW4gZG8gYSBxdWljayBjaGVja1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggYXVwID09PSBidXAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNpYmxpbmdDaGVjayggYSwgYiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2Ugd2UgbmVlZCBmdWxsIGxpc3RzIG9mIHRoZWlyIGFuY2VzdG9ycyBmb3IgY29tcGFyaXNvblxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyID0gYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggKGN1ciA9IGN1ci5wYXJlbnROb2RlKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcC51bnNoaWZ0KCBjdXIgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ciA9IGI7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIChjdXIgPSBjdXIucGFyZW50Tm9kZSkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnAudW5zaGlmdCggY3VyICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdhbGsgZG93biB0aGUgdHJlZSBsb29raW5nIGZvciBhIGRpc2NyZXBhbmN5XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIGFwW2ldID09PSBicFtpXSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEbyBhIHNpYmxpbmcgY2hlY2sgaWYgdGhlIG5vZGVzIGhhdmUgYSBjb21tb24gYW5jZXN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWJsaW5nQ2hlY2soIGFwW2ldLCBicFtpXSApIDpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBub2RlcyBpbiBvdXIgZG9jdW1lbnQgc29ydCBmaXJzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwW2ldID09PSBwcmVmZXJyZWREb2MgPyAtMSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJwW2ldID09PSBwcmVmZXJyZWREb2MgPyAxIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDA7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBTaXp6bGUubWF0Y2hlcyA9IGZ1bmN0aW9uKCBleHByLCBlbGVtZW50cyApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU2l6emxlKCBleHByLCBudWxsLCBudWxsLCBlbGVtZW50cyApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgU2l6emxlLm1hdGNoZXNTZWxlY3RvciA9IGZ1bmN0aW9uKCBlbGVtLCBleHByICkge1xuICAgICAgICAgICAgICAgIC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuICAgICAgICAgICAgICAgIGlmICggKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSApICE9PSBkb2N1bWVudCApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RG9jdW1lbnQoIGVsZW0gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCBhdHRyaWJ1dGUgc2VsZWN0b3JzIGFyZSBxdW90ZWRcbiAgICAgICAgICAgICAgICBleHByID0gZXhwci5yZXBsYWNlKCByYXR0cmlidXRlUXVvdGVzLCBcIj0nJDEnXVwiICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHN1cHBvcnQubWF0Y2hlc1NlbGVjdG9yICYmIGRvY3VtZW50SXNIVE1MICYmXG4gICAgICAgICAgICAgICAgICAgICFjb21waWxlckNhY2hlWyBleHByICsgXCIgXCIgXSAmJlxuICAgICAgICAgICAgICAgICAgICAoICFyYnVnZ3lNYXRjaGVzIHx8ICFyYnVnZ3lNYXRjaGVzLnRlc3QoIGV4cHIgKSApICYmXG4gICAgICAgICAgICAgICAgICAgICggIXJidWdneVFTQSAgICAgfHwgIXJidWdneVFTQS50ZXN0KCBleHByICkgKSApIHtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldCA9IG1hdGNoZXMuY2FsbCggZWxlbSwgZXhwciApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJRSA5J3MgbWF0Y2hlc1NlbGVjdG9yIHJldHVybnMgZmFsc2Ugb24gZGlzY29ubmVjdGVkIG5vZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHJldCB8fCBzdXBwb3J0LmRpc2Nvbm5lY3RlZE1hdGNoIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXMgd2VsbCwgZGlzY29ubmVjdGVkIG5vZGVzIGFyZSBzYWlkIHRvIGJlIGluIGEgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmcmFnbWVudCBpbiBJRSA5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5kb2N1bWVudCAmJiBlbGVtLmRvY3VtZW50Lm5vZGVUeXBlICE9PSAxMSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBTaXp6bGUoIGV4cHIsIGRvY3VtZW50LCBudWxsLCBbIGVsZW0gXSApLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBTaXp6bGUuY29udGFpbnMgPSBmdW5jdGlvbiggY29udGV4dCwgZWxlbSApIHtcbiAgICAgICAgICAgICAgICAvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcbiAgICAgICAgICAgICAgICBpZiAoICggY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgKSAhPT0gZG9jdW1lbnQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldERvY3VtZW50KCBjb250ZXh0ICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWlucyggY29udGV4dCwgZWxlbSApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgU2l6emxlLmF0dHIgPSBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcbiAgICAgICAgICAgICAgICAvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcbiAgICAgICAgICAgICAgICBpZiAoICggZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0gKSAhPT0gZG9jdW1lbnQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldERvY3VtZW50KCBlbGVtICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGZuID0gRXhwci5hdHRySGFuZGxlWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKGpRdWVyeSAjMTM4MDcpXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IGZuICYmIGhhc093bi5jYWxsKCBFeHByLmF0dHJIYW5kbGUsIG5hbWUudG9Mb3dlckNhc2UoKSApID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGZuKCBlbGVtLCBuYW1lLCAhZG9jdW1lbnRJc0hUTUwgKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsICE9PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgICAgICAgICB2YWwgOlxuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0LmF0dHJpYnV0ZXMgfHwgIWRvY3VtZW50SXNIVE1MID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgKHZhbCA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZShuYW1lKSkgJiYgdmFsLnNwZWNpZmllZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLnZhbHVlIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgU2l6emxlLmVzY2FwZSA9IGZ1bmN0aW9uKCBzZWwgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChzZWwgKyBcIlwiKS5yZXBsYWNlKCByY3NzZXNjYXBlLCBmY3NzZXNjYXBlICk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBTaXp6bGUuZXJyb3IgPSBmdW5jdGlvbiggbXNnICkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciggXCJTeW50YXggZXJyb3IsIHVucmVjb2duaXplZCBleHByZXNzaW9uOiBcIiArIG1zZyApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEb2N1bWVudCBzb3J0aW5nIGFuZCByZW1vdmluZyBkdXBsaWNhdGVzXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5TGlrZX0gcmVzdWx0c1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBTaXp6bGUudW5pcXVlU29ydCA9IGZ1bmN0aW9uKCByZXN1bHRzICkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtLFxuICAgICAgICAgICAgICAgICAgICBkdXBsaWNhdGVzID0gW10sXG4gICAgICAgICAgICAgICAgICAgIGogPSAwLFxuICAgICAgICAgICAgICAgICAgICBpID0gMDtcblxuICAgICAgICAgICAgICAgIC8vIFVubGVzcyB3ZSAqa25vdyogd2UgY2FuIGRldGVjdCBkdXBsaWNhdGVzLCBhc3N1bWUgdGhlaXIgcHJlc2VuY2VcbiAgICAgICAgICAgICAgICBoYXNEdXBsaWNhdGUgPSAhc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzO1xuICAgICAgICAgICAgICAgIHNvcnRJbnB1dCA9ICFzdXBwb3J0LnNvcnRTdGFibGUgJiYgcmVzdWx0cy5zbGljZSggMCApO1xuICAgICAgICAgICAgICAgIHJlc3VsdHMuc29ydCggc29ydE9yZGVyICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGhhc0R1cGxpY2F0ZSApIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCAoZWxlbSA9IHJlc3VsdHNbaSsrXSkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGVsZW0gPT09IHJlc3VsdHNbIGkgXSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqID0gZHVwbGljYXRlcy5wdXNoKCBpICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCBqLS0gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnNwbGljZSggZHVwbGljYXRlc1sgaiBdLCAxICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBDbGVhciBpbnB1dCBhZnRlciBzb3J0aW5nIHRvIHJlbGVhc2Ugb2JqZWN0c1xuICAgICAgICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L3NpenpsZS9wdWxsLzIyNVxuICAgICAgICAgICAgICAgIHNvcnRJbnB1dCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVXRpbGl0eSBmdW5jdGlvbiBmb3IgcmV0cmlldmluZyB0aGUgdGV4dCB2YWx1ZSBvZiBhbiBhcnJheSBvZiBET00gbm9kZXNcbiAgICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl8RWxlbWVudH0gZWxlbVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBnZXRUZXh0ID0gU2l6emxlLmdldFRleHQgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSxcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gXCJcIixcbiAgICAgICAgICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVUeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuICAgICAgICAgICAgICAgIGlmICggIW5vZGVUeXBlICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiBubyBub2RlVHlwZSwgdGhpcyBpcyBleHBlY3RlZCB0byBiZSBhbiBhcnJheVxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIChub2RlID0gZWxlbVtpKytdKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvIG5vdCB0cmF2ZXJzZSBjb21tZW50IG5vZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgKz0gZ2V0VGV4dCggbm9kZSApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggbm9kZVR5cGUgPT09IDEgfHwgbm9kZVR5cGUgPT09IDkgfHwgbm9kZVR5cGUgPT09IDExICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBVc2UgdGV4dENvbnRlbnQgZm9yIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIC8vIGlubmVyVGV4dCB1c2FnZSByZW1vdmVkIGZvciBjb25zaXN0ZW5jeSBvZiBuZXcgbGluZXMgKGpRdWVyeSAjMTExNTMpXG4gICAgICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIGVsZW0udGV4dENvbnRlbnQgPT09IFwic3RyaW5nXCIgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyYXZlcnNlIGl0cyBjaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ICs9IGdldFRleHQoIGVsZW0gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIG5vZGVUeXBlID09PSAzIHx8IG5vZGVUeXBlID09PSA0ICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS5ub2RlVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBpbmNsdWRlIGNvbW1lbnQgb3IgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbiBub2Rlc1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIEV4cHIgPSBTaXp6bGUuc2VsZWN0b3JzID0ge1xuXG4gICAgICAgICAgICAgICAgLy8gQ2FuIGJlIGFkanVzdGVkIGJ5IHRoZSB1c2VyXG4gICAgICAgICAgICAgICAgY2FjaGVMZW5ndGg6IDUwLFxuXG4gICAgICAgICAgICAgICAgY3JlYXRlUHNldWRvOiBtYXJrRnVuY3Rpb24sXG5cbiAgICAgICAgICAgICAgICBtYXRjaDogbWF0Y2hFeHByLFxuXG4gICAgICAgICAgICAgICAgYXR0ckhhbmRsZToge30sXG5cbiAgICAgICAgICAgICAgICBmaW5kOiB7fSxcblxuICAgICAgICAgICAgICAgIHJlbGF0aXZlOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiPlwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIsIGZpcnN0OiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgXCIrXCI6IHsgZGlyOiBcInByZXZpb3VzU2libGluZ1wiLCBmaXJzdDogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICBcIn5cIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIgfVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBwcmVGaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJBVFRSXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoWzFdID0gbWF0Y2hbMV0ucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTW92ZSB0aGUgZ2l2ZW4gdmFsdWUgdG8gbWF0Y2hbM10gd2hldGhlciBxdW90ZWQgb3IgdW5xdW90ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoWzNdID0gKCBtYXRjaFszXSB8fCBtYXRjaFs0XSB8fCBtYXRjaFs1XSB8fCBcIlwiICkucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBtYXRjaFsyXSA9PT0gXCJ+PVwiICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoWzNdID0gXCIgXCIgKyBtYXRjaFszXSArIFwiIFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2guc2xpY2UoIDAsIDQgKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBcIkNISUxEXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIG1hdGNoZXMgZnJvbSBtYXRjaEV4cHJbXCJDSElMRFwiXVxuXHRcdFx0XHQxIHR5cGUgKG9ubHl8bnRofC4uLilcblx0XHRcdFx0MiB3aGF0IChjaGlsZHxvZi10eXBlKVxuXHRcdFx0XHQzIGFyZ3VtZW50IChldmVufG9kZHxcXGQqfFxcZCpuKFsrLV1cXGQrKT98Li4uKVxuXHRcdFx0XHQ0IHhuLWNvbXBvbmVudCBvZiB4bit5IGFyZ3VtZW50IChbKy1dP1xcZCpufClcblx0XHRcdFx0NSBzaWduIG9mIHhuLWNvbXBvbmVudFxuXHRcdFx0XHQ2IHggb2YgeG4tY29tcG9uZW50XG5cdFx0XHRcdDcgc2lnbiBvZiB5LWNvbXBvbmVudFxuXHRcdFx0XHQ4IHkgb2YgeS1jb21wb25lbnRcblx0XHRcdCovXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFsxXSA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbWF0Y2hbMV0uc2xpY2UoIDAsIDMgKSA9PT0gXCJudGhcIiApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBudGgtKiByZXF1aXJlcyBhcmd1bWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggIW1hdGNoWzNdICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXp6bGUuZXJyb3IoIG1hdGNoWzBdICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbnVtZXJpYyB4IGFuZCB5IHBhcmFtZXRlcnMgZm9yIEV4cHIuZmlsdGVyLkNISUxEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtZW1iZXIgdGhhdCBmYWxzZS90cnVlIGNhc3QgcmVzcGVjdGl2ZWx5IHRvIDAvMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoWzRdID0gKyggbWF0Y2hbNF0gPyBtYXRjaFs1XSArIChtYXRjaFs2XSB8fCAxKSA6IDIgKiAoIG1hdGNoWzNdID09PSBcImV2ZW5cIiB8fCBtYXRjaFszXSA9PT0gXCJvZGRcIiApICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hbNV0gPSArKCAoIG1hdGNoWzddICsgbWF0Y2hbOF0gKSB8fCBtYXRjaFszXSA9PT0gXCJvZGRcIiApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3RoZXIgdHlwZXMgcHJvaGliaXQgYXJndW1lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBtYXRjaFszXSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXp6bGUuZXJyb3IoIG1hdGNoWzBdICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBcIlBTRVVET1wiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhjZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVucXVvdGVkID0gIW1hdGNoWzZdICYmIG1hdGNoWzJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG1hdGNoRXhwcltcIkNISUxEXCJdLnRlc3QoIG1hdGNoWzBdICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFjY2VwdCBxdW90ZWQgYXJndW1lbnRzIGFzLWlzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG1hdGNoWzNdICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoWzJdID0gbWF0Y2hbNF0gfHwgbWF0Y2hbNV0gfHwgXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0cmlwIGV4Y2VzcyBjaGFyYWN0ZXJzIGZyb20gdW5xdW90ZWQgYXJndW1lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB1bnF1b3RlZCAmJiBycHNldWRvLnRlc3QoIHVucXVvdGVkICkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBHZXQgZXhjZXNzIGZyb20gdG9rZW5pemUgKHJlY3Vyc2l2ZWx5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChleGNlc3MgPSB0b2tlbml6ZSggdW5xdW90ZWQsIHRydWUgKSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZHZhbmNlIHRvIHRoZSBuZXh0IGNsb3NpbmcgcGFyZW50aGVzaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXhjZXNzID0gdW5xdW90ZWQuaW5kZXhPZiggXCIpXCIsIHVucXVvdGVkLmxlbmd0aCAtIGV4Y2VzcyApIC0gdW5xdW90ZWQubGVuZ3RoKSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4Y2VzcyBpcyBhIG5lZ2F0aXZlIGluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZSggMCwgZXhjZXNzICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hbMl0gPSB1bnF1b3RlZC5zbGljZSggMCwgZXhjZXNzICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiBvbmx5IGNhcHR1cmVzIG5lZWRlZCBieSB0aGUgcHNldWRvIGZpbHRlciBtZXRob2QgKHR5cGUgYW5kIGFyZ3VtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoLnNsaWNlKCAwLCAzICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZmlsdGVyOiB7XG5cbiAgICAgICAgICAgICAgICAgICAgXCJUQUdcIjogZnVuY3Rpb24oIG5vZGVOYW1lU2VsZWN0b3IgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZU5hbWUgPSBub2RlTmFtZVNlbGVjdG9yLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlTmFtZVNlbGVjdG9yID09PSBcIipcIiA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBub2RlTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIFwiQ0xBU1NcIjogZnVuY3Rpb24oIGNsYXNzTmFtZSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gY2xhc3NDYWNoZVsgY2xhc3NOYW1lICsgXCIgXCIgXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhdHRlcm4gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocGF0dGVybiA9IG5ldyBSZWdFeHAoIFwiKF58XCIgKyB3aGl0ZXNwYWNlICsgXCIpXCIgKyBjbGFzc05hbWUgKyBcIihcIiArIHdoaXRlc3BhY2UgKyBcInwkKVwiICkpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NDYWNoZSggY2xhc3NOYW1lLCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhdHRlcm4udGVzdCggdHlwZW9mIGVsZW0uY2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIGVsZW0uY2xhc3NOYW1lIHx8IHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBlbGVtLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBcIkFUVFJcIjogZnVuY3Rpb24oIG5hbWUsIG9wZXJhdG9yLCBjaGVjayApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gU2l6emxlLmF0dHIoIGVsZW0sIG5hbWUgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcmVzdWx0ID09IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcGVyYXRvciA9PT0gXCIhPVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFvcGVyYXRvciApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3BlcmF0b3IgPT09IFwiPVwiID8gcmVzdWx0ID09PSBjaGVjayA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yID09PSBcIiE9XCIgPyByZXN1bHQgIT09IGNoZWNrIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yID09PSBcIl49XCIgPyBjaGVjayAmJiByZXN1bHQuaW5kZXhPZiggY2hlY2sgKSA9PT0gMCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3IgPT09IFwiKj1cIiA/IGNoZWNrICYmIHJlc3VsdC5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRvciA9PT0gXCIkPVwiID8gY2hlY2sgJiYgcmVzdWx0LnNsaWNlKCAtY2hlY2subGVuZ3RoICkgPT09IGNoZWNrIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yID09PSBcIn49XCIgPyAoIFwiIFwiICsgcmVzdWx0LnJlcGxhY2UoIHJ3aGl0ZXNwYWNlLCBcIiBcIiApICsgXCIgXCIgKS5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yID09PSBcInw9XCIgPyByZXN1bHQgPT09IGNoZWNrIHx8IHJlc3VsdC5zbGljZSggMCwgY2hlY2subGVuZ3RoICsgMSApID09PSBjaGVjayArIFwiLVwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIFwiQ0hJTERcIjogZnVuY3Rpb24oIHR5cGUsIHdoYXQsIGFyZ3VtZW50LCBmaXJzdCwgbGFzdCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaW1wbGUgPSB0eXBlLnNsaWNlKCAwLCAzICkgIT09IFwibnRoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yd2FyZCA9IHR5cGUuc2xpY2UoIC00ICkgIT09IFwibGFzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mVHlwZSA9IHdoYXQgPT09IFwib2YtdHlwZVwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlyc3QgPT09IDEgJiYgbGFzdCA9PT0gMCA/XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dCBmb3IgOm50aC0qKG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWVsZW0ucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IDpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYWNoZSwgdW5pcXVlQ2FjaGUsIG91dGVyQ2FjaGUsIG5vZGUsIG5vZGVJbmRleCwgc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXIgPSBzaW1wbGUgIT09IGZvcndhcmQgPyBcIm5leHRTaWJsaW5nXCIgOiBcInByZXZpb3VzU2libGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IG9mVHlwZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VDYWNoZSA9ICF4bWwgJiYgIW9mVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZmYgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHBhcmVudCApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gOihmaXJzdHxsYXN0fG9ubHkpLShjaGlsZHxvZi10eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBzaW1wbGUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCBkaXIgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBlbGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIChub2RlID0gbm9kZVsgZGlyIF0pICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBvZlR5cGUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5vZGVUeXBlID09PSAxICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJldmVyc2UgZGlyZWN0aW9uIGZvciA6b25seS0qIChpZiB3ZSBoYXZlbid0IHlldCBkb25lIHNvKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IGRpciA9IHR5cGUgPT09IFwib25seVwiICYmICFzdGFydCAmJiBcIm5leHRTaWJsaW5nXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IFsgZm9yd2FyZCA/IHBhcmVudC5maXJzdENoaWxkIDogcGFyZW50Lmxhc3RDaGlsZCBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBub24teG1sIDpudGgtY2hpbGQoLi4uKSBzdG9yZXMgY2FjaGUgZGF0YSBvbiBgcGFyZW50YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBmb3J3YXJkICYmIHVzZUNhY2hlICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VlayBgZWxlbWAgZnJvbSBhIHByZXZpb3VzbHktY2FjaGVkIGluZGV4XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuLi5pbiBhIGd6aXAtZnJpZW5kbHkgd2F5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHBhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlckNhY2hlID0gbm9kZVsgZXhwYW5kbyBdIHx8IChub2RlWyBleHBhbmRvIF0gPSB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSA9IHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlID0gdW5pcXVlQ2FjaGVbIHR5cGUgXSB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlSW5kZXggPSBjYWNoZVsgMCBdID09PSBkaXJydW5zICYmIGNhY2hlWyAxIF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZiA9IG5vZGVJbmRleCAmJiBjYWNoZVsgMiBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlSW5kZXggJiYgcGFyZW50LmNoaWxkTm9kZXNbIG5vZGVJbmRleCBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCAobm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGYWxsYmFjayB0byBzZWVraW5nIGBlbGVtYCBmcm9tIHRoZSBzdGFydFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZGlmZiA9IG5vZGVJbmRleCA9IDApIHx8IHN0YXJ0LnBvcCgpKSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXaGVuIGZvdW5kLCBjYWNoZSBpbmRleGVzIG9uIGBwYXJlbnRgIGFuZCBicmVha1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG5vZGUubm9kZVR5cGUgPT09IDEgJiYgKytkaWZmICYmIG5vZGUgPT09IGVsZW0gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmlxdWVDYWNoZVsgdHlwZSBdID0gWyBkaXJydW5zLCBub2RlSW5kZXgsIGRpZmYgXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSBwcmV2aW91c2x5LWNhY2hlZCBlbGVtZW50IGluZGV4IGlmIGF2YWlsYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdXNlQ2FjaGUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC4uLmluIGEgZ3ppcC1mcmllbmRseSB3YXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IGVsZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyQ2FjaGUgPSBub2RlWyBleHBhbmRvIF0gfHwgKG5vZGVbIGV4cGFuZG8gXSA9IHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSA9IHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZSA9IHVuaXF1ZUNhY2hlWyB0eXBlIF0gfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVJbmRleCA9IGNhY2hlWyAwIF0gPT09IGRpcnJ1bnMgJiYgY2FjaGVbIDEgXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZiA9IG5vZGVJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB4bWwgOm50aC1jaGlsZCguLi4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3IgOm50aC1sYXN0LWNoaWxkKC4uLikgb3IgOm50aCgtbGFzdCk/LW9mLXR5cGUoLi4uKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZGlmZiA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSB0aGUgc2FtZSBsb29wIGFzIGFib3ZlIHRvIHNlZWsgYGVsZW1gIGZyb20gdGhlIHN0YXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggKG5vZGUgPSArK25vZGVJbmRleCAmJiBub2RlICYmIG5vZGVbIGRpciBdIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZGlmZiA9IG5vZGVJbmRleCA9IDApIHx8IHN0YXJ0LnBvcCgpKSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAoIG9mVHlwZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUubm9kZVR5cGUgPT09IDEgKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsrZGlmZiApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhY2hlIHRoZSBpbmRleCBvZiBlYWNoIGVuY291bnRlcmVkIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHVzZUNhY2hlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlckNhY2hlID0gbm9kZVsgZXhwYW5kbyBdIHx8IChub2RlWyBleHBhbmRvIF0gPSB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUUgPDkgb25seVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gPSB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlQ2FjaGVbIHR5cGUgXSA9IFsgZGlycnVucywgZGlmZiBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbm9kZSA9PT0gZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbmNvcnBvcmF0ZSB0aGUgb2Zmc2V0LCB0aGVuIGNoZWNrIGFnYWluc3QgY3ljbGUgc2l6ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZiAtPSBsYXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpZmYgPT09IGZpcnN0IHx8ICggZGlmZiAlIGZpcnN0ID09PSAwICYmIGRpZmYgLyBmaXJzdCA+PSAwICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIFwiUFNFVURPXCI6IGZ1bmN0aW9uKCBwc2V1ZG8sIGFyZ3VtZW50ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHNldWRvLWNsYXNzIG5hbWVzIGFyZSBjYXNlLWluc2Vuc2l0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI3BzZXVkby1jbGFzc2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQcmlvcml0aXplIGJ5IGNhc2Ugc2Vuc2l0aXZpdHkgaW4gY2FzZSBjdXN0b20gcHNldWRvcyBhcmUgYWRkZWQgd2l0aCB1cHBlcmNhc2UgbGV0dGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhhdCBzZXRGaWx0ZXJzIGluaGVyaXRzIGZyb20gcHNldWRvc1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4gPSBFeHByLnBzZXVkb3NbIHBzZXVkbyBdIHx8IEV4cHIuc2V0RmlsdGVyc1sgcHNldWRvLnRvTG93ZXJDYXNlKCkgXSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgcHNldWRvOiBcIiArIHBzZXVkbyApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgdXNlciBtYXkgdXNlIGNyZWF0ZVBzZXVkbyB0byBpbmRpY2F0ZSB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhcmd1bWVudHMgYXJlIG5lZWRlZCB0byBjcmVhdGUgdGhlIGZpbHRlciBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8ganVzdCBhcyBTaXp6bGUgZG9lc1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBmblsgZXhwYW5kbyBdICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmbiggYXJndW1lbnQgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQnV0IG1haW50YWluIHN1cHBvcnQgZm9yIG9sZCBzaWduYXR1cmVzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGZuLmxlbmd0aCA+IDEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncyA9IFsgcHNldWRvLCBwc2V1ZG8sIFwiXCIsIGFyZ3VtZW50IF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEV4cHIuc2V0RmlsdGVycy5oYXNPd25Qcm9wZXJ0eSggcHNldWRvLnRvTG93ZXJDYXNlKCkgKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZHgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZCA9IGZuKCBzZWVkLCBhcmd1bWVudCApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBtYXRjaGVkLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkeCA9IGluZGV4T2YoIHNlZWQsIG1hdGNoZWRbaV0gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWVkWyBpZHggXSA9ICEoIG1hdGNoZXNbIGlkeCBdID0gbWF0Y2hlZFtpXSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuKCBlbGVtLCAwLCBhcmdzICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBwc2V1ZG9zOiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBvdGVudGlhbGx5IGNvbXBsZXggcHNldWRvc1xuICAgICAgICAgICAgICAgICAgICBcIm5vdFwiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpbSB0aGUgc2VsZWN0b3IgcGFzc2VkIHRvIGNvbXBpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGF2b2lkIHRyZWF0aW5nIGxlYWRpbmcgYW5kIHRyYWlsaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzcGFjZXMgYXMgY29tYmluYXRvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVyID0gY29tcGlsZSggc2VsZWN0b3IucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVyWyBleHBhbmRvIF0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcywgY29udGV4dCwgeG1sICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubWF0Y2hlZCA9IG1hdGNoZXIoIHNlZWQsIG51bGwsIHhtbCwgW10gKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBzZWVkLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNYXRjaCBlbGVtZW50cyB1bm1hdGNoZWQgYnkgYG1hdGNoZXJgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAoZWxlbSA9IHVubWF0Y2hlZFtpXSkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VlZFtpXSA9ICEobWF0Y2hlc1tpXSA9IGVsZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0WzBdID0gZWxlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlciggaW5wdXQsIG51bGwsIHhtbCwgcmVzdWx0cyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBrZWVwIHRoZSBlbGVtZW50IChpc3N1ZSAjMjk5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFswXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhcmVzdWx0cy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgICAgICBcImhhc1wiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBTaXp6bGUoIHNlbGVjdG9yLCBlbGVtICkubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgICAgICAgIFwiY29udGFpbnNcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCB0ZXh0ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCBlbGVtLnRleHRDb250ZW50IHx8IGVsZW0uaW5uZXJUZXh0IHx8IGdldFRleHQoIGVsZW0gKSApLmluZGV4T2YoIHRleHQgKSA+IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gXCJXaGV0aGVyIGFuIGVsZW1lbnQgaXMgcmVwcmVzZW50ZWQgYnkgYSA6bGFuZygpIHNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgIC8vIGlzIGJhc2VkIHNvbGVseSBvbiB0aGUgZWxlbWVudCdzIGxhbmd1YWdlIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIC8vIGJlaW5nIGVxdWFsIHRvIHRoZSBpZGVudGlmaWVyIEMsXG4gICAgICAgICAgICAgICAgICAgIC8vIG9yIGJlZ2lubmluZyB3aXRoIHRoZSBpZGVudGlmaWVyIEMgaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgXCItXCIuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBtYXRjaGluZyBvZiBDIGFnYWluc3QgdGhlIGVsZW1lbnQncyBsYW5ndWFnZSB2YWx1ZSBpcyBwZXJmb3JtZWQgY2FzZS1pbnNlbnNpdGl2ZWx5LlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgaWRlbnRpZmllciBDIGRvZXMgbm90IGhhdmUgdG8gYmUgYSB2YWxpZCBsYW5ndWFnZSBuYW1lLlwiXG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jbGFuZy1wc2V1ZG9cbiAgICAgICAgICAgICAgICAgICAgXCJsYW5nXCI6IG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIGxhbmcgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsYW5nIHZhbHVlIG11c3QgYmUgYSB2YWxpZCBpZGVudGlmaWVyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFyaWRlbnRpZmllci50ZXN0KGxhbmcgfHwgXCJcIikgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2l6emxlLmVycm9yKCBcInVuc3VwcG9ydGVkIGxhbmc6IFwiICsgbGFuZyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGFuZyA9IGxhbmcucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtTGFuZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggKGVsZW1MYW5nID0gZG9jdW1lbnRJc0hUTUwgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0ubGFuZyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5nZXRBdHRyaWJ1dGUoXCJ4bWw6bGFuZ1wiKSB8fCBlbGVtLmdldEF0dHJpYnV0ZShcImxhbmdcIikpICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtTGFuZyA9IGVsZW1MYW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbUxhbmcgPT09IGxhbmcgfHwgZWxlbUxhbmcuaW5kZXhPZiggbGFuZyArIFwiLVwiICkgPT09IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IHdoaWxlICggKGVsZW0gPSBlbGVtLnBhcmVudE5vZGUpICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgICAgICAvLyBNaXNjZWxsYW5lb3VzXG4gICAgICAgICAgICAgICAgICAgIFwidGFyZ2V0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24gJiYgd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzaCAmJiBoYXNoLnNsaWNlKCAxICkgPT09IGVsZW0uaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgXCJyb290XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0gPT09IGRvY0VsZW07XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgXCJmb2N1c1wiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmICghZG9jdW1lbnQuaGFzRm9jdXMgfHwgZG9jdW1lbnQuaGFzRm9jdXMoKSkgJiYgISEoZWxlbS50eXBlIHx8IGVsZW0uaHJlZiB8fCB+ZWxlbS50YWJJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQm9vbGVhbiBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICAgIFwiZW5hYmxlZFwiOiBjcmVhdGVEaXNhYmxlZFBzZXVkbyggZmFsc2UgKSxcbiAgICAgICAgICAgICAgICAgICAgXCJkaXNhYmxlZFwiOiBjcmVhdGVEaXNhYmxlZFBzZXVkbyggdHJ1ZSApLFxuXG4gICAgICAgICAgICAgICAgICAgIFwiY2hlY2tlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluIENTUzMsIDpjaGVja2VkIHNob3VsZCByZXR1cm4gYm90aCBjaGVja2VkIGFuZCBzZWxlY3RlZCBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxMS9SRUMtY3NzMy1zZWxlY3RvcnMtMjAxMTA5MjkvI2NoZWNrZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub2RlTmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAobm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiAhIWVsZW0uY2hlY2tlZCkgfHwgKG5vZGVOYW1lID09PSBcIm9wdGlvblwiICYmICEhZWxlbS5zZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFjY2Vzc2luZyB0aGlzIHByb3BlcnR5IG1ha2VzIHNlbGVjdGVkLWJ5LWRlZmF1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9wdGlvbnMgaW4gU2FmYXJpIHdvcmsgcHJvcGVybHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZWxlbS5wYXJlbnROb2RlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0ucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS5zZWxlY3RlZCA9PT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICAvLyBDb250ZW50c1xuICAgICAgICAgICAgICAgICAgICBcImVtcHR5XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNlbXB0eS1wc2V1ZG9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDplbXB0eSBpcyBuZWdhdGVkIGJ5IGVsZW1lbnQgKDEpIG9yIGNvbnRlbnQgbm9kZXMgKHRleHQ6IDM7IGNkYXRhOiA0OyBlbnRpdHkgcmVmOiA1KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgYnV0IG5vdCBieSBvdGhlcnMgKGNvbW1lbnQ6IDg7IHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb246IDc7IGV0Yy4pXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBub2RlVHlwZSA8IDYgd29ya3MgYmVjYXVzZSBhdHRyaWJ1dGVzICgyKSBkbyBub3QgYXBwZWFyIGFzIGNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKCBlbGVtID0gZWxlbS5maXJzdENoaWxkOyBlbGVtOyBlbGVtID0gZWxlbS5uZXh0U2libGluZyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGVsZW0ubm9kZVR5cGUgPCA2ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgXCJwYXJlbnRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIUV4cHIucHNldWRvc1tcImVtcHR5XCJdKCBlbGVtICk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRWxlbWVudC9pbnB1dCB0eXBlc1xuICAgICAgICAgICAgICAgICAgICBcImhlYWRlclwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByaGVhZGVyLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBcImlucHV0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJpbnB1dHMudGVzdCggZWxlbS5ub2RlTmFtZSApO1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gXCJidXR0b25cIiB8fCBuYW1lID09PSBcImJ1dHRvblwiO1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdHRyO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS50eXBlID09PSBcInRleHRcIiAmJlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5ldyBIVE1MNSBhdHRyaWJ1dGUgdmFsdWVzIChlLmcuLCBcInNlYXJjaFwiKSBhcHBlYXIgd2l0aCBlbGVtLnR5cGUgPT09IFwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCAoYXR0ciA9IGVsZW0uZ2V0QXR0cmlidXRlKFwidHlwZVwiKSkgPT0gbnVsbCB8fCBhdHRyLnRvTG93ZXJDYXNlKCkgPT09IFwidGV4dFwiICk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUG9zaXRpb24taW4tY29sbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICBcImZpcnN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWyAwIF07XG4gICAgICAgICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgICAgICAgIFwibGFzdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbIGxlbmd0aCAtIDEgXTtcbiAgICAgICAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgICAgICAgXCJlcVwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWyBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50IF07XG4gICAgICAgICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgICAgICAgIFwiZXZlblwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSArPSAyICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hJbmRleGVzO1xuICAgICAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgICAgICBcIm9kZFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSArPSAyICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hJbmRleGVzO1xuICAgICAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgICAgICBcImx0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoIDsgLS1pID49IDA7ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hJbmRleGVzO1xuICAgICAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgICAgICBcImd0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoIDsgKytpIDwgbGVuZ3RoOyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoSW5kZXhlcztcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBFeHByLnBzZXVkb3NbXCJudGhcIl0gPSBFeHByLnBzZXVkb3NbXCJlcVwiXTtcblxuLy8gQWRkIGJ1dHRvbi9pbnB1dCB0eXBlIHBzZXVkb3NcbiAgICAgICAgICAgIGZvciAoIGkgaW4geyByYWRpbzogdHJ1ZSwgY2hlY2tib3g6IHRydWUsIGZpbGU6IHRydWUsIHBhc3N3b3JkOiB0cnVlLCBpbWFnZTogdHJ1ZSB9ICkge1xuICAgICAgICAgICAgICAgIEV4cHIucHNldWRvc1sgaSBdID0gY3JlYXRlSW5wdXRQc2V1ZG8oIGkgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoIGkgaW4geyBzdWJtaXQ6IHRydWUsIHJlc2V0OiB0cnVlIH0gKSB7XG4gICAgICAgICAgICAgICAgRXhwci5wc2V1ZG9zWyBpIF0gPSBjcmVhdGVCdXR0b25Qc2V1ZG8oIGkgKTtcbiAgICAgICAgICAgIH1cblxuLy8gRWFzeSBBUEkgZm9yIGNyZWF0aW5nIG5ldyBzZXRGaWx0ZXJzXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRGaWx0ZXJzKCkge31cbiAgICAgICAgICAgIHNldEZpbHRlcnMucHJvdG90eXBlID0gRXhwci5maWx0ZXJzID0gRXhwci5wc2V1ZG9zO1xuICAgICAgICAgICAgRXhwci5zZXRGaWx0ZXJzID0gbmV3IHNldEZpbHRlcnMoKTtcblxuICAgICAgICAgICAgdG9rZW5pemUgPSBTaXp6bGUudG9rZW5pemUgPSBmdW5jdGlvbiggc2VsZWN0b3IsIHBhcnNlT25seSApIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2hlZCwgbWF0Y2gsIHRva2VucywgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgc29GYXIsIGdyb3VwcywgcHJlRmlsdGVycyxcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVkID0gdG9rZW5DYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBjYWNoZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZU9ubHkgPyAwIDogY2FjaGVkLnNsaWNlKCAwICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc29GYXIgPSBzZWxlY3RvcjtcbiAgICAgICAgICAgICAgICBncm91cHMgPSBbXTtcbiAgICAgICAgICAgICAgICBwcmVGaWx0ZXJzID0gRXhwci5wcmVGaWx0ZXI7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAoIHNvRmFyICkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENvbW1hIGFuZCBmaXJzdCBydW5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbWF0Y2hlZCB8fCAobWF0Y2ggPSByY29tbWEuZXhlYyggc29GYXIgKSkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG1hdGNoICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGNvbnN1bWUgdHJhaWxpbmcgY29tbWFzIGFzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hbMF0ubGVuZ3RoICkgfHwgc29GYXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cHMucHVzaCggKHRva2VucyA9IFtdKSApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENvbWJpbmF0b3JzXG4gICAgICAgICAgICAgICAgICAgIGlmICggKG1hdGNoID0gcmNvbWJpbmF0b3JzLmV4ZWMoIHNvRmFyICkpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZCA9IG1hdGNoLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG1hdGNoZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FzdCBkZXNjZW5kYW50IGNvbWJpbmF0b3JzIHRvIHNwYWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbWF0Y2hbMF0ucmVwbGFjZSggcnRyaW0sIFwiIFwiIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hlZC5sZW5ndGggKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEZpbHRlcnNcbiAgICAgICAgICAgICAgICAgICAgZm9yICggdHlwZSBpbiBFeHByLmZpbHRlciApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggKG1hdGNoID0gbWF0Y2hFeHByWyB0eXBlIF0uZXhlYyggc29GYXIgKSkgJiYgKCFwcmVGaWx0ZXJzWyB0eXBlIF0gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1hdGNoID0gcHJlRmlsdGVyc1sgdHlwZSBdKCBtYXRjaCApKSkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZCA9IG1hdGNoLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbWF0Y2hlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlczogbWF0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaGVkLmxlbmd0aCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbWF0Y2hlZCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBsZW5ndGggb2YgdGhlIGludmFsaWQgZXhjZXNzXG4gICAgICAgICAgICAgICAgLy8gaWYgd2UncmUganVzdCBwYXJzaW5nXG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCB0aHJvdyBhbiBlcnJvciBvciByZXR1cm4gdG9rZW5zXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlT25seSA/XG4gICAgICAgICAgICAgICAgICAgIHNvRmFyLmxlbmd0aCA6XG4gICAgICAgICAgICAgICAgICAgIHNvRmFyID9cbiAgICAgICAgICAgICAgICAgICAgICAgIFNpenpsZS5lcnJvciggc2VsZWN0b3IgKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDYWNoZSB0aGUgdG9rZW5zXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbkNhY2hlKCBzZWxlY3RvciwgZ3JvdXBzICkuc2xpY2UoIDAgKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHRvU2VsZWN0b3IoIHRva2VucyApIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IDAsXG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IHRva2Vucy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gXCJcIjtcbiAgICAgICAgICAgICAgICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IgKz0gdG9rZW5zW2ldLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZENvbWJpbmF0b3IoIG1hdGNoZXIsIGNvbWJpbmF0b3IsIGJhc2UgKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpciA9IGNvbWJpbmF0b3IuZGlyLFxuICAgICAgICAgICAgICAgICAgICBza2lwID0gY29tYmluYXRvci5uZXh0LFxuICAgICAgICAgICAgICAgICAgICBrZXkgPSBza2lwIHx8IGRpcixcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tOb25FbGVtZW50cyA9IGJhc2UgJiYga2V5ID09PSBcInBhcmVudE5vZGVcIixcbiAgICAgICAgICAgICAgICAgICAgZG9uZU5hbWUgPSBkb25lKys7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY29tYmluYXRvci5maXJzdCA/XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGFnYWluc3QgY2xvc2VzdCBhbmNlc3Rvci9wcmVjZWRpbmcgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSA6XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgYWdhaW5zdCBhbGwgYW5jZXN0b3IvcHJlY2VkaW5nIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2xkQ2FjaGUsIHVuaXF1ZUNhY2hlLCBvdXRlckNhY2hlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhY2hlID0gWyBkaXJydW5zLCBkb25lTmFtZSBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW4ndCBzZXQgYXJiaXRyYXJ5IGRhdGEgb24gWE1MIG5vZGVzLCBzbyB0aGV5IGRvbid0IGJlbmVmaXQgZnJvbSBjb21iaW5hdG9yIGNhY2hpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggeG1sICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggKGVsZW0gPSBlbGVtWyBkaXIgXSkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlckNhY2hlID0gZWxlbVsgZXhwYW5kbyBdIHx8IChlbGVtWyBleHBhbmRvIF0gPSB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBlbGVtLnVuaXF1ZUlEIF0gfHwgKG91dGVyQ2FjaGVbIGVsZW0udW5pcXVlSUQgXSA9IHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBza2lwICYmIHNraXAgPT09IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtID0gZWxlbVsgZGlyIF0gfHwgZWxlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIChvbGRDYWNoZSA9IHVuaXF1ZUNhY2hlWyBrZXkgXSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRDYWNoZVsgMCBdID09PSBkaXJydW5zICYmIG9sZENhY2hlWyAxIF0gPT09IGRvbmVOYW1lICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXNzaWduIHRvIG5ld0NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG5ld0NhY2hlWyAyIF0gPSBvbGRDYWNoZVsgMiBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmV1c2UgbmV3Y2FjaGUgc28gcmVzdWx0cyBiYWNrLXByb3BhZ2F0ZSB0byBwcmV2aW91cyBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXF1ZUNhY2hlWyBrZXkgXSA9IG5ld0NhY2hlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQSBtYXRjaCBtZWFucyB3ZSdyZSBkb25lOyBhIGZhaWwgbWVhbnMgd2UgaGF2ZSB0byBrZWVwIGNoZWNraW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAobmV3Q2FjaGVbIDIgXSA9IG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXJzLmxlbmd0aCA+IDEgP1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBtYXRjaGVycy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFtYXRjaGVyc1tpXSggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXJzWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBtdWx0aXBsZUNvbnRleHRzKCBzZWxlY3RvciwgY29udGV4dHMsIHJlc3VsdHMgKSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgICAgICAgICBsZW4gPSBjb250ZXh0cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgICAgIFNpenpsZSggc2VsZWN0b3IsIGNvbnRleHRzW2ldLCByZXN1bHRzICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBjb25kZW5zZSggdW5tYXRjaGVkLCBtYXAsIGZpbHRlciwgY29udGV4dCwgeG1sICkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtLFxuICAgICAgICAgICAgICAgICAgICBuZXdVbm1hdGNoZWQgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IHVubWF0Y2hlZC5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIG1hcHBlZCA9IG1hcCAhPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgZm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggKGVsZW0gPSB1bm1hdGNoZWRbaV0pICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhZmlsdGVyIHx8IGZpbHRlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VW5tYXRjaGVkLnB1c2goIGVsZW0gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG1hcHBlZCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwLnB1c2goIGkgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3VW5tYXRjaGVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRNYXRjaGVyKCBwcmVGaWx0ZXIsIHNlbGVjdG9yLCBtYXRjaGVyLCBwb3N0RmlsdGVyLCBwb3N0RmluZGVyLCBwb3N0U2VsZWN0b3IgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBwb3N0RmlsdGVyICYmICFwb3N0RmlsdGVyWyBleHBhbmRvIF0gKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RGaWx0ZXIgPSBzZXRNYXRjaGVyKCBwb3N0RmlsdGVyICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICggcG9zdEZpbmRlciAmJiAhcG9zdEZpbmRlclsgZXhwYW5kbyBdICkge1xuICAgICAgICAgICAgICAgICAgICBwb3N0RmluZGVyID0gc2V0TWF0Y2hlciggcG9zdEZpbmRlciwgcG9zdFNlbGVjdG9yICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIHJlc3VsdHMsIGNvbnRleHQsIHhtbCApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXAsIGksIGVsZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVNYXAgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RNYXAgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWV4aXN0aW5nID0gcmVzdWx0cy5sZW5ndGgsXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCBpbml0aWFsIGVsZW1lbnRzIGZyb20gc2VlZCBvciBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtcyA9IHNlZWQgfHwgbXVsdGlwbGVDb250ZXh0cyggc2VsZWN0b3IgfHwgXCIqXCIsIGNvbnRleHQubm9kZVR5cGUgPyBbIGNvbnRleHQgXSA6IGNvbnRleHQsIFtdICksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFByZWZpbHRlciB0byBnZXQgbWF0Y2hlciBpbnB1dCwgcHJlc2VydmluZyBhIG1hcCBmb3Igc2VlZC1yZXN1bHRzIHN5bmNocm9uaXphdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlckluID0gcHJlRmlsdGVyICYmICggc2VlZCB8fCAhc2VsZWN0b3IgKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZGVuc2UoIGVsZW1zLCBwcmVNYXAsIHByZUZpbHRlciwgY29udGV4dCwgeG1sICkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1zLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVyT3V0ID0gbWF0Y2hlciA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHBvc3RGaW5kZXIsIG9yIGZpbHRlcmVkIHNlZWQsIG9yIG5vbi1zZWVkIHBvc3RGaWx0ZXIgb3IgcHJlZXhpc3RpbmcgcmVzdWx0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0RmluZGVyIHx8ICggc2VlZCA/IHByZUZpbHRlciA6IHByZWV4aXN0aW5nIHx8IHBvc3RGaWx0ZXIgKSA/XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLi4uaW50ZXJtZWRpYXRlIHByb2Nlc3NpbmcgaXMgbmVjZXNzYXJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdIDpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuLi5vdGhlcndpc2UgdXNlIHJlc3VsdHMgZGlyZWN0bHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlckluO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgcHJpbWFyeSBtYXRjaGVzXG4gICAgICAgICAgICAgICAgICAgIGlmICggbWF0Y2hlciApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXIoIG1hdGNoZXJJbiwgbWF0Y2hlck91dCwgY29udGV4dCwgeG1sICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBBcHBseSBwb3N0RmlsdGVyXG4gICAgICAgICAgICAgICAgICAgIGlmICggcG9zdEZpbHRlciApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAgPSBjb25kZW5zZSggbWF0Y2hlck91dCwgcG9zdE1hcCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdEZpbHRlciggdGVtcCwgW10sIGNvbnRleHQsIHhtbCApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVbi1tYXRjaCBmYWlsaW5nIGVsZW1lbnRzIGJ5IG1vdmluZyB0aGVtIGJhY2sgdG8gbWF0Y2hlckluXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gdGVtcC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIChlbGVtID0gdGVtcFtpXSkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXJPdXRbIHBvc3RNYXBbaV0gXSA9ICEobWF0Y2hlckluWyBwb3N0TWFwW2ldIF0gPSBlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIHNlZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHBvc3RGaW5kZXIgfHwgcHJlRmlsdGVyICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcG9zdEZpbmRlciApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBmaW5hbCBtYXRjaGVyT3V0IGJ5IGNvbmRlbnNpbmcgdGhpcyBpbnRlcm1lZGlhdGUgaW50byBwb3N0RmluZGVyIGNvbnRleHRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IG1hdGNoZXJPdXQubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggKGVsZW0gPSBtYXRjaGVyT3V0W2ldKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIG1hdGNoZXJJbiBzaW5jZSBlbGVtIGlzIG5vdCB5ZXQgYSBmaW5hbCBtYXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAucHVzaCggKG1hdGNoZXJJbltpXSA9IGVsZW0pICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdEZpbmRlciggbnVsbCwgKG1hdGNoZXJPdXQgPSBbXSksIHRlbXAsIHhtbCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1vdmUgbWF0Y2hlZCBlbGVtZW50cyBmcm9tIHNlZWQgdG8gcmVzdWx0cyB0byBrZWVwIHRoZW0gc3luY2hyb25pemVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IG1hdGNoZXJPdXQubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIChlbGVtID0gbWF0Y2hlck91dFtpXSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0ZW1wID0gcG9zdEZpbmRlciA/IGluZGV4T2YoIHNlZWQsIGVsZW0gKSA6IHByZU1hcFtpXSkgPiAtMSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VlZFt0ZW1wXSA9ICEocmVzdWx0c1t0ZW1wXSA9IGVsZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZWxlbWVudHMgdG8gcmVzdWx0cywgdGhyb3VnaCBwb3N0RmluZGVyIGlmIGRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXJPdXQgPSBjb25kZW5zZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVyT3V0ID09PSByZXN1bHRzID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlck91dC5zcGxpY2UoIHByZWV4aXN0aW5nLCBtYXRjaGVyT3V0Lmxlbmd0aCApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlck91dFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcG9zdEZpbmRlciApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0RmluZGVyKCBudWxsLCByZXN1bHRzLCBtYXRjaGVyT3V0LCB4bWwgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaC5hcHBseSggcmVzdWx0cywgbWF0Y2hlck91dCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hdGNoZXJGcm9tVG9rZW5zKCB0b2tlbnMgKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrQ29udGV4dCwgbWF0Y2hlciwgaixcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gdG9rZW5zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgbGVhZGluZ1JlbGF0aXZlID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zWzBdLnR5cGUgXSxcbiAgICAgICAgICAgICAgICAgICAgaW1wbGljaXRSZWxhdGl2ZSA9IGxlYWRpbmdSZWxhdGl2ZSB8fCBFeHByLnJlbGF0aXZlW1wiIFwiXSxcbiAgICAgICAgICAgICAgICAgICAgaSA9IGxlYWRpbmdSZWxhdGl2ZSA/IDEgOiAwLFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBmb3VuZGF0aW9uYWwgbWF0Y2hlciBlbnN1cmVzIHRoYXQgZWxlbWVudHMgYXJlIHJlYWNoYWJsZSBmcm9tIHRvcC1sZXZlbCBjb250ZXh0KHMpXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoQ29udGV4dCA9IGFkZENvbWJpbmF0b3IoIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0gPT09IGNoZWNrQ29udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgfSwgaW1wbGljaXRSZWxhdGl2ZSwgdHJ1ZSApLFxuICAgICAgICAgICAgICAgICAgICBtYXRjaEFueUNvbnRleHQgPSBhZGRDb21iaW5hdG9yKCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleE9mKCBjaGVja0NvbnRleHQsIGVsZW0gKSA+IC0xO1xuICAgICAgICAgICAgICAgICAgICB9LCBpbXBsaWNpdFJlbGF0aXZlLCB0cnVlICksXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXJzID0gWyBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldCA9ICggIWxlYWRpbmdSZWxhdGl2ZSAmJiAoIHhtbCB8fCBjb250ZXh0ICE9PSBvdXRlcm1vc3RDb250ZXh0ICkgKSB8fCAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNoZWNrQ29udGV4dCA9IGNvbnRleHQpLm5vZGVUeXBlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoQW55Q29udGV4dCggZWxlbSwgY29udGV4dCwgeG1sICkgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEF2b2lkIGhhbmdpbmcgb250byBlbGVtZW50IChpc3N1ZSAjMjk5KVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tDb250ZXh0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICAgICAgICAgIH0gXTtcblxuICAgICAgICAgICAgICAgIGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIChtYXRjaGVyID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zW2ldLnR5cGUgXSkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVycyA9IFsgYWRkQ29tYmluYXRvcihlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSwgbWF0Y2hlcikgXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXIgPSBFeHByLmZpbHRlclsgdG9rZW5zW2ldLnR5cGUgXS5hcHBseSggbnVsbCwgdG9rZW5zW2ldLm1hdGNoZXMgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHNwZWNpYWwgdXBvbiBzZWVpbmcgYSBwb3NpdGlvbmFsIG1hdGNoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbWF0Y2hlclsgZXhwYW5kbyBdICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIG5leHQgcmVsYXRpdmUgb3BlcmF0b3IgKGlmIGFueSkgZm9yIHByb3BlciBoYW5kbGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPSArK2k7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICggOyBqIDwgbGVuOyBqKysgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggRXhwci5yZWxhdGl2ZVsgdG9rZW5zW2pdLnR5cGUgXSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXRNYXRjaGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID4gMSAmJiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA+IDEgJiYgdG9TZWxlY3RvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHByZWNlZGluZyB0b2tlbiB3YXMgYSBkZXNjZW5kYW50IGNvbWJpbmF0b3IsIGluc2VydCBhbiBpbXBsaWNpdCBhbnktZWxlbWVudCBgKmBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5zLnNsaWNlKCAwLCBpIC0gMSApLmNvbmNhdCh7IHZhbHVlOiB0b2tlbnNbIGkgLSAyIF0udHlwZSA9PT0gXCIgXCIgPyBcIipcIiA6IFwiXCIgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5yZXBsYWNlKCBydHJpbSwgXCIkMVwiICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPCBqICYmIG1hdGNoZXJGcm9tVG9rZW5zKCB0b2tlbnMuc2xpY2UoIGksIGogKSApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqIDwgbGVuICYmIG1hdGNoZXJGcm9tVG9rZW5zKCAodG9rZW5zID0gdG9rZW5zLnNsaWNlKCBqICkpICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPCBsZW4gJiYgdG9TZWxlY3RvciggdG9rZW5zIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcnMucHVzaCggbWF0Y2hlciApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ5U2V0ID0gc2V0TWF0Y2hlcnMubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICAgICAgICAgYnlFbGVtZW50ID0gZWxlbWVudE1hdGNoZXJzLmxlbmd0aCA+IDAsXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyTWF0Y2hlciA9IGZ1bmN0aW9uKCBzZWVkLCBjb250ZXh0LCB4bWwsIHJlc3VsdHMsIG91dGVybW9zdCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtLCBqLCBtYXRjaGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZWRDb3VudCA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubWF0Y2hlZCA9IHNlZWQgJiYgW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWF0Y2hlZCA9IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRCYWNrdXAgPSBvdXRlcm1vc3RDb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIG11c3QgYWx3YXlzIGhhdmUgZWl0aGVyIHNlZWQgZWxlbWVudHMgb3Igb3V0ZXJtb3N0IGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtcyA9IHNlZWQgfHwgYnlFbGVtZW50ICYmIEV4cHIuZmluZFtcIlRBR1wiXSggXCIqXCIsIG91dGVybW9zdCApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSBpbnRlZ2VyIGRpcnJ1bnMgaWZmIHRoaXMgaXMgdGhlIG91dGVybW9zdCBtYXRjaGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlycnVuc1VuaXF1ZSA9IChkaXJydW5zICs9IGNvbnRleHRCYWNrdXAgPT0gbnVsbCA/IDEgOiBNYXRoLnJhbmRvbSgpIHx8IDAuMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gZWxlbXMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG91dGVybW9zdCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlcm1vc3RDb250ZXh0ID0gY29udGV4dCA9PT0gZG9jdW1lbnQgfHwgY29udGV4dCB8fCBvdXRlcm1vc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCBlbGVtZW50cyBwYXNzaW5nIGVsZW1lbnRNYXRjaGVycyBkaXJlY3RseSB0byByZXN1bHRzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw5LCBTYWZhcmlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRvbGVyYXRlIE5vZGVMaXN0IHByb3BlcnRpZXMgKElFOiBcImxlbmd0aFwiOyBTYWZhcmk6IDxudW1iZXI+KSBtYXRjaGluZyBlbGVtZW50cyBieSBpZFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICggOyBpICE9PSBsZW4gJiYgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggYnlFbGVtZW50ICYmIGVsZW0gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFjb250ZXh0ICYmIGVsZW0ub3duZXJEb2N1bWVudCAhPT0gZG9jdW1lbnQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXREb2N1bWVudCggZWxlbSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1sID0gIWRvY3VtZW50SXNIVE1MO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggKG1hdGNoZXIgPSBlbGVtZW50TWF0Y2hlcnNbaisrXSkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQgfHwgZG9jdW1lbnQsIHhtbCkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKCBlbGVtICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBvdXRlcm1vc3QgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJydW5zID0gZGlycnVuc1VuaXF1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyYWNrIHVubWF0Y2hlZCBlbGVtZW50cyBmb3Igc2V0IGZpbHRlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGJ5U2V0ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGV5IHdpbGwgaGF2ZSBnb25lIHRocm91Z2ggYWxsIHBvc3NpYmxlIG1hdGNoZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggKGVsZW0gPSAhbWF0Y2hlciAmJiBlbGVtKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZWRDb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTGVuZ3RoZW4gdGhlIGFycmF5IGZvciBldmVyeSBlbGVtZW50LCBtYXRjaGVkIG9yIG5vdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHNlZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bm1hdGNoZWQucHVzaCggZWxlbSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBgaWAgaXMgbm93IHRoZSBjb3VudCBvZiBlbGVtZW50cyB2aXNpdGVkIGFib3ZlLCBhbmQgYWRkaW5nIGl0IHRvIGBtYXRjaGVkQ291bnRgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtYWtlcyB0aGUgbGF0dGVyIG5vbm5lZ2F0aXZlLlxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZENvdW50ICs9IGk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFwcGx5IHNldCBmaWx0ZXJzIHRvIHVubWF0Y2hlZCBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogVGhpcyBjYW4gYmUgc2tpcHBlZCBpZiB0aGVyZSBhcmUgbm8gdW5tYXRjaGVkIGVsZW1lbnRzIChpLmUuLCBgbWF0Y2hlZENvdW50YFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXF1YWxzIGBpYCksIHVubGVzcyB3ZSBkaWRuJ3QgdmlzaXQgX2FueV8gZWxlbWVudHMgaW4gdGhlIGFib3ZlIGxvb3AgYmVjYXVzZSB3ZSBoYXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBubyBlbGVtZW50IG1hdGNoZXJzIGFuZCBubyBzZWVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW5jcmVtZW50aW5nIGFuIGluaXRpYWxseS1zdHJpbmcgXCIwXCIgYGlgIGFsbG93cyBgaWAgdG8gcmVtYWluIGEgc3RyaW5nIG9ubHkgaW4gdGhhdFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FzZSwgd2hpY2ggd2lsbCByZXN1bHQgaW4gYSBcIjAwXCIgYG1hdGNoZWRDb3VudGAgdGhhdCBkaWZmZXJzIGZyb20gYGlgIGJ1dCBpcyBhbHNvXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBudW1lcmljYWxseSB6ZXJvLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBieVNldCAmJiBpICE9PSBtYXRjaGVkQ291bnQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCAobWF0Y2hlciA9IHNldE1hdGNoZXJzW2orK10pICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVyKCB1bm1hdGNoZWQsIHNldE1hdGNoZWQsIGNvbnRleHQsIHhtbCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggc2VlZCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVpbnRlZ3JhdGUgZWxlbWVudCBtYXRjaGVzIHRvIGVsaW1pbmF0ZSB0aGUgbmVlZCBmb3Igc29ydGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG1hdGNoZWRDb3VudCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoICEodW5tYXRjaGVkW2ldIHx8IHNldE1hdGNoZWRbaV0pICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNYXRjaGVkW2ldID0gcG9wLmNhbGwoIHJlc3VsdHMgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEaXNjYXJkIGluZGV4IHBsYWNlaG9sZGVyIHZhbHVlcyB0byBnZXQgb25seSBhY3R1YWwgbWF0Y2hlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNYXRjaGVkID0gY29uZGVuc2UoIHNldE1hdGNoZWQgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgbWF0Y2hlcyB0byByZXN1bHRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaC5hcHBseSggcmVzdWx0cywgc2V0TWF0Y2hlZCApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VlZGxlc3Mgc2V0IG1hdGNoZXMgc3VjY2VlZGluZyBtdWx0aXBsZSBzdWNjZXNzZnVsIG1hdGNoZXJzIHN0aXB1bGF0ZSBzb3J0aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBvdXRlcm1vc3QgJiYgIXNlZWQgJiYgc2V0TWF0Y2hlZC5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICggbWF0Y2hlZENvdW50ICsgc2V0TWF0Y2hlcnMubGVuZ3RoICkgPiAxICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpenpsZS51bmlxdWVTb3J0KCByZXN1bHRzICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPdmVycmlkZSBtYW5pcHVsYXRpb24gb2YgZ2xvYmFscyBieSBuZXN0ZWQgbWF0Y2hlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggb3V0ZXJtb3N0ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcnJ1bnMgPSBkaXJydW5zVW5pcXVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVybW9zdENvbnRleHQgPSBjb250ZXh0QmFja3VwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5tYXRjaGVkO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ5U2V0ID9cbiAgICAgICAgICAgICAgICAgICAgbWFya0Z1bmN0aW9uKCBzdXBlck1hdGNoZXIgKSA6XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyTWF0Y2hlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29tcGlsZSA9IFNpenpsZS5jb21waWxlID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBtYXRjaCAvKiBJbnRlcm5hbCBVc2UgT25seSAqLyApIHtcbiAgICAgICAgICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgICAgICAgICAgc2V0TWF0Y2hlcnMgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudE1hdGNoZXJzID0gW10sXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXTtcblxuICAgICAgICAgICAgICAgIGlmICggIWNhY2hlZCApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgYSBmdW5jdGlvbiBvZiByZWN1cnNpdmUgZnVuY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWQgdG8gY2hlY2sgZWFjaCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIGlmICggIW1hdGNoICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSB0b2tlbml6ZSggc2VsZWN0b3IgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpID0gbWF0Y2gubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlZCA9IG1hdGNoZXJGcm9tVG9rZW5zKCBtYXRjaFtpXSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBjYWNoZWRbIGV4cGFuZG8gXSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNYXRjaGVycy5wdXNoKCBjYWNoZWQgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudE1hdGNoZXJzLnB1c2goIGNhY2hlZCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FjaGUgdGhlIGNvbXBpbGVkIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGUoIHNlbGVjdG9yLCBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKSApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFNhdmUgc2VsZWN0b3IgYW5kIHRva2VuaXphdGlvblxuICAgICAgICAgICAgICAgICAgICBjYWNoZWQuc2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlZDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSBsb3ctbGV2ZWwgc2VsZWN0aW9uIGZ1bmN0aW9uIHRoYXQgd29ya3Mgd2l0aCBTaXp6bGUncyBjb21waWxlZFxuICAgICAgICAgICAgICogIHNlbGVjdG9yIGZ1bmN0aW9uc1xuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IHNlbGVjdG9yIEEgc2VsZWN0b3Igb3IgYSBwcmUtY29tcGlsZWRcbiAgICAgICAgICAgICAqICBzZWxlY3RvciBmdW5jdGlvbiBidWlsdCB3aXRoIFNpenpsZS5jb21waWxlXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRleHRcbiAgICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IFtyZXN1bHRzXVxuICAgICAgICAgICAgICogQHBhcmFtIHtBcnJheX0gW3NlZWRdIEEgc2V0IG9mIGVsZW1lbnRzIHRvIG1hdGNoIGFnYWluc3RcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc2VsZWN0ID0gU2l6emxlLnNlbGVjdCA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgdG9rZW5zLCB0b2tlbiwgdHlwZSwgZmluZCxcbiAgICAgICAgICAgICAgICAgICAgY29tcGlsZWQgPSB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBzZWxlY3RvcixcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSAhc2VlZCAmJiB0b2tlbml6ZSggKHNlbGVjdG9yID0gY29tcGlsZWQuc2VsZWN0b3IgfHwgc2VsZWN0b3IpICk7XG5cbiAgICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblxuICAgICAgICAgICAgICAgIC8vIFRyeSB0byBtaW5pbWl6ZSBvcGVyYXRpb25zIGlmIHRoZXJlIGlzIG9ubHkgb25lIHNlbGVjdG9yIGluIHRoZSBsaXN0IGFuZCBubyBzZWVkXG4gICAgICAgICAgICAgICAgLy8gKHRoZSBsYXR0ZXIgb2Ygd2hpY2ggZ3VhcmFudGVlcyB1cyBjb250ZXh0KVxuICAgICAgICAgICAgICAgIGlmICggbWF0Y2gubGVuZ3RoID09PSAxICkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlZHVjZSBjb250ZXh0IGlmIHRoZSBsZWFkaW5nIGNvbXBvdW5kIHNlbGVjdG9yIGlzIGFuIElEXG4gICAgICAgICAgICAgICAgICAgIHRva2VucyA9IG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UoIDAgKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0b2tlbnMubGVuZ3RoID4gMiAmJiAodG9rZW4gPSB0b2tlbnNbMF0pLnR5cGUgPT09IFwiSURcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5ub2RlVHlwZSA9PT0gOSAmJiBkb2N1bWVudElzSFRNTCAmJiBFeHByLnJlbGF0aXZlWyB0b2tlbnNbMV0udHlwZSBdICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gKCBFeHByLmZpbmRbXCJJRFwiXSggdG9rZW4ubWF0Y2hlc1swXS5yZXBsYWNlKHJ1bmVzY2FwZSwgZnVuZXNjYXBlKSwgY29udGV4dCApIHx8IFtdIClbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFjb250ZXh0ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJlY29tcGlsZWQgbWF0Y2hlcnMgd2lsbCBzdGlsbCB2ZXJpZnkgYW5jZXN0cnksIHNvIHN0ZXAgdXAgYSBsZXZlbFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggY29tcGlsZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IGNvbnRleHQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci5zbGljZSggdG9rZW5zLnNoaWZ0KCkudmFsdWUubGVuZ3RoICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBGZXRjaCBhIHNlZWQgc2V0IGZvciByaWdodC10by1sZWZ0IG1hdGNoaW5nXG4gICAgICAgICAgICAgICAgICAgIGkgPSBtYXRjaEV4cHJbXCJuZWVkc0NvbnRleHRcIl0udGVzdCggc2VsZWN0b3IgKSA/IDAgOiB0b2tlbnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBYm9ydCBpZiB3ZSBoaXQgYSBjb21iaW5hdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIEV4cHIucmVsYXRpdmVbICh0eXBlID0gdG9rZW4udHlwZSkgXSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggKGZpbmQgPSBFeHByLmZpbmRbIHR5cGUgXSkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VhcmNoLCBleHBhbmRpbmcgY29udGV4dCBmb3IgbGVhZGluZyBzaWJsaW5nIGNvbWJpbmF0b3JzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAoc2VlZCA9IGZpbmQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5tYXRjaGVzWzBdLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByc2libGluZy50ZXN0KCB0b2tlbnNbMF0udHlwZSApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fCBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHNlZWQgaXMgZW1wdHkgb3Igbm8gdG9rZW5zIHJlbWFpbiwgd2UgY2FuIHJldHVybiBlYXJseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMuc3BsaWNlKCBpLCAxICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gc2VlZC5sZW5ndGggJiYgdG9TZWxlY3RvciggdG9rZW5zICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggIXNlbGVjdG9yICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaC5hcHBseSggcmVzdWx0cywgc2VlZCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBDb21waWxlIGFuZCBleGVjdXRlIGEgZmlsdGVyaW5nIGZ1bmN0aW9uIGlmIG9uZSBpcyBub3QgcHJvdmlkZWRcbiAgICAgICAgICAgICAgICAvLyBQcm92aWRlIGBtYXRjaGAgdG8gYXZvaWQgcmV0b2tlbml6YXRpb24gaWYgd2UgbW9kaWZpZWQgdGhlIHNlbGVjdG9yIGFib3ZlXG4gICAgICAgICAgICAgICAgKCBjb21waWxlZCB8fCBjb21waWxlKCBzZWxlY3RvciwgbWF0Y2ggKSApKFxuICAgICAgICAgICAgICAgICAgICBzZWVkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICAhZG9jdW1lbnRJc0hUTUwsXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMsXG4gICAgICAgICAgICAgICAgICAgICFjb250ZXh0IHx8IHJzaWJsaW5nLnRlc3QoIHNlbGVjdG9yICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgfTtcblxuLy8gT25lLXRpbWUgYXNzaWdubWVudHNcblxuLy8gU29ydCBzdGFiaWxpdHlcbiAgICAgICAgICAgIHN1cHBvcnQuc29ydFN0YWJsZSA9IGV4cGFuZG8uc3BsaXQoXCJcIikuc29ydCggc29ydE9yZGVyICkuam9pbihcIlwiKSA9PT0gZXhwYW5kbztcblxuLy8gU3VwcG9ydDogQ2hyb21lIDE0LTM1K1xuLy8gQWx3YXlzIGFzc3VtZSBkdXBsaWNhdGVzIGlmIHRoZXkgYXJlbid0IHBhc3NlZCB0byB0aGUgY29tcGFyaXNvbiBmdW5jdGlvblxuICAgICAgICAgICAgc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzID0gISFoYXNEdXBsaWNhdGU7XG5cbi8vIEluaXRpYWxpemUgYWdhaW5zdCB0aGUgZGVmYXVsdCBkb2N1bWVudFxuICAgICAgICAgICAgc2V0RG9jdW1lbnQoKTtcblxuLy8gU3VwcG9ydDogV2Via2l0PDUzNy4zMiAtIFNhZmFyaSA2LjAuMy9DaHJvbWUgMjUgKGZpeGVkIGluIENocm9tZSAyNylcbi8vIERldGFjaGVkIG5vZGVzIGNvbmZvdW5kaW5nbHkgZm9sbG93ICplYWNoIG90aGVyKlxuICAgICAgICAgICAgc3VwcG9ydC5zb3J0RGV0YWNoZWQgPSBhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuICAgICAgICAgICAgICAgIC8vIFNob3VsZCByZXR1cm4gMSwgYnV0IHJldHVybnMgNCAoZm9sbG93aW5nKVxuICAgICAgICAgICAgICAgIHJldHVybiBlbC5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpICkgJiAxO1xuICAgICAgICAgICAgfSk7XG5cbi8vIFN1cHBvcnQ6IElFPDhcbi8vIFByZXZlbnQgYXR0cmlidXRlL3Byb3BlcnR5IFwiaW50ZXJwb2xhdGlvblwiXG4vLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTM2NDI5JTI4VlMuODUlMjkuYXNweFxuICAgICAgICAgICAgaWYgKCAhYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gXCI8YSBocmVmPScjJz48L2E+XCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbC5maXJzdENoaWxkLmdldEF0dHJpYnV0ZShcImhyZWZcIikgPT09IFwiI1wiIDtcbiAgICAgICAgICAgICAgICB9KSApIHtcbiAgICAgICAgICAgICAgICBhZGRIYW5kbGUoIFwidHlwZXxocmVmfGhlaWdodHx3aWR0aFwiLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggIWlzWE1MICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lLCBuYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwidHlwZVwiID8gMSA6IDIgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4vLyBTdXBwb3J0OiBJRTw5XG4vLyBVc2UgZGVmYXVsdFZhbHVlIGluIHBsYWNlIG9mIGdldEF0dHJpYnV0ZShcInZhbHVlXCIpXG4gICAgICAgICAgICBpZiAoICFzdXBwb3J0LmF0dHJpYnV0ZXMgfHwgIWFzc2VydChmdW5jdGlvbiggZWwgKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IFwiPGlucHV0Lz5cIjtcbiAgICAgICAgICAgICAgICAgICAgZWwuZmlyc3RDaGlsZC5zZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiwgXCJcIiApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiApID09PSBcIlwiO1xuICAgICAgICAgICAgICAgIH0pICkge1xuICAgICAgICAgICAgICAgIGFkZEhhbmRsZSggXCJ2YWx1ZVwiLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggIWlzWE1MICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uZGVmYXVsdFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbi8vIFN1cHBvcnQ6IElFPDlcbi8vIFVzZSBnZXRBdHRyaWJ1dGVOb2RlIHRvIGZldGNoIGJvb2xlYW5zIHdoZW4gZ2V0QXR0cmlidXRlIGxpZXNcbiAgICAgICAgICAgIGlmICggIWFzc2VydChmdW5jdGlvbiggZWwgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSA9PSBudWxsO1xuICAgICAgICAgICAgICAgIH0pICkge1xuICAgICAgICAgICAgICAgIGFkZEhhbmRsZSggYm9vbGVhbnMsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhaXNYTUwgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbVsgbmFtZSBdID09PSB0cnVlID8gbmFtZS50b0xvd2VyQ2FzZSgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBuYW1lICkpICYmIHZhbC5zcGVjaWZpZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwudmFsdWUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBTaXp6bGU7XG5cbiAgICAgICAgfSkoIHdpbmRvdyApO1xuXG5cblxuICAgIGpRdWVyeS5maW5kID0gU2l6emxlO1xuICAgIGpRdWVyeS5leHByID0gU2l6emxlLnNlbGVjdG9ycztcblxuLy8gRGVwcmVjYXRlZFxuICAgIGpRdWVyeS5leHByWyBcIjpcIiBdID0galF1ZXJ5LmV4cHIucHNldWRvcztcbiAgICBqUXVlcnkudW5pcXVlU29ydCA9IGpRdWVyeS51bmlxdWUgPSBTaXp6bGUudW5pcXVlU29ydDtcbiAgICBqUXVlcnkudGV4dCA9IFNpenpsZS5nZXRUZXh0O1xuICAgIGpRdWVyeS5pc1hNTERvYyA9IFNpenpsZS5pc1hNTDtcbiAgICBqUXVlcnkuY29udGFpbnMgPSBTaXp6bGUuY29udGFpbnM7XG4gICAgalF1ZXJ5LmVzY2FwZVNlbGVjdG9yID0gU2l6emxlLmVzY2FwZTtcblxuXG5cblxuICAgIHZhciBkaXIgPSBmdW5jdGlvbiggZWxlbSwgZGlyLCB1bnRpbCApIHtcbiAgICAgICAgdmFyIG1hdGNoZWQgPSBbXSxcbiAgICAgICAgICAgIHRydW5jYXRlID0gdW50aWwgIT09IHVuZGVmaW5lZDtcblxuICAgICAgICB3aGlsZSAoICggZWxlbSA9IGVsZW1bIGRpciBdICkgJiYgZWxlbS5ub2RlVHlwZSAhPT0gOSApIHtcbiAgICAgICAgICAgIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcbiAgICAgICAgICAgICAgICBpZiAoIHRydW5jYXRlICYmIGpRdWVyeSggZWxlbSApLmlzKCB1bnRpbCApICkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbWF0Y2hlZC5wdXNoKCBlbGVtICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdGNoZWQ7XG4gICAgfTtcblxuXG4gICAgdmFyIHNpYmxpbmdzID0gZnVuY3Rpb24oIG4sIGVsZW0gKSB7XG4gICAgICAgIHZhciBtYXRjaGVkID0gW107XG5cbiAgICAgICAgZm9yICggOyBuOyBuID0gbi5uZXh0U2libGluZyApIHtcbiAgICAgICAgICAgIGlmICggbi5ub2RlVHlwZSA9PT0gMSAmJiBuICE9PSBlbGVtICkge1xuICAgICAgICAgICAgICAgIG1hdGNoZWQucHVzaCggbiApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWQ7XG4gICAgfTtcblxuXG4gICAgdmFyIHJuZWVkc0NvbnRleHQgPSBqUXVlcnkuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQ7XG5cblxuXG4gICAgZnVuY3Rpb24gbm9kZU5hbWUoIGVsZW0sIG5hbWUgKSB7XG5cbiAgICAgICAgcmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICB9O1xuICAgIHZhciByc2luZ2xlVGFnID0gKCAvXjwoW2Etel1bXlxcL1xcMD46XFx4MjBcXHRcXHJcXG5cXGZdKilbXFx4MjBcXHRcXHJcXG5cXGZdKlxcLz8+KD86PFxcL1xcMT58KSQvaSApO1xuXG5cblxuLy8gSW1wbGVtZW50IHRoZSBpZGVudGljYWwgZnVuY3Rpb25hbGl0eSBmb3IgZmlsdGVyIGFuZCBub3RcbiAgICBmdW5jdGlvbiB3aW5ub3coIGVsZW1lbnRzLCBxdWFsaWZpZXIsIG5vdCApIHtcbiAgICAgICAgaWYgKCBpc0Z1bmN0aW9uKCBxdWFsaWZpZXIgKSApIHtcbiAgICAgICAgICAgIHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtLCBpICkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIXF1YWxpZmllci5jYWxsKCBlbGVtLCBpLCBlbGVtICkgIT09IG5vdDtcbiAgICAgICAgICAgIH0gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNpbmdsZSBlbGVtZW50XG4gICAgICAgIGlmICggcXVhbGlmaWVyLm5vZGVUeXBlICkge1xuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICggZWxlbSA9PT0gcXVhbGlmaWVyICkgIT09IG5vdDtcbiAgICAgICAgICAgIH0gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFycmF5bGlrZSBvZiBlbGVtZW50cyAoalF1ZXJ5LCBhcmd1bWVudHMsIEFycmF5KVxuICAgICAgICBpZiAoIHR5cGVvZiBxdWFsaWZpZXIgIT09IFwic3RyaW5nXCIgKSB7XG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCBpbmRleE9mLmNhbGwoIHF1YWxpZmllciwgZWxlbSApID4gLTEgKSAhPT0gbm90O1xuICAgICAgICAgICAgfSApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlsdGVyZWQgZGlyZWN0bHkgZm9yIGJvdGggc2ltcGxlIGFuZCBjb21wbGV4IHNlbGVjdG9yc1xuICAgICAgICByZXR1cm4galF1ZXJ5LmZpbHRlciggcXVhbGlmaWVyLCBlbGVtZW50cywgbm90ICk7XG4gICAgfVxuXG4gICAgalF1ZXJ5LmZpbHRlciA9IGZ1bmN0aW9uKCBleHByLCBlbGVtcywgbm90ICkge1xuICAgICAgICB2YXIgZWxlbSA9IGVsZW1zWyAwIF07XG5cbiAgICAgICAgaWYgKCBub3QgKSB7XG4gICAgICAgICAgICBleHByID0gXCI6bm90KFwiICsgZXhwciArIFwiKVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBlbGVtcy5sZW5ndGggPT09IDEgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcbiAgICAgICAgICAgIHJldHVybiBqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoIGVsZW0sIGV4cHIgKSA/IFsgZWxlbSBdIDogW107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4galF1ZXJ5LmZpbmQubWF0Y2hlcyggZXhwciwgalF1ZXJ5LmdyZXAoIGVsZW1zLCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtLm5vZGVUeXBlID09PSAxO1xuICAgICAgICB9ICkgKTtcbiAgICB9O1xuXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCgge1xuICAgICAgICBmaW5kOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gICAgICAgICAgICB2YXIgaSwgcmV0LFxuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2soIGpRdWVyeSggc2VsZWN0b3IgKS5maWx0ZXIoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBqUXVlcnkuY29udGFpbnMoIHNlbGZbIGkgXSwgdGhpcyApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSApICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldCA9IHRoaXMucHVzaFN0YWNrKCBbXSApO1xuXG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuICAgICAgICAgICAgICAgIGpRdWVyeS5maW5kKCBzZWxlY3Rvciwgc2VsZlsgaSBdLCByZXQgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGxlbiA+IDEgPyBqUXVlcnkudW5pcXVlU29ydCggcmV0ICkgOiByZXQ7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbHRlcjogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKCB3aW5ub3coIHRoaXMsIHNlbGVjdG9yIHx8IFtdLCBmYWxzZSApICk7XG4gICAgICAgIH0sXG4gICAgICAgIG5vdDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKCB3aW5ub3coIHRoaXMsIHNlbGVjdG9yIHx8IFtdLCB0cnVlICkgKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXM6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcbiAgICAgICAgICAgIHJldHVybiAhIXdpbm5vdyhcbiAgICAgICAgICAgICAgICB0aGlzLFxuXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHBvc2l0aW9uYWwvcmVsYXRpdmUgc2VsZWN0b3IsIGNoZWNrIG1lbWJlcnNoaXAgaW4gdGhlIHJldHVybmVkIHNldFxuICAgICAgICAgICAgICAgIC8vIHNvICQoXCJwOmZpcnN0XCIpLmlzKFwicDpsYXN0XCIpIHdvbid0IHJldHVybiB0cnVlIGZvciBhIGRvYyB3aXRoIHR3byBcInBcIi5cbiAgICAgICAgICAgICAgICB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgJiYgcm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvciApID9cbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCBzZWxlY3RvciApIDpcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IgfHwgW10sXG4gICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICkubGVuZ3RoO1xuICAgICAgICB9XG4gICAgfSApO1xuXG5cbi8vIEluaXRpYWxpemUgYSBqUXVlcnkgb2JqZWN0XG5cblxuLy8gQSBjZW50cmFsIHJlZmVyZW5jZSB0byB0aGUgcm9vdCBqUXVlcnkoZG9jdW1lbnQpXG4gICAgdmFyIHJvb3RqUXVlcnksXG5cbiAgICAgICAgLy8gQSBzaW1wbGUgd2F5IHRvIGNoZWNrIGZvciBIVE1MIHN0cmluZ3NcbiAgICAgICAgLy8gUHJpb3JpdGl6ZSAjaWQgb3ZlciA8dGFnPiB0byBhdm9pZCBYU1MgdmlhIGxvY2F0aW9uLmhhc2ggKCM5NTIxKVxuICAgICAgICAvLyBTdHJpY3QgSFRNTCByZWNvZ25pdGlvbiAoIzExMjkwOiBtdXN0IHN0YXJ0IHdpdGggPClcbiAgICAgICAgLy8gU2hvcnRjdXQgc2ltcGxlICNpZCBjYXNlIGZvciBzcGVlZFxuICAgICAgICBycXVpY2tFeHByID0gL14oPzpcXHMqKDxbXFx3XFxXXSs+KVtePl0qfCMoW1xcdy1dKykpJC8sXG5cbiAgICAgICAgaW5pdCA9IGpRdWVyeS5mbi5pbml0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCByb290ICkge1xuICAgICAgICAgICAgdmFyIG1hdGNoLCBlbGVtO1xuXG4gICAgICAgICAgICAvLyBIQU5ETEU6ICQoXCJcIiksICQobnVsbCksICQodW5kZWZpbmVkKSwgJChmYWxzZSlcbiAgICAgICAgICAgIGlmICggIXNlbGVjdG9yICkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBNZXRob2QgaW5pdCgpIGFjY2VwdHMgYW4gYWx0ZXJuYXRlIHJvb3RqUXVlcnlcbiAgICAgICAgICAgIC8vIHNvIG1pZ3JhdGUgY2FuIHN1cHBvcnQgalF1ZXJ5LnN1YiAoZ2gtMjEwMSlcbiAgICAgICAgICAgIHJvb3QgPSByb290IHx8IHJvb3RqUXVlcnk7XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSBIVE1MIHN0cmluZ3NcbiAgICAgICAgICAgIGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuICAgICAgICAgICAgICAgIGlmICggc2VsZWN0b3JbIDAgXSA9PT0gXCI8XCIgJiZcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JbIHNlbGVjdG9yLmxlbmd0aCAtIDEgXSA9PT0gXCI+XCIgJiZcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IubGVuZ3RoID49IDMgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzdW1lIHRoYXQgc3RyaW5ncyB0aGF0IHN0YXJ0IGFuZCBlbmQgd2l0aCA8PiBhcmUgSFRNTCBhbmQgc2tpcCB0aGUgcmVnZXggY2hlY2tcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBbIG51bGwsIHNlbGVjdG9yLCBudWxsIF07XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IHJxdWlja0V4cHIuZXhlYyggc2VsZWN0b3IgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBNYXRjaCBodG1sIG9yIG1ha2Ugc3VyZSBubyBjb250ZXh0IGlzIHNwZWNpZmllZCBmb3IgI2lkXG4gICAgICAgICAgICAgICAgaWYgKCBtYXRjaCAmJiAoIG1hdGNoWyAxIF0gfHwgIWNvbnRleHQgKSApIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBIQU5ETEU6ICQoaHRtbCkgLT4gJChhcnJheSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBtYXRjaFsgMSBdICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IGNvbnRleHQgaW5zdGFuY2VvZiBqUXVlcnkgPyBjb250ZXh0WyAwIF0gOiBjb250ZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPcHRpb24gdG8gcnVuIHNjcmlwdHMgaXMgdHJ1ZSBmb3IgYmFjay1jb21wYXRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEludGVudGlvbmFsbHkgbGV0IHRoZSBlcnJvciBiZSB0aHJvd24gaWYgcGFyc2VIVE1MIGlzIG5vdCBwcmVzZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkubWVyZ2UoIHRoaXMsIGpRdWVyeS5wYXJzZUhUTUwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hbIDEgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0ICYmIGNvbnRleHQubm9kZVR5cGUgPyBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCA6IGRvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICkgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSEFORExFOiAkKGh0bWwsIHByb3BzKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCByc2luZ2xlVGFnLnRlc3QoIG1hdGNoWyAxIF0gKSAmJiBqUXVlcnkuaXNQbGFpbk9iamVjdCggY29udGV4dCApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoIG1hdGNoIGluIGNvbnRleHQgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJvcGVydGllcyBvZiBjb250ZXh0IGFyZSBjYWxsZWQgYXMgbWV0aG9kcyBpZiBwb3NzaWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGlzRnVuY3Rpb24oIHRoaXNbIG1hdGNoIF0gKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbIG1hdGNoIF0oIGNvbnRleHRbIG1hdGNoIF0gKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLi4uYW5kIG90aGVyd2lzZSBzZXQgYXMgYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyKCBtYXRjaCwgY29udGV4dFsgbWF0Y2ggXSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSEFORExFOiAkKCNpZClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggbWF0Y2hbIDIgXSApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGVsZW0gKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbmplY3QgdGhlIGVsZW1lbnQgZGlyZWN0bHkgaW50byB0aGUgalF1ZXJ5IG9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbIDAgXSA9IGVsZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBIQU5ETEU6ICQoZXhwciwgJCguLi4pKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoICFjb250ZXh0IHx8IGNvbnRleHQuanF1ZXJ5ICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCBjb250ZXh0IHx8IHJvb3QgKS5maW5kKCBzZWxlY3RvciApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEhBTkRMRTogJChleHByLCBjb250ZXh0KVxuICAgICAgICAgICAgICAgICAgICAvLyAod2hpY2ggaXMganVzdCBlcXVpdmFsZW50IHRvOiAkKGNvbnRleHQpLmZpbmQoZXhwcilcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3RvciggY29udGV4dCApLmZpbmQoIHNlbGVjdG9yICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gSEFORExFOiAkKERPTUVsZW1lbnQpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBzZWxlY3Rvci5ub2RlVHlwZSApIHtcbiAgICAgICAgICAgICAgICB0aGlzWyAwIF0gPSBzZWxlY3RvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgICAgICAgICAvLyBIQU5ETEU6ICQoZnVuY3Rpb24pXG4gICAgICAgICAgICAgICAgLy8gU2hvcnRjdXQgZm9yIGRvY3VtZW50IHJlYWR5XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBpc0Z1bmN0aW9uKCBzZWxlY3RvciApICkge1xuICAgICAgICAgICAgICAgIHJldHVybiByb290LnJlYWR5ICE9PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgICAgICAgICByb290LnJlYWR5KCBzZWxlY3RvciApIDpcblxuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGltbWVkaWF0ZWx5IGlmIHJlYWR5IGlzIG5vdCBwcmVzZW50XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yKCBqUXVlcnkgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5tYWtlQXJyYXkoIHNlbGVjdG9yLCB0aGlzICk7XG4gICAgICAgIH07XG5cbi8vIEdpdmUgdGhlIGluaXQgZnVuY3Rpb24gdGhlIGpRdWVyeSBwcm90b3R5cGUgZm9yIGxhdGVyIGluc3RhbnRpYXRpb25cbiAgICBpbml0LnByb3RvdHlwZSA9IGpRdWVyeS5mbjtcblxuLy8gSW5pdGlhbGl6ZSBjZW50cmFsIHJlZmVyZW5jZVxuICAgIHJvb3RqUXVlcnkgPSBqUXVlcnkoIGRvY3VtZW50ICk7XG5cblxuICAgIHZhciBycGFyZW50c3ByZXYgPSAvXig/OnBhcmVudHN8cHJldig/OlVudGlsfEFsbCkpLyxcblxuICAgICAgICAvLyBNZXRob2RzIGd1YXJhbnRlZWQgdG8gcHJvZHVjZSBhIHVuaXF1ZSBzZXQgd2hlbiBzdGFydGluZyBmcm9tIGEgdW5pcXVlIHNldFxuICAgICAgICBndWFyYW50ZWVkVW5pcXVlID0ge1xuICAgICAgICAgICAgY2hpbGRyZW46IHRydWUsXG4gICAgICAgICAgICBjb250ZW50czogdHJ1ZSxcbiAgICAgICAgICAgIG5leHQ6IHRydWUsXG4gICAgICAgICAgICBwcmV2OiB0cnVlXG4gICAgICAgIH07XG5cbiAgICBqUXVlcnkuZm4uZXh0ZW5kKCB7XG4gICAgICAgIGhhczogZnVuY3Rpb24oIHRhcmdldCApIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRzID0galF1ZXJ5KCB0YXJnZXQsIHRoaXMgKSxcbiAgICAgICAgICAgICAgICBsID0gdGFyZ2V0cy5sZW5ndGg7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlciggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgICAgIGZvciAoIDsgaSA8IGw7IGkrKyApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBqUXVlcnkuY29udGFpbnMoIHRoaXMsIHRhcmdldHNbIGkgXSApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xvc2VzdDogZnVuY3Rpb24oIHNlbGVjdG9ycywgY29udGV4dCApIHtcbiAgICAgICAgICAgIHZhciBjdXIsXG4gICAgICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICAgICAgbCA9IHRoaXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIG1hdGNoZWQgPSBbXSxcbiAgICAgICAgICAgICAgICB0YXJnZXRzID0gdHlwZW9mIHNlbGVjdG9ycyAhPT0gXCJzdHJpbmdcIiAmJiBqUXVlcnkoIHNlbGVjdG9ycyApO1xuXG4gICAgICAgICAgICAvLyBQb3NpdGlvbmFsIHNlbGVjdG9ycyBuZXZlciBtYXRjaCwgc2luY2UgdGhlcmUncyBubyBfc2VsZWN0aW9uXyBjb250ZXh0XG4gICAgICAgICAgICBpZiAoICFybmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9ycyApICkge1xuICAgICAgICAgICAgICAgIGZvciAoIDsgaSA8IGw7IGkrKyApIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICggY3VyID0gdGhpc1sgaSBdOyBjdXIgJiYgY3VyICE9PSBjb250ZXh0OyBjdXIgPSBjdXIucGFyZW50Tm9kZSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWx3YXlzIHNraXAgZG9jdW1lbnQgZnJhZ21lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGN1ci5ub2RlVHlwZSA8IDExICYmICggdGFyZ2V0cyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldHMuaW5kZXgoIGN1ciApID4gLTEgOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IHBhc3Mgbm9uLWVsZW1lbnRzIHRvIFNpenpsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXIubm9kZVR5cGUgPT09IDEgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBjdXIsIHNlbGVjdG9ycyApICkgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkLnB1c2goIGN1ciApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2soIG1hdGNoZWQubGVuZ3RoID4gMSA/IGpRdWVyeS51bmlxdWVTb3J0KCBtYXRjaGVkICkgOiBtYXRjaGVkICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBwb3NpdGlvbiBvZiBhbiBlbGVtZW50IHdpdGhpbiB0aGUgc2V0XG4gICAgICAgIGluZGV4OiBmdW5jdGlvbiggZWxlbSApIHtcblxuICAgICAgICAgICAgLy8gTm8gYXJndW1lbnQsIHJldHVybiBpbmRleCBpbiBwYXJlbnRcbiAgICAgICAgICAgIGlmICggIWVsZW0gKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICggdGhpc1sgMCBdICYmIHRoaXNbIDAgXS5wYXJlbnROb2RlICkgPyB0aGlzLmZpcnN0KCkucHJldkFsbCgpLmxlbmd0aCA6IC0xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJbmRleCBpbiBzZWxlY3RvclxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgZWxlbSA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXhPZi5jYWxsKCBqUXVlcnkoIGVsZW0gKSwgdGhpc1sgMCBdICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExvY2F0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGRlc2lyZWQgZWxlbWVudFxuICAgICAgICAgICAgcmV0dXJuIGluZGV4T2YuY2FsbCggdGhpcyxcblxuICAgICAgICAgICAgICAgIC8vIElmIGl0IHJlY2VpdmVzIGEgalF1ZXJ5IG9iamVjdCwgdGhlIGZpcnN0IGVsZW1lbnQgaXMgdXNlZFxuICAgICAgICAgICAgICAgIGVsZW0uanF1ZXJ5ID8gZWxlbVsgMCBdIDogZWxlbVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICBhZGQ6IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayhcbiAgICAgICAgICAgICAgICBqUXVlcnkudW5pcXVlU29ydChcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Lm1lcmdlKCB0aGlzLmdldCgpLCBqUXVlcnkoIHNlbGVjdG9yLCBjb250ZXh0ICkgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRkQmFjazogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkKCBzZWxlY3RvciA9PSBudWxsID9cbiAgICAgICAgICAgICAgICB0aGlzLnByZXZPYmplY3QgOiB0aGlzLnByZXZPYmplY3QuZmlsdGVyKCBzZWxlY3RvciApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSApO1xuXG4gICAgZnVuY3Rpb24gc2libGluZyggY3VyLCBkaXIgKSB7XG4gICAgICAgIHdoaWxlICggKCBjdXIgPSBjdXJbIGRpciBdICkgJiYgY3VyLm5vZGVUeXBlICE9PSAxICkge31cbiAgICAgICAgcmV0dXJuIGN1cjtcbiAgICB9XG5cbiAgICBqUXVlcnkuZWFjaCgge1xuICAgICAgICBwYXJlbnQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQgJiYgcGFyZW50Lm5vZGVUeXBlICE9PSAxMSA/IHBhcmVudCA6IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIHBhcmVudHM6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgcmV0dXJuIGRpciggZWxlbSwgXCJwYXJlbnROb2RlXCIgKTtcbiAgICAgICAgfSxcbiAgICAgICAgcGFyZW50c1VudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG4gICAgICAgICAgICByZXR1cm4gZGlyKCBlbGVtLCBcInBhcmVudE5vZGVcIiwgdW50aWwgKTtcbiAgICAgICAgfSxcbiAgICAgICAgbmV4dDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgICAgICByZXR1cm4gc2libGluZyggZWxlbSwgXCJuZXh0U2libGluZ1wiICk7XG4gICAgICAgIH0sXG4gICAgICAgIHByZXY6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgcmV0dXJuIHNpYmxpbmcoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcbiAgICAgICAgfSxcbiAgICAgICAgbmV4dEFsbDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgICAgICByZXR1cm4gZGlyKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIgKTtcbiAgICAgICAgfSxcbiAgICAgICAgcHJldkFsbDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgICAgICByZXR1cm4gZGlyKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiICk7XG4gICAgICAgIH0sXG4gICAgICAgIG5leHRVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuICAgICAgICAgICAgcmV0dXJuIGRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiLCB1bnRpbCApO1xuICAgICAgICB9LFxuICAgICAgICBwcmV2VW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcbiAgICAgICAgICAgIHJldHVybiBkaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIsIHVudGlsICk7XG4gICAgICAgIH0sXG4gICAgICAgIHNpYmxpbmdzOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgIHJldHVybiBzaWJsaW5ncyggKCBlbGVtLnBhcmVudE5vZGUgfHwge30gKS5maXJzdENoaWxkLCBlbGVtICk7XG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkcmVuOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgIHJldHVybiBzaWJsaW5ncyggZWxlbS5maXJzdENoaWxkICk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRlbnRzOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgIGlmICggbm9kZU5hbWUoIGVsZW0sIFwiaWZyYW1lXCIgKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS5jb250ZW50RG9jdW1lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFIDkgLSAxMSBvbmx5LCBpT1MgNyBvbmx5LCBBbmRyb2lkIEJyb3dzZXIgPD00LjMgb25seVxuICAgICAgICAgICAgLy8gVHJlYXQgdGhlIHRlbXBsYXRlIGVsZW1lbnQgYXMgYSByZWd1bGFyIG9uZSBpbiBicm93c2VycyB0aGF0XG4gICAgICAgICAgICAvLyBkb24ndCBzdXBwb3J0IGl0LlxuICAgICAgICAgICAgaWYgKCBub2RlTmFtZSggZWxlbSwgXCJ0ZW1wbGF0ZVwiICkgKSB7XG4gICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0uY29udGVudCB8fCBlbGVtO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5Lm1lcmdlKCBbXSwgZWxlbS5jaGlsZE5vZGVzICk7XG4gICAgICAgIH1cbiAgICB9LCBmdW5jdGlvbiggbmFtZSwgZm4gKSB7XG4gICAgICAgIGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHVudGlsLCBzZWxlY3RvciApIHtcbiAgICAgICAgICAgIHZhciBtYXRjaGVkID0galF1ZXJ5Lm1hcCggdGhpcywgZm4sIHVudGlsICk7XG5cbiAgICAgICAgICAgIGlmICggbmFtZS5zbGljZSggLTUgKSAhPT0gXCJVbnRpbFwiICkge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gdW50aWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggc2VsZWN0b3IgJiYgdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuICAgICAgICAgICAgICAgIG1hdGNoZWQgPSBqUXVlcnkuZmlsdGVyKCBzZWxlY3RvciwgbWF0Y2hlZCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHRoaXMubGVuZ3RoID4gMSApIHtcblxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBkdXBsaWNhdGVzXG4gICAgICAgICAgICAgICAgaWYgKCAhZ3VhcmFudGVlZFVuaXF1ZVsgbmFtZSBdICkge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkudW5pcXVlU29ydCggbWF0Y2hlZCApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFJldmVyc2Ugb3JkZXIgZm9yIHBhcmVudHMqIGFuZCBwcmV2LWRlcml2YXRpdmVzXG4gICAgICAgICAgICAgICAgaWYgKCBycGFyZW50c3ByZXYudGVzdCggbmFtZSApICkge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVkLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggbWF0Y2hlZCApO1xuICAgICAgICB9O1xuICAgIH0gKTtcbiAgICB2YXIgcm5vdGh0bWx3aGl0ZSA9ICggL1teXFx4MjBcXHRcXHJcXG5cXGZdKy9nICk7XG5cblxuXG4vLyBDb252ZXJ0IFN0cmluZy1mb3JtYXR0ZWQgb3B0aW9ucyBpbnRvIE9iamVjdC1mb3JtYXR0ZWQgb25lc1xuICAgIGZ1bmN0aW9uIGNyZWF0ZU9wdGlvbnMoIG9wdGlvbnMgKSB7XG4gICAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgICAgalF1ZXJ5LmVhY2goIG9wdGlvbnMubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXSwgZnVuY3Rpb24oIF8sIGZsYWcgKSB7XG4gICAgICAgICAgICBvYmplY3RbIGZsYWcgXSA9IHRydWU7XG4gICAgICAgIH0gKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvKlxuICogQ3JlYXRlIGEgY2FsbGJhY2sgbGlzdCB1c2luZyB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XG4gKlxuICpcdG9wdGlvbnM6IGFuIG9wdGlvbmFsIGxpc3Qgb2Ygc3BhY2Utc2VwYXJhdGVkIG9wdGlvbnMgdGhhdCB3aWxsIGNoYW5nZSBob3dcbiAqXHRcdFx0dGhlIGNhbGxiYWNrIGxpc3QgYmVoYXZlcyBvciBhIG1vcmUgdHJhZGl0aW9uYWwgb3B0aW9uIG9iamVjdFxuICpcbiAqIEJ5IGRlZmF1bHQgYSBjYWxsYmFjayBsaXN0IHdpbGwgYWN0IGxpa2UgYW4gZXZlbnQgY2FsbGJhY2sgbGlzdCBhbmQgY2FuIGJlXG4gKiBcImZpcmVkXCIgbXVsdGlwbGUgdGltZXMuXG4gKlxuICogUG9zc2libGUgb3B0aW9uczpcbiAqXG4gKlx0b25jZTpcdFx0XHR3aWxsIGVuc3VyZSB0aGUgY2FsbGJhY2sgbGlzdCBjYW4gb25seSBiZSBmaXJlZCBvbmNlIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICpcdG1lbW9yeTpcdFx0XHR3aWxsIGtlZXAgdHJhY2sgb2YgcHJldmlvdXMgdmFsdWVzIGFuZCB3aWxsIGNhbGwgYW55IGNhbGxiYWNrIGFkZGVkXG4gKlx0XHRcdFx0XHRhZnRlciB0aGUgbGlzdCBoYXMgYmVlbiBmaXJlZCByaWdodCBhd2F5IHdpdGggdGhlIGxhdGVzdCBcIm1lbW9yaXplZFwiXG4gKlx0XHRcdFx0XHR2YWx1ZXMgKGxpa2UgYSBEZWZlcnJlZClcbiAqXG4gKlx0dW5pcXVlOlx0XHRcdHdpbGwgZW5zdXJlIGEgY2FsbGJhY2sgY2FuIG9ubHkgYmUgYWRkZWQgb25jZSAobm8gZHVwbGljYXRlIGluIHRoZSBsaXN0KVxuICpcbiAqXHRzdG9wT25GYWxzZTpcdGludGVycnVwdCBjYWxsaW5ncyB3aGVuIGEgY2FsbGJhY2sgcmV0dXJucyBmYWxzZVxuICpcbiAqL1xuICAgIGpRdWVyeS5DYWxsYmFja3MgPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcblxuICAgICAgICAvLyBDb252ZXJ0IG9wdGlvbnMgZnJvbSBTdHJpbmctZm9ybWF0dGVkIHRvIE9iamVjdC1mb3JtYXR0ZWQgaWYgbmVlZGVkXG4gICAgICAgIC8vICh3ZSBjaGVjayBpbiBjYWNoZSBmaXJzdClcbiAgICAgICAgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiID9cbiAgICAgICAgICAgIGNyZWF0ZU9wdGlvbnMoIG9wdGlvbnMgKSA6XG4gICAgICAgICAgICBqUXVlcnkuZXh0ZW5kKCB7fSwgb3B0aW9ucyApO1xuXG4gICAgICAgIHZhciAvLyBGbGFnIHRvIGtub3cgaWYgbGlzdCBpcyBjdXJyZW50bHkgZmlyaW5nXG4gICAgICAgICAgICBmaXJpbmcsXG5cbiAgICAgICAgICAgIC8vIExhc3QgZmlyZSB2YWx1ZSBmb3Igbm9uLWZvcmdldHRhYmxlIGxpc3RzXG4gICAgICAgICAgICBtZW1vcnksXG5cbiAgICAgICAgICAgIC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IHdhcyBhbHJlYWR5IGZpcmVkXG4gICAgICAgICAgICBmaXJlZCxcblxuICAgICAgICAgICAgLy8gRmxhZyB0byBwcmV2ZW50IGZpcmluZ1xuICAgICAgICAgICAgbG9ja2VkLFxuXG4gICAgICAgICAgICAvLyBBY3R1YWwgY2FsbGJhY2sgbGlzdFxuICAgICAgICAgICAgbGlzdCA9IFtdLFxuXG4gICAgICAgICAgICAvLyBRdWV1ZSBvZiBleGVjdXRpb24gZGF0YSBmb3IgcmVwZWF0YWJsZSBsaXN0c1xuICAgICAgICAgICAgcXVldWUgPSBbXSxcblxuICAgICAgICAgICAgLy8gSW5kZXggb2YgY3VycmVudGx5IGZpcmluZyBjYWxsYmFjayAobW9kaWZpZWQgYnkgYWRkL3JlbW92ZSBhcyBuZWVkZWQpXG4gICAgICAgICAgICBmaXJpbmdJbmRleCA9IC0xLFxuXG4gICAgICAgICAgICAvLyBGaXJlIGNhbGxiYWNrc1xuICAgICAgICAgICAgZmlyZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgLy8gRW5mb3JjZSBzaW5nbGUtZmlyaW5nXG4gICAgICAgICAgICAgICAgbG9ja2VkID0gbG9ja2VkIHx8IG9wdGlvbnMub25jZTtcblxuICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgY2FsbGJhY2tzIGZvciBhbGwgcGVuZGluZyBleGVjdXRpb25zLFxuICAgICAgICAgICAgICAgIC8vIHJlc3BlY3RpbmcgZmlyaW5nSW5kZXggb3ZlcnJpZGVzIGFuZCBydW50aW1lIGNoYW5nZXNcbiAgICAgICAgICAgICAgICBmaXJlZCA9IGZpcmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yICggOyBxdWV1ZS5sZW5ndGg7IGZpcmluZ0luZGV4ID0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbW9yeSA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICggKytmaXJpbmdJbmRleCA8IGxpc3QubGVuZ3RoICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSdW4gY2FsbGJhY2sgYW5kIGNoZWNrIGZvciBlYXJseSB0ZXJtaW5hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBsaXN0WyBmaXJpbmdJbmRleCBdLmFwcGx5KCBtZW1vcnlbIDAgXSwgbWVtb3J5WyAxIF0gKSA9PT0gZmFsc2UgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnN0b3BPbkZhbHNlICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSnVtcCB0byBlbmQgYW5kIGZvcmdldCB0aGUgZGF0YSBzbyAuYWRkIGRvZXNuJ3QgcmUtZmlyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmluZ0luZGV4ID0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVtb3J5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBGb3JnZXQgdGhlIGRhdGEgaWYgd2UncmUgZG9uZSB3aXRoIGl0XG4gICAgICAgICAgICAgICAgaWYgKCAhb3B0aW9ucy5tZW1vcnkgKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbW9yeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZpcmluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2xlYW4gdXAgaWYgd2UncmUgZG9uZSBmaXJpbmcgZm9yIGdvb2RcbiAgICAgICAgICAgICAgICBpZiAoIGxvY2tlZCApIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBLZWVwIGFuIGVtcHR5IGxpc3QgaWYgd2UgaGF2ZSBkYXRhIGZvciBmdXR1cmUgYWRkIGNhbGxzXG4gICAgICAgICAgICAgICAgICAgIGlmICggbWVtb3J5ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIHRoaXMgb2JqZWN0IGlzIHNwZW50XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vIEFjdHVhbCBDYWxsYmFja3Mgb2JqZWN0XG4gICAgICAgICAgICBzZWxmID0ge1xuXG4gICAgICAgICAgICAgICAgLy8gQWRkIGEgY2FsbGJhY2sgb3IgYSBjb2xsZWN0aW9uIG9mIGNhbGxiYWNrcyB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgIGFkZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggbGlzdCApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBtZW1vcnkgZnJvbSBhIHBhc3QgcnVuLCB3ZSBzaG91bGQgZmlyZSBhZnRlciBhZGRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbWVtb3J5ICYmICFmaXJpbmcgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyaW5nSW5kZXggPSBsaXN0Lmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUucHVzaCggbWVtb3J5ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICggZnVuY3Rpb24gYWRkKCBhcmdzICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5lYWNoKCBhcmdzLCBmdW5jdGlvbiggXywgYXJnICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGlzRnVuY3Rpb24oIGFyZyApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhb3B0aW9ucy51bmlxdWUgfHwgIXNlbGYuaGFzKCBhcmcgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2goIGFyZyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBhcmcgJiYgYXJnLmxlbmd0aCAmJiB0b1R5cGUoIGFyZyApICE9PSBcInN0cmluZ1wiICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnNwZWN0IHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGQoIGFyZyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSApKCBhcmd1bWVudHMgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBtZW1vcnkgJiYgIWZpcmluZyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBhIGNhbGxiYWNrIGZyb20gdGhlIGxpc3RcbiAgICAgICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZWFjaCggYXJndW1lbnRzLCBmdW5jdGlvbiggXywgYXJnICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCAoIGluZGV4ID0galF1ZXJ5LmluQXJyYXkoIGFyZywgbGlzdCwgaW5kZXggKSApID4gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoIGluZGV4LCAxICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgZmlyaW5nIGluZGV4ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGluZGV4IDw9IGZpcmluZ0luZGV4ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJpbmdJbmRleC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYSBnaXZlbiBjYWxsYmFjayBpcyBpbiB0aGUgbGlzdC5cbiAgICAgICAgICAgICAgICAvLyBJZiBubyBhcmd1bWVudCBpcyBnaXZlbiwgcmV0dXJuIHdoZXRoZXIgb3Igbm90IGxpc3QgaGFzIGNhbGxiYWNrcyBhdHRhY2hlZC5cbiAgICAgICAgICAgICAgICBoYXM6IGZ1bmN0aW9uKCBmbiApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5pbkFycmF5KCBmbiwgbGlzdCApID4gLTEgOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5sZW5ndGggPiAwO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgYWxsIGNhbGxiYWNrcyBmcm9tIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgZW1wdHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIGxpc3QgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIC8vIERpc2FibGUgLmZpcmUgYW5kIC5hZGRcbiAgICAgICAgICAgICAgICAvLyBBYm9ydCBhbnkgY3VycmVudC9wZW5kaW5nIGV4ZWN1dGlvbnNcbiAgICAgICAgICAgICAgICAvLyBDbGVhciBhbGwgY2FsbGJhY2tzIGFuZCB2YWx1ZXNcbiAgICAgICAgICAgICAgICBkaXNhYmxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkID0gcXVldWUgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IG1lbW9yeSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWxpc3Q7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIC8vIERpc2FibGUgLmZpcmVcbiAgICAgICAgICAgICAgICAvLyBBbHNvIGRpc2FibGUgLmFkZCB1bmxlc3Mgd2UgaGF2ZSBtZW1vcnkgKHNpbmNlIGl0IHdvdWxkIGhhdmUgbm8gZWZmZWN0KVxuICAgICAgICAgICAgICAgIC8vIEFib3J0IGFueSBwZW5kaW5nIGV4ZWN1dGlvbnNcbiAgICAgICAgICAgICAgICBsb2NrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkID0gcXVldWUgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbWVtb3J5ICYmICFmaXJpbmcgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ID0gbWVtb3J5ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxvY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWxvY2tlZDtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgLy8gQ2FsbCBhbGwgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGNvbnRleHQgYW5kIGFyZ3VtZW50c1xuICAgICAgICAgICAgICAgIGZpcmVXaXRoOiBmdW5jdGlvbiggY29udGV4dCwgYXJncyApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbG9ja2VkICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFyZ3MgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzID0gWyBjb250ZXh0LCBhcmdzLnNsaWNlID8gYXJncy5zbGljZSgpIDogYXJncyBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUucHVzaCggYXJncyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhZmlyaW5nICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgLy8gQ2FsbCBhbGwgdGhlIGNhbGxiYWNrcyB3aXRoIHRoZSBnaXZlbiBhcmd1bWVudHNcbiAgICAgICAgICAgICAgICBmaXJlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5maXJlV2l0aCggdGhpcywgYXJndW1lbnRzICk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAvLyBUbyBrbm93IGlmIHRoZSBjYWxsYmFja3MgaGF2ZSBhbHJlYWR5IGJlZW4gY2FsbGVkIGF0IGxlYXN0IG9uY2VcbiAgICAgICAgICAgICAgICBmaXJlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWZpcmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuXG4gICAgZnVuY3Rpb24gSWRlbnRpdHkoIHYgKSB7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgICBmdW5jdGlvbiBUaHJvd2VyKCBleCApIHtcbiAgICAgICAgdGhyb3cgZXg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRvcHRWYWx1ZSggdmFsdWUsIHJlc29sdmUsIHJlamVjdCwgbm9WYWx1ZSApIHtcbiAgICAgICAgdmFyIG1ldGhvZDtcblxuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgcHJvbWlzZSBhc3BlY3QgZmlyc3QgdG8gcHJpdmlsZWdlIHN5bmNocm9ub3VzIGJlaGF2aW9yXG4gICAgICAgICAgICBpZiAoIHZhbHVlICYmIGlzRnVuY3Rpb24oICggbWV0aG9kID0gdmFsdWUucHJvbWlzZSApICkgKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kLmNhbGwoIHZhbHVlICkuZG9uZSggcmVzb2x2ZSApLmZhaWwoIHJlamVjdCApO1xuXG4gICAgICAgICAgICAgICAgLy8gT3RoZXIgdGhlbmFibGVzXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB2YWx1ZSAmJiBpc0Z1bmN0aW9uKCAoIG1ldGhvZCA9IHZhbHVlLnRoZW4gKSApICkge1xuICAgICAgICAgICAgICAgIG1ldGhvZC5jYWxsKCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0ICk7XG5cbiAgICAgICAgICAgICAgICAvLyBPdGhlciBub24tdGhlbmFibGVzXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gQ29udHJvbCBgcmVzb2x2ZWAgYXJndW1lbnRzIGJ5IGxldHRpbmcgQXJyYXkjc2xpY2UgY2FzdCBib29sZWFuIGBub1ZhbHVlYCB0byBpbnRlZ2VyOlxuICAgICAgICAgICAgICAgIC8vICogZmFsc2U6IFsgdmFsdWUgXS5zbGljZSggMCApID0+IHJlc29sdmUoIHZhbHVlIClcbiAgICAgICAgICAgICAgICAvLyAqIHRydWU6IFsgdmFsdWUgXS5zbGljZSggMSApID0+IHJlc29sdmUoKVxuICAgICAgICAgICAgICAgIHJlc29sdmUuYXBwbHkoIHVuZGVmaW5lZCwgWyB2YWx1ZSBdLnNsaWNlKCBub1ZhbHVlICkgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRm9yIFByb21pc2VzL0ErLCBjb252ZXJ0IGV4Y2VwdGlvbnMgaW50byByZWplY3Rpb25zXG4gICAgICAgICAgICAvLyBTaW5jZSBqUXVlcnkud2hlbiBkb2Vzbid0IHVud3JhcCB0aGVuYWJsZXMsIHdlIGNhbiBza2lwIHRoZSBleHRyYSBjaGVja3MgYXBwZWFyaW5nIGluXG4gICAgICAgICAgICAvLyBEZWZlcnJlZCN0aGVuIHRvIGNvbmRpdGlvbmFsbHkgc3VwcHJlc3MgcmVqZWN0aW9uLlxuICAgICAgICB9IGNhdGNoICggdmFsdWUgKSB7XG5cbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wIG9ubHlcbiAgICAgICAgICAgIC8vIFN0cmljdCBtb2RlIGZ1bmN0aW9ucyBpbnZva2VkIHdpdGhvdXQgLmNhbGwvLmFwcGx5IGdldCBnbG9iYWwtb2JqZWN0IGNvbnRleHRcbiAgICAgICAgICAgIHJlamVjdC5hcHBseSggdW5kZWZpbmVkLCBbIHZhbHVlIF0gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGpRdWVyeS5leHRlbmQoIHtcblxuICAgICAgICBEZWZlcnJlZDogZnVuY3Rpb24oIGZ1bmMgKSB7XG4gICAgICAgICAgICB2YXIgdHVwbGVzID0gW1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFjdGlvbiwgYWRkIGxpc3RlbmVyLCBjYWxsYmFja3MsXG4gICAgICAgICAgICAgICAgICAgIC8vIC4uLiAudGhlbiBoYW5kbGVycywgYXJndW1lbnQgaW5kZXgsIFtmaW5hbCBzdGF0ZV1cbiAgICAgICAgICAgICAgICAgICAgWyBcIm5vdGlmeVwiLCBcInByb2dyZXNzXCIsIGpRdWVyeS5DYWxsYmFja3MoIFwibWVtb3J5XCIgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5DYWxsYmFja3MoIFwibWVtb3J5XCIgKSwgMiBdLFxuICAgICAgICAgICAgICAgICAgICBbIFwicmVzb2x2ZVwiLCBcImRvbmVcIiwgalF1ZXJ5LkNhbGxiYWNrcyggXCJvbmNlIG1lbW9yeVwiICksXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKSwgMCwgXCJyZXNvbHZlZFwiIF0sXG4gICAgICAgICAgICAgICAgICAgIFsgXCJyZWplY3RcIiwgXCJmYWlsXCIsIGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLFxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LkNhbGxiYWNrcyggXCJvbmNlIG1lbW9yeVwiICksIDEsIFwicmVqZWN0ZWRcIiBdXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IFwicGVuZGluZ1wiLFxuICAgICAgICAgICAgICAgIHByb21pc2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYWx3YXlzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLmRvbmUoIGFyZ3VtZW50cyApLmZhaWwoIGFyZ3VtZW50cyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24oIGZuICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbiggbnVsbCwgZm4gKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICAvLyBLZWVwIHBpcGUgZm9yIGJhY2stY29tcGF0XG4gICAgICAgICAgICAgICAgICAgIHBpcGU6IGZ1bmN0aW9uKCAvKiBmbkRvbmUsIGZuRmFpbCwgZm5Qcm9ncmVzcyAqLyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmbnMgPSBhcmd1bWVudHM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBqUXVlcnkuRGVmZXJyZWQoIGZ1bmN0aW9uKCBuZXdEZWZlciApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZWFjaCggdHVwbGVzLCBmdW5jdGlvbiggaSwgdHVwbGUgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFwIHR1cGxlcyAocHJvZ3Jlc3MsIGRvbmUsIGZhaWwpIHRvIGFyZ3VtZW50cyAoZG9uZSwgZmFpbCwgcHJvZ3Jlc3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IGlzRnVuY3Rpb24oIGZuc1sgdHVwbGVbIDQgXSBdICkgJiYgZm5zWyB0dXBsZVsgNCBdIF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVmZXJyZWQucHJvZ3Jlc3MoZnVuY3Rpb24oKSB7IGJpbmQgdG8gbmV3RGVmZXIgb3IgbmV3RGVmZXIubm90aWZ5IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmVycmVkLmRvbmUoZnVuY3Rpb24oKSB7IGJpbmQgdG8gbmV3RGVmZXIgb3IgbmV3RGVmZXIucmVzb2x2ZSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWZlcnJlZC5mYWlsKGZ1bmN0aW9uKCkgeyBiaW5kIHRvIG5ld0RlZmVyIG9yIG5ld0RlZmVyLnJlamVjdCB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZFsgdHVwbGVbIDEgXSBdKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5lZCA9IGZuICYmIGZuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcmV0dXJuZWQgJiYgaXNGdW5jdGlvbiggcmV0dXJuZWQucHJvbWlzZSApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybmVkLnByb21pc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJvZ3Jlc3MoIG5ld0RlZmVyLm5vdGlmeSApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKCBuZXdEZWZlci5yZXNvbHZlIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoIG5ld0RlZmVyLnJlamVjdCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdEZWZlclsgdHVwbGVbIDAgXSArIFwiV2l0aFwiIF0oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuID8gWyByZXR1cm5lZCBdIDogYXJndW1lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbnMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSApLnByb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdGhlbjogZnVuY3Rpb24oIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBvblByb2dyZXNzICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heERlcHRoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlc29sdmUoIGRlcHRoLCBkZWZlcnJlZCwgaGFuZGxlciwgc3BlY2lhbCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaWdodFRocm93ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybmVkLCB0aGVuO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbiAyLjMuMy4zLjNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC01OVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElnbm9yZSBkb3VibGUtcmVzb2x1dGlvbiBhdHRlbXB0c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZGVwdGggPCBtYXhEZXB0aCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybmVkID0gaGFuZGxlci5hcHBseSggdGhhdCwgYXJncyApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbiAyLjMuMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTQ4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCByZXR1cm5lZCA9PT0gZGVmZXJyZWQucHJvbWlzZSgpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCBcIlRoZW5hYmxlIHNlbGYtcmVzb2x1dGlvblwiICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbnMgMi4zLjMuMSwgMy41XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNTRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC03NVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJldHJpZXZlIGB0aGVuYCBvbmx5IG9uY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVuID0gcmV0dXJuZWQgJiZcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBQcm9taXNlcy9BKyBzZWN0aW9uIDIuMy40XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTY0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgY2hlY2sgb2JqZWN0cyBhbmQgZnVuY3Rpb25zIGZvciB0aGVuYWJpbGl0eVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIHR5cGVvZiByZXR1cm5lZCA9PT0gXCJvYmplY3RcIiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHJldHVybmVkID09PSBcImZ1bmN0aW9uXCIgKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5lZC50aGVuO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSGFuZGxlIGEgcmV0dXJuZWQgdGhlbmFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGlzRnVuY3Rpb24oIHRoZW4gKSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTcGVjaWFsIHByb2Nlc3NvcnMgKG5vdGlmeSkganVzdCB3YWl0IGZvciByZXNvbHV0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggc3BlY2lhbCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW4uY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCBtYXhEZXB0aCwgZGVmZXJyZWQsIElkZW50aXR5LCBzcGVjaWFsICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBUaHJvd2VyLCBzcGVjaWFsIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vcm1hbCBwcm9jZXNzb3JzIChyZXNvbHZlKSBhbHNvIGhvb2sgaW50byBwcm9ncmVzc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuLi5hbmQgZGlzcmVnYXJkIG9sZGVyIHJlc29sdXRpb24gdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhEZXB0aCsrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVuLmNhbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBJZGVudGl0eSwgc3BlY2lhbCApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoIG1heERlcHRoLCBkZWZlcnJlZCwgVGhyb3dlciwgc3BlY2lhbCApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoIG1heERlcHRoLCBkZWZlcnJlZCwgSWRlbnRpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLm5vdGlmeVdpdGggKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBhbGwgb3RoZXIgcmV0dXJuZWQgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHN1YnN0aXR1dGUgaGFuZGxlcnMgcGFzcyBvbiBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCBtdWx0aXBsZSB2YWx1ZXMgKG5vbi1zcGVjIGJlaGF2aW9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGhhbmRsZXIgIT09IElkZW50aXR5ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBbIHJldHVybmVkIF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIHRoZSB2YWx1ZShzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IHByb2Nlc3MgaXMgcmVzb2x2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIHNwZWNpYWwgfHwgZGVmZXJyZWQucmVzb2x2ZVdpdGggKSggdGhhdCwgYXJncyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgbm9ybWFsIHByb2Nlc3NvcnMgKHJlc29sdmUpIGNhdGNoIGFuZCByZWplY3QgZXhjZXB0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2VzcyA9IHNwZWNpYWwgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pZ2h0VGhyb3cgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlnaHRUaHJvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoICggZSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBqUXVlcnkuRGVmZXJyZWQuZXhjZXB0aW9uSG9vayApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuRGVmZXJyZWQuZXhjZXB0aW9uSG9vayggZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5zdGFja1RyYWNlICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IFByb21pc2VzL0ErIHNlY3Rpb24gMi4zLjMuMy40LjFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTYxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgcG9zdC1yZXNvbHV0aW9uIGV4Y2VwdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZGVwdGggKyAxID49IG1heERlcHRoICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT25seSBzdWJzdGl0dXRlIGhhbmRsZXJzIHBhc3Mgb24gY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCBtdWx0aXBsZSB2YWx1ZXMgKG5vbi1zcGVjIGJlaGF2aW9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaGFuZGxlciAhPT0gVGhyb3dlciApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncyA9IFsgZSBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdFdpdGgoIHRoYXQsIGFyZ3MgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbiAyLjMuMy4zLjFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNTdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmUtcmVzb2x2ZSBwcm9taXNlcyBpbW1lZGlhdGVseSB0byBkb2RnZSBmYWxzZSByZWplY3Rpb24gZnJvbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdWJzZXF1ZW50IGVycm9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGRlcHRoICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2VzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDYWxsIGFuIG9wdGlvbmFsIGhvb2sgdG8gcmVjb3JkIHRoZSBzdGFjaywgaW4gY2FzZSBvZiBleGNlcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbmNlIGl0J3Mgb3RoZXJ3aXNlIGxvc3Qgd2hlbiBleGVjdXRpb24gZ29lcyBhc3luY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBqUXVlcnkuRGVmZXJyZWQuZ2V0U3RhY2tIb29rICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3Muc3RhY2tUcmFjZSA9IGpRdWVyeS5EZWZlcnJlZC5nZXRTdGFja0hvb2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCBwcm9jZXNzICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4galF1ZXJ5LkRlZmVycmVkKCBmdW5jdGlvbiggbmV3RGVmZXIgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcm9ncmVzc19oYW5kbGVycy5hZGQoIC4uLiApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHVwbGVzWyAwIF1bIDMgXS5hZGQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGVmZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0Z1bmN0aW9uKCBvblByb2dyZXNzICkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUHJvZ3Jlc3MgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElkZW50aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGVmZXIubm90aWZ5V2l0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZ1bGZpbGxlZF9oYW5kbGVycy5hZGQoIC4uLiApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHVwbGVzWyAxIF1bIDMgXS5hZGQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGVmZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0Z1bmN0aW9uKCBvbkZ1bGZpbGxlZCApID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZ1bGZpbGxlZCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWRlbnRpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZWplY3RlZF9oYW5kbGVycy5hZGQoIC4uLiApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHVwbGVzWyAyIF1bIDMgXS5hZGQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGVmZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0Z1bmN0aW9uKCBvblJlamVjdGVkICkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVqZWN0ZWQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRocm93ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ICkucHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCBhIHByb21pc2UgZm9yIHRoaXMgZGVmZXJyZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgb2JqIGlzIHByb3ZpZGVkLCB0aGUgcHJvbWlzZSBhc3BlY3QgaXMgYWRkZWQgdG8gdGhlIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlOiBmdW5jdGlvbiggb2JqICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iaiAhPSBudWxsID8galF1ZXJ5LmV4dGVuZCggb2JqLCBwcm9taXNlICkgOiBwcm9taXNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZlcnJlZCA9IHt9O1xuXG4gICAgICAgICAgICAvLyBBZGQgbGlzdC1zcGVjaWZpYyBtZXRob2RzXG4gICAgICAgICAgICBqUXVlcnkuZWFjaCggdHVwbGVzLCBmdW5jdGlvbiggaSwgdHVwbGUgKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3QgPSB0dXBsZVsgMiBdLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZVN0cmluZyA9IHR1cGxlWyA1IF07XG5cbiAgICAgICAgICAgICAgICAvLyBwcm9taXNlLnByb2dyZXNzID0gbGlzdC5hZGRcbiAgICAgICAgICAgICAgICAvLyBwcm9taXNlLmRvbmUgPSBsaXN0LmFkZFxuICAgICAgICAgICAgICAgIC8vIHByb21pc2UuZmFpbCA9IGxpc3QuYWRkXG4gICAgICAgICAgICAgICAgcHJvbWlzZVsgdHVwbGVbIDEgXSBdID0gbGlzdC5hZGQ7XG5cbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgc3RhdGVcbiAgICAgICAgICAgICAgICBpZiAoIHN0YXRlU3RyaW5nICkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0LmFkZChcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RhdGUgPSBcInJlc29sdmVkXCIgKGkuZS4sIGZ1bGZpbGxlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGF0ZSA9IFwicmVqZWN0ZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gc3RhdGVTdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZWplY3RlZF9jYWxsYmFja3MuZGlzYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZnVsZmlsbGVkX2NhbGxiYWNrcy5kaXNhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICB0dXBsZXNbIDMgLSBpIF1bIDIgXS5kaXNhYmxlLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZWplY3RlZF9oYW5kbGVycy5kaXNhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmdWxmaWxsZWRfaGFuZGxlcnMuZGlzYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgdHVwbGVzWyAzIC0gaSBdWyAzIF0uZGlzYWJsZSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJvZ3Jlc3NfY2FsbGJhY2tzLmxvY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cGxlc1sgMCBdWyAyIF0ubG9jayxcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJvZ3Jlc3NfaGFuZGxlcnMubG9ja1xuICAgICAgICAgICAgICAgICAgICAgICAgdHVwbGVzWyAwIF1bIDMgXS5sb2NrXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcHJvZ3Jlc3NfaGFuZGxlcnMuZmlyZVxuICAgICAgICAgICAgICAgIC8vIGZ1bGZpbGxlZF9oYW5kbGVycy5maXJlXG4gICAgICAgICAgICAgICAgLy8gcmVqZWN0ZWRfaGFuZGxlcnMuZmlyZVxuICAgICAgICAgICAgICAgIGxpc3QuYWRkKCB0dXBsZVsgMyBdLmZpcmUgKTtcblxuICAgICAgICAgICAgICAgIC8vIGRlZmVycmVkLm5vdGlmeSA9IGZ1bmN0aW9uKCkgeyBkZWZlcnJlZC5ub3RpZnlXaXRoKC4uLikgfVxuICAgICAgICAgICAgICAgIC8vIGRlZmVycmVkLnJlc29sdmUgPSBmdW5jdGlvbigpIHsgZGVmZXJyZWQucmVzb2x2ZVdpdGgoLi4uKSB9XG4gICAgICAgICAgICAgICAgLy8gZGVmZXJyZWQucmVqZWN0ID0gZnVuY3Rpb24oKSB7IGRlZmVycmVkLnJlamVjdFdpdGgoLi4uKSB9XG4gICAgICAgICAgICAgICAgZGVmZXJyZWRbIHR1cGxlWyAwIF0gXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZFsgdHVwbGVbIDAgXSArIFwiV2l0aFwiIF0oIHRoaXMgPT09IGRlZmVycmVkID8gdW5kZWZpbmVkIDogdGhpcywgYXJndW1lbnRzICk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvLyBkZWZlcnJlZC5ub3RpZnlXaXRoID0gbGlzdC5maXJlV2l0aFxuICAgICAgICAgICAgICAgIC8vIGRlZmVycmVkLnJlc29sdmVXaXRoID0gbGlzdC5maXJlV2l0aFxuICAgICAgICAgICAgICAgIC8vIGRlZmVycmVkLnJlamVjdFdpdGggPSBsaXN0LmZpcmVXaXRoXG4gICAgICAgICAgICAgICAgZGVmZXJyZWRbIHR1cGxlWyAwIF0gKyBcIldpdGhcIiBdID0gbGlzdC5maXJlV2l0aDtcbiAgICAgICAgICAgIH0gKTtcblxuICAgICAgICAgICAgLy8gTWFrZSB0aGUgZGVmZXJyZWQgYSBwcm9taXNlXG4gICAgICAgICAgICBwcm9taXNlLnByb21pc2UoIGRlZmVycmVkICk7XG5cbiAgICAgICAgICAgIC8vIENhbGwgZ2l2ZW4gZnVuYyBpZiBhbnlcbiAgICAgICAgICAgIGlmICggZnVuYyApIHtcbiAgICAgICAgICAgICAgICBmdW5jLmNhbGwoIGRlZmVycmVkLCBkZWZlcnJlZCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBbGwgZG9uZSFcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZDtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBEZWZlcnJlZCBoZWxwZXJcbiAgICAgICAgd2hlbjogZnVuY3Rpb24oIHNpbmdsZVZhbHVlICkge1xuICAgICAgICAgICAgdmFyXG5cbiAgICAgICAgICAgICAgICAvLyBjb3VudCBvZiB1bmNvbXBsZXRlZCBzdWJvcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICByZW1haW5pbmcgPSBhcmd1bWVudHMubGVuZ3RoLFxuXG4gICAgICAgICAgICAgICAgLy8gY291bnQgb2YgdW5wcm9jZXNzZWQgYXJndW1lbnRzXG4gICAgICAgICAgICAgICAgaSA9IHJlbWFpbmluZyxcblxuICAgICAgICAgICAgICAgIC8vIHN1Ym9yZGluYXRlIGZ1bGZpbGxtZW50IGRhdGFcbiAgICAgICAgICAgICAgICByZXNvbHZlQ29udGV4dHMgPSBBcnJheSggaSApLFxuICAgICAgICAgICAgICAgIHJlc29sdmVWYWx1ZXMgPSBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSxcblxuICAgICAgICAgICAgICAgIC8vIHRoZSBtYXN0ZXIgRGVmZXJyZWRcbiAgICAgICAgICAgICAgICBtYXN0ZXIgPSBqUXVlcnkuRGVmZXJyZWQoKSxcblxuICAgICAgICAgICAgICAgIC8vIHN1Ym9yZGluYXRlIGNhbGxiYWNrIGZhY3RvcnlcbiAgICAgICAgICAgICAgICB1cGRhdGVGdW5jID0gZnVuY3Rpb24oIGkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlQ29udGV4dHNbIGkgXSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlVmFsdWVzWyBpIF0gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApIDogdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoICEoIC0tcmVtYWluaW5nICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzdGVyLnJlc29sdmVXaXRoKCByZXNvbHZlQ29udGV4dHMsIHJlc29sdmVWYWx1ZXMgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBTaW5nbGUtIGFuZCBlbXB0eSBhcmd1bWVudHMgYXJlIGFkb3B0ZWQgbGlrZSBQcm9taXNlLnJlc29sdmVcbiAgICAgICAgICAgIGlmICggcmVtYWluaW5nIDw9IDEgKSB7XG4gICAgICAgICAgICAgICAgYWRvcHRWYWx1ZSggc2luZ2xlVmFsdWUsIG1hc3Rlci5kb25lKCB1cGRhdGVGdW5jKCBpICkgKS5yZXNvbHZlLCBtYXN0ZXIucmVqZWN0LFxuICAgICAgICAgICAgICAgICAgICAhcmVtYWluaW5nICk7XG5cbiAgICAgICAgICAgICAgICAvLyBVc2UgLnRoZW4oKSB0byB1bndyYXAgc2Vjb25kYXJ5IHRoZW5hYmxlcyAoY2YuIGdoLTMwMDApXG4gICAgICAgICAgICAgICAgaWYgKCBtYXN0ZXIuc3RhdGUoKSA9PT0gXCJwZW5kaW5nXCIgfHxcbiAgICAgICAgICAgICAgICAgICAgaXNGdW5jdGlvbiggcmVzb2x2ZVZhbHVlc1sgaSBdICYmIHJlc29sdmVWYWx1ZXNbIGkgXS50aGVuICkgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc3Rlci50aGVuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBNdWx0aXBsZSBhcmd1bWVudHMgYXJlIGFnZ3JlZ2F0ZWQgbGlrZSBQcm9taXNlLmFsbCBhcnJheSBlbGVtZW50c1xuICAgICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICAgICAgICAgICAgYWRvcHRWYWx1ZSggcmVzb2x2ZVZhbHVlc1sgaSBdLCB1cGRhdGVGdW5jKCBpICksIG1hc3Rlci5yZWplY3QgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG1hc3Rlci5wcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICB9ICk7XG5cblxuLy8gVGhlc2UgdXN1YWxseSBpbmRpY2F0ZSBhIHByb2dyYW1tZXIgbWlzdGFrZSBkdXJpbmcgZGV2ZWxvcG1lbnQsXG4vLyB3YXJuIGFib3V0IHRoZW0gQVNBUCByYXRoZXIgdGhhbiBzd2FsbG93aW5nIHRoZW0gYnkgZGVmYXVsdC5cbiAgICB2YXIgcmVycm9yTmFtZXMgPSAvXihFdmFsfEludGVybmFsfFJhbmdlfFJlZmVyZW5jZXxTeW50YXh8VHlwZXxVUkkpRXJyb3IkLztcblxuICAgIGpRdWVyeS5EZWZlcnJlZC5leGNlcHRpb25Ib29rID0gZnVuY3Rpb24oIGVycm9yLCBzdGFjayApIHtcblxuICAgICAgICAvLyBTdXBwb3J0OiBJRSA4IC0gOSBvbmx5XG4gICAgICAgIC8vIENvbnNvbGUgZXhpc3RzIHdoZW4gZGV2IHRvb2xzIGFyZSBvcGVuLCB3aGljaCBjYW4gaGFwcGVuIGF0IGFueSB0aW1lXG4gICAgICAgIGlmICggd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUud2FybiAmJiBlcnJvciAmJiByZXJyb3JOYW1lcy50ZXN0KCBlcnJvci5uYW1lICkgKSB7XG4gICAgICAgICAgICB3aW5kb3cuY29uc29sZS53YXJuKCBcImpRdWVyeS5EZWZlcnJlZCBleGNlcHRpb246IFwiICsgZXJyb3IubWVzc2FnZSwgZXJyb3Iuc3RhY2ssIHN0YWNrICk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cblxuXG4gICAgalF1ZXJ5LnJlYWR5RXhjZXB0aW9uID0gZnVuY3Rpb24oIGVycm9yICkge1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfSApO1xuICAgIH07XG5cblxuXG5cbi8vIFRoZSBkZWZlcnJlZCB1c2VkIG9uIERPTSByZWFkeVxuICAgIHZhciByZWFkeUxpc3QgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgIGpRdWVyeS5mbi5yZWFkeSA9IGZ1bmN0aW9uKCBmbiApIHtcblxuICAgICAgICByZWFkeUxpc3RcbiAgICAgICAgICAgIC50aGVuKCBmbiApXG5cbiAgICAgICAgICAgIC8vIFdyYXAgalF1ZXJ5LnJlYWR5RXhjZXB0aW9uIGluIGEgZnVuY3Rpb24gc28gdGhhdCB0aGUgbG9va3VwXG4gICAgICAgICAgICAvLyBoYXBwZW5zIGF0IHRoZSB0aW1lIG9mIGVycm9yIGhhbmRsaW5nIGluc3RlYWQgb2YgY2FsbGJhY2tcbiAgICAgICAgICAgIC8vIHJlZ2lzdHJhdGlvbi5cbiAgICAgICAgICAgIC5jYXRjaCggZnVuY3Rpb24oIGVycm9yICkge1xuICAgICAgICAgICAgICAgIGpRdWVyeS5yZWFkeUV4Y2VwdGlvbiggZXJyb3IgKTtcbiAgICAgICAgICAgIH0gKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgalF1ZXJ5LmV4dGVuZCgge1xuXG4gICAgICAgIC8vIElzIHRoZSBET00gcmVhZHkgdG8gYmUgdXNlZD8gU2V0IHRvIHRydWUgb25jZSBpdCBvY2N1cnMuXG4gICAgICAgIGlzUmVhZHk6IGZhbHNlLFxuXG4gICAgICAgIC8vIEEgY291bnRlciB0byB0cmFjayBob3cgbWFueSBpdGVtcyB0byB3YWl0IGZvciBiZWZvcmVcbiAgICAgICAgLy8gdGhlIHJlYWR5IGV2ZW50IGZpcmVzLiBTZWUgIzY3ODFcbiAgICAgICAgcmVhZHlXYWl0OiAxLFxuXG4gICAgICAgIC8vIEhhbmRsZSB3aGVuIHRoZSBET00gaXMgcmVhZHlcbiAgICAgICAgcmVhZHk6IGZ1bmN0aW9uKCB3YWl0ICkge1xuXG4gICAgICAgICAgICAvLyBBYm9ydCBpZiB0aGVyZSBhcmUgcGVuZGluZyBob2xkcyBvciB3ZSdyZSBhbHJlYWR5IHJlYWR5XG4gICAgICAgICAgICBpZiAoIHdhaXQgPT09IHRydWUgPyAtLWpRdWVyeS5yZWFkeVdhaXQgOiBqUXVlcnkuaXNSZWFkeSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoYXQgdGhlIERPTSBpcyByZWFkeVxuICAgICAgICAgICAgalF1ZXJ5LmlzUmVhZHkgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBJZiBhIG5vcm1hbCBET00gUmVhZHkgZXZlbnQgZmlyZWQsIGRlY3JlbWVudCwgYW5kIHdhaXQgaWYgbmVlZCBiZVxuICAgICAgICAgICAgaWYgKCB3YWl0ICE9PSB0cnVlICYmIC0talF1ZXJ5LnJlYWR5V2FpdCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgZnVuY3Rpb25zIGJvdW5kLCB0byBleGVjdXRlXG4gICAgICAgICAgICByZWFkeUxpc3QucmVzb2x2ZVdpdGgoIGRvY3VtZW50LCBbIGpRdWVyeSBdICk7XG4gICAgICAgIH1cbiAgICB9ICk7XG5cbiAgICBqUXVlcnkucmVhZHkudGhlbiA9IHJlYWR5TGlzdC50aGVuO1xuXG4vLyBUaGUgcmVhZHkgZXZlbnQgaGFuZGxlciBhbmQgc2VsZiBjbGVhbnVwIG1ldGhvZFxuICAgIGZ1bmN0aW9uIGNvbXBsZXRlZCgpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJET01Db250ZW50TG9hZGVkXCIsIGNvbXBsZXRlZCApO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGNvbXBsZXRlZCApO1xuICAgICAgICBqUXVlcnkucmVhZHkoKTtcbiAgICB9XG5cbi8vIENhdGNoIGNhc2VzIHdoZXJlICQoZG9jdW1lbnQpLnJlYWR5KCkgaXMgY2FsbGVkXG4vLyBhZnRlciB0aGUgYnJvd3NlciBldmVudCBoYXMgYWxyZWFkeSBvY2N1cnJlZC5cbi8vIFN1cHBvcnQ6IElFIDw9OSAtIDEwIG9ubHlcbi8vIE9sZGVyIElFIHNvbWV0aW1lcyBzaWduYWxzIFwiaW50ZXJhY3RpdmVcIiB0b28gc29vblxuICAgIGlmICggZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiIHx8XG4gICAgICAgICggZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJsb2FkaW5nXCIgJiYgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbCApICkge1xuXG4gICAgICAgIC8vIEhhbmRsZSBpdCBhc3luY2hyb25vdXNseSB0byBhbGxvdyBzY3JpcHRzIHRoZSBvcHBvcnR1bml0eSB0byBkZWxheSByZWFkeVxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCggalF1ZXJ5LnJlYWR5ICk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIC8vIFVzZSB0aGUgaGFuZHkgZXZlbnQgY2FsbGJhY2tcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJET01Db250ZW50TG9hZGVkXCIsIGNvbXBsZXRlZCApO1xuXG4gICAgICAgIC8vIEEgZmFsbGJhY2sgdG8gd2luZG93Lm9ubG9hZCwgdGhhdCB3aWxsIGFsd2F5cyB3b3JrXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCBcImxvYWRcIiwgY29tcGxldGVkICk7XG4gICAgfVxuXG5cblxuXG4vLyBNdWx0aWZ1bmN0aW9uYWwgbWV0aG9kIHRvIGdldCBhbmQgc2V0IHZhbHVlcyBvZiBhIGNvbGxlY3Rpb25cbi8vIFRoZSB2YWx1ZS9zIGNhbiBvcHRpb25hbGx5IGJlIGV4ZWN1dGVkIGlmIGl0J3MgYSBmdW5jdGlvblxuICAgIHZhciBhY2Nlc3MgPSBmdW5jdGlvbiggZWxlbXMsIGZuLCBrZXksIHZhbHVlLCBjaGFpbmFibGUsIGVtcHR5R2V0LCByYXcgKSB7XG4gICAgICAgIHZhciBpID0gMCxcbiAgICAgICAgICAgIGxlbiA9IGVsZW1zLmxlbmd0aCxcbiAgICAgICAgICAgIGJ1bGsgPSBrZXkgPT0gbnVsbDtcblxuICAgICAgICAvLyBTZXRzIG1hbnkgdmFsdWVzXG4gICAgICAgIGlmICggdG9UeXBlKCBrZXkgKSA9PT0gXCJvYmplY3RcIiApIHtcbiAgICAgICAgICAgIGNoYWluYWJsZSA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKCBpIGluIGtleSApIHtcbiAgICAgICAgICAgICAgICBhY2Nlc3MoIGVsZW1zLCBmbiwgaSwga2V5WyBpIF0sIHRydWUsIGVtcHR5R2V0LCByYXcgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2V0cyBvbmUgdmFsdWVcbiAgICAgICAgfSBlbHNlIGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgIGNoYWluYWJsZSA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICggIWlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG4gICAgICAgICAgICAgICAgcmF3ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBidWxrICkge1xuXG4gICAgICAgICAgICAgICAgLy8gQnVsayBvcGVyYXRpb25zIHJ1biBhZ2FpbnN0IHRoZSBlbnRpcmUgc2V0XG4gICAgICAgICAgICAgICAgaWYgKCByYXcgKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuLmNhbGwoIGVsZW1zLCB2YWx1ZSApO1xuICAgICAgICAgICAgICAgICAgICBmbiA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gLi4uZXhjZXB0IHdoZW4gZXhlY3V0aW5nIGZ1bmN0aW9uIHZhbHVlc1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1bGsgPSBmbjtcbiAgICAgICAgICAgICAgICAgICAgZm4gPSBmdW5jdGlvbiggZWxlbSwga2V5LCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBidWxrLmNhbGwoIGpRdWVyeSggZWxlbSApLCB2YWx1ZSApO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBmbiApIHtcbiAgICAgICAgICAgICAgICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgICAgICAgICAgICAgICAgZm4oXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtc1sgaSBdLCBrZXksIHJhdyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLmNhbGwoIGVsZW1zWyBpIF0sIGksIGZuKCBlbGVtc1sgaSBdLCBrZXkgKSApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBjaGFpbmFibGUgKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZXRzXG4gICAgICAgIGlmICggYnVsayApIHtcbiAgICAgICAgICAgIHJldHVybiBmbi5jYWxsKCBlbGVtcyApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxlbiA/IGZuKCBlbGVtc1sgMCBdLCBrZXkgKSA6IGVtcHR5R2V0O1xuICAgIH07XG5cblxuLy8gTWF0Y2hlcyBkYXNoZWQgc3RyaW5nIGZvciBjYW1lbGl6aW5nXG4gICAgdmFyIHJtc1ByZWZpeCA9IC9eLW1zLS8sXG4gICAgICAgIHJkYXNoQWxwaGEgPSAvLShbYS16XSkvZztcblxuLy8gVXNlZCBieSBjYW1lbENhc2UgYXMgY2FsbGJhY2sgdG8gcmVwbGFjZSgpXG4gICAgZnVuY3Rpb24gZmNhbWVsQ2FzZSggYWxsLCBsZXR0ZXIgKSB7XG4gICAgICAgIHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcbiAgICB9XG5cbi8vIENvbnZlcnQgZGFzaGVkIHRvIGNhbWVsQ2FzZTsgdXNlZCBieSB0aGUgY3NzIGFuZCBkYXRhIG1vZHVsZXNcbi8vIFN1cHBvcnQ6IElFIDw9OSAtIDExLCBFZGdlIDEyIC0gMTVcbi8vIE1pY3Jvc29mdCBmb3Jnb3QgdG8gaHVtcCB0aGVpciB2ZW5kb3IgcHJlZml4ICgjOTU3MilcbiAgICBmdW5jdGlvbiBjYW1lbENhc2UoIHN0cmluZyApIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKCBybXNQcmVmaXgsIFwibXMtXCIgKS5yZXBsYWNlKCByZGFzaEFscGhhLCBmY2FtZWxDYXNlICk7XG4gICAgfVxuICAgIHZhciBhY2NlcHREYXRhID0gZnVuY3Rpb24oIG93bmVyICkge1xuXG4gICAgICAgIC8vIEFjY2VwdHMgb25seTpcbiAgICAgICAgLy8gIC0gTm9kZVxuICAgICAgICAvLyAgICAtIE5vZGUuRUxFTUVOVF9OT0RFXG4gICAgICAgIC8vICAgIC0gTm9kZS5ET0NVTUVOVF9OT0RFXG4gICAgICAgIC8vICAtIE9iamVjdFxuICAgICAgICAvLyAgICAtIEFueVxuICAgICAgICByZXR1cm4gb3duZXIubm9kZVR5cGUgPT09IDEgfHwgb3duZXIubm9kZVR5cGUgPT09IDkgfHwgISggK293bmVyLm5vZGVUeXBlICk7XG4gICAgfTtcblxuXG5cblxuICAgIGZ1bmN0aW9uIERhdGEoKSB7XG4gICAgICAgIHRoaXMuZXhwYW5kbyA9IGpRdWVyeS5leHBhbmRvICsgRGF0YS51aWQrKztcbiAgICB9XG5cbiAgICBEYXRhLnVpZCA9IDE7XG5cbiAgICBEYXRhLnByb3RvdHlwZSA9IHtcblxuICAgICAgICBjYWNoZTogZnVuY3Rpb24oIG93bmVyICkge1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgb3duZXIgb2JqZWN0IGFscmVhZHkgaGFzIGEgY2FjaGVcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblxuICAgICAgICAgICAgLy8gSWYgbm90LCBjcmVhdGUgb25lXG4gICAgICAgICAgICBpZiAoICF2YWx1ZSApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHt9O1xuXG4gICAgICAgICAgICAgICAgLy8gV2UgY2FuIGFjY2VwdCBkYXRhIGZvciBub24tZWxlbWVudCBub2RlcyBpbiBtb2Rlcm4gYnJvd3NlcnMsXG4gICAgICAgICAgICAgICAgLy8gYnV0IHdlIHNob3VsZCBub3QsIHNlZSAjODMzNS5cbiAgICAgICAgICAgICAgICAvLyBBbHdheXMgcmV0dXJuIGFuIGVtcHR5IG9iamVjdC5cbiAgICAgICAgICAgICAgICBpZiAoIGFjY2VwdERhdGEoIG93bmVyICkgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgaXQgaXMgYSBub2RlIHVubGlrZWx5IHRvIGJlIHN0cmluZ2lmeS1lZCBvciBsb29wZWQgb3ZlclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2UgcGxhaW4gYXNzaWdubWVudFxuICAgICAgICAgICAgICAgICAgICBpZiAoIG93bmVyLm5vZGVUeXBlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3duZXJbIHRoaXMuZXhwYW5kbyBdID0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBzZWN1cmUgaXQgaW4gYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uZmlndXJhYmxlIG11c3QgYmUgdHJ1ZSB0byBhbGxvdyB0aGUgcHJvcGVydHkgdG8gYmVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlbGV0ZWQgd2hlbiBkYXRhIGlzIHJlbW92ZWRcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggb3duZXIsIHRoaXMuZXhwYW5kbywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKCBvd25lciwgZGF0YSwgdmFsdWUgKSB7XG4gICAgICAgICAgICB2YXIgcHJvcCxcbiAgICAgICAgICAgICAgICBjYWNoZSA9IHRoaXMuY2FjaGUoIG93bmVyICk7XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZTogWyBvd25lciwga2V5LCB2YWx1ZSBdIGFyZ3NcbiAgICAgICAgICAgIC8vIEFsd2F5cyB1c2UgY2FtZWxDYXNlIGtleSAoZ2gtMjI1NylcbiAgICAgICAgICAgIGlmICggdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgKSB7XG4gICAgICAgICAgICAgICAgY2FjaGVbIGNhbWVsQ2FzZSggZGF0YSApIF0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgIC8vIEhhbmRsZTogWyBvd25lciwgeyBwcm9wZXJ0aWVzIH0gXSBhcmdzXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gQ29weSB0aGUgcHJvcGVydGllcyBvbmUtYnktb25lIHRvIHRoZSBjYWNoZSBvYmplY3RcbiAgICAgICAgICAgICAgICBmb3IgKCBwcm9wIGluIGRhdGEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlWyBjYW1lbENhc2UoIHByb3AgKSBdID0gZGF0YVsgcHJvcCBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjYWNoZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiggb3duZXIsIGtleSApIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZSggb3duZXIgKSA6XG5cbiAgICAgICAgICAgICAgICAvLyBBbHdheXMgdXNlIGNhbWVsQ2FzZSBrZXkgKGdoLTIyNTcpXG4gICAgICAgICAgICAgICAgb3duZXJbIHRoaXMuZXhwYW5kbyBdICYmIG93bmVyWyB0aGlzLmV4cGFuZG8gXVsgY2FtZWxDYXNlKCBrZXkgKSBdO1xuICAgICAgICB9LFxuICAgICAgICBhY2Nlc3M6IGZ1bmN0aW9uKCBvd25lciwga2V5LCB2YWx1ZSApIHtcblxuICAgICAgICAgICAgLy8gSW4gY2FzZXMgd2hlcmUgZWl0aGVyOlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vICAgMS4gTm8ga2V5IHdhcyBzcGVjaWZpZWRcbiAgICAgICAgICAgIC8vICAgMi4gQSBzdHJpbmcga2V5IHdhcyBzcGVjaWZpZWQsIGJ1dCBubyB2YWx1ZSBwcm92aWRlZFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFRha2UgdGhlIFwicmVhZFwiIHBhdGggYW5kIGFsbG93IHRoZSBnZXQgbWV0aG9kIHRvIGRldGVybWluZVxuICAgICAgICAgICAgLy8gd2hpY2ggdmFsdWUgdG8gcmV0dXJuLCByZXNwZWN0aXZlbHkgZWl0aGVyOlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vICAgMS4gVGhlIGVudGlyZSBjYWNoZSBvYmplY3RcbiAgICAgICAgICAgIC8vICAgMi4gVGhlIGRhdGEgc3RvcmVkIGF0IHRoZSBrZXlcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICBpZiAoIGtleSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgKCAoIGtleSAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiICkgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCApICkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCBvd25lciwga2V5ICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFdoZW4gdGhlIGtleSBpcyBub3QgYSBzdHJpbmcsIG9yIGJvdGggYSBrZXkgYW5kIHZhbHVlXG4gICAgICAgICAgICAvLyBhcmUgc3BlY2lmaWVkLCBzZXQgb3IgZXh0ZW5kIChleGlzdGluZyBvYmplY3RzKSB3aXRoIGVpdGhlcjpcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgIDEuIEFuIG9iamVjdCBvZiBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAvLyAgIDIuIEEga2V5IGFuZCB2YWx1ZVxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIHRoaXMuc2V0KCBvd25lciwga2V5LCB2YWx1ZSApO1xuXG4gICAgICAgICAgICAvLyBTaW5jZSB0aGUgXCJzZXRcIiBwYXRoIGNhbiBoYXZlIHR3byBwb3NzaWJsZSBlbnRyeSBwb2ludHNcbiAgICAgICAgICAgIC8vIHJldHVybiB0aGUgZXhwZWN0ZWQgZGF0YSBiYXNlZCBvbiB3aGljaCBwYXRoIHdhcyB0YWtlblsqXVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGtleTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiggb3duZXIsIGtleSApIHtcbiAgICAgICAgICAgIHZhciBpLFxuICAgICAgICAgICAgICAgIGNhY2hlID0gb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXG4gICAgICAgICAgICBpZiAoIGNhY2hlID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGtleSAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydCBhcnJheSBvciBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG9mIGtleXNcbiAgICAgICAgICAgICAgICBpZiAoIEFycmF5LmlzQXJyYXkoIGtleSApICkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGtleSBpcyBhbiBhcnJheSBvZiBrZXlzLi4uXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGFsd2F5cyBzZXQgY2FtZWxDYXNlIGtleXMsIHNvIHJlbW92ZSB0aGF0LlxuICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXkubWFwKCBjYW1lbENhc2UgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBjYW1lbENhc2UoIGtleSApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGEga2V5IHdpdGggdGhlIHNwYWNlcyBleGlzdHMsIHVzZSBpdC5cbiAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBjcmVhdGUgYW4gYXJyYXkgYnkgbWF0Y2hpbmcgbm9uLXdoaXRlc3BhY2VcbiAgICAgICAgICAgICAgICAgICAga2V5ID0ga2V5IGluIGNhY2hlID9cbiAgICAgICAgICAgICAgICAgICAgICAgIFsga2V5IF0gOlxuICAgICAgICAgICAgICAgICAgICAgICAgKCBrZXkubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXSApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGkgPSBrZXkubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVsga2V5WyBpIF0gXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZXhwYW5kbyBpZiB0aGVyZSdzIG5vIG1vcmUgZGF0YVxuICAgICAgICAgICAgaWYgKCBrZXkgPT09IHVuZGVmaW5lZCB8fCBqUXVlcnkuaXNFbXB0eU9iamVjdCggY2FjaGUgKSApIHtcblxuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IENocm9tZSA8PTM1IC0gNDVcbiAgICAgICAgICAgICAgICAvLyBXZWJraXQgJiBCbGluayBwZXJmb3JtYW5jZSBzdWZmZXJzIHdoZW4gZGVsZXRpbmcgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgIC8vIGZyb20gRE9NIG5vZGVzLCBzbyBzZXQgdG8gdW5kZWZpbmVkIGluc3RlYWRcbiAgICAgICAgICAgICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0zNzg2MDcgKGJ1ZyByZXN0cmljdGVkKVxuICAgICAgICAgICAgICAgIGlmICggb3duZXIubm9kZVR5cGUgKSB7XG4gICAgICAgICAgICAgICAgICAgIG93bmVyWyB0aGlzLmV4cGFuZG8gXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaGFzRGF0YTogZnVuY3Rpb24oIG93bmVyICkge1xuICAgICAgICAgICAgdmFyIGNhY2hlID0gb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlICE9PSB1bmRlZmluZWQgJiYgIWpRdWVyeS5pc0VtcHR5T2JqZWN0KCBjYWNoZSApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgZGF0YVByaXYgPSBuZXcgRGF0YSgpO1xuXG4gICAgdmFyIGRhdGFVc2VyID0gbmV3IERhdGEoKTtcblxuXG5cbi8vXHRJbXBsZW1lbnRhdGlvbiBTdW1tYXJ5XG4vL1xuLy9cdDEuIEVuZm9yY2UgQVBJIHN1cmZhY2UgYW5kIHNlbWFudGljIGNvbXBhdGliaWxpdHkgd2l0aCAxLjkueCBicmFuY2hcbi8vXHQyLiBJbXByb3ZlIHRoZSBtb2R1bGUncyBtYWludGFpbmFiaWxpdHkgYnkgcmVkdWNpbmcgdGhlIHN0b3JhZ2Vcbi8vXHRcdHBhdGhzIHRvIGEgc2luZ2xlIG1lY2hhbmlzbS5cbi8vXHQzLiBVc2UgdGhlIHNhbWUgc2luZ2xlIG1lY2hhbmlzbSB0byBzdXBwb3J0IFwicHJpdmF0ZVwiIGFuZCBcInVzZXJcIiBkYXRhLlxuLy9cdDQuIF9OZXZlcl8gZXhwb3NlIFwicHJpdmF0ZVwiIGRhdGEgdG8gdXNlciBjb2RlIChUT0RPOiBEcm9wIF9kYXRhLCBfcmVtb3ZlRGF0YSlcbi8vXHQ1LiBBdm9pZCBleHBvc2luZyBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzIG9uIHVzZXIgb2JqZWN0cyAoZWcuIGV4cGFuZG8gcHJvcGVydGllcylcbi8vXHQ2LiBQcm92aWRlIGEgY2xlYXIgcGF0aCBmb3IgaW1wbGVtZW50YXRpb24gdXBncmFkZSB0byBXZWFrTWFwIGluIDIwMTRcblxuICAgIHZhciByYnJhY2UgPSAvXig/Olxce1tcXHdcXFddKlxcfXxcXFtbXFx3XFxXXSpcXF0pJC8sXG4gICAgICAgIHJtdWx0aURhc2ggPSAvW0EtWl0vZztcblxuICAgIGZ1bmN0aW9uIGdldERhdGEoIGRhdGEgKSB7XG4gICAgICAgIGlmICggZGF0YSA9PT0gXCJ0cnVlXCIgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggZGF0YSA9PT0gXCJmYWxzZVwiICkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBkYXRhID09PSBcIm51bGxcIiApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT25seSBjb252ZXJ0IHRvIGEgbnVtYmVyIGlmIGl0IGRvZXNuJ3QgY2hhbmdlIHRoZSBzdHJpbmdcbiAgICAgICAgaWYgKCBkYXRhID09PSArZGF0YSArIFwiXCIgKSB7XG4gICAgICAgICAgICByZXR1cm4gK2RhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHJicmFjZS50ZXN0KCBkYXRhICkgKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSggZGF0YSApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGF0YUF0dHIoIGVsZW0sIGtleSwgZGF0YSApIHtcbiAgICAgICAgdmFyIG5hbWU7XG5cbiAgICAgICAgLy8gSWYgbm90aGluZyB3YXMgZm91bmQgaW50ZXJuYWxseSwgdHJ5IHRvIGZldGNoIGFueVxuICAgICAgICAvLyBkYXRhIGZyb20gdGhlIEhUTUw1IGRhdGEtKiBhdHRyaWJ1dGVcbiAgICAgICAgaWYgKCBkYXRhID09PSB1bmRlZmluZWQgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcbiAgICAgICAgICAgIG5hbWUgPSBcImRhdGEtXCIgKyBrZXkucmVwbGFjZSggcm11bHRpRGFzaCwgXCItJCZcIiApLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBkYXRhID0gZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUgKTtcblxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZ2V0RGF0YSggZGF0YSApO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKCBlICkge31cblxuICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGRhdGEgc28gaXQgaXNuJ3QgY2hhbmdlZCBsYXRlclxuICAgICAgICAgICAgICAgIGRhdGFVc2VyLnNldCggZWxlbSwga2V5LCBkYXRhICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgalF1ZXJ5LmV4dGVuZCgge1xuICAgICAgICBoYXNEYXRhOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhVXNlci5oYXNEYXRhKCBlbGVtICkgfHwgZGF0YVByaXYuaGFzRGF0YSggZWxlbSApO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBkYXRhICkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFVc2VyLmFjY2VzcyggZWxlbSwgbmFtZSwgZGF0YSApO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZURhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuICAgICAgICAgICAgZGF0YVVzZXIucmVtb3ZlKCBlbGVtLCBuYW1lICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVE9ETzogTm93IHRoYXQgYWxsIGNhbGxzIHRvIF9kYXRhIGFuZCBfcmVtb3ZlRGF0YSBoYXZlIGJlZW4gcmVwbGFjZWRcbiAgICAgICAgLy8gd2l0aCBkaXJlY3QgY2FsbHMgdG8gZGF0YVByaXYgbWV0aG9kcywgdGhlc2UgY2FuIGJlIGRlcHJlY2F0ZWQuXG4gICAgICAgIF9kYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgZGF0YSApIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhUHJpdi5hY2Nlc3MoIGVsZW0sIG5hbWUsIGRhdGEgKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfcmVtb3ZlRGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG4gICAgICAgICAgICBkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIG5hbWUgKTtcbiAgICAgICAgfVxuICAgIH0gKTtcblxuICAgIGpRdWVyeS5mbi5leHRlbmQoIHtcbiAgICAgICAgZGF0YTogZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XG4gICAgICAgICAgICB2YXIgaSwgbmFtZSwgZGF0YSxcbiAgICAgICAgICAgICAgICBlbGVtID0gdGhpc1sgMCBdLFxuICAgICAgICAgICAgICAgIGF0dHJzID0gZWxlbSAmJiBlbGVtLmF0dHJpYnV0ZXM7XG5cbiAgICAgICAgICAgIC8vIEdldHMgYWxsIHZhbHVlc1xuICAgICAgICAgICAgaWYgKCBrZXkgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMubGVuZ3RoICkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YVVzZXIuZ2V0KCBlbGVtICk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmICFkYXRhUHJpdi5nZXQoIGVsZW0sIFwiaGFzRGF0YUF0dHJzXCIgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBhdHRycy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIGktLSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFIDExIG9ubHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgYXR0cnMgZWxlbWVudHMgY2FuIGJlIG51bGwgKCMxNDg5NClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGF0dHJzWyBpIF0gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBhdHRyc1sgaSBdLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbmFtZS5pbmRleE9mKCBcImRhdGEtXCIgKSA9PT0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBjYW1lbENhc2UoIG5hbWUuc2xpY2UoIDUgKSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUF0dHIoIGVsZW0sIG5hbWUsIGRhdGFbIG5hbWUgXSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVByaXYuc2V0KCBlbGVtLCBcImhhc0RhdGFBdHRyc1wiLCB0cnVlICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2V0cyBtdWx0aXBsZSB2YWx1ZXNcbiAgICAgICAgICAgIGlmICggdHlwZW9mIGtleSA9PT0gXCJvYmplY3RcIiApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVVzZXIuc2V0KCB0aGlzLCBrZXkgKTtcbiAgICAgICAgICAgICAgICB9ICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YTtcblxuICAgICAgICAgICAgICAgIC8vIFRoZSBjYWxsaW5nIGpRdWVyeSBvYmplY3QgKGVsZW1lbnQgbWF0Y2hlcykgaXMgbm90IGVtcHR5XG4gICAgICAgICAgICAgICAgLy8gKGFuZCB0aGVyZWZvcmUgaGFzIGFuIGVsZW1lbnQgYXBwZWFycyBhdCB0aGlzWyAwIF0pIGFuZCB0aGVcbiAgICAgICAgICAgICAgICAvLyBgdmFsdWVgIHBhcmFtZXRlciB3YXMgbm90IHVuZGVmaW5lZC4gQW4gZW1wdHkgalF1ZXJ5IG9iamVjdFxuICAgICAgICAgICAgICAgIC8vIHdpbGwgcmVzdWx0IGluIGB1bmRlZmluZWRgIGZvciBlbGVtID0gdGhpc1sgMCBdIHdoaWNoIHdpbGxcbiAgICAgICAgICAgICAgICAvLyB0aHJvdyBhbiBleGNlcHRpb24gaWYgYW4gYXR0ZW1wdCB0byByZWFkIGEgZGF0YSBjYWNoZSBpcyBtYWRlLlxuICAgICAgICAgICAgICAgIGlmICggZWxlbSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEF0dGVtcHQgdG8gZ2V0IGRhdGEgZnJvbSB0aGUgY2FjaGVcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGtleSB3aWxsIGFsd2F5cyBiZSBjYW1lbENhc2VkIGluIERhdGFcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGFVc2VyLmdldCggZWxlbSwga2V5ICk7XG4gICAgICAgICAgICAgICAgICAgIGlmICggZGF0YSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBBdHRlbXB0IHRvIFwiZGlzY292ZXJcIiB0aGUgZGF0YSBpblxuICAgICAgICAgICAgICAgICAgICAvLyBIVE1MNSBjdXN0b20gZGF0YS0qIGF0dHJzXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhQXR0ciggZWxlbSwga2V5ICk7XG4gICAgICAgICAgICAgICAgICAgIGlmICggZGF0YSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBXZSB0cmllZCByZWFsbHkgaGFyZCwgYnV0IHRoZSBkYXRhIGRvZXNuJ3QgZXhpc3QuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIGRhdGEuLi5cbiAgICAgICAgICAgICAgICB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGFsd2F5cyBzdG9yZSB0aGUgY2FtZWxDYXNlZCBrZXlcbiAgICAgICAgICAgICAgICAgICAgZGF0YVVzZXIuc2V0KCB0aGlzLCBrZXksIHZhbHVlICk7XG4gICAgICAgICAgICAgICAgfSApO1xuICAgICAgICAgICAgfSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxLCBudWxsLCB0cnVlICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlRGF0YTogZnVuY3Rpb24oIGtleSApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGRhdGFVc2VyLnJlbW92ZSggdGhpcywga2V5ICk7XG4gICAgICAgICAgICB9ICk7XG4gICAgICAgIH1cbiAgICB9ICk7XG5cblxuICAgIGpRdWVyeS5leHRlbmQoIHtcbiAgICAgICAgcXVldWU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBkYXRhICkge1xuICAgICAgICAgICAgdmFyIHF1ZXVlO1xuXG4gICAgICAgICAgICBpZiAoIGVsZW0gKSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9ICggdHlwZSB8fCBcImZ4XCIgKSArIFwicXVldWVcIjtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IGRhdGFQcml2LmdldCggZWxlbSwgdHlwZSApO1xuXG4gICAgICAgICAgICAgICAgLy8gU3BlZWQgdXAgZGVxdWV1ZSBieSBnZXR0aW5nIG91dCBxdWlja2x5IGlmIHRoaXMgaXMganVzdCBhIGxvb2t1cFxuICAgICAgICAgICAgICAgIGlmICggZGF0YSApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhcXVldWUgfHwgQXJyYXkuaXNBcnJheSggZGF0YSApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSBkYXRhUHJpdi5hY2Nlc3MoIGVsZW0sIHR5cGUsIGpRdWVyeS5tYWtlQXJyYXkoIGRhdGEgKSApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUucHVzaCggZGF0YSApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBxdWV1ZSB8fCBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkZXF1ZXVlOiBmdW5jdGlvbiggZWxlbSwgdHlwZSApIHtcbiAgICAgICAgICAgIHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcblxuICAgICAgICAgICAgdmFyIHF1ZXVlID0galF1ZXJ5LnF1ZXVlKCBlbGVtLCB0eXBlICksXG4gICAgICAgICAgICAgICAgc3RhcnRMZW5ndGggPSBxdWV1ZS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgZm4gPSBxdWV1ZS5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIGhvb2tzID0galF1ZXJ5Ll9xdWV1ZUhvb2tzKCBlbGVtLCB0eXBlICksXG4gICAgICAgICAgICAgICAgbmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZGVxdWV1ZSggZWxlbSwgdHlwZSApO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBmeCBxdWV1ZSBpcyBkZXF1ZXVlZCwgYWx3YXlzIHJlbW92ZSB0aGUgcHJvZ3Jlc3Mgc2VudGluZWxcbiAgICAgICAgICAgIGlmICggZm4gPT09IFwiaW5wcm9ncmVzc1wiICkge1xuICAgICAgICAgICAgICAgIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBzdGFydExlbmd0aC0tO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGZuICkge1xuXG4gICAgICAgICAgICAgICAgLy8gQWRkIGEgcHJvZ3Jlc3Mgc2VudGluZWwgdG8gcHJldmVudCB0aGUgZnggcXVldWUgZnJvbSBiZWluZ1xuICAgICAgICAgICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgZGVxdWV1ZWRcbiAgICAgICAgICAgICAgICBpZiAoIHR5cGUgPT09IFwiZnhcIiApIHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUudW5zaGlmdCggXCJpbnByb2dyZXNzXCIgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBDbGVhciB1cCB0aGUgbGFzdCBxdWV1ZSBzdG9wIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgZGVsZXRlIGhvb2tzLnN0b3A7XG4gICAgICAgICAgICAgICAgZm4uY2FsbCggZWxlbSwgbmV4dCwgaG9va3MgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCAhc3RhcnRMZW5ndGggJiYgaG9va3MgKSB7XG4gICAgICAgICAgICAgICAgaG9va3MuZW1wdHkuZmlyZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIE5vdCBwdWJsaWMgLSBnZW5lcmF0ZSBhIHF1ZXVlSG9va3Mgb2JqZWN0LCBvciByZXR1cm4gdGhlIGN1cnJlbnQgb25lXG4gICAgICAgIF9xdWV1ZUhvb2tzOiBmdW5jdGlvbiggZWxlbSwgdHlwZSApIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSB0eXBlICsgXCJxdWV1ZUhvb2tzXCI7XG4gICAgICAgICAgICByZXR1cm4gZGF0YVByaXYuZ2V0KCBlbGVtLCBrZXkgKSB8fCBkYXRhUHJpdi5hY2Nlc3MoIGVsZW0sIGtleSwge1xuICAgICAgICAgICAgICAgIGVtcHR5OiBqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKS5hZGQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIFsgdHlwZSArIFwicXVldWVcIiwga2V5IF0gKTtcbiAgICAgICAgICAgICAgICB9IClcbiAgICAgICAgICAgIH0gKTtcbiAgICAgICAgfVxuICAgIH0gKTtcblxuICAgIGpRdWVyeS5mbi5leHRlbmQoIHtcbiAgICAgICAgcXVldWU6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuICAgICAgICAgICAgdmFyIHNldHRlciA9IDI7XG5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHR5cGU7XG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiZnhcIjtcbiAgICAgICAgICAgICAgICBzZXR0ZXItLTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBhcmd1bWVudHMubGVuZ3RoIDwgc2V0dGVyICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBqUXVlcnkucXVldWUoIHRoaXNbIDAgXSwgdHlwZSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZGF0YSA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcXVldWUgPSBqUXVlcnkucXVldWUoIHRoaXMsIHR5cGUsIGRhdGEgKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBFbnN1cmUgYSBob29rcyBmb3IgdGhpcyBxdWV1ZVxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuX3F1ZXVlSG9va3MoIHRoaXMsIHR5cGUgKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIHR5cGUgPT09IFwiZnhcIiAmJiBxdWV1ZVsgMCBdICE9PSBcImlucHJvZ3Jlc3NcIiApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCB0eXBlICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ICk7XG4gICAgICAgIH0sXG4gICAgICAgIGRlcXVldWU6IGZ1bmN0aW9uKCB0eXBlICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcbiAgICAgICAgICAgIH0gKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXJRdWV1ZTogZnVuY3Rpb24oIHR5cGUgKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZSggdHlwZSB8fCBcImZ4XCIsIFtdICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gR2V0IGEgcHJvbWlzZSByZXNvbHZlZCB3aGVuIHF1ZXVlcyBvZiBhIGNlcnRhaW4gdHlwZVxuICAgICAgICAvLyBhcmUgZW1wdGllZCAoZnggaXMgdGhlIHR5cGUgYnkgZGVmYXVsdClcbiAgICAgICAgcHJvbWlzZTogZnVuY3Rpb24oIHR5cGUsIG9iaiApIHtcbiAgICAgICAgICAgIHZhciB0bXAsXG4gICAgICAgICAgICAgICAgY291bnQgPSAxLFxuICAgICAgICAgICAgICAgIGRlZmVyID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGkgPSB0aGlzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICByZXNvbHZlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggISggLS1jb3VudCApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZVdpdGgoIGVsZW1lbnRzLCBbIGVsZW1lbnRzIF0gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG4gICAgICAgICAgICAgICAgb2JqID0gdHlwZTtcbiAgICAgICAgICAgICAgICB0eXBlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG4gICAgICAgICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgICAgICAgICB0bXAgPSBkYXRhUHJpdi5nZXQoIGVsZW1lbnRzWyBpIF0sIHR5cGUgKyBcInF1ZXVlSG9va3NcIiApO1xuICAgICAgICAgICAgICAgIGlmICggdG1wICYmIHRtcC5lbXB0eSApIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgdG1wLmVtcHR5LmFkZCggcmVzb2x2ZSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlKCBvYmogKTtcbiAgICAgICAgfVxuICAgIH0gKTtcbiAgICB2YXIgcG51bSA9ICggL1srLV0/KD86XFxkKlxcLnwpXFxkKyg/OltlRV1bKy1dP1xcZCt8KS8gKS5zb3VyY2U7XG5cbiAgICB2YXIgcmNzc051bSA9IG5ldyBSZWdFeHAoIFwiXig/OihbKy1dKT18KShcIiArIHBudW0gKyBcIikoW2EteiVdKikkXCIsIFwiaVwiICk7XG5cblxuICAgIHZhciBjc3NFeHBhbmQgPSBbIFwiVG9wXCIsIFwiUmlnaHRcIiwgXCJCb3R0b21cIiwgXCJMZWZ0XCIgXTtcblxuICAgIHZhciBpc0hpZGRlbldpdGhpblRyZWUgPSBmdW5jdGlvbiggZWxlbSwgZWwgKSB7XG5cbiAgICAgICAgLy8gaXNIaWRkZW5XaXRoaW5UcmVlIG1pZ2h0IGJlIGNhbGxlZCBmcm9tIGpRdWVyeSNmaWx0ZXIgZnVuY3Rpb247XG4gICAgICAgIC8vIGluIHRoYXQgY2FzZSwgZWxlbWVudCB3aWxsIGJlIHNlY29uZCBhcmd1bWVudFxuICAgICAgICBlbGVtID0gZWwgfHwgZWxlbTtcblxuICAgICAgICAvLyBJbmxpbmUgc3R5bGUgdHJ1bXBzIGFsbFxuICAgICAgICByZXR1cm4gZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIiB8fFxuICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICYmXG5cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgY2hlY2sgY29tcHV0ZWQgc3R5bGVcbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IEZpcmVmb3ggPD00MyAtIDQ1XG4gICAgICAgICAgICAvLyBEaXNjb25uZWN0ZWQgZWxlbWVudHMgY2FuIGhhdmUgY29tcHV0ZWQgZGlzcGxheTogbm9uZSwgc28gZmlyc3QgY29uZmlybSB0aGF0IGVsZW0gaXNcbiAgICAgICAgICAgIC8vIGluIHRoZSBkb2N1bWVudC5cbiAgICAgICAgICAgIGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICkgJiZcblxuICAgICAgICAgICAgalF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSA9PT0gXCJub25lXCI7XG4gICAgfTtcblxuICAgIHZhciBzd2FwID0gZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIGNhbGxiYWNrLCBhcmdzICkge1xuICAgICAgICB2YXIgcmV0LCBuYW1lLFxuICAgICAgICAgICAgb2xkID0ge307XG5cbiAgICAgICAgLy8gUmVtZW1iZXIgdGhlIG9sZCB2YWx1ZXMsIGFuZCBpbnNlcnQgdGhlIG5ldyBvbmVzXG4gICAgICAgIGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcbiAgICAgICAgICAgIG9sZFsgbmFtZSBdID0gZWxlbS5zdHlsZVsgbmFtZSBdO1xuICAgICAgICAgICAgZWxlbS5zdHlsZVsgbmFtZSBdID0gb3B0aW9uc1sgbmFtZSBdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0ID0gY2FsbGJhY2suYXBwbHkoIGVsZW0sIGFyZ3MgfHwgW10gKTtcblxuICAgICAgICAvLyBSZXZlcnQgdGhlIG9sZCB2YWx1ZXNcbiAgICAgICAgZm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuICAgICAgICAgICAgZWxlbS5zdHlsZVsgbmFtZSBdID0gb2xkWyBuYW1lIF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG5cblxuXG5cbiAgICBmdW5jdGlvbiBhZGp1c3RDU1MoIGVsZW0sIHByb3AsIHZhbHVlUGFydHMsIHR3ZWVuICkge1xuICAgICAgICB2YXIgYWRqdXN0ZWQsIHNjYWxlLFxuICAgICAgICAgICAgbWF4SXRlcmF0aW9ucyA9IDIwLFxuICAgICAgICAgICAgY3VycmVudFZhbHVlID0gdHdlZW4gP1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHdlZW4uY3VyKCk7XG4gICAgICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBqUXVlcnkuY3NzKCBlbGVtLCBwcm9wLCBcIlwiICk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXRpYWwgPSBjdXJyZW50VmFsdWUoKSxcbiAgICAgICAgICAgIHVuaXQgPSB2YWx1ZVBhcnRzICYmIHZhbHVlUGFydHNbIDMgXSB8fCAoIGpRdWVyeS5jc3NOdW1iZXJbIHByb3AgXSA/IFwiXCIgOiBcInB4XCIgKSxcblxuICAgICAgICAgICAgLy8gU3RhcnRpbmcgdmFsdWUgY29tcHV0YXRpb24gaXMgcmVxdWlyZWQgZm9yIHBvdGVudGlhbCB1bml0IG1pc21hdGNoZXNcbiAgICAgICAgICAgIGluaXRpYWxJblVuaXQgPSAoIGpRdWVyeS5jc3NOdW1iZXJbIHByb3AgXSB8fCB1bml0ICE9PSBcInB4XCIgJiYgK2luaXRpYWwgKSAmJlxuICAgICAgICAgICAgICAgIHJjc3NOdW0uZXhlYyggalF1ZXJ5LmNzcyggZWxlbSwgcHJvcCApICk7XG5cbiAgICAgICAgaWYgKCBpbml0aWFsSW5Vbml0ICYmIGluaXRpYWxJblVuaXRbIDMgXSAhPT0gdW5pdCApIHtcblxuICAgICAgICAgICAgLy8gU3VwcG9ydDogRmlyZWZveCA8PTU0XG4gICAgICAgICAgICAvLyBIYWx2ZSB0aGUgaXRlcmF0aW9uIHRhcmdldCB2YWx1ZSB0byBwcmV2ZW50IGludGVyZmVyZW5jZSBmcm9tIENTUyB1cHBlciBib3VuZHMgKGdoLTIxNDQpXG4gICAgICAgICAgICBpbml0aWFsID0gaW5pdGlhbCAvIDI7XG5cbiAgICAgICAgICAgIC8vIFRydXN0IHVuaXRzIHJlcG9ydGVkIGJ5IGpRdWVyeS5jc3NcbiAgICAgICAgICAgIHVuaXQgPSB1bml0IHx8IGluaXRpYWxJblVuaXRbIDMgXTtcblxuICAgICAgICAgICAgLy8gSXRlcmF0aXZlbHkgYXBwcm94aW1hdGUgZnJvbSBhIG5vbnplcm8gc3RhcnRpbmcgcG9pbnRcbiAgICAgICAgICAgIGluaXRpYWxJblVuaXQgPSAraW5pdGlhbCB8fCAxO1xuXG4gICAgICAgICAgICB3aGlsZSAoIG1heEl0ZXJhdGlvbnMtLSApIHtcblxuICAgICAgICAgICAgICAgIC8vIEV2YWx1YXRlIGFuZCB1cGRhdGUgb3VyIGJlc3QgZ3Vlc3MgKGRvdWJsaW5nIGd1ZXNzZXMgdGhhdCB6ZXJvIG91dCkuXG4gICAgICAgICAgICAgICAgLy8gRmluaXNoIGlmIHRoZSBzY2FsZSBlcXVhbHMgb3IgY3Jvc3NlcyAxIChtYWtpbmcgdGhlIG9sZCpuZXcgcHJvZHVjdCBub24tcG9zaXRpdmUpLlxuICAgICAgICAgICAgICAgIGpRdWVyeS5zdHlsZSggZWxlbSwgcHJvcCwgaW5pdGlhbEluVW5pdCArIHVuaXQgKTtcbiAgICAgICAgICAgICAgICBpZiAoICggMSAtIHNjYWxlICkgKiAoIDEgLSAoIHNjYWxlID0gY3VycmVudFZhbHVlKCkgLyBpbml0aWFsIHx8IDAuNSApICkgPD0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4SXRlcmF0aW9ucyA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluaXRpYWxJblVuaXQgPSBpbml0aWFsSW5Vbml0IC8gc2NhbGU7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5pdGlhbEluVW5pdCA9IGluaXRpYWxJblVuaXQgKiAyO1xuICAgICAgICAgICAgalF1ZXJ5LnN0eWxlKCBlbGVtLCBwcm9wLCBpbml0aWFsSW5Vbml0ICsgdW5pdCApO1xuXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgdXBkYXRlIHRoZSB0d2VlbiBwcm9wZXJ0aWVzIGxhdGVyIG9uXG4gICAgICAgICAgICB2YWx1ZVBhcnRzID0gdmFsdWVQYXJ0cyB8fCBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdmFsdWVQYXJ0cyApIHtcbiAgICAgICAgICAgIGluaXRpYWxJblVuaXQgPSAraW5pdGlhbEluVW5pdCB8fCAraW5pdGlhbCB8fCAwO1xuXG4gICAgICAgICAgICAvLyBBcHBseSByZWxhdGl2ZSBvZmZzZXQgKCs9Ly09KSBpZiBzcGVjaWZpZWRcbiAgICAgICAgICAgIGFkanVzdGVkID0gdmFsdWVQYXJ0c1sgMSBdID9cbiAgICAgICAgICAgICAgICBpbml0aWFsSW5Vbml0ICsgKCB2YWx1ZVBhcnRzWyAxIF0gKyAxICkgKiB2YWx1ZVBhcnRzWyAyIF0gOlxuICAgICAgICAgICAgICAgICt2YWx1ZVBhcnRzWyAyIF07XG4gICAgICAgICAgICBpZiAoIHR3ZWVuICkge1xuICAgICAgICAgICAgICAgIHR3ZWVuLnVuaXQgPSB1bml0O1xuICAgICAgICAgICAgICAgIHR3ZWVuLnN0YXJ0ID0gaW5pdGlhbEluVW5pdDtcbiAgICAgICAgICAgICAgICB0d2Vlbi5lbmQgPSBhZGp1c3RlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWRqdXN0ZWQ7XG4gICAgfVxuXG5cbiAgICB2YXIgZGVmYXVsdERpc3BsYXlNYXAgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGdldERlZmF1bHREaXNwbGF5KCBlbGVtICkge1xuICAgICAgICB2YXIgdGVtcCxcbiAgICAgICAgICAgIGRvYyA9IGVsZW0ub3duZXJEb2N1bWVudCxcbiAgICAgICAgICAgIG5vZGVOYW1lID0gZWxlbS5ub2RlTmFtZSxcbiAgICAgICAgICAgIGRpc3BsYXkgPSBkZWZhdWx0RGlzcGxheU1hcFsgbm9kZU5hbWUgXTtcblxuICAgICAgICBpZiAoIGRpc3BsYXkgKSB7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGxheTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRlbXAgPSBkb2MuYm9keS5hcHBlbmRDaGlsZCggZG9jLmNyZWF0ZUVsZW1lbnQoIG5vZGVOYW1lICkgKTtcbiAgICAgICAgZGlzcGxheSA9IGpRdWVyeS5jc3MoIHRlbXAsIFwiZGlzcGxheVwiICk7XG5cbiAgICAgICAgdGVtcC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCB0ZW1wICk7XG5cbiAgICAgICAgaWYgKCBkaXNwbGF5ID09PSBcIm5vbmVcIiApIHtcbiAgICAgICAgICAgIGRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdERpc3BsYXlNYXBbIG5vZGVOYW1lIF0gPSBkaXNwbGF5O1xuXG4gICAgICAgIHJldHVybiBkaXNwbGF5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dIaWRlKCBlbGVtZW50cywgc2hvdyApIHtcbiAgICAgICAgdmFyIGRpc3BsYXksIGVsZW0sXG4gICAgICAgICAgICB2YWx1ZXMgPSBbXSxcbiAgICAgICAgICAgIGluZGV4ID0gMCxcbiAgICAgICAgICAgIGxlbmd0aCA9IGVsZW1lbnRzLmxlbmd0aDtcblxuICAgICAgICAvLyBEZXRlcm1pbmUgbmV3IGRpc3BsYXkgdmFsdWUgZm9yIGVsZW1lbnRzIHRoYXQgbmVlZCB0byBjaGFuZ2VcbiAgICAgICAgZm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcbiAgICAgICAgICAgIGVsZW0gPSBlbGVtZW50c1sgaW5kZXggXTtcbiAgICAgICAgICAgIGlmICggIWVsZW0uc3R5bGUgKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRpc3BsYXkgPSBlbGVtLnN0eWxlLmRpc3BsYXk7XG4gICAgICAgICAgICBpZiAoIHNob3cgKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBTaW5jZSB3ZSBmb3JjZSB2aXNpYmlsaXR5IHVwb24gY2FzY2FkZS1oaWRkZW4gZWxlbWVudHMsIGFuIGltbWVkaWF0ZSAoYW5kIHNsb3cpXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaXMgcmVxdWlyZWQgaW4gdGhpcyBmaXJzdCBsb29wIHVubGVzcyB3ZSBoYXZlIGEgbm9uZW1wdHkgZGlzcGxheSB2YWx1ZSAoZWl0aGVyXG4gICAgICAgICAgICAgICAgLy8gaW5saW5lIG9yIGFib3V0LXRvLWJlLXJlc3RvcmVkKVxuICAgICAgICAgICAgICAgIGlmICggZGlzcGxheSA9PT0gXCJub25lXCIgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc1sgaW5kZXggXSA9IGRhdGFQcml2LmdldCggZWxlbSwgXCJkaXNwbGF5XCIgKSB8fCBudWxsO1xuICAgICAgICAgICAgICAgICAgICBpZiAoICF2YWx1ZXNbIGluZGV4IF0gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICggZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICYmIGlzSGlkZGVuV2l0aGluVHJlZSggZWxlbSApICkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbIGluZGV4IF0gPSBnZXREZWZhdWx0RGlzcGxheSggZWxlbSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCBkaXNwbGF5ICE9PSBcIm5vbmVcIiApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzWyBpbmRleCBdID0gXCJub25lXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtZW1iZXIgd2hhdCB3ZSdyZSBvdmVyd3JpdGluZ1xuICAgICAgICAgICAgICAgICAgICBkYXRhUHJpdi5zZXQoIGVsZW0sIFwiZGlzcGxheVwiLCBkaXNwbGF5ICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IHRoZSBkaXNwbGF5IG9mIHRoZSBlbGVtZW50cyBpbiBhIHNlY29uZCBsb29wIHRvIGF2b2lkIGNvbnN0YW50IHJlZmxvd1xuICAgICAgICBmb3IgKCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuICAgICAgICAgICAgaWYgKCB2YWx1ZXNbIGluZGV4IF0gIT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50c1sgaW5kZXggXS5zdHlsZS5kaXNwbGF5ID0gdmFsdWVzWyBpbmRleCBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xuICAgIH1cblxuICAgIGpRdWVyeS5mbi5leHRlbmQoIHtcbiAgICAgICAgc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gc2hvd0hpZGUoIHRoaXMsIHRydWUgKTtcbiAgICAgICAgfSxcbiAgICAgICAgaGlkZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gc2hvd0hpZGUoIHRoaXMgKTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlOiBmdW5jdGlvbiggc3RhdGUgKSB7XG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBzdGF0ZSA9PT0gXCJib29sZWFuXCIgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlID8gdGhpcy5zaG93KCkgOiB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBpc0hpZGRlbldpdGhpblRyZWUoIHRoaXMgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCB0aGlzICkuc2hvdygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSggdGhpcyApLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICk7XG4gICAgICAgIH1cbiAgICB9ICk7XG4gICAgdmFyIHJjaGVja2FibGVUeXBlID0gKCAvXig/OmNoZWNrYm94fHJhZGlvKSQvaSApO1xuXG4gICAgdmFyIHJ0YWdOYW1lID0gKCAvPChbYS16XVteXFwvXFwwPlxceDIwXFx0XFxyXFxuXFxmXSspL2kgKTtcblxuICAgIHZhciByc2NyaXB0VHlwZSA9ICggL14kfF5tb2R1bGUkfFxcLyg/OmphdmF8ZWNtYSlzY3JpcHQvaSApO1xuXG5cblxuLy8gV2UgaGF2ZSB0byBjbG9zZSB0aGVzZSB0YWdzIHRvIHN1cHBvcnQgWEhUTUwgKCMxMzIwMClcbiAgICB2YXIgd3JhcE1hcCA9IHtcblxuICAgICAgICAvLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuICAgICAgICBvcHRpb246IFsgMSwgXCI8c2VsZWN0IG11bHRpcGxlPSdtdWx0aXBsZSc+XCIsIFwiPC9zZWxlY3Q+XCIgXSxcblxuICAgICAgICAvLyBYSFRNTCBwYXJzZXJzIGRvIG5vdCBtYWdpY2FsbHkgaW5zZXJ0IGVsZW1lbnRzIGluIHRoZVxuICAgICAgICAvLyBzYW1lIHdheSB0aGF0IHRhZyBzb3VwIHBhcnNlcnMgZG8uIFNvIHdlIGNhbm5vdCBzaG9ydGVuXG4gICAgICAgIC8vIHRoaXMgYnkgb21pdHRpbmcgPHRib2R5PiBvciBvdGhlciByZXF1aXJlZCBlbGVtZW50cy5cbiAgICAgICAgdGhlYWQ6IFsgMSwgXCI8dGFibGU+XCIsIFwiPC90YWJsZT5cIiBdLFxuICAgICAgICBjb2w6IFsgMiwgXCI8dGFibGU+PGNvbGdyb3VwPlwiLCBcIjwvY29sZ3JvdXA+PC90YWJsZT5cIiBdLFxuICAgICAgICB0cjogWyAyLCBcIjx0YWJsZT48dGJvZHk+XCIsIFwiPC90Ym9keT48L3RhYmxlPlwiIF0sXG4gICAgICAgIHRkOiBbIDMsIFwiPHRhYmxlPjx0Ym9keT48dHI+XCIsIFwiPC90cj48L3Rib2R5PjwvdGFibGU+XCIgXSxcblxuICAgICAgICBfZGVmYXVsdDogWyAwLCBcIlwiLCBcIlwiIF1cbiAgICB9O1xuXG4vLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuICAgIHdyYXBNYXAub3B0Z3JvdXAgPSB3cmFwTWFwLm9wdGlvbjtcblxuICAgIHdyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XG4gICAgd3JhcE1hcC50aCA9IHdyYXBNYXAudGQ7XG5cblxuICAgIGZ1bmN0aW9uIGdldEFsbCggY29udGV4dCwgdGFnICkge1xuXG4gICAgICAgIC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExIG9ubHlcbiAgICAgICAgLy8gVXNlIHR5cGVvZiB0byBhdm9pZCB6ZXJvLWFyZ3VtZW50IG1ldGhvZCBpbnZvY2F0aW9uIG9uIGhvc3Qgb2JqZWN0cyAoIzE1MTUxKVxuICAgICAgICB2YXIgcmV0O1xuXG4gICAgICAgIGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgKSB7XG4gICAgICAgICAgICByZXQgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgfHwgXCIqXCIgKTtcblxuICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2YgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsICE9PSBcInVuZGVmaW5lZFwiICkge1xuICAgICAgICAgICAgcmV0ID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKCB0YWcgfHwgXCIqXCIgKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0ID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHRhZyA9PT0gdW5kZWZpbmVkIHx8IHRhZyAmJiBub2RlTmFtZSggY29udGV4dCwgdGFnICkgKSB7XG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5Lm1lcmdlKCBbIGNvbnRleHQgXSwgcmV0ICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuXG4vLyBNYXJrIHNjcmlwdHMgYXMgaGF2aW5nIGFscmVhZHkgYmVlbiBldmFsdWF0ZWRcbiAgICBmdW5jdGlvbiBzZXRHbG9iYWxFdmFsKCBlbGVtcywgcmVmRWxlbWVudHMgKSB7XG4gICAgICAgIHZhciBpID0gMCxcbiAgICAgICAgICAgIGwgPSBlbGVtcy5sZW5ndGg7XG5cbiAgICAgICAgZm9yICggOyBpIDwgbDsgaSsrICkge1xuICAgICAgICAgICAgZGF0YVByaXYuc2V0KFxuICAgICAgICAgICAgICAgIGVsZW1zWyBpIF0sXG4gICAgICAgICAgICAgICAgXCJnbG9iYWxFdmFsXCIsXG4gICAgICAgICAgICAgICAgIXJlZkVsZW1lbnRzIHx8IGRhdGFQcml2LmdldCggcmVmRWxlbWVudHNbIGkgXSwgXCJnbG9iYWxFdmFsXCIgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgdmFyIHJodG1sID0gLzx8JiM/XFx3KzsvO1xuXG4gICAgZnVuY3Rpb24gYnVpbGRGcmFnbWVudCggZWxlbXMsIGNvbnRleHQsIHNjcmlwdHMsIHNlbGVjdGlvbiwgaWdub3JlZCApIHtcbiAgICAgICAgdmFyIGVsZW0sIHRtcCwgdGFnLCB3cmFwLCBjb250YWlucywgaixcbiAgICAgICAgICAgIGZyYWdtZW50ID0gY29udGV4dC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG4gICAgICAgICAgICBub2RlcyA9IFtdLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBsID0gZWxlbXMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAoIDsgaSA8IGw7IGkrKyApIHtcbiAgICAgICAgICAgIGVsZW0gPSBlbGVtc1sgaSBdO1xuXG4gICAgICAgICAgICBpZiAoIGVsZW0gfHwgZWxlbSA9PT0gMCApIHtcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBub2RlcyBkaXJlY3RseVxuICAgICAgICAgICAgICAgIGlmICggdG9UeXBlKCBlbGVtICkgPT09IFwib2JqZWN0XCIgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5LCBQaGFudG9tSlMgMSBvbmx5XG4gICAgICAgICAgICAgICAgICAgIC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Lm1lcmdlKCBub2RlcywgZWxlbS5ub2RlVHlwZSA/IFsgZWxlbSBdIDogZWxlbSApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENvbnZlcnQgbm9uLWh0bWwgaW50byBhIHRleHQgbm9kZVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoICFyaHRtbC50ZXN0KCBlbGVtICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLnB1c2goIGNvbnRleHQuY3JlYXRlVGV4dE5vZGUoIGVsZW0gKSApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENvbnZlcnQgaHRtbCBpbnRvIERPTSBub2Rlc1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IHRtcCB8fCBmcmFnbWVudC5hcHBlbmRDaGlsZCggY29udGV4dC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBEZXNlcmlhbGl6ZSBhIHN0YW5kYXJkIHJlcHJlc2VudGF0aW9uXG4gICAgICAgICAgICAgICAgICAgIHRhZyA9ICggcnRhZ05hbWUuZXhlYyggZWxlbSApIHx8IFsgXCJcIiwgXCJcIiBdIClbIDEgXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICB3cmFwID0gd3JhcE1hcFsgdGFnIF0gfHwgd3JhcE1hcC5fZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgdG1wLmlubmVySFRNTCA9IHdyYXBbIDEgXSArIGpRdWVyeS5odG1sUHJlZmlsdGVyKCBlbGVtICkgKyB3cmFwWyAyIF07XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRGVzY2VuZCB0aHJvdWdoIHdyYXBwZXJzIHRvIHRoZSByaWdodCBjb250ZW50XG4gICAgICAgICAgICAgICAgICAgIGogPSB3cmFwWyAwIF07XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICggai0tICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gdG1wLmxhc3RDaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuICAgICAgICAgICAgICAgICAgICAvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5tZXJnZSggbm9kZXMsIHRtcC5jaGlsZE5vZGVzICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhlIHRvcC1sZXZlbCBjb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gZnJhZ21lbnQuZmlyc3RDaGlsZDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGhlIGNyZWF0ZWQgbm9kZXMgYXJlIG9ycGhhbmVkICgjMTIzOTIpXG4gICAgICAgICAgICAgICAgICAgIHRtcC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtb3ZlIHdyYXBwZXIgZnJvbSBmcmFnbWVudFxuICAgICAgICBmcmFnbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICAgICAgaSA9IDA7XG4gICAgICAgIHdoaWxlICggKCBlbGVtID0gbm9kZXNbIGkrKyBdICkgKSB7XG5cbiAgICAgICAgICAgIC8vIFNraXAgZWxlbWVudHMgYWxyZWFkeSBpbiB0aGUgY29udGV4dCBjb2xsZWN0aW9uICh0cmFjLTQwODcpXG4gICAgICAgICAgICBpZiAoIHNlbGVjdGlvbiAmJiBqUXVlcnkuaW5BcnJheSggZWxlbSwgc2VsZWN0aW9uICkgPiAtMSApIHtcbiAgICAgICAgICAgICAgICBpZiAoIGlnbm9yZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlnbm9yZWQucHVzaCggZWxlbSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGFpbnMgPSBqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xuXG4gICAgICAgICAgICAvLyBBcHBlbmQgdG8gZnJhZ21lbnRcbiAgICAgICAgICAgIHRtcCA9IGdldEFsbCggZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGVsZW0gKSwgXCJzY3JpcHRcIiApO1xuXG4gICAgICAgICAgICAvLyBQcmVzZXJ2ZSBzY3JpcHQgZXZhbHVhdGlvbiBoaXN0b3J5XG4gICAgICAgICAgICBpZiAoIGNvbnRhaW5zICkge1xuICAgICAgICAgICAgICAgIHNldEdsb2JhbEV2YWwoIHRtcCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDYXB0dXJlIGV4ZWN1dGFibGVzXG4gICAgICAgICAgICBpZiAoIHNjcmlwdHMgKSB7XG4gICAgICAgICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCAoIGVsZW0gPSB0bXBbIGorKyBdICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggcnNjcmlwdFR5cGUudGVzdCggZWxlbS50eXBlIHx8IFwiXCIgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdHMucHVzaCggZWxlbSApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xuICAgIH1cblxuXG4gICAgKCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuICAgICAgICAgICAgZGl2ID0gZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApLFxuICAgICAgICAgICAgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKTtcblxuICAgICAgICAvLyBTdXBwb3J0OiBBbmRyb2lkIDQuMCAtIDQuMyBvbmx5XG4gICAgICAgIC8vIENoZWNrIHN0YXRlIGxvc3QgaWYgdGhlIG5hbWUgaXMgc2V0ICgjMTEyMTcpXG4gICAgICAgIC8vIFN1cHBvcnQ6IFdpbmRvd3MgV2ViIEFwcHMgKFdXQSlcbiAgICAgICAgLy8gYG5hbWVgIGFuZCBgdHlwZWAgbXVzdCB1c2UgLnNldEF0dHJpYnV0ZSBmb3IgV1dBICgjMTQ5MDEpXG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIFwicmFkaW9cIiApO1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoIFwiY2hlY2tlZFwiLCBcImNoZWNrZWRcIiApO1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoIFwibmFtZVwiLCBcInRcIiApO1xuXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZCggaW5wdXQgKTtcblxuICAgICAgICAvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4xIG9ubHlcbiAgICAgICAgLy8gT2xkZXIgV2ViS2l0IGRvZXNuJ3QgY2xvbmUgY2hlY2tlZCBzdGF0ZSBjb3JyZWN0bHkgaW4gZnJhZ21lbnRzXG4gICAgICAgIHN1cHBvcnQuY2hlY2tDbG9uZSA9IGRpdi5jbG9uZU5vZGUoIHRydWUgKS5jbG9uZU5vZGUoIHRydWUgKS5sYXN0Q2hpbGQuY2hlY2tlZDtcblxuICAgICAgICAvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRleHRhcmVhIChhbmQgY2hlY2tib3gpIGRlZmF1bHRWYWx1ZSBpcyBwcm9wZXJseSBjbG9uZWRcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IFwiPHRleHRhcmVhPng8L3RleHRhcmVhPlwiO1xuICAgICAgICBzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkID0gISFkaXYuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmRlZmF1bHRWYWx1ZTtcbiAgICB9ICkoKTtcbiAgICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cblxuICAgIHZhclxuICAgICAgICBya2V5RXZlbnQgPSAvXmtleS8sXG4gICAgICAgIHJtb3VzZUV2ZW50ID0gL14oPzptb3VzZXxwb2ludGVyfGNvbnRleHRtZW51fGRyYWd8ZHJvcCl8Y2xpY2svLFxuICAgICAgICBydHlwZW5hbWVzcGFjZSA9IC9eKFteLl0qKSg/OlxcLiguKyl8KS87XG5cbiAgICBmdW5jdGlvbiByZXR1cm5UcnVlKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXR1cm5GYWxzZSgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuLy8gU3VwcG9ydDogSUUgPD05IG9ubHlcbi8vIFNlZSAjMTMzOTMgZm9yIG1vcmUgaW5mb1xuICAgIGZ1bmN0aW9uIHNhZmVBY3RpdmVFbGVtZW50KCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIH0gY2F0Y2ggKCBlcnIgKSB7IH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbiggZWxlbSwgdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiwgb25lICkge1xuICAgICAgICB2YXIgb3JpZ0ZuLCB0eXBlO1xuXG4gICAgICAgIC8vIFR5cGVzIGNhbiBiZSBhIG1hcCBvZiB0eXBlcy9oYW5kbGVyc1xuICAgICAgICBpZiAoIHR5cGVvZiB0eXBlcyA9PT0gXCJvYmplY3RcIiApIHtcblxuICAgICAgICAgICAgLy8gKCB0eXBlcy1PYmplY3QsIHNlbGVjdG9yLCBkYXRhIClcbiAgICAgICAgICAgIGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuXG4gICAgICAgICAgICAgICAgLy8gKCB0eXBlcy1PYmplY3QsIGRhdGEgKVxuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhIHx8IHNlbGVjdG9yO1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICggdHlwZSBpbiB0eXBlcyApIHtcbiAgICAgICAgICAgICAgICBvbiggZWxlbSwgdHlwZSwgc2VsZWN0b3IsIGRhdGEsIHR5cGVzWyB0eXBlIF0sIG9uZSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGRhdGEgPT0gbnVsbCAmJiBmbiA9PSBudWxsICkge1xuXG4gICAgICAgICAgICAvLyAoIHR5cGVzLCBmbiApXG4gICAgICAgICAgICBmbiA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgZGF0YSA9IHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2UgaWYgKCBmbiA9PSBudWxsICkge1xuICAgICAgICAgICAgaWYgKCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgKSB7XG5cbiAgICAgICAgICAgICAgICAvLyAoIHR5cGVzLCBzZWxlY3RvciwgZm4gKVxuICAgICAgICAgICAgICAgIGZuID0gZGF0YTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIC8vICggdHlwZXMsIGRhdGEsIGZuIClcbiAgICAgICAgICAgICAgICBmbiA9IGRhdGE7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICggZm4gPT09IGZhbHNlICkge1xuICAgICAgICAgICAgZm4gPSByZXR1cm5GYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICggIWZuICkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIG9uZSA9PT0gMSApIHtcbiAgICAgICAgICAgIG9yaWdGbiA9IGZuO1xuICAgICAgICAgICAgZm4gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBDYW4gdXNlIGFuIGVtcHR5IHNldCwgc2luY2UgZXZlbnQgY29udGFpbnMgdGhlIGluZm9cbiAgICAgICAgICAgICAgICBqUXVlcnkoKS5vZmYoIGV2ZW50ICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9yaWdGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBVc2Ugc2FtZSBndWlkIHNvIGNhbGxlciBjYW4gcmVtb3ZlIHVzaW5nIG9yaWdGblxuICAgICAgICAgICAgZm4uZ3VpZCA9IG9yaWdGbi5ndWlkIHx8ICggb3JpZ0ZuLmd1aWQgPSBqUXVlcnkuZ3VpZCsrICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW0uZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBqUXVlcnkuZXZlbnQuYWRkKCB0aGlzLCB0eXBlcywgZm4sIGRhdGEsIHNlbGVjdG9yICk7XG4gICAgICAgIH0gKTtcbiAgICB9XG5cbiAgICAvKlxuICogSGVscGVyIGZ1bmN0aW9ucyBmb3IgbWFuYWdpbmcgZXZlbnRzIC0tIG5vdCBwYXJ0IG9mIHRoZSBwdWJsaWMgaW50ZXJmYWNlLlxuICogUHJvcHMgdG8gRGVhbiBFZHdhcmRzJyBhZGRFdmVudCBsaWJyYXJ5IGZvciBtYW55IG9mIHRoZSBpZGVhcy5cbiAqL1xuICAgIGpRdWVyeS5ldmVudCA9IHtcblxuICAgICAgICBnbG9iYWw6IHt9LFxuXG4gICAgICAgIGFkZDogZnVuY3Rpb24oIGVsZW0sIHR5cGVzLCBoYW5kbGVyLCBkYXRhLCBzZWxlY3RvciApIHtcblxuICAgICAgICAgICAgdmFyIGhhbmRsZU9iakluLCBldmVudEhhbmRsZSwgdG1wLFxuICAgICAgICAgICAgICAgIGV2ZW50cywgdCwgaGFuZGxlT2JqLFxuICAgICAgICAgICAgICAgIHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcbiAgICAgICAgICAgICAgICBlbGVtRGF0YSA9IGRhdGFQcml2LmdldCggZWxlbSApO1xuXG4gICAgICAgICAgICAvLyBEb24ndCBhdHRhY2ggZXZlbnRzIHRvIG5vRGF0YSBvciB0ZXh0L2NvbW1lbnQgbm9kZXMgKGJ1dCBhbGxvdyBwbGFpbiBvYmplY3RzKVxuICAgICAgICAgICAgaWYgKCAhZWxlbURhdGEgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYW4gb2JqZWN0IG9mIGN1c3RvbSBkYXRhIGluIGxpZXUgb2YgdGhlIGhhbmRsZXJcbiAgICAgICAgICAgIGlmICggaGFuZGxlci5oYW5kbGVyICkge1xuICAgICAgICAgICAgICAgIGhhbmRsZU9iakluID0gaGFuZGxlcjtcbiAgICAgICAgICAgICAgICBoYW5kbGVyID0gaGFuZGxlT2JqSW4uaGFuZGxlcjtcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9IGhhbmRsZU9iakluLnNlbGVjdG9yO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBFbnN1cmUgdGhhdCBpbnZhbGlkIHNlbGVjdG9ycyB0aHJvdyBleGNlcHRpb25zIGF0IGF0dGFjaCB0aW1lXG4gICAgICAgICAgICAvLyBFdmFsdWF0ZSBhZ2FpbnN0IGRvY3VtZW50RWxlbWVudCBpbiBjYXNlIGVsZW0gaXMgYSBub24tZWxlbWVudCBub2RlIChlLmcuLCBkb2N1bWVudClcbiAgICAgICAgICAgIGlmICggc2VsZWN0b3IgKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBkb2N1bWVudEVsZW1lbnQsIHNlbGVjdG9yICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBoYW5kbGVyIGhhcyBhIHVuaXF1ZSBJRCwgdXNlZCB0byBmaW5kL3JlbW92ZSBpdCBsYXRlclxuICAgICAgICAgICAgaWYgKCAhaGFuZGxlci5ndWlkICkge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuZ3VpZCA9IGpRdWVyeS5ndWlkKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEluaXQgdGhlIGVsZW1lbnQncyBldmVudCBzdHJ1Y3R1cmUgYW5kIG1haW4gaGFuZGxlciwgaWYgdGhpcyBpcyB0aGUgZmlyc3RcbiAgICAgICAgICAgIGlmICggISggZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzICkgKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoICEoIGV2ZW50SGFuZGxlID0gZWxlbURhdGEuaGFuZGxlICkgKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUgPSBmdW5jdGlvbiggZSApIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBEaXNjYXJkIHRoZSBzZWNvbmQgZXZlbnQgb2YgYSBqUXVlcnkuZXZlbnQudHJpZ2dlcigpIGFuZFxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIGFuIGV2ZW50IGlzIGNhbGxlZCBhZnRlciBhIHBhZ2UgaGFzIHVubG9hZGVkXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgalF1ZXJ5ICE9PSBcInVuZGVmaW5lZFwiICYmIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgIT09IGUudHlwZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQuZGlzcGF0Y2guYXBwbHkoIGVsZW0sIGFyZ3VtZW50cyApIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSBtdWx0aXBsZSBldmVudHMgc2VwYXJhdGVkIGJ5IGEgc3BhY2VcbiAgICAgICAgICAgIHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbIFwiXCIgXTtcbiAgICAgICAgICAgIHQgPSB0eXBlcy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoIHQtLSApIHtcbiAgICAgICAgICAgICAgICB0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1sgdCBdICkgfHwgW107XG4gICAgICAgICAgICAgICAgdHlwZSA9IG9yaWdUeXBlID0gdG1wWyAxIF07XG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlcyA9ICggdG1wWyAyIF0gfHwgXCJcIiApLnNwbGl0KCBcIi5cIiApLnNvcnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIFRoZXJlICptdXN0KiBiZSBhIHR5cGUsIG5vIGF0dGFjaGluZyBuYW1lc3BhY2Utb25seSBoYW5kbGVyc1xuICAgICAgICAgICAgICAgIGlmICggIXR5cGUgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElmIGV2ZW50IGNoYW5nZXMgaXRzIHR5cGUsIHVzZSB0aGUgc3BlY2lhbCBldmVudCBoYW5kbGVycyBmb3IgdGhlIGNoYW5nZWQgdHlwZVxuICAgICAgICAgICAgICAgIHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgc2VsZWN0b3IgZGVmaW5lZCwgZGV0ZXJtaW5lIHNwZWNpYWwgZXZlbnQgYXBpIHR5cGUsIG90aGVyd2lzZSBnaXZlbiB0eXBlXG4gICAgICAgICAgICAgICAgdHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHNwZWNpYWwgYmFzZWQgb24gbmV3bHkgcmVzZXQgdHlwZVxuICAgICAgICAgICAgICAgIHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXG4gICAgICAgICAgICAgICAgLy8gaGFuZGxlT2JqIGlzIHBhc3NlZCB0byBhbGwgZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgICAgICAgICBoYW5kbGVPYmogPSBqUXVlcnkuZXh0ZW5kKCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdUeXBlOiBvcmlnVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgZ3VpZDogaGFuZGxlci5ndWlkLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgICAgIG5lZWRzQ29udGV4dDogc2VsZWN0b3IgJiYgalF1ZXJ5LmV4cHIubWF0Y2gubmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9yICksXG4gICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZTogbmFtZXNwYWNlcy5qb2luKCBcIi5cIiApXG4gICAgICAgICAgICAgICAgfSwgaGFuZGxlT2JqSW4gKTtcblxuICAgICAgICAgICAgICAgIC8vIEluaXQgdGhlIGV2ZW50IGhhbmRsZXIgcXVldWUgaWYgd2UncmUgdGhlIGZpcnN0XG4gICAgICAgICAgICAgICAgaWYgKCAhKCBoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcnMuZGVsZWdhdGVDb3VudCA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSB1c2UgYWRkRXZlbnRMaXN0ZW5lciBpZiB0aGUgc3BlY2lhbCBldmVudHMgaGFuZGxlciByZXR1cm5zIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIGlmICggIXNwZWNpYWwuc2V0dXAgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpYWwuc2V0dXAuY2FsbCggZWxlbSwgZGF0YSwgbmFtZXNwYWNlcywgZXZlbnRIYW5kbGUgKSA9PT0gZmFsc2UgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZWxlbS5hZGRFdmVudExpc3RlbmVyICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgZXZlbnRIYW5kbGUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICggc3BlY2lhbC5hZGQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWNpYWwuYWRkLmNhbGwoIGVsZW0sIGhhbmRsZU9iaiApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggIWhhbmRsZU9iai5oYW5kbGVyLmd1aWQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVPYmouaGFuZGxlci5ndWlkID0gaGFuZGxlci5ndWlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRvIHRoZSBlbGVtZW50J3MgaGFuZGxlciBsaXN0LCBkZWxlZ2F0ZXMgaW4gZnJvbnRcbiAgICAgICAgICAgICAgICBpZiAoIHNlbGVjdG9yICkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoIGhhbmRsZXJzLmRlbGVnYXRlQ291bnQrKywgMCwgaGFuZGxlT2JqICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcnMucHVzaCggaGFuZGxlT2JqICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gS2VlcCB0cmFjayBvZiB3aGljaCBldmVudHMgaGF2ZSBldmVyIGJlZW4gdXNlZCwgZm9yIGV2ZW50IG9wdGltaXphdGlvblxuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5nbG9iYWxbIHR5cGUgXSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBEZXRhY2ggYW4gZXZlbnQgb3Igc2V0IG9mIGV2ZW50cyBmcm9tIGFuIGVsZW1lbnRcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiggZWxlbSwgdHlwZXMsIGhhbmRsZXIsIHNlbGVjdG9yLCBtYXBwZWRUeXBlcyApIHtcblxuICAgICAgICAgICAgdmFyIGosIG9yaWdDb3VudCwgdG1wLFxuICAgICAgICAgICAgICAgIGV2ZW50cywgdCwgaGFuZGxlT2JqLFxuICAgICAgICAgICAgICAgIHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcbiAgICAgICAgICAgICAgICBlbGVtRGF0YSA9IGRhdGFQcml2Lmhhc0RhdGEoIGVsZW0gKSAmJiBkYXRhUHJpdi5nZXQoIGVsZW0gKTtcblxuICAgICAgICAgICAgaWYgKCAhZWxlbURhdGEgfHwgISggZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzICkgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBPbmNlIGZvciBlYWNoIHR5cGUubmFtZXNwYWNlIGluIHR5cGVzOyB0eXBlIG1heSBiZSBvbWl0dGVkXG4gICAgICAgICAgICB0eXBlcyA9ICggdHlwZXMgfHwgXCJcIiApLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgWyBcIlwiIF07XG4gICAgICAgICAgICB0ID0gdHlwZXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKCB0LS0gKSB7XG4gICAgICAgICAgICAgICAgdG1wID0gcnR5cGVuYW1lc3BhY2UuZXhlYyggdHlwZXNbIHQgXSApIHx8IFtdO1xuICAgICAgICAgICAgICAgIHR5cGUgPSBvcmlnVHlwZSA9IHRtcFsgMSBdO1xuICAgICAgICAgICAgICAgIG5hbWVzcGFjZXMgPSAoIHRtcFsgMiBdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBVbmJpbmQgYWxsIGV2ZW50cyAob24gdGhpcyBuYW1lc3BhY2UsIGlmIHByb3ZpZGVkKSBmb3IgdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICAgICBpZiAoICF0eXBlICkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKCB0eXBlIGluIGV2ZW50cyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKyB0eXBlc1sgdCBdLCBoYW5kbGVyLCBzZWxlY3RvciwgdHJ1ZSApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuICAgICAgICAgICAgICAgIHR5cGUgPSAoIHNlbGVjdG9yID8gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgOiBzcGVjaWFsLmJpbmRUeXBlICkgfHwgdHlwZTtcbiAgICAgICAgICAgICAgICBoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdIHx8IFtdO1xuICAgICAgICAgICAgICAgIHRtcCA9IHRtcFsgMiBdICYmXG4gICAgICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oIFwiXFxcXC4oPzouKlxcXFwufClcIiApICsgXCIoXFxcXC58JClcIiApO1xuXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIG1hdGNoaW5nIGV2ZW50c1xuICAgICAgICAgICAgICAgIG9yaWdDb3VudCA9IGogPSBoYW5kbGVycy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCBqLS0gKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZU9iaiA9IGhhbmRsZXJzWyBqIF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCAoIG1hcHBlZFR5cGVzIHx8IG9yaWdUeXBlID09PSBoYW5kbGVPYmoub3JpZ1R5cGUgKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKCAhaGFuZGxlciB8fCBoYW5kbGVyLmd1aWQgPT09IGhhbmRsZU9iai5ndWlkICkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICggIXRtcCB8fCB0bXAudGVzdCggaGFuZGxlT2JqLm5hbWVzcGFjZSApICkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICggIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBoYW5kbGVPYmouc2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciA9PT0gXCIqKlwiICYmIGhhbmRsZU9iai5zZWxlY3RvciApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKCBqLCAxICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaGFuZGxlT2JqLnNlbGVjdG9yICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXJzLmRlbGVnYXRlQ291bnQtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggc3BlY2lhbC5yZW1vdmUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lhbC5yZW1vdmUuY2FsbCggZWxlbSwgaGFuZGxlT2JqICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgZ2VuZXJpYyBldmVudCBoYW5kbGVyIGlmIHdlIHJlbW92ZWQgc29tZXRoaW5nIGFuZCBubyBtb3JlIGhhbmRsZXJzIGV4aXN0XG4gICAgICAgICAgICAgICAgLy8gKGF2b2lkcyBwb3RlbnRpYWwgZm9yIGVuZGxlc3MgcmVjdXJzaW9uIGR1cmluZyByZW1vdmFsIG9mIHNwZWNpYWwgZXZlbnQgaGFuZGxlcnMpXG4gICAgICAgICAgICAgICAgaWYgKCBvcmlnQ291bnQgJiYgIWhhbmRsZXJzLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhc3BlY2lhbC50ZWFyZG93biB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lhbC50ZWFyZG93bi5jYWxsKCBlbGVtLCBuYW1lc3BhY2VzLCBlbGVtRGF0YS5oYW5kbGUgKSA9PT0gZmFsc2UgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5yZW1vdmVFdmVudCggZWxlbSwgdHlwZSwgZWxlbURhdGEuaGFuZGxlICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXZlbnRzWyB0eXBlIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZW1vdmUgZGF0YSBhbmQgdGhlIGV4cGFuZG8gaWYgaXQncyBubyBsb25nZXIgdXNlZFxuICAgICAgICAgICAgaWYgKCBqUXVlcnkuaXNFbXB0eU9iamVjdCggZXZlbnRzICkgKSB7XG4gICAgICAgICAgICAgICAgZGF0YVByaXYucmVtb3ZlKCBlbGVtLCBcImhhbmRsZSBldmVudHNcIiApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGRpc3BhdGNoOiBmdW5jdGlvbiggbmF0aXZlRXZlbnQgKSB7XG5cbiAgICAgICAgICAgIC8vIE1ha2UgYSB3cml0YWJsZSBqUXVlcnkuRXZlbnQgZnJvbSB0aGUgbmF0aXZlIGV2ZW50IG9iamVjdFxuICAgICAgICAgICAgdmFyIGV2ZW50ID0galF1ZXJ5LmV2ZW50LmZpeCggbmF0aXZlRXZlbnQgKTtcblxuICAgICAgICAgICAgdmFyIGksIGosIHJldCwgbWF0Y2hlZCwgaGFuZGxlT2JqLCBoYW5kbGVyUXVldWUsXG4gICAgICAgICAgICAgICAgYXJncyA9IG5ldyBBcnJheSggYXJndW1lbnRzLmxlbmd0aCApLFxuICAgICAgICAgICAgICAgIGhhbmRsZXJzID0gKCBkYXRhUHJpdi5nZXQoIHRoaXMsIFwiZXZlbnRzXCIgKSB8fCB7fSApWyBldmVudC50eXBlIF0gfHwgW10sXG4gICAgICAgICAgICAgICAgc3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyBldmVudC50eXBlIF0gfHwge307XG5cbiAgICAgICAgICAgIC8vIFVzZSB0aGUgZml4LWVkIGpRdWVyeS5FdmVudCByYXRoZXIgdGhhbiB0aGUgKHJlYWQtb25seSkgbmF0aXZlIGV2ZW50XG4gICAgICAgICAgICBhcmdzWyAwIF0gPSBldmVudDtcblxuICAgICAgICAgICAgZm9yICggaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgYXJnc1sgaSBdID0gYXJndW1lbnRzWyBpIF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LmRlbGVnYXRlVGFyZ2V0ID0gdGhpcztcblxuICAgICAgICAgICAgLy8gQ2FsbCB0aGUgcHJlRGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlLCBhbmQgbGV0IGl0IGJhaWwgaWYgZGVzaXJlZFxuICAgICAgICAgICAgaWYgKCBzcGVjaWFsLnByZURpc3BhdGNoICYmIHNwZWNpYWwucHJlRGlzcGF0Y2guY2FsbCggdGhpcywgZXZlbnQgKSA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgaGFuZGxlcnNcbiAgICAgICAgICAgIGhhbmRsZXJRdWV1ZSA9IGpRdWVyeS5ldmVudC5oYW5kbGVycy5jYWxsKCB0aGlzLCBldmVudCwgaGFuZGxlcnMgKTtcblxuICAgICAgICAgICAgLy8gUnVuIGRlbGVnYXRlcyBmaXJzdDsgdGhleSBtYXkgd2FudCB0byBzdG9wIHByb3BhZ2F0aW9uIGJlbmVhdGggdXNcbiAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKCAoIG1hdGNoZWQgPSBoYW5kbGVyUXVldWVbIGkrKyBdICkgJiYgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCA9IG1hdGNoZWQuZWxlbTtcblxuICAgICAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgICAgIHdoaWxlICggKCBoYW5kbGVPYmogPSBtYXRjaGVkLmhhbmRsZXJzWyBqKysgXSApICYmXG4gICAgICAgICAgICAgICAgIWV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIGV2ZW50IG11c3QgZWl0aGVyIDEpIGhhdmUgbm8gbmFtZXNwYWNlLCBvciAyKSBoYXZlIG5hbWVzcGFjZShzKVxuICAgICAgICAgICAgICAgICAgICAvLyBhIHN1YnNldCBvciBlcXVhbCB0byB0aG9zZSBpbiB0aGUgYm91bmQgZXZlbnQgKGJvdGggY2FuIGhhdmUgbm8gbmFtZXNwYWNlKS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhZXZlbnQucm5hbWVzcGFjZSB8fCBldmVudC5ybmFtZXNwYWNlLnRlc3QoIGhhbmRsZU9iai5uYW1lc3BhY2UgKSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuaGFuZGxlT2JqID0gaGFuZGxlT2JqO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuZGF0YSA9IGhhbmRsZU9iai5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgPSAoICggalF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGhhbmRsZU9iai5vcmlnVHlwZSBdIHx8IHt9ICkuaGFuZGxlIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlT2JqLmhhbmRsZXIgKS5hcHBseSggbWF0Y2hlZC5lbGVtLCBhcmdzICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcmV0ICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAoIGV2ZW50LnJlc3VsdCA9IHJldCApID09PSBmYWxzZSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDYWxsIHRoZSBwb3N0RGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlXG4gICAgICAgICAgICBpZiAoIHNwZWNpYWwucG9zdERpc3BhdGNoICkge1xuICAgICAgICAgICAgICAgIHNwZWNpYWwucG9zdERpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBldmVudC5yZXN1bHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlcnM6IGZ1bmN0aW9uKCBldmVudCwgaGFuZGxlcnMgKSB7XG4gICAgICAgICAgICB2YXIgaSwgaGFuZGxlT2JqLCBzZWwsIG1hdGNoZWRIYW5kbGVycywgbWF0Y2hlZFNlbGVjdG9ycyxcbiAgICAgICAgICAgICAgICBoYW5kbGVyUXVldWUgPSBbXSxcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZUNvdW50ID0gaGFuZGxlcnMuZGVsZWdhdGVDb3VudCxcbiAgICAgICAgICAgICAgICBjdXIgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgICAgIC8vIEZpbmQgZGVsZWdhdGUgaGFuZGxlcnNcbiAgICAgICAgICAgIGlmICggZGVsZWdhdGVDb3VudCAmJlxuXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUUgPD05XG4gICAgICAgICAgICAgICAgLy8gQmxhY2staG9sZSBTVkcgPHVzZT4gaW5zdGFuY2UgdHJlZXMgKHRyYWMtMTMxODApXG4gICAgICAgICAgICAgICAgY3VyLm5vZGVUeXBlICYmXG5cbiAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBGaXJlZm94IDw9NDJcbiAgICAgICAgICAgICAgICAvLyBTdXBwcmVzcyBzcGVjLXZpb2xhdGluZyBjbGlja3MgaW5kaWNhdGluZyBhIG5vbi1wcmltYXJ5IHBvaW50ZXIgYnV0dG9uICh0cmFjLTM4NjEpXG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy8jZXZlbnQtdHlwZS1jbGlja1xuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFIDExIG9ubHlcbiAgICAgICAgICAgICAgICAvLyAuLi5idXQgbm90IGFycm93IGtleSBcImNsaWNrc1wiIG9mIHJhZGlvIGlucHV0cywgd2hpY2ggY2FuIGhhdmUgYGJ1dHRvbmAgLTEgKGdoLTIzNDMpXG4gICAgICAgICAgICAgICAgISggZXZlbnQudHlwZSA9PT0gXCJjbGlja1wiICYmIGV2ZW50LmJ1dHRvbiA+PSAxICkgKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKCA7IGN1ciAhPT0gdGhpczsgY3VyID0gY3VyLnBhcmVudE5vZGUgfHwgdGhpcyApIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBjaGVjayBub24tZWxlbWVudHMgKCMxMzIwOClcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgcHJvY2VzcyBjbGlja3Mgb24gZGlzYWJsZWQgZWxlbWVudHMgKCM2OTExLCAjODE2NSwgIzExMzgyLCAjMTE3NjQpXG4gICAgICAgICAgICAgICAgICAgIGlmICggY3VyLm5vZGVUeXBlID09PSAxICYmICEoIGV2ZW50LnR5cGUgPT09IFwiY2xpY2tcIiAmJiBjdXIuZGlzYWJsZWQgPT09IHRydWUgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZWRIYW5kbGVycyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZFNlbGVjdG9ycyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBkZWxlZ2F0ZUNvdW50OyBpKysgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlT2JqID0gaGFuZGxlcnNbIGkgXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGNvbmZsaWN0IHdpdGggT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzICgjMTMyMDMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsID0gaGFuZGxlT2JqLnNlbGVjdG9yICsgXCIgXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG1hdGNoZWRTZWxlY3RvcnNbIHNlbCBdID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZWRTZWxlY3RvcnNbIHNlbCBdID0gaGFuZGxlT2JqLm5lZWRzQ29udGV4dCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoIHNlbCwgdGhpcyApLmluZGV4KCBjdXIgKSA+IC0xIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5maW5kKCBzZWwsIHRoaXMsIG51bGwsIFsgY3VyIF0gKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbWF0Y2hlZFNlbGVjdG9yc1sgc2VsIF0gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZWRIYW5kbGVycy5wdXNoKCBoYW5kbGVPYmogKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG1hdGNoZWRIYW5kbGVycy5sZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlclF1ZXVlLnB1c2goIHsgZWxlbTogY3VyLCBoYW5kbGVyczogbWF0Y2hlZEhhbmRsZXJzIH0gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQWRkIHRoZSByZW1haW5pbmcgKGRpcmVjdGx5LWJvdW5kKSBoYW5kbGVyc1xuICAgICAgICAgICAgY3VyID0gdGhpcztcbiAgICAgICAgICAgIGlmICggZGVsZWdhdGVDb3VudCA8IGhhbmRsZXJzLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyUXVldWUucHVzaCggeyBlbGVtOiBjdXIsIGhhbmRsZXJzOiBoYW5kbGVycy5zbGljZSggZGVsZWdhdGVDb3VudCApIH0gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZXJRdWV1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBhZGRQcm9wOiBmdW5jdGlvbiggbmFtZSwgaG9vayApIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggalF1ZXJ5LkV2ZW50LnByb3RvdHlwZSwgbmFtZSwge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZ2V0OiBpc0Z1bmN0aW9uKCBob29rICkgP1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdGhpcy5vcmlnaW5hbEV2ZW50ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBob29rKCB0aGlzLm9yaWdpbmFsRXZlbnQgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzLm9yaWdpbmFsRXZlbnQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxFdmVudFsgbmFtZSBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggdGhpcywgbmFtZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZml4OiBmdW5jdGlvbiggb3JpZ2luYWxFdmVudCApIHtcbiAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50IDpcbiAgICAgICAgICAgICAgICBuZXcgalF1ZXJ5LkV2ZW50KCBvcmlnaW5hbEV2ZW50ICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3BlY2lhbDoge1xuICAgICAgICAgICAgbG9hZDoge1xuXG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCB0cmlnZ2VyZWQgaW1hZ2UubG9hZCBldmVudHMgZnJvbSBidWJibGluZyB0byB3aW5kb3cubG9hZFxuICAgICAgICAgICAgICAgIG5vQnViYmxlOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9jdXM6IHtcblxuICAgICAgICAgICAgICAgIC8vIEZpcmUgbmF0aXZlIGV2ZW50IGlmIHBvc3NpYmxlIHNvIGJsdXIvZm9jdXMgc2VxdWVuY2UgaXMgY29ycmVjdFxuICAgICAgICAgICAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHRoaXMgIT09IHNhZmVBY3RpdmVFbGVtZW50KCkgJiYgdGhpcy5mb2N1cyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVsZWdhdGVUeXBlOiBcImZvY3VzaW5cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJsdXI6IHtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzID09PSBzYWZlQWN0aXZlRWxlbWVudCgpICYmIHRoaXMuYmx1ciApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZVR5cGU6IFwiZm9jdXNvdXRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsaWNrOiB7XG5cbiAgICAgICAgICAgICAgICAvLyBGb3IgY2hlY2tib3gsIGZpcmUgbmF0aXZlIGV2ZW50IHNvIGNoZWNrZWQgc3RhdGUgd2lsbCBiZSByaWdodFxuICAgICAgICAgICAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHRoaXMudHlwZSA9PT0gXCJjaGVja2JveFwiICYmIHRoaXMuY2xpY2sgJiYgbm9kZU5hbWUoIHRoaXMsIFwiaW5wdXRcIiApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIC8vIEZvciBjcm9zcy1icm93c2VyIGNvbnNpc3RlbmN5LCBkb24ndCBmaXJlIG5hdGl2ZSAuY2xpY2soKSBvbiBsaW5rc1xuICAgICAgICAgICAgICAgIF9kZWZhdWx0OiBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlTmFtZSggZXZlbnQudGFyZ2V0LCBcImFcIiApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGJlZm9yZXVubG9hZDoge1xuICAgICAgICAgICAgICAgIHBvc3REaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IEZpcmVmb3ggMjArXG4gICAgICAgICAgICAgICAgICAgIC8vIEZpcmVmb3ggZG9lc24ndCBhbGVydCBpZiB0aGUgcmV0dXJuVmFsdWUgZmllbGQgaXMgbm90IHNldC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCBldmVudC5yZXN1bHQgIT09IHVuZGVmaW5lZCAmJiBldmVudC5vcmlnaW5hbEV2ZW50ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQub3JpZ2luYWxFdmVudC5yZXR1cm5WYWx1ZSA9IGV2ZW50LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBqUXVlcnkucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiggZWxlbSwgdHlwZSwgaGFuZGxlICkge1xuXG4gICAgICAgIC8vIFRoaXMgXCJpZlwiIGlzIG5lZWRlZCBmb3IgcGxhaW4gb2JqZWN0c1xuICAgICAgICBpZiAoIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciApIHtcbiAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggdHlwZSwgaGFuZGxlICk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgalF1ZXJ5LkV2ZW50ID0gZnVuY3Rpb24oIHNyYywgcHJvcHMgKSB7XG5cbiAgICAgICAgLy8gQWxsb3cgaW5zdGFudGlhdGlvbiB3aXRob3V0IHRoZSAnbmV3JyBrZXl3b3JkXG4gICAgICAgIGlmICggISggdGhpcyBpbnN0YW5jZW9mIGpRdWVyeS5FdmVudCApICkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBqUXVlcnkuRXZlbnQoIHNyYywgcHJvcHMgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEV2ZW50IG9iamVjdFxuICAgICAgICBpZiAoIHNyYyAmJiBzcmMudHlwZSApIHtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxFdmVudCA9IHNyYztcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHNyYy50eXBlO1xuXG4gICAgICAgICAgICAvLyBFdmVudHMgYnViYmxpbmcgdXAgdGhlIGRvY3VtZW50IG1heSBoYXZlIGJlZW4gbWFya2VkIGFzIHByZXZlbnRlZFxuICAgICAgICAgICAgLy8gYnkgYSBoYW5kbGVyIGxvd2VyIGRvd24gdGhlIHRyZWU7IHJlZmxlY3QgdGhlIGNvcnJlY3QgdmFsdWUuXG4gICAgICAgICAgICB0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IHNyYy5kZWZhdWx0UHJldmVudGVkIHx8XG4gICAgICAgICAgICBzcmMuZGVmYXVsdFByZXZlbnRlZCA9PT0gdW5kZWZpbmVkICYmXG5cbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD0yLjMgb25seVxuICAgICAgICAgICAgc3JjLnJldHVyblZhbHVlID09PSBmYWxzZSA/XG4gICAgICAgICAgICAgICAgcmV0dXJuVHJ1ZSA6XG4gICAgICAgICAgICAgICAgcmV0dXJuRmFsc2U7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSB0YXJnZXQgcHJvcGVydGllc1xuICAgICAgICAgICAgLy8gU3VwcG9ydDogU2FmYXJpIDw9NiAtIDcgb25seVxuICAgICAgICAgICAgLy8gVGFyZ2V0IHNob3VsZCBub3QgYmUgYSB0ZXh0IG5vZGUgKCM1MDQsICMxMzE0MylcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gKCBzcmMudGFyZ2V0ICYmIHNyYy50YXJnZXQubm9kZVR5cGUgPT09IDMgKSA/XG4gICAgICAgICAgICAgICAgc3JjLnRhcmdldC5wYXJlbnROb2RlIDpcbiAgICAgICAgICAgICAgICBzcmMudGFyZ2V0O1xuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXJnZXQgPSBzcmMuY3VycmVudFRhcmdldDtcbiAgICAgICAgICAgIHRoaXMucmVsYXRlZFRhcmdldCA9IHNyYy5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgICAgICAgICAvLyBFdmVudCB0eXBlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBzcmM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQdXQgZXhwbGljaXRseSBwcm92aWRlZCBwcm9wZXJ0aWVzIG9udG8gdGhlIGV2ZW50IG9iamVjdFxuICAgICAgICBpZiAoIHByb3BzICkge1xuICAgICAgICAgICAgalF1ZXJ5LmV4dGVuZCggdGhpcywgcHJvcHMgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIHRpbWVzdGFtcCBpZiBpbmNvbWluZyBldmVudCBkb2Vzbid0IGhhdmUgb25lXG4gICAgICAgIHRoaXMudGltZVN0YW1wID0gc3JjICYmIHNyYy50aW1lU3RhbXAgfHwgRGF0ZS5ub3coKTtcblxuICAgICAgICAvLyBNYXJrIGl0IGFzIGZpeGVkXG4gICAgICAgIHRoaXNbIGpRdWVyeS5leHBhbmRvIF0gPSB0cnVlO1xuICAgIH07XG5cbi8vIGpRdWVyeS5FdmVudCBpcyBiYXNlZCBvbiBET00zIEV2ZW50cyBhcyBzcGVjaWZpZWQgYnkgdGhlIEVDTUFTY3JpcHQgTGFuZ3VhZ2UgQmluZGluZ1xuLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSLzIwMDMvV0QtRE9NLUxldmVsLTMtRXZlbnRzLTIwMDMwMzMxL2VjbWEtc2NyaXB0LWJpbmRpbmcuaHRtbFxuICAgIGpRdWVyeS5FdmVudC5wcm90b3R5cGUgPSB7XG4gICAgICAgIGNvbnN0cnVjdG9yOiBqUXVlcnkuRXZlbnQsXG4gICAgICAgIGlzRGVmYXVsdFByZXZlbnRlZDogcmV0dXJuRmFsc2UsXG4gICAgICAgIGlzUHJvcGFnYXRpb25TdG9wcGVkOiByZXR1cm5GYWxzZSxcbiAgICAgICAgaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQ6IHJldHVybkZhbHNlLFxuICAgICAgICBpc1NpbXVsYXRlZDogZmFsc2UsXG5cbiAgICAgICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cbiAgICAgICAgICAgIHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuVHJ1ZTtcblxuICAgICAgICAgICAgaWYgKCBlICYmICF0aGlzLmlzU2ltdWxhdGVkICkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG4gICAgICAgICAgICB0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcblxuICAgICAgICAgICAgaWYgKCBlICYmICF0aGlzLmlzU2ltdWxhdGVkICkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuICAgICAgICAgICAgdGhpcy5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XG5cbiAgICAgICAgICAgIGlmICggZSAmJiAhdGhpcy5pc1NpbXVsYXRlZCApIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfTtcblxuLy8gSW5jbHVkZXMgYWxsIGNvbW1vbiBldmVudCBwcm9wcyBpbmNsdWRpbmcgS2V5RXZlbnQgYW5kIE1vdXNlRXZlbnQgc3BlY2lmaWMgcHJvcHNcbiAgICBqUXVlcnkuZWFjaCgge1xuICAgICAgICBhbHRLZXk6IHRydWUsXG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgIGNoYW5nZWRUb3VjaGVzOiB0cnVlLFxuICAgICAgICBjdHJsS2V5OiB0cnVlLFxuICAgICAgICBkZXRhaWw6IHRydWUsXG4gICAgICAgIGV2ZW50UGhhc2U6IHRydWUsXG4gICAgICAgIG1ldGFLZXk6IHRydWUsXG4gICAgICAgIHBhZ2VYOiB0cnVlLFxuICAgICAgICBwYWdlWTogdHJ1ZSxcbiAgICAgICAgc2hpZnRLZXk6IHRydWUsXG4gICAgICAgIHZpZXc6IHRydWUsXG4gICAgICAgIFwiY2hhclwiOiB0cnVlLFxuICAgICAgICBjaGFyQ29kZTogdHJ1ZSxcbiAgICAgICAga2V5OiB0cnVlLFxuICAgICAgICBrZXlDb2RlOiB0cnVlLFxuICAgICAgICBidXR0b246IHRydWUsXG4gICAgICAgIGJ1dHRvbnM6IHRydWUsXG4gICAgICAgIGNsaWVudFg6IHRydWUsXG4gICAgICAgIGNsaWVudFk6IHRydWUsXG4gICAgICAgIG9mZnNldFg6IHRydWUsXG4gICAgICAgIG9mZnNldFk6IHRydWUsXG4gICAgICAgIHBvaW50ZXJJZDogdHJ1ZSxcbiAgICAgICAgcG9pbnRlclR5cGU6IHRydWUsXG4gICAgICAgIHNjcmVlblg6IHRydWUsXG4gICAgICAgIHNjcmVlblk6IHRydWUsXG4gICAgICAgIHRhcmdldFRvdWNoZXM6IHRydWUsXG4gICAgICAgIHRvRWxlbWVudDogdHJ1ZSxcbiAgICAgICAgdG91Y2hlczogdHJ1ZSxcblxuICAgICAgICB3aGljaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IGV2ZW50LmJ1dHRvbjtcblxuICAgICAgICAgICAgLy8gQWRkIHdoaWNoIGZvciBrZXkgZXZlbnRzXG4gICAgICAgICAgICBpZiAoIGV2ZW50LndoaWNoID09IG51bGwgJiYgcmtleUV2ZW50LnRlc3QoIGV2ZW50LnR5cGUgKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQuY2hhckNvZGUgIT0gbnVsbCA/IGV2ZW50LmNoYXJDb2RlIDogZXZlbnQua2V5Q29kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQWRkIHdoaWNoIGZvciBjbGljazogMSA9PT0gbGVmdDsgMiA9PT0gbWlkZGxlOyAzID09PSByaWdodFxuICAgICAgICAgICAgaWYgKCAhZXZlbnQud2hpY2ggJiYgYnV0dG9uICE9PSB1bmRlZmluZWQgJiYgcm1vdXNlRXZlbnQudGVzdCggZXZlbnQudHlwZSApICkge1xuICAgICAgICAgICAgICAgIGlmICggYnV0dG9uICYgMSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCBidXR0b24gJiAyICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIGJ1dHRvbiAmIDQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQud2hpY2g7XG4gICAgICAgIH1cbiAgICB9LCBqUXVlcnkuZXZlbnQuYWRkUHJvcCApO1xuXG4vLyBDcmVhdGUgbW91c2VlbnRlci9sZWF2ZSBldmVudHMgdXNpbmcgbW91c2VvdmVyL291dCBhbmQgZXZlbnQtdGltZSBjaGVja3Ncbi8vIHNvIHRoYXQgZXZlbnQgZGVsZWdhdGlvbiB3b3JrcyBpbiBqUXVlcnkuXG4vLyBEbyB0aGUgc2FtZSBmb3IgcG9pbnRlcmVudGVyL3BvaW50ZXJsZWF2ZSBhbmQgcG9pbnRlcm92ZXIvcG9pbnRlcm91dFxuLy9cbi8vIFN1cHBvcnQ6IFNhZmFyaSA3IG9ubHlcbi8vIFNhZmFyaSBzZW5kcyBtb3VzZWVudGVyIHRvbyBvZnRlbjsgc2VlOlxuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDcwMjU4XG4vLyBmb3IgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBidWcgKGl0IGV4aXN0ZWQgaW4gb2xkZXIgQ2hyb21lIHZlcnNpb25zIGFzIHdlbGwpLlxuICAgIGpRdWVyeS5lYWNoKCB7XG4gICAgICAgIG1vdXNlZW50ZXI6IFwibW91c2VvdmVyXCIsXG4gICAgICAgIG1vdXNlbGVhdmU6IFwibW91c2VvdXRcIixcbiAgICAgICAgcG9pbnRlcmVudGVyOiBcInBvaW50ZXJvdmVyXCIsXG4gICAgICAgIHBvaW50ZXJsZWF2ZTogXCJwb2ludGVyb3V0XCJcbiAgICB9LCBmdW5jdGlvbiggb3JpZywgZml4ICkge1xuICAgICAgICBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgb3JpZyBdID0ge1xuICAgICAgICAgICAgZGVsZWdhdGVUeXBlOiBmaXgsXG4gICAgICAgICAgICBiaW5kVHlwZTogZml4LFxuXG4gICAgICAgICAgICBoYW5kbGU6IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgICAgICAgICAgICB2YXIgcmV0LFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSB0aGlzLFxuICAgICAgICAgICAgICAgICAgICByZWxhdGVkID0gZXZlbnQucmVsYXRlZFRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlT2JqID0gZXZlbnQuaGFuZGxlT2JqO1xuXG4gICAgICAgICAgICAgICAgLy8gRm9yIG1vdXNlZW50ZXIvbGVhdmUgY2FsbCB0aGUgaGFuZGxlciBpZiByZWxhdGVkIGlzIG91dHNpZGUgdGhlIHRhcmdldC5cbiAgICAgICAgICAgICAgICAvLyBOQjogTm8gcmVsYXRlZFRhcmdldCBpZiB0aGUgbW91c2UgbGVmdC9lbnRlcmVkIHRoZSBicm93c2VyIHdpbmRvd1xuICAgICAgICAgICAgICAgIGlmICggIXJlbGF0ZWQgfHwgKCByZWxhdGVkICE9PSB0YXJnZXQgJiYgIWpRdWVyeS5jb250YWlucyggdGFyZ2V0LCByZWxhdGVkICkgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudHlwZSA9IGhhbmRsZU9iai5vcmlnVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gaGFuZGxlT2JqLmhhbmRsZXIuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuICAgICAgICAgICAgICAgICAgICBldmVudC50eXBlID0gZml4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0gKTtcblxuICAgIGpRdWVyeS5mbi5leHRlbmQoIHtcblxuICAgICAgICBvbjogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKSB7XG4gICAgICAgICAgICByZXR1cm4gb24oIHRoaXMsIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25lOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcbiAgICAgICAgICAgIHJldHVybiBvbiggdGhpcywgdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiwgMSApO1xuICAgICAgICB9LFxuICAgICAgICBvZmY6IGZ1bmN0aW9uKCB0eXBlcywgc2VsZWN0b3IsIGZuICkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZU9iaiwgdHlwZTtcbiAgICAgICAgICAgIGlmICggdHlwZXMgJiYgdHlwZXMucHJldmVudERlZmF1bHQgJiYgdHlwZXMuaGFuZGxlT2JqICkge1xuXG4gICAgICAgICAgICAgICAgLy8gKCBldmVudCApICBkaXNwYXRjaGVkIGpRdWVyeS5FdmVudFxuICAgICAgICAgICAgICAgIGhhbmRsZU9iaiA9IHR5cGVzLmhhbmRsZU9iajtcbiAgICAgICAgICAgICAgICBqUXVlcnkoIHR5cGVzLmRlbGVnYXRlVGFyZ2V0ICkub2ZmKFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVPYmoubmFtZXNwYWNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZU9iai5vcmlnVHlwZSArIFwiLlwiICsgaGFuZGxlT2JqLm5hbWVzcGFjZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVPYmoub3JpZ1R5cGUsXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZU9iai5zZWxlY3RvcixcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlT2JqLmhhbmRsZXJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgdHlwZXMgPT09IFwib2JqZWN0XCIgKSB7XG5cbiAgICAgICAgICAgICAgICAvLyAoIHR5cGVzLW9iamVjdCBbLCBzZWxlY3Rvcl0gKVxuICAgICAgICAgICAgICAgIGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2ZmKCB0eXBlLCBzZWxlY3RvciwgdHlwZXNbIHR5cGUgXSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICggc2VsZWN0b3IgPT09IGZhbHNlIHx8IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICkge1xuXG4gICAgICAgICAgICAgICAgLy8gKCB0eXBlcyBbLCBmbl0gKVxuICAgICAgICAgICAgICAgIGZuID0gc2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIGZuID09PSBmYWxzZSApIHtcbiAgICAgICAgICAgICAgICBmbiA9IHJldHVybkZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LnJlbW92ZSggdGhpcywgdHlwZXMsIGZuLCBzZWxlY3RvciApO1xuICAgICAgICAgICAgfSApO1xuICAgICAgICB9XG4gICAgfSApO1xuXG5cbiAgICB2YXJcblxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lc2xpbnQvZXNsaW50L2lzc3Vlcy8zMjI5XG4gICAgICAgIHJ4aHRtbFRhZyA9IC88KD8hYXJlYXxicnxjb2x8ZW1iZWR8aHJ8aW1nfGlucHV0fGxpbmt8bWV0YXxwYXJhbSkoKFthLXpdW15cXC9cXDA+XFx4MjBcXHRcXHJcXG5cXGZdKilbXj5dKilcXC8+L2dpLFxuXG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgKi9cblxuICAgICAgICAvLyBTdXBwb3J0OiBJRSA8PTEwIC0gMTEsIEVkZ2UgMTIgLSAxMyBvbmx5XG4gICAgICAgIC8vIEluIElFL0VkZ2UgdXNpbmcgcmVnZXggZ3JvdXBzIGhlcmUgY2F1c2VzIHNldmVyZSBzbG93ZG93bnMuXG4gICAgICAgIC8vIFNlZSBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzE3MzY1MTIvXG4gICAgICAgIHJub0lubmVyaHRtbCA9IC88c2NyaXB0fDxzdHlsZXw8bGluay9pLFxuXG4gICAgICAgIC8vIGNoZWNrZWQ9XCJjaGVja2VkXCIgb3IgY2hlY2tlZFxuICAgICAgICByY2hlY2tlZCA9IC9jaGVja2VkXFxzKig/OltePV18PVxccyouY2hlY2tlZC4pL2ksXG4gICAgICAgIHJjbGVhblNjcmlwdCA9IC9eXFxzKjwhKD86XFxbQ0RBVEFcXFt8LS0pfCg/OlxcXVxcXXwtLSk+XFxzKiQvZztcblxuLy8gUHJlZmVyIGEgdGJvZHkgb3ZlciBpdHMgcGFyZW50IHRhYmxlIGZvciBjb250YWluaW5nIG5ldyByb3dzXG4gICAgZnVuY3Rpb24gbWFuaXB1bGF0aW9uVGFyZ2V0KCBlbGVtLCBjb250ZW50ICkge1xuICAgICAgICBpZiAoIG5vZGVOYW1lKCBlbGVtLCBcInRhYmxlXCIgKSAmJlxuICAgICAgICAgICAgbm9kZU5hbWUoIGNvbnRlbnQubm9kZVR5cGUgIT09IDExID8gY29udGVudCA6IGNvbnRlbnQuZmlyc3RDaGlsZCwgXCJ0clwiICkgKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBqUXVlcnkoIGVsZW0gKS5jaGlsZHJlbiggXCJ0Ym9keVwiIClbIDAgXSB8fCBlbGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgfVxuXG4vLyBSZXBsYWNlL3Jlc3RvcmUgdGhlIHR5cGUgYXR0cmlidXRlIG9mIHNjcmlwdCBlbGVtZW50cyBmb3Igc2FmZSBET00gbWFuaXB1bGF0aW9uXG4gICAgZnVuY3Rpb24gZGlzYWJsZVNjcmlwdCggZWxlbSApIHtcbiAgICAgICAgZWxlbS50eXBlID0gKCBlbGVtLmdldEF0dHJpYnV0ZSggXCJ0eXBlXCIgKSAhPT0gbnVsbCApICsgXCIvXCIgKyBlbGVtLnR5cGU7XG4gICAgICAgIHJldHVybiBlbGVtO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXN0b3JlU2NyaXB0KCBlbGVtICkge1xuICAgICAgICBpZiAoICggZWxlbS50eXBlIHx8IFwiXCIgKS5zbGljZSggMCwgNSApID09PSBcInRydWUvXCIgKSB7XG4gICAgICAgICAgICBlbGVtLnR5cGUgPSBlbGVtLnR5cGUuc2xpY2UoIDUgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCBcInR5cGVcIiApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvbmVDb3B5RXZlbnQoIHNyYywgZGVzdCApIHtcbiAgICAgICAgdmFyIGksIGwsIHR5cGUsIHBkYXRhT2xkLCBwZGF0YUN1ciwgdWRhdGFPbGQsIHVkYXRhQ3VyLCBldmVudHM7XG5cbiAgICAgICAgaWYgKCBkZXN0Lm5vZGVUeXBlICE9PSAxICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMS4gQ29weSBwcml2YXRlIGRhdGE6IGV2ZW50cywgaGFuZGxlcnMsIGV0Yy5cbiAgICAgICAgaWYgKCBkYXRhUHJpdi5oYXNEYXRhKCBzcmMgKSApIHtcbiAgICAgICAgICAgIHBkYXRhT2xkID0gZGF0YVByaXYuYWNjZXNzKCBzcmMgKTtcbiAgICAgICAgICAgIHBkYXRhQ3VyID0gZGF0YVByaXYuc2V0KCBkZXN0LCBwZGF0YU9sZCApO1xuICAgICAgICAgICAgZXZlbnRzID0gcGRhdGFPbGQuZXZlbnRzO1xuXG4gICAgICAgICAgICBpZiAoIGV2ZW50cyApIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgcGRhdGFDdXIuaGFuZGxlO1xuICAgICAgICAgICAgICAgIHBkYXRhQ3VyLmV2ZW50cyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgZm9yICggdHlwZSBpbiBldmVudHMgKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoIGkgPSAwLCBsID0gZXZlbnRzWyB0eXBlIF0ubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LmFkZCggZGVzdCwgdHlwZSwgZXZlbnRzWyB0eXBlIF1bIGkgXSApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gMi4gQ29weSB1c2VyIGRhdGFcbiAgICAgICAgaWYgKCBkYXRhVXNlci5oYXNEYXRhKCBzcmMgKSApIHtcbiAgICAgICAgICAgIHVkYXRhT2xkID0gZGF0YVVzZXIuYWNjZXNzKCBzcmMgKTtcbiAgICAgICAgICAgIHVkYXRhQ3VyID0galF1ZXJ5LmV4dGVuZCgge30sIHVkYXRhT2xkICk7XG5cbiAgICAgICAgICAgIGRhdGFVc2VyLnNldCggZGVzdCwgdWRhdGFDdXIgKTtcbiAgICAgICAgfVxuICAgIH1cblxuLy8gRml4IElFIGJ1Z3MsIHNlZSBzdXBwb3J0IHRlc3RzXG4gICAgZnVuY3Rpb24gZml4SW5wdXQoIHNyYywgZGVzdCApIHtcbiAgICAgICAgdmFyIG5vZGVOYW1lID0gZGVzdC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIC8vIEZhaWxzIHRvIHBlcnNpc3QgdGhlIGNoZWNrZWQgc3RhdGUgb2YgYSBjbG9uZWQgY2hlY2tib3ggb3IgcmFkaW8gYnV0dG9uLlxuICAgICAgICBpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgJiYgcmNoZWNrYWJsZVR5cGUudGVzdCggc3JjLnR5cGUgKSApIHtcbiAgICAgICAgICAgIGRlc3QuY2hlY2tlZCA9IHNyYy5jaGVja2VkO1xuXG4gICAgICAgICAgICAvLyBGYWlscyB0byByZXR1cm4gdGhlIHNlbGVjdGVkIG9wdGlvbiB0byB0aGUgZGVmYXVsdCBzZWxlY3RlZCBzdGF0ZSB3aGVuIGNsb25pbmcgb3B0aW9uc1xuICAgICAgICB9IGVsc2UgaWYgKCBub2RlTmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5vZGVOYW1lID09PSBcInRleHRhcmVhXCIgKSB7XG4gICAgICAgICAgICBkZXN0LmRlZmF1bHRWYWx1ZSA9IHNyYy5kZWZhdWx0VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkb21NYW5pcCggY29sbGVjdGlvbiwgYXJncywgY2FsbGJhY2ssIGlnbm9yZWQgKSB7XG5cbiAgICAgICAgLy8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xuICAgICAgICBhcmdzID0gY29uY2F0LmFwcGx5KCBbXSwgYXJncyApO1xuXG4gICAgICAgIHZhciBmcmFnbWVudCwgZmlyc3QsIHNjcmlwdHMsIGhhc1NjcmlwdHMsIG5vZGUsIGRvYyxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgbCA9IGNvbGxlY3Rpb24ubGVuZ3RoLFxuICAgICAgICAgICAgaU5vQ2xvbmUgPSBsIC0gMSxcbiAgICAgICAgICAgIHZhbHVlID0gYXJnc1sgMCBdLFxuICAgICAgICAgICAgdmFsdWVJc0Z1bmN0aW9uID0gaXNGdW5jdGlvbiggdmFsdWUgKTtcblxuICAgICAgICAvLyBXZSBjYW4ndCBjbG9uZU5vZGUgZnJhZ21lbnRzIHRoYXQgY29udGFpbiBjaGVja2VkLCBpbiBXZWJLaXRcbiAgICAgICAgaWYgKCB2YWx1ZUlzRnVuY3Rpb24gfHxcbiAgICAgICAgICAgICggbCA+IDEgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgIXN1cHBvcnQuY2hlY2tDbG9uZSAmJiByY2hlY2tlZC50ZXN0KCB2YWx1ZSApICkgKSB7XG4gICAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5lYWNoKCBmdW5jdGlvbiggaW5kZXggKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSBjb2xsZWN0aW9uLmVxKCBpbmRleCApO1xuICAgICAgICAgICAgICAgIGlmICggdmFsdWVJc0Z1bmN0aW9uICkge1xuICAgICAgICAgICAgICAgICAgICBhcmdzWyAwIF0gPSB2YWx1ZS5jYWxsKCB0aGlzLCBpbmRleCwgc2VsZi5odG1sKCkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZG9tTWFuaXAoIHNlbGYsIGFyZ3MsIGNhbGxiYWNrLCBpZ25vcmVkICk7XG4gICAgICAgICAgICB9ICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGwgKSB7XG4gICAgICAgICAgICBmcmFnbWVudCA9IGJ1aWxkRnJhZ21lbnQoIGFyZ3MsIGNvbGxlY3Rpb25bIDAgXS5vd25lckRvY3VtZW50LCBmYWxzZSwgY29sbGVjdGlvbiwgaWdub3JlZCApO1xuICAgICAgICAgICAgZmlyc3QgPSBmcmFnbWVudC5maXJzdENoaWxkO1xuXG4gICAgICAgICAgICBpZiAoIGZyYWdtZW50LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxICkge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gZmlyc3Q7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlcXVpcmUgZWl0aGVyIG5ldyBjb250ZW50IG9yIGFuIGludGVyZXN0IGluIGlnbm9yZWQgZWxlbWVudHMgdG8gaW52b2tlIHRoZSBjYWxsYmFja1xuICAgICAgICAgICAgaWYgKCBmaXJzdCB8fCBpZ25vcmVkICkge1xuICAgICAgICAgICAgICAgIHNjcmlwdHMgPSBqUXVlcnkubWFwKCBnZXRBbGwoIGZyYWdtZW50LCBcInNjcmlwdFwiICksIGRpc2FibGVTY3JpcHQgKTtcbiAgICAgICAgICAgICAgICBoYXNTY3JpcHRzID0gc2NyaXB0cy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIG9yaWdpbmFsIGZyYWdtZW50IGZvciB0aGUgbGFzdCBpdGVtXG4gICAgICAgICAgICAgICAgLy8gaW5zdGVhZCBvZiB0aGUgZmlyc3QgYmVjYXVzZSBpdCBjYW4gZW5kIHVwXG4gICAgICAgICAgICAgICAgLy8gYmVpbmcgZW1wdGllZCBpbmNvcnJlY3RseSBpbiBjZXJ0YWluIHNpdHVhdGlvbnMgKCM4MDcwKS5cbiAgICAgICAgICAgICAgICBmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBmcmFnbWVudDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIGkgIT09IGlOb0Nsb25lICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IGpRdWVyeS5jbG9uZSggbm9kZSwgdHJ1ZSwgdHJ1ZSApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBLZWVwIHJlZmVyZW5jZXMgdG8gY2xvbmVkIHNjcmlwdHMgZm9yIGxhdGVyIHJlc3RvcmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGhhc1NjcmlwdHMgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Lm1lcmdlKCBzY3JpcHRzLCBnZXRBbGwoIG5vZGUsIFwic2NyaXB0XCIgKSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCggY29sbGVjdGlvblsgaSBdLCBub2RlLCBpICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCBoYXNTY3JpcHRzICkge1xuICAgICAgICAgICAgICAgICAgICBkb2MgPSBzY3JpcHRzWyBzY3JpcHRzLmxlbmd0aCAtIDEgXS5vd25lckRvY3VtZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlZW5hYmxlIHNjcmlwdHNcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Lm1hcCggc2NyaXB0cywgcmVzdG9yZVNjcmlwdCApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEV2YWx1YXRlIGV4ZWN1dGFibGUgc2NyaXB0cyBvbiBmaXJzdCBkb2N1bWVudCBpbnNlcnRpb25cbiAgICAgICAgICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBoYXNTY3JpcHRzOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gc2NyaXB0c1sgaSBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCByc2NyaXB0VHlwZS50ZXN0KCBub2RlLnR5cGUgfHwgXCJcIiApICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIWRhdGFQcml2LmFjY2Vzcyggbm9kZSwgXCJnbG9iYWxFdmFsXCIgKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5jb250YWlucyggZG9jLCBub2RlICkgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG5vZGUuc3JjICYmICggbm9kZS50eXBlIHx8IFwiXCIgKS50b0xvd2VyQ2FzZSgpICAhPT0gXCJtb2R1bGVcIiApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPcHRpb25hbCBBSkFYIGRlcGVuZGVuY3ksIGJ1dCB3b24ndCBydW4gc2NyaXB0cyBpZiBub3QgcHJlc2VudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGpRdWVyeS5fZXZhbFVybCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5fZXZhbFVybCggbm9kZS5zcmMgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERPTUV2YWwoIG5vZGUudGV4dENvbnRlbnQucmVwbGFjZSggcmNsZWFuU2NyaXB0LCBcIlwiICksIGRvYywgbm9kZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZSggZWxlbSwgc2VsZWN0b3IsIGtlZXBEYXRhICkge1xuICAgICAgICB2YXIgbm9kZSxcbiAgICAgICAgICAgIG5vZGVzID0gc2VsZWN0b3IgPyBqUXVlcnkuZmlsdGVyKCBzZWxlY3RvciwgZWxlbSApIDogZWxlbSxcbiAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgIGZvciAoIDsgKCBub2RlID0gbm9kZXNbIGkgXSApICE9IG51bGw7IGkrKyApIHtcbiAgICAgICAgICAgIGlmICggIWtlZXBEYXRhICYmIG5vZGUubm9kZVR5cGUgPT09IDEgKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBub2RlICkgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBub2RlLnBhcmVudE5vZGUgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBrZWVwRGF0YSAmJiBqUXVlcnkuY29udGFpbnMoIG5vZGUub3duZXJEb2N1bWVudCwgbm9kZSApICkge1xuICAgICAgICAgICAgICAgICAgICBzZXRHbG9iYWxFdmFsKCBnZXRBbGwoIG5vZGUsIFwic2NyaXB0XCIgKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIG5vZGUgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtO1xuICAgIH1cblxuICAgIGpRdWVyeS5leHRlbmQoIHtcbiAgICAgICAgaHRtbFByZWZpbHRlcjogZnVuY3Rpb24oIGh0bWwgKSB7XG4gICAgICAgICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKCByeGh0bWxUYWcsIFwiPCQxPjwvJDI+XCIgKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjbG9uZTogZnVuY3Rpb24oIGVsZW0sIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuICAgICAgICAgICAgdmFyIGksIGwsIHNyY0VsZW1lbnRzLCBkZXN0RWxlbWVudHMsXG4gICAgICAgICAgICAgICAgY2xvbmUgPSBlbGVtLmNsb25lTm9kZSggdHJ1ZSApLFxuICAgICAgICAgICAgICAgIGluUGFnZSA9IGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG5cbiAgICAgICAgICAgIC8vIEZpeCBJRSBjbG9uaW5nIGlzc3Vlc1xuICAgICAgICAgICAgaWYgKCAhc3VwcG9ydC5ub0Nsb25lQ2hlY2tlZCAmJiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgZWxlbS5ub2RlVHlwZSA9PT0gMTEgKSAmJlxuICAgICAgICAgICAgICAgICFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIHtcblxuICAgICAgICAgICAgICAgIC8vIFdlIGVzY2hldyBTaXp6bGUgaGVyZSBmb3IgcGVyZm9ybWFuY2UgcmVhc29uczogaHR0cHM6Ly9qc3BlcmYuY29tL2dldGFsbC12cy1zaXp6bGUvMlxuICAgICAgICAgICAgICAgIGRlc3RFbGVtZW50cyA9IGdldEFsbCggY2xvbmUgKTtcbiAgICAgICAgICAgICAgICBzcmNFbGVtZW50cyA9IGdldEFsbCggZWxlbSApO1xuXG4gICAgICAgICAgICAgICAgZm9yICggaSA9IDAsIGwgPSBzcmNFbGVtZW50cy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpeElucHV0KCBzcmNFbGVtZW50c1sgaSBdLCBkZXN0RWxlbWVudHNbIGkgXSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ29weSB0aGUgZXZlbnRzIGZyb20gdGhlIG9yaWdpbmFsIHRvIHRoZSBjbG9uZVxuICAgICAgICAgICAgaWYgKCBkYXRhQW5kRXZlbnRzICkge1xuICAgICAgICAgICAgICAgIGlmICggZGVlcERhdGFBbmRFdmVudHMgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNyY0VsZW1lbnRzID0gc3JjRWxlbWVudHMgfHwgZ2V0QWxsKCBlbGVtICk7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RFbGVtZW50cyA9IGRlc3RFbGVtZW50cyB8fCBnZXRBbGwoIGNsb25lICk7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICggaSA9IDAsIGwgPSBzcmNFbGVtZW50cy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9uZUNvcHlFdmVudCggc3JjRWxlbWVudHNbIGkgXSwgZGVzdEVsZW1lbnRzWyBpIF0gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsb25lQ29weUV2ZW50KCBlbGVtLCBjbG9uZSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUHJlc2VydmUgc2NyaXB0IGV2YWx1YXRpb24gaGlzdG9yeVxuICAgICAgICAgICAgZGVzdEVsZW1lbnRzID0gZ2V0QWxsKCBjbG9uZSwgXCJzY3JpcHRcIiApO1xuICAgICAgICAgICAgaWYgKCBkZXN0RWxlbWVudHMubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICBzZXRHbG9iYWxFdmFsKCBkZXN0RWxlbWVudHMsICFpblBhZ2UgJiYgZ2V0QWxsKCBlbGVtLCBcInNjcmlwdFwiICkgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBjbG9uZWQgc2V0XG4gICAgICAgICAgICByZXR1cm4gY2xvbmU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xlYW5EYXRhOiBmdW5jdGlvbiggZWxlbXMgKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSwgZWxlbSwgdHlwZSxcbiAgICAgICAgICAgICAgICBzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWwsXG4gICAgICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgICAgIGZvciAoIDsgKCBlbGVtID0gZWxlbXNbIGkgXSApICE9PSB1bmRlZmluZWQ7IGkrKyApIHtcbiAgICAgICAgICAgICAgICBpZiAoIGFjY2VwdERhdGEoIGVsZW0gKSApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAoIGRhdGEgPSBlbGVtWyBkYXRhUHJpdi5leHBhbmRvIF0gKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZGF0YS5ldmVudHMgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICggdHlwZSBpbiBkYXRhLmV2ZW50cyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBzcGVjaWFsWyB0eXBlIF0gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQucmVtb3ZlKCBlbGVtLCB0eXBlICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBzaG9ydGN1dCB0byBhdm9pZCBqUXVlcnkuZXZlbnQucmVtb3ZlJ3Mgb3ZlcmhlYWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5yZW1vdmVFdmVudCggZWxlbSwgdHlwZSwgZGF0YS5oYW5kbGUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogQ2hyb21lIDw9MzUgLSA0NStcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFzc2lnbiB1bmRlZmluZWQgaW5zdGVhZCBvZiB1c2luZyBkZWxldGUsIHNlZSBEYXRhI3JlbW92ZVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbVsgZGF0YVByaXYuZXhwYW5kbyBdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICggZWxlbVsgZGF0YVVzZXIuZXhwYW5kbyBdICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBDaHJvbWUgPD0zNSAtIDQ1K1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXNzaWduIHVuZGVmaW5lZCBpbnN0ZWFkIG9mIHVzaW5nIGRlbGV0ZSwgc2VlIERhdGEjcmVtb3ZlXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtWyBkYXRhVXNlci5leHBhbmRvIF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9ICk7XG5cbiAgICBqUXVlcnkuZm4uZXh0ZW5kKCB7XG4gICAgICAgIGRldGFjaDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgICAgICAgICAgcmV0dXJuIHJlbW92ZSggdGhpcywgc2VsZWN0b3IsIHRydWUgKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcbiAgICAgICAgICAgIHJldHVybiByZW1vdmUoIHRoaXMsIHNlbGVjdG9yICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdGV4dDogZnVuY3Rpb24oIHZhbHVlICkge1xuICAgICAgICAgICAgcmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LnRleHQoIHRoaXMgKSA6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wdHkoKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSApO1xuICAgICAgICAgICAgfSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggKTtcbiAgICAgICAgfSxcblxuICAgICAgICBhcHBlbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgICAgIGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gbWFuaXB1bGF0aW9uVGFyZ2V0KCB0aGlzLCBlbGVtICk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZCggZWxlbSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gKTtcbiAgICAgICAgfSxcblxuICAgICAgICBwcmVwZW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IG1hbmlwdWxhdGlvblRhcmdldCggdGhpcywgZWxlbSApO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0YXJnZXQuZmlyc3RDaGlsZCApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gKTtcbiAgICAgICAgfSxcblxuICAgICAgICBiZWZvcmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgICAgIGlmICggdGhpcy5wYXJlbnROb2RlICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0aGlzICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSApO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFmdGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMucGFyZW50Tm9kZSApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggZWxlbSwgdGhpcy5uZXh0U2libGluZyApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gKTtcbiAgICAgICAgfSxcblxuICAgICAgICBlbXB0eTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZWxlbSxcbiAgICAgICAgICAgICAgICBpID0gMDtcblxuICAgICAgICAgICAgZm9yICggOyAoIGVsZW0gPSB0aGlzWyBpIF0gKSAhPSBudWxsOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgbWVtb3J5IGxlYWtzXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggZWxlbSwgZmFsc2UgKSApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBhbnkgcmVtYWluaW5nIG5vZGVzXG4gICAgICAgICAgICAgICAgICAgIGVsZW0udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xvbmU6IGZ1bmN0aW9uKCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcbiAgICAgICAgICAgIGRhdGFBbmRFdmVudHMgPSBkYXRhQW5kRXZlbnRzID09IG51bGwgPyBmYWxzZSA6IGRhdGFBbmRFdmVudHM7XG4gICAgICAgICAgICBkZWVwRGF0YUFuZEV2ZW50cyA9IGRlZXBEYXRhQW5kRXZlbnRzID09IG51bGwgPyBkYXRhQW5kRXZlbnRzIDogZGVlcERhdGFBbmRFdmVudHM7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5jbG9uZSggdGhpcywgZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKTtcbiAgICAgICAgICAgIH0gKTtcbiAgICAgICAgfSxcblxuICAgICAgICBodG1sOiBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzWyAwIF0gfHwge30sXG4gICAgICAgICAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgICAgICAgICBsID0gdGhpcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHZhbHVlID09PSB1bmRlZmluZWQgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFNlZSBpZiB3ZSBjYW4gdGFrZSBhIHNob3J0Y3V0IGFuZCBqdXN0IHVzZSBpbm5lckhUTUxcbiAgICAgICAgICAgICAgICBpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiAhcm5vSW5uZXJodG1sLnRlc3QoIHZhbHVlICkgJiZcbiAgICAgICAgICAgICAgICAgICAgIXdyYXBNYXBbICggcnRhZ05hbWUuZXhlYyggdmFsdWUgKSB8fCBbIFwiXCIsIFwiXCIgXSApWyAxIF0udG9Mb3dlckNhc2UoKSBdICkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0galF1ZXJ5Lmh0bWxQcmVmaWx0ZXIoIHZhbHVlICk7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoIDsgaSA8IGw7IGkrKyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtID0gdGhpc1sgaSBdIHx8IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGVsZW1lbnQgbm9kZXMgYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0sIGZhbHNlICkgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0gPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB1c2luZyBpbm5lckhUTUwgdGhyb3dzIGFuIGV4Y2VwdGlvbiwgdXNlIHRoZSBmYWxsYmFjayBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoIGUgKSB7fVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICggZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eSgpLmFwcGVuZCggdmFsdWUgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlcGxhY2VXaXRoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpZ25vcmVkID0gW107XG5cbiAgICAgICAgICAgIC8vIE1ha2UgdGhlIGNoYW5nZXMsIHJlcGxhY2luZyBlYWNoIG5vbi1pZ25vcmVkIGNvbnRleHQgZWxlbWVudCB3aXRoIHRoZSBuZXcgY29udGVudFxuICAgICAgICAgICAgcmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGpRdWVyeS5pbkFycmF5KCB0aGlzLCBpZ25vcmVkICkgPCAwICkge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIHRoaXMgKSApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHBhcmVudCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQoIGVsZW0sIHRoaXMgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEZvcmNlIGNhbGxiYWNrIGludm9jYXRpb25cbiAgICAgICAgICAgIH0sIGlnbm9yZWQgKTtcbiAgICAgICAgfVxuICAgIH0gKTtcblxuICAgIGpRdWVyeS5lYWNoKCB7XG4gICAgICAgIGFwcGVuZFRvOiBcImFwcGVuZFwiLFxuICAgICAgICBwcmVwZW5kVG86IFwicHJlcGVuZFwiLFxuICAgICAgICBpbnNlcnRCZWZvcmU6IFwiYmVmb3JlXCIsXG4gICAgICAgIGluc2VydEFmdGVyOiBcImFmdGVyXCIsXG4gICAgICAgIHJlcGxhY2VBbGw6IFwicmVwbGFjZVdpdGhcIlxuICAgIH0sIGZ1bmN0aW9uKCBuYW1lLCBvcmlnaW5hbCApIHtcbiAgICAgICAgalF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gICAgICAgICAgICB2YXIgZWxlbXMsXG4gICAgICAgICAgICAgICAgcmV0ID0gW10sXG4gICAgICAgICAgICAgICAgaW5zZXJ0ID0galF1ZXJ5KCBzZWxlY3RvciApLFxuICAgICAgICAgICAgICAgIGxhc3QgPSBpbnNlcnQubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgICAgICBpID0gMDtcblxuICAgICAgICAgICAgZm9yICggOyBpIDw9IGxhc3Q7IGkrKyApIHtcbiAgICAgICAgICAgICAgICBlbGVtcyA9IGkgPT09IGxhc3QgPyB0aGlzIDogdGhpcy5jbG9uZSggdHJ1ZSApO1xuICAgICAgICAgICAgICAgIGpRdWVyeSggaW5zZXJ0WyBpIF0gKVsgb3JpZ2luYWwgXSggZWxlbXMgKTtcblxuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuICAgICAgICAgICAgICAgIC8vIC5nZXQoKSBiZWNhdXNlIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcbiAgICAgICAgICAgICAgICBwdXNoLmFwcGx5KCByZXQsIGVsZW1zLmdldCgpICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggcmV0ICk7XG4gICAgICAgIH07XG4gICAgfSApO1xuICAgIHZhciBybnVtbm9ucHggPSBuZXcgUmVnRXhwKCBcIl4oXCIgKyBwbnVtICsgXCIpKD8hcHgpW2EteiVdKyRcIiwgXCJpXCIgKTtcblxuICAgIHZhciBnZXRTdHlsZXMgPSBmdW5jdGlvbiggZWxlbSApIHtcblxuICAgICAgICAvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHksIEZpcmVmb3ggPD0zMCAoIzE1MDk4LCAjMTQxNTApXG4gICAgICAgIC8vIElFIHRocm93cyBvbiBlbGVtZW50cyBjcmVhdGVkIGluIHBvcHVwc1xuICAgICAgICAvLyBGRiBtZWFud2hpbGUgdGhyb3dzIG9uIGZyYW1lIGVsZW1lbnRzIHRocm91Z2ggXCJkZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlXCJcbiAgICAgICAgdmFyIHZpZXcgPSBlbGVtLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG5cbiAgICAgICAgaWYgKCAhdmlldyB8fCAhdmlldy5vcGVuZXIgKSB7XG4gICAgICAgICAgICB2aWV3ID0gd2luZG93O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSggZWxlbSApO1xuICAgIH07XG5cbiAgICB2YXIgcmJveFN0eWxlID0gbmV3IFJlZ0V4cCggY3NzRXhwYW5kLmpvaW4oIFwifFwiICksIFwiaVwiICk7XG5cblxuXG4gICAgKCBmdW5jdGlvbigpIHtcblxuICAgICAgICAvLyBFeGVjdXRpbmcgYm90aCBwaXhlbFBvc2l0aW9uICYgYm94U2l6aW5nUmVsaWFibGUgdGVzdHMgcmVxdWlyZSBvbmx5IG9uZSBsYXlvdXRcbiAgICAgICAgLy8gc28gdGhleSdyZSBleGVjdXRlZCBhdCB0aGUgc2FtZSB0aW1lIHRvIHNhdmUgdGhlIHNlY29uZCBjb21wdXRhdGlvbi5cbiAgICAgICAgZnVuY3Rpb24gY29tcHV0ZVN0eWxlVGVzdHMoKSB7XG5cbiAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBzaW5nbGV0b24sIHdlIG5lZWQgdG8gZXhlY3V0ZSBpdCBvbmx5IG9uY2VcbiAgICAgICAgICAgIGlmICggIWRpdiApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gXCJwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0Oi0xMTExMXB4O3dpZHRoOjYwcHg7XCIgK1xuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcDoxcHg7cGFkZGluZzowO2JvcmRlcjowXCI7XG4gICAgICAgICAgICBkaXYuc3R5bGUuY3NzVGV4dCA9XG4gICAgICAgICAgICAgICAgXCJwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveDtvdmVyZmxvdzpzY3JvbGw7XCIgK1xuICAgICAgICAgICAgICAgIFwibWFyZ2luOmF1dG87Ym9yZGVyOjFweDtwYWRkaW5nOjFweDtcIiArXG4gICAgICAgICAgICAgICAgXCJ3aWR0aDo2MCU7dG9wOjElXCI7XG4gICAgICAgICAgICBkb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApLmFwcGVuZENoaWxkKCBkaXYgKTtcblxuICAgICAgICAgICAgdmFyIGRpdlN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGRpdiApO1xuICAgICAgICAgICAgcGl4ZWxQb3NpdGlvblZhbCA9IGRpdlN0eWxlLnRvcCAhPT0gXCIxJVwiO1xuXG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBBbmRyb2lkIDQuMCAtIDQuMyBvbmx5LCBGaXJlZm94IDw9MyAtIDQ0XG4gICAgICAgICAgICByZWxpYWJsZU1hcmdpbkxlZnRWYWwgPSByb3VuZFBpeGVsTWVhc3VyZXMoIGRpdlN0eWxlLm1hcmdpbkxlZnQgKSA9PT0gMTI7XG5cbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wIC0gNC4zIG9ubHksIFNhZmFyaSA8PTkuMSAtIDEwLjEsIGlPUyA8PTcuMCAtIDkuM1xuICAgICAgICAgICAgLy8gU29tZSBzdHlsZXMgY29tZSBiYWNrIHdpdGggcGVyY2VudGFnZSB2YWx1ZXMsIGV2ZW4gdGhvdWdoIHRoZXkgc2hvdWxkbid0XG4gICAgICAgICAgICBkaXYuc3R5bGUucmlnaHQgPSBcIjYwJVwiO1xuICAgICAgICAgICAgcGl4ZWxCb3hTdHlsZXNWYWwgPSByb3VuZFBpeGVsTWVhc3VyZXMoIGRpdlN0eWxlLnJpZ2h0ICkgPT09IDM2O1xuXG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBJRSA5IC0gMTEgb25seVxuICAgICAgICAgICAgLy8gRGV0ZWN0IG1pc3JlcG9ydGluZyBvZiBjb250ZW50IGRpbWVuc2lvbnMgZm9yIGJveC1zaXppbmc6Ym9yZGVyLWJveCBlbGVtZW50c1xuICAgICAgICAgICAgYm94U2l6aW5nUmVsaWFibGVWYWwgPSByb3VuZFBpeGVsTWVhc3VyZXMoIGRpdlN0eWxlLndpZHRoICkgPT09IDM2O1xuXG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBJRSA5IG9ubHlcbiAgICAgICAgICAgIC8vIERldGVjdCBvdmVyZmxvdzpzY3JvbGwgc2NyZXdpbmVzcyAoZ2gtMzY5OSlcbiAgICAgICAgICAgIGRpdi5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgICAgIHNjcm9sbGJveFNpemVWYWwgPSBkaXYub2Zmc2V0V2lkdGggPT09IDM2IHx8IFwiYWJzb2x1dGVcIjtcblxuICAgICAgICAgICAgZG9jdW1lbnRFbGVtZW50LnJlbW92ZUNoaWxkKCBjb250YWluZXIgKTtcblxuICAgICAgICAgICAgLy8gTnVsbGlmeSB0aGUgZGl2IHNvIGl0IHdvdWxkbid0IGJlIHN0b3JlZCBpbiB0aGUgbWVtb3J5IGFuZFxuICAgICAgICAgICAgLy8gaXQgd2lsbCBhbHNvIGJlIGEgc2lnbiB0aGF0IGNoZWNrcyBhbHJlYWR5IHBlcmZvcm1lZFxuICAgICAgICAgICAgZGl2ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJvdW5kUGl4ZWxNZWFzdXJlcyggbWVhc3VyZSApIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKCBwYXJzZUZsb2F0KCBtZWFzdXJlICkgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwaXhlbFBvc2l0aW9uVmFsLCBib3hTaXppbmdSZWxpYWJsZVZhbCwgc2Nyb2xsYm94U2l6ZVZhbCwgcGl4ZWxCb3hTdHlsZXNWYWwsXG4gICAgICAgICAgICByZWxpYWJsZU1hcmdpbkxlZnRWYWwsXG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICksXG4gICAgICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XG5cbiAgICAgICAgLy8gRmluaXNoIGVhcmx5IGluIGxpbWl0ZWQgKG5vbi1icm93c2VyKSBlbnZpcm9ubWVudHNcbiAgICAgICAgaWYgKCAhZGl2LnN0eWxlICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3VwcG9ydDogSUUgPD05IC0gMTEgb25seVxuICAgICAgICAvLyBTdHlsZSBvZiBjbG9uZWQgZWxlbWVudCBhZmZlY3RzIHNvdXJjZSBlbGVtZW50IGNsb25lZCAoIzg5MDgpXG4gICAgICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9IFwiY29udGVudC1ib3hcIjtcbiAgICAgICAgZGl2LmNsb25lTm9kZSggdHJ1ZSApLnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJcIjtcbiAgICAgICAgc3VwcG9ydC5jbGVhckNsb25lU3R5bGUgPSBkaXYuc3R5bGUuYmFja2dyb3VuZENsaXAgPT09IFwiY29udGVudC1ib3hcIjtcblxuICAgICAgICBqUXVlcnkuZXh0ZW5kKCBzdXBwb3J0LCB7XG4gICAgICAgICAgICBib3hTaXppbmdSZWxpYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZVN0eWxlVGVzdHMoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm94U2l6aW5nUmVsaWFibGVWYWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGl4ZWxCb3hTdHlsZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbXB1dGVTdHlsZVRlc3RzKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBpeGVsQm94U3R5bGVzVmFsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBpeGVsUG9zaXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbXB1dGVTdHlsZVRlc3RzKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBpeGVsUG9zaXRpb25WYWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVsaWFibGVNYXJnaW5MZWZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb21wdXRlU3R5bGVUZXN0cygpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZWxpYWJsZU1hcmdpbkxlZnRWYWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2Nyb2xsYm94U2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZVN0eWxlVGVzdHMoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2Nyb2xsYm94U2l6ZVZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSApO1xuICAgIH0gKSgpO1xuXG5cbiAgICBmdW5jdGlvbiBjdXJDU1MoIGVsZW0sIG5hbWUsIGNvbXB1dGVkICkge1xuICAgICAgICB2YXIgd2lkdGgsIG1pbldpZHRoLCBtYXhXaWR0aCwgcmV0LFxuXG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBGaXJlZm94IDUxK1xuICAgICAgICAgICAgLy8gUmV0cmlldmluZyBzdHlsZSBiZWZvcmUgY29tcHV0ZWQgc29tZWhvd1xuICAgICAgICAgICAgLy8gZml4ZXMgYW4gaXNzdWUgd2l0aCBnZXR0aW5nIHdyb25nIHZhbHVlc1xuICAgICAgICAgICAgLy8gb24gZGV0YWNoZWQgZWxlbWVudHNcbiAgICAgICAgICAgIHN0eWxlID0gZWxlbS5zdHlsZTtcblxuICAgICAgICBjb21wdXRlZCA9IGNvbXB1dGVkIHx8IGdldFN0eWxlcyggZWxlbSApO1xuXG4gICAgICAgIC8vIGdldFByb3BlcnR5VmFsdWUgaXMgbmVlZGVkIGZvcjpcbiAgICAgICAgLy8gICAuY3NzKCdmaWx0ZXInKSAoSUUgOSBvbmx5LCAjMTI1MzcpXG4gICAgICAgIC8vICAgLmNzcygnLS1jdXN0b21Qcm9wZXJ0eSkgKCMzMTQ0KVxuICAgICAgICBpZiAoIGNvbXB1dGVkICkge1xuICAgICAgICAgICAgcmV0ID0gY29tcHV0ZWQuZ2V0UHJvcGVydHlWYWx1ZSggbmFtZSApIHx8IGNvbXB1dGVkWyBuYW1lIF07XG5cbiAgICAgICAgICAgIGlmICggcmV0ID09PSBcIlwiICYmICFqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApICkge1xuICAgICAgICAgICAgICAgIHJldCA9IGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBIHRyaWJ1dGUgdG8gdGhlIFwiYXdlc29tZSBoYWNrIGJ5IERlYW4gRWR3YXJkc1wiXG4gICAgICAgICAgICAvLyBBbmRyb2lkIEJyb3dzZXIgcmV0dXJucyBwZXJjZW50YWdlIGZvciBzb21lIHZhbHVlcyxcbiAgICAgICAgICAgIC8vIGJ1dCB3aWR0aCBzZWVtcyB0byBiZSByZWxpYWJseSBwaXhlbHMuXG4gICAgICAgICAgICAvLyBUaGlzIGlzIGFnYWluc3QgdGhlIENTU09NIGRyYWZ0IHNwZWM6XG4gICAgICAgICAgICAvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3Nzb20vI3Jlc29sdmVkLXZhbHVlc1xuICAgICAgICAgICAgaWYgKCAhc3VwcG9ydC5waXhlbEJveFN0eWxlcygpICYmIHJudW1ub25weC50ZXN0KCByZXQgKSAmJiByYm94U3R5bGUudGVzdCggbmFtZSApICkge1xuXG4gICAgICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhlIG9yaWdpbmFsIHZhbHVlc1xuICAgICAgICAgICAgICAgIHdpZHRoID0gc3R5bGUud2lkdGg7XG4gICAgICAgICAgICAgICAgbWluV2lkdGggPSBzdHlsZS5taW5XaWR0aDtcbiAgICAgICAgICAgICAgICBtYXhXaWR0aCA9IHN0eWxlLm1heFdpZHRoO1xuXG4gICAgICAgICAgICAgICAgLy8gUHV0IGluIHRoZSBuZXcgdmFsdWVzIHRvIGdldCBhIGNvbXB1dGVkIHZhbHVlIG91dFxuICAgICAgICAgICAgICAgIHN0eWxlLm1pbldpZHRoID0gc3R5bGUubWF4V2lkdGggPSBzdHlsZS53aWR0aCA9IHJldDtcbiAgICAgICAgICAgICAgICByZXQgPSBjb21wdXRlZC53aWR0aDtcblxuICAgICAgICAgICAgICAgIC8vIFJldmVydCB0aGUgY2hhbmdlZCB2YWx1ZXNcbiAgICAgICAgICAgICAgICBzdHlsZS53aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgICAgIHN0eWxlLm1pbldpZHRoID0gbWluV2lkdGg7XG4gICAgICAgICAgICAgICAgc3R5bGUubWF4V2lkdGggPSBtYXhXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQgIT09IHVuZGVmaW5lZCA/XG5cbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExIG9ubHlcbiAgICAgICAgICAgIC8vIElFIHJldHVybnMgekluZGV4IHZhbHVlIGFzIGFuIGludGVnZXIuXG4gICAgICAgICAgICByZXQgKyBcIlwiIDpcbiAgICAgICAgICAgIHJldDtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGFkZEdldEhvb2tJZiggY29uZGl0aW9uRm4sIGhvb2tGbiApIHtcblxuICAgICAgICAvLyBEZWZpbmUgdGhlIGhvb2ssIHdlJ2xsIGNoZWNrIG9uIHRoZSBmaXJzdCBydW4gaWYgaXQncyByZWFsbHkgbmVlZGVkLlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoIGNvbmRpdGlvbkZuKCkgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSG9vayBub3QgbmVlZGVkIChvciBpdCdzIG5vdCBwb3NzaWJsZSB0byB1c2UgaXQgZHVlXG4gICAgICAgICAgICAgICAgICAgIC8vIHRvIG1pc3NpbmcgZGVwZW5kZW5jeSksIHJlbW92ZSBpdC5cbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZ2V0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gSG9vayBuZWVkZWQ7IHJlZGVmaW5lIGl0IHNvIHRoYXQgdGhlIHN1cHBvcnQgdGVzdCBpcyBub3QgZXhlY3V0ZWQgYWdhaW4uXG4gICAgICAgICAgICAgICAgcmV0dXJuICggdGhpcy5nZXQgPSBob29rRm4gKS5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG5cbiAgICB2YXJcblxuICAgICAgICAvLyBTd2FwcGFibGUgaWYgZGlzcGxheSBpcyBub25lIG9yIHN0YXJ0cyB3aXRoIHRhYmxlXG4gICAgICAgIC8vIGV4Y2VwdCBcInRhYmxlXCIsIFwidGFibGUtY2VsbFwiLCBvciBcInRhYmxlLWNhcHRpb25cIlxuICAgICAgICAvLyBTZWUgaGVyZSBmb3IgZGlzcGxheSB2YWx1ZXM6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvQ1NTL2Rpc3BsYXlcbiAgICAgICAgcmRpc3BsYXlzd2FwID0gL14obm9uZXx0YWJsZSg/IS1jW2VhXSkuKykvLFxuICAgICAgICByY3VzdG9tUHJvcCA9IC9eLS0vLFxuICAgICAgICBjc3NTaG93ID0geyBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCB2aXNpYmlsaXR5OiBcImhpZGRlblwiLCBkaXNwbGF5OiBcImJsb2NrXCIgfSxcbiAgICAgICAgY3NzTm9ybWFsVHJhbnNmb3JtID0ge1xuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogXCIwXCIsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiBcIjQwMFwiXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3NzUHJlZml4ZXMgPSBbIFwiV2Via2l0XCIsIFwiTW96XCIsIFwibXNcIiBdLFxuICAgICAgICBlbXB0eVN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApLnN0eWxlO1xuXG4vLyBSZXR1cm4gYSBjc3MgcHJvcGVydHkgbWFwcGVkIHRvIGEgcG90ZW50aWFsbHkgdmVuZG9yIHByZWZpeGVkIHByb3BlcnR5XG4gICAgZnVuY3Rpb24gdmVuZG9yUHJvcE5hbWUoIG5hbWUgKSB7XG5cbiAgICAgICAgLy8gU2hvcnRjdXQgZm9yIG5hbWVzIHRoYXQgYXJlIG5vdCB2ZW5kb3IgcHJlZml4ZWRcbiAgICAgICAgaWYgKCBuYW1lIGluIGVtcHR5U3R5bGUgKSB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGZvciB2ZW5kb3IgcHJlZml4ZWQgbmFtZXNcbiAgICAgICAgdmFyIGNhcE5hbWUgPSBuYW1lWyAwIF0udG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoIDEgKSxcbiAgICAgICAgICAgIGkgPSBjc3NQcmVmaXhlcy5sZW5ndGg7XG5cbiAgICAgICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICAgICAgICBuYW1lID0gY3NzUHJlZml4ZXNbIGkgXSArIGNhcE5hbWU7XG4gICAgICAgICAgICBpZiAoIG5hbWUgaW4gZW1wdHlTdHlsZSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuLy8gUmV0dXJuIGEgcHJvcGVydHkgbWFwcGVkIGFsb25nIHdoYXQgalF1ZXJ5LmNzc1Byb3BzIHN1Z2dlc3RzIG9yIHRvXG4vLyBhIHZlbmRvciBwcmVmaXhlZCBwcm9wZXJ0eS5cbiAgICBmdW5jdGlvbiBmaW5hbFByb3BOYW1lKCBuYW1lICkge1xuICAgICAgICB2YXIgcmV0ID0galF1ZXJ5LmNzc1Byb3BzWyBuYW1lIF07XG4gICAgICAgIGlmICggIXJldCApIHtcbiAgICAgICAgICAgIHJldCA9IGpRdWVyeS5jc3NQcm9wc1sgbmFtZSBdID0gdmVuZG9yUHJvcE5hbWUoIG5hbWUgKSB8fCBuYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0UG9zaXRpdmVOdW1iZXIoIGVsZW0sIHZhbHVlLCBzdWJ0cmFjdCApIHtcblxuICAgICAgICAvLyBBbnkgcmVsYXRpdmUgKCsvLSkgdmFsdWVzIGhhdmUgYWxyZWFkeSBiZWVuXG4gICAgICAgIC8vIG5vcm1hbGl6ZWQgYXQgdGhpcyBwb2ludFxuICAgICAgICB2YXIgbWF0Y2hlcyA9IHJjc3NOdW0uZXhlYyggdmFsdWUgKTtcbiAgICAgICAgcmV0dXJuIG1hdGNoZXMgP1xuXG4gICAgICAgICAgICAvLyBHdWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBcInN1YnRyYWN0XCIsIGUuZy4sIHdoZW4gdXNlZCBhcyBpbiBjc3NIb29rc1xuICAgICAgICAgICAgTWF0aC5tYXgoIDAsIG1hdGNoZXNbIDIgXSAtICggc3VidHJhY3QgfHwgMCApICkgKyAoIG1hdGNoZXNbIDMgXSB8fCBcInB4XCIgKSA6XG4gICAgICAgICAgICB2YWx1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBib3hNb2RlbEFkanVzdG1lbnQoIGVsZW0sIGRpbWVuc2lvbiwgYm94LCBpc0JvcmRlckJveCwgc3R5bGVzLCBjb21wdXRlZFZhbCApIHtcbiAgICAgICAgdmFyIGkgPSBkaW1lbnNpb24gPT09IFwid2lkdGhcIiA/IDEgOiAwLFxuICAgICAgICAgICAgZXh0cmEgPSAwLFxuICAgICAgICAgICAgZGVsdGEgPSAwO1xuXG4gICAgICAgIC8vIEFkanVzdG1lbnQgbWF5IG5vdCBiZSBuZWNlc3NhcnlcbiAgICAgICAgaWYgKCBib3ggPT09ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICggOyBpIDwgNDsgaSArPSAyICkge1xuXG4gICAgICAgICAgICAvLyBCb3RoIGJveCBtb2RlbHMgZXhjbHVkZSBtYXJnaW5cbiAgICAgICAgICAgIGlmICggYm94ID09PSBcIm1hcmdpblwiICkge1xuICAgICAgICAgICAgICAgIGRlbHRhICs9IGpRdWVyeS5jc3MoIGVsZW0sIGJveCArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSWYgd2UgZ2V0IGhlcmUgd2l0aCBhIGNvbnRlbnQtYm94LCB3ZSdyZSBzZWVraW5nIFwicGFkZGluZ1wiIG9yIFwiYm9yZGVyXCIgb3IgXCJtYXJnaW5cIlxuICAgICAgICAgICAgaWYgKCAhaXNCb3JkZXJCb3ggKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuICAgICAgICAgICAgICAgIGRlbHRhICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwicGFkZGluZ1wiICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXG4gICAgICAgICAgICAgICAgLy8gRm9yIFwiYm9yZGVyXCIgb3IgXCJtYXJnaW5cIiwgYWRkIGJvcmRlclxuICAgICAgICAgICAgICAgIGlmICggYm94ICE9PSBcInBhZGRpbmdcIiApIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEgKz0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3JkZXJcIiArIGNzc0V4cGFuZFsgaSBdICsgXCJXaWR0aFwiLCB0cnVlLCBzdHlsZXMgKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBCdXQgc3RpbGwga2VlcCB0cmFjayBvZiBpdCBvdGhlcndpc2VcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBleHRyYSArPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJvcmRlclwiICsgY3NzRXhwYW5kWyBpIF0gKyBcIldpZHRoXCIsIHRydWUsIHN0eWxlcyApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGdldCBoZXJlIHdpdGggYSBib3JkZXItYm94IChjb250ZW50ICsgcGFkZGluZyArIGJvcmRlciksIHdlJ3JlIHNlZWtpbmcgXCJjb250ZW50XCIgb3JcbiAgICAgICAgICAgICAgICAvLyBcInBhZGRpbmdcIiBvciBcIm1hcmdpblwiXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gRm9yIFwiY29udGVudFwiLCBzdWJ0cmFjdCBwYWRkaW5nXG4gICAgICAgICAgICAgICAgaWYgKCBib3ggPT09IFwiY29udGVudFwiICkge1xuICAgICAgICAgICAgICAgICAgICBkZWx0YSAtPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBhZGRpbmdcIiArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBGb3IgXCJjb250ZW50XCIgb3IgXCJwYWRkaW5nXCIsIHN1YnRyYWN0IGJvcmRlclxuICAgICAgICAgICAgICAgIGlmICggYm94ICE9PSBcIm1hcmdpblwiICkge1xuICAgICAgICAgICAgICAgICAgICBkZWx0YSAtPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJvcmRlclwiICsgY3NzRXhwYW5kWyBpIF0gKyBcIldpZHRoXCIsIHRydWUsIHN0eWxlcyApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFjY291bnQgZm9yIHBvc2l0aXZlIGNvbnRlbnQtYm94IHNjcm9sbCBndXR0ZXIgd2hlbiByZXF1ZXN0ZWQgYnkgcHJvdmlkaW5nIGNvbXB1dGVkVmFsXG4gICAgICAgIGlmICggIWlzQm9yZGVyQm94ICYmIGNvbXB1dGVkVmFsID49IDAgKSB7XG5cbiAgICAgICAgICAgIC8vIG9mZnNldFdpZHRoL29mZnNldEhlaWdodCBpcyBhIHJvdW5kZWQgc3VtIG9mIGNvbnRlbnQsIHBhZGRpbmcsIHNjcm9sbCBndXR0ZXIsIGFuZCBib3JkZXJcbiAgICAgICAgICAgIC8vIEFzc3VtaW5nIGludGVnZXIgc2Nyb2xsIGd1dHRlciwgc3VidHJhY3QgdGhlIHJlc3QgYW5kIHJvdW5kIGRvd25cbiAgICAgICAgICAgIGRlbHRhICs9IE1hdGgubWF4KCAwLCBNYXRoLmNlaWwoXG4gICAgICAgICAgICAgICAgZWxlbVsgXCJvZmZzZXRcIiArIGRpbWVuc2lvblsgMCBdLnRvVXBwZXJDYXNlKCkgKyBkaW1lbnNpb24uc2xpY2UoIDEgKSBdIC1cbiAgICAgICAgICAgICAgICBjb21wdXRlZFZhbCAtXG4gICAgICAgICAgICAgICAgZGVsdGEgLVxuICAgICAgICAgICAgICAgIGV4dHJhIC1cbiAgICAgICAgICAgICAgICAwLjVcbiAgICAgICAgICAgICkgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZWx0YTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBkaW1lbnNpb24sIGV4dHJhICkge1xuXG4gICAgICAgIC8vIFN0YXJ0IHdpdGggY29tcHV0ZWQgc3R5bGVcbiAgICAgICAgdmFyIHN0eWxlcyA9IGdldFN0eWxlcyggZWxlbSApLFxuICAgICAgICAgICAgdmFsID0gY3VyQ1NTKCBlbGVtLCBkaW1lbnNpb24sIHN0eWxlcyApLFxuICAgICAgICAgICAgaXNCb3JkZXJCb3ggPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJveFNpemluZ1wiLCBmYWxzZSwgc3R5bGVzICkgPT09IFwiYm9yZGVyLWJveFwiLFxuICAgICAgICAgICAgdmFsdWVJc0JvcmRlckJveCA9IGlzQm9yZGVyQm94O1xuXG4gICAgICAgIC8vIFN1cHBvcnQ6IEZpcmVmb3ggPD01NFxuICAgICAgICAvLyBSZXR1cm4gYSBjb25mb3VuZGluZyBub24tcGl4ZWwgdmFsdWUgb3IgZmVpZ24gaWdub3JhbmNlLCBhcyBhcHByb3ByaWF0ZS5cbiAgICAgICAgaWYgKCBybnVtbm9ucHgudGVzdCggdmFsICkgKSB7XG4gICAgICAgICAgICBpZiAoICFleHRyYSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsID0gXCJhdXRvXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBmb3Igc3R5bGUgaW4gY2FzZSBhIGJyb3dzZXIgd2hpY2ggcmV0dXJucyB1bnJlbGlhYmxlIHZhbHVlc1xuICAgICAgICAvLyBmb3IgZ2V0Q29tcHV0ZWRTdHlsZSBzaWxlbnRseSBmYWxscyBiYWNrIHRvIHRoZSByZWxpYWJsZSBlbGVtLnN0eWxlXG4gICAgICAgIHZhbHVlSXNCb3JkZXJCb3ggPSB2YWx1ZUlzQm9yZGVyQm94ICYmXG4gICAgICAgICAgICAoIHN1cHBvcnQuYm94U2l6aW5nUmVsaWFibGUoKSB8fCB2YWwgPT09IGVsZW0uc3R5bGVbIGRpbWVuc2lvbiBdICk7XG5cbiAgICAgICAgLy8gRmFsbCBiYWNrIHRvIG9mZnNldFdpZHRoL29mZnNldEhlaWdodCB3aGVuIHZhbHVlIGlzIFwiYXV0b1wiXG4gICAgICAgIC8vIFRoaXMgaGFwcGVucyBmb3IgaW5saW5lIGVsZW1lbnRzIHdpdGggbm8gZXhwbGljaXQgc2V0dGluZyAoZ2gtMzU3MSlcbiAgICAgICAgLy8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMSAtIDQuMyBvbmx5XG4gICAgICAgIC8vIEFsc28gdXNlIG9mZnNldFdpZHRoL29mZnNldEhlaWdodCBmb3IgbWlzcmVwb3J0ZWQgaW5saW5lIGRpbWVuc2lvbnMgKGdoLTM2MDIpXG4gICAgICAgIGlmICggdmFsID09PSBcImF1dG9cIiB8fFxuICAgICAgICAgICAgIXBhcnNlRmxvYXQoIHZhbCApICYmIGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiLCBmYWxzZSwgc3R5bGVzICkgPT09IFwiaW5saW5lXCIgKSB7XG5cbiAgICAgICAgICAgIHZhbCA9IGVsZW1bIFwib2Zmc2V0XCIgKyBkaW1lbnNpb25bIDAgXS50b1VwcGVyQ2FzZSgpICsgZGltZW5zaW9uLnNsaWNlKCAxICkgXTtcblxuICAgICAgICAgICAgLy8gb2Zmc2V0V2lkdGgvb2Zmc2V0SGVpZ2h0IHByb3ZpZGUgYm9yZGVyLWJveCB2YWx1ZXNcbiAgICAgICAgICAgIHZhbHVlSXNCb3JkZXJCb3ggPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm9ybWFsaXplIFwiXCIgYW5kIGF1dG9cbiAgICAgICAgdmFsID0gcGFyc2VGbG9hdCggdmFsICkgfHwgMDtcblxuICAgICAgICAvLyBBZGp1c3QgZm9yIHRoZSBlbGVtZW50J3MgYm94IG1vZGVsXG4gICAgICAgIHJldHVybiAoIHZhbCArXG4gICAgICAgICAgICBib3hNb2RlbEFkanVzdG1lbnQoXG4gICAgICAgICAgICAgICAgZWxlbSxcbiAgICAgICAgICAgICAgICBkaW1lbnNpb24sXG4gICAgICAgICAgICAgICAgZXh0cmEgfHwgKCBpc0JvcmRlckJveCA/IFwiYm9yZGVyXCIgOiBcImNvbnRlbnRcIiApLFxuICAgICAgICAgICAgICAgIHZhbHVlSXNCb3JkZXJCb3gsXG4gICAgICAgICAgICAgICAgc3R5bGVzLFxuXG4gICAgICAgICAgICAgICAgLy8gUHJvdmlkZSB0aGUgY3VycmVudCBjb21wdXRlZCBzaXplIHRvIHJlcXVlc3Qgc2Nyb2xsIGd1dHRlciBjYWxjdWxhdGlvbiAoZ2gtMzU4OSlcbiAgICAgICAgICAgICAgICB2YWxcbiAgICAgICAgICAgIClcbiAgICAgICAgKSArIFwicHhcIjtcbiAgICB9XG5cbiAgICBqUXVlcnkuZXh0ZW5kKCB7XG5cbiAgICAgICAgLy8gQWRkIGluIHN0eWxlIHByb3BlcnR5IGhvb2tzIGZvciBvdmVycmlkaW5nIHRoZSBkZWZhdWx0XG4gICAgICAgIC8vIGJlaGF2aW9yIG9mIGdldHRpbmcgYW5kIHNldHRpbmcgYSBzdHlsZSBwcm9wZXJ0eVxuICAgICAgICBjc3NIb29rczoge1xuICAgICAgICAgICAgb3BhY2l0eToge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIGNvbXB1dGVkICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBzaG91bGQgYWx3YXlzIGdldCBhIG51bWJlciBiYWNrIGZyb20gb3BhY2l0eVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldCA9IGN1ckNTUyggZWxlbSwgXCJvcGFjaXR5XCIgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQgPT09IFwiXCIgPyBcIjFcIiA6IHJldDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBEb24ndCBhdXRvbWF0aWNhbGx5IGFkZCBcInB4XCIgdG8gdGhlc2UgcG9zc2libHktdW5pdGxlc3MgcHJvcGVydGllc1xuICAgICAgICBjc3NOdW1iZXI6IHtcbiAgICAgICAgICAgIFwiYW5pbWF0aW9uSXRlcmF0aW9uQ291bnRcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiY29sdW1uQ291bnRcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZmlsbE9wYWNpdHlcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZmxleEdyb3dcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZmxleFNocmlua1wiOiB0cnVlLFxuICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IHRydWUsXG4gICAgICAgICAgICBcImxpbmVIZWlnaHRcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwib3BhY2l0eVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJvcmRlclwiOiB0cnVlLFxuICAgICAgICAgICAgXCJvcnBoYW5zXCI6IHRydWUsXG4gICAgICAgICAgICBcIndpZG93c1wiOiB0cnVlLFxuICAgICAgICAgICAgXCJ6SW5kZXhcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiem9vbVwiOiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQWRkIGluIHByb3BlcnRpZXMgd2hvc2UgbmFtZXMgeW91IHdpc2ggdG8gZml4IGJlZm9yZVxuICAgICAgICAvLyBzZXR0aW5nIG9yIGdldHRpbmcgdGhlIHZhbHVlXG4gICAgICAgIGNzc1Byb3BzOiB7fSxcblxuICAgICAgICAvLyBHZXQgYW5kIHNldCB0aGUgc3R5bGUgcHJvcGVydHkgb24gYSBET00gTm9kZVxuICAgICAgICBzdHlsZTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlLCBleHRyYSApIHtcblxuICAgICAgICAgICAgLy8gRG9uJ3Qgc2V0IHN0eWxlcyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG4gICAgICAgICAgICBpZiAoICFlbGVtIHx8IGVsZW0ubm9kZVR5cGUgPT09IDMgfHwgZWxlbS5ub2RlVHlwZSA9PT0gOCB8fCAhZWxlbS5zdHlsZSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZVxuICAgICAgICAgICAgdmFyIHJldCwgdHlwZSwgaG9va3MsXG4gICAgICAgICAgICAgICAgb3JpZ05hbWUgPSBjYW1lbENhc2UoIG5hbWUgKSxcbiAgICAgICAgICAgICAgICBpc0N1c3RvbVByb3AgPSByY3VzdG9tUHJvcC50ZXN0KCBuYW1lICksXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBlbGVtLnN0eWxlO1xuXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB3ZSdyZSB3b3JraW5nIHdpdGggdGhlIHJpZ2h0IG5hbWUuIFdlIGRvbid0XG4gICAgICAgICAgICAvLyB3YW50IHRvIHF1ZXJ5IHRoZSB2YWx1ZSBpZiBpdCBpcyBhIENTUyBjdXN0b20gcHJvcGVydHlcbiAgICAgICAgICAgIC8vIHNpbmNlIHRoZXkgYXJlIHVzZXItZGVmaW5lZC5cbiAgICAgICAgICAgIGlmICggIWlzQ3VzdG9tUHJvcCApIHtcbiAgICAgICAgICAgICAgICBuYW1lID0gZmluYWxQcm9wTmFtZSggb3JpZ05hbWUgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gR2V0cyBob29rIGZvciB0aGUgcHJlZml4ZWQgdmVyc2lvbiwgdGhlbiB1bnByZWZpeGVkIHZlcnNpb25cbiAgICAgICAgICAgIGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF0gfHwgalF1ZXJ5LmNzc0hvb2tzWyBvcmlnTmFtZSBdO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB3ZSdyZSBzZXR0aW5nIGEgdmFsdWVcbiAgICAgICAgICAgIGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gdHlwZW9mIHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgLy8gQ29udmVydCBcIis9XCIgb3IgXCItPVwiIHRvIHJlbGF0aXZlIG51bWJlcnMgKCM3MzQ1KVxuICAgICAgICAgICAgICAgIGlmICggdHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAoIHJldCA9IHJjc3NOdW0uZXhlYyggdmFsdWUgKSApICYmIHJldFsgMSBdICkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGFkanVzdENTUyggZWxlbSwgbmFtZSwgcmV0ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRml4ZXMgYnVnICM5MjM3XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcIm51bWJlclwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IG51bGwgYW5kIE5hTiB2YWx1ZXMgYXJlbid0IHNldCAoIzcxMTYpXG4gICAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlICE9PSB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElmIGEgbnVtYmVyIHdhcyBwYXNzZWQgaW4sIGFkZCB0aGUgdW5pdCAoZXhjZXB0IGZvciBjZXJ0YWluIENTUyBwcm9wZXJ0aWVzKVxuICAgICAgICAgICAgICAgIGlmICggdHlwZSA9PT0gXCJudW1iZXJcIiApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gcmV0ICYmIHJldFsgMyBdIHx8ICggalF1ZXJ5LmNzc051bWJlclsgb3JpZ05hbWUgXSA/IFwiXCIgOiBcInB4XCIgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBiYWNrZ3JvdW5kLSogcHJvcHMgYWZmZWN0IG9yaWdpbmFsIGNsb25lJ3MgdmFsdWVzXG4gICAgICAgICAgICAgICAgaWYgKCAhc3VwcG9ydC5jbGVhckNsb25lU3R5bGUgJiYgdmFsdWUgPT09IFwiXCIgJiYgbmFtZS5pbmRleE9mKCBcImJhY2tncm91bmRcIiApID09PSAwICkge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZVsgbmFtZSBdID0gXCJpbmhlcml0XCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gSWYgYSBob29rIHdhcyBwcm92aWRlZCwgdXNlIHRoYXQgdmFsdWUsIG90aGVyd2lzZSBqdXN0IHNldCB0aGUgc3BlY2lmaWVkIHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgKCAhaG9va3MgfHwgISggXCJzZXRcIiBpbiBob29rcyApIHx8XG4gICAgICAgICAgICAgICAgICAgICggdmFsdWUgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBleHRyYSApICkgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIGlzQ3VzdG9tUHJvcCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLnNldFByb3BlcnR5KCBuYW1lLCB2YWx1ZSApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVbIG5hbWUgXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgYSBob29rIHdhcyBwcm92aWRlZCBnZXQgdGhlIG5vbi1jb21wdXRlZCB2YWx1ZSBmcm9tIHRoZXJlXG4gICAgICAgICAgICAgICAgaWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmXG4gICAgICAgICAgICAgICAgICAgICggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBmYWxzZSwgZXh0cmEgKSApICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UganVzdCBnZXQgdGhlIHZhbHVlIGZyb20gdGhlIHN0eWxlIG9iamVjdFxuICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZVsgbmFtZSBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNzczogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGV4dHJhLCBzdHlsZXMgKSB7XG4gICAgICAgICAgICB2YXIgdmFsLCBudW0sIGhvb2tzLFxuICAgICAgICAgICAgICAgIG9yaWdOYW1lID0gY2FtZWxDYXNlKCBuYW1lICksXG4gICAgICAgICAgICAgICAgaXNDdXN0b21Qcm9wID0gcmN1c3RvbVByb3AudGVzdCggbmFtZSApO1xuXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB3ZSdyZSB3b3JraW5nIHdpdGggdGhlIHJpZ2h0IG5hbWUuIFdlIGRvbid0XG4gICAgICAgICAgICAvLyB3YW50IHRvIG1vZGlmeSB0aGUgdmFsdWUgaWYgaXQgaXMgYSBDU1MgY3VzdG9tIHByb3BlcnR5XG4gICAgICAgICAgICAvLyBzaW5jZSB0aGV5IGFyZSB1c2VyLWRlZmluZWQuXG4gICAgICAgICAgICBpZiAoICFpc0N1c3RvbVByb3AgKSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IGZpbmFsUHJvcE5hbWUoIG9yaWdOYW1lICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRyeSBwcmVmaXhlZCBuYW1lIGZvbGxvd2VkIGJ5IHRoZSB1bnByZWZpeGVkIG5hbWVcbiAgICAgICAgICAgIGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF0gfHwgalF1ZXJ5LmNzc0hvb2tzWyBvcmlnTmFtZSBdO1xuXG4gICAgICAgICAgICAvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkIGdldCB0aGUgY29tcHV0ZWQgdmFsdWUgZnJvbSB0aGVyZVxuICAgICAgICAgICAgaWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICkge1xuICAgICAgICAgICAgICAgIHZhbCA9IGhvb2tzLmdldCggZWxlbSwgdHJ1ZSwgZXh0cmEgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBpZiBhIHdheSB0byBnZXQgdGhlIGNvbXB1dGVkIHZhbHVlIGV4aXN0cywgdXNlIHRoYXRcbiAgICAgICAgICAgIGlmICggdmFsID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gY3VyQ1NTKCBlbGVtLCBuYW1lLCBzdHlsZXMgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ29udmVydCBcIm5vcm1hbFwiIHRvIGNvbXB1dGVkIHZhbHVlXG4gICAgICAgICAgICBpZiAoIHZhbCA9PT0gXCJub3JtYWxcIiAmJiBuYW1lIGluIGNzc05vcm1hbFRyYW5zZm9ybSApIHtcbiAgICAgICAgICAgICAgICB2YWwgPSBjc3NOb3JtYWxUcmFuc2Zvcm1bIG5hbWUgXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTWFrZSBudW1lcmljIGlmIGZvcmNlZCBvciBhIHF1YWxpZmllciB3YXMgcHJvdmlkZWQgYW5kIHZhbCBsb29rcyBudW1lcmljXG4gICAgICAgICAgICBpZiAoIGV4dHJhID09PSBcIlwiIHx8IGV4dHJhICkge1xuICAgICAgICAgICAgICAgIG51bSA9IHBhcnNlRmxvYXQoIHZhbCApO1xuICAgICAgICAgICAgICAgIHJldHVybiBleHRyYSA9PT0gdHJ1ZSB8fCBpc0Zpbml0ZSggbnVtICkgPyBudW0gfHwgMCA6IHZhbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgIH0gKTtcblxuICAgIGpRdWVyeS5lYWNoKCBbIFwiaGVpZ2h0XCIsIFwid2lkdGhcIiBdLCBmdW5jdGlvbiggaSwgZGltZW5zaW9uICkge1xuICAgICAgICBqUXVlcnkuY3NzSG9va3NbIGRpbWVuc2lvbiBdID0ge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQsIGV4dHJhICkge1xuICAgICAgICAgICAgICAgIGlmICggY29tcHV0ZWQgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ2VydGFpbiBlbGVtZW50cyBjYW4gaGF2ZSBkaW1lbnNpb24gaW5mbyBpZiB3ZSBpbnZpc2libHkgc2hvdyB0aGVtXG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1dCBpdCBtdXN0IGhhdmUgYSBjdXJyZW50IGRpc3BsYXkgc3R5bGUgdGhhdCB3b3VsZCBiZW5lZml0XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZGlzcGxheXN3YXAudGVzdCggalF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSApICYmXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogU2FmYXJpIDgrXG4gICAgICAgICAgICAgICAgICAgIC8vIFRhYmxlIGNvbHVtbnMgaW4gU2FmYXJpIGhhdmUgbm9uLXplcm8gb2Zmc2V0V2lkdGggJiB6ZXJvXG4gICAgICAgICAgICAgICAgICAgIC8vIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIHVubGVzcyBkaXNwbGF5IGlzIGNoYW5nZWQuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFIDw9MTEgb25seVxuICAgICAgICAgICAgICAgICAgICAvLyBSdW5uaW5nIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBvbiBhIGRpc2Nvbm5lY3RlZCBub2RlXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIElFIHRocm93cyBhbiBlcnJvci5cbiAgICAgICAgICAgICAgICAgICAgKCAhZWxlbS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCB8fCAhZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCApID9cbiAgICAgICAgICAgICAgICAgICAgICAgIHN3YXAoIGVsZW0sIGNzc1Nob3csIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBkaW1lbnNpb24sIGV4dHJhICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ICkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgZGltZW5zaW9uLCBleHRyYSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBleHRyYSApIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzID0gZ2V0U3R5bGVzKCBlbGVtICksXG4gICAgICAgICAgICAgICAgICAgIGlzQm9yZGVyQm94ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3hTaXppbmdcIiwgZmFsc2UsIHN0eWxlcyApID09PSBcImJvcmRlci1ib3hcIixcbiAgICAgICAgICAgICAgICAgICAgc3VidHJhY3QgPSBleHRyYSAmJiBib3hNb2RlbEFkanVzdG1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmEsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0JvcmRlckJveCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlc1xuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgLy8gQWNjb3VudCBmb3IgdW5yZWxpYWJsZSBib3JkZXItYm94IGRpbWVuc2lvbnMgYnkgY29tcGFyaW5nIG9mZnNldCogdG8gY29tcHV0ZWQgYW5kXG4gICAgICAgICAgICAgICAgLy8gZmFraW5nIGEgY29udGVudC1ib3ggdG8gZ2V0IGJvcmRlciBhbmQgcGFkZGluZyAoZ2gtMzY5OSlcbiAgICAgICAgICAgICAgICBpZiAoIGlzQm9yZGVyQm94ICYmIHN1cHBvcnQuc2Nyb2xsYm94U2l6ZSgpID09PSBzdHlsZXMucG9zaXRpb24gKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnRyYWN0IC09IE1hdGguY2VpbChcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1bIFwib2Zmc2V0XCIgKyBkaW1lbnNpb25bIDAgXS50b1VwcGVyQ2FzZSgpICsgZGltZW5zaW9uLnNsaWNlKCAxICkgXSAtXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KCBzdHlsZXNbIGRpbWVuc2lvbiBdICkgLVxuICAgICAgICAgICAgICAgICAgICAgICAgYm94TW9kZWxBZGp1c3RtZW50KCBlbGVtLCBkaW1lbnNpb24sIFwiYm9yZGVyXCIsIGZhbHNlLCBzdHlsZXMgKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjVcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IHRvIHBpeGVscyBpZiB2YWx1ZSBhZGp1c3RtZW50IGlzIG5lZWRlZFxuICAgICAgICAgICAgICAgIGlmICggc3VidHJhY3QgJiYgKCBtYXRjaGVzID0gcmNzc051bS5leGVjKCB2YWx1ZSApICkgJiZcbiAgICAgICAgICAgICAgICAgICAgKCBtYXRjaGVzWyAzIF0gfHwgXCJweFwiICkgIT09IFwicHhcIiApIHtcblxuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlWyBkaW1lbnNpb24gXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGpRdWVyeS5jc3MoIGVsZW0sIGRpbWVuc2lvbiApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBzZXRQb3NpdGl2ZU51bWJlciggZWxlbSwgdmFsdWUsIHN1YnRyYWN0ICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSApO1xuXG4gICAgalF1ZXJ5LmNzc0hvb2tzLm1hcmdpbkxlZnQgPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucmVsaWFibGVNYXJnaW5MZWZ0LFxuICAgICAgICBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG4gICAgICAgICAgICBpZiAoIGNvbXB1dGVkICkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoIHBhcnNlRmxvYXQoIGN1ckNTUyggZWxlbSwgXCJtYXJnaW5MZWZ0XCIgKSApIHx8XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtXG4gICAgICAgICAgICAgICAgICAgIHN3YXAoIGVsZW0sIHsgbWFyZ2luTGVmdDogMCB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgICAgICAgICAgICAgIH0gKVxuICAgICAgICAgICAgICAgICkgKyBcInB4XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xuXG4vLyBUaGVzZSBob29rcyBhcmUgdXNlZCBieSBhbmltYXRlIHRvIGV4cGFuZCBwcm9wZXJ0aWVzXG4gICAgalF1ZXJ5LmVhY2goIHtcbiAgICAgICAgbWFyZ2luOiBcIlwiLFxuICAgICAgICBwYWRkaW5nOiBcIlwiLFxuICAgICAgICBib3JkZXI6IFwiV2lkdGhcIlxuICAgIH0sIGZ1bmN0aW9uKCBwcmVmaXgsIHN1ZmZpeCApIHtcbiAgICAgICAgalF1ZXJ5LmNzc0hvb2tzWyBwcmVmaXggKyBzdWZmaXggXSA9IHtcbiAgICAgICAgICAgIGV4cGFuZDogZnVuY3Rpb24oIHZhbHVlICkge1xuICAgICAgICAgICAgICAgIHZhciBpID0gMCxcbiAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWQgPSB7fSxcblxuICAgICAgICAgICAgICAgICAgICAvLyBBc3N1bWVzIGEgc2luZ2xlIG51bWJlciBpZiBub3QgYSBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgcGFydHMgPSB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS5zcGxpdCggXCIgXCIgKSA6IFsgdmFsdWUgXTtcblxuICAgICAgICAgICAgICAgIGZvciAoIDsgaSA8IDQ7IGkrKyApIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWRbIHByZWZpeCArIGNzc0V4cGFuZFsgaSBdICsgc3VmZml4IF0gPVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydHNbIGkgXSB8fCBwYXJ0c1sgaSAtIDIgXSB8fCBwYXJ0c1sgMCBdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBleHBhbmRlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIHByZWZpeCAhPT0gXCJtYXJnaW5cIiApIHtcbiAgICAgICAgICAgIGpRdWVyeS5jc3NIb29rc1sgcHJlZml4ICsgc3VmZml4IF0uc2V0ID0gc2V0UG9zaXRpdmVOdW1iZXI7XG4gICAgICAgIH1cbiAgICB9ICk7XG5cbiAgICBqUXVlcnkuZm4uZXh0ZW5kKCB7XG4gICAgICAgIGNzczogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuICAgICAgICAgICAgcmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlICkge1xuICAgICAgICAgICAgICAgIHZhciBzdHlsZXMsIGxlbixcbiAgICAgICAgICAgICAgICAgICAgbWFwID0ge30sXG4gICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBBcnJheS5pc0FycmF5KCBuYW1lICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcyA9IGdldFN0eWxlcyggZWxlbSApO1xuICAgICAgICAgICAgICAgICAgICBsZW4gPSBuYW1lLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFsgbmFtZVsgaSBdIF0gPSBqUXVlcnkuY3NzKCBlbGVtLCBuYW1lWyBpIF0sIGZhbHNlLCBzdHlsZXMgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuc3R5bGUoIGVsZW0sIG5hbWUsIHZhbHVlICkgOlxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuY3NzKCBlbGVtLCBuYW1lICk7XG4gICAgICAgICAgICB9LCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcbiAgICAgICAgfVxuICAgIH0gKTtcblxuXG4gICAgZnVuY3Rpb24gVHdlZW4oIGVsZW0sIG9wdGlvbnMsIHByb3AsIGVuZCwgZWFzaW5nICkge1xuICAgICAgICByZXR1cm4gbmV3IFR3ZWVuLnByb3RvdHlwZS5pbml0KCBlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZyApO1xuICAgIH1cbiAgICBqUXVlcnkuVHdlZW4gPSBUd2VlbjtcblxuICAgIFR3ZWVuLnByb3RvdHlwZSA9IHtcbiAgICAgICAgY29uc3RydWN0b3I6IFR3ZWVuLFxuICAgICAgICBpbml0OiBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgcHJvcCwgZW5kLCBlYXNpbmcsIHVuaXQgKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0gPSBlbGVtO1xuICAgICAgICAgICAgdGhpcy5wcm9wID0gcHJvcDtcbiAgICAgICAgICAgIHRoaXMuZWFzaW5nID0gZWFzaW5nIHx8IGpRdWVyeS5lYXNpbmcuX2RlZmF1bHQ7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgICAgdGhpcy5zdGFydCA9IHRoaXMubm93ID0gdGhpcy5jdXIoKTtcbiAgICAgICAgICAgIHRoaXMuZW5kID0gZW5kO1xuICAgICAgICAgICAgdGhpcy51bml0ID0gdW5pdCB8fCAoIGpRdWVyeS5jc3NOdW1iZXJbIHByb3AgXSA/IFwiXCIgOiBcInB4XCIgKTtcbiAgICAgICAgfSxcbiAgICAgICAgY3VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBob29rcyA9IFR3ZWVuLnByb3BIb29rc1sgdGhpcy5wcm9wIF07XG5cbiAgICAgICAgICAgIHJldHVybiBob29rcyAmJiBob29rcy5nZXQgP1xuICAgICAgICAgICAgICAgIGhvb2tzLmdldCggdGhpcyApIDpcbiAgICAgICAgICAgICAgICBUd2Vlbi5wcm9wSG9va3MuX2RlZmF1bHQuZ2V0KCB0aGlzICk7XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bjogZnVuY3Rpb24oIHBlcmNlbnQgKSB7XG4gICAgICAgICAgICB2YXIgZWFzZWQsXG4gICAgICAgICAgICAgICAgaG9va3MgPSBUd2Vlbi5wcm9wSG9va3NbIHRoaXMucHJvcCBdO1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMub3B0aW9ucy5kdXJhdGlvbiApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcyA9IGVhc2VkID0galF1ZXJ5LmVhc2luZ1sgdGhpcy5lYXNpbmcgXShcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudCwgdGhpcy5vcHRpb25zLmR1cmF0aW9uICogcGVyY2VudCwgMCwgMSwgdGhpcy5vcHRpb25zLmR1cmF0aW9uXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBlYXNlZCA9IHBlcmNlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5vdyA9ICggdGhpcy5lbmQgLSB0aGlzLnN0YXJ0ICkgKiBlYXNlZCArIHRoaXMuc3RhcnQ7XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5vcHRpb25zLnN0ZXAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnN0ZXAuY2FsbCggdGhpcy5lbGVtLCB0aGlzLm5vdywgdGhpcyApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGhvb2tzICYmIGhvb2tzLnNldCApIHtcbiAgICAgICAgICAgICAgICBob29rcy5zZXQoIHRoaXMgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgVHdlZW4ucHJvcEhvb2tzLl9kZWZhdWx0LnNldCggdGhpcyApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgVHdlZW4ucHJvdG90eXBlLmluaXQucHJvdG90eXBlID0gVHdlZW4ucHJvdG90eXBlO1xuXG4gICAgVHdlZW4ucHJvcEhvb2tzID0ge1xuICAgICAgICBfZGVmYXVsdDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiggdHdlZW4gKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdDtcblxuICAgICAgICAgICAgICAgIC8vIFVzZSBhIHByb3BlcnR5IG9uIHRoZSBlbGVtZW50IGRpcmVjdGx5IHdoZW4gaXQgaXMgbm90IGEgRE9NIGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgLy8gb3Igd2hlbiB0aGVyZSBpcyBubyBtYXRjaGluZyBzdHlsZSBwcm9wZXJ0eSB0aGF0IGV4aXN0cy5cbiAgICAgICAgICAgICAgICBpZiAoIHR3ZWVuLmVsZW0ubm9kZVR5cGUgIT09IDEgfHxcbiAgICAgICAgICAgICAgICAgICAgdHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdICE9IG51bGwgJiYgdHdlZW4uZWxlbS5zdHlsZVsgdHdlZW4ucHJvcCBdID09IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUGFzc2luZyBhbiBlbXB0eSBzdHJpbmcgYXMgYSAzcmQgcGFyYW1ldGVyIHRvIC5jc3Mgd2lsbCBhdXRvbWF0aWNhbGx5XG4gICAgICAgICAgICAgICAgLy8gYXR0ZW1wdCBhIHBhcnNlRmxvYXQgYW5kIGZhbGxiYWNrIHRvIGEgc3RyaW5nIGlmIHRoZSBwYXJzZSBmYWlscy5cbiAgICAgICAgICAgICAgICAvLyBTaW1wbGUgdmFsdWVzIHN1Y2ggYXMgXCIxMHB4XCIgYXJlIHBhcnNlZCB0byBGbG9hdDtcbiAgICAgICAgICAgICAgICAvLyBjb21wbGV4IHZhbHVlcyBzdWNoIGFzIFwicm90YXRlKDFyYWQpXCIgYXJlIHJldHVybmVkIGFzLWlzLlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGpRdWVyeS5jc3MoIHR3ZWVuLmVsZW0sIHR3ZWVuLnByb3AsIFwiXCIgKTtcblxuICAgICAgICAgICAgICAgIC8vIEVtcHR5IHN0cmluZ3MsIG51bGwsIHVuZGVmaW5lZCBhbmQgXCJhdXRvXCIgYXJlIGNvbnZlcnRlZCB0byAwLlxuICAgICAgICAgICAgICAgIHJldHVybiAhcmVzdWx0IHx8IHJlc3VsdCA9PT0gXCJhdXRvXCIgPyAwIDogcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oIHR3ZWVuICkge1xuXG4gICAgICAgICAgICAgICAgLy8gVXNlIHN0ZXAgaG9vayBmb3IgYmFjayBjb21wYXQuXG4gICAgICAgICAgICAgICAgLy8gVXNlIGNzc0hvb2sgaWYgaXRzIHRoZXJlLlxuICAgICAgICAgICAgICAgIC8vIFVzZSAuc3R5bGUgaWYgYXZhaWxhYmxlIGFuZCB1c2UgcGxhaW4gcHJvcGVydGllcyB3aGVyZSBhdmFpbGFibGUuXG4gICAgICAgICAgICAgICAgaWYgKCBqUXVlcnkuZnguc3RlcFsgdHdlZW4ucHJvcCBdICkge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZnguc3RlcFsgdHdlZW4ucHJvcCBdKCB0d2VlbiApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR3ZWVuLmVsZW0ubm9kZVR5cGUgPT09IDEgJiZcbiAgICAgICAgICAgICAgICAgICAgKCB0d2Vlbi5lbGVtLnN0eWxlWyBqUXVlcnkuY3NzUHJvcHNbIHR3ZWVuLnByb3AgXSBdICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5jc3NIb29rc1sgdHdlZW4ucHJvcCBdICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5zdHlsZSggdHdlZW4uZWxlbSwgdHdlZW4ucHJvcCwgdHdlZW4ubm93ICsgdHdlZW4udW5pdCApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXSA9IHR3ZWVuLm5vdztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4vLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuLy8gUGFuaWMgYmFzZWQgYXBwcm9hY2ggdG8gc2V0dGluZyB0aGluZ3Mgb24gZGlzY29ubmVjdGVkIG5vZGVzXG4gICAgVHdlZW4ucHJvcEhvb2tzLnNjcm9sbFRvcCA9IFR3ZWVuLnByb3BIb29rcy5zY3JvbGxMZWZ0ID0ge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKCB0d2VlbiApIHtcbiAgICAgICAgICAgIGlmICggdHdlZW4uZWxlbS5ub2RlVHlwZSAmJiB0d2Vlbi5lbGVtLnBhcmVudE5vZGUgKSB7XG4gICAgICAgICAgICAgICAgdHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdID0gdHdlZW4ubm93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGpRdWVyeS5lYXNpbmcgPSB7XG4gICAgICAgIGxpbmVhcjogZnVuY3Rpb24oIHAgKSB7XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfSxcbiAgICAgICAgc3dpbmc6IGZ1bmN0aW9uKCBwICkge1xuICAgICAgICAgICAgcmV0dXJuIDAuNSAtIE1hdGguY29zKCBwICogTWF0aC5QSSApIC8gMjtcbiAgICAgICAgfSxcbiAgICAgICAgX2RlZmF1bHQ6IFwic3dpbmdcIlxuICAgIH07XG5cbiAgICBqUXVlcnkuZnggPSBUd2Vlbi5wcm90b3R5cGUuaW5pdDtcblxuLy8gQmFjayBjb21wYXQgPDEuOCBleHRlbnNpb24gcG9pbnRcbiAgICBqUXVlcnkuZnguc3RlcCA9IHt9O1xuXG5cblxuXG4gICAgdmFyXG4gICAgICAgIGZ4Tm93LCBpblByb2dyZXNzLFxuICAgICAgICByZnh0eXBlcyA9IC9eKD86dG9nZ2xlfHNob3d8aGlkZSkkLyxcbiAgICAgICAgcnJ1biA9IC9xdWV1ZUhvb2tzJC87XG5cbiAgICBmdW5jdGlvbiBzY2hlZHVsZSgpIHtcbiAgICAgICAgaWYgKCBpblByb2dyZXNzICkge1xuICAgICAgICAgICAgaWYgKCBkb2N1bWVudC5oaWRkZW4gPT09IGZhbHNlICYmIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggc2NoZWR1bGUgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoIHNjaGVkdWxlLCBqUXVlcnkuZnguaW50ZXJ2YWwgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgalF1ZXJ5LmZ4LnRpY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuLy8gQW5pbWF0aW9ucyBjcmVhdGVkIHN5bmNocm9ub3VzbHkgd2lsbCBydW4gc3luY2hyb25vdXNseVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUZ4Tm93KCkge1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmeE5vdyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSApO1xuICAgICAgICByZXR1cm4gKCBmeE5vdyA9IERhdGUubm93KCkgKTtcbiAgICB9XG5cbi8vIEdlbmVyYXRlIHBhcmFtZXRlcnMgdG8gY3JlYXRlIGEgc3RhbmRhcmQgYW5pbWF0aW9uXG4gICAgZnVuY3Rpb24gZ2VuRngoIHR5cGUsIGluY2x1ZGVXaWR0aCApIHtcbiAgICAgICAgdmFyIHdoaWNoLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBhdHRycyA9IHsgaGVpZ2h0OiB0eXBlIH07XG5cbiAgICAgICAgLy8gSWYgd2UgaW5jbHVkZSB3aWR0aCwgc3RlcCB2YWx1ZSBpcyAxIHRvIGRvIGFsbCBjc3NFeHBhbmQgdmFsdWVzLFxuICAgICAgICAvLyBvdGhlcndpc2Ugc3RlcCB2YWx1ZSBpcyAyIHRvIHNraXAgb3ZlciBMZWZ0IGFuZCBSaWdodFxuICAgICAgICBpbmNsdWRlV2lkdGggPSBpbmNsdWRlV2lkdGggPyAxIDogMDtcbiAgICAgICAgZm9yICggOyBpIDwgNDsgaSArPSAyIC0gaW5jbHVkZVdpZHRoICkge1xuICAgICAgICAgICAgd2hpY2ggPSBjc3NFeHBhbmRbIGkgXTtcbiAgICAgICAgICAgIGF0dHJzWyBcIm1hcmdpblwiICsgd2hpY2ggXSA9IGF0dHJzWyBcInBhZGRpbmdcIiArIHdoaWNoIF0gPSB0eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBpbmNsdWRlV2lkdGggKSB7XG4gICAgICAgICAgICBhdHRycy5vcGFjaXR5ID0gYXR0cnMud2lkdGggPSB0eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGF0dHJzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVR3ZWVuKCB2YWx1ZSwgcHJvcCwgYW5pbWF0aW9uICkge1xuICAgICAgICB2YXIgdHdlZW4sXG4gICAgICAgICAgICBjb2xsZWN0aW9uID0gKCBBbmltYXRpb24udHdlZW5lcnNbIHByb3AgXSB8fCBbXSApLmNvbmNhdCggQW5pbWF0aW9uLnR3ZWVuZXJzWyBcIipcIiBdICksXG4gICAgICAgICAgICBpbmRleCA9IDAsXG4gICAgICAgICAgICBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aDtcbiAgICAgICAgZm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcbiAgICAgICAgICAgIGlmICggKCB0d2VlbiA9IGNvbGxlY3Rpb25bIGluZGV4IF0uY2FsbCggYW5pbWF0aW9uLCBwcm9wLCB2YWx1ZSApICkgKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBXZSdyZSBkb25lIHdpdGggdGhpcyBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgIHJldHVybiB0d2VlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlZmF1bHRQcmVmaWx0ZXIoIGVsZW0sIHByb3BzLCBvcHRzICkge1xuICAgICAgICB2YXIgcHJvcCwgdmFsdWUsIHRvZ2dsZSwgaG9va3MsIG9sZGZpcmUsIHByb3BUd2VlbiwgcmVzdG9yZURpc3BsYXksIGRpc3BsYXksXG4gICAgICAgICAgICBpc0JveCA9IFwid2lkdGhcIiBpbiBwcm9wcyB8fCBcImhlaWdodFwiIGluIHByb3BzLFxuICAgICAgICAgICAgYW5pbSA9IHRoaXMsXG4gICAgICAgICAgICBvcmlnID0ge30sXG4gICAgICAgICAgICBzdHlsZSA9IGVsZW0uc3R5bGUsXG4gICAgICAgICAgICBoaWRkZW4gPSBlbGVtLm5vZGVUeXBlICYmIGlzSGlkZGVuV2l0aGluVHJlZSggZWxlbSApLFxuICAgICAgICAgICAgZGF0YVNob3cgPSBkYXRhUHJpdi5nZXQoIGVsZW0sIFwiZnhzaG93XCIgKTtcblxuICAgICAgICAvLyBRdWV1ZS1za2lwcGluZyBhbmltYXRpb25zIGhpamFjayB0aGUgZnggaG9va3NcbiAgICAgICAgaWYgKCAhb3B0cy5xdWV1ZSApIHtcbiAgICAgICAgICAgIGhvb2tzID0galF1ZXJ5Ll9xdWV1ZUhvb2tzKCBlbGVtLCBcImZ4XCIgKTtcbiAgICAgICAgICAgIGlmICggaG9va3MudW5xdWV1ZWQgPT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgICBob29rcy51bnF1ZXVlZCA9IDA7XG4gICAgICAgICAgICAgICAgb2xkZmlyZSA9IGhvb2tzLmVtcHR5LmZpcmU7XG4gICAgICAgICAgICAgICAgaG9va3MuZW1wdHkuZmlyZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoICFob29rcy51bnF1ZXVlZCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZGZpcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBob29rcy51bnF1ZXVlZCsrO1xuXG4gICAgICAgICAgICBhbmltLmFsd2F5cyggZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGhlIGNvbXBsZXRlIGhhbmRsZXIgaXMgY2FsbGVkIGJlZm9yZSB0aGlzIGNvbXBsZXRlc1xuICAgICAgICAgICAgICAgIGFuaW0uYWx3YXlzKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaG9va3MudW5xdWV1ZWQtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhalF1ZXJ5LnF1ZXVlKCBlbGVtLCBcImZ4XCIgKS5sZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBob29rcy5lbXB0eS5maXJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ICk7XG4gICAgICAgICAgICB9ICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlY3Qgc2hvdy9oaWRlIGFuaW1hdGlvbnNcbiAgICAgICAgZm9yICggcHJvcCBpbiBwcm9wcyApIHtcbiAgICAgICAgICAgIHZhbHVlID0gcHJvcHNbIHByb3AgXTtcbiAgICAgICAgICAgIGlmICggcmZ4dHlwZXMudGVzdCggdmFsdWUgKSApIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgcHJvcHNbIHByb3AgXTtcbiAgICAgICAgICAgICAgICB0b2dnbGUgPSB0b2dnbGUgfHwgdmFsdWUgPT09IFwidG9nZ2xlXCI7XG4gICAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gKCBoaWRkZW4gPyBcImhpZGVcIiA6IFwic2hvd1wiICkgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUHJldGVuZCB0byBiZSBoaWRkZW4gaWYgdGhpcyBpcyBhIFwic2hvd1wiIGFuZFxuICAgICAgICAgICAgICAgICAgICAvLyB0aGVyZSBpcyBzdGlsbCBkYXRhIGZyb20gYSBzdG9wcGVkIHNob3cvaGlkZVxuICAgICAgICAgICAgICAgICAgICBpZiAoIHZhbHVlID09PSBcInNob3dcIiAmJiBkYXRhU2hvdyAmJiBkYXRhU2hvd1sgcHJvcCBdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW4gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgYWxsIG90aGVyIG5vLW9wIHNob3cvaGlkZSBkYXRhXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcmlnWyBwcm9wIF0gPSBkYXRhU2hvdyAmJiBkYXRhU2hvd1sgcHJvcCBdIHx8IGpRdWVyeS5zdHlsZSggZWxlbSwgcHJvcCApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmFpbCBvdXQgaWYgdGhpcyBpcyBhIG5vLW9wIGxpa2UgLmhpZGUoKS5oaWRlKClcbiAgICAgICAgcHJvcFR3ZWVuID0gIWpRdWVyeS5pc0VtcHR5T2JqZWN0KCBwcm9wcyApO1xuICAgICAgICBpZiAoICFwcm9wVHdlZW4gJiYgalF1ZXJ5LmlzRW1wdHlPYmplY3QoIG9yaWcgKSApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlc3RyaWN0IFwib3ZlcmZsb3dcIiBhbmQgXCJkaXNwbGF5XCIgc3R5bGVzIGR1cmluZyBib3ggYW5pbWF0aW9uc1xuICAgICAgICBpZiAoIGlzQm94ICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExLCBFZGdlIDEyIC0gMTVcbiAgICAgICAgICAgIC8vIFJlY29yZCBhbGwgMyBvdmVyZmxvdyBhdHRyaWJ1dGVzIGJlY2F1c2UgSUUgZG9lcyBub3QgaW5mZXIgdGhlIHNob3J0aGFuZFxuICAgICAgICAgICAgLy8gZnJvbSBpZGVudGljYWxseS12YWx1ZWQgb3ZlcmZsb3dYIGFuZCBvdmVyZmxvd1kgYW5kIEVkZ2UganVzdCBtaXJyb3JzXG4gICAgICAgICAgICAvLyB0aGUgb3ZlcmZsb3dYIHZhbHVlIHRoZXJlLlxuICAgICAgICAgICAgb3B0cy5vdmVyZmxvdyA9IFsgc3R5bGUub3ZlcmZsb3csIHN0eWxlLm92ZXJmbG93WCwgc3R5bGUub3ZlcmZsb3dZIF07XG5cbiAgICAgICAgICAgIC8vIElkZW50aWZ5IGEgZGlzcGxheSB0eXBlLCBwcmVmZXJyaW5nIG9sZCBzaG93L2hpZGUgZGF0YSBvdmVyIHRoZSBDU1MgY2FzY2FkZVxuICAgICAgICAgICAgcmVzdG9yZURpc3BsYXkgPSBkYXRhU2hvdyAmJiBkYXRhU2hvdy5kaXNwbGF5O1xuICAgICAgICAgICAgaWYgKCByZXN0b3JlRGlzcGxheSA9PSBudWxsICkge1xuICAgICAgICAgICAgICAgIHJlc3RvcmVEaXNwbGF5ID0gZGF0YVByaXYuZ2V0KCBlbGVtLCBcImRpc3BsYXlcIiApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlzcGxheSA9IGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICk7XG4gICAgICAgICAgICBpZiAoIGRpc3BsYXkgPT09IFwibm9uZVwiICkge1xuICAgICAgICAgICAgICAgIGlmICggcmVzdG9yZURpc3BsYXkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgPSByZXN0b3JlRGlzcGxheTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCBub25lbXB0eSB2YWx1ZShzKSBieSB0ZW1wb3JhcmlseSBmb3JjaW5nIHZpc2liaWxpdHlcbiAgICAgICAgICAgICAgICAgICAgc2hvd0hpZGUoIFsgZWxlbSBdLCB0cnVlICk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3RvcmVEaXNwbGF5ID0gZWxlbS5zdHlsZS5kaXNwbGF5IHx8IHJlc3RvcmVEaXNwbGF5O1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKTtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0hpZGUoIFsgZWxlbSBdICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBbmltYXRlIGlubGluZSBlbGVtZW50cyBhcyBpbmxpbmUtYmxvY2tcbiAgICAgICAgICAgIGlmICggZGlzcGxheSA9PT0gXCJpbmxpbmVcIiB8fCBkaXNwbGF5ID09PSBcImlubGluZS1ibG9ja1wiICYmIHJlc3RvcmVEaXNwbGF5ICE9IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBqUXVlcnkuY3NzKCBlbGVtLCBcImZsb2F0XCIgKSA9PT0gXCJub25lXCIgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmVzdG9yZSB0aGUgb3JpZ2luYWwgZGlzcGxheSB2YWx1ZSBhdCB0aGUgZW5kIG9mIHB1cmUgc2hvdy9oaWRlIGFuaW1hdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhcHJvcFR3ZWVuICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbS5kb25lKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5kaXNwbGF5ID0gcmVzdG9yZURpc3BsYXk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHJlc3RvcmVEaXNwbGF5ID09IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheSA9IHN0eWxlLmRpc3BsYXk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdG9yZURpc3BsYXkgPSBkaXNwbGF5ID09PSBcIm5vbmVcIiA/IFwiXCIgOiBkaXNwbGF5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggb3B0cy5vdmVyZmxvdyApIHtcbiAgICAgICAgICAgIHN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgIGFuaW0uYWx3YXlzKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5vdmVyZmxvdyA9IG9wdHMub3ZlcmZsb3dbIDAgXTtcbiAgICAgICAgICAgICAgICBzdHlsZS5vdmVyZmxvd1ggPSBvcHRzLm92ZXJmbG93WyAxIF07XG4gICAgICAgICAgICAgICAgc3R5bGUub3ZlcmZsb3dZID0gb3B0cy5vdmVyZmxvd1sgMiBdO1xuICAgICAgICAgICAgfSApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW1wbGVtZW50IHNob3cvaGlkZSBhbmltYXRpb25zXG4gICAgICAgIHByb3BUd2VlbiA9IGZhbHNlO1xuICAgICAgICBmb3IgKCBwcm9wIGluIG9yaWcgKSB7XG5cbiAgICAgICAgICAgIC8vIEdlbmVyYWwgc2hvdy9oaWRlIHNldHVwIGZvciB0aGlzIGVsZW1lbnQgYW5pbWF0aW9uXG4gICAgICAgICAgICBpZiAoICFwcm9wVHdlZW4gKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBkYXRhU2hvdyApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBcImhpZGRlblwiIGluIGRhdGFTaG93ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuID0gZGF0YVNob3cuaGlkZGVuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNob3cgPSBkYXRhUHJpdi5hY2Nlc3MoIGVsZW0sIFwiZnhzaG93XCIsIHsgZGlzcGxheTogcmVzdG9yZURpc3BsYXkgfSApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFN0b3JlIGhpZGRlbi92aXNpYmxlIGZvciB0b2dnbGUgc28gYC5zdG9wKCkudG9nZ2xlKClgIFwicmV2ZXJzZXNcIlxuICAgICAgICAgICAgICAgIGlmICggdG9nZ2xlICkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhU2hvdy5oaWRkZW4gPSAhaGlkZGVuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFNob3cgZWxlbWVudHMgYmVmb3JlIGFuaW1hdGluZyB0aGVtXG4gICAgICAgICAgICAgICAgaWYgKCBoaWRkZW4gKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dIaWRlKCBbIGVsZW0gXSwgdHJ1ZSApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuXG4gICAgICAgICAgICAgICAgYW5pbS5kb25lKCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWxvb3AtZnVuYyAqL1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBmaW5hbCBzdGVwIG9mIGEgXCJoaWRlXCIgYW5pbWF0aW9uIGlzIGFjdHVhbGx5IGhpZGluZyB0aGUgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICBpZiAoICFoaWRkZW4gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93SGlkZSggWyBlbGVtIF0gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIFwiZnhzaG93XCIgKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICggcHJvcCBpbiBvcmlnICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LnN0eWxlKCBlbGVtLCBwcm9wLCBvcmlnWyBwcm9wIF0gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUGVyLXByb3BlcnR5IHNldHVwXG4gICAgICAgICAgICBwcm9wVHdlZW4gPSBjcmVhdGVUd2VlbiggaGlkZGVuID8gZGF0YVNob3dbIHByb3AgXSA6IDAsIHByb3AsIGFuaW0gKTtcbiAgICAgICAgICAgIGlmICggISggcHJvcCBpbiBkYXRhU2hvdyApICkge1xuICAgICAgICAgICAgICAgIGRhdGFTaG93WyBwcm9wIF0gPSBwcm9wVHdlZW4uc3RhcnQ7XG4gICAgICAgICAgICAgICAgaWYgKCBoaWRkZW4gKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BUd2Vlbi5lbmQgPSBwcm9wVHdlZW4uc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIHByb3BUd2Vlbi5zdGFydCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJvcEZpbHRlciggcHJvcHMsIHNwZWNpYWxFYXNpbmcgKSB7XG4gICAgICAgIHZhciBpbmRleCwgbmFtZSwgZWFzaW5nLCB2YWx1ZSwgaG9va3M7XG5cbiAgICAgICAgLy8gY2FtZWxDYXNlLCBzcGVjaWFsRWFzaW5nIGFuZCBleHBhbmQgY3NzSG9vayBwYXNzXG4gICAgICAgIGZvciAoIGluZGV4IGluIHByb3BzICkge1xuICAgICAgICAgICAgbmFtZSA9IGNhbWVsQ2FzZSggaW5kZXggKTtcbiAgICAgICAgICAgIGVhc2luZyA9IHNwZWNpYWxFYXNpbmdbIG5hbWUgXTtcbiAgICAgICAgICAgIHZhbHVlID0gcHJvcHNbIGluZGV4IF07XG4gICAgICAgICAgICBpZiAoIEFycmF5LmlzQXJyYXkoIHZhbHVlICkgKSB7XG4gICAgICAgICAgICAgICAgZWFzaW5nID0gdmFsdWVbIDEgXTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHByb3BzWyBpbmRleCBdID0gdmFsdWVbIDAgXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBpbmRleCAhPT0gbmFtZSApIHtcbiAgICAgICAgICAgICAgICBwcm9wc1sgbmFtZSBdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHByb3BzWyBpbmRleCBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdO1xuICAgICAgICAgICAgaWYgKCBob29rcyAmJiBcImV4cGFuZFwiIGluIGhvb2tzICkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gaG9va3MuZXhwYW5kKCB2YWx1ZSApO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBwcm9wc1sgbmFtZSBdO1xuXG4gICAgICAgICAgICAgICAgLy8gTm90IHF1aXRlICQuZXh0ZW5kLCB0aGlzIHdvbid0IG92ZXJ3cml0ZSBleGlzdGluZyBrZXlzLlxuICAgICAgICAgICAgICAgIC8vIFJldXNpbmcgJ2luZGV4JyBiZWNhdXNlIHdlIGhhdmUgdGhlIGNvcnJlY3QgXCJuYW1lXCJcbiAgICAgICAgICAgICAgICBmb3IgKCBpbmRleCBpbiB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhKCBpbmRleCBpbiBwcm9wcyApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHNbIGluZGV4IF0gPSB2YWx1ZVsgaW5kZXggXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpYWxFYXNpbmdbIGluZGV4IF0gPSBlYXNpbmc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNwZWNpYWxFYXNpbmdbIG5hbWUgXSA9IGVhc2luZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIEFuaW1hdGlvbiggZWxlbSwgcHJvcGVydGllcywgb3B0aW9ucyApIHtcbiAgICAgICAgdmFyIHJlc3VsdCxcbiAgICAgICAgICAgIHN0b3BwZWQsXG4gICAgICAgICAgICBpbmRleCA9IDAsXG4gICAgICAgICAgICBsZW5ndGggPSBBbmltYXRpb24ucHJlZmlsdGVycy5sZW5ndGgsXG4gICAgICAgICAgICBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLmFsd2F5cyggZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBEb24ndCBtYXRjaCBlbGVtIGluIHRoZSA6YW5pbWF0ZWQgc2VsZWN0b3JcbiAgICAgICAgICAgICAgICBkZWxldGUgdGljay5lbGVtO1xuICAgICAgICAgICAgfSApLFxuICAgICAgICAgICAgdGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICggc3RvcHBlZCApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFRpbWUgPSBmeE5vdyB8fCBjcmVhdGVGeE5vdygpLFxuICAgICAgICAgICAgICAgICAgICByZW1haW5pbmcgPSBNYXRoLm1heCggMCwgYW5pbWF0aW9uLnN0YXJ0VGltZSArIGFuaW1hdGlvbi5kdXJhdGlvbiAtIGN1cnJlbnRUaW1lICksXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogQW5kcm9pZCAyLjMgb25seVxuICAgICAgICAgICAgICAgICAgICAvLyBBcmNoYWljIGNyYXNoIGJ1ZyB3b24ndCBhbGxvdyB1cyB0byB1c2UgYDEgLSAoIDAuNSB8fCAwIClgICgjMTI0OTcpXG4gICAgICAgICAgICAgICAgICAgIHRlbXAgPSByZW1haW5pbmcgLyBhbmltYXRpb24uZHVyYXRpb24gfHwgMCxcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudCA9IDEgLSB0ZW1wLFxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDAsXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IGFuaW1hdGlvbi50d2VlbnMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgZm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLnR3ZWVuc1sgaW5kZXggXS5ydW4oIHBlcmNlbnQgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5ub3RpZnlXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiwgcGVyY2VudCwgcmVtYWluaW5nIF0gKTtcblxuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgbW9yZSB0byBkbywgeWllbGRcbiAgICAgICAgICAgICAgICBpZiAoIHBlcmNlbnQgPCAxICYmIGxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbWFpbmluZztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIHdhcyBhbiBlbXB0eSBhbmltYXRpb24sIHN5bnRoZXNpemUgYSBmaW5hbCBwcm9ncmVzcyBub3RpZmljYXRpb25cbiAgICAgICAgICAgICAgICBpZiAoICFsZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLm5vdGlmeVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCAxLCAwIF0gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIHRoZSBhbmltYXRpb24gYW5kIHJlcG9ydCBpdHMgY29uY2x1c2lvblxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiBdICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGlvbiA9IGRlZmVycmVkLnByb21pc2UoIHtcbiAgICAgICAgICAgICAgICBlbGVtOiBlbGVtLFxuICAgICAgICAgICAgICAgIHByb3BzOiBqUXVlcnkuZXh0ZW5kKCB7fSwgcHJvcGVydGllcyApLFxuICAgICAgICAgICAgICAgIG9wdHM6IGpRdWVyeS5leHRlbmQoIHRydWUsIHtcbiAgICAgICAgICAgICAgICAgICAgc3BlY2lhbEVhc2luZzoge30sXG4gICAgICAgICAgICAgICAgICAgIGVhc2luZzogalF1ZXJ5LmVhc2luZy5fZGVmYXVsdFxuICAgICAgICAgICAgICAgIH0sIG9wdGlvbnMgKSxcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFByb3BlcnRpZXM6IHByb3BlcnRpZXMsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxPcHRpb25zOiBvcHRpb25zLFxuICAgICAgICAgICAgICAgIHN0YXJ0VGltZTogZnhOb3cgfHwgY3JlYXRlRnhOb3coKSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbixcbiAgICAgICAgICAgICAgICB0d2VlbnM6IFtdLFxuICAgICAgICAgICAgICAgIGNyZWF0ZVR3ZWVuOiBmdW5jdGlvbiggcHJvcCwgZW5kICkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHdlZW4gPSBqUXVlcnkuVHdlZW4oIGVsZW0sIGFuaW1hdGlvbi5vcHRzLCBwcm9wLCBlbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24ub3B0cy5zcGVjaWFsRWFzaW5nWyBwcm9wIF0gfHwgYW5pbWF0aW9uLm9wdHMuZWFzaW5nICk7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi50d2VlbnMucHVzaCggdHdlZW4gKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR3ZWVuO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24oIGdvdG9FbmQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IDAsXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZSBnb2luZyB0byB0aGUgZW5kLCB3ZSB3YW50IHRvIHJ1biBhbGwgdGhlIHR3ZWVuc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIHdlIHNraXAgdGhpcyBwYXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBnb3RvRW5kID8gYW5pbWF0aW9uLnR3ZWVucy5sZW5ndGggOiAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHN0b3BwZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi50d2VlbnNbIGluZGV4IF0ucnVuKCAxICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIHdoZW4gd2UgcGxheWVkIHRoZSBsYXN0IGZyYW1lOyBvdGhlcndpc2UsIHJlamVjdFxuICAgICAgICAgICAgICAgICAgICBpZiAoIGdvdG9FbmQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5ub3RpZnlXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiwgMSwgMCBdICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCggZWxlbSwgWyBhbmltYXRpb24sIGdvdG9FbmQgXSApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0V2l0aCggZWxlbSwgWyBhbmltYXRpb24sIGdvdG9FbmQgXSApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gKSxcbiAgICAgICAgICAgIHByb3BzID0gYW5pbWF0aW9uLnByb3BzO1xuXG4gICAgICAgIHByb3BGaWx0ZXIoIHByb3BzLCBhbmltYXRpb24ub3B0cy5zcGVjaWFsRWFzaW5nICk7XG5cbiAgICAgICAgZm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IEFuaW1hdGlvbi5wcmVmaWx0ZXJzWyBpbmRleCBdLmNhbGwoIGFuaW1hdGlvbiwgZWxlbSwgcHJvcHMsIGFuaW1hdGlvbi5vcHRzICk7XG4gICAgICAgICAgICBpZiAoIHJlc3VsdCApIHtcbiAgICAgICAgICAgICAgICBpZiAoIGlzRnVuY3Rpb24oIHJlc3VsdC5zdG9wICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5fcXVldWVIb29rcyggYW5pbWF0aW9uLmVsZW0sIGFuaW1hdGlvbi5vcHRzLnF1ZXVlICkuc3RvcCA9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RvcC5iaW5kKCByZXN1bHQgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGpRdWVyeS5tYXAoIHByb3BzLCBjcmVhdGVUd2VlbiwgYW5pbWF0aW9uICk7XG5cbiAgICAgICAgaWYgKCBpc0Z1bmN0aW9uKCBhbmltYXRpb24ub3B0cy5zdGFydCApICkge1xuICAgICAgICAgICAgYW5pbWF0aW9uLm9wdHMuc3RhcnQuY2FsbCggZWxlbSwgYW5pbWF0aW9uICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBdHRhY2ggY2FsbGJhY2tzIGZyb20gb3B0aW9uc1xuICAgICAgICBhbmltYXRpb25cbiAgICAgICAgICAgIC5wcm9ncmVzcyggYW5pbWF0aW9uLm9wdHMucHJvZ3Jlc3MgKVxuICAgICAgICAgICAgLmRvbmUoIGFuaW1hdGlvbi5vcHRzLmRvbmUsIGFuaW1hdGlvbi5vcHRzLmNvbXBsZXRlIClcbiAgICAgICAgICAgIC5mYWlsKCBhbmltYXRpb24ub3B0cy5mYWlsIClcbiAgICAgICAgICAgIC5hbHdheXMoIGFuaW1hdGlvbi5vcHRzLmFsd2F5cyApO1xuXG4gICAgICAgIGpRdWVyeS5meC50aW1lcihcbiAgICAgICAgICAgIGpRdWVyeS5leHRlbmQoIHRpY2ssIHtcbiAgICAgICAgICAgICAgICBlbGVtOiBlbGVtLFxuICAgICAgICAgICAgICAgIGFuaW06IGFuaW1hdGlvbixcbiAgICAgICAgICAgICAgICBxdWV1ZTogYW5pbWF0aW9uLm9wdHMucXVldWVcbiAgICAgICAgICAgIH0gKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBhbmltYXRpb247XG4gICAgfVxuXG4gICAgalF1ZXJ5LkFuaW1hdGlvbiA9IGpRdWVyeS5leHRlbmQoIEFuaW1hdGlvbiwge1xuXG4gICAgICAgIHR3ZWVuZXJzOiB7XG4gICAgICAgICAgICBcIipcIjogWyBmdW5jdGlvbiggcHJvcCwgdmFsdWUgKSB7XG4gICAgICAgICAgICAgICAgdmFyIHR3ZWVuID0gdGhpcy5jcmVhdGVUd2VlbiggcHJvcCwgdmFsdWUgKTtcbiAgICAgICAgICAgICAgICBhZGp1c3RDU1MoIHR3ZWVuLmVsZW0sIHByb3AsIHJjc3NOdW0uZXhlYyggdmFsdWUgKSwgdHdlZW4gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHdlZW47XG4gICAgICAgICAgICB9IF1cbiAgICAgICAgfSxcblxuICAgICAgICB0d2VlbmVyOiBmdW5jdGlvbiggcHJvcHMsIGNhbGxiYWNrICkge1xuICAgICAgICAgICAgaWYgKCBpc0Z1bmN0aW9uKCBwcm9wcyApICkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gcHJvcHM7XG4gICAgICAgICAgICAgICAgcHJvcHMgPSBbIFwiKlwiIF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb3BzID0gcHJvcHMubWF0Y2goIHJub3RodG1sd2hpdGUgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHByb3AsXG4gICAgICAgICAgICAgICAgaW5kZXggPSAwLFxuICAgICAgICAgICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcbiAgICAgICAgICAgICAgICBwcm9wID0gcHJvcHNbIGluZGV4IF07XG4gICAgICAgICAgICAgICAgQW5pbWF0aW9uLnR3ZWVuZXJzWyBwcm9wIF0gPSBBbmltYXRpb24udHdlZW5lcnNbIHByb3AgXSB8fCBbXTtcbiAgICAgICAgICAgICAgICBBbmltYXRpb24udHdlZW5lcnNbIHByb3AgXS51bnNoaWZ0KCBjYWxsYmFjayApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHByZWZpbHRlcnM6IFsgZGVmYXVsdFByZWZpbHRlciBdLFxuXG4gICAgICAgIHByZWZpbHRlcjogZnVuY3Rpb24oIGNhbGxiYWNrLCBwcmVwZW5kICkge1xuICAgICAgICAgICAgaWYgKCBwcmVwZW5kICkge1xuICAgICAgICAgICAgICAgIEFuaW1hdGlvbi5wcmVmaWx0ZXJzLnVuc2hpZnQoIGNhbGxiYWNrICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIEFuaW1hdGlvbi5wcmVmaWx0ZXJzLnB1c2goIGNhbGxiYWNrICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9ICk7XG5cbiAgICBqUXVlcnkuc3BlZWQgPSBmdW5jdGlvbiggc3BlZWQsIGVhc2luZywgZm4gKSB7XG4gICAgICAgIHZhciBvcHQgPSBzcGVlZCAmJiB0eXBlb2Ygc3BlZWQgPT09IFwib2JqZWN0XCIgPyBqUXVlcnkuZXh0ZW5kKCB7fSwgc3BlZWQgKSA6IHtcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmbiB8fCAhZm4gJiYgZWFzaW5nIHx8XG4gICAgICAgICAgICBpc0Z1bmN0aW9uKCBzcGVlZCApICYmIHNwZWVkLFxuICAgICAgICAgICAgZHVyYXRpb246IHNwZWVkLFxuICAgICAgICAgICAgZWFzaW5nOiBmbiAmJiBlYXNpbmcgfHwgZWFzaW5nICYmICFpc0Z1bmN0aW9uKCBlYXNpbmcgKSAmJiBlYXNpbmdcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBHbyB0byB0aGUgZW5kIHN0YXRlIGlmIGZ4IGFyZSBvZmZcbiAgICAgICAgaWYgKCBqUXVlcnkuZngub2ZmICkge1xuICAgICAgICAgICAgb3B0LmR1cmF0aW9uID0gMDtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCB0eXBlb2Ygb3B0LmR1cmF0aW9uICE9PSBcIm51bWJlclwiICkge1xuICAgICAgICAgICAgICAgIGlmICggb3B0LmR1cmF0aW9uIGluIGpRdWVyeS5meC5zcGVlZHMgKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdC5kdXJhdGlvbiA9IGpRdWVyeS5meC5zcGVlZHNbIG9wdC5kdXJhdGlvbiBdO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0LmR1cmF0aW9uID0galF1ZXJ5LmZ4LnNwZWVkcy5fZGVmYXVsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOb3JtYWxpemUgb3B0LnF1ZXVlIC0gdHJ1ZS91bmRlZmluZWQvbnVsbCAtPiBcImZ4XCJcbiAgICAgICAgaWYgKCBvcHQucXVldWUgPT0gbnVsbCB8fCBvcHQucXVldWUgPT09IHRydWUgKSB7XG4gICAgICAgICAgICBvcHQucXVldWUgPSBcImZ4XCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBRdWV1ZWluZ1xuICAgICAgICBvcHQub2xkID0gb3B0LmNvbXBsZXRlO1xuXG4gICAgICAgIG9wdC5jb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCBpc0Z1bmN0aW9uKCBvcHQub2xkICkgKSB7XG4gICAgICAgICAgICAgICAgb3B0Lm9sZC5jYWxsKCB0aGlzICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggb3B0LnF1ZXVlICkge1xuICAgICAgICAgICAgICAgIGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCBvcHQucXVldWUgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gb3B0O1xuICAgIH07XG5cbiAgICBqUXVlcnkuZm4uZXh0ZW5kKCB7XG4gICAgICAgIGZhZGVUbzogZnVuY3Rpb24oIHNwZWVkLCB0bywgZWFzaW5nLCBjYWxsYmFjayApIHtcblxuICAgICAgICAgICAgLy8gU2hvdyBhbnkgaGlkZGVuIGVsZW1lbnRzIGFmdGVyIHNldHRpbmcgb3BhY2l0eSB0byAwXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIoIGlzSGlkZGVuV2l0aGluVHJlZSApLmNzcyggXCJvcGFjaXR5XCIsIDAgKS5zaG93KClcblxuICAgICAgICAgICAgLy8gQW5pbWF0ZSB0byB0aGUgdmFsdWUgc3BlY2lmaWVkXG4gICAgICAgICAgICAgICAgLmVuZCgpLmFuaW1hdGUoIHsgb3BhY2l0eTogdG8gfSwgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcbiAgICAgICAgfSxcbiAgICAgICAgYW5pbWF0ZTogZnVuY3Rpb24oIHByb3AsIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuICAgICAgICAgICAgdmFyIGVtcHR5ID0galF1ZXJ5LmlzRW1wdHlPYmplY3QoIHByb3AgKSxcbiAgICAgICAgICAgICAgICBvcHRhbGwgPSBqUXVlcnkuc3BlZWQoIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICksXG4gICAgICAgICAgICAgICAgZG9BbmltYXRpb24gPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBPcGVyYXRlIG9uIGEgY29weSBvZiBwcm9wIHNvIHBlci1wcm9wZXJ0eSBlYXNpbmcgd29uJ3QgYmUgbG9zdFxuICAgICAgICAgICAgICAgICAgICB2YXIgYW5pbSA9IEFuaW1hdGlvbiggdGhpcywgalF1ZXJ5LmV4dGVuZCgge30sIHByb3AgKSwgb3B0YWxsICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRW1wdHkgYW5pbWF0aW9ucywgb3IgZmluaXNoaW5nIHJlc29sdmVzIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICAgICAgICAgIGlmICggZW1wdHkgfHwgZGF0YVByaXYuZ2V0KCB0aGlzLCBcImZpbmlzaFwiICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltLnN0b3AoIHRydWUgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkb0FuaW1hdGlvbi5maW5pc2ggPSBkb0FuaW1hdGlvbjtcblxuICAgICAgICAgICAgcmV0dXJuIGVtcHR5IHx8IG9wdGFsbC5xdWV1ZSA9PT0gZmFsc2UgP1xuICAgICAgICAgICAgICAgIHRoaXMuZWFjaCggZG9BbmltYXRpb24gKSA6XG4gICAgICAgICAgICAgICAgdGhpcy5xdWV1ZSggb3B0YWxsLnF1ZXVlLCBkb0FuaW1hdGlvbiApO1xuICAgICAgICB9LFxuICAgICAgICBzdG9wOiBmdW5jdGlvbiggdHlwZSwgY2xlYXJRdWV1ZSwgZ290b0VuZCApIHtcbiAgICAgICAgICAgIHZhciBzdG9wUXVldWUgPSBmdW5jdGlvbiggaG9va3MgKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0b3AgPSBob29rcy5zdG9wO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBob29rcy5zdG9wO1xuICAgICAgICAgICAgICAgIHN0b3AoIGdvdG9FbmQgKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG4gICAgICAgICAgICAgICAgZ290b0VuZCA9IGNsZWFyUXVldWU7XG4gICAgICAgICAgICAgICAgY2xlYXJRdWV1ZSA9IHR5cGU7XG4gICAgICAgICAgICAgICAgdHlwZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICggY2xlYXJRdWV1ZSAmJiB0eXBlICE9PSBmYWxzZSApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlKCB0eXBlIHx8IFwiZnhcIiwgW10gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlcXVldWUgPSB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHR5cGUgIT0gbnVsbCAmJiB0eXBlICsgXCJxdWV1ZUhvb2tzXCIsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVycyA9IGpRdWVyeS50aW1lcnMsXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhUHJpdi5nZXQoIHRoaXMgKTtcblxuICAgICAgICAgICAgICAgIGlmICggaW5kZXggKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggZGF0YVsgaW5kZXggXSAmJiBkYXRhWyBpbmRleCBdLnN0b3AgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wUXVldWUoIGRhdGFbIGluZGV4IF0gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoIGluZGV4IGluIGRhdGEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGRhdGFbIGluZGV4IF0gJiYgZGF0YVsgaW5kZXggXS5zdG9wICYmIHJydW4udGVzdCggaW5kZXggKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wUXVldWUoIGRhdGFbIGluZGV4IF0gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAoIGluZGV4ID0gdGltZXJzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggdGltZXJzWyBpbmRleCBdLmVsZW0gPT09IHRoaXMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICggdHlwZSA9PSBudWxsIHx8IHRpbWVyc1sgaW5kZXggXS5xdWV1ZSA9PT0gdHlwZSApICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lcnNbIGluZGV4IF0uYW5pbS5zdG9wKCBnb3RvRW5kICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXF1ZXVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lcnMuc3BsaWNlKCBpbmRleCwgMSApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gU3RhcnQgdGhlIG5leHQgaW4gdGhlIHF1ZXVlIGlmIHRoZSBsYXN0IHN0ZXAgd2Fzbid0IGZvcmNlZC5cbiAgICAgICAgICAgICAgICAvLyBUaW1lcnMgY3VycmVudGx5IHdpbGwgY2FsbCB0aGVpciBjb21wbGV0ZSBjYWxsYmFja3MsIHdoaWNoXG4gICAgICAgICAgICAgICAgLy8gd2lsbCBkZXF1ZXVlIGJ1dCBvbmx5IGlmIHRoZXkgd2VyZSBnb3RvRW5kLlxuICAgICAgICAgICAgICAgIGlmICggZGVxdWV1ZSB8fCAhZ290b0VuZCApIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbmlzaDogZnVuY3Rpb24oIHR5cGUgKSB7XG4gICAgICAgICAgICBpZiAoIHR5cGUgIT09IGZhbHNlICkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGFQcml2LmdldCggdGhpcyApLFxuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IGRhdGFbIHR5cGUgKyBcInF1ZXVlXCIgXSxcbiAgICAgICAgICAgICAgICAgICAgaG9va3MgPSBkYXRhWyB0eXBlICsgXCJxdWV1ZUhvb2tzXCIgXSxcbiAgICAgICAgICAgICAgICAgICAgdGltZXJzID0galF1ZXJ5LnRpbWVycyxcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gcXVldWUgPyBxdWV1ZS5sZW5ndGggOiAwO1xuXG4gICAgICAgICAgICAgICAgLy8gRW5hYmxlIGZpbmlzaGluZyBmbGFnIG9uIHByaXZhdGUgZGF0YVxuICAgICAgICAgICAgICAgIGRhdGEuZmluaXNoID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8vIEVtcHR5IHRoZSBxdWV1ZSBmaXJzdFxuICAgICAgICAgICAgICAgIGpRdWVyeS5xdWV1ZSggdGhpcywgdHlwZSwgW10gKTtcblxuICAgICAgICAgICAgICAgIGlmICggaG9va3MgJiYgaG9va3Muc3RvcCApIHtcbiAgICAgICAgICAgICAgICAgICAgaG9va3Muc3RvcC5jYWxsKCB0aGlzLCB0cnVlICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gTG9vayBmb3IgYW55IGFjdGl2ZSBhbmltYXRpb25zLCBhbmQgZmluaXNoIHRoZW1cbiAgICAgICAgICAgICAgICBmb3IgKCBpbmRleCA9IHRpbWVycy5sZW5ndGg7IGluZGV4LS07ICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHRpbWVyc1sgaW5kZXggXS5lbGVtID09PSB0aGlzICYmIHRpbWVyc1sgaW5kZXggXS5xdWV1ZSA9PT0gdHlwZSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVyc1sgaW5kZXggXS5hbmltLnN0b3AoIHRydWUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVycy5zcGxpY2UoIGluZGV4LCAxICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBMb29rIGZvciBhbnkgYW5pbWF0aW9ucyBpbiB0aGUgb2xkIHF1ZXVlIGFuZCBmaW5pc2ggdGhlbVxuICAgICAgICAgICAgICAgIGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggcXVldWVbIGluZGV4IF0gJiYgcXVldWVbIGluZGV4IF0uZmluaXNoICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWVbIGluZGV4IF0uZmluaXNoLmNhbGwoIHRoaXMgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFR1cm4gb2ZmIGZpbmlzaGluZyBmbGFnXG4gICAgICAgICAgICAgICAgZGVsZXRlIGRhdGEuZmluaXNoO1xuICAgICAgICAgICAgfSApO1xuICAgICAgICB9XG4gICAgfSApO1xuXG4gICAgalF1ZXJ5LmVhY2goIFsgXCJ0b2dnbGVcIiwgXCJzaG93XCIsIFwiaGlkZVwiIF0sIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuICAgICAgICB2YXIgY3NzRm4gPSBqUXVlcnkuZm5bIG5hbWUgXTtcbiAgICAgICAgalF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSB7XG4gICAgICAgICAgICByZXR1cm4gc3BlZWQgPT0gbnVsbCB8fCB0eXBlb2Ygc3BlZWQgPT09IFwiYm9vbGVhblwiID9cbiAgICAgICAgICAgICAgICBjc3NGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICkgOlxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSggZ2VuRngoIG5hbWUsIHRydWUgKSwgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcbiAgICAgICAgfTtcbiAgICB9ICk7XG5cbi8vIEdlbmVyYXRlIHNob3J0Y3V0cyBmb3IgY3VzdG9tIGFuaW1hdGlvbnNcbiAgICBqUXVlcnkuZWFjaCgge1xuICAgICAgICBzbGlkZURvd246IGdlbkZ4KCBcInNob3dcIiApLFxuICAgICAgICBzbGlkZVVwOiBnZW5GeCggXCJoaWRlXCIgKSxcbiAgICAgICAgc2xpZGVUb2dnbGU6IGdlbkZ4KCBcInRvZ2dsZVwiICksXG4gICAgICAgIGZhZGVJbjogeyBvcGFjaXR5OiBcInNob3dcIiB9LFxuICAgICAgICBmYWRlT3V0OiB7IG9wYWNpdHk6IFwiaGlkZVwiIH0sXG4gICAgICAgIGZhZGVUb2dnbGU6IHsgb3BhY2l0eTogXCJ0b2dnbGVcIiB9XG4gICAgfSwgZnVuY3Rpb24oIG5hbWUsIHByb3BzICkge1xuICAgICAgICBqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGUoIHByb3BzLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuICAgICAgICB9O1xuICAgIH0gKTtcblxuICAgIGpRdWVyeS50aW1lcnMgPSBbXTtcbiAgICBqUXVlcnkuZngudGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGltZXIsXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIHRpbWVycyA9IGpRdWVyeS50aW1lcnM7XG5cbiAgICAgICAgZnhOb3cgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIGZvciAoIDsgaSA8IHRpbWVycy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIHRpbWVyID0gdGltZXJzWyBpIF07XG5cbiAgICAgICAgICAgIC8vIFJ1biB0aGUgdGltZXIgYW5kIHNhZmVseSByZW1vdmUgaXQgd2hlbiBkb25lIChhbGxvd2luZyBmb3IgZXh0ZXJuYWwgcmVtb3ZhbClcbiAgICAgICAgICAgIGlmICggIXRpbWVyKCkgJiYgdGltZXJzWyBpIF0gPT09IHRpbWVyICkge1xuICAgICAgICAgICAgICAgIHRpbWVycy5zcGxpY2UoIGktLSwgMSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAhdGltZXJzLmxlbmd0aCApIHtcbiAgICAgICAgICAgIGpRdWVyeS5meC5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgZnhOb3cgPSB1bmRlZmluZWQ7XG4gICAgfTtcblxuICAgIGpRdWVyeS5meC50aW1lciA9IGZ1bmN0aW9uKCB0aW1lciApIHtcbiAgICAgICAgalF1ZXJ5LnRpbWVycy5wdXNoKCB0aW1lciApO1xuICAgICAgICBqUXVlcnkuZnguc3RhcnQoKTtcbiAgICB9O1xuXG4gICAgalF1ZXJ5LmZ4LmludGVydmFsID0gMTM7XG4gICAgalF1ZXJ5LmZ4LnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggaW5Qcm9ncmVzcyApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICBzY2hlZHVsZSgpO1xuICAgIH07XG5cbiAgICBqUXVlcnkuZnguc3RvcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpblByb2dyZXNzID0gbnVsbDtcbiAgICB9O1xuXG4gICAgalF1ZXJ5LmZ4LnNwZWVkcyA9IHtcbiAgICAgICAgc2xvdzogNjAwLFxuICAgICAgICBmYXN0OiAyMDAsXG5cbiAgICAgICAgLy8gRGVmYXVsdCBzcGVlZFxuICAgICAgICBfZGVmYXVsdDogNDAwXG4gICAgfTtcblxuXG4vLyBCYXNlZCBvZmYgb2YgdGhlIHBsdWdpbiBieSBDbGludCBIZWxmZXJzLCB3aXRoIHBlcm1pc3Npb24uXG4vLyBodHRwczovL3dlYi5hcmNoaXZlLm9yZy93ZWIvMjAxMDAzMjQwMTQ3NDcvaHR0cDovL2JsaW5kc2lnbmFscy5jb20vaW5kZXgucGhwLzIwMDkvMDcvanF1ZXJ5LWRlbGF5L1xuICAgIGpRdWVyeS5mbi5kZWxheSA9IGZ1bmN0aW9uKCB0aW1lLCB0eXBlICkge1xuICAgICAgICB0aW1lID0galF1ZXJ5LmZ4ID8galF1ZXJ5LmZ4LnNwZWVkc1sgdGltZSBdIHx8IHRpbWUgOiB0aW1lO1xuICAgICAgICB0eXBlID0gdHlwZSB8fCBcImZ4XCI7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucXVldWUoIHR5cGUsIGZ1bmN0aW9uKCBuZXh0LCBob29rcyApIHtcbiAgICAgICAgICAgIHZhciB0aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoIG5leHQsIHRpbWUgKTtcbiAgICAgICAgICAgIGhvb2tzLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KCB0aW1lb3V0ICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9ICk7XG4gICAgfTtcblxuXG4gICAgKCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICksXG4gICAgICAgICAgICBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcInNlbGVjdFwiICksXG4gICAgICAgICAgICBvcHQgPSBzZWxlY3QuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwib3B0aW9uXCIgKSApO1xuXG4gICAgICAgIGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG5cbiAgICAgICAgLy8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMyBvbmx5XG4gICAgICAgIC8vIERlZmF1bHQgdmFsdWUgZm9yIGEgY2hlY2tib3ggc2hvdWxkIGJlIFwib25cIlxuICAgICAgICBzdXBwb3J0LmNoZWNrT24gPSBpbnB1dC52YWx1ZSAhPT0gXCJcIjtcblxuICAgICAgICAvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcbiAgICAgICAgLy8gTXVzdCBhY2Nlc3Mgc2VsZWN0ZWRJbmRleCB0byBtYWtlIGRlZmF1bHQgb3B0aW9ucyBzZWxlY3RcbiAgICAgICAgc3VwcG9ydC5vcHRTZWxlY3RlZCA9IG9wdC5zZWxlY3RlZDtcblxuICAgICAgICAvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcbiAgICAgICAgLy8gQW4gaW5wdXQgbG9zZXMgaXRzIHZhbHVlIGFmdGVyIGJlY29taW5nIGEgcmFkaW9cbiAgICAgICAgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKTtcbiAgICAgICAgaW5wdXQudmFsdWUgPSBcInRcIjtcbiAgICAgICAgaW5wdXQudHlwZSA9IFwicmFkaW9cIjtcbiAgICAgICAgc3VwcG9ydC5yYWRpb1ZhbHVlID0gaW5wdXQudmFsdWUgPT09IFwidFwiO1xuICAgIH0gKSgpO1xuXG5cbiAgICB2YXIgYm9vbEhvb2ssXG4gICAgICAgIGF0dHJIYW5kbGUgPSBqUXVlcnkuZXhwci5hdHRySGFuZGxlO1xuXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCgge1xuICAgICAgICBhdHRyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzKCB0aGlzLCBqUXVlcnkuYXR0ciwgbmFtZSwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlQXR0cjogZnVuY3Rpb24oIG5hbWUgKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBqUXVlcnkucmVtb3ZlQXR0ciggdGhpcywgbmFtZSApO1xuICAgICAgICAgICAgfSApO1xuICAgICAgICB9XG4gICAgfSApO1xuXG4gICAgalF1ZXJ5LmV4dGVuZCgge1xuICAgICAgICBhdHRyOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG4gICAgICAgICAgICB2YXIgcmV0LCBob29rcyxcbiAgICAgICAgICAgICAgICBuVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cbiAgICAgICAgICAgIC8vIERvbid0IGdldC9zZXQgYXR0cmlidXRlcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcbiAgICAgICAgICAgIGlmICggblR5cGUgPT09IDMgfHwgblR5cGUgPT09IDggfHwgblR5cGUgPT09IDIgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBGYWxsYmFjayB0byBwcm9wIHdoZW4gYXR0cmlidXRlcyBhcmUgbm90IHN1cHBvcnRlZFxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGUgPT09IFwidW5kZWZpbmVkXCIgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5wcm9wKCBlbGVtLCBuYW1lLCB2YWx1ZSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBdHRyaWJ1dGUgaG9va3MgYXJlIGRldGVybWluZWQgYnkgdGhlIGxvd2VyY2FzZSB2ZXJzaW9uXG4gICAgICAgICAgICAvLyBHcmFiIG5lY2Vzc2FyeSBob29rIGlmIG9uZSBpcyBkZWZpbmVkXG4gICAgICAgICAgICBpZiAoIG5UeXBlICE9PSAxIHx8ICFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIHtcbiAgICAgICAgICAgICAgICBob29rcyA9IGpRdWVyeS5hdHRySG9va3NbIG5hbWUudG9Mb3dlckNhc2UoKSBdIHx8XG4gICAgICAgICAgICAgICAgICAgICggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC50ZXN0KCBuYW1lICkgPyBib29sSG9vayA6IHVuZGVmaW5lZCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LnJlbW92ZUF0dHIoIGVsZW0sIG5hbWUgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICggaG9va3MgJiYgXCJzZXRcIiBpbiBob29rcyAmJlxuICAgICAgICAgICAgICAgICAgICAoIHJldCA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKSApICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIHZhbHVlICsgXCJcIiApO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmICggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBuYW1lICkgKSAhPT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXQgPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBuYW1lICk7XG5cbiAgICAgICAgICAgIC8vIE5vbi1leGlzdGVudCBhdHRyaWJ1dGVzIHJldHVybiBudWxsLCB3ZSBub3JtYWxpemUgdG8gdW5kZWZpbmVkXG4gICAgICAgICAgICByZXR1cm4gcmV0ID09IG51bGwgPyB1bmRlZmluZWQgOiByZXQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYXR0ckhvb2tzOiB7XG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggIXN1cHBvcnQucmFkaW9WYWx1ZSAmJiB2YWx1ZSA9PT0gXCJyYWRpb1wiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlTmFtZSggZWxlbSwgXCJpbnB1dFwiICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0gZWxlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgdmFsdWUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdmFsICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0udmFsdWUgPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlQXR0cjogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuICAgICAgICAgICAgdmFyIG5hbWUsXG4gICAgICAgICAgICAgICAgaSA9IDAsXG5cbiAgICAgICAgICAgICAgICAvLyBBdHRyaWJ1dGUgbmFtZXMgY2FuIGNvbnRhaW4gbm9uLUhUTUwgd2hpdGVzcGFjZSBjaGFyYWN0ZXJzXG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjYXR0cmlidXRlcy0yXG4gICAgICAgICAgICAgICAgYXR0ck5hbWVzID0gdmFsdWUgJiYgdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKTtcblxuICAgICAgICAgICAgaWYgKCBhdHRyTmFtZXMgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoICggbmFtZSA9IGF0dHJOYW1lc1sgaSsrIF0gKSApIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoIG5hbWUgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9ICk7XG5cbi8vIEhvb2tzIGZvciBib29sZWFuIGF0dHJpYnV0ZXNcbiAgICBib29sSG9vayA9IHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIG5hbWUgKSB7XG4gICAgICAgICAgICBpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcblxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBib29sZWFuIGF0dHJpYnV0ZXMgd2hlbiBzZXQgdG8gZmFsc2VcbiAgICAgICAgICAgICAgICBqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSggbmFtZSwgbmFtZSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgalF1ZXJ5LmVhY2goIGpRdWVyeS5leHByLm1hdGNoLmJvb2wuc291cmNlLm1hdGNoKCAvXFx3Ky9nICksIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuICAgICAgICB2YXIgZ2V0dGVyID0gYXR0ckhhbmRsZVsgbmFtZSBdIHx8IGpRdWVyeS5maW5kLmF0dHI7XG5cbiAgICAgICAgYXR0ckhhbmRsZVsgbmFtZSBdID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuICAgICAgICAgICAgdmFyIHJldCwgaGFuZGxlLFxuICAgICAgICAgICAgICAgIGxvd2VyY2FzZU5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmICggIWlzWE1MICkge1xuXG4gICAgICAgICAgICAgICAgLy8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcCBieSB0ZW1wb3JhcmlseSByZW1vdmluZyB0aGlzIGZ1bmN0aW9uIGZyb20gdGhlIGdldHRlclxuICAgICAgICAgICAgICAgIGhhbmRsZSA9IGF0dHJIYW5kbGVbIGxvd2VyY2FzZU5hbWUgXTtcbiAgICAgICAgICAgICAgICBhdHRySGFuZGxlWyBsb3dlcmNhc2VOYW1lIF0gPSByZXQ7XG4gICAgICAgICAgICAgICAgcmV0ID0gZ2V0dGVyKCBlbGVtLCBuYW1lLCBpc1hNTCApICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBsb3dlcmNhc2VOYW1lIDpcbiAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgICAgICAgICAgICAgICBhdHRySGFuZGxlWyBsb3dlcmNhc2VOYW1lIF0gPSBoYW5kbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9O1xuICAgIH0gKTtcblxuXG5cblxuICAgIHZhciByZm9jdXNhYmxlID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8YnV0dG9uKSQvaSxcbiAgICAgICAgcmNsaWNrYWJsZSA9IC9eKD86YXxhcmVhKSQvaTtcblxuICAgIGpRdWVyeS5mbi5leHRlbmQoIHtcbiAgICAgICAgcHJvcDogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuICAgICAgICAgICAgcmV0dXJuIGFjY2VzcyggdGhpcywgalF1ZXJ5LnByb3AsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZVByb3A6IGZ1bmN0aW9uKCBuYW1lICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXNbIGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZSBdO1xuICAgICAgICAgICAgfSApO1xuICAgICAgICB9XG4gICAgfSApO1xuXG4gICAgalF1ZXJ5LmV4dGVuZCgge1xuICAgICAgICBwcm9wOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG4gICAgICAgICAgICB2YXIgcmV0LCBob29rcyxcbiAgICAgICAgICAgICAgICBuVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cbiAgICAgICAgICAgIC8vIERvbid0IGdldC9zZXQgcHJvcGVydGllcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcbiAgICAgICAgICAgIGlmICggblR5cGUgPT09IDMgfHwgblR5cGUgPT09IDggfHwgblR5cGUgPT09IDIgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIG5UeXBlICE9PSAxIHx8ICFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIHtcblxuICAgICAgICAgICAgICAgIC8vIEZpeCBuYW1lIGFuZCBhdHRhY2ggaG9va3NcbiAgICAgICAgICAgICAgICBuYW1lID0galF1ZXJ5LnByb3BGaXhbIG5hbWUgXSB8fCBuYW1lO1xuICAgICAgICAgICAgICAgIGhvb2tzID0galF1ZXJ5LnByb3BIb29rc1sgbmFtZSBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBob29rcyAmJiBcInNldFwiIGluIGhvb2tzICYmXG4gICAgICAgICAgICAgICAgICAgICggcmV0ID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgbmFtZSApICkgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKCBlbGVtWyBuYW1lIF0gPSB2YWx1ZSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKCByZXQgPSBob29rcy5nZXQoIGVsZW0sIG5hbWUgKSApICE9PSBudWxsICkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBlbGVtWyBuYW1lIF07XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJvcEhvb2tzOiB7XG4gICAgICAgICAgICB0YWJJbmRleDoge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUUgPD05IC0gMTEgb25seVxuICAgICAgICAgICAgICAgICAgICAvLyBlbGVtLnRhYkluZGV4IGRvZXNuJ3QgYWx3YXlzIHJldHVybiB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gY29ycmVjdCB2YWx1ZSB3aGVuIGl0IGhhc24ndCBiZWVuIGV4cGxpY2l0bHkgc2V0XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vd2ViLmFyY2hpdmUub3JnL3dlYi8yMDE0MTExNjIzMzM0Ny9odHRwOi8vZmx1aWRwcm9qZWN0Lm9yZy9ibG9nLzIwMDgvMDEvMDkvZ2V0dGluZy1zZXR0aW5nLWFuZC1yZW1vdmluZy10YWJpbmRleC12YWx1ZXMtd2l0aC1qYXZhc2NyaXB0L1xuICAgICAgICAgICAgICAgICAgICAvLyBVc2UgcHJvcGVyIGF0dHJpYnV0ZSByZXRyaWV2YWwoIzEyMDcyKVxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFiaW5kZXggPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInRhYmluZGV4XCIgKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIHRhYmluZGV4ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KCB0YWJpbmRleCwgMTAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHJmb2N1c2FibGUudGVzdCggZWxlbS5ub2RlTmFtZSApIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICByY2xpY2thYmxlLnRlc3QoIGVsZW0ubm9kZU5hbWUgKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5ocmVmXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHByb3BGaXg6IHtcbiAgICAgICAgICAgIFwiZm9yXCI6IFwiaHRtbEZvclwiLFxuICAgICAgICAgICAgXCJjbGFzc1wiOiBcImNsYXNzTmFtZVwiXG4gICAgICAgIH1cbiAgICB9ICk7XG5cbi8vIFN1cHBvcnQ6IElFIDw9MTEgb25seVxuLy8gQWNjZXNzaW5nIHRoZSBzZWxlY3RlZEluZGV4IHByb3BlcnR5XG4vLyBmb3JjZXMgdGhlIGJyb3dzZXIgdG8gcmVzcGVjdCBzZXR0aW5nIHNlbGVjdGVkXG4vLyBvbiB0aGUgb3B0aW9uXG4vLyBUaGUgZ2V0dGVyIGVuc3VyZXMgYSBkZWZhdWx0IG9wdGlvbiBpcyBzZWxlY3RlZFxuLy8gd2hlbiBpbiBhbiBvcHRncm91cFxuLy8gZXNsaW50IHJ1bGUgXCJuby11bnVzZWQtZXhwcmVzc2lvbnNcIiBpcyBkaXNhYmxlZCBmb3IgdGhpcyBjb2RlXG4vLyBzaW5jZSBpdCBjb25zaWRlcnMgc3VjaCBhY2Nlc3Npb25zIG5vb3BcbiAgICBpZiAoICFzdXBwb3J0Lm9wdFNlbGVjdGVkICkge1xuICAgICAgICBqUXVlcnkucHJvcEhvb2tzLnNlbGVjdGVkID0ge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblxuICAgICAgICAgICAgICAgIC8qIGVzbGludCBuby11bnVzZWQtZXhwcmVzc2lvbnM6IFwib2ZmXCIgKi9cblxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgaWYgKCBwYXJlbnQgJiYgcGFyZW50LnBhcmVudE5vZGUgKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cbiAgICAgICAgICAgICAgICAvKiBlc2xpbnQgbm8tdW51c2VkLWV4cHJlc3Npb25zOiBcIm9mZlwiICovXG5cbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIGlmICggcGFyZW50ICkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQuc2VsZWN0ZWRJbmRleDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIHBhcmVudC5wYXJlbnROb2RlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50LnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBqUXVlcnkuZWFjaCggW1xuICAgICAgICBcInRhYkluZGV4XCIsXG4gICAgICAgIFwicmVhZE9ubHlcIixcbiAgICAgICAgXCJtYXhMZW5ndGhcIixcbiAgICAgICAgXCJjZWxsU3BhY2luZ1wiLFxuICAgICAgICBcImNlbGxQYWRkaW5nXCIsXG4gICAgICAgIFwicm93U3BhblwiLFxuICAgICAgICBcImNvbFNwYW5cIixcbiAgICAgICAgXCJ1c2VNYXBcIixcbiAgICAgICAgXCJmcmFtZUJvcmRlclwiLFxuICAgICAgICBcImNvbnRlbnRFZGl0YWJsZVwiXG4gICAgXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeS5wcm9wRml4WyB0aGlzLnRvTG93ZXJDYXNlKCkgXSA9IHRoaXM7XG4gICAgfSApO1xuXG5cblxuXG4gICAgLy8gU3RyaXAgYW5kIGNvbGxhcHNlIHdoaXRlc3BhY2UgYWNjb3JkaW5nIHRvIEhUTUwgc3BlY1xuICAgIC8vIGh0dHBzOi8vaW5mcmEuc3BlYy53aGF0d2cub3JnLyNzdHJpcC1hbmQtY29sbGFwc2UtYXNjaWktd2hpdGVzcGFjZVxuICAgIGZ1bmN0aW9uIHN0cmlwQW5kQ29sbGFwc2UoIHZhbHVlICkge1xuICAgICAgICB2YXIgdG9rZW5zID0gdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXTtcbiAgICAgICAgcmV0dXJuIHRva2Vucy5qb2luKCBcIiBcIiApO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gZ2V0Q2xhc3MoIGVsZW0gKSB7XG4gICAgICAgIHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSAmJiBlbGVtLmdldEF0dHJpYnV0ZSggXCJjbGFzc1wiICkgfHwgXCJcIjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGFzc2VzVG9BcnJheSggdmFsdWUgKSB7XG4gICAgICAgIGlmICggQXJyYXkuaXNBcnJheSggdmFsdWUgKSApIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBqUXVlcnkuZm4uZXh0ZW5kKCB7XG4gICAgICAgIGFkZENsYXNzOiBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgICAgICAgICB2YXIgY2xhc3NlcywgZWxlbSwgY3VyLCBjdXJWYWx1ZSwgY2xhenosIGosIGZpbmFsVmFsdWUsXG4gICAgICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgICAgIGlmICggaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaiApIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCB0aGlzICkuYWRkQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIGdldENsYXNzKCB0aGlzICkgKSApO1xuICAgICAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXNUb0FycmF5KCB2YWx1ZSApO1xuXG4gICAgICAgICAgICBpZiAoIGNsYXNzZXMubGVuZ3RoICkge1xuICAgICAgICAgICAgICAgIHdoaWxlICggKCBlbGVtID0gdGhpc1sgaSsrIF0gKSApIHtcbiAgICAgICAgICAgICAgICAgICAgY3VyVmFsdWUgPSBnZXRDbGFzcyggZWxlbSApO1xuICAgICAgICAgICAgICAgICAgICBjdXIgPSBlbGVtLm5vZGVUeXBlID09PSAxICYmICggXCIgXCIgKyBzdHJpcEFuZENvbGxhcHNlKCBjdXJWYWx1ZSApICsgXCIgXCIgKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIGN1ciApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCAoIGNsYXp6ID0gY2xhc3Nlc1sgaisrIF0gKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGN1ci5pbmRleE9mKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIgKSA8IDAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ciArPSBjbGF6eiArIFwiIFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT25seSBhc3NpZ24gaWYgZGlmZmVyZW50IHRvIGF2b2lkIHVubmVlZGVkIHJlbmRlcmluZy5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsVmFsdWUgPSBzdHJpcEFuZENvbGxhcHNlKCBjdXIgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggY3VyVmFsdWUgIT09IGZpbmFsVmFsdWUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiwgZmluYWxWYWx1ZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVDbGFzczogZnVuY3Rpb24oIHZhbHVlICkge1xuICAgICAgICAgICAgdmFyIGNsYXNzZXMsIGVsZW0sIGN1ciwgY3VyVmFsdWUsIGNsYXp6LCBqLCBmaW5hbFZhbHVlLFxuICAgICAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgICAgICBpZiAoIGlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGogKSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSggdGhpcyApLnJlbW92ZUNsYXNzKCB2YWx1ZS5jYWxsKCB0aGlzLCBqLCBnZXRDbGFzcyggdGhpcyApICkgKTtcbiAgICAgICAgICAgICAgICB9ICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXR0ciggXCJjbGFzc1wiLCBcIlwiICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzVG9BcnJheSggdmFsdWUgKTtcblxuICAgICAgICAgICAgaWYgKCBjbGFzc2VzLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoICggZWxlbSA9IHRoaXNbIGkrKyBdICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1clZhbHVlID0gZ2V0Q2xhc3MoIGVsZW0gKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGV4cHJlc3Npb24gaXMgaGVyZSBmb3IgYmV0dGVyIGNvbXByZXNzaWJpbGl0eSAoc2VlIGFkZENsYXNzKVxuICAgICAgICAgICAgICAgICAgICBjdXIgPSBlbGVtLm5vZGVUeXBlID09PSAxICYmICggXCIgXCIgKyBzdHJpcEFuZENvbGxhcHNlKCBjdXJWYWx1ZSApICsgXCIgXCIgKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIGN1ciApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCAoIGNsYXp6ID0gY2xhc3Nlc1sgaisrIF0gKSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSAqYWxsKiBpbnN0YW5jZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIGN1ci5pbmRleE9mKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIgKSA+IC0xICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXIgPSBjdXIucmVwbGFjZSggXCIgXCIgKyBjbGF6eiArIFwiIFwiLCBcIiBcIiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT25seSBhc3NpZ24gaWYgZGlmZmVyZW50IHRvIGF2b2lkIHVubmVlZGVkIHJlbmRlcmluZy5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsVmFsdWUgPSBzdHJpcEFuZENvbGxhcHNlKCBjdXIgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggY3VyVmFsdWUgIT09IGZpbmFsVmFsdWUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiwgZmluYWxWYWx1ZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICB0b2dnbGVDbGFzczogZnVuY3Rpb24oIHZhbHVlLCBzdGF0ZVZhbCApIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlLFxuICAgICAgICAgICAgICAgIGlzVmFsaWRWYWx1ZSA9IHR5cGUgPT09IFwic3RyaW5nXCIgfHwgQXJyYXkuaXNBcnJheSggdmFsdWUgKTtcblxuICAgICAgICAgICAgaWYgKCB0eXBlb2Ygc3RhdGVWYWwgPT09IFwiYm9vbGVhblwiICYmIGlzVmFsaWRWYWx1ZSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGVWYWwgPyB0aGlzLmFkZENsYXNzKCB2YWx1ZSApIDogdGhpcy5yZW1vdmVDbGFzcyggdmFsdWUgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBpc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoIHRoaXMgKS50b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLmNhbGwoIHRoaXMsIGksIGdldENsYXNzKCB0aGlzICksIHN0YXRlVmFsICksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZVZhbFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSwgaSwgc2VsZiwgY2xhc3NOYW1lcztcblxuICAgICAgICAgICAgICAgIGlmICggaXNWYWxpZFZhbHVlICkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRvZ2dsZSBpbmRpdmlkdWFsIGNsYXNzIG5hbWVzXG4gICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAgICAgICBzZWxmID0galF1ZXJ5KCB0aGlzICk7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXMgPSBjbGFzc2VzVG9BcnJheSggdmFsdWUgKTtcblxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoICggY2xhc3NOYW1lID0gY2xhc3NOYW1lc1sgaSsrIF0gKSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgZWFjaCBjbGFzc05hbWUgZ2l2ZW4sIHNwYWNlIHNlcGFyYXRlZCBsaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHNlbGYuaGFzQ2xhc3MoIGNsYXNzTmFtZSApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoIGNsYXNzTmFtZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkZENsYXNzKCBjbGFzc05hbWUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRvZ2dsZSB3aG9sZSBjbGFzcyBuYW1lXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0eXBlID09PSBcImJvb2xlYW5cIiApIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gZ2V0Q2xhc3MoIHRoaXMgKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBjbGFzc05hbWUgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0b3JlIGNsYXNzTmFtZSBpZiBzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFQcml2LnNldCggdGhpcywgXCJfX2NsYXNzTmFtZV9fXCIsIGNsYXNzTmFtZSApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGVsZW1lbnQgaGFzIGEgY2xhc3MgbmFtZSBvciBpZiB3ZSdyZSBwYXNzZWQgYGZhbHNlYCxcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlbiByZW1vdmUgdGhlIHdob2xlIGNsYXNzbmFtZSAoaWYgdGhlcmUgd2FzIG9uZSwgdGhlIGFib3ZlIHNhdmVkIGl0KS5cbiAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGJyaW5nIGJhY2sgd2hhdGV2ZXIgd2FzIHByZXZpb3VzbHkgc2F2ZWQgKGlmIGFueXRoaW5nKSxcbiAgICAgICAgICAgICAgICAgICAgLy8gZmFsbGluZyBiYWNrIHRvIHRoZSBlbXB0eSBzdHJpbmcgaWYgbm90aGluZyB3YXMgc3RvcmVkLlxuICAgICAgICAgICAgICAgICAgICBpZiAoIHRoaXMuc2V0QXR0cmlidXRlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgfHwgdmFsdWUgPT09IGZhbHNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIiA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFQcml2LmdldCggdGhpcywgXCJfX2NsYXNzTmFtZV9fXCIgKSB8fCBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSApO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhc0NsYXNzOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gICAgICAgICAgICB2YXIgY2xhc3NOYW1lLCBlbGVtLFxuICAgICAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgICAgICBjbGFzc05hbWUgPSBcIiBcIiArIHNlbGVjdG9yICsgXCIgXCI7XG4gICAgICAgICAgICB3aGlsZSAoICggZWxlbSA9IHRoaXNbIGkrKyBdICkgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmXG4gICAgICAgICAgICAgICAgICAgICggXCIgXCIgKyBzdHJpcEFuZENvbGxhcHNlKCBnZXRDbGFzcyggZWxlbSApICkgKyBcIiBcIiApLmluZGV4T2YoIGNsYXNzTmFtZSApID4gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSApO1xuXG5cblxuXG4gICAgdmFyIHJyZXR1cm4gPSAvXFxyL2c7XG5cbiAgICBqUXVlcnkuZm4uZXh0ZW5kKCB7XG4gICAgICAgIHZhbDogZnVuY3Rpb24oIHZhbHVlICkge1xuICAgICAgICAgICAgdmFyIGhvb2tzLCByZXQsIHZhbHVlSXNGdW5jdGlvbixcbiAgICAgICAgICAgICAgICBlbGVtID0gdGhpc1sgMCBdO1xuXG4gICAgICAgICAgICBpZiAoICFhcmd1bWVudHMubGVuZ3RoICkge1xuICAgICAgICAgICAgICAgIGlmICggZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgaG9va3MgPSBqUXVlcnkudmFsSG9va3NbIGVsZW0udHlwZSBdIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkudmFsSG9va3NbIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSBdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggaG9va3MgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZ2V0XCIgaW4gaG9va3MgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBcInZhbHVlXCIgKSApICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gZWxlbS52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgbW9zdCBjb21tb24gc3RyaW5nIGNhc2VzXG4gICAgICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIHJldCA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQucmVwbGFjZSggcnJldHVybiwgXCJcIiApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSGFuZGxlIGNhc2VzIHdoZXJlIHZhbHVlIGlzIG51bGwvdW5kZWYgb3IgbnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQgPT0gbnVsbCA/IFwiXCIgOiByZXQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YWx1ZUlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uKCB2YWx1ZSApO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLm5vZGVUeXBlICE9PSAxICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCB2YWx1ZUlzRnVuY3Rpb24gKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbHVlLmNhbGwoIHRoaXMsIGksIGpRdWVyeSggdGhpcyApLnZhbCgpICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gVHJlYXQgbnVsbC91bmRlZmluZWQgYXMgXCJcIjsgY29udmVydCBudW1iZXJzIHRvIHN0cmluZ1xuICAgICAgICAgICAgICAgIGlmICggdmFsID09IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiICkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgKz0gXCJcIjtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIEFycmF5LmlzQXJyYXkoIHZhbCApICkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSBqUXVlcnkubWFwKCB2YWwsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlICsgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgfSApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGhvb2tzID0galF1ZXJ5LnZhbEhvb2tzWyB0aGlzLnR5cGUgXSB8fCBqUXVlcnkudmFsSG9va3NbIHRoaXMubm9kZU5hbWUudG9Mb3dlckNhc2UoKSBdO1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgc2V0IHJldHVybnMgdW5kZWZpbmVkLCBmYWxsIGJhY2sgdG8gbm9ybWFsIHNldHRpbmdcbiAgICAgICAgICAgICAgICBpZiAoICFob29rcyB8fCAhKCBcInNldFwiIGluIGhvb2tzICkgfHwgaG9va3Muc2V0KCB0aGlzLCB2YWwsIFwidmFsdWVcIiApID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSApO1xuICAgICAgICB9XG4gICAgfSApO1xuXG4gICAgalF1ZXJ5LmV4dGVuZCgge1xuICAgICAgICB2YWxIb29rczoge1xuICAgICAgICAgICAgb3B0aW9uOiB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgXCJ2YWx1ZVwiICk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRSA8PTEwIC0gMTEgb25seVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3B0aW9uLnRleHQgdGhyb3dzIGV4Y2VwdGlvbnMgKCMxNDY4NiwgIzE0ODU4KVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RyaXAgYW5kIGNvbGxhcHNlIHdoaXRlc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvI3N0cmlwLWFuZC1jb2xsYXBzZS13aGl0ZXNwYWNlXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpcEFuZENvbGxhcHNlKCBqUXVlcnkudGV4dCggZWxlbSApICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSwgb3B0aW9uLCBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IGVsZW0ub3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gZWxlbS5zZWxlY3RlZEluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgb25lID0gZWxlbS50eXBlID09PSBcInNlbGVjdC1vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcyA9IG9uZSA/IG51bGwgOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heCA9IG9uZSA/IGluZGV4ICsgMSA6IG9wdGlvbnMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggaW5kZXggPCAwICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IG1heDtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IG9uZSA/IGluZGV4IDogMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIExvb3AgdGhyb3VnaCBhbGwgdGhlIHNlbGVjdGVkIG9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgZm9yICggOyBpIDwgbWF4OyBpKysgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSBvcHRpb25zWyBpIF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJRTgtOSBkb2Vzbid0IHVwZGF0ZSBzZWxlY3RlZCBhZnRlciBmb3JtIHJlc2V0ICgjMjU1MSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggKCBvcHRpb24uc2VsZWN0ZWQgfHwgaSA9PT0gaW5kZXggKSAmJlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgcmV0dXJuIG9wdGlvbnMgdGhhdCBhcmUgZGlzYWJsZWQgb3IgaW4gYSBkaXNhYmxlZCBvcHRncm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFvcHRpb24uZGlzYWJsZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoICFvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhbm9kZU5hbWUoIG9wdGlvbi5wYXJlbnROb2RlLCBcIm9wdGdyb3VwXCIgKSApICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBzcGVjaWZpYyB2YWx1ZSBmb3IgdGhlIG9wdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0galF1ZXJ5KCBvcHRpb24gKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgYW4gYXJyYXkgZm9yIG9uZSBzZWxlY3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBvbmUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNdWx0aS1TZWxlY3RzIHJldHVybiBhbiBhcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKCB2YWx1ZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb25TZXQsIG9wdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSBqUXVlcnkubWFrZUFycmF5KCB2YWx1ZSApLFxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IG9wdGlvbnMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gb3B0aW9uc1sgaSBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG9wdGlvbi5zZWxlY3RlZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5pbkFycmF5KCBqUXVlcnkudmFsSG9va3Mub3B0aW9uLmdldCggb3B0aW9uICksIHZhbHVlcyApID4gLTFcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvblNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29uZC1hc3NpZ24gKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEZvcmNlIGJyb3dzZXJzIHRvIGJlaGF2ZSBjb25zaXN0ZW50bHkgd2hlbiBub24tbWF0Y2hpbmcgdmFsdWUgaXMgc2V0XG4gICAgICAgICAgICAgICAgICAgIGlmICggIW9wdGlvblNldCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc2VsZWN0ZWRJbmRleCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSApO1xuXG4vLyBSYWRpb3MgYW5kIGNoZWNrYm94ZXMgZ2V0dGVyL3NldHRlclxuICAgIGpRdWVyeS5lYWNoKCBbIFwicmFkaW9cIiwgXCJjaGVja2JveFwiIF0sIGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkudmFsSG9va3NbIHRoaXMgXSA9IHtcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuICAgICAgICAgICAgICAgIGlmICggQXJyYXkuaXNBcnJheSggdmFsdWUgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICggZWxlbS5jaGVja2VkID0galF1ZXJ5LmluQXJyYXkoIGpRdWVyeSggZWxlbSApLnZhbCgpLCB2YWx1ZSApID4gLTEgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmICggIXN1cHBvcnQuY2hlY2tPbiApIHtcbiAgICAgICAgICAgIGpRdWVyeS52YWxIb29rc1sgdGhpcyBdLmdldCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiICkgPT09IG51bGwgPyBcIm9uXCIgOiBlbGVtLnZhbHVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0gKTtcblxuXG5cblxuLy8gUmV0dXJuIGpRdWVyeSBmb3IgYXR0cmlidXRlcy1vbmx5IGluY2x1c2lvblxuXG5cbiAgICBzdXBwb3J0LmZvY3VzaW4gPSBcIm9uZm9jdXNpblwiIGluIHdpbmRvdztcblxuXG4gICAgdmFyIHJmb2N1c01vcnBoID0gL14oPzpmb2N1c2luZm9jdXN8Zm9jdXNvdXRibHVyKSQvLFxuICAgICAgICBzdG9wUHJvcGFnYXRpb25DYWxsYmFjayA9IGZ1bmN0aW9uKCBlICkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfTtcblxuICAgIGpRdWVyeS5leHRlbmQoIGpRdWVyeS5ldmVudCwge1xuXG4gICAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uKCBldmVudCwgZGF0YSwgZWxlbSwgb25seUhhbmRsZXJzICkge1xuXG4gICAgICAgICAgICB2YXIgaSwgY3VyLCB0bXAsIGJ1YmJsZVR5cGUsIG9udHlwZSwgaGFuZGxlLCBzcGVjaWFsLCBsYXN0RWxlbWVudCxcbiAgICAgICAgICAgICAgICBldmVudFBhdGggPSBbIGVsZW0gfHwgZG9jdW1lbnQgXSxcbiAgICAgICAgICAgICAgICB0eXBlID0gaGFzT3duLmNhbGwoIGV2ZW50LCBcInR5cGVcIiApID8gZXZlbnQudHlwZSA6IGV2ZW50LFxuICAgICAgICAgICAgICAgIG5hbWVzcGFjZXMgPSBoYXNPd24uY2FsbCggZXZlbnQsIFwibmFtZXNwYWNlXCIgKSA/IGV2ZW50Lm5hbWVzcGFjZS5zcGxpdCggXCIuXCIgKSA6IFtdO1xuXG4gICAgICAgICAgICBjdXIgPSBsYXN0RWxlbWVudCA9IHRtcCA9IGVsZW0gPSBlbGVtIHx8IGRvY3VtZW50O1xuXG4gICAgICAgICAgICAvLyBEb24ndCBkbyBldmVudHMgb24gdGV4dCBhbmQgY29tbWVudCBub2Rlc1xuICAgICAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBmb2N1cy9ibHVyIG1vcnBocyB0byBmb2N1c2luL291dDsgZW5zdXJlIHdlJ3JlIG5vdCBmaXJpbmcgdGhlbSByaWdodCBub3dcbiAgICAgICAgICAgIGlmICggcmZvY3VzTW9ycGgudGVzdCggdHlwZSArIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggdHlwZS5pbmRleE9mKCBcIi5cIiApID4gLTEgKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBOYW1lc3BhY2VkIHRyaWdnZXI7IGNyZWF0ZSBhIHJlZ2V4cCB0byBtYXRjaCBldmVudCB0eXBlIGluIGhhbmRsZSgpXG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlcyA9IHR5cGUuc3BsaXQoIFwiLlwiICk7XG4gICAgICAgICAgICAgICAgdHlwZSA9IG5hbWVzcGFjZXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBuYW1lc3BhY2VzLnNvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9udHlwZSA9IHR5cGUuaW5kZXhPZiggXCI6XCIgKSA8IDAgJiYgXCJvblwiICsgdHlwZTtcblxuICAgICAgICAgICAgLy8gQ2FsbGVyIGNhbiBwYXNzIGluIGEgalF1ZXJ5LkV2ZW50IG9iamVjdCwgT2JqZWN0LCBvciBqdXN0IGFuIGV2ZW50IHR5cGUgc3RyaW5nXG4gICAgICAgICAgICBldmVudCA9IGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cbiAgICAgICAgICAgICAgICBldmVudCA6XG4gICAgICAgICAgICAgICAgbmV3IGpRdWVyeS5FdmVudCggdHlwZSwgdHlwZW9mIGV2ZW50ID09PSBcIm9iamVjdFwiICYmIGV2ZW50ICk7XG5cbiAgICAgICAgICAgIC8vIFRyaWdnZXIgYml0bWFzazogJiAxIGZvciBuYXRpdmUgaGFuZGxlcnM7ICYgMiBmb3IgalF1ZXJ5IChhbHdheXMgdHJ1ZSlcbiAgICAgICAgICAgIGV2ZW50LmlzVHJpZ2dlciA9IG9ubHlIYW5kbGVycyA/IDIgOiAzO1xuICAgICAgICAgICAgZXZlbnQubmFtZXNwYWNlID0gbmFtZXNwYWNlcy5qb2luKCBcIi5cIiApO1xuICAgICAgICAgICAgZXZlbnQucm5hbWVzcGFjZSA9IGV2ZW50Lm5hbWVzcGFjZSA/XG4gICAgICAgICAgICAgICAgbmV3IFJlZ0V4cCggXCIoXnxcXFxcLilcIiArIG5hbWVzcGFjZXMuam9pbiggXCJcXFxcLig/Oi4qXFxcXC58KVwiICkgKyBcIihcXFxcLnwkKVwiICkgOlxuICAgICAgICAgICAgICAgIG51bGw7XG5cbiAgICAgICAgICAgIC8vIENsZWFuIHVwIHRoZSBldmVudCBpbiBjYXNlIGl0IGlzIGJlaW5nIHJldXNlZFxuICAgICAgICAgICAgZXZlbnQucmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKCAhZXZlbnQudGFyZ2V0ICkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldCA9IGVsZW07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENsb25lIGFueSBpbmNvbWluZyBkYXRhIGFuZCBwcmVwZW5kIHRoZSBldmVudCwgY3JlYXRpbmcgdGhlIGhhbmRsZXIgYXJnIGxpc3RcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhID09IG51bGwgP1xuICAgICAgICAgICAgICAgIFsgZXZlbnQgXSA6XG4gICAgICAgICAgICAgICAgalF1ZXJ5Lm1ha2VBcnJheSggZGF0YSwgWyBldmVudCBdICk7XG5cbiAgICAgICAgICAgIC8vIEFsbG93IHNwZWNpYWwgZXZlbnRzIHRvIGRyYXcgb3V0c2lkZSB0aGUgbGluZXNcbiAgICAgICAgICAgIHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuICAgICAgICAgICAgaWYgKCAhb25seUhhbmRsZXJzICYmIHNwZWNpYWwudHJpZ2dlciAmJiBzcGVjaWFsLnRyaWdnZXIuYXBwbHkoIGVsZW0sIGRhdGEgKSA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgZXZlbnQgcHJvcGFnYXRpb24gcGF0aCBpbiBhZHZhbmNlLCBwZXIgVzNDIGV2ZW50cyBzcGVjICgjOTk1MSlcbiAgICAgICAgICAgIC8vIEJ1YmJsZSB1cCB0byBkb2N1bWVudCwgdGhlbiB0byB3aW5kb3c7IHdhdGNoIGZvciBhIGdsb2JhbCBvd25lckRvY3VtZW50IHZhciAoIzk3MjQpXG4gICAgICAgICAgICBpZiAoICFvbmx5SGFuZGxlcnMgJiYgIXNwZWNpYWwubm9CdWJibGUgJiYgIWlzV2luZG93KCBlbGVtICkgKSB7XG5cbiAgICAgICAgICAgICAgICBidWJibGVUeXBlID0gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgfHwgdHlwZTtcbiAgICAgICAgICAgICAgICBpZiAoICFyZm9jdXNNb3JwaC50ZXN0KCBidWJibGVUeXBlICsgdHlwZSApICkge1xuICAgICAgICAgICAgICAgICAgICBjdXIgPSBjdXIucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICggOyBjdXI7IGN1ciA9IGN1ci5wYXJlbnROb2RlICkge1xuICAgICAgICAgICAgICAgICAgICBldmVudFBhdGgucHVzaCggY3VyICk7XG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IGN1cjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBPbmx5IGFkZCB3aW5kb3cgaWYgd2UgZ290IHRvIGRvY3VtZW50IChlLmcuLCBub3QgcGxhaW4gb2JqIG9yIGRldGFjaGVkIERPTSlcbiAgICAgICAgICAgICAgICBpZiAoIHRtcCA9PT0gKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRQYXRoLnB1c2goIHRtcC5kZWZhdWx0VmlldyB8fCB0bXAucGFyZW50V2luZG93IHx8IHdpbmRvdyApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRmlyZSBoYW5kbGVycyBvbiB0aGUgZXZlbnQgcGF0aFxuICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoICggY3VyID0gZXZlbnRQYXRoWyBpKysgXSApICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuICAgICAgICAgICAgICAgIGxhc3RFbGVtZW50ID0gY3VyO1xuICAgICAgICAgICAgICAgIGV2ZW50LnR5cGUgPSBpID4gMSA/XG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZVR5cGUgOlxuICAgICAgICAgICAgICAgICAgICBzcGVjaWFsLmJpbmRUeXBlIHx8IHR5cGU7XG5cbiAgICAgICAgICAgICAgICAvLyBqUXVlcnkgaGFuZGxlclxuICAgICAgICAgICAgICAgIGhhbmRsZSA9ICggZGF0YVByaXYuZ2V0KCBjdXIsIFwiZXZlbnRzXCIgKSB8fCB7fSApWyBldmVudC50eXBlIF0gJiZcbiAgICAgICAgICAgICAgICAgICAgZGF0YVByaXYuZ2V0KCBjdXIsIFwiaGFuZGxlXCIgKTtcbiAgICAgICAgICAgICAgICBpZiAoIGhhbmRsZSApIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmFwcGx5KCBjdXIsIGRhdGEgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBOYXRpdmUgaGFuZGxlclxuICAgICAgICAgICAgICAgIGhhbmRsZSA9IG9udHlwZSAmJiBjdXJbIG9udHlwZSBdO1xuICAgICAgICAgICAgICAgIGlmICggaGFuZGxlICYmIGhhbmRsZS5hcHBseSAmJiBhY2NlcHREYXRhKCBjdXIgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucmVzdWx0ID0gaGFuZGxlLmFwcGx5KCBjdXIsIGRhdGEgKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBldmVudC5yZXN1bHQgPT09IGZhbHNlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2ZW50LnR5cGUgPSB0eXBlO1xuXG4gICAgICAgICAgICAvLyBJZiBub2JvZHkgcHJldmVudGVkIHRoZSBkZWZhdWx0IGFjdGlvbiwgZG8gaXQgbm93XG4gICAgICAgICAgICBpZiAoICFvbmx5SGFuZGxlcnMgJiYgIWV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCAoICFzcGVjaWFsLl9kZWZhdWx0IHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWFsLl9kZWZhdWx0LmFwcGx5KCBldmVudFBhdGgucG9wKCksIGRhdGEgKSA9PT0gZmFsc2UgKSAmJlxuICAgICAgICAgICAgICAgICAgICBhY2NlcHREYXRhKCBlbGVtICkgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FsbCBhIG5hdGl2ZSBET00gbWV0aG9kIG9uIHRoZSB0YXJnZXQgd2l0aCB0aGUgc2FtZSBuYW1lIGFzIHRoZSBldmVudC5cbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgZG8gZGVmYXVsdCBhY3Rpb25zIG9uIHdpbmRvdywgdGhhdCdzIHdoZXJlIGdsb2JhbCB2YXJpYWJsZXMgYmUgKCM2MTcwKVxuICAgICAgICAgICAgICAgICAgICBpZiAoIG9udHlwZSAmJiBpc0Z1bmN0aW9uKCBlbGVtWyB0eXBlIF0gKSAmJiAhaXNXaW5kb3coIGVsZW0gKSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgcmUtdHJpZ2dlciBhbiBvbkZPTyBldmVudCB3aGVuIHdlIGNhbGwgaXRzIEZPTygpIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gZWxlbVsgb250eXBlIF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdG1wICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1bIG9udHlwZSBdID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCByZS10cmlnZ2VyaW5nIG9mIHRoZSBzYW1lIGV2ZW50LCBzaW5jZSB3ZSBhbHJlYWR5IGJ1YmJsZWQgaXQgYWJvdmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgPSB0eXBlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgc3RvcFByb3BhZ2F0aW9uQ2FsbGJhY2sgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbVsgdHlwZSBdKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCB0eXBlLCBzdG9wUHJvcGFnYXRpb25DYWxsYmFjayApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlcmVkID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHRtcCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtWyBvbnR5cGUgXSA9IHRtcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50LnJlc3VsdDtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBQaWdneWJhY2sgb24gYSBkb25vciBldmVudCB0byBzaW11bGF0ZSBhIGRpZmZlcmVudCBvbmVcbiAgICAgICAgLy8gVXNlZCBvbmx5IGZvciBgZm9jdXMoaW4gfCBvdXQpYCBldmVudHNcbiAgICAgICAgc2ltdWxhdGU6IGZ1bmN0aW9uKCB0eXBlLCBlbGVtLCBldmVudCApIHtcbiAgICAgICAgICAgIHZhciBlID0galF1ZXJ5LmV4dGVuZChcbiAgICAgICAgICAgICAgICBuZXcgalF1ZXJ5LkV2ZW50KCksXG4gICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBpc1NpbXVsYXRlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGpRdWVyeS5ldmVudC50cmlnZ2VyKCBlLCBudWxsLCBlbGVtICk7XG4gICAgICAgIH1cblxuICAgIH0gKTtcblxuICAgIGpRdWVyeS5mbi5leHRlbmQoIHtcblxuICAgICAgICB0cmlnZ2VyOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCB0aGlzICk7XG4gICAgICAgICAgICB9ICk7XG4gICAgICAgIH0sXG4gICAgICAgIHRyaWdnZXJIYW5kbGVyOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpc1sgMCBdO1xuICAgICAgICAgICAgaWYgKCBlbGVtICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgZWxlbSwgdHJ1ZSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSApO1xuXG5cbi8vIFN1cHBvcnQ6IEZpcmVmb3ggPD00NFxuLy8gRmlyZWZveCBkb2Vzbid0IGhhdmUgZm9jdXMoaW4gfCBvdXQpIGV2ZW50c1xuLy8gUmVsYXRlZCB0aWNrZXQgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02ODc3ODdcbi8vXG4vLyBTdXBwb3J0OiBDaHJvbWUgPD00OCAtIDQ5LCBTYWZhcmkgPD05LjAgLSA5LjFcbi8vIGZvY3VzKGluIHwgb3V0KSBldmVudHMgZmlyZSBhZnRlciBmb2N1cyAmIGJsdXIgZXZlbnRzLFxuLy8gd2hpY2ggaXMgc3BlYyB2aW9sYXRpb24gLSBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMvI2V2ZW50cy1mb2N1c2V2ZW50LWV2ZW50LW9yZGVyXG4vLyBSZWxhdGVkIHRpY2tldCAtIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ0OTg1N1xuICAgIGlmICggIXN1cHBvcnQuZm9jdXNpbiApIHtcbiAgICAgICAgalF1ZXJ5LmVhY2goIHsgZm9jdXM6IFwiZm9jdXNpblwiLCBibHVyOiBcImZvY3Vzb3V0XCIgfSwgZnVuY3Rpb24oIG9yaWcsIGZpeCApIHtcblxuICAgICAgICAgICAgLy8gQXR0YWNoIGEgc2luZ2xlIGNhcHR1cmluZyBoYW5kbGVyIG9uIHRoZSBkb2N1bWVudCB3aGlsZSBzb21lb25lIHdhbnRzIGZvY3VzaW4vZm9jdXNvdXRcbiAgICAgICAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5zaW11bGF0ZSggZml4LCBldmVudC50YXJnZXQsIGpRdWVyeS5ldmVudC5maXgoIGV2ZW50ICkgKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGpRdWVyeS5ldmVudC5zcGVjaWFsWyBmaXggXSA9IHtcbiAgICAgICAgICAgICAgICBzZXR1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkb2MgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaGVzID0gZGF0YVByaXYuYWNjZXNzKCBkb2MsIGZpeCApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggIWF0dGFjaGVzICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoIG9yaWcsIGhhbmRsZXIsIHRydWUgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkYXRhUHJpdi5hY2Nlc3MoIGRvYywgZml4LCAoIGF0dGFjaGVzIHx8IDAgKSArIDEgKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvYyA9IHRoaXMub3duZXJEb2N1bWVudCB8fCB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNoZXMgPSBkYXRhUHJpdi5hY2Nlc3MoIGRvYywgZml4ICkgLSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggIWF0dGFjaGVzICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoIG9yaWcsIGhhbmRsZXIsIHRydWUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFQcml2LnJlbW92ZSggZG9jLCBmaXggKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVByaXYuYWNjZXNzKCBkb2MsIGZpeCwgYXR0YWNoZXMgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gKTtcbiAgICB9XG4gICAgdmFyIGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uO1xuXG4gICAgdmFyIG5vbmNlID0gRGF0ZS5ub3coKTtcblxuICAgIHZhciBycXVlcnkgPSAoIC9cXD8vICk7XG5cblxuXG4vLyBDcm9zcy1icm93c2VyIHhtbCBwYXJzaW5nXG4gICAgalF1ZXJ5LnBhcnNlWE1MID0gZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgIHZhciB4bWw7XG4gICAgICAgIGlmICggIWRhdGEgfHwgdHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN1cHBvcnQ6IElFIDkgLSAxMSBvbmx5XG4gICAgICAgIC8vIElFIHRocm93cyBvbiBwYXJzZUZyb21TdHJpbmcgd2l0aCBpbnZhbGlkIGlucHV0LlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgeG1sID0gKCBuZXcgd2luZG93LkRPTVBhcnNlcigpICkucGFyc2VGcm9tU3RyaW5nKCBkYXRhLCBcInRleHQveG1sXCIgKTtcbiAgICAgICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICAgICAgICB4bWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICF4bWwgfHwgeG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcInBhcnNlcmVycm9yXCIgKS5sZW5ndGggKSB7XG4gICAgICAgICAgICBqUXVlcnkuZXJyb3IoIFwiSW52YWxpZCBYTUw6IFwiICsgZGF0YSApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4bWw7XG4gICAgfTtcblxuXG4gICAgdmFyXG4gICAgICAgIHJicmFja2V0ID0gL1xcW1xcXSQvLFxuICAgICAgICByQ1JMRiA9IC9cXHI/XFxuL2csXG4gICAgICAgIHJzdWJtaXR0ZXJUeXBlcyA9IC9eKD86c3VibWl0fGJ1dHRvbnxpbWFnZXxyZXNldHxmaWxlKSQvaSxcbiAgICAgICAgcnN1Ym1pdHRhYmxlID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8a2V5Z2VuKS9pO1xuXG4gICAgZnVuY3Rpb24gYnVpbGRQYXJhbXMoIHByZWZpeCwgb2JqLCB0cmFkaXRpb25hbCwgYWRkICkge1xuICAgICAgICB2YXIgbmFtZTtcblxuICAgICAgICBpZiAoIEFycmF5LmlzQXJyYXkoIG9iaiApICkge1xuXG4gICAgICAgICAgICAvLyBTZXJpYWxpemUgYXJyYXkgaXRlbS5cbiAgICAgICAgICAgIGpRdWVyeS5lYWNoKCBvYmosIGZ1bmN0aW9uKCBpLCB2ICkge1xuICAgICAgICAgICAgICAgIGlmICggdHJhZGl0aW9uYWwgfHwgcmJyYWNrZXQudGVzdCggcHJlZml4ICkgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVHJlYXQgZWFjaCBhcnJheSBpdGVtIGFzIGEgc2NhbGFyLlxuICAgICAgICAgICAgICAgICAgICBhZGQoIHByZWZpeCwgdiApO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJdGVtIGlzIG5vbi1zY2FsYXIgKGFycmF5IG9yIG9iamVjdCksIGVuY29kZSBpdHMgbnVtZXJpYyBpbmRleC5cbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQYXJhbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVmaXggKyBcIltcIiArICggdHlwZW9mIHYgPT09IFwib2JqZWN0XCIgJiYgdiAhPSBudWxsID8gaSA6IFwiXCIgKSArIFwiXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWRpdGlvbmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoICF0cmFkaXRpb25hbCAmJiB0b1R5cGUoIG9iaiApID09PSBcIm9iamVjdFwiICkge1xuXG4gICAgICAgICAgICAvLyBTZXJpYWxpemUgb2JqZWN0IGl0ZW0uXG4gICAgICAgICAgICBmb3IgKCBuYW1lIGluIG9iaiApIHtcbiAgICAgICAgICAgICAgICBidWlsZFBhcmFtcyggcHJlZml4ICsgXCJbXCIgKyBuYW1lICsgXCJdXCIsIG9ialsgbmFtZSBdLCB0cmFkaXRpb25hbCwgYWRkICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy8gU2VyaWFsaXplIHNjYWxhciBpdGVtLlxuICAgICAgICAgICAgYWRkKCBwcmVmaXgsIG9iaiApO1xuICAgICAgICB9XG4gICAgfVxuXG4vLyBTZXJpYWxpemUgYW4gYXJyYXkgb2YgZm9ybSBlbGVtZW50cyBvciBhIHNldCBvZlxuLy8ga2V5L3ZhbHVlcyBpbnRvIGEgcXVlcnkgc3RyaW5nXG4gICAgalF1ZXJ5LnBhcmFtID0gZnVuY3Rpb24oIGEsIHRyYWRpdGlvbmFsICkge1xuICAgICAgICB2YXIgcHJlZml4LFxuICAgICAgICAgICAgcyA9IFtdLFxuICAgICAgICAgICAgYWRkID0gZnVuY3Rpb24oIGtleSwgdmFsdWVPckZ1bmN0aW9uICkge1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgdmFsdWUgaXMgYSBmdW5jdGlvbiwgaW52b2tlIGl0IGFuZCB1c2UgaXRzIHJldHVybiB2YWx1ZVxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGlzRnVuY3Rpb24oIHZhbHVlT3JGdW5jdGlvbiApID9cbiAgICAgICAgICAgICAgICAgICAgdmFsdWVPckZ1bmN0aW9uKCkgOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZU9yRnVuY3Rpb247XG5cbiAgICAgICAgICAgICAgICBzWyBzLmxlbmd0aCBdID0gZW5jb2RlVVJJQ29tcG9uZW50KCBrZXkgKSArIFwiPVwiICtcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KCB2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlICk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIC8vIElmIGFuIGFycmF5IHdhcyBwYXNzZWQgaW4sIGFzc3VtZSB0aGF0IGl0IGlzIGFuIGFycmF5IG9mIGZvcm0gZWxlbWVudHMuXG4gICAgICAgIGlmICggQXJyYXkuaXNBcnJheSggYSApIHx8ICggYS5qcXVlcnkgJiYgIWpRdWVyeS5pc1BsYWluT2JqZWN0KCBhICkgKSApIHtcblxuICAgICAgICAgICAgLy8gU2VyaWFsaXplIHRoZSBmb3JtIGVsZW1lbnRzXG4gICAgICAgICAgICBqUXVlcnkuZWFjaCggYSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYWRkKCB0aGlzLm5hbWUsIHRoaXMudmFsdWUgKTtcbiAgICAgICAgICAgIH0gKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBJZiB0cmFkaXRpb25hbCwgZW5jb2RlIHRoZSBcIm9sZFwiIHdheSAodGhlIHdheSAxLjMuMiBvciBvbGRlclxuICAgICAgICAgICAgLy8gZGlkIGl0KSwgb3RoZXJ3aXNlIGVuY29kZSBwYXJhbXMgcmVjdXJzaXZlbHkuXG4gICAgICAgICAgICBmb3IgKCBwcmVmaXggaW4gYSApIHtcbiAgICAgICAgICAgICAgICBidWlsZFBhcmFtcyggcHJlZml4LCBhWyBwcmVmaXggXSwgdHJhZGl0aW9uYWwsIGFkZCApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSByZXN1bHRpbmcgc2VyaWFsaXphdGlvblxuICAgICAgICByZXR1cm4gcy5qb2luKCBcIiZcIiApO1xuICAgIH07XG5cbiAgICBqUXVlcnkuZm4uZXh0ZW5kKCB7XG4gICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LnBhcmFtKCB0aGlzLnNlcmlhbGl6ZUFycmF5KCkgKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2VyaWFsaXplQXJyYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwKCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIC8vIENhbiBhZGQgcHJvcEhvb2sgZm9yIFwiZWxlbWVudHNcIiB0byBmaWx0ZXIgb3IgYWRkIGZvcm0gZWxlbWVudHNcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBqUXVlcnkucHJvcCggdGhpcywgXCJlbGVtZW50c1wiICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRzID8galF1ZXJ5Lm1ha2VBcnJheSggZWxlbWVudHMgKSA6IHRoaXM7XG4gICAgICAgICAgICB9IClcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSB0aGlzLnR5cGU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlIC5pcyggXCI6ZGlzYWJsZWRcIiApIHNvIHRoYXQgZmllbGRzZXRbZGlzYWJsZWRdIHdvcmtzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hbWUgJiYgIWpRdWVyeSggdGhpcyApLmlzKCBcIjpkaXNhYmxlZFwiICkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJzdWJtaXR0YWJsZS50ZXN0KCB0aGlzLm5vZGVOYW1lICkgJiYgIXJzdWJtaXR0ZXJUeXBlcy50ZXN0KCB0eXBlICkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICggdGhpcy5jaGVja2VkIHx8ICFyY2hlY2thYmxlVHlwZS50ZXN0KCB0eXBlICkgKTtcbiAgICAgICAgICAgICAgICB9IClcbiAgICAgICAgICAgICAgICAubWFwKCBmdW5jdGlvbiggaSwgZWxlbSApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IGpRdWVyeSggdGhpcyApLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggdmFsID09IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICggQXJyYXkuaXNBcnJheSggdmFsICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4galF1ZXJ5Lm1hcCggdmFsLCBmdW5jdGlvbiggdmFsICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9ICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBuYW1lOiBlbGVtLm5hbWUsIHZhbHVlOiB2YWwucmVwbGFjZSggckNSTEYsIFwiXFxyXFxuXCIgKSB9O1xuICAgICAgICAgICAgICAgIH0gKS5nZXQoKTtcbiAgICAgICAgfVxuICAgIH0gKTtcblxuXG4gICAgdmFyXG4gICAgICAgIHIyMCA9IC8lMjAvZyxcbiAgICAgICAgcmhhc2ggPSAvIy4qJC8sXG4gICAgICAgIHJhbnRpQ2FjaGUgPSAvKFs/Jl0pXz1bXiZdKi8sXG4gICAgICAgIHJoZWFkZXJzID0gL14oLio/KTpbIFxcdF0qKFteXFxyXFxuXSopJC9tZyxcblxuICAgICAgICAvLyAjNzY1MywgIzgxMjUsICM4MTUyOiBsb2NhbCBwcm90b2NvbCBkZXRlY3Rpb25cbiAgICAgICAgcmxvY2FsUHJvdG9jb2wgPSAvXig/OmFib3V0fGFwcHxhcHAtc3RvcmFnZXwuKy1leHRlbnNpb258ZmlsZXxyZXN8d2lkZ2V0KTokLyxcbiAgICAgICAgcm5vQ29udGVudCA9IC9eKD86R0VUfEhFQUQpJC8sXG4gICAgICAgIHJwcm90b2NvbCA9IC9eXFwvXFwvLyxcblxuICAgICAgICAvKiBQcmVmaWx0ZXJzXG5cdCAqIDEpIFRoZXkgYXJlIHVzZWZ1bCB0byBpbnRyb2R1Y2UgY3VzdG9tIGRhdGFUeXBlcyAoc2VlIGFqYXgvanNvbnAuanMgZm9yIGFuIGV4YW1wbGUpXG5cdCAqIDIpIFRoZXNlIGFyZSBjYWxsZWQ6XG5cdCAqICAgIC0gQkVGT1JFIGFza2luZyBmb3IgYSB0cmFuc3BvcnRcblx0ICogICAgLSBBRlRFUiBwYXJhbSBzZXJpYWxpemF0aW9uIChzLmRhdGEgaXMgYSBzdHJpbmcgaWYgcy5wcm9jZXNzRGF0YSBpcyB0cnVlKVxuXHQgKiAzKSBrZXkgaXMgdGhlIGRhdGFUeXBlXG5cdCAqIDQpIHRoZSBjYXRjaGFsbCBzeW1ib2wgXCIqXCIgY2FuIGJlIHVzZWRcblx0ICogNSkgZXhlY3V0aW9uIHdpbGwgc3RhcnQgd2l0aCB0cmFuc3BvcnQgZGF0YVR5cGUgYW5kIFRIRU4gY29udGludWUgZG93biB0byBcIipcIiBpZiBuZWVkZWRcblx0ICovXG4gICAgICAgIHByZWZpbHRlcnMgPSB7fSxcblxuICAgICAgICAvKiBUcmFuc3BvcnRzIGJpbmRpbmdzXG5cdCAqIDEpIGtleSBpcyB0aGUgZGF0YVR5cGVcblx0ICogMikgdGhlIGNhdGNoYWxsIHN5bWJvbCBcIipcIiBjYW4gYmUgdXNlZFxuXHQgKiAzKSBzZWxlY3Rpb24gd2lsbCBzdGFydCB3aXRoIHRyYW5zcG9ydCBkYXRhVHlwZSBhbmQgVEhFTiBnbyB0byBcIipcIiBpZiBuZWVkZWRcblx0ICovXG4gICAgICAgIHRyYW5zcG9ydHMgPSB7fSxcblxuICAgICAgICAvLyBBdm9pZCBjb21tZW50LXByb2xvZyBjaGFyIHNlcXVlbmNlICgjMTAwOTgpOyBtdXN0IGFwcGVhc2UgbGludCBhbmQgZXZhZGUgY29tcHJlc3Npb25cbiAgICAgICAgYWxsVHlwZXMgPSBcIiovXCIuY29uY2F0KCBcIipcIiApLFxuXG4gICAgICAgIC8vIEFuY2hvciB0YWcgZm9yIHBhcnNpbmcgdGhlIGRvY3VtZW50IG9yaWdpblxuICAgICAgICBvcmlnaW5BbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImFcIiApO1xuICAgIG9yaWdpbkFuY2hvci5ocmVmID0gbG9jYXRpb24uaHJlZjtcblxuLy8gQmFzZSBcImNvbnN0cnVjdG9yXCIgZm9yIGpRdWVyeS5hamF4UHJlZmlsdGVyIGFuZCBqUXVlcnkuYWpheFRyYW5zcG9ydFxuICAgIGZ1bmN0aW9uIGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggc3RydWN0dXJlICkge1xuXG4gICAgICAgIC8vIGRhdGFUeXBlRXhwcmVzc2lvbiBpcyBvcHRpb25hbCBhbmQgZGVmYXVsdHMgdG8gXCIqXCJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBkYXRhVHlwZUV4cHJlc3Npb24sIGZ1bmMgKSB7XG5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIGRhdGFUeXBlRXhwcmVzc2lvbiAhPT0gXCJzdHJpbmdcIiApIHtcbiAgICAgICAgICAgICAgICBmdW5jID0gZGF0YVR5cGVFeHByZXNzaW9uO1xuICAgICAgICAgICAgICAgIGRhdGFUeXBlRXhwcmVzc2lvbiA9IFwiKlwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZGF0YVR5cGUsXG4gICAgICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGVzID0gZGF0YVR5cGVFeHByZXNzaW9uLnRvTG93ZXJDYXNlKCkubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXTtcblxuICAgICAgICAgICAgaWYgKCBpc0Z1bmN0aW9uKCBmdW5jICkgKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBGb3IgZWFjaCBkYXRhVHlwZSBpbiB0aGUgZGF0YVR5cGVFeHByZXNzaW9uXG4gICAgICAgICAgICAgICAgd2hpbGUgKCAoIGRhdGFUeXBlID0gZGF0YVR5cGVzWyBpKysgXSApICkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXBlbmQgaWYgcmVxdWVzdGVkXG4gICAgICAgICAgICAgICAgICAgIGlmICggZGF0YVR5cGVbIDAgXSA9PT0gXCIrXCIgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZSA9IGRhdGFUeXBlLnNsaWNlKCAxICkgfHwgXCIqXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAoIHN0cnVjdHVyZVsgZGF0YVR5cGUgXSA9IHN0cnVjdHVyZVsgZGF0YVR5cGUgXSB8fCBbXSApLnVuc2hpZnQoIGZ1bmMgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGFwcGVuZFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgKCBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gPSBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gfHwgW10gKS5wdXNoKCBmdW5jICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4vLyBCYXNlIGluc3BlY3Rpb24gZnVuY3Rpb24gZm9yIHByZWZpbHRlcnMgYW5kIHRyYW5zcG9ydHNcbiAgICBmdW5jdGlvbiBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggc3RydWN0dXJlLCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSICkge1xuXG4gICAgICAgIHZhciBpbnNwZWN0ZWQgPSB7fSxcbiAgICAgICAgICAgIHNlZWtpbmdUcmFuc3BvcnQgPSAoIHN0cnVjdHVyZSA9PT0gdHJhbnNwb3J0cyApO1xuXG4gICAgICAgIGZ1bmN0aW9uIGluc3BlY3QoIGRhdGFUeXBlICkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkO1xuICAgICAgICAgICAgaW5zcGVjdGVkWyBkYXRhVHlwZSBdID0gdHJ1ZTtcbiAgICAgICAgICAgIGpRdWVyeS5lYWNoKCBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gfHwgW10sIGZ1bmN0aW9uKCBfLCBwcmVmaWx0ZXJPckZhY3RvcnkgKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGFUeXBlT3JUcmFuc3BvcnQgPSBwcmVmaWx0ZXJPckZhY3RvcnkoIG9wdGlvbnMsIG9yaWdpbmFsT3B0aW9ucywganFYSFIgKTtcbiAgICAgICAgICAgICAgICBpZiAoIHR5cGVvZiBkYXRhVHlwZU9yVHJhbnNwb3J0ID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgICAgICFzZWVraW5nVHJhbnNwb3J0ICYmICFpbnNwZWN0ZWRbIGRhdGFUeXBlT3JUcmFuc3BvcnQgXSApIHtcblxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGFUeXBlcy51bnNoaWZ0KCBkYXRhVHlwZU9yVHJhbnNwb3J0ICk7XG4gICAgICAgICAgICAgICAgICAgIGluc3BlY3QoIGRhdGFUeXBlT3JUcmFuc3BvcnQgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHNlZWtpbmdUcmFuc3BvcnQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhKCBzZWxlY3RlZCA9IGRhdGFUeXBlT3JUcmFuc3BvcnQgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICk7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5zcGVjdCggb3B0aW9ucy5kYXRhVHlwZXNbIDAgXSApIHx8ICFpbnNwZWN0ZWRbIFwiKlwiIF0gJiYgaW5zcGVjdCggXCIqXCIgKTtcbiAgICB9XG5cbi8vIEEgc3BlY2lhbCBleHRlbmQgZm9yIGFqYXggb3B0aW9uc1xuLy8gdGhhdCB0YWtlcyBcImZsYXRcIiBvcHRpb25zIChub3QgdG8gYmUgZGVlcCBleHRlbmRlZClcbi8vIEZpeGVzICM5ODg3XG4gICAgZnVuY3Rpb24gYWpheEV4dGVuZCggdGFyZ2V0LCBzcmMgKSB7XG4gICAgICAgIHZhciBrZXksIGRlZXAsXG4gICAgICAgICAgICBmbGF0T3B0aW9ucyA9IGpRdWVyeS5hamF4U2V0dGluZ3MuZmxhdE9wdGlvbnMgfHwge307XG5cbiAgICAgICAgZm9yICgga2V5IGluIHNyYyApIHtcbiAgICAgICAgICAgIGlmICggc3JjWyBrZXkgXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICAgICggZmxhdE9wdGlvbnNbIGtleSBdID8gdGFyZ2V0IDogKCBkZWVwIHx8ICggZGVlcCA9IHt9ICkgKSApWyBrZXkgXSA9IHNyY1sga2V5IF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCBkZWVwICkge1xuICAgICAgICAgICAgalF1ZXJ5LmV4dGVuZCggdHJ1ZSwgdGFyZ2V0LCBkZWVwICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIC8qIEhhbmRsZXMgcmVzcG9uc2VzIHRvIGFuIGFqYXggcmVxdWVzdDpcbiAqIC0gZmluZHMgdGhlIHJpZ2h0IGRhdGFUeXBlIChtZWRpYXRlcyBiZXR3ZWVuIGNvbnRlbnQtdHlwZSBhbmQgZXhwZWN0ZWQgZGF0YVR5cGUpXG4gKiAtIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgcmVzcG9uc2VcbiAqL1xuICAgIGZ1bmN0aW9uIGFqYXhIYW5kbGVSZXNwb25zZXMoIHMsIGpxWEhSLCByZXNwb25zZXMgKSB7XG5cbiAgICAgICAgdmFyIGN0LCB0eXBlLCBmaW5hbERhdGFUeXBlLCBmaXJzdERhdGFUeXBlLFxuICAgICAgICAgICAgY29udGVudHMgPSBzLmNvbnRlbnRzLFxuICAgICAgICAgICAgZGF0YVR5cGVzID0gcy5kYXRhVHlwZXM7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGF1dG8gZGF0YVR5cGUgYW5kIGdldCBjb250ZW50LXR5cGUgaW4gdGhlIHByb2Nlc3NcbiAgICAgICAgd2hpbGUgKCBkYXRhVHlwZXNbIDAgXSA9PT0gXCIqXCIgKSB7XG4gICAgICAgICAgICBkYXRhVHlwZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICggY3QgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgICBjdCA9IHMubWltZVR5cGUgfHwganFYSFIuZ2V0UmVzcG9uc2VIZWFkZXIoIFwiQ29udGVudC1UeXBlXCIgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIHdlJ3JlIGRlYWxpbmcgd2l0aCBhIGtub3duIGNvbnRlbnQtdHlwZVxuICAgICAgICBpZiAoIGN0ICkge1xuICAgICAgICAgICAgZm9yICggdHlwZSBpbiBjb250ZW50cyApIHtcbiAgICAgICAgICAgICAgICBpZiAoIGNvbnRlbnRzWyB0eXBlIF0gJiYgY29udGVudHNbIHR5cGUgXS50ZXN0KCBjdCApICkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZXMudW5zaGlmdCggdHlwZSApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgd2UgaGF2ZSBhIHJlc3BvbnNlIGZvciB0aGUgZXhwZWN0ZWQgZGF0YVR5cGVcbiAgICAgICAgaWYgKCBkYXRhVHlwZXNbIDAgXSBpbiByZXNwb25zZXMgKSB7XG4gICAgICAgICAgICBmaW5hbERhdGFUeXBlID0gZGF0YVR5cGVzWyAwIF07XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIFRyeSBjb252ZXJ0aWJsZSBkYXRhVHlwZXNcbiAgICAgICAgICAgIGZvciAoIHR5cGUgaW4gcmVzcG9uc2VzICkge1xuICAgICAgICAgICAgICAgIGlmICggIWRhdGFUeXBlc1sgMCBdIHx8IHMuY29udmVydGVyc1sgdHlwZSArIFwiIFwiICsgZGF0YVR5cGVzWyAwIF0gXSApIHtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxEYXRhVHlwZSA9IHR5cGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoICFmaXJzdERhdGFUeXBlICkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdERhdGFUeXBlID0gdHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE9yIGp1c3QgdXNlIGZpcnN0IG9uZVxuICAgICAgICAgICAgZmluYWxEYXRhVHlwZSA9IGZpbmFsRGF0YVR5cGUgfHwgZmlyc3REYXRhVHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHdlIGZvdW5kIGEgZGF0YVR5cGVcbiAgICAgICAgLy8gV2UgYWRkIHRoZSBkYXRhVHlwZSB0byB0aGUgbGlzdCBpZiBuZWVkZWRcbiAgICAgICAgLy8gYW5kIHJldHVybiB0aGUgY29ycmVzcG9uZGluZyByZXNwb25zZVxuICAgICAgICBpZiAoIGZpbmFsRGF0YVR5cGUgKSB7XG4gICAgICAgICAgICBpZiAoIGZpbmFsRGF0YVR5cGUgIT09IGRhdGFUeXBlc1sgMCBdICkge1xuICAgICAgICAgICAgICAgIGRhdGFUeXBlcy51bnNoaWZ0KCBmaW5hbERhdGFUeXBlICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VzWyBmaW5hbERhdGFUeXBlIF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBDaGFpbiBjb252ZXJzaW9ucyBnaXZlbiB0aGUgcmVxdWVzdCBhbmQgdGhlIG9yaWdpbmFsIHJlc3BvbnNlXG4gKiBBbHNvIHNldHMgdGhlIHJlc3BvbnNlWFhYIGZpZWxkcyBvbiB0aGUganFYSFIgaW5zdGFuY2VcbiAqL1xuICAgIGZ1bmN0aW9uIGFqYXhDb252ZXJ0KCBzLCByZXNwb25zZSwganFYSFIsIGlzU3VjY2VzcyApIHtcbiAgICAgICAgdmFyIGNvbnYyLCBjdXJyZW50LCBjb252LCB0bXAsIHByZXYsXG4gICAgICAgICAgICBjb252ZXJ0ZXJzID0ge30sXG5cbiAgICAgICAgICAgIC8vIFdvcmsgd2l0aCBhIGNvcHkgb2YgZGF0YVR5cGVzIGluIGNhc2Ugd2UgbmVlZCB0byBtb2RpZnkgaXQgZm9yIGNvbnZlcnNpb25cbiAgICAgICAgICAgIGRhdGFUeXBlcyA9IHMuZGF0YVR5cGVzLnNsaWNlKCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGNvbnZlcnRlcnMgbWFwIHdpdGggbG93ZXJjYXNlZCBrZXlzXG4gICAgICAgIGlmICggZGF0YVR5cGVzWyAxIF0gKSB7XG4gICAgICAgICAgICBmb3IgKCBjb252IGluIHMuY29udmVydGVycyApIHtcbiAgICAgICAgICAgICAgICBjb252ZXJ0ZXJzWyBjb252LnRvTG93ZXJDYXNlKCkgXSA9IHMuY29udmVydGVyc1sgY29udiBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudCA9IGRhdGFUeXBlcy5zaGlmdCgpO1xuXG4gICAgICAgIC8vIENvbnZlcnQgdG8gZWFjaCBzZXF1ZW50aWFsIGRhdGFUeXBlXG4gICAgICAgIHdoaWxlICggY3VycmVudCApIHtcblxuICAgICAgICAgICAgaWYgKCBzLnJlc3BvbnNlRmllbGRzWyBjdXJyZW50IF0gKSB7XG4gICAgICAgICAgICAgICAganFYSFJbIHMucmVzcG9uc2VGaWVsZHNbIGN1cnJlbnQgXSBdID0gcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEFwcGx5IHRoZSBkYXRhRmlsdGVyIGlmIHByb3ZpZGVkXG4gICAgICAgICAgICBpZiAoICFwcmV2ICYmIGlzU3VjY2VzcyAmJiBzLmRhdGFGaWx0ZXIgKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBzLmRhdGFGaWx0ZXIoIHJlc3BvbnNlLCBzLmRhdGFUeXBlICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByZXYgPSBjdXJyZW50O1xuICAgICAgICAgICAgY3VycmVudCA9IGRhdGFUeXBlcy5zaGlmdCgpO1xuXG4gICAgICAgICAgICBpZiAoIGN1cnJlbnQgKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBUaGVyZSdzIG9ubHkgd29yayB0byBkbyBpZiBjdXJyZW50IGRhdGFUeXBlIGlzIG5vbi1hdXRvXG4gICAgICAgICAgICAgICAgaWYgKCBjdXJyZW50ID09PSBcIipcIiApIHtcblxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gcHJldjtcblxuICAgICAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IHJlc3BvbnNlIGlmIHByZXYgZGF0YVR5cGUgaXMgbm9uLWF1dG8gYW5kIGRpZmZlcnMgZnJvbSBjdXJyZW50XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggcHJldiAhPT0gXCIqXCIgJiYgcHJldiAhPT0gY3VycmVudCApIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBTZWVrIGEgZGlyZWN0IGNvbnZlcnRlclxuICAgICAgICAgICAgICAgICAgICBjb252ID0gY29udmVydGVyc1sgcHJldiArIFwiIFwiICsgY3VycmVudCBdIHx8IGNvbnZlcnRlcnNbIFwiKiBcIiArIGN1cnJlbnQgXTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBub25lIGZvdW5kLCBzZWVrIGEgcGFpclxuICAgICAgICAgICAgICAgICAgICBpZiAoICFjb252ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICggY29udjIgaW4gY29udmVydGVycyApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGNvbnYyIG91dHB1dHMgY3VycmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IGNvbnYyLnNwbGl0KCBcIiBcIiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdG1wWyAxIF0gPT09IGN1cnJlbnQgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgcHJldiBjYW4gYmUgY29udmVydGVkIHRvIGFjY2VwdGVkIGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnYgPSBjb252ZXJ0ZXJzWyBwcmV2ICsgXCIgXCIgKyB0bXBbIDAgXSBdIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0ZXJzWyBcIiogXCIgKyB0bXBbIDAgXSBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGNvbnYgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbmRlbnNlIGVxdWl2YWxlbmNlIGNvbnZlcnRlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggY29udiA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ID0gY29udmVydGVyc1sgY29udjIgXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgaW5zZXJ0IHRoZSBpbnRlcm1lZGlhdGUgZGF0YVR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIGNvbnZlcnRlcnNbIGNvbnYyIF0gIT09IHRydWUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IHRtcFsgMCBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlcy51bnNoaWZ0KCB0bXBbIDEgXSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBBcHBseSBjb252ZXJ0ZXIgKGlmIG5vdCBhbiBlcXVpdmFsZW5jZSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBjb252ICE9PSB0cnVlICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVbmxlc3MgZXJyb3JzIGFyZSBhbGxvd2VkIHRvIGJ1YmJsZSwgY2F0Y2ggYW5kIHJldHVybiB0aGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGNvbnYgJiYgcy50aHJvd3MgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBjb252KCByZXNwb25zZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IGNvbnYoIHJlc3BvbnNlICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogXCJwYXJzZXJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGNvbnYgPyBlIDogXCJObyBjb252ZXJzaW9uIGZyb20gXCIgKyBwcmV2ICsgXCIgdG8gXCIgKyBjdXJyZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgc3RhdGU6IFwic3VjY2Vzc1wiLCBkYXRhOiByZXNwb25zZSB9O1xuICAgIH1cblxuICAgIGpRdWVyeS5leHRlbmQoIHtcblxuICAgICAgICAvLyBDb3VudGVyIGZvciBob2xkaW5nIHRoZSBudW1iZXIgb2YgYWN0aXZlIHF1ZXJpZXNcbiAgICAgICAgYWN0aXZlOiAwLFxuXG4gICAgICAgIC8vIExhc3QtTW9kaWZpZWQgaGVhZGVyIGNhY2hlIGZvciBuZXh0IHJlcXVlc3RcbiAgICAgICAgbGFzdE1vZGlmaWVkOiB7fSxcbiAgICAgICAgZXRhZzoge30sXG5cbiAgICAgICAgYWpheFNldHRpbmdzOiB7XG4gICAgICAgICAgICB1cmw6IGxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgaXNMb2NhbDogcmxvY2FsUHJvdG9jb2wudGVzdCggbG9jYXRpb24ucHJvdG9jb2wgKSxcbiAgICAgICAgICAgIGdsb2JhbDogdHJ1ZSxcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixcblxuICAgICAgICAgICAgLypcblx0XHR0aW1lb3V0OiAwLFxuXHRcdGRhdGE6IG51bGwsXG5cdFx0ZGF0YVR5cGU6IG51bGwsXG5cdFx0dXNlcm5hbWU6IG51bGwsXG5cdFx0cGFzc3dvcmQ6IG51bGwsXG5cdFx0Y2FjaGU6IG51bGwsXG5cdFx0dGhyb3dzOiBmYWxzZSxcblx0XHR0cmFkaXRpb25hbDogZmFsc2UsXG5cdFx0aGVhZGVyczoge30sXG5cdFx0Ki9cblxuICAgICAgICAgICAgYWNjZXB0czoge1xuICAgICAgICAgICAgICAgIFwiKlwiOiBhbGxUeXBlcyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcInRleHQvcGxhaW5cIixcbiAgICAgICAgICAgICAgICBodG1sOiBcInRleHQvaHRtbFwiLFxuICAgICAgICAgICAgICAgIHhtbDogXCJhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sXCIsXG4gICAgICAgICAgICAgICAganNvbjogXCJhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L2phdmFzY3JpcHRcIlxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY29udGVudHM6IHtcbiAgICAgICAgICAgICAgICB4bWw6IC9cXGJ4bWxcXGIvLFxuICAgICAgICAgICAgICAgIGh0bWw6IC9cXGJodG1sLyxcbiAgICAgICAgICAgICAgICBqc29uOiAvXFxianNvblxcYi9cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlc3BvbnNlRmllbGRzOiB7XG4gICAgICAgICAgICAgICAgeG1sOiBcInJlc3BvbnNlWE1MXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJyZXNwb25zZVRleHRcIixcbiAgICAgICAgICAgICAgICBqc29uOiBcInJlc3BvbnNlSlNPTlwiXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvLyBEYXRhIGNvbnZlcnRlcnNcbiAgICAgICAgICAgIC8vIEtleXMgc2VwYXJhdGUgc291cmNlIChvciBjYXRjaGFsbCBcIipcIikgYW5kIGRlc3RpbmF0aW9uIHR5cGVzIHdpdGggYSBzaW5nbGUgc3BhY2VcbiAgICAgICAgICAgIGNvbnZlcnRlcnM6IHtcblxuICAgICAgICAgICAgICAgIC8vIENvbnZlcnQgYW55dGhpbmcgdG8gdGV4dFxuICAgICAgICAgICAgICAgIFwiKiB0ZXh0XCI6IFN0cmluZyxcblxuICAgICAgICAgICAgICAgIC8vIFRleHQgdG8gaHRtbCAodHJ1ZSA9IG5vIHRyYW5zZm9ybWF0aW9uKVxuICAgICAgICAgICAgICAgIFwidGV4dCBodG1sXCI6IHRydWUsXG5cbiAgICAgICAgICAgICAgICAvLyBFdmFsdWF0ZSB0ZXh0IGFzIGEganNvbiBleHByZXNzaW9uXG4gICAgICAgICAgICAgICAgXCJ0ZXh0IGpzb25cIjogSlNPTi5wYXJzZSxcblxuICAgICAgICAgICAgICAgIC8vIFBhcnNlIHRleHQgYXMgeG1sXG4gICAgICAgICAgICAgICAgXCJ0ZXh0IHhtbFwiOiBqUXVlcnkucGFyc2VYTUxcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vIEZvciBvcHRpb25zIHRoYXQgc2hvdWxkbid0IGJlIGRlZXAgZXh0ZW5kZWQ6XG4gICAgICAgICAgICAvLyB5b3UgY2FuIGFkZCB5b3VyIG93biBjdXN0b20gb3B0aW9ucyBoZXJlIGlmXG4gICAgICAgICAgICAvLyBhbmQgd2hlbiB5b3UgY3JlYXRlIG9uZSB0aGF0IHNob3VsZG4ndCBiZVxuICAgICAgICAgICAgLy8gZGVlcCBleHRlbmRlZCAoc2VlIGFqYXhFeHRlbmQpXG4gICAgICAgICAgICBmbGF0T3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHVybDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb250ZXh0OiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ3JlYXRlcyBhIGZ1bGwgZmxlZGdlZCBzZXR0aW5ncyBvYmplY3QgaW50byB0YXJnZXRcbiAgICAgICAgLy8gd2l0aCBib3RoIGFqYXhTZXR0aW5ncyBhbmQgc2V0dGluZ3MgZmllbGRzLlxuICAgICAgICAvLyBJZiB0YXJnZXQgaXMgb21pdHRlZCwgd3JpdGVzIGludG8gYWpheFNldHRpbmdzLlxuICAgICAgICBhamF4U2V0dXA6IGZ1bmN0aW9uKCB0YXJnZXQsIHNldHRpbmdzICkge1xuICAgICAgICAgICAgcmV0dXJuIHNldHRpbmdzID9cblxuICAgICAgICAgICAgICAgIC8vIEJ1aWxkaW5nIGEgc2V0dGluZ3Mgb2JqZWN0XG4gICAgICAgICAgICAgICAgYWpheEV4dGVuZCggYWpheEV4dGVuZCggdGFyZ2V0LCBqUXVlcnkuYWpheFNldHRpbmdzICksIHNldHRpbmdzICkgOlxuXG4gICAgICAgICAgICAgICAgLy8gRXh0ZW5kaW5nIGFqYXhTZXR0aW5nc1xuICAgICAgICAgICAgICAgIGFqYXhFeHRlbmQoIGpRdWVyeS5hamF4U2V0dGluZ3MsIHRhcmdldCApO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFqYXhQcmVmaWx0ZXI6IGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycyApLFxuICAgICAgICBhamF4VHJhbnNwb3J0OiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHRyYW5zcG9ydHMgKSxcblxuICAgICAgICAvLyBNYWluIG1ldGhvZFxuICAgICAgICBhamF4OiBmdW5jdGlvbiggdXJsLCBvcHRpb25zICkge1xuXG4gICAgICAgICAgICAvLyBJZiB1cmwgaXMgYW4gb2JqZWN0LCBzaW11bGF0ZSBwcmUtMS41IHNpZ25hdHVyZVxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgdXJsID09PSBcIm9iamVjdFwiICkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB1cmw7XG4gICAgICAgICAgICAgICAgdXJsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBGb3JjZSBvcHRpb25zIHRvIGJlIGFuIG9iamVjdFxuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgICAgIHZhciB0cmFuc3BvcnQsXG5cbiAgICAgICAgICAgICAgICAvLyBVUkwgd2l0aG91dCBhbnRpLWNhY2hlIHBhcmFtXG4gICAgICAgICAgICAgICAgY2FjaGVVUkwsXG5cbiAgICAgICAgICAgICAgICAvLyBSZXNwb25zZSBoZWFkZXJzXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VIZWFkZXJzU3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlSGVhZGVycyxcblxuICAgICAgICAgICAgICAgIC8vIHRpbWVvdXQgaGFuZGxlXG4gICAgICAgICAgICAgICAgdGltZW91dFRpbWVyLFxuXG4gICAgICAgICAgICAgICAgLy8gVXJsIGNsZWFudXAgdmFyXG4gICAgICAgICAgICAgICAgdXJsQW5jaG9yLFxuXG4gICAgICAgICAgICAgICAgLy8gUmVxdWVzdCBzdGF0ZSAoYmVjb21lcyBmYWxzZSB1cG9uIHNlbmQgYW5kIHRydWUgdXBvbiBjb21wbGV0aW9uKVxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZCxcblxuICAgICAgICAgICAgICAgIC8vIFRvIGtub3cgaWYgZ2xvYmFsIGV2ZW50cyBhcmUgdG8gYmUgZGlzcGF0Y2hlZFxuICAgICAgICAgICAgICAgIGZpcmVHbG9iYWxzLFxuXG4gICAgICAgICAgICAgICAgLy8gTG9vcCB2YXJpYWJsZVxuICAgICAgICAgICAgICAgIGksXG5cbiAgICAgICAgICAgICAgICAvLyB1bmNhY2hlZCBwYXJ0IG9mIHRoZSB1cmxcbiAgICAgICAgICAgICAgICB1bmNhY2hlZCxcblxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgZmluYWwgb3B0aW9ucyBvYmplY3RcbiAgICAgICAgICAgICAgICBzID0galF1ZXJ5LmFqYXhTZXR1cCgge30sIG9wdGlvbnMgKSxcblxuICAgICAgICAgICAgICAgIC8vIENhbGxiYWNrcyBjb250ZXh0XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tDb250ZXh0ID0gcy5jb250ZXh0IHx8IHMsXG5cbiAgICAgICAgICAgICAgICAvLyBDb250ZXh0IGZvciBnbG9iYWwgZXZlbnRzIGlzIGNhbGxiYWNrQ29udGV4dCBpZiBpdCBpcyBhIERPTSBub2RlIG9yIGpRdWVyeSBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgZ2xvYmFsRXZlbnRDb250ZXh0ID0gcy5jb250ZXh0ICYmXG4gICAgICAgICAgICAgICAgKCBjYWxsYmFja0NvbnRleHQubm9kZVR5cGUgfHwgY2FsbGJhY2tDb250ZXh0LmpxdWVyeSApID9cbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCBjYWxsYmFja0NvbnRleHQgKSA6XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudCxcblxuICAgICAgICAgICAgICAgIC8vIERlZmVycmVkc1xuICAgICAgICAgICAgICAgIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICAgICAgY29tcGxldGVEZWZlcnJlZCA9IGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLFxuXG4gICAgICAgICAgICAgICAgLy8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3NcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlID0gcy5zdGF0dXNDb2RlIHx8IHt9LFxuXG4gICAgICAgICAgICAgICAgLy8gSGVhZGVycyAodGhleSBhcmUgc2VudCBhbGwgYXQgb25jZSlcbiAgICAgICAgICAgICAgICByZXF1ZXN0SGVhZGVycyA9IHt9LFxuICAgICAgICAgICAgICAgIHJlcXVlc3RIZWFkZXJzTmFtZXMgPSB7fSxcblxuICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgYWJvcnQgbWVzc2FnZVxuICAgICAgICAgICAgICAgIHN0ckFib3J0ID0gXCJjYW5jZWxlZFwiLFxuXG4gICAgICAgICAgICAgICAgLy8gRmFrZSB4aHJcbiAgICAgICAgICAgICAgICBqcVhIUiA9IHtcbiAgICAgICAgICAgICAgICAgICAgcmVhZHlTdGF0ZTogMCxcblxuICAgICAgICAgICAgICAgICAgICAvLyBCdWlsZHMgaGVhZGVycyBoYXNodGFibGUgaWYgbmVlZGVkXG4gICAgICAgICAgICAgICAgICAgIGdldFJlc3BvbnNlSGVhZGVyOiBmdW5jdGlvbigga2V5ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBjb21wbGV0ZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhcmVzcG9uc2VIZWFkZXJzICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZUhlYWRlcnMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCAoIG1hdGNoID0gcmhlYWRlcnMuZXhlYyggcmVzcG9uc2VIZWFkZXJzU3RyaW5nICkgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlSGVhZGVyc1sgbWF0Y2hbIDEgXS50b0xvd2VyQ2FzZSgpIF0gPSBtYXRjaFsgMiBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoID0gcmVzcG9uc2VIZWFkZXJzWyBrZXkudG9Mb3dlckNhc2UoKSBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoID09IG51bGwgPyBudWxsIDogbWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmF3IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICBnZXRBbGxSZXNwb25zZUhlYWRlcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBsZXRlZCA/IHJlc3BvbnNlSGVhZGVyc1N0cmluZyA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FjaGVzIHRoZSBoZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgc2V0UmVxdWVzdEhlYWRlcjogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBjb21wbGV0ZWQgPT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gcmVxdWVzdEhlYWRlcnNOYW1lc1sgbmFtZS50b0xvd2VyQ2FzZSgpIF0gPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0SGVhZGVyc05hbWVzWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSB8fCBuYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RIZWFkZXJzWyBuYW1lIF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIE92ZXJyaWRlcyByZXNwb25zZSBjb250ZW50LXR5cGUgaGVhZGVyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJyaWRlTWltZVR5cGU6IGZ1bmN0aW9uKCB0eXBlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBjb21wbGV0ZWQgPT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLm1pbWVUeXBlID0gdHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0YXR1cy1kZXBlbmRlbnQgY2FsbGJhY2tzXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IGZ1bmN0aW9uKCBtYXAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbWFwICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggY29tcGxldGVkICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIGFwcHJvcHJpYXRlIGNhbGxiYWNrc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqcVhIUi5hbHdheXMoIG1hcFsganFYSFIuc3RhdHVzIF0gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExhenktYWRkIHRoZSBuZXcgY2FsbGJhY2tzIGluIGEgd2F5IHRoYXQgcHJlc2VydmVzIG9sZCBvbmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoIGNvZGUgaW4gbWFwICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzQ29kZVsgY29kZSBdID0gWyBzdGF0dXNDb2RlWyBjb2RlIF0sIG1hcFsgY29kZSBdIF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICAvLyBDYW5jZWwgdGhlIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgYWJvcnQ6IGZ1bmN0aW9uKCBzdGF0dXNUZXh0ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmFsVGV4dCA9IHN0YXR1c1RleHQgfHwgc3RyQWJvcnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHRyYW5zcG9ydCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuYWJvcnQoIGZpbmFsVGV4dCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSggMCwgZmluYWxUZXh0ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEF0dGFjaCBkZWZlcnJlZHNcbiAgICAgICAgICAgIGRlZmVycmVkLnByb21pc2UoIGpxWEhSICk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBwcm90b2NvbCBpZiBub3QgcHJvdmlkZWQgKHByZWZpbHRlcnMgbWlnaHQgZXhwZWN0IGl0KVxuICAgICAgICAgICAgLy8gSGFuZGxlIGZhbHN5IHVybCBpbiB0aGUgc2V0dGluZ3Mgb2JqZWN0ICgjMTAwOTM6IGNvbnNpc3RlbmN5IHdpdGggb2xkIHNpZ25hdHVyZSlcbiAgICAgICAgICAgIC8vIFdlIGFsc28gdXNlIHRoZSB1cmwgcGFyYW1ldGVyIGlmIGF2YWlsYWJsZVxuICAgICAgICAgICAgcy51cmwgPSAoICggdXJsIHx8IHMudXJsIHx8IGxvY2F0aW9uLmhyZWYgKSArIFwiXCIgKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKCBycHJvdG9jb2wsIGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICk7XG5cbiAgICAgICAgICAgIC8vIEFsaWFzIG1ldGhvZCBvcHRpb24gdG8gdHlwZSBhcyBwZXIgdGlja2V0ICMxMjAwNFxuICAgICAgICAgICAgcy50eXBlID0gb3B0aW9ucy5tZXRob2QgfHwgb3B0aW9ucy50eXBlIHx8IHMubWV0aG9kIHx8IHMudHlwZTtcblxuICAgICAgICAgICAgLy8gRXh0cmFjdCBkYXRhVHlwZXMgbGlzdFxuICAgICAgICAgICAgcy5kYXRhVHlwZXMgPSAoIHMuZGF0YVR5cGUgfHwgXCIqXCIgKS50b0xvd2VyQ2FzZSgpLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgWyBcIlwiIF07XG5cbiAgICAgICAgICAgIC8vIEEgY3Jvc3MtZG9tYWluIHJlcXVlc3QgaXMgaW4gb3JkZXIgd2hlbiB0aGUgb3JpZ2luIGRvZXNuJ3QgbWF0Y2ggdGhlIGN1cnJlbnQgb3JpZ2luLlxuICAgICAgICAgICAgaWYgKCBzLmNyb3NzRG9tYWluID09IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgdXJsQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJhXCIgKTtcblxuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFIDw9OCAtIDExLCBFZGdlIDEyIC0gMTVcbiAgICAgICAgICAgICAgICAvLyBJRSB0aHJvd3MgZXhjZXB0aW9uIG9uIGFjY2Vzc2luZyB0aGUgaHJlZiBwcm9wZXJ0eSBpZiB1cmwgaXMgbWFsZm9ybWVkLFxuICAgICAgICAgICAgICAgIC8vIGUuZy4gaHR0cDovL2V4YW1wbGUuY29tOjgweC9cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB1cmxBbmNob3IuaHJlZiA9IHMudXJsO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFIDw9OCAtIDExIG9ubHlcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5jaG9yJ3MgaG9zdCBwcm9wZXJ0eSBpc24ndCBjb3JyZWN0bHkgc2V0IHdoZW4gcy51cmwgaXMgcmVsYXRpdmVcbiAgICAgICAgICAgICAgICAgICAgdXJsQW5jaG9yLmhyZWYgPSB1cmxBbmNob3IuaHJlZjtcbiAgICAgICAgICAgICAgICAgICAgcy5jcm9zc0RvbWFpbiA9IG9yaWdpbkFuY2hvci5wcm90b2NvbCArIFwiLy9cIiArIG9yaWdpbkFuY2hvci5ob3N0ICE9PVxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsQW5jaG9yLnByb3RvY29sICsgXCIvL1wiICsgdXJsQW5jaG9yLmhvc3Q7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoIGUgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYW4gZXJyb3IgcGFyc2luZyB0aGUgVVJMLCBhc3N1bWUgaXQgaXMgY3Jvc3NEb21haW4sXG4gICAgICAgICAgICAgICAgICAgIC8vIGl0IGNhbiBiZSByZWplY3RlZCBieSB0aGUgdHJhbnNwb3J0IGlmIGl0IGlzIGludmFsaWRcbiAgICAgICAgICAgICAgICAgICAgcy5jcm9zc0RvbWFpbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDb252ZXJ0IGRhdGEgaWYgbm90IGFscmVhZHkgYSBzdHJpbmdcbiAgICAgICAgICAgIGlmICggcy5kYXRhICYmIHMucHJvY2Vzc0RhdGEgJiYgdHlwZW9mIHMuZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcbiAgICAgICAgICAgICAgICBzLmRhdGEgPSBqUXVlcnkucGFyYW0oIHMuZGF0YSwgcy50cmFkaXRpb25hbCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBcHBseSBwcmVmaWx0ZXJzXG4gICAgICAgICAgICBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycywgcywgb3B0aW9ucywganFYSFIgKTtcblxuICAgICAgICAgICAgLy8gSWYgcmVxdWVzdCB3YXMgYWJvcnRlZCBpbnNpZGUgYSBwcmVmaWx0ZXIsIHN0b3AgdGhlcmVcbiAgICAgICAgICAgIGlmICggY29tcGxldGVkICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBqcVhIUjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2UgY2FuIGZpcmUgZ2xvYmFsIGV2ZW50cyBhcyBvZiBub3cgaWYgYXNrZWQgdG9cbiAgICAgICAgICAgIC8vIERvbid0IGZpcmUgZXZlbnRzIGlmIGpRdWVyeS5ldmVudCBpcyB1bmRlZmluZWQgaW4gYW4gQU1ELXVzYWdlIHNjZW5hcmlvICgjMTUxMTgpXG4gICAgICAgICAgICBmaXJlR2xvYmFscyA9IGpRdWVyeS5ldmVudCAmJiBzLmdsb2JhbDtcblxuICAgICAgICAgICAgLy8gV2F0Y2ggZm9yIGEgbmV3IHNldCBvZiByZXF1ZXN0c1xuICAgICAgICAgICAgaWYgKCBmaXJlR2xvYmFscyAmJiBqUXVlcnkuYWN0aXZlKysgPT09IDAgKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LnRyaWdnZXIoIFwiYWpheFN0YXJ0XCIgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXBwZXJjYXNlIHRoZSB0eXBlXG4gICAgICAgICAgICBzLnR5cGUgPSBzLnR5cGUudG9VcHBlckNhc2UoKTtcblxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIHJlcXVlc3QgaGFzIGNvbnRlbnRcbiAgICAgICAgICAgIHMuaGFzQ29udGVudCA9ICFybm9Db250ZW50LnRlc3QoIHMudHlwZSApO1xuXG4gICAgICAgICAgICAvLyBTYXZlIHRoZSBVUkwgaW4gY2FzZSB3ZSdyZSB0b3lpbmcgd2l0aCB0aGUgSWYtTW9kaWZpZWQtU2luY2VcbiAgICAgICAgICAgIC8vIGFuZC9vciBJZi1Ob25lLU1hdGNoIGhlYWRlciBsYXRlciBvblxuICAgICAgICAgICAgLy8gUmVtb3ZlIGhhc2ggdG8gc2ltcGxpZnkgdXJsIG1hbmlwdWxhdGlvblxuICAgICAgICAgICAgY2FjaGVVUkwgPSBzLnVybC5yZXBsYWNlKCByaGFzaCwgXCJcIiApO1xuXG4gICAgICAgICAgICAvLyBNb3JlIG9wdGlvbnMgaGFuZGxpbmcgZm9yIHJlcXVlc3RzIHdpdGggbm8gY29udGVudFxuICAgICAgICAgICAgaWYgKCAhcy5oYXNDb250ZW50ICkge1xuXG4gICAgICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhlIGhhc2ggc28gd2UgY2FuIHB1dCBpdCBiYWNrXG4gICAgICAgICAgICAgICAgdW5jYWNoZWQgPSBzLnVybC5zbGljZSggY2FjaGVVUkwubGVuZ3RoICk7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiBkYXRhIGlzIGF2YWlsYWJsZSBhbmQgc2hvdWxkIGJlIHByb2Nlc3NlZCwgYXBwZW5kIGRhdGEgdG8gdXJsXG4gICAgICAgICAgICAgICAgaWYgKCBzLmRhdGEgJiYgKCBzLnByb2Nlc3NEYXRhIHx8IHR5cGVvZiBzLmRhdGEgPT09IFwic3RyaW5nXCIgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVVUkwgKz0gKCBycXVlcnkudGVzdCggY2FjaGVVUkwgKSA/IFwiJlwiIDogXCI/XCIgKSArIHMuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICAvLyAjOTY4MjogcmVtb3ZlIGRhdGEgc28gdGhhdCBpdCdzIG5vdCB1c2VkIGluIGFuIGV2ZW50dWFsIHJldHJ5XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzLmRhdGE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQWRkIG9yIHVwZGF0ZSBhbnRpLWNhY2hlIHBhcmFtIGlmIG5lZWRlZFxuICAgICAgICAgICAgICAgIGlmICggcy5jYWNoZSA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlVVJMID0gY2FjaGVVUkwucmVwbGFjZSggcmFudGlDYWNoZSwgXCIkMVwiICk7XG4gICAgICAgICAgICAgICAgICAgIHVuY2FjaGVkID0gKCBycXVlcnkudGVzdCggY2FjaGVVUkwgKSA/IFwiJlwiIDogXCI/XCIgKSArIFwiXz1cIiArICggbm9uY2UrKyApICsgdW5jYWNoZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUHV0IGhhc2ggYW5kIGFudGktY2FjaGUgb24gdGhlIFVSTCB0aGF0IHdpbGwgYmUgcmVxdWVzdGVkIChnaC0xNzMyKVxuICAgICAgICAgICAgICAgIHMudXJsID0gY2FjaGVVUkwgKyB1bmNhY2hlZDtcblxuICAgICAgICAgICAgICAgIC8vIENoYW5nZSAnJTIwJyB0byAnKycgaWYgdGhpcyBpcyBlbmNvZGVkIGZvcm0gYm9keSBjb250ZW50IChnaC0yNjU4KVxuICAgICAgICAgICAgfSBlbHNlIGlmICggcy5kYXRhICYmIHMucHJvY2Vzc0RhdGEgJiZcbiAgICAgICAgICAgICAgICAoIHMuY29udGVudFR5cGUgfHwgXCJcIiApLmluZGV4T2YoIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIgKSA9PT0gMCApIHtcbiAgICAgICAgICAgICAgICBzLmRhdGEgPSBzLmRhdGEucmVwbGFjZSggcjIwLCBcIitcIiApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTZXQgdGhlIElmLU1vZGlmaWVkLVNpbmNlIGFuZC9vciBJZi1Ob25lLU1hdGNoIGhlYWRlciwgaWYgaW4gaWZNb2RpZmllZCBtb2RlLlxuICAgICAgICAgICAgaWYgKCBzLmlmTW9kaWZpZWQgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBqUXVlcnkubGFzdE1vZGlmaWVkWyBjYWNoZVVSTCBdICkge1xuICAgICAgICAgICAgICAgICAgICBqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBcIklmLU1vZGlmaWVkLVNpbmNlXCIsIGpRdWVyeS5sYXN0TW9kaWZpZWRbIGNhY2hlVVJMIF0gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCBqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSApIHtcbiAgICAgICAgICAgICAgICAgICAganFYSFIuc2V0UmVxdWVzdEhlYWRlciggXCJJZi1Ob25lLU1hdGNoXCIsIGpRdWVyeS5ldGFnWyBjYWNoZVVSTCBdICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGNvcnJlY3QgaGVhZGVyLCBpZiBkYXRhIGlzIGJlaW5nIHNlbnRcbiAgICAgICAgICAgIGlmICggcy5kYXRhICYmIHMuaGFzQ29udGVudCAmJiBzLmNvbnRlbnRUeXBlICE9PSBmYWxzZSB8fCBvcHRpb25zLmNvbnRlbnRUeXBlICkge1xuICAgICAgICAgICAgICAgIGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiQ29udGVudC1UeXBlXCIsIHMuY29udGVudFR5cGUgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2V0IHRoZSBBY2NlcHRzIGhlYWRlciBmb3IgdGhlIHNlcnZlciwgZGVwZW5kaW5nIG9uIHRoZSBkYXRhVHlwZVxuICAgICAgICAgICAganFYSFIuc2V0UmVxdWVzdEhlYWRlcihcbiAgICAgICAgICAgICAgICBcIkFjY2VwdFwiLFxuICAgICAgICAgICAgICAgIHMuZGF0YVR5cGVzWyAwIF0gJiYgcy5hY2NlcHRzWyBzLmRhdGFUeXBlc1sgMCBdIF0gP1xuICAgICAgICAgICAgICAgICAgICBzLmFjY2VwdHNbIHMuZGF0YVR5cGVzWyAwIF0gXSArXG4gICAgICAgICAgICAgICAgICAgICggcy5kYXRhVHlwZXNbIDAgXSAhPT0gXCIqXCIgPyBcIiwgXCIgKyBhbGxUeXBlcyArIFwiOyBxPTAuMDFcIiA6IFwiXCIgKSA6XG4gICAgICAgICAgICAgICAgICAgIHMuYWNjZXB0c1sgXCIqXCIgXVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGhlYWRlcnMgb3B0aW9uXG4gICAgICAgICAgICBmb3IgKCBpIGluIHMuaGVhZGVycyApIHtcbiAgICAgICAgICAgICAgICBqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBzLmhlYWRlcnNbIGkgXSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBbGxvdyBjdXN0b20gaGVhZGVycy9taW1ldHlwZXMgYW5kIGVhcmx5IGFib3J0XG4gICAgICAgICAgICBpZiAoIHMuYmVmb3JlU2VuZCAmJlxuICAgICAgICAgICAgICAgICggcy5iZWZvcmVTZW5kLmNhbGwoIGNhbGxiYWNrQ29udGV4dCwganFYSFIsIHMgKSA9PT0gZmFsc2UgfHwgY29tcGxldGVkICkgKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBBYm9ydCBpZiBub3QgZG9uZSBhbHJlYWR5IGFuZCByZXR1cm5cbiAgICAgICAgICAgICAgICByZXR1cm4ganFYSFIuYWJvcnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQWJvcnRpbmcgaXMgbm8gbG9uZ2VyIGEgY2FuY2VsbGF0aW9uXG4gICAgICAgICAgICBzdHJBYm9ydCA9IFwiYWJvcnRcIjtcblxuICAgICAgICAgICAgLy8gSW5zdGFsbCBjYWxsYmFja3Mgb24gZGVmZXJyZWRzXG4gICAgICAgICAgICBjb21wbGV0ZURlZmVycmVkLmFkZCggcy5jb21wbGV0ZSApO1xuICAgICAgICAgICAganFYSFIuZG9uZSggcy5zdWNjZXNzICk7XG4gICAgICAgICAgICBqcVhIUi5mYWlsKCBzLmVycm9yICk7XG5cbiAgICAgICAgICAgIC8vIEdldCB0cmFuc3BvcnRcbiAgICAgICAgICAgIHRyYW5zcG9ydCA9IGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCB0cmFuc3BvcnRzLCBzLCBvcHRpb25zLCBqcVhIUiApO1xuXG4gICAgICAgICAgICAvLyBJZiBubyB0cmFuc3BvcnQsIHdlIGF1dG8tYWJvcnRcbiAgICAgICAgICAgIGlmICggIXRyYW5zcG9ydCApIHtcbiAgICAgICAgICAgICAgICBkb25lKCAtMSwgXCJObyBUcmFuc3BvcnRcIiApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBqcVhIUi5yZWFkeVN0YXRlID0gMTtcblxuICAgICAgICAgICAgICAgIC8vIFNlbmQgZ2xvYmFsIGV2ZW50XG4gICAgICAgICAgICAgICAgaWYgKCBmaXJlR2xvYmFscyApIHtcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsRXZlbnRDb250ZXh0LnRyaWdnZXIoIFwiYWpheFNlbmRcIiwgWyBqcVhIUiwgcyBdICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gSWYgcmVxdWVzdCB3YXMgYWJvcnRlZCBpbnNpZGUgYWpheFNlbmQsIHN0b3AgdGhlcmVcbiAgICAgICAgICAgICAgICBpZiAoIGNvbXBsZXRlZCApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGpxWEhSO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFRpbWVvdXRcbiAgICAgICAgICAgICAgICBpZiAoIHMuYXN5bmMgJiYgcy50aW1lb3V0ID4gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dFRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAganFYSFIuYWJvcnQoIFwidGltZW91dFwiICk7XG4gICAgICAgICAgICAgICAgICAgIH0sIHMudGltZW91dCApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc2VuZCggcmVxdWVzdEhlYWRlcnMsIGRvbmUgKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoICggZSApIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXRocm93IHBvc3QtY29tcGxldGlvbiBleGNlcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIGlmICggY29tcGxldGVkICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFByb3BhZ2F0ZSBvdGhlcnMgYXMgcmVzdWx0c1xuICAgICAgICAgICAgICAgICAgICBkb25lKCAtMSwgZSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIHdoZW4gZXZlcnl0aGluZyBpcyBkb25lXG4gICAgICAgICAgICBmdW5jdGlvbiBkb25lKCBzdGF0dXMsIG5hdGl2ZVN0YXR1c1RleHQsIHJlc3BvbnNlcywgaGVhZGVycyApIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNTdWNjZXNzLCBzdWNjZXNzLCBlcnJvciwgcmVzcG9uc2UsIG1vZGlmaWVkLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gbmF0aXZlU3RhdHVzVGV4dDtcblxuICAgICAgICAgICAgICAgIC8vIElnbm9yZSByZXBlYXQgaW52b2NhdGlvbnNcbiAgICAgICAgICAgICAgICBpZiAoIGNvbXBsZXRlZCApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAvLyBDbGVhciB0aW1lb3V0IGlmIGl0IGV4aXN0c1xuICAgICAgICAgICAgICAgIGlmICggdGltZW91dFRpbWVyICkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KCB0aW1lb3V0VGltZXIgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBEZXJlZmVyZW5jZSB0cmFuc3BvcnQgZm9yIGVhcmx5IGdhcmJhZ2UgY29sbGVjdGlvblxuICAgICAgICAgICAgICAgIC8vIChubyBtYXR0ZXIgaG93IGxvbmcgdGhlIGpxWEhSIG9iamVjdCB3aWxsIGJlIHVzZWQpXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2FjaGUgcmVzcG9uc2UgaGVhZGVyc1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlSGVhZGVyc1N0cmluZyA9IGhlYWRlcnMgfHwgXCJcIjtcblxuICAgICAgICAgICAgICAgIC8vIFNldCByZWFkeVN0YXRlXG4gICAgICAgICAgICAgICAganFYSFIucmVhZHlTdGF0ZSA9IHN0YXR1cyA+IDAgPyA0IDogMDtcblxuICAgICAgICAgICAgICAgIC8vIERldGVybWluZSBpZiBzdWNjZXNzZnVsXG4gICAgICAgICAgICAgICAgaXNTdWNjZXNzID0gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDAgfHwgc3RhdHVzID09PSAzMDQ7XG5cbiAgICAgICAgICAgICAgICAvLyBHZXQgcmVzcG9uc2UgZGF0YVxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2VzICkge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IGFqYXhIYW5kbGVSZXNwb25zZXMoIHMsIGpxWEhSLCByZXNwb25zZXMgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IG5vIG1hdHRlciB3aGF0ICh0aGF0IHdheSByZXNwb25zZVhYWCBmaWVsZHMgYXJlIGFsd2F5cyBzZXQpXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBhamF4Q29udmVydCggcywgcmVzcG9uc2UsIGpxWEhSLCBpc1N1Y2Nlc3MgKTtcblxuICAgICAgICAgICAgICAgIC8vIElmIHN1Y2Nlc3NmdWwsIGhhbmRsZSB0eXBlIGNoYWluaW5nXG4gICAgICAgICAgICAgICAgaWYgKCBpc1N1Y2Nlc3MgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBJZi1Nb2RpZmllZC1TaW5jZSBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIsIGlmIGluIGlmTW9kaWZpZWQgbW9kZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCBzLmlmTW9kaWZpZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllZCA9IGpxWEhSLmdldFJlc3BvbnNlSGVhZGVyKCBcIkxhc3QtTW9kaWZpZWRcIiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBtb2RpZmllZCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkubGFzdE1vZGlmaWVkWyBjYWNoZVVSTCBdID0gbW9kaWZpZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllZCA9IGpxWEhSLmdldFJlc3BvbnNlSGVhZGVyKCBcImV0YWdcIiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBtb2RpZmllZCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSA9IG1vZGlmaWVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgbm8gY29udGVudFxuICAgICAgICAgICAgICAgICAgICBpZiAoIHN0YXR1cyA9PT0gMjA0IHx8IHMudHlwZSA9PT0gXCJIRUFEXCIgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJub2NvbnRlbnRcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgbm90IG1vZGlmaWVkXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHN0YXR1cyA9PT0gMzA0ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dCA9IFwibm90bW9kaWZpZWRcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBkYXRhLCBsZXQncyBjb252ZXJ0IGl0XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gcmVzcG9uc2UuZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1N1Y2Nlc3MgPSAhZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgZXJyb3IgZnJvbSBzdGF0dXNUZXh0IGFuZCBub3JtYWxpemUgZm9yIG5vbi1hYm9ydHNcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHN0YXR1cyB8fCAhc3RhdHVzVGV4dCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcImVycm9yXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHN0YXR1cyA8IDAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFNldCBkYXRhIGZvciB0aGUgZmFrZSB4aHIgb2JqZWN0XG4gICAgICAgICAgICAgICAganFYSFIuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICAgICAgICAgIGpxWEhSLnN0YXR1c1RleHQgPSAoIG5hdGl2ZVN0YXR1c1RleHQgfHwgc3RhdHVzVGV4dCApICsgXCJcIjtcblxuICAgICAgICAgICAgICAgIC8vIFN1Y2Nlc3MvRXJyb3JcbiAgICAgICAgICAgICAgICBpZiAoIGlzU3VjY2VzcyApIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBzdWNjZXNzLCBzdGF0dXNUZXh0LCBqcVhIUiBdICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0V2l0aCggY2FsbGJhY2tDb250ZXh0LCBbIGpxWEhSLCBzdGF0dXNUZXh0LCBlcnJvciBdICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3NcbiAgICAgICAgICAgICAgICBqcVhIUi5zdGF0dXNDb2RlKCBzdGF0dXNDb2RlICk7XG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIGlmICggZmlyZUdsb2JhbHMgKSB7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKCBpc1N1Y2Nlc3MgPyBcImFqYXhTdWNjZXNzXCIgOiBcImFqYXhFcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgWyBqcVhIUiwgcywgaXNTdWNjZXNzID8gc3VjY2VzcyA6IGVycm9yIF0gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBDb21wbGV0ZVxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVmZXJyZWQuZmlyZVdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBqcVhIUiwgc3RhdHVzVGV4dCBdICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGZpcmVHbG9iYWxzICkge1xuICAgICAgICAgICAgICAgICAgICBnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggXCJhamF4Q29tcGxldGVcIiwgWyBqcVhIUiwgcyBdICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSGFuZGxlIHRoZSBnbG9iYWwgQUpBWCBjb3VudGVyXG4gICAgICAgICAgICAgICAgICAgIGlmICggISggLS1qUXVlcnkuYWN0aXZlICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlciggXCJhamF4U3RvcFwiICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBqcVhIUjtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRKU09OOiBmdW5jdGlvbiggdXJsLCBkYXRhLCBjYWxsYmFjayApIHtcbiAgICAgICAgICAgIHJldHVybiBqUXVlcnkuZ2V0KCB1cmwsIGRhdGEsIGNhbGxiYWNrLCBcImpzb25cIiApO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFNjcmlwdDogZnVuY3Rpb24oIHVybCwgY2FsbGJhY2sgKSB7XG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LmdldCggdXJsLCB1bmRlZmluZWQsIGNhbGxiYWNrLCBcInNjcmlwdFwiICk7XG4gICAgICAgIH1cbiAgICB9ICk7XG5cbiAgICBqUXVlcnkuZWFjaCggWyBcImdldFwiLCBcInBvc3RcIiBdLCBmdW5jdGlvbiggaSwgbWV0aG9kICkge1xuICAgICAgICBqUXVlcnlbIG1ldGhvZCBdID0gZnVuY3Rpb24oIHVybCwgZGF0YSwgY2FsbGJhY2ssIHR5cGUgKSB7XG5cbiAgICAgICAgICAgIC8vIFNoaWZ0IGFyZ3VtZW50cyBpZiBkYXRhIGFyZ3VtZW50IHdhcyBvbWl0dGVkXG4gICAgICAgICAgICBpZiAoIGlzRnVuY3Rpb24oIGRhdGEgKSApIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gdHlwZSB8fCBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGRhdGE7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVGhlIHVybCBjYW4gYmUgYW4gb3B0aW9ucyBvYmplY3QgKHdoaWNoIHRoZW4gbXVzdCBoYXZlIC51cmwpXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LmFqYXgoIGpRdWVyeS5leHRlbmQoIHtcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICB0eXBlOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBjYWxsYmFja1xuICAgICAgICAgICAgfSwgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIHVybCApICYmIHVybCApICk7XG4gICAgICAgIH07XG4gICAgfSApO1xuXG5cbiAgICBqUXVlcnkuX2V2YWxVcmwgPSBmdW5jdGlvbiggdXJsICkge1xuICAgICAgICByZXR1cm4galF1ZXJ5LmFqYXgoIHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuXG4gICAgICAgICAgICAvLyBNYWtlIHRoaXMgZXhwbGljaXQsIHNpbmNlIHVzZXIgY2FuIG92ZXJyaWRlIHRoaXMgdGhyb3VnaCBhamF4U2V0dXAgKCMxMTI2NClcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJzY3JpcHRcIixcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxuICAgICAgICAgICAgZ2xvYmFsOiBmYWxzZSxcbiAgICAgICAgICAgIFwidGhyb3dzXCI6IHRydWVcbiAgICAgICAgfSApO1xuICAgIH07XG5cblxuICAgIGpRdWVyeS5mbi5leHRlbmQoIHtcbiAgICAgICAgd3JhcEFsbDogZnVuY3Rpb24oIGh0bWwgKSB7XG4gICAgICAgICAgICB2YXIgd3JhcDtcblxuICAgICAgICAgICAgaWYgKCB0aGlzWyAwIF0gKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBpc0Z1bmN0aW9uKCBodG1sICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sLmNhbGwoIHRoaXNbIDAgXSApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFRoZSBlbGVtZW50cyB0byB3cmFwIHRoZSB0YXJnZXQgYXJvdW5kXG4gICAgICAgICAgICAgICAgd3JhcCA9IGpRdWVyeSggaHRtbCwgdGhpc1sgMCBdLm93bmVyRG9jdW1lbnQgKS5lcSggMCApLmNsb25lKCB0cnVlICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHRoaXNbIDAgXS5wYXJlbnROb2RlICkge1xuICAgICAgICAgICAgICAgICAgICB3cmFwLmluc2VydEJlZm9yZSggdGhpc1sgMCBdICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd3JhcC5tYXAoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCBlbGVtLmZpcnN0RWxlbWVudENoaWxkICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbTtcbiAgICAgICAgICAgICAgICB9ICkuYXBwZW5kKCB0aGlzICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIHdyYXBJbm5lcjogZnVuY3Rpb24oIGh0bWwgKSB7XG4gICAgICAgICAgICBpZiAoIGlzRnVuY3Rpb24oIGh0bWwgKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCB0aGlzICkud3JhcElubmVyKCBodG1sLmNhbGwoIHRoaXMsIGkgKSApO1xuICAgICAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSBqUXVlcnkoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudHMgPSBzZWxmLmNvbnRlbnRzKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGNvbnRlbnRzLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudHMud3JhcEFsbCggaHRtbCApO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hcHBlbmQoIGh0bWwgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgd3JhcDogZnVuY3Rpb24oIGh0bWwgKSB7XG4gICAgICAgICAgICB2YXIgaHRtbElzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uKCBodG1sICk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuICAgICAgICAgICAgICAgIGpRdWVyeSggdGhpcyApLndyYXBBbGwoIGh0bWxJc0Z1bmN0aW9uID8gaHRtbC5jYWxsKCB0aGlzLCBpICkgOiBodG1sICk7XG4gICAgICAgICAgICB9ICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdW53cmFwOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudCggc2VsZWN0b3IgKS5ub3QoIFwiYm9keVwiICkuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCB0aGlzICkucmVwbGFjZVdpdGgoIHRoaXMuY2hpbGROb2RlcyApO1xuICAgICAgICAgICAgfSApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9ICk7XG5cblxuICAgIGpRdWVyeS5leHByLnBzZXVkb3MuaGlkZGVuID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIHJldHVybiAhalF1ZXJ5LmV4cHIucHNldWRvcy52aXNpYmxlKCBlbGVtICk7XG4gICAgfTtcbiAgICBqUXVlcnkuZXhwci5wc2V1ZG9zLnZpc2libGUgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgcmV0dXJuICEhKCBlbGVtLm9mZnNldFdpZHRoIHx8IGVsZW0ub2Zmc2V0SGVpZ2h0IHx8IGVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggKTtcbiAgICB9O1xuXG5cblxuXG4gICAgalF1ZXJ5LmFqYXhTZXR0aW5ncy54aHIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIH0gY2F0Y2ggKCBlICkge31cbiAgICB9O1xuXG4gICAgdmFyIHhoclN1Y2Nlc3NTdGF0dXMgPSB7XG5cbiAgICAgICAgICAgIC8vIEZpbGUgcHJvdG9jb2wgYWx3YXlzIHlpZWxkcyBzdGF0dXMgY29kZSAwLCBhc3N1bWUgMjAwXG4gICAgICAgICAgICAwOiAyMDAsXG5cbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG4gICAgICAgICAgICAvLyAjMTQ1MDogc29tZXRpbWVzIElFIHJldHVybnMgMTIyMyB3aGVuIGl0IHNob3VsZCBiZSAyMDRcbiAgICAgICAgICAgIDEyMjM6IDIwNFxuICAgICAgICB9LFxuICAgICAgICB4aHJTdXBwb3J0ZWQgPSBqUXVlcnkuYWpheFNldHRpbmdzLnhocigpO1xuXG4gICAgc3VwcG9ydC5jb3JzID0gISF4aHJTdXBwb3J0ZWQgJiYgKCBcIndpdGhDcmVkZW50aWFsc1wiIGluIHhoclN1cHBvcnRlZCApO1xuICAgIHN1cHBvcnQuYWpheCA9IHhoclN1cHBvcnRlZCA9ICEheGhyU3VwcG9ydGVkO1xuXG4gICAgalF1ZXJ5LmFqYXhUcmFuc3BvcnQoIGZ1bmN0aW9uKCBvcHRpb25zICkge1xuICAgICAgICB2YXIgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2s7XG5cbiAgICAgICAgLy8gQ3Jvc3MgZG9tYWluIG9ubHkgYWxsb3dlZCBpZiBzdXBwb3J0ZWQgdGhyb3VnaCBYTUxIdHRwUmVxdWVzdFxuICAgICAgICBpZiAoIHN1cHBvcnQuY29ycyB8fCB4aHJTdXBwb3J0ZWQgJiYgIW9wdGlvbnMuY3Jvc3NEb21haW4gKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNlbmQ6IGZ1bmN0aW9uKCBoZWFkZXJzLCBjb21wbGV0ZSApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGksXG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIgPSBvcHRpb25zLnhocigpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhoci5vcGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy50eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy51cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmFzeW5jLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy51c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBBcHBseSBjdXN0b20gZmllbGRzIGlmIHByb3ZpZGVkXG4gICAgICAgICAgICAgICAgICAgIGlmICggb3B0aW9ucy54aHJGaWVsZHMgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKCBpIGluIG9wdGlvbnMueGhyRmllbGRzICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoclsgaSBdID0gb3B0aW9ucy54aHJGaWVsZHNbIGkgXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIE92ZXJyaWRlIG1pbWUgdHlwZSBpZiBuZWVkZWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBvcHRpb25zLm1pbWVUeXBlICYmIHhoci5vdmVycmlkZU1pbWVUeXBlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLm92ZXJyaWRlTWltZVR5cGUoIG9wdGlvbnMubWltZVR5cGUgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFgtUmVxdWVzdGVkLVdpdGggaGVhZGVyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZvciBjcm9zcy1kb21haW4gcmVxdWVzdHMsIHNlZWluZyBhcyBjb25kaXRpb25zIGZvciBhIHByZWZsaWdodCBhcmVcbiAgICAgICAgICAgICAgICAgICAgLy8gYWtpbiB0byBhIGppZ3NhdyBwdXp6bGUsIHdlIHNpbXBseSBuZXZlciBzZXQgaXQgdG8gYmUgc3VyZS5cbiAgICAgICAgICAgICAgICAgICAgLy8gKGl0IGNhbiBhbHdheXMgYmUgc2V0IG9uIGEgcGVyLXJlcXVlc3QgYmFzaXMgb3IgZXZlbiB1c2luZyBhamF4U2V0dXApXG4gICAgICAgICAgICAgICAgICAgIC8vIEZvciBzYW1lLWRvbWFpbiByZXF1ZXN0cywgd29uJ3QgY2hhbmdlIGhlYWRlciBpZiBhbHJlYWR5IHByb3ZpZGVkLlxuICAgICAgICAgICAgICAgICAgICBpZiAoICFvcHRpb25zLmNyb3NzRG9tYWluICYmICFoZWFkZXJzWyBcIlgtUmVxdWVzdGVkLVdpdGhcIiBdICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1sgXCJYLVJlcXVlc3RlZC1XaXRoXCIgXSA9IFwiWE1MSHR0cFJlcXVlc3RcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBoZWFkZXJzXG4gICAgICAgICAgICAgICAgICAgIGZvciAoIGkgaW4gaGVhZGVycyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBoZWFkZXJzWyBpIF0gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24oIHR5cGUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBjYWxsYmFjayApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBlcnJvckNhbGxiYWNrID0geGhyLm9ubG9hZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIub25lcnJvciA9IHhoci5vbmFib3J0ID0geGhyLm9udGltZW91dCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB0eXBlID09PSBcImFib3J0XCIgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggdHlwZSA9PT0gXCJlcnJvclwiICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT24gYSBtYW51YWwgbmF0aXZlIGFib3J0LCBJRTkgdGhyb3dzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlcnJvcnMgb24gYW55IHByb3BlcnR5IGFjY2VzcyB0aGF0IGlzIG5vdCByZWFkeVN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHR5cGVvZiB4aHIuc3RhdHVzICE9PSBcIm51bWJlclwiICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlKCAwLCBcImVycm9yXCIgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGUoXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlsZTogcHJvdG9jb2wgYWx3YXlzIHlpZWxkcyBzdGF0dXMgMDsgc2VlICM4NjA1LCAjMTQyMDdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnN0YXR1c1RleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyU3VjY2Vzc1N0YXR1c1sgeGhyLnN0YXR1cyBdIHx8IHhoci5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnN0YXR1c1RleHQsXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElFOSBoYXMgbm8gWEhSMiBidXQgdGhyb3dzIG9uIGJpbmFyeSAodHJhYy0xMTQyNilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGb3IgWEhSMiBub24tdGV4dCwgbGV0IHRoZSBjYWxsZXIgaGFuZGxlIGl0IChnaC0yNDk4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICggeGhyLnJlc3BvbnNlVHlwZSB8fCBcInRleHRcIiApICE9PSBcInRleHRcIiAgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgeGhyLnJlc3BvbnNlVGV4dCAhPT0gXCJzdHJpbmdcIiA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYmluYXJ5OiB4aHIucmVzcG9uc2UgfSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogeGhyLnJlc3BvbnNlVGV4dCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gTGlzdGVuIHRvIGV2ZW50c1xuICAgICAgICAgICAgICAgICAgICB4aHIub25sb2FkID0gY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayA9IHhoci5vbmVycm9yID0geGhyLm9udGltZW91dCA9IGNhbGxiYWNrKCBcImVycm9yXCIgKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRSA5IG9ubHlcbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlIG9ucmVhZHlzdGF0ZWNoYW5nZSB0byByZXBsYWNlIG9uYWJvcnRcbiAgICAgICAgICAgICAgICAgICAgLy8gdG8gaGFuZGxlIHVuY2F1Z2h0IGFib3J0c1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHhoci5vbmFib3J0ICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIub25hYm9ydCA9IGVycm9yQ2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayByZWFkeVN0YXRlIGJlZm9yZSB0aW1lb3V0IGFzIGl0IGNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHhoci5yZWFkeVN0YXRlID09PSA0ICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFsbG93IG9uZXJyb3IgdG8gYmUgY2FsbGVkIGZpcnN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBidXQgdGhhdCB3aWxsIG5vdCBoYW5kbGUgYSBuYXRpdmUgYWJvcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWxzbywgc2F2ZSBlcnJvckNhbGxiYWNrIHRvIGEgdmFyaWFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXMgeGhyLm9uZXJyb3IgY2Fubm90IGJlIGFjY2Vzc2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggY2FsbGJhY2sgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgYWJvcnQgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayggXCJhYm9ydFwiICk7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG8gc2VuZCB0aGUgcmVxdWVzdCAodGhpcyBtYXkgcmFpc2UgYW4gZXhjZXB0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNlbmQoIG9wdGlvbnMuaGFzQ29udGVudCAmJiBvcHRpb25zLmRhdGEgfHwgbnVsbCApO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoICggZSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gIzE0NjgzOiBPbmx5IHJldGhyb3cgaWYgdGhpcyBoYXNuJ3QgYmVlbiBub3RpZmllZCBhcyBhbiBlcnJvciB5ZXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggY2FsbGJhY2sgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBhYm9ydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggY2FsbGJhY2sgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0gKTtcblxuXG5cblxuLy8gUHJldmVudCBhdXRvLWV4ZWN1dGlvbiBvZiBzY3JpcHRzIHdoZW4gbm8gZXhwbGljaXQgZGF0YVR5cGUgd2FzIHByb3ZpZGVkIChTZWUgZ2gtMjQzMilcbiAgICBqUXVlcnkuYWpheFByZWZpbHRlciggZnVuY3Rpb24oIHMgKSB7XG4gICAgICAgIGlmICggcy5jcm9zc0RvbWFpbiApIHtcbiAgICAgICAgICAgIHMuY29udGVudHMuc2NyaXB0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9ICk7XG5cbi8vIEluc3RhbGwgc2NyaXB0IGRhdGFUeXBlXG4gICAgalF1ZXJ5LmFqYXhTZXR1cCgge1xuICAgICAgICBhY2NlcHRzOiB7XG4gICAgICAgICAgICBzY3JpcHQ6IFwidGV4dC9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9qYXZhc2NyaXB0LCBcIiArXG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uL2VjbWFzY3JpcHQsIGFwcGxpY2F0aW9uL3gtZWNtYXNjcmlwdFwiXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRlbnRzOiB7XG4gICAgICAgICAgICBzY3JpcHQ6IC9cXGIoPzpqYXZhfGVjbWEpc2NyaXB0XFxiL1xuICAgICAgICB9LFxuICAgICAgICBjb252ZXJ0ZXJzOiB7XG4gICAgICAgICAgICBcInRleHQgc2NyaXB0XCI6IGZ1bmN0aW9uKCB0ZXh0ICkge1xuICAgICAgICAgICAgICAgIGpRdWVyeS5nbG9iYWxFdmFsKCB0ZXh0ICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9ICk7XG5cbi8vIEhhbmRsZSBjYWNoZSdzIHNwZWNpYWwgY2FzZSBhbmQgY3Jvc3NEb21haW5cbiAgICBqUXVlcnkuYWpheFByZWZpbHRlciggXCJzY3JpcHRcIiwgZnVuY3Rpb24oIHMgKSB7XG4gICAgICAgIGlmICggcy5jYWNoZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgcy5jYWNoZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICggcy5jcm9zc0RvbWFpbiApIHtcbiAgICAgICAgICAgIHMudHlwZSA9IFwiR0VUXCI7XG4gICAgICAgIH1cbiAgICB9ICk7XG5cbi8vIEJpbmQgc2NyaXB0IHRhZyBoYWNrIHRyYW5zcG9ydFxuICAgIGpRdWVyeS5hamF4VHJhbnNwb3J0KCBcInNjcmlwdFwiLCBmdW5jdGlvbiggcyApIHtcblxuICAgICAgICAvLyBUaGlzIHRyYW5zcG9ydCBvbmx5IGRlYWxzIHdpdGggY3Jvc3MgZG9tYWluIHJlcXVlc3RzXG4gICAgICAgIGlmICggcy5jcm9zc0RvbWFpbiApIHtcbiAgICAgICAgICAgIHZhciBzY3JpcHQsIGNhbGxiYWNrO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzZW5kOiBmdW5jdGlvbiggXywgY29tcGxldGUgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdCA9IGpRdWVyeSggXCI8c2NyaXB0PlwiICkucHJvcCgge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNldDogcy5zY3JpcHRDaGFyc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBzLnVybFxuICAgICAgICAgICAgICAgICAgICB9ICkub24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxvYWQgZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24oIGV2dCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZXZ0ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZSggZXZ0LnR5cGUgPT09IFwiZXJyb3JcIiA/IDQwNCA6IDIwMCwgZXZ0LnR5cGUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlIG5hdGl2ZSBET00gbWFuaXB1bGF0aW9uIHRvIGF2b2lkIG91ciBkb21NYW5pcCBBSkFYIHRyaWNrZXJ5XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoIHNjcmlwdFsgMCBdICk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhYm9ydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggY2FsbGJhY2sgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0gKTtcblxuXG5cblxuICAgIHZhciBvbGRDYWxsYmFja3MgPSBbXSxcbiAgICAgICAgcmpzb25wID0gLyg9KVxcPyg/PSZ8JCl8XFw/XFw/LztcblxuLy8gRGVmYXVsdCBqc29ucCBzZXR0aW5nc1xuICAgIGpRdWVyeS5hamF4U2V0dXAoIHtcbiAgICAgICAganNvbnA6IFwiY2FsbGJhY2tcIixcbiAgICAgICAganNvbnBDYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBvbGRDYWxsYmFja3MucG9wKCkgfHwgKCBqUXVlcnkuZXhwYW5kbyArIFwiX1wiICsgKCBub25jZSsrICkgKTtcbiAgICAgICAgICAgIHRoaXNbIGNhbGxiYWNrIF0gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrO1xuICAgICAgICB9XG4gICAgfSApO1xuXG4vLyBEZXRlY3QsIG5vcm1hbGl6ZSBvcHRpb25zIGFuZCBpbnN0YWxsIGNhbGxiYWNrcyBmb3IganNvbnAgcmVxdWVzdHNcbiAgICBqUXVlcnkuYWpheFByZWZpbHRlciggXCJqc29uIGpzb25wXCIsIGZ1bmN0aW9uKCBzLCBvcmlnaW5hbFNldHRpbmdzLCBqcVhIUiApIHtcblxuICAgICAgICB2YXIgY2FsbGJhY2tOYW1lLCBvdmVyd3JpdHRlbiwgcmVzcG9uc2VDb250YWluZXIsXG4gICAgICAgICAgICBqc29uUHJvcCA9IHMuanNvbnAgIT09IGZhbHNlICYmICggcmpzb25wLnRlc3QoIHMudXJsICkgP1xuICAgICAgICAgICAgICAgICAgICBcInVybFwiIDpcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHMuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgICAgICAoIHMuY29udGVudFR5cGUgfHwgXCJcIiApXG4gICAgICAgICAgICAgICAgICAgICAgICAuaW5kZXhPZiggXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIiApID09PSAwICYmXG4gICAgICAgICAgICAgICAgICAgIHJqc29ucC50ZXN0KCBzLmRhdGEgKSAmJiBcImRhdGFcIlxuICAgICAgICAgICAgKTtcblxuICAgICAgICAvLyBIYW5kbGUgaWZmIHRoZSBleHBlY3RlZCBkYXRhIHR5cGUgaXMgXCJqc29ucFwiIG9yIHdlIGhhdmUgYSBwYXJhbWV0ZXIgdG8gc2V0XG4gICAgICAgIGlmICgganNvblByb3AgfHwgcy5kYXRhVHlwZXNbIDAgXSA9PT0gXCJqc29ucFwiICkge1xuXG4gICAgICAgICAgICAvLyBHZXQgY2FsbGJhY2sgbmFtZSwgcmVtZW1iZXJpbmcgcHJlZXhpc3RpbmcgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGl0XG4gICAgICAgICAgICBjYWxsYmFja05hbWUgPSBzLmpzb25wQ2FsbGJhY2sgPSBpc0Z1bmN0aW9uKCBzLmpzb25wQ2FsbGJhY2sgKSA/XG4gICAgICAgICAgICAgICAgcy5qc29ucENhbGxiYWNrKCkgOlxuICAgICAgICAgICAgICAgIHMuanNvbnBDYWxsYmFjaztcblxuICAgICAgICAgICAgLy8gSW5zZXJ0IGNhbGxiYWNrIGludG8gdXJsIG9yIGZvcm0gZGF0YVxuICAgICAgICAgICAgaWYgKCBqc29uUHJvcCApIHtcbiAgICAgICAgICAgICAgICBzWyBqc29uUHJvcCBdID0gc1sganNvblByb3AgXS5yZXBsYWNlKCByanNvbnAsIFwiJDFcIiArIGNhbGxiYWNrTmFtZSApO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggcy5qc29ucCAhPT0gZmFsc2UgKSB7XG4gICAgICAgICAgICAgICAgcy51cmwgKz0gKCBycXVlcnkudGVzdCggcy51cmwgKSA/IFwiJlwiIDogXCI/XCIgKSArIHMuanNvbnAgKyBcIj1cIiArIGNhbGxiYWNrTmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXNlIGRhdGEgY29udmVydGVyIHRvIHJldHJpZXZlIGpzb24gYWZ0ZXIgc2NyaXB0IGV4ZWN1dGlvblxuICAgICAgICAgICAgcy5jb252ZXJ0ZXJzWyBcInNjcmlwdCBqc29uXCIgXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICggIXJlc3BvbnNlQ29udGFpbmVyICkge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXJyb3IoIGNhbGxiYWNrTmFtZSArIFwiIHdhcyBub3QgY2FsbGVkXCIgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlQ29udGFpbmVyWyAwIF07XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBGb3JjZSBqc29uIGRhdGFUeXBlXG4gICAgICAgICAgICBzLmRhdGFUeXBlc1sgMCBdID0gXCJqc29uXCI7XG5cbiAgICAgICAgICAgIC8vIEluc3RhbGwgY2FsbGJhY2tcbiAgICAgICAgICAgIG92ZXJ3cml0dGVuID0gd2luZG93WyBjYWxsYmFja05hbWUgXTtcbiAgICAgICAgICAgIHdpbmRvd1sgY2FsbGJhY2tOYW1lIF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZUNvbnRhaW5lciA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIENsZWFuLXVwIGZ1bmN0aW9uIChmaXJlcyBhZnRlciBjb252ZXJ0ZXJzKVxuICAgICAgICAgICAganFYSFIuYWx3YXlzKCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIC8vIElmIHByZXZpb3VzIHZhbHVlIGRpZG4ndCBleGlzdCAtIHJlbW92ZSBpdFxuICAgICAgICAgICAgICAgIGlmICggb3ZlcndyaXR0ZW4gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCB3aW5kb3cgKS5yZW1vdmVQcm9wKCBjYWxsYmFja05hbWUgKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgcmVzdG9yZSBwcmVleGlzdGluZyB2YWx1ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd1sgY2FsbGJhY2tOYW1lIF0gPSBvdmVyd3JpdHRlbjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBTYXZlIGJhY2sgYXMgZnJlZVxuICAgICAgICAgICAgICAgIGlmICggc1sgY2FsbGJhY2tOYW1lIF0gKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgcmUtdXNpbmcgdGhlIG9wdGlvbnMgZG9lc24ndCBzY3JldyB0aGluZ3MgYXJvdW5kXG4gICAgICAgICAgICAgICAgICAgIHMuanNvbnBDYWxsYmFjayA9IG9yaWdpbmFsU2V0dGluZ3MuanNvbnBDYWxsYmFjaztcblxuICAgICAgICAgICAgICAgICAgICAvLyBTYXZlIHRoZSBjYWxsYmFjayBuYW1lIGZvciBmdXR1cmUgdXNlXG4gICAgICAgICAgICAgICAgICAgIG9sZENhbGxiYWNrcy5wdXNoKCBjYWxsYmFja05hbWUgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBDYWxsIGlmIGl0IHdhcyBhIGZ1bmN0aW9uIGFuZCB3ZSBoYXZlIGEgcmVzcG9uc2VcbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlQ29udGFpbmVyICYmIGlzRnVuY3Rpb24oIG92ZXJ3cml0dGVuICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIG92ZXJ3cml0dGVuKCByZXNwb25zZUNvbnRhaW5lclsgMCBdICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VDb250YWluZXIgPSBvdmVyd3JpdHRlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0gKTtcblxuICAgICAgICAgICAgLy8gRGVsZWdhdGUgdG8gc2NyaXB0XG4gICAgICAgICAgICByZXR1cm4gXCJzY3JpcHRcIjtcbiAgICAgICAgfVxuICAgIH0gKTtcblxuXG5cblxuLy8gU3VwcG9ydDogU2FmYXJpIDggb25seVxuLy8gSW4gU2FmYXJpIDggZG9jdW1lbnRzIGNyZWF0ZWQgdmlhIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudFxuLy8gY29sbGFwc2Ugc2libGluZyBmb3JtczogdGhlIHNlY29uZCBvbmUgYmVjb21lcyBhIGNoaWxkIG9mIHRoZSBmaXJzdCBvbmUuXG4vLyBCZWNhdXNlIG9mIHRoYXQsIHRoaXMgc2VjdXJpdHkgbWVhc3VyZSBoYXMgdG8gYmUgZGlzYWJsZWQgaW4gU2FmYXJpIDguXG4vLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM3MzM3XG4gICAgc3VwcG9ydC5jcmVhdGVIVE1MRG9jdW1lbnQgPSAoIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCggXCJcIiApLmJvZHk7XG4gICAgICAgIGJvZHkuaW5uZXJIVE1MID0gXCI8Zm9ybT48L2Zvcm0+PGZvcm0+PC9mb3JtPlwiO1xuICAgICAgICByZXR1cm4gYm9keS5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMjtcbiAgICB9ICkoKTtcblxuXG4vLyBBcmd1bWVudCBcImRhdGFcIiBzaG91bGQgYmUgc3RyaW5nIG9mIGh0bWxcbi8vIGNvbnRleHQgKG9wdGlvbmFsKTogSWYgc3BlY2lmaWVkLCB0aGUgZnJhZ21lbnQgd2lsbCBiZSBjcmVhdGVkIGluIHRoaXMgY29udGV4dCxcbi8vIGRlZmF1bHRzIHRvIGRvY3VtZW50XG4vLyBrZWVwU2NyaXB0cyAob3B0aW9uYWwpOiBJZiB0cnVlLCB3aWxsIGluY2x1ZGUgc2NyaXB0cyBwYXNzZWQgaW4gdGhlIGh0bWwgc3RyaW5nXG4gICAgalF1ZXJ5LnBhcnNlSFRNTCA9IGZ1bmN0aW9uKCBkYXRhLCBjb250ZXh0LCBrZWVwU2NyaXB0cyApIHtcbiAgICAgICAgaWYgKCB0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHR5cGVvZiBjb250ZXh0ID09PSBcImJvb2xlYW5cIiApIHtcbiAgICAgICAgICAgIGtlZXBTY3JpcHRzID0gY29udGV4dDtcbiAgICAgICAgICAgIGNvbnRleHQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBiYXNlLCBwYXJzZWQsIHNjcmlwdHM7XG5cbiAgICAgICAgaWYgKCAhY29udGV4dCApIHtcblxuICAgICAgICAgICAgLy8gU3RvcCBzY3JpcHRzIG9yIGlubGluZSBldmVudCBoYW5kbGVycyBmcm9tIGJlaW5nIGV4ZWN1dGVkIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICAvLyBieSB1c2luZyBkb2N1bWVudC5pbXBsZW1lbnRhdGlvblxuICAgICAgICAgICAgaWYgKCBzdXBwb3J0LmNyZWF0ZUhUTUxEb2N1bWVudCApIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCBcIlwiICk7XG5cbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIGJhc2UgaHJlZiBmb3IgdGhlIGNyZWF0ZWQgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAvLyBzbyBhbnkgcGFyc2VkIGVsZW1lbnRzIHdpdGggVVJMc1xuICAgICAgICAgICAgICAgIC8vIGFyZSBiYXNlZCBvbiB0aGUgZG9jdW1lbnQncyBVUkwgKGdoLTI5NjUpXG4gICAgICAgICAgICAgICAgYmFzZSA9IGNvbnRleHQuY3JlYXRlRWxlbWVudCggXCJiYXNlXCIgKTtcbiAgICAgICAgICAgICAgICBiYXNlLmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuaGVhZC5hcHBlbmRDaGlsZCggYmFzZSApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gZG9jdW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwYXJzZWQgPSByc2luZ2xlVGFnLmV4ZWMoIGRhdGEgKTtcbiAgICAgICAgc2NyaXB0cyA9ICFrZWVwU2NyaXB0cyAmJiBbXTtcblxuICAgICAgICAvLyBTaW5nbGUgdGFnXG4gICAgICAgIGlmICggcGFyc2VkICkge1xuICAgICAgICAgICAgcmV0dXJuIFsgY29udGV4dC5jcmVhdGVFbGVtZW50KCBwYXJzZWRbIDEgXSApIF07XG4gICAgICAgIH1cblxuICAgICAgICBwYXJzZWQgPSBidWlsZEZyYWdtZW50KCBbIGRhdGEgXSwgY29udGV4dCwgc2NyaXB0cyApO1xuXG4gICAgICAgIGlmICggc2NyaXB0cyAmJiBzY3JpcHRzLmxlbmd0aCApIHtcbiAgICAgICAgICAgIGpRdWVyeSggc2NyaXB0cyApLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGpRdWVyeS5tZXJnZSggW10sIHBhcnNlZC5jaGlsZE5vZGVzICk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogTG9hZCBhIHVybCBpbnRvIGEgcGFnZVxuICAgICAqL1xuICAgIGpRdWVyeS5mbi5sb2FkID0gZnVuY3Rpb24oIHVybCwgcGFyYW1zLCBjYWxsYmFjayApIHtcbiAgICAgICAgdmFyIHNlbGVjdG9yLCB0eXBlLCByZXNwb25zZSxcbiAgICAgICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgb2ZmID0gdXJsLmluZGV4T2YoIFwiIFwiICk7XG5cbiAgICAgICAgaWYgKCBvZmYgPiAtMSApIHtcbiAgICAgICAgICAgIHNlbGVjdG9yID0gc3RyaXBBbmRDb2xsYXBzZSggdXJsLnNsaWNlKCBvZmYgKSApO1xuICAgICAgICAgICAgdXJsID0gdXJsLnNsaWNlKCAwLCBvZmYgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGl0J3MgYSBmdW5jdGlvblxuICAgICAgICBpZiAoIGlzRnVuY3Rpb24oIHBhcmFtcyApICkge1xuXG4gICAgICAgICAgICAvLyBXZSBhc3N1bWUgdGhhdCBpdCdzIHRoZSBjYWxsYmFja1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBwYXJhbXM7XG4gICAgICAgICAgICBwYXJhbXMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgYnVpbGQgYSBwYXJhbSBzdHJpbmdcbiAgICAgICAgfSBlbHNlIGlmICggcGFyYW1zICYmIHR5cGVvZiBwYXJhbXMgPT09IFwib2JqZWN0XCIgKSB7XG4gICAgICAgICAgICB0eXBlID0gXCJQT1NUXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB3ZSBoYXZlIGVsZW1lbnRzIHRvIG1vZGlmeSwgbWFrZSB0aGUgcmVxdWVzdFxuICAgICAgICBpZiAoIHNlbGYubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIGpRdWVyeS5hamF4KCB7XG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG5cbiAgICAgICAgICAgICAgICAvLyBJZiBcInR5cGVcIiB2YXJpYWJsZSBpcyB1bmRlZmluZWQsIHRoZW4gXCJHRVRcIiBtZXRob2Qgd2lsbCBiZSB1c2VkLlxuICAgICAgICAgICAgICAgIC8vIE1ha2UgdmFsdWUgb2YgdGhpcyBmaWVsZCBleHBsaWNpdCBzaW5jZVxuICAgICAgICAgICAgICAgIC8vIHVzZXIgY2FuIG92ZXJyaWRlIGl0IHRocm91Z2ggYWpheFNldHVwIG1ldGhvZFxuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUgfHwgXCJHRVRcIixcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJodG1sXCIsXG4gICAgICAgICAgICAgICAgZGF0YTogcGFyYW1zXG4gICAgICAgICAgICB9ICkuZG9uZSggZnVuY3Rpb24oIHJlc3BvbnNlVGV4dCApIHtcblxuICAgICAgICAgICAgICAgIC8vIFNhdmUgcmVzcG9uc2UgZm9yIHVzZSBpbiBjb21wbGV0ZSBjYWxsYmFja1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gYXJndW1lbnRzO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5odG1sKCBzZWxlY3RvciA/XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgYSBzZWxlY3RvciB3YXMgc3BlY2lmaWVkLCBsb2NhdGUgdGhlIHJpZ2h0IGVsZW1lbnRzIGluIGEgZHVtbXkgZGl2XG4gICAgICAgICAgICAgICAgICAgIC8vIEV4Y2x1ZGUgc2NyaXB0cyB0byBhdm9pZCBJRSAnUGVybWlzc2lvbiBEZW5pZWQnIGVycm9yc1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoIFwiPGRpdj5cIiApLmFwcGVuZCggalF1ZXJ5LnBhcnNlSFRNTCggcmVzcG9uc2VUZXh0ICkgKS5maW5kKCBzZWxlY3RvciApIDpcblxuICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgdXNlIHRoZSBmdWxsIHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZVRleHQgKTtcblxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZXF1ZXN0IHN1Y2NlZWRzLCB0aGlzIGZ1bmN0aW9uIGdldHMgXCJkYXRhXCIsIFwic3RhdHVzXCIsIFwianFYSFJcIlxuICAgICAgICAgICAgICAgIC8vIGJ1dCB0aGV5IGFyZSBpZ25vcmVkIGJlY2F1c2UgcmVzcG9uc2Ugd2FzIHNldCBhYm92ZS5cbiAgICAgICAgICAgICAgICAvLyBJZiBpdCBmYWlscywgdGhpcyBmdW5jdGlvbiBnZXRzIFwianFYSFJcIiwgXCJzdGF0dXNcIiwgXCJlcnJvclwiXG4gICAgICAgICAgICB9ICkuYWx3YXlzKCBjYWxsYmFjayAmJiBmdW5jdGlvbigganFYSFIsIHN0YXR1cyApIHtcbiAgICAgICAgICAgICAgICBzZWxmLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseSggdGhpcywgcmVzcG9uc2UgfHwgWyBqcVhIUi5yZXNwb25zZVRleHQsIHN0YXR1cywganFYSFIgXSApO1xuICAgICAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgIH0gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cblxuXG5cbi8vIEF0dGFjaCBhIGJ1bmNoIG9mIGZ1bmN0aW9ucyBmb3IgaGFuZGxpbmcgY29tbW9uIEFKQVggZXZlbnRzXG4gICAgalF1ZXJ5LmVhY2goIFtcbiAgICAgICAgXCJhamF4U3RhcnRcIixcbiAgICAgICAgXCJhamF4U3RvcFwiLFxuICAgICAgICBcImFqYXhDb21wbGV0ZVwiLFxuICAgICAgICBcImFqYXhFcnJvclwiLFxuICAgICAgICBcImFqYXhTdWNjZXNzXCIsXG4gICAgICAgIFwiYWpheFNlbmRcIlxuICAgIF0sIGZ1bmN0aW9uKCBpLCB0eXBlICkge1xuICAgICAgICBqUXVlcnkuZm5bIHR5cGUgXSA9IGZ1bmN0aW9uKCBmbiApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9uKCB0eXBlLCBmbiApO1xuICAgICAgICB9O1xuICAgIH0gKTtcblxuXG5cblxuICAgIGpRdWVyeS5leHByLnBzZXVkb3MuYW5pbWF0ZWQgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgcmV0dXJuIGpRdWVyeS5ncmVwKCBqUXVlcnkudGltZXJzLCBmdW5jdGlvbiggZm4gKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbSA9PT0gZm4uZWxlbTtcbiAgICAgICAgfSApLmxlbmd0aDtcbiAgICB9O1xuXG5cblxuXG4gICAgalF1ZXJ5Lm9mZnNldCA9IHtcbiAgICAgICAgc2V0T2Zmc2V0OiBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgaSApIHtcbiAgICAgICAgICAgIHZhciBjdXJQb3NpdGlvbiwgY3VyTGVmdCwgY3VyQ1NTVG9wLCBjdXJUb3AsIGN1ck9mZnNldCwgY3VyQ1NTTGVmdCwgY2FsY3VsYXRlUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBvc2l0aW9uXCIgKSxcbiAgICAgICAgICAgICAgICBjdXJFbGVtID0galF1ZXJ5KCBlbGVtICksXG4gICAgICAgICAgICAgICAgcHJvcHMgPSB7fTtcblxuICAgICAgICAgICAgLy8gU2V0IHBvc2l0aW9uIGZpcnN0LCBpbi1jYXNlIHRvcC9sZWZ0IGFyZSBzZXQgZXZlbiBvbiBzdGF0aWMgZWxlbVxuICAgICAgICAgICAgaWYgKCBwb3NpdGlvbiA9PT0gXCJzdGF0aWNcIiApIHtcbiAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJPZmZzZXQgPSBjdXJFbGVtLm9mZnNldCgpO1xuICAgICAgICAgICAgY3VyQ1NTVG9wID0galF1ZXJ5LmNzcyggZWxlbSwgXCJ0b3BcIiApO1xuICAgICAgICAgICAgY3VyQ1NTTGVmdCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwibGVmdFwiICk7XG4gICAgICAgICAgICBjYWxjdWxhdGVQb3NpdGlvbiA9ICggcG9zaXRpb24gPT09IFwiYWJzb2x1dGVcIiB8fCBwb3NpdGlvbiA9PT0gXCJmaXhlZFwiICkgJiZcbiAgICAgICAgICAgICAgICAoIGN1ckNTU1RvcCArIGN1ckNTU0xlZnQgKS5pbmRleE9mKCBcImF1dG9cIiApID4gLTE7XG5cbiAgICAgICAgICAgIC8vIE5lZWQgdG8gYmUgYWJsZSB0byBjYWxjdWxhdGUgcG9zaXRpb24gaWYgZWl0aGVyXG4gICAgICAgICAgICAvLyB0b3Agb3IgbGVmdCBpcyBhdXRvIGFuZCBwb3NpdGlvbiBpcyBlaXRoZXIgYWJzb2x1dGUgb3IgZml4ZWRcbiAgICAgICAgICAgIGlmICggY2FsY3VsYXRlUG9zaXRpb24gKSB7XG4gICAgICAgICAgICAgICAgY3VyUG9zaXRpb24gPSBjdXJFbGVtLnBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgY3VyVG9wID0gY3VyUG9zaXRpb24udG9wO1xuICAgICAgICAgICAgICAgIGN1ckxlZnQgPSBjdXJQb3NpdGlvbi5sZWZ0O1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1clRvcCA9IHBhcnNlRmxvYXQoIGN1ckNTU1RvcCApIHx8IDA7XG4gICAgICAgICAgICAgICAgY3VyTGVmdCA9IHBhcnNlRmxvYXQoIGN1ckNTU0xlZnQgKSB8fCAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGlzRnVuY3Rpb24oIG9wdGlvbnMgKSApIHtcblxuICAgICAgICAgICAgICAgIC8vIFVzZSBqUXVlcnkuZXh0ZW5kIGhlcmUgdG8gYWxsb3cgbW9kaWZpY2F0aW9uIG9mIGNvb3JkaW5hdGVzIGFyZ3VtZW50IChnaC0xODQ4KVxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zLmNhbGwoIGVsZW0sIGksIGpRdWVyeS5leHRlbmQoIHt9LCBjdXJPZmZzZXQgKSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIG9wdGlvbnMudG9wICE9IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgcHJvcHMudG9wID0gKCBvcHRpb25zLnRvcCAtIGN1ck9mZnNldC50b3AgKSArIGN1clRvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICggb3B0aW9ucy5sZWZ0ICE9IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgcHJvcHMubGVmdCA9ICggb3B0aW9ucy5sZWZ0IC0gY3VyT2Zmc2V0LmxlZnQgKSArIGN1ckxlZnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggXCJ1c2luZ1wiIGluIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy51c2luZy5jYWxsKCBlbGVtLCBwcm9wcyApO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1ckVsZW0uY3NzKCBwcm9wcyApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGpRdWVyeS5mbi5leHRlbmQoIHtcblxuICAgICAgICAvLyBvZmZzZXQoKSByZWxhdGVzIGFuIGVsZW1lbnQncyBib3JkZXIgYm94IHRvIHRoZSBkb2N1bWVudCBvcmlnaW5cbiAgICAgICAgb2Zmc2V0OiBmdW5jdGlvbiggb3B0aW9ucyApIHtcblxuICAgICAgICAgICAgLy8gUHJlc2VydmUgY2hhaW5pbmcgZm9yIHNldHRlclxuICAgICAgICAgICAgaWYgKCBhcmd1bWVudHMubGVuZ3RoICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5vZmZzZXQuc2V0T2Zmc2V0KCB0aGlzLCBvcHRpb25zLCBpICk7XG4gICAgICAgICAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJlY3QsIHdpbixcbiAgICAgICAgICAgICAgICBlbGVtID0gdGhpc1sgMCBdO1xuXG4gICAgICAgICAgICBpZiAoICFlbGVtICkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmV0dXJuIHplcm9zIGZvciBkaXNjb25uZWN0ZWQgYW5kIGhpZGRlbiAoZGlzcGxheTogbm9uZSkgZWxlbWVudHMgKGdoLTIzMTApXG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcbiAgICAgICAgICAgIC8vIFJ1bm5pbmcgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG9uIGFcbiAgICAgICAgICAgIC8vIGRpc2Nvbm5lY3RlZCBub2RlIGluIElFIHRocm93cyBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKCAhZWxlbS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gR2V0IGRvY3VtZW50LXJlbGF0aXZlIHBvc2l0aW9uIGJ5IGFkZGluZyB2aWV3cG9ydCBzY3JvbGwgdG8gdmlld3BvcnQtcmVsYXRpdmUgZ0JDUlxuICAgICAgICAgICAgcmVjdCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB3aW4gPSBlbGVtLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQsXG4gICAgICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luLnBhZ2VYT2Zmc2V0XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIHBvc2l0aW9uKCkgcmVsYXRlcyBhbiBlbGVtZW50J3MgbWFyZ2luIGJveCB0byBpdHMgb2Zmc2V0IHBhcmVudCdzIHBhZGRpbmcgYm94XG4gICAgICAgIC8vIFRoaXMgY29ycmVzcG9uZHMgdG8gdGhlIGJlaGF2aW9yIG9mIENTUyBhYnNvbHV0ZSBwb3NpdGlvbmluZ1xuICAgICAgICBwb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoICF0aGlzWyAwIF0gKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgb2Zmc2V0UGFyZW50LCBvZmZzZXQsIGRvYyxcbiAgICAgICAgICAgICAgICBlbGVtID0gdGhpc1sgMCBdLFxuICAgICAgICAgICAgICAgIHBhcmVudE9mZnNldCA9IHsgdG9wOiAwLCBsZWZ0OiAwIH07XG5cbiAgICAgICAgICAgIC8vIHBvc2l0aW9uOmZpeGVkIGVsZW1lbnRzIGFyZSBvZmZzZXQgZnJvbSB0aGUgdmlld3BvcnQsIHdoaWNoIGl0c2VsZiBhbHdheXMgaGFzIHplcm8gb2Zmc2V0XG4gICAgICAgICAgICBpZiAoIGpRdWVyeS5jc3MoIGVsZW0sIFwicG9zaXRpb25cIiApID09PSBcImZpeGVkXCIgKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBBc3N1bWUgcG9zaXRpb246Zml4ZWQgaW1wbGllcyBhdmFpbGFiaWxpdHkgb2YgZ2V0Qm91bmRpbmdDbGllbnRSZWN0XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSB0aGlzLm9mZnNldCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gQWNjb3VudCBmb3IgdGhlICpyZWFsKiBvZmZzZXQgcGFyZW50LCB3aGljaCBjYW4gYmUgdGhlIGRvY3VtZW50IG9yIGl0cyByb290IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvLyB3aGVuIGEgc3RhdGljYWxseSBwb3NpdGlvbmVkIGVsZW1lbnQgaXMgaWRlbnRpZmllZFxuICAgICAgICAgICAgICAgIGRvYyA9IGVsZW0ub3duZXJEb2N1bWVudDtcbiAgICAgICAgICAgICAgICBvZmZzZXRQYXJlbnQgPSBlbGVtLm9mZnNldFBhcmVudCB8fCBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIHdoaWxlICggb2Zmc2V0UGFyZW50ICYmXG4gICAgICAgICAgICAgICAgKCBvZmZzZXRQYXJlbnQgPT09IGRvYy5ib2R5IHx8IG9mZnNldFBhcmVudCA9PT0gZG9jLmRvY3VtZW50RWxlbWVudCApICYmXG4gICAgICAgICAgICAgICAgalF1ZXJ5LmNzcyggb2Zmc2V0UGFyZW50LCBcInBvc2l0aW9uXCIgKSA9PT0gXCJzdGF0aWNcIiApIHtcblxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCBvZmZzZXRQYXJlbnQgJiYgb2Zmc2V0UGFyZW50ICE9PSBlbGVtICYmIG9mZnNldFBhcmVudC5ub2RlVHlwZSA9PT0gMSApIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJbmNvcnBvcmF0ZSBib3JkZXJzIGludG8gaXRzIG9mZnNldCwgc2luY2UgdGhleSBhcmUgb3V0c2lkZSBpdHMgY29udGVudCBvcmlnaW5cbiAgICAgICAgICAgICAgICAgICAgcGFyZW50T2Zmc2V0ID0galF1ZXJ5KCBvZmZzZXRQYXJlbnQgKS5vZmZzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50T2Zmc2V0LnRvcCArPSBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnQsIFwiYm9yZGVyVG9wV2lkdGhcIiwgdHJ1ZSApO1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRPZmZzZXQubGVmdCArPSBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnQsIFwiYm9yZGVyTGVmdFdpZHRoXCIsIHRydWUgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFN1YnRyYWN0IHBhcmVudCBvZmZzZXRzIGFuZCBlbGVtZW50IG1hcmdpbnNcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdG9wOiBvZmZzZXQudG9wIC0gcGFyZW50T2Zmc2V0LnRvcCAtIGpRdWVyeS5jc3MoIGVsZW0sIFwibWFyZ2luVG9wXCIsIHRydWUgKSxcbiAgICAgICAgICAgICAgICBsZWZ0OiBvZmZzZXQubGVmdCAtIHBhcmVudE9mZnNldC5sZWZ0IC0galF1ZXJ5LmNzcyggZWxlbSwgXCJtYXJnaW5MZWZ0XCIsIHRydWUgKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBkb2N1bWVudEVsZW1lbnQgaW4gdGhlIGZvbGxvd2luZyBjYXNlczpcbiAgICAgICAgLy8gMSkgRm9yIHRoZSBlbGVtZW50IGluc2lkZSB0aGUgaWZyYW1lIHdpdGhvdXQgb2Zmc2V0UGFyZW50LCB0aGlzIG1ldGhvZCB3aWxsIHJldHVyblxuICAgICAgICAvLyAgICBkb2N1bWVudEVsZW1lbnQgb2YgdGhlIHBhcmVudCB3aW5kb3dcbiAgICAgICAgLy8gMikgRm9yIHRoZSBoaWRkZW4gb3IgZGV0YWNoZWQgZWxlbWVudFxuICAgICAgICAvLyAzKSBGb3IgYm9keSBvciBodG1sIGVsZW1lbnQsIGkuZS4gaW4gY2FzZSBvZiB0aGUgaHRtbCBub2RlIC0gaXQgd2lsbCByZXR1cm4gaXRzZWxmXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGJ1dCB0aG9zZSBleGNlcHRpb25zIHdlcmUgbmV2ZXIgcHJlc2VudGVkIGFzIGEgcmVhbCBsaWZlIHVzZS1jYXNlc1xuICAgICAgICAvLyBhbmQgbWlnaHQgYmUgY29uc2lkZXJlZCBhcyBtb3JlIHByZWZlcmFibGUgcmVzdWx0cy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gVGhpcyBsb2dpYywgaG93ZXZlciwgaXMgbm90IGd1YXJhbnRlZWQgYW5kIGNhbiBjaGFuZ2UgYXQgYW55IHBvaW50IGluIHRoZSBmdXR1cmVcbiAgICAgICAgb2Zmc2V0UGFyZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldFBhcmVudCA9IHRoaXMub2Zmc2V0UGFyZW50O1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKCBvZmZzZXRQYXJlbnQgJiYgalF1ZXJ5LmNzcyggb2Zmc2V0UGFyZW50LCBcInBvc2l0aW9uXCIgKSA9PT0gXCJzdGF0aWNcIiApIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gb2Zmc2V0UGFyZW50IHx8IGRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIH0gKTtcbiAgICAgICAgfVxuICAgIH0gKTtcblxuLy8gQ3JlYXRlIHNjcm9sbExlZnQgYW5kIHNjcm9sbFRvcCBtZXRob2RzXG4gICAgalF1ZXJ5LmVhY2goIHsgc2Nyb2xsTGVmdDogXCJwYWdlWE9mZnNldFwiLCBzY3JvbGxUb3A6IFwicGFnZVlPZmZzZXRcIiB9LCBmdW5jdGlvbiggbWV0aG9kLCBwcm9wICkge1xuICAgICAgICB2YXIgdG9wID0gXCJwYWdlWU9mZnNldFwiID09PSBwcm9wO1xuXG4gICAgICAgIGpRdWVyeS5mblsgbWV0aG9kIF0gPSBmdW5jdGlvbiggdmFsICkge1xuICAgICAgICAgICAgcmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIG1ldGhvZCwgdmFsICkge1xuXG4gICAgICAgICAgICAgICAgLy8gQ29hbGVzY2UgZG9jdW1lbnRzIGFuZCB3aW5kb3dzXG4gICAgICAgICAgICAgICAgdmFyIHdpbjtcbiAgICAgICAgICAgICAgICBpZiAoIGlzV2luZG93KCBlbGVtICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbiA9IGVsZW07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gOSApIHtcbiAgICAgICAgICAgICAgICAgICAgd2luID0gZWxlbS5kZWZhdWx0VmlldztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIHZhbCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luID8gd2luWyBwcm9wIF0gOiBlbGVtWyBtZXRob2QgXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIHdpbiApIHtcbiAgICAgICAgICAgICAgICAgICAgd2luLnNjcm9sbFRvKFxuICAgICAgICAgICAgICAgICAgICAgICAgIXRvcCA/IHZhbCA6IHdpbi5wYWdlWE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA/IHZhbCA6IHdpbi5wYWdlWU9mZnNldFxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbVsgbWV0aG9kIF0gPSB2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgbWV0aG9kLCB2YWwsIGFyZ3VtZW50cy5sZW5ndGggKTtcbiAgICAgICAgfTtcbiAgICB9ICk7XG5cbi8vIFN1cHBvcnQ6IFNhZmFyaSA8PTcgLSA5LjEsIENocm9tZSA8PTM3IC0gNDlcbi8vIEFkZCB0aGUgdG9wL2xlZnQgY3NzSG9va3MgdXNpbmcgalF1ZXJ5LmZuLnBvc2l0aW9uXG4vLyBXZWJraXQgYnVnOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjkwODRcbi8vIEJsaW5rIGJ1ZzogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NTg5MzQ3XG4vLyBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgcGVyY2VudCB3aGVuIHNwZWNpZmllZCBmb3IgdG9wL2xlZnQvYm90dG9tL3JpZ2h0O1xuLy8gcmF0aGVyIHRoYW4gbWFrZSB0aGUgY3NzIG1vZHVsZSBkZXBlbmQgb24gdGhlIG9mZnNldCBtb2R1bGUsIGp1c3QgY2hlY2sgZm9yIGl0IGhlcmVcbiAgICBqUXVlcnkuZWFjaCggWyBcInRvcFwiLCBcImxlZnRcIiBdLCBmdW5jdGlvbiggaSwgcHJvcCApIHtcbiAgICAgICAgalF1ZXJ5LmNzc0hvb2tzWyBwcm9wIF0gPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucGl4ZWxQb3NpdGlvbixcbiAgICAgICAgICAgIGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcbiAgICAgICAgICAgICAgICBpZiAoIGNvbXB1dGVkICkge1xuICAgICAgICAgICAgICAgICAgICBjb21wdXRlZCA9IGN1ckNTUyggZWxlbSwgcHJvcCApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGN1ckNTUyByZXR1cm5zIHBlcmNlbnRhZ2UsIGZhbGxiYWNrIHRvIG9mZnNldFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm51bW5vbnB4LnRlc3QoIGNvbXB1dGVkICkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCBlbGVtICkucG9zaXRpb24oKVsgcHJvcCBdICsgXCJweFwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXB1dGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9ICk7XG5cblxuLy8gQ3JlYXRlIGlubmVySGVpZ2h0LCBpbm5lcldpZHRoLCBoZWlnaHQsIHdpZHRoLCBvdXRlckhlaWdodCBhbmQgb3V0ZXJXaWR0aCBtZXRob2RzXG4gICAgalF1ZXJ5LmVhY2goIHsgSGVpZ2h0OiBcImhlaWdodFwiLCBXaWR0aDogXCJ3aWR0aFwiIH0sIGZ1bmN0aW9uKCBuYW1lLCB0eXBlICkge1xuICAgICAgICBqUXVlcnkuZWFjaCggeyBwYWRkaW5nOiBcImlubmVyXCIgKyBuYW1lLCBjb250ZW50OiB0eXBlLCBcIlwiOiBcIm91dGVyXCIgKyBuYW1lIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiggZGVmYXVsdEV4dHJhLCBmdW5jTmFtZSApIHtcblxuICAgICAgICAgICAgICAgIC8vIE1hcmdpbiBpcyBvbmx5IGZvciBvdXRlckhlaWdodCwgb3V0ZXJXaWR0aFxuICAgICAgICAgICAgICAgIGpRdWVyeS5mblsgZnVuY05hbWUgXSA9IGZ1bmN0aW9uKCBtYXJnaW4sIHZhbHVlICkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hhaW5hYmxlID0gYXJndW1lbnRzLmxlbmd0aCAmJiAoIGRlZmF1bHRFeHRyYSB8fCB0eXBlb2YgbWFyZ2luICE9PSBcImJvb2xlYW5cIiApLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmEgPSBkZWZhdWx0RXh0cmEgfHwgKCBtYXJnaW4gPT09IHRydWUgfHwgdmFsdWUgPT09IHRydWUgPyBcIm1hcmdpblwiIDogXCJib3JkZXJcIiApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb2M7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaXNXaW5kb3coIGVsZW0gKSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICQoIHdpbmRvdyApLm91dGVyV2lkdGgvSGVpZ2h0IHJldHVybiB3L2ggaW5jbHVkaW5nIHNjcm9sbGJhcnMgKGdoLTE3MjkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmNOYW1lLmluZGV4T2YoIFwib3V0ZXJcIiApID09PSAwID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbVsgXCJpbm5lclwiICsgbmFtZSBdIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbIFwiY2xpZW50XCIgKyBuYW1lIF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCBkb2N1bWVudCB3aWR0aCBvciBoZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gOSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2MgPSBlbGVtLmRvY3VtZW50RWxlbWVudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVpdGhlciBzY3JvbGxbV2lkdGgvSGVpZ2h0XSBvciBvZmZzZXRbV2lkdGgvSGVpZ2h0XSBvciBjbGllbnRbV2lkdGgvSGVpZ2h0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aGljaGV2ZXIgaXMgZ3JlYXRlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYm9keVsgXCJzY3JvbGxcIiArIG5hbWUgXSwgZG9jWyBcInNjcm9sbFwiICsgbmFtZSBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmJvZHlbIFwib2Zmc2V0XCIgKyBuYW1lIF0sIGRvY1sgXCJvZmZzZXRcIiArIG5hbWUgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jWyBcImNsaWVudFwiICsgbmFtZSBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHdpZHRoIG9yIGhlaWdodCBvbiB0aGUgZWxlbWVudCwgcmVxdWVzdGluZyBidXQgbm90IGZvcmNpbmcgcGFyc2VGbG9hdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5jc3MoIGVsZW0sIHR5cGUsIGV4dHJhICkgOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHdpZHRoIG9yIGhlaWdodCBvbiB0aGUgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5zdHlsZSggZWxlbSwgdHlwZSwgdmFsdWUsIGV4dHJhICk7XG4gICAgICAgICAgICAgICAgICAgIH0sIHR5cGUsIGNoYWluYWJsZSA/IG1hcmdpbiA6IHVuZGVmaW5lZCwgY2hhaW5hYmxlICk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gKTtcbiAgICB9ICk7XG5cblxuICAgIGpRdWVyeS5lYWNoKCAoIFwiYmx1ciBmb2N1cyBmb2N1c2luIGZvY3Vzb3V0IHJlc2l6ZSBzY3JvbGwgY2xpY2sgZGJsY2xpY2sgXCIgK1xuICAgICAgICBcIm1vdXNlZG93biBtb3VzZXVwIG1vdXNlbW92ZSBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2VlbnRlciBtb3VzZWxlYXZlIFwiICtcbiAgICAgICAgXCJjaGFuZ2Ugc2VsZWN0IHN1Ym1pdCBrZXlkb3duIGtleXByZXNzIGtleXVwIGNvbnRleHRtZW51XCIgKS5zcGxpdCggXCIgXCIgKSxcbiAgICAgICAgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSBldmVudCBiaW5kaW5nXG4gICAgICAgICAgICBqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBkYXRhLCBmbiApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDAgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uKCBuYW1lLCBudWxsLCBkYXRhLCBmbiApIDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCBuYW1lICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9ICk7XG5cbiAgICBqUXVlcnkuZm4uZXh0ZW5kKCB7XG4gICAgICAgIGhvdmVyOiBmdW5jdGlvbiggZm5PdmVyLCBmbk91dCApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vdXNlZW50ZXIoIGZuT3ZlciApLm1vdXNlbGVhdmUoIGZuT3V0IHx8IGZuT3ZlciApO1xuICAgICAgICB9XG4gICAgfSApO1xuXG5cblxuXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCgge1xuXG4gICAgICAgIGJpbmQ6IGZ1bmN0aW9uKCB0eXBlcywgZGF0YSwgZm4gKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vbiggdHlwZXMsIG51bGwsIGRhdGEsIGZuICk7XG4gICAgICAgIH0sXG4gICAgICAgIHVuYmluZDogZnVuY3Rpb24oIHR5cGVzLCBmbiApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9mZiggdHlwZXMsIG51bGwsIGZuICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uKCBzZWxlY3RvciwgdHlwZXMsIGRhdGEsIGZuICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5kZWxlZ2F0ZTogZnVuY3Rpb24oIHNlbGVjdG9yLCB0eXBlcywgZm4gKSB7XG5cbiAgICAgICAgICAgIC8vICggbmFtZXNwYWNlICkgb3IgKCBzZWxlY3RvciwgdHlwZXMgWywgZm5dIClcbiAgICAgICAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID9cbiAgICAgICAgICAgICAgICB0aGlzLm9mZiggc2VsZWN0b3IsIFwiKipcIiApIDpcbiAgICAgICAgICAgICAgICB0aGlzLm9mZiggdHlwZXMsIHNlbGVjdG9yIHx8IFwiKipcIiwgZm4gKTtcbiAgICAgICAgfVxuICAgIH0gKTtcblxuLy8gQmluZCBhIGZ1bmN0aW9uIHRvIGEgY29udGV4dCwgb3B0aW9uYWxseSBwYXJ0aWFsbHkgYXBwbHlpbmcgYW55XG4vLyBhcmd1bWVudHMuXG4vLyBqUXVlcnkucHJveHkgaXMgZGVwcmVjYXRlZCB0byBwcm9tb3RlIHN0YW5kYXJkcyAoc3BlY2lmaWNhbGx5IEZ1bmN0aW9uI2JpbmQpXG4vLyBIb3dldmVyLCBpdCBpcyBub3Qgc2xhdGVkIGZvciByZW1vdmFsIGFueSB0aW1lIHNvb25cbiAgICBqUXVlcnkucHJveHkgPSBmdW5jdGlvbiggZm4sIGNvbnRleHQgKSB7XG4gICAgICAgIHZhciB0bXAsIGFyZ3MsIHByb3h5O1xuXG4gICAgICAgIGlmICggdHlwZW9mIGNvbnRleHQgPT09IFwic3RyaW5nXCIgKSB7XG4gICAgICAgICAgICB0bXAgPSBmblsgY29udGV4dCBdO1xuICAgICAgICAgICAgY29udGV4dCA9IGZuO1xuICAgICAgICAgICAgZm4gPSB0bXA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBRdWljayBjaGVjayB0byBkZXRlcm1pbmUgaWYgdGFyZ2V0IGlzIGNhbGxhYmxlLCBpbiB0aGUgc3BlY1xuICAgICAgICAvLyB0aGlzIHRocm93cyBhIFR5cGVFcnJvciwgYnV0IHdlIHdpbGwganVzdCByZXR1cm4gdW5kZWZpbmVkLlxuICAgICAgICBpZiAoICFpc0Z1bmN0aW9uKCBmbiApICkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNpbXVsYXRlZCBiaW5kXG4gICAgICAgIGFyZ3MgPSBzbGljZS5jYWxsKCBhcmd1bWVudHMsIDIgKTtcbiAgICAgICAgcHJveHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSggY29udGV4dCB8fCB0aGlzLCBhcmdzLmNvbmNhdCggc2xpY2UuY2FsbCggYXJndW1lbnRzICkgKSApO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNldCB0aGUgZ3VpZCBvZiB1bmlxdWUgaGFuZGxlciB0byB0aGUgc2FtZSBvZiBvcmlnaW5hbCBoYW5kbGVyLCBzbyBpdCBjYW4gYmUgcmVtb3ZlZFxuICAgICAgICBwcm94eS5ndWlkID0gZm4uZ3VpZCA9IGZuLmd1aWQgfHwgalF1ZXJ5Lmd1aWQrKztcblxuICAgICAgICByZXR1cm4gcHJveHk7XG4gICAgfTtcblxuICAgIGpRdWVyeS5ob2xkUmVhZHkgPSBmdW5jdGlvbiggaG9sZCApIHtcbiAgICAgICAgaWYgKCBob2xkICkge1xuICAgICAgICAgICAgalF1ZXJ5LnJlYWR5V2FpdCsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgalF1ZXJ5LnJlYWR5KCB0cnVlICk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGpRdWVyeS5pc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbiAgICBqUXVlcnkucGFyc2VKU09OID0gSlNPTi5wYXJzZTtcbiAgICBqUXVlcnkubm9kZU5hbWUgPSBub2RlTmFtZTtcbiAgICBqUXVlcnkuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4gICAgalF1ZXJ5LmlzV2luZG93ID0gaXNXaW5kb3c7XG4gICAgalF1ZXJ5LmNhbWVsQ2FzZSA9IGNhbWVsQ2FzZTtcbiAgICBqUXVlcnkudHlwZSA9IHRvVHlwZTtcblxuICAgIGpRdWVyeS5ub3cgPSBEYXRlLm5vdztcblxuICAgIGpRdWVyeS5pc051bWVyaWMgPSBmdW5jdGlvbiggb2JqICkge1xuXG4gICAgICAgIC8vIEFzIG9mIGpRdWVyeSAzLjAsIGlzTnVtZXJpYyBpcyBsaW1pdGVkIHRvXG4gICAgICAgIC8vIHN0cmluZ3MgYW5kIG51bWJlcnMgKHByaW1pdGl2ZXMgb3Igb2JqZWN0cylcbiAgICAgICAgLy8gdGhhdCBjYW4gYmUgY29lcmNlZCB0byBmaW5pdGUgbnVtYmVycyAoZ2gtMjY2MilcbiAgICAgICAgdmFyIHR5cGUgPSBqUXVlcnkudHlwZSggb2JqICk7XG4gICAgICAgIHJldHVybiAoIHR5cGUgPT09IFwibnVtYmVyXCIgfHwgdHlwZSA9PT0gXCJzdHJpbmdcIiApICYmXG5cbiAgICAgICAgICAgIC8vIHBhcnNlRmxvYXQgTmFOcyBudW1lcmljLWNhc3QgZmFsc2UgcG9zaXRpdmVzIChcIlwiKVxuICAgICAgICAgICAgLy8gLi4uYnV0IG1pc2ludGVycHJldHMgbGVhZGluZy1udW1iZXIgc3RyaW5ncywgcGFydGljdWxhcmx5IGhleCBsaXRlcmFscyAoXCIweC4uLlwiKVxuICAgICAgICAgICAgLy8gc3VidHJhY3Rpb24gZm9yY2VzIGluZmluaXRpZXMgdG8gTmFOXG4gICAgICAgICAgICAhaXNOYU4oIG9iaiAtIHBhcnNlRmxvYXQoIG9iaiApICk7XG4gICAgfTtcblxuXG5cblxuLy8gUmVnaXN0ZXIgYXMgYSBuYW1lZCBBTUQgbW9kdWxlLCBzaW5jZSBqUXVlcnkgY2FuIGJlIGNvbmNhdGVuYXRlZCB3aXRoIG90aGVyXG4vLyBmaWxlcyB0aGF0IG1heSB1c2UgZGVmaW5lLCBidXQgbm90IHZpYSBhIHByb3BlciBjb25jYXRlbmF0aW9uIHNjcmlwdCB0aGF0XG4vLyB1bmRlcnN0YW5kcyBhbm9ueW1vdXMgQU1EIG1vZHVsZXMuIEEgbmFtZWQgQU1EIGlzIHNhZmVzdCBhbmQgbW9zdCByb2J1c3Rcbi8vIHdheSB0byByZWdpc3Rlci4gTG93ZXJjYXNlIGpxdWVyeSBpcyB1c2VkIGJlY2F1c2UgQU1EIG1vZHVsZSBuYW1lcyBhcmVcbi8vIGRlcml2ZWQgZnJvbSBmaWxlIG5hbWVzLCBhbmQgalF1ZXJ5IGlzIG5vcm1hbGx5IGRlbGl2ZXJlZCBpbiBhIGxvd2VyY2FzZVxuLy8gZmlsZSBuYW1lLiBEbyB0aGlzIGFmdGVyIGNyZWF0aW5nIHRoZSBnbG9iYWwgc28gdGhhdCBpZiBhbiBBTUQgbW9kdWxlIHdhbnRzXG4vLyB0byBjYWxsIG5vQ29uZmxpY3QgdG8gaGlkZSB0aGlzIHZlcnNpb24gb2YgalF1ZXJ5LCBpdCB3aWxsIHdvcmsuXG5cbi8vIE5vdGUgdGhhdCBmb3IgbWF4aW11bSBwb3J0YWJpbGl0eSwgbGlicmFyaWVzIHRoYXQgYXJlIG5vdCBqUXVlcnkgc2hvdWxkXG4vLyBkZWNsYXJlIHRoZW1zZWx2ZXMgYXMgYW5vbnltb3VzIG1vZHVsZXMsIGFuZCBhdm9pZCBzZXR0aW5nIGEgZ2xvYmFsIGlmIGFuXG4vLyBBTUQgbG9hZGVyIGlzIHByZXNlbnQuIGpRdWVyeSBpcyBhIHNwZWNpYWwgY2FzZS4gRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2pyYnVya2UvcmVxdWlyZWpzL3dpa2kvVXBkYXRpbmctZXhpc3RpbmctbGlicmFyaWVzI3dpa2ktYW5vblxuXG4gICAgaWYgKCB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAgICAgZGVmaW5lKCBcImpxdWVyeVwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5O1xuICAgICAgICB9ICk7XG4gICAgfVxuXG5cblxuXG4gICAgdmFyXG5cbiAgICAgICAgLy8gTWFwIG92ZXIgalF1ZXJ5IGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG4gICAgICAgIF9qUXVlcnkgPSB3aW5kb3cualF1ZXJ5LFxuXG4gICAgICAgIC8vIE1hcCBvdmVyIHRoZSAkIGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG4gICAgICAgIF8kID0gd2luZG93LiQ7XG5cbiAgICBqUXVlcnkubm9Db25mbGljdCA9IGZ1bmN0aW9uKCBkZWVwICkge1xuICAgICAgICBpZiAoIHdpbmRvdy4kID09PSBqUXVlcnkgKSB7XG4gICAgICAgICAgICB3aW5kb3cuJCA9IF8kO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBkZWVwICYmIHdpbmRvdy5qUXVlcnkgPT09IGpRdWVyeSApIHtcbiAgICAgICAgICAgIHdpbmRvdy5qUXVlcnkgPSBfalF1ZXJ5O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGpRdWVyeTtcbiAgICB9O1xuXG4vLyBFeHBvc2UgalF1ZXJ5IGFuZCAkIGlkZW50aWZpZXJzLCBldmVuIGluIEFNRFxuLy8gKCM3MTAyI2NvbW1lbnQ6MTAsIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L3B1bGwvNTU3KVxuLy8gYW5kIENvbW1vbkpTIGZvciBicm93c2VyIGVtdWxhdG9ycyAoIzEzNTY2KVxuICAgIGlmICggIW5vR2xvYmFsICkge1xuICAgICAgICB3aW5kb3cualF1ZXJ5ID0gd2luZG93LiQgPSBqUXVlcnk7XG4gICAgfVxuXG5cblxuXG4gICAgcmV0dXJuIGpRdWVyeTtcbn0gKTsiXX0=
