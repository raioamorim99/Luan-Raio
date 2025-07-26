// ===== CONFIGURAÇÕES GLOBAIS =====
const CONFIG = {
  typingSpeed: 100,
  typingDelay: 1000,
  animationDuration: 600,
  scrollOffset: 100,
}

// ===== ELEMENTOS DOM =====
const elements = {
  loader: document.querySelector(".loader"),
  hamburger: document.querySelector(".hamburger"),
  navMenu: document.querySelector(".nav-menu"),
  navLinks: document.querySelectorAll(".nav-link"),
  themeToggle: document.querySelector(".theme-toggle"),
  cursor: document.querySelector(".cursor"),
  cursorFollower: document.querySelector(".cursor-follower"),
  typingText: document.querySelector(".typing-text"),
  contactForm: document.querySelector(".contact-form"),
  skillBars: document.querySelectorAll(".progress-bar"),
  statNumbers: document.querySelectorAll(".stat-number"),
  timelineItems: document.querySelectorAll(".timeline-item"),
}

// ===== LOADER =====
class Loader {
  constructor() {
    this.init()
  }

  init() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        elements.loader.classList.add("hidden")
        document.body.style.overflow = "visible"
        this.initAnimations()
      }, 2000)
    })
  }

  initAnimations() {
    // Iniciar animações após o loader
    new TypingEffect()
    new ScrollAnimations()
    new SkillBars()
    new CounterAnimation()
  }
}

// ===== CURSOR PERSONALIZADO =====
class CustomCursor {
  constructor() {
    this.init()
  }

  init() {
    if (!elements.cursor || !elements.cursorFollower) return

    document.addEventListener("mousemove", (e) => {
      elements.cursor.style.left = e.clientX + "px"
      elements.cursor.style.top = e.clientY + "px"

      setTimeout(() => {
        elements.cursorFollower.style.left = e.clientX + "px"
        elements.cursorFollower.style.top = e.clientY + "px"
      }, 100)
    })

    // Efeitos hover
    const hoverElements = document.querySelectorAll("a, button, .btn, .skill-card, .social-link")
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        elements.cursor.style.transform = "scale(1.5)"
        elements.cursorFollower.style.transform = "scale(1.5)"
      })

      el.addEventListener("mouseleave", () => {
        elements.cursor.style.transform = "scale(1)"
        elements.cursorFollower.style.transform = "scale(1)"
      })
    })
  }
}

// ===== NAVEGAÇÃO MOBILE =====
class MobileNavigation {
  constructor() {
    this.init()
  }

  init() {
    if (!elements.hamburger || !elements.navMenu) return

    elements.hamburger.addEventListener("click", () => {
      elements.hamburger.classList.toggle("active")
      elements.navMenu.classList.toggle("active")
    })

    // Fechar menu ao clicar em link
    elements.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        elements.hamburger.classList.remove("active")
        elements.navMenu.classList.remove("active")
      })
    })

    // Fechar menu ao clicar fora
    document.addEventListener("click", (e) => {
      if (!elements.hamburger.contains(e.target) && !elements.navMenu.contains(e.target)) {
        elements.hamburger.classList.remove("active")
        elements.navMenu.classList.remove("active")
      }
    })
  }
}

// ===== TEMA ESCURO/CLARO =====
class ThemeToggle {
  constructor() {
    this.currentTheme = localStorage.getItem("theme") || "light"
    this.init()
  }

  init() {
    if (!elements.themeToggle) return

    this.setTheme(this.currentTheme)

    elements.themeToggle.addEventListener("click", () => {
      this.currentTheme = this.currentTheme === "light" ? "dark" : "light"
      this.setTheme(this.currentTheme)
    })
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)

    const icon = elements.themeToggle.querySelector("i")
    if (icon) {
      icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun"
    }
  }
}

// ===== EFEITO DE DIGITAÇÃO =====
class TypingEffect {
  constructor() {
    this.texts = [
      "Desenvolvedor Web",
      "Estudante de Eng. Software",
      "Apaixonado por Tecnologia",
      "Criador de Soluções Digitais",
    ]
    this.currentTextIndex = 0
    this.currentCharIndex = 0
    this.isDeleting = false
    this.init()
  }

  init() {
    if (!elements.typingText) return
    this.type()
  }

  type() {
    const currentText = this.texts[this.currentTextIndex]

    if (this.isDeleting) {
      elements.typingText.textContent = currentText.substring(0, this.currentCharIndex - 1)
      this.currentCharIndex--
    } else {
      elements.typingText.textContent = currentText.substring(0, this.currentCharIndex + 1)
      this.currentCharIndex++
    }

    let typeSpeed = this.isDeleting ? 50 : CONFIG.typingSpeed

    if (!this.isDeleting && this.currentCharIndex === currentText.length) {
      typeSpeed = CONFIG.typingDelay
      this.isDeleting = true
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false
      this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length
      typeSpeed = 500
    }

    setTimeout(() => this.type(), typeSpeed)
  }
}

