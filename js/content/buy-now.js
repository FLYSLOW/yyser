var BuyNow = {
    init: function() {
        $('#J_NewAddress').append('<button class="one-key-address">一键填入地址</button>');
        this._bind();
    },

    _bind: function() {
        var _self = this;
        $('#J_NewAddress').on('click', '.one-key-address', function(ev) {
            chrome.extension.sendMessage(null, {action: 'request logistics info'}, function(response) {
                _self._fillAddress(response);
            });
        });
    },

    _fillAddress: function(oAddress) {
        this._fillSelect('n_prov_select', oAddress.province);
        this._refreshSelect('n_city_select', $('#n_prov_select').val());
        this._fillSelect('n_city_select', oAddress.city);
        this._refreshSelect('n_area_select', $('#n_city_select').val());
        this._fillSelect('n_area_select', oAddress.district);
        $('#J_postCode').val(oAddress.postCode);
        $('#deliverAddress').val(oAddress.address);
        $('#deliverName').val(oAddress.name);
        $('#phoneSection').val(oAddress.phone.split('-')[0] || '');
        $('#phoneCode').val(oAddress.phone.split('-')[1] || '');
        $('#phoneExt').val(oAddress.phone.split('-')[2] || '');
        $('#deliverPhoneBak').val(oAddress.mobile);
    },

    _fillSelect: function(id, text) {
        var s = document.getElementById(id);
        for (var i = 0; i < s.length; i++) {
            if (s[i].text === text) {
                s.selectedIndex = i;
                break;
            }
        }
    },

    _refreshSelect: function(id, parentVal) {
        var s = document.getElementById(id);
        var factor = (id === 'n_area_select' ? 1 : 100);
        s.length = 0;
        parentVal = parseInt(parentVal, 10);
        console.log(parentVal, factor);
        for (var i = 1; i < 100; i++) {
            var key = parentVal + i * factor;
            console.log(key, addressList[key]);
            if (addressList[key]) {
                $(s).append('<option value="' + key + '">' + addressList[key][0] + '</option>');
            }
        }
    }
};

BuyNow.init();