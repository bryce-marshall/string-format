import { stringFormat } from './package-src';
import { stringFormatc } from './package-src';

class TestTypeOne {
  get a(): string {
    return "First";
  }

  get b(): string {
    return "Second";
  }

  get c(): string {
    return "Third";
  }
}

class TestTypeTwo extends TestTypeOne {
}

class Test {
  private items: any[];

  constructor() {
    this.items = [
      { name: "Single Named Property", format: "Hello {name}!", args: { name: "World" }, expected: "Hello World!" },
      { name: "Single Element Array", format: "Hello {0}!", args: ["World"], expected: "Hello World!" },
      { name: "Multiple Named Properties", format: "a: {a}, b: {b}, c: {c}", args: { a: "First", b: "Second", c: "Third" }, expected: "a: First, b: Second, c: Third" },
      { name: "Multiple Named Properties - Property", format: "a: {a}, b: {b}, c: {c}", args: new TestTypeOne(), expected: "a: First, b: Second, c: Third" },
      { name: "Multiple Named Properties - Property (subclassed)", format: "a: {a}, b: {b}, c: {c}", args: new TestTypeTwo(), expected: "a: First, b: Second, c: Third" },
      { name: "Multiple Element Array", format: "0: {0}, 1: {1}, 2: {2}", args: ["Zero", "One", "Two"], expected: "0: Zero, 1: One, 2: Two" },
      { name: "Single Parameter", format: "Hello {0}!", args: ["World"], params: true, expected: "Hello World!" },
      { name: "Multiple Parameters", format: "0: {0}, 1: {1}, 2: {2}", args: ["Zero", "One", "Two"], params: true, expected: "0: Zero, 1: One, 2: Two" },
      { name: "No Parameters Missing Argument", format: "Hello {0}!", params: true, expected: "Hello !" },
      { name: "No Parameters Missing Property", format: "Hello {name}!", args: {}, params: true, expected: "Hello !" },
      { name: "No Parameters Missing Property (subclassed)", format: "Hello {name}!", args: new TestTypeOne(), params: true, expected: "Hello !" },
    ];

    for (let item of this.items) {
      item.fn = stringFormatc(item.format, true);
    }
  }

  runAll() {

    let totalPassed = this.run(false);
    totalPassed += this.run(true);

    console.log("Total Passed: " + totalPassed + ", Total Failed: " + (this.items.length * 2 - totalPassed));
  }

  private run(compiled: boolean): number {
    console.log(compiled ? "Running Compiled Tests" : "Running Dynamic Tests");
    let count = 0;

    for (let item of this.items) {
      let s = this.format(item, compiled);
      console.log(s);
      let passed = item.expected === s;
      if (passed)
        count++;
      console.log('Test "' + item.name + '" ' + (passed ? "passed" : "failed!"));
    }

    console.log(count + " passed, " + (this.items.length - count) + " failed.");
    console.log("---")

    return count;
  }

  private format(item: any, compiled: boolean): string {
    if (item.params) {
      if (!item.args)
        item.args = [];

      switch (item.args.length) {
        case 0:
          return compiled ? item.fn() : this.f(item.format);
        case 1:
          return compiled ? item.fn(item.args[0]) : this.f(item.format, item.args[0]);
        case 2:
          return compiled ? item.fn(item.args[0], item.args[1]) : this.f(item.format, item.args[0], item.args[1]);
        case 3:
          return compiled ? item.fn(item.args[0], item.args[1], item.args[2]) : this.f(item.format, item.args[0], item.args[1], item.args[2]);
      }
    }
    return compiled ? item.fn(item.args) : this.f(item.format, item.args);
  }

  private f(format: string, ...args: any[]) {
    return stringFormat.apply(null, arguments);
  }
}

let t = new Test();
t.runAll();

