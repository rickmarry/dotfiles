var oneMinuteSignupMessageType={ResetRequestScript:"ResetRequestScript",ResetScript:"ResetScript",LogoutScript:"LogoutScript",UserInformationNeeded:"UserInformationNeeded",NavigateToTab:"NavigateToTab",SaveDiscoveredApps:"SaveDiscoveredApps",Done:"Done",Error:"Error",Log:"Log",SavedToVault:"SavedToVault",GetToken:"GetToken",LaunchApplication:"LaunchApplication",CloseTab:"CloseTab",GetOauthToken:"getOauthToken",ReceivedOauthToken:"token"};chrome.runtime.onMessage.addListener(function(e){e.fromExtension=!0,window.postMessage(e,"https://i2-ui-prod.service.lastpass.com")});var version=0;chrome.runtime.getManifest&&(version=chrome.runtime.getManifest().version),document.body.setAttribute("lastpass-extension-id",chrome.runtime.id||"0"),document.body.setAttribute("lastpass-extension-version",version),window.addEventListener("message",function(e){var t;e.origin===window.location.origin&&(t=e.data.type,Object.values(oneMinuteSignupMessageType).indexOf(t)>=0)&&(e.data.fromExtension||chrome.runtime.sendMessage(e.data,function(e){}))});
//# sourceMappingURL=sourcemaps/1minsignup/chrome/websiteConnector.js.map