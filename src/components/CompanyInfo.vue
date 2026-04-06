<template>
  <main class="pt-24 md:pt-28 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-[rgb(39,45,122)] mb-2">
          {{ pageHeading }}
        </h1>
        <p class="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">{{ pageDescription }}</p>
      </div>

      <!-- Sections -->
      <div class="space-y-6">
        <div
          v-for="(section, idx) in sections"
          :key="idx"
          class="bg-white rounded-xl border border-gray-100"
        >
          <div class="px-5 py-3 border-b border-gray-100">
            <h2 class="text-lg md:text-xl font-semibold text-[rgb(39,45,122)]">
              {{ section.heading }}
            </h2>
          </div>
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <div
              v-for="(item, i) in section.items"
              :key="i"
              class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 px-5 py-2.5 border-b border-gray-50 last:border-b-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-b-0"
            >
              <dt class="text-xs text-gray-500 font-medium sm:pt-0.5 sm:flex-shrink-0">
                {{ item.label }}
              </dt>
              <a
                v-if="item.href"
                :href="item.href"
                class="text-sm text-[rgb(39,45,122)] font-medium sm:text-right break-words hover:underline"
              >
                {{ item.value }}
              </a>
              <dd
                v-else
                class="text-sm text-gray-900 font-medium sm:text-right break-words"
              >
                {{ item.value }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
type Item = { label: string; value: string; icon?: string; href?: string };
type Section = { heading: string; items: Item[] };

defineProps<{
  pageHeading: string;
  pageDescription: string;
  sections: Section[];
}>();
</script>
