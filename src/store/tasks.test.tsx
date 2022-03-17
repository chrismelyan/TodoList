import {ActionType, div, mul, numberReducer, sub, sum} from "./tasks";

test('sum of two numbers', () => {
    // 1. Тестовые данные:
    const a: number = 10
    const b: number = 20

    // 2. Выполняем тестируемого кода:
    const result = sum(a, b)

    // 3. Проверка результата:
    expect(result).toBe(30)
})

test('subtract of two numbers', () => {
    expect(sub(20, 10)).toBe(10)
})

test('multiply of two numbers', () => {
    expect(mul(2, 5)).toBe(10)
})

test('division of two numbers', () => {
    const a = 20
    const b = 10

    const result = div(a, b)

    expect(result).toBe(2)
})

test('sum with numberReducer', () => {
    const salary: number = 1000
    const action: ActionType = {
        type: 'SUM',
        num: 300
    }
    const result = numberReducer(salary, action)

    expect(result).toBe(1300)
})

test('sub with numberReducer', () => {
    const salary: number = 1000
    const action: ActionType = {
        type: 'SUB',
        num: 300
    }
    const result = numberReducer(salary, action)

    expect(result).toBe(700)
})

test('mul with numberReducer', () => {
    const salary: number = 1000
    const action: ActionType = {
        type: 'MUL',
        num: 3
    }
    const result = numberReducer(salary, action)

    expect(result).toBe(3000)
})

test('div with numberReducer', () => {
    const salary: number = 1000
    const action: ActionType = {
        type: 'DIV',
        num: 2
    }
    const result = numberReducer(salary, action)

    expect(result).toBe(500)
})
