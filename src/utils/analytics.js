export const EventLabels = Object.freeze({
    CAKE: "Cake"
});

export const EventNames = Object.freeze({
    AUDIO_INITIALIZED: "Audio Initialized"
});

export function sendClickEvent(eventLabel, eventAction) {
    if (typeof window !== 'undefined' && 'ga' in window) {
        window.ga('send', {
            hitType: 'event',
            eventCategory: 'Click',
            eventAction,
            eventLabel
          });
    }
}

export function sendDragEvent(eventLabel, eventAction) {
    if (typeof window !== 'undefined' && 'ga' in window) {
        window.ga('send', {
            hitType: 'event',
            eventCategory: 'Drag',
            eventAction,
            eventLabel
          });
    }
}

export function sendCustomEvent(eventLabel, eventAction) {
    if (typeof window !== 'undefined' && 'ga' in window) {
        window.ga('send', {
            hitType: 'event',
            eventCategory: 'Custom',
            eventAction,
            eventLabel
          });
    }
}