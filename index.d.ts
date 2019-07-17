interface R {
  data(...args: any[]): R;
  call(_opts?: R.Options): Promise<object>;
  callSync(_opts?: R.Options): object;
}
declare namespace R {
  interface Options {
    [key: string]: any;
  }
}
export = R;
