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
import { markers as markersData, factoryPoints as factoryPointsData, type FactoryMarker, type FactoryPoint } from '../data/factories';

const mapInitialized = ref(false);
const provinceFilter = ref('');
const showSidebar = ref(false);
const selectedCity = ref<FactoryMarker | null>(null);
let map: any = null;
let maplibregl: any = null;
let Supercluster: any = null;
let cluster: any = null;
const markerRefs = new Map<string, any>();
const popupRefs = new Map<string, any>();
const allMarkers = new Map<string, any>();
const allFactoryPoints = new Map<string, FactoryPoint>();

const markers = computed<FactoryMarker[]>(() => markersData);
const factoryPoints = computed<FactoryPoint[]>(() => factoryPointsData);

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

const focusProvince = (m: FactoryMarker) => {
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

const createMarkerElement = (data: FactoryMarker | null, isCluster: boolean = false, pointCount: number = 0): HTMLElement => {
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
      // Get all leaves (factories) in this cluster
      const clusterFactories = cluster.getLeaves(properties.cluster_id, Infinity);
      
      // Calculate total factory count in this cluster
      const totalFactories = clusterFactories.length;
      
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
      
      // Group factories by city for clearer listing
      const cityMap = new Map<string, { name: string; factories: FactoryPoint[] }>();
      clusterFactories.forEach((leaf: any) => {
        const factoryPoint = allFactoryPoints.get(leaf.properties.id);
        if (!factoryPoint) return;
        if (!cityMap.has(factoryPoint.cityId)) {
          cityMap.set(factoryPoint.cityId, {
            name: factoryPoint.cityName,
            factories: [],
          });
        }
        cityMap.get(factoryPoint.cityId)!.factories.push(factoryPoint);
      });

      const cityGroups = Array.from(cityMap.values()).sort(
        (a, b) => b.factories.length - a.factories.length || a.name.localeCompare(b.name),
      );

      const cityCount = cityGroups.length;
      const clusterFactoriesList = cityGroups
        .map(
          (city) => `
          <div class="rounded-lg border border-gray-200 bg-gray-50 p-3 mb-2 last:mb-0">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-sm font-semibold text-[rgb(39,45,122)]">${city.name}</h4>
              <span class="rounded-full bg-[rgb(39,45,122)]/10 px-2 py-0.5 text-xs font-semibold text-[rgb(39,45,122)]">${city.factories.length} fab.</span>
            </div>
            <ul class="space-y-1.5">
              ${city.factories
                .map(
                  (f) =>
                    `<li class="flex items-start gap-2 text-xs text-gray-700"><span class="mt-1 h-1.5 w-1.5 rounded-full bg-[rgb(39,45,122)] shrink-0"></span><span class="leading-relaxed">${f.name}</span></li>`,
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
      // This is a single factory point
      const factoryId = properties.id as string;
      const factoryPoint = allFactoryPoints.get(factoryId);
      if (!factoryPoint) return;

      // For single factory, show a small marker (count = 1)
      const el = createMarkerElement({ count: 1, name: factoryPoint.cityName } as FactoryMarker);
      const marker = new maplibregl.Marker({
        element: el,
        anchor: 'center',
      })
        .setLngLat([lng, lat])
        .addTo(map);

      markerRefs.set(factoryId, marker);

      // Create popup content for single factory
      const locationInfo = factoryPoint.isExact 
        ? `<p class="text-xs text-gray-500 mt-1">📍 Konum: Tam koordinat</p>`
        : `<p class="text-xs text-gray-500 mt-1">📍 Konum: ${factoryPoint.cityName} merkezi</p>`;

      const popupContent = `
        <div class="p-4 max-w-sm">
          <div class="flex items-start justify-between gap-3 mb-3 pb-2 border-b border-gray-200">
            <div class="flex-1">
              <h3 class="text-base font-semibold text-[rgb(39,45,122)] mb-1">${factoryPoint.name}</h3>
              <p class="text-xs text-gray-600">${factoryPoint.cityName}</p>
              ${locationInfo}
            </div>
          </div>
        </div>
      `;

      const popup = new maplibregl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false,
      }).setHTML(popupContent);

      popupRefs.set(factoryId, popup);

      el.addEventListener('click', () => {
        // When clicking a factory, focus on its city in the sidebar
        const cityMarker = markers.value.find(m => m.code === factoryPoint.cityId);
        if (cityMarker) {
          focusProvince(cityMarker);
        }
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

  // Store all marker data (for city-level grouping)
  markers.value.forEach((data) => {
    allMarkers.set(data.code, data);
  });

  // Store all factory points (for individual factory markers)
  factoryPoints.value.forEach((point) => {
    allFactoryPoints.set(point.id, point);
  });

  // Initialize cluster with factory points (individual factories with exact or city coordinates)
  const points = factoryPoints.value.map((point) => ({
    type: 'Feature' as const,
    properties: {
      id: point.id,
      name: point.name,
      cityId: point.cityId,
      cityName: point.cityName,
      isExact: point.isExact,
    },
    geometry: {
      type: 'Point' as const,
      coordinates: [point.lng, point.lat],
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

