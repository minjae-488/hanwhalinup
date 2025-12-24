import requests
from bs4 import BeautifulSoup
import pandas as pd
import json
import os
import random

# For MVP, Statiz crawling needs careful handling of dynamic content or strict legal check.
# Instead, we will simulate the crawling process by fetching from a mock source or generating realistic data
# that helps the visual demonstration.
# In a real scenario, this would request(https://statiz.co.kr/...) and parse HTML table.

def fetch_hanwha_roster():
    print("Fetching Hanwha Eagles roster data...")
    
    # 2024 Hanwha Eagles Key Players Mock Data (Realistic Stats)
    # This data structure matches what Player.js expects in 'stats'
    mock_data = [
        { "id": "p01", "name": "Choi Jae-hoon", "position": "C", "hand": "R", "avg": 0.250 },
        { "id": "p02", "name": "Chae Eun-seong", "position": "1B", "hand": "R", "avg": 0.280, "hr": 20 },
        { "id": "p03", "name": "Moon Hyun-bin", "position": "2B", "hand": "L", "avg": 0.284 },
        { "id": "p04", "name": "Roh Si-hwan", "position": "3B", "hand": "R", "avg": 0.298, "hr": 31 },
        { "id": "p05", "name": "Ha Ju-suk", "position": "SS", "hand": "L", "avg": 0.240 },
        { "id": "p06", "name": "Lee Jin-young", "position": "LF", "hand": "R", "avg": 0.260 },
        { "id": "p07", "name": "Jung Eun-won", "position": "CF", "hand": "L", "avg": 0.270 },
        { "id": "p08", "name": "Yonathan Peraza", "position": "RF", "hand": "S", "avg": 0.295, "hr": 25 },
        { "id": "p09", "name": "An Chi-hong", "position": "DH", "hand": "R", "avg": 0.290 }
    ]

    players_list = []
    
    for p in mock_data:
        # Generate detailed probabilities based on AVG/HR
        # This 'process' step converts raw stats to simulation probabilities
        processed = calculate_probabilities(p)
        
        player_obj = {
            "id": p["id"],
            "name": p["name"],
            "position": p["position"],
            "hand": p["hand"],
            "stats": processed  # In JS, this is player.stats
        }
        players_list.append(player_obj)
        
    return players_list

def calculate_probabilities(raw_stats):
    avg = raw_stats.get('avg', 0.250)
    hr_potential = raw_stats.get('hr', 5) / 144.0; # HR per game approx
    
    # Simple constraints
    # Sum of OPS events approx AVG + OBP diff... simplified logic:
    
    single = avg * 0.7
    double = avg * 0.2
    triple = avg * 0.05
    homerun = hr_potential * 0.15 # Reduced scale for single at bat logic
    
    # Normalize HR to ensure it's distinct
    if raw_stats.get('hr', 0) > 20:
        homerun = 0.06 # Higher prob for sluggers
        
    walk = 0.08
    strikeout = 0.20
    
    # Remaining for outs
    out_prob = 1.0 - (single + double + triple + homerun + walk)
    groundout = out_prob * 0.5
    flyout = out_prob * 0.5
    
    prob_map = {
        "single": round(single, 3),
        "double": round(double, 3),
        "triple": round(triple, 3),
        "homerun": round(homerun, 3),
        "walk": round(walk, 3),
        "strikeout": round(strikeout, 3),
        "groundout": round(groundout, 3),
        "flyout": round(flyout, 3)
    }
    
    return {
        "avg": avg,
        "probability": prob_map
    }

def main():
    players = fetch_hanwha_roster()
    
    # Ensure directory exists
    output_dir = os.path.join("..", "src", "data")
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    output_file = os.path.join(output_dir, "roster_generated.json")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(players, f, indent=4, ensure_ascii=False)
        
    print(f"Successfully generated {len(players)} players data to {output_file}")
    
    # Update roster.js to import this json? 
    # Or overwrite roster.js directly with JS module syntax for ease of use in vanilla JS project
    js_output_file = os.path.join(output_dir, "roster.js")
    with open(js_output_file, 'w', encoding='utf-8') as f:
        f.write("const rosterData = ")
        json.dump(players, f, indent=4, ensure_ascii=False)
        f.write(";\n\nexport default rosterData;")
        
    print(f"Updated JS module at {js_output_file}")

if __name__ == "__main__":
    main()
