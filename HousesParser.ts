interface IRange {
  all: number[][];
  even: number[][];
  odd: number[][];
  [key: string]: number[][];
}

export class HousesParser {

  private houses = new Set();

  private ranges: IRange = {
    all: [],
    even: [],
    odd: []
  }

  private singleReg = /(\d+\/\d+|\d+[а-я]+|\d+)/ig;

  private rangesRegs = [
    [/нечетные\s*(\d+\-\d+|\d+\+)/g, 'odd'],
    [/четные[\sа-я]*(\d+\-\d+|\d+\+|\d+\s)/g, 'even'],
    [/(\d+\-\d+|\d+\+)/g, 'all'],
  ]

  constructor(private readonly source: string) {
    this.parse();
  }

  public isHouseIncluded(houseNumber: string): boolean {
    if (this.houses.has(houseNumber)) return true;
    const intHouseNumber = parseInt(houseNumber);
    for (const [start, end] of this.getCurrentRange(intHouseNumber)) {
      if (intHouseNumber >= start && intHouseNumber <= end) return true;
    }
    return false;
  }

  private getCurrentRange(num: number): number[][] {
    return (num % 2 === 0) ? [...this.ranges.all, ...this.ranges.even] : [...this.ranges.all, ...this.ranges.odd];
  }

  private parse(): void {
    let source: string = this.source;
    for (let [reg, type] of this.rangesRegs) {
      source = source.replace(reg, (math, value) => {
        let [start, end = Infinity] = value.replace('+', '').split('-');
        this.ranges[String(type)].push([Number(start), Number(end)]);
        return '';
      });
    }

    source.replace(this.singleReg, (math, value) => {
      this.houses.add(value);
      return '';
    });
  }
}
