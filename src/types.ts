export type AnimationFN = (str: string, frame: number) => string;

export type AnimationName =
  | "rainbow"
  | "pulse"
  | "glitch"
  | "radar"
  | "neon"
  | "karaoke";

export type MethodLike = (...args: any[]) => any;

export type MethodKeys<T> = keyof {
  [K in keyof T as Required<T>[K] extends MethodLike ? K : never]: T[K];
};
