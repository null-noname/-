import { renderRow } from './kakeibo-row.js';
import { renderFooter } from './kakeibo-footer.js';

export function renderItems(parent, b, bi, m, redo, type) {
    const t = document.createElement('table');
    const h = b.type === 'standard' ?
        `<tr><th class="col-date">日</th><th class="col-text">内容</th><th class="col-money">予定</th><th class="col-money">確定</th><th class="col-btns"></th></tr>` :
        `<tr><th class="col-date">日</th><th class="col-text">重賞名</th><th class="col-money">入金</th><th class="col-money">払戻</th><th class="col-btns"></th></tr>`;
    t.innerHTML = `<thead>${h}</thead>`;
    const tb = document.createElement('tbody');
    (b.items || []).forEach((it, ii) => {
        tb.appendChild(renderRow(it, bi, ii, m, redo, b.type));
    });
    t.appendChild(tb);
    parent.appendChild(t);
    renderFooter(tb, b, bi, m, redo);
}
