export interface RouteDoc {
  method: "get" | "post" | "put" | "delete";
  path: string;
  description?: string;
  input?: any;
  output?: any;
}

export const routesDocumentation: RouteDoc[] = [];

export function ApiDoc(doc: RouteDoc) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    routesDocumentation.push(doc);
    return descriptor;
  };
}
