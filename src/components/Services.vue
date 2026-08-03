<template>
  <section id="hizmetler" class="relative overflow-hidden py-12 pb-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
    <div class="container mx-auto px-4 lg:px-8">
      <!-- Header -->
      <div class="mb-12 md:mb-16 lg:mb-20 text-center">
        <span class="mb-3 md:mb-4 inline-block rounded-full bg-[rgb(39,45,122)]/10 px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-[rgb(39,45,122)]">
          {{ sectionBadge }}
        </span>
        <h2 class="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[rgb(39,45,122)]">
          {{ sectionHeading }}
        </h2>
        <p class="mx-auto max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl text-[rgb(178,178,178)] leading-relaxed px-4">
          {{ sectionDescription }}
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <a
          v-for="(service, index) in resolvedServices"
          :key="index"
          :href="service.href || undefined"
          :target="service.external ? '_blank' : undefined"
          :rel="service.external ? 'noopener noreferrer' : undefined"
          class="group relative overflow-hidden rounded-xl md:rounded-2xl border border-[rgb(178,178,178)]/20 bg-white p-6 md:p-8 lg:p-10 shadow-md hover:shadow-xl transition-all card-hover cursor-pointer"
        >
          <div
            class="mb-6 md:mb-8 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
            :style="{ backgroundColor: service.accent }"
          >
            <component :is="service.iconComponent" :size="28" class="md:w-8 md:h-8 text-white" />
          </div>

          <h3 class="mb-3 md:mb-4 text-xl md:text-2xl font-semibold" :style="{ color: service.accent }">{{ service.name }}</h3>
          <p class="text-sm md:text-base leading-relaxed text-[rgb(178,178,178)] group-hover:text-gray-600 transition-colors">
            {{ service.description }}
          </p>
        </a>
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
  services: { name: string; icon: string; description: string; href: string; external: boolean; color?: string }[];
}>();

const resolvedServices = computed(() =>
  props.services.map((service) => ({
    ...service,
    iconComponent: iconMap[service.icon] || iconMap.BookOpen,
    accent: resolveAccent(service.color),
  }))
);
</script>
