console.log("script loaded");
console.log("script loaded");

const stack = document.querySelector('.scene-stack');
if (!stack) {
  console.warn('No .scene-stack found');
}

const scenes = stack ? Array.from(stack.querySelectorAll('.scene')) : [];

let currentScene = scenes.findIndex((s) => s.classList.contains('is-active'));
if (currentScene === -1 && scenes.length > 0) {
  currentScene = 0;
  scenes[0].classList.add('is-active');
}

const noMessages = [
  "Why not?",
  "Okay... :(",
  "What's your damage?",
  "Just click the yes button brodie ✌️😭",
  "May Allah hurt you the way you have hurt me.",
  "Why tho?",
  "Do you have a problem with me?",
  "uhhhh awkward...",
  "pffff whatever 🙄",
  "this isn't working huh",
  "do you never give up?"
];
let noIndex = 0;

function showScene(nextIndex) {
  if (nextIndex < 0 || nextIndex >= scenes.length) return;
  scenes[currentScene].classList.remove('is-active');
  scenes[nextIndex].classList.add('is-active');
  currentScene = nextIndex;
  noIndex = 0; // reset "no" sequence when advancing
  const activeNoText = scenes[currentScene].querySelector('.no-text');
  if (activeNoText) activeNoText.textContent = '';
}

if (stack) {
  stack.addEventListener('click', (e) => {
    const yes = e.target.closest('.btn-yes');
    const no = e.target.closest('.btn-no');

    if (yes) {
      const next = currentScene + 1;
      showScene(next);
      return;
    }

    if (no) {
      const activeScene = scenes[currentScene];
      if (!activeScene) return;
      const noText = activeScene.querySelector('.no-text');
      if (!noText) return;

      noText.textContent = noMessages[noIndex];
      noIndex = (noIndex + 1) % noMessages.length;
    }
  });
}