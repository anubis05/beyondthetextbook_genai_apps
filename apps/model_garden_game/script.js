const models = {
    gemini: {
        name: "Gemini",
        description: "Gemini is Google’s smart, versatile model with a knack for multitasking and creativity!",
        features: {
            "Parameter Size": "~1T (trillion!)",
            "Multimodal": "Yes",
            "Open Source": "No",
            "Strengths": "Creative generation and detailed responses."
        },
        link: "https://www.deepmind.com/gemini",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Google_Material_Design_Logo.svg/1024px-Google_Material_Design_Logo.svg.png"
    },
    openai: {
        name: "OpenAI",
        description: "OpenAI’s GPT-4 and DALL-E are versatile models that excel in language, creativity, and vision.",
        features: {
            "Parameter Size": "170B",
            "Multimodal": "Yes",
            "Open Source": "No",
            "Strengths": "Language understanding, problem-solving, and image generation."
        },
        link: "https://www.openai.com/research",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
    },
    claude: {
        name: "Claude",
        description: "Claude by Anthropic is built with safety in mind – friendly, helpful, and cautious.",
        features: {
            "Parameter Size": "Confidential",
            "Multimodal": "No",
            "Open Source": "No",
            "Strengths": "Focused on ethical and safe responses."
        },
        link: "https://www.anthropic.com/claude",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Anthropic_logo.svg/1024px-Anthropic_logo.svg.png"
    },
    llama: {
        name: "LLaMA",
        description: "Meta’s LLaMA is an open model made accessible to researchers for free exploration!",
        features: {
            "Parameter Size": "7B to 65B",
            "Multimodal": "No",
            "Open Source": "Yes",
            "Strengths": "Open access and community-driven research."
        },
        link: "https://ai.facebook.com/research/",
        icon: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Meta_Platforms_Inc._logo.svg"
    },
    mistral: {
        name: "Mistral",
        description: "Mistral is a high-efficiency, smaller model that brings open-source AI to new heights.",
        features: {
            "Parameter Size": "7B",
            "Multimodal": "No",
            "Open Source": "Yes",
            "Strengths": "Small, fast, and efficient for diverse applications."
        },
        link: "https://mistral.ai/",
        icon: "https://mistral.ai/static/favicon.svg"
    },
    palm: {
        name: "PaLM",
        description: "PaLM is Google’s powerful language model with a vast knowledge base.",
        features: {
            "Parameter Size": "540B",
            "Multimodal": "No",
            "Open Source": "No",
            "Strengths": "Deep language understanding and vast knowledge."
        },
        link: "https://ai.googleblog.com/",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png"
    },
    dalle: {
        name: "DALL-E",
        description: "DALL-E by OpenAI is a creative model that turns text prompts into stunning visuals.",
        features: {
            "Parameter Size": "Specialized (confidential)",
            "Multimodal": "Yes",
            "Open Source": "No",
            "Strengths": "Artistic creativity and detailed image generation."
        },
        link: "https://www.openai.com/dall-e",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
    },
    stability: {
        name: "Stability AI",
        description: "Stability AI supports open-source image generation models like Stable Diffusion.",
        features: {
            "Parameter Size": "Varies by model",
            "Multimodal": "Yes",
            "Open Source": "Yes",
            "Strengths": "Flexible, high-quality image generation."
        },
        link: "https://stability.ai/",
        icon: "https://stability.ai/static/images/favicon/favicon.svg"
    }
};

let currentModel;
let correctAnswer;
let tryLink;

// Start the game
function startGame() {
    document.getElementById("start-game-button").style.display = "none";
    document.getElementById("result-box").style.display = "none";
    document.getElementById("question-box").style.display = "block";
    askQuestion();
}

// Ask a question about a random model
function askQuestion() {
    const modelKeys = Object.keys(models);
    const randomKey = modelKeys[Math.floor(Math.random() * modelKeys.length)];
    currentModel = models[randomKey];
    
    document.getElementById("model-icon").src = currentModel.icon;

    // Choose a random feature to ask about
    const questionTypes = ["Parameter Size", "Multimodal", "Open Source", "Strengths"];
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    correctAnswer = currentModel.features[questionType];

    // Set up question and options
    document.getElementById("question-title").textContent = generateQuestionText(questionType, currentModel.name);
    generateOptions(questionType);
}

// Generate custom question text
function generateQuestionText(type, modelName) {
    switch(type) {
        case "Parameter Size":
            return `Guess the size of ${modelName}'s model in parameters!`;
        case "Multimodal":
            return `Can ${modelName} understand both text and images?`;
        case "Open Source":
            return `Is ${modelName} an open-source model?`;
        case "Strengths":
            return `What is ${modelName} best known for?`;
        default:
            return `What is special about ${modelName}?`;
    }
}

// Generate answer options
function generateOptions(feature) {
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    let options = [correctAnswer];
    if (feature === "Parameter Size") {
        options.push("500B", "1T", "Varies by model");
    } else if (feature === "Multimodal") {
        options.push("Yes", "No");
    } else if (feature === "Open Source") {
        options.push("Yes", "No");
    } else if (feature === "Strengths") {
        options.push("Data analysis", "Fast text generation", "Image synthesis");
    }

    // Remove duplicate options, then shuffle
    options = [...new Set(options)];
    options.sort(() => Math.random() - 0.5);

    // Create buttons for each option
    options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option-button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

// Check the answer
function checkAnswer(selectedAnswer) {
    const resultMessage = document.getElementById("result-message");
    const correctAnswerDisplay = document.getElementById("correct-answer-display");

    if (selectedAnswer === correctAnswer) {
        showConfetti();
        resultMessage.classList.add("correct");
        resultMessage.classList.remove("incorrect");
        resultMessage.textContent = "🎉 Congratulations! 🎉";
        correctAnswerDisplay.style.display = "none"; // Hide the correct answer display on a correct guess
        showResult("Correct!");
    } else {
        resultMessage.classList.add("incorrect");
        resultMessage.classList.remove("correct");
        resultMessage.textContent = "😕 Oops! Try again! 😕";
        correctAnswerDisplay.style.display = "block";
        correctAnswerDisplay.textContent = `The correct answer is: ${correctAnswer}`;
        showResult("Incorrect");
    }
}

// Show confetti on correct answer
function showConfetti() {
    const confettiContainer = document.getElementById("confetti-container");
    confettiContainer.style.display = "block";
    
    // Simple confetti effect using emojis
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.textContent = "🎉";
        confetti.classList.add("confetti");
        confetti.style.position = "absolute";
        confetti.style.top = `${Math.random() * window.innerHeight}px`;
        confetti.style.left = `${Math.random() * window.innerWidth}px`;
        confettiContainer.appendChild(confetti);
    }

    // Hide confetti after 2 seconds
    setTimeout(() => {
        confettiContainer.innerHTML = "";
        confettiContainer.style.display = "none";
    }, 2000);
}

// Show result and reveal more info if correct
function showResult(message) {
    document.getElementById("question-box").style.display = "none";
    document.getElementById("result-box").style.display = "block";

    if (message === "Correct!") {
        document.getElementById("strengths-text").textContent = currentModel.features["Strengths"];
        tryLink = currentModel.link;
    }
}

// Open link to try the model
function openLink() {
    window.open(tryLink, "_blank");
}

// Next Question
function nextQuestion() {
    document.getElementById("result-box").style.display = "none";
    document.getElementById("question-box").style.display = "block";
    askQuestion();
}
