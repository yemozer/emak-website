<template>
  <section class="relative overflow-hidden py-12 md:py-20 bg-gradient-to-b from-white via-gray-50/30 to-white">
    <!-- Decorative background elements -->
    <div class="absolute top-1/4 right-0 w-96 h-96 bg-[rgb(39,45,122)]/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 left-0 w-80 h-80 bg-[rgb(59,70,180)]/5 rounded-full blur-3xl"></div>

    <div class="container relative z-10 mx-auto px-4 lg:px-8">
      <div class="mx-auto max-w-6xl grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
        <!-- Image -->
        <div class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
          <img
            :src="image.src"
            :alt="image.alt"
            class="h-[300px] w-full object-cover md:h-[400px] transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <p class="text-white/90 text-sm mt-1 drop-shadow-md">{{ image.caption }}</p>
          </div>
          <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[rgb(39,45,122)]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <!-- Text -->
        <div>
          <span
            class="mb-3 md:mb-4 inline-block rounded-full bg-[rgb(39,45,122)]/10 px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-[rgb(39,45,122)]"
          >
            {{ badge }}
          </span>
          <h2 class="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[rgb(39,45,122)]">
            {{ heading }}
          </h2>
          <p class="text-base md:text-lg text-[rgb(55,65,81)] leading-relaxed mb-4" v-html="paragraph1"></p>
          <p class="text-base md:text-lg text-[rgb(55,65,81)] leading-relaxed mb-8" v-html="paragraph2"></p>
          <a
            :href="ctaLink"
            class="group/btn inline-flex items-center gap-2 rounded-lg bg-[rgb(39,45,122)] px-6 py-3 text-sm md:text-base font-semibold text-white shadow-lg hover:bg-[rgb(39,45,122)]/90 hover:shadow-xl transition-all active:scale-95"
          >
            {{ ctaText }}
            <ArrowRight :size="18" class="transition-transform group-hover/btn:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';

defineProps<{
  badge: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  ctaText: string;
  ctaLink: string;
  image: {
    src: string;
    alt: string;
    caption: string;
  };
}>();
</script>
