import { daysBetween } from "./days";

class TestCase {
  constructor(
    public first: string,
    public second: string,
    public expected: number
  ) {}
}

const test1 = new TestCase("Jan 1, 2024", "Jan 29, 2024", 28);
const test2 = new TestCase("Feb 29, 2020", "Oct 31, 2023", 1340);
const tests = [test1, test2];

describe("daysBetweenDates", () => {
  tests.forEach(({ first, second, expected }, index) => {
    it(`should work for test ${index}`, () => {
      expect(daysBetween(first, second)).toEqual(expected);
    });
  });
});
