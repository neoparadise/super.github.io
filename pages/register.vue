<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { toast } from 'vue-sonner'

const email = ref('')
const password = ref('')
const authStore = ref<ReturnType<typeof useAuthStore> | null>(null)

onMounted(() => {
  authStore.value = useAuthStore()
})

const handleSignUp = async () => {
  if (!authStore.value) return
  await authStore.value.signUp(email.value, password.value)
  if (!authStore.value.error) {
    toast('Registration Successful!', {
      description: 'Check your email to confirm your account.',
    })
  } else {
    toast('Registration Failed', {
      description: authStore.value.error,
      action: {
        label: 'Dismiss',
        onClick: () => console.log('Dismissed'),
      },
    })
  }
}

const handleGoogleSignUp = async () => {
  if (!authStore.value) return
  await authStore.value.signInWithGoogle()
  // Supabase will handle the redirect to Google and then back to /confirm
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your email and password below to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSignUp">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                v-model="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input
                id="password"
                v-model="password"
                type="password"
                required
              />
            </div>
            <Button type="submit" class="w-full" :disabled="authStore?.loading">
              {{ authStore?.loading ? 'Loading...' : 'Sign Up' }}
            </Button>
            <p v-if="authStore?.error" class="text-red-500 text-sm">{{ authStore?.error }}</p>
          </div>
        </form>

        <div class="relative my-4">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t" />
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button variant="outline" class="w-full" @click="handleGoogleSignUp" :disabled="authStore?.loading">
          <font-awesome-icon :icon="['fab', 'google']" class="mr-2 h-4 w-4" />
          Google
        </Button>

        <p class="mt-4 text-center text-sm">
          Already have an account?
          <NuxtLink to="/login" class="underline">Login here.</NuxtLink>
        </p>
      </CardContent>
    </Card>
  </div>
</template>