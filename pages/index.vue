<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { navigateTo } from '#app'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '~/stores/auth' // Import useAuthStore here

const authStore = ref<ReturnType<typeof useAuthStore> | null>(null) // Initialize as ref null
const supabaseUser = ref(null) // Initialize as ref null

onMounted(async () => {
  authStore.value = useAuthStore() // Initialize authStore on client-side
  supabaseUser.value = useSupabaseUser() // Initialize supabaseUser here

  // Initialize user on client-side
  await authStore.value.initUser()

  // Redirect to login if not authenticated, only on client-side
  watchEffect(() => {
    if (!supabaseUser.value && !authStore.value?.loading) {
      navigateTo('/login')
    }
  })
})

const handleSignOut = async () => {
  if (authStore.value) {
    await authStore.value.signOut()
    // After signOut, authStore.user should be null, making authStore.isAuthenticated false
    if (!authStore.value.error && !authStore.value.isAuthenticated) {
      navigateTo('/login')
    }
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div v-if="authStore?.loading">
      Loading user data...
    </div>
    <div v-else-if="supabaseUser">
      <h1 class="text-2xl font-bold mb-4">Welcome, {{ supabaseUser.email }}!</h1>
      <p class="mb-2">User ID: {{ supabaseUser.id }}</p>
      <p class="mb-4">Last Sign In: {{ new Date(supabaseUser.last_sign_in_at).toLocaleString() }}</p>
      <Button @click="handleSignOut" :disabled="authStore?.loading">
        {{ authStore?.loading ? 'Signing Out...' : 'Sign Out' }}
      </Button>
      <p v-if="authStore?.error" class="text-red-500 text-sm mt-2">{{ authStore?.error }}</p>
    </div>
    <div v-else>
      <p>You are not logged in. Redirecting to login page...</p>
    </div>
  </div>
</template>
