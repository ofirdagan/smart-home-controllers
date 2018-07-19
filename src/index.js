const broadlink = require('./broadlink/broadlink');
const broadlinkRecord = require('./broadlink/broadlink-record');
const chromecast = require('./chromecast/chromecast');
const faceApi = require('./face-api/face-api');
const SonOff = require('./sonoff/sonoff.controller');

module.exports = {
  broadlink,
  broadlinkRecord,
  chromecast,
  faceApi,
  SonOff
};