export type WordRow = {
  word: string
  category: string
  pos: string
  eng: string
  fra: string
  rus: string
  spa: string
  zho: string
  leksiliAsel: string
}

export const emptyWordRowFactory = (): WordRow => {
  return {
    word: "",
    category: "",
    pos: "",
    eng: "",
    fra: "",
    rus: "",
    spa: "",
    zho: "",
    leksiliAsel: ""
  }
}

// the text to check is divided into elements that can be words (any string of allowed characters), or an other character
export type ParsedElement = {
  // a parsed element is a word if every character of the original string is a word character
  isAWord: boolean;
  string: string;
}
