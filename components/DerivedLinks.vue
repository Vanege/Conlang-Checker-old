<template>
  <span>
    <span v-for="(element, index) in parsedElements" :key="element">
      <template v-if="index !== 0">
        <span> + </span>
      </template>
      <span class="clickable" @click="$emit('searchedText', element)">{{ element }}</span>
    </span>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class DerivedLinks extends Vue {
  @Prop() readonly leksiliAsel!: string

  get parsedElements(): string[] {
    return this.leksiliAsel.split(' + ')
  }

  potato() {
    console.log('potato')
  }
}
</script>

<style lang="scss" scoped>
.clickable {
  cursor: pointer;
  color: #0000EE;
}
</style>
