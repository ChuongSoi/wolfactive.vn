// WOLFACTIVE LANDING PAGE INTERACTIVE SCRIPT

document.addEventListener('DOMContentLoaded', () => {
    // 1. Quote Calculator Logic
    const sportSelect = document.getElementById('sport-type');
    const fabricSelect = document.getElementById('fabric-type');
    const qtyRange = document.getElementById('quantity-range');
    const qtyVal = document.getElementById('qty-val');
    const optName = document.getElementById('opt-name');
    
    const priceUnitElem = document.getElementById('price-unit');
    const priceTotalElem = document.getElementById('price-total');
    const discountNote = document.getElementById('discount-note');

    function calculatePrice() {
        if (!sportSelect || !fabricSelect || !qtyRange) return;

        const basePrice = parseFloat(sportSelect.options[sportSelect.selectedIndex].getAttribute('data-base')) || 145000;
        const fabricMult = parseFloat(fabricSelect.options[fabricSelect.selectedIndex].getAttribute('data-mult')) || 1.0;
        const qty = parseInt(qtyRange.value, 10);
        
        qtyVal.textContent = `${qty} áo`;

        // Tier Volume Discount
        let discountPercent = 0;
        if (qty >= 10 && qty < 30) discountPercent = 0.05;
        else if (qty >= 30 && qty < 50) discountPercent = 0.10;
        else if (qty >= 50 && qty < 100) discountPercent = 0.18;
        else if (qty >= 100 && qty < 200) discountPercent = 0.25;
        else if (qty >= 200) discountPercent = 0.32;

        let unitPrice = basePrice * fabricMult * (1 - discountPercent);

        if (optName && optName.checked) {
            // Checked option for custom names
            unitPrice += 15000;
        }

        const totalPrice = unitPrice * qty;

        // Format currency VND
        const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
        
        priceUnitElem.textContent = formatter.format(Math.round(unitPrice));
        priceTotalElem.textContent = formatter.format(Math.round(totalPrice));

        if (discountPercent > 0) {
            discountNote.innerHTML = `🎉 Bạn được chiết khấu <strong>${Math.round(discountPercent * 100)}%</strong> cho mốc ${qty} sản phẩm!`;
            discountNote.style.display = 'block';
        } else {
            discountNote.innerHTML = `💡 Đặt từ 10 sản phẩm trở lên để nhận chiết khấu hấp dẫn!`;
        }
    }

    if (sportSelect) {
        sportSelect.addEventListener('change', calculatePrice);
        fabricSelect.addEventListener('change', calculatePrice);
        qtyRange.addEventListener('input', calculatePrice);
        if (optName) optName.addEventListener('change', calculatePrice);
        calculatePrice(); // initial run
    }

    // 2. Product Category Tabs Filter
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-tab');

            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 3. FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(f => f.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 4. Lead Form & Google Form Submission Handler
    const leadForm = document.getElementById('leadForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    const calcApplyBtn = document.getElementById('calc-apply-btn');

    // GOOGLE FORM CONFIGURATION (Link Google Form: 1odhEUevxe6l1IRCVjtstJBn7bXE8bhDL_moHWsrbYJc)
    window.GOOGLE_FORM_CONFIG = {
        formUrl: "https://docs.google.com/forms/d/1odhEUevxe6l1IRCVjtstJBn7bXE8bhDL_moHWsrbYJc/formResponse",
        formResponseUrl: "https://docs.google.com/forms/d/e/1FAIpQLScTO4PmahqC-KOEXvQBuxSX-5Mku0THVj5Y8AditkgoEQi_dQ/formResponse",
        entries: {
            fullname: "entry.101657411",          // 1. Anh/Chị tên gì?
            phone: "entry.1644733492",            // 2. Số điện thoại zalo của anh chị ?
            organization_type: "entry.785617082",// 3. Anh/Chị cần đồng phục cho:
            quantity: "entry.778891136",          // 4. Anh/Chị dự kiến cần khoảng bao nhiêu áo?
            delivery_time: "entry.1274761955"     // 5. Anh/Chị cần áo vào thời gian nào?
        }
    };

    if (calcApplyBtn) {
        calcApplyBtn.addEventListener('click', () => {
            const contactSec = document.getElementById('contact-form');
            if (contactSec) {
                contactSec.scrollIntoView({ behavior: 'smooth' });
                const qtyElem = document.getElementById('quantity');
                if (qtyElem) {
                    qtyElem.value = qtyRange.value;
                }
            }
        });
    }

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            // Không e.preventDefault() hoàn toàn để form HTML tự POST vào iframe ẩn
            
            const fullname = document.getElementById('fullname')?.value.trim() || '';
            const phone = document.getElementById('phone')?.value.trim() || '';
            const orgElem = document.querySelector('input[name="entry.785617082"]:checked');
            const organization_type = orgElem ? orgElem.value : '';
            const quantityVal = document.getElementById('quantity')?.value.trim() || '';
            const quantity = quantityVal ? (quantityVal.includes('áo') ? quantityVal : `${quantityVal} áo`) : '';
            const timeElem = document.querySelector('input[name="entry.1274761955"]:checked');
            const delivery_time = timeElem ? timeElem.value : '';

            // Backup Fetch submit using application/x-www-form-urlencoded
            const params = new URLSearchParams();
            params.append('entry.101657411', fullname);
            params.append('entry.1644733492', phone);
            params.append('entry.785617082', organization_type);
            params.append('entry.778891136', quantity);
            params.append('entry.1274761955', delivery_time);

            const urls = [
                "https://docs.google.com/forms/d/e/1FAIpQLScTO4PmahqC-KOEXvQBuxSX-5Mku0THVj5Y8AditkgoEQi_dQ/formResponse",
                "https://docs.google.com/forms/d/1odhEUevxe6l1IRCVjtstJBn7bXE8bhDL_moHWsrbYJc/formResponse"
            ];

            urls.forEach(targetUrl => {
                fetch(targetUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: params
                }).catch(err => console.log('Google Form backup submitted'));
            });

            if (successModal) {
                successModal.style.display = 'flex';
            }

            setTimeout(() => {
                leadForm.reset();
            }, 600);
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (successModal) {
                successModal.style.display = 'none';
            }
        });
    }

    // 5. Automated 3s Hero Banner Slider Carousel
    const bannerTrack = document.getElementById('bannerTrack');
    const bannerPrevBtn = document.getElementById('bannerPrevBtn');
    const bannerNextBtn = document.getElementById('bannerNextBtn');
    const bannerDots = document.querySelectorAll('#bannerDots .dot');
    const heroCarousel = document.getElementById('heroCarousel');

    if (bannerTrack && bannerDots.length > 0) {
        let currentSlide = 0;
        const totalSlides = bannerDots.length;
        let slideInterval = null;

        function goToSlide(index) {
            currentSlide = (index + totalSlides) % totalSlides;
            bannerTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            bannerDots.forEach((dot, idx) => {
                if (idx === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        function startAutoPlay() {
            stopAutoPlay();
            slideInterval = setInterval(nextSlide, 3000); // 3 seconds per banner
        }

        function stopAutoPlay() {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        }

        if (bannerPrevBtn) {
            bannerPrevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoPlay();
            });
        }

        if (bannerNextBtn) {
            bannerNextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoPlay();
            });
        }

        bannerDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
                goToSlide(slideIndex);
                startAutoPlay();
            });
        });

        if (heroCarousel) {
            heroCarousel.addEventListener('mouseenter', stopAutoPlay);
            heroCarousel.addEventListener('mouseleave', startAutoPlay);
        }

        startAutoPlay();
    }

    // 6. Mobile Drawer Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const contactWidget = document.getElementById('contactWidget');

    function openMobileMenu() {
        if (navMenu) navMenu.classList.add('active');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        if (contactWidget) contactWidget.style.display = 'none';
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (navMenu) navMenu.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        if (contactWidget) contactWidget.style.display = '';
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        if (closeMobileMenuBtn) {
            closeMobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeMobileMenu();
            });
        }

        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', closeMobileMenu);
        }

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    // 7. Mobile Touch Swipe Support for Hero Banner Slider
    if (heroCarousel && bannerTrack) {
        let touchStartX = 0;
        let touchStartY = 0;
        let isSwiping = false;

        heroCarousel.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches.length > 0) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                isSwiping = true;
            }
        }, { passive: true });

        heroCarousel.addEventListener('touchmove', (e) => {
            if (!isSwiping || !e.touches || e.touches.length === 0) return;
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = touchStartX - currentX;
            const diffY = touchStartY - currentY;

            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
                if (e.cancelable) e.preventDefault();
            }
        }, { passive: false });

        heroCarousel.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            isSwiping = false;
            const endX = e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientX : 0;
            const diffX = touchStartX - endX;

            if (Math.abs(diffX) > 25) {
                if (diffX > 0) {
                    if (typeof nextSlide === 'function') nextSlide();
                } else {
                    if (typeof prevSlide === 'function') prevSlide();
                }
                if (typeof startAutoPlay === 'function') startAutoPlay();
            }
        }, { passive: true });
    }

    // 8. Floating Contact Button Popover Toggle
    const floatingContactBtn = document.getElementById('floatingContactBtn');
    const contactPopover = document.getElementById('contactPopover');
    const closePopover = document.getElementById('closePopover');
    const contactWidget = document.getElementById('contactWidget');

    if (floatingContactBtn && contactPopover) {
        floatingContactBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = contactPopover.classList.contains('active') || contactPopover.style.display === 'flex';
            if (isOpen) {
                contactPopover.classList.remove('active');
                contactPopover.style.display = 'none';
            } else {
                contactPopover.classList.add('active');
                contactPopover.style.display = 'flex';
            }
        });

        if (closePopover) {
            closePopover.addEventListener('click', (e) => {
                e.stopPropagation();
                contactPopover.classList.remove('active');
                contactPopover.style.display = 'none';
            });
        }

        document.addEventListener('click', (e) => {
            if (contactWidget && !contactWidget.contains(e.target)) {
                contactPopover.classList.remove('active');
                contactPopover.style.display = 'none';
            }
        });
    }
});
