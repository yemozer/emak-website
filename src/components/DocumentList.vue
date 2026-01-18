<template>
  <section class="bg-white py-12 md:py-20">
    <div class="container mx-auto px-4">
      <!-- Search and Filter Bar -->
      <div class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="relative flex-1 max-w-xl">
          <label for="search" class="sr-only">Doküman Ara</label>
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search class="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="search"
            v-model="searchTerm"
            type="text"
            placeholder="Ürün veya doküman adı ile ara..."
            class="block w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3.5 pl-11 pr-4 text-sm transition-all focus:border-[rgb(39,45,122)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[rgb(39,45,122)]/20 shadow-sm"
            @input="debounceSearch"
          />
        </div>
        
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span v-if="loading" class="flex items-center gap-2">
            <Loader2 class="h-4 w-4 animate-spin" />
            Güncelleniyor...
          </span>
          <span v-else>{{ meta.total }} doküman listelendi</span>
        </div>
      </div>

      <!-- Content Area -->
      <div v-if="loading && documents.length === 0" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 6" :key="i" class="animate-pulse rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div class="mb-4 flex items-center gap-4">
            <div class="h-12 w-12 rounded-xl bg-gray-100"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 w-3/4 rounded bg-gray-100"></div>
              <div class="h-3 w-1/2 rounded bg-gray-100"></div>
            </div>
          </div>
          <div class="h-10 w-full rounded-lg bg-gray-100 mt-4"></div>
        </div>
      </div>

      <div v-else-if="documents.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="doc in documents"
          :key="doc.link"
          class="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-[rgb(39,45,122)]/30 hover:shadow-xl hover:-translate-y-1"
        >
          <!-- Document Icon & Info -->
          <div class="flex items-start gap-4 mb-6">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[rgb(39,45,122)]/5 text-[rgb(39,45,122)] transition-colors group-hover:bg-[rgb(39,45,122)] group-hover:text-white">
              <FileText v-if="doc.format === 'pdf'" class="h-6 w-6" />
              <File v-else class="h-6 w-6" />
            </div>
            <div class="flex-1">
              <h3 class="line-clamp-2 text-base font-bold text-gray-900 group-hover:text-[rgb(39,45,122)]" :title="doc.display_name">
                {{ doc.display_name }}
              </h3>
              <p class="mt-1 text-xs text-gray-500 flex items-center gap-2">
                <span class="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 font-medium text-gray-600 uppercase">
                  {{ doc.format }}
                </span>
                <span>{{ formatDate(doc.created_at) }}</span>
              </p>
            </div>
          </div>

          <!-- Action Button -->
          <a
            :href="doc.link"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-auto flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-sm font-semibold text-[rgb(39,45,122)] transition-all group-hover:bg-[rgb(39,45,122)] group-hover:text-white"
          >
            <span>Dokümanı İndir</span>
            <Download class="h-4 w-4" />
          </a>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center py-20 text-center">
        <div class="mb-4 rounded-full bg-gray-50 p-6">
          <FileSearch class="h-12 w-12 text-gray-400" />
        </div>
        <h3 class="text-xl font-bold text-gray-900">Sonuç Bulunamadı</h3>
        <p class="mt-2 text-gray-500">Aramanıza uygun herhangi bir doküman bulamadık.</p>
        <button
          @click="searchTerm = ''; fetchDocuments()"
          class="mt-6 rounded-lg bg-[rgb(39,45,122)] px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-[rgb(39,45,122)]/90"
        >
          Aramayı Temizle
        </button>
      </div>

      <!-- Pagination -->
      <div v-if="meta.total > limit" class="mt-12 flex flex-col items-center gap-4">
        <div class="flex items-center gap-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1 || loading"
            class="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 transition-all hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-white"
          >
            <ChevronLeft class="h-5 w-5" />
          </button>
          
          <div class="flex items-center gap-1">
            <button
              v-for="page in displayedPages"
              :key="page"
              @click="goToPage(page)"
              :disabled="loading"
              class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-all"
              :class="currentPage === page ? 'bg-[rgb(39,45,122)] text-white' : 'text-gray-600 hover:bg-gray-100'"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="nextPage"
            :disabled="currentPage >= totalPages || loading"
            class="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 transition-all hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-white"
          >
            <ChevronRight class="h-5 w-5" />
          </button>
        </div>
        <p class="text-sm text-gray-500">
          Toplam <strong>{{ meta.total }}</strong> dokümandan <strong>{{ startIndex }}-{{ endIndex }}</strong> arası gösteriliyor
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { Search, FileText, File, Download, Loader2, FileSearch, ChevronLeft, ChevronRight } from 'lucide-vue-next';

interface Document {
  product_name: string;
  document_name: string;
  display_name: string;
  link: string;
  format: string;
  created_at: string;
}

interface Meta {
  total: number;
}

const documents = ref<Document[]>([]);
const meta = ref<Meta>({ total: 0 });
const loading = ref(true);
const searchTerm = ref('');
const limit = 50;
const currentPage = ref(1);

let debounceTimer: any = null;

const totalPages = computed(() => Math.ceil(meta.value.total / limit));

const startIndex = computed(() => (currentPage.value - 1) * limit + 1);
const endIndex = computed(() => Math.min(currentPage.value * limit, meta.value.total));

const displayedPages = computed(() => {
  const pages: number[] = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, start + 4);
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const fetchDocuments = async () => {
  loading.value = true;
  try {
    const url = new URL('https://api.revleno.com/api/v1/public/catalog/documents');
    url.searchParams.append('host_id', '63afa6cd-a738-4d94-b4fa-8c222530ada6');
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('offset', ((currentPage.value - 1) * limit).toString());
    
    if (searchTerm.value) {
      url.searchParams.append('search', searchTerm.value);
    }
    
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    documents.value = data.documents;
    meta.value = data.meta;
    
    // Scroll to top when page changes
    if (currentPage.value > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } catch (error) {
    console.error('Dokümanlar yüklenirken hata oluştu:', error);
    documents.value = [];
    meta.value = { total: 0 };
  } finally {
    loading.value = false;
  }
};

const debounceSearch = () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    currentPage.value = 1; // Reset to first page on new search
    fetchDocuments();
  }, 500);
};

const goToPage = (page: number) => {
  currentPage.value = page;
  fetchDocuments();
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

onMounted(() => {
  fetchDocuments();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
