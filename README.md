# XM Cloud Starter Kit (Next JS)

## About this Solution

This solution is designed to help developers learn and get started quickly
with XMCLoud + SXA and OrderCloud. The code in this solution is for demo purpose. The code is meant to showcse the
ease of developing content and commerce in a single solution.

## QUICK START

1. Start by locating the .env.example file and rename it to .env.local
   within the .env.local file you will replace line 6 and replace it with your website name that is
   identified in XMC. On line 27 you will fix the API Key to match what you set up in Sitecore Deploy.
   Depending on which team you are you will either use
   regal-consumer
   or
   regal-business

   '''
   Fix website name:
   Line 6
   JSS_APP_NAME={My Website name}
   '''

   '''
   Fix Sitecore API Key:
   Line 27
   SITECORE_API_KEY={API Key from deploy app}

2. Locate and fix the Layout. We need to update the Layout.tsx file to contain the OrderCloud configuration to your marketplace.

   '''
   Fix the ocClientId:
   Line 43
   ocClientId{The Marketplace API id that you want to call from}
   '''

   '''
   Fix the ocClientAPIUrl:
   Line 44
   ocClientAPIUrl{Put in the correct url. If you are using the a markeplace in Azure West Us then you have the correct API path}
   '''

   '''
   Fix the Scope:
   Line 45
   const ocScope = [
   'FullAccess',
   'Shopper',
   'MeAddressAdmin',
   'OrderAdmin',
   'OverrideShipping',
   'SpendingAccountAdmin',
   ];
   Full access is not recommended for production instances but we do use it often for demo purposes. For this hackathon it is ok to leave the scope like it is laid out above
   '''

3. Working with in the sxastarter folder you will need to install the required plug ins. make sure to open a terminal from with in the sxastarter folder. Run "npm i"

4. To run the solution locally run the following command: "npm run start:production" What this does is goes out and grabs all the content and assemples the static web pages so you can run it
   disconnected and locally. Please note that if you make a change and want to see the change appear in your local site you will have to stop and start the builder with the script. Do not try to add
   the automatic updates because it will actually slow your development down. It takes a few minutes to build out the site depending on the amount of pages and content you have in your XM Cloud instance.

---

## XM CLOUD INFORMATION

1. XM Cloud has two sites in it. Regal-Consumer and Regal-Business. Each of these sites have the full spectrum of components. We have authored the few pages you may need and will help to build out pages that could be usefull for the hackathon.

   '''JSS_APP_Name
   Regal-Consumer
   or
   Regal_Business
   '''

2. Now we fix the SITECORE_API_KEY. This is the key that we set up in the deploy app for XM Cloud

   '''
   {API}
   '''

## ORDERCLOUD INFORMATION

1. OrderCloud marketplace information
