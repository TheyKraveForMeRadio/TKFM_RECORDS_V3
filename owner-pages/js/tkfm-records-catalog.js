(() => {
  const tableBody = document.getElementById('tableBody');
  const searchInput = document.getElementById('searchInput');
  const tierFilter = document.getElementById('tierFilter');
  const statusFilter = document.getElementById('statusFilter');
  const sourceFilter = document.getElementById('sourceFilter');
  const autopilotFilter = document.getElementById('autopilotFilter');
  const refreshBtn = document.getElementById('refreshBtn');
  const emptyState = document.getElementById('emptyState');
  const resultCount = document.getElementById('resultCount');

  const statTotal = document.getElementById('statTotal');
  const statAutopilotEnabled = document.getElementById('statAutopilotEnabled');
  const statFeatured = document.getElementById('statFeatured');
  const statRotationReady = document.getElementById('statRotationReady');

  let catalogData = [];

  async function fetchCatalog() {
    try {
      const res = await fetch('/.netlify/functions/api/get-mixtape-catalog');
      if (!res.ok) throw new Error('Failed to fetch catalog');
      const data = await res.json();
      catalogData = data;
      renderCatalog();
    } catch (err) {
      console.error(err);
      tableBody.innerHTML = '<tr><td colspan="6" class="text-center text-purple-500 py-4">Error loading catalog</td></tr>';
    }
  }

  function renderCatalog() {
    const search = searchInput.value.toLowerCase();
    const tier = tierFilter.value;
    const status = statusFilter.value;
    const source = sourceFilter.value;
    const autopilot = autopilotFilter.value;

    const filtered = catalogData.filter(item => {
      const matchesSearch = [item.artist, item.project, item.email, item.notes]
        .some(str => str?.toLowerCase().includes(search));
      const matchesTier = tier === 'all' || item.tier === tier;
      const matchesStatus = status === 'all' || item.status === status;
      const matchesSource = source === 'all' || item.source === source;
      const matchesAutopilot = autopilot === 'all' || (autopilot === 'enabled' && item.autopilot) || (autopilot === 'disabled' && !item.autopilot);
      return matchesSearch && matchesTier && matchesStatus && matchesSource && matchesAutopilot;
    });

    tableBody.innerHTML = filtered.length
      ? filtered.map(item => `
        <tr class="hover:bg-purple-900/20">
          <td class="px-3 py-2 font-semibold text-purple-100">${item.artist} — ${item.project}</td>
          <td class="px-3 py-2 text-purple-300 hidden md:table-cell">${item.tier} / ${item.status}</td>
          <td class="px-3 py-2 text-purple-300 hidden md:table-cell">${item.source}</td>
          <td class="px-3 py-2 text-purple-200">${item.autopilot ? 'Yes' : 'No'} / ${item.featured ? 'Yes' : 'No'}</td>
          <td class="px-3 py-2 text-purple-300 hidden md:table-cell">${new Date(item.createdAt).toLocaleDateString()}</td>
          <td class="px-3 py-2 text-purple-200 flex gap-2">
            <button class="px-2 py-1 bg-purple-700 rounded hover:bg-purple-600 text-xs" onclick="alert('Edit ${item.project}')">Edit</button>
            <button class="px-2 py-1 bg-amber-700 rounded hover:bg-amber-600 text-xs" onclick="alert('View ${item.project}')">View</button>
          </td>
        </tr>
      `).join('')
      : '';

    emptyState.style.display = filtered.length ? 'none' : 'block';
    resultCount.textContent = `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`;

    // Stats
    statTotal.textContent = catalogData.length;
    statAutopilotEnabled.textContent = catalogData.filter(d => d.autopilot).length;
    statFeatured.textContent = catalogData.filter(d => d.featured).length;
    statRotationReady.textContent = catalogData.filter(d => ['approved','in-contract','completed'].includes(d.status)).length;
  }

  searchInput.addEventListener('input', renderCatalog);
  tierFilter.addEventListener('change', renderCatalog);
  statusFilter.addEventListener('change', renderCatalog);
  sourceFilter.addEventListener('change', renderCatalog);
  autopilotFilter.addEventListener('change', renderCatalog);
  refreshBtn.addEventListener('click', fetchCatalog);

  // Initial fetch
  fetchCatalog();
})();
