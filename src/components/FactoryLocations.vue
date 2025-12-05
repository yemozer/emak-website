<template>
  <section id="fabrika-konumlari" class="py-8 md:py-16 bg-gray-50">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="mb-8 md:mb-12 text-center">
        <h2 class="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[rgb(39,45,122)]">
          FABRİKA KONUMLARI
        </h2>
        <p class="mx-auto max-w-2xl text-base md:text-lg text-[rgb(178,178,178)] px-4">
          Türkiye Fabrika Dağılım Haritası
        </p>
      </div>

      <!-- Static Map Visualization -->
      <div class="relative mb-4 md:mb-6 overflow-hidden rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/20 bg-white">
        <div class="w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 p-1 md:p-2 lg:p-3 flex items-center justify-center" style="aspect-ratio: 1000/422;">
          <!-- Static Turkey Map with City Markers -->
          <div class="relative w-full h-full max-w-5xl mx-auto" ref="mapContainerRef">
            <!-- Actual Turkey SVG Map from simplemaps.com - using img for proper alignment -->
            <img src="/turkey-map.svg" alt="Turkey Map" class="w-full h-full object-contain" />
            
            <!-- Overlay SVG for city markers with hover effects -->
            <svg viewBox="0 0 1000 422" class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style="pointer-events: none;">
              <!-- City markers with factory counts - using exact coordinates from SVG label_points -->
              <template v-for="city in cities" :key="city.id">
                <g 
                  class="city-marker group cursor-pointer touch-manipulation" 
                  style="pointer-events: auto;"
                  @mouseenter="handleMarkerEnter(city.id)"
                  @mouseleave="handleMarkerLeave"
                  @click="handleMarkerClick(city.id)"
                  @touchstart.prevent="handleMarkerClick(city.id)"
                >
                  <circle 
                    :cx="city.x" 
                    :cy="city.y" 
                    :r="hoveredCity === city.id ? getCityRadius(city) * 1.3 : getCityRadius(city)" 
                    :fill="city.color" 
                    :opacity="hoveredCity === city.id ? 1 : city.opacity" 
                    class="transition-all duration-300"
                    stroke="white"
                    stroke-width="2"
                  />
                  <text 
                    :x="city.x" 
                    :y="city.y + 1" 
                    text-anchor="middle" 
                    dominant-baseline="middle"
                    fill="white" 
                    :font-size="getCityFontSize(city)" 
                    font-weight="bold"
                    class="pointer-events-none select-none"
                  >
                    {{ city.count }}
                  </text>
                  <text 
                    :x="city.x" 
                    :y="city.y + 25" 
                    text-anchor="middle" 
                    fill="rgb(39,45,122)" 
                    :font-size="city.labelSize" 
                    font-weight="600"
                    class="pointer-events-none select-none hidden md:block"
                  >
                    {{ city.name }}
                  </text>
                </g>
              </template>
            </svg>
            
          </div>
        </div>
      </div>
      <div class="text-center px-4">
        <a
          href="/fabrika-konumlari"
          class="inline-flex items-center gap-2 rounded-lg bg-[rgb(39,45,122)] px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-white transition-all hover:bg-[rgb(39,45,122)]/90 hover:shadow-lg active:scale-95"
        >
          <MapPin :size="16" class="md:w-[18px] md:h-[18px]" />
          <span class="hidden sm:inline">Detaylı Harita Görünümü</span>
          <span class="sm:hidden">Detaylı Harita</span>
          <ArrowRight :size="14" class="md:w-4 md:h-4" />
        </a>
      </div>
    </div>
    
    <!-- Factory list tooltip - Teleported outside SVG container for proper overflow -->
    <Teleport to="body">
      <div
        v-if="hoveredCity && getCityFactories(hoveredCity).length > 0"
        ref="tooltipRef"
        class="factory-tooltip fixed bg-white rounded-lg shadow-xl border border-[rgb(178,178,178)]/20 p-3 md:p-4 max-w-[90vw] md:max-w-xs z-40"
        :style="getTooltipStyle"
        @mouseenter="handleTooltipEnter"
        @mouseleave="handleTooltipLeave"
        @click.stop
        @touchstart.stop
      >
        <h4 class="font-bold text-[rgb(39,45,122)] mb-2 md:mb-3 text-xs md:text-sm border-b border-[rgb(178,178,178)]/20 pb-1.5 md:pb-2">
          {{ getCityName(hoveredCity) }} - Fabrikalar ({{ getCityFactories(hoveredCity).length }})
        </h4>
        <ul class="space-y-1 md:space-y-1.5 text-[10px] md:text-xs text-[rgb(178,178,178)] max-h-48 md:max-h-64 overflow-y-auto">
                <li v-for="(factory, index) in getCityFactories(hoveredCity)" :key="index" class="flex items-start gap-1.5 md:gap-2">
                  <Factory :size="12" class="md:w-4 md:h-4 text-[rgb(39,45,122)] flex-shrink-0 mt-0.5" />
                  <span class="leading-relaxed">{{ factory }}</span>
                </li>
        </ul>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { Teleport } from 'vue';
