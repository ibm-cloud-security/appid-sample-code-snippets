#! /usr/bin/env node

let request = require('sync-request');
let userArgs = process.argv.slice(2);
let sourceTenantId = userArgs[0];
let destinationTenantId = userArgs[1];
let region = userArgs[2];
let iamToken = userArgs[3];

if (!sourceTenantId) {
  return console.error('missing users source tenantId');
}
if (!destinationTenantId) {
  return console.error('missing destination tenantId');
}
if (!region) {
  return console.error('missing region');
}
if (!iamToken) {
  return console.error('missing iamToken');
}
console.log('Inputes:');
console.log('sourceTenantId: ' + sourceTenantId);
console.log('destinationTenantId: ' + destinationTenantId);
console.log('region: ' + region);
console.log('iamToken: ' + iamToken);

const encryption_secret = 'big_secret';
let mgmtExportUrl = 'https://appid-management.' + region + '.bluemix.net/management/v4/' + sourceTenantId + '/cloud_directory/export';
let mgmtImportUrl = 'https://appid-management.' + region + '.bluemix.net/management/v4/' + destinationTenantId + '/cloud_directory/import';

let AuthHeader = {
  Authorization: 'Bearer ' + iamToken
};

let numberOfUsers = 0;
let totalResults = 0;
let failures = [];
let added = 0;
//import and export users
console.log('Exporting users ' + sourceTenantId + ' >>> ' + destinationTenantId + ' ...');
do {
  //export
	let exportRes = request('GET',  mgmtExportUrl + '?startIndex=' + numberOfUsers, {headers: AuthHeader, qs: {encryption_secret: encryption_secret} });
	if (exportRes.statusCode !== 200) {
		console.error(exportRes.getBody());
    } else {
		let body = JSON.parse(exportRes.getBody());
		totalResults = body.totalResults;
		let itemsPerPage = body.itemsPerPage;
		numberOfUsers += itemsPerPage;
		let users = {
			users: body.users
		};
		//if you required additional processing you can do it in this point.
		//import
		let importRes = request('POST', mgmtImportUrl, {headers: AuthHeader, json: users, qs: {encryption_secret: encryption_secret}});
		if (importRes.statusCode !== 200) {
			console.error(importRes.getBody());
		} else {
			body = JSON.parse(importRes.getBody());
			added += body.added;
			if (body.added !== itemsPerPage) {
				failures = failures.concat(body.failReasons);
			}
		}
	}
  
} while (numberOfUsers < totalResults);

console.log('imported ' + added + '/' + totalResults + ' users');
if (failures.length === 0) {
  console.log('users imported successfully');
} else {
  console.log('users imported failures: ' + JSON.stringify(failures));
}
