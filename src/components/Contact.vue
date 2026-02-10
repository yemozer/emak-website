<template>
  <section id="iletisim" class="py-12 md:py-20 lg:py-28 bg-gradient-muted">
    <div class="container mx-auto px-4 lg:px-8">
      <!-- Header -->
      <div class="mb-12 md:mb-16 lg:mb-20 text-center">
        <span class="mb-3 md:mb-4 inline-block rounded-full bg-[rgb(39,45,122)]/10 px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-[rgb(39,45,122)]">
          {{ sectionBadge }}
        </span>
        <h2 class="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[rgb(39,45,122)] px-4">
          {{ sectionHeading }}
        </h2>
        <p class="mx-auto max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl text-[rgb(178,178,178)] leading-relaxed px-4">
          {{ sectionDescription }}
        </p>
      </div>

      <div class="mx-auto max-w-6xl">
        <div class="grid gap-8 md:gap-10 lg:gap-12 lg:grid-cols-2">
          <!-- Contact Info -->
          <div class="space-y-6 md:space-y-8 lg:space-y-10">
            <div>
              <h3 class="mb-6 md:mb-8 text-2xl md:text-3xl font-semibold text-[rgb(39,45,122)]">{{ infoHeading }}</h3>
              <div class="space-y-4 md:space-y-6">
                <div class="flex items-start gap-3 md:gap-5">
                  <div class="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg md:rounded-xl bg-[rgb(39,45,122)]/10 flex-shrink-0">
                    <MapPin :size="20" class="md:w-6 md:h-6 text-[rgb(39,45,122)]" />
                  </div>
                  <div>
                    <p class="mb-1 md:mb-2 text-sm md:text-base font-semibold text-[rgb(39,45,122)]">Adres</p>
                    <p class="text-xs md:text-sm text-[rgb(178,178,178)]">
                      {{ address.line1 }}<br />
                      {{ address.line2 }}
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
                      <a v-for="phone in phones" :key="phone.href" :href="phone.href" class="block text-xs md:text-sm text-[rgb(178,178,178)] transition-colors hover:text-[rgb(39,45,122)]">
                        {{ phone.display }}
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
                    <a :href="email.href" class="text-xs md:text-sm text-[rgb(178,178,178)] transition-colors hover:text-[rgb(39,45,122)] break-all">
                      {{ email.display }}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div>
              <h3 class="mb-4 md:mb-6 text-lg md:text-xl font-semibold text-[rgb(39,45,122)]">{{ socialHeading }}</h3>
              <div class="flex gap-3 md:gap-4">
                <a
                  :href="social.instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/20 bg-white transition-all hover:bg-[rgb(39,45,122)] hover:text-white hover:shadow-lg active:scale-95"
                  aria-label="Instagram"
                >
                  <Instagram :size="20" class="md:w-[22px] md:h-[22px]" />
                </a>
                <a
                  :href="social.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/20 bg-white transition-all hover:bg-[rgb(39,45,122)] hover:text-white hover:shadow-lg active:scale-95"
                  aria-label="LinkedIn"
                >
                  <Linkedin :size="20" class="md:w-[22px] md:h-[22px]" />
                </a>
                <a
                  :href="social.facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/20 bg-white transition-all hover:bg-[rgb(39,45,122)] hover:text-white hover:shadow-lg active:scale-95"
                  aria-label="Facebook"
                >
                  <Facebook :size="20" class="md:w-[22px] md:h-[22px]" />
                </a>
                <a
                  :href="social.whatsapp"
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

          <!-- Map Section -->
          <div class="h-[400px] md:h-[500px] lg:h-full min-h-[450px] rounded-xl md:rounded-2xl border border-[rgb(178,178,178)]/20 bg-white p-2 shadow-lg overflow-hidden">
            <iframe
              :src="googleMapsEmbed"
              class="w-full h-full rounded-lg md:rounded-xl"
              style="border:0;"
              :allowfullscreen="true"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook } from 'lucide-vue-next';

defineProps<{
  sectionBadge: string;
  sectionHeading: string;
  sectionDescription: string;
  infoHeading: string;
  address: { line1: string; line2: string };
  phones: { display: string; href: string }[];
  email: { display: string; href: string };
  socialHeading: string;
  social: { instagram: string; linkedin: string; facebook: string; whatsapp: string };
  googleMapsEmbed: string;
}>();
</script>
