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
  filterParty: document.getElementById('filter-party'),
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

// 검색어 파서 및 필터 핸들링
function handleSearchAndFilters(isAiSearch = true) {
  let query = state.searchQuery.trim().toLowerCase();
  let results = [...state.members];

  if (query && isAiSearch) {
    // 1. 정당 분석
    let partyMatch = null;
    if (query.includes('민주당') || query.includes('더불어')) {
      partyMatch = '더불어민주당';
    } else if (query.includes('국민의힘') || query.includes('국힘')) {
      partyMatch = '국민의힘';
    } else if (query.includes('혁신당') || query.includes('조국')) {
      partyMatch = '조국혁신당';
    } else if (query.includes('개혁')) {
      partyMatch = '개혁신당';
    } else if (query.includes('진보')) {
      partyMatch = '진보당';
    } else if (query.includes('새로운미래')) {
      partyMatch = '새로운미래';
    } else if (query.includes('기본소득')) {
      partyMatch = '기본소득당';
    } else if (query.includes('사회민주')) {
      partyMatch = '사회민주당';
    } else if (query.includes('무소속')) {
      partyMatch = '무소속';
    }

    if (partyMatch) {
      results = results.filter(m => m.party === partyMatch);
    }

    // 2. 지역구 분석
    const regionNames = ['서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '비례'];
    let regionMatch = null;
    regionNames.forEach(reg => {
      if (query.includes(reg)) {
        regionMatch = reg;
      }
    });

    if (regionMatch) {
      results = results.filter(m => m.constituency.startsWith(regionMatch));
    }

    // 이름 직접 검색 대응
    const nameMatch = state.members.find(m => query.includes(m.name));
    if (nameMatch) {
      results = [nameMatch];
    }

    if (!partyMatch && !regionMatch && !nameMatch) {
      // 퍼지 검색 매칭
      results = results.filter(m => m.name.includes(query) || m.party.includes(query) || m.constituency.includes(query));
    }
  } else {
    // 검색창이 비었거나 수동 드롭다운 필터링인 경우
    if (state.filters.party !== 'all') {
      results = results.filter(m => m.party === state.filters.party);
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
  
  // 필터 드롭다운 UI 상태 동기화
  if (isAiSearch && query) {
    DOM.filterParty.value = 'all';
    DOM.filterRegion.value = 'all';
    state.filters = { party: 'all', region: 'all' };
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

    card.innerHTML = `
      <div class="member-avatar">
        <svg viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
      <div class="member-name">${member.name}</div>
      <div class="member-party-badge">${member.party}</div>
      <div class="member-dist">${member.constituency}</div>
      <div class="activity-badge">
        공약·법안·표결 보기
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
  const districtMembers = state.members.filter(m => m.constituency !== '비례대표').length;
  const proportionalMembers = total - districtMembers;

  // 1. 종합 수치 갱신
  document.getElementById('dash-percent-text').textContent = `${districtMembers}석`;
  document.getElementById('dash-district-circle').style.strokeDashoffset = 314 - (314 * districtMembers) / total;
  document.getElementById('dash-count-district').textContent = `${districtMembers}석`;
  document.getElementById('dash-count-clean').textContent = `${proportionalMembers}석`;

  // 2. 정당별 의석 현황 집계 및 차트화
  const partyData = {};
  state.members.forEach(m => {
    if (!partyData[m.party]) {
      partyData[m.party] = { total: 0 };
    }
    partyData[m.party].total++;
  });

  // 주요 정당 순 정렬
  const partyOrder = ['더불어민주당', '국민의힘', '조국혁신당', '무소속', '진보당', '개혁신당', '기본소득당', '사회민주당'];
  const partyChartContainer = document.getElementById('party-chart-container');
  partyChartContainer.innerHTML = '';

  partyOrder.forEach(partyName => {
    const data = partyData[partyName] || { total: 0 };
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
          <div class="party-bar-fill" style="width: ${seatRatio}%; background: ${colors.main}"></div>
        </div>
      </div>
    `;
    partyChartContainer.appendChild(row);
  });

  // 3. 공식자료 연결 상태
  const sourceStatusContainer = document.getElementById('source-status-container');
  sourceStatusContainer.innerHTML = '';

  [
    ['공약 원문', '선관위 정책공약마당'],
    ['입법 활동', '국회 의안정보시스템'],
    ['표결 기록', '국회 공개데이터']
  ].forEach(([label, source]) => {
    const row = document.createElement('div');
    row.className = 'source-status-row';
    row.innerHTML = `
      <div class="source-status-label">${label}</div>
      <div class="source-status-bar-wrap">
        <div class="source-status-bar" style="width: 100%"></div>
      </div>
      <div class="source-status-value">${source}</div>
    `;
    sourceStatusContainer.appendChild(row);
  });

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
    return a.name.localeCompare(b.name, 'ko');
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

      const seat = document.createElement('button');
      seat.type = 'button';
      seat.className = 'assembly-seat';
      seat.style.left = `${x}%`;
      seat.style.top = `${y}%`;
      seat.style.setProperty('--seat-color', colors.main);
      seat.style.setProperty('--seat-glow', colors.glow);
      seat.setAttribute('aria-label', `${member.name}, ${member.party}, ${member.constituency}, 공식자료 보기`);
      seat.innerHTML = `
        <span class="assembly-seat-core"></span>
        <span class="assembly-tooltip">
          <strong>${escapeHtml(member.name)}</strong>
          <em>${escapeHtml(member.party)} · ${escapeHtml(member.constituency)}</em>
          ${renderSeatActivitySummary(member)}
        </span>
      `;
      seat.addEventListener('click', () => openModal(member));
      floor.appendChild(seat);
      memberIndex++;
    }
  });
}

