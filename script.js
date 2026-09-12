const soundToggle = document.querySelector('.sound-toggle');
const soundLabel = document.querySelector('.sound-label');

const verses = [
  'I can do all things through Christ which strengtheneth me.',
  'The Lord is my strength and my shield.',
  'Be strong and of a good courage; be not afraid.',
  'The light shineth in darkness.'
];

let verseIndex = 0;
let speaking = false;

function speakNextVerse() {
  if (!speaking || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const verse = new SpeechSynthesisUtterance(verses[verseIndex]);
  verse.rate = 0.82;
  verse.pitch = 0.8;
  verse.volume = 0.45;
  verse.onend = () => {
    verseIndex = (verseIndex + 1) % verses.length;
    window.setTimeout(speakNextVerse, 900);
  };
  window.speechSynthesis.speak(verse);
}

soundToggle.addEventListener('click', () => {
  speaking = !speaking;
  soundToggle.setAttribute('aria-pressed', String(speaking));
  soundLabel.textContent = speaking ? 'verse audio on' : 'verse audio off';
  if (speaking) {
    speakNextVerse();
  } else if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
});