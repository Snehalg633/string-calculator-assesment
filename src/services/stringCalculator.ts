export function add(numbers: string): number {
  function parseNumbers(str: string, delimiter: string): number[] {
    return str
      .split(delimiter)
      .map((numStr) => Number(numStr))
      .filter((num) => !isNaN(num));
  }

  function throwNegativeNumberException(negatives: number[]): void {
    throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
  }

  let newNumbers: number[];

  if (numbers.startsWith("//")) {
    const delimiterEndIndex =
      numbers.indexOf("\n") === -1
        ? numbers.indexOf("\\n") - 1
        : numbers.indexOf("\n");

    const delimiter = numbers.substring(2, delimiterEndIndex);
    const numbersStr = numbers.substring(delimiterEndIndex + 1);

    const normalizedStr = numbersStr.replace(new RegExp(delimiter, "g"), ",");

    newNumbers = parseNumbers(normalizedStr.replace(/\\n/g, "\n"), ",");
  } else {
    const normalizedStr = numbers.replace(/\\n/g, "\n");
    newNumbers = parseNumbers(normalizedStr.replace(/\n/g, ","), ",");
  }

  const negatives = newNumbers.filter((num) => num < 0);
  if (negatives.length > 0) {
    throwNegativeNumberException(negatives);
  }

  return newNumbers.reduce((a, b) => a + b, 0);
}
