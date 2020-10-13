# Contoso: Markdown FileHandler

## Docs

## Scenario

## Highlights

- iron session
- nextjs
- monaco editor
- msal node auth
- 

## Code Tours



## Dev Setup

To work locally you need to setup a file handler app registration and load it with a manifest. We have included a tool and associated npm script to accomplish this.

You must first setup an application that will be used to sign you in and modify the directory within your tenant. To do this you must be a tenant admin.

> It currently takes 24-48 hours before your file handler will appear

1. Create new application registration in AAD and give it an easy to find name, something like "filehandler localdev setup"

2. Add permissions:
  - Graph: Delegated: openid, Directory.AccessAsUser.All
  - consent to the permissions

3. Under Authentication:
  - Add a Platform
    - Add Mobile and desktop applications
    - Select (MSAL only) option in list of redirect uris
  - Set "Default client type" to treat app as public client "Yes"

-> note client id of app:
-> note tenant id of app:

4. Run: "npm run dev-setup" 
  - supply client id and secret when prompted
  - follow the on screen prompts to complete the device-code auth flow

5. Once setup you can optionally delete the registration helper application, or leave it in place for future use.





