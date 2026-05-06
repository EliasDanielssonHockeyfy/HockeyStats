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

function openPlayerModal(row) {
    document.getElementById("modal-player-name").textContent = row.cells[0].textContent;
    document.getElementById("modal-player-team").textContent = row.cells[1].textContent;
    document.getElementById("modal-player-goals").textContent = row.cells[2].textContent;
    document.getElementById("modal-player-assists").textContent = row.cells[3].textContent;
    document.getElementById("modal-player-points").textContent = row.cells[4].textContent;
    document.getElementById("player-modal").classList.remove("hidden");
}

function closePlayerModal() {
    document.getElementById("player-modal").classList.add("hidden");
}

document.querySelectorAll("table tbody tr").forEach(row => {
    row.addEventListener("click", () => openPlayerModal(row));
});

document.querySelector("#player-modal .modal-close").addEventListener("click", closePlayerModal);
document.querySelector("#player-modal .modal-backdrop").addEventListener("click", closePlayerModal);
