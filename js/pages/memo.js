import { state } from '../services/db.js';
import { renderMemoList } from './memo-render.js';
import * as Store from './memo-store.js';
import * as UI from './memo-view-toggle.js';

let editId = null;
const getEl = id => document.getElementById(id);

export function init() {
    render();
    getEl('btn-memo-add').onclick = () => openEditor(Store.addMemo());
    getEl('btn-memo-back').onclick = () => { UI.toggleEditor(false); render(); };
    getEl('btn-memo-del').onclick = () => Store.deleteMemo(editId) && UI.toggleEditor(false) || render();
    const save = () => Store.updateMemo(editId, getEl('memo-edit-title').value, getEl('memo-edit-body').value);
    getEl('memo-edit-title').onblur = save;
    getEl('memo-edit-body').onblur = save;
}

export function openEditor(id) {
    editId = id;
    const m = state.freeMemos.find(m => m.id === id);
    UI.setEditorValues(m.title, m.body);
    UI.toggleEditor(true);
}

function render() { renderMemoList(state, render, openEditor); }
