﻿; (function ($, window, document, undefined) {
    var pluginName = "jQueryGetXpath",  //自定义一个插件名称
        defaults = {                //定义插件的默认属性

        };

    var getXpath = function (options) {
        // 获取Xpath
        var $this = options.xSelector;
        var tag = $this.get(0).tagName.toLowerCase();
        if (!!options.selfIdMode) {
            if ($this.attr("id")) {
                options.xpath = ("/" + tag + "[@id=\"" + $this.attr("id") + "\"]") + options.xpath;
                return "/" + options.xpath;
            }
            else if ($this.attr("class")) {
                if ($("." + $this.attr("class")).length == 1) {
                    options.xpath = ("/" + tag + "[@class=\"" + $this.attr("class") + "\"]") + options.xpath;
                    return "/" + options.xpath;
                } else {
                    options.xpath = ("/" + tag + "[@class=\"" + $this.attr("class") + "\"]") + options.xpath;
                    if ($this.parent().length) {
                        options.xSelector = $this.parent();
                        return getXpath(options);
                    }
                    return "/" + options.xpath;
                }
            } else {
                options.xpath = ("/" + tag) + options.xpath;
                if ($this.parent().length) {
                    options.xSelector = $this.parent();
                    return getXpath(options);
                }
                return "/" + options.xpath;
            }
        }
        else {
            if ($this.attr("id")) {
                options.xpath = ("/" + tag + "[@id=\"" + $this.attr("id") + "\"]") + options.xpath;
                if ($this.parent().length) {
                    options.xSelector = $this.parent();
                    return getXpath(options);
                }
                return "/" + options.xpath;
            }
            else if ($this.attr("class")) {
                if ($("." + $this.attr("class")).length == 1) {
                    options.xpath = ("/" + tag + "[@class=\"" + $this.attr("class") + "\"]") + options.xpath;
                    return "/" + options.xpath;
                } else {
                    options.xpath = ("/" + tag + "[@class=\"" + $this.attr("class") + "\"]") + options.xpath;
                    if ($this.parent().length) {
                        options.xSelector = $this.parent();
                        return getXpath(options);
                    }
                    return "/" + options.xpath;
                }
            } else {
                options.xpath = ("/" + tag) + options.xpath;
                if ($this.parent().length) {
                    options.xSelector = $this.parent();
                    return getXpath(options);
                }
                return "/" + options.xpath;
            }
        }
    }

    var methods = {
        init: function (options) {
            // 在每个元素上执行方法
            return this.each(function () {
                var $this = $(this);
                // 默认值
                var defaults = {
                    'location': 'top',
                    'background-color': 'blue'
                }
                // 用options拓展默认选项
                var settings = $.extend({}, defaults, options);
                // 执行代码
                //alert($this.width());
            });
        },
        getXpath: function (options) {
            return getXpath(options);
        },
        getSelector: function (options) {
            // good
        }
    };

    $.fn[pluginName] = function () {
        // 获取传入的方法，切勿用function(method){}来实现，否则会毁掉一切
        // arguments对象用法参考：http://www.w3school.com.cn/js/pro_js_functions_arguments_object.asp
        var method = arguments[0];
        // 方法调用
        if (methods[method]) {

            // 如果存在，获取方法名
            method = methods[method];

            // 我们的方法是作为参数传入的，把它从参数列表中删除，因为调用方法时仅需JSON格式参数，并不需要它
            arguments = Array.prototype.slice.call(arguments, 1);

        } else if (typeof method === 'object' || !method) {

            // 如果没有传入方法名，则默认调用init方法，参数为arguments
            method = methods.init;
        } else {

            // 否则提示错误
            $.error('Method' + method + 'does not exist on jQuery.tooltip');
        }

        // 用apply方法来调用方法，并传入参数 
        return method.apply(this, arguments);
    };

})(jQuery, window, document);
