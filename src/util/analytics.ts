import * as firebase from "firebase/app";

export const FIREBASE_APP_START = "FIREBASE_APP_START";
export const FIREBASE_USER_REGISTERED = "FIREBASE_USER_REGISTERED";
export const FIREBASE_USER_LOGIN = "FIREBASE_USER_LOGIN";
export const FIREBASE_REPORT_OPENED = "FIREBASE_REPORT_OPENED";
export const FIREBASE_REPORT_CREATED = "FIREBASE_REPORT_CREATED";
export const FIREBASE_REPORT_ERROR = "FIREBASE_REPORT_ERROR";
export const FIREBASE_HELP_CLAIMED = "FIREBASE_HELP_CLAIMED";
export const FIREBASE_HELP_VERIFIED = "FIREBASE_HELP_VERIFIED";
export const FIREBASE_HELP_OPENED = "FIREBASE_HELP_OPENED";
export const FIREBASE_HELP_ERROR = "FIREBASE_HELP_ERROR";
export const FIREBASE_AUTH_ERROR = "FIREBASE_AUTH_ERROR";

export const sendEvent = (eventName: string, data?: any) => {
  if (process.env.NODE_ENV !== "development") {
    const analytics = firebase.analytics();
    if (data) {
      analytics.logEvent(eventName, data);
    } else {
      analytics.logEvent(eventName);
    }
  }
};
