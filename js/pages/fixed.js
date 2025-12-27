import { state } from '../services/db.js';
import { renderFixed } from './fixed-render.js';
import { setupToggle, setupAdd } from './fixed-actions.js';

export function init() {
    render();
    const yd = state.years[state.currentYear];
    setupToggle(yd, 'Year', 'year', render);
    setupToggle(yd, 'Month', 'month', render);
    setupAdd(yd, 'year', 'annualYear', render);
    setupAdd(yd, 'month', 'annualMonth', render);
}

function render() { renderFixed(state, render); }
