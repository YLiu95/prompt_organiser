// Global variables
let savedSeries = []; 

document.addEventListener('DOMContentLoaded', function() {

  // Load saved data from localStorage
  savedSeries = JSON.parse(localStorage.getItem('savedSeries')) || [];
  
  let seriesCount = localStorage.getItem('seriesCount') || 0;

  // Attach copy handler once on load
  const copyBtns = document.querySelectorAll('.copyBtn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', copyTextToClipboard); 
  });

  // ... Rest of existing logic

  resetMainSection();
  
  if (savedSeries.length > 0) {
    document.getElementById('currentSeriesName').value = savedSeries[savedSeries.length - 1].name;
  } else {
    document.getElementById('currentSeriesName').value = 'Prompt Series 1';
  }

});

// Add new prompt block
function addNewPrompt() {

  // ... Existing logic

  const mainSection = document.getElementById('mainSection');
  // Create new block
  const promptBlock = document.createElement('div');

  // ... Append elements

  // Attach copy handler to avoid duplicating
  const copyBtn = promptBlock.querySelector('.copyBtn');
  copyBtn.addEventListener('click', copyTextToClipboard);

  mainSection.insertBefore(promptBlock, document.getElementById('addPromptBtn'));

}

// Copy text handler
function copyTextToClipboard(event) {
  
  // ... Existing logic

}

// Save current series
function saveCurrentSeries() {

  // Get data from UI
  const name = document.getElementById('currentSeriesName').value;
  const prompts = document.querySelectorAll('.promptBlock');

  const seriesData = {
    name,
    prompts: []
  };

  prompts.forEach(prompt => {
    const name = prompt.querySelector('.promptName').value; 
    const text = prompt.querySelector('.promptText').value;
    
    seriesData.prompts.push({
      name, 
      text
    });
  });

  // Validate
  if (!name) {
    alert('Please enter a series name');
    return;
  }

  // Save to localStorage
  savedSeries.push(seriesData);
  localStorage.setItem('savedSeries', JSON.stringify(savedSeries));

  // Reset counter
  localStorage.setItem('seriesCount', savedSeries.length);

  // Alert
  alert('Series saved successfully!');

}

// Event listeners
document.getElementById('addPromptBtn').addEventListener('click', addNewPrompt); 
document.getElementById('addSeriesBtn').addEventListener('click', saveCurrentSeries);