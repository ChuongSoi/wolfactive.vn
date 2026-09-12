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

    // GOOGLE FORM CONFIGURATION (Form Đăng Ký Đặt Áo Wolf Active)
    window.GOOGLE_FORM_CONFIG = {
        formUrl: "https://docs.google.com/forms/d/e/1FAIpQLScTO4PmahqC-KOEXvQBuxSX-5Mku0THVj5Y8AditkgoEQi_dQ/formResponse",
        formResponseUrl: "https://docs.google.com/forms/d/e/1FAIpQLScTO4PmahqC-KOEXvQBuxSX-5Mku0THVj5Y8AditkgoEQi_dQ/formResponse",
        entries: {
            fullname: "entry.101657411",      // Họ tên
            phone: "entry.1644733492",        // Số Điện Thoại
            email: "entry.1981056247",        // Email
            organization: "entry.785617082",  // Tên câu lạc bộ / doanh nghiệp / giải chạy
            product_type: "entry.1322256504", // Loại áo mong muốn
            quantity: "entry.778891136",      // Số lượng áo dự kiến
            budget: "entry.1591560592",       // Ngân sách dự kiến
            delivery_time: "entry.1274761955" // Thời gian mong muốn nhận hàng
        }
    };

    if (calcApplyBtn) {
        calcApplyBtn.addEventListener('click', () => {
            const contactSec = document.getElementById('contact-form');
            if (contactSec) {
                contactSec.scrollIntoView({ behavior: 'smooth' });
                const deliveryElem = document.getElementById('delivery_time');
                if (deliveryElem) {
                    const sportName = sportSelect.options[sportSelect.selectedIndex].text;
                    const qty = qtyRange.value;
                    deliveryElem.value = `[Tự động từ dự toán] Đơn hàng dự kiến: ${qty} sản phẩm môn ${sportName}`;
                }
            }
        });
    }

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullname = document.getElementById('fullname')?.value.trim() || '';
            const phone = document.getElementById('phone')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const organization = document.getElementById('organization')?.value.trim() || '';
            const product_type = document.getElementById('product_type')?.value.trim() || '';
            const quantity = document.getElementById('quantity')?.value.trim() || '';
            const budget = document.getElementById('budget')?.value.trim() || '';
            const delivery_time = document.getElementById('delivery_time')?.value.trim() || '';

            const config = window.GOOGLE_FORM_CONFIG;

            // Gửi dữ liệu về Google Form tự động
            const targetUrl = config.formResponseUrl || config.formUrl;
            if (targetUrl) {
                const formData = new FormData();
                if (config.entries.fullname) formData.append(config.entries.fullname, fullname);
                if (config.entries.phone) formData.append(config.entries.phone, phone);
                if (config.entries.email) formData.append(config.entries.email, email);
                if (config.entries.organization) formData.append(config.entries.organization, organization);
                if (config.entries.product_type) formData.append(config.entries.product_type, product_type);
                if (config.entries.quantity) formData.append(config.entries.quantity, quantity);
                if (config.entries.budget) formData.append(config.entries.budget, budget);
                if (config.entries.delivery_time) formData.append(config.entries.delivery_time, delivery_time);

                fetch(targetUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formData
                }).catch(err => console.log('Google Form submitted'));
            }

            if (successModal) {
                successModal.style.display = 'flex';
            }
            leadForm.reset();
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
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // 7. Mobile Touch Swipe Support for Hero Banner Slider
    if (heroCarousel && bannerTrack) {
        let touchStartX = 0;
        let touchEndX = 0;

        heroCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        heroCarousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diffX = touchStartX - touchEndX;
            if (Math.abs(diffX) > 40) {
                if (diffX > 0) {
                    if (typeof nextSlide === 'function') nextSlide();
                } else {
                    if (typeof prevSlide === 'function') prevSlide();
                }
                if (typeof startAutoPlay === 'function') startAutoPlay();
            }
        }, { passive: true });
    }
});
