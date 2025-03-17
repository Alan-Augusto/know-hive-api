import "reflect-metadata";

export function ApiDescription(description: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata("swagger:description", description, descriptor.value);
  };
}

export function ApiParam(name: string, type: string, required = true) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const existingParams = Reflect.getMetadata("swagger:params", descriptor.value) || [];
    existingParams.push({ name, type, required });
    Reflect.defineMetadata("swagger:params", existingParams, descriptor.value);
  };
}
