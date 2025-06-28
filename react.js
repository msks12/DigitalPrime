        // تحديث سعر النجوم
        function updateStarsPrice() {
            const starsCount = document.getElementById('custom-stars-count').value;
            const price = (starsCount / 100).toFixed(1);
            document.getElementById('stars-price').textContent = `${price} TON`;
        }
        
        // إدارة واجهة المحفظة
        const walletModal = document.getElementById('walletModal');
        const connectWalletBtn = document.getElementById('connectWalletBtn');
        const closeModal = document.getElementById('closeModal');
        const paymentModal = document.getElementById('paymentModal');
        const closePaymentModal = document.getElementById('closePaymentModal');
        
        // فتح واجهة المحفظة
        connectWalletBtn.addEventListener('click', () => {
            walletModal.classList.add('active');
        });
        
        // إغلاق واجهة المحفظة
        closeModal.addEventListener('click', () => {
            walletModal.classList.remove('active');
        });
        
        closePaymentModal.addEventListener('click', () => {
            paymentModal.classList.remove('active');
        });
        
        // إغلاق عند النقر خارج المحتوى
        walletModal.addEventListener('click', (e) => {
            if (e.target === walletModal) {
                walletModal.classList.remove('active');
            }
        });
        
        paymentModal.addEventListener('click', (e) => {
            if (e.target === paymentModal) {
                paymentModal.classList.remove('active');
            }
        });
        
        // تفعيل بطاقة ائتمانية
        document.getElementById('creditCardOption').addEventListener('click', () => {
            walletModal.classList.remove('active');
            document.getElementById('paymentMethodTitle').innerHTML = '<i class="far fa-credit-card"></i> الدفع بالبطاقة الائتمانية';
            paymentModal.classList.add('active');
        });
        
        // ربط MetaMask
        document.getElementById('connectMetaMask').addEventListener('click', async () => {
            showNotification("جاري فتح محفظة MetaMask...", "info");
            setTimeout(() => {
                showNotification("تم إرسال طلب الدفع إلى محفظة MetaMask", "success");
                walletModal.classList.remove('active');
            }, 2000);
        });
        
        // ربط Trust Wallet
        document.getElementById('connectTrustWallet').addEventListener('click', async () => {
            showNotification("جاري فتح محفظة Trust Wallet...", "info");
            setTimeout(() => {
                showNotification("تم إرسال طلب الدفع إلى محفظة Trust Wallet", "success");
                walletModal.classList.remove('active');
            }, 2000);
        });
        
        // ربط TON Wallet
        document.getElementById('connectTon').addEventListener('click', () => {
            showNotification("جاري فتح محفظة TON...", "info");
            setTimeout(() => {
                showNotification("تم إرسال طلب الدفع إلى محفظة TON", "success");
                walletModal.classList.remove('active');
            }, 2000);
        });
        
        // عرض إشعار للمستخدم
        function showNotification(message, type = "success") {
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.style.position = 'fixed';
            notification.style.top = '20px';
            notification.style.right = '20px';
            notification.style.padding = '15px 25px';
            notification.style.borderRadius = '8px';
            notification.style.zIndex = '3000';
            notification.style.fontWeight = 'bold';
            notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
            
            if (type === "success") {
                notification.style.background = 'linear-gradient(135deg, #14b8a6, #0d9488)';
            } else if (type === "error") {
                notification.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
            } else {
                notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
            }
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.transition = 'opacity 0.5s';
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
        }
        
        // إصلاح الروابط والأزرار
        document.getElementById('startShopping').addEventListener('click', () => {
            document.querySelector('#services').scrollIntoView({
                behavior: 'smooth'
            });
        });
        
        document.getElementById('getDiscount').addEventListener('click', () => {
            showNotification("تم تطبيق كود الخصم: PRIME20", "success");
        });
        
        // إضافة مستمعات لأزرار الشراء
        document.querySelectorAll('.service-btn').forEach(button => {
            button.addEventListener('click', function() {
                const serviceName = this.getAttribute('data-service');
                const servicePrice = this.getAttribute('data-price');
                
                document.getElementById('summary-service').textContent = serviceName;
                document.getElementById('summary-amount').textContent = `${servicePrice} TON`;
                
                walletModal.classList.add('active');
            });
        });
        
        // إرسال نموذج الدفع
        document.getElementById('paymentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification("🎉 تمت عملية الدفع بنجاح! شكراً لثقتك", "success");
            setTimeout(() => {
                paymentModal.classList.remove('active');
            }, 2000);
        });
        
        // تهيئة الصفحة عند التحميل
        window.onload = function() {
            updateStarsPrice();
            
            // إضافة مستمع الحدث لشريط التمرير
            document.getElementById('custom-stars-count').addEventListener('input', updateStarsPrice);
            
            // أزرار النجوم السريعة
            document.querySelectorAll('.star-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const stars = this.getAttribute('data-stars');
                    document.getElementById('custom-stars-count').value = stars;
                    updateStarsPrice();
                    
                    // إضافة تأثير للزر النشط
                    document.querySelectorAll('.star-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // إظهار رسالة ترحيبية
            setTimeout(() => {
                showNotification("🔥 مرحباً بك في DigitalPrime! 🔥\nاحصل على خصم 20% على أول طلب باستخدام الكود: WELCOME20");
            }, 1500);
            
            // تأثيرات التمرير لبطاقات الخدمات
            const serviceCards = document.querySelectorAll('.service-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, 200);
                    }
                });
            }, { threshold: 0.1 });
            
            serviceCards.forEach(card => {
                observer.observe(card);
            });
        }
        
        // تأثيرات الأزرار
        const buttons = document.querySelectorAll('.btn, .service-btn, .wallet-btn, .payment-option');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300);
            });
        });