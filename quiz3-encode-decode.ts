type generatedCharactersType = {
    [key: string]: string
}

const generatedCharactersSet = (encodeLength: number = 9, startCharacter?: string): { secondCharacter: string, generatedCharacters: generatedCharactersType } => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let removeCharInSet = characters
    const generatedCharacters = {}
    const characterIndex = startCharacter ? characters.indexOf(startCharacter) : Math.floor(Math.random() * characters.length)

    for (let i = 0; i <= encodeLength; i++) {
      const nextPos = (characterIndex + i) % characters.length
      Object.assign(generatedCharacters, { [i.toString()]: characters[nextPos] })
      removeCharInSet = removeCharInSet.replace(characters[nextPos], '') // remove duplicate values from 1st chararacter generated
      // ตรงนี้ผมไม่แน่ใจว่าการ random ตัวอักษรที่ 2 ต้องไม่ซ้ำกับเฉพาะตัวอักษรที่ 1 หรือค่า object ทีไ่ด้จากตัวอักษรที่ 1 ผมเลยเลือกที่จะใช้ค่าที่ไม่ซ้ำกับ object ที่ได้จากตัวอักษรที่ 1
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

