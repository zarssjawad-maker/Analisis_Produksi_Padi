/* =====================================================================
   ANIMATIONS.JS — lapisan animasi & efek visual "Satelit Panen"
   File ini murni aditif: tidak mengubah/menimpa logika data atau chart
   yang sudah ditangani oleh js/data.js dan js/app.js.
   ===================================================================== */
(function () {
    "use strict";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    document.addEventListener("DOMContentLoaded", () => {
        initSidebarToggle();
        initRevealOnScroll();
        initScrollSpy();
        initMagneticButtons();
        if (!reduceMotion && !isTouch) initCursorGlow();
        if (!reduceMotion) initAuroraCanvas();
        initDynamicContentAnimations();
        initRippleOnButtons();
    });

    /* ---------- Sidebar (mobile) buka/tutup — hanya visual, tidak dobel
       jika app.js sudah mengurus ini: kita cek dulu apakah listener
       sudah ada dengan menandai elemen. ---------- */
    function initSidebarToggle() {
        const toggle = document.getElementById("sidebar-toggle");
        const sidebar = document.getElementById("sidebar");
        const overlay = document.getElementById("sidebar-overlay");
        if (!toggle || !sidebar || !overlay) return;
        if (toggle.dataset.animBound) return;
        toggle.dataset.animBound = "1";

        const close = () => { sidebar.classList.remove("open"); overlay.classList.remove("open"); };
        const open = () => { sidebar.classList.add("open"); overlay.classList.add("open"); };

        toggle.addEventListener("click", () => {
            sidebar.classList.contains("open") ? close() : open();
        });
        overlay.addEventListener("click", close);
        sidebar.querySelectorAll(".nav-link").forEach(a => a.addEventListener("click", close));
    }

    /* ---------- Reveal on scroll ---------- */
    function initRevealOnScroll() {
        const targets = document.querySelectorAll(
            ".section, .panel, .hero-team, .team-list, .hypothesis-grid, .summary-grid, .insight-columns"
        );
        targets.forEach(el => el.classList.add("reveal"));

        if (reduceMotion) {
            targets.forEach(el => el.classList.add("in-view"));
            return;
        }

        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

        targets.forEach(el => io.observe(el));

        // amati elemen yang baru muncul lewat render JS (mis. summary-cards)
        watchAndReveal("#summary-cards", ":scope > *");
        watchAndReveal("#hero-stats", ":scope > *");
        watchAndReveal("#hypothesis-cards", ":scope > *");
    }

    function watchAndReveal(containerSelector, childSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        const revealChildren = () => {
            container.querySelectorAll(childSelector).forEach((child, i) => {
                if (child.dataset.revealed) return;
                child.dataset.revealed = "1";
                child.style.opacity = "0";
                child.style.transform = "translateY(16px)";
                child.style.transition = "opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1)";
                setTimeout(() => {
                    child.style.opacity = "1";
                    child.style.transform = "translateY(0)";
                }, 60 * i);
            });
        };
        const mo = new MutationObserver(revealChildren);
        mo.observe(container, { childList: true });
        revealChildren();
    }

    /* ---------- Scroll-spy sidebar (indikator posisi radar) ---------- */
    function initScrollSpy() {
        const sections = document.querySelectorAll("main.content .section[id]");
        const links = document.querySelectorAll(".nav-link[data-nav]");
        if (!sections.length || !links.length) return;

        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    links.forEach(l => l.classList.toggle("active", l.dataset.nav === id));
                }
            });
        }, { threshold: 0.3, rootMargin: "-15% 0px -55% 0px" });

        sections.forEach(s => io.observe(s));
    }

    /* ---------- Tombol magnetik + gradient glow mengikuti kursor ---------- */
    function initMagneticButtons() {
        if (isTouch || reduceMotion) return;
        document.querySelectorAll(".btn, .theme-switch, .icon-btn").forEach(btn => {
            btn.addEventListener("mousemove", (e) => {
                const r = btn.getBoundingClientRect();
                const x = (e.clientX - r.left - r.width / 2) * 0.18;
                const y = (e.clientY - r.top - r.height / 2) * 0.28;
                btn.style.transform = `translate(${x}px, ${y}px)`;
            });
            btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
        });
    }

    /* ---------- Ripple klik pada tombol utama ---------- */
    function initRippleOnButtons() {
        document.querySelectorAll(".btn-primary, .tab-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const r = btn.getBoundingClientRect();
                const span = document.createElement("span");
                const size = Math.max(r.width, r.height) * 1.4;
                span.style.cssText = `position:absolute;width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px;border-radius:50%;background:rgba(255,255,255,.35);pointer-events:none;transform:scale(0);animation:ripple-fx .6s ease-out;`;
                btn.style.position = "relative";
                btn.style.overflow = "hidden";
                btn.appendChild(span);
                setTimeout(() => span.remove(), 650);
            });
        });
        if (!document.getElementById("ripple-fx-style")) {
            const style = document.createElement("style");
            style.id = "ripple-fx-style";
            style.textContent = "@keyframes ripple-fx{to{transform:scale(1);opacity:0;}}";
            document.head.appendChild(style);
        }
    }

    /* ---------- Cursor glow (desktop) ---------- */
    function initCursorGlow() {
        const glow = document.createElement("div");
        glow.id = "cursor-glow";
        document.body.appendChild(glow);

        let x = 0, y = 0, tx = 0, ty = 0;
        window.addEventListener("mousemove", (e) => {
            tx = e.clientX; ty = e.clientY;
            document.body.classList.add("cursor-active");
        });
        window.addEventListener("mouseleave", () => document.body.classList.remove("cursor-active"));

        (function loop() {
            x += (tx - x) * 0.12;
            y += (ty - y) * 0.12;
            glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
            requestAnimationFrame(loop);
        })();
    }

    /* ---------- Latar aurora / partikel bergaya citra satelit ---------- */
    function initAuroraCanvas() {
        const canvas = document.createElement("canvas");
        canvas.id = "aurora-canvas";
        document.body.prepend(canvas);
        const ctx = canvas.getContext("2d");

        let w, h, particles;
        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        function makeParticles() {
            const count = Math.min(70, Math.floor((w * h) / 22000));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.6 + 0.4,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                a: Math.random() * 0.5 + 0.15,
            }));
        }
        resize(); makeParticles();
        window.addEventListener("resize", () => { resize(); makeParticles(); });

        function isDark() { return document.documentElement.getAttribute("data-theme") === "dark"; }

        function tick() {
            ctx.clearRect(0, 0, w, h);
            const color = isDark() ? "56,255,160" : "15,157,100";
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color},${p.a})`;
                ctx.fill();
            });
            requestAnimationFrame(tick);
        }
        tick();
    }

    /* ---------- Animasi angka (count-up) untuk konten yang dirender JS ---------- */
    function animateNumbersWithin(el) {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        const nodes = [];
        let n;
        while ((n = walker.nextNode())) {
            const match = n.nodeValue.match(/-?\d[\d.,]*/);
            if (match && match[0].replace(/[.,]/g, "").length >= 2) nodes.push(n);
        }
        nodes.forEach(node => {
            const parent = node.parentElement;
            if (!parent || parent.dataset.counted) return;
            parent.dataset.counted = "1";
            parent.classList.add("count-animate");
        });
    }

    function initDynamicContentAnimations() {
        const containers = ["#hero-stats", "#summary-cards", "#hypothesis-cards"]
            .map(sel => document.querySelector(sel))
            .filter(Boolean);
        containers.forEach(c => {
            const mo = new MutationObserver(() => animateNumbersWithin(c));
            mo.observe(c, { childList: true, subtree: true });
            animateNumbersWithin(c);
        });

        // baris tabel: fade-in halus saat tabel diisi oleh app.js
        document.querySelectorAll(".data-table").forEach(table => {
            const mo = new MutationObserver(() => {
                table.querySelectorAll("tbody tr").forEach((tr, i) => {
                    if (tr.dataset.animated) return;
                    tr.dataset.animated = "1";
                    tr.style.opacity = "0";
                    tr.style.transition = "opacity .4s ease";
                    setTimeout(() => (tr.style.opacity = "1"), 25 * i);
                });
            });
            mo.observe(table, { childList: true, subtree: true });
        });
    }
})();
