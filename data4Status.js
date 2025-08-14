var data4Status = `SNo,Name,Topic1,Topic2,Status/Remarks
1,Aarya Shree Neupane,e-Identity (Estonia),Metaverse Governance,✓
2,Anju Kumari Mahato,e-Residency (Estonia),Green Hydrogen Technology,✓
3,Anu Yaduwanshi,Smart-ID (Estonia),Brain-Computer Interfaces,✓ (only topic1 presented)
4,Archana Karki,X-Road (Estonia),Autonomous Delivery Systems,✓
5,Chetana Bhandari,e-Land Register (Estonia),Synthetic Biology,✓
6,Dikshya Bhattarai,Population Registry (Estonia),Space-Based Solar Power,✓(Best Presentator)
7,Divya Shree Acharya,E-waste Recycling (China),Swarm Robotics,✓
8,Ganga Acharya,KSI Blockchain (Estonia),Carbon Capture and Storage,✓
9,Gazal Bhattarai,e-Justice (Estonia),Augmented Reality in Healthcare,✓
10,Jamuna Acharya,e-Police (Estonia),Decentralized Finance (DeFi),✓
11,Jeeya Shakya,i-Voting (Estonia),Biometric Authentication Systems,✓(Logical Answer Writer)
12,Mausami Shahi,Government Cloud (Estonia),Urban Vertical Farming,✓
13,Pratikshya Bastola,Intelligent Transportation Systems (Estonia),Neuromorphic Computing,✓(Best Role Player)
14,Rima Khadka,Data Embassy (Estonia),Smart Grid Modernization,✗
15,Sakshi Kumari Jha,Artificial Intelligence and Regulatory Sandbox (Singapore),Gene Editing (CRISPR),✓
16,Supnima KC,Dubai 10x Innovations (UAE),Patient Innovation Platform of Portugal,✓
17,Sweta Ray,Global Development Lab (USA),Hyperloop Transportation,✓
18,Yunika Guragain,Seoul 50+ Policy (South Korea),Ocean Energy Harvesting,✓(Unique Answer Writer)

`;


// Dataset metadata
var data4StatusInfo = {
    name: "Assignments",
    description: "Assignments Topics & Status ",
    emoji: "📝",
    columns: 6,
    primaryKey: "SNo",
    rowColors: {
               "14": "red"
    }
};

// Generalized row coloring script for STATUS table: user can set primaryKey (any column) and rowColors for its values
document.addEventListener('DOMContentLoaded', function () {
    var info = window.data4StatusInfo || {};
    var primaryKey = (info.primaryKey || '').toLowerCase();
    var rowColors = info.rowColors || {};
    var customColorFn = typeof info.getRowColor === 'function' ? info.getRowColor : null;
    if (!primaryKey || !rowColors) return;

    // Find all tables with STATUS info (by caption or aria-label)
    var tables = Array.from(document.querySelectorAll('table'));
    tables.forEach(function (table) {
        var isStatusTable = false;
        // Check caption or aria-label for STATUS
        var caption = table.querySelector('caption');
        if (caption && /status/i.test(caption.textContent)) isStatusTable = true;
        if (table.getAttribute('aria-label') && /status/i.test(table.getAttribute('aria-label'))) isStatusTable = true;
        // Heuristic: check headers for the primaryKey
        var ths = Array.from(table.querySelectorAll('th'));
        if (ths.some(th => th.textContent.trim().toLowerCase() === primaryKey)) isStatusTable = true;
        if (!isStatusTable) return;

        // Find the index of the primaryKey column
        var headerCells = Array.from(table.querySelectorAll('thead th'));
        var keyIdx = headerCells.findIndex(th => th.textContent.trim().toLowerCase() === primaryKey);
        if (keyIdx === -1) return;

        // Color each row based on the primaryKey value only
        Array.from(table.querySelectorAll('tbody tr')).forEach(function (row) {
            var cells = row.children;
            if (cells.length <= keyIdx) return;
            var cellValueRaw = cells[keyIdx].textContent.trim();
            var cellValueLower = cellValueRaw.toLowerCase();
            var color = '';
            if (customColorFn) {
                color = customColorFn(cellValueRaw, row, table);
            } else {
                color = rowColors[cellValueRaw] || rowColors[cellValueLower] || '';
            }
            // Named colors
            if (color === 'red') row.style.backgroundColor = '#ffd6d6';
            else if (color === 'blue') row.style.backgroundColor = '#d6e6ff';
            else if (color === 'green') row.style.backgroundColor = '#d6ffd6';
            // Allow any valid CSS color
            else if (color && color !== 'default') row.style.backgroundColor = color;
            else row.style.backgroundColor = '';
        });
    });
});