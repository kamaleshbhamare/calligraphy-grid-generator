


function generateGrid() {
    const svg = document.getElementById("paper");
    svg.innerHTML = ""; // Clear previous grid

    // Draw Base Lines
    // Calculate space between base lines based on lines selected and their distance
    // Default margin between lines if only one line is selected

    const marginBetweenLines = parseInt(document.getElementById("RowGaps").value);
    let baseLineSpacing = 0;
    let baseLineStartY = 0;
    let waistLineStartY = 0;
    let AscenderLine1StartY = 0;
    let AscenderLine2StartY = 0;
    let DescenderLine1StartY = 0;
    let DescenderLine2StartY = 0;

    if (document.getElementById("Asc2").value > 0) {
        baseLineSpacing += parseInt(document.getElementById("Asc2").value);
        AscenderLine1StartY += baseLineSpacing;
    }

    if (document.getElementById("Asc1").value > 0) {
        baseLineSpacing += parseInt(document.getElementById("Asc1").value);
    }

    if (document.getElementById("XHeight").value > 0) {
        waistLineStartY += baseLineSpacing;
        baseLineSpacing += parseInt(document.getElementById("XHeight").value);
    }

    baseLineStartY += baseLineSpacing;

    if (document.getElementById("Desc1").value > 0) {
        baseLineSpacing += parseInt(document.getElementById("Desc1").value);
        DescenderLine1StartY += baseLineSpacing;
    }

    if (document.getElementById("Desc2").value > 0) {
        baseLineSpacing += parseInt(document.getElementById("Desc2").value);
        DescenderLine2StartY += baseLineSpacing;
    }

    baseLineSpacing += marginBetweenLines;

    // Draw Base Lines
    for (let y = baseLineStartY; y < 297; y += baseLineSpacing) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", y);
        line.setAttribute("x2", "210");
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "#555");
        line.setAttribute("stroke-width", "0.2");
        svg.appendChild(line);
    }

    // Draw Waist Lines
    if (document.getElementById("XHeight").value > 0) {
        for (let y = waistLineStartY; y < 297; y += baseLineSpacing) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", "0");
            line.setAttribute("y1", y);
            line.setAttribute("x2", "210");
            line.setAttribute("y2", y);
            line.setAttribute("stroke", "#555");
            line.setAttribute("stroke-width", "0.2");
            svg.appendChild(line);
        }
    }

    // Draw Ascender 1 Lines
    if (document.getElementById("Asc1").value > 0) {
        for (let y = AscenderLine1StartY; y < 297; y += baseLineSpacing) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", "0");
            line.setAttribute("y1", y);
            line.setAttribute("x2", "210");
            line.setAttribute("y2", y);
            line.setAttribute("stroke", "#555");
            line.setAttribute("stroke-width", "0.2");
            svg.appendChild(line);
        }
    }

    // Draw Ascender 2 Lines
    if (document.getElementById("Asc2").value > 0) {
        for (let y = AscenderLine2StartY; y < 297; y += baseLineSpacing) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", "0");
            line.setAttribute("y1", y);
            line.setAttribute("x2", "210");
            line.setAttribute("y2", y);
            line.setAttribute("stroke", "red");
            line.setAttribute("stroke-width", "0.2");
            svg.appendChild(line);
        }
    }

    // Draw Descender 1 Lines
    if (document.getElementById("Desc1").value > 0) {
        for (let y = DescenderLine1StartY; y < 297; y += baseLineSpacing) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", "0");
            line.setAttribute("y1", y);
            line.setAttribute("x2", "210");
            line.setAttribute("y2", y);
            line.setAttribute("stroke", "#555");
            line.setAttribute("stroke-width", "0.2");
            svg.appendChild(line);
        }
    }

    // Draw Descender 2 Lines
    if (document.getElementById("Desc2").value > 0) {
        for (let y = DescenderLine2StartY; y < 297; y += baseLineSpacing) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", "0");
            line.setAttribute("y1", y);
            line.setAttribute("x2", "210");
            line.setAttribute("y2", y);
            line.setAttribute("stroke", "#555");
            line.setAttribute("stroke-width", "0.2");
            svg.appendChild(line);
        }
    }

    const angle = parseInt(document.getElementById("SlantAngle").value);
    const spacing = parseInt(document.getElementById("SlantGap").value);

    const width = 210;   // A4 portrait
    const height = 297;

    const theta = angle * Math.PI / 180;

    const dx = Math.cos(theta);
    const dy = -Math.sin(theta);

    const px = Math.sin(theta);
    const py = Math.cos(theta);

    const lineLength = 1000;

    const count =
        Math.ceil(
            (width * Math.abs(px) +
                height * Math.abs(py))
            / spacing
        ) + 20;

    for (let i = -10; i < count; i++) {

        const offset = i * spacing;

        const cx = offset * px;
        const cy = offset * py;

        const x1 = cx - dx * lineLength;
        const y1 = cy - dy * lineLength;

        const x2 = cx + dx * lineLength;
        const y2 = cy + dy * lineLength;

        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );

        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);

        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);

        line.setAttribute("stroke", "#bbb");
        line.setAttribute("stroke-width", "0.2");

        svg.appendChild(line);
    }

}

// Generate the grid based on user input
document.getElementById("GenerateBtn").addEventListener("click", generateGrid);

// Print functionality
document.getElementById("PrintBtn").addEventListener("click", function () {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print Grid</title></head><body>');
    printWindow.document.write(document.getElementById("paper").outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
});