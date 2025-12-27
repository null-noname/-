export function getRowHtml(it, idx) {
    return `<td><input class="date-input" value="${it.date || ''}"></td>
        <td><textarea class="kakeibo-text">${it.text || ''}</textarea></td>
        <td><input class="money-input" value="${(it.cost || 0).toLocaleString()}" type="tel"></td>
        <td><button class="mini-btn btn-up">↑</button></td>
        <td><button class="mini-btn btn-del">×</button></td>`;
}

export function getTableHead() {
    return `<thead><tr><th class="col-date">日付</th><th>内容</th><th class="col-money">金額</th><th class="col-btn"></th><th class="col-btn"></th></tr></thead>`;
}
