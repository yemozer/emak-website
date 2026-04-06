<template>
  <main class="pt-24 md:pt-28 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-[rgb(39,45,122)] mb-2">
          {{ pageHeading }}
        </h1>
        <p class="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">{{ pageDescription }}</p>
      </div>

      <!-- Branch Cards with individual maps -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(branch, idx) in branches"
          :key="idx"
          class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <!-- Map -->
          <div class="relative h-56 bg-gray-100 border-b border-gray-100">
            <iframe
              v-if="branch.google_maps_embed"
              :src="branch.google_maps_embed"
              class="w-full h-full"
              style="border:0;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              Harita mevcut değil
            </div>
          </div>

          <!-- Info -->
          <div class="p-5">
            <h3 class="text-lg font-bold text-[rgb(39,45,122)] mb-2">
              {{ branch.name }}
            </h3>
            <div class="flex items-start gap-2 text-gray-600 mb-3">
              <MapPin class="w-4 h-4 mt-0.5 flex-shrink-0 text-[rgb(39,45,122)]" />
              <p class="text-sm leading-relaxed">{{ branch.address }}</p>
            </div>
            <div class="flex items-center gap-4">
              <a
                v-if="branch.phone"
                :href="`tel:${branch.phone}`"
                class="inline-flex items-center gap-1.5 text-xs font-semibold text-[rgb(39,45,122)] hover:underline"
              >
                <Phone class="w-3.5 h-3.5" />
                {{ branch.phone }}
              </a>
              <a
                v-if="branch.maps_link"
                :href="branch.maps_link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-xs font-semibold text-[rgb(39,45,122)] hover:gap-2 transition-all ml-auto"
              >
                Yol Tarifi
                <ArrowRight class="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { MapPin, Phone, ArrowRight } from 'lucide-vue-next';

type Branch = {
  name: string;
  company: string;
  type: string;
  address: string;
  phone?: string;
  image?: string;
  google_maps_embed?: string;
  maps_link?: string;
};

defineProps<{
  pageHeading: string;
  pageDescription: string;
  branches: Branch[];
}>();
</script>
