const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // Path to your catalog JSON file (V3 version)
    const catalogPath = path.join(__dirname, '../../data/mixtapeCatalog.json');

    // Read catalog data
    let catalog = [];
    if (fs.existsSync(catalogPath)) {
      const raw = fs.readFileSync(catalogPath, 'utf-8');
      catalog = JSON.parse(raw);
    }

    // Return catalog
    return {
      statusCode: 200,
      body: JSON.stringify(catalog),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (err) {
    console.error('Error reading catalog:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to load catalog' }),
    };
  }
};
