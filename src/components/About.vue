<template>
  <section id="hakkimizda" class="relative overflow-hidden py-12 md:py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50/30 to-white">
    <!-- Decorative background elements -->
    <div class="absolute top-1/4 right-0 w-96 h-96 bg-[rgb(39,45,122)]/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 left-0 w-80 h-80 bg-[rgb(59,70,180)]/5 rounded-full blur-3xl"></div>
    <div class="container relative z-10 mx-auto px-4 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <!-- Header -->
        <div class="mb-12 md:mb-16 text-center">
          <span
            class="mb-3 md:mb-4 inline-block rounded-full bg-[rgb(39,45,122)]/10 px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-[rgb(39,45,122)]"
          >
            Hakkımızda
          </span>
          <h2
            class="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[rgb(39,45,122)]"
          >
            Güvenilir Tedarik Ortağınız
          </h2>
        </div>

        <!-- Main Content Block -->
        <div class="mb-12 md:mb-16">
          <div class="prose prose-lg max-w-none">
            <p class="text-base md:text-lg text-[rgb(55,65,81)] leading-relaxed mb-6">
              Yapı malzemeleri konusunda <strong class="text-[rgb(39,45,122)]">Emak Yapı Malzemeleri Ltd. Şti.</strong> olarak
              yurt içindeki inşaat projelerine toptan ürün tedariği sağlamaktayız. Ankara'da <strong class="text-[rgb(39,45,122)]">Ulus ve Ostim</strong>'deki
              satış ve depo noktalarımızla müşterilerimize sürekli stok, hızlı ve güvenilir ürün sevkiyatıyla hizmet vermekteyiz.
            </p>
            <p class="text-base md:text-lg text-[rgb(55,65,81)] leading-relaxed">
              Geniş ürün yelpazemiz, hızlı sevkiyat ağımız ve uzman ekibimiz ile projelerinizin güvenilir çözüm ortağıyız.
              İnşaat projelerinizin her aşamasında ihtiyaç duyduğunuz kaliteli malzemeleri tek çatı altında bulabilir,
              zamanında teslimat garantisi ile projelerinizin aksamaması için yanınızdayız.
            </p>
          </div>
        </div>

        <!-- Images Section -->
        <div class="mb-12 md:mb-16 grid gap-6 md:gap-8 lg:grid-cols-2">
          <div class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <img
              src="/images/about/emak-yapi-full.jpg"
              alt="Emak Yapı deposu ve sevkiyat alanı"
              class="h-[300px] w-full object-cover md:h-[400px] transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <p class="text-white font-semibold text-lg drop-shadow-lg">Ankara Ulus ve Ostim Depolarımız</p>
              <p class="text-white/90 text-sm mt-1 drop-shadow-md">Sürekli stok ve hızlı hazırlık altyapısı</p>
            </div>
            <!-- Decorative corner -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[rgb(39,45,122)]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <img
              src="/images/about/emak-yapi-warehouse.jpg"
              alt="Emak Yapı stok alanı"
              class="h-[300px] w-full object-cover md:h-[400px] transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <p class="text-white font-semibold text-lg drop-shadow-lg">Güvenilir Ürün Tedariği</p>
              <p class="text-white/90 text-sm mt-1 drop-shadow-md">Düzenli stok kontrolü ve kalite garantisi</p>
            </div>
            <!-- Decorative corner -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[rgb(39,45,122)]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        <!-- Key Strengths -->
        <div class="mb-12 md:mb-16">
          <h3 class="text-2xl md:text-3xl font-bold text-[rgb(39,45,122)] mb-6">Güçlü Yönlerimiz</h3>
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="(point, index) in keyPoints"
              :key="index"
              class="group relative rounded-xl border border-[rgb(178,178,178)]/20 bg-white p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
            >
              <!-- Gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-br from-[rgb(39,45,122)]/5 via-transparent to-[rgb(59,70,180)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div class="relative mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(39,45,122)]/10 to-[rgb(39,45,122)]/5 group-hover:bg-gradient-to-br group-hover:from-[rgb(39,45,122)]/20 group-hover:to-[rgb(59,70,180)]/10 group-hover:scale-110 transition-all group-hover:shadow-glow">
                <component :is="point.icon" :size="24" class="text-[rgb(39,45,122)] transition-transform group-hover:rotate-3" />
              </div>
              <h4 class="relative text-lg font-semibold text-[rgb(39,45,122)] mb-2 group-hover:text-gradient-primary transition-all">{{ point.title }}</h4>
              <p class="relative text-sm text-[rgb(178,178,178)] leading-relaxed group-hover:text-gray-600 transition-colors">{{ point.description }}</p>
              
              <!-- Bottom accent -->
              <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[rgb(39,45,122)] to-[rgb(59,70,180)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </div>
        </div>

        <!-- Vision Section -->
        <div class="mb-12 md:mb-16 rounded-2xl border border-[rgb(178,178,178)]/20 bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8 md:p-10 shadow-lg hover:shadow-xl transition-all relative overflow-hidden">
          <!-- Decorative gradient -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[rgb(39,45,122)]/10 to-transparent rounded-bl-full"></div>
          
          <div class="max-w-4xl relative z-10">
            <div class="mb-6 flex items-center gap-3">
              <div class="rounded-lg bg-gradient-to-br from-[rgb(39,45,122)]/10 to-[rgb(39,45,122)]/5 p-3 shadow-glow">
                <Target :size="28" class="text-[rgb(39,45,122)]" />
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-gradient-primary">Vizyonumuz</h3>
            </div>
            <p class="text-base md:text-lg text-[rgb(55,65,81)] leading-relaxed">
              İnşaat sektöründe kalitenin başarı için şart olduğunu bilen, ahlaki sorumluluklarının bilincinde
              sektörün öncü firmaları arasında <strong class="text-gradient-primary">lider olmak</strong>.
            </p>
          </div>
        </div>

        <!-- Values Section -->
        <div class="mb-12 md:mb-16">
          <div class="mb-6 flex items-center gap-3">
            <div class="rounded-lg bg-gradient-to-br from-[rgb(39,45,122)]/10 to-[rgb(39,45,122)]/5 p-3 shadow-glow">
              <Award :size="28" class="text-[rgb(39,45,122)]" />
            </div>
            <h3 class="text-2xl md:text-3xl font-bold text-gradient-primary">Değerlerimiz</h3>
          </div>
          <div class="prose prose-lg max-w-none">
            <p class="text-base md:text-lg text-[rgb(55,65,81)] leading-relaxed mb-6">
              Çalışma prensiplerimiz ve değerlerimiz, müşterilerimize en iyi hizmeti sunmak ve sektörde
              güvenilir bir ortak olmak üzerine kuruludur:
            </p>
            <ul class="space-y-4 text-base md:text-lg text-[rgb(55,65,81)] leading-relaxed">
              <li class="flex items-start gap-3">
                <CheckCircle2 :size="22" class="mt-1 flex-shrink-0 text-[rgb(39,45,122)]" />
                <span><strong class="text-[rgb(39,45,122)]">Müşterilerimize kusursuz hizmet sunmak</strong> - Her projede mükemmellik hedefiyle çalışıyoruz.</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircle2 :size="22" class="mt-1 flex-shrink-0 text-[rgb(39,45,122)]" />
                <span><strong class="text-[rgb(39,45,122)]">İş ahlakına bağlılık</strong> - Etik değerler ve şeffaflık tüm iş süreçlerimizin temelidir.</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircle2 :size="22" class="mt-1 flex-shrink-0 text-[rgb(39,45,122)]" />
                <span><strong class="text-[rgb(39,45,122)]">Kalite bilinci</strong> - Uluslararası standartlara uygun kalite anlayışı ve yüksek sorumluluk duygusu ile çalışıyoruz.</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckCircle2 :size="22" class="mt-1 flex-shrink-0 text-[rgb(39,45,122)]" />
                <span><strong class="text-[rgb(39,45,122)]">Beklentinin ötesinde katma değerli iş birliği</strong> - Uzun vadeli ve güvenilir ortaklıklar kurarak projelerinize değer katıyoruz.</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Brand Partners -->
        <div class="rounded-2xl border border-[rgb(178,178,178)]/20 bg-gradient-to-br from-white via-gray-50/50 to-white p-8 md:p-10 shadow-lg hover:shadow-xl transition-all relative overflow-hidden">
          <!-- Decorative gradient -->
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[rgb(39,45,122)]/10 to-transparent rounded-tr-full"></div>
          
          <div class="relative z-10">
            <h3 class="text-xl md:text-2xl font-semibold text-gradient-primary mb-4 text-center">
              Güçlü Marka Ortaklıklarımız
            </h3>
            <p class="text-center text-base md:text-lg text-[rgb(55,65,81)]">
              <strong class="text-gradient-primary">KNAUF, WEBER, DALSAN, BONUS YALITIM, AUSTROTHERM, İZOCAM</strong> ve daha fazlası ile
              projelerinize tam çözüm sunuyoruz.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Award, CheckCircle2, MapPin, Package, Target, Truck } from 'lucide-vue-next';

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
