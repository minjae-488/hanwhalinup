# 선수 데이터 자동 업데이트

## 📋 개요

이 스크립트는 KBO 공식 웹사이트에서 한화 이글스 선수 데이터를 크롤링하여 `src/data/roster.js` 파일을 자동으로 업데이트합니다.

## 🤖 자동 업데이트

GitHub Actions를 통해 **매일 오전 6시(KST)**에 자동으로 실행됩니다.

- 워크플로우: `.github/workflows/update-roster.yml`
- 변경사항이 있을 때만 커밋됩니다
- 실패 시 기존 데이터 유지

## 🔧 수동 실행

### 로컬에서 실행

```bash
cd scripts
pip install requests beautifulsoup4 lxml
python update_roster.py
```

### GitHub Actions에서 수동 실행

1. GitHub 저장소 → Actions 탭
2. "Update Roster Data" 워크플로우 선택
3. "Run workflow" 버튼 클릭

## 📊 데이터 소스

- **KBO 공식 웹사이트**: https://www.koreabaseball.com
- **팀**: 한화 이글스 (팀 코드: HH)
- **시즌**: 현재 연도

## ⚠️ 주의사항

- KBO 웹사이트 구조 변경 시 스크립트 수정 필요
- 크롤링 빈도 제한 준수
- 데이터 정확성은 KBO 공식 사이트 업데이트에 의존

## 🔄 업데이트 내역

업데이트 이력은 Git 커밋 로그에서 확인 가능:
```bash
git log --grep="Auto-update roster" --oneline
```
