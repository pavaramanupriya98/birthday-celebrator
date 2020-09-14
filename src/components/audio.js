import { sendCustomEvent, EventLabels, EventNames } from '../utils/analytics';

export default () => {
  const audioElement = document.querySelector('audio');

  const audioContext = new AudioContext();

  const track = audioContext.createMediaElementSource(audioElement);
  track.mediaElement.loop = true;

  const volumeControl = new GainNode(audioContext);
  volumeControl.gain.value = 0.8;

  track.connect(volumeControl);
  volumeControl.connect(audioContext.destination);

  if(audioContext.state === 'suspended') {
    audioContext.resume();
  }

  // audioElement.play();
  // sendCustomEvent(EventLabels.CAKE, EventNames.AUDIO_INITIALIZED);
}