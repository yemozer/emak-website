<template>
  <section id="fabrika-konumlari" class="relative py-8 md:py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-[rgb(39,45,122)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-[rgb(59,70,180)]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
    <div class="container relative z-10 mx-auto px-4 lg:px-8">
      <div class="mb-4 text-center">
        <span class="mb-3 md:mb-4 inline-block rounded-full bg-[rgb(39,45,122)]/10 px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-[rgb(39,45,122)]">
          Fabrika Konumları
        </span>
        <h2 class="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gradient-primary">
          FABRİKA KONUMLARI
        </h2>
        <p class="mx-auto max-w-2xl text-base md:text-lg text-[rgb(178,178,178)] px-4">
          Türkiye Fabrika Dağılım Haritası
        </p>
      </div>

      <!-- Static Map Visualization -->
      <div class="relative mb-2 overflow-hidden rounded-lg md:rounded-xl bg-transparent transition-all">
        <div class="w-full p-1 md:p-2 lg:p-3 flex items-center justify-center" style="aspect-ratio: 1000/422;">
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
          class="inline-flex items-center gap-2 rounded-lg bg-[rgb(39,45,122)] px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-white transition-all hover:bg-[rgb(39,45,122)]/90 hover:shadow-glow active:scale-95 relative overflow-hidden group"
        >
          <span class="relative z-10 flex items-center gap-2">
            <MapPin :size="16" class="md:w-[18px] md:h-[18px]" />
            <span class="hidden sm:inline">Detaylı Harita Görünümü</span>
            <span class="sm:hidden">Detaylı Harita</span>
            <ArrowRight :size="14" class="md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
          </span>
          <span class="absolute inset-0 bg-gradient-to-r from-[rgb(59,70,180)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
import { cities as cityData, factories as factoryData, type FactoryCity, type FactoryItem } from '../data/factories';

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
  const city = cities.value.find(c => c.id === cityId);
  return city?.name || '';
};

const getCityFactories = (cityId: string | null): string[] => {
  if (!cityId) return [];
  return factoryData.filter(f => f.cityId === cityId).map(f => f.name);
};

// Check if city is in the crowded northwest region (Istanbul area)
const isCrowdedRegion = (city: FactoryCity): boolean => {
  // Cities in northwest region that are close together
  const crowdedIds = ['TR34', 'TR41', 'TR16', 'TR54', 'TR59', 'TR26'];
  return crowdedIds.includes(city.id);
};

const getCityRadius = (city: FactoryCity): number => {
  if (!isMobile.value) return city.radius;
  // Reduce scaling for crowded region on mobile to prevent overlap
  const scale = isCrowdedRegion(city) ? 1.3 : 1.8;
  return city.radius * scale;
};

const getCityFontSize = (city: FactoryCity): number => {
  if (!isMobile.value) return city.fontSize;
  // Reduce scaling for crowded region on mobile to prevent overlap
  const scale = isCrowdedRegion(city) ? 1.3 : 1.8;
  return city.fontSize * scale;
};

type City = FactoryCity & { count: number };

// Use imported cityData and factoryData from YAML
// Only show cities that have factories (count > 0)
const cities = computed<City[]>(() => {
  return cityData
    .map(city => ({
      ...city,
      count: factoryData.filter(f => f.cityId === city.id).length
    }))
    .filter(city => city.count > 0);
});

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
  
  const city = cities.value.find(c => c.id === hoveredCity.value);
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
