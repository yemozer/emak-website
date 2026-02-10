<template>
  <section id="hakkimizda">
    <!-- Intro -->
    <div class="py-16 md:py-24">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="mx-auto max-w-5xl">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[rgb(39,45,122)] mb-8 md:mb-10">
            {{ pageHeading }}
          </h1>

          <div class="grid gap-10 lg:gap-16 lg:grid-cols-5">
            <div class="lg:col-span-3">
              <p class="text-base md:text-lg text-gray-600 leading-relaxed mb-5" v-html="introParagraph1"></p>
              <p class="text-base md:text-lg text-gray-600 leading-relaxed" v-html="introParagraph2"></p>
            </div>
            <div class="lg:col-span-2 flex flex-col gap-3 text-sm">
              <div v-for="(point, index) in resolvedKeyPoints" :key="index" class="flex items-start gap-3 py-3" :class="index < resolvedKeyPoints.length - 1 ? 'border-b border-gray-100' : ''">
                <component :is="point.iconComponent" :size="20" class="text-[rgb(39,45,122)] mt-0.5 flex-shrink-0" />
                <div>
                  <p class="font-semibold text-gray-900">{{ point.title }}</p>
                  <p class="text-gray-500 mt-0.5">{{ point.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Images -->
    <div class="container mx-auto px-4 lg:px-8">
      <div class="mx-auto max-w-5xl grid gap-4 md:gap-6 md:grid-cols-2 pb-16 md:pb-24">
        <div v-for="(img, index) in images" :key="index" class="overflow-hidden rounded-lg">
          <img
            :src="img.src"
            :alt="img.alt"
            class="h-[260px] md:h-[340px] w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <!-- Vision & Values -->
    <div class="bg-gray-50 py-16 md:py-24">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="mx-auto max-w-5xl grid gap-12 lg:gap-16 lg:grid-cols-2">
          <!-- Vision -->
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-[rgb(39,45,122)] mb-4">{{ visionHeading }}</h2>
            <p class="text-base md:text-lg text-gray-600 leading-relaxed">
              {{ visionText }}
            </p>
          </div>

          <!-- Values -->
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-[rgb(39,45,122)] mb-4">{{ valuesHeading }}</h2>
            <ul class="space-y-3">
              <li v-for="(value, index) in values" :key="index" class="flex items-start gap-2.5 text-base md:text-lg text-gray-600 leading-relaxed">
                <span class="text-[rgb(39,45,122)] mt-2 block w-1.5 h-1.5 rounded-full bg-[rgb(39,45,122)] flex-shrink-0"></span>
                <span>{{ value }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Brand Partners -->
    <div class="bg-[rgb(39,45,122)] py-10 md:py-14">
      <div class="container mx-auto px-4 lg:px-8 text-center">
        <p class="text-sm uppercase tracking-widest text-white/60 mb-3">{{ brandPartnersLabel }}</p>
        <p class="mx-auto max-w-2xl text-base md:text-lg text-white/90">
          {{ brandPartnersText }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { iconMap } from '../lib/icon-map';

const props = defineProps<{
  pageHeading: string;
  introParagraph1: string;
  introParagraph2: string;
  keyPoints: { icon: string; title: string; description: string }[];
  images: { src: string; alt: string }[];
  visionHeading: string;
  visionText: string;
  valuesHeading: string;
  values: string[];
  brandPartnersLabel: string;
  brandPartnersText: string;
}>();

const resolvedKeyPoints = computed(() =>
  props.keyPoints.map((point) => ({
    ...point,
    iconComponent: iconMap[point.icon] || iconMap.MapPin,
  }))
);
</script>
