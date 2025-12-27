import { state, saveDB } from '../services/db.js';

let editId = null;

// --- Main Init ---
export function init() {
    render();

    // UI Elements
    const getEl = id => document.getElementById(id);
    const listArea = getEl('memo-list-view');
    const editorArea = getEl('memo-editor');

    // Header Actions
    getEl('btn-memo-add').onclick = () => {
        const id = Date.now().toString();
        state.freeMemos.unshift({ id, title: "", body: "", isOpen: true });
        saveDB({});
        openEditor(id);
    };

    // Editor Actions
    getEl('btn-memo-back').onclick = () => {
        editorArea.classList.add('hidden');
        listArea.classList.remove('hidden');
        render();
    };

    getEl('btn-memo-del').onclick = () => {
        if (editId && confirm("このメモを削除しますか？")) {
            state.freeMemos = state.freeMemos.filter(m => m.id !== editId);
            saveDB({});
            editorArea.classList.add('hidden');
            listArea.classList.remove('hidden');
            render();
        }
    };

    // Auto Save logic
    const save = () => {
        const m = state.freeMemos.find(m => m.id === editId);
        if (m) {
            m.title = getEl('memo-edit-title').value;
            m.body = getEl('memo-edit-body').value;
            saveDB({});
        }
    };
    getEl('memo-edit-title').onblur = save;
    getEl('memo-edit-body').onblur = save;
}

// --- Editor Logic ---
function openEditor(id) {
    editId = id;
    const m = state.freeMemos.find(m => m.id === id);
    if (!m) return;

    document.getElementById('memo-edit-title').value = m.title || "";
    document.getElementById('memo-edit-body').value = m.body || "";

    document.getElementById('memo-list-view').classList.add('hidden');
    document.getElementById('memo-editor').classList.remove('hidden');
}

// --- Render Logic ---
function render() {
    const container = document.getElementById('memo-list-container');
    if (!container) return;
    container.innerHTML = '';

    if (!state.freeMemos) state.freeMemos = [];

    state.freeMemos.forEach((m, i) => {
        const card = document.createElement('div');
        card.className = 'memo-card';

        card.innerHTML = `
            <div class="memo-card-header">
                <span class="memo-card-title">${m.title || "（無題のメモ）"}</span>
                <div class="memo-card-actions">
                    <button class="mini-btn btn-up">▲</button>
                    <button class="mini-btn btn-edit">編集</button>
                </div>
            </div>
            <div class="memo-card-body ${m.isOpen ? '' : 'hidden'}" style="white-space: pre-wrap;">${m.body || "（内容なし）"}</div>
        `;

        // Click to toggle view mode (閲覧モードの開閉)
        card.onclick = () => {
            m.isOpen = !m.isOpen;
            saveDB({});
            render();
        };

        // Actions inside card
        const upBtn = card.querySelector('.btn-up');
        upBtn.onclick = (e) => {
            e.stopPropagation();
            if (i > 0) {
                [state.freeMemos[i], state.freeMemos[i - 1]] = [state.freeMemos[i - 1], state.freeMemos[i]];
                saveDB({});
                render();
            }
        };

        const editBtn = card.querySelector('.btn-edit');
        editBtn.onclick = (e) => {
            e.stopPropagation();
            openEditor(m.id);
        };

        container.appendChild(card);
    });
}
