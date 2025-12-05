<template>
  <section id="urunler" class="py-12 md:py-20 lg:py-28 bg-white">
    <div class="container mx-auto px-4 lg:px-8">
      <!-- Header -->
      <div class="mb-12 text-center">
        <span class="mb-3 md:mb-4 inline-block rounded-full bg-[rgb(39,45,122)]/10 px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-[rgb(39,45,122)]">
          Ürün Kategorileri
        </span>
        <h2 class="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[rgb(39,45,122)]">
          Geniş Ürün Yelpazemiz
        </h2>
        <p class="mx-auto max-w-3xl text-sm sm:text-base md:text-lg text-[rgb(178,178,178)] leading-relaxed px-4">
          İnşaat projelerinizin her aşamasında ihtiyaç duyduğunuz kaliteli malzemeleri 
          tek çatı altında bulabilirsiniz.
        </p>
      </div>

      <!-- Main Product Categories -->
      <div class="">
        <div class="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <div
            v-for="category in mainCategories"
            :key="category.id"
            class="group relative overflow-hidden rounded-xl border border-[rgb(178,178,178)]/20 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-[rgb(39,45,122)]/30 cursor-pointer"
          >
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[rgb(39,45,122)]/10 transition-colors group-hover:bg-[rgb(39,45,122)]/20">
              <component :is="category.icon" :size="28" class="text-[rgb(39,45,122)]" />
            </div>
            <h4 class="text-lg font-semibold text-[rgb(39,45,122)] mb-2">{{ category.name }}</h4>
            <p class="text-sm text-[rgb(178,178,178)] leading-relaxed">{{ category.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  Package,
  Droplets,
  Snowflake,
  Building2,
  Grid3x3,
} from 'lucide-vue-next';

const mainCategories = [
  {
    id: 1,
    name: 'Tüm Ürünler',
    icon: Grid3x3,
    description: 'Tüm ürün kategorilerimizi keşfedin',
  },
  {
    id: 2,
    name: 'Yapı Malzemeleri',
    icon: Building2,
    description: 'Alçı plakalar, profiller ve sistemler',
  },
  {
    id: 3,
    name: 'Kimyasallar',
    icon: Package,
    description: 'Yapıştırıcılar, harçlar ve kimyasallar',
  },
  {
    id: 4,
    name: 'Su Yalıtımı',
    icon: Droplets,
    description: 'Membran ve su yalıtım sistemleri',
  },
  {
    id: 5,
    name: 'Isı Yalıtımı',
    icon: Snowflake,
    description: 'XPS, taş yünü ve yalıtım sistemleri',
  },
];

</script>

<style scoped>
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
}
</style>
