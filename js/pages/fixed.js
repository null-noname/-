import { state, saveDB } from '../services/db.js';

// --- Utils ---
const formatNum = (n) => Number(n).toLocaleString();
const parseNum = (v) => {
    let n = parseInt(String(v).replace(/[^0-9\-]/g, '')) || 0;
    return Math.min(Math.max(n, -999999), 999999);
};
const autoHeight = (el) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
};

// --- Main Init ---
export function init() {
    render();
    const yd = state.years[state.currentYear];

    // Section Toggles (Yearly / Monthly Fixed Costs)
    const setupToggle = (k, id) => {
        const btn = document.getElementById(`btn-annual-${id}`);
        btn.onclick = () => {
            yd[`isAnnual${k}Open`] = !yd[`isAnnual${k}Open`];
            saveDB({}); render();
        };
    };
    setupToggle('Year', 'year');
    setupToggle('Month', 'month');

    // Add Row Buttons
    const setupAdd = (id, key) => {
        const btn = document.getElementById(`btn-add-${id}`);
        btn.onclick = () => {
            yd[key].push({ date: "", text: "", cost: 0 });
            saveDB({}); render();
        };
    };
    setupAdd('year', 'annualYear');
    setupAdd('month', 'annualMonth');
}

// --- Render Logic ---
function render() {
    const yd = state.years[state.currentYear];

    // Update Section Visibility and Icon (+ / -)
    const setSec = (id, open) => {
        const btn = document.getElementById(`btn-annual-${id}`);
        const content = document.getElementById(`content-annual-${id}`);
        if (btn) btn.innerText = open ? '－' : '＋';
        if (content) content.className = open ? '' : 'hidden';
    };
    setSec('year', yd.isAnnualYearOpen);
    setSec('month', yd.isAnnualMonthOpen);

    // Draw Tables
    const draw = (id, list) => {
        const container = document.getElementById(id);
        if (!container) return;
        container.innerHTML = '';

        const table = document.createElement('table');
        table.innerHTML = `<thead><tr>
            <th class="col-date">日</th>
            <th class="col-text">内容</th>
            <th class="col-money">金額</th>
            <th class="col-btns"></th>
        </tr></thead>`;

        const tbody = document.createElement('tbody');
        (list || []).forEach((it, idx) => {
            const tr = document.createElement('tr');
            const val = it.cost ?? (it.price || 0);

            tr.innerHTML = `
                <td class="col-date"><input class="date-input" value="${it.date || ''}" type="tel"></td>
                <td class="col-text"><textarea class="kakeibo-text">${it.text || ''}</textarea></td>
                <td class="col-money"><input class="money-input" value="${formatNum(val)}" type="tel"></td>
                <td class="col-btns"><button class="mini-btn">▲</button><button class="mini-btn btn-del">×</button></td>`;

            const ins = tr.querySelectorAll('input, textarea');
            // Date input (simplified: just store value)
            ins[0].onblur = (e) => { it.date = e.target.value; saveDB({}); render(); };

            // Text area auto-height
            ins[1].oninput = (e) => autoHeight(e.target);
            ins[1].onblur = (e) => { it.text = e.target.value; saveDB({}); };

            // Money input
            ins[2].onfocus = (e) => e.target.value = it.cost ?? 0;
            ins[2].onblur = (e) => {
                it.cost = parseNum(e.target.value);
                delete it.price;
                saveDB({}); render();
            };

            // Action buttons
            const bts = tr.querySelectorAll('button');
            bts[0].onclick = () => {
                if (idx > 0) {
                    [list[idx], list[idx - 1]] = [list[idx - 1], list[idx]];
                    saveDB({}); render();
                }
            };
            bts[1].onclick = () => {
                if (confirm("削除?")) {
                    list.splice(idx, 1);
                    saveDB({}); render();
                }
            };

            setTimeout(() => autoHeight(ins[1]), 0);
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        container.appendChild(table);
    };

    draw('annual-table-year', yd.annualYear);
    draw('annual-table-month', yd.annualMonth);
}
