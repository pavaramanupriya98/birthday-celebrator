// Scene States

const INIT = 'INIT';
const CANDLE_BLOWING = 'CANDLE_BLOWING';
const CAKE_CUTTING = 'CAKE_CUTTING';

const sceneStates = {
  INIT,
  CANDLE_BLOWING,
  CAKE_CUTTING,
};

let currentSceneState = sceneStates.CANDLE_BLOWING;


export default sceneStates;

export const getSceneState = () => sceneStates[currentSceneState];

export const setSceneState = (sceneState) => { currentSceneState = sceneState };