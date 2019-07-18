declare module '@fridgerator/r-script' {
  interface Options {
    [key: string]: any
  }

  export class R {
    constructor(path: string, opts?: Options);
    data (...args: any[]): R;
    call (_opts?: Options): Promise<object>;
    callSync (_opts?: Options): object | undefined;
  }
}
