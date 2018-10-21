# Cloud Directory Export Import Script

A script that can copy Cloud Directory users from one App ID instance to another.

In case you need to use new App ID instance, and you have Cloud directory users in your current App ID instance, you can use this script that uses App ID [export](https://appid-management.ng.bluemix.net/swagger-ui/#!/Cloud_Directory_Users/cloudDirectoryExport) and [import](https://appid-management.ng.bluemix.net/swagger-ui/#!/Cloud_Directory_Users/cloudDirectoryImport) management APIs in order to copy the Cloud directory users to your new App ID instance.


The script takes 4 parameters by the following order:
1. sourceTenantId - the tenantId of the App ID instance from which CD users will be copied from.
2. destinationTenantId - the tenantId of the App ID instance which CD users will be copied to.
3. region - the deployment region of the App ID instances. 
    i.e one of the following: 
    - Us-south: 'ng', 
    - London: 'eu-gb', 
    - Sydney: 'au-syd', 
    - Washington: 'us-east', 
    - Germany: 'eu-de'.
 
 4. Your IAM token (make sure you have manager access)


## Running the script
1. Download the script from this repository.
2. Open new terminal at the folder location and run: 'npm install'
3. Run: users_export_import 'sourceTenantId' 'destinationTenantId' 'region' 'iamToken'


#### For example:

users_export_import e00a0366-53c5-4fcf-8fef-ab3e66b2ced8 73321c2b-d35a-497a-9845-15c580fdf58c ng eyJraWQiOiIyMDE3MTAyNS0xNjoyNzoxMCIsImFsZyI6IlJTMjU2In0.eyJpYW1faWQiOiJJQk1pZC0zMTAwMDBUNkZTIiwiaWQiOiJJQk1pZC0zMTAwMDBUNkZTIiwicmVhbG1pZCI6IklCTWlkIiwiaWRlbnRpZmllciI6IjMxMDAwMFQ2RlMiLCJnaXZlbl9uYW1lIjoiUm90ZW0iLCJmYW1pbHlfbmFtZSI6IkJyb3NoIiwibmFtZSI6IlJvdGVtIEJyb3NoIiwiZW1haWwiOiJyb3RlbWJyQGlsLmlibS5jb20iLCJzdWIiOiJyb3RlbWJyQGlsLmlibS5jb20iLCJhY2NvdW50Ijp7ImJzcyI6ImQ3OWM5YTk5NjJkYzc2Y2JkMDZlYTVhNzhjMjY0YzE5In0sImlhdCI6MTUzNzE3Mjg4NCwiZXhwIjoxNTM3MTc2NDg0LCJpc3MiOiJodHRwczovL2lhbS5zdGFnZTEuYmx1ZW1peC5uZXQvaWRlbnRpdHkiLCJncmFudF90eXBlIjoidXJuOmlibTpwYXJhbXM6b2F1dGg6Z3JhbnQtdHlwZTpwYXNzY29kZSIsInNjb3BlIjoiaWJtIG9wZW5pZCIsImNsaWVudF9pZCI6ImJ4IiwiYWNyIjoxLCJhbXIiOlsicHdkIl19.c4vLPzhvvNZLjaLy7znDa37qV4o-yuGmSKmJoQKrEQNZU8IC0NIjxwSo7W9kb0pDi3Yf_03_9ufTTGNfjtltzNWycSXjkNgoL-b9_nU61oHdgn0stY1KmNicqyBWfgUU--4xa904QN_QjRHBaUBeJf3XWEphPIMoF7mZeOxEZLnCMcQXSz9pImCMiP4SNT38cHLiI90Yx01rM7hpteepWULh5MYh-B2V03Gkgxfqvv951HF1LDg6eT4Q9in11laTQKtKuomripUju_4GIIjORVYw9NaAVKIJ9lKrPX0SKPhStsa59qGsC_7Uersms5EY1W1VbZVqOZPJbtp6tVf-Lw







