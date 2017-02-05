chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        chrome.desktopCapture.chooseDesktopMedia(
            ["screen", "window"], sender.tab, function(streamId) {
                sendResponse({ mediaid: streamId});
            });
        return true;   
    }
);
