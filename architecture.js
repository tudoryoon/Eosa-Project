const STORAGE_KEY = 'eosa-architecture-study-v1';
const GRID_SIZE = 0.5;
const MIN_ROOM_SIZE = 1;

const ROOM_PRESETS = {
  living: { name: '거실', width: 5.5, height: 4, color: 'teal' },
  bedroom: { name: '침실', width: 4, height: 3.5, color: 'blue' },
  kitchen: { name: '주방', width: 3.5, height: 3, color: 'green' },
  bathroom: { name: '욕실', width: 2.5, height: 2, color: 'gold' },
  study: { name: '서재', width: 3, height: 3, color: 'violet' },
  utility: { name: '다용도실', width: 2, height: 2, color: 'coral' }
};

const ROOM_COLORS = [
  ['teal', '청록'],
  ['blue', '파랑'],
  ['green', '초록'],
  ['gold', '노랑'],
  ['coral', '주황'],
  ['violet', '보라']
];

let plan = createDefaultPlan();
let selectedRoomId = null;
let history = [];
let historyIndex = -1;
let initialized = false;
let interaction = null;
let saveStatusTimer = null;
let DOM = {};

export function initArchitecture() {
  if (initialized) return;

  DOM = {
    view: document.getElementById('architecture-view'),
    stage: document.getElementById('plan-stage'),
    planTitle: document.getElementById('plan-title'),
    roomPreset: document.getElementById('room-preset'),
    addRoom: document.getElementById('add-room'),
    undo: document.getElementById('undo-plan'),
    redo: document.getElementById('redo-plan'),
    export: document.getElementById('export-plan'),
    reset: document.getElementById('reset-plan'),
    planArea: document.getElementById('plan-area'),
    roomCount: document.getElementById('room-count'),
    overlapStatus: document.getElementById('overlap-status'),
    saveStatus: document.getElementById('save-status'),
    rulerMid: document.getElementById('plan-ruler-mid'),
    rulerEnd: document.getElementById('plan-ruler-end'),
    inspectorEmpty: document.getElementById('inspector-empty'),
    inspectorFields: document.getElementById('inspector-fields'),
    roomList: document.getElementById('room-list'),
    selectedRoomArea: document.getElementById('selected-room-area'),
    deleteRoom: document.getElementById('delete-room'),
    roomName: document.getElementById('room-name'),
    roomWidth: document.getElementById('room-width'),
    roomHeight: document.getElementById('room-height'),
    roomX: document.getElementById('room-x'),
    roomY: document.getElementById('room-y'),
    planWidth: document.getElementById('plan-width'),
    planHeight: document.getElementById('plan-height'),
    colorOptions: document.getElementById('room-color-options')
  };

  plan = loadPlan();
  selectedRoomId = plan.rooms[0]?.id || null;
  history = [serializePlan()];
  historyIndex = 0;
  buildColorOptions();
  bindEvents();
  renderArchitecture();
  initialized = true;
}

export function refreshArchitecture() {
  if (!initialized) return;
  renderArchitecture();
}

function createDefaultPlan() {
  return {
    title: '나의 첫 번째 집',
    width: 14,
    height: 10,
    rooms: [
      createRoom('거실', 0.5, 0.5, 5.5, 4, 'teal'),
      createRoom('주방', 6, 0.5, 3.5, 3, 'green'),
      createRoom('안방', 0.5, 4.5, 4, 3.5, 'blue'),
      createRoom('서재', 4.5, 4.5, 3, 3.5, 'violet'),
      createRoom('욕실', 7.5, 4.5, 2, 2.5, 'gold')
    ]
  };
}

