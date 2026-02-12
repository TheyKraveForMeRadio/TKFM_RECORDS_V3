const KEY_APPS = 'tkfm_records_applications';

const tableBody = document.querySelector('#appsTable tbody');
const selectAllCheckbox = document.getElementById('selectAll');
const bulkStatusSelect = document.getElementById('bulkStatus');
const bulkApplyBtn = document.getElementById('bulkApply');

function loadApps() {
  try {
    const raw = localStorage.getItem(KEY_APPS);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr;
  } catch (e) {
    console.error('Error parsing applications', e);
    return [];
  }
}

function saveApps(list) {
  try {
    localStorage.setItem(KEY_APPS, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving applications', e);
  }
}

function renderApps() {
  const apps = loadApps();
  tableBody.innerHTML = '';

  apps.forEach(app => {
    const tr = document.createElement('tr');
    tr.dataset.id = app.id;

    tr.innerHTML = `
      <td><input type="checkbox" class="rowCheckbox"></td>
      <td>${app.code}</td>
      <td>${app.role}</td>
      <td>${app.stageName}</td>
      <td>${app.email}</td>
      <td>${app.projectType || '-'}</td>
      <td>${app.status}</td>
    `;

    // Row click toggles selection
    tr.addEventListener('click', e => {
      if (e.target.type !== 'checkbox') {
        const cb = tr.querySelector('.rowCheckbox');
        cb.checked = !cb.checked;
        tr.classList.toggle('selected', cb.checked);
      }
    });

    // Checkbox only toggles row class
    tr.querySelector('.rowCheckbox').addEventListener('change', e => {
      tr.classList.toggle('selected', e.target.checked);
    });

    tableBody.appendChild(tr);
  });
}

// Bulk select all
if (selectAllCheckbox) {
  selectAllCheckbox.addEventListener('change', e => {
    const checked = e.target.checked;
    document.querySelectorAll('#appsTable tbody .rowCheckbox').forEach(cb => {
      cb.checked = checked;
      cb.closest('tr').classList.toggle('selected', checked);
    });
  });
}

// Bulk status update
if (bulkApplyBtn) {
  bulkApplyBtn.addEventListener('click', () => {
    const status = bulkStatusSelect.value;
    if (!status) return;

    const apps = loadApps();
    const selectedIds = Array.from(document.querySelectorAll('#appsTable tbody .rowCheckbox:checked'))
      .map(cb => cb.closest('tr').dataset.id);

    apps.forEach(app => {
      if (selectedIds.includes(app.id)) {
        app.status = status;
        app.statusHistory.push({ at: Date.now(), status, note: 'Updated via God View bulk action.' });
      }
    });

    saveApps(apps);
    renderApps();
  });
}

// Initial render
renderApps();
