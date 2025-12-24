# 기술 명세서 (Tech Spec): 한화 이글스 라인업 최적화 시스템

## 1. 개요 (Overview)
본 문서는 한화 이글스 라인업 최적화 시스템의 기술적 구현 상세를 정의합니다. 이 시스템은 웹 브라우저 상에서 동작하는 클라이언트 사이드 애플리케이션으로, 별도의 백엔드 서버 없이 JavaScript 엔진만을 사용하여 시뮬레이션과 시각화를 수행하는 MVP(Minimum Viable Product) 모델을 지향합니다.

## 2. 시스템 아키텍처 (System Architecture)
- **유형**: Single Page Application (SPA).
- **실행 환경**: 최신 웹 브라우저 (Chrome, Edge, Safari 등).
- **데이터 흐름**:
  1.  `DataManager`가 선수 스탯 데이터 로드 (로컬 JSON).
  2.  `Simulator`가 지정된 라인업으로 몬테카를로 시뮬레이션 수행.
  3.  `Optimizer`가 다수의 라인업 조합을 생성하고 시뮬레이터를 반복 호출하여 최적해 탐색.
  4.  `UIManager`가 결과를 DOM에 렌더링 및 시각화 업데이트.

## 3. 기술 스택 (Tech Stack)

### 3.1. Frontend
- **HTML5**: 시맨틱 마크업 구조.
- **CSS**: 
  - **Framework**: Tailwind CSS (v3.4, CDN 방식 사용 - 빠른 프로토타이핑 및 이식성).
  - **Custom**: `index.css`를 통해 테마 색상(한화 오렌지/블루) 및 커스텀 애니메이션 정의.
  - **Font**: Google Fonts (Lexend, Noto Sans KR).
- **JavaScript**: 
  - **Version**: ES6+ (Modules).
  - **Libraries**: 없음 (Pure JS). 차트 및 시각화는 SVG 직접 조작 또는 캔버스 API 활용.

### 3.2. Simulation Engine
- **Language**: Vanilla JavaScript.
- **Performance**: Web Worker 도입 고려 (메인 스레드 블로킹 방지, 계산량이 많을 경우).

### 3.3. Testing & Tooling
- **Test Framework**: Jest (TDD 수행을 위해 사용).
- **Validation**:
  - Core Logic(Engine, Optimizer)은 Jest로 단위 테스트 수행.
  - UI 로직은 자동화 테스트를 수행하지 않고 수동 검증 진행.

## 4. 데이터 모델 및 파이프라인 (Data Models & Pipeline)

### 4.1. 데이터 수집 및 전처리 (Python Crawler)
- **도구**: Python (BeautifulSoup, Selenium).
- **대상**: Statiz (Primary), KBO 기록실 (Secondary).
- **프로세스**:
  1.  **Collection**: 선수별 시즌 상세 기록(타석, 안타, 2루타 등) 크롤링.
  2.  **Preprocessing**: 시뮬레이션 확률(`P(Event)`) 계산 및 정규화.
  3.  **Output**: `src/data/players_data.json` 파일 생성.

### 4.2. Player 모델 (JSON / JS Object)
```json
{
  "id": "player_001",
  "name": "노시환",
  "position": "3B",
  "hand": "R", // R(우타), L(좌타), S(스위치)
  "stats": {
    "avg": 0.298,
    "obp": 0.380,
    "slg": 0.540,
    "ops": 0.920,
    "probability": {
      "single": 0.15,
      "double": 0.05,
      "triple": 0.005,
      "homerun": 0.04,
      "walk": 0.08,
      "strikeout": 0.20,
      "groundout": 0.30,
      "flyout": 0.175
    }
  },
  "condition": "hot" // 컨디션 상태
}
```

### 4.3. SimulationResult (결과)
```json
{
  "lineupId": "opt_20240501",
  "expectedRuns": 5.42,
  "winProbability": 0.612,
  "simulatedGames": 10000,
  "runDistribution": [0, 2, 5, 8, ...] // 득점 분포 배열
}
```

