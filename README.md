# 📊 Semester Grade Tracker

A web app to track your semester grades, visualize your GPA trend, and export your chart as a JPEG image.

---

## 🚀 Features

- Enter your name, number of semesters, and grading scale (out of 10 or 5)
- Input your GPA for each semester (supports decimals)
- Interactive line graph with GPA labels at each point
- Username displayed at the top right above the chart
- Export the chart (with username) as a JPEG image

---

## 🛠️ How to Run

```bash
# 1. Clone or download this repository
git clone <repo-url>
cd semester

# 2. Open index.html in your browser
start index.html  # On Windows
# or
xdg-open index.html  # On Linux
# or
open index.html  # On macOS
```

---

## 📂 Project Structure

```bash
semester/
├── index.html
├── styles.css
├── script.js
└── README.md
```

---

## 📝 Usage

1. Enter your name and number of semesters.
2. Select your grading scale (out of 10 or 5).
3. Enter your GPA for each semester.
4. Click **Generate Graph** to view your trend.
5. Click **Save as JPEG** to download the chart with your name.

---

## 🖼️ Example

![screenshot](screenshot.jpg)

---

## 📦 Dependencies

- [Chart.js](https://www.chartjs.org/)
- [chartjs-plugin-datalabels](https://chartjs-plugin-datalabels.netlify.app/)

Both are loaded via CDN in `index.html`.

---

## 💡 License

MIT License