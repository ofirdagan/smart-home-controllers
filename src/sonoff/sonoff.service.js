const axios = require('axios');
const nonce = require('nonce')();
const WebSocketClient = require('./websocket-client');

class SonOff {
  constructor(config) {
    this.config = config;
    this.wsc = new WebSocketClient();
    this.isSocketOpen = false;
  }

  getConnectedDevices() {
    return axios.get(`${this.config.apiHost}/api/user/device`, {
      headers: {
        Authorization: `Bearer ${this.config.authenticationToken}`
      }
    })
      .then(res => res.data)
      .catch(err => {
        console.log(`Error getting devices`, err);
        throw err;
      });
  }

  connect(device) {
    const url = `wss://${this.config.webSocketApi}:8080/api/ws`;
    console.log('Connecting to the WebSocket API at [%s]', url);
    this.wsc.open(url);
    this.wsc.onmessage =  (messageStr) => {
      console.log(`WebSocket messge received: ${messageStr}`);
      const message = JSON.parse(messageStr);
      if (message.action && message.action === 'update') {
        console.log("Update message received for device [%s]", message.deviceid);
      }
    };
    this.wsc.onopen = () => this._onWebSocketOpen(device);
    this.wsc.onclose = this._onWebSocketClose;
  }

  sendCommand(device) {
    const targetState = 'on';
    console.log("Setting power state to [%s] for device", targetState);
    const payload = this._buildUpdatePayload(device, targetState);
    const payloadStr = JSON.stringify(payload);
    if (this.isSocketOpen) {
      this.wsc.send(payloadStr);
    } else {
      console.log('Socket was closed. It will reconnect automatically; please retry your command');
    }
  }

  _onWebSocketClose(e) {
    console.log("WebSocket was closed. Reason [%s]", e);
    this.isSocketOpen = false;
  }

  _onWebSocketOpen(device) {
    console.log(`Got web socket open`);
    this.isSocketOpen = true;
    const time_stamp = new Date() / 1000;
    const ts = Math.floor(time_stamp);
    const payload = this._buildUserOnlinePayload(device, ts);
    const payloadStr = JSON.stringify(payload);
    console.log('Sending login request [%s]', payloadStr);
    this.wsc.send(payloadStr);
  }

  _buildUserOnlinePayload(device, ts) {
    return {
      action: 'userOnline',
      userAgent: 'app',
      version: 6,
      nonce:`${nonce()}`,
      apkVesrion: '1.8',
      os: 'ios',
      at: this.config.authenticationToken,
      apikey: device.apikey,
      ts: `${ts}`,
      model: 'iPhone10,6',
      romVersion: '11.1.2',
      sequence: this._getSequence()
    };
  }

  _buildUpdatePayload(device, targetState) {
    return {
      action: 'update',
      userAgent: 'app',
      apikey: '' + device.apikey,
      deviceid: '' + device.deviceid,
      params: {
        switch: targetState
      },
      sequence: this._getSequence()
    };
  }

  _getSequence() {
    const time_stamp = new Date() / 1000;
    this.sequence = Math.floor(time_stamp * 1000);
    return this.sequence;
  }
}

module.exports = SonOff;