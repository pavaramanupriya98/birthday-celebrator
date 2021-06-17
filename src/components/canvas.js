import initCanvasDimensions, { getCanvasWidth, getCanvasHeight, getScaleX, getScaleXBounded, getScaleY } from "../utils/dimensions";
import sceneStates, { getSceneState, setSceneState } from "../utils/SceneState";

import Background from './shapes/Background';
import Cake from "./shapes/Cake";
import Knife from "./shapes/Knife";
import Candle from './shapes/Candle'
import CandleBlower from "./shapes/CandleBlower";
import ArrowStrip from "./shapes/ArrowStrip";
import Text from "./shapes/Text";
import { sendCustomEvent, EventLabels, EventNames } from "../utils/analytics";
import { resetDrag } from "../utils/mouseCoords";
import { calculateDistance, convertDegreeToRadians } from "../utils/helpers";
import initAudio from "../utils/audio";
import birthdaySound from '../assets/cheering.mp3';

export default () => {
  const canvas = document.querySelector('canvas');
  initCanvasDimensions(canvas);

  const background = new Background();
  
  const backCakeSlice = new Cake(
    getCanvasWidth()/2,
    getCanvasHeight()/2,
    convertDegreeToRadians(180),
    0,
  );

  const frontCakeSlice = new Cake(
    getCanvasWidth()/2,
    getCanvasHeight()/2,
    0,
    convertDegreeToRadians(180),
  );

  const blowCandleText1 = new Text({
    text: "Blow the candles",
    x: getCanvasWidth()/2,
    y: getCanvasHeight()*0.8,
    alpha: 1,
    font: '2rem Nunito',
    color: '#132743',
  });
  const blowCandleText2 = new Text({
    text: "by moving the blower near each candle",
    x: getCanvasWidth()/2,
    y: getCanvasHeight()*0.8 + 20,
    alpha: 1,
    font: '1rem Nunito',
    color: '#132743',
  });
  const cakeCutText = new Text({
    text: "Cut the cake",
    x: getCanvasWidth()/2,
    y: getCanvasHeight()*0.8,
    alpha: 1,
    font: '2rem Nunito',
    color: '#132743',
  });
  
  const birthdayWishText = new Text({
    text: "Happy Birthday!",
    x: getCanvasWidth()/2,
    y: getCanvasHeight()*0.2,
    alpha: 0,
    font: '3rem Fugaz One',
    color: '#ff0054',
    shadowBlur: 5,
  });

  const candles = [
    new Candle(getCanvasWidth()/2 + 80 * getScaleXBounded(), getCanvasHeight()/2 - 40 * getScaleY(), '#f25f5c'),
    new Candle(getCanvasWidth()/2 - 80 * getScaleXBounded(), getCanvasHeight()/2 - 40 * getScaleY(), '#ffe066'),
    new Candle(getCanvasWidth()/2, getCanvasHeight()/2 + 60 * getScaleY(), '#b9e769'),
  ];

  const fan = new CandleBlower(getCanvasWidth()/4, getCanvasHeight()/4);

  const knife = new Knife(getCanvasWidth()/2 + 150 * getScaleXBounded(0.5), getCanvasHeight()/2, 80 * getScaleY());
  const arrowStrip = new ArrowStrip(getCanvasWidth()/2 + 400 * getScaleX(), getCanvasHeight()/2 + 100 * getScaleY());


  function draw() {
    background.draw();

    switch(getSceneState()) {
      case sceneStates.INIT: {
        backCakeSlice.draw();
        frontCakeSlice.draw();
        candles.forEach(candle => candle.draw());
        break;
      }

      case sceneStates.CANDLE_BLOWING: {
        blowCandleText1.draw();
        blowCandleText2.draw();
        backCakeSlice.draw();
        frontCakeSlice.draw();
        candles.forEach(candle => candle.draw());
        fan.draw();
        break;
      }

      case sceneStates.CAKE_CUTTING: {
        cakeCutText.draw();
        backCakeSlice.draw();
        candles.slice(0, 2).forEach(candle => candle.draw());
        knife.draw();
        frontCakeSlice.draw();
        candles.slice(2).forEach(candle => candle.draw());
        !knife.showPointer && arrowStrip.draw();
        birthdayWishText.draw();
        break;
      }

      default: {
        backCakeSlice.draw();
        frontCakeSlice.draw();
        break;
      }
    }
  }

  function update() {

    switch(getSceneState()) {
      case sceneStates.CANDLE_BLOWING: {
        candles.forEach(candle => {
          candle.update();
        });
        fan.update();
        blowCandleText1.update();
        blowCandleText2.update();

        candles.forEach(candle => {
          if(candle.state === 'burning' && calculateDistance(candle.getPosition(), fan.getPosition()) < 40) {
            candle.extinguish();
            sendCustomEvent(EventLabels.CAKE, EventNames.CANDLE_BLOWN, { id: candle.id });
            blowCandleText1.hide();
            blowCandleText2.hide();
          }
        });

        if(candles.every(candle => candle.getState() === 'extinguished')) {
          setSceneState(sceneStates.CAKE_CUTTING);
          resetDrag();
        }
        break;
      }

      case sceneStates.CAKE_CUTTING: {
        knife.update();
        arrowStrip.update();
        cakeCutText.update();
        birthdayWishText.update();
        const { y } = knife.getPosition();
        if(knife.isBeingDragged && cakeCutText.alpha === 1) {
          cakeCutText.hide();
        }
        if(knife.animate && (y > knife.initY + knife.lowBound - 2)) {
          knife.stopAnimating();
          sendCustomEvent(EventLabels.CAKE, EventNames.CAKE_CUT);
          arrowStrip.fillAll();
          birthdayWishText.show(0.05);
          initAudio(birthdaySound);
        }
        break;
      }

      default: {
        break;
      }
    }
  }

  function loop() {
    requestAnimationFrame(loop);
    update();
    draw();
  }

  loop();
}