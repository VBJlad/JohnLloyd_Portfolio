/**
 * Portfolio — JavaScript Rendering Engine
 * Reads from data/content.js (PORTFOLIO object) and dynamically
 * builds the entire UI. All interactivity lives here.
 */

(() => {
  'use strict';

  /* ────────────────────────────────────────────────────────────
     1. THEME ENGINE
  ──────────────────────────────────────────────────────────── */
  const ThemeEngine = {
    key: 'portfolio-theme',
    init() {
      const saved = localStorage.getItem(this.key);
      const pref  = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      this.apply(saved || pref);
    },
    apply(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(this.key, theme);
      const btn = document.getElementById('theme-toggle');
      if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    },
    toggle() {
      const cur = document.documentElement.getAttribute('data-theme');
      this.apply(cur === 'dark' ? 'light' : 'dark');
    },
  };

  /* ────────────────────────────────────────────────────────────
     2. CANVAS PARTICLE BACKGROUND
  ──────────────────────────────────────────────────────────── */
  const Canvas = {
    canvas: null, ctx: null, particles: [], mouse: { x: -9999, y: -9999 },
    init() {
      this.canvas = document.getElementById('bg-canvas');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      this.createParticles();
      window.addEventListener('resize', () => this.resize());
      window.addEventListener('mousemove', e => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });
      this.animate();
    },
    resize() {
      this.canvas.width  = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },
    createParticles() {
      const count = Math.min(Math.floor(window.innerWidth / 15), 90);
      this.particles = [];
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.1,
        });
      }
    },
    animate() {
      requestAnimationFrame(() => this.animate());
      const { ctx, canvas, particles, mouse } = this;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse repel
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.x += (dx / dist) * 1.5;
          p.y += (dy / dist) * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
        ctx.fill();
      }

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    },
  };

  /* ────────────────────────────────────────────────────────────
     3. NAVBAR
  ──────────────────────────────────────────────────────────── */
  const Navbar = {
    init() {
      const nav = document.getElementById('navbar');
      if (!nav) return;

      // Scroll class
      window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 20);
      });

      // Mobile menu
      const toggle = document.getElementById('menu-toggle');
      const links  = document.querySelector('.nav-links');
      if (toggle && links) {
        toggle.addEventListener('click', () => {
          links.classList.toggle('mobile-open');
          toggle.textContent = links.classList.contains('mobile-open') ? '✕' : '☰';
        });
      }

      // Scroll-spy
      const sections = document.querySelectorAll('section[id]');
      const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(a => {
              a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
            });
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });

      sections.forEach(s => observer.observe(s));

      // Close mobile menu on link click
      navLinks.forEach(a => {
        a.addEventListener('click', () => {
          if (links) links.classList.remove('mobile-open');
          if (toggle) toggle.textContent = '☰';
        });
      });
    },
  };

  /* ────────────────────────────────────────────────────────────
     4. HERO SECTION RENDERER
  ──────────────────────────────────────────────────────────── */
  const HeroRenderer = {
    init() {
      const { meta, stats, availability } = PORTFOLIO;

      // Dynamic logo initials
      const logo = document.getElementById('nav-logo');
      if (logo && meta.name) {
        logo.textContent = meta.name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase();
      }

      // Populate text fields
      this.set('hero-name',     meta.name);
      this.set('hero-title',    meta.title);
      this.set('hero-tagline',  meta.tagline);
      this.set('hero-bio',      meta.bio);
      this.set('hero-location', meta.location);

      // Resume button
      const resumeBtn = document.getElementById('btn-resume');
      if (resumeBtn) resumeBtn.href = meta.resumeUrl;

      // Status badge
      if (availability.open) {
        const pill = document.getElementById('status-pill');
        if (pill) {
          pill.querySelector('.status-pill-text').textContent = availability.status;
          pill.style.display = 'flex';
        }
      }

      // Stats
      this.renderStats(stats);

      // Code card tabs
      this.initCodeTabs();
    },

    set(id, text) {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    },

    renderStats(stats) {
      const container = document.getElementById('hero-stats');
      if (!container) return;
      container.innerHTML = stats.map(s => `
        <div class="stat-card reveal">
          <div class="stat-value" data-target="${s.value}" data-suffix="${s.suffix}" ${s.decimals ? `data-decimals="${s.decimals}"` : ''}>0</div>
          <div class="stat-label">${s.label}</div>
        </div>
      `).join('');
    },

    initCodeTabs() {
      document.querySelectorAll('.code-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const pane = tab.dataset.pane;
          document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
          document.querySelectorAll('.code-pane').forEach(p => p.classList.remove('active'));
          tab.classList.add('active');
          const target = document.getElementById(`pane-${pane}`);
          if (target) target.classList.add('active');
        });
      });
    },
  };

  /* ────────────────────────────────────────────────────────────
     5. SKILLS RENDERER
  ──────────────────────────────────────────────────────────── */
  const SkillsRenderer = {
    init() {
      const { skillCategories } = PORTFOLIO;
      this.renderTabs(skillCategories);
      this.renderPanels(skillCategories);
      this.activateTab(skillCategories[0].id);
    },

    renderTabs(cats) {
      const container = document.getElementById('skill-tabs');
      if (!container) return;
      container.innerHTML = cats.map((c, i) => `
        <button class="skill-tab-btn ${i === 0 ? 'active' : ''}"
                data-tab="${c.id}"
                id="skill-tab-${c.id}">
          <span class="skill-icon">${c.icon}</span>
          ${c.label}
        </button>
      `).join('');
      container.querySelectorAll('.skill-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => this.activateTab(btn.dataset.tab));
      });
    },

    renderPanels(cats) {
      const container = document.getElementById('skill-panels');
      if (!container) return;
      container.innerHTML = cats.map(c => `
        <div class="skills-panel" id="panel-${c.id}">
          <div class="skill-items">
            ${c.skills.map(s => `
              <div class="skill-item">
                <div class="skill-header">
                  <span class="skill-name">${s.name}</span>
                  <span class="skill-pct">${s.level}%</span>
                </div>
                <div class="skill-bar-track">
                  <div class="skill-bar-fill" data-level="${s.level}" style="width:0%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');
    },

    activateTab(id) {
      document.querySelectorAll('.skill-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === id));
      document.querySelectorAll('.skills-panel').forEach(p => p.classList.toggle('active', p.id === `panel-${id}`));
      // Animate bars
      setTimeout(() => {
        const panel = document.getElementById(`panel-${id}`);
        if (!panel) return;
        panel.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.level + '%';
        });
      }, 50);
    },
  };

  /* ────────────────────────────────────────────────────────────
     6. PROJECTS RENDERER
  ──────────────────────────────────────────────────────────── */
  const ProjectsRenderer = {
    activeFilter: 'all',

    init() {
      const { projects } = PORTFOLIO;
      this.renderFilters(projects);
      this.renderCards(projects);
    },

    renderFilters(projects) {
      const container = document.getElementById('project-filters');
      if (!container) return;
      const cats = ['all', ...new Set(projects.map(p => p.category))];
      const labels = { all: 'All', fullstack: 'Full Stack', distributed: 'Distributed', ai: 'AI / ML', cloud: 'Cloud & DevOps' };
      container.innerHTML = cats.map(c => `
        <button class="filter-btn ${c === 'all' ? 'active' : ''}" data-filter="${c}">
          ${labels[c] || c}
        </button>
      `).join('');
      container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.activeFilter = btn.dataset.filter;
          container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.applyFilter();
        });
      });
    },

    renderCards(projects) {
      const container = document.getElementById('projects-grid');
      if (!container) return;
      container.innerHTML = projects.map((p, i) => `
        <article class="project-card reveal reveal-delay-${(i % 3) + 1}"
                 data-category="${p.category}"
                 data-id="${p.id}">
          <div class="project-card-top">
            <span class="project-category-badge cat-${p.category}">
              ${this.catLabel(p.category)}
            </span>
            <div class="project-links" onclick="event.stopPropagation()">
              ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="project-link-icon" title="GitHub">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>` : ''}
              ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="project-link-icon" title="Live Demo">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>` : ''}
            </div>
          </div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="project-tags">${p.tags.map(t => `<span class="badge">${t}</span>`).join('')}</div>
          <div class="project-metrics">
            ${Object.entries(p.metrics).map(([k, v]) => `
              <div class="metric-item">
                <span class="metric-value">${v}</span>
                <span class="metric-key">${k}</span>
              </div>
            `).join('')}
          </div>
        </article>
      `).join('');

      // Open modal on card click
      container.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
          const proj = PORTFOLIO.projects.find(p => p.id === card.dataset.id);
          if (proj) Modal.open(proj);
        });
      });
    },

    catLabel(cat) {
      return { fullstack: 'Full Stack', distributed: 'Distributed', ai: 'AI / ML', cloud: 'Cloud' }[cat] || cat;
    },

    applyFilter() {
      document.querySelectorAll('.project-card').forEach(card => {
        const show = this.activeFilter === 'all' || card.dataset.category === this.activeFilter;
        card.classList.toggle('hidden', !show);
        if (show) {
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = '';
          });
        }
      });
    },
  };

  /* ────────────────────────────────────────────────────────────
     7. TIMELINE RENDERER
  ──────────────────────────────────────────────────────────── */
  const TimelineRenderer = {
    icons: { work: '💼', education: '🎓' },
    init() {
      const container = document.getElementById('timeline');
      if (!container) return;
      container.innerHTML = PORTFOLIO.timeline.map((item, i) => `
        <div class="timeline-item reveal reveal-delay-${i + 1}">
          <div class="timeline-marker">
            <div class="timeline-dot ${item.type}">
              ${this.icons[item.type] || '●'}
            </div>
          </div>
          <div class="timeline-card">
            <div class="timeline-card-header">
              <div>
                <div class="timeline-role">${item.role}</div>
                <div class="timeline-org">${item.organization}</div>
              </div>
              <div class="timeline-meta">
                <span class="timeline-period">${item.period}</span>
                <span class="timeline-location">📍 ${item.location}</span>
              </div>
            </div>
            <ul class="timeline-achievements">
              ${item.achievements.map(a => `<li>${a}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('');
    },
  };

  /* ────────────────────────────────────────────────────────────
     8. TERMINAL EMULATOR
  ──────────────────────────────────────────────────────────── */
  const Terminal = {
    history: [],
    historyIdx: -1,

    init() {
      const input = document.getElementById('terminal-input');
      const output = document.getElementById('terminal-output');
      if (!input || !output) return;

      const { terminal, projects } = PORTFOLIO;

      // Dynamic "ls projects"
      terminal.commands['ls projects'] = projects
        .map(p => `→ ${p.id.padEnd(20)} ${p.title}`)
        .join('\n');

      // Terminal prompt label
      const promptDisplay = document.getElementById('terminal-prompt-display');
      if (promptDisplay && terminal.prompt) {
        promptDisplay.textContent = `${terminal.prompt}:~$`;
      }

      // Welcome
      output.innerHTML = `<div class="terminal-welcome">${terminal.welcomeMsg}</div>`;

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = input.value.trim();
          input.value = '';
          if (cmd) {
            this.history.unshift(cmd);
            this.historyIdx = -1;
          }
          this.run(cmd, output, terminal);
          setTimeout(() => output.closest('.terminal-body').scrollTop = 9999, 50);
        }
        if (e.key === 'ArrowUp') {
          this.historyIdx = Math.min(this.historyIdx + 1, this.history.length - 1);
          input.value = this.history[this.historyIdx] || '';
        }
        if (e.key === 'ArrowDown') {
          this.historyIdx = Math.max(this.historyIdx - 1, -1);
          input.value = this.historyIdx === -1 ? '' : this.history[this.historyIdx];
        }
      });
    },

    run(cmd, output, terminal) {
      // Echo the command
      const line = document.createElement('div');
      line.className = 'terminal-line';
      line.innerHTML = `<span class="terminal-prompt-label">${terminal.prompt}:~$</span> <span>${this.escHtml(cmd)}</span>`;
      output.appendChild(line);

      if (!cmd) return;

      let response = '';
      let cls = '';

      const lc = cmd.toLowerCase();

      if (lc === 'clear') {
        output.innerHTML = '';
        return;
      } else if (lc === 'help') {
        const cmds = ['help', 'whoami', 'skills', 'certifications', 'education', 'ls projects', 'projects', 'contact', 'location', 'status', 'coffee', 'clear', 'sudo'];
        response = `Available commands:\n${cmds.map(c => `  ${c}`).join('\n')}`;
        cls = 'success';
      } else if (terminal.commands[lc] !== undefined) {
        response = terminal.commands[lc];
        cls = 'success';
      } else {
        response = `bash: ${cmd}: command not found. Type 'help' for available commands.`;
        cls = 'error';
      }

      const resp = document.createElement('div');
      resp.className = `terminal-response ${cls}`;
      resp.textContent = response;
      output.appendChild(resp);
    },

    escHtml(str) {
      return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    },
  };

  /* ────────────────────────────────────────────────────────────
     9. CONTACT SECTION
  ──────────────────────────────────────────────────────────── */
  const ContactRenderer = {
    init() {
      const { meta, availability } = PORTFOLIO;

      // Populate contact methods
      const methodsContainer = document.getElementById('contact-methods');
      if (methodsContainer) {
        const methods = [
          { icon: '✉️', label: 'Email', value: meta.email, href: `mailto:${meta.email}` },
          ...(meta.phone ? [{ icon: '📞', label: 'Phone', value: meta.phone, href: `tel:${meta.phone.replace(/\s+/g, '')}` }] : []),
          { icon: '📍', label: 'Location', value: meta.location, href: '#contact' },
          { icon: '💼', label: 'LinkedIn', value: meta.social.linkedin ? 'linkedin.com/in/' + meta.social.linkedin.split('/in/')[1] : '', href: meta.social.linkedin },
          { icon: '🐙', label: 'GitHub', value: meta.social.github ? 'github.com/' + meta.social.github.split('github.com/')[1] : '', href: meta.social.github },
        ].filter(m => m.href && !m.href.endsWith('undefined') && !m.href.endsWith('/'));

        methodsContainer.innerHTML = methods.map(m => `
          <a href="${m.href}" target="_blank" rel="noopener" class="contact-method">
            <div class="contact-method-icon">${m.icon}</div>
            <div>
              <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:1px">${m.label}</div>
              <div style="font-weight:600">${m.value}</div>
            </div>
          </a>
        `).join('');
      }

      // Local clock
      const clockEl = document.getElementById('local-clock');
      if (clockEl && availability.timezone) {
        const updateClock = () => {
          const now = new Date();
          const timeStr = now.toLocaleTimeString('en-US', {
            timeZone: availability.timezone,
            hour: '2-digit', minute: '2-digit', second: '2-digit',
          });
          clockEl.textContent = `🕒 Local time: ${timeStr} (${availability.timezone})`;
        };
        updateClock();
        setInterval(updateClock, 1000);
      }

      // Form
      this.initForm();
    },

    initForm() {
      const form = document.getElementById('contact-form');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!this.validate(form)) return;

        const btn = form.querySelector('#submit-btn');
        btn.textContent = 'Sending…';
        btn.disabled = true;

        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.disabled = false;
          form.reset();
          Toast.show('Message sent! I\'ll get back to you shortly 🚀', 'success');
        }, 1400);
      });
    },

    validate(form) {
      let ok = true;
      form.querySelectorAll('[data-required]').forEach(input => {
        const group = input.closest('.form-group');
        const empty = !input.value.trim();
        if (group) group.classList.toggle('has-error', empty);
        if (empty) ok = false;
      });
      // Email validation
      const emailInput = form.querySelector('#input-email');
      if (emailInput && emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        const group = emailInput.closest('.form-group');
        const err   = group && group.querySelector('.form-error');
        if (group) group.classList.add('has-error');
        if (err) err.textContent = 'Please enter a valid email address.';
        ok = false;
      }
      return ok;
    },
  };

  /* ────────────────────────────────────────────────────────────
     10. FOOTER RENDERER
  ──────────────────────────────────────────────────────────── */
  const FooterRenderer = {
    init() {
      const { meta } = PORTFOLIO;
      const nameEl = document.getElementById('footer-name');
      if (nameEl) nameEl.textContent = meta.name;

      const yearEl = document.getElementById('footer-year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();

      // Social links
      const socialContainer = document.getElementById('footer-social');
      if (socialContainer) {
        const socials = [
          { key: 'github',   icon: this.githubSVG(),   label: 'GitHub' },
          { key: 'linkedin', icon: this.linkedinSVG(), label: 'LinkedIn' },
          { key: 'twitter',  icon: this.twitterSVG(),  label: 'Twitter' },
        ];
        socialContainer.innerHTML = socials
          .filter(s => meta.social[s.key])
          .map(s => `
            <a href="${meta.social[s.key]}" target="_blank" rel="noopener"
               class="footer-social-link" aria-label="${s.label}">
              ${s.icon}
            </a>
          `).join('');
      }
    },
    githubSVG: () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    linkedinSVG: () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    twitterSVG: () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.254 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  };

  /* ────────────────────────────────────────────────────────────
     11. MODAL
  ──────────────────────────────────────────────────────────── */
  const Modal = {
    overlay: null,
    init() {
      this.overlay = document.getElementById('project-modal');
      if (!this.overlay) return;
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.close();
      });
      document.getElementById('modal-close')?.addEventListener('click', () => this.close());
      document.addEventListener('keydown', e => { if (e.key === 'Escape') this.close(); });
    },

    open(project) {
      if (!this.overlay) return;
      const catLabel = { fullstack: 'Full Stack', distributed: 'Distributed Systems', ai: 'AI / ML', cloud: 'Cloud & DevOps' };
      document.getElementById('modal-title').textContent      = project.title;
      document.getElementById('modal-category').textContent   = catLabel[project.category] || project.category;
      document.getElementById('modal-category').className     = `project-category-badge cat-${project.category}`;
      document.getElementById('modal-description').textContent = project.detail || project.description;
      document.getElementById('modal-year').textContent       = project.year || '';

      const tagsEl = document.getElementById('modal-tags');
      tagsEl.innerHTML = project.tags.map(t => `<span class="badge">${t}</span>`).join('');

      const metricsEl = document.getElementById('modal-metrics');
      metricsEl.innerHTML = Object.entries(project.metrics).map(([k, v]) => `
        <div class="metric-item" style="background:var(--bg-glass);padding:.75rem 1rem;border-radius:var(--radius-md);border:1px solid var(--border-glass)">
          <span class="metric-value" style="font-size:1rem">${v}</span>
          <span class="metric-key">${k}</span>
        </div>
      `).join('');

      const linksEl = document.getElementById('modal-links');
      linksEl.innerHTML = [
        project.github ? `<a href="${project.github}" target="_blank" rel="noopener" class="btn btn-secondary" style="font-size:.85rem">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          View on GitHub
        </a>` : '',
        project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener" class="btn btn-primary" style="font-size:.85rem">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Live Demo
        </a>` : '',
      ].join('');

      this.overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    },

    close() {
      if (!this.overlay) return;
      this.overlay.classList.remove('open');
      document.body.style.overflow = '';
    },
  };

  /* ────────────────────────────────────────────────────────────
     12. TOAST
  ──────────────────────────────────────────────────────────── */
  const Toast = {
    show(message, type = 'info') {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const icons = { success: '✅', error: '❌', info: 'ℹ️' };
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.animation = 'toastOut 300ms ease forwards';
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    },
  };

  /* ────────────────────────────────────────────────────────────
     13. SCROLL REVEAL & COUNTER ANIMATIONS
  ──────────────────────────────────────────────────────────── */
  const ScrollAnimations = {
    init() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Counter animation
            if (entry.target.classList.contains('stat-value')) {
              this.animateCounter(entry.target);
            }
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.reveal, .stat-value[data-target]').forEach(el => {
        observer.observe(el);
      });
    },

    animateCounter(el) {
      const target   = parseFloat(el.dataset.target);
      const suffix   = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals || '0');
      const duration = 1500;
      const start    = performance.now();

      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = (target * eased).toFixed(decimals);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },
  };

  /* ────────────────────────────────────────────────────────────
     14. ARCHITECTURE PIPELINE RENDERER
  ──────────────────────────────────────────────────────────── */
  const ArchRenderer = {
    nodes: [
      { icon: '🌍', label: 'Browser',   sub: 'HTTP/3' },
      { icon: '🔒', label: 'Edge CDN',  sub: 'SSL / WAF' },
      { icon: '⚡', label: 'API Gateway', sub: 'Rate Limit' },
      { icon: '🖥️', label: 'Server',    sub: 'Node / Go' },
      { icon: '🗄️', label: 'Database',  sub: 'PostgreSQL' },
      { icon: '⚙️', label: 'Cache',     sub: 'Redis' },
    ],
    init() {
      const container = document.getElementById('arch-pipeline');
      if (!container) return;
      container.innerHTML = this.nodes.map((n, i) => `
        ${i > 0 ? '<span class="arch-arrow">→</span>' : ''}
        <div class="arch-node reveal reveal-delay-${i + 1}">
          <span class="arch-node-icon">${n.icon}</span>
          <span class="arch-node-label">${n.label}</span>
          <span class="arch-node-sub">${n.sub}</span>
        </div>
      `).join('');
    },
  };

  /* ────────────────────────────────────────────────────────────
     15. BOOTSTRAP — Wire everything together
  ──────────────────────────────────────────────────────────── */
  function boot() {
    // Theme first (prevents flash of wrong theme)
    ThemeEngine.init();
    document.getElementById('theme-toggle')?.addEventListener('click', () => ThemeEngine.toggle());

    // Canvas
    Canvas.init();

    // Navbar
    Navbar.init();

    // Section renderers
    HeroRenderer.init();
    SkillsRenderer.init();
    ProjectsRenderer.init();
    TimelineRenderer.init();
    ArchRenderer.init();
    ContactRenderer.init();
    FooterRenderer.init();

    // Modal
    Modal.init();

    // Terminal
    Terminal.init();

    // Scroll animations (must come after renderers so .reveal elements exist)
    ScrollAnimations.init();

    // Mobile nav — close on outside click
    document.addEventListener('click', (e) => {
      const links = document.querySelector('.nav-links.mobile-open');
      const toggle = document.getElementById('menu-toggle');
      if (links && !links.contains(e.target) && e.target !== toggle) {
        links.classList.remove('mobile-open');
        if (toggle) toggle.textContent = '☰';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
