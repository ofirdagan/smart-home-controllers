# Smart Home Controllers
Useful controllers for automating your smart home

### Available Controllers:

* [Broadlink](#broadlink)
* [Chromecast](#chromecast)


### Broadlink

#### Usage

Broadlink Controller:
```javascript
const {broadlink} = require('smart-home-controllers');
const fullPathToCommandFile = '/Users/usr/broadlinks-commands/my-command';
broadlink.runCommand(fullPathToCommandFile);
```

Broadlink Recorder:
```javascript
const {broadlinkRecord} = require('smart-home-controllers');
broadlinkRecord.startRecording();
```

### Chromecast

#### Usage

```javascript
const {chromecast} = require('smart-home-controllers');
```
