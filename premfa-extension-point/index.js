const request = require('request');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const express = require("express");
const bodyParser = require('body-parser');

app = express();
port = 5555;

// parse application/json
app.use(bodyParser.json());

/**
*
* Your extension must accept a POST request
*
* App ID requires a response in the form {'skipMfa': Boolean}
*
*/
app.post('/custom_extension', async function (req, res) {
  // JWT received from App ID
  const encodedData = req.body.jws;

  // Decode message to get information
  const data = jwt.decode(encodedData, {complete: true});

  // Extract KID from header
  const kid = data.header.kid;

  const keysArray = await obtainPublicKeys();

  // Verify the signature of the payload with the public keys
  await verifySignature(keysArray, kid, encodedData);

  console.log(data);

  if (data.device_type === 'mobile') {
    res.send({'skipMfa': true})
  } else {
    res.send({'skipMfa': false});
  }

});

/**
 *
 * This function obtains public keys for your App ID instance,
 * for best performance - the result should be cached.
 *
 * @return The public keys for your App ID instance.
 *
 */
async function obtainPublicKeys() {
  // Your App ID instance tenant ID
  const tenantId = '<tenantId>';

  // Send request to App ID's public keys endpoint
  const keysOptions = {
    method: 'GET',
    url: `https://<REGION>.appid.cloud.ibm.com/oauth/v4/${tenantId}/publickeys`
  };

  return await performRequest(keysOptions);
}

/**
 *
 * This function verifies that the signature is from App ID
 * If the signature cannot be verified, it throws an error
 *
 */
async function verifySignature(keysArray, kid, jws) {
  const keyJson = keysArray.find(key => key.kid === kid);
  if (keyJson) {
    const pem = jwkToPem(keyJson);
    await jwt.verify(jws, pem);
    return;
  }
  throw new Error ("Unable to verify signature");
}

/**
 * Make the request to the publickeys endpoint
 */
async function performRequest(keysOptions) {
  return new Promise( (resolve, reject) => {
    request(keysOptions, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body).keys);
      } else {
        reject(error);
      }
    });
  });
}

// Listen for incoming requests
app.listen(port, () => {
  console.log("Listening on http://localhost:" + port);
});

