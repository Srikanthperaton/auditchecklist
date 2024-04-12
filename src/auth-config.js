/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

import { LogLevel } from "@azure/msal-browser";
export const msalConfig = {
  auth: {
    clientId: "9f3736e4-9ecf-4cf3-ba1a-fbb732898b17", // This is the ONLY mandatory field that you need to supply.
    authority: "https://login.microsoftonline.us/vencoredev.onmicrosoft.com",
    redirectUri: "https://auditreporttooldev.azurewebsites.us/", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
    //redirectUri: "http://localhost:3000",
    postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ["User.Read"],
};
export const graphConfig = {
  graphMeEndpoint: "Enter_the_Graph_Endpoint_Herev1.0/me", //e.g. https://graph.microsoft.com/v1.0/me
};
