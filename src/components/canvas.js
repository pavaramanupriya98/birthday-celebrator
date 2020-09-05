import initCanvasDimensions, { getCanvasWidth, getCanvasHeight } from "../utils/dimensions";
import radians from "../utils/radians";
import sceneStates, { getSceneState, setSceneState } from "../utils/SceneState";

import Background from '../shapes/Background';
import Cake from "../shapes/Cake";
import Knife from "../shapes/Knife";
import Candle from '../shapes/Candle'
import CandleBlower from "../shapes/CandleBlower";
import distance from "../utils/distance";
import ArrowStrip from "../shapes/ArrowStrip";
import Text from "../shapes/Text";

export default () => {
  const canvas = document.querySelector('canvas');
  initCanvasDimensions(canvas);

  const background = new Background();
  
  const backCakeSlice = new Cake(
    getCanvasWidth()/2,
    getCanvasHeight()/2,
    radians(180),
    0,
  );

  const acuteCakeSlice = new Cake(
    getCanvasWidth()/2,
    getCanvasHeight()/2,
    0,
    radians(45),
  );

  const obtuseCakeSlice = new Cake(
    getCanvasWidth()/2,
    getCanvasHeight()/2,
    radians(45),
    radians(180),
  );

  const candles = [
    new Candle(getCanvasWidth()/2, getCanvasHeight()/2 - 60),
    new Candle(getCanvasWidth()/2 + 80, getCanvasHeight()/2 - 180),
    new Candle(getCanvasWidth()/2 - 80, getCanvasHeight()/2 - 180),
  ];

  const fan = new CandleBlower(getCanvasWidth()/4, getCanvasHeight()/4);

  const knife = new Knife(getCanvasWidth()/2 + 150);
  const arrowStrip = new ArrowStrip(getCanvasWidth()/2 + 350, getCanvasHeight()/2);

  const birthdayWish = new Text("Happy Birthday!", getCanvasWidth()/2, 100);

  function draw() {
    background.draw();

    switch(getSceneState()) {
      case sceneStates.INIT: {
        backCakeSlice.draw();
        acuteCakeSlice.draw();
        obtuseCakeSlice.draw();
        candles.forEach(candle => candle.draw());
        break;
      }

      case sceneStates.CANDLE_BLOWING: {
        backCakeSlice.draw();
        acuteCakeSlice.draw();
        obtuseCakeSlice.draw();
        candles.forEach(candle => candle.draw());
        fan.draw();
        break;
      }

      case sceneStates.CAKE_CUTTING: {
        backCakeSlice.draw();
        knife.draw();
        acuteCakeSlice.draw();
        // step === 1 && knife(ctx, getCanvasWidth()/2 + 150, mouseY, step);
        obtuseCakeSlice.draw();
        arrowStrip.draw()
        birthdayWish.draw();
        break;
      }

      default: {
        backCakeSlice.draw();
        acuteCakeSlice.draw();
        obtuseCakeSlice.draw();
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

        candles.forEach(candle => {
          if(distance(candle.getPosition(), fan.getPosition()) < 40) {
            candle.extinguish();
          }
        });

        if(candles.every(candle => candle.getState() === 'extinguished')) {
          setSceneState(sceneStates.CAKE_CUTTING);
        }
        break;
      }

      case sceneStates.CAKE_CUTTING: {
        knife.update();
        arrowStrip.update();
        birthdayWish.update();
        const { y } = knife.getPosition();
        if(knife.animate && (y >= getCanvasHeight()/2 - 90)) {
          knife.stopAnimating()
          arrowStrip.fillAll();
          birthdayWish.show();
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