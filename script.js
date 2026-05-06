const players = [
    { name: "Alice Karlsson", team: "Sundsvall IK", goals: 12, assists: 15, points: 25 },
    { name: "Bob Eriksson", team: "Timra IK", goals: 9, assists: 18, points: 27 },
    { name: "Clara Nilsson", team: "Sundsvall IK", goals: 14, assists: 10, points: 22 },
];

let currentView = "players";

const playerHeaders = ["Player", "Team", "Goals", "Assists", "Points"];
const teamHeaders = ["Team", "Players", "Total Goals", "Total Assists", "Total Points"];

function aggregateTeams() {
    const map = new Map();
    for (const p of players) {
        const t = map.get(p.team) || { team: p.team, players: 0, goals: 0, assists: 0, points: 0 };
        t.players += 1;
        t.goals += p.goals;
        t.assists += p.assists;
        t.points += p.points;
        map.set(p.team, t);
    }
    return Array.from(map.values());
}

function renderTable() {
    const thead = document.querySelector("table thead");
    const tbody = document.querySelector("table tbody");

    const headers = currentView === "players" ? playerHeaders : teamHeaders;
    thead.innerHTML = "<tr>" + headers.map(h => `<th>${h}</th>`).join("") + "</tr>";

    let rows;
    if (currentView === "players") {
        rows = players.map(p =>
            `<tr><td>${p.name}</td><td>${p.team}</td><td>${p.goals}</td><td>${p.assists}</td><td>${p.points}</td></tr>`
        );
    } else {
        const teams = aggregateTeams().sort((a, b) => b.points - a.points);
        rows = teams.map(t =>
            `<tr><td>${t.team}</td><td>${t.players}</td><td>${t.goals}</td><td>${t.assists}</td><td>${t.points}</td></tr>`
        );
    }
    tbody.innerHTML = rows.join("");
}

function setView(view) {
    currentView = view;
    renderTable();
}

function sortTable() {
    if (currentView === "players") {
        players.sort((a, b) => b.points - a.points);
    }
    renderTable();
}

renderTable();
