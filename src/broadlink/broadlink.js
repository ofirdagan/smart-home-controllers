const broadlinkjs = require('broadlinkjs');
const fs = require('fs');
const path = require('path');

class Broadlink {

  constructor() {
    this.init = false;
  }

  connect() {
    return new Promise((res) => {
      const b = new broadlinkjs();
      b.on('deviceReady', device => res(device));
      b.discover();
    });
  }

  runCommand(command) {
    this.connect().then(device => {
      const cmd = fs.readFileSync(path.join(`${__dirname}/../commands/${command}`));
      device.sendData(cmd);
    });
  }

  getCurrentTempture() {
    return new Promise(res => {
      this.connect().then(device => {
        device.on('temperature', res);
        device.checkTemperature();
      });
    });
  }

}
module.exports = new Broadlink();
