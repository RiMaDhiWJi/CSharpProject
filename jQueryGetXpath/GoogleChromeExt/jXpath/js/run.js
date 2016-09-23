$(function () {
    // 事件监听
    var msg = $("<div style='position:fixed;z-index:999999;max-width:70%;text-align:right;top:100px;left:100px;background:#fff;'></div>").css("outline", "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16));
    var clickObj = [];
    var options = {}

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
                clickObj.push($(this));
                var path = $($(this)).jQueryGetXpath("getXpath", {
                    keepTbodys: keeptbody,
                    mode: mode,
                    isHightLight: ishightlight
                });
                $(msg).html("<div style='padding:15px;'>" + path + "</div><b>双击关闭此层</b>。");
                $("body").append(msg);
                $(msg).width("auto").height("auto");
                $(msg).width($(msg).width() + 20).height($(msg).height() + 20);
                $(msg).dblclick(function (parameters) {
                    $(this).remove();
                    $(clickObj).each(function () {
                        $(this).css("outline", 0);
                    });
                });
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
    }

    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        sendResponse({ answer: "ok" });
        setJXpath(request);
    });

    chrome.extension.sendRequest({ method: "getoption" }, function (response) {
        setJXpath(response);
    });
});