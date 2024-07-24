console.log("hello world!");

// highlight keyboard on keydown

// document.addEventListener('DOMContentLoaded', function() {
//   const keys = document.querySelectorAll('.key');

//   keys.forEach(key => {
//       key.addEventListener('click', function() {
//           const keyPressed = this.getAttribute('data-key');
//           handleKeyPress(keyPressed);
//       });
//   });

//   function handleKeyPress(key) {
//       console.log('Key pressed:', key);
//       // Handle the key press event here
//   }
// });

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playSound(e) {
  // const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`rect[data-key="${e.key}"]`);
  // if (!audio) return;
  console.log(e.key, key);
  key.classList.add('playing');
  // audio.currentTime = 0;
  // audio.play();
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);


// match key with textContent

const textContent = document.getElementById('text-content');
const originalText = textContent.textContent;

// Deprecation: replace `keyCode` with `key` & `code`

// document.addEventListener('keydown', (event) => {
//     const keycode = event.keyCode;
//     const char = String.fromCharCode(keycode).toLowerCase();
//     const regex = new RegExp(`(${char})`, 'gi');
    
//     if (keycode === 8) { // Backspace key
//         // Reset the content to the original text
//         textContent.innerHTML = originalText;
//     } else {
//         // Highlight matching text
//         const highlightedText = originalText.replace(regex, (match) => {
//             return `<span class="highlight-blue">${match}</span>`;
//         });
//         textContent.innerHTML = highlightedText;
//     }
// });

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const code = event.code;
    
    if (code === 'Backspace') { // Check if the code is 'Backspace'
      // Reset the content to the original text
      textContent.innerHTML = originalText;
  } else if (key.length === 1 && /[a-z0-9]/i.test(key)) {
      // Create regex for the current key
      const regex = new RegExp(`(${key})`, 'gi');
      
      // Highlight matching text in blue
      const highlightedText = originalText.split('').map((char) => {
          if (regex.test(char)) {
              return `<span class="highlight-blue">${char}</span>`;
          } else {
              return `<span class="highlight-red">${char}</span>`;
          }
      }).join('');
      
      textContent.innerHTML = highlightedText;
  }
});

