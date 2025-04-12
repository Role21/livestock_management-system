// plugins/lucide.ts
import { defineNuxtPlugin } from '#app'
import * as LucideIcons from 'lucide-vue-next'
import type { Component } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  for (const [key, component] of Object.entries(LucideIcons)) {
    nuxtApp.vueApp.component(key, component as Component)
  }
})
