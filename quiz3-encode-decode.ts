type generatedCharactersType = {
    [key: string]: string
}

const generatedCharactersSet = (encodeLength: number = 9, startCharacter?: string): { secondCharacter: string, generatedCharacters: generatedCharactersType } => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let removeCharInSet = characters
    const generatedCharacters = {}
    const randIndex = startCharacter ? characters.indexOf(startCharacter) : Math.floor(Math.random() * characters.length)

    for (let i = 0; i <= encodeLength; i++) {
      const nextPos = (randIndex + i) % characters.length
      Object.assign(generatedCharacters, { [i.toString()]: characters[nextPos] })
      removeCharInSet = removeCharInSet.replace(characters[nextPos], '') // remove duplicate values from 1st chararacter generated
    }

    const secondCharacter = removeCharInSet[Math.floor(Math.random() * removeCharInSet.length)] // generated 2nd character
    return { secondCharacter, generatedCharacters }
  }

const encoderFunction = (inputData: string) => {
    const { secondCharacter, generatedCharacters } = generatedCharactersSet(9)

    let encodedResult = `${generatedCharacters[0]}${secondCharacter}`

    for (let i = 0; i < inputData.length; i++) {
      if (i > 0) {
        if (inputData[i] === inputData[i - 1]) {
            encodedResult += secondCharacter
        } else {
            encodedResult += generatedCharacters[inputData[i]]
        }
      } else {
        encodedResult += generatedCharacters[inputData[i]]
      }
    }

    return encodedResult
  }

const decoderFunction = (encodedData: string): string => {
    let decodedResult = ''
    const firstCharacter = encodedData[0]
    const secondCharacter = encodedData[1]
    const { generatedCharacters } = generatedCharactersSet(9, firstCharacter)

    const removeFirstAndSecondChar = encodedData.slice(2, encodedData.length)
    const reverseSecondCharacter = removeFirstAndSecondChar.split('').reduce((prev, cur) => {
        return prev + (cur === secondCharacter ? prev[prev.length - 1] : cur)
    }, '')
    for (const c of reverseSecondCharacter) {
        decodedResult += Object.keys(generatedCharacters).find(key => generatedCharacters[key] === c)
    }
    return decodedResult
}

