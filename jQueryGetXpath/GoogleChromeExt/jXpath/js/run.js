$(function () {
    var clickObj = [];
    var options = {}
    var msg = $("<div style='position:fixed;z-index:999999;max-width:70%;text-align:center;top:100px;left:100px;background:#fff;'></div>").css("outline", "1px solid blue");
    $(msg).append("<div style='width:100%;height:19px;text-align:center;border-bottom:1px solid #ccc;'>jXpath - Get element's xpath.<input type='button' value='X' id='jxpathclosedlg' style='float: right;height: 18px;border: 0;background-color: #fff;width: 22px;' /></div>");
    $(msg).append("<div style='padding:10px;'><textarea rows='1' style='padding:15px;' id='xpath'></textarea><br /><br /><input type='button' id='jxpathtourl' style='width:100%;padding:3px;' data-url=''></b><br /><br /><b id='jxpathstop' style='width:100%;'>双击此处关闭此功能</b>。</div>");
    function stopgetting() {
        // 获取配置
        chrome.extension.sendRequest({ method: "stopgetting" }, function (response) {
            setJXpath(response);
        });
    }
    function setJXpath(response) {
        options = response;
        var enable = options.enable;
        var mode = options.mode;
        var ishightlight = options.ishightlight;
        var keeptbody = options.keeptbody;
        if (enable) {
            // 开启时调用方法
            $('body *').unbind("click");
            $('body *').click(function (event) {
                $(msg).find("#jxpathtourl").hide();
                clickObj.push($(this));
                var path = $($(this)).jQueryGetXpath("getXpath", {
                    keepTbodys: keeptbody,
                    mode: mode,
                    isHightLight: ishightlight
                });
                var $xpath = $(msg).find("#xpath");
                $($xpath).val(path).attr("cols", path.length).select();
                $("body").append(msg);
                $(msg).draggable();
                $(msg).find("#jxpathclosedlg").click(function () {
                    $(msg).remove();
                });
                $(msg).find("#jxpathstop").dblclick(function () {
                    stopgetting();
                });
                $xpath.select();
                if ($(this)[0].tagName === "A" && $(this).attr("href")) {
                    var div = document.createElement('div');
                    div.innerHTML = '<a href="' + $(this).attr("href") + '"></a>';
                    var absurl = div.firstChild.href;
                    div = null;
                    $(msg).find("#jxpathtourl").attr("data-url", absurl).val("转到: " + absurl).click(function () {
                        location.href = $(this).attr("data-url");
                    });
                    $(msg).find("#jxpathtourl").show();
                }
                $(msg).width("auto").height("auto");
                $(msg).width($(msg).width() + 20).height($(msg).height() + 20);
                event.stopPropagation();
                return false;
            });
        } else {
            // 关闭时取消绑定
            $('body *').unbind("click");
            $(clickObj).each(function () {
                $(this).css("outline", 0);
            });
            $(msg).remove();
        }
        if (!ishightlight) {
            $(clickObj).each(function () {
                $(this).css("outline", 0);
            });
        }
    }
    // 事件监听
    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        sendResponse({ answer: "ok" });
        setJXpath(request);
    });

    // 获取配置
    chrome.extension.sendRequest({ method: "getoption" }, function (response) {
        setJXpath(response);
    });
});