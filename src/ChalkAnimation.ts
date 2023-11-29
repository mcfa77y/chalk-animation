import { Effects } from "./Effects";
import { Animation } from "./Animation";
import { animateString } from "./animateString";

export class ChalkAnimation {
  public static rainbow(str: string, speed = 1) {
    return animateString(Effects.rainbow, str, 15, speed);
  }

  public static pulse(str: string, speed = 1) {
    return animateString(Effects.pulse, str, 16, speed);
  }

  public static glitch(str: string, speed = 1) {
    return animateString(Effects.glitch, str, 55, speed);
  }

  public static radar(str: string, speed = 1) {
    return animateString(Effects.radar, str, 50, speed);
  }

  public static neon(str: string, speed = 1) {
    return animateString(Effects.neon, str, 500, speed);
  }

  public static karaoke(str: string, speed = 1) {
    return animateString(Effects.karaoke, str, 50, speed);
  }

  public static clearAllAnimations() {
    return Animation.clearAll();
  }
}
