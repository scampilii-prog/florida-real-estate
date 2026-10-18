
  function toggleTino() {
    const panel = document.getElementById("tinoPanel");
    panel.classList.toggle("open");
  }

  function tinoSelect(message) {
    document.getElementById("tinoText").value = message;
    document.getElementById("tinoText").focus();
  }

 
async function sendTino(event) {
  event.preventDefault();

  const input = document.getElementById("tinoText");
  const message = input.value.trim();
  if (!message) return;

  const messages = document.getElementById("tinoMessages");

  const bubble = document.createElement("div");
  bubble.className = "tino-bubble";
  bubble.textContent = message;
  bubble.style.background = "#e8f3f0";
  messages.appendChild(bubble);

  input.value = "";

  const reply = document.createElement("div");
  reply.className = "tino-bubble";
  reply.textContent = "Tino is thinking...";
  messages.appendChild(reply);
  reply.scrollIntoView({ behavior: "smooth", block: "end" });
  const requestController = new AbortController();
  const requestTimeout = setTimeout(() => requestController.abort(), 20000);

  try {
    const response = await fetch(
      "/api/ask-tino",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: requestController.signal,
        body: JSON.stringify({ message })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    reply.textContent = data.reply || "Please try again.";
  } catch (error) {
    reply.textContent =
      "The assistant could not respond. Contact Sabatino below for personal help.";
  } finally {
    clearTimeout(requestTimeout);
  }


  reply.scrollIntoView({ behavior: "smooth", block: "end" });
}