function renderSeatActivitySummary(member) {
  return `
    <span class="assembly-tooltip-clean">공약·입법·표결 공식자료</span>
    <span>클릭하면 지역구 의정 활동 허브가 열립니다.</span>
  `;
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
  const links = buildOfficialLinks(member);
  const regionTags = buildRegionTags(member);
  DOM.modalOverlay.style.setProperty('--party-color', colors.main);
  DOM.modalOverlay.style.display = 'flex';

  const modalBody = document.getElementById('modal-body-content');
  document.getElementById('modal-member-name').textContent = member.name;
  document.getElementById('modal-member-party').textContent = member.party;
  document.getElementById('modal-member-party').style.background = colors.main;
  document.getElementById('modal-member-dist').textContent = member.constituency;

  modalBody.innerHTML = `
    <div class="district-brief">
      <div>
        <span class="district-kicker">지역구</span>
        <strong>${escapeHtml(member.constituency)}</strong>
      </div>
      <div>
        <span class="district-kicker">자료 범위</span>
        <strong>공약 · 입법 · 표결</strong>
      </div>
    </div>

    <div class="source-grid">
      ${renderSourceCard('주요 공약', '선거공보와 후보자 공약 원문을 확인합니다. 공약 이행 평가는 원문 연결 이후 별도 근거가 있을 때만 표시합니다.', links.pledge, '선관위 정책공약마당')}
      ${renderSourceCard('최근 입법', '대표발의·공동발의 법안과 처리 상태는 국회 의안정보시스템에서 확인합니다.', links.bill, '국회 의안정보시스템')}
      ${renderSourceCard('최근 표결', '본회의 표결의 찬성·반대·기권·불참 기록은 국회 공개데이터를 기준으로 확인합니다.', links.vote, '국회 공개데이터')}
    </div>

    <div class="activity-note">
      <div class="modal-section-title">
        <svg viewBox="0 0 24 24">
          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
        </svg>
        빠른 탐색 키워드
      </div>
      <div class="keyword-chips">
        ${regionTags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderSourceCard(title, description, href, sourceName) {
  return `
    <article class="source-card">
      <div>
        <h4>${title}</h4>
        <p>${description}</p>
      </div>
      <a href="${href}" target="_blank" rel="noopener noreferrer">${sourceName}</a>
    </article>
  `;
}

function buildOfficialLinks(member) {
  const name = encodeURIComponent(member.name);
  const constituency = encodeURIComponent(member.constituency);

  return {
    pledge: 'https://policy.nec.go.kr/',
    bill: `https://likms.assembly.go.kr/bill/main.do?query=${name}`,
    vote: 'https://open.assembly.go.kr/',
    districtSearch: `https://www.assembly.go.kr/portal/search/search.do?query=${constituency}`
  };
}

function buildRegionTags(member) {
  const parts = member.constituency.split(/\s+/).filter(Boolean);
  return Array.from(new Set([
    member.name,
    member.party,
    member.constituency,
    ...parts,
    '공약',
    '대표발의',
    '본회의 표결'
  ]));
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
