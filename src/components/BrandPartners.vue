<template>
  <section id="brand-partners" class="py-8 md:py-10 lg:py-12 bg-white border-b border-[rgb(178,178,178)]/10">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="mb-8 md:mb-7 lg:mb-9 text-center">
        <h2 class="mb-3 md:mb-3 lg:mb-4 text-2xl md:text-xl lg:text-2xl font-bold tracking-tight text-[rgb(39,45,122)]">
          {{ sectionHeading }}
        </h2>
        <p class="mx-auto max-w-2xl text-base md:text-sm lg:text-base text-[rgb(178,178,178)] px-4">
          {{ sectionDescription }}
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-2 md:gap-3 lg:gap-4">
        <component
          :is="brand.url ? 'a' : 'div'"
          v-for="brand in brands"
          :key="brand.name"
          :href="brand.url || undefined"
          :target="brand.url ? '_blank' : undefined"
          :rel="brand.url ? 'noopener noreferrer' : undefined"
          class="group relative flex items-center justify-center rounded-lg border border-[rgb(178,178,178)]/20 bg-white p-2 md:p-3.5 lg:p-4.5 shadow-sm transition-all hover:shadow-xl hover:scale-105 hover:border-[rgb(39,45,122)]/40 active:scale-95 overflow-hidden w-[calc(33.33%-0.5rem)] sm:w-[calc(25%-0.75rem)] md:w-[calc(20%-1rem)] lg:w-[calc(16.666%-1rem)] min-w-[100px] md:min-w-[140px]"
        >
          <!-- Gradient overlay on hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-[rgb(39,45,122)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img
            v-if="brand.logo"
            :src="brand.logo"
            :alt="brand.name"
            class="relative z-10 h-6 md:h-7 lg:h-9 w-auto max-w-[85%] object-contain opacity-90 transition-all group-hover:opacity-100 group-hover:scale-110"
            @error="handleImageError"
          />
          <span v-else class="relative z-10 text-center text-[9px] md:text-[10px] lg:text-xs font-semibold text-[rgb(39,45,122)] leading-tight px-0.5 group-hover:text-gradient-primary transition-all">{{ brand.name }}</span>
        </component>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  sectionHeading: string;
  sectionDescription: string;
  brands: { name: string; logo: string; url: string }[];
}>();

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  if (img) {
    img.style.display = 'none';
  }
};
</script>
