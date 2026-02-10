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
          <!-- Gradient overlay on hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-[rgb(39,45,122)]/5 via-transparent to-[rgb(59,70,180)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <!-- Icon container with enhanced styling -->
          <div class="relative mb-6 md:mb-8 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-xl md:rounded-2xl bg-gradient-to-br from-[rgb(39,45,122)]/10 to-[rgb(39,45,122)]/5 transition-all group-hover:bg-gradient-to-br group-hover:from-[rgb(39,45,122)]/20 group-hover:to-[rgb(59,70,180)]/10 group-hover:scale-110 group-hover:shadow-glow">
            <component :is="service.iconComponent" :size="32" class="md:w-10 md:h-10 text-[rgb(39,45,122)] transition-transform group-hover:scale-110" />
          </div>

          <h3 class="relative mb-3 md:mb-4 text-xl md:text-2xl font-semibold text-[rgb(39,45,122)] group-hover:text-gradient-primary transition-all">{{ service.name }}</h3>
          <p class="relative text-sm md:text-base leading-relaxed text-[rgb(178,178,178)] group-hover:text-gray-600 transition-colors">
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

const props = defineProps<{
  sectionBadge: string;
  sectionHeading: string;
  sectionDescription: string;
  services: { name: string; icon: string; description: string; href: string; external: boolean }[];
}>();

const resolvedServices = computed(() =>
  props.services.map((service) => ({
    ...service,
    iconComponent: iconMap[service.icon] || iconMap.BookOpen,
  }))
);
</script>
