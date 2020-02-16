<template>
  <div>
    <!-- <v-textarea
      v-model="text"
      outlined
      placeholder="Enter the text in Globasa that you want to check"
    />
    <v-sheet class="grey lighten-3">
      <Element v-for="(element, index) in parsedElements" :key="index" :element="element" />
    </v-sheet>
    <ColorCode class="mt-6" />
    <UniqueWordsCounter /> -->
    <SearchBlock />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
// import Element from '~/components/Element.vue'
// import ColorCode from '~/components/ColorCode.vue'
// import UniqueWordsCounter from '~/components/UniqueWordsCounter.vue'
import SearchBlock from '~/components/SearchBlock.vue'
// import { ParsedElement } from '~/types'

@Component({
  components: {
    // Element,
    // ColorCode,
    // UniqueWordsCounter,
    SearchBlock
  }
})
export default class App extends Vue {
  // text: string = ''

  // get parsedElements(): ParsedElement[] {
  //   const parsedElements: ParsedElement[] = []
  //   let wordInConstruction: string = ''
  //   for (const char of this.text) {
  //     if (/[a-zA-Z]/.test(char)) {
  //       wordInConstruction += char
  //     } else {
  //       if (wordInConstruction.length > 0) {
  //         const newWordElement: ParsedElement = {
  //           isAWord: true,
  //           string: wordInConstruction
  //         }
  //         parsedElements.push(newWordElement)
  //       }
  //       const newElement: ParsedElement = {
  //         isAWord: false,
  //         string: char
  //       }
  //       parsedElements.push(newElement)
  //       wordInConstruction = ''
  //     }
  //   }
  //   // if a word was being built before the end, add it
  //   if (wordInConstruction.length > 0) {
  //     const newUnfinishedWordElement: ParsedElement = {
  //       isAWord: false,
  //       string: wordInConstruction
  //     }
  //     parsedElements.push(newUnfinishedWordElement)
  //   }
  //   return parsedElements
  // }

  fetch({ store }: Context) {
    store.dispatch('getStoreData')
  }
}
</script>

<style lang="scss" scoped>
</style>
