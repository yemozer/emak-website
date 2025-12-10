# YAML Tabanlı Hesap Tabloları Sistemi

## 📋 Genel Bakış

Hesap tabloları artık `calculators.yaml` dosyasından yükleniyor. Bu dosya Türkçe etiketler ve açıklamalarla düzenlenebilir.

## 🗂️ Dosya Yapısı

```
src/data/
├── calculators.yaml          # Düzenlenebilir YAML dosyası (Türkçe)
├── calculators-loader.ts     # YAML'ı TypeScript'e dönüştüren loader
└── calculators.ts           # Ana export dosyası
```

## ✏️ Düzenleme Süreci

### GitHub Web Editörü Kullanımı (Önerilen)

1. **GitHub'da Dosyayı Açın**
   - Repository'ye gidin
   - `emakyapi-website/src/data/calculators.yaml` dosyasını bulun
   - Dosyaya tıklayın

2. **Düzenleme**
   - Sağ üstteki **"Edit"** (kalem ikonu) butonuna tıklayın
   - GitHub'un web editörü açılır
   - Değişikliklerinizi yapın

3. **Kaydetme**
   - Sayfanın altındaki **"Commit changes"** bölümüne gidin
   - Kısa bir açıklama yazın (örn: "Mantolama katsayılarını güncelledim")
   - **"Commit changes"** butonuna tıklayın

4. **Otomatik Yayınlama**
   - Cloudflare Pages otomatik olarak yeni commit'i algılar
   - 1-2 dakika içinde yeni versiyon yayınlanır
   - Web sitesinde değişiklikleri görebilirsiniz

### Alternatif: GitHub Desktop

Daha gelişmiş kullanıcılar için:
1. GitHub Desktop uygulamasını indirin
2. Repository'yi klonlayın
3. `calculators.yaml` dosyasını yerel bir editörle düzenleyin
4. GitHub Desktop'tan commit ve push yapın

## 🔧 YAML Formatı

### Temel Yapı

```yaml
hesaplayicilar:
  - kimlik: benzersiz-id
    baslik: Hesap Tablosu Başlığı
    alt_baslik: Alt Başlık (opsiyonel)
    aciklama: Açıklama metni
    
    girdiler:
      - anahtar: metrekare
        etiket: Metrekare (m²)
        birim: m²
        varsayilan: 10
    
    malzemeler:
      - anahtar: malzeme1
        etiket: Malzeme Adı
        birim: kg
        formul: "metrekare * 4"
    
    notlar:
      - Not 1
      - Not 2
```

### Formül Örnekleri

```yaml
# Basit çarpma
formul: "metrekare * 4"

# Bölme ve çarpma
formul: "metrekare * kalinlik / 100"

# Yuvarlama
formul: "Math.ceil(metrekare * 1.1)"

# Minimum değer
formul: "Math.max(1, Math.ceil(metrekare * 0.1))"
```

### Kullanılabilir Değişkenler

Formüllerde kullanabileceğiniz değişkenler, `girdiler` bölümünde tanımladığınız `anahtar` değerleridir. Örneğin:
- `metrekare` - Metrekare alanı
- `kalinlik` - Kalınlık değeri
- Kendi tanımladığınız diğer girdiler

## ✅ Avantajlar

1. **Teknik Bilgi Gerektirmez**: YAML formatı kolay okunur ve düzenlenir
2. **Türkçe Etiketler**: Tüm alanlar Türkçe isimlendirilmiş
3. **GitHub Versiyon Kontrolü**: Tüm değişiklikler kaydedilir, geri alınabilir
4. **Otomatik Yayınlama**: Cloudflare otomatik deploy yapar
5. **Güvenli**: Sadece matematiksel ifadeler çalıştırılır

## ⚠️ Önemli Notlar

1. **Girintiler**: YAML'da girintiler çok önemlidir. Her seviye 2 boşluk ile girintilenmelidir
2. **Tırnak İşaretleri**: Özel karakterler içeren metinler tırnak içinde olmalıdır
3. **Test**: Değişikliklerden sonra web sitesini kontrol edin
4. **Yedek**: Büyük değişikliklerden önce dosyanın bir kopyasını alın

## 🆘 Sorun Giderme

### YAML Hatası Alıyorsanız

1. Girintileri kontrol edin (her seviye 2 boşluk)
2. Tırnak işaretlerini kontrol edin
3. GitHub'da dosyanın geçmiş versiyonlarına bakın (History butonu)
4. Hatalı bir değişiklik yaptıysanız, eski versiyona geri dönebilirsiniz

### Değişiklikler Görünmüyorsa

1. Cloudflare Pages dashboard'unu kontrol edin
2. Build loglarına bakın
3. 2-3 dakika bekleyin (bazen gecikme olabilir)

## 📚 Daha Fazla Bilgi

Detaylı düzenleme kılavuzu için `HESAPLAYICI_DUZENLEME.md` dosyasına bakın.

