const menuBtn = document.querySelector('.open-dropdownBtn');
const menuDropdown = document.querySelector('.menu-dropdown');

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menuDropdown.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!menuDropdown.contains(e.target) && !menuBtn.contains(e.target)) {
        menuDropdown.classList.remove('active');
        menuBtn.classList.remove('active');
    }
});


const servicesListItems = document.querySelectorAll('.services__lists .item');
const servicesRightItems = document.querySelectorAll('.services__right .item');

if (servicesListItems.length > 0 && servicesRightItems.length > 0) {
    // Initialize first item as active
    servicesListItems[0].classList.add('active');
    servicesRightItems[0].classList.add('active');

    servicesListItems.forEach((item, index) => {
        // Change image on hover
        item.addEventListener('mouseenter', () => {
            servicesListItems.forEach(el => el.classList.remove('active'));
            servicesRightItems.forEach(el => el.classList.remove('active'));

            item.classList.add('active');
            if (servicesRightItems[index]) {
                servicesRightItems[index].classList.add('active');
            }
        });

        // Navigate on list item click
        item.addEventListener('click', () => {
            window.location.href = '#'; // Replace with actual section URL later
        });
    });

    servicesRightItems.forEach((rightItem) => {
        const imgBlock = rightItem.querySelector('.img-block');
        if (imgBlock) {
            imgBlock.style.cursor = 'pointer';
            // Navigate on image click
            imgBlock.addEventListener('click', () => {
                window.location.href = '#'; // Replace with actual section URL later
            });
        }
    });
}

// Back to Top functionality
const backToTopBtn = document.querySelector('.back-icon');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Swiper Initialization
if (typeof Swiper !== 'undefined' && document.querySelector('.other-service_blocks')) {
    const otherServiceSwiper = new Swiper('.other-service_blocks', {
        slidesPerView: 3,
        spaceBetween: 20,
        grabCursor: true,
        navigation: {
            nextEl: '.other-service-next',
            prevEl: '.other-service-prev',
        },
    });
}

