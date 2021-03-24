export class VakatMOdel {
  constructor(
    public id?: number,
    public lokacija?: string,
    public godina?: number,
    public mjesec?: number,
    public dan?: {vakat: string[]}[],
  ) {}
}
