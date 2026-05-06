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

const modal = document.getElementById("player-modal");
const modalName = document.getElementById("modal-player-name");
const modalTeam = document.getElementById("modal-player-team");
const modalGoals = document.getElementById("modal-player-goals");
const modalAssists = document.getElementById("modal-player-assists");
const modalPoints = document.getElementById("modal-player-points");

function openPlayerModal(row) {
    modalName.textContent = row.cells[0].textContent;
    modalTeam.textContent = row.cells[1].textContent;
    modalGoals.textContent = row.cells[2].textContent;
    modalAssists.textContent = row.cells[3].textContent;
    modalPoints.textContent = row.cells[4].textContent;
    modal.classList.remove("hidden");
}

function closePlayerModal() {
    modal.classList.add("hidden");
}

document.querySelectorAll("table tbody tr").forEach(row => {
    row.addEventListener("click", () => openPlayerModal(row));
});

modal.querySelector(".modal-close").addEventListener("click", closePlayerModal);
modal.querySelector(".modal-backdrop").addEventListener("click", closePlayerModal);