## 5. 핵심 모듈 및 알고리즘 (Modules & Algorithms)

### 5.1. Simulation Engine (`engine.js`)
- **알고리즘**: 몬테카를로 시뮬레이션 (Monte Carlo Simulation).
- **단일 경기 로직**:
  - 1회~9회 루프.
  - 타자별 출루 확률(Roll 0.0~1.0)에 따라 결과 판정 (안타, 볼넷, 아웃 등).
  - 주자 상황(Bases) 업데이트 및 득점 계산.
  - 3아웃 시 이닝 교체.
- **배치 실행**: 
  - 설정된 횟수(N=1,000~10,000)만큼 단일 경기 반복.
  - 평균 득점 및 승률(특정 득점 기준 초과 확률) 도출.

### 5.2. Optimizer (`optimizer.js`)
- **목표**: 주어진 선수단(9명)의 순서를 섞어 기대 득점이 가장 높은 타순 발견.
- **알고리즘 (Genetic Algorithm)**:
  - **초기화**: 랜덤 라인업 50개 생성.
  - **평가**: 각 라인업의 기대 득점 계산(몬테카를로 100회).
  - **선택**: 상위 20% 우수 유전자 보존.
  - **교차/변이**: 타순 교환(Swap) 및 뒤섞기(Shuffle)로 다음 세대 생성.
  - **반복**: 10~20세대 진화 후 최적해 도출.

### 5.3. UI Controller (`ui.js`)
- **Field Visualizer**: CSS Transform 및 Absolute positioning을 사용하여 다이아몬드 필드 및 수비 위치 렌더링.
- **Chart Renderer**: SVG `<path>`의 `d` 속성을 동적으로 계산하여 승률 그래프 그리기.

## 6. 구현 단계 (Implementation Phases)

### Phase 1: 기반 구축 (Foundation)
- 프로젝트 디렉토리 구조 설정.
- 디자인 파일(`code.html`)을 기반으로 반응형 레이아웃 및 뼈대 코드 작성.
- Tailwind CSS 설정 및 디자인 토큰(색상, 폰트) 적용.

### Phase 2: 시뮬레이션 엔진 구현 (Core Logic)
- `Player` 데이터 더미셋(한화 이글스 실제 선수단 기반) 작성.
- 야구 규칙이 적용된 `Game` 클래스 구현.
- 기본적인 몬테카를로 루프 구현 및 콘솔 테스트.

### Phase 3: 최적화 로직 및 UI 연동 (Integration)
- 랜덤 샘플링 기반 최적화 함수 구현.
- UI의 'Rerun', 'Lineup Toggle' 이벤트와 엔진 연결.
- 결과 데이터(기대 득점, 승률)를 DOM에 바인딩.

### Phase 4: 시각화 고도화 (Polishing)
- 승률 그래프 SVG 동적 생성 로직 구현.
- 필드 뷰에 선수 배치 연동.
- 마이크로 인터랙션 및 애니메이션 추가.

## 8. 인프라 및 배포 (Infrastructure & Deployment)
- **Version Control**: GitHub Repository.
- **CI/CD**: GitHub Actions.
    - **Trigger**: `main` 브랜치에 푸시 발생 시.
    - **Process**: 소스 코드 체크아웃 -> 정적 파일 빌드(필요 시) -> 아티팩트 업로드.
- **Hosting**: GitHub Pages.
    - 별도의 서버 없이 정적 호스팅.
    - GitHub Actions의 `actions/deploy-pages` 활용.

## 9. 디렉토리 구조 (Directory Structure)
```
/hanwhalinup
├── .github/
│   └── workflows/
│       └── deploy.yml # 배포 파이프라인
├── index.html       # 메인 진입점
├── style.css        # 커스텀 스타일
├── js/
│   ├── data.js      # 선수 데이터
│   ├── engine.js    # 시뮬레이션 로직
│   ├── optimizer.js # 최적화 알고리즘
│   └── main.js      # UI 컨트롤 및 앱 초기화
└── assets/          # 이미지 및 아이콘 (필요 시)
```
