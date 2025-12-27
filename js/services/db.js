const db = firebase.database();
let dbRef = null;
export let state = { years: {}, freeMemos: [] };

export const initDB = (path, onData) => {
    dbRef = db.ref(path);
    dbRef.on('value', (s) => {
        const val = s.val();
        if (val) state = val;
        else {
            const local = localStorage.getItem('kakeibo_backup');
            if (local) state = JSON.parse(local);
        }
        if (!state.years) state.years = { "2025": { months: {} } };
        onData(state);
    });
};

export const saveDB = (newState) => {
    if (!dbRef) return;
    state = { ...state, ...newState };
    dbRef.set(state);
    localStorage.setItem('kakeibo_backup', JSON.stringify(state));
};
