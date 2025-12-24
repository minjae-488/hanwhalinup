const rosterData = [
    // --- Catchers ---
    {
        "id": "p01", "name": "Choi Jae-hoon", "position": "C", "hand": "R",
        "category": "Catcher",
        "stats": { "avg": 0.250, "probability": { "single": 0.15, "double": 0.04, "triple": 0.00, "homerun": 0.02, "walk": 0.09, "strikeout": 0.15, "groundout": 0.30, "flyout": 0.25 } }
    },
    {
        "id": "p10", "name": "Park Sang-eon", "position": "C", "hand": "R",
        "category": "Catcher",
        "stats": { "avg": 0.230, "probability": { "single": 0.14, "double": 0.03, "triple": 0.00, "homerun": 0.01, "walk": 0.05, "strikeout": 0.20, "groundout": 0.35, "flyout": 0.22 } }
    },

    // --- Infielders ---
    {
        "id": "p02", "name": "Chae Eun-seong", "position": "1B", "hand": "R",
        "category": "Infielder",
        "stats": { "avg": 0.280, "probability": { "single": 0.16, "double": 0.06, "triple": 0.00, "homerun": 0.05, "walk": 0.08, "strikeout": 0.18, "groundout": 0.20, "flyout": 0.27 } }
    },
    {
        "id": "p03", "name": "Moon Hyun-bin", "position": "2B", "hand": "L",
        "category": "Infielder",
        "stats": { "avg": 0.284, "probability": { "single": 0.18, "double": 0.05, "triple": 0.01, "homerun": 0.04, "walk": 0.08, "strikeout": 0.18, "groundout": 0.25, "flyout": 0.21 } }
    },
    {
        "id": "p04", "name": "Roh Si-hwan", "position": "3B", "hand": "R",
        "category": "Infielder",
        "stats": { "avg": 0.298, "probability": { "single": 0.15, "double": 0.06, "triple": 0.00, "homerun": 0.07, "walk": 0.10, "strikeout": 0.20, "groundout": 0.15, "flyout": 0.27 } }
    },
    {
        "id": "p05", "name": "Ha Ju-suk", "position": "SS", "hand": "L",
        "category": "Infielder",
        "stats": { "avg": 0.240, "probability": { "single": 0.14, "double": 0.03, "triple": 0.01, "homerun": 0.02, "walk": 0.06, "strikeout": 0.25, "groundout": 0.30, "flyout": 0.19 } }
    },
    {
        "id": "p09", "name": "An Chi-hong", "position": "DH", "hand": "R",
        "category": "Infielder",
        "stats": { "avg": 0.290, "probability": { "single": 0.18, "double": 0.06, "triple": 0.00, "homerun": 0.03, "walk": 0.08, "strikeout": 0.14, "groundout": 0.25, "flyout": 0.26 } }
    },
    {
        "id": "p11", "name": "Kim Tae-yeon", "position": "1B", "hand": "R",
        "category": "Infielder",
        "stats": { "avg": 0.265, "probability": { "single": 0.15, "double": 0.04, "triple": 0.00, "homerun": 0.03, "walk": 0.07, "strikeout": 0.22, "groundout": 0.29, "flyout": 0.20 } }
    },
    {
        "id": "p12", "name": "Lee Do-yun", "position": "SS", "hand": "L",
        "category": "Infielder",
        "stats": { "avg": 0.252, "probability": { "single": 0.16, "double": 0.03, "triple": 0.00, "homerun": 0.00, "walk": 0.06, "strikeout": 0.15, "groundout": 0.40, "flyout": 0.20 } }
    },

    // --- Outfielders ---
    {
        "id": "p06", "name": "Lee Jin-young", "position": "LF", "hand": "R",
        "category": "Outfielder",
        "stats": { "avg": 0.260, "probability": { "single": 0.14, "double": 0.05, "triple": 0.01, "homerun": 0.03, "walk": 0.09, "strikeout": 0.22, "groundout": 0.26, "flyout": 0.20 } }
    },
    {
        "id": "p07", "name": "Jung Eun-won", "position": "CF", "hand": "L",
        "category": "Outfielder",
        "stats": { "avg": 0.270, "probability": { "single": 0.16, "double": 0.04, "triple": 0.01, "homerun": 0.01, "walk": 0.12, "strikeout": 0.18, "groundout": 0.30, "flyout": 0.18 } }
    },
    {
        "id": "p08", "name": "Yonathan Peraza", "position": "RF", "hand": "S",
        "category": "Outfielder",
        "stats": { "avg": 0.295, "probability": { "single": 0.17, "double": 0.07, "triple": 0.01, "homerun": 0.06, "walk": 0.09, "strikeout": 0.19, "groundout": 0.22, "flyout": 0.19 } }
    },
    {
        "id": "p13", "name": "Choi In-ho", "position": "LF", "hand": "L",
        "category": "Outfielder",
        "stats": { "avg": 0.275, "probability": { "single": 0.17, "double": 0.04, "triple": 0.01, "homerun": 0.01, "walk": 0.06, "strikeout": 0.18, "groundout": 0.30, "flyout": 0.23 } }
    },
    {
        "id": "p14", "name": "Kim Kang-min", "position": "CF", "hand": "R",
        "category": "Outfielder",
        "stats": { "avg": 0.245, "probability": { "single": 0.13, "double": 0.04, "triple": 0.00, "homerun": 0.02, "walk": 0.07, "strikeout": 0.25, "groundout": 0.25, "flyout": 0.24 } }
    },

    // --- Pitchers (Pitchers usually don't bat in KBO/DH rule, but included for completeness or if rule changes) ---
    {
        "id": "p15", "name": "Ryu Hyun-jin", "position": "P", "hand": "L",
        "category": "Pitcher",
        "stats": { "avg": 0.150, "probability": { "single": 0.10, "double": 0.02, "triple": 0.00, "homerun": 0.00, "walk": 0.03, "strikeout": 0.50, "groundout": 0.20, "flyout": 0.15 } }
    },
    {
        "id": "p16", "name": "Felix Pena", "position": "P", "hand": "R",
        "category": "Pitcher",
        "stats": { "avg": 0.100, "probability": { "single": 0.08, "double": 0.01, "triple": 0.00, "homerun": 0.00, "walk": 0.01, "strikeout": 0.60, "groundout": 0.20, "flyout": 0.10 } }
    }
];

export default rosterData;
