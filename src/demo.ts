import { Color2Options } from "./Effects";
import { ChalkAnimation } from "./index";

(async () => {
  console.log("Chalk Animation Demo\n");

  const animations: [string, (text: string, speed: number, options?: Color2Options) => any, options: any][] = [
    ["neon", ChalkAnimation.neon, { primaryHexColor: "#d55ef2", secondaryHexColor: "#585858" }],
    ["radar", ChalkAnimation.radar, undefined],
    ["pulse", ChalkAnimation.pulse, { primaryHexColor: "#00ff10", secondaryHexColor: "#e6e6e6" }],
    ["glitch", ChalkAnimation.glitch, undefined],
    ["rainbow", ChalkAnimation.rainbow, undefined],
    ["karaoke", ChalkAnimation.karaoke, { primaryHexColor: "#ffb900", secondaryHexColor: "#ffffff" }],
  ];

  for (const [name, animate, options] of animations) {
    const animation = animate(`${name} effect`, 1, options);
    await new Promise(resolve => setTimeout(resolve, 2000));
    animation.stop();
    console.log("");
  }
})();
