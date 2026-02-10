<template>
  <section class="relative overflow-hidden py-12 md:py-20 lg:py-28 bg-gradient-primary">
    <!-- Animated gradient background -->
    <div class="absolute inset-0 bg-animated-gradient opacity-80"></div>

    <!-- Grid pattern overlay -->
    <div class="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]"></div>

    <!-- Decorative orbs -->
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
    <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" style="animation-delay: 3s;"></div>
    <div class="container relative mx-auto px-4 lg:px-8">
      <div class="mx-auto max-w-4xl text-center text-white">
        <h2 class="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight drop-shadow-lg px-4">
          {{ heading }}
        </h2>
        <p class="mb-8 md:mb-10 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/95 px-4">
          {{ description }}
        </p>
        <div class="flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 sm:flex-row px-4">
          <a
            :href="ctaPrimaryLink"
            class="cta-button group relative flex items-center justify-center gap-2 rounded-lg md:rounded-xl bg-white px-6 md:px-10 py-3 md:py-5 text-base md:text-lg font-semibold text-[rgb(39,45,122)] shadow-2xl hover:shadow-glow-lg hover:bg-white/95 active:scale-95 w-full sm:w-auto overflow-hidden"
          >
            <span class="relative z-10 flex items-center gap-2">
              {{ ctaPrimaryText }}
              <ArrowRight :size="18" class="md:w-5 md:h-5 cta-button-arrow transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
            </span>
            <span class="absolute inset-0 bg-gradient-to-r from-[rgb(39,45,122)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>
          <a
            :href="ctaSecondaryLink"
            class="group relative flex items-center justify-center gap-2 rounded-lg md:rounded-xl border-2 border-white/60 bg-white/10 px-6 md:px-10 py-3 md:py-5 text-base md:text-lg font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white hover:shadow-glow active:scale-95 w-full sm:w-auto overflow-hidden"
          >
            <span class="relative z-10 flex items-center gap-2">
              <Phone :size="18" class="md:w-5 md:h-5" />
              {{ ctaSecondaryText }}
            </span>
            <span class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Phone } from 'lucide-vue-next';

defineProps<{
  heading: string;
  description: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
}>();
</script>

<style scoped>
.cta-button {
  transition: background-color 0.3s ease-in-out,
              box-shadow 0.3s ease-in-out,
              transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: scale(1);
  will-change: transform;
}

.cta-button:hover {
  transform: scale(1.05);
}

.cta-button-arrow {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
