import members from './data.js';

// 애플리케이션 상태 관리
const state = {
  members: members,
  filteredMembers: members,
  selectedMember: null,
  activeTab: 'list', // 'list' | 'dashboard'
  searchQuery: '',
  filters: {
    party: 'all',
    crimeStatus: 'all',
    region: 'all'
  }
};

// DOM 요소 캐시
const DOM = {
  tabList: document.getElementById('tab-list'),
  tabDashboard: document.getElementById('tab-dashboard'),
  listView: document.getElementById('list-view'),
  dashboardView: document.getElementById('dashboard-view'),
  searchInput: document.getElementById('ai-search-input'),
  consoleLines: document.getElementById('console-lines'),
  filterParty: document.getElementById('filter-party'),
  filterStatus: document.getElementById('filter-status'),
  filterRegion: document.getElementById('filter-region'),
  memberCount: document.getElementById('member-count'),
  totalCount: document.getElementById('total-count'),
  memberGrid: document.getElementById('member-grid'),
  modalOverlay: document.getElementById('modal-overlay'),
  recommendTags: document.querySelectorAll('.recommend-tag')
};

// 초기화
function init() {
  setupEventListeners();
  populateFilterOptions();
  render();
}

// 필터 옵션 동적 추가 (지역구 추출)
function populateFilterOptions() {
  const regions = new Set();
  state.members.forEach(m => {
    if (m.constituency === '비례대표') {
      regions.add('비례대표');
    } else {
      const region = m.constituency.split(' ')[0];
      if (region) regions.add(region);
    }
  });

  const sortedRegions = Array.from(regions).sort();
  sortedRegions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    DOM.filterRegion.appendChild(option);
  });
}

// 콘솔에 로그 추가 (타이핑 효과 시뮬레이션)
function addConsoleLine(text, type = 'system') {
  if (!DOM.consoleLines) return;

  const time = new Date().toLocaleTimeString();
  let prefix = `[${time}] `;
  
  if (type === 'ai') {
    prefix += `⚡ AI-Parser: `;
  } else if (type === 'sql') {
    prefix += `💾 Query: `;
  } else {
    prefix += `⚙️ Sys: `;
  }

  const lineDiv = document.createElement('div');
  lineDiv.className = 'ai-console-line';
  
  const promptSpan = document.createElement('span');
  promptSpan.className = 'prompt';
  promptSpan.textContent = prefix;

  const contentSpan = document.createElement('span');
  if (type === 'sql') {
    contentSpan.className = 'sql';
  } else if (type === 'count') {
    contentSpan.className = 'count';
  }
  contentSpan.textContent = text;

  lineDiv.appendChild(promptSpan);
  lineDiv.appendChild(contentSpan);

  DOM.consoleLines.appendChild(lineDiv);
  DOM.consoleLines.scrollTop = DOM.consoleLines.scrollHeight;
  
  // 최대 50줄 유지
  while (DOM.consoleLines.children.length > 50) {
    DOM.consoleLines.removeChild(DOM.consoleLines.firstChild);
  }
}

// 이벤트 리스너 설정
function setupEventListeners() {
  // 탭 전환
  DOM.tabList.addEventListener('click', () => switchTab('list'));
  DOM.tabDashboard.addEventListener('click', () => switchTab('dashboard'));

  // 검색 입력
  DOM.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    handleSearchAndFilters();
  });

  // 추천 태그 클릭
  DOM.recommendTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const query = tag.getAttribute('data-query');
      DOM.searchInput.value = query;
      state.searchQuery = query;
      handleSearchAndFilters();
    });
  });

  // 셀렉트 필터 변경
  DOM.filterParty.addEventListener('change', (e) => {
    state.filters.party = e.target.value;
    handleSearchAndFilters(false); // 수동 필터는 모의 AI 로그 간소화
  });
  DOM.filterStatus.addEventListener('change', (e) => {
    state.filters.crimeStatus = e.target.value;
    handleSearchAndFilters(false);
  });
  DOM.filterRegion.addEventListener('change', (e) => {
    state.filters.region = e.target.value;
    handleSearchAndFilters(false);
  });

  // 모달 닫기
  DOM.modalOverlay.addEventListener('click', (e) => {
    if (e.target === DOM.modalOverlay) {
      closeModal();
    }
  });

  // ESC 키로 모달 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