import { MapPin, ArrowRight, Factory } from 'lucide-vue-next';

const hoveredCity = ref<string | null>(null);
const mapContainerRef = ref<HTMLElement | null>(null);
const tooltipRef = ref<HTMLElement | null>(null);
let hideTooltipTimeout: ReturnType<typeof setTimeout> | null = null;
const isMobile = ref(false);
const clickedCity = ref<string | null>(null); // Track clicked city for mobile
const forceUpdate = ref(0); // Force recomputation of tooltip position on scroll

onMounted(() => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768;
    const handleResize = () => {
      isMobile.value = window.innerWidth < 768;
    };
    window.addEventListener('resize', handleResize);
    
    // Close tooltip when clicking outside on mobile
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (isMobile.value && clickedCity.value) {
        const target = e.target as HTMLElement;
        // Check if click is outside the tooltip and marker
        if (!target.closest('.factory-tooltip') && !target.closest('.city-marker')) {
          clickedCity.value = null;
          hoveredCity.value = null;
        }
      }
    };
    
    // Update tooltip position on scroll/resize so it stays aligned with marker
    const handleScroll = () => {
      if (hoveredCity.value) {
        forceUpdate.value++;
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    });
  }
});

const getCityName = (cityId: string | null): string => {
  if (!cityId) return '';
  const city = cities.find(c => c.id === cityId);
  return city?.name || '';
};

// Check if city is in the crowded northwest region (Istanbul area)
const isCrowdedRegion = (city: City): boolean => {
  // Cities in northwest region that are close together
  const crowdedIds = ['TR34', 'TR41', 'TR16', 'TR54', 'TR59', 'TR26'];
  return crowdedIds.includes(city.id);
};

const getCityRadius = (city: City): number => {
  if (!isMobile.value) return city.radius;
  // Reduce scaling for crowded region on mobile to prevent overlap
  const scale = isCrowdedRegion(city) ? 1.3 : 1.8;
  return city.radius * scale;
};

const getCityFontSize = (city: City): number => {
  if (!isMobile.value) return city.fontSize;
  // Reduce scaling for crowded region on mobile to prevent overlap
  const scale = isCrowdedRegion(city) ? 1.3 : 1.8;
  return city.fontSize * scale;
};

interface City {
  id: string;
  name: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  fontSize: number;
  labelSize: number;
  count: number;
}

