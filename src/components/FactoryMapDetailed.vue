<template>
  <section class="pt-24 md:pt-28 pb-16 bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="mb-10 text-center">
        <h1 class="mb-4 text-3xl font-bold tracking-tight text-[rgb(39,45,122)] md:text-4xl">
          FABRİKA KONUMLARI - DETAYLI HARİTA
        </h1>
        <p class="mx-auto max-w-2xl text-lg text-[rgb(178,178,178)]">
          Türkiye Fabrika Dağılım Haritası - İnteraktif Görünüm
        </p>
      </div>

      <!-- Mobile sidebar toggle -->
      <div class="mb-4 flex justify-end lg:hidden">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-[rgb(178,178,178)]/40 px-3 py-2 text-sm font-semibold text-[rgb(39,45,122)] bg-white shadow-sm active:scale-95 transition"
          @click="showSidebar = true"
        >
          <span>Filtre / Liste</span>
        </button>
      </div>

      <!-- Map + Sidebar -->
      <div class="flex flex-col md:flex-row gap-4 lg:gap-6 mb-6">
        <!-- Sidebar -->
        <aside class="w-full md:w-[340px] lg:w-[360px] rounded-xl border border-[rgb(178,178,178)]/20 bg-white shadow-sm p-4 flex flex-col gap-3 max-h-[70vh] hidden md:flex relative z-20">
          <transition name="slide-fade" mode="out-in">
            <!-- City List View -->
            <div v-if="!selectedCity" key="list" class="flex flex-col gap-3 h-full min-h-0">
            <div class="flex items-center justify-between gap-2 flex-shrink-0">
              <h3 class="text-lg font-semibold text-[rgb(39,45,122)]">İller ve fabrikalar</h3>
              <span class="text-xs text-[rgb(178,178,178)]">Toplam {{ markers.length }} il</span>
            </div>
            <div class="relative flex-shrink-0">
              <input
                v-model="provinceFilter"
                type="text"
                placeholder="İl ara..."
                class="w-full rounded-lg border border-[rgb(178,178,178)]/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(39,45,122)]/40 focus:border-[rgb(39,45,122)]/50"
              />
            </div>
            <div class="flex-1 overflow-y-auto pr-1 space-y-2 mt-2 min-h-0">
              <div
                v-for="m in filteredMarkers"
                :key="m.code"
                class="rounded-lg border border-[rgb(178,178,178)]/20 p-3 hover:border-[rgb(39,45,122)]/30 hover:shadow-sm transition cursor-pointer"
                @click="focusProvince(m)"
              >
                <div class="flex items-center justify-between gap-2">
                  <div class="text-sm font-semibold text-[rgb(39,45,122)]">{{ m.name }}</div>
                  <div
                    class="text-xs px-2 py-0.5 rounded-full font-semibold"
                    :style="{ backgroundColor: getColor(m.count), color: '#fff' }"
                  >
                    {{ m.count }} fab.
                  </div>
                </div>
                <div class="mt-2 text-xs text-[rgb(178,178,178)] line-clamp-2">
                  {{ m.factories.join(', ') }}
                </div>
              </div>
            </div>
            </div>

            <!-- Factory Detail View -->
            <div v-else key="detail" class="flex flex-col gap-3 h-full min-h-0">
              <div class="flex items-center gap-2 mb-2 flex-shrink-0">
              <button
                type="button"
                @click="goBack"
                class="flex items-center justify-center w-8 h-8 rounded-lg border border-[rgb(178,178,178)]/40 hover:bg-gray-50 transition"
              >
                <svg class="w-4 h-4 text-[rgb(39,45,122)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-[rgb(39,45,122)]">{{ selectedCity.name }}</h3>
                <span class="text-xs text-[rgb(178,178,178)]">{{ selectedCity.count }} fabrika</span>
              </div>
            </div>
            <div class="flex-1 overflow-y-auto pr-1 space-y-3 min-h-0">
              <div
                v-for="(factory, index) in selectedCity.factories"
                :key="index"
                class="rounded-lg border border-[rgb(178,178,178)]/20 p-4 bg-gray-50 hover:bg-white hover:shadow-sm transition"
              >
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[rgb(39,45,122)]/10 flex items-center justify-center">
                    <svg class="w-4 h-4 text-[rgb(39,45,122)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900 leading-relaxed">{{ factory }}</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </transition>
        </aside>

        <!-- Mobile overlay sidebar -->
        <transition name="fade">
          <div
            v-if="showSidebar"
            class="fixed inset-0 z-30 bg-black/40 lg:hidden"
            @click.self="showSidebar = false"
          >
            <aside class="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-xl p-4 flex flex-col gap-3">
              <transition name="slide-fade" mode="out-in">
                <!-- City List View -->
                <div v-if="!selectedCity" key="list" class="flex flex-col gap-3 h-full min-h-0">
                <div class="flex items-center justify-between gap-2 mb-2 flex-shrink-0">
                  <div>
                    <div class="text-base font-semibold text-[rgb(39,45,122)]">İller ve fabrikalar</div>
                    <div class="text-xs text-[rgb(178,178,178)]">Toplam {{ markers.length }} il</div>
                  </div>
                  <button
                    type="button"
                    class="text-sm text-[rgb(39,45,122)] font-semibold px-2 py-1 rounded-md border border-[rgb(178,178,178)]/40"
                    @click="showSidebar = false"
                  >
                    Kapat
                  </button>
                </div>

                <div class="relative flex-shrink-0">
                  <input
                    v-model="provinceFilter"
                    type="text"
                    placeholder="İl ara..."
                    class="w-full rounded-lg border border-[rgb(178,178,178)]/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(39,45,122)]/40 focus:border-[rgb(39,45,122)]/50"
                  />
                </div>
                <div class="flex-1 overflow-y-auto pr-1 space-y-2 mt-2 min-h-0">
                  <div
                    v-for="m in filteredMarkers"
                    :key="m.code"
                    class="rounded-lg border border-[rgb(178,178,178)]/20 p-3 hover:border-[rgb(39,45,122)]/30 hover:shadow-sm transition cursor-pointer"
                    @click="() => { focusProvince(m); }"
                  >
                    <div class="flex items-center justify-between gap-2">
                      <div class="text-sm font-semibold text-[rgb(39,45,122)]">{{ m.name }}</div>
                      <div
                        class="text-xs px-2 py-0.5 rounded-full font-semibold"
                        :style="{ backgroundColor: getColor(m.count), color: '#fff' }"
                      >
                        {{ m.count }} fab.
                      </div>
                    </div>
                    <div class="mt-2 text-xs text-[rgb(178,178,178)] line-clamp-2">
                      {{ m.factories.join(', ') }}
                    </div>
                  </div>
                </div>
                </div>

                <!-- Factory Detail View -->
                <div v-else key="detail" class="flex flex-col gap-3 h-full min-h-0">
                  <div class="flex items-center gap-2 mb-2 flex-shrink-0">
                  <button
                    type="button"
                    @click="goBack"
                    class="flex items-center justify-center w-8 h-8 rounded-lg border border-[rgb(178,178,178)]/40 hover:bg-gray-50 transition"
                  >
                    <svg class="w-4 h-4 text-[rgb(39,45,122)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div class="flex-1">
                    <h3 class="text-base font-semibold text-[rgb(39,45,122)]">{{ selectedCity.name }}</h3>
                    <span class="text-xs text-[rgb(178,178,178)]">{{ selectedCity.count }} fabrika</span>
                  </div>
                  <button
                    type="button"
                    class="text-sm text-[rgb(39,45,122)] font-semibold px-2 py-1 rounded-md border border-[rgb(178,178,178)]/40"
                    @click="showSidebar = false"
                  >
                    Kapat
                  </button>
                </div>
                <div class="flex-1 overflow-y-auto pr-1 space-y-3 min-h-0">
                  <div
                    v-for="(factory, index) in selectedCity.factories"
                    :key="index"
                    class="rounded-lg border border-[rgb(178,178,178)]/20 p-4 bg-gray-50 hover:bg-white hover:shadow-sm transition"
                  >
                    <div class="flex items-start gap-3">
                      <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[rgb(39,45,122)]/10 flex items-center justify-center">
                        <svg class="w-4 h-4 text-[rgb(39,45,122)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900 leading-relaxed">{{ factory }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </transition>
            </aside>
          </div>
        </transition>

        <!-- Interactive Map Container -->
        <div class="flex-1 relative overflow-visible rounded-xl border border-[rgb(178,178,178)]/20 bg-white shadow-lg min-h-[540px]">
          <div class="w-full h-full relative overflow-hidden rounded-xl map-clip-container" style="min-height: 540px; position: relative;">
            <div id="factory-map-detailed" class="w-full h-full" style="min-height: 540px;"></div>
            <div v-if="!mapInitialized" class="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
              <div class="flex flex-col items-center gap-3">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(39,45,122)]"></div>
                <p class="text-sm text-[rgb(178,178,178)]">Harita yükleniyor...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

