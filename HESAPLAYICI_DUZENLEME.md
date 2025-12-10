# Hesap Tabloları Düzenleme Kılavuzu

Bu kılavuz, hesap tablolarını düzenlemek için gereken adımları açıklar. Teknik bilgi gerektirmez!

## 📝 Hesap Tablolarını Düzenleme

### 1. GitHub'da Dosyayı Açın

1. Tarayıcınızda GitHub repository'nize gidin
2. `emakyapi-website/src/data/calculators.yaml` dosyasını bulun
3. Dosyaya tıklayın

### 2. Dosyayı Düzenleyin

1. Sağ üst köşedeki **"Edit"** (veya kalem ikonu) butonuna tıklayın
2. GitHub'un web editörü açılacak
3. İstediğiniz değişiklikleri yapın (aşağıdaki örnekleri inceleyin)

### 3. Değişiklikleri Kaydedin

1. Sayfanın en altına gidin
2. **"Commit changes"** bölümünde kısa bir açıklama yazın (örn: "Mantolama katsayılarını güncelledim")
3. **"Commit changes"** butonuna tıklayın
4. Cloudflare otomatik olarak yeni versiyonu yayınlayacak (1-2 dakika sürer)

## 🧮 Formül Yazma

### Temel Matematik

- `+` : Toplama
- `-` : Çıkarma  
- `*` : Çarpma
- `/` : Bölme
- `()` : Parantez (öncelik için)

### Örnekler

```yaml
# Metrekare çarpı 4
formul: "metrekare * 4"

# Metrekare çarpı kalınlık bölü 100
formul: "metrekare * kalinlik / 100"

# Parantez kullanımı
formul: "metrekare * (kalinlik + 2) / 100"
```

### Kullanılabilir Değişkenler

Formüllerde kullanabileceğiniz değişkenler, `girdiler` bölümünde tanımladığınız `anahtar` değerleridir:

- `metrekare` - Metrekare alanı
- `kalinlik` - Kalınlık değeri
- Diğer girdilerinizin `anahtar` değerleri

### Özel Fonksiyonlar

- `Math.ceil(...)` : Yukarı yuvarla (örn: 1.2 → 2)
- `Math.floor(...)` : Aşağı yuvarla (örn: 1.8 → 1)
- `Math.round(...)` : En yakına yuvarla (örn: 1.5 → 2)
- `Math.max(1, ...)` : En az 1 olsun (örn: 0.5 → 1)
- `Math.min(100, ...)` : En fazla 100 olsun

### Örnekler

```yaml
# Yukarı yuvarla ve en az 1 olsun
formul: "Math.max(1, Math.ceil(metrekare * 1.1))"

# Aşağı yuvarla
formul: "Math.floor(metrekare * 2.5)"
```

## 📋 Yeni Hesap Tablosu Ekleme

`calculators.yaml` dosyasına yeni bir bölüm ekleyin:

```yaml
hesaplayicilar:
  # Mevcut hesaplayıcılar...
  
  # YENİ HESAPLAYICI
  - kimlik: yeni-hesaplayici
    baslik: Yeni Hesap Tablosu
    alt_baslik: Alt Başlık (opsiyonel)
    aciklama: Bu hesaplayıcı ne işe yarar?
    
    girdiler:
      - anahtar: metrekare
        etiket: Metrekare
        birim: m²
        varsayilan: 10
    
    malzemeler:
      - anahtar: malzeme1
        etiket: Malzeme Adı
        birim: kg
        formul: "metrekare * 5"
    
    notlar:
      - İlk not
      - İkinci not
```

## 🔧 Katsayıları Değiştirme

Katsayıları değiştirmek için formüldeki sayıları düzenleyin:

```yaml
# Eski: 4 kg/m²
formul: "metrekare * 4"

# Yeni: 5 kg/m²
formul: "metrekare * 5"
```

## ➕ Yeni Malzeme Ekleme

Bir hesaplayıcının `malzemeler` bölümüne yeni satır ekleyin:

```yaml
malzemeler:
  # Mevcut malzemeler...
  
  - anahtar: yeni-malzeme
    etiket: Yeni Malzeme Adı
    birim: kg
    formul: "metrekare * 3"
    ipucu: Açıklama   # Opsiyonel: alt bilgi
```

## ❌ Malzeme Silme

Bir malzemeyi silmek için, o malzemenin tüm satırlarını (anahtar, etiket, birim, formul vb.) silin.

## ⚠️ Önemli Notlar

1. **YAML Formatı**: Girintilere dikkat edin! Her seviye 2 boşluk ile girintilenmelidir
2. **Tırnak İşaretleri**: Özel karakterler içeren metinler tırnak içinde olmalıdır
3. **Test**: Değişikliklerden sonra web sitesini kontrol edin
4. **Yedek**: Büyük değişikliklerden önce dosyanın bir kopyasını alın

## 🆘 Yardım

Sorun yaşarsanız:
1. GitHub'da dosyanın geçmiş versiyonlarına bakın (History butonu)
2. Hatalı bir değişiklik yaptıysanız, eski versiyona geri dönebilirsiniz
3. Teknik destek için geliştirici ekiple iletişime geçin

## 📱 Mobil Düzenleme

GitHub mobil uygulamasından da düzenleme yapabilirsiniz, ancak web tarayıcısı daha kolaydır.

