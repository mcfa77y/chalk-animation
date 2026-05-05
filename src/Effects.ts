import chalk from "chalk";
import gradient from "gradient-string";
import { Decor } from "./Decor";

export interface Color2Options {
  primaryHexColor: string
  secondaryHexColor: string
}

export interface Color1Options {
  primaryHexColor: string;
}

export class Effects {
  public static readonly longHsv = {
    interpolation: "hsv" as const,
    hsvSpin: "long" as const,
  };
  public static readonly glitchChars =
    "x*0987654321[]0-~@#(____!!!!\\|?????....0000\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";

  @Decor.bound
  public static rainbow(str: string, frame: number, _options: any) {
    const hue = 5 * frame;
    const leftColor = { h: hue % 360, s: 1, v: 1 };
    const rightColor = { h: (hue + 1) % 360, s: 1, v: 1 };
    return gradient([leftColor, rightColor], { interpolation: "hsv", hsvSpin: "long" })(str);
  }

  @Decor.bound
  public static pulse(str: string, frame: number, options: Color2Options = {
    primaryHexColor: "#00ff10",
    secondaryHexColor: "#e6e6e6"
  }) {
    frame = (frame % 120) + 1;
    const transition = 6;
    const duration = 10;
    const on = options.primaryHexColor;
    const off = options.secondaryHexColor;

    if (frame >= 2 * transition + duration) {
      return chalk.hex(off)(str); // All white
    }
    if (frame >= transition && frame <= transition + duration) {
      return chalk.hex(on)(str); // All red
    }

    frame =
      frame >= transition + duration
        ? 2 * transition + duration - frame
        : frame; // Revert animation

    const gradientFn =
      frame <= transition / 2
        ? gradient([
          { color: off, pos: 0.5 - frame / transition },
          { color: on, pos: 0.5 },
          { color: off, pos: 0.5 + frame / transition },
        ])
        : gradient([
          { color: off, pos: 0 },
          { color: on, pos: 1 - frame / transition },
          { color: on, pos: frame / transition },
          { color: off, pos: 1 },
        ]);

    return gradientFn(str);
  }

  @Decor.bound
  public static glitch(str: string, frame: number, options: Color1Options = { primaryHexColor: "#00ff00" }) {
    const { primaryHexColor } = options
    if (
      (frame % 2) + (frame % 3) + (frame % 11) + (frame % 29) + (frame % 37) >
      52
    ) {
      return chalk.hex(primaryHexColor)(str.replace(/[^\r\n]/g, " "));
    }

    const chunkSize = Math.max(3, Math.round(str.length * 0.02));
    const chunks = [];

    for (let i = 0, length = str.length; i < length; i++) {
      const skip = Math.round(Math.max(0, (Math.random() - 0.8) * chunkSize));
      chunks.push(str.substring(i, i + skip).replace(/[^\r\n]/g, " "));
      i += skip;
      if (str[i]) {
        if (str[i] !== "\n" && str[i] !== "\r" && Math.random() > 0.995) {
          chunks.push(
            this.glitchChars[
            Math.floor(Math.random() * this.glitchChars.length)
            ],
          );
        } else if (Math.random() > 0.005) {
          chunks.push(str[i]);
        }
      }
    }

    let result = chunks.join("");
    if (Math.random() > 0.99) {
      result = result.toUpperCase();
    } else if (Math.random() < 0.01) {
      result = result.toLowerCase();
    }

    return chalk.hex(primaryHexColor)(result);
  }

  @Decor.bound
  public static radar(str: string, frame: number, options: Color1Options = { primaryHexColor: "#00ff00" }) {
    const depth = Math.floor(Math.min(str.length, str.length * 0.2));

    const hex = options.primaryHexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const globalPos = frame % (str.length + depth);

    const chars = [];
    for (let i = 0, length = str.length; i < length; i++) {
      const pos = -(i - globalPos);
      if (pos > 0 && pos <= depth - 1) {
        const shade = (depth - pos) / depth;
        chars.push(
          chalk.rgb(
            Math.round(r * shade),
            Math.round(g * shade),
            Math.round(b * shade)
          )(str[i])
        );
      } else {
        chars.push(" ");
      }
    }

    return chars.join("");
  }

  @Decor.bound
  public static neon(str: string, frame: number, options: Color2Options = {
    primaryHexColor: "#d55ef2",
    secondaryHexColor: "#585858"
  }) {
    const color =
      frame % 2 === 0
        ? chalk.dim.hex(options.secondaryHexColor)
        : chalk.bold.hex(options.primaryHexColor)
    return color(str);
  }

  @Decor.bound
  public static karaoke(str: string, frame: number, options: Color2Options = {
    primaryHexColor: "#ffb900",
    secondaryHexColor: "#ffffff"
  }) {
    const chars = (frame % (str.length + 20)) - 10;
    if (chars < 0) {
      return chalk.hex(options.secondaryHexColor)(str);
    }
    return (
      chalk.hex(options.primaryHexColor).bold(str.substr(0, chars)) +
      chalk.hex(options.secondaryHexColor)(str.substr(chars))
    );
  }
}