const mapInitialized = ref(false);
const provinceFilter = ref('');
const showSidebar = ref(false);
const selectedCity = ref<MarkerData | null>(null);
let map: any = null;
let maplibregl: any = null;
let Supercluster: any = null;
let cluster: any = null;
const markerRefs = new Map<string, any>();
const popupRefs = new Map<string, any>();
const allMarkers = new Map<string, any>();

type ProvinceCode =
  | 'TR06' | 'TR34' | 'TR35' | 'TR16' | 'TR41' | 'TR07' | 'TR01' | 'TR27' | 'TR45' | 'TR59'
  | 'TR26' | 'TR54' | 'TR33' | 'TR38' | 'TR55' | 'TR19' | 'TR80' | 'TR15' | 'TR71' | 'TR46'
  | 'TR58' | 'TR50' | 'TR81' | 'TR43' | 'TR25' | 'TR68' | 'TR61';

// Province meta (approximate city center coordinates)
const provinceMeta: Record<ProvinceCode, { name: string; lat: number; lng: number }> = {
  TR06: { name: 'Ankara', lat: 39.9334, lng: 32.8597 },
  TR34: { name: 'İstanbul', lat: 41.0082, lng: 28.9784 },
  TR35: { name: 'İzmir', lat: 38.4237, lng: 27.1428 },
  TR16: { name: 'Bursa', lat: 40.1826, lng: 29.0665 },
  TR41: { name: 'Kocaeli', lat: 40.8533, lng: 29.8815 },
  TR07: { name: 'Antalya', lat: 36.8969, lng: 30.7133 },
  TR01: { name: 'Adana', lat: 37.0000, lng: 35.3213 },
  TR27: { name: 'Gaziantep', lat: 37.0662, lng: 37.3833 },
  TR45: { name: 'Manisa', lat: 38.6191, lng: 27.4289 },
  TR59: { name: 'Tekirdağ', lat: 40.9780, lng: 27.5110 },
  TR26: { name: 'Eskişehir', lat: 39.7667, lng: 30.5256 },
  TR54: { name: 'Sakarya', lat: 40.7569, lng: 30.3789 },
  TR33: { name: 'Mersin', lat: 36.7990, lng: 34.6300 },
  TR38: { name: 'Kayseri', lat: 38.7322, lng: 35.4853 },
  TR55: { name: 'Samsun', lat: 41.2867, lng: 36.3300 },
  TR19: { name: 'Çorum', lat: 40.5489, lng: 34.9533 },
  TR80: { name: 'Osmaniye', lat: 37.0681, lng: 36.2616 },
  TR15: { name: 'Burdur', lat: 37.7203, lng: 30.2900 },
  TR71: { name: 'Kırıkkale', lat: 39.8468, lng: 33.5153 },
  TR46: { name: 'Kahramanmaraş', lat: 37.5730, lng: 36.9370 },
  TR58: { name: 'Sivas', lat: 39.7485, lng: 37.0166 },
  TR50: { name: 'Nevşehir', lat: 38.6247, lng: 34.7141 },
  TR81: { name: 'Düzce', lat: 40.8438, lng: 31.1565 },
  TR43: { name: 'Kütahya', lat: 39.4242, lng: 29.9833 },
  TR25: { name: 'Erzurum', lat: 39.9043, lng: 41.2679 },
  TR68: { name: 'Aksaray', lat: 38.3687, lng: 34.0369 },
  TR61: { name: 'Trabzon', lat: 41.0053, lng: 39.7223 },
};

