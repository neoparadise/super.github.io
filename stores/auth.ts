import { defineStore } from 'pinia'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async initUser() {
      this.loading = true
      try {
        // Only attempt to get user on client-side or after hydration
        if (process.client) {
          const supabaseUser = useSupabaseUser()
          this.user = supabaseUser.value
        } else {
          // On server, avoid calling useSupabaseUser directly in initUser
          // Rely on Nuxt/Supabase module to hydrate user state
          this.user = null // Default server-side user state
        }
      } catch (e: any) {
        console.error("Error initializing user in store:", e)
        this.error = "Failed to initialize user."
        this.user = null
      } finally {
        this.loading = false
      }
    },
    async signInWithOtp(email: string, redirectTo: string = '/confirm') {
      this.loading = true
      this.error = null
      const supabase = useSupabaseClient()
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: window.location.origin + redirectTo,
          },
        })
        if (error) throw error
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async signUp(email: string, password: string, redirectTo: string = '/confirm') {
      this.loading = true
      this.error = null
      const supabase = useSupabaseClient()
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + redirectTo,
          },
        })
        if (error) throw error
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async signInWithPassword(email: string, password: string) {
      this.loading = true
      this.error = null
      const supabase = useSupabaseClient()
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        this.user = useSupabaseUser().value
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async signInWithGoogle() {
      this.loading = true
      this.error = null
      const supabase = useSupabaseClient()
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin + '/confirm',
          },
        })
        if (error) throw error
        // Supabase will redirect to Google, then back to /confirm
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async signOut() {
      this.loading = true
      this.error = null
      const supabase = useSupabaseClient()
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        this.user = null
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
  },
})