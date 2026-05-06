const input = document.getElementById('file-input');
const img = document.getElementById('avatar-img');
const placeholder = document.getElementById('avatar-placeholder');

if (input && img && placeholder) {
  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      img.src = ev.target.result;
      img.style.display = 'block';
      placeholder.style.display = 'none';
    };
    reader.readAsDataURL(file);
  });
}
const archive = JSON.parse(localStorage.getItem("perfumeArchive")) || [];
const latest = archive[archive.length - 1];
const notesBox = document.querySelector(".recently-notes");

if (notesBox && latest?.notes) {
  notesBox.innerHTML = latest.notes.join(", ");
}