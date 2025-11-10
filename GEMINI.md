--- Context from: ../../.gemini/GEMINI.md ---
## Gemini Added Memories
- The user prefers that I do not run the linter automatically after making changes.
- The user prefers that I do not ask to build the application automatically after making changes.

1. Please always use `shadcn-vue` components
2. This is a `nuxt` project, so please use compatible libibries
4. Please use tailwindcss where needed
5. Dont use `#supabase` imports, supabase imports are always available by default (if expliclty imported import from '#imports')
6. When you need to deploy a edge function use `pnpm dlx supabase functions deploy` rather than the mcp tool (it is broken)
7. Don't run or install this or ask to
10. don't do git commands without expliclity being told
11. in production this site is a statically server ssr generated site (with no running server (just supabase backend))
12. When user says he wants a toast, what is meant is shadcn-vue sonner. Also never use `alert`, use a toast instead

## Sonner Docs:
---
title: Sonner
description: An opinionated toast component for Vue.
docs: https://vue-sonner.vercel.app
source: apps/www/src/registry/default/ui/sonner
---

<ComponentPreview name="SonnerDemo" />

## About

The Sonner component is provided by [vue-sonner](https://vue-sonner.vercel.app/), which is a Vue port of Sonner, originally created by [Emil Kowalski](https://twitter.com/emilkowalski_) for React.

## Installation

<Steps>

### Run the following command

```bash
npx shadcn-vue@latest add sonner
```

### Add the Toaster component

Add the following `Toaster` component to your `App.vue` file:

```vue title="App.vue" {2-3,7}
<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css' // vue-sonner v2 requires this import
</script>

<template>
  <Toaster />

  <!-- Nuxt, vue-sonner v1 because inserting inline CSS with JS to the head tag -->
  <ClientOnly>
    <Toaster />
  </ClientOnly>

  <!-- Nuxt, vue-sonner v2 no need to ClientOnly -->
  <Toaster />
</template>
```

</Steps>

## Usage

```vue
<script setup lang="ts">
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button
    variant="outline" @click="() => {
      toast('Event has been created', {
        description: 'Sunday, December 03, 2023 at 9:00 AM',
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      })
    }"
  >
    Add to calendar
  </Button>
</template>
```

## Examples

### Sonner with Dialog

Related issue https://github.com/unovue/shadcn-vue/issues/462

Add `pointer-events-auto` class to Toaster component in your `App.vue` file:

```vue {7}
<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css' // vue-sonner v2 requires this import
</script>

<template>
  <Toaster class="pointer-events-auto" />
</template>
```

<ComponentPreview name="SonnerWithDialog" />
