<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { navigateTo } from '#app'

onMounted(() => {
  const user = useSupabaseUser() // Initialize user here
  const redirectInfo = useSupabaseCookieRedirect() // Initialize redirectInfo here

  watch(user, () => {
    if (user.value) {
      // Get redirect path, and clear it from the cookie
      const path = redirectInfo.pluck()
      // Redirect to the saved path, or fallback to home
      return navigateTo(path || '/')
    }
  }, { immediate: true })
})
</script>

<template>
  <div>Waiting for login...</div>
</template>
