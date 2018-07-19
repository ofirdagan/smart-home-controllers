const axios = require('axios');
const _get = require('lodash/get');
const baseUrl = `https://northeurope.api.cognitive.microsoft.com/face/v1.0/`;

const isPerson = async ({imageUrl, subscriptionKey, personId}) => {
  const result = await identify({imageUrl, subscriptionKey});
  const person = _get(result, 'data[0].candidates[0]');
  console.log(`Idenified - ${JSON.stringify(person)}`);
  return person && person.personId === personId && person.confidence > 0.5;
};

const identify = async ({imageUrl, subscriptionKey}) => {
  const result = await detect({imageUrl, subscriptionKey});
  console.log(`identified - `, result.data);
  const faceId = _get(result, 'data[0].faceId');
  if (faceId) {
    const data = {
      'personGroupId': 'person-group-1',
      'faceIds': [
        faceId,
      ],
      'maxNumOfCandidatesReturned': 1,
      'confidenceThreshold': 0.5
    };
    return makeRequest({endpoint: 'identify', data})
  } else {
    return {};
  }
};

const detect = ({imageUrl, subscriptionKey}) => {
  return makeRequest({endpoint: 'detect', data: {url: imageUrl}, subscriptionKey});
};

const makeRequest = ({data, endpoint, subscriptionKey}) => {
  return axios.post(`${baseUrl}${endpoint}`, data, {
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-Type': 'application/json'
    }
  });
};

module.exports = {
  isPerson
};