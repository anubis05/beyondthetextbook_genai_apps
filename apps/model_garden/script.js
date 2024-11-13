// Model information with icons, descriptions, features, and links
const models = {
    gemini: {
        name: "Gemini",
        description: "Gemini: Google’s smart, all-around model that’s great at multitasking and creativity!",
        features: [
            "<span class='feature-label'>Parameter Size:</span> ~1T (trillion!)",
            "<span class='feature-label'>Multimodal:</span> Yes! It understands both text and images.",
            "<span class='feature-label'>Strengths:</span> Creativity and efficiency in generating detailed responses.",
            "<span class='feature-label'>Created by:</span> Google DeepMind"
        ],
        link: "https://www.deepmind.com/gemini",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Google_Material_Design_Logo.svg/1024px-Google_Material_Design_Logo.svg.png"
    },
    openai: {
        name: "OpenAI",
        description: "OpenAI’s GPT-4 and DALL-E models are like versatile artists – strong in language, creativity, and vision!",
        features: [
            "<span class='feature-label'>Parameter Size:</span> Estimated 170B (GPT-4) and specialized sizes for DALL-E",
            "<span class='feature-label'>Multimodal:</span> Yes! Both models handle text and images.",
            "<span class='feature-label'>Strengths:</span> Conversational and creative capabilities, image generation.",
            "<span class='feature-label'>Created by:</span> OpenAI"
        ],
        link: "https://www.openai.com/research",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
    },
    claude: {
        name: "Claude",
        description: "Claude by Anthropic is all about safety first – designed to be helpful and cautious.",
        features: [
            "<span class='feature-label'>Parameter Size:</span> Confidential",
            "<span class='feature-label'>Multimodal:</span> No, text-based only.",
            "<span class='feature-label'>Strengths:</span> Focused on ethical and safe responses.",
            "<span class='feature-label'>Created by:</span> Anthropic"
        ],
        link: "https://www.anthropic.com/claude",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Anthropic_logo.svg/1024px-Anthropic_logo.svg.png"
    },
    anthropic: {
        name: "Anthropic",
        description: "Anthropic's mission is to create AI that’s safe and easygoing, no drama here!",
        features: [
            "<span class='feature-label'>Parameter Size:</span> Confidential",
            "<span class='feature-label'>Multimodal:</span> No, text-based only.",
            "<span class='feature-label'>Strengths:</span> Ethical AI and controlled outputs.",
            "<span class='feature-label'>Created by:</span> Anthropic"
        ],
        link: "https://www.anthropic.com",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Anthropic_logo.svg/1024px-Anthropic_logo.svg.png"
    },
    llama: {
        name: "LLaMA",
        description: "Meta’s LLaMA is the friendly model open to all researchers!",
        features: [
            "<span class='feature-label'>Parameter Size:</span> Ranges from 7B to 65B",
            "<span class='feature-label'>Multimodal:</span> No, text-based only.",
            "<span class='feature-label'>Strengths:</span> Open access for research and community use.",
            "<span class='feature-label'>Created by:</span> Meta AI"
        ],
        link: "https://ai.facebook.com/research/",
        icon: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Meta_Platforms_Inc._logo.svg"
    },
    mistral: {
        name: "Mistral",
        description: "Mistral, a new kid on the block, is here to change the game with open-source AI!",
        features: [
            "<span class='feature-label'>Parameter Size:</span> 7B (efficient and speedy!)",
            "<span class='feature-label'>Multimodal:</span> No, text-based only.",
            "<span class='feature-label'>Strengths:</span> High efficiency in a smaller model size.",
            "<span class='feature-label'>Created by:</span> Mistral AI"
        ],
        link: "https://mistral.ai/",
        icon: "https://mistral.ai/static/favicon.svg"
    },
    palm: {
        name: "PaLM",
        description: "PaLM is Google’s powerful model with loads of knowledge and skills to share!",
        features: [
            "<span class='feature-label'>Parameter Size:</span> Up to 540B",
            "<span class='feature-label'>Multimodal:</span> No, but incredibly knowledgeable in various topics.",
            "<span class='feature-label'>Strengths:</span> Great for deep language understanding and knowledge tasks.",
            "<span class='feature-label'>Created by:</span> Google"
        ],
        link: "https://ai.googleblog.com/",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png"
    },
    dalle: {
        name: "DALL-E",
        description: "DALL-E by OpenAI is an image generation model, great at creating visuals from text prompts!",
        features: [
            "<span class='feature-label'>Parameter Size:</span> Specialized (exact size confidential)",
            "<span class='feature-label'>Multimodal:</span> Yes! It generates images from text prompts.",
            "<span class='feature-label'>Strengths:</span> Creativity in visual arts, highly detailed images.",
            "<span class='feature-label'>Created by:</span> OpenAI"
        ],
        link: "https://www.openai.com/dall-e",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
    },
    stability: {
        name: "Stability AI",
        description: "Stability AI develops open-source image generation models, including Stable Diffusion.",
        features: [
            "<span class='feature-label'>Parameter Size:</span> Variable, depending on model version",
            "<span class='feature-label'>Multimodal:</span> Yes! Primarily image generation.",
            "<span class='feature-label'>Strengths:</span> Flexible and open-source image generation.",
            "<span class='feature-label'>Created by:</span> Stability AI"
        ],
        link: "https://stability.ai/",
        icon: "https://stability.ai/static/images/favicon/favicon.svg"
    }
};

