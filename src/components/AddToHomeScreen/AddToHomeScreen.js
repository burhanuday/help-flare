import PropTypes from "prop-types";
import React, { useEffect } from "react";

import "./addToHomeScreen.css";
import DEFAULT_CONFIGURATION from "./addToHomeScreenConfiguration.json";

export default function AddToHomeScreen(props) {
  const DEFAULT_PROMPT = {
    title: "Install application?",
    cancelMsg: "Not Now",
    installMsg: "Install",
    guidanceCancelMsg: "Close",
  };

  const DEFAULT_SESSION = {
    lastDisplayTime: 0, // last time we displayed the message
    returningVisitor: false, // is this the first time you visit
    displayCount: 0, // number of times the message has been shown
    optedOut: false, // has the user opted out
    added: false, // has been actually added to the home screen
    pageViews: 0,
  };

  let configuration = buildConfiguration();

  doLog(`final configuration: ${JSON.stringify(configuration)}`);

  let session = {};
  let platform = {};
  let guidanceTargetUrls = [];
  let isAthDialogShown = false;
  let showNativePrompt = false;

  let canPromptState;
  let beforeInstallPromptEvent;
  let autoHideTimer;

  useEffect(initialize, []);

  function initialize() {
    if ("onbeforeinstallprompt" in window) {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      showNativePrompt = true;
    }
    if ("onappinstalled" in window) {
      window.addEventListener("appinstalled", function (evt) {
        doLog("a2hs installed");
        session.added = true;
        updateSession();
        if (configuration.onInstall) {
          configuration.onInstall.call(this);
        }
      });
    }

    checkPlatform();

    let sessionString = window.localStorage.getItem(configuration.appId);
    session = sessionString ? JSON.parse(sessionString) : DEFAULT_SESSION;
    if (session && session.added) {
      // there is nothing to do if app was already added to home screen
      return;
    }

    if ("serviceWorker" in navigator) {
      let manifestElement = document.querySelector("[rel='manifest']");
      if (!manifestElement) {
        doLog("no manifest file");
        platform.isCompatible = false;
      }
      navigator.serviceWorker.getRegistration().then(afterServiceWorkerCheck);
      buildGuidanceURLs(configuration.customPromptPlatformDependencies);
    } else {
      afterServiceWorkerCheck({});
    }
  }

  function buildConfiguration() {
    let options = Object.assign({}, DEFAULT_CONFIGURATION, props);

    options.customPromptContent = Object.assign(
      {},
      DEFAULT_CONFIGURATION.customPromptContent,
      props.customPromptContent
    );
    options.customPromptElements = Object.assign(
      {},
      DEFAULT_CONFIGURATION.customPromptElements,
      props.customPromptElements
    );
    options.customPromptPlatformDependencies = Object.assign(
      {},
      DEFAULT_CONFIGURATION.customPromptPlatformDependencies,
      props.customPromptPlatformDependencies
    );

    for (let key in DEFAULT_CONFIGURATION.customPromptPlatformDependencies) {
      if (
        DEFAULT_CONFIGURATION.customPromptPlatformDependencies.hasOwnProperty(
          key
        )
      ) {
        options.customPromptPlatformDependencies[key] = Object.assign(
          {},
          DEFAULT_CONFIGURATION.customPromptPlatformDependencies[key],
          props.customPromptPlatformDependencies &&
            props.customPromptPlatformDependencies[key]
        );
      }
    }
    return options;
  }

  function buildGuidanceURLs(prompts) {
    for (let key in prompts) {
      if (prompts.hasOwnProperty(key)) {
        let target = prompts[key].targetUrl;

        if (target) {
          guidanceTargetUrls.push(target);
        }
      }
    }
  }

  // show hint images for browsers without native prompt
  /*
   * Currently:
   *  iOS Safari
   *  FireFox Android
   *  Samsung Android
   *  Opera Android
   */
  function showPlatformGuidance(skipNative) {
    let target = getPlatform(skipNative);
    let athWrapper = document.querySelector(
      `.${configuration.customPromptElements.container}`
    );

    if (athWrapper) {
      if (autoHideTimer) {
        clearTimeout(autoHideTimer);
      }

      if (!skipNative && target === "native" && beforeInstallPromptEvent) {
        closePrompt();
        triggerNativePrompt();
      } else {
        let promptTarget = Object.assign(
          {},
          DEFAULT_PROMPT,
          configuration.customPromptContent,
          configuration.customPromptPlatformDependencies[target]
        );

        if (promptTarget.targetUrl) {
          window.location.replace(promptTarget.targetUrl);
        } else {
          if (promptTarget.images && promptTarget.images.length > 0) {
            let promptDialogBannerBody = athWrapper.querySelector(
              `.${configuration.customPromptElements.banner}`
            );
            let promptDialogGuidanceBody = athWrapper.querySelector(
              `.${configuration.customPromptElements.guidance}`
            );
            let promptDialogGuidanceImageCell = athWrapper.querySelector(
              `.${configuration.customPromptElements.guidanceImageCell}`
            );
            let promptDialogGuidanceCancelButton = athWrapper.querySelector(
              `.${configuration.customPromptElements.guidanceCancelButton}`
            );

            promptDialogBannerBody.classList.add(configuration.hideClass);
            promptDialogGuidanceBody.classList.add(configuration.showClass);

            for (let index = 0; index < promptTarget.images.length; index++) {
              let img = new Image();

              img.src = promptTarget.images[index].src;
              img.alt = promptTarget.images[index].alt;

              if (promptTarget.images[index].classes) {
                img.classList.add(...promptTarget.images[index].classes);
              }
              promptDialogGuidanceImageCell.appendChild(img);
            }

            if (promptDialogGuidanceCancelButton) {
              promptDialogGuidanceCancelButton.addEventListener(
                "click",
                cancelPrompt
              );
              promptDialogGuidanceCancelButton.classList.remove(
                configuration.hideClass
              );
              promptDialogGuidanceCancelButton.innerText =
                promptTarget.guidanceCancelMsg != null
                  ? promptTarget.guidanceCancelMsg
                  : promptTarget.action && promptTarget.action.guidanceCancel
                  ? promptTarget.action.guidanceCancel
                  : "";
            }
          }
          if (!isVisible(athWrapper)) {
            athWrapper.classList.add(...promptTarget.showClasses);
            athWrapper.classList.remove(configuration.hideClass);
          }

          let hideAfter =
            configuration.lifespan >= 10 ? configuration.lifespan : 10;

          autoHideTimer = setTimeout(autoHide, hideAfter * 1000);
        }
      }
    }
  }

  function isVisible(element) {
    let dimensions = element.getBoundingClientRect();
    return dimensions.width !== 0 && dimensions.height !== 0;
  }

  function afterServiceWorkerCheck(serviceWorker) {
    if (!serviceWorker) {
      doLog("no service worker");
      platform.isCompatible = false;
    }

    session.pageViews += 1;
    updateSession();

    // override defaults that are dependent on each other
    if (
      configuration &&
      configuration.debug &&
      typeof configuration.activateLogging === "undefined"
    ) {
      configuration.activateLogging = true;
    }

    // normalize some options
    configuration.isMandatory =
      configuration.isMandatory &&
      ("standalone" in window.navigator || configuration.debug);

    // this is forcing the user to add to home screen before anything can be done
    // the ideal scenario for this would be an enterprise business application
    // could also be a part of an onboarding workflow for a SAAS
    configuration.isModal = configuration.isModal || configuration.isMandatory;

    if (configuration.isMandatory) {
      configuration.startDelay = -0.5; // make the popup hasty
    }

    // setup the debug environment
    if (configuration.debug) {
      platform.isCompatible = true;
    }

    if (configuration.onInit) {
      configuration.onInit.call(this);
    }

    if (configuration.startAutomatically && !!beforeInstallPromptEvent) {
      doLog("Add to home screen: autoStart displaying callout");
      show();
    } else if (!showNativePrompt) {
      show();
    }
  }

  function doLog(logString) {
    if (configuration.activateLogging) {
      console.log(logString);
    }
  }

  function updateSession() {
    window.localStorage.setItem(configuration.appId, JSON.stringify(session));
  }

  function checkPlatform() {
    // browser info and capability
    let userAgent = window.navigator.userAgent;

    platform.isIDevice = /iphone|ipod|ipad/i.test(userAgent);
    platform.isSamsung = /Samsung/i.test(userAgent);
    platform.isFireFox = /Firefox/i.test(userAgent);
    platform.isOpera = /opr/i.test(userAgent);
    platform.isEdge = /edg/i.test(userAgent);

    // Opera & FireFox only Trigger on Android
    if (platform.isFireFox) {
      platform.isFireFox = /android/i.test(userAgent);
    }

    if (platform.isOpera) {
      platform.isOpera = /android/i.test(userAgent);
    }

    platform.isChromium = "onbeforeinstallprompt" in window;
    platform.isInWebAppiOS = window.navigator.standalone === true;
    platform.isInWebAppChrome = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    platform.isMobileSafari =
      platform.isIDevice &&
      userAgent.indexOf("Safari") > -1 &&
      userAgent.indexOf("CriOS") < 0;
    platform.isStandalone = platform.isInWebAppiOS || platform.isInWebAppChrome;
    platform.isiPad = platform.isMobileSafari && userAgent.indexOf("iPad") > -1;
    platform.isiPhone =
      platform.isMobileSafari && userAgent.indexOf("iPad") === -1;
    platform.isCompatible =
      platform.isChromium ||
      platform.isMobileSafari ||
      platform.isSamsung ||
      platform.isFireFox ||
      platform.isOpera;
  }

  function getPlatform(native) {
    if (configuration.debug && typeof configuration.debug === "string") {
      return configuration.debug;
    }

    if (platform.isChromium && native === undefined) {
      return "native";
    } else if (platform.isFireFox) {
      return "firefox";
    } else if (platform.isiPad) {
      return "ipad";
    } else if (platform.isiPhone) {
      return "iphone";
    } else if (platform.isOpera) {
      return "opera";
    } else if (platform.isSamsung) {
      return "samsung";
    } else if (platform.isEdge) {
      return "edge";
    } else if (platform.isChromium) {
      return "chromium";
    } else {
      return "";
    }
  }

  function handleBeforeInstallPrompt(event) {
    event.preventDefault();
    doLog("capturing the native A2HS prompt");
    beforeInstallPromptEvent = event;
    delayedShow();
  }

  function delayedShow() {
    setTimeout(performShow, configuration.startDelay * 1000 + 500);
  }

  function show() {
    // message already on screen
    if (isAthDialogShown) {
      doLog(
        "Add to home screen: not displaying callout because already shown on screen"
      );
      return;
    }

    isAthDialogShown = true;

    if (
      document.readyState === "interactive" ||
      document.readyState === "complete"
    ) {
      delayedShow();
    } else {
      document.onreadystatechange = function () {
        if (document.readyState === "complete") {
          delayedShow();
        }
      };
    }
  }

  function performShow() {
    if (canPrompt()) {
      if (beforeInstallPromptEvent && !configuration.mustShowCustomPrompt) {
        doLog("show native prompt");
        triggerNativePrompt();
      } else {
        let target = getPlatform();
        let athWrapper = document.querySelector(
          `.${configuration.customPromptElements.container}`
        );

        doLog(`show generic prompt for platform ${target}`);
        if (athWrapper && !session.optedOut) {
          athWrapper.classList.remove(configuration.hideClass);

          let promptTarget = Object.assign(
            {},
            DEFAULT_PROMPT,
            configuration.customPromptContent,
            configuration.customPromptPlatformDependencies[target]
          );

          if (promptTarget.showClasses) {
            promptTarget.showClasses = promptTarget.showClasses.concat(
              configuration.showClasses
            );
          } else {
            promptTarget.showClasses = configuration.showClasses;
          }

          for (
            let index = 0;
            index < promptTarget.showClasses.length;
            index++
          ) {
            athWrapper.classList.add(promptTarget.showClasses[index]);
          }

          let promptDialogTitle = athWrapper.querySelector(
            `.${configuration.customPromptElements.title}`
          );
          let promptDialogLogo = athWrapper.querySelector(
            `.${configuration.customPromptElements.logo}`
          );
          let promptDialogCancelButton = athWrapper.querySelector(
            `.${configuration.customPromptElements.cancelButton}`
          );
          let promptDialogInstallButton = athWrapper.querySelector(
            `.${configuration.customPromptElements.installButton}`
          );

          if (promptDialogTitle && promptTarget.title) {
            promptDialogTitle.innerText = promptTarget.title;
          }

          if (promptDialogLogo) {
            if (promptTarget.src) {
              promptDialogLogo.src = promptTarget.src;
              promptDialogLogo.alt =
                promptTarget.title || "Install application";
            } else {
              promptDialogLogo.remove();
            }
          }

          if (promptDialogInstallButton) {
            promptDialogInstallButton.addEventListener("click", handleInstall);
            promptDialogInstallButton.classList.remove(configuration.hideClass);
            promptDialogInstallButton.innerText =
              promptTarget.installMsg != null
                ? promptTarget.installMsg
                : promptTarget.action && promptTarget.action.ok
                ? promptTarget.action.ok
                : "";
          }

          if (promptDialogCancelButton) {
            promptDialogCancelButton.addEventListener("click", cancelPrompt);
            promptDialogCancelButton.classList.remove(configuration.hideClass);
            promptDialogCancelButton.innerText =
              promptTarget.cancelMsg != null
                ? promptTarget.cancelMsg
                : promptTarget.action && promptTarget.action.cancel
                ? promptTarget.action.cancel
                : "";
          }
        }

        if (configuration.lifespan && configuration.lifespan > 0) {
          autoHideTimer = setTimeout(autoHide, configuration.lifespan * 1000);
        }
      }

      // fire the custom onShow event
      if (configuration.onShow) {
        configuration.onShow.call(this);
      }

      // increment the display count
      session.lastDisplayTime = Date.now();
      session.displayCount++;
      updateSession();
    }
  }

  function canPrompt() {
    // already evaluated the situation, so don't do it again
    if (canPromptState !== undefined) {
      return canPromptState;
    }

    canPromptState = false;

    if (configuration.customCriteria !== null) {
      let passCustom =
        typeof configuration.customCriteria === "function"
          ? configuration.customCriteria()
          : !!configuration.customCriteria;

      if (!passCustom) {
        doLog(
          "Add to home screen: not displaying callout because a custom criteria was not met."
        );
        return false;
      }
    }

    // using a double negative here to detect if service workers are not supported
    // if not then don't bother asking to add to install the PWA
    if (!("serviceWorker" in navigator)) {
      doLog(
        "Add to home screen: not displaying callout because service workers are not supported"
      );
      return false;
    }

    // the device is not supported
    if (!platform.isCompatible) {
      doLog(
        "Add to home screen: not displaying callout because device not supported"
      );
      return false;
    }

    let now = Date.now();
    let lastDisplayTime = session.lastDisplayTime;

    // we obey the display pace (prevent the message to popup too often)
    if (now - lastDisplayTime < configuration.displayPace * 60000) {
      doLog(
        "Add to home screen: not displaying callout because displayed recently"
      );
      return false;
    }

    // obey the maximum number of display count
    if (
      configuration.maxDisplayCount &&
      session.displayCount >= configuration.maxDisplayCount
    ) {
      doLog(
        "Add to home screen: not displaying callout because displayed too many times already"
      );
      return false;
    }

    // check if this is a valid location
    // TODO: should include at least the home page here
    // by default all pages are valid, which can cause issues on iOS
    // TODO: maybe trigger a redirect back to the home page for iOS
    let isValidLocation = !configuration.validLocation.length;

    for (let i = configuration.validLocation.length; i--; ) {
      if (configuration.validLocation[i].test(document.location.href)) {
        isValidLocation = true;
        break;
      }
    }

    if (!isValidLocation) {
      doLog(
        "Add to home screen: not displaying callout because not a valid location"
      );
      return false;
    }

    let isGuidanceURL = false;

    for (let i = guidanceTargetUrls.length; i--; ) {
      if (document.location.href.indexOf(guidanceTargetUrls[i]) > -1) {
        isGuidanceURL = true;
        break;
      }
    }

    if (isGuidanceURL) {
      doLog(
        "Add to home screen: not displaying callout because this is a guidance URL"
      );
      return false;
    }

    if (session.pageViews < configuration.minPageViews) {
      doLog(
        "Add to home screen: not displaying callout because not enough visits"
      );
      return false;
    }

    // critical errors:
    if (session.optedOut) {
      doLog(
        "Add to home screen: not displaying callout because user opted out"
      );
      return false;
    }

    if (session.added) {
      doLog(
        "Add to home screen: not displaying callout because already added to the home screen"
      );
      return false;
    }

    // check if the app is in stand alone mode
    // this applies to iOS
    if (platform.isStandalone) {
      // execute the onAdd event if we haven't already
      if (!session.added) {
        session.added = true;
        updateSession();

        if (configuration.onAdd) {
          configuration.onAdd.call(this);
        }
      }

      doLog(
        "Add to home screen: not displaying callout because in standalone mode"
      );
      return false;
    }

    // check if this is a returning visitor
    if (!session.returningVisitor) {
      session.returningVisitor = true;
      updateSession();

      // we do not show the message if this is your first visit
      if (configuration.skipFirstVisit) {
        doLog(
          "Add to home screen: not displaying callout because skipping first visit"
        );
        return false;
      }
    }

    canPromptState = true;
    return true;
  }

  /* displays native A2HS prompt & stores results */
  function triggerNativePrompt() {
    return beforeInstallPromptEvent
      .prompt()
      .then(function () {
        // Wait for the user to respond to the prompt
        return beforeInstallPromptEvent.userChoice;
      })
      .then(function (choiceResult) {
        session.added = choiceResult.outcome === "accepted";

        if (session.added) {
          doLog("User accepted the A2HS prompt");
          if (configuration.onAdd) {
            configuration.onAdd();
          }
        } else {
          if (configuration.onCancel) {
            configuration.onCancel();
          }
          session.optedOut = true;
          doLog("User dismissed the A2HS prompt");
        }
        updateSession();
        beforeInstallPromptEvent = null;
      })
      .catch(function (err) {
        doLog(err.message);

        if (err.message.indexOf("user gesture") > -1) {
          configuration.mustShowCustomPrompt = true;
          delayedShow();
        } else if (err.message.indexOf("The app is already installed") > -1) {
          doLog(err.message);
          session.added = true;
          updateSession();
        } else {
          doLog(err);
          return err;
        }
      });
  }

  function cancelPrompt(event) {
    event.preventDefault();
    if (configuration.onCancel) {
      configuration.onCancel();
    }
    closePrompt();
    return false;
  }

  function closePrompt() {
    let athWrapper = document.querySelector(
      `.${configuration.customPromptElements.container}`
    );
    if (athWrapper) {
      let target = getPlatform();
      let promptTarget = configuration.customPromptPlatformDependencies[target];
      promptTarget.showClasses = promptTarget.showClasses.concat(
        configuration.showClasses
      );
      athWrapper.classList.remove(...promptTarget.showClasses);
    }
  }

  function handleInstall() {
    if (configuration.onInstall) {
      configuration.onInstall();
    }
    if (
      beforeInstallPromptEvent &&
      (!configuration.debug || getPlatform() === "native")
    ) {
      closePrompt();
      triggerNativePrompt();
    } else {
      showPlatformGuidance(true);
    }
    return false;
  }

  function autoHide() {
    let athWrapper = document.querySelector(
      `.${configuration.customPromptElements.container}`
    );

    closePrompt();
    if (athWrapper) {
      athWrapper.classList.add(configuration.hideClass);
    }
  }

  return (
    <div
      className={`${configuration.customPromptElements.container} ${configuration.customPromptElements.containerAddOns}`}
    >
      <div
        className={`${configuration.customPromptElements.banner} ${configuration.customPromptElements.bannerAddOns}`}
      >
        <div
          className={`${configuration.customPromptElements.logoCell} ${configuration.customPromptElements.logoCellAddOns}`}
        >
          <img
            alt="Application Logo"
            className={`${configuration.customPromptElements.logo} ${configuration.customPromptElements.logoAddOns}`}
          />
        </div>
        <div
          className={`${configuration.customPromptElements.titleCell} ${configuration.customPromptElements.titleCellAddOns}`}
        >
          <div
            className={`${configuration.customPromptElements.title} ${configuration.customPromptElements.titleAddOns}`}
          />
        </div>
        <div
          className={`${configuration.customPromptElements.cancelButtonCell} ${configuration.customPromptElements.cancelButtonCellAddOns}`}
        >
          <button
            className={`${configuration.customPromptElements.cancelButton} ${configuration.customPromptElements.cancelButtonAddOns}`}
          >
            Not Now
          </button>
        </div>
        <div
          className={`${configuration.customPromptElements.installButtonCell} ${configuration.customPromptElements.installButtonCellAddOns}`}
        >
          <button
            className={`${configuration.customPromptElements.installButton} ${configuration.customPromptElements.installButtonAddOns}`}
          >
            Install
          </button>
        </div>
      </div>
      <div
        className={`${configuration.customPromptElements.guidance} ${configuration.customPromptElements.guidanceAddOns}`}
      >
        <div
          className={`${configuration.customPromptElements.guidanceImageCell} ${configuration.customPromptElements.guidanceImageCellAddOns}`}
        />
        <div
          className={`${configuration.customPromptElements.cancelButtonCell} ${configuration.customPromptElements.cancelButtonCellAddOns}`}
        >
          <button
            className={`${configuration.customPromptElements.guidanceCancelButton} ${configuration.customPromptElements.guidanceCancelButtonAddOns}`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const platformPropType = PropTypes.shape({
  showClasses: PropTypes.arrayOf(PropTypes.string),
  targetUrl: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    })
  ),
  action: PropTypes.shape({
    ok: PropTypes.string,
    cancel: PropTypes.string,
    guidanceCancel: PropTypes.string,
  }),
});

