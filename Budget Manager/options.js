$(function () {
    $(function () {
        //AS soon as the popup opens the valuse from storage needs to be shown
        chrome.storage.sync.get('limit', function (budget) {
   
            $('#limit').val(budget.limit);
        });
    });
    $('#saveLimit').click(function () {
        var limit = $('#limit').val();
        if (limit) {
            chrome.storage.sync.set({ 'limit': limit }, function () {
                close();
            });
    }
    });
    $('#reset').click(function () {
        chrome.storage.sync.set({ 'total': 0 }, function () {
            var notifObj = {
                type: 'basic',
                iconUrl: 'icon48.png',
                title:'Total Reset',
                message: 'Total is reset to 0 now'
            };
            chrome.notifications.create('limitNotif', notifObj);
            chrome.notifications.clear('limitNotif');
           // close();
        });
    });
});