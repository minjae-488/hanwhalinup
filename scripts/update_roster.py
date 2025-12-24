#!/usr/bin/env python3
"""
KBO 한화 이글스 선수 데이터 크롤링 및 roster.js 생성 스크립트
"""

import requests
from bs4 import BeautifulSoup
import json
import re
from datetime import datetime

def fetch_hanwha_roster():
    """KBO 공식 사이트에서 한화 이글스 선수 명단 크롤링"""
    
    # KBO 한화 이글스 선수 명단 페이지
    url = "https://www.koreabaseball.com/Record/Player/HitterBasic/Basic1.aspx"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    params = {
        'TeamCode': 'HH',  # 한화 이글스 팀 코드
        'Year': datetime.now().year
    }
    
    try:
        response = requests.get(url, headers=headers, params=params, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        players = []
        
        # 타자 테이블 파싱
        table = soup.select_one('table.tData')
        if table:
            rows = table.select('tbody tr')
            
            for idx, row in enumerate(rows):
                cols = row.select('td')
                if len(cols) < 10:
                    continue
                
                try:
                    name = cols[1].get_text(strip=True)
                    position = cols[2].get_text(strip=True)
                    
                    # 포지션 매핑
                    pos_map = {
                        '포수': 'C',
                        '1루수': '1B',
                        '2루수': '2B',
                        '3루수': '3B',
                        '유격수': 'SS',
                        '좌익수': 'LF',
                        '중견수': 'CF',
                        '우익수': 'RF',
                        '지명타자': 'DH'
                    }
                    
                    pos_code = pos_map.get(position, position)
                    
                    # 타율 및 기본 스탯
                    avg = float(cols[5].get_text(strip=True) or '0.000')
                    
                    # 카테고리 분류
                    if position == '포수':
                        category = '포수'
                    elif pos_code in ['1B', '2B', '3B', 'SS', 'DH']:
                        category = '내야수'
                    elif pos_code in ['LF', 'CF', 'RF']:
                        category = '외야수'
                    else:
                        category = '기타'
                    
                    # 타격 확률 추정 (간단한 모델)
                    # 실제로는 더 정교한 계산 필요
                    single_prob = avg * 0.6
                    double_prob = avg * 0.15
                    triple_prob = avg * 0.01
                    homerun_prob = avg * 0.08
                    walk_prob = 0.08
                    strikeout_prob = 0.20
                    groundout_prob = (1 - avg - walk_prob - strikeout_prob) * 0.6
                    flyout_prob = (1 - avg - walk_prob - strikeout_prob) * 0.4
                    
                    player = {
                        "id": f"p{idx+1:03d}",
                        "name": name,
                        "position": pos_code,
                        "hand": "R",  # 기본값, 실제로는 추가 크롤링 필요
                        "category": category,
                        "stats": {
                            "avg": round(avg, 3),
                            "probability": {
                                "single": round(single_prob, 2),
                                "double": round(double_prob, 2),
                                "triple": round(triple_prob, 2),
                                "homerun": round(homerun_prob, 2),
                                "walk": round(walk_prob, 2),
                                "strikeout": round(strikeout_prob, 2),
                                "groundout": round(groundout_prob, 2),
                                "flyout": round(flyout_prob, 2)
                            }
                        }
                    }
                    
                    players.append(player)
                    
                except (ValueError, IndexError) as e:
                    print(f"Error parsing row: {e}")
                    continue
        
        return players
        
    except Exception as e:
        print(f"Error fetching data: {e}")
        return None

def generate_roster_js(players):
    """roster.js 파일 생성"""
    
    if not players:
        print("No player data available")
        return False
    
    # 카테고리별로 정렬
    category_order = {'포수': 0, '내야수': 1, '외야수': 2, '투수': 3, '기타': 4}
    players.sort(key=lambda x: (category_order.get(x['category'], 5), x['name']))
    
    js_content = f"""const rosterData = {json.dumps(players, ensure_ascii=False, indent=4)};

export default rosterData;
"""
    
    output_path = '../src/data/roster.js'
    
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(js_content)
        print(f"✅ Successfully generated {output_path}")
        print(f"📊 Total players: {len(players)}")
        return True
    except Exception as e:
        print(f"❌ Error writing file: {e}")
        return False

def main():
    print("🔄 Fetching Hanwha Eagles roster data...")
    players = fetch_hanwha_roster()
    
    if players:
        print(f"✅ Fetched {len(players)} players")
        success = generate_roster_js(players)
        if success:
            print("✅ Roster update complete!")
        else:
            print("❌ Failed to generate roster.js")
            exit(1)
    else:
        print("❌ Failed to fetch roster data")
        print("⚠️  Using fallback: keeping existing roster.js")
        # 실패 시 기존 파일 유지

if __name__ == "__main__":
    main()