// Premium Modal Popup System (Images & Video)
document.addEventListener('DOMContentLoaded', () => {
    // 1. Project Gallery Image Modal
    const imageModal = document.getElementById('image-modal');
    if (imageModal) {
        const imageModalContent = imageModal.querySelector('.modal-content');
        const imageModalImg = imageModal.querySelector('.custom-image');
        const imageModalClose = imageModal.querySelector('.modal-close');
        
        const precisionItems = document.querySelectorAll('.precision_block .item');
        precisionItems.forEach((item) => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (!img) return;
                
                const imgSrc = img.getAttribute('src');
                imageModalImg.setAttribute('src', imgSrc);
                
                document.body.classList.add('modal-open');
                imageModal.classList.add('active');
                setTimeout(() => {
                    imageModalContent.classList.add('active');
                }, 10);
            });
        });
        
        const closeImageModal = () => {
            imageModal.classList.remove('active');
            imageModalContent.classList.remove('active');
            document.body.classList.remove('modal-open');
            setTimeout(() => {
                imageModalImg.setAttribute('src', '');
            }, 400);
        };
        
        imageModalClose.addEventListener('click', closeImageModal);
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) closeImageModal();
        });
    }

    // 2. Custom Video Player Modal
    const videoModal = document.getElementById('video-modal');
    const videoBlock = document.querySelector('.video-block');
    
    if (videoModal && videoBlock) {
        const videoModalContent = videoModal.querySelector('.modal-content');
        const videoModalClose = videoModal.querySelector('.modal-close');
        const modalIframe = document.getElementById('modal-iframe');
        const modalVideoContainer = document.getElementById('modal-video-container');
        const modalVideo = document.getElementById('modal-video');
        
        const playPauseBtn = videoModal.querySelector('.play-pause-btn');
        const playIcon = playPauseBtn.querySelector('.play-icon');
        const pauseIcon = playPauseBtn.querySelector('.pause-icon');
        const progressBarContainer = videoModal.querySelector('.progress-bar-container');
        const progressBarFill = videoModal.querySelector('.progress-bar-fill');
        
        // Embed parser function to convert standard links to iframe embed links
        const getEmbedUrl = (url) => {
            if (url.includes('rutube.ru/video/')) {
                return url.replace('rutube.ru/video/', 'rutube.ru/play/embed/');
            }
            if (url.includes('youtube.com/watch?v=')) {
                const videoId = new URL(url).searchParams.get('v');
                return `https://www.youtube.com/embed/${videoId}`;
            }
            if (url.includes('youtu.be/')) {
                const parts = url.split('/');
                const videoId = parts[parts.length - 1].split('?')[0];
                return `https://www.youtube.com/embed/${videoId}`;
            }
            return url;
        };

        videoBlock.addEventListener('click', () => {
            const rawSrc = videoBlock.getAttribute('data-video-src') || 'https://assets.mixkit.co/videos/preview/mixkit-laser-projection-on-a-dark-stage-41586-large.mp4';
            const embedSrc = getEmbedUrl(rawSrc);
            
            // Check if it's an iframe-based video (YouTube/Rutube) or a direct video file (MP4)
            const isIFrameVideo = embedSrc.includes('rutube.ru') || embedSrc.includes('youtube.com') || embedSrc.includes('youtu.be');
            
            if (isIFrameVideo) {
                modalVideoContainer.style.display = 'none';
                modalIframe.style.display = 'block';
                modalIframe.setAttribute('src', embedSrc);
            } else {
                modalIframe.style.display = 'none';
                modalIframe.setAttribute('src', '');
                modalVideoContainer.style.display = 'block';
                modalVideo.setAttribute('src', embedSrc);
            }
            
            document.body.classList.add('modal-open');
            videoModal.classList.add('active');
            setTimeout(() => {
                videoModalContent.classList.add('active');
            }, 10);
        });
        
        const closeVideoModal = () => {
            videoModal.classList.remove('active');
            videoModalContent.classList.remove('active');
            document.body.classList.remove('modal-open');
            
            setTimeout(() => {
                modalIframe.setAttribute('src', '');
                modalIframe.style.display = 'none';
                
                modalVideo.pause();
                modalVideo.setAttribute('src', '');
                modalVideoContainer.style.display = 'none';
                modalVideoContainer.classList.add('paused');
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
                progressBarFill.style.width = '0%';
            }, 400);
        };
        
        videoModalClose.addEventListener('click', closeVideoModal);
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeVideoModal();
        });

        // Set up HTML5 video player controls for the static video player
        const togglePlay = () => {
            if (modalVideo.paused) {
                modalVideo.play();
                modalVideoContainer.classList.remove('paused');
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
            } else {
                modalVideo.pause();
                modalVideoContainer.classList.add('paused');
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
            }
        };
        
        playPauseBtn.addEventListener('click', togglePlay);
        modalVideo.addEventListener('click', togglePlay);
        
        // Custom Time/Progress Update
        modalVideo.addEventListener('timeupdate', () => {
            const percent = (modalVideo.currentTime / modalVideo.duration) * 100;
            progressBarFill.style.width = `${percent}%`;
        });
        
        // Click to Seek function
        progressBarContainer.addEventListener('click', (e) => {
            const rect = progressBarContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const newTime = (clickX / width) * modalVideo.duration;
            modalVideo.currentTime = newTime;
        });
    }

    // 3. ScrollSpy & Smooth Scroll navigation for Oborudov (Equipment) page
    const navLinks = document.querySelectorAll('.section-categories .btn');
    const sections = document.querySelectorAll('.oborudov-section .item, .oborudov-section .end-block');

    if (navLinks.length > 0 && sections.length > 0) {
        let isScrollingFromClick = false;

        // Auto smooth-scroll when categories button is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        const headerOffset = 160; // Offset for header + sticky categories heights
                        const elementPosition = targetSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        isScrollingFromClick = true;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });

                        // Set clicked as active immediately
                        navLinks.forEach(el => el.classList.remove('active'));
                        link.classList.add('active');

                        setTimeout(() => {
                            isScrollingFromClick = false;
                        }, 800);
                    }
                }
            });
        });

        // Bulletproof scroll spy calculations
        const handleScrollSpy = () => {
            if (isScrollingFromClick) return;

            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            const offset = 180; // trigger offset for precision

            let activeSectionId = null;

            sections.forEach(sec => {
                const id = sec.getAttribute('id');
                if (!id) return;

                const rect = sec.getBoundingClientRect();
                const secTop = rect.top + window.pageYOffset - offset;

                if (scrollPosition >= secTop) {
                    activeSectionId = id;
                }
            });

            // Force last item active if scrolled to the very bottom
            if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60)) {
                const lastSec = sections[sections.length - 1];
                if (lastSec) activeSectionId = lastSec.getAttribute('id');
            }

            if (activeSectionId) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${activeSectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        };

        window.addEventListener('scroll', handleScrollSpy);
        window.addEventListener('load', handleScrollSpy);
        handleScrollSpy();
    }
});
