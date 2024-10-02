# WhatsApp Translator Chrome Extension

This Chrome extension enhances WhatsApp Web by translating chat messages between different languages using the [Deep Translate API](https://rapidapi.com/gatzuma/api/deep-translate1). The extension detects the language of the original messages and translates them into the target language specified by the user.

## Features

- Automatically translates WhatsApp messages in real-time.
- Detects the language of the incoming message before translating.
- Supports customizable source and target languages stored locally in `localStorage`.
- Uses [Deep Translate API](https://rapidapi.com/gatzuma/api/deep-translate1) for translation.
- Displays an alert if the API quota is exceeded.

## Prerequisites

Before installing and running the extension, ensure you have the following:

- Google Chrome (latest version)
- RapidAPI account (for translation services)

## Setup and Installation

1. **Clone the Repository**

```bash
git clone https://github.com/GauravOOO2/WhatsApp-Translator-Chrome-Extension.git
```


2. **Install Dependencies**
No external dependencies are required for this project.

3. **Get API Key**
- Sign up for an account on [RapidAPI](https://rapidapi.com/).
- Subscribe to the [Deep Translate API](https://rapidapi.com/gatzuma/api/deep-translate1).
- Replace the `apiKey` in `content.js` with your own RapidAPI key.

4. **Modify Source/Target Languages (Optional)**
- Default source language: `en` (English)
- Default target language: `es` (Spanish)
- You can modify these defaults by editing your localStorage directly via Chrome Developer Tools:
  ```js
  localStorage.setItem('sourceLang', 'en'); // or any other language code
  localStorage.setItem('targetLang', 'es'); // or any other language code
  ```

5. **Load Extension into Chrome**
- Open Chrome and navigate to `chrome://extensions/`.
- Enable "Developer mode" using the toggle in the upper right corner.
- Click "Load unpacked" and select the project folder.

6. **Start Using the Extension**
- Open [WhatsApp Web](https://web.whatsapp.com).
- The extension will automatically detect and translate messages based on the selected source and target languages.

## Optimizations

1. **Debouncing API Calls**
- To avoid excessive API calls when new messages are rapidly added, debouncing is used. This ensures the translation function is triggered only after a short delay (e.g., 500ms) of inactivity, reducing redundant requests and improving performance.

2. **Caching Translations**
- A caching mechanism stores translations for previously processed texts. This prevents unnecessary API calls by retrieving translations from memory for repeated texts, further optimizing performance.



## Error Handling

- If the monthly quota for characters in the free plan is exceeded, you will receive the following message:

* You have exceeded the MONTHLY quota for Characters on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/gatzuma/api/deep-translate1 

This message will be shown as an alert to inform you that you need to upgrade your plan on RapidAPI.

## Code Structure

- `manifest.json`: Chrome extension configuration file.
- `content.js`: Main logic of the extension, including message detection, language detection, and translation functions.
- `icons/`: Icons for the Chrome extension.

## Usage

- The extension will automatically detect all incoming and outgoing messages in the WhatsApp Web interface and translate them into the target language.
- You can change the source and target language by modifying the values in localStorage or by directly updating the `content.js` file.

## API Details

The extension uses the following endpoints from the [Deep Translate API](https://rapidapi.com/gatzuma/api/deep-translate1):

1. **Language Detection Endpoint**  
 Detects the language of a given text.
 - Method: `POST`
 - URL: `https://deep-translate1.p.rapidapi.com/language/translate/v2/detect`

2. **Translation Endpoint**  
 Translates text from one language to another.
 - Method: `POST`
 - URL: `https://deep-translate1.p.rapidapi.com/language/translate/v2`

## Limitations

- The extension currently works only on WhatsApp Web.
- Translation services depend on the monthly API quota provided by the free plan on RapidAPI.

## Future Improvements

- Add a UI to select source and target languages instead of manually modifying localStorage.
- Support for multiple messaging platforms (e.g., Telegram, Slack).
- Implement caching for repeated translations to reduce API usage.

