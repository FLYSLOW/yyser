$('#J_TabView').append('<button class="copy-logistics">复制物流信息</button>');
$('#J_TabView').on('click', '.copy-logistics', function(ev) {
    var infoList = $('#J_TabView .logistics-info td:eq(0)').text().split('，');
    var infoObj = {}, tmpAddr = $.trim(infoList[3]).split(/\s+/g);
    infoObj.name = $.trim(infoList[0]);
    infoObj.mobile = $.trim(infoList[1]);
    infoObj.phone = $.trim(infoList[2]);
    infoObj.province = tmpAddr.shift();
    infoObj.city = tmpAddr.shift();
    infoObj.district = tmpAddr.shift();
    infoObj.address = tmpAddr.join(' ');
    infoObj.postCode = $.trim(infoList[4]);
    console.log(infoObj);
    
    chrome.extension.sendMessage(null, {action: 'cache logistics info', data: infoObj}, function(response) {
        $('#J_TabView .copy-logistics').text('已成功复制信息');
        setTimeout(function() {
            $('#J_TabView .copy-logistics').text('复制物流信息');
        }, 1200);
    });
});