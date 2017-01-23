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

    function cssTest(name){
            var prop=camelCase(name),
                _prop=camelCase(cssVendor+prop);
            return (prop in divstyle) && prop || (_prop in divstyle) && _prop || '';
        }
