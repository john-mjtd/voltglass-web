# 📊 Google Analytics Setup

## Krok 1: Vytvoř Google Analytics účet

1. Jdi na [Google Analytics](https://analytics.google.com/)
2. Klikni na **"Start measuring"** nebo **"Začít měřit"**
3. Vytvoř **Account** (účet) - např. "VoltGlass"
4. Vytvoř **Property** (vlastnost) - např. "VoltGlass Website"
5. Vyplň informace o webu:
   - **Website name**: VoltGlass
   - **Website URL**: https://voltglass.cz
   - **Industry category**: Manufacturing nebo Technology
   - **Time zone**: (GMT+01:00) Prague

## Krok 2: Získej Measurement ID

Po vytvoření property dostaneš **Measurement ID** ve formátu:
```
G-XXXXXXXXXX
```

Například: `G-ABC123DEF4`

## Krok 3: Aktualizuj kód

### V souboru `index.html` (řádek 27):
Nahraď `G-XXXXXXXXXX` za své skutečné Measurement ID:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF4"></script>
```

### V souboru `assets/js/cookies.js` (řádek 67):
Nahraď `G-XXXXXXXXXX` za své skutečné Measurement ID:

```javascript
gtag('config', 'G-ABC123DEF4', {
  'anonymize_ip': true,
  'cookie_flags': 'SameSite=None;Secure'
});
```

## Krok 4: Testování

1. Nahraj web na server
2. Otevři web v prohlížeči
3. Přijmi cookies v cookie banneru
4. Otevři Google Analytics dashboard
5. Jdi na **Realtime** → měl bys vidět svou návštěvu

## 🔒 GDPR Compliance

Implementace je **GDPR compliant**:
- ✅ Analytics se spouští **pouze po souhlasu** uživatele
- ✅ **Anonymizace IP** adres (`anonymize_ip: true`)
- ✅ Cookie banner s možností **odmítnout**
- ✅ Odkaz na **zásady ochrany údajů**
- ✅ Možnost **odvolat souhlas** (smazat cookies)

## 📈 Co můžeš sledovat

Po nastavení uvidíš:
- **Počet návštěvníků** (realtime i historické)
- **Zdroje návštěvnosti** (Google, přímý vstup, sociální sítě)
- **Nejnavštěvovanější stránky**
- **Demografické údaje** (země, město, jazyk)
- **Zařízení** (desktop, mobil, tablet)
- **Chování uživatelů** (jak dlouho zůstávají, co klikají)

## 🎯 Custom Events

Můžeš sledovat i specifické akce, například:

### Newsletter signup (už implementováno v newsletter.js):
```javascript
gtag('event', 'newsletter_signup', {
  'event_category': 'engagement',
  'event_label': 'newsletter'
});
```

### Přidání dalších eventů:
```javascript
// Kliknutí na tlačítko
gtag('event', 'button_click', {
  'event_category': 'engagement',
  'event_label': 'zjistit_vice'
});

// Scrollování na sekci
gtag('event', 'scroll_to_section', {
  'event_category': 'engagement',
  'event_label': 'partnership'
});
```

## 🔧 Troubleshooting

### Analytics nefunguje?
1. Zkontroluj, že jsi **přijal cookies** v banneru
2. Zkontroluj **konzoli** (F12) - měl bys vidět "Analytics initialized"
3. Zkontroluj, že máš správné **Measurement ID** (začíná na `G-`)
4. Počkej **24 hodin** - data se někdy zobrazují se zpožděním

### Jak ověřit, že to funguje?
1. Otevři web
2. Stiskni **F12** → **Console**
3. Měl bys vidět: `"Analytics initialized"` a `"Google Analytics configured"`
4. V Network tabu (F12) hledej požadavky na `google-analytics.com`

## 📝 Poznámky

- **Measurement ID** najdeš v Google Analytics: **Admin** → **Data Streams** → **Web**
- První data se mohou objevit až po **24-48 hodinách**
- **Realtime** data by měla fungovat okamžitě
- Pro testování použij **incognito mode** (aby se nepočítaly tvé vlastní návštěvy)