// Real factory data by province (same source as the static map)
const factoryData: Record<ProvinceCode, string[]> = {
  TR34: [
    'BONUS YALITIM - XPS & Bitümlü Membran İstanbul Üretim Tesisi',
    'ENTEGRE - ÖMERLİ FABRİKA',
    'FİXA - İstanbul Fabrika',
    'KALDE - İstanbul Fabrika',
  ],
  TR06: [
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
    'WEBER - Ankara Fabrika',
  ],
  TR43: ['Aragonit Yapı Kimyasalları Merkez Fabrikası'],
  TR35: ['WEBER - İZMİR FABRİKA'],
  TR16: ['BOSTİK - İnegöl Fabrika'],
  TR41: [
    'AUSTROTHERM - Merkez Ofis - Dilovası Fabrika',
    'İZOCAM - Gebkim Foamboard, Izopor ve Tekiz Panel Üretim Tesisleri (Dilovası)',
    'İZOCAM - Taşyünü Tesisi (Dilovası)',
    'KNAUF - İzmit Üretim Tesisi',
    'WEBER - Gebze Fabrika',
  ],
  TR07: [
    'Aragonit Yapı Kimyasalları Antalya Fabrikası',
    'CUBO - ANTALYA MERKEZ FABRİKA GENEL MÜDÜRLÜK',
  ],
  TR01: [
    'FİXA - Adana Fabrika',
    'WEBER - Adana Fabrika',
  ],
  TR27: [
    'AUSTROTHERM - Gaziantep Üretim Tesisi',
    'WALLBOARD - Gaziantep Üretim Tesisi',
  ],
  TR26: [
    'KILIÇOĞLU - ESKİŞEHİR FABRİKA',
    'MEGARON - ESKİŞEHİR FABRİKA',
    'ODE - Eskişehir Üretim Tesisleri',
    'İZOCAM - Elastomerik Kauçuk ve Polietilen Köpük Üretim Tesisi (Eskişehir)',
  ],
  TR81: ['MARMARA ÇİMENTO - DÜZCE FABRİKA'],
  TR33: [
    'ABS ALÇI - TARSUS FABRİKA',
    'İZOCAM - Camyünü ve Foamboard Üretim Tesisleri (Tarsus)',
  ],
  TR38: [
    'AUSTROTHERM - Kayseri Üretim Tesisi',
    'İZOCAM - Taşyünü Tesisi (Kayseri)',
  ],
  TR55: [
    'ENTEGRE - SAMSUN FABRİKA',
    'WEBER - Samsun Fabrika',
  ],
  TR61: ['AUSTROTHERM - Trabzon Üretim Tesisi'],
  TR45: [
    'AUSTROTHERM - Turgutlu Fabrika',
    'DALSAN - TURGUTLU TESİSLERİ',
  ],
  TR54: ['BONUS YALITIM - Sakarya Taş Yünü Üretim Tesisi'],
  TR59: [
    'BOSTİK - Çorlu Fabrika',
    'ODE Tekirdağ Üretim Tesisleri',
  ],
  TR80: ['BTG GAZBETON - BETONG YAPI OSMANİYE FABRİKA'],
  TR15: ['ENTEGRE - BURDUR FABRİKA'],
  TR71: ['GEYİK BİMS KIRIKKALE FABRİKA'],
  TR46: ['KÇS Kahramanmaraş Fabrika'],
  TR58: ['ABS Alçı - SİVAS FABRİKA'],
  TR19: [
    'ÖZKENT ÇORUM TUĞLA KİREMİT FABRİKASI',
    'SELİN TUĞLA',
  ],
  TR50: ['AGT BİMS NEVŞEHİR FABRİKA'],
  TR25: ['ABS ALÇI - AŞKALE FABRİKA'],
  TR68: ['Aragonit Yapı Kimyasalları Aksaray Fabrikası'],
};

