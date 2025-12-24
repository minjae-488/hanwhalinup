const rosterData = [
    // --- 포수 (Catchers) ---
    {
        "id": "p001", "name": "최재훈", "position": "C", "hand": "R",
        "category": "포수",
        "stats": { "avg": 0.250, "probability": { "single": 0.15, "double": 0.04, "triple": 0.00, "homerun": 0.02, "walk": 0.09, "strikeout": 0.15, "groundout": 0.30, "flyout": 0.25 } }
    },
    {
        "id": "p002", "name": "박상언", "position": "C", "hand": "R",
        "category": "포수",
        "stats": { "avg": 0.230, "probability": { "single": 0.14, "double": 0.03, "triple": 0.00, "homerun": 0.01, "walk": 0.05, "strikeout": 0.20, "groundout": 0.35, "flyout": 0.22 } }
    },

    // --- 내야수 (Infielders) ---
    {
        "id": "p003", "name": "채은성", "position": "1B", "hand": "R",
        "category": "내야수",
        "stats": { "avg": 0.280, "probability": { "single": 0.16, "double": 0.06, "triple": 0.00, "homerun": 0.05, "walk": 0.08, "strikeout": 0.18, "groundout": 0.20, "flyout": 0.27 } }
    },
    {
        "id": "p004", "name": "문현빈", "position": "2B", "hand": "L",
        "category": "내야수",
        "stats": { "avg": 0.284, "probability": { "single": 0.18, "double": 0.05, "triple": 0.01, "homerun": 0.04, "walk": 0.08, "strikeout": 0.18, "groundout": 0.25, "flyout": 0.21 } }
    },
    {
        "id": "p005", "name": "노시환", "position": "3B", "hand": "R",
        "category": "내야수",
        "stats": { "avg": 0.298, "probability": { "single": 0.15, "double": 0.06, "triple": 0.00, "homerun": 0.07, "walk": 0.10, "strikeout": 0.20, "groundout": 0.15, "flyout": 0.27 } }
    },
    {
        "id": "p006", "name": "하주석", "position": "SS", "hand": "L",
        "category": "내야수",
        "stats": { "avg": 0.240, "probability": { "single": 0.14, "double": 0.03, "triple": 0.01, "homerun": 0.02, "walk": 0.06, "strikeout": 0.25, "groundout": 0.30, "flyout": 0.19 } }
    },
    {
        "id": "p007", "name": "안치홍", "position": "DH", "hand": "R",
        "category": "내야수",
        "stats": { "avg": 0.290, "probability": { "single": 0.18, "double": 0.06, "triple": 0.00, "homerun": 0.03, "walk": 0.08, "strikeout": 0.14, "groundout": 0.25, "flyout": 0.26 } }
    },
    {
        "id": "p008", "name": "김태연", "position": "1B", "hand": "R",
        "category": "내야수",
        "stats": { "avg": 0.265, "probability": { "single": 0.15, "double": 0.04, "triple": 0.00, "homerun": 0.03, "walk": 0.07, "strikeout": 0.22, "groundout": 0.29, "flyout": 0.20 } }
    },
    {
        "id": "p009", "name": "이도윤", "position": "SS", "hand": "L",
        "category": "내야수",
        "stats": { "avg": 0.252, "probability": { "single": 0.16, "double": 0.03, "triple": 0.00, "homerun": 0.00, "walk": 0.06, "strikeout": 0.15, "groundout": 0.40, "flyout": 0.20 } }
    },
    {
        "id": "p010", "name": "장진혁", "position": "2B", "hand": "R",
        "category": "내야수",
        "stats": { "avg": 0.268, "probability": { "single": 0.17, "double": 0.04, "triple": 0.00, "homerun": 0.02, "walk": 0.07, "strikeout": 0.19, "groundout": 0.28, "flyout": 0.23 } }
    },

    // --- 외야수 (Outfielders) ---
    {
        "id": "p011", "name": "이진영", "position": "LF", "hand": "R",
        "category": "외야수",
        "stats": { "avg": 0.260, "probability": { "single": 0.14, "double": 0.05, "triple": 0.01, "homerun": 0.03, "walk": 0.09, "strikeout": 0.22, "groundout": 0.26, "flyout": 0.20 } }
    },
    {
        "id": "p012", "name": "정은원", "position": "CF", "hand": "L",
        "category": "외야수",
        "stats": { "avg": 0.270, "probability": { "single": 0.16, "double": 0.04, "triple": 0.01, "homerun": 0.01, "walk": 0.12, "strikeout": 0.18, "groundout": 0.30, "flyout": 0.18 } }
    },
    {
        "id": "p013", "name": "페라자", "position": "RF", "hand": "S",
        "category": "외야수",
        "stats": { "avg": 0.295, "probability": { "single": 0.17, "double": 0.07, "triple": 0.01, "homerun": 0.06, "walk": 0.09, "strikeout": 0.19, "groundout": 0.22, "flyout": 0.19 } }
    },
    {
        "id": "p014", "name": "최인호", "position": "LF", "hand": "L",
        "category": "외야수",
        "stats": { "avg": 0.275, "probability": { "single": 0.17, "double": 0.04, "triple": 0.01, "homerun": 0.01, "walk": 0.06, "strikeout": 0.18, "groundout": 0.30, "flyout": 0.23 } }
    },
    {
        "id": "p015", "name": "김강민", "position": "CF", "hand": "R",
        "category": "외야수",
        "stats": { "avg": 0.245, "probability": { "single": 0.13, "double": 0.04, "triple": 0.00, "homerun": 0.02, "walk": 0.07, "strikeout": 0.25, "groundout": 0.25, "flyout": 0.24 } }
    },
    {
        "id": "p016", "name": "이원석", "position": "RF", "hand": "R",
        "category": "외야수",
        "stats": { "avg": 0.258, "probability": { "single": 0.15, "double": 0.04, "triple": 0.00, "homerun": 0.02, "walk": 0.08, "strikeout": 0.21, "groundout": 0.27, "flyout": 0.23 } }
    }
];

export default rosterData;
