import type { AnimationFN } from "./types";
import { InstanceTracker } from "./InstanceTracker";

export class Animation extends InstanceTracker {
  lines: number;
  speed: number;
  delay: number;
  text: string[];
  stopped = false;
  currentFrame = 0;
  initialized = false;
  effect: AnimationFN;
  static readonly BREAK_LINES = /\r\n|\r|\n/;
  controller: ReturnType<typeof setTimeout> | null = null;
  constructor(effect: AnimationFN, str: string, delay = 0, speed = 0) {
    super();
    this.speed = speed;
    this.delay = delay;
    this.effect = effect;
    this.text = str.split(Animation.BREAK_LINES);
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

  public readonly replace = this.chainable((str: string) => {
    this.text = str.split(Animation.BREAK_LINES);
    this.lines = this.text.length;
  });

  public readonly stop = this.chainable(() => {
    this.clearFrames();
    this.stopped = true;
  });

  public readonly start = this.chainable(() => {
    this.clearFrames();
    this.stopped = false;
    this.render();
  });

  private clearFrames() {
    if (this.controller) {
      clearTimeout(this.controller);
      this.controller = null;
    }
  }

  private chainable<F extends (...args: any[]) => void>(func: F) {
    return (...params: Parameters<F>): Animation => {
      func(...params);
      return this;
    };
  }
}
