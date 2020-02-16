<template>
  <div>
    <!-- TODO: make the material design icon work   prepend-icon="search" -->
    Type an English or a Globasa word
    <v-text-field
      v-model="searchedText"
      outlined
      value.sync="searchedText"
    />
    <v-row>
      <v-col>
        <template v-if="hasEnglishMatches && searchedText.length > 2">
          <div class="english-block">
            Found in English:
            <div class="results-block">
              <div v-for="(match, index) in englishMatches" :key="`english-match-${index}`">
                <template v-if="index < matchesMax">
                  <div class="result-block">
                    <div class="eng-text">
                      {{ match.eng }}
                    </div>
                    <div class="word-text">
                      {{ match.word }}
                    </div>
                    <div class="leksili-asel-text">
                      <template v-if="match.category === 'derived'">
                        <DerivedLinks :leksili-asel="match.leksiliAsel" @searchedText="searchedText = $event" />
                      </template>
                      <template v-else>
                        {{ match.leksiliAsel }}
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </template>
      </v-col>
      <v-col>
        <template v-if="hasGlobasaMatches && searchedText.length > 2">
          <div class="globasa-block">
            Found in Globasa:
            <div class="results-block">
              <div v-for="(match, index) in globasaMatches" :key="`english-match-${index}`">
                <template v-if="index < matchesMax">
                  <div class="result-block">
                    <div class="eng-text">
                      {{ match.eng }}
                    </div>
                    <div class="word-text">
                      {{ match.word }}
                    </div>
                    <div class="leksili-asel-text">
                      <template v-if="match.category === 'derived'">
                        <DerivedLinks :leksili-asel="match.leksiliAsel" @searchedText="searchedText = $event" />
                      </template>
                      <template v-else>
                        {{ match.leksiliAsel }}
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { WordRow } from '~/types'
import DerivedLinks from '~/components/DerivedLinks.vue'

@Component({
  components: {
    DerivedLinks
  }
})
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
.english-block {
  background-color: rgb(230, 230, 230);
  border-radius: 5px;
  padding: 10px;
}
.globasa-block {
  background-color: rgb(210, 214, 255);
  border-radius: 5px;
  padding: 10px;
}

.results-block {
  margin-top: 5px;
  margin-left: 10px;
}

.result-block {
  margin-top: 10px;
}

.eng-text {
  font-weight: 500;
}
.word-text {
  margin-left: 15px;
  font-style: italic;
  font-weight: 500;
}
.leksili-asel-text {
  margin-left: 15px;
  font-weight: 300;
}
</style>
