<template>
  <div>
    <!-- TODO: make the material design icon work   prepend-icon="search" -->
    Type an English or Globasa word to find below!
    <v-text-field
      v-model="searchedText"
      outlined
      value.sync="searchedText"
    />
    <v-row>
      <v-col>
        <template v-if="hasEnglishMatches && searchedText.length > 2">
          Found in English:
          <div v-for="(match, index) in englishMatches" :key="`english-match-${index}`">
            <template v-if="index < matchesMax">
              <b>{{ match.eng }}</b> | {{ match.word }} | {{ match.leksiliAsel }}
            </template>
          </div>
        </template>
      </v-col>
      <v-col>
        <template v-if="hasGlobasaMatches && searchedText.length > 2">
          <div v-for="(match, index) in globasaMatches" :key="`globasa-match-${index}`">
            <template v-if="index < matchesMax">
              {{ match.eng }} | <b>{{ match.word }}</b> | {{ match.leksiliAsel }}
            </template>
          </div>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { WordRow } from '~/types'

@Component
export default class SearchBlock extends Vue {
  searchedText: string = ''
  matchesMax: number = 20

  get wordRows(): WordRow[] {
    const { affixRows, rootRows, derivedRows } = this.$store.state
    return [...affixRows, ...rootRows, ...derivedRows]
  }
  get stringToMatch(): string { return this.searchedText.toLowerCase() }
  get englishMatches(): WordRow[] { return this.wordRows.filter(wr => wr.eng.includes(this.stringToMatch)) }
  get globasaMatches(): WordRow[] { return this.wordRows.filter(wr => wr.word.includes(this.stringToMatch)) }
  get hasEnglishMatches(): boolean { return this.englishMatches.length > 0 }
  get hasGlobasaMatches(): boolean { return this.globasaMatches.length > 0 }
}
</script>

<style lang="scss" scoped>
</style>
