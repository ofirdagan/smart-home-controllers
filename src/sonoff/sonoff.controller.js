const SonOffService = require('../services/sonoff');

class SonOff {

  constructor(config) {
    this.sonOff = new SonOffService(config);
  }

  connectToFirstDevice() {
    return this.sonOff.getConnectedDevices()
      .then(devices => {
        this.devices = devices;
        this.sonOff.connect(devices[0]);
      });
  };

  sendCommand() {
    this.sonOff.sendCommand(this.devices[0]);
  };
}

module.exports = SonOff;
