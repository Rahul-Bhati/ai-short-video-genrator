/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
        {
            role: "user",
            parts: [
                { text: "write a script to genrate 30 seconds video on topic : interesting historical story along with Ai Image prompt in Realistic format for each scene and give me result in json format with ImagePrompt and ContentText as field" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n[\n  {\n    \"ImagePrompt\": \"A bustling marketplace in ancient Rome, with vendors selling food, clothes, and pottery. The scene is vibrant and colorful, with people from all walks of life interacting.\",\n    \"ContentText\": \"Imagine a world where gladiators battled in massive arenas, emperors ruled with an iron fist, and the streets were filled with the clamor of commerce. Welcome to ancient Rome, a civilization that continues to fascinate us today.\"\n  },\n  {\n    \"ImagePrompt\": \"A portrait of Julius Caesar, looking stern and powerful, wearing a laurel wreath on his head.\",\n    \"ContentText\": \"At the heart of this empire was Julius Caesar, a military genius and ambitious leader who rose to become the most powerful man in Rome.\"\n  },\n  {\n    \"ImagePrompt\": \"A dramatic scene of Caesar's assassination, with senators surrounding him, stabbing him with daggers.\",\n    \"ContentText\": \"But Caesar's reign was cut short by a shocking act of betrayal - his assassination by a group of senators who feared his power.\"\n  },\n  {\n    \"ImagePrompt\": \"A Roman legion marching across a dusty battlefield, with shields and swords glinting in the sun.\",\n    \"ContentText\": \"Despite his death, Caesar's legacy lived on. The Roman Empire continued to expand, conquering vast territories and building impressive infrastructure.\"\n  },\n  {\n    \"ImagePrompt\": \"The Colosseum in Rome, depicted as a magnificent amphitheater, filled with spectators cheering at a gladiatorial fight.\",\n    \"ContentText\": \"The Romans were renowned for their engineering prowess, as seen in the Colosseum, a colossal amphitheater where gladiators entertained the masses.\"\n  },\n  {\n    \"ImagePrompt\": \"A Roman soldier standing guard at the city gates, wearing armor and holding a spear.\",\n    \"ContentText\": \"The Roman Empire was a force to be reckoned with, and its military might was unmatched in the ancient world.\"\n  },\n  {\n    \"ImagePrompt\": \"A map of the Roman Empire at its peak, showing its vast size and reach across Europe, North Africa, and the Middle East.\",\n    \"ContentText\": \"At its peak, the Roman Empire stretched across Europe, North Africa, and the Middle East, encompassing millions of people and diverse cultures.\"\n  },\n  {\n    \"ImagePrompt\": \"A crumbling Roman ruin, overgrown with vines, suggesting the passage of time and the eventual fall of the empire.\",\n    \"ContentText\": \"But like all empires, Rome's reign eventually came to an end, leaving behind a legacy that continues to shape the world we live in today.\"\n  }\n]\n```\n\n**Explanation:**\n\nThis JSON file contains eight objects, each representing a scene in the 30-second video. \n\n* **ImagePrompt:** This field provides the text prompt for the AI image generator. It describes the scene, including details like location, characters, objects, and mood. \n* **ContentText:** This field provides the narration for the scene, describing the historical event or information related to the image.\n\n**Using the JSON:**\n\nYou can use this JSON data with an AI image generator like DALL-E 2 or Midjourney to create images for each scene. Then, you can use video editing software to combine the images with the corresponding narration to create the 30-second historical video.\n\n**Note:**\n\nThis script provides a basic outline for a 30-second video. You can adjust the scenes, prompts, and narration to create a video that aligns with your specific historical story and desired style. \n" },
            ],
        },
    ],
});