const cities: City[] = [
  {
    id: 'TR06',
    name: 'Ankara',
    x: 374.2,
    y: 163.1,
    radius: 16,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 12,
    labelSize: 11,
    count: 12
  },
  {
    id: 'TR41',
    name: 'Kocaeli',
    x: 245.3,
    y: 93.2,
    radius: 14,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 11,
    labelSize: 10,
    count: 5
  },
  {
    id: 'TR34',
    name: 'İstanbul',
    x: 199.3,
    y: 81.8,
    radius: 15,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 12,
    labelSize: 11,
    count: 4
  },
  {
    id: 'TR19',
    name: 'Çorum',
    x: 471.6,
    y: 120.2,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 2
  },
  {
    id: 'TR07',
    name: 'Antalya',
    x: 260.9,
    y: 341.5,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 2
  },
  {
    id: 'TR33',
    name: 'Mersin',
    x: 432.7,
    y: 353.6,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 2
  },
  {
    id: 'TR38',
    name: 'Kayseri',
    x: 519.8,
    y: 237.9,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 2
  },
  {
    id: 'TR55',
    name: 'Samsun',
    x: 529.3,
    y: 74,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 2
  },
  {
    id: 'TR01',
    name: 'Adana',
    x: 511.6,
    y: 315.2,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 2
  },
  {
    id: 'TR27',
    name: 'Gaziantep',
    x: 604.7,
    y: 330,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 2
  },
  {
    id: 'TR45',
    name: 'Manisa',
    x: 175.1,
    y: 230.6,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 2
  },
  {
    id: 'TR59',
    name: 'Tekirdağ',
    x: 115.5,
    y: 87.1,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 2
  },
  {
    id: 'TR35',
    name: 'İzmir',
    x: 127.6,
    y: 259,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 1
  },
  {
    id: 'TR16',
    name: 'Bursa',
    x: 205.6,
    y: 151.1,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 1
  },
  {
    id: 'TR26',
    name: 'Eskişehir',
    x: 302.9,
    y: 174.3,
    radius: 14,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 11,
    labelSize: 10,
    count: 4
  },
  {
    id: 'TR54',
    name: 'Sakarya',
    x: 274.8,
    y: 107.5,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 1
  },
  {
    id: 'TR80',
    name: 'Osmaniye',
    x: 550.1,
    y: 322.8,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 1
  },
  {
    id: 'TR15',
    name: 'Burdur',
    x: 247.3,
    y: 305,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 1
  },
  {
    id: 'TR71',
    name: 'Kırıkkale',
    x: 424.4,
    y: 166.1,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 1
  },
  {
    id: 'TR46',
    name: 'Kahramanmaraş',
    x: 580.1,
    y: 277.2,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 1
  },
  {
    id: 'TR58',
    name: 'Sivas',
    x: 600.3,
    y: 177.5,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 1
  },
  {
    id: 'TR50',
    name: 'Nevşehir',
    x: 473.8,
    y: 226.7,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 1
  },
  {
    id: 'TR25',
    name: 'Erzurum',
    x: 799.5,
    y: 154,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 1
  },
  {
    id: 'TR68',
    name: 'Aksaray',
    x: 434.1,
    y: 252.8,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 1
  },
  {
    id: 'TR61',
    name: 'Trabzon',
    x: 716.4,
    y: 101,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 1
  },
  {
    id: 'TR81',
    name: 'Düzce',
    x: 311.3,
    y: 95.8,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 1
  },
  {
    id: 'TR43',
    name: 'Kütahya',
    x: 231.8,
    y: 194.5,
    radius: 12,
    color: '#1e40af',
    opacity: 0.9,
    fontSize: 10,
    labelSize: 10,
    count: 1
  }
];

