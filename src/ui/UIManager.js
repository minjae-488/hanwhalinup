export default class UIManager {
    constructor() {
        this.dashboardContainer = document.getElementById('dashboard-view');
        // Initial HTML template inject
        this.initDashboard();

        this.lineupContainer = document.getElementById('batting-order-list');
        this.winRateEl = document.getElementById('stat-win-rate');
        this.expRunsEl = document.getElementById('stat-exp-runs');
    }

    initDashboard() {
        // Inject the dashboard HTML structure (from code.html design) dynamically
        // or assume index.html has it.
        // For this step, we assume index.html already has the structure, 
        // OR we inject the dynamic parts only.

        // Let's replace the placeholder with real structure if needed, 
        // but index.html from Step 1 already had most of it? 
        // Wait, index.html in Step 1 had "Initializing System..." text.

        this.dashboardContainer.innerHTML = `
        <div class="flex flex-col md:flex-row md:items-start md:gap-8 px-4 pt-6 pb-2">
            <!-- Header Section Container -->
            <div class="w-full">
                <!-- Header Title & Desktop Actions -->
                <div class="flex items-center justify-between mb-4 md:mb-6">
                    <div>
                        <div class="flex items-center gap-3">
                            <h2 class="text-white text-[26px] font-bold leading-tight">분석 결과</h2>
                            <span id="status-badge" class="px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 text-xs font-bold uppercase tracking-wider border border-gray-500/30">준비됨</span>
                        </div>
                        <p class="text-gray-400 text-sm mt-1">현재 라인업 vs AI 최적화 라인업 비교</p>
                    </div>
                    
                    <!-- Desktop Action Buttons -->
                    <div class="hidden md:flex gap-3">
                         <button id="btn-rerun" class="bg-surface-dark hover:bg-surface-darker text-white font-bold py-2 px-6 rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                            <span class="material-symbols-outlined text-[20px]">refresh</span>
                            다시 실행
                        </button>
                        <button id="btn-apply" class="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-xl shadow-lg shadow-primary/20 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                            <span class="material-symbols-outlined text-[20px]">check</span>
                            적용하기
                        </button>
                    </div>
                </div>

                <!-- Desktop Grid Layout -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    <!-- LEFT COLUMN (NEW): Roster Pool (lg:col-span-3) -->
                    <div class="lg:col-span-3 flex flex-col gap-4 order-3 lg:order-1 bg-surface-dark rounded-xl p-4 border border-white/5 h-[800px] overflow-hidden">
                        <div class="flex items-center justify-between">
                            <h3 class="text-white text-sm font-bold uppercase tracking-wider">선수단</h3>
                             <span class="text-[10px] text-gray-500">드래그하여 교체</span>
                        </div>
                        
                        <!-- Filters -->
                        <div class="flex gap-1 flex-wrap">
                            <button class="filter-btn active text-[10px] uppercase bg-white text-black px-2 py-1 rounded font-bold transition-colors" data-filter="all">전체</button>
                            <button class="filter-btn text-[10px] uppercase bg-surface-darker text-gray-400 hover:text-white px-2 py-1 rounded font-medium border border-white/10 transition-colors" data-filter="내야수">내야</button>
                            <button class="filter-btn text-[10px] uppercase bg-surface-darker text-gray-400 hover:text-white px-2 py-1 rounded font-medium border border-white/10 transition-colors" data-filter="외야수">외야</button>
                            <button class="filter-btn text-[10px] uppercase bg-surface-darker text-gray-400 hover:text-white px-2 py-1 rounded font-medium border border-white/10 transition-colors" data-filter="포수">포수</button>
                             <button class="filter-btn text-[10px] uppercase bg-surface-darker text-gray-400 hover:text-white px-2 py-1 rounded font-medium border border-white/10 transition-colors" data-filter="투수">투수</button>
                        </div>

                        <div id="roster-pool-list" class="flex flex-col gap-2 overflow-y-auto custom-scrollbar flex-1 pb-4">
                            <!-- Draggable Players injected here -->
                        </div>
                    </div>

                    <!-- CENTER COLUMN: Lineup List (lg:col-span-4) -->
                    <div class="lg:col-span-4 flex flex-col gap-4 order-2 lg:order-2">
                         <div class="flex flex-col gap-2">
                            <h3 class="text-white text-sm font-bold uppercase tracking-wider mb-2 ml-1">타순 (1-9번)</h3>
                            <div id="batting-order-list" class="flex flex-col gap-2 max-h-[800px] overflow-y-auto pr-1"></div>
                        </div>
                    </div>

                    <!-- RIGHT COLUMN: Stats & Field & Live Sim (lg:col-span-5) -->
                    <div class="lg:col-span-5 flex flex-col gap-6 order-1 lg:order-3">
                        
                        <!-- Stats Cards -->
                        <div class="grid grid-cols-2 gap-4">
                            <!-- Win Probability -->
                            <div class="flex flex-col gap-1 rounded-xl p-5 bg-surface-dark border border-white/5 relative overflow-hidden group">
                                <div class="flex items-center gap-2 mb-2">
                                    <div class="w-1 h-4 bg-accent-orange rounded-full"></div>
                                    <p class="text-gray-400 text-xs font-medium uppercase tracking-wider">승리 확률</p>
                                </div>
                                <div class="flex items-end gap-2">
                                    <p id="stat-win-rate" class="text-white text-3xl font-bold leading-none">--%</p>
                                </div>
                            </div>
                            <!-- Expected Runs -->
                            <div class="flex flex-col gap-1 rounded-xl p-5 bg-surface-dark border border-white/5 relative overflow-hidden group">
                                <div class="flex items-center gap-2 mb-2">
                                    <div class="w-1 h-4 bg-primary rounded-full"></div>
                                    <p class="text-gray-400 text-xs font-medium uppercase tracking-wider">기대 득점</p>
                                </div>
                                <div class="flex items-end gap-2">
                                    <p id="stat-exp-runs" class="text-white text-3xl font-bold leading-none">--</p>
                                    <span class="text-gray-400 text-sm font-medium mb-1">점</span>
                                </div>
                            </div>
                        </div>

                        <!-- Field Visualizer -->
                        <div>
                            <h3 class="text-white text-sm font-bold uppercase tracking-wider mb-2 ml-1">수비 위치</h3>
                            <div class="field-container">
                                <!-- Field will be injected here -->
                            </div>
                        </div>

                         <!-- Live Sub Simulator Section -->
                        <div class="border-t border-white/5 pt-4">
                            <h3 class="text-white text-sm font-bold uppercase tracking-wider mb-3 ml-1">실시간 대타 시뮬레이션</h3>
                            <div class="bg-surface-dark rounded-xl p-4 border border-white/5">
                                <div class="grid grid-cols-2 gap-3 mb-4">
                                    <div>
                                        <label class="text-[10px] text-gray-400 uppercase font-bold">이닝</label>
                                        <select id="live-inning" class="w-full bg-background-dark text-white text-sm rounded p-2 border border-white/10">
                                            <option value="7">7회</option>
                                            <option value="8">8회</option>
                                            <option value="9">9회</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="text-[10px] text-gray-400 uppercase font-bold">아웃 카운트</label>
                                        <select id="live-outs" class="w-full bg-background-dark text-white text-sm rounded p-2 border border-white/10">
                                            <option value="0">무사</option>
                                            <option value="1">1사</option>
                                            <option value="2">2사</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="mb-4">
                                    <label class="text-[10px] text-gray-400 uppercase font-bold mb-1 block">주자 상황</label>
                                    <div class="flex gap-2">
                                        <label class="flex items-center gap-2 bg-background-dark p-2 rounded border border-white/10 flex-1 justify-center cursor-pointer hover:bg-white/5">
                                            <input type="checkbox" id="live-base-1" class="rounded bg-surface-dark border-gray-600 text-accent-orange focus:ring-accent-orange">
                                            <span class="text-sm text-white">1루</span>
                                        </label>
                                        <label class="flex items-center gap-2 bg-background-dark p-2 rounded border border-white/10 flex-1 justify-center cursor-pointer hover:bg-white/5">
                                            <input type="checkbox" id="live-base-2" class="rounded bg-surface-dark border-gray-600 text-accent-orange focus:ring-accent-orange">
                                            <span class="text-sm text-white">2루</span>
                                        </label>
                                        <label class="flex items-center gap-2 bg-background-dark p-2 rounded border border-white/10 flex-1 justify-center cursor-pointer hover:bg-white/5">
                                            <input type="checkbox" id="live-base-3" class="rounded bg-surface-dark border-gray-600 text-accent-orange focus:ring-accent-orange">
                                            <span class="text-sm text-white">3루</span>
                                        </label>
                                    </div>
                                </div>

                                <button id="btn-live-sim" class="w-full bg-accent-orange hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                                    <span class="material-symbols-outlined">play_arrow</span>
                                    상황 시뮬레이션
                                </button>
                                
                                <div id="live-result" class="mt-3 p-3 bg-background-dark rounded border border-white/5 hidden">
                                    <p class="text-gray-400 text-xs text-center mb-1">기대 승률 상승폭</p>
                                    <p class="text-white text-xl font-bold result-text text-center">+ --%</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        `;

        // Refresh references after innerHTML set
        this.lineupContainer = document.getElementById('batting-order-list');
        this.rosterContainer = document.getElementById('roster-pool-list');
        this.winRateEl = document.getElementById('stat-win-rate');
        this.expRunsEl = document.getElementById('stat-exp-runs');
        this.statusBadge = document.getElementById('status-badge');

        // Init Filters
        this.setupFilters();
    }

    setupFilters() {
        const buttons = this.dashboardContainer.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Style toggle
                buttons.forEach(b => {
                    b.classList.remove('bg-white', 'text-black', 'active');
                    b.classList.add('bg-surface-darker', 'text-gray-400');
                });
                btn.classList.remove('bg-surface-darker', 'text-gray-400');
                btn.classList.add('bg-white', 'text-black', 'active');

                // Filter Logic
                const filter = btn.dataset.filter;
                this.filterRoster(filter);
            });
        });
    }

    renderRosterPool(rosterData) {
        this.fullRoster = rosterData; // Store source for filtering
        this.filterRoster('all');
    }

    filterRoster(category) {
        if (!this.fullRoster) return;

        let filtered = this.fullRoster;
        if (category !== 'all') {
            filtered = this.fullRoster.filter(p => p.category === category);
        }

        this.rosterContainer.innerHTML = '';
        filtered.forEach(player => {
            const card = document.createElement('div');
            card.draggable = true;
            card.className = "flex items-center gap-3 bg-surface-darker p-2 rounded-lg border border-white/5 hover:border-accent-orange cursor-grab active:cursor-grabbing transition-colors group";
            card.dataset.playerId = player.id;

            // Drag Events
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('player-id', player.id); // Custom type
                e.dataTransfer.setData('source', 'roster');
                e.dataTransfer.effectAllowed = 'copy';
                card.classList.add('opacity-50');
            });
            card.addEventListener('dragend', () => card.classList.remove('opacity-50'));

            card.innerHTML = `
                <div class="size-8 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-gray-400 font-bold shrink-0 group-hover:bg-accent-orange group-hover:text-white transition-colors">
                    ${player.position}
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-white text-xs font-bold truncate">${player.name}</p>
                    <p class="text-gray-500 text-[10px]">${player.category} • Avg ${player.stats.avg.toFixed(3)}</p>
                </div>
            `;
            this.rosterContainer.appendChild(card);
        });
    }

    setLoading(isLoading) {
        if (isLoading) {
            this.statusBadge.className = "px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider border border-yellow-500/30 animate-pulse";
            this.statusBadge.innerText = "시뮬레이션 중...";
        } else {
            this.statusBadge.className = "px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider border border-green-500/30";
            this.statusBadge.innerText = "완료됨";
        }
    }

    renderResults(data) {
        // data = { currentRun, optimizedRun, winRate }
        const diff = (data.optimizedRun - data.currentRun).toFixed(2);
        const sign = diff >= 0 ? '+' : '';

        this.winRateEl.innerText = `${data.winRate}%`; // Dummy winrate for now
        this.expRunsEl.innerHTML = `${data.optimizedRun.toFixed(2)} <span class="text-green-500 text-sm">(${sign}${diff})</span>`;
    }

    renderField(lineup) {
        // Clear previous players if any (except the static diamond background)
        // Ideally, we just update the text of existing bubbles.
        // Since we created the HTML dynamically/statically, let's look for components.

        const positions = ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF'];

        // Helper to find player by position
        const getPlayerByPos = (pos) => lineup.players.find(p => p.position === pos);

        positions.forEach(pos => {
            const player = getPlayerByPos(pos);
            const name = player ? player.name.split(' ')[1] || player.name : 'TBD';

            // Find the element. In the static HTML, we had things like:
            // <div ...>P</div>
            // We need to add IDs to these in our initDashboard or update them by structure.

            // For MVP, if we haven't set up the IDs in initDashboard, let's skip strict mapping 
            // and relying on the static HTML being correct is risky.
            // Let's inject the field HTML fresh with correct data.
        });

        // Re-inject Field HTML with current Lineup Data
        const fieldContainer = document.querySelector('.field-container'); // Need to ensure this class/ID exists
        if (fieldContainer) {
            fieldContainer.innerHTML = this.generateFieldHTML(lineup);
        }
    }

    generateFieldHTML(lineup) {
        const getPlayer = (pos) => lineup.players.find(p => p.position === pos) || { name: ' Vacant' };
        const getName = (pos) => {
            const p = getPlayer(pos);
            const parts = p.name.split(' ');
            return parts.length > 1 ? parts[1] : p.name;
        };

        return `
            <div class="relative w-full aspect-[2/1] bg-surface-darker rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
                <!-- Field Graphic Background -->
                <div class="absolute inset-0 bg-[#233648] opacity-50" style="background-image: radial-gradient(#2e4a38 2px, transparent 2px); background-size: 20px 20px;"></div>
                
                <!-- The Diamond -->
                <div class="relative mt-8">
                    <div class="baseball-diamond"></div>
                    <!-- Bases -->
                    <div class="absolute w-3 h-3 bg-white/80 rotate-45" style="bottom: 0px; left: 50%; transform: translate(-50%, 50%) rotate(45deg);"></div>
                    <div class="absolute w-3 h-3 bg-white/80 rotate-45" style="top: 50%; right: 0px; transform: translate(50%, -50%) rotate(45deg);"></div>
                    <div class="absolute w-3 h-3 bg-white/80 rotate-45" style="top: 0px; left: 50%; transform: translate(-50%, -50%) rotate(45deg);"></div>
                    <div class="absolute w-3 h-3 bg-white/80 rotate-45" style="top: 50%; left: 0px; transform: translate(-50%, -50%) rotate(45deg);"></div>

                    <!-- Players -->
                    ${this.createPlayerDot('P', 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', 'bg-accent-orange', getName('P'))}
                    ${this.createPlayerDot('C', 'bottom-[-20px] left-1/2 -translate-x-1/2', 'bg-primary', getName('C'))}
                    ${this.createPlayerDot('1B', 'top-1/2 right-[-25px] -translate-y-1/2', 'bg-primary', getName('1B'))}
                    ${this.createPlayerDot('2B', 'top-0 right-[-10px]', 'bg-primary', getName('2B'))}
                    ${this.createPlayerDot('SS', 'top-0 left-[-10px]', 'bg-primary', getName('SS'))}
                    ${this.createPlayerDot('3B', 'top-1/2 left-[-25px] -translate-y-1/2', 'bg-primary', getName('3B'))}
                    ${this.createPlayerDot('LF', 'top-[-30px] left-[-40px]', 'bg-primary', getName('LF'))}
                    ${this.createPlayerDot('CF', 'top-[-50px] left-1/2 -translate-x-1/2', 'bg-primary', getName('CF'))}
                    ${this.createPlayerDot('RF', 'top-[-30px] right-[-40px]', 'bg-primary', getName('RF'))}
                </div>
            </div>
        `;
    }

    createPlayerDot(pos, posClass, colorClass, name) {
        return `
            <div class="absolute ${posClass} flex flex-col items-center">
                <div class="w-6 h-6 rounded-full ${colorClass} text-[10px] font-bold text-white flex items-center justify-center shadow-lg border border-white z-10">${pos}</div>
                <span class="text-[9px] text-white font-bold bg-black/50 px-1 rounded mt-1 whitespace-nowrap z-20">${name}</span>
            </div>
        `;
    }

    renderChart(currentData, optimizedData) {
        // Render simple SVG Chart comparison
        // currentData, optimizedData are simple values (Expected Runs)
        // Or arrays of runs per inning if we simulated that detail.

        // For MVP, let's visualize Win Probability bar or simulated distribution curve.
        // Let's do a simple Bar Comparison since we only have aggregate data in main.js currently.

        // Find chart container
        // We will repurpose the 'Charts Section' from the design or main dashboard
        // Currently, we don't have a specific container id for chart in initDashboard, 
        // let's assume we want to inject it below the stats.
    }

    renderLineup(lineup, type) {
        // Render Field View as well whenever lineup updates
        this.renderField(lineup);

        this.lineupContainer.innerHTML = '';

        lineup.players.forEach((player, index) => {
            const isHighlight = index < 3; // Highlight top 3

            const card = document.createElement('div');
            card.className = `flex items-center gap-4 bg-surface-dark p-3 rounded-lg border-l-4 ${isHighlight ? 'border-accent-orange' : 'border-transparent'} transition-colors cursor-grab active:cursor-grabbing hover:bg-white/5`;

            // Enable Drag
            card.draggable = true;
            card.dataset.index = index;

            // Reorder Drag Events
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('index', index);
                e.dataTransfer.setData('source', 'lineup');
                e.dataTransfer.effectAllowed = 'move';
                setTimeout(() => card.classList.add('opacity-20'), 0);
            });

            card.addEventListener('dragend', () => card.classList.remove('opacity-20'));

            // Drop Zone Logic
            card.addEventListener('dragover', (e) => {
                e.preventDefault(); // Allow drop
                e.dataTransfer.dropEffect = 'move';
                card.classList.add('bg-white/10');
            });

            card.addEventListener('dragleave', () => {
                card.classList.remove('bg-white/10');
            });

            card.addEventListener('drop', (e) => {
                e.preventDefault();
                card.classList.remove('bg-white/10');

                const source = e.dataTransfer.getData('source');

                if (source === 'lineup') {
                    // Reorder
                    const fromIndex = parseInt(e.dataTransfer.getData('index'));
                    const toIndex = index;
                    if (fromIndex !== toIndex && this.onLineupReorder) {
                        this.onLineupReorder(fromIndex, toIndex);
                    }
                } else if (source === 'roster') {
                    // Swap / Replace from Roster Pool
                    const playerId = e.dataTransfer.getData('player-id');
                    if (this.onPlayerReplace) {
                        this.onPlayerReplace(index, playerId);
                    }
                }
            });

            card.innerHTML = `
                <div class="flex flex-col items-center justify-center w-6">
                    <span class="text-gray-400 text-xs font-bold">${index + 1}</span>
                </div>
                <div class="size-10 rounded-full bg-gray-700 overflow-hidden relative shrink-0">
                     <div class="w-full h-full bg-gray-600 flex items-center justify-center text-xs text-gray-400">${player.position}</div>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                        <h4 class="text-white font-bold text-sm truncate">${player.name}</h4>
                        <span class="px-1.5 py-0.5 rounded bg-white/10 text-xs text-white/80 font-medium">${player.position}</span>
                    </div>
                    <p class="text-gray-400 text-xs">${player.hand === 'R' ? '우타' : player.hand === 'L' ? '좌타' : '양타'} • 타율 ${player.stats.avg.toFixed(3)}</p>
                </div>
                 <div class="text-right">
                    <p class="text-primary font-bold text-sm">--</p>
                    <p class="text-gray-500 text-[10px]">OPS</p>
                </div>
            `;

            this.lineupContainer.appendChild(card);
        });
    }
}
