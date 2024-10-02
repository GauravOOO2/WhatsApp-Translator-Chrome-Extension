// popup.js

document.getElementById("save-languages").addEventListener("click", () => {
    const sourceLanguage = document.getElementById("source-language").value;
    const targetLanguage = document.getElementById("target-language").value;

    chrome.storage.sync.set({ sourceLang: sourceLanguage, targetLang: targetLanguage }, () => {
        console.log("Preferred languages saved:", sourceLanguage, targetLanguage);
        alert("Preferred languages saved successfully!"); // Confirmation popup
    });
});

// Load the saved languages when the popup opens
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(['sourceLang', 'targetLang'], (data) => {
        document.getElementById("source-language").value = data.sourceLang || 'es'; // Default to Spanish
        document.getElementById("target-language").value = data.targetLang || 'en'; // Default to English
        console.log("Loaded saved languages:", data.sourceLang, data.targetLang);
    });
});
