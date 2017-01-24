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
