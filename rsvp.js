// RSVP form: hides the attendance fields for guests who decline, and sends
// the reply to Formspree in the background so guests stay on the page.
(() => {
  const form = document.getElementById("rsvp-form");
  const attendingFields = form.querySelector(".if-attending");
  const status = form.querySelector(".status");
  const button = form.querySelector("button[type=submit]");
  // Visitor-facing messages come from lang.js so they follow the English/Spanish switch.
  const t = (key) => window.siteText(key);

  form.addEventListener("change", (e) => {
    if (e.target.name !== "attending") return;
    attendingFields.hidden = e.target.value !== "Joyfully accepts";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const declining = form.attending.value === "Regretfully declines";
    const data = new FormData(form);
    if (declining) ["guests", "guest_names"].forEach((k) => data.delete(k));
    // Subject line of the notification email Formspree sends to us.
    const count = declining ? "" : ` (${data.get("guests")})`;
    const reception = `reception ${data.get("reception_party") || 0} + ${data.get("reception_additional") || 0} extra`;
    data.set("_subject", `RSVP: ${data.get("name")} ${declining ? "declines" : "accepts"}${count} · ${reception}`);

    button.disabled = true;
    button.textContent = t("sending");
    status.className = "status";
    status.textContent = "";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        // Formspree explains rejections (e.g. an invalid email) as {errors: [{message}]}.
        const body = await res.json().catch(() => ({}));
        throw new Error((body.errors || []).map((err) => err.message).join(" "));
      }
      form.classList.add("sent");
      status.textContent = declining ? t("thanksNo") : t("thanksYes");
    } catch (err) {
      status.className = "status error";
      status.textContent = err.message ? t("failedBecause") + err.message : t("failed");
      button.disabled = false;
      button.textContent = t("send");
    }
  });
})();
