export function add(numbers: string): number {
  if (!numbers) return 0;

  let delimiter = /[\n,]/;
  if (numbers.startsWith("//")) {
    const newNum = numbers.split("\n", 2);
    delimiter = new RegExp(newNum[0].slice(2));
    numbers = newNum[1];
  }
  const numArray = numbers.split(delimiter).map(Number);
  return numArray.reduce((acc, num) => acc + num, 0);
}
