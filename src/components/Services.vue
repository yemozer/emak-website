<template>
  <section id="hizmetler" class="relative overflow-hidden py-12 pb-16 bg-gray-50">
    <div class="container mx-auto px-4 lg:px-8">
      <!-- Header -->
      <div class="mb-12 md:mb-16 lg:mb-20 text-center">
        <span class="mb-3 md:mb-4 inline-block rounded-full bg-[rgb(39,45,122)]/10 px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-[rgb(39,45,122)]">
          Hizmetlerimiz
        </span>
        <h2 class="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[rgb(39,45,122)]">
          Size Özel Çözümler
        </h2>
        <p class="mx-auto max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl text-[rgb(178,178,178)] leading-relaxed px-4">
          Profesyonel ekibimiz ve geniş ürün yelpazemiz ile projelerinize 
          değer katıyoruz.
        </p>
      </div>
      
      <!-- Services Grid -->
      <div class="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="service in services"
          :key="service.id"
          class="group relative overflow-hidden rounded-xl md:rounded-2xl border border-[rgb(178,178,178)]/20 bg-white p-6 md:p-8 lg:p-10 shadow-md transition-all card-hover"
        >
          <div class="mb-6 md:mb-8 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-xl md:rounded-2xl bg-[rgb(39,45,122)]/10 transition-all group-hover:bg-[rgb(39,45,122)]/20 group-hover:scale-110">
            <component :is="service.icon" :size="32" class="md:w-10 md:h-10 text-[rgb(39,45,122)] transition-transform group-hover:scale-110" />
          </div>
          <h3 class="mb-3 md:mb-4 text-xl md:text-2xl font-semibold text-[rgb(39,45,122)]">{{ service.name }}</h3>
          <p class="mb-4 md:mb-6 text-sm md:text-base leading-relaxed text-[rgb(178,178,178)]">
            {{ service.description }}
          </p>
          <div class="flex items-center gap-2 text-sm font-semibold text-[rgb(39,45,122)] opacity-0 transition-opacity group-hover:opacity-100">
            Daha Fazla
            <ArrowRight :size="16" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  BookOpen,
  Truck,
  Calculator,
  ShoppingCart,
  ArrowRight,
} from 'lucide-vue-next';

const services = [
  {
    id: 1,
    name: 'Ürün Kataloğu',
    icon: BookOpen,
    description: 'Geniş ürün kataloğumuz ile tüm ürünlerimizi detaylı inceleyebilir, teknik özelliklerine ulaşabilirsiniz.',
  },
  {
    id: 2,
    name: 'Hızlı Sevkiyat',
    icon: Truck,
    description: 'Türkiye genelindeki geniş lojistik ağımız ile zamanında ve güvenilir teslimat garantisi.',
  },
  {
    id: 3,
    name: 'Hesap Tabloları',
    icon: Calculator,
    description: 'Mantolama, bölme duvar, asma tavan ve diğer sistemler için hesaplama tabloları.',
  },
  {
    id: 4,
    name: 'Dijital Ticaret',
    icon: ShoppingCart,
    description: 'B2B giriş ile online sipariş oluşturun, teklif alın, güvenli ödeme yapın ve siparişlerinizi takip edin.',
  },
];
</script>
