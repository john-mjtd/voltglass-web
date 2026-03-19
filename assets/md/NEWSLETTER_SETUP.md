# 📧 Nastavení Newsletter formuláře s Google Sheets

## Krok 1: Vytvoř Google Sheet

1. Jdi na [Google Sheets](https://sheets.google.com)
2. Vytvoř nový spreadsheet s názvem **"VoltGlass Newsletter"**
3. V prvním řádku vytvoř hlavičky:
   - A1: `Datum`
   - B1: `E-mail`
   - C1: `Zájmy`
   - D1: `GDPR Souhlas`
   - E1: `Zdroj`

## Krok 2: Nastav Google Apps Script

1. V Google Sheets klikni na **Rozšíření** → **Apps Script**
2. Smaž výchozí kód a vlož tento:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Format timestamp
    var timestamp = new Date(data.timestamp);
    var formattedDate = Utilities.formatDate(timestamp, "Europe/Prague", "dd.MM.yyyy HH:mm:ss");
    
    // Append row to sheet
    sheet.appendRow([
      formattedDate,
      data.email,
      data.interests,
      data.gdprConsent ? 'Ano' : 'Ne',
      data.source
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'message': 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function
function testPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        email: 'test@example.com',
        interests: 'product, investment',
        gdprConsent: true,
        timestamp: new Date().toISOString(),
        source: 'voltglass.cz'
      })
    }
  };
  
  var result = doPost(testData);
  Logger.log(result.getContent());
}
```

3. Klikni na **Uložit** (ikona diskety)
4. Pojmenuj projekt: **"VoltGlass Newsletter Handler"**

## Krok 3: Publikuj jako Web App

1. Klikni na **Nasadit** → **Nové nasazení**
2. Klikni na ikonu ozubeného kola ⚙️ → vyber **Webová aplikace**
3. Nastav:
   - **Popis**: "VoltGlass Newsletter API"
   - **Spustit jako**: Já (tvůj účet)
   - **Kdo má přístup**: Kdokoli
4. Klikni **Nasadit**
5. **Autorizuj přístup** (první nasazení vyžaduje povolení)
6. **Zkopíruj URL** webové aplikace (vypadá jako: `https://script.google.com/macros/s/AKfycby.../exec`)

## Krok 4: Aktualizuj JavaScript

1. Otevři soubor: `assets/js/newsletter.js`
2. Najdi řádek:
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Nahraď `YOUR_GOOGLE_SCRIPT_URL_HERE` za URL, které jsi zkopíroval v kroku 3
4. Ulož soubor

## Krok 5: Otestuj formulář

1. Otevři web v prohlížeči
2. Vyplň e-mail a vyber zájmy
3. Odešli formulář
4. Zkontroluj Google Sheet - měl by se objevit nový řádek s daty

## 🎉 Hotovo!

Formulář teď odesílá data do Google Sheets. Každý nový odběratel se automaticky přidá do tabulky.

## 📊 Další možnosti

### Export do CSV
V Google Sheets: **Soubor** → **Stáhnout** → **CSV**

### Automatické e-maily
Můžeš přidat Apps Script trigger, který pošle automatický e-mail po přidání nového řádku.

### Integrace s Mailchimp
Můžeš vytvořit další Apps Script, který automaticky přidá e-mail do Mailchimp.

## 🔒 Bezpečnost

- Apps Script běží pod tvým Google účtem
- Data jsou uložena v tvém Google Drive
- Nikdo jiný nemá přístup k datům (pokud nesdílíš Sheet)
- GDPR compliant - data jsou pod tvou kontrolou

## 🆘 Řešení problémů

**Formulář neodesílá data:**
1. Zkontroluj, že jsi správně zkopíroval URL
2. Zkontroluj, že Apps Script je publikovaný jako "Kdokoli"
3. Otevři konzoli prohlížeče (F12) a hledej chyby

**Chyba autorizace:**
1. Znovu publikuj Apps Script
2. Ujisti se, že jsi autorizoval přístup k Sheets

**Data se neobjevují v Sheets:**
1. Zkontroluj, že máš správné jméno sloupců v řádku 1
2. Spusť testovací funkci `testPost()` v Apps Script editoru
