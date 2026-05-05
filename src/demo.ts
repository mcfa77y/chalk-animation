import { Color1Options, Color2Options } from "./Effects";
import { ChalkAnimation } from "./index";

(async () => {
  console.log("Chalk Animation Demo\n");

  const animations: [string, (text: string, speed: number, options?: Color1Options | Color2Options) => any, options: any][] = [
    ["neon", ChalkAnimation.neon, { primaryHexColor: "#d55ef2", secondaryHexColor: "#585858" }],
    ["radar", ChalkAnimation.radar, { primaryHexColor: "#00ff00" }],
    ["pulse", ChalkAnimation.pulse, { primaryHexColor: "#00ff10", secondaryHexColor: "#e6e6e6" }],
    ["glitch", ChalkAnimation.glitch, { primaryHexColor: "#00ff00" }],
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
