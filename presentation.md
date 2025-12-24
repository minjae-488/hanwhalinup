---
marp: true
theme: gaia
class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
style: |
  section.lead h1 {
    font-size: 50pt;
    color: #f37321;
  }
  section.lead h2 {
    font-size: 30pt;
    color: #233648;
  }
---

<!-- _class: lead -->

# Hanwha Eagles
## Lineup Optimizer Experiment
### Data-Driven Victory Strategy

Minjae Kim

---

## 🏗️ Project Overview

**Problem**: Is the current batting order optimal? Can we score more runs just by shuffling the lineup?

**Solution**:
- **Genetic Algorithm**: Explore 362,880 combinations in seconds.
- **Monte Carlo Simulation**: Simulate 10,000 games per lineup.
- **Live Sub Simulator**: Real-time decision support for coaching staff.

---

## 🛠️ Architecture

![Width:800px](https://mermaid.ink/img/pako:eNp1ksFu2zAMhl9F6NRAFtix24BeCgzdMOywHboqCi1RYy1TFEk5aIHffZTsOmmx7SDF9yP5I_3COWdKG860eC30wWl1y08K_e3P64fflM-0_fH7c_tT6Qc6K5TOb6-vlL7_3P41-uM5f36l9Ov2p9KPlM9fKJV3aXlTqQd9w5XSC11YofRGCzrn3wqlW6G3QumN0Adh9J1S2mhdO5TKL3QrhP6g9XOF9lYovRGm3yitR6H0VtjQf3xI32ihjULpjTDeKGW00K1Qeqf0I5o_Tj6j9d-sUHrbg_7jg49C6b2wHl9WKL3Thc6H8U4Z3SojdCuU3imj9yq00fplhdJ7Yf29Fcb_aYv0o33w6fE_VqI7_xW2Jt8ZrbXe3vGjG3-wQumtMHqnC613Vii9E0YbZTR-q4zeK6N3ygi9MbrRuvEovdVvM1-wQuuNMC403lqh9EYXj9GNEbobs_V97H3M1vexfzBb38f-x4xet7FPuY19ym3sU25jn3Kb8z7lNrMpdx5Hj3KbcfQotxlHj3KbcfQotxlHj3KbcfQot5lHuY19ym3sU25jn3Ib-5TbmKe5jX2a29inuc18mtvYp7nNfJrbzN-g5v8B383qKQ?type=png)

---

## 💡 Key Algorithms

1. **Genetic Algorithm (GA)**
   - **Population**: 50 Random Lineups
   - **Fitness Function**: Expected Runs (via Simulation)
   - **Evolution**: Crossover & Mutation over 20 generations.

2. **Context-Aware Simulation**
   - **Rules**: Weighted randomness based on player stats (AVG, OBP, HR).
   - **Park Factor**: Adjust probabilities for stadium dimensions.

---

## 📱 Features

- **Optimizer Dashboard**: Instant comparison of "Current" vs "AI Optimized" lineups.
- **Field Visualization**: Dynamic placement of players on the field.
- **Live Sub Simulator**: Calculate "Win Probability Added" for pinch hitters in specific innings (e.g., 7th Inning, 2 Outs, Bases Loaded).

---

## 🚀 Tech Stack

- **Frontend**: Vanilla JS (ES Modules), Tailwind CSS
- **Core Engine**: JavaScript (TDD with Jest)
- **Data Pipeline**: Python (BeautifulSoup, Pandas)
- **CI/CD**: GitHub Actions (Pages Deployment)

---

<!-- _class: lead -->

# Demo
### Let's find the winning lineup!

