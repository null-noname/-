import { state, saveDB } from '../services/db.js';

export function addYear() {
    const n = prompt("西暦を入力");
    if (n && !state.years[n]) {
        state.years[n] = { months: {} };
        state.currentYear = n;
        saveDB({});
        return true;
    }
    return false;
}

export function addBlock(type) {
    const yd = state.years[state.currentYear];
    const m = yd.activeMonth || 1;
    yd.months[m] = yd.months[m] || [];
    const title = type === 'standard' ? 'リスト1' : 'リスト2';
    yd.months[m].push({ type, title, isOpen: true, items: [] });
    saveDB({});
}
