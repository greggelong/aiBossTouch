let bard, cbard; // p5.Speech objects for English and Chinese
let touchLevel = 0; // Current touch level
let isSpeaking = false; // To track if speech is ongoing
let bh; // Background image

// English and Chinese descriptions for touch levels
const touchDescriptionsEnglish = [
  "Touch level 0: No feeling, just air drifting by.",
  "Touch level 1: A faint whisper of existence.",
  "Touch level 2: The slightest press, as if from a ghost.",
  "Touch level 3: Gentle weight, like a feather landing.",
  "Touch level 4: A soft nudge, a light handshake.",
  "Touch level 5: A firm touch, steady and deliberate.",
  "Touch level 6: A pressing grip, certain but kind.",
  "Touch level 7: Solid contact, a call to awareness.",
  "Touch level 8: A strong gesture, resolute and clear.",
  "Touch level 9: Intense presence, yet still gentle.",
];

const touchDescriptionsChinese = [
  "触感级别 0: 没有感觉，只是空气漂过。",
  "触感级别 1: 微弱的存在耳语。",
  "触感级别 2: 最轻的压力，就像幽灵触碰。",
  "触感级别 3: 温柔的重量，如羽毛落下。",
  "触感级别 4: 轻柔的推搡，像轻握手。",
  "触感级别 5: 稳重的触摸，坚定而从容。",
  "触感级别 6: 紧握的压力，确定却温和。",
  "触感级别 7: 稳固的接触，一种唤醒。",
  "触感级别 8: 强烈的姿态，坚决而清晰。",
  "触感级别 9: 强烈的存在，但依然温柔。",
];

function preload() {
  bh = loadImage("bosshand.jpeg"); // Load image for the background
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(32);
  textAlign(CENTER, CENTER);
  drawit();

  // Initialize p5.Speech objects
  bard = new p5.Speech(); // English speech
  cbard = new p5.Speech(); // Chinese speech
  cbard.setLang("zh-CN"); // Set Chinese language
}

function touchStarted() {
  // Generate a random touch level between 0 and 9
  touchLevel = floor(random(0, 10));
  drawit();
  // Ensure it works on iPhone
  if (getAudioContext().state !== "running") {
    getAudioContext().resume();
  }

  // Start speaking if not already speaking
  if (!isSpeaking) {
    isSpeaking = true;
    speakTouchLevel(touchLevel);
  }

  return false; // Prevent default behavior
}

function touchEnded() {
  // Stop speech when the touch ends
  if (isSpeaking) {
    cbard.stop(); // Stop Chinese speech
    bard.stop(); // Stop English speech
    isSpeaking = false; // Reset the speaking flag
  }
}

function speakTouchLevel(level) {
  // Get descriptions in both languages
  const chineseText = touchDescriptionsChinese[level];
  const englishText = touchDescriptionsEnglish[level];

  // Speak Chinese first, then English
  cbard.setLang("zh-CN");
  cbard.speak(chineseText);

  bard.setLang("en-US");
  bard.speak(englishText);
}

function drawit() {
  background(bh); // Refresh the background every frame

  // Optionally, display the touch level on screen
  fill(0);
  text("Touch Level: " + touchLevel, width / 2, height / 2);
}