type MarkerData = {
  code: ProvinceCode;
  name: string;
  lat: number;
  lng: number;
  count: number;
  factories: string[];
};

const markers = computed<MarkerData[]>(() => {
  const list = Object.entries(factoryData)
    .map(([code, factories]) => {
      const meta = provinceMeta[code as ProvinceCode];
      if (!meta) return null;
      return {
        code: code as ProvinceCode,
        name: meta.name,
        lat: meta.lat,
        lng: meta.lng,
        count: factories.length,
        factories,
      } as MarkerData;
    })
    .filter((m): m is MarkerData => m !== null);

  return list.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
});

const filteredMarkers = computed(() => {
  const term = provinceFilter.value.trim().toLowerCase();
  if (!term) return markers.value;
  return markers.value.filter(
    (m) =>
      m.name.toLowerCase().includes(term) ||
      m.factories.some((f) => f.toLowerCase().includes(term)),
  );
});

const getColor = (count: number): string => {
  // Use consistent color and opacity like FactoryLocations.vue
  // All markers use the same color (#1e40af = rgb(30, 64, 175)) with 0.9 opacity
  return '#1e40af';
};

const getRadius = (count: number): number => {
  // Scale radius with clamp for readability
  return Math.max(12, Math.min(24, 8 + count * 1.2));
};

const getFontSize = (count: number): number => {
  // Scale font size with count
  if (count >= 10) return 12;
  if (count >= 5) return 11;
  return 10;
};

const focusProvince = (m: MarkerData) => {
  if (!map) return;
  // Set selected city to show detail view
  selectedCity.value = m;
  // Move map to city
  map.flyTo({
    center: [m.lng, m.lat],
    zoom: 8,
    duration: 1000,
  });
  // Open popup after animation
  setTimeout(() => {
    const popup = popupRefs.get(m.code);
    const marker = markerRefs.get(m.code);
    if (popup && marker) {
      popup.addTo(map);
    }
  }, 1100);
};

const goBack = () => {
  if (!map) return;
  // Clear selected city
  selectedCity.value = null;
  // Zoom out to show all markers
  const bounds: any[] = markers.value.map((data) => [data.lng, data.lat]);
  if (bounds.length > 0) {
    const lngs = bounds.map((coord) => coord[0]);
    const lats = bounds.map((coord) => coord[1]);
    const boundsObj: [[number, number], [number, number]] = [
      [Math.min(...lngs), Math.min(...lats)],
      [Math.max(...lngs), Math.max(...lats)],
    ];
    map.fitBounds(boundsObj, {
      padding: { top: 30, bottom: 30, left: 30, right: 30 },
      duration: 1000,
    });
  }
};

const createMarkerElement = (data: MarkerData | null, isCluster: boolean = false, pointCount: number = 0): HTMLElement => {
  const el = document.createElement('div');
  el.className = 'custom-marker';
  
  const radius = isCluster 
    ? Math.max(20, Math.min(35, 15 + Math.sqrt(pointCount) * 2)) 
    : (data ? getRadius(data.count) : 12);
  const fontSize = isCluster 
    ? 12 
    : (data ? getFontSize(data.count) : 10);
  const displayCount = isCluster ? pointCount : (data ? data.count : 0);
  // Use consistent color and opacity like FactoryLocations.vue
  // #1e40af = rgb(30, 64, 175) with 0.9 opacity
  const bgColor = isCluster 
    ? 'rgba(39,45,122,0.9)' 
    : 'rgba(30, 64, 175, 0.9)'; // #1e40af with 0.9 opacity
  
  el.style.cssText = `
    width: ${radius * 2}px;
    height: ${radius * 2}px;
    border-radius: 50%;
    background-color: ${bgColor};
    border: 2px solid #ffffff;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: ${fontSize}px;
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  `;
  
  el.textContent = displayCount.toString();
  
  return el;
};

