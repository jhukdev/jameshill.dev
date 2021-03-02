/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  type?: string;
  event?: IEvent;
  error?: {
    message: string;
    fatal: boolean;
  };
}

/* -----------------------------------
 *
 * IEvent
 *
 * -------------------------------- */

interface IEvent {
  category: string;
  action: string;
  label: string;
  value: string;
}

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

const trackingId = 'UA-167321875-1';
const analyticsEndpoint = 'https://www.google-analytics.com/collect';

/* -----------------------------------
 *
 * Options
 *
 * -------------------------------- */

const options = {
  anonymizeIp: true,
  colourDepth: true,
  characterSet: true,
  screenSize: true,
  language: true,
};

/* -----------------------------------
 *
 * ClientId
 *
 * -------------------------------- */

function getClientId() {
  if (!localStorage.clientId) {
    localStorage.clientId = Math.random().toString(36);
  }

  return localStorage.clientId;
}

/* -----------------------------------
 *
 * Document
 *
 * -------------------------------- */

function getDocumentMeta() {
  let referrer;

  if (document.referrer.indexOf(location.host) < 0) {
    referrer = document.referrer;
  }

  return { dr: referrer };
}

/* -----------------------------------
 *
 * Device
 *
 * -------------------------------- */

function getDeviceMeta() {
  let colourDepth;
  let screenSize;
  let viewPort;

  if (options.colourDepth && screen.colorDepth) {
    colourDepth = `${screen.colorDepth}-bit`;
  }

  if (options.screenSize && self.visualViewport) {
    viewPort = `${(self.visualViewport || {}).width}x${(self.visualViewport || {}).height}`;
  }

  if (options.screenSize) {
    screenSize = `${(self.screen || {}).width}x${(self.screen || {}).height}`;
  }

  return { sd: colourDepth, sr: screenSize, vp: viewPort };
}

/* -----------------------------------
 *
 * Query
 *
 * -------------------------------- */

function getQueryParams({ type, event, error }: IProps) {
  const { origin, pathname, search } = document.location;

  return new URLSearchParams({
    v: '1',
    ds: 'web',
    aip: options.anonymizeIp ? '1' : void 0,
    tid: trackingId,
    cid: getClientId(),
    t: type,
    dt: document.title,
    dl: origin + pathname + search,
    ul: options.language ? (navigator.language || '').toLowerCase() : void 0,
    de: options.characterSet ? document.characterSet : void 0,
    ec: event?.category || void 0,
    ea: event?.action || void 0,
    el: event?.label || void 0,
    ev: event?.value || void 0,
    exd: error?.message || void 0,
    exf: typeof error?.fatal !== 'undefined' && !!error?.fatal === false ? '0' : void 0,
    ...getDocumentMeta(),
    ...getDeviceMeta(),
  });
}

/* -----------------------------------
 *
 * Track
 *
 * -------------------------------- */

function track({ type = 'pageview', event, error }: IProps = {}) {
  if (__DEV__) {
    return; // no-op
  }

  navigator.sendBeacon(analyticsEndpoint, getQueryParams({ type, event, error }));
}

/* -----------------------------------
 *
 * Event
 *
 * -------------------------------- */

function event(event: IEvent) {
  track({ type: 'event', event });
}

/* -----------------------------------
 *
 * Error
 *
 * -------------------------------- */

function error(message: string, fatal: boolean) {
  track({ type: 'exception', error: { message, fatal } });
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { track, event, error };
