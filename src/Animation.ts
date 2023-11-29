import type { AnimationFN } from "./types";
import { InstanceTracker } from "./InstanceTracker";

export class Animation extends InstanceTracker {
  effect: any;
  lines: number;
  speed: number;
  delay: number;
  text: string[];
  stopped = false;
  currentFrame = 0;
  initialized = false;
  controller: ReturnType<typeof setTimeout> | null = null;
  constructor(effect: AnimationFN, str: string, delay = 0, speed = 0) {
    super();
    this.effect = effect;
    this.speed = speed;
    this.delay = delay;
    this.text = str.split(/\r\n|\r|\n/);
    this.lines = this.text.length;
  }

  public render() {
    if (!this.initialized) {
      Animation.LOG("\n".repeat(this.lines - 1));
      this.initialized = true;
    }
    Animation.LOG(this.frame());
    this.controller = setTimeout(() => {
      if (!this.stopped) {
        this.render();
      }
    }, this.delay / this.speed);
  }

  public frame() {
    this.currentFrame++;
    return (
      "\u001B[" +
      `${this.lines}` +
      "F\u001B[G\u001B[2K" +
      this.text.map((str) => this.effect(str, this.currentFrame)).join("\n")
    );
  }

  public replace(str: string) {
    this.text = str.split(/\r\n|\r|\n/);
    this.lines = this.text.length;
    return this;
  }

  public stop() {
    this.clearFrames();
    this.stopped = true;
    return this;
  }

  public start() {
    this.clearFrames();
    this.stopped = false;
    this.render();
    return this;
  }

  private clearFrames() {
    if (this.controller) {
      clearTimeout(this.controller);
      this.controller = null;
    }
  }
}
