import { Vitest } from "../testing/Vitest";

(async () => {
  await Vitest.run();
})().catch(console.log);
