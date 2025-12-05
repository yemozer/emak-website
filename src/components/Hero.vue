<template>
  <section class="relative h-screen w-full overflow-hidden">
    <!-- Video Background -->
    <video
      autoplay
      muted
      loop
      playsinline
      class="absolute inset-0 h-full w-full object-cover"
    >
      <source src="/emak_hero_video.mp4" type="video/mp4" />
    </video>
    
    <!-- Enhanced Gradient Overlay with better contrast -->
    <div class="absolute inset-0 bg-gradient-to-b from-[rgb(39,45,122)]/90 via-[rgb(39,45,122)]/80 to-[rgb(39,45,122)]/90"></div>
    
    <!-- Additional overlay for better text readability -->
    <div class="absolute inset-0 bg-black/20"></div>
    
    <!-- Content -->
    <div class="relative z-10 flex h-full items-center justify-center pt-16 md:pt-20">
      <div class="container mx-auto px-4 text-center text-white">
        <h1 class="mb-4 md:mb-6 animate-fade-in-up text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight" style="animation-delay: 0.1s">
          <span class="block drop-shadow-2xl text-white">Emak Yapı</span>
        </h1>
        <p class="mb-3 md:mb-4 animate-fade-in-up text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white" style="animation-delay: 0.2s">
          Türkiye'nin Yapı Malzemeleri Mağazası
        </p>
        <p class="mx-auto mb-8 md:mb-12 max-w-2xl animate-fade-in-up text-sm sm:text-base md:text-lg lg:text-xl text-white/95 leading-relaxed px-2" style="animation-delay: 0.3s">
          İnşaat projelerinize toptan ürün tedariği sağlayan güvenilir çözüm ortağınız. 
          Geniş ürün yelpazesi, hızlı sevkiyat ve uzman desteği ile yanınızdayız.
        </p>
        <div class="flex flex-col items-center justify-center gap-3 sm:gap-4 animate-fade-in-up sm:flex-row" style="animation-delay: 0.4s">
          <a
            href="https://katalog.emakyapi.revleno.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="hero-cta-button group flex items-center justify-center gap-2 rounded-lg md:rounded-xl bg-white px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold text-[rgb(39,45,122)] shadow-2xl hover:bg-white/95 hover:shadow-3xl active:scale-95 w-full sm:w-auto"
          >
            Ürün Kataloğu
            <ArrowRight :size="18" class="md:w-5 md:h-5 hero-cta-arrow transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
          </a>
          <a
            href="/iletisim"
            class="group flex items-center justify-center gap-2 rounded-lg md:rounded-xl border-2 border-white bg-white/15 px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold text-white backdrop-blur-md transition-all hover:bg-white/25 hover:border-white/80 hover:shadow-xl active:scale-95 w-full sm:w-auto"
          >
            <Phone :size="18" class="md:w-5 md:h-5" />
            <span class="hidden sm:inline">Hemen İletişime Geçin</span>
            <span class="sm:hidden">İletişim</span>
          </a>
        </div>
      </div>
    </div>
    
    <!-- Scroll Indicator -->
    <a
      href="/#brand-partners"
      class="scroll-indicator absolute bottom-4 md:bottom-8 left-1/2 z-10 -translate-x-1/2 transition-transform duration-300 hover:scale-110 active:scale-95"
      aria-label="Scroll to next section"
    >
      <ChevronDown :size="24" class="md:w-8 md:h-8 text-white drop-shadow-lg" />
    </a>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Phone, ChevronDown } from 'lucide-vue-next';
</script>

<style scoped>
.hero-cta-button {
  transition: background-color 0.3s ease-in-out, 
              box-shadow 0.3s ease-in-out,
              transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: scale(1);
  will-change: transform;
}

.hero-cta-button:hover {
  transform: scale(1.05);
}

.hero-cta-arrow {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.scroll-indicator {
  animation: bounce 2s infinite;
  cursor: pointer;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}
</style>
