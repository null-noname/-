import { saveDB } from '../services/db.js';

export function setupToggle(yd, k, id, redo) {
    const btn = document.getElementById(`btn-annual-${id}`);
    btn.onclick = () => {
        yd[`isAnnual${k}Open`] = !yd[`isAnnual${k}Open`];
        saveDB({}); redo();
    };
}

export function setupAdd(yd, id, k, redo) {
    document.getElementById(`btn-add-${id}`).onclick = () => {
        yd[k].push({ date: "", text: "", cost: 0 });
        saveDB({}); redo();
    };
}
