console.log("WhatsApp Translator extension loaded");

console.log("hallelujah1");

// Adding event listener to detect the language selection
const sourceLang = localStorage.getItem("sourceLang") || "en";
const targetLang = localStorage.getItem("targetLang") || "es";
console.log(`Initial source language: ${sourceLang}, target language: ${targetLang}`);

// Function to translate text
async function translateText(text, sourceLang, targetLang) {
    console.log("Attempting to translate:", text);
    const apiKey = // Your RapidAPI key
    const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';

    try {
        // Detect language first (if needed)
        const detectUrl = 'https://deep-translate1.p.rapidapi.com/language/translate/v2/detect';
        const detectionOptions = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ q: text }) // Send the text to be detected
        };

        const detectResponse = await fetch(detectUrl, detectionOptions);
        if (!detectResponse.ok) {
            console.error("Language detection error:", detectResponse.status);
            return text; // Return original text if detection fails
        }

        const detectionResult = await detectResponse.json();
        const detectedLang = detectionResult.data.detections[0].language; // Get the detected language

        // Prepare translation request
        const translationOptions = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q: text,
                source: detectedLang,
                target: targetLang,
                format: "text"
            })
        };

        // Send translation request
        const response = await fetch(url, translationOptions);
        if (!response.ok) {
            // Check if the response indicates exceeding the quota
            if (response.status === 429) {
                const errorResult = await response.json();
                if (errorResult.message.includes("exceeded the MONTHLY quota")) {
                    alert("You have exceeded the MONTHLY quota for Characters on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/gatzuma/api/deep-translate1");
                } else {
                    console.error("Translation API error:", response.status);
                }
            }
            return text; // Return original text if translation fails
        }

        const result = await response.json();
        console.log("Full translation response:", result); // Log the full result object

        // Extract translated text from the response
        const translatedText = result.data.translations.translatedText || text;
        console.log("Translation successful:", translatedText);
        return translatedText;
    } catch (error) {
        console.error("Error during translation:", error);
        return text; // Return original text if there's an error
    }
}

// Function to modify WhatsApp messages and translate them
function modifyWhatsAppMessages() {
    const messages = document.querySelectorAll('.copyable-text');
    console.log(`Found ${messages.length} messages to process.`);

    messages.forEach((message) => {
        const originalText = message.innerText;
        console.log("Original message text:", originalText);

        translateText(originalText, sourceLang, targetLang).then((translatedText) => {
            if (translatedText !== originalText) {
                console.log("Updating message with translated text");
                message.innerText = translatedText; // Update message in DOM
            } else {
                console.log("No need to update, text is already in the target language or translation failed.");
            }
        });
    });
}

// Monitor new messages being added to the chat
const observer = new MutationObserver(() => {
    console.log("Mutation detected - new messages might have been added");
    modifyWhatsAppMessages();
});

// Function to observe the chat container once it's available
function waitForChatContainer() {
    const chatContainer = document.querySelector('#pane-side');
    if (chatContainer) {
        console.log("Starting MutationObserver on the chat container");
        observer.observe(chatContainer, { childList: true, subtree: true });

        // Initialize by modifying existing messages
        modifyWhatsAppMessages();
    } else {
        console.log("Chat container not found yet, retrying...");
        setTimeout(waitForChatContainer, 1000); // Retry after 1 second if not found
    }
}

// Start checking for the chat container
waitForChatContainer();



// // Language selection and translation logic
// console.log("WhatsApp Translator extension loaded");

// console.log("hallelujah1");
// document.addEventListener("DOMContentLoaded", () => {
// console.log("hallelujah2");
    
//     console.log("DOM fully loaded and parsed");

//     // Adding event listener to detect the language selection
//     const sourceLang = localStorage.getItem("sourceLang") || "en";
//     const targetLang = localStorage.getItem("targetLang") || "es";
//     console.log(`Initial source language: ${sourceLang}, target language: ${targetLang}`);

//     // Function to translate text
//     async function translateText(text, sourceLang, targetLang) {
//         console.log("Attempting to translate:", text);
//         try {
//             const response = await fetch(`https://translation-api.com/translate`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ text, sourceLang, targetLang })
//             });

//             if (!response.ok) {
//                 console.error("Translation API error:", response.status);
//                 return text; // Return original text if translation fails
//             }

//             const result = await response.json();
//             console.log("Translation successful:", result.translatedText);
//             return result.translatedText;
//         } catch (error) {
//             console.error("Error during translation:", error);
//             return text; // Return original text if there's an error
//         }
//     }

//     // Function to modify WhatsApp messages and translate them
//     function modifyWhatsAppMessages() {
//         const messages = document.querySelectorAll('.copyable-text');
//         console.log(`Found ${messages.length} messages to process.`);

//         messages.forEach((message) => {
//             const originalText = message.innerText;
//             console.log("Original message text:", originalText);

//             translateText(originalText, sourceLang, targetLang).then((translatedText) => {
//                 if (translatedText !== originalText) {
//                     console.log("Updating message with translated text");
//                     message.innerText = translatedText; // Update message in DOM
//                 } else {
//                     console.log("No need to update, text is already in the target language or translation failed.");
//                 }
//             });
//         });
//     }

//     // Monitor new messages being added to the chat
//     const observer = new MutationObserver(() => {
//         console.log("Mutation detected - new messages might have been added");
//         modifyWhatsAppMessages();
//     });

//     const chatContainer = document.querySelector('#pane-side');
//     if (chatContainer) {
//         console.log("Starting MutationObserver on the chat container");
//         observer.observe(chatContainer, { childList: true, subtree: true });
//     } else {
//         console.error("Chat container not found!");
//     }

//     // Initialize by modifying existing messages
//     modifyWhatsAppMessages();
// });