// ===== ANIMAÇÕES DE SCROLL =====
class ScrollAnimations {
  constructor() {
    this.init()
  }

  init() {
    this.observeElements()
    this.handleNavbarScroll()
    this.handleActiveNavigation()
  }

  observeElements() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll(".skill-card, .stat-card, .highlight-item, .timeline-item")
    animatedElements.forEach((el) => {
      el.classList.add("fade-in")
      observer.observe(el)
    })
  }

  handleNavbarScroll() {
    const header = document.querySelector(".header")
    if (!header) return

    window.addEventListener("scroll", () => {
      if (window.scrollY > CONFIG.scrollOffset) {
        header.style.background = "rgba(255, 255, 255, 0.98)"
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
      } else {
        header.style.background = "rgba(255, 255, 255, 0.95)"
        header.style.boxShadow = "none"
      }
    })
  }

  handleActiveNavigation() {
    const sections = document.querySelectorAll("section[id]")

    window.addEventListener("scroll", () => {
      let current = ""

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })

      elements.navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  }
}

// ===== BARRAS DE HABILIDADE =====
class SkillBars {
  constructor() {
    this.init()
  }

  init() {
    if (!elements.skillBars.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target
            const width = bar.getAttribute("data-width")
            setTimeout(() => {
              bar.style.width = width
            }, 500)
          }
        })
      },
      { threshold: 0.5 },
    )

    elements.skillBars.forEach((bar) => observer.observe(bar))
  }
}

// ===== ANIMAÇÃO DE CONTADOR =====
class CounterAnimation {
  constructor() {
    this.init()
  }

  init() {
    if (!elements.statNumbers.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    elements.statNumbers.forEach((stat) => observer.observe(stat))
  }

  animateCounter(element) {
    const target = Number.parseInt(element.getAttribute("data-target"))
    const increment = target / 50
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        element.textContent = target
        clearInterval(timer)
      } else {
        element.textContent = Math.ceil(current)
      }
    }, 50)
  }
}

// ===== FORMULÁRIO DE CONTATO =====
class ContactForm {
  constructor() {
    this.init()
  }

  init() {
    if (!elements.contactForm) return

    elements.contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleSubmit()
    })

    // Animação dos labels
    const inputs = elements.contactForm.querySelectorAll("input, textarea")
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused")
      })

      input.addEventListener("blur", () => {
        if (!input.value) {
          input.parentElement.classList.remove("focused")
        }
      })
    })
  }

  async handleSubmit() {
    const formData = new FormData(elements.contactForm)
    const data = Object.fromEntries(formData)

    // Validação
    if (!this.validateForm(data)) return

    const submitBtn = elements.contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    // Estado de carregamento
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'
    submitBtn.disabled = true

    try {
      // Simular envio (substitua pela sua lógica de envio)
      await this.simulateSubmit(data)

      this.showNotification("Mensagem enviada com sucesso!", "success")
      elements.contactForm.reset()
    } catch (error) {
      this.showNotification("Erro ao enviar mensagem. Tente novamente.", "error")
    } finally {
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }
  }

  validateForm(data) {
    const { name, email, subject, message } = data

    if (!name || !email || !subject || !message) {
      this.showNotification("Por favor, preencha todos os campos!", "error")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      this.showNotification("Por favor, insira um email válido!", "error")
      return false
    }

    return true
  }

  simulateSubmit(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Dados do formulário:", data)
        resolve()
      }, 2000)
    })
  }

  showNotification(message, type) {
    // Criar notificação
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
      <span>${message}</span>
    `

    // Adicionar estilos
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "#10b981" : "#ef4444"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `

    document.body.appendChild(notification)

    // Remover após 5 segundos
    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 5000)
  }
}

// ===== NAVEGAÇÃO SUAVE =====
class SmoothScroll {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }
}

// ===== TIMELINE ANIMATION =====
class TimelineAnimation {
  constructor() {
    this.init()
  }

  init() {
    if (!elements.timelineItems.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      { threshold: 0.3 },
    )

    elements.timelineItems.forEach((item) => observer.observe(item))
  }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar todas as classes
  new Loader()
  new CustomCursor()
  new MobileNavigation()
  new ThemeToggle()
  new ContactForm()
  new SmoothScroll()
  new TimelineAnimation()
})

// ===== ESTILOS DINÂMICOS =====
const dynamicStyles = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  .nav-link.active {
    color: var(--primary-color) !important;
    position: relative;
  }
  
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--primary-color);
  }
  
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .timeline-item.animate {
    opacity: 1;
    transform: translateY(0);
  }
`

// Adicionar estilos dinâmicos
const styleSheet = document.createElement("style")
styleSheet.textContent = dynamicStyles
document.head.appendChild(styleSheet)

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy loading para imagens
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Debounce para eventos de scroll
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Aplicar debounce aos eventos de scroll
const debouncedScrollHandler = debounce(() => {
  // Handlers de scroll aqui
}, 16) // ~60fps

window.addEventListener("scroll", debouncedScrollHandler)
