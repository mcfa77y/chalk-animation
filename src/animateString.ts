import { Animation } from "./Animation";

export function animateString(effect: any, str: string, delay = 0, speed = 0) {
  if (!speed || speed <= 0) {
    throw new Error("Expected `speed` to be an number greater than 0");
  }
  const animation = new Animation(effect, str, delay, speed);
  // setTimeout(() => {
  //   if (!animation.stopped) {
  //     animation.start();
  //   }
  // }, delay / speed);
  animation.start();
  return animation;
}
