const chromecastjs = require('chromecast-js');

class Chromecast {

  async pause() {
    const device = await this._connect();
    device.pause(() => console.log('Chromecast Paused!'));
  }

  async play() {
    const device = await this._connect();
    device.unpause(() => console.log('Chromecast Unpaused!'));
  }

  _connect() {
    return new Promise(res => {
      const browser = new chromecastjs.Browser();
      browser.on('deviceOn', device => {
        device.connect(null, {launch: false});
        device.on('connected', () => this._onConnected(device, res));
        console.log('chromecast device found!');
      });
    });
  }

  _onConnected(device, resovle) {
    console.log('chromecast device connected');
    device.getSessions(sessions => {
      device.join(sessions[0], () => {
        console.log('chromecast device joined first session');
        device.getStatus(status => {
          console.log(`chromecast currentItemId: ${status.currentItemId}`);
          resovle(device);
        });
      });
    });
  }
}

module.exports = new Chromecast();