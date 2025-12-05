<template>
  <section class="relative overflow-hidden py-12 md:py-20 lg:py-28 bg-gradient-primary">
    <div class="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]"></div>
    <div class="container relative mx-auto px-4 lg:px-8">
      <div class="mx-auto max-w-4xl text-center text-white">
        <h2 class="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight drop-shadow-lg px-4">
          Başlamaya Hazır mısınız?
        </h2>
        <p class="mb-8 md:mb-10 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/95 px-4">
          Kaliteli ürünler ve uzman desteği ile projelerinizi hayata geçirin. 
          Teklif almak için hemen iletişime geçin.
        </p>
        <div class="flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 sm:flex-row px-4">
          <a
            href="/iletisim"
            class="cta-button group flex items-center justify-center gap-2 rounded-lg md:rounded-xl bg-white px-6 md:px-10 py-3 md:py-5 text-base md:text-lg font-semibold text-[rgb(39,45,122)] shadow-2xl hover:bg-white/95 hover:shadow-3xl active:scale-95 w-full sm:w-auto"
          >
            Teklif Alın
            <ArrowRight :size="18" class="md:w-5 md:h-5 cta-button-arrow transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
          </a>
          <a
            href="tel:+903123123625"
            class="group flex items-center justify-center gap-2 rounded-lg md:rounded-xl border-2 border-white/40 bg-white/10 px-6 md:px-10 py-3 md:py-5 text-base md:text-lg font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/60 hover:shadow-xl active:scale-95 w-full sm:w-auto"
          >
            <Phone :size="18" class="md:w-5 md:h-5" />
            Hemen Arayın
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Phone } from 'lucide-vue-next';
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
