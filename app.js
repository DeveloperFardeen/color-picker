document.addEventListener('DOMContentLoaded', function () {
    const colorPicker = document.getElementById('colorPicker');
    const selectedColor = document.getElementById('selectedColor');
    const currentColor = document.getElementById('currentColor');
    const colorCodeInput = document.getElementById('colorCode');
    const error = document.getElementById('error');
  
    const colors = [
      '#FF0000', '#FF7F00', '#FFFF00', '#7FFF00', '#00FF00',
      '#00FF7F', '#00FFFF', '#007FFF', '#0000FF', '#7F00FF',
      '#FF00FF', '#FF007F', '#000000', '#808080', '#C0C0C0',
      '#FFFFFF', '#FFD700', '#FFA500', '#FFFFE0', '#FFFACD',
      '#FAFAD2', '#FFEFD5', '#FFE4B5', '#FFDAB9', '#EEE8AA',
      '#F0E68C', '#BDB76B', '#8B4513', '#D2691E', '#CD853F',
      '#A52A2A', '#800000', '#8B0000', '#B22222', '#DC143C',
      '#FF4500', '#FF6347', '#FFA07A', '#FFDAB9', '#EEE8AA',
      '#FAABD2', '#F3BBD5', '#FE64B5', '#FFD3B9', '#EEE82E',
      '#F0AB8C', '#B3B76B', '#8E6513', '#D263BE', '#CD852E',
      '#A5AB2A', '#83B000', '#8E6000', '#B223B2', '#DC142E',
      '#FFAB00', '#F3B347', '#FE607A', '#FFD3B9', '#EEE82E',
      '#485739', '#E829E2', '#B392F3', '#AA29B2'
      // ... add more colors as needed
    ];
  
    // Populate color picker
    colors.forEach(color => {
      const colorBox = createColorBox(color);
      colorPicker.appendChild(colorBox);
    });
  
    function createColorBox(color) {
      const colorBox = document.createElement('div');
      colorBox.className = 'colorBox';
      colorBox.style.backgroundColor = color;
      colorBox.addEventListener('click', () => selectColor(color));
      return colorBox;
    }
  
    function selectColor(color) {
      const rgb = parseInt(color.substring(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >>  8) & 0xff;
      const b = (rgb >>  0) & 0xff;
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
      if (brightness > 128) {
        selectedColor.style.color = 'black';
        currentColor.style.color = 'black';
      } else {
        selectedColor.style.color = 'white';
        currentColor.style.color = 'white';
      }
      currentColor.textContent = color;
      selectedColor.style.backgroundColor = color;
    }
  
    window.enterColor = function () {
      error.textContent = '';
      var enteredColor = colorCodeInput.value;
      if (enteredColor.length == 4) {
        enteredColor = enteredColor.replace(/#([0-9A-F])([0-9A-F])([0-9A-F])/i, '#$1$1$2$2$3$3');
      }
      if (isValidColorCode(enteredColor)) {
        const colorBox = createColorBox(enteredColor);
        colorPicker.appendChild(colorBox);
        selectColor(enteredColor);
      } else {
        error.textContent = 'Invalid color code.';
      }
    };
  
    function isValidColorCode(colorCode) {
      const hexColorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
      return hexColorRegex.test(colorCode);
    }
});
  