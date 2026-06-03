function setPrintOrientation(orientation) {
  let styleEl = document.getElementById('print-orientation-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'print-orientation-style';
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = `@media print { @page { size: ${orientation}; margin: 0; } }`;
}

function generateGrid() {
  const svg = document.getElementById('paper');
  svg.innerHTML = ''; // Clear previous grid

  // Draw Base Lines
  // Calculate space between base lines based on lines selected and their distance
  // Default margin between lines if only one line is selected

  const gapBetweenLines = parseInt(document.getElementById('RowGaps').value);
  const orientation = document.querySelector('input[name="orientation"]:checked').value;
  const vertAlign = document.getElementById('VertAlign').value;
  const marginOffset = parseInt(document.getElementById('MarginOffset').value) || 0;

  const width = orientation === 'landscape' ? 297 : 210;
  const height = orientation === 'landscape' ? 210 : 297;
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  setPrintOrientation(orientation);

  const printArea = document.getElementById('printArea');
  printArea.classList.toggle('landscape', orientation === 'landscape');
  printArea.classList.toggle('portrait', orientation !== 'landscape');

  let baseLineSpacing = 0;
  let baseLineStartY = 0;
  let waistLineStartY = 0;
  let AscenderLine1StartY = 0;
  let AscenderLine2StartY = 0;
  let DescenderLine1StartY = 0;
  let DescenderLine2StartY = 0;

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

  baseLineSpacing += gapBetweenLines;

  const numRowsInput = document.getElementById('NumRows');
  const requestedRows = Math.max(0, parseInt(numRowsInput.value) || 0);
  clearDebugLog();

  debugLog(`Requested Rows: ${requestedRows}`);

  const availableHeight = height - marginOffset;

  debugLog(`Available Height: ${availableHeight}`);
  debugLog(`Base Line Spacing: ${baseLineSpacing}`);

  debugLog(`availableHeight - marginOffset: ${availableHeight - marginOffset + gapBetweenLines}`);
  debugLog(
    `(availableHeight - marginOffset) / baseLineSpacing: ${(availableHeight - marginOffset + gapBetweenLines) / baseLineSpacing}`,
  );

  const maxRows =
    baseLineSpacing > 0
      ? Math.max(0, Math.floor((availableHeight - marginOffset + gapBetweenLines) / baseLineSpacing))
      : 0;

  debugLog(`Max : ${Math.max(0, Math.floor((availableHeight - marginOffset + gapBetweenLines) / baseLineSpacing))}`);

  numRowsInput.max = maxRows;
  const rows = Math.min(requestedRows, maxRows);
  if (requestedRows > maxRows) {
    numRowsInput.value = maxRows;
  }

  // Draw Base Lines
  for (let row = 0; row < rows; row++) {
    const y = marginOffset + baseLineStartY + row * baseLineSpacing;
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
      const y = marginOffset + waistLineStartY + row * baseLineSpacing;
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
      const y = marginOffset + AscenderLine1StartY + row * baseLineSpacing;
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
      const y = marginOffset + AscenderLine2StartY + row * baseLineSpacing;
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
      const y = marginOffset + DescenderLine1StartY + row * baseLineSpacing;
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
      const y = marginOffset + DescenderLine2StartY + row * baseLineSpacing;
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
document.getElementById('DownloadPDFBtn').addEventListener('click', async function () {
  // Export the SVG as an image and embed in a PDF using jsPDF
  try {
    const orientation = document.querySelector('input[name="orientation"]:checked').value;
    const width = orientation === 'landscape' ? 297 : 210;
    const height = orientation === 'landscape' ? 210 : 297;

    const svg = document.getElementById('paper');
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = function () {
      // rasterize at a reasonable resolution
      const scale = 3; // increase for higher quality
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      const ctx = canvas.getContext('2d');
      // white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imgData = canvas.toDataURL('image/png');

      if (window.jspdf && window.jspdf.jsPDF) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
          orientation: orientation === 'landscape' ? 'landscape' : 'portrait',
          unit: 'mm',
          format: [width, height],
        });
        doc.addImage(imgData, 'PNG', 0, 0, width, height);
        doc.save('calligraphy-grid.pdf');
      } else if (window.jsPDF) {
        const doc = new window.jsPDF({
          orientation: orientation === 'landscape' ? 'landscape' : 'portrait',
          unit: 'mm',
          format: [width, height],
        });
        doc.addImage(imgData, 'PNG', 0, 0, width, height);
        doc.save('calligraphy-grid.pdf');
      } else {
        // fallback: open raster image in new tab for manual save
        window.open(imgData, '_blank');
      }

      URL.revokeObjectURL(url);
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      alert('Failed to render SVG for PDF export.');
    };
    img.src = url;
  } catch (err) {
    console.error(err);
    alert('PDF export failed. Falling back to print.');
    window.print();
  }
});

// Handle vertical alignment margin field enable/disable
function updateVerticalAlignmentMargins() {
  const vertAlign = document.getElementById('VertAlign').value;
  const marginOffset = document.getElementById('MarginOffset');

  if (vertAlign === '1') {
    // Center: disable margin fields,   enable MarginOffset
    marginOffset.disabled = true;
    marginOffset.value = '0';
  } else {
    // Top or Bottom: enable MarginOffset
    marginOffset.disabled = false;
  }
}

document.getElementById('VertAlign').addEventListener('change', updateVerticalAlignmentMargins);
updateVerticalAlignmentMargins();

generateGrid();

function debugLog(message) {
  const debugEl = document.getElementById('debug');
  if (debugEl) {
    debugEl.textContent += message + '\n';
  } else {
    console.log(message);
  }
}

function clearDebugLog() {
  const debugEl = document.getElementById('debug');
  if (debugEl) {
    debugEl.textContent = '';
  }
}
