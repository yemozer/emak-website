<template>
  <section id="brand-partners" class="py-8 md:py-10 lg:py-12 bg-white border-b border-[rgb(178,178,178)]/10">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="mb-8 md:mb-7 lg:mb-9 text-center">
        <h2 class="mb-3 md:mb-3 lg:mb-4 text-2xl md:text-xl lg:text-2xl font-bold tracking-tight text-[rgb(39,45,122)]">
          Çözüm Ortaklarımız
        </h2>
        <p class="mx-auto max-w-2xl text-base md:text-sm lg:text-base text-[rgb(178,178,178)] px-4">
          Dünya çapında tanınmış markalarla çalışıyoruz
        </p>
      </div>
      
      <div class="grid grid-cols-5 gap-2 md:gap-3 lg:gap-4">
        <div
          v-for="brand in brands"
          :key="brand.name"
          class="group relative flex items-center justify-center rounded-lg md:rounded-lg border border-[rgb(178,178,178)]/20 bg-white p-2 md:p-3.5 lg:p-4.5 shadow-sm transition-all hover:shadow-xl hover:scale-105 hover:border-[rgb(39,45,122)]/40 active:scale-95 overflow-hidden"
        >
          <!-- Gradient overlay on hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-[rgb(39,45,122)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img
            v-if="brand.logo"
            :src="brand.logo"
            :alt="brand.name"
            class="relative z-10 h-6 md:h-7 lg:h-9 w-auto max-w-full object-contain opacity-90 transition-all group-hover:opacity-100 group-hover:scale-110"
            @error="handleImageError"
          />
          <span v-else class="relative z-10 text-center text-[9px] md:text-[10px] lg:text-xs font-semibold text-[rgb(39,45,122)] leading-tight px-0.5 group-hover:text-gradient-primary transition-all">{{ brand.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const brands = [
  { name: 'KNAUF', logo: '/brands/knauf-logo.png' },
  { name: 'WEBER', logo: '/brands/weber-logo.png' },
  { name: 'DALSAN', logo: '/brands/dalsan-logo.png' },
  { name: 'BONUS YALITIM', logo: '/brands/bonus-logo.png' },
  { name: 'AUSTROTHERM', logo: '/brands/austrotherm-logo.png' },
  { name: 'İZOCAM', logo: '/brands/izocam-logo.png' },
  { name: 'ABS', logo: '/brands/abs-logo.png' },
  { name: 'AKFİX', logo: '/brands/akfix-logo.png' },
  { name: 'ARAGONIT', logo: '/brands/aragonit-logo.png' },
  { name: 'BOSTIK', logo: '/brands/bostik-logo.png' },
  { name: 'BTG GAZBETON', logo: '/brands/btg-logo.png' },
  { name: 'ENTEGRE', logo: '/brands/entegre-logo.png' },
  { name: 'FİXA', logo: '/brands/fixa-logo.png' },
  { name: 'KALDE', logo: '/brands/kalde-logo.png' },
  { name: 'KILIÇOĞLU', logo: '/brands/kilicoglu-logo.png' },
  { name: 'MARMARA ÇİMENTO', logo: '/brands/marmara-logo.png' },
  { name: 'MARSHALL', logo: '/brands/marshall-logo.png' },
  { name: 'MEGARON', logo: '/brands/megaron-logo.png' },
  { name: 'NULLIFIRE', logo: '/brands/nullifire-logo.png' },
  { name: 'ODE', logo: '/brands/ode-logo.png' },
  { name: 'PANELSAN', logo: '/brands/panelsan-logo.png' },
  { name: 'QİS', logo: '/brands/qis-logo.png' },
  { name: 'TEKNOBİMS', logo: '/brands/teknobims-logo.png' },
  { name: 'TEPE', logo: '/brands/tepe-logo.png' },
  { name: 'WALLBOARD', logo: '/brands/wallboard-logo.png' },
];

const handleImageError = (event: Event) => {
  // Hide image if it fails to load, text fallback will show
  const img = event.target as HTMLImageElement;
  if (img) {
    img.style.display = 'none';
  }
};
</script>
