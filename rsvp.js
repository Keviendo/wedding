// RSVP form: hides the attendance fields for guests who decline, and sends
// the reply to Formspree in the background so guests stay on the page.
(() => {
  const form = document.getElementById("rsvp-form");
  const attendingFields = form.querySelector(".if-attending");
  const status = form.querySelector(".status");
  const button = form.querySelector("button[type=submit]");

  form.addEventListener("change", (e) => {
    if (e.target.name !== "attending") return;
    attendingFields.hidden = e.target.value !== "Joyfully accepts";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const declining = form.attending.value === "Regretfully declines";
    const data = new FormData(form);
    if (declining) ["guests", "guest_names", "dietary"].forEach((k) => data.delete(k));

    button.disabled = true;
    button.textContent = "Sending…";
    status.className = "status";
    status.textContent = "";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(res.status);
      form.classList.add("sent");
      status.textContent = declining
        ? "Thank you for letting us know. You'll be missed."
        : "Thank you. We can't wait to celebrate with you.";
    } catch {
      status.className = "status error";
      status.textContent = "Your reply didn't send. Check your connection and try again.";
      button.disabled = false;
      button.textContent = "Send reply";
    }
  });
})();
