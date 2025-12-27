export function toggleEditor(show) {
    const list = document.getElementById('memo-list-view');
    const editor = document.getElementById('memo-editor');
    if (show) {
        list.classList.add('hidden');
        editor.classList.remove('hidden');
    } else {
        editor.classList.add('hidden');
        list.classList.remove('hidden');
    }
}

export function setEditorValues(title, body) {
    document.getElementById('memo-edit-title').value = title;
    document.getElementById('memo-edit-body').value = body;
}
