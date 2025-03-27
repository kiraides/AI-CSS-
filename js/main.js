// DOM要素の取得
const header = document.querySelector('.header');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');

// スクロール時のヘッダースタイル変更
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// モバイルメニューの切り替え
mobileMenuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  mobileMenuToggle.classList.toggle('active');

  if (mobileMenuToggle.classList.contains('active')) {
    mobileMenuToggle.querySelectorAll('span')[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    mobileMenuToggle.querySelectorAll('span')[1].style.opacity = '0';
    mobileMenuToggle.querySelectorAll('span')[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    mobileMenuToggle.querySelectorAll('span')[0].style.transform = 'none';
    mobileMenuToggle.querySelectorAll('span')[1].style.opacity = '1';
    mobileMenuToggle.querySelectorAll('span')[2].style.transform = 'none';
  }
});

// ナビゲーションリンクのクリックイベント
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      mobileMenuToggle.querySelectorAll('span')[0].style.transform = 'none';
      mobileMenuToggle.querySelectorAll('span')[1].style.opacity = '1';
      mobileMenuToggle.querySelectorAll('span')[2].style.transform = 'none';
    }
  });
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// テスティモニアルスライダー（簡易版）
const testimonialItems = document.querySelectorAll('.testimonial-item');
let currentTestimonial = 0;

function changeTestimonial() {
  testimonialItems.forEach((item, index) => {
    if (window.innerWidth < 768) {
      if (index === currentTestimonial) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    } else {
      item.style.display = 'block';
    }
  });

  currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
}

// モバイル版の場合のみスライダーを有効化
function initSlider() {
  if (window.innerWidth < 768 && testimonialItems.length > 1) {
    testimonialItems.forEach((item, index) => {
      if (index !== 0) {
        item.style.display = 'none';
      }
    });

    // 5秒ごとにテスティモニアルを切り替え
    setInterval(changeTestimonial, 5000);
  } else {
    testimonialItems.forEach(item => {
      item.style.display = 'block';
    });
  }
}

// 初期化
window.addEventListener('load', initSlider);
window.addEventListener('resize', initSlider);

// ANIMラインボーグラデーションアニメーション
function animateGradient() {
  const logoTexts = document.querySelectorAll('.logo h1, .footer-logo');

  logoTexts.forEach(text => {
    // グラデーションの色を少し変化させる
    const hueRotate = Math.sin(Date.now() * 0.001) * 20;
    text.style.filter = `hue-rotate(${hueRotate}deg)`;
  });

  requestAnimationFrame(animateGradient);
}

animateGradient();

// ヒーロー背景画像のパララックス効果
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition < window.innerHeight) {
    hero.style.backgroundPositionY = `${50 + scrollPosition * 0.05}%`;
  }
});

// AOS（スクロールアニメーション）の代替簡易実装
const animatedElements = document.querySelectorAll('.feature-card, .service-item, .testimonial-item');

function checkInView() {
  animatedElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);

    if (isVisible) {
      element.classList.add('animated');
    }
  });
}

window.addEventListener('scroll', checkInView);
window.addEventListener('load', checkInView);

// アニメーション用CSSをインラインで追加
const style = document.createElement('style');
style.textContent = `
  .feature-card, .service-item, .testimonial-item {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .feature-card.animated, .service-item.animated, .testimonial-item.animated {
    opacity: 1;
    transform: translateY(0);
  }
  
  .feature-card:nth-child(2), .service-item:nth-child(2), .testimonial-item:nth-child(2) {
    transition-delay: 0.2s;
  }
  
  .feature-card:nth-child(3), .service-item:nth-child(3) {
    transition-delay: 0.4s;
  }
  
  .feature-card:nth-child(4) {
    transition-delay: 0.6s;
  }
`;
document.head.appendChild(style); 