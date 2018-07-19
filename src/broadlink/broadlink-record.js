const Broadlink = require('broadlinkjs');
const fs = require('fs');

const startRecording = () => {
  const b = new Broadlink();

  b.on('deviceReady', dev => {
    const timer = setInterval(function(){
      console.log('send check!');
      dev.checkData();
      dev.enterLearning();
    }, 1000);

    dev.on('rawData', (data) => {
      fs.writeFile('broadlink-command', data, function(err) {
        if(err) {
          return console.log(err);
        }
        console.log('The command was saved!');
        clearInterval(timer);
      });
    });
  });

  b.discover();
};

module.exports = {
  startRecording
};
