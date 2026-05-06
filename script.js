function renderTable() {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";
    players.forEach(p => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${p.player}</td><td>${p.team}</td><td>${p.goals}</td><td>${p.assists}</td><td>${p.points}</td>`;
        tbody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", renderTable);

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
