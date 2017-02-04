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

function debounce(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArgs(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  };


(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


function getOffsetRect(elem) {

    var box = elem.getBoundingClientRect()

    var body = document.body

    var docElem = document.documentElement

    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop

    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft

    var clientTop = docElem.clientTop || body.clientTop || 0

    var clientLeft = docElem.clientLeft || body.clientLeft || 0

    var top  = box.top +  scrollTop - clientTop

    var left = box.left + scrollLeft - clientLeft
    
    return { top: Math.round(top), left: Math.round(left) }
}