const updateMarkers = () => {
  if (!map || !cluster || !maplibregl) return;

  // Close all open popups when markers update (zoom/pan)
  popupRefs.forEach((popup) => {
    if (popup.isOpen()) {
      popup.remove();
    }
  });

  // Remove all existing markers
  markerRefs.forEach((marker) => {
    marker.remove();
  });
  markerRefs.clear();

  const bounds = map.getBounds();
  const bbox: [number, number, number, number] = [
    bounds.getWest(),
    bounds.getSouth(),
    bounds.getEast(),
    bounds.getNorth(),
  ];

  const zoom = Math.floor(map.getZoom());
  const clusters = cluster.getClusters(bbox, zoom);

  clusters.forEach((clusterPoint: any) => {
    const { geometry, properties } = clusterPoint;
    const [lng, lat] = geometry.coordinates;

    if (properties.cluster) {
      // This is a cluster
      // Get all leaves (cities) in this cluster
      const clusterMarkers = cluster.getLeaves(properties.cluster_id, Infinity);
      
      // Calculate total factory count in this cluster
      const totalFactories = clusterMarkers.reduce((sum: number, leaf: any) => {
        const markerData = allMarkers.get(leaf.properties.code);
        return sum + (markerData?.count || 0);
      }, 0);
      
      // Use total factory count for the cluster marker display
      const el = createMarkerElement(null, true, totalFactories);
      
      const marker = new maplibregl.Marker({
        element: el,
        anchor: 'center',
      })
        .setLngLat([lng, lat])
        .addTo(map);

      const clusterId = `cluster-${properties.cluster_id}`;
      markerRefs.set(clusterId, marker);
      
      // Group by city for clearer listing
      const cityMap = new Map<string, { name: string; count: number; factories: string[] }>();
      clusterMarkers.forEach((leaf: any) => {
        const markerData = allMarkers.get(leaf.properties.code);
        if (!markerData) return;
        if (!cityMap.has(leaf.properties.code)) {
          cityMap.set(leaf.properties.code, {
            name: markerData.name,
            count: markerData.count,
            factories: markerData.factories,
          });
        }
      });

      const cityGroups = Array.from(cityMap.values()).sort(
        (a, b) => b.count - a.count || a.name.localeCompare(b.name),
      );

      const cityCount = cityGroups.length;
      const clusterFactoriesList = cityGroups
        .map(
          (city) => `
          <div class="rounded-lg border border-gray-200 bg-gray-50 p-3 mb-2 last:mb-0">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-sm font-semibold text-[rgb(39,45,122)]">${city.name}</h4>
              <span class="rounded-full bg-[rgb(39,45,122)]/10 px-2 py-0.5 text-xs font-semibold text-[rgb(39,45,122)]">${city.count} fab.</span>
            </div>
            <ul class="space-y-1.5">
              ${city.factories
                .map(
                  (f) =>
                    `<li class="flex items-start gap-2 text-xs text-gray-700"><span class="mt-1 h-1.5 w-1.5 rounded-full bg-[rgb(39,45,122)] shrink-0"></span><span class="leading-relaxed">${f}</span></li>`,
                )
                .join('')}
            </ul>
          </div>
        `,
        )
        .join('');

      const popupContent = `
        <div class="p-3 max-w-sm">
          <div class="flex items-start justify-between gap-3 mb-3 pb-2 border-b border-gray-200">
            <div>
              <h3 class="text-base font-semibold text-[rgb(39,45,122)] mb-1">${cityCount} İl</h3>
              <p class="text-xs text-gray-600">Toplam <strong class="text-[rgb(39,45,122)]">${totalFactories}</strong> fabrika</p>
            </div>
          </div>
          <div class="max-h-64 overflow-y-auto pr-1">${clusterFactoriesList}</div>
        </div>
      `;

      const popup = new maplibregl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false,
      }).setHTML(popupContent);

      popupRefs.set(clusterId, popup);

      el.addEventListener('click', () => {
        // Zoom in to the cluster location
        const currentZoom = map.getZoom();
        const newZoom = Math.min(currentZoom + 2, map.getMaxZoom());
        map.flyTo({
          center: [lng, lat],
          zoom: newZoom,
          duration: 500,
        });
      });

      let hideTooltipTimeout: ReturnType<typeof setTimeout> | null = null;

      el.addEventListener('mouseenter', () => {
        // Clear any pending hide timeout
        if (hideTooltipTimeout) {
          clearTimeout(hideTooltipTimeout);
          hideTooltipTimeout = null;
        }
        
        popup.setLngLat([lng, lat]).addTo(map);
        
        // Immediately move popup to outer container and position it
        const popupEl = popup.getElement();
        const outerContainer = document.querySelector('.flex-1.relative.overflow-visible.rounded-xl');
        
        if (popupEl && outerContainer) {
          // Move to outer container immediately
          if (popupEl.parentElement && popupEl.parentElement !== outerContainer) {
            outerContainer.appendChild(popupEl);
          }
          
          // Function to update popup position based on marker position
          const updatePopupPosition = () => {
            if (!popupEl || !popup.isOpen()) return;
            const markerEl = marker.getElement();
            if (!markerEl) return;
            
            const markerRect = markerEl.getBoundingClientRect();
            const offset = 25;
            
            // Get popup dimensions (use offsetWidth/offsetHeight as fallback)
            const popupWidth = popupEl.offsetWidth || popupEl.getBoundingClientRect().width || 300;
            const popupHeight = popupEl.offsetHeight || popupEl.getBoundingClientRect().height || 200;
            
            // Determine if popup should appear above or below
            // Show above if marker is in lower half of viewport (close to bottom), below if in upper half (close to top)
            const viewportHeight = window.innerHeight;
            const showAbove = markerRect.top >= viewportHeight / 2;
            
            // Center horizontally on marker
            const left = markerRect.left + (markerRect.width / 2) - (popupWidth / 2);
            
            // Position above or below with offset
            const top = showAbove
              ? markerRect.top - popupHeight - offset
              : markerRect.bottom + offset;
            
            // Set position immediately without animation
            popupEl.style.position = 'fixed';
            popupEl.style.transform = 'none';
            popupEl.style.left = `${left}px`;
            popupEl.style.top = `${top}px`;
            popupEl.style.margin = '0';
            popupEl.style.padding = '0';
          };
          
          // Prevent MapLibre from updating position by watching for changes
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                // If MapLibre tries to change transform or position, override it
                const currentTransform = popupEl.style.transform;
                const currentPosition = popupEl.style.position;
                
                // If MapLibre set transform or changed position, revert it
                if (currentTransform && currentTransform !== 'none') {
                  requestAnimationFrame(() => {
                    updatePopupPosition();
                  });
                }
                if (currentPosition && currentPosition !== 'fixed') {
                  requestAnimationFrame(() => {
                    updatePopupPosition();
                  });
                }
              }
            });
          });
          
          observer.observe(popupEl, {
            attributes: true,
            attributeFilter: ['style', 'class'],
          });
          
          // Initial position
          updatePopupPosition();
          
          // Update position on scroll, resize, and map events
          // Use moveend/zoomend to avoid flashing during animations
          let updateTimeout: ReturnType<typeof setTimeout> | null = null;
          const scheduleUpdate = () => {
            if (updateTimeout) clearTimeout(updateTimeout);
            updateTimeout = setTimeout(() => {
              requestAnimationFrame(updatePopupPosition);
            }, 16); // ~60fps
          };
          
          const handleScroll = () => scheduleUpdate();
          const handleResize = () => scheduleUpdate();
          const handleMapMoveEnd = () => requestAnimationFrame(updatePopupPosition);
          const handleMapZoomEnd = () => requestAnimationFrame(updatePopupPosition);
          
          window.addEventListener('scroll', handleScroll, { passive: true });
          window.addEventListener('resize', handleResize, { passive: true });
          map.on('moveend', handleMapMoveEnd);
          map.on('zoomend', handleMapZoomEnd);
          
          // Store cleanup function
          (popupEl as any)._cleanupPosition = () => {
            observer.disconnect();
            if (updateTimeout) clearTimeout(updateTimeout);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            map.off('moveend', handleMapMoveEnd);
            map.off('zoomend', handleMapZoomEnd);
          };
        }
        
        // Setup popup hover handlers after it's added
        setTimeout(() => {
          const popupEl = popup.getElement();
          if (popupEl) {
            popupEl.addEventListener('mouseenter', () => {
              // Clear hide timeout when entering popup
              if (hideTooltipTimeout) {
                clearTimeout(hideTooltipTimeout);
                hideTooltipTimeout = null;
              }
            });
            popupEl.addEventListener('mouseleave', () => {
              // Hide popup when leaving
              if ((popupEl as any)?._cleanupPosition) {
                (popupEl as any)._cleanupPosition();
              }
              popup.remove();
            });
          }
        }, 10);
      });

      el.addEventListener('mouseleave', () => {
        // Add a small delay before hiding to allow moving to popup
        hideTooltipTimeout = setTimeout(() => {
          const popupEl = popup.getElement();
          // Only hide if not hovering over popup
          if (!popupEl || !popupEl.matches(':hover')) {
            // Cleanup scroll/resize listeners
            if ((popupEl as any)?._cleanupPosition) {
              (popupEl as any)._cleanupPosition();
            }
            popup.remove();
          }
        }, 100);
      });
      
      // Also cleanup when popup is closed
      const popupEl = popup.getElement();
      if (popupEl) {
        const observer = new MutationObserver(() => {
          if (!popup.isOpen() && (popupEl as any)?._cleanupPosition) {
            (popupEl as any)._cleanupPosition();
          }
        });
        observer.observe(popupEl, { attributes: true, attributeFilter: ['style', 'class'] });
      }
    } else {
      // This is a single point
      const code = properties.code as ProvinceCode;
      const markerData = allMarkers.get(code);
      if (!markerData) return;

      const el = createMarkerElement(markerData);
      const marker = new maplibregl.Marker({
        element: el,
        anchor: 'center',
      })
        .setLngLat([lng, lat])
        .addTo(map);

      markerRefs.set(code, marker);

      // Create popup content
      const factoriesList = markerData.factories
        .map(
          (f: string) =>
            `<li class="flex items-start gap-2 py-1.5 border-b border-gray-100 last:border-0"><span class="mt-1.5 h-2 w-2 rounded-full bg-[rgb(39,45,122)] shrink-0"></span><span class="text-sm text-gray-700 leading-relaxed">${f}</span></li>`,
        )
        .join('');

      const popupContent = `
        <div class="p-4 max-w-sm">
          <div class="flex items-start justify-between gap-3 mb-3 pb-2 border-b border-gray-200">
            <div>
              <h3 class="text-base font-semibold text-[rgb(39,45,122)] mb-1">${markerData.name}</h3>
              <p class="text-xs text-gray-600">Toplam <strong class="text-[rgb(39,45,122)]">${markerData.count}</strong> fabrika</p>
            </div>
            <span class="rounded-full bg-[rgb(39,45,122)]/10 px-2 py-1 text-[10px] font-semibold text-[rgb(39,45,122)] whitespace-nowrap">${markerData.count} fab.</span>
          </div>
          <ul class="max-h-64 overflow-y-auto pr-1">${factoriesList}</ul>
        </div>
      `;

      const popup = new maplibregl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false,
      }).setHTML(popupContent);

      popupRefs.set(code, popup);

      el.addEventListener('click', () => {
        if (popup.isOpen()) {
          popup.remove();
        } else {
          popup.setLngLat([lng, lat]).addTo(map);
        }
      });

      let hideTooltipTimeout: ReturnType<typeof setTimeout> | null = null;

      el.addEventListener('mouseenter', () => {
        // Clear any pending hide timeout
        if (hideTooltipTimeout) {
          clearTimeout(hideTooltipTimeout);
          hideTooltipTimeout = null;
        }
        
        popup.setLngLat([lng, lat]).addTo(map);
        
        // Immediately move popup to outer container and position it
        const popupEl = popup.getElement();
        const outerContainer = document.querySelector('.flex-1.relative.overflow-visible.rounded-xl');
        
        if (popupEl && outerContainer) {
          // Move to outer container immediately
          if (popupEl.parentElement && popupEl.parentElement !== outerContainer) {
            outerContainer.appendChild(popupEl);
          }
          
          // Function to update popup position based on marker position
          const updatePopupPosition = () => {
            if (!popupEl || !popup.isOpen()) return;
            const markerEl = marker.getElement();
            if (!markerEl) return;
            
            const markerRect = markerEl.getBoundingClientRect();
            const offset = 25;
            
            // Get popup dimensions (use offsetWidth/offsetHeight as fallback)
            const popupWidth = popupEl.offsetWidth || popupEl.getBoundingClientRect().width || 300;
            const popupHeight = popupEl.offsetHeight || popupEl.getBoundingClientRect().height || 200;
            
            // Determine if popup should appear above or below
            // Show above if marker is in lower half of viewport (close to bottom), below if in upper half (close to top)
            const viewportHeight = window.innerHeight;
            const showAbove = markerRect.top >= viewportHeight / 2;
            
            // Center horizontally on marker
            const left = markerRect.left + (markerRect.width / 2) - (popupWidth / 2);
            
            // Position above or below with offset
            const top = showAbove
              ? markerRect.top - popupHeight - offset
              : markerRect.bottom + offset;
            
            // Set position immediately without animation
            popupEl.style.position = 'fixed';
            popupEl.style.transform = 'none';
            popupEl.style.left = `${left}px`;
            popupEl.style.top = `${top}px`;
            popupEl.style.margin = '0';
            popupEl.style.padding = '0';
          };
          
          // Prevent MapLibre from updating position by watching for changes
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                // If MapLibre tries to change transform or position, override it
                const currentTransform = popupEl.style.transform;
                const currentPosition = popupEl.style.position;
                
                // If MapLibre set transform or changed position, revert it
                if (currentTransform && currentTransform !== 'none') {
                  requestAnimationFrame(() => {
                    updatePopupPosition();
                  });
                }
                if (currentPosition && currentPosition !== 'fixed') {
                  requestAnimationFrame(() => {
                    updatePopupPosition();
                  });
                }
              }
            });
          });
          
          observer.observe(popupEl, {
            attributes: true,
            attributeFilter: ['style', 'class'],
          });
          
          // Initial position
          updatePopupPosition();
          
          // Update position on scroll, resize, and map events
          // Use moveend/zoomend to avoid flashing during animations
          let updateTimeout: ReturnType<typeof setTimeout> | null = null;
          const scheduleUpdate = () => {
            if (updateTimeout) clearTimeout(updateTimeout);
            updateTimeout = setTimeout(() => {
              requestAnimationFrame(updatePopupPosition);
            }, 16); // ~60fps
          };
          
          const handleScroll = () => scheduleUpdate();
          const handleResize = () => scheduleUpdate();
          const handleMapMoveEnd = () => requestAnimationFrame(updatePopupPosition);
          const handleMapZoomEnd = () => requestAnimationFrame(updatePopupPosition);
          
          window.addEventListener('scroll', handleScroll, { passive: true });
          window.addEventListener('resize', handleResize, { passive: true });
          map.on('moveend', handleMapMoveEnd);
          map.on('zoomend', handleMapZoomEnd);
          
          // Store cleanup function
          (popupEl as any)._cleanupPosition = () => {
            observer.disconnect();
            if (updateTimeout) clearTimeout(updateTimeout);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            map.off('moveend', handleMapMoveEnd);
            map.off('zoomend', handleMapZoomEnd);
          };
        }
        
        // Setup popup hover handlers after it's added
        setTimeout(() => {
          const popupEl = popup.getElement();
          if (popupEl) {
            popupEl.addEventListener('mouseenter', () => {
              // Clear hide timeout when entering popup
              if (hideTooltipTimeout) {
                clearTimeout(hideTooltipTimeout);
                hideTooltipTimeout = null;
              }
            });
            popupEl.addEventListener('mouseleave', () => {
              // Hide popup when leaving
              if ((popupEl as any)?._cleanupPosition) {
                (popupEl as any)._cleanupPosition();
              }
              popup.remove();
            });
          }
        }, 10);
      });

      el.addEventListener('mouseleave', () => {
        // Add a small delay before hiding to allow moving to popup
        hideTooltipTimeout = setTimeout(() => {
          const popupEl = popup.getElement();
          // Only hide if not hovering over popup
          if (!popupEl || !popupEl.matches(':hover')) {
            // Cleanup scroll/resize listeners
            if ((popupEl as any)?._cleanupPosition) {
              (popupEl as any)._cleanupPosition();
            }
            popup.remove();
          }
        }, 100);
      });
      
      // Also cleanup when popup is closed
      const popupEl = popup.getElement();
      if (popupEl) {
        const observer = new MutationObserver(() => {
          if (!popup.isOpen() && (popupEl as any)?._cleanupPosition) {
            (popupEl as any)._cleanupPosition();
          }
        });
        observer.observe(popupEl, { attributes: true, attributeFilter: ['style', 'class'] });
      }
    }
  });
};

