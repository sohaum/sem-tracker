document.addEventListener('DOMContentLoaded', () => {
    const gradeForm = document.getElementById('gradeForm');
    const gradeInputsDiv = document.getElementById('gradeInputs');
    const generateGraphBtn = document.getElementById('generateGraph');
    const chartContainer = document.querySelector('.chart-container');
    const userDisplay = document.getElementById('userDisplay');
    const gradeChartCanvas = document.getElementById('gradeChart');
    const saveJpegBtn = document.getElementById('saveJpegBtn');
    let chartInstance = null;

    let username = '';
    let semesters = 0;
    let gradeMax = 10;

    gradeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        username = document.getElementById('username').value.trim();
        semesters = parseInt(document.getElementById('semesters').value);
        const gradeMaxSelect = document.getElementById('gradeMax');
        gradeMax = gradeMaxSelect ? parseInt(gradeMaxSelect.value) : 10;

        if (!username || semesters < 1) return;

        // Generate grade input fields
        gradeInputsDiv.innerHTML = '';
        for (let i = 1; i <= semesters; i++) {
            const label = document.createElement('label');
            label.textContent = `Semester ${i} Grade (out of ${gradeMax}):`;
            label.setAttribute('for', `grade${i}`);

            const input = document.createElement('input');
            input.type = 'number';
            input.id = `grade${i}`;
            input.name = `grade${i}`;
            input.placeholder = `Enter grade for Semester ${i}`;
            input.min = "0";
            input.max = gradeMax.toString();
            input.step = "0.01";
            input.required = true;

            gradeInputsDiv.appendChild(label);
            gradeInputsDiv.appendChild(input);
        }
        gradeInputsDiv.classList.remove('hidden');
        generateGraphBtn.classList.remove('hidden');
        chartContainer.classList.add('hidden');
        userDisplay.classList.add('hidden');
        saveJpegBtn.classList.add('hidden');
    });

    generateGraphBtn.addEventListener('click', function() {
        const grades = [];
        let valid = true;
        for (let i = 1; i <= semesters; i++) {
            const val = parseFloat(document.getElementById(`grade${i}`).value);
            if (isNaN(val) || val < 0 || val > gradeMax) {
                valid = false;
                document.getElementById(`grade${i}`).style.border = '2px solid #fc5c7d';
            } else {
                document.getElementById(`grade${i}`).style.border = '';
                grades.push(parseFloat(val.toFixed(2)));
            }
        }
        if (!valid) {
            alert(`Please enter valid grades (0-${gradeMax}, up to 2 decimal places) for all semesters.`);
            return;
        }

        // Prepare chart data
        const labels = [];
        for (let i = 1; i <= semesters; i++) {
            labels.push(`Sem ${i}`);
        }

        // Destroy previous chart if exists
        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(gradeChartCanvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Grade',
                    data: grades,
                    borderColor: '#6a82fb',
                    backgroundColor: 'rgba(106,130,251,0.15)',
                    pointBackgroundColor: '#fc5c7d',
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: { display: false },
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        font: {
                            weight: 'bold'
                        },
                        color: '#fc5c7d',
                        formatter: function(value) {
                            return value.toFixed(2);
                        }
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: gradeMax,
                        title: {
                            display: true,
                            text: `Grade (out of ${gradeMax})`
                        },
                        ticks: {
                            stepSize: 1
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Your Semester Grade'
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });

        userDisplay.textContent = username;
        userDisplay.classList.remove('hidden');
        chartContainer.classList.remove('hidden');
        saveJpegBtn.classList.remove('hidden');
    });

    saveJpegBtn.addEventListener('click', function() {
        // Create a temporary canvas to combine username and chart
        const chartCanvas = gradeChartCanvas;
        const tempCanvas = document.createElement('canvas');
        const ctx = tempCanvas.getContext('2d');
        // Set canvas size to chart size + space for username
        tempCanvas.width = chartCanvas.width;
        tempCanvas.height = chartCanvas.height + 40;

        // Fill background white
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

        // Draw username at top right
        ctx.font = "bold 20px Segoe UI, Arial";
        ctx.fillStyle = "#6a82fb";
        ctx.textAlign = "right";
        ctx.fillText(userDisplay.textContent, tempCanvas.width - 20, 30);

        // Draw the chart below the username
        ctx.drawImage(chartCanvas, 0, 40);

        // Save as JPEG
        const link = document.createElement('a');
        link.download = 'semester-grade-chart.jpg';
       link.href = tempCanvas.toDataURL('image/jpeg', 1.0);
        link.click();
    });
});