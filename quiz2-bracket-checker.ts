function Quiz1(): boolean {
    const inputData = '((123){33}[   ])'
    const bracketStack: string[] = []
    const brackets = {
        ')': '(',
        '}': '{',
        ']': '['
    }

    for (let bracket of inputData) {
        if (bracket === '(' || bracket === '{' || bracket === '[') {
            bracketStack.push(bracket)
        } else if (bracket === ')' || bracket === '}' || bracket === ']') {
            if (bracketStack.length === 0 || bracketStack.pop() !== brackets[bracket]) {
                return false
            }
        }
    }
    return bracketStack.length === 0
}