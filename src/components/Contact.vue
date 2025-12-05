<template>
  <section id="iletisim" class="py-12 md:py-20 lg:py-28 bg-gradient-muted">
    <div class="container mx-auto px-4 lg:px-8">
      <!-- Header -->
      <div class="mb-12 md:mb-16 lg:mb-20 text-center">
        <span class="mb-3 md:mb-4 inline-block rounded-full bg-[rgb(39,45,122)]/10 px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-[rgb(39,45,122)]">
          İletişim
        </span>
        <h2 class="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[rgb(39,45,122)] px-4">
          Bizimle İletişime Geçin
        </h2>
        <p class="mx-auto max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl text-[rgb(178,178,178)] leading-relaxed px-4">
          Projeleriniz için en iyi çözümleri birlikte bulalım
        </p>
      </div>
      
      <div class="mx-auto max-w-6xl">
        <div class="grid gap-8 md:gap-10 lg:gap-12 lg:grid-cols-2">
          <!-- Contact Info -->
          <div class="space-y-6 md:space-y-8 lg:space-y-10">
            <div>
              <h3 class="mb-6 md:mb-8 text-2xl md:text-3xl font-semibold text-[rgb(39,45,122)]">İletişim Bilgileri</h3>
              <div class="space-y-4 md:space-y-6">
                <div class="flex items-start gap-3 md:gap-5">
                  <div class="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg md:rounded-xl bg-[rgb(39,45,122)]/10 flex-shrink-0">
                    <MapPin :size="20" class="md:w-6 md:h-6 text-[rgb(39,45,122)]" />
                  </div>
                  <div>
                    <p class="mb-1 md:mb-2 text-sm md:text-base font-semibold text-[rgb(39,45,122)]">Adres</p>
                    <p class="text-xs md:text-sm text-[rgb(178,178,178)]">
                      Ostim OSB Mahallesi 1569 Sokak No: 31-33<br />
                      Yenimahalle, Ankara, Türkiye
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3 md:gap-5">
                  <div class="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg md:rounded-xl bg-[rgb(39,45,122)]/10 flex-shrink-0">
                    <Phone :size="20" class="md:w-6 md:h-6 text-[rgb(39,45,122)]" />
                  </div>
                  <div>
                    <p class="mb-1 md:mb-2 text-sm md:text-base font-semibold text-[rgb(39,45,122)]">Telefon</p>
                    <div class="space-y-1">
                      <a href="tel:+903123123625" class="block text-xs md:text-sm text-[rgb(178,178,178)] transition-colors hover:text-[rgb(39,45,122)]">
                        +90 312 312 36 25
                      </a>
                      <a href="tel:+903123855060" class="block text-xs md:text-sm text-[rgb(178,178,178)] transition-colors hover:text-[rgb(39,45,122)]">
                        +90 312 385 50 60
                      </a>
                    </div>
                  </div>
                </div>
                <div class="flex items-start gap-3 md:gap-5">
                  <div class="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg md:rounded-xl bg-[rgb(39,45,122)]/10 flex-shrink-0">
                    <Mail :size="20" class="md:w-6 md:h-6 text-[rgb(39,45,122)]" />
                  </div>
                  <div>
                    <p class="mb-1 md:mb-2 text-sm md:text-base font-semibold text-[rgb(39,45,122)]">E-posta</p>
                    <a href="mailto:info@emakyapi.com.tr" class="text-xs md:text-sm text-[rgb(178,178,178)] transition-colors hover:text-[rgb(39,45,122)] break-all">
                      info@emakyapi.com.tr
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div>
              <h3 class="mb-4 md:mb-6 text-lg md:text-xl font-semibold text-[rgb(39,45,122)]">Sosyal Medya</h3>
              <div class="flex gap-3 md:gap-4">
                <a
                  href="https://www.instagram.com/emak.yapi"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/20 bg-white transition-all hover:bg-[rgb(39,45,122)] hover:text-white hover:shadow-lg active:scale-95"
                  aria-label="Instagram"
                >
                  <Instagram :size="20" class="md:w-[22px] md:h-[22px]" />
                </a>
                <a
                  href="https://linkedin.com/company/emakyapi"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/20 bg-white transition-all hover:bg-[rgb(39,45,122)] hover:text-white hover:shadow-lg active:scale-95"
                  aria-label="LinkedIn"
                >
                  <Linkedin :size="20" class="md:w-[22px] md:h-[22px]" />
                </a>
                <a
                  href="https://www.facebook.com/emakyapi"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/20 bg-white transition-all hover:bg-[rgb(39,45,122)] hover:text-white hover:shadow-lg active:scale-95"
                  aria-label="Facebook"
                >
                  <Facebook :size="20" class="md:w-[22px] md:h-[22px]" />
                </a>
                <a
                  href="https://wa.me/905331232225"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/20 bg-white transition-all hover:bg-[#25D366] hover:text-white hover:shadow-lg active:scale-95"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 md:w-[22px] md:h-[22px]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="rounded-xl md:rounded-2xl border border-[rgb(178,178,178)]/20 bg-white p-6 md:p-8 lg:p-10 shadow-lg">
            <h3 class="mb-6 md:mb-8 text-2xl md:text-3xl font-semibold text-[rgb(39,45,122)]">Mesaj Gönderin</h3>
            <form @submit.prevent="handleSubmit" class="space-y-4 md:space-y-6">
              <div>
                <label for="name" class="mb-1.5 md:mb-2 block text-xs md:text-sm font-medium text-[rgb(39,45,122)]">
                  Ad Soyad *
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/30 bg-white px-4 md:px-5 py-2.5 md:py-3.5 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(39,45,122)] focus-visible:ring-offset-2"
                  placeholder="Adınız ve soyadınız"
                />
              </div>
              <div class="grid gap-4 md:gap-6 md:grid-cols-2">
                <div>
                  <label for="email" class="mb-1.5 md:mb-2 block text-xs md:text-sm font-medium text-[rgb(39,45,122)]">
                    E-posta *
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/30 bg-white px-4 md:px-5 py-2.5 md:py-3.5 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(39,45,122)] focus-visible:ring-offset-2"
                    placeholder="ornek@email.com"
                  />
                </div>
                <div>
                  <label for="phone" class="mb-1.5 md:mb-2 block text-xs md:text-sm font-medium text-[rgb(39,45,122)]">
                    Telefon
                  </label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    class="w-full rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/30 bg-white px-4 md:px-5 py-2.5 md:py-3.5 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(39,45,122)] focus-visible:ring-offset-2"
                    placeholder="+90 (XXX) XXX XX XX"
                  />
                </div>
              </div>
              <div>
                <label for="subject" class="mb-1.5 md:mb-2 block text-xs md:text-sm font-medium text-[rgb(39,45,122)]">
                  Konu
                </label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  class="w-full rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/30 bg-white px-4 md:px-5 py-2.5 md:py-3.5 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(39,45,122)] focus-visible:ring-offset-2"
                  placeholder="Mesajınızın konusu"
                />
              </div>
              <div>
                <label for="message" class="mb-1.5 md:mb-2 block text-xs md:text-sm font-medium text-[rgb(39,45,122)]">
                  Mesaj *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  class="w-full rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/30 bg-white px-4 md:px-5 py-2.5 md:py-3.5 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(39,45,122)] focus-visible:ring-offset-2"
                  placeholder="Mesajınızı buraya yazın..."
                ></textarea>
              </div>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full rounded-lg md:rounded-xl bg-[rgb(39,45,122)] px-5 md:px-6 py-3 md:py-4 text-sm md:text-base font-semibold text-white shadow-lg transition-all hover:bg-[rgb(39,45,122)]/90 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!isSubmitting" class="flex items-center justify-center gap-2">
                  Mesaj Gönder
                  <Send :size="16" class="md:w-[18px] md:h-[18px]" />
                </span>
                <span v-else class="flex items-center justify-center gap-2">
                  Gönderiliyor...
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Send } from 'lucide-vue-next';

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
  
  form.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };
  
  isSubmitting.value = false;
};
</script>
