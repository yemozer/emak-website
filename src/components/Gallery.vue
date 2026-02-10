<template>
  <section class="py-12 md:py-20 bg-gradient-to-b from-white via-gray-50/30 to-white">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <!-- Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          <div
            v-for="(item, index) in indexedItems"
            :key="index"
            @click="openLightbox(item, index)"
            class="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            <!-- Image thumbnail -->
            <img
              v-if="item.type === 'image'"
              :src="item.src"
              :alt="item.alt"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            <!-- Video thumbnail -->
            <video
              v-else
              :src="item.src"
              class="h-full w-full object-cover"
              preload="metadata"
              muted
              playsinline
            />

            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div class="rounded-full bg-white/20 backdrop-blur-sm p-3">
                <Play v-if="item.type === 'video'" :size="24" class="text-white" />
                <ZoomIn v-else :size="24" class="text-white" />
              </div>
            </div>

            <!-- Video badge -->
            <div
              v-if="item.type === 'video'"
              class="absolute top-2 right-2 rounded-full bg-black/50 backdrop-blur-sm px-2 py-1 flex items-center gap-1"
            >
              <Play :size="12" class="text-white fill-white" />
              <span class="text-white text-xs font-medium">Video</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="lightboxItem"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          @click.self="closeLightbox"
        >
          <!-- Close button -->
          <button
            @click="closeLightbox"
            class="absolute top-4 right-4 z-10 rounded-full bg-white/10 backdrop-blur-sm p-2 text-white hover:bg-white/20 transition-colors"
            aria-label="Kapat"
          >
            <X :size="28" />
          </button>

          <!-- Previous button -->
          <button
            @click.stop="prevItem"
            class="absolute left-2 md:left-4 z-10 rounded-full bg-white/10 backdrop-blur-sm p-2 md:p-3 text-white hover:bg-white/20 transition-colors"
            aria-label="Önceki"
          >
            <ChevronLeft :size="28" />
          </button>

          <!-- Next button -->
          <button
            @click.stop="nextItem"
            class="absolute right-2 md:right-4 z-10 rounded-full bg-white/10 backdrop-blur-sm p-2 md:p-3 text-white hover:bg-white/20 transition-colors"
            aria-label="Sonraki"
          >
            <ChevronRight :size="28" />
          </button>

          <!-- Content -->
          <div class="max-h-[85vh] max-w-[90vw] flex items-center justify-center">
            <img
              v-if="lightboxItem.type === 'image'"
              :src="lightboxItem.src"
              :alt="lightboxItem.alt"
              class="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            />
            <video
              v-else
              :src="lightboxItem.src"
              controls
              autoplay
              class="max-h-[85vh] max-w-[90vw] rounded-lg"
            />
          </div>

          <!-- Counter -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-white text-sm">
            {{ currentIndex + 1 }} / {{ items.length }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Play, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-vue-next';

type GalleryItem = {
  src: string;
  alt: string;
  type: 'image' | 'video';
};

const props = defineProps<{
  items: GalleryItem[];
}>();

const indexedItems = computed(() => props.items);

const lightboxItem = ref<GalleryItem | null>(null);
const currentIndex = ref(0);

const openLightbox = (item: GalleryItem, index: number) => {
  lightboxItem.value = item;
  currentIndex.value = index;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightboxItem.value = null;
  document.body.style.overflow = '';
};

const nextItem = () => {
  const next = (currentIndex.value + 1) % props.items.length;
  currentIndex.value = next;
  lightboxItem.value = props.items[next];
};

const prevItem = () => {
  const prev = (currentIndex.value - 1 + props.items.length) % props.items.length;
  currentIndex.value = prev;
  lightboxItem.value = props.items[prev];
};

const handleKeydown = (e: KeyboardEvent) => {
  if (!lightboxItem.value) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextItem();
  if (e.key === 'ArrowLeft') prevItem();
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>
