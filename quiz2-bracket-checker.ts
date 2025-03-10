function Quiz1(inputData): boolean {
    const bracketStack: string[] = []
    const brackets = {
        ')': '(',
        '}': '{',
        ']': '['
    }

    for (let bracket of inputData) {
        if (Object.values(brackets).includes(bracket)) {
            bracketStack.push(bracket)
        } else if (Object.keys(brackets).includes(bracket)) {
            if (bracketStack.length === 0 || bracketStack.pop() !== brackets[bracket]) {
                return false
            }
        }
    }
    return bracketStack.length === 0
}