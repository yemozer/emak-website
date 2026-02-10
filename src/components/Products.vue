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
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-br from-[rgb(39,45,122)]/5 via-transparent to-[rgb(59,70,180)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <!-- Icon with enhanced styling -->
            <div class="relative mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(39,45,122)]/10 to-[rgb(39,45,122)]/5 transition-all group-hover:bg-gradient-to-br group-hover:from-[rgb(39,45,122)]/20 group-hover:to-[rgb(59,70,180)]/10 group-hover:scale-110 group-hover:shadow-glow">
              <component :is="category.iconComponent" :size="28" class="text-[rgb(39,45,122)] transition-transform group-hover:scale-110" />
            </div>

            <h4 class="relative text-lg font-semibold text-[rgb(39,45,122)] mb-2 group-hover:text-gradient-primary transition-all">{{ category.name }}</h4>
            <p class="relative text-sm text-[rgb(178,178,178)] leading-relaxed group-hover:text-gray-600 transition-colors">{{ category.description }}</p>

            <!-- Bottom accent line -->
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[rgb(39,45,122)] to-[rgb(59,70,180)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { iconMap } from '../lib/icon-map';

const props = defineProps<{
  sectionBadge: string;
  sectionHeading: string;
  sectionDescription: string;
  catalogLink: string;
  categories: { name: string; icon: string; description: string }[];
}>();

const resolvedCategories = computed(() =>
  props.categories.map((cat) => ({
    ...cat,
    iconComponent: iconMap[cat.icon] || iconMap.Package,
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
