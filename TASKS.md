# 프로젝트 작업 세분화 (Tasks)

## 1단계: 프로젝트 설정 및 인프라 구축 (Phase 1)
- [ ] **Git 설정**
    - [ ] Git 저장소 초기화 및 `.gitignore` 생성.
    - [ ] 초기 커밋 (디자인 파일, PRD, TECH_SPEC, PROJECT_RULES).
- [ ] **데이터 파이프라인 설정 (New)**
    - [ ] Python 환경 설정 (requirements.txt: beautifulsoup4, selenium 등).
    - [ ] `scripts/crawl_data.py`: Statiz 데이터 크롤러 구현.
    - [ ] `scripts/process_data.py`: 전처리 로직 구현 및 JSON 수출.
- [ ] **환경 설정**
    - [ ] `package.json` 초기화 (`npm init -y`).
    - [ ] **개발 의존성 설치**: `jest` (테스트), `prettier` (포맷팅).
    - [ ] `jest.config.js` 설정 (ES Modules 지원).
- [ ] **디렉토리 구조**
    - [ ] 폴더 생성: `src/core` (로직), `src/ui` (화면), `src/data` (데이터), `tests/`.
    - [ ] 진입점 파일 생성: `index.html`, `src/main.js`.

## 2단계: 핵심 로직 구현 (Phase 2 - TDD)
*이 단계의 모든 모듈은 유닛 테스트가 강제됩니다. SOLID 원칙을 준수하세요.*

### 2.1. 기본 데이터 모델
- [ ] **Player 클래스** (`src/core/Player.js`):
    - [ ] 테스트: 생성자가 속성(id, 이름, 스탯)을 올바르게 설정하는지 확인.
    - [ ] 테스트: 스탯 기반으로 `getOnBaseProbability()`가 올바른 확률을 반환하는지 확인.
    - [ ] 구현: `Player` 클래스 작성.
- [ ] **Lineup 클래스** (`src/core/Lineup.js`):
    - [ ] 테스트: 유효성 검사 (반드시 9명의 선수 포함).
    - [ ] 구현: `Lineup` 클래스 및 컬렉션 로직.

### 2.2. 게임 메카닉 (규칙)
- [ ] **BaseSystem** (`src/core/BaseSystem.js`):
    - [ ] 테스트: `advanceRunners(hitType)`가 주자가 없는 상황(솔로 홈런 등)을 처리하는지 확인.
    - [ ] 테스트: `advanceRunners(hitType)`가 만루 상황(밀어내기, 병살 등)을 처리하는지 확인.
    - [ ] 구현: 주루 플레이 및 득점 계산 로직.
- [ ] **OutcomeGenerator** (`src/core/OutcomeGenerator.js`):
    - [ ] 테스트: 입력된 확률에 따라 이산적인 결과(안타, 볼넷, 아웃)를 반환하는지 확인.
    - [ ] 구현: 가중치 기반 확률 생성 로직.

### 2.3. 시뮬레이션 엔진
- [ ] **GameState** (`src/core/GameState.js`):
    - [ ] 테스트: 아웃 카운트, 이닝, 점수 트래킹 확인.
    - [ ] 테스트: 새로운 게임을 위한 상태 초기화 확인.
    - [ ] 구현: 게임 상태 관리 모듈.
- [ ] **GameSimulator** (`src/core/GameSimulator.js`):
    - [ ] 테스트: 단일 타석 로직 (타자 vs 투수 -> 결과 -> 상태 업데이트).
    - [ ] 테스트: 이닝 교체 로직 (3아웃).
    - [ ] 테스트: 9이닝 전체 게임 루프.
    - [ ] 구현: 전체 게임 시뮬레이션 루프.

### 2.4. 최적화 및 통계
- [ ] **StatsAggregator** (`src/core/StatsAggregator.js`):
    - [ ] 테스트: 게임 결과 배열로부터 평균(기대 득점)과 승률 계산.
    - [ ] 구현: 통계 집계 로직.
- [ ] **Optimizer** (`src/core/Optimizer.js`):
    - [ ] Test: `GeneticAlgorithm` 초기 세대 생성 로직 확인.
    - [ ] Test: 교차(Crossover) 및 변이(Mutation) 동작 검증.
    - [ ] Test: 세대 반복 시 Fitness(득점)가 증가하는 경향 확인.
    - [ ] 구현: 유전 알고리즘 기반 최적화 엔진.

## 3단계: UI 구현 및 연동 (Phase 3)
*이 단계는 TDD가 적용되지 않으며, 자동화 테스트 대신 수동 테스트로 검증합니다.*

- [ ] **프로젝트 뼈대**
    - [ ] 디자인에 맞춰 `index.html` 마크업 작성.
    - [ ] Tailwind CSS 설정 (CDN 또는 CLI).
- [ ] **데이터 계층**
    - [ ] `src/data/roster.js`: 한화 이글스 로스터 데이터 구현 (JSON).
    - [ ] `src/ui/UIManager.js`: DOM 업데이트 모듈 생성.
- [ ] **라인업 컴포넌트**
    - [ ] 드래그 앤 드롭 또는 리스트 정렬 UI 구현.
    - [ ] 스탯이 포함된 선수 카드 렌더링.
- [ ] **대시보드 위젯**
    - [ ] **점수판**: "기대 득점" 및 "승리 확률" 표시.
    - [ ] **필드 뷰**: 야구장 다이아몬드 및 수비 위치 렌더링 (CSS/HTML).
    - [ ] **그래프**: 승리 확률 변화 SVG 라인 차트 렌더링.
- [ ] **통합 (Integration)**
    - [ ] "최적화 실행" 버튼을 `Optimizer.run()`과 연결.
    - [ ] 결과 시각화 (로딩 상태 표시 등).

## 4단계: 고도화 및 다듬기 (Phase 4)
- [ ] **성능 최적화**
    - [ ] 시뮬레이션 소요 시간 측정.
    - [ ] (느릴 경우) `GameSimulator`를 Web Worker로 분리.
- [ ] **비주얼**
    - [ ] "최적화 중..." 애니메이션 추가.
    - [ ] 한화 이글스 브랜딩 컬러 및 폰트 적용 확인.
    - [ ] 모바일 반응형 디자인 점검.

## 5단계: 배포 (Phase 5)
- [ ] **검증**
    - [ ] 전체 유닛 테스트 실행 (`npm test`).
    - [ ] 수동 E2E 테스트.
- [ ] **배포**
    - [ ] `main` 브랜치 푸시.
    - [ ] GitHub Pages 배포 확인.
