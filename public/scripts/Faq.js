document.addEventListener("DOMContentLoaded", async () => {
  const accordion = document.querySelector(".faq-content");

  if (!accordion) return;

  let faqs = [];

  try {
    const res = await fetch("/api/faq");
    faqs = await res.json();

    if (!res.ok) throw new Error("Failed to fetch FAQs");
    console.log(faqs);
    renderFaqs();
  } catch (err) {
    console.error(err);
  }

  function renderFaqs() {
    // Clear existing hardcoded items
    // accordion.innerHTML = "";

    const faq_tabs = document.createElement("div");
    const faq_content = document.createElement("div");
    faq_tabs.className = "faq-tabs";
    faq_content.className = "faq-accordion";
    faqs.forEach((faq, index) => {
      const faq_quest_assw = document.createElement("div");
      faq_quest_assw.className = "faq-item";
      faq_quest_assw.setAttribute("data-category", faq.category);
      const faq_ansere = document.createElement("div");
      const faq_question = document.createElement("button");
      faq_question.className = "faq-question";
      faq_ansere.className = "faq-answer";
      console.log(faq.category, index);
      faq_tabs.insertAdjacentHTML(
        "beforeend",
        `<button class="faq-tab ${index == 0 ? "active" : ""}" data-category="${faq.category}">${faq.category}</button>`,
      );
      faq_question.insertAdjacentHTML(
        "beforeend",
        `
        <span class="faq-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000" d="M6 12h8.25L11 8.75l.67-.75l4.5 4.5l-4.5 4.5l-.67-.75L14.25 13H6zm15 .5a9.5 9.5 0 0 1-9.5 9.5C6.26 22 2 17.75 2 12.5A9.5 9.5 0 0 1 11.5 3a9.5 9.5 0 0 1 9.5 9.5m-1 0A8.5 8.5 0 0 0 11.5 4A8.5 8.5 0 0 0 3 12.5a8.5 8.5 0 0 0 8.5 8.5a8.5 8.5 0 0 0 8.5-8.5"/></svg></span>
        <span class="faq-text">${faq.question} ?
        </span> 
        <span class="faq-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m5.84 9.59l5.66 5.66l5.66-5.66l-.71-.7l-4.95 4.95l-4.95-4.95z"/></svg></span>`,
      );

      faq_ansere.insertAdjacentHTML("beforeend", `<p> ${faq.answere}</p>`);
      faq_quest_assw.appendChild(faq_question);
      faq_quest_assw.appendChild(faq_ansere);
      faq_content.appendChild(faq_quest_assw);
    });
    accordion.appendChild(faq_tabs);
    accordion.appendChild(faq_content);
    bindTabs();
    bindAccordion();
  }

  function bindAccordion() {
    document.querySelectorAll(".faq-question").forEach((button) => {
      button.addEventListener("click", () => {
        const item = button.parentElement;

        document.querySelectorAll(".faq-item.active").forEach((openItem) => {
          if (openItem !== item) openItem.classList.remove("active");
        });

        item.classList.toggle("active");
      });
    });
  }

  function bindTabs() {
    document.querySelectorAll(".faq-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const category = tab.dataset.category;
        document
          .querySelectorAll(".faq-tab")
          .forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        document.querySelectorAll(".faq-item").forEach((item) => {
          if (item.dataset.category === category) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }
});