// 탭 전환
function switchTab(tab) {
  state.activeTab = tab;
  if (tab === 'list') {
    DOM.tabList.classList.add('active');
    DOM.tabDashboard.classList.remove('active');
    DOM.listView.style.display = 'block';
    DOM.dashboardView.style.display = 'none';
  } else {
    DOM.tabList.classList.remove('active');
    DOM.tabDashboard.classList.add('active');
    DOM.listView.style.display = 'none';
    DOM.dashboardView.style.display = 'block';
    renderDashboard();
  }
}

// 자연어 검색 모의 파서 및 필터 핸들링 (핵심 기능)
function handleSearchAndFilters(isAiSearch = true) {
  let query = state.searchQuery.trim().toLowerCase();
  let results = [...state.members];

  // AI 자연어 파싱 시뮬레이션용 변수
  let aiParsingDetails = [];
  let sqlConditions = [];

  if (query && isAiSearch) {
    addConsoleLine(`Parsing natural language query: "${query}"`, 'ai');

    // 1. 정당 분석
    let partyMatch = null;
    if (query.includes('민주당') || query.includes('더불어')) {
      partyMatch = '더불어민주당';
      aiParsingDetails.push('정당: 더불어민주당');
      sqlConditions.push("party = '더불어민주당'");
    } else if (query.includes('국민의힘') || query.includes('국힘')) {
      partyMatch = '국민의힘';
      aiParsingDetails.push('정당: 국민의힘');
      sqlConditions.push("party = '국민의힘'");
    } else if (query.includes('혁신당') || query.includes('조국')) {
      partyMatch = '조국혁신당';
      aiParsingDetails.push('정당: 조국혁신당');
      sqlConditions.push("party = '조국혁신당'");
    } else if (query.includes('개혁')) {
      partyMatch = '개혁신당';
      aiParsingDetails.push('정당: 개혁신당');
      sqlConditions.push("party = '개혁신당'");
    } else if (query.includes('진보')) {
      partyMatch = '진보당';
      aiParsingDetails.push('정당: 진보당');
      sqlConditions.push("party = '진보당'");
    } else if (query.includes('새로운미래')) {
      partyMatch = '새로운미래';
      aiParsingDetails.push('정당: 새로운미래');
      sqlConditions.push("party = '새로운미래'");
    } else if (query.includes('기본소득')) {
      partyMatch = '기본소득당';
      aiParsingDetails.push('정당: 기본소득당');
      sqlConditions.push("party = '기본소득당'");
    } else if (query.includes('사회민주')) {
      partyMatch = '사회민주당';
      aiParsingDetails.push('정당: 사회민주당');
      sqlConditions.push("party = '사회민주당'");
    } else if (query.includes('무소속')) {
      partyMatch = '무소속';
      aiParsingDetails.push('정당: 무소속');
      sqlConditions.push("party = '무소속'");
    }

    if (partyMatch) {
      results = results.filter(m => m.party === partyMatch);
    }

    // 2. 범죄 유무 및 횟수 분석
    let crimeFilter = null;
    if (query.includes('깨끗한') || query.includes('전과 없는') || query.includes('전과가 없는') || query.includes('무전과') || query.includes('전과 0')) {
      crimeFilter = 'clean';
      aiParsingDetails.push('전과 여부: 없음 (0건)');
      sqlConditions.push("crimes_count = 0");
      results = results.filter(m => m.crimes_count === 0);
    } else if (query.includes('전과자') || query.includes('전과 있는') || query.includes('전과가 있는') || query.includes('기록 보유')) {
      crimeFilter = 'has-crime';
      aiParsingDetails.push('전과 여부: 있음 (1건 이상)');
      sqlConditions.push("crimes_count >= 1");
      results = results.filter(m => m.crimes_count >= 1);
    }

    // 3. 특정 전과 횟수 매칭 (예: "3범 이상", "전과 2건")
    const crimeCountRegex = /전과\s*(\d+)범|(\d+)범\s*이상|전과\s*(\d+)건/g;
    const match = crimeCountRegex.exec(query);
    if (match) {
      const num = parseInt(match[1] || match[2] || match[3]);
      if (query.includes('이상')) {
        aiParsingDetails.push(`전과 건수: ${num}건 이상`);
        sqlConditions.push(`crimes_count >= ${num}`);
        results = results.filter(m => m.crimes_count >= num);
      } else {
        aiParsingDetails.push(`전과 건수: 정확히 ${num}건`);
        sqlConditions.push(`crimes_count = ${num}`);
        results = results.filter(m => m.crimes_count === num);
      }
    }

    // 4. 죄종별 분류 매칭 (교통/음주, 집시법, 선거, 기타 등)
    let categoryMatch = null;
    let specificOffence = null;
    if (query.includes('음주') || query.includes('음주운전') || query.includes('술')) {
      categoryMatch = '교통';
      specificOffence = '음주운전';
      aiParsingDetails.push('죄종 카테고리: 교통 (음주운전)');
      sqlConditions.push("crimes.offence LIKE '%음주운전%'");
    } else if (query.includes('무면허')) {
      categoryMatch = '교통';
      specificOffence = '무면허';
      aiParsingDetails.push('죄종 카테고리: 교통 (무면허운전)');
      sqlConditions.push("crimes.offence LIKE '%무면허%'");
    } else if (query.includes('교통')) {
      categoryMatch = '교통';
      aiParsingDetails.push('죄종 카테고리: 교통');
      sqlConditions.push("crimes.category = '교통'");
    } else if (query.includes('집시법') || query.includes('집회') || query.includes('시위') || query.includes('민주화')) {
      categoryMatch = '국보법/집시법';
      aiParsingDetails.push('죄종 카테고리: 국보법/집시법/민주화운동');
      sqlConditions.push("crimes.category = '국보법/집시법'");
    } else if (query.includes('보안법') || query.includes('국가보안법')) {
      categoryMatch = '국보법/집시법';
      specificOffence = '국가보안법';
      aiParsingDetails.push('죄종 카테고리: 국보법 (국가보안법위반)');
      sqlConditions.push("crimes.offence LIKE '%국가보안법%'");
    } else if (query.includes('선거법') || query.includes('선거')) {
      categoryMatch = '선거';
      aiParsingDetails.push('죄종 카테고리: 선거');
      sqlConditions.push("crimes.category = '선거'");
    } else if (query.includes('정치자금') || query.includes('자금')) {
      categoryMatch = '선거';
      specificOffence = '정치자금';
      aiParsingDetails.push('죄종 카테고리: 선거 (정치자금법위반)');
      sqlConditions.push("crimes.offence LIKE '%정치자금%'");
    } else if (query.includes('폭행')) {
      specificOffence = '폭행';
      aiParsingDetails.push('세부 죄명: 폭행');
      sqlConditions.push("crimes.offence LIKE '%폭행%'");
    } else if (query.includes('명예훼손') || query.includes('비방')) {
      specificOffence = '명예훼손';
      aiParsingDetails.push('세부 죄명: 명예훼손');
      sqlConditions.push("crimes.offence LIKE '%명예훼손%'");
    }

    if (categoryMatch || specificOffence) {
      results = results.filter(m => {
        return m.crimes.some(c => {
          const catOk = categoryMatch ? c.category === categoryMatch : true;
          const offOk = specificOffence ? c.offence.includes(specificOffence) : true;
          return catOk && offOk;
        });
      });
    }

    // 5. 지역구 분석
    const regionNames = ['서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '비례'];
    let regionMatch = null;
    regionNames.forEach(reg => {
      if (query.includes(reg)) {
        regionMatch = reg;
      }
    });

    if (regionMatch) {
      aiParsingDetails.push(`지역: ${regionMatch}`);
      sqlConditions.push(`constituency LIKE '${regionMatch}%'`);
      results = results.filter(m => m.constituency.startsWith(regionMatch));
    }

    // 이름 직접 검색 대응
    const nameMatch = state.members.find(m => query.includes(m.name));
    if (nameMatch) {
      aiParsingDetails.push(`이름 직접검색: ${nameMatch.name}`);
      sqlConditions.push(`name = '${nameMatch.name}'`);
      results = [nameMatch];
    }

    // 모의 AI 터미널 로그 출력
    if (aiParsingDetails.length > 0) {
      addConsoleLine(`Extracted: [ ${aiParsingDetails.join(' | ')} ]`, 'ai');
      const sqlQuery = `SELECT * FROM assembly_members WHERE ${sqlConditions.join(' AND ') || '1=1'};`;
      addConsoleLine(sqlQuery, 'sql');
    } else {
      addConsoleLine(`Fuzzy text search for: "${query}"`, 'ai');
      addConsoleLine(`SELECT * FROM assembly_members WHERE name LIKE '%${query}%' OR constituency LIKE '%${query}%';`, 'sql');
      // 퍼지 검색 매칭
      results = results.filter(m => m.name.includes(query) || m.constituency.includes(query));
    }
  } else {
    // 검색창이 비었거나 수동 드롭다운 필터링인 경우
    if (state.filters.party !== 'all') {
      results = results.filter(m => m.party === state.filters.party);
    }
    if (state.filters.crimeStatus !== 'all') {
      if (state.filters.crimeStatus === 'clean') {
        results = results.filter(m => m.crimes_count === 0);
      } else if (state.filters.crimeStatus === 'has-crime') {
        results = results.filter(m => m.crimes_count >= 1);
      } else {
        const count = parseInt(state.filters.crimeStatus);
        results = results.filter(m => m.crimes_count >= count);
      }
    }
    if (state.filters.region !== 'all') {
      if (state.filters.region === '비례대표') {
        results = results.filter(m => m.constituency === '비례대표');
      } else {
        results = results.filter(m => m.constituency.startsWith(state.filters.region));
      }
    }
  }

  state.filteredMembers = results;
  
  if (query && isAiSearch) {
    addConsoleLine(`Query executed successfully. ${results.length} record(s) found.`, 'count');
  }

  // 필터 드롭다운 UI 상태 동기화 (AI 자연어 검색에 의해 걸러진 경우 선택상자 리셋)
  if (isAiSearch && query) {
    DOM.filterParty.value = 'all';
    DOM.filterStatus.value = 'all';
    DOM.filterRegion.value = 'all';
    state.filters = { party: 'all', crimeStatus: 'all', region: 'all' };
  }

  renderList();
}

// 리스트 렌더링
function renderList() {
  DOM.memberCount.textContent = state.filteredMembers.length;
  DOM.memberGrid.innerHTML = '';

  if (state.filteredMembers.length === 0) {
    DOM.memberGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-sub);">
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">🔍 조건에 부합하는 의원이 없습니다.</p>
        <p style="font-size: 0.9rem;">검색어나 필터 조건을 변경해 보세요.</p>
      </div>
    `;
    return;
  }

  state.filteredMembers.forEach(member => {
    const card = document.createElement('div');
    card.className = 'member-card';
    
    // 정당별 커스텀 스타일 입히기
    const partyColors = getPartyColors(member.party);
    card.style.setProperty('--party-color', partyColors.main);
    card.style.setProperty('--party-glow', partyColors.glow);

    // 전과 뱃지 스타일
    const hasCrime = member.crimes_count > 0;
    const isVerifiedCrimeData = hasVerifiedCrimeData(member);
    const badgeClass = isVerifiedCrimeData
      ? `crime-badge ${hasCrime ? 'has-crime' : 'clean'}`
      : 'crime-badge unknown';
    const badgeText = isVerifiedCrimeData
      ? (hasCrime ? `전과 ${member.crimes_count}건` : '전과 없음')
      : '선관위 상세 비공개';

    card.innerHTML = `
      <div class="member-avatar">
        <svg viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
      <div class="member-name">${member.name}</div>
      <div class="member-party-badge">${member.party}</div>
      <div class="member-dist">${member.constituency}</div>
      <div class="${badgeClass}">
        ${isVerifiedCrimeData ? (hasCrime ? '⚠️' : '✓') : 'ⓘ'} ${badgeText}
      </div>
    `;

    // 카드 클릭시 모달 오픈
    card.addEventListener('click', () => openModal(member));

    DOM.memberGrid.appendChild(card);
  });
}

// 대시보드 시각화 렌더링
function renderDashboard() {
  const total = state.members.length;
  const verifiedMembers = state.members.filter(hasVerifiedCrimeData);
  const crimeMembers = verifiedMembers.filter(m => m.crimes_count > 0).length;
  const cleanMembers = verifiedMembers.filter(m => m.crimes_count === 0).length;
  const unverifiedMembers = total - verifiedMembers.length;
  const percent = verifiedMembers.length > 0 ? ((crimeMembers / verifiedMembers.length) * 100).toFixed(2) : null;

  // 1. 종합 수치 갱신
  document.getElementById('dash-percent-text').textContent = percent ? `${percent}%` : '검증중';
  document.getElementById('dash-crime-circle').style.strokeDashoffset = percent ? 314 - (314 * percent) / 100 : 314;
  document.getElementById('dash-count-crime').textContent = `${crimeMembers}명`;
  document.getElementById('dash-count-clean').textContent = `${cleanMembers}명`;

  // 2. 정당별 전과 현황 집계 및 차트화
  const partyData = {};
  state.members.forEach(m => {
    if (!partyData[m.party]) {
      partyData[m.party] = { total: 0, crime: 0 };
    }
    partyData[m.party].total++;
    if (m.crimes_count > 0) {
      partyData[m.party].crime++;
    }
  });

  // 주요 정당 순 정렬
  const partyOrder = ['더불어민주당', '국민의힘', '조국혁신당', '무소속', '진보당', '개혁신당', '기본소득당', '사회민주당'];
  const partyChartContainer = document.getElementById('party-chart-container');
  partyChartContainer.innerHTML = '';

  partyOrder.forEach(partyName => {
    const data = partyData[partyName] || { total: 0, crime: 0 };
    if (data.total === 0) return;
    const seatRatio = ((data.total / total) * 100).toFixed(1);
    const colors = getPartyColors(partyName);

    const row = document.createElement('div');
    row.className = 'party-row';
    row.innerHTML = `
      <div class="party-info">
        <span class="party-name-badge">
          <span class="party-dot" style="background: ${colors.main}"></span>
          ${partyName} <span style="color: var(--text-sub)">(${data.total}석)</span>
        </span>
        <span>전체 의석 중 <strong>${seatRatio}%</strong></span>
      </div>
      <div class="party-bar-container">
        <div class="party-bar-total" style="width: 100%">
          <div class="party-bar-crime" style="width: ${seatRatio}%; background: ${colors.main}"></div>
        </div>
      </div>
    `;
    partyChartContainer.appendChild(row);
  });

  // 3. 죄종별 현황 집계
  const crimeCategories = {
    '교통': 0,
    '국보법/집시법': 0,
    '선거': 0,
    '기타': 0
  };

  state.members.forEach(m => {
    m.crimes.forEach(c => {
      if (crimeCategories[c.category] !== undefined) {
        crimeCategories[c.category]++;
      } else {
        crimeCategories['기타']++;
      }
    });
  });

  // 차트 최대값 찾기 (비율 조정을 위함)
  const maxCrimeVal = Math.max(...Object.values(crimeCategories));
  const crimeChartContainer = document.getElementById('crime-chart-container');
  crimeChartContainer.innerHTML = '';

  if (unverifiedMembers > 0 && verifiedMembers.length === 0) {
    const row = document.createElement('div');
    row.className = 'crime-row';
    row.innerHTML = `
      <div class="crime-label">선관위 상세 비공개</div>
      <div class="crime-bar-wrap">
        <div class="crime-bar" style="width: 100%"></div>
      </div>
      <div class="crime-value">${unverifiedMembers}명</div>
    `;
    crimeChartContainer.appendChild(row);
  } else {
    Object.entries(crimeCategories).forEach(([category, count]) => {
    const barWidth = maxCrimeVal > 0 ? (count / maxCrimeVal) * 100 : 0;
    
    const row = document.createElement('div');
    row.className = 'crime-row';
    row.innerHTML = `
      <div class="crime-label">${category}</div>
      <div class="crime-bar-wrap">
        <div class="crime-bar" style="width: ${barWidth}%"></div>
      </div>
      <div class="crime-value">${count}건</div>
    `;
    crimeChartContainer.appendChild(row);
    });
  }

  renderAssemblySeats(partyData);
}

// 국회 본회의장 형태의 반원형 의석 배치 렌더링
function renderAssemblySeats(partyData) {
  const floor = document.getElementById('assembly-floor');
  const legend = document.getElementById('assembly-legend');
  if (!floor || !legend) return;

  floor.querySelectorAll('.assembly-seat').forEach(seat => seat.remove());
  legend.innerHTML = '';

  const partyOrder = ['더불어민주당', '국민의힘', '조국혁신당', '무소속', '진보당', '개혁신당', '기본소득당', '사회민주당', '새로운미래'];
  const sortedMembers = [...state.members].sort((a, b) => {
    const partyDiff = partyOrder.indexOf(a.party) - partyOrder.indexOf(b.party);
    if (partyDiff !== 0) return partyDiff;
    return b.crimes_count - a.crimes_count || a.name.localeCompare(b.name, 'ko');
  });

  partyOrder.forEach(party => {
    const data = partyData[party];
    if (!data) return;

    const colors = getPartyColors(party);
    const item = document.createElement('div');
    item.className = 'assembly-legend-item';
    item.innerHTML = `
      <span class="assembly-legend-dot" style="background: ${colors.main}"></span>
      <span>${party}</span>
      <strong>${data.total}석</strong>
    `;
    legend.appendChild(item);
  });

  const rows = [18, 24, 30, 36, 42, 48, 48, 54];
  let memberIndex = 0;

  rows.forEach((seatCount, rowIndex) => {
    const xRadius = 20 + rowIndex * 4;
    const yRadius = 18 + rowIndex * 8.7;
    const startAngle = 202;
    const endAngle = 338;

    for (let i = 0; i < seatCount; i++) {
      const member = sortedMembers[memberIndex];
      if (!member) return;

      const ratio = seatCount === 1 ? 0.5 : i / (seatCount - 1);
      const angle = (startAngle + (endAngle - startAngle) * ratio) * Math.PI / 180;
      const x = 50 + Math.cos(angle) * xRadius;
      const y = 94 + Math.sin(angle) * yRadius;
      const colors = getPartyColors(member.party);
      const hasCrime = member.crimes_count > 0;
      const isVerifiedCrimeData = hasVerifiedCrimeData(member);

      const seat = document.createElement('button');
      seat.type = 'button';
      seat.className = `assembly-seat ${isVerifiedCrimeData ? (hasCrime ? 'has-crime' : 'clean') : 'unknown'}`;
      seat.style.left = `${x}%`;
      seat.style.top = `${y}%`;
      seat.style.setProperty('--seat-color', colors.main);
      seat.style.setProperty('--seat-glow', colors.glow);
      seat.setAttribute('aria-label', `${member.name}, ${member.party}, ${isVerifiedCrimeData ? (hasCrime ? `전과 ${member.crimes_count}건` : '전과 없음') : '선거일 후 선관위 상세 전과 비공개'}`);
      seat.innerHTML = `
        <span class="assembly-seat-core"></span>
        <span class="assembly-tooltip">
          <strong>${escapeHtml(member.name)}</strong>
          <em>${escapeHtml(member.party)} · ${escapeHtml(member.constituency)}</em>
          ${renderSeatCrimeSummary(member)}
        </span>
      `;
      seat.addEventListener('click', () => openModal(member));
      floor.appendChild(seat);
      memberIndex++;
    }
  });
}

function renderSeatCrimeSummary(member) {
  if (!hasVerifiedCrimeData(member)) {
    return `
      <span class="assembly-tooltip-unknown">선관위 상세 비공개</span>
      <span>선거일 후 후보자 재산·전과 등은 공식 상세 조회 기간이 아닙니다.</span>
    `;
  }

  if (member.crimes_count === 0) {
    return '<span class="assembly-tooltip-clean">전과 없음</span>';
  }

  const crimeRows = member.crimes.slice(0, 3).map(crime => {
    return `<span>${escapeHtml(crime.offence)} · ${escapeHtml(crime.sentence)}</span>`;
  }).join('');
  const moreText = member.crimes_count > 3 ? `<span>외 ${member.crimes_count - 3}건</span>` : '';

  return `
    <span class="assembly-tooltip-count">전과 ${member.crimes_count}건</span>
    ${crimeRows}
    ${moreText}
  `;
}

function hasVerifiedCrimeData(member) {
  return Number.isInteger(member.crimes_count);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 정당별 테마 색상 맵
function getPartyColors(party) {
  switch (party) {
    case '더불어민주당':
      return { main: 'var(--party-minjoo)', glow: 'rgba(31, 78, 245, 0.2)' };
    case '국민의힘':
      return { main: 'var(--party-power)', glow: 'rgba(230, 28, 36, 0.2)' };
    case '조국혁신당':
      return { main: 'var(--party-rebuild)', glow: 'rgba(0, 135, 255, 0.2)' };
    case '개혁신당':
      return { main: 'var(--party-reform)', glow: 'rgba(255, 127, 0, 0.2)' };
    case '진보당':
      return { main: 'var(--party-progressive)', glow: 'rgba(214, 0, 28, 0.2)' };
    case '새로운미래':
      return { main: 'var(--party-newfuture)', glow: 'rgba(0, 181, 181, 0.2)' };
    case '기본소득당':
      return { main: '#b84cff', glow: 'rgba(184, 76, 255, 0.2)' };
    case '사회민주당':
      return { main: '#41c36d', glow: 'rgba(65, 195, 109, 0.2)' };
    case '무소속':
      return { main: '#9aa4b2', glow: 'rgba(154, 164, 178, 0.2)' };
    default:
      return { main: 'var(--party-etc)', glow: 'rgba(127, 140, 141, 0.2)' };
  }
}

// 모달 상세 창 열기
function openModal(member) {
  state.selectedMember = member;
  const colors = getPartyColors(member.party);
  DOM.modalOverlay.style.setProperty('--party-color', colors.main);
  DOM.modalOverlay.style.display = 'flex';

  const modalBody = document.getElementById('modal-body-content');
  document.getElementById('modal-member-name').textContent = member.name;
  document.getElementById('modal-member-party').textContent = member.party;
  document.getElementById('modal-member-party').style.background = colors.main;
  document.getElementById('modal-member-dist').textContent = member.constituency;

  if (!hasVerifiedCrimeData(member)) {
    modalBody.innerHTML = `
      <div class="modal-clean-state unverified">
        <svg viewBox="0 0 24 24">
          <path d="M11 17h2v-6h-2v6zm1-14C6.48 3 2 7.48 2 13s4.48 10 10 10 10-4.48 10-10S17.52 3 12 3zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2V7h-2v2z"/>
        </svg>
        <div class="modal-clean-title">선관위 상세 전과 비공개</div>
        <div class="modal-clean-desc">선관위 후보자명부는 선거일 후 재산·전과 등 상세 공시자료를 비공개 처리합니다. 공식 상세자료로 대조 가능한 값만 표시하며, 확인되지 않은 전과는 임의로 채우지 않습니다.</div>
      </div>
    `;
  } else if (member.crimes_count === 0) {
    modalBody.innerHTML = `
      <div class="modal-clean-state">
        <svg viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <div class="modal-clean-title">범죄 전과 및 처벌 기록 없음</div>
        <div class="modal-clean-desc">본 공직자는 선관위에 신고된 전과 및 100만 원 이상 벌금형 기록이 존재하지 않는 청렴한 후보자입니다.</div>
      </div>
    `;
  } else {
    let crimesHtml = member.crimes.map(crime => {
      return `
        <div class="modal-crime-item">
          <div class="modal-crime-header">
            <div class="modal-crime-title">${crime.offence}</div>
            <span class="modal-crime-tag">${crime.category}</span>
          </div>
          <div class="modal-crime-meta">
            <span>📅 처벌일: <strong>${crime.date}</strong></span>
            <span>⚖️ 형량: <strong>${crime.sentence}</strong></span>
          </div>
          <div class="ai-explanation-card">
            ${crime.ai_explanation}
          </div>
        </div>
      `;
    }).join('');

    modalBody.innerHTML = `
      <div class="modal-section-title">
        <svg viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
        신고된 범죄 전과 목록 (총 ${member.crimes_count}건)
      </div>
      <div class="modal-crimes-list">
        ${crimesHtml}
      </div>
    `;
  }
}

// 모달 상세 창 닫기
function closeModal() {
  state.selectedMember = null;
  DOM.modalOverlay.style.display = 'none';
}

// 메인 렌더
function render() {
  renderList();
  DOM.totalCount.textContent = state.members.length;
}

// 윈도우 로드시 앱 구동
window.addEventListener('DOMContentLoaded', init);
