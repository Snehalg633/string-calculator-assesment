export function add(numbers: string): number {
  if (!numbers) return 0;
  const numbArray = numbers.split(",").map(Number);
  return numbArray.reduce((acc, num) => acc + num, 0);
}
