<template>
  <section id="hakkimizda">
    <!-- Intro -->
    <div class="py-16 md:py-24">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="mx-auto max-w-5xl">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[rgb(39,45,122)] mb-8 md:mb-10">
            Güvenilir İş Ortağınız
          </h1>

          <div class="grid gap-10 lg:gap-16 lg:grid-cols-5">
            <div class="lg:col-span-3">
              <p class="text-base md:text-lg text-gray-600 leading-relaxed mb-5">
                Yapı malzemeleri konusunda <strong class="text-gray-900">Emak Yapı Malzemeleri Ltd. Şti.</strong> olarak
                yurt içindeki inşaat projelerine toptan ürün tedariği sağlamaktayız. Ankara'da <strong class="text-gray-900">Ulus ve Ostim</strong>'deki
                satış ve depo noktalarımızla müşterilerimize sürekli stok, hızlı ve güvenilir ürün sevkiyatıyla hizmet vermekteyiz.
              </p>
              <p class="text-base md:text-lg text-gray-600 leading-relaxed">
                Geniş ürün yelpazemiz, hızlı sevkiyat ağımız ve uzman ekibimiz ile projelerinizin güvenilir çözüm ortağıyız.
                İnşaat projelerinizin her aşamasında ihtiyaç duyduğunuz kaliteli malzemeleri tek çatı altında bulabilir,
                zamanında teslimat garantisi ile projelerinizin aksamaması için yanınızdayız.
              </p>
            </div>
            <div class="lg:col-span-2 flex flex-col gap-3 text-sm">
              <div v-for="(point, index) in keyPoints" :key="index" class="flex items-start gap-3 py-3" :class="index < keyPoints.length - 1 ? 'border-b border-gray-100' : ''">
                <component :is="point.icon" :size="20" class="text-[rgb(39,45,122)] mt-0.5 flex-shrink-0" />
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
        <div class="overflow-hidden rounded-lg">
          <img
            src="/images/about/emak-yapi-full.jpg"
            alt="Emak Yapı deposu ve sevkiyat alanı"
            class="h-[260px] md:h-[340px] w-full object-cover"
            loading="lazy"
          />
        </div>
        <div class="overflow-hidden rounded-lg">
          <img
            src="/images/about/emak-yapi-warehouse.jpg"
            alt="Emak Yapı stok alanı"
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
            <h2 class="text-2xl md:text-3xl font-bold text-[rgb(39,45,122)] mb-4">Vizyonumuz</h2>
            <p class="text-base md:text-lg text-gray-600 leading-relaxed">
              İnşaat sektöründe kalitenin başarı için şart olduğunu bilen, ahlaki sorumluluklarının bilincinde
              sektörün öncü firmaları arasında lider olmak.
            </p>
          </div>

          <!-- Values -->
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-[rgb(39,45,122)] mb-4">Değerlerimiz</h2>
            <ul class="space-y-3">
              <li class="flex items-start gap-2.5 text-base md:text-lg text-gray-600 leading-relaxed">
                <span class="text-[rgb(39,45,122)] mt-2 block w-1.5 h-1.5 rounded-full bg-[rgb(39,45,122)] flex-shrink-0"></span>
                <span>Müşterilerimize kusursuz hizmet sunmak</span>
              </li>
              <li class="flex items-start gap-2.5 text-base md:text-lg text-gray-600 leading-relaxed">
                <span class="text-[rgb(39,45,122)] mt-2 block w-1.5 h-1.5 rounded-full bg-[rgb(39,45,122)] flex-shrink-0"></span>
                <span>İş ahlakına bağlılık, etik değerler ve şeffaflık</span>
              </li>
              <li class="flex items-start gap-2.5 text-base md:text-lg text-gray-600 leading-relaxed">
                <span class="text-[rgb(39,45,122)] mt-2 block w-1.5 h-1.5 rounded-full bg-[rgb(39,45,122)] flex-shrink-0"></span>
                <span>Uluslararası standartlara uygun kalite bilinci</span>
              </li>
              <li class="flex items-start gap-2.5 text-base md:text-lg text-gray-600 leading-relaxed">
                <span class="text-[rgb(39,45,122)] mt-2 block w-1.5 h-1.5 rounded-full bg-[rgb(39,45,122)] flex-shrink-0"></span>
                <span>Beklentinin ötesinde katma değerli iş birliği</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Brand Partners -->
    <div class="bg-[rgb(39,45,122)] py-10 md:py-14">
      <div class="container mx-auto px-4 lg:px-8 text-center">
        <p class="text-sm uppercase tracking-widest text-white/60 mb-3">Marka Ortaklarımız</p>
        <p class="mx-auto max-w-2xl text-base md:text-lg text-white/90">
          KNAUF, WEBER, DALSAN, BONUS YALITIM, AUSTROTHERM, İZOCAM ve daha fazlası
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MapPin, Package, Truck } from 'lucide-vue-next';

const keyPoints = [
  {
    icon: MapPin,
    title: 'Stratejik Konum',
    description: 'Ankara Ulus ve Ostim\'deki iki lojistik noktamız ile hızlı hazırlık ve teslimat.',
  },
  {
    icon: Package,
    title: 'Geniş Ürün Yelpazesi',
    description: 'Toptan ürün tedariği için geniş katalog ve sürekli stok garantisi.',
  },
  {
    icon: Truck,
    title: 'Hızlı Sevkiyat',
    description: 'Projelerinizin zamanında tamamlanması için güvenilir sevkiyat altyapısı.',
  },
];
</script>
