export const EventLabels = Object.freeze({
    CAKE: "Cake",
});

export const EventNames = Object.freeze({
    AUDIO_INITIALIZED: "Audio Initialized",
    CANDLE_BLOWN: "Candle Blown",
    CAKE_CUT: "Cake Cut",
    BLOWER_DRAGGED: "Blower Dragged",
    KNIFE_DRAGGED: "Knife Dragged",
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