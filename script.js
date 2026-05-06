const FAVORITES_KEY = "hockeyStats.favorites";
const FAVORITES_ONLY_KEY = "hockeyStats.favoritesOnly";

function loadFavorites() {
    try {
        const raw = localStorage.getItem(FAVORITES_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return new Set(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
        return new Set();
    }
}

function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
}

function getPlayerName(row) {
    return row.cells[1].textContent.trim();
}

function applyFavoritesFilter(showFavoritesOnly, favorites) {
    const rows = document.querySelectorAll("table tbody tr");
    rows.forEach(row => {
        const isFavorite = favorites.has(getPlayerName(row));
        row.style.display = showFavoritesOnly && !isFavorite ? "none" : "";
    });
}

function renderStars(favorites) {
    const rows = document.querySelectorAll("table tbody tr");
    rows.forEach(row => {
        const button = row.querySelector(".favorite-toggle");
        const isFavorite = favorites.has(getPlayerName(row));
        button.textContent = isFavorite ? "★" : "☆";
        button.classList.toggle("is-favorite", isFavorite);
    });
}

function sortTable() {
    const table = document.querySelector("table tbody");
    const rows = Array.from(table.querySelectorAll("tr"));

    rows.sort((a, b) => {
        const pointsA = parseInt(a.cells[5].textContent);
        const pointsB = parseInt(b.cells[5].textContent);
        // BUG: sorts ascending instead of descending
        return pointsA - pointsB;
    });

    rows.forEach(row => table.appendChild(row));
}

document.addEventListener("DOMContentLoaded", () => {
    const favorites = loadFavorites();
    const checkbox = document.getElementById("favorites-only");
    const showFavoritesOnly = localStorage.getItem(FAVORITES_ONLY_KEY) === "true";
    checkbox.checked = showFavoritesOnly;

    renderStars(favorites);
    applyFavoritesFilter(checkbox.checked, favorites);

    document.querySelectorAll(".favorite-toggle").forEach(button => {
        button.addEventListener("click", () => {
            const row = button.closest("tr");
            const name = getPlayerName(row);
            if (favorites.has(name)) {
                favorites.delete(name);
            } else {
                favorites.add(name);
            }
            saveFavorites(favorites);
            renderStars(favorites);
            applyFavoritesFilter(checkbox.checked, favorites);
        });
    });

    checkbox.addEventListener("change", () => {
        localStorage.setItem(FAVORITES_ONLY_KEY, String(checkbox.checked));
        applyFavoritesFilter(checkbox.checked, favorites);
    });
});
