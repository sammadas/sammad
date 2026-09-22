```javascript
document.addEventListener("DOMContentLoaded", () => {

  // Page Loader
  const loader = document.querySelector(".loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loader) {
        loader.classList.add("hide");
      }
    }, 450);
  });


  // Mobile Menu
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");

      menuBtn.textContent =
        navMenu.classList.contains("open") ? "✕" : "☰";
    });

    document.querySelectorAll("#navMenu a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuBtn.textContent = "☰";
      });
    });
  }


  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  // Active Navigation
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("#navMenu a");

  function updateNavigation() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  }

  window.addEventListener("scroll", updateNavigation);
  updateNavigation();


  // Back To Top Button
  const topBtn = document.getElementById("topBtn");

  if (topBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        topBtn.classList.add("show");
      } else {
        topBtn.classList.remove("show");
      }
    });

    topBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  // Current Year
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // Skill Progress Animation
  const skillSection = document.querySelector(".skills-grid");
  const skillBars = document.querySelectorAll(".skill-line span");

  const skillWidths = ["86%", "82%", "90%"];

  skillBars.forEach((bar) => {
    bar.style.width = "0";
  });

  if (skillSection && skillBars.length > 0) {

    const skillObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            skillBars.forEach((bar, index) => {

              setTimeout(() => {
                bar.style.width =
                  skillWidths[index] || "85%";
              }, index * 180);

            });

            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.3
      }
    );

    skillObserver.observe(skillSection);
  }


  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });

});
```
