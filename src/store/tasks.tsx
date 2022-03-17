export const sum = (a: number, b: number) => a + b;
export const sub = (a: number, b: number) => a - b;
export const mul = (a: number, b: number) => a * b;
export const div = (a: number, b: number) => a / b;


// action принимает тип и payload
// as const возникает тогда, когда мы не типизируем сам action
export type ActionType = {
    type: 'SUM' | 'SUB' | 'MUL' | 'DIV';
    num: number
}
// Редьюсер - как перочинный нож: много разных функций - объедененны в одно. Редьюсер всегда универсален.
// Он всегда привязывается к одной сущности (стейту или ветку в стейте) и с ним работает, его преобразовывает
export const numberReducer = (state: number, action: ActionType) => {
    switch (action.type) {
        case 'SUM':
            return state + action.num;
        case 'SUB':
            return state - action.num;
        case 'MUL':
            return state * action.num;
        case 'DIV':
            return state / action.num;
        default:
            return state;
    }
}