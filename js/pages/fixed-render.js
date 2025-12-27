import { getRowHtml, getTableHead } from './fixed-table-html.js';
import { attachEvents } from './fixed-row-events.js';

export function renderFixed(st, redo) {
    const yd = st.years[st.currentYear];
    const setSec = (id, open) => {
        document.getElementById(`btn-annual-${id}`).innerText = open ? '－' : '＋';
        document.getElementById(`content-annual-${id}`).className = open ? '' : 'hidden';
    };
    setSec('year', yd.isAnnualYearOpen); setSec('month', yd.isAnnualMonthOpen);
    const draw = (id, list) => {
        const c = document.getElementById(id); c.innerHTML = '';
        const t = document.createElement('table');
        t.innerHTML = getTableHead();
        const tb = document.createElement('tbody');
        (list || []).forEach((it, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = getRowHtml(it, idx);
            attachEvents(tr, it, list, idx, redo);
            tb.appendChild(tr);
        });
        t.appendChild(tb); c.appendChild(t);
    };
    draw('annual-table-year', yd.annualYear); draw('annual-table-month', yd.annualMonth);
}
