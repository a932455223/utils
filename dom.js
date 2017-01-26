function camelCase(str){
        return (str+'').replace(/^-ms-/, 'ms-').replace(/-([a-z]|[0-9])/ig, function(all, letter){
            return (letter+'').toUpperCase();
        });
    }
cssVendor=function(){
        var divstyle = document.createElement('div'),
        var tests="-webkit- -moz- -o- -ms-".split(" "),
            prop;
        while(prop=tests.shift()){
            if(camelCase(prop+'transform') in divstyle){
                return prop;
            }
        }
        return '';
    }();
    
    function EASE(t,b,c,d){
           return -c * ((t=t/d-1)*t*t*t - 1) + b;
       }

    function cssTest(name){
            var prop=camelCase(name),
                _prop=camelCase(cssVendor+prop);
            return (prop in divstyle) && prop || (_prop in divstyle) && _prop || '';
        }
        function getStyle(elem,prop){
                var style=document.getComputedStyle&&document.getComputedStyle(elem,null)||elem.currentStyle||elem.style;
                return style[prop];
            }
            function setStyle(elem,props){
                    each(props,function(name,value){
                        var prop;
                        switch(name){
                            case 'float':
                                prop=cssTest('cssFloat')?'cssFloat':'styleFloat';
                                break;
                            default:
                                prop=camelCase(name);
                        }
                        try{
                            elem.style[prop]=value;
                        }catch(e){}
                    });
                }

var throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : _.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = _.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };

    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };

    return throttled;
};

