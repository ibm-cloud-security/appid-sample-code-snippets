const sgMail = require('@sendgrid/mail');
const {promisify} = require('bluebird');
const request = promisify(require('request'));
const jwtVerify = promisify(require('jsonwebtoken').verify);
const jwtDecode = require('jsonwebtoken').decode;
const jwkToPem = require('jwk-to-pem');

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
  const tenantId = '<TENENT-ID>';

  // Send request to App ID's public keys endpoint
  const keysOptions = {
    method: 'GET',
    url: `https://appid-oauth.<REGION>.bluemix.net/oauth/v3/${tenantId}/publickeys`
  };
  const keysResponse = await request(keysOptions);
  return JSON.parse(keysResponse.body).keys;
}

async function verifySignature(keysArray, kid, jws) {
  const keyJson = keysArray.find(key => key.kid === kid);
  if (keyJson) {
  const pem = jwkToPem(keyJson);
    await jwtVerify(jws, pem);
    return;
  }
  throw new Error ("Unable to verify signature");
}

/**
 *
 * main() will be run when you invoke this action
 *
 * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
 *
 * @return The output of this action, which must be a JSON object.
 *
 */
async function main(params) {
  // The API key for SendGrid, put as a param in your Cloud-Function
  const sgApiKey = params.sgApiKey;

  // Init Sendgrind
  sgMail.setApiKey(sgApiKey);

  // Decode message to get information
  const data = jwtDecode(params.jws, {complete: true});

  // Extract kid from header
  const kid = data.header.kid;

  const keysArray = await obtainPublicKeys();

  // Verify the signature of the payload with the public keys
  await verifySignature(keysArray, kid ,params.jws);

  // Send the email with Your SendGrid account
  const message = data.payload.message;
  const msg = {
    to: message.to,
    from: message.from.address,
    subject: message.subject,
    html: message.body,
  };
  console.log(`Sending email to ${message.to}`);
  let sendgridResponse = await sgMail.send(msg);

  return {result : 'email_sent',sendgridResponse};
}

exports.main = main;