// Factory data for each city
const factoryData: Record<string, string[]> = {
  'TR34': [
    'BONUS YALITIM - XPS & Bitümlü Membran İstanbul Üretim Tesisi',
    'ENTEGRE - ÖMERLİ FABRİKA',
    'FİXA - İstanbul Fabrika',
    'KALDE - İstanbul Fabrika'
  ],
  'TR06': [
    'ABS Alçı - ANKARA BALA FABRİKA',
    'ABS Alçı - ANKARA BOZÜYÜK FABRİKA',
    'AUSTROTHERM - Ankara Fabrika',
    'DALSAN - ANKARA BALA TESİSLERİ',
    'DALSAN - ANKARA KALEBOĞAZI TESİSLERİ',
    'ENTEGRE - ANKARA FABRİKA',
    'FİXA - Ankara Fabrika',
    'KNAUF - Ahiboz Üretim Tesisi',
    'PANELSAN - PANELSAN FABRİKA',
    'TEPE - Merkez / Betopan Fabrika',
    'TEPE - Tepepan Fabrika',
    'WEBER - Ankara Fabrika'
  ],
  'TR43': [
    'Aragonit Yapı Kimyasalları Merkez Fabrikası'
  ],
  'TR35': [
    'WEBER - İZMİR FABRİKA'
  ],
  'TR16': [
    'BOSTİK - İnegöl Fabrika'
  ],
  'TR41': [
    'AUSTROTHERM - Merkez Ofis - Dilovası Fabrika',
    'İZOCAM - Gebkim Foamboard, Izopor ve Tekiz Panel Üretim Tesisleri (Dilovası)',
    'İZOCAM - Taşyünü Tesisi (Dilovası)',
    'KNAUF - İzmit Üretim Tesisi',
    'WEBER - Gebze Fabrika'
  ],
  'TR07': [
    'Aragonit Yapı Kimyasalları Antalya Fabrikası',
    'CUBO - ANTALYA MERKEZ FABRİKA GENEL MÜDÜRLÜK'
  ],
  'TR01': [
    'FİXA - Adana Fabrika',
    'WEBER - Adana Fabrika'
  ],
  'TR27': [
    'AUSTROTHERM - Gaziantep Üretim Tesisi',
    'WALLBOARD - Gaziantep Üretim Tesisi'
  ],
  'TR26': [
    'KILIÇOĞLU - ESKİŞEHİR FABRİKA',
    'MEGARON - ESKİŞEHİR FABRİKA',
    'ODE - Eskişehir Üretim Tesisleri',
    'İZOCAM - Elastomerik Kauçuk ve Polietilen Köpük Üretim Tesisi (Eskişehir)'
  ],
  'TR81': [
    'MARMARA ÇİMENTO - DÜZCE FABRİKA'
  ],
  'TR33': [
    'ABS ALÇI - TARSUS FABRİKA',
    'İZOCAM - Camyünü ve Foamboard Üretim Tesisleri (Tarsus)'
  ],
  'TR38': [
    'AUSTROTHERM - Kayseri Üretim Tesisi',
    'İZOCAM - Taşyünü Tesisi (Kayseri)'
  ],
  'TR55': [
    'ENTEGRE - SAMSUN FABRİKA',
    'WEBER - Samsun Fabrika'
  ],
  'TR61': [
    'AUSTROTHERM - Trabzon Üretim Tesisi'
  ],
  'TR45': [
    'AUSTROTHERM - Turgutlu Fabrika',
    'DALSAN - TURGUTLU TESİSLERİ'
  ],
  'TR54': [
    'BONUS YALITIM - Sakarya Taş Yünü Üretim Tesisi'
  ],
  'TR59': [
    'BOSTİK - Çorlu Fabrika',
    'ODE Tekirdağ Üretim Tesisleri'
  ],
  'TR80': [
    'BTG GAZBETON - BETONG YAPI OSMANİYE FABRİKA'
  ],
  'TR15': [
    'ENTEGRE - BURDUR FABRİKA'
  ],
  'TR71': [
    'GEYİK BİMS KIRIKKALE FABRİKA'
  ],
  'TR46': [
    'KÇS Kahramanmaraş Fabrika'
  ],
  'TR58': [
    'ABS Alçı - SİVAS FABRİKA'
  ],
  'TR19': [
    'ÖZKENT ÇORUM TUĞLA KİREMİT FABRİKASI',
    'SELİN TUĞLA'
  ],
  'TR50': [
    'AGT BİMS NEVŞEHİR FABRİKA'
  ],
  'TR25': [
    'ABS ALÇI - AŞKALE FABRİKA'
  ],
  'TR68': [
    'Aragonit Yapı Kimyasalları Aksaray Fabrikası'
  ]
};

const getCityFactories = (cityId: string): string[] => {
  if (!cityId) return [];
  return factoryData[cityId] || [];
};

const handleMarkerEnter = (cityId: string) => {
  // Only handle hover on desktop
  if (!isMobile.value) {
    // Clear any pending hide timeout
    if (hideTooltipTimeout) {
      clearTimeout(hideTooltipTimeout);
      hideTooltipTimeout = null;
    }
    hoveredCity.value = cityId;
  }
};

const handleMarkerLeave = () => {
  // Only handle hover on desktop
  if (!isMobile.value) {
    // Add a small delay before hiding to allow moving to tooltip
    hideTooltipTimeout = setTimeout(() => {
      hoveredCity.value = null;
    }, 100);
  }
};

const handleMarkerClick = (cityId: string) => {
  if (isMobile.value) {
    // On mobile, toggle tooltip on click
    if (clickedCity.value === cityId) {
      // If same city clicked, close tooltip
      clickedCity.value = null;
      hoveredCity.value = null;
    } else {
      // Open tooltip for clicked city
      clickedCity.value = cityId;
      hoveredCity.value = cityId;
    }
  } else {
    // On desktop, also support click (in addition to hover)
    if (hideTooltipTimeout) {
      clearTimeout(hideTooltipTimeout);
      hideTooltipTimeout = null;
    }
    hoveredCity.value = cityId;
  }
};

