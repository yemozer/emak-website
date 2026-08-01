<template>
  <section id="urunler" class="relative py-12 md:py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-[rgb(39,45,122)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-[rgb(59,70,180)]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
    <div class="container mx-auto px-4 lg:px-8">
      <!-- Header -->
      <div class="mb-12 text-center">
        <span class="mb-3 md:mb-4 inline-block rounded-full bg-[rgb(39,45,122)]/10 px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-[rgb(39,45,122)]">
          {{ sectionBadge }}
        </span>
        <h2 class="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[rgb(39,45,122)]">
          {{ sectionHeading }}
        </h2>
        <p class="mx-auto max-w-3xl text-sm sm:text-base md:text-lg text-[rgb(178,178,178)] leading-relaxed px-4">
          {{ sectionDescription }}
        </p>
      </div>

      <!-- Main Product Categories -->
      <div class="relative z-10">
        <div class="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <a
            v-for="(category, index) in resolvedCategories"
            :key="index"
            :href="catalogLink"
            class="group relative overflow-hidden rounded-xl border border-[rgb(178,178,178)]/20 bg-white p-6 shadow-sm hover:shadow-xl transition-all hover:border-[rgb(39,45,122)]/40 cursor-pointer hover:-translate-y-1"
          >
            <div class="mb-4">
              <component :is="category.iconComponent" :size="32" :style="{ color: category.accent }" class="transition-transform duration-300 group-hover:scale-110" />
            </div>

            <h4 class="text-lg font-semibold text-[rgb(39,45,122)] mb-2">{{ category.name }}</h4>
            <p class="text-sm text-[rgb(178,178,178)] leading-relaxed group-hover:text-gray-600 transition-colors">{{ category.description }}</p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { iconMap } from '../lib/icon-map';
import { resolveAccent } from '../lib/accent-colors';

const props = defineProps<{
  sectionBadge: string;
  sectionHeading: string;
  sectionDescription: string;
  catalogLink: string;
  categories: { name: string; icon: string; description: string; color?: string }[];
}>();

const resolvedCategories = computed(() =>
  props.categories.map((cat) => ({
    ...cat,
    iconComponent: iconMap[cat.icon] || iconMap.Package,
    accent: resolveAccent(cat.color),
  }))
);
</script>

<style scoped>
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
}
</style>
