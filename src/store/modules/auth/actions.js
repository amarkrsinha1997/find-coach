import auth from ".";
import httpService from "../../../utils/httpService";
let timer;

export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login"
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup"
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    const url = mode === "login" ? "signInWithPassword" : "signUp";
    const response = await httpService.post({
      baseUrl: process.env.VUE_APP_FIREBASE_AUTH,
      path: `${url}?key=${process.env.VUE_APP_FIREBASE_API_KEY}`,
      payload: {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      },
      errorMessage: "Failed to Authenticate"
    });
    const expiresInMilliSec = Number(response.expiresIn) * 1000;
    const expiratationDate = new Date().getTime() + expiresInMilliSec;

    localStorage.setItem("token", response.idToken);
    localStorage.setItem("userId", response.localId);
    localStorage.setItem("tokenExpiration", expiratationDate);

    timer = setTimeout(function() {
      context.dispatch("logout");
    }, expiresInMilliSec);

    await context.commit("setUser", {
      token: response.idToken,
      userId: response.localId,
      mode: payload.mode
    });
  },
  async tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn =  Number(tokenExpiration) - new Date().getTime();

    if (expiresIn < 0) {
      return;
    } else if (token && userId) {
      timer = setTimeout(function() {
        context.dispatch("logout");
      }, expiresIn);
      
      return context.commit("setUser", {
        token,
        userId
      });
    }
  },
  async logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);
    
    context.commit("setUser", {
      token: null,
      userId: null
    });
  }
};
