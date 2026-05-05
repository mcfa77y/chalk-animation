import { ChalkAnimation } from "./index";

(async () => {
  console.log("Chalk Animation Demo\n");

  const animations: [string, (text: string) => any][] = [
    ["neon", ChalkAnimation.neon],
    ["radar", ChalkAnimation.radar],
    ["pulse", ChalkAnimation.pulse],
    ["glitch", ChalkAnimation.glitch],
    ["rainbow", ChalkAnimation.rainbow],
    ["karaoke", ChalkAnimation.karaoke],
  ];

  for (const [name, animate] of animations) {
    const animation = animate(`${name} effect`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    animation.stop();
    console.log("");
  }
})();
