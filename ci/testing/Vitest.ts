import path from "path";
import { ChildProcess } from "@figliolia/child-process";

export class Vitest {
  public static run() {
    return this.runTests().handler;
  }

  private static runTests() {
    const args = process.argv.slice(2);
    return new ChildProcess("vitest " + args.join(" "), {
      stdio: "inherit",
      cwd: path.resolve(),
    });
  }
}
