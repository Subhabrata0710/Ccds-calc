// Function to show the correct Step 2 options based on Age
function toggleSubjectiveCriteria() {
    const age = parseFloat(document.getElementById('age').value);
    const rossDiv = document.getElementById('ross-criteria');
    const nyhaDiv = document.getElementById('nyha-criteria');
    const warning = document.getElementById('subjective-warning');

    // Reset visibility
    rossDiv.classList.add('hidden');
    nyhaDiv.classList.add('hidden');
    warning.classList.add('hidden');

    // Uncheck previous selections to avoid logic errors
    document.querySelectorAll('input[name="subjective"]').forEach(el => el.checked = false);

    if (isNaN(age)) {
        warning.classList.remove('hidden');
        return;
    }

    if (age < 14) {
        rossDiv.classList.remove('hidden');
    } else {
        nyhaDiv.classList.remove('hidden');
    }
}

function calculateScore() {
    // 1. Get HDC Score
    const hdcEl = document.querySelector('input[name="hdc"]:checked');
    if (!hdcEl) {
        alert("Please select a Heart Disease Category (Step 1).");
        return;
    }
    const hdcScore = parseInt(hdcEl.value);

    // 2. Get Subjective Score
    const subEl = document.querySelector('input[name="subjective"]:checked');
    if (!subEl) {
        alert("Please select a Symptom Severity (Step 2). Ensure Age is entered.");
        return;
    }
    const subScore = parseInt(subEl.value);

    // 3. Get Objective Score
    let objScore = 0;
    const objEls = document.querySelectorAll('input[name="obj"]:checked');
    objEls.forEach((el) => {
        objScore += parseInt(el.value);
    });
    if (objScore > 40) objScore = 40; // Cap at 40

    // 4. Total and Display
    const totalScore = hdcScore + subScore + objScore;

    // Determine status
    let status = "", cert = "", activity = "";
    if (totalScore < 40) {
        status = "No or Mild Disability (<40%)";
        cert = "D0 or D1";
        activity = "No or minimal restriction";
    } else if (totalScore <= 70) {
        status = "Moderate Disability (40–70%)";
        cert = "D1";
        activity = "Some restriction of activity";
    } else {
        status = "Severe Disability (>70%)";
        cert = "D1* or D2";
        activity = "Severely restricted physical activity";
    }

    // Update UI
    document.getElementById('hdc-score').innerText = hdcScore;
    document.getElementById('sub-score').innerText = subScore;
    document.getElementById('obj-score').innerText = objScore;
    document.getElementById('total-score').innerText = totalScore;
    
    document.getElementById('status-text').innerText = status;
    document.getElementById('cert-text').innerText = cert;
    document.getElementById('activity-text').innerText = activity;

    const disclaimer = document.getElementById('disclaimer');
    if (totalScore > 70) {
        disclaimer.classList.remove('hidden');
    } else {
        disclaimer.classList.add('hidden');
    }

    // Show result card
    const resultCard = document.getElementById('result');
    resultCard.classList.remove('hidden');
    
    // Change color based on severity
    if(totalScore < 40) resultCard.style.background = "#28a745"; // Green
    else if(totalScore <= 70) resultCard.style.background = "#fd7e14"; // Orange
    else resultCard.style.background = "#dc3545"; // Red
    
    // Scroll to result
    resultCard.scrollIntoView({ behavior: 'smooth' });
}
