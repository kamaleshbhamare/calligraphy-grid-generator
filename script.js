
/*
Need to create wizard for these steps:
Step 1 → Page Settings
Step 2 → Letter Structure
Step 3 → Slant Guides
Step 4 → Line Visibility
Step 5 → Line Thickness
Step 6 → Preview & Print
*/

const steps = document.querySelectorAll(".step");

let currentStep = 1;

function showStep(index) {
    steps.forEach(step => step.classList.remove("active"));
    steps[index].classList.add("active");
}

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("next-btn")) {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
            // Generate grid when reaching the preview step
            if (currentStep === steps.length - 1) {
                generateGrid();
            }
        }
    }

    if (e.target.classList.contains("back-btn")) {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }
});

document.querySelectorAll(".toggle-option")
    .forEach(toggle => {

        toggle.addEventListener("change", function () {

            // Show / Hide associated input
            const target = document.getElementById(this.dataset.target);

            if (target) {
                target.classList.toggle(
                    "hide",
                    !this.checked
                );
            }

            // If checked, automatically check required parents
            if (this.checked && this.dataset.requires) {
                const requiredIds = this.dataset.requires.split(",");
                requiredIds.forEach(id => {
                    const requiredCheckbox = document.getElementById(id.trim());

                    if (requiredCheckbox && !requiredCheckbox.checked) {
                        requiredCheckbox.checked = true;
                        requiredCheckbox.dispatchEvent(
                            new Event("change")
                        );
                    }
                });
            }

            // If unchecked, automatically uncheck children
            if (!this.checked && this.dataset.uncheck) {
                const childIds = this.dataset.uncheck.split(",");
                childIds.forEach(id => {
                    const childCheckbox = document.getElementById(id.trim());
                    if (childCheckbox && childCheckbox.checked) {
                        childCheckbox.checked = false;
                        childCheckbox.dispatchEvent(
                            new Event("change")
                        );
                    }
                });
            }
        });

        // Run once during page load
        toggle.dispatchEvent(new Event("change"));

    });

// Add event listeners to number inputs to regenerate grid on change
document.querySelectorAll(".options").forEach(input => {
    input.addEventListener("change", function () {
        if (currentStep === steps.length - 1) {
            generateGrid();
        }
    });
});

function generateGrid() {
    const svg = document.getElementById("paper");
    svg.innerHTML = ""; // Clear previous grid

    // Draw Base Lines
    // Calculate space between base lines based on lines selected and their distance
    // Default margin between lines if only one line is selected

    const marginBetweenLines = parseInt(document.getElementById("SpaceBetweenRows").value);
    let baseLineSpacing = 0;
    let baseLineStartY = 0;
    let waistLineStartY = 0;
    let AscenderLine1StartY = 0;
    let AscenderLine2StartY = 0;
    let DescenderLine1StartY = 0;
    let DescenderLine2StartY = 0;

    if (document.getElementById("AscenderLine2Checkbox").checked) {
        baseLineSpacing += parseInt(document.getElementById("AscenderLine2").value);
        AscenderLine1StartY += baseLineSpacing;
    }

    if (document.getElementById("AscenderLine1Checkbox").checked) {
        baseLineSpacing += parseInt(document.getElementById("AscenderLine1").value);
    }

    if (document.getElementById("WaistLineHeightCheckbox").checked) {
        waistLineStartY += baseLineSpacing;
        baseLineSpacing += parseInt(document.getElementById("WaistLineHeight").value);
    }

    baseLineStartY += baseLineSpacing;

    if (document.getElementById("DescenderLine1Checkbox").checked) {
        baseLineSpacing += parseInt(document.getElementById("DescenderLine1").value);
        DescenderLine1StartY += baseLineSpacing;
    }

    if (document.getElementById("DescenderLine2Checkbox").checked) {
        baseLineSpacing += parseInt(document.getElementById("DescenderLine2").value);
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
    if (document.getElementById("WaistLineHeightCheckbox").checked) {
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
    if (document.getElementById("AscenderLine1Checkbox").checked) {
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
    if (document.getElementById("AscenderLine2Checkbox").checked) {
        for (let y = AscenderLine2StartY; y < 297; y += baseLineSpacing) {
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

    // Draw Descender 1 Lines
    if (document.getElementById("DescenderLine1Checkbox").checked) {
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
    if (document.getElementById("DescenderLine2Checkbox").checked) {
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

    const angle = parseInt(document.getElementById("SlantLineAngle").value);
    const spacing = parseInt(document.getElementById("SlantLinesSpacing").value);

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

