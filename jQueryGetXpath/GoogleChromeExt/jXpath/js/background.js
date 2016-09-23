(function () {
    var options = {
        enable: false,
        mode: "idorclass",
        ishightlight: true,
        keeptbody: false
    }
    var disablejXpath = (function () {
        options.enable = false;
        chrome.browserAction.setIcon({ path: "icon-off.png" });
        chrome.browserAction.setTitle({ title: "Cache Killer disabled" });
    });
    var enablejXpath = (function () {
        options.enable = true;
        chrome.browserAction.setIcon({ path: "icon-on.png" });
        chrome.browserAction.setTitle({ title: "Cache Killer enabled" });
    });
    var sendMsgToAllWindow = function () {
        chrome.tabs.getAllInWindow(1, function (tabs) {
            for (var i in tabs) {
                if (tabs.hasOwnProperty(i)) {
                    chrome.tabs.sendRequest(tabs[i].id, options, function (response) {
                        //console.log(response.answer);
                    });
                }
            }
        });
    }
    var flipStatus = (function () {
        if (!options.enable) {
            disablejXpath();
        } else {
            enablejXpath();
        }
        sendMsgToAllWindow();
    });
    //chrome.browserAction.onClicked.addListener(flipStatus);

    if (localStorage && localStorage["turnOnByDefault"] && localStorage["turnOnByDefault"] === "on") {
        disablejXpath();
    } else {
        enablejXpath();
    }

    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        if (request.method === "getoption") {
            sendResponse(options);
        }
        else if (request.method === "setoption") {
            options = request;
            flipStatus();
            sendResponse(options);
            sendMsgToAllWindow();
        }

    });
})();