/* ==========================================================================
   KICKSTART - Digital Marketing Agency JavaScript
   State-of-the-Art Interactive AI Engine, Neural Canvas, 3D Tilt & ROI Simulator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. THEME MODE TOGGLE (DARK MODE & LIGHT MODE WITH LOCALSTORAGE)
     ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('kickstart-theme') || localStorage.getItem('kickstart-theme');

  if (storedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }

  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('kickstart-theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      if (theme === 'light') {
        icon.className = 'fa-solid fa-moon';
        themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
      } else {
        icon.className = 'fa-solid fa-sun';
        themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
      }
    }
  }

  /* ------------------------------------------------------------------------
     2. STICKY HEADER & NAVBAR SCROLL EFFECT
     ------------------------------------------------------------------------ */
  const header = document.querySelector('.header');
  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ------------------------------------------------------------------------
     3. MOBILE NAVIGATION MENU TOGGLE
     ------------------------------------------------------------------------ */
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileMenu = () => {
    hamburger?.classList.toggle('active');
    navMenu?.classList.toggle('active');
    document.body.style.overflow = navMenu?.classList.contains('active') ? 'hidden' : '';
  };

  hamburger?.addEventListener('click', toggleMobileMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu?.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  /* ------------------------------------------------------------------------
     4. SMOOTH SCROLLING FOR INTERNAL ANCHOR LINKS
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
     5. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-fade'
  );

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ------------------------------------------------------------------------
     6. ANIMATED NUMBERS COUNTER FOR STATS
     ------------------------------------------------------------------------ */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const targetText = stat.getAttribute('data-target') || stat.textContent;
      const numericValue = parseFloat(targetText.replace(/[^0-9.]/g, ''));
      const prefix = targetText.match(/^[^0-9]+/)?.[0] || '';
      const suffix = targetText.match(/[^0-9.]+$|\D+$/)?.[0] || '';

      let current = 0;
      const duration = 1800;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = numericValue / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          current = numericValue;
          clearInterval(timer);
        }

        const isDecimal = targetText.includes('.');
        const displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);

        stat.textContent = `${prefix}${displayValue}${suffix}`;
      }, stepTime);
    });
  };

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  }

  /* ------------------------------------------------------------------------
     7. CONTACT FORM CLIENT-SIDE VALIDATION
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  const successBanner = document.getElementById('form-success-banner');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
      });

      if (!nameInput?.value.trim()) {
        showError(nameInput, 'Full name is required');
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput?.value.trim()) {
        showError(emailInput, 'Email address is required');
        isValid = false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }

      if (!messageInput?.value.trim()) {
        showError(messageInput, 'Message cannot be empty');
        isValid = false;
      }

      if (!isValid) return;

      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
      }

      try {
        let isSuccess = false;

        // 1. Try Netlify Native Forms Submission first (Best & 100% reliable on Netlify)
        if (window.location.hostname.includes('netlify') || window.location.hostname !== 'localhost') {
          try {
            const formData = new FormData(contactForm);
            formData.set('form-name', 'contact');
            const netlifyRes = await fetch('/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams(formData).toString()
            });
            if (netlifyRes.ok) {
              isSuccess = true;
            }
          } catch (e) {
            console.warn('Netlify form submission failed, trying fallback...', e);
          }
        }

        // 2. Fallback to FormSubmit AJAX API if not on Netlify or if Netlify submit wasn't handled
        if (!isSuccess) {
          const payload = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            company: companyInput?.value.trim() || '',
            phone: phoneInput?.value.trim() || '',
            message: messageInput.value.trim(),
            _subject: 'New Contact Form Submission - Kickstart Digital',
            _captcha: 'false',
            _template: 'table'
          };

          const response = await fetch('https://formsubmit.co/ajax/kickstartdigital123@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
          });

          const data = await response.json().catch(() => ({}));
          if (response.ok && (data.success === 'true' || data.success === true || !data.message || data.message.includes('success'))) {
            isSuccess = true;
          }
        }

        if (isSuccess) {
          if (successBanner) {
            successBanner.style.display = 'flex';
            successBanner.style.borderColor = 'rgba(0, 255, 157, 0.8)';
            successBanner.style.color = 'var(--neon-green)';
            successBanner.innerHTML = '<i class="fa-solid fa-circle-check text-green"></i><span>Thank you! Your message has been sent successfully. We will get back to you within 24 hours.</span>';
            successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          contactForm.reset();
        } else {
          throw new Error('Form submission could not be completed.');
        }
      } catch (error) {
        console.error('Submission error:', error);
        if (successBanner) {
          successBanner.style.display = 'flex';
          successBanner.style.borderColor = 'rgba(239, 68, 68, 0.9)';
          successBanner.style.color = '#FCA5A5';
          successBanner.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i><span>Unable to send right now. Please email directly at kickstartdigital123@gmail.com.</span>';
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } finally {
        if (submitBtn) {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        }
      }
    });
  }

  function showError(input, message) {
    if (!input) return;
    const group = input.closest('.form-group');
    if (group) {
      group.classList.add('error');
      const errorEl = group.querySelector('.form-error');
      if (errorEl) {
        errorEl.textContent = message;
      }
    }
  }

  /* ------------------------------------------------------------------------
     8. 3D INTERACTIVE TILT & SPECULAR GLOW FOR CARDS
     ------------------------------------------------------------------------ */
  const tiltCards = document.querySelectorAll(
    '.service-card, .dashboard-card, .floating-card, .case-card, .stat-card, .testimonial-card, .ai-sim-box'
  );

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;  // max 6 deg
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ------------------------------------------------------------------------
     9. HERO DASHBOARD TABS INTERACTION
     ------------------------------------------------------------------------ */
  const dashTabs = document.querySelectorAll('.dashboard-tab');
  const dashBars = document.querySelectorAll('.chart-bar');
  
  const chartDatasets = {
    '7D': [65, 80, 50, 95, 75, 100, 90],
    '30D': [45, 65, 55, 85, 70, 95, 100],
    '1Y': [30, 48, 62, 74, 88, 92, 100]
  };

  dashTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dashTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const period = tab.textContent.trim();
      const data = chartDatasets[period] || chartDatasets['30D'];
      
      dashBars.forEach((bar, index) => {
        if (data[index] !== undefined) {
          bar.style.height = `${data[index]}%`;
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     10. INTERACTIVE AI GROWTH & ROI SIMULATOR
     ------------------------------------------------------------------------ */
  initAiSimulator();

  /* ------------------------------------------------------------------------
     11. INTERACTIVE AI STRATEGIST CHAT ASSISTANT WIDGET
     ------------------------------------------------------------------------ */
  initAiChatWidget();

});

/* ==========================================================================
   INTERACTIVE AI GROWTH SIMULATOR
   ========================================================================== */
function initAiSimulator() {
  const budgetSlider = document.getElementById('ai-budget-slider');
  const budgetDisplay = document.getElementById('ai-budget-val');
  const industryBtns = document.querySelectorAll('.ai-ind-btn');
  const simRevenue = document.getElementById('sim-revenue');
  const simRoas = document.getElementById('sim-roas');
  const simLeads = document.getElementById('sim-leads');
  const simCpa = document.getElementById('sim-cpa');
  const waveCanvas = document.getElementById('ai-sim-wave-canvas');

  if (!budgetSlider || !simRevenue) return;

  let currentIndustryMultiplier = 1.0;
  let currentBudget = parseInt(budgetSlider.value) || 5000;

  function updateSimulation() {
    currentBudget = parseInt(budgetSlider.value);
    budgetDisplay.textContent = `$${currentBudget.toLocaleString()}/mo`;

    // Multiplier formulas based on real performance marketing data
    const roasBase = 4.2 * currentIndustryMultiplier;
    const projectedRevenue = Math.round(currentBudget * roasBase);
    const costPerLead = 32 / currentIndustryMultiplier;
    const projectedLeads = Math.round(currentBudget / costPerLead);
    const cpaSavings = Math.min(48, Math.round(28 + (currentBudget / 5000) * 3));

    // Animate display values
    simRevenue.textContent = `$${projectedRevenue.toLocaleString()}`;
    simRoas.textContent = `${roasBase.toFixed(1)}x`;
    simLeads.textContent = `+${projectedLeads.toLocaleString()}`;
    simCpa.textContent = `-${cpaSavings}%`;
  }

  budgetSlider.addEventListener('input', updateSimulation);

  industryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      industryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentIndustryMultiplier = parseFloat(btn.getAttribute('data-mult') || '1.0');
      updateSimulation();
    });
  });

  // Pre-fill CTA button click
  const simCtaBtn = document.getElementById('sim-claim-btn');
  if (simCtaBtn) {
    simCtaBtn.addEventListener('click', () => {
      const activeInd = document.querySelector('.ai-ind-btn.active')?.textContent.trim() || 'General';
      const msgArea = document.getElementById('contact-message');
      if (msgArea) {
        msgArea.value = `Hi Kickstart Team, I calculated an AI growth plan for ${activeInd} with a monthly budget of $${currentBudget.toLocaleString()}. I would like to schedule a strategy roadmap session.`;
      }
    });
  }

  // Waveform canvas animation in simulator
  if (waveCanvas) {
    const ctx = waveCanvas.getContext('2d');
    let step = 0;
    
    function drawWave() {
      waveCanvas.width = waveCanvas.parentElement?.offsetWidth || 300;
      waveCanvas.height = 80;
      const W = waveCanvas.width;
      const H = waveCanvas.height;

      ctx.clearRect(0, 0, W, H);
      step += 0.04;

      const dark = document.documentElement.getAttribute('data-theme') !== 'light';
      const grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, dark ? '#00F0FF' : '#2563EB');
      grad.addColorStop(1, dark ? '#00FF9D' : '#059669');

      ctx.beginPath();
      ctx.moveTo(0, H / 2);

      for (let x = 0; x < W; x++) {
        const freq = 0.02;
        const amp = (H / 3.2) * (currentBudget / 25000 + 0.5);
        const y = H / 2 + Math.sin(x * freq + step) * amp * Math.cos(x * 0.005 + step * 0.5);
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = dark ? '#00FF9D' : 'rgba(37,99,235,0.4)';
      ctx.shadowBlur = 10;
      ctx.stroke();

      requestAnimationFrame(drawWave);
    }
    drawWave();
  }

  updateSimulation();
}

