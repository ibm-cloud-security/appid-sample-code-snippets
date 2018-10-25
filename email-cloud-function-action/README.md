# IBM Cloud Functions Action for custom mail provider for App ID


With IBM Cloud App ID’s Cloud Directory feature, you can add sign-up and sign-in to your mobile or web apps and create a user registry to manage users. Cloud Directory supports sending email messages to your users to verify their email address, allows them to reset their password, and more. By default, App ID takes care of delivering the email messages for you but you can define a custom extension point that will be invoked when an email needs to be sent.


This is an implementation of an [IBM Cloud Functions](https://console.bluemix.net/openwhisk) action that can be used with [App ID](https://console.bluemix.net/catalog/services/app-id).
This example uses SendGrid an an email provider, you will need to provide your SendGrid API key.

For more information see [Use Your Own Provider for Mail Sent with IBM Cloud App ID](https://www.ibm.com/blogs/bluemix/2018/10/use-ibm-cloud-app-id-and-your-email-provider-to-brand-mails-sent-to-app-users/)
