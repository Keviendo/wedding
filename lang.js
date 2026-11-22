// English / Spanish switch. English is written in index.html; Spanish lives here,
// keyed by each element's data-i18n name. The choice is remembered per visitor,
// and ?lang=es in the link opens the site in Spanish.
(() => {
  const ES = {
    title: "Kevin y Rosie",
    skip: "Ir a los detalles",
    invited: "Están invitados a celebrar la boda de",
    month: "Diciembre",
    weekday: "Martes",
    leadIn: "La ceremonia se llevará a cabo en",
    time: "A la 1 de la tarde",
    strict: "Las puertas se cierran a la 1 pm · por favor llegue antes de las 12:45",
    rsvpBy: "Confirme antes del 7 de diciembre",

    tCeremony: "La Ceremonia",
    when: "Cuándo",
    whenText: "Martes, 22 de diciembre de 2026<br>A la 1 de la tarde",
    runs: "La ceremonia es de 1:00 a 1:30 pm.",
    where: "Dónde",
    directions: "Cómo llegar",
    onTime: "Por favor llegue a tiempo",
    notice1: "Nuestra ceremonia es estrictamente de <strong>1:00 a 1:30 pm</strong>. La capilla abre sus puertas a la 1:00 pm, no antes, y permanecen cerradas una vez que comienza la ceremonia. <strong>Los invitados que lleguen después de la 1:00 pm no podrán entrar.</strong>",
    notice2: "Por favor planee llegar a más tardar a las <strong>12:45 pm</strong> y esperar afuera de la capilla.",

    tSchedule: "Programa del Día",
    s1: "Llegada de los invitados · nos reunimos afuera",
    s2: "Se abren las puertas · comienza la ceremonia",
    s3: "Termina la ceremonia · fotos afuera",

    tFaq: "Preguntas",
    q1: "¿Cómo debo vestirme?",
    a1: "Formal o semiformal. Vestidos, esmóquines, camisas de vestir y camisas con botones son perfectamente adecuados.",
    q2: "¿Qué pasa si llego tarde?",
    a2: "Lamentablemente, no podremos dejarle entrar. La capilla abre sus puertas a la 1:00 pm y permanecen cerradas hasta que termina la ceremonia a la 1:30 pm. Por favor planee llegar a más tardar a las 12:45 pm. Con gusto puede acompañarnos después para las fotos afuera de la capilla.",
    q3: "¿La ceremonia es en interior o al aire libre?",
    a3: "En interior, dentro de la capilla. Después tomaremos fotos afuera, y las tardes de diciembre en Riverside pueden ser frescas, así que le recomendamos traer una chaqueta ligera.",
    q4: "¿Por qué es importante confirmar su asistencia?",
    a4: "La capilla tiene capacidad para 40 invitados, y ese número incluye a niños y fotógrafos. Su respuesta nos ayuda a reservar un lugar para cada persona.",
    q5: "¿Podemos lanzar pétalos o arroz?",
    a5: "Adentro no. La capilla no permite lanzar ni dejar caer nada en el pasillo.",
    q6: "¿Puedo tomar fotos o video?",
    a6: "Las fotos son bienvenidas durante la ceremonia. Les pedimos amablemente que no graben video, ya que deseamos que nuestros votos sean un momento privado. La capilla permite fotos adentro solo durante el horario de nuestra ceremonia; afuera, en cualquier momento. Es posible que otras parejas también estén tomando fotos, así que por favor denles espacio.",
    q7: "¿Hay baños?",
    a7: "Hay un baño dentro de la capilla. Está disponible solo durante el horario de nuestra ceremonia.",
    q8: "¿Puedo llevar a un acompañante?",
    a8: "No podemos incluir acompañantes adicionales. La capilla tiene capacidad para solo 40 invitados, por lo que la invitación es únicamente para las personas nombradas en ella.",

    tRsvp: "Confirmación",
    cardHead: "Le agradeceremos su respuesta<br>antes del siete de diciembre",
    fName: "Su nombre",
    fEmail: "Correo electrónico",
    willAttend: "¿Asistirá?",
    accept: "Con mucho gusto asistiré",
    decline: "Lamentablemente no podré asistir",
    fCount: "Número de personas que asistirán, incluyéndose usted",
    fNames: "Nombres de todas las personas que asistirán",
    fNote: "Una nota para los novios <em>(opcional)</em>",
    send: "Enviar respuesta",
    footDate: "22 de diciembre de 2026",

    // attributes
    and: "y",
    dateFull: "Martes, 22 de diciembre de 2026",
    photoAlt: "La capilla 14th Street Chapel en Riverside: el pasillo central entre bancas de madera adornadas con moños blancos, bajo vigas de madera y un candelabro.",
  };

  // Messages the RSVP form shows while sending (read by rsvp.js).
  const MESSAGES = {
    en: {
      sending: "Sending…",
      send: "Send reply",
      thanksYes: "Thank you. We can't wait to celebrate with you.",
      thanksNo: "Thank you for letting us know. You'll be missed.",
      failed: "Your reply didn't send. Check your connection and try again.",
      failedBecause: "Your reply didn't send: ",
    },
    es: {
      sending: "Enviando…",
      send: "Enviar respuesta",
      thanksYes: "Gracias. Esperamos con mucha ilusión celebrar con usted.",
      thanksNo: "Gracias por avisarnos. Le extrañaremos.",
      failed: "Su respuesta no se envió. Revise su conexión e intente de nuevo.",
      failedBecause: "Su respuesta no se envió: ",
    },
  };

  const textNodes = [...document.querySelectorAll("[data-i18n]")];
  const attrNodes = [...document.querySelectorAll("[data-i18n-attr]")];
  const EN = {};
  textNodes.forEach((el) => { EN[el.dataset.i18n] = el.innerHTML; });
  attrNodes.forEach((el) => {
    const [attr, key] = el.dataset.i18nAttr.split(":");
    EN[key] = el.getAttribute(attr);
  });

  const toggle = document.querySelector(".lang-toggle");
  let current = "en";

  const apply = (lang) => {
    current = lang;
    const dict = lang === "es" ? ES : EN;
    textNodes.forEach((el) => { el.innerHTML = dict[el.dataset.i18n] ?? EN[el.dataset.i18n]; });
    attrNodes.forEach((el) => {
      const [attr, key] = el.dataset.i18nAttr.split(":");
      el.setAttribute(attr, dict[key] ?? EN[key]);
    });
    document.documentElement.lang = lang;
    // The button always offers the *other* language, named in that language.
    toggle.textContent = lang === "es" ? "English" : "Español";
    toggle.lang = lang === "es" ? "en" : "es";
    toggle.setAttribute("aria-label", lang === "es" ? "View in English" : "Ver en español");
    try { localStorage.setItem("lang", lang); } catch {}
  };

  window.siteText = (key) => MESSAGES[current][key];

  toggle.addEventListener("click", () => apply(current === "es" ? "en" : "es"));

  const fromLink = new URLSearchParams(location.search).get("lang");
  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch {}
  const start = fromLink === "es" || fromLink === "en" ? fromLink : saved;
  if (start === "es") apply("es");
})();
