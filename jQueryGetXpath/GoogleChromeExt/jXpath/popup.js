$(function () {
    var options = {};
    function setOptions() {
        $("#options").val(options.mode);
        if (options.enable) {
            $("#switch").val("点击关闭");
        } else {
            $("#switch").val("点击开启");
        }
        if (options.keeptbody) {
            $("#keeptbody").val("点击不保留tbody");
        } else {
            $("#keeptbody").val("点击保留tbody");
        }
        if (options.ishightlight) {
            $("#ishightlight").val("点击关闭高亮");
        } else {
            $("#ishightlight").val("点击打开高亮");
        }
    }
    chrome.extension.sendRequest({ method: "getoption" }, function (response) {
        options = response;
        setOptions();
    });
    function sendOptions() {
        options.method = "setoption";
        chrome.extension.sendRequest(options, function (response) {
            setOptions();
        });
    }
    $("#switch").click(function() {
        options.enable = !options.enable;
        sendOptions();
    });
    $("#options").change(function () {
        options.mode = $(this).val();
        sendOptions();
    });
    $("#ishightlight").click(function () {
        options.ishightlight = !options.ishightlight;
        sendOptions();
    });
    $("#keeptbody").click(function () {
        options.keeptbody = !options.keeptbody;
        sendOptions();
    });
})