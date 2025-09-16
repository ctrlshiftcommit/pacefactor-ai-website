// GSAP Animations for PaceFactor AI Website
// Mimic the original DataBahn animations with black/gold theme

document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initial setup to prevent flash of unstyled content
    gsap.set('[slide-in-header]', { opacity: 0, y: 50 });
    gsap.set('[slide-in]', { opacity: 0, y: 30 });
    gsap.set('[reveal-item]', { opacity: 0, y: 20 });

    // Hero header animations
    const headerTimeline = gsap.timeline({ delay: 0.5 });
    
    headerTimeline
        .to('[slide-in-header]', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        })
        .to('.bg-tiles-component', {
            opacity: 0.3,
            duration: 1,
            ease: "power2.out"
        }, "-=0.5");

    // Scroll-triggered animations
    gsap.utils.toArray('[slide-in]').forEach((element, index) => {
        gsap.fromTo(element, 
            { 
                opacity: 0, 
                y: 50 
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Feature items animation
    gsap.utils.toArray('.feature-item').forEach((item, index) => {
        gsap.fromTo(item,
            {
                opacity: 0,
                y: 60,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.1
            }
        );
    });

    // Logo marquee animation enhancement
    const logoList = document.querySelector('.logo-list');
    if (logoList) {
        // Clone items for seamless loop
        const originalItems = logoList.innerHTML;
        logoList.innerHTML = originalItems + originalItems;
        
        // Enhanced marquee animation with GSAP
        gsap.to('.logo-list', {
            x: '-50%',
            duration: 30,
            ease: "none",
            repeat: -1
        });
    }

    // Background tiles floating animation
    gsap.utils.toArray('.bg-tiles-item').forEach((tile, index) => {
        gsap.to(tile, {
            y: Math.sin(index) * 20,
            x: Math.cos(index) * 15,
            rotation: Math.sin(index) * 5,
            duration: 4 + (index % 3),
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.2
        });
    });

    // Golden dots pulsing animation
    gsap.utils.toArray('.bg-tiles-dot').forEach((dot, index) => {
        gsap.to(dot, {
            scale: 1.5,
            opacity: 0.3,
            duration: 2 + (index % 2),
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.3
        });
    });

    // Light rays animation
    gsap.utils.toArray('[class*="bg-tiles-ray"]').forEach((ray, index) => {
        gsap.fromTo(ray, 
            {
                opacity: 0,
                scaleY: 0
            },
            {
                opacity: 0.6,
                scaleY: 1,
                duration: 2,
                ease: "power2.out",
                repeat: -1,
                yoyo: true,
                delay: index * 0.5
            }
        );
    });

    // Hero logo animation
    const logoCore = document.querySelector('.logo-core');
    const logoRing = document.querySelector('.logo-ring');
    
    if (logoCore && logoRing) {
        // Core pulsing
        gsap.to(logoCore, {
            scale: 1.1,
            textShadow: "0 0 50px rgba(255, 215, 0, 1)",
            duration: 2,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true
        });

        // Ring rotation with varying speed
        gsap.to(logoRing, {
            rotation: 360,
            duration: 10,
            ease: "none",
            repeat: -1
        });

        // Ring glow effect
        gsap.to(logoRing, {
            filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))",
            duration: 3,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true
        });
    }

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar-component');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            gsap.to(navbar, {
                y: -100,
                duration: 0.3,
                ease: "power2.out"
            });
        } else {
            // Scrolling up
            gsap.to(navbar, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
        
        // Change navbar background opacity based on scroll
        const opacity = Math.min(scrollTop / 100, 0.95);
        gsap.to(navbar, {
            backgroundColor: `rgba(10, 10, 10, ${opacity})`,
            duration: 0.3,
            ease: "power2.out"
        });
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Button hover animations
    const buttons = document.querySelectorAll('.button-primary, .button-secondary');
    
    buttons.forEach(button => {
        const glow = button.querySelector('.button-glow');
        const pattern = button.querySelector('.button-primary-pattern');
        const arrow = button.querySelector('.arrow svg');
        
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
            
            if (glow) {
                gsap.to(glow, {
                    opacity: 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            if (pattern) {
                gsap.to(pattern, {
                    opacity: 0.6,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            if (arrow) {
                gsap.to(arrow, {
                    x: 5,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            }
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            if (glow) {
                gsap.to(glow, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            if (pattern) {
                gsap.to(pattern, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            if (arrow) {
                gsap.to(arrow, {
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });

    // Feature item hover effects
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        const icon = item.querySelector('.feature-icon');
        
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -10,
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
            
            if (icon) {
                gsap.to(icon, {
                    scale: 1.1,
                    rotation: 5,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            }
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            if (icon) {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });

    // Dropdown menu animations
    const dropdowns = document.querySelectorAll('.navbar-menu-dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.navbar-dropdown-toggle');
        const list = dropdown.querySelector('.navbar-dropdown-list');
        const chevron = dropdown.querySelector('.dropdown-chevron');
        
        if (toggle && list) {
            // Initial state
            gsap.set(list, {
                opacity: 0,
                y: -10,
                visibility: 'hidden'
            });
            
            toggle.addEventListener('mouseenter', () => {
                gsap.to(list, {
                    opacity: 1,
                    y: 0,
                    visibility: 'visible',
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                if (chevron) {
                    gsap.to(chevron, {
                        rotation: 180,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
            
            dropdown.addEventListener('mouseleave', () => {
                gsap.to(list, {
                    opacity: 0,
                    y: -10,
                    visibility: 'hidden',
                    duration: 0.2,
                    ease: "power2.out"
                });
                
                if (chevron) {
                    gsap.to(chevron, {
                        rotation: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        }
    });

    // Parallax effect for hero section
    gsap.to('.bg-tiles-component', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: '.section-home-header',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Text reveal animations for long text
    const longTexts = document.querySelectorAll('p');
    
    longTexts.forEach(text => {
        if (text.textContent.length > 100) {
            gsap.fromTo(text,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: text,
                        start: "top 90%",
                        end: "bottom 10%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    });

    // Footer animation
    gsap.fromTo('.footer',
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.footer',
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // Performance optimization: Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.globalTimeline.timeScale(0.1);
        ScrollTrigger.refresh();
    }

    // Refresh ScrollTrigger on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });

    // Initial visibility restoration
    setTimeout(() => {
        gsap.set('[slide-in-header], [split-header]', { visibility: 'visible' });
    }, 100);
});

// Additional utility functions
function createRandomFloat(element, intensity = 1) {
    gsap.to(element, {
        y: `+=${Math.random() * 20 * intensity}`,
        x: `+=${Math.random() * 15 * intensity}`,
        rotation: `+=${Math.random() * 10 * intensity}`,
        duration: 3 + Math.random() * 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2
    });
}

function createGlowEffect(element, color = 'rgba(255, 215, 0, 0.8)') {
    gsap.to(element, {
        filter: `drop-shadow(0 0 20px ${color})`,
        duration: 2 + Math.random(),
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random()
    });
}