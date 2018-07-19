# Smart Home Controllers
Ready to use, simple and useful controllers for automating your smart home

### Available Controllers:

* [Broadlink](#broadlink)
* [Chromecast](#chromecast)
* [FaceApi](#face-api)
* [SonOff](#sonoff)


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
chromecast.play();
chromecast.pause();
```

### Face Api

#### Usage

```javascript
const {faceApi} = require('smart-home-controllers');
faceApi.isPerson({imageUrl: string, subscriptionKey: string, personId: string}): Promise<boolean>;
```

### SonOff

#### Usage

* `config.json` should look like [this](https://github.com/ofirdagan/smart-home-controllers/blob/master/src/config.json)
```javascript
const {SonOff} = require('smart-home-controllers');
const pathToConfig = path.resolve(__dirname, './config.json'); 
config = JSON.parse(fs.readFileSync(pathToConfig));
sonOff= new SonOff(config.sonOff);
sonOff.connectToFirstDevice();
sonOff.sendCommand();
```