AddToHomeScreen.propTypes = {
  appId: PropTypes.string,
  debug: PropTypes.string,
  activateLogging: PropTypes.bool,
  isModal: PropTypes.bool,
  isMandatory: PropTypes.bool,
  startAutomatically: PropTypes.bool,
  skipFirstVisit: PropTypes.bool,
  minPageViews: PropTypes.number,
  startDelay: PropTypes.number,
  lifespan: PropTypes.number,
  displayPace: PropTypes.number,
  mustShowCustomPrompt: PropTypes.bool,
  maxDisplayCount: PropTypes.number,
  validLocation: PropTypes.arrayOf(PropTypes.string),
  onInit: PropTypes.func,
  onShow: PropTypes.func,
  onAdd: PropTypes.func,
  onInstall: PropTypes.func,
  onCancel: PropTypes.func,
  showClasses: PropTypes.arrayOf(PropTypes.string),
  showClass: PropTypes.string,
  hideClass: PropTypes.string,
  customCriteria: PropTypes.func,
  customPromptContent: PropTypes.shape({
    title: PropTypes.string,
    src: PropTypes.string,
    cancelMsg: PropTypes.string,
    installMsg: PropTypes.string,
    guidanceCancelMsg: PropTypes.string,
  }),
  customPromptElements: PropTypes.shape({
    container: PropTypes.string,
    containerAddOns: PropTypes.string,
    banner: PropTypes.string,
    bannerAddOns: PropTypes.string,
    logoCell: PropTypes.string,
    logoCellAddOns: PropTypes.string,
    logo: PropTypes.string,
    logoAddOns: PropTypes.string,
    titleCell: PropTypes.string,
    titleCellAddOns: PropTypes.string,
    title: PropTypes.string,
    titleAddOns: PropTypes.string,
    cancelButtonCell: PropTypes.string,
    cancelButtonCellAddOns: PropTypes.string,
    cancelButton: PropTypes.string,
    cancelButtonAddOns: PropTypes.string,
    installButtonCell: PropTypes.string,
    installButtonCellAddOns: PropTypes.string,
    installButton: PropTypes.string,
    installButtonAddOns: PropTypes.string,
    guidance: PropTypes.string,
    guidanceAddOns: PropTypes.string,
    guidanceImageCell: PropTypes.string,
    guidanceImageCellAddOns: PropTypes.string,
    guidanceCancelButton: PropTypes.string,
    guidanceCancelButtonAddOns: PropTypes.string,
  }),
  customPromptPlatformDependencies: PropTypes.shape({
    native: platformPropType,
    chromium: platformPropType,
    edge: platformPropType,
    iphone: platformPropType,
    ipad: platformPropType,
    firefox: platformPropType,
    samsung: platformPropType,
    opera: platformPropType,
  }),
};