// Model information with icons, descriptions, features, and links (existing code remains the same)

// Show model info
function showInfo(modelKey) {
    const model = models[modelKey];
    document.getElementById("model-name").textContent = model.name;
    document.getElementById("model-description").textContent = model.description;
    document.getElementById("model-icon").src = model.icon;

    // Populate the features list
    const featuresList = document.getElementById("model-features");
    featuresList.innerHTML = ""; // Clear previous features
    model.features.forEach(feature => {
        const listItem = document.createElement("li");
        listItem.innerHTML = feature; // Use innerHTML to allow styled text
        featuresList.appendChild(listItem);
    });

    // Update link
    document.getElementById("model-link").href = model.link;
    document.getElementById("model-link").textContent = "Try or Learn More";

    // Show the info box and ensure the content container is visible
    document.querySelector(".content-container").style.display = "flex";
    document.getElementById("info-box").style.display = "block";

    // Ensure the "Show All Models" button is visible
    document.getElementById("show-all-text").style.display = "block";
}

// Toggle model panel visibility
function toggleModelPanel() {
    const panel = document.getElementById("model-panel");
    const showAllText = document.getElementById("show-all-text");
    if (panel.style.display === "none" || panel.style.display === "") {
        panel.style.display = "flex";
        showAllText.textContent = "Hide All Models";
    } else {
        panel.style.display = "none";
        showAllText.textContent = "Show All Models";
    }
}

// Close info box
function closeInfo() {
    document.getElementById("info-box").style.display = "none";
}

// Show a random model info
function showRandomModel() {
    // Display the content container for the first interaction
    document.querySelector(".content-container").style.display = "flex";

    const modelKeys = Object.keys(models);
    const randomModelKey = modelKeys[Math.floor(Math.random() * modelKeys.length)];
    showInfo(randomModelKey);
}

// Open game in an iframe
function openGame() {
    const gameContainer = document.getElementById("game-container");
    const gameIframe = document.getElementById("game-iframe");
    gameIframe.src = "../model_garden_game/index.html";
    gameContainer.style.display = "block";
}

// Close the game iframe
function closeGame() {
    const gameContainer = document.getElementById("game-container");
    const gameIframe = document.getElementById("game-iframe");
    gameIframe.src = ""; // Clear the source to stop the game
    gameContainer.style.display = "none";
}