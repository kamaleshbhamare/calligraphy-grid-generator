function generateGrid() {
  const svg = document.getElementById('paper');
  svg.innerHTML = ''; // Clear previous grid

  // Draw Base Lines
  // Calculate space between base lines based on lines selected and their distance
  // Default margin between lines if only one line is selected

  const marginBetweenLines = parseInt(document.getElementById('RowGaps').value);
  const orientation = document.querySelector('input[name="orientation"]:checked').value;
  const width = orientation === 'landscape' ? 297 : 210;
  const height = orientation === 'landscape' ? 210 : 297;
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  const printArea = document.getElementById('printArea');
  printArea.classList.toggle('landscape', orientation === 'landscape');
  printArea.classList.toggle('portrait', orientation !== 'landscape');

  let baseLineSpacing = 0;
  let baseLineStartY = marginBetweenLines;
  let waistLineStartY = marginBetweenLines;
  let AscenderLine1StartY = marginBetweenLines;
  let AscenderLine2StartY = marginBetweenLines;
  let DescenderLine1StartY = marginBetweenLines;
  let DescenderLine2StartY = marginBetweenLines;

  if (document.getElementById('Asc2').value > 0) {
    baseLineSpacing += parseInt(document.getElementById('Asc2').value);
    AscenderLine1StartY += baseLineSpacing;
  }

  if (document.getElementById('Asc1').value > 0) {
    baseLineSpacing += parseInt(document.getElementById('Asc1').value);
  }

  if (document.getElementById('XHeight').value > 0) {
    waistLineStartY += baseLineSpacing;
    baseLineSpacing += parseInt(document.getElementById('XHeight').value);
  }

  baseLineStartY += baseLineSpacing;

  if (document.getElementById('Desc1').value > 0) {
    baseLineSpacing += parseInt(document.getElementById('Desc1').value);
    DescenderLine1StartY += baseLineSpacing;
  }

  if (document.getElementById('Desc2').value > 0) {
    baseLineSpacing += parseInt(document.getElementById('Desc2').value);
    DescenderLine2StartY += baseLineSpacing;
  }

  const rows = Math.max(0, parseInt(document.getElementById('NumRows').value) || 0);
  baseLineSpacing += marginBetweenLines;

  // Draw Base Lines
  for (let row = 0; row < rows; row++) {
    const y = baseLineStartY + row * baseLineSpacing;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '0');
    line.setAttribute('y1', y);
    line.setAttribute('x2', width);
    line.setAttribute('y2', y);
    line.setAttribute('stroke', '#555');
    line.setAttribute('stroke-width', '0.2');
    svg.appendChild(line);
  }

  // Draw Waist Lines
  if (document.getElementById('XHeight').value > 0) {
    for (let row = 0; row < rows; row++) {
      const y = waistLineStartY + row * baseLineSpacing;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', y);
      line.setAttribute('x2', width);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', '#555');
      line.setAttribute('stroke-width', '0.2');
      svg.appendChild(line);
    }
  }

  // Draw Ascender 1 Lines
  if (document.getElementById('Asc1').value > 0) {
    for (let row = 0; row < rows; row++) {
      const y = AscenderLine1StartY + row * baseLineSpacing;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', y);
      line.setAttribute('x2', width);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', '#555');
      line.setAttribute('stroke-width', '0.2');
      svg.appendChild(line);
    }
  }

  // Draw Ascender 2 Lines
  if (document.getElementById('Asc2').value > 0) {
    for (let row = 0; row < rows; row++) {
      const y = AscenderLine2StartY + row * baseLineSpacing;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', y);
      line.setAttribute('x2', width);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', 'red');
      line.setAttribute('stroke-width', '0.2');
      svg.appendChild(line);
    }
  }

  // Draw Descender 1 Lines
  if (document.getElementById('Desc1').value > 0) {
    for (let row = 0; row < rows; row++) {
      const y = DescenderLine1StartY + row * baseLineSpacing;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', y);
      line.setAttribute('x2', width);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', '#555');
      line.setAttribute('stroke-width', '0.2');
      svg.appendChild(line);
    }
  }

  // Draw Descender 2 Lines
  if (document.getElementById('Desc2').value > 0) {
    for (let row = 0; row < rows; row++) {
      const y = DescenderLine2StartY + row * baseLineSpacing;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', y);
      line.setAttribute('x2', width);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', '#555');
      line.setAttribute('stroke-width', '0.2');
      svg.appendChild(line);
    }
  }

  const angle = parseInt(document.getElementById('SlantAngle').value);
  const spacing = parseInt(document.getElementById('SlantGap').value);

  const theta = (angle * Math.PI) / 180;

  const dx = Math.cos(theta);
  const dy = -Math.sin(theta);

  const px = Math.sin(theta);
  const py = Math.cos(theta);

  const lineLength = 1000;

  const count = Math.ceil((width * Math.abs(px) + height * Math.abs(py)) / spacing) + 20;

  for (let i = -10; i < count; i++) {
    const offset = i * spacing;

    const cx = offset * px;
    const cy = offset * py;

    const x1 = cx - dx * lineLength;
    const y1 = cy - dy * lineLength;

    const x2 = cx + dx * lineLength;
    const y2 = cy + dy * lineLength;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);

    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);

    line.setAttribute('stroke', '#bbb');
    line.setAttribute('stroke-width', '0.2');

    svg.appendChild(line);
  }
}

// Generate the grid based on user input
const generateControls = document.querySelectorAll('.controls input, .controls select');
generateControls.forEach((control) => {
  control.addEventListener('input', generateGrid);
  control.addEventListener('change', generateGrid);
});

// Print functionality
document.getElementById('PrintBtn').addEventListener('click', function () {
  const printWindow = window.open('', '_blank');
  printWindow.document.write('<html><head></head><body>');
  printWindow.document.write(document.getElementById('paper').outerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
});

generateGrid();
