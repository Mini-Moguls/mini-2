/*
 * Mini Moguls Market Day (Clinic Template Edition) — assets/js/main.js
 * Vanilla JS powering:
 *  - Accessible mobile navigation drawer + ESC / outside click close
 *  - Sticky header elevation + back-to-top button + scroll reveal (.is-in)
 *  - Live "Registration Open / Organiser Enquiry Hours" status pill (Africa/Harare)
 *  - Interactive audience & age-group filter on participants.html ([data-filter-grid], [data-specialty])
 *  - Live showcase idea & partner opportunity search on parents.html + checklist toast ([data-demo-download])
 *  - 5-step interactive "Register a Mogul" wizard on register.html ([data-booking])
 *  - Validated contact / partnership / newsletter forms ([data-validate])
 */
(() => {
  'use strict';

  const TIMEZONE = 'Africa/Harare';

  // Organiser enquiry hours in 24h minutes from midnight (0 = Sunday ... 6 = Saturday)
  const HOURS = {
    0: null,                        // Sun: Closed (Enquiries resume Mon 8:00 AM)
    1: { open: 8 * 60, close: 17 * 60, label: '8:00 am – 5:00 pm' },
    2: { open: 8 * 60, close: 17 * 60, label: '8:00 am – 5:00 pm' },
    3: { open: 8 * 60, close: 17 * 60, label: '8:00 am – 5:00 pm' },
    4: { open: 8 * 60, close: 17 * 60, label: '8:00 am – 5:00 pm' },
    5: { open: 8 * 60, close: 17 * 60, label: '8:00 am – 5:00 pm' },
    6: { open: 10 * 60, close: 16 * 60, label: '10:00 am – 4:00 pm (Event Day Hours)' }
  };

  // Age-group & participation tracks (rendered in Step 2 of register.html)
  const CLINICIANS = [
    {
      id: 'any',
      name: 'Organising Team Guidance',
      role: 'Not sure yet? We will help place your child or group in the right category',
      avatar: 'assets/img/dr-okoye.svg',
      days: [1, 2, 3, 4, 5, 6]
    },
    {
      id: 'dr-okoye',
      name: 'Junior Moguls (Ages 5–8*)',
      role: 'Concept Note Age Group · Early Creators (*Promotional poster states 6–18)',
      avatar: 'assets/img/dr-okoye.svg',
      days: [1, 2, 3, 4, 5, 6]
    },
    {
      id: 'dr-hartmann',
      name: 'Young Moguls (Ages 9–13)',
      role: 'Hands-On Makers, Bakers, Designers & Sellers',
      avatar: 'assets/img/dr-hartmann.svg',
      days: [1, 2, 3, 4, 5, 6]
    },
    {
      id: 'dr-raman',
      name: 'Senior Moguls (Ages 14–18)',
      role: 'Teen Founders, Brand Builders & Tech Innovators',
      avatar: 'assets/img/dr-raman.svg',
      days: [1, 2, 3, 4, 5, 6]
    },
    {
      id: 'dr-alvarez',
      name: 'Solo Young Creator Stall',
      role: 'Individual participant showcasing their own handmade products',
      avatar: 'assets/img/dr-alvarez.svg',
      days: [1, 2, 3, 4, 5, 6]
    },
    {
      id: 'dr-kim',
      name: 'Team, Sibling or School Group Stall',
      role: '2–4 young creators collaborating on one shared market table',
      avatar: 'assets/img/dr-kim.svg',
      days: [1, 2, 3, 4, 5, 6]
    },
    {
      id: 'sofia-marchetti',
      name: 'Sponsor, Partner or School Coordinator',
      role: 'Partnership discussions, mentorship & school group enquiries',
      avatar: 'assets/img/sofia-marchetti.svg',
      days: [1, 2, 3, 4, 5, 6]
    }
  ];

  // Showcase categories & registration options (rendered in Step 1 of register.html)
  const SERVICES = [
    {
      id: 'crafts',
      name: 'Arts, Crafts & Design Showcase',
      duration: 'Sat, 12 Dec 2026 (10:00 AM–4:00 PM)',
      price: 'Participant fee TBA',
      desc: 'Handmade art, beadwork, custom stationery, greeting cards, pottery & creative crafts.',
      clinicians: ['any', 'dr-okoye', 'dr-hartmann', 'dr-raman', 'dr-alvarez', 'dr-kim']
    },
    {
      id: 'baking',
      name: 'Baking, Food & Treats Showcase',
      duration: 'Sat, 12 Dec 2026 (10:00 AM–4:00 PM)',
      price: 'Participant fee TBA',
      desc: 'Cupcakes, cookies, sweet treats, snack jars & homemade lemonade or refreshments.',
      clinicians: ['any', 'dr-okoye', 'dr-hartmann', 'dr-raman', 'dr-alvarez', 'dr-kim']
    },
    {
      id: 'tech',
      name: 'Tech, Coding & Digital Innovation',
      duration: 'Sat, 12 Dec 2026 (10:00 AM–4:00 PM)',
      price: 'Participant fee TBA',
      desc: 'Simple games, robotics demos, STEM invention kits, 3D crafts & digital design.',
      clinicians: ['any', 'dr-hartmann', 'dr-raman', 'dr-alvarez', 'dr-kim']
    },
    {
      id: 'fashion',
      name: 'Fashion, Apparel & Accessories',
      duration: 'Sat, 12 Dec 2026 (10:00 AM–4:00 PM)',
      price: 'Participant fee TBA',
      desc: 'Hand-printed tote bags, scrunchies, hair accessories, bracelets & custom apparel.',
      clinicians: ['any', 'dr-okoye', 'dr-hartmann', 'dr-raman', 'dr-alvarez', 'dr-kim']
    },
    {
      id: 'games',
      name: 'Games, Activities & Interactive Fun',
      duration: 'Sat, 12 Dec 2026 (10:00 AM–4:00 PM)',
      price: 'Participant fee TBA',
      desc: 'Tabletop games, puzzles, skill challenges, face painting & interactive stall activities.',
      clinicians: ['any', 'dr-okoye', 'dr-hartmann', 'dr-raman', 'dr-alvarez', 'dr-kim']
    },
    {
      id: 'eco',
      name: 'Green & Sustainable Eco Ideas',
      duration: 'Sat, 12 Dec 2026 (10:00 AM–4:00 PM)',
      price: 'Participant fee TBA',
      desc: 'Potted succulents, recycled crafts, reusable goods & youth environmental projects.',
      clinicians: ['any', 'dr-okoye', 'dr-hartmann', 'dr-raman', 'dr-alvarez', 'dr-kim']
    },
    {
      id: 'general',
      name: 'General Young Mogul Registration (Idea in Progress)',
      duration: 'Sat, 12 Dec 2026 (10:00 AM–4:00 PM)',
      price: 'Participant fee TBA',
      desc: 'Still deciding what to make and sell? Register your interest now and refine the product later.',
      clinicians: ['any', 'dr-okoye', 'dr-hartmann', 'dr-raman', 'dr-alvarez', 'dr-kim']
    },
    {
      id: 'partner',
      name: 'Sponsorship, Partnership or School Group Enquiry',
      duration: 'Organiser Consultation',
      price: 'For Discussion',
      desc: 'Explore supporting Mini Moguls Market Day as a business partner, mentor or school.',
      clinicians: ['any', 'sofia-marchetti']
    }
  ];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function getHarareNow() {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: TIMEZONE,
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      }).formatToParts(new Date());
      const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
      const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return {
        day: dayMap[map.weekday] ?? new Date().getDay(),
        minutes: (parseInt(map.hour, 10) % 24) * 60 + parseInt(map.minute, 10)
      };
    } catch (_) {
      const d = new Date();
      return { day: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function formatMinutes(mins) {
    const h24 = Math.floor(mins / 60);
    const m = mins % 60;
    const period = h24 >= 12 ? 'pm' : 'am';
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    return m === 0 ? `${h12}:00 ${period}` : `${h12}:${String(m).padStart(2, '0')} ${period}`;
  }

  function makeRef(prefix = 'MM') {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let out = '';
    for (let i = 0; i < 4; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return `${prefix}-${out}`;
  }

  function showToast(msg) {
    const toast = $('[data-toast]');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('is-visible'), 4800);
  }

  /* ------------------------------------------------------------------
   * 1. Mobile navigation + sticky header + back-to-top + dynamic year
   * ------------------------------------------------------------------ */
  function initChrome() {
    $$('[data-year]').forEach(el => {
      el.textContent = '2026';
    });

    const header = $('.site-header');
    const toggle = $('[data-menu-toggle]');
    const menu = $('#mobile-menu');
    const iconOpen = $('[data-icon-open]');
    const iconClose = $('[data-icon-close]');

    function setMenu(open) {
      if (!toggle || !menu) return;
      toggle.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
      if (iconOpen) iconOpen.hidden = open;
      if (iconClose) iconClose.hidden = !open;
    }

    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        setMenu(!isOpen);
      });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') setMenu(false);
      });
    }

    // Create floating back-to-top button if not already present
    let btt = $('.back-to-top');
    if (!btt) {
      btt = document.createElement('button');
      btt.type = 'button';
      btt.className = 'back-to-top';
      btt.setAttribute('aria-label', 'Back to top');
      btt.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>';
      document.body.appendChild(btt);
      btt.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    function onScroll() {
      const y = window.scrollY || 0;
      if (header) header.classList.toggle('is-scrolled', y > 12);
      if (btt) btt.classList.toggle('is-visible', y > 480);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------
   * 2. Scroll reveal (.reveal -> .is-in)
   * ------------------------------------------------------------------ */
  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    items.forEach(el => io.observe(el));
  }

  /* ------------------------------------------------------------------
   * 3. Live Harare organiser enquiry status & hours table highlight
   * ------------------------------------------------------------------ */
  function initHoursAndStatus() {
    const { day, minutes } = getHarareNow();
    const todayHours = HOURS[day];
    const isOpen = Boolean(todayHours && minutes >= todayHours.open && minutes < todayHours.close);

    let statusText = '';
    if (isOpen) {
      statusText = `Enquiry Line Open · Until ${formatMinutes(todayHours.close)} CAT`;
    } else if (todayHours && minutes < todayHours.open) {
      statusText = `2026 Registration Open · Calls from ${formatMinutes(todayHours.open)} CAT`;
    } else {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      for (let offset = 1; offset <= 7; offset++) {
        const nextDay = (day + offset) % 7;
        if (HOURS[nextDay]) {
          const label = offset === 1 ? 'tomorrow' : dayNames[nextDay];
          statusText = `2026 Registration Open · Calls ${label} ${formatMinutes(HOURS[nextDay].open)}`;
          break;
        }
      }
    }

    $$('[data-open-status]').forEach(pill => {
      pill.setAttribute('data-open', String(isOpen));
      const textEl = $('[data-open-text]', pill);
      if (textEl) textEl.textContent = statusText;
    });

    $$('[data-hours] [data-day]').forEach(row => {
      const rowDay = parseInt(row.getAttribute('data-day'), 10);
      if (rowDay === day) {
        row.setAttribute('data-today', 'true');
      } else {
        row.removeAttribute('data-today');
      }
    });

    const nextSlotEl = $('[data-next-slot]');
    if (nextSlotEl) {
      nextSlotEl.textContent = 'Sat, 12 Dec 2026 · 10:00 AM';
    }
  }

  /* ------------------------------------------------------------------
   * 4. Team / Audience filter on participants.html
   * ------------------------------------------------------------------ */
  function initTeamFilter() {
    const grid = $('[data-filter-grid]');
    const chips = $$('[data-filter]');
    const countEl = $('[data-filter-count]');
    if (!grid || !chips.length) return;

    const cards = $$('[data-specialty]', grid);

    function applyFilter(filter) {
      let visible = 0;
      cards.forEach(card => {
        const specs = (card.getAttribute('data-specialty') || '').split(',').map(s => s.trim());
        const show = filter === 'all' || specs.includes(filter);
        card.classList.toggle('hidden', !show);
        if (show) visible++;
      });
      chips.forEach(chip => {
        const active = chip.getAttribute('data-filter') === filter;
        chip.setAttribute('aria-pressed', String(active));
      });
      if (countEl) {
        countEl.textContent = visible === cards.length
          ? `Showing all ${cards.length} Mini Moguls community groups`
          : `Showing ${visible} of ${cards.length} Mini Moguls community groups`;
      }
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => applyFilter(chip.getAttribute('data-filter')));
    });
  }

  /* ------------------------------------------------------------------
   * 5. Showcase idea & partner opportunity search + checklist toast
   * ------------------------------------------------------------------ */
  function initPatientsTools() {
    const searchInput = $('[data-plan-search]');
    const planItems = $$('[data-plan]');
    const emptyEl = $('[data-plan-empty]');
    const countEl = $('[data-plan-count]');

    if (searchInput && planItems.length) {
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        let shown = 0;
        planItems.forEach(item => {
          const text = (item.textContent || '').toLowerCase();
          const match = !q || text.includes(q);
          item.classList.toggle('hidden', !match);
          if (match) shown++;
        });
        if (emptyEl) emptyEl.classList.toggle('hidden', shown > 0);
        if (countEl) {
          countEl.textContent = q
            ? `${shown} matching ${shown === 1 ? 'item' : 'items'}`
            : `${planItems.length} showcase ideas & partner options`;
        }
      });
    }

    $$('[data-demo-download]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const titleEl = $('.font-bold', link);
        const title = titleEl ? titleEl.textContent.trim() : 'Preparation guide';
        showToast(`${title}: Final printable PDF will be shared upon registration confirmation. Call +263 771 222 748 for immediate guidance.`);
      });
    });
  }

  /* ------------------------------------------------------------------
   * 6. Validated forms ([data-validate] on contact.html & footers)
   * ------------------------------------------------------------------ */
  function initValidatedForms() {
    $$('form[data-validate]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;
        const requiredFields = $$('[required]', form);
        requiredFields.forEach(field => {
          const val = String(field.value || '').trim();
          const isEmail = field.type === 'email';
          const minLen = parseInt(field.getAttribute('minlength') || '0', 10);
          let fieldValid = Boolean(val);
          if (fieldValid && isEmail) {
            fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
          }
          if (fieldValid && minLen > 0) {
            fieldValid = val.length >= minLen;
          }
          field.setAttribute('aria-invalid', String(!fieldValid));
          if (!fieldValid) valid = false;
        });

        if (!valid) {
          showToast('Please complete all required fields before submitting.');
          return;
        }

        const ref = makeRef('MM');
        const topicField = $('select[name="topic"]', form);
        const isPartner = topicField && /sponsor|partner/i.test(topicField.value);
        const targetEmail = isPartner ? 'partners@minimoguls.online' : 'info@minimoguls.online';
        const fd = new FormData(form);
        fd.append('_subject', 'Mini Moguls Market Day Submission (' + ref + ')');
        fd.append('_captcha', 'false');
        fetch('https://formsubmit.co/ajax/' + targetEmail, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: fd
        }).catch(() => {});
        const template = form.getAttribute('data-success-text') || 'Thank you! Reference {ref}. Please note: connect a backend service in assets/js/main.js to transmit form entries.';
        const msg = template.replace('{ref}', ref);
        const successEl = $('[data-success]', form);
        if (successEl) {
          successEl.textContent = msg;
          successEl.classList.remove('hidden');
        }
        showToast('Enquiry preview recorded locally — call +263 771 222 748 for immediate confirmation.');
        form.reset();
      });
    });
  }

  /* ------------------------------------------------------------------
   * 7. Interactive 5-step "Register a Mogul" wizard on register.html
   * ------------------------------------------------------------------ */
  function initBookingWizard() {
    const form = $('form[data-booking]');
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    const preService = params.get('service');
    const preClinician = params.get('clinician');

    const serviceAlias = {
      'implant': 'crafts',
      'cleaning': 'crafts',
      'whitening': 'tech',
      'invisalign': 'fashion'
    };
    const initialServiceId = SERVICES.find(s => s.id === (serviceAlias[preService] || preService))?.id || null;
    const initialClinicianId = CLINICIANS.find(c => c.id === preClinician)?.id || null;

    const state = {
      step: 1,
      serviceId: initialServiceId,
      clinicianId: initialClinicianId,
      weekOffset: 0,
      dateIso: '2026-12-12',
      dateLabel: 'Sat, 12 Dec 2026 (Market Day)',
      slot: '10:00 AM – 4:00 PM (Full Market Day)'
    };

    const stepFieldsets = $$('fieldset[data-step]', form);
    const stepNavItems = $$('[data-steps-nav] li');
    const progressEl = $('[data-progress]');
    const serviceListEl = $('[data-service-list]', form);
    const clinicianListEl = $('[data-clinician-list]', form);
    const chosenServiceEl = $('[data-chosen-service]', form);
    const weekLabelEl = $('[data-week-label]', form);
    const daysEl = $('[data-days]', form);
    const slotsWrapEl = $('[data-slots-wrap]', form);
    const slotsLabelEl = $('[data-slots-label]', form);
    const slotsEl = $('[data-slots]', form);
    const reviewEl = $('[data-review]', form);
    const prevBtn = $('[data-prev]', form);
    const nextBtn = $('[data-next]', form);
    const submitBtn = $('[data-submit]', form);
    const wizardNav = $('[data-wizard-nav]', form);
    const doneView = $('[data-done]', form);
    const doneSummary = $('[data-done-summary]', form);
    const doneRef = $('[data-done-ref]', form);
    const restartBtn = $('[data-restart]', form);

    function showStepError(key, msg) {
      const el = $(`[data-error-for="${key}"]`, form);
      if (!el) return;
      if (!msg) {
        el.classList.add('hidden');
        el.textContent = '';
      } else {
        el.textContent = msg;
        el.classList.remove('hidden');
      }
    }

    function renderServices() {
      if (!serviceListEl) return;
      serviceListEl.innerHTML = '';
      SERVICES.forEach(svc => {
        const label = document.createElement('label');
        label.className = 'choice';
        const checked = state.serviceId === svc.id ? 'checked' : '';
        label.innerHTML = `
          <input type="radio" name="service" value="${svc.id}" ${checked}>
          <span class="choice-box">
            <span class="flex items-start justify-between gap-2">
              <strong class="font-bold text-ink">${svc.name}</strong>
              <span class="badge shrink-0">${svc.price}</span>
            </span>
            <span class="mt-1.5 block text-sm text-muted">${svc.desc}</span>
            <span class="mt-2 block text-xs font-semibold text-brand-700">${svc.duration}</span>
          </span>
        `;
        const input = $('input', label);
        input.addEventListener('change', () => {
          state.serviceId = svc.id;
          showStepError('service', '');
          renderClinicians();
          updateSidebarSummary();
        });
        serviceListEl.appendChild(label);
      });
    }

    function renderClinicians() {
      if (!clinicianListEl) return;
      const svc = SERVICES.find(s => s.id === state.serviceId) || SERVICES[0];
      if (chosenServiceEl && svc) chosenServiceEl.textContent = svc.name;

      const allowedIds = svc ? svc.clinicians : CLINICIANS.map(c => c.id);
      const list = CLINICIANS.filter(c => allowedIds.includes(c.id));
      if (!list.some(c => c.id === state.clinicianId)) {
        state.clinicianId = list[0]?.id || 'any';
      }

      clinicianListEl.innerHTML = '';
      list.forEach(doc => {
        const label = document.createElement('label');
        label.className = 'choice';
        const checked = state.clinicianId === doc.id ? 'checked' : '';
        label.innerHTML = `
          <input type="radio" name="clinician" value="${doc.id}" ${checked}>
          <span class="choice-box flex items-center gap-3.5">
            <img src="${doc.avatar}" alt="" width="48" height="56" class="size-12 shrink-0 rounded-xl bg-brand-50 object-cover">
            <span>
              <strong class="block font-bold text-ink">${doc.name}</strong>
              <span class="mt-0.5 block text-sm text-muted">${doc.role}</span>
            </span>
          </span>
        `;
        const input = $('input', label);
        input.addEventListener('change', () => {
          state.clinicianId = doc.id;
          showStepError('clinician', '');
          updateSidebarSummary();
        });
        clinicianListEl.appendChild(label);
      });
    }

    // Curated Event & Pre-Event Orientation Dates
    const EVENT_WEEKS = [
      {
        label: 'Event Week & Pre-Event Orientation (Harare)',
        days: [
          { iso: '2026-12-12', small: 'Sat · Event', num: '12 Dec', full: 'Sat, 12 Dec 2026 (Market Day)', disabled: false, slots: ['10:00 AM – 4:00 PM (Full Market Day)', 'Morning Showcase (10:00 AM)', 'Afternoon Showcase (1:00 PM)', 'Solo Creator Table', 'Team / Sibling Table'] },
          { iso: '2026-11-14', small: 'Sat · Call', num: '14 Nov', full: 'Sat, 14 Nov 2026 (Orientation Call)', disabled: false, slots: ['10:00 AM Call', '11:30 AM Call', '2:00 PM Call', '3:30 PM Call'] },
          { iso: '2026-11-21', small: 'Sat · Call', num: '21 Nov', full: 'Sat, 21 Nov 2026 (Creator Check-In)', disabled: false, slots: ['10:00 AM Call', '11:30 AM Call', '2:00 PM Call', '3:30 PM Call'] },
          { iso: '2026-11-28', small: 'Sat · Call', num: '28 Nov', full: 'Sat, 28 Nov 2026 (Parent Briefing)', disabled: false, slots: ['10:00 AM Call', '11:30 AM Call', '2:00 PM Call', '3:30 PM Call'] },
          { iso: '2026-12-05', small: 'Sat · Call', num: '05 Dec', full: 'Sat, 5 Dec 2026 (Stall Readiness)', disabled: false, slots: ['10:00 AM Call', '11:30 AM Call', '2:00 PM Call', '3:30 PM Call'] },
          { iso: '2026-12-10', small: 'Thu · Call', num: '10 Dec', full: 'Thu, 10 Dec 2026 (Partner Call)', disabled: false, slots: ['10:00 AM Call', '2:00 PM Call', '4:00 PM Call'] },
          { iso: '2026-12-13', small: 'Sun', num: '13 Dec', full: 'Sun, 13 Dec 2026 (Closed)', disabled: true, slots: [] }
        ]
      },
      {
        label: 'Weekday Organiser Enquiry Slots (Mon–Fri)',
        days: [
          { iso: '2026-11-16', small: 'Mon', num: '16 Nov', full: 'Mon, 16 Nov 2026 (Phone Check-In)', disabled: false, slots: ['9:00 AM Call', '11:00 AM Call', '2:30 PM Call', '4:00 PM Call'] },
          { iso: '2026-11-17', small: 'Tue', num: '17 Nov', full: 'Tue, 17 Nov 2026 (Phone Check-In)', disabled: false, slots: ['9:00 AM Call', '11:00 AM Call', '2:30 PM Call', '4:00 PM Call'] },
          { iso: '2026-11-18', small: 'Wed', num: '18 Nov', full: 'Wed, 18 Nov 2026 (Phone Check-In)', disabled: false, slots: ['9:00 AM Call', '11:00 AM Call', '2:30 PM Call', '4:00 PM Call'] },
          { iso: '2026-11-19', small: 'Thu', num: '19 Nov', full: 'Thu, 19 Nov 2026 (Phone Check-In)', disabled: false, slots: ['9:00 AM Call', '11:00 AM Call', '2:30 PM Call', '4:00 PM Call'] },
          { iso: '2026-11-20', small: 'Fri', num: '20 Nov', full: 'Fri, 20 Nov 2026 (Phone Check-In)', disabled: false, slots: ['9:00 AM Call', '11:00 AM Call', '2:30 PM Call'] },
          { iso: '2026-12-12', small: 'Sat · Event', num: '12 Dec', full: 'Sat, 12 Dec 2026 (Market Day)', disabled: false, slots: ['10:00 AM – 4:00 PM (Full Market Day)', 'Morning Showcase (10:00 AM)', 'Afternoon Showcase (1:00 PM)'] },
          { iso: '2026-11-22', small: 'Sun', num: '22 Nov', full: 'Sun, 22 Nov 2026 (Closed)', disabled: true, slots: [] }
        ]
      }
    ];

    function renderCalendar() {
      if (!daysEl) return;
      const week = EVENT_WEEKS[Math.abs(state.weekOffset) % EVENT_WEEKS.length];
      if (weekLabelEl) weekLabelEl.textContent = week.label;

      daysEl.innerHTML = '';
      week.days.forEach(d => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'day p-2';
        btn.disabled = d.disabled;
        const selected = state.dateIso === d.iso;
        btn.setAttribute('aria-pressed', String(selected));
        btn.innerHTML = `<small>${d.small}</small><span>${d.num}</span>`;
        btn.addEventListener('click', () => {
          state.dateIso = d.iso;
          state.dateLabel = d.full;
          state.slot = d.slots[0] || null;
          showStepError('slot', '');
          renderCalendar();
          renderSlots(d);
          updateSidebarSummary();
        });
        daysEl.appendChild(btn);
      });

      const activeDay = week.days.find(d => d.iso === state.dateIso) || week.days[0];
      if (activeDay && !activeDay.disabled) {
        renderSlots(activeDay);
      }
    }

    function renderSlots(dayObj) {
      if (!slotsWrapEl || !slotsEl) return;
      slotsWrapEl.hidden = false;
      if (slotsLabelEl) {
        slotsLabelEl.textContent = `Session options for ${dayObj.full}`;
      }
      slotsEl.innerHTML = '';
      dayObj.slots.forEach(slotText => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'slot px-3 py-2 text-sm';
        const selected = state.slot === slotText;
        btn.setAttribute('aria-pressed', String(selected));
        btn.textContent = slotText;
        btn.addEventListener('click', () => {
          state.slot = slotText;
          showStepError('slot', '');
          renderSlots(dayObj);
          updateSidebarSummary();
        });
        slotsEl.appendChild(btn);
      });
    }

    $$('[data-week]', form).forEach(btn => {
      btn.addEventListener('click', () => {
        const delta = parseInt(btn.getAttribute('data-week'), 10) || 1;
        state.weekOffset = (state.weekOffset + delta + EVENT_WEEKS.length) % EVENT_WEEKS.length;
        renderCalendar();
      });
    });

    function updateSidebarSummary() {
      const svc = SERVICES.find(s => s.id === state.serviceId);
      const doc = CLINICIANS.find(c => c.id === state.clinicianId);
      const sumService = $('[data-sum="service"]');
      const sumClinician = $('[data-sum="clinician"]');
      const sumWhen = $('[data-sum="when"]');
      const sumLength = $('[data-sum="length"]');

      if (sumService) sumService.textContent = svc ? svc.name : 'Not chosen yet';
      if (sumClinician) sumClinician.textContent = doc ? doc.name : '–';
      if (sumWhen) sumWhen.textContent = state.dateLabel && state.slot ? `${state.dateLabel} · ${state.slot}` : '–';
      if (sumLength) sumLength.textContent = svc ? `${svc.duration} (${svc.price})` : '–';
    }

    function buildReview() {
      if (!reviewEl) return;
      const svc = SERVICES.find(s => s.id === state.serviceId);
      const doc = CLINICIANS.find(c => c.id === state.clinicianId);
      const first = ($('#b-first', form)?.value || '').trim();
      const last = ($('#b-last', form)?.value || '').trim();
      const email = ($('#b-email', form)?.value || '').trim();
      const phone = ($('#b-phone', form)?.value || '').trim();
      const dob = ($('#b-dob', form)?.value || '').trim();
      const ins = ($('#b-ins', form)?.value || '').trim();
      const returning = ($('input[name="returning"]:checked', form)?.value || 'Solo Young Creator');
      const notes = ($('#b-notes', form)?.value || '').trim();

      const rows = [
        ['Showcase Category', svc ? svc.name : '—'],
        ['Age-Group / Track', doc ? doc.name : '—'],
        ['Event Date & Session', `${state.dateLabel} · ${state.slot}`],
        ['Parent / Guardian Name', `${first} ${last}`.trim() || '—'],
        ['Parent Contact', `${email} · ${phone}`],
        ['Young Mogul Name & Age', dob || '—'],
        ['Age Group Selection', ins || '—'],
        ['Participation Type', returning],
        ['Product / Stall Idea', notes || 'To be confirmed with organisers']
      ];

      reviewEl.innerHTML = rows.map(([dt, dd]) => `
        <div class="grid gap-1 p-4 sm:grid-cols-[12rem_1fr] sm:gap-4">
          <dt class="text-sm font-semibold text-muted">${dt}</dt>
          <dd class="font-bold text-ink">${dd}</dd>
        </div>
      `).join('');
    }

    function validateStep(step) {
      if (step === 1) {
        if (!state.serviceId) {
          showStepError('service', 'Please select a showcase category or enquiry option to continue.');
          return false;
        }
        showStepError('service', '');
      }
      if (step === 2) {
        if (!state.clinicianId) {
          showStepError('clinician', 'Please choose an age-group category or support track.');
          return false;
        }
        showStepError('clinician', '');
      }
      if (step === 3) {
        if (!state.dateIso || !state.slot) {
          showStepError('slot', 'Please choose an event date and session preference.');
          return false;
        }
        showStepError('slot', '');
      }
      if (step === 4) {
        const reqIds = ['b-first', 'b-last', 'b-email', 'b-phone', 'b-dob'];
        let ok = true;
        reqIds.forEach(id => {
          const input = $(`#${id}`, form);
          if (!input) return;
          const val = String(input.value || '').trim();
          const valid = id === 'b-email'
            ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
            : Boolean(val);
          input.setAttribute('aria-invalid', String(!valid));
          if (!valid) ok = false;
        });
        const consent = $('#b-consent', form);
        if (consent && !consent.checked) {
          ok = false;
          showToast('A parent or legal guardian must tick the consent box to continue.');
        } else if (!ok) {
          showToast('Please complete all required parent/guardian and participant fields.');
        }
        return ok;
      }
      return true;
    }

    function goToStep(step) {
      state.step = Math.max(1, Math.min(5, step));
      stepFieldsets.forEach(fs => {
        const s = parseInt(fs.getAttribute('data-step'), 10);
        fs.hidden = s !== state.step;
      });
      stepNavItems.forEach((li, idx) => {
        const s = idx + 1;
        if (s === state.step) li.setAttribute('data-state', 'current');
        else if (s < state.step) li.setAttribute('data-state', 'done');
        else li.removeAttribute('data-state');
      });
      if (progressEl) {
        progressEl.style.width = `${state.step * 20}%`;
      }
      if (prevBtn) prevBtn.hidden = state.step === 1;
      if (nextBtn) nextBtn.hidden = state.step === 5;
      if (submitBtn) submitBtn.hidden = state.step !== 5;
      if (state.step === 5) buildReview();
      updateSidebarSummary();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => goToStep(state.step - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (!validateStep(state.step)) return;
        goToStep(state.step + 1);
      });
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateStep(4)) return;
      const ref = makeRef('MM');
      const svc = SERVICES.find(s => s.id === state.serviceId);
      const doc = CLINICIANS.find(c => c.id === state.clinicianId);
      const first = ($('#b-first', form)?.value || '').trim();

      stepFieldsets.forEach(fs => (fs.hidden = true));
      if (wizardNav) wizardNav.classList.add('hidden');
      if (doneView) {
        doneView.hidden = false;
        if (doneRef) doneRef.textContent = ref;
      const isPartner = state.serviceId === 'sponsor' || state.clinicianId === 'sponsor';
      const targetEmail = isPartner ? 'partners@minimoguls.online' : 'info@minimoguls.online';
      const fd = new FormData(form);
      fd.append('reference', ref);
      fd.append('selected_zone', state.serviceId || '');
      fd.append('selected_track', state.clinicianId || '');
      fd.append('_subject', 'Mini Moguls Registration Wizard (' + ref + ')');
      fd.append('_captcha', 'false');
      fetch('https://formsubmit.co/ajax/' + targetEmail, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: fd
      }).catch(() => {});
        if (doneSummary) {
          doneSummary.textContent = `Thank you, ${first || 'Parent/Guardian'}! Your registration summary for ${svc ? svc.name : 'Mini Moguls Market Day'} (${doc ? doc.name : 'Selected Group'}) on ${state.dateLabel} has been prepared locally.`;
        }
        doneView.focus();
      }
    });

    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        form.reset();
        if (doneView) doneView.hidden = true;
        if (wizardNav) wizardNav.classList.remove('hidden');
        goToStep(1);
      });
    }

    renderServices();
    renderClinicians();
    renderCalendar();
    updateSidebarSummary();
    goToStep(1);
  }

  /* ------------------------------------------------------------------
   * Boot
   * ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    initChrome();
    initReveal();
    initHoursAndStatus();
    initTeamFilter();
    initPatientsTools();
    initValidatedForms();
    initBookingWizard();
  });
})();
