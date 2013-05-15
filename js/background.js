var YYSer = {
    init: function() {
        this._bind();
    },

    _cache: {
        logisticInfo: null
    },

    _bind: function() {
        var _self = this;
        chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
            switch (msg.action) {
                case 'cache logistics info':
                    _self._copyLogisticInfo(msg.data);
                    console.log();
                    sendResponse();
                    break;
                case 'request logistics info':
                    sendResponse(_self._cache.logisticInfo);
                    break;
            }
        });
    },

    _copyLogisticInfo: function(info) {
        this._cache.logisticInfo = info;
    }
};

YYSer.init();