import { isDefined } from "~/tools/type-guards"
import { Store } from "vuex/types/index"
import { WordRow, emptyWordRowFactory } from "~/types"

type State = {
  affixRows: WordRow[]
  rootRows: WordRow[]
  derivedRows: WordRow[]
}

export const state = (): State => ({
  affixRows: [],
  rootRows: [],
  derivedRows: []
})

export const mutations = {
  setWordRows (state: State, payload) {
    const { affixRows, rootRows, derivedRows } = payload;
    state.affixRows = affixRows
    state.rootRows = rootRows
    state.derivedRows = derivedRows
  }
}

export const actions = {
  async getStoreData (store: Store<State>) {
    const googleSpreadsheetId = "13iyvBfs3nqDID0n5EedG_bJKgL8CCHIW0ToJxRT-E6c"
    const url = `https://spreadsheets.google.com/feeds/cells/${googleSpreadsheetId}/1/public/full?alt=json`
    const json = await (this as any).$axios.$get(url)
    const entries = json.feed.entry.map(e => e.gs$cell)

    let wordRows: WordRow[] = []
    for (const entry of entries) {
      const { row, col, inputValue } = entry

      const wordRowPatch = {
        ...(col === "1" && {word: inputValue}),
        ...(col === "2" && {category: inputValue}),
        ...(col === "3" && {pos: inputValue}),
        ...(col === "4" && {eng: inputValue.replace(/\_\*\*/g, "(").replace(/\*\*\_/g, ")")}),
        ...(col === "5" && {fra: inputValue}),
        ...(col === "6" && {rus: inputValue}),
        ...(col === "7" && {spa: inputValue}),
        ...(col === "8" && {zho: inputValue}),
        ...(col === "9" && {leksiliAsel: inputValue.replace(/\*\*/g, "\"")})
      }
      const wordRow = wordRows[row]
      wordRows[row] = isDefined(wordRow) ? {...wordRow, ...wordRowPatch } : {...emptyWordRowFactory(), ...wordRowPatch}
    }

    // remove the first line
    wordRows.splice(0, 2)
    // remove lines that do not contain any value (those blank at the end of the document)
    wordRows = wordRows.filter(wR => isDefined(wR))

    const setWordRowsPayload = {
      affixRows: wordRows.filter(wR => wR.category === "affix"),
      rootRows: wordRows.filter(wR => wR.category === "root"),
      derivedRows: wordRows.filter(wR => wR.category === "derived")
    }

    store.commit('setWordRows', setWordRowsPayload)
  }
}