onMounted(async () => {
  if (typeof window === 'undefined') return;

  try {
    maplibregl = await import('maplibre-gl');
    await import('maplibre-gl/dist/maplibre-gl.css');
    Supercluster = (await import('supercluster')).default;
  } catch (error) {
    console.error('Error loading MapLibre GL or Supercluster:', error);
    return;
  }

  if (!maplibregl || !Supercluster) return;

  // Store all marker data
  markers.value.forEach((data) => {
    allMarkers.set(data.code, data);
  });

  // Initialize cluster
  const points = markers.value.map((data) => ({
    type: 'Feature' as const,
    properties: {
      code: data.code,
      count: data.count,
    },
    geometry: {
      type: 'Point' as const,
      coordinates: [data.lng, data.lat],
    },
  }));

  cluster = new Supercluster({
    radius: 50,
    maxZoom: 14,
    minZoom: 0,
  });

  cluster.load(points);

  await nextTick();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize map centered on Turkey
  map = new maplibregl.Map({
    container: 'factory-map-detailed',
    style: 'https://tiles.openfreemap.org/styles/liberty',
    center: [35.0, 39.0], // [lng, lat] for MapLibre
    zoom: 6,
  });

  // Add navigation controls
  map.addControl(new maplibregl.NavigationControl(), 'top-right');

  map.on('load', () => {
    // Initial marker update
    updateMarkers();

    // Update markers on zoom and move
    map.on('moveend', updateMarkers);
    map.on('zoomend', updateMarkers);

    // Fit bounds to show all markers
    const bounds: any[] = markers.value.map((data) => [data.lng, data.lat]);
    if (bounds.length > 0) {
      const lngs = bounds.map((coord) => coord[0]);
      const lats = bounds.map((coord) => coord[1]);
      const boundsObj: [[number, number], [number, number]] = [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)],
      ];

      map.fitBounds(boundsObj, {
        padding: { top: 30, bottom: 30, left: 30, right: 30 },
        duration: prefersReducedMotion ? 0 : 1000,
      });
    }

    mapInitialized.value = true;
  });

  map.on('error', (e: any) => {
    console.error('Map error:', e);
  });
});

