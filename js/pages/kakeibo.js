import { state, saveDB } from '../services/db.js';
import { renderKakeibo } from './kakeibo-render.js';
import * as Actions from './kakeibo-actions.js';

const getEl = id => document.getElementById(id);

export function init() {
    render();
    getEl('year-select').onchange = (e) => { state.currentYear = e.target.value; render(); };
    getEl('btn-year-del').onclick = () => {
        if (Object.keys(state.years).length > 1 && confirm("削除?")) {
            delete state.years[state.currentYear];
            state.currentYear = Object.keys(state.years)[0];
            saveDB({}); render();
        }
    };
    getEl('btn-year-add').onclick = () => Actions.addYear() && render();
    getEl('btn-add-cat1').onclick = () => { Actions.addBlock('standard'); render(); };
    getEl('btn-add-cat2').onclick = () => { Actions.addBlock('detail'); render(); };
}

function render() { renderKakeibo(state, render); }
