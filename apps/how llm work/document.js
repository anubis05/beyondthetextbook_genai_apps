document.addEventListener("DOMContentLoaded", function () {
    M.AutoInit();
  });
  
  let savedCreations = [];
  
  // Define image mapping for each genre and tone combination
  const images = {
    fantasy: {
      neutral: "path/to/fantasy-neutral.jpg",
      humorous: "path/to/fantasy-humorous.jpg",
      serious: "path/to/fantasy-serious.jpg"
    },
    sciFi: {
      neutral: "path/to/scifi-neutral.jpg",
      humorous: "path/to/scifi-humorous.jpg",
      serious: "path/to/scifi-serious.jpg"
    },
    historical: {
      neutral: "path/to/historical-neutral.jpg",
      humorous: "path/to/historical-humorous.jpg",
      serious: "path/to/historical-serious.jpg"
    }
  };
  
  // Few-shot examples organized by genre and tone
  const prompts = {
    fantasy: {
      neutral: [
        "In a mystical forest, a hidden village is discovered.",
        "An ancient artifact is found by a young wanderer in an enchanted forest.",
        "A mystical forest unveils its secrets to a brave explorer."
      ],
      humorous: [
        "A wizard's spell backfires, turning his beard into spaghetti.",
        "A mischievous fairy hides all the villagers' left shoes.",
        "A dragon loses his fire-breathing powers and seeks help from villagers."
      ],
      serious: [
        "A young warrior prepares to face an ancient dragon.",
        "An elder wizard passes on a critical mission to a new apprentice.",
        "A kingdom faces an impending doom as ancient prophecies unfold."
      ]
    },
    sciFi: {
      neutral: [
        "In the year 2345, a team of scientists discovers a portal to an alternate dimension.",
        "A space explorer stumbles upon a new planet.",
        "Humanity's first contact with alien life is met with mixed emotions."
      ],
      humorous: [
        "A quirky robot accidentally becomes the star of a space reality show.",
        "An alien realizes Earth’s fascination with cat videos and decides to make some of its own.",
        "A spaceship AI goes rogue, playing practical jokes on the crew."
      ],
      serious: [
        "Humanity’s last ship makes a desperate journey through uncharted space.",
        "A space captain faces a moral dilemma on a distant planet.",
        "A colony's survival depends on dangerous resource gathering on an uninhabitable planet."
      ]
    },
    historical: {
      neutral: [
        "An apprentice in a Renaissance workshop learns an ancient secret.",
        "A young scholar discovers a hidden library in the heart of a medieval castle.",
        "A town witnesses a rare celestial event that mystifies its residents."
      ],
      humorous: [
        "A knight accidentally enters a jousting contest... on a goat.",
        "A royal chef accidentally serves soup with way too much pepper, causing chaos at the feast.",
        "A bard forgets the lyrics mid-performance and improvises hilariously."
      ],
      serious: [
        "A soldier struggles to find his place during a pivotal moment in history.",
        "A village braves a harsh winter during a historic famine.",
        "A noble family faces difficult choices as they fall from grace."
      ]
    }
  };
  
  // Information for each concept (used in the info box)
  const infoContent = {
    overview: ["Welcome to The Wordsmith!", "This app helps you understand concepts behind language models.\nExplore topics like prompt engineering, tuning, and few-shot learning."],
    promptEngineering: ["Prompt Engineering", "Crafting the right input is essential to getting useful outputs.\nChoose a genre and example prompt to see how prompts affect content."],
    tuning: ["Tuning", "Adjust the tone to 'tune' the output style—serious, neutral, or humorous.\nThis is similar to how models are adjusted to refine style."],
    generation: ["Generation", "After setting a prompt and tone, the app generates content.\nThis mimics how LLMs produce text based on input context."],
    fewShotLearning: ["Few-Shot Learning", "In this app, selecting different prompts within a genre and tone emulates few-shot learning.\nThis gives the model varied examples to learn and adapt from."]
  };
  
  // Function to display information in the info box without typewriter effect
  function showInfo(key) {
    const infoBox = document.getElementById("info-box");
    const infoTitleElem = document.getElementById("info-title");
    const infoContentElem = document.getElementById("info-content");
  
    if (infoContent[key]) {
      infoTitleElem.innerText = infoContent[key][0];
      infoContentElem.innerHTML = infoContent[key][1].replace(/\n/g, "<br>");
      infoBox.style.display = "block";
    }
  }
  
  // Function to update example prompts when a genre is selected
  function updatePromptExamples() {
    const genre = document.getElementById("genre").value;
    const promptExampleDropdown = document.getElementById("prompt-example");
  
    // Clear and repopulate example prompts
    promptExampleDropdown.innerHTML = '<option value="" disabled selected>Select an example prompt</option>';
    
    if (prompts[genre]) {
      prompts[genre].neutral.forEach(prompt => {
        const option = document.createElement("option");
        option.value = prompt;
        option.textContent = prompt;
        promptExampleDropdown.appendChild(option);
      });
    }
  
    M.FormSelect.init(promptExampleDropdown); // Reinitialize Materialize select
  }
  
  function generateText() {
    const genre = document.getElementById("genre").value;
    const toneValue = document.getElementById("tone").value;
    const tone = toneValue < 4 ? "serious" : toneValue < 8 ? "neutral" : "humorous";
  
    const imageFiles = {
      fantasy: {
        neutral: "fantasy_neutral_mystical_forest_hidden_village.png",
        humorous: "fantasy_humorous_wizard_spaghetti_beard.png",
        serious: "fantasy_serious_warrior_dragon_fight.png"
      },
      sciFi: {
        neutral: "scifi_neutral_space_explorer_new_planet.png",
        humorous: "scifi_humorous_robot_space_reality_show.png",
        serious: "scifi_serious_last_spaceship_uncharted_space.png"
      },
      historical: {
        neutral: "historical_neutral_renaissance_apprentice.png",
        humorous: "historical_humorous_knight_jousting_goat.png",
        serious: "historical_serious_soldier_battle_struggle.png"
      }
    };
  
    const examples = prompts[genre][tone];
    const generatedContent = examples[Math.floor(Math.random() * examples.length)];
    const imageUrl = `images/${imageFiles[genre][tone]}`;
    const promptImage = document.getElementById("prompt-image");
    const titleOverlay = document.getElementById("generated-title-overlay");
  
    if (generatedContent) {
      promptImage.src = imageUrl;
      promptImage.alt = `${genre} - ${tone} prompt image`;
      titleOverlay.innerText = generatedContent;
      document.getElementById("generated-content").style.display = "block";
      showInfo('generation');
    }
  }
  
  function resetContent() {
    // Ensure elements exist before accessing them to avoid errors
    const titleOverlay = document.getElementById("generated-title-overlay");
    const generatedContent = document.getElementById("generated-content");
    const genreDropdown = document.getElementById("genre");
    const promptExampleDropdown = document.getElementById("prompt-example");
    const toneSlider = document.getElementById("tone");
    const infoBox = document.getElementById("info-box");
  
    // Clear generated text if element exists
    if (titleOverlay) titleOverlay.innerText = "";
  
    // Hide generated content section if element exists
    if (generatedContent) generatedContent.style.display = "none";
  
    // Reset genre dropdown if element exists
    if (genreDropdown) genreDropdown.selectedIndex = 0;
  
    // Reset prompt example dropdown if element exists
    if (promptExampleDropdown) {
      promptExampleDropdown.innerHTML = '<option value="" disabled selected>Select an example prompt</option>';
      M.FormSelect.init(promptExampleDropdown); // Reinitialize Materialize select
    }
  
    // Reset tone slider if element exists
    if (toneSlider) {
      toneSlider.value = 5;
      updateToneLabel(5); // Ensure tone label shows 'Neutral'
    }
  
    // Hide info box if element exists
    if (infoBox) infoBox.style.display = "none";
  
    // Ensure the body does not overflow
    document.body.style.overflow = "hidden"; // Hide page-level scrolling
  }

    
  function regenerate() {
    generateText();
  }
  
  function updateToneLabel(value) {
    const tones = ["Serious", "Neutral", "Humorous"];
    let toneText = value < 4 ? tones[0] : value < 8 ? tones[1] : tones[2];
    document.getElementById("tone-label").innerText = `Tone: ${toneText}`;
  }
  