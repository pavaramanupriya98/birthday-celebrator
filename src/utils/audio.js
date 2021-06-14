// import { sendCustomEvent, EventLabels, EventNames } from './analytics';

const initAudio = (src) => {
  const audioElement = document.createElement("audio");
  document.body.appendChild(audioElement);

  audioElement.setAttribute("src", src);

  audioElement.play();
  // sendCustomEvent(EventLabels.CAKE, EventNames.AUDIO_INITIALIZED);
}

export default initAudio;
