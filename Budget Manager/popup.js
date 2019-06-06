$(function () {
    
        //As soon as the popup opens the value from storage needs to be shown
        chrome.storage.sync.get(['total','limit'], function (budget) {
            $('#total').text(budget.total);
            $('#limit').text(budget.limit);
        });
   

    $('#spendAmount').click(function () {
        chrome.storage.sync.get('total', function (budget) {
            var newTotal = 0;
            if (budget.total) { //adding the old value

                newTotal += parseInt(budget.total);
            }

            var enteredAmount = $('#amount').val();
            //adding the new value 
            newTotal += parseInt(enteredAmount);
            chrome.storage.sync.get('limit', function (budget) {
                if (budget.limit >= newTotal) {
                    chrome.storage.sync.set({ 'total': newTotal });
                    $('#total').text(newTotal);
                    $('#amount').val('');
                }
                else {
                    $('#amount').val('');
                    var notifObj = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Limit Reached',
                        message: 'You have reached your limit'
                    };
                    chrome.notifications.create('limitNotif', notifObj);
                    chrome.notifications.clear('limitNotif');
                }
            });
         

        });
    });
});