onUnmounted(() => {
  if (map) {
    // Remove event listeners
    map.off('moveend', updateMarkers);
    map.off('zoomend', updateMarkers);

    // Remove all markers
    markerRefs.forEach((marker) => {
      marker.remove();
    });
    markerRefs.clear();

    // Remove all popups
    popupRefs.forEach((popup) => {
      popup.remove();
    });
    popupRefs.clear();

    allMarkers.clear();

    map.remove();
    map = null;
    cluster = null;
  }
});
</script>

<style>
#factory-map-detailed {
  z-index: 0;
}

/* Clip container for map - constrains markers during panning */
.map-clip-container {
  overflow: hidden;
  position: relative;
}

/* Ensure markers stay within map z-index context and below sidebar/navbar */
.maplibregl-marker {
  z-index: 1 !important;
}

/* Ensure map container constrains markers */
.maplibregl-map {
  overflow: hidden !important;
  position: relative;
  z-index: 0;
}

/* Ensure markers don't go above sidebar/navbar during interactions */
.maplibregl-canvas-container {
  z-index: 0;
}

/* Popups are moved to outer container via JavaScript, so they can overflow */
.maplibregl-popup {
  z-index: 1000 !important;
  pointer-events: auto;
}

.maplibregl-popup-content {
  border-radius: 8px;
  padding: 0;
  margin: 0;
  max-height: 70vh;
  overflow-y: auto;
  position: relative;
}

.maplibregl-popup-content-wrapper {
  padding: 0;
  overflow: visible;
}

/* Popup tip styling */
.maplibregl-popup-tip {
  border-top-color: white;
}

/* Close button styling */
.maplibregl-popup-close-button {
  position: absolute !important;
  right: 8px !important;
  top: 8px !important;
  width: 24px !important;
  height: 24px !important;
  padding: 0 !important;
  margin: 0 !important;
  background: rgba(255, 255, 255, 0.9) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  font-size: 16px !important;
  line-height: 1 !important;
  color: #666 !important;
  transition: all 0.2s ease !important;
  z-index: 10 !important;
}

.maplibregl-popup-close-button:hover {
  background: rgba(255, 255, 255, 1) !important;
  color: #333 !important;
  border-color: rgba(0, 0, 0, 0.2) !important;
  transform: scale(1.1) !important;
}

.maplibregl-popup-close-button:active {
  transform: scale(0.95) !important;
}

/* Sidebar transition */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>

