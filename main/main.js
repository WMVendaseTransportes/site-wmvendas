class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    }
  
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }
  
    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
      // Fechar menu responsivo ao clicar no link
      this.navLinks.forEach((link) =>
        link.addEventListener("click", this.handleClick),
      );
    }
  
    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }
  
  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    "#navbar-itens",
    "#navbar-itens li",
  );
  mobileNavbar.init();

  
  /*Scroll Interativo*/
  $("#navbar a, #rodape a").on("click", function (event) {
    if (this.hash !== "") {
        event.preventDefault();

        const hash = this.hash;

        $("html, body").animate(
            {
                scrollTop: $(hash).offset().top - 100
            },
            800
        );
    }
});

/*Banner rotativo*/
document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelectorAll(".carousel-slide");
  const dotsContainer = document.querySelector(".carousel-dots");
  let currentSlide = 0;
  let autoSlideInterval; // Variável para armazenar o intervalo de slide automático
  const slideInterval = 4000;

  const updateDots = () => {
    const dots = document.querySelectorAll(".carousel-dot");
    dots.forEach((dot, index) => {
      dot.classList.remove("active");
      if (index === currentSlide) {
        dot.classList.add("active");
      }
    });
  };

  const nextSlide = () => {
    slides[currentSlide].style.display = "none";
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.display = "block";
    updateDots();
    startAutoSlide(); // Reinicia o intervalo após a navegação manual
  };

  const prevSlide = () => {
    slides[currentSlide].style.display = "none";
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].style.display = "block";
    updateDots();
    startAutoSlide(); // Reinicia o intervalo após a navegação manual
  };

  const startAutoSlide = () => {
    clearInterval(autoSlideInterval); // Limpa o intervalo atual
    autoSlideInterval = setInterval(nextSlide, slideInterval); // Inicia um novo intervalo
  };

  startAutoSlide(); // Inicia o intervalo de slide automático ao carregar a página

  document.querySelector(".prev-btn").addEventListener("click", () => {
    clearInterval(autoSlideInterval);
    prevSlide();
  });

  document.querySelector(".next-btn").addEventListener("click", () => {
    clearInterval(autoSlideInterval);
    nextSlide();
  });

  // Adicionar os pontos de indicação (dots)
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("carousel-dot");
    if (index === 0) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      clearInterval(autoSlideInterval);
      slides[currentSlide].style.display = "none";
      currentSlide = index;
      slides[currentSlide].style.display = "block";
      updateDots();
      startAutoSlide(); // Reinicia o intervalo após a navegação manual
    });
    dotsContainer.appendChild(dot);
  });
});
