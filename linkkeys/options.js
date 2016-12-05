$(document).ready(function(){
//color picker stuff
var memoryColors = [
    {r: 100, g: 200, b: 10,  a: 0.6},
    {r: 80,  g: 100, b: 50,  a: 0.9},
    {r: 70,  g: 80,  b: 10,  a: 0.9},
    {r: 20,  g: 200, b: 60,  a: 0.9},
    {r: 88,  g: 0,   b: 30,  a: 0.4},
    {r: 100, g: 0,   b: 100, a: 0.6},
    {r: 200, g: 0,   b: 0},
    {r: 200, g: 30,  b: 100}
  ],
  $myColorPicker = $('input.color').colorPicker({
    customBG: '#222',
    readOnly: true,
    init: function(elm, colors) { // colors is a different instance (not connected to colorPicker)
      elm.style.backgroundColor = elm.value;
      elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
    },
    // appendTo: document.querySelector('.the-paragraph')
    // renderCallback: function(colors, mode) {
    //  console.log(mode);
    // }
    // memoryColors: memoryColors,
    // actionCallback: function(event, type) {
    //  if (type === 'toMemory') {
    //    // $myColorPicker.renderMemory(memoryColors);
    //  }
    // }
  }).each(function(idx, elm) {
    // $(elm).css({'background-color': this.value})
  });
});

// Saves options to chrome.storage
function save_options() {
  var linkkeyTextColor = document.getElementById('linkkeyTextColor').value;
  var linkkeyBorderColor = document.getElementById('linkkeyBorderColor').value;
  var linkkeyHighlightColor = document.getElementById('linkkeyHighlightColor').value;
  var linkkeyBodyColor = document.getElementById('linkkeyBodyColor').value;
  // var likesColor = document.getElementById('like').checked;
  chrome.storage.sync.set({
    linkkeyTextColor:linkkeyTextColor,
linkkeyBorderColor:linkkeyBorderColor,
linkkeyHighlightColor:linkkeyHighlightColor,
linkkeyBodyColor:linkkeyBodyColor 
  
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    linkkeyTextColor:"rgba(0, 0, 0, 1)",
linkkeyBorderColor:"rgba(0, 0, 0, 0.5)",
linkkeyHighlightColor:"rgba(50,197,49, 0.99)",
linkkeyBodyColor:"rgba(49, 124, 194, 0.58)"
  }, function(items) {
    
    document.getElementById('linkkeyTextColor').value = items.linkkeyTextColor;
document.getElementById('linkkeyBorderColor').value= items.linkkeyBorderColor;
document.getElementById('linkkeyHighlightColor').value= items.linkkeyHighlightColor;
document.getElementById('linkkeyBodyColor').value = items.linkkeyBodyColor;
  });
  


var memoryColors = [
    {r: 100, g: 200, b: 10,  a: 0.6},
    {r: 80,  g: 100, b: 50,  a: 0.9},
    {r: 70,  g: 80,  b: 10,  a: 0.9},
    {r: 20,  g: 200, b: 60,  a: 0.9},
    {r: 88,  g: 0,   b: 30,  a: 0.4},
    {r: 100, g: 0,   b: 100, a: 0.6},
    {r: 200, g: 0,   b: 0},
    {r: 200, g: 30,  b: 100}
  ],
  $myColorPicker = $('input.color').colorPicker({
    customBG: '#222',
    readOnly: true,
    init: function(elm, colors) { // colors is a different instance (not connected to colorPicker)
      elm.style.backgroundColor = elm.value;
      elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
    },
    // appendTo: document.querySelector('.the-paragraph')
    // renderCallback: function(colors, mode) {
    //  console.log(mode);
    // }
    // memoryColors: memoryColors,
    // actionCallback: function(event, type) {
    //  if (type === 'toMemory') {
    //    // $myColorPicker.renderMemory(memoryColors);
    //  }
    // }
  }).each(function(idx, elm) {
    // $(elm).css({'background-color': this.value})
  });



}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

