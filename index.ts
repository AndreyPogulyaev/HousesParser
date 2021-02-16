import { HousesParser } from './HousesParser';

const result = new HousesParser('нечетные11+, четные 42+ 7/1, 11, 17, 17/1, 17/2, 8/2, 15, 15/1, 15а')
  .isHouseIncluded('43');

console.log(result);