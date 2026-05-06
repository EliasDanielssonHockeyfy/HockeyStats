const players = [
    { name: "Alice Karlsson", team: "Sundsvall IK", goals: 12, assists: 15, points: 25 },
    { name: "Bob Eriksson", team: "Timra IK", goals: 9, assists: 18, points: 27 },
    { name: "Clara Nilsson", team: "Sundsvall IK", goals: 14, assists: 10, points: 22 },
];

const playerHeaders = ["Player", "Team", "Goals", "Assists", "Points"];
const teamHeaders = ["Team", "Players", "Total Goals", "Total Assists", "Total Points"];

let currentView = "players";

function aggregateByTeam(rows) {
    const teams = new Map();
    for (const p of rows) {
        if (!teams.has(p.team)) {
            teams.set(p.team, { team: p.team, playerCount: 0, goals: 0, assists: 0, points: 0 });
        }
        const t = teams.get(p.team);
        t.playerCount += 1;
        t.goals += p.goals;
        t.assists += p.assists;
        t.points += p.points;
    }
    return Array.from(teams.values());
}

function renderHeaders(headers) {
    const thead = document.querySelector("table thead");
    thead.innerHTML = "<tr>" + headers.map(h => `<th>${h}</th>`).join("") + "</tr>";
}

function renderPlayerRows(rows) {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = rows.map(p =>
        `<tr><td>${p.name}</td><td>${p.team}</td><td>${p.goals}</td><td>${p.assists}</td><td>${p.points}</td></tr>`
    ).join("");
}

function renderTeamRows(rows) {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = rows.map(t =>
        `<tr><td>${t.team}</td><td>${t.playerCount}</td><td>${t.goals}</td><td>${t.assists}</td><td>${t.points}</td></tr>`
    ).join("");
}

function render() {
    const playersBtn = document.getElementById("view-players");
    const teamsBtn = document.getElementById("view-teams");
    playersBtn.classList.toggle("active", currentView === "players");
    teamsBtn.classList.toggle("active", currentView === "teams");

    if (currentView === "teams") {
        renderHeaders(teamHeaders);
        const teams = aggregateByTeam(players).sort((a, b) => b.points - a.points);
        renderTeamRows(teams);
    } else {
        renderHeaders(playerHeaders);
        renderPlayerRows(players);
    }
}

function setView(view) {
    currentView = view;
    render();
}

function sortTable() {
    const tbody = document.querySelector("table tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((a, b) => {
        const pointsA = parseInt(a.cells[4].textContent);
        const pointsB = parseInt(b.cells[4].textContent);
        return pointsB - pointsA;
    });

    rows.forEach(row => tbody.appendChild(row));
}

render();
