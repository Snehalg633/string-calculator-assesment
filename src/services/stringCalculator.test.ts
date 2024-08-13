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


