var oscar = require('oscar');

var aim = new oscar.OscarConnection({
  connection: {
    username: 'USERNAMEHERE',
    password: 'PASSWORDHERE'
  }
});

aim.on('im', function(text, sender, flags, when) {
  console.log('test.js :: received ' + (when ? 'offline ' : '')
              + 'IM from ' + sender.name + (when ? ' (on ' + when + ')' : '')
              + ': ' + text);
  if (when)
    return;
  aim.sendIM(sender.name, 'I got your IM!');
});

aim.on('typing', function(who, type) {
  if (type === oscar.TYPING_NOTIFY.START)
    type = 'started typing';
  else if (type === oscar.TYPING_NOTIFY.FINISH)
    type = 'finished typing';
  else if (type === oscar.TYPING_NOTIFY.TEXT_ENTERED)
    type = 'entered text';
  else
    type = 'closed the IM';
  console.log('test.js :: typing notification: ' + who + ' ' + type);
});


aim.connect(function(err) {
  if (err)
    console.log('test.js :: Encountered error: ' + err);
  else {
    console.log('test.js :: ready!');
    // automatically check for offline messages
    aim.getOfflineMsgs();
  }
});
