import { Decor } from "./Decor";
import { FrameRate } from "./FrameRate";
import type { AnimationFN } from "./types";

export class Animation extends FrameRate {
  lines: number;
  text: string[];
  stopped = false;
  initialized = false;
  effect: AnimationFN;
  options: any;
  static readonly LINE_BREAKS = /\r\n|\r|\n/;
  constructor(effect: AnimationFN, str: string, delay = 0, speed = 0, options?: any) {
    super(delay, speed);
    this.effect = effect;
    this.text = str.split(Animation.LINE_BREAKS);
    this.options = options;
    this.lines = this.text.length;
  }

  public render() {
    if (!this.initialized) {
      Animation.LOG("\n".repeat(this.lines - 1));
      this.initialized = true;
    }
    Animation.LOG(this.nextFrame());
    this.schedule(() => {
      if (!this.stopped) {
        this.render();
      }
    });
  }

  public nextFrame() {
    this.increment();
    return (
      "\u001B[" +
      `${this.lines}` +
      "F\u001B[G\u001B[2K" +
      this.text.map(str => this.effect(str, this.current, this.options)).join("\n")
    );
  }

  public readonly replace = Decor.chainable(this, (str: string) => {
    this.text = str.split(Animation.LINE_BREAKS);
    this.lines = this.text.length;
  });

  public readonly stop = Decor.chainable(this, () => {
    this.clearFrames();
    this.stopped = true;
  });

  public readonly start = Decor.chainable(this, () => {
    this.clearFrames();
    this.stopped = false;
    this.render();
  });
}
