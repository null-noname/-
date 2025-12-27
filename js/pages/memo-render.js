import { saveDB } from '../services/db.js';
import { getCardHtml } from './memo-card-render.js';

export function renderMemoList(st, redo, openEd) {
    const c = document.getElementById('memo-list-container');
    c.innerHTML = '';
    st.freeMemos.forEach((m, i) => {
        const d = document.createElement('div');
        d.className = 'memo-card';
        d.innerHTML = getCardHtml(m, i);
        d.querySelector(`#m-up-${i}`).onclick = (e) => {
            e.stopPropagation();
            if (i > 0) { [st.freeMemos[i], st.freeMemos[i - 1]] = [st.freeMemos[i - 1], st.freeMemos[i]]; saveDB({}); redo(); }
        };
        d.querySelector(`#m-ed-${i}`).onclick = (e) => { e.stopPropagation(); openEd(m.id); };
        d.onclick = () => { m.isOpen = !m.isOpen; saveDB({}); redo(); };
        c.appendChild(d);
    });
}
