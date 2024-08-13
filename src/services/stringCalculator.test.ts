import { add } from "./stringCalculator";

test('returns 0 for empty string',()=>{
    expect(add('')).toBe(0);
})

test("returns the number itself for a single number",()=>{
    expect(add('1')).toBe(1);
})

test("returns sum for two numbers separated by comma",()=>{
    expect(add('1,2')).toBe(3);
})

test("returns sum for multiple numbers separated by comma",()=>{
    expect(add('1,2,3')).toBe(6);
})

test("returns sum for numbers separated by newlines",()=>{
    expect(add('1\n2,3')).toBe(6);
})

test('returns sum for numbers with custom delimiter', () => {
    expect(add('//;\n1;2')).toBe(3);
});

test('returns sum for numbers with custom delimiter', () => {
    expect(add('//;\n1;2')).toBe(3);
});

test('throws error for negative numbers', () => {
    expect(() => add('1,-2,3')).toThrow('Negative numbers not allowed: -2');
});

test('throws error for multiple negative numbers', () => {
    expect(() => add('1,-2,-3,4')).toThrow('Negative numbers not allowed: -2, -3');
});