/* ==========================================================================
   INTERACTIVE FLOATING AI STRATEGIST CHAT WIDGET
   ========================================================================== */
function initAiChatWidget() {
  const widgetToggle = document.getElementById('ai-chat-toggle');
  const chatModal = document.getElementById('ai-chat-modal');
  const chatClose = document.getElementById('ai-chat-close');
  const chatBody = document.getElementById('ai-chat-messages');
  const chatInput = document.getElementById('ai-chat-input');
  const chatSend = document.getElementById('ai-chat-send');
  const promptChips = document.querySelectorAll('.ai-prompt-chip');

  if (!widgetToggle || !chatModal) return;

  const toggleChat = () => {
    chatModal.classList.toggle('open');
    if (chatModal.classList.contains('open') && chatInput) {
      chatInput.focus();
    }
  };

  widgetToggle.addEventListener('click', toggleChat);
  chatClose?.addEventListener('click', toggleChat);

  const botKnowledge = {
    leads: "Our AI Growth Engine analyzes real-time customer intent, tests 50+ ad creatives automatically, and optimizes bidding algorithms every 15 minutes to guarantee high-intent leads with 40%+ lower CPA.",
    roi: "Kickstart clients average 4.8x - 6.2x Return on Ad Spend (ROAS). For B2B/SaaS we focus on qualified pipeline velocity; for E-Commerce, we maximize profitable scale and repeat purchases.",
    audit: "Our Free Growth Audit includes: 1) Conversion Rate Optimization review, 2) Competitor Ad Intelligence breakdown, 3) High-value SEO Keyword gap analysis, and 4) A custom 90-day AI Growth Roadmap.",
    pricing: "We offer customized growth plans based on your scaling targets—ranging from managed performance campaigns to complete full-funnel digital domination. Let's schedule a free discovery call!"
  };

  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-msg ai-msg-${sender}`;
    
    if (sender === 'bot') {
      msgDiv.innerHTML = `
        <div class="ai-msg-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="ai-msg-bubble">${text}</div>
      `;
    } else {
      msgDiv.innerHTML = `
        <div class="ai-msg-bubble">${text}</div>
        <div class="ai-msg-avatar"><i class="fa-solid fa-user"></i></div>
      `;
    }

    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function handleAiQuery(queryText) {
    appendMessage('user', queryText);

    // Simulate AI thinking and streaming response
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'ai-msg ai-msg-bot ai-typing-msg';
    typingIndicator.innerHTML = `
      <div class="ai-msg-avatar"><i class="fa-solid fa-brain fa-spin"></i></div>
      <div class="ai-msg-bubble"><span class="ai-typing-dots"><span></span><span></span><span></span></span> AI Analyzing...</div>
    `;
    chatBody.appendChild(typingIndicator);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const lower = queryText.toLowerCase();
      let reply = "That's a fantastic question! Kickstart combines algorithmic audience targeting, high-velocity creative testing, and end-to-end conversion funnels to deliver measurable business growth. Would you like our team to review your website for free?";

      if (lower.includes('lead') || lower.includes('traffic') || lower.includes('generate')) {
        reply = botKnowledge.leads;
      } else if (lower.includes('roi') || lower.includes('return') || lower.includes('revenue') || lower.includes('expect')) {
        reply = botKnowledge.roi;
      } else if (lower.includes('audit') || lower.includes('free') || lower.includes('review') || lower.includes('analysis')) {
        reply = botKnowledge.audit;
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('package') || lower.includes('quote')) {
        reply = botKnowledge.pricing;
      }

      appendMessage('bot', reply);
    }, 700);
  }

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.textContent.trim();
      handleAiQuery(q);
    });
  });

  chatSend?.addEventListener('click', () => {
    const val = chatInput.value.trim();
    if (val) {
      handleAiQuery(val);
      chatInput.value = '';
    }
  });

  chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const val = chatInput.value.trim();
      if (val) {
        handleAiQuery(val);
        chatInput.value = '';
      }
    }
  });
}

/* ==========================================================================
   AI NEURAL NETWORK HERO BACKGROUND ANIMATION (INTERACTIVE CANVAS)
   ========================================================================== */
(function () {
  const canvas = document.getElementById('hero-ai-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], pulses = [], ripples = [], animId;
  let mouse = { x: -1000, y: -1000, active: false };

  const PARTICLE_COUNT = 85;
  const CONNECTION_DISTANCE = 165;
  const MOUSE_RADIUS = 190;

  const rand  = (min, max) => Math.random() * (max - min) + min;
  const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

  function resize() {
    const hero = canvas.parentElement || document.body;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = hero.offsetWidth;
    H = hero.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);
  }

  function makeParticle() {
    return {
      x:     rand(0, W),
      y:     rand(0, H),
      originX: 0,
      originY: 0,
      vx:    rand(-0.45, 0.45),
      vy:    rand(-0.45, 0.45),
      r:     rand(1.8, 3.8),
      pulse: rand(0, Math.PI * 2),
      hue:   Math.random() < 0.65 ? 'cyan' : 'green',
      glowSpeed: rand(0.015, 0.03)
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, makeParticle);
    pulses = [];
    ripples = [];
  }

  function hexAlpha(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha)).toFixed(3)})`;
  }

  // Mouse interaction tracking
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });

    heroSection.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    });

    heroSection.addEventListener('click', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      ripples.push({ x: clickX, y: clickY, r: 0, maxR: 220, alpha: 0.9 });
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    const dark = isDark();
    const neonCyan  = dark ? '#00F0FF' : '#2563EB';
    const neonGreen = dark ? '#00FF9D' : '#059669';

    /* 1. Cybernetic Grid */
    ctx.save();
    ctx.strokeStyle = dark ? 'rgba(0, 240, 255, 0.035)' : 'rgba(37, 99, 235, 0.035)';
    ctx.lineWidth = 1;
    const GRID = 64;
    for (let gx = 0; gx < W; gx += GRID) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, H);
      ctx.stroke();
    }
    for (let gy = 0; gy < H; gy += GRID) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(W, gy);
      ctx.stroke();
    }
    ctx.restore();

    /* 2. Interactive Shockwave Ripples */
    for (let r = ripples.length - 1; r >= 0; r--) {
      const rip = ripples[r];
      rip.r += 6;
      rip.alpha *= 0.94;

      ctx.save();
      ctx.beginPath();
      ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
      ctx.strokeStyle = hexAlpha(neonCyan, rip.alpha);
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();

      if (rip.r > rip.maxR || rip.alpha < 0.02) {
        ripples.splice(r, 1);
      }
    }

    /* 3. Neural Particles Update & Render */
    particles.forEach(p => {
      // Mouse gravity attraction
      if (mouse.active) {
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_RADIUS && mDist > 0) {
          const force = (1 - mDist / MOUSE_RADIUS) * 0.8;
          p.x += (mdx / mDist) * force;
          p.y += (mdy / mDist) * force;
        }
      }

      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.glowSpeed;

      // Screen wrapping
      if (p.x < -15) p.x = W + 15;
      if (p.x > W + 15) p.x = -15;
      if (p.y < -15) p.y = H + 15;
      if (p.y > H + 15) p.y = -15;

      const glow  = 0.55 + 0.45 * Math.sin(p.pulse);
      const color = p.hue === 'cyan' ? neonCyan : neonGreen;
      const alpha = dark ? glow * 0.9 : glow * 0.65;

      // Outer radial aura
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      grad.addColorStop(0, hexAlpha(color, alpha * 0.7));
      grad.addColorStop(0.5, hexAlpha(color, alpha * 0.2));
      grad.addColorStop(1, hexAlpha(color, 0));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = hexAlpha(color, alpha);
      ctx.shadowColor = color;
      ctx.shadowBlur = dark ? 8 : 4;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    /* 4. Synaptic Laser Connections & Synapse Data Packets */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DISTANCE) {
          const opacity = (1 - dist / CONNECTION_DISTANCE) * (dark ? 0.38 : 0.22);
          const cA = a.hue === 'cyan' ? neonCyan : neonGreen;
          const cB = b.hue === 'cyan' ? neonCyan : neonGreen;

          const lg = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          lg.addColorStop(0, hexAlpha(cA, opacity));
          lg.addColorStop(1, hexAlpha(cB, opacity));

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = lg;
          ctx.lineWidth = 0.9;
          ctx.stroke();

          // Occasionally spawn a moving data pulse packet
          if (Math.random() < 0.0006 && pulses.length < 12) {
            pulses.push({
              x1: a.x, y1: a.y,
              x2: b.x, y2: b.y,
              progress: 0,
              speed: rand(0.015, 0.035),
              color: a.hue === 'cyan' ? neonCyan : neonGreen
            });
          }
        }
      }

      // Connection to mouse
      if (mouse.active) {
        const mdx = mouse.x - particles[i].x;
        const mdy = mouse.y - particles[i].y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_RADIUS) {
          const mOpacity = (1 - mDist / MOUSE_RADIUS) * (dark ? 0.6 : 0.4);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = hexAlpha(neonCyan, mOpacity);
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    /* 5. Draw Pulse Packets traveling on connections */
    for (let k = pulses.length - 1; k >= 0; k--) {
      const pulse = pulses[k];
      pulse.progress += pulse.speed;
      if (pulse.progress >= 1) {
        pulses.splice(k, 1);
        continue;
      }

      const px = pulse.x1 + (pulse.x2 - pulse.x1) * pulse.progress;
      const py = pulse.y1 + (pulse.y2 - pulse.y1) * pulse.progress;

      ctx.beginPath();
      ctx.arc(px, py, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = pulse.color;
      ctx.shadowColor = pulse.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    animId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resize();
  });

  const themeObs = new MutationObserver(() => {
    cancelAnimationFrame(animId);
    draw();
  });
  themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  init();
  draw();
})();
