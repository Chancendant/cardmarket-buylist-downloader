chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "export_csv") {
        // Target the specific desktop table format found in the HTML you provided
        const nameElements = document.querySelectorAll('.table tbody td.name a');
        
        // Use a Set to automatically prevent duplicates (in case mobile and desktop lists both render in the DOM)
        const cardNames = new Set();

        nameElements.forEach(element => {
            let cardName = element.textContent.trim();
            if (cardName) {
                // Wrap the name in quotes to ensure any commas in card names don't break the CSV format
                cardName = `"${cardName.replace(/"/g, '""')}"`;
                cardNames.add(cardName);
            }
        });

        if (cardNames.size === 0) {
            alert("No cards found. Make sure you are viewing the actual Wants list.");
            return;
        }

        // Convert the Set back to an array and generate the CSV content
        const csvContent = "data:text/csv;charset=utf-8,Card Name\n" + Array.from(cardNames).join("\n");

        // Trigger the download natively in the browser
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "My_Cardmarket_Wants.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});