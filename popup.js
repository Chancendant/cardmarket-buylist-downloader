document.getElementById('exportBtn').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (tab.url.includes("cardmarket.com") && tab.url.includes("/Wants")) {
    chrome.tabs.sendMessage(tab.id, { action: "export_csv" });
  } else {
    alert("Please navigate to a Cardmarket Wants list page first.");
  }
});