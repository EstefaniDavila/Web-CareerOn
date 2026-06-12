export const msalConfig = {
    auth: {
        clientId: "27589cb4-be6b-4759-9106-e1d28c934a9e",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:5173",
        postLogoutRedirectUri: "http://localhost:5173",
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    }
};

export const loginRequest = {
    scopes: ["User.Read"],
    prompt: "select_account"
};