function createRoom(name, x, y, width, height, color) {
  return {
    id: `room-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    x,
    y,
    width,
    height,
    color
  };
}

function loadPlan() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return createDefaultPlan();
    const parsed = JSON.parse(saved);
    return normalizePlan(parsed);
  } catch (error) {
    console.warn('저장된 건축 스터디를 불러오지 못했습니다.', error);
    return createDefaultPlan();
  }
}

function normalizePlan(candidate) {
  const width = clamp(snap(Number(candidate.width) || 14), 6, 30);
  const height = clamp(snap(Number(candidate.height) || 10), 6, 24);
  const rooms = Array.isArray(candidate.rooms) ? candidate.rooms : [];

  return {
    title: String(candidate.title || '나의 집').slice(0, 40),
    width,
    height,
    rooms: rooms.map((room, index) => {
      const roomWidth = clamp(snap(Number(room.width) || 3), MIN_ROOM_SIZE, width);
      const roomHeight = clamp(snap(Number(room.height) || 3), MIN_ROOM_SIZE, height);
      return {
        id: String(room.id || `restored-room-${index}`),
        name: String(room.name || `공간 ${index + 1}`).slice(0, 20),
        x: clamp(snap(Number(room.x) || 0), 0, width - roomWidth),
        y: clamp(snap(Number(room.y) || 0), 0, height - roomHeight),
        width: roomWidth,
        height: roomHeight,
        color: ROOM_COLORS.some(([key]) => key === room.color) ? room.color : 'teal'
      };
    })
  };
}

function bindEvents() {
  DOM.addRoom.addEventListener('click', addRoomFromPreset);
  DOM.undo.addEventListener('click', undo);
  DOM.redo.addEventListener('click', redo);
  DOM.export.addEventListener('click', exportPlan);
  DOM.reset.addEventListener('click', resetPlan);
  DOM.deleteRoom.addEventListener('click', deleteSelectedRoom);
  DOM.roomList.addEventListener('change', () => {
    selectRoom(DOM.roomList.value || null);
  });

  DOM.planTitle.addEventListener('input', () => {
    plan.title = DOM.planTitle.value.slice(0, 40);
    savePlan();
  });
  DOM.planTitle.addEventListener('change', commitHistory);

  DOM.roomName.addEventListener('input', () => {
    updateSelectedRoom({ name: DOM.roomName.value.slice(0, 20) }, false);
  });
  DOM.roomName.addEventListener('change', commitHistory);

  [DOM.roomWidth, DOM.roomHeight, DOM.roomX, DOM.roomY].forEach(input => {
    input.addEventListener('input', () => updateRoomFromInspector(false));
    input.addEventListener('change', () => updateRoomFromInspector(true));
  });

  [DOM.planWidth, DOM.planHeight].forEach(input => {
    input.addEventListener('change', updatePlanBounds);
  });

  DOM.stage.addEventListener('pointerdown', event => {
    if (event.target === DOM.stage) selectRoom(null);
  });
  document.addEventListener('pointerup', finishRoomInteraction);
  document.addEventListener('pointercancel', finishRoomInteraction);

  document.addEventListener('keydown', event => {
    if (!isArchitectureVisible() || !selectedRoomId) return;
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(event.target.tagName)) return;

    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      deleteSelectedRoom();
    }
  });
}

function buildColorOptions() {
  DOM.colorOptions.innerHTML = '';
  ROOM_COLORS.forEach(([key, label]) => {
    const wrapper = document.createElement('label');
    wrapper.className = 'room-color-option';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'room-color';
    input.value = key;
    input.setAttribute('aria-label', label);
    input.addEventListener('change', () => {
      if (!input.checked) return;
      updateSelectedRoom({ color: key });
    });

    const swatch = document.createElement('span');
    swatch.className = `room-color-swatch room-color-${key}`;
    swatch.setAttribute('aria-hidden', 'true');

    wrapper.append(input, swatch);
    DOM.colorOptions.appendChild(wrapper);
  });
}

function renderArchitecture() {
  if (!DOM.stage) return;

  DOM.planTitle.value = plan.title;
  DOM.stage.style.aspectRatio = `${plan.width} / ${plan.height}`;
  DOM.stage.style.width = `min(100%, ${680 * (plan.width / plan.height)}px)`;
  DOM.stage.style.setProperty('--grid-x', `${(GRID_SIZE / plan.width) * 100}%`);
  DOM.stage.style.setProperty('--grid-y', `${(GRID_SIZE / plan.height) * 100}%`);
  DOM.rulerMid.textContent = `${formatNumber(plan.width / 2)}m`;
  DOM.rulerEnd.textContent = `${formatNumber(plan.width)}m`;
  renderRooms();
  renderMetrics();
  renderRoomList();
  renderInspector();
  updateHistoryButtons();
}

function renderRooms() {
  DOM.stage.querySelectorAll('.plan-room').forEach(room => room.remove());
  const overlappingIds = getOverlappingRoomIds();

  plan.rooms.forEach(room => {
    const element = document.createElement('button');
    element.type = 'button';
    element.className = `plan-room room-color-${room.color}`;
    element.dataset.roomId = room.id;
    element.classList.toggle('selected', room.id === selectedRoomId);
    element.classList.toggle('has-overlap', overlappingIds.has(room.id));
    positionRoomElement(element, room);
    element.setAttribute('aria-label', `${room.name}, ${formatNumber(room.width)}m 곱하기 ${formatNumber(room.height)}m, ${formatNumber(room.width * room.height)}제곱미터`);

    const name = document.createElement('strong');
    name.textContent = room.name;
    const dimensions = document.createElement('span');
    dimensions.textContent = `${formatNumber(room.width)} × ${formatNumber(room.height)}m`;
    const area = document.createElement('em');
    area.textContent = `${formatNumber(room.width * room.height)} m²`;
    const handle = document.createElement('span');
    handle.className = 'room-resize-handle';
    handle.setAttribute('aria-hidden', 'true');

    element.append(name, dimensions, area, handle);
    element.addEventListener('pointerdown', startRoomInteraction);
    element.addEventListener('pointermove', continueRoomInteraction);
    element.addEventListener('pointerup', finishRoomInteraction);
    element.addEventListener('pointercancel', finishRoomInteraction);
    element.addEventListener('keydown', handleRoomKeydown);
    DOM.stage.appendChild(element);
  });
}

function positionRoomElement(element, room) {
  element.style.left = `${(room.x / plan.width) * 100}%`;
  element.style.top = `${(room.y / plan.height) * 100}%`;
  element.style.width = `${(room.width / plan.width) * 100}%`;
  element.style.height = `${(room.height / plan.height) * 100}%`;
}

function renderMetrics() {
  const totalArea = plan.rooms.reduce((sum, room) => sum + room.width * room.height, 0);
  const overlapCount = getOverlappingRoomIds().size;
  DOM.planArea.textContent = `${formatNumber(totalArea)} m²`;
  DOM.roomCount.textContent = `${plan.rooms.length}개`;
  DOM.overlapStatus.textContent = overlapCount ? `${overlapCount}개 공간 겹침` : '정상';
  DOM.overlapStatus.classList.toggle('warning', overlapCount > 0);
}

function renderInspector() {
  const room = getSelectedRoom();
  DOM.inspectorEmpty.style.display = room ? 'none' : 'flex';
  DOM.inspectorFields.style.display = room ? 'block' : 'none';
  DOM.planWidth.value = plan.width;
  DOM.planHeight.value = plan.height;

  if (!room) return;

  DOM.selectedRoomArea.textContent = `${formatNumber(room.width * room.height)} m²`;
  DOM.roomName.value = room.name;
  DOM.roomWidth.value = room.width;
  DOM.roomHeight.value = room.height;
  DOM.roomX.value = room.x;
  DOM.roomY.value = room.y;
  DOM.roomWidth.max = plan.width;
  DOM.roomHeight.max = plan.height;
  DOM.roomX.max = plan.width - room.width;
  DOM.roomY.max = plan.height - room.height;
  DOM.colorOptions.querySelectorAll('input').forEach(input => {
    input.checked = input.value === room.color;
  });
}

function renderRoomList() {
  DOM.roomList.innerHTML = '';

  if (plan.rooms.length === 0) {
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = '공간 없음';
    DOM.roomList.appendChild(emptyOption);
    DOM.roomList.disabled = true;
    return;
  }

  DOM.roomList.disabled = false;
  plan.rooms.forEach((room, index) => {
    const option = document.createElement('option');
    option.value = room.id;
    option.textContent = `${index + 1}. ${room.name} · ${formatNumber(room.width * room.height)} m²`;
    option.selected = room.id === selectedRoomId;
    DOM.roomList.appendChild(option);
  });
}

function addRoomFromPreset() {
  const preset = ROOM_PRESETS[DOM.roomPreset.value];
  const width = Math.min(preset.width, plan.width);
  const height = Math.min(preset.height, plan.height);
  const position = findAvailablePosition(width, height);
  const room = createRoom(preset.name, position.x, position.y, width, height, preset.color);
  plan.rooms.push(room);
  selectedRoomId = room.id;
  commitHistory();
  renderArchitecture();
}

function findAvailablePosition(width, height) {
  for (let y = 0; y <= plan.height - height; y += GRID_SIZE) {
    for (let x = 0; x <= plan.width - width; x += GRID_SIZE) {
      const candidate = { x, y, width, height };
      if (!plan.rooms.some(room => roomsOverlap(candidate, room))) return { x, y };
    }
  }
  return { x: 0, y: 0 };
}

function startRoomInteraction(event) {
  event.preventDefault();
  const element = event.currentTarget;
  const room = plan.rooms.find(item => item.id === element.dataset.roomId);
  if (!room) return;

  selectRoom(room.id, false);
  interaction = {
    pointerId: event.pointerId,
    element,
    room,
    mode: event.target.classList.contains('room-resize-handle') ? 'resize' : 'move',
    startX: event.clientX,
    startY: event.clientY,
    original: { ...room }
  };
  element.setPointerCapture(event.pointerId);
  element.classList.add('is-dragging');
}

function continueRoomInteraction(event) {
  if (!interaction || interaction.pointerId !== event.pointerId) return;
  const rect = DOM.stage.getBoundingClientRect();
  const deltaX = snap(((event.clientX - interaction.startX) / rect.width) * plan.width);
  const deltaY = snap(((event.clientY - interaction.startY) / rect.height) * plan.height);
  const room = interaction.room;

  if (interaction.mode === 'move') {
    room.x = clamp(interaction.original.x + deltaX, 0, plan.width - room.width);
    room.y = clamp(interaction.original.y + deltaY, 0, plan.height - room.height);
  } else {
    room.width = clamp(interaction.original.width + deltaX, MIN_ROOM_SIZE, plan.width - room.x);
    room.height = clamp(interaction.original.height + deltaY, MIN_ROOM_SIZE, plan.height - room.y);
  }

  positionRoomElement(interaction.element, room);
  updateRoomElementText(interaction.element, room);
  renderMetrics();
  renderInspector();
}

function finishRoomInteraction(event) {
  if (!interaction || interaction.pointerId !== event.pointerId) return;
  const completedInteraction = interaction;
  interaction = null;
  completedInteraction.element.classList.remove('is-dragging');
  if (completedInteraction.element.hasPointerCapture(event.pointerId)) {
    completedInteraction.element.releasePointerCapture(event.pointerId);
  }
  commitHistory();
  renderArchitecture();
}

function updateRoomElementText(element, room) {
  const [name, dimensions, area] = element.querySelectorAll('strong, span:not(.room-resize-handle), em');
  if (name) name.textContent = room.name;
  if (dimensions) dimensions.textContent = `${formatNumber(room.width)} × ${formatNumber(room.height)}m`;
  if (area) area.textContent = `${formatNumber(room.width * room.height)} m²`;
}

function handleRoomKeydown(event) {
  const moves = {
    ArrowLeft: [-GRID_SIZE, 0],
    ArrowRight: [GRID_SIZE, 0],
    ArrowUp: [0, -GRID_SIZE],
    ArrowDown: [0, GRID_SIZE]
  };
  if (!moves[event.key]) return;

  event.preventDefault();
  const room = plan.rooms.find(item => item.id === event.currentTarget.dataset.roomId);
  if (!room) return;
  const [deltaX, deltaY] = moves[event.key];
  room.x = clamp(room.x + deltaX, 0, plan.width - room.width);
  room.y = clamp(room.y + deltaY, 0, plan.height - room.height);
  selectedRoomId = room.id;
  commitHistory();
  renderArchitecture();
  DOM.stage.querySelector(`[data-room-id="${room.id}"]`)?.focus();
}

function selectRoom(roomId, shouldRender = true) {
  selectedRoomId = roomId;
  if (shouldRender) {
    renderArchitecture();
    return;
  }
  DOM.stage.querySelectorAll('.plan-room').forEach(element => {
    element.classList.toggle('selected', element.dataset.roomId === roomId);
  });
  renderInspector();
}

function updateRoomFromInspector(shouldCommit = true) {
  const room = getSelectedRoom();
  if (!room) return;

  const width = clamp(snap(readInputNumber(DOM.roomWidth, room.width)), MIN_ROOM_SIZE, plan.width);
  const height = clamp(snap(readInputNumber(DOM.roomHeight, room.height)), MIN_ROOM_SIZE, plan.height);
  room.width = width;
  room.height = height;
  room.x = clamp(snap(readInputNumber(DOM.roomX, room.x)), 0, plan.width - width);
  room.y = clamp(snap(readInputNumber(DOM.roomY, room.y)), 0, plan.height - height);

  if (shouldCommit) {
    commitHistory();
    renderArchitecture();
    return;
  }

  savePlan();
  renderRooms();
  renderMetrics();
  DOM.selectedRoomArea.textContent = `${formatNumber(room.width * room.height)} m²`;
  DOM.roomX.max = plan.width - room.width;
  DOM.roomY.max = plan.height - room.height;
}

function updateSelectedRoom(changes, commit = true) {
  const room = getSelectedRoom();
  if (!room) return;
  Object.assign(room, changes);
  if (commit) commitHistory();
  else savePlan();
  renderRooms();
  renderMetrics();
  if (commit) renderInspector();
}

function updatePlanBounds() {
  const nextWidth = clamp(snap(Number(DOM.planWidth.value) || plan.width), 6, 30);
  const nextHeight = clamp(snap(Number(DOM.planHeight.value) || plan.height), 6, 24);
  plan.width = nextWidth;
  plan.height = nextHeight;

  plan.rooms.forEach(room => {
    room.width = Math.min(room.width, plan.width);
    room.height = Math.min(room.height, plan.height);
    room.x = clamp(room.x, 0, plan.width - room.width);
    room.y = clamp(room.y, 0, plan.height - room.height);
  });

  commitHistory();
  renderArchitecture();
}

function deleteSelectedRoom() {
  if (!selectedRoomId) return;
  plan.rooms = plan.rooms.filter(room => room.id !== selectedRoomId);
  selectedRoomId = null;
  commitHistory();
  renderArchitecture();
}

function resetPlan() {
  plan = createDefaultPlan();
  selectedRoomId = plan.rooms[0]?.id || null;
  commitHistory();
  renderArchitecture();
}

function exportPlan() {
  const exportData = {
    format: 'eosa-home-plan',
    version: 1,
    exportedAt: new Date().toISOString(),
    plan
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const fileName = (plan.title || 'home-plan').replace(/[^a-zA-Z0-9가-힣_-]+/g, '-');
  link.href = url;
  link.download = `${fileName}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function getSelectedRoom() {
  return plan.rooms.find(room => room.id === selectedRoomId) || null;
}

function getOverlappingRoomIds() {
  const ids = new Set();
  for (let i = 0; i < plan.rooms.length; i++) {
    for (let j = i + 1; j < plan.rooms.length; j++) {
      if (roomsOverlap(plan.rooms[i], plan.rooms[j])) {
        ids.add(plan.rooms[i].id);
        ids.add(plan.rooms[j].id);
      }
    }
  }
  return ids;
}

function roomsOverlap(a, b) {
  return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;
}

function commitHistory() {
  const snapshot = serializePlan();
  if (history[historyIndex] === snapshot) {
    savePlan();
    return;
  }
  history = history.slice(0, historyIndex + 1);
  history.push(snapshot);
  if (history.length > 60) history.shift();
  historyIndex = history.length - 1;
  savePlan();
  updateHistoryButtons();
}

function undo() {
  if (historyIndex <= 0) return;
  historyIndex--;
  plan = normalizePlan(JSON.parse(history[historyIndex]));
  selectedRoomId = null;
  savePlan();
  renderArchitecture();
}

function redo() {
  if (historyIndex >= history.length - 1) return;
  historyIndex++;
  plan = normalizePlan(JSON.parse(history[historyIndex]));
  selectedRoomId = null;
  savePlan();
  renderArchitecture();
}

function updateHistoryButtons() {
  DOM.undo.disabled = historyIndex <= 0;
  DOM.redo.disabled = historyIndex >= history.length - 1;
}

function savePlan() {
  window.clearTimeout(saveStatusTimer);
  DOM.saveStatus.textContent = '저장 중';
  try {
    localStorage.setItem(STORAGE_KEY, serializePlan());
    DOM.saveStatus.classList.remove('warning');
    saveStatusTimer = window.setTimeout(() => {
      DOM.saveStatus.textContent = '자동 저장됨';
    }, 350);
  } catch (error) {
    DOM.saveStatus.textContent = '저장 실패';
    DOM.saveStatus.classList.add('warning');
    console.warn('건축 스터디를 저장하지 못했습니다.', error);
  }
}

function serializePlan() {
  return JSON.stringify(plan);
}

function isArchitectureVisible() {
  return DOM.view && DOM.view.style.display !== 'none';
}

function snap(value) {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function readInputNumber(input, fallback) {
  if (input.value.trim() === '') return fallback;
  const value = Number(input.value);
  return Number.isFinite(value) ? value : fallback;
}
