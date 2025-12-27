import { state, saveDB } from '../services/db.js';

export function addMemo() {
    const id = Date.now().toString();
    state.freeMemos.push({ id, title: "新規メモ", body: "", isOpen: true });
    saveDB({});
    return id;
}

export function deleteMemo(id) {
    if (confirm("削除?")) {
        state.freeMemos = state.freeMemos.filter(m => m.id !== id);
        saveDB({});
        return true;
    }
    return false;
}

export function updateMemo(id, title, body) {
    const m = state.freeMemos.find(m => m.id === id);
    if (m) {
        m.title = title;
        m.body = body;
        saveDB({});
    }
}
