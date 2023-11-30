import type { MethodKeys, MethodLike } from "./types";

export class Decor {
  public static bound<T, K extends MethodKeys<T>>(
    target: T,
    _propertyKey: K,
    descriptor: TypedPropertyDescriptor<MethodLike>
  ) {
    const operation = descriptor.value;
    if (operation) {
      descriptor.value = operation.bind(target);
    }
  }
}