const handleTooltipEnter = () => {
  // Clear hide timeout when entering tooltip
  if (hideTooltipTimeout) {
    clearTimeout(hideTooltipTimeout);
    hideTooltipTimeout = null;
  }
};

const handleTooltipLeave = () => {
  // Hide tooltip when leaving
  hoveredCity.value = null;
};

const getTooltipStyle = computed(() => {
  // Force recomputation when forceUpdate changes (on scroll/resize)
  const _ = forceUpdate.value;
  
  if (!hoveredCity.value || !mapContainerRef.value) return { display: 'none' };
  
  const city = cities.find(c => c.id === hoveredCity.value);
  if (!city) return { display: 'none' };
  
  // Get the map container's bounding box (updates on scroll)
  const mapRect = mapContainerRef.value.getBoundingClientRect();
  
  // Calculate the marker position in screen coordinates
  // SVG viewBox is 1000x422, so we need to scale the coordinates
  const xPercent = (city.x / 1000);
  const yPercent = (city.y / 422);
  
  const markerX = mapRect.left + (xPercent * mapRect.width);
  const markerY = mapRect.top + (yPercent * mapRect.height);
  
  // Simple logic: if marker is in upper half, show tooltip below; if lower half, show above
  const isUpperHalf = city.y < 211; // 422 / 2 = 211
  const isVeryHigh = city.y < 100; // Too close to top/navbar
  
  // Position tooltip to the right (or center on mobile)
  // Show below if upper half or very high or mobile, above if lower half
  const showBelow = isUpperHalf || isVeryHigh || isMobile.value;
  
  let left: string;
  let top: string;
  let transform: string;
  
  if (isMobile.value) {
    // On mobile, ensure tooltip fits within screen bounds
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    const tooltipMaxWidth = screenWidth * 0.9; // max-w-[90vw]
    const padding = 16; // Padding from screen edges
    
    // Calculate tooltip half width for centering
    const tooltipHalfWidth = tooltipMaxWidth / 2;
    
    let tooltipLeft: number;
    let tooltipTransform: string;
    
    // Try to center on marker first
    if (markerX - tooltipHalfWidth >= padding && markerX + tooltipHalfWidth <= screenWidth - padding) {
      // Centering works perfectly
      tooltipLeft = markerX;
      tooltipTransform = 'translateX(-50%)';
    } else {
      // Can't center, need to adjust
      // Calculate how much space we have on each side
      const spaceOnRight = screenWidth - markerX - padding;
      const spaceOnLeft = markerX - padding;
      
      if (spaceOnRight < tooltipHalfWidth) {
        // Not enough space on right - position tooltip ending at right edge
        // This allows tooltip to extend leftward as much as possible
        tooltipLeft = screenWidth - padding;
        tooltipTransform = 'translateX(-100%)';
      } else if (spaceOnLeft < tooltipHalfWidth) {
        // Not enough space on left - position tooltip starting at left edge
        // This allows tooltip to extend rightward as much as possible
        tooltipLeft = padding;
        tooltipTransform = 'translateX(0)';
      } else {
        // Should be able to center (fallback)
        tooltipLeft = markerX;
        tooltipTransform = 'translateX(-50%)';
      }
    }
    
    left = `${tooltipLeft}px`;
    // Less space for southern cities on mobile (y >= 211 is lower half of map)
    const isSouthern = city.y >= 211;
    const verticalSpacing = isMobile.value && isSouthern ? 8 : 20;
    top = showBelow ? `${markerY + verticalSpacing}px` : `${markerY - verticalSpacing}px`;
    transform = tooltipTransform;
    
    return {
      left,
      top,
      transform,
      display: 'block',
      maxWidth: `${tooltipMaxWidth}px`, // Ensure max width is respected
      width: 'max-content' // Allow tooltip to use its natural width up to maxWidth
    };
  } else {
    // Position to the right on desktop
    left = `${markerX + 20}px`;
    top = showBelow ? `${markerY + 10}px` : `${markerY}px`;
    return {
      left,
      top,
      transform: showBelow ? 'none' : 'translateY(-100%)',
      display: 'block'
    };
  }
});
</script>

<style scoped>
/* Tooltip styles are now in body, but we can keep any scoped styles here if needed */
</style>
