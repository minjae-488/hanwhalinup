const rosterData = [
    // --- 포수 (Catchers) ---
    {
        "id": "p01", "name": "최재훈", "position": "C", "hand": "R",
        "category": "포수",
        "stats": { "avg": 0.250, "probability": { "single": 0.15, "double": 0.04, "triple": 0.00, "homerun": 0.02, "walk": 0.09, "strikeout": 0.15, "groundout": 0.30, "flyout": 0.25 } }
    },
    {
        "id": "p10", "name": "박상언", "position": "C", "hand": "R",
        "category": "포수",
        "stats": { "avg": 0.230, "probability": { "single": 0.14, "double": 0.03, "triple": 0.00, "homerun": 0.01, "walk": 0.05, "strikeout": 0.20, "groundout": 0.35, "flyout": 0.22 } }
    },

    // --- 내야수 (Infielders) ---
    {
        "id": "p02", "name": "채은성", "position": "1B", "hand": "R",
        "category": "내야수",
        "stats": { "avg": 0.280, "probability": { "single": 0.16, "double": 0.06, "triple": 0.00, "homerun": 0.05, "walk": 0.08, "strikeout": 0.18, "groundout": 0.20, "flyout": 0.27 } }
    },
    {
        "id": "p03", "name": "문현빈", "position": "2B", "hand": "L",
        "category": "내야수",
        "stats": { "avg": 0.284, "probability": { "single": 0.18, "double": 0.05, "triple": 0.01, "homerun": 0.04, "walk": 0.08, "strikeout": 0.18, "groundout": 0.25, "flyout": 0.21 } }
    },
    {
        "id": "p04", "name": "노시환", "position": "3B", "hand": "R",
        "category": "내야수",
        "stats": { "avg": 0.298, "probability": { "single": 0.15, "double": 0.06, "triple": 0.00, "homerun": 0.07, "walk": 0.10, "strikeout": 0.20, "groundout": 0.15, "flyout": 0.27 } }
    },
    {
        "id": "p05", "name": "하주석", "position": "SS", "hand": "L",
        "category": "내야수",
        "stats": { "avg": 0.240, "probability": { "single": 0.14, "double": 0.03, "triple": 0.01, "homerun": 0.02, "walk": 0.06, "strikeout": 0.25, "groundout": 0.30, "flyout": 0.19 } }
    },
    {
        "id": "p09", "name": "안치홍", "position": "DH", "hand": "R",
        "category": "내야수",
        "stats": { "avg": 0.290, "probability": { "single": 0.18, "double": 0.06, "triple": 0.00, "homerun": 0.03, "walk": 0.08, "strikeout": 0.14, "groundout": 0.25, "flyout": 0.26 } }
    },
    {
        "id": "p11", "name": "김태연", "position": "1B", "hand": "R",
        "category": "내야수",
        "stats": { "avg": 0.265, "probability": { "single": 0.15, "double": 0.04, "triple": 0.00, "homerun": 0.03, "walk": 0.07, "strikeout": 0.22, "groundout": 0.29, "flyout": 0.20 } }
    },
    {
        "id": "p12", "name": "이도윤", "position": "SS", "hand": "L",
        "category": "내야수",
        "stats": { "avg": 0.252, "probability": { "single": 0.16, "double": 0.03, "triple": 0.00, "homerun": 0.00, "walk": 0.06, "strikeout": 0.15, "groundout": 0.40, "flyout": 0.20 } }
    },

    // --- 외야수 (Outfielders) ---
    {
        "id": "p06", "name": "이진영", "position": "LF", "hand": "R",
        "category": "외야수",
        "stats": { "avg": 0.260, "probability": { "single": 0.14, "double": 0.05, "triple": 0.01, "homerun": 0.03, "walk": 0.09, "strikeout": 0.22, "groundout": 0.26, "flyout": 0.20 } }
    },
    {
        "id": "p07", "name": "정은원", "position": "CF", "hand": "L",
        "category": "외야수",
        "stats": { "avg": 0.270, "probability": { "single": 0.16, "double": 0.04, "triple": 0.01, "homerun": 0.01, "walk": 0.12, "strikeout": 0.18, "groundout": 0.30, "flyout": 0.18 } }
    },
    {
        "id": "p08", "name": "페라자", "position": "RF", "hand": "S",
        "category": "외야수",
        "stats": { "avg": 0.295, "probability": { "single": 0.17, "double": 0.07, "triple": 0.01, "homerun": 0.06, "walk": 0.09, "strikeout": 0.19, "groundout": 0.22, "flyout": 0.19 } }
    },
    {
        "id": "p13", "name": "최인호", "position": "LF", "hand": "L",
        "category": "외야수",
        "stats": { "avg": 0.275, "probability": { "single": 0.17, "double": 0.04, "triple": 0.01, "homerun": 0.01, "walk": 0.06, "strikeout": 0.18, "groundout": 0.30, "flyout": 0.23 } }
    },
    {
        "id": "p14", "name": "김강민", "position": "CF", "hand": "R",
        "category": "외야수",
        "stats": { "avg": 0.245, "probability": { "single": 0.13, "double": 0.04, "triple": 0.00, "homerun": 0.02, "walk": 0.07, "strikeout": 0.25, "groundout": 0.25, "flyout": 0.24 } }
    },

    // --- 투수 (Pitchers) ---
    {
        "id": "p15", "name": "류현진", "position": "P", "hand": "L",
        "category": "투수",
        "stats": { "avg": 0.150, "probability": { "single": 0.10, "double": 0.02, "triple": 0.00, "homerun": 0.00, "walk": 0.03, "strikeout": 0.50, "groundout": 0.20, "flyout": 0.15 } }
    },
    {
        "id": "p16", "name": "페냐", "position": "P", "hand": "R",
        "category": "투수",
        "stats": { "avg": 0.100, "probability": { "single": 0.08, "double": 0.01, "triple": 0.00, "homerun": 0.00, "walk": 0.01, "strikeout": 0.60, "groundout": 0.20, "flyout": 0.10 } }
    }
];

export default rosterData;
