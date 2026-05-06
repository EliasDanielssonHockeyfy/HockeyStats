function sortTable() {
    const table = document.querySelector("table tbody");
    const rows = Array.from(table.querySelectorAll("tr"));

    rows.sort((a, b) => {
        const pointsA = parseInt(a.cells[4].textContent);
        const pointsB = parseInt(b.cells[4].textContent);
        // BUG: sorts ascending instead of descending
        return pointsA - pointsB;
    });

    rows.forEach(row => table.appendChild(row));
}

function renderTopScorersChart() {
    const container = document.getElementById("topScorers");
    if (!container) return;

    const tbody = document.querySelector("table tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const players = rows
        .map(row => ({
            name: row.cells[0].textContent,
            points: parseInt(row.cells[4].textContent, 10)
        }))
        .sort((a, b) => b.points - a.points)
        .slice(0, 5);

    if (players.length === 0) return;

    const maxPoints = players[0].points;
    const rowHeight = 40;
    const barHeight = 24;
    const totalWidth = 600;
    const barAreaStart = 160;
    const valueLabelSpace = 50;
    const barAreaWidth = totalWidth - barAreaStart - valueLabelSpace;
    const totalHeight = players.length * rowHeight;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", `0 0 ${totalWidth} ${totalHeight}`);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", totalHeight);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Top 5 players by points");

    players.forEach((player, i) => {
        const centerY = i * rowHeight + rowHeight / 2;
        const barWidth = (player.points / maxPoints) * barAreaWidth;

        const nameText = document.createElementNS(svgNS, "text");
        nameText.setAttribute("x", "0");
        nameText.setAttribute("y", centerY);
        nameText.setAttribute("dominant-baseline", "middle");
        nameText.setAttribute("fill", "#333");
        nameText.textContent = player.name;
        svg.appendChild(nameText);

        const bar = document.createElementNS(svgNS, "rect");
        bar.setAttribute("x", barAreaStart);
        bar.setAttribute("y", centerY - barHeight / 2);
        bar.setAttribute("width", barWidth);
        bar.setAttribute("height", barHeight);
        bar.setAttribute("fill", "#1e3a8a");
        svg.appendChild(bar);

        const pointsText = document.createElementNS(svgNS, "text");
        pointsText.setAttribute("x", barAreaStart + barWidth + 6);
        pointsText.setAttribute("y", centerY);
        pointsText.setAttribute("dominant-baseline", "middle");
        pointsText.setAttribute("fill", "#333");
        pointsText.textContent = player.points;
        svg.appendChild(pointsText);
    });

    container.appendChild(svg);
}

document.addEventListener("DOMContentLoaded", renderTopScorersChart);
