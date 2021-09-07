const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
    searchInputEl.focus(); //css에서 검색창에 돋보기를 누르면 focus 안되는 문제를 js에서 해결
});

//focus가 되었을때 foucsed라는 class가 추가 되게 함 
searchInputEl.addEventListener('focus', function () {
    searchEl.classList.add('focused');
    searchInputEl.setAttribute('placeholder', '통합검색'); 
});

//블러가 되면 통합검색의 focused가 사라지게 함
searchInputEl.addEventListener('blur', function () {
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute('placeholder', ''); 
});

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function() {
    console.log(window.scrollY); 
    if(window.scrollY > 500) {
        //배지 숨기기
        // gsap.to(요소, 지속시간, 옵션);
     gsap.to(badgeEl, .6, {
         opacity: 0,
         display: 'none'
     });
        //버튼 보이기
        gsap.to('#to-top', .2, {
            x: 0
        });

    } else{
        //배지 보이기
        gsap.to(badgeEl, .6, {
            opacity: 1,
            display: 'block'
        });
        //버튼 숨기기
        gsap.to('#to-top', .2, {
            x: 100
        });
    }
}, 300));
// _.throttle(함수, 시간)


//상단으로 움직이게 하는 코드
toTopEl.addEventListener('click', function () {
    gsap.to(window, .7, {
        scrollTo: 0
    }); 
});

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(fadeEl, 1, {
        delay: (index + 1)*.7,  //index는 0부터 시작하기 때문에 0*7은 계속 0이기 때문에 index에 1을 더해준 다음 7을 곱해줌 결국 첫번째 애니메이션은 0.7초 후에 나타날 것이고, 두번째는 1.4, 3번째는 2.1후에 동작 ..
        opacity: 1
    });
});



// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: true,
    loop: true
});
new Swiper('.promotion .swiper-container', {
    // direction: 'horizontal', direction 부분이 기본적으로 horizontal로 되어있어서 생략 가능
    slidesPerView: 3 , //한번에 보여줄 슬라이드 개수
    spaceBetween: 10, //슬라이드 사이 여백
    centeredSlides: true, //1번 슬라이드가 가운데 보이기
    loop: true,
    autoplay : {
        delay : 5000 //5초를 의미
    },
    pagination: {
        el :'.promotion .swiper-pagination',  //페이지 번호 요소 선택자
        clickable: true //사용자의 페이지 번호 요소 제어 가능여부
    },
    navigation: {
        prevEl: '.promotion .swiper-prev', //이전 슬라이드 버튼
        nextEl: '.promotion .swiper-next' //다음 슬라이드 버튼
    }
});
new Swiper('.awards .swiper-container', {
    autoplay: true,
    loop : true,
    spaceBetween: 30,
    slidesPerView: 5, //한 화면에 보여줄 슬라이드 개수
    navigation: {
        prevEl: '.awards .swiper-prev',
        nextEl: '.awards .swiper-next'
    }
});


const promotionEl = document.querySelector('.promotion'); //promotion이라는 요소를 찾아서 promotionEl에다가 할당
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; 
promotionToggleBtn.addEventListener('click', function() {
    isHidePromotion = !isHidePromotion //!뒤에 값 flase의 반대 true를 할당함 
    if(isHidePromotion) {
        //숨김처리
        promotionEl.classList.add('hide'); //ishidePromotion이 ture면 hide 클래스를 추가함
    } else {
        // 보임 처리
        promotionEl.classList.remove('hide'); //ishidePormoiton이 false면 hide 클래스를 제거함
    }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }

function floatingObject(selector, delay, size) {
    // gsap.to(요소, 시간, 옵션);
    gsap.to(selector, random(1.5, 2.5), //애니메이션 동작시간
    { //옵션
        y: size, //y축을 의미
        repeat: -1, //무한반복이 되도록 설정
        yoyo: true, //한번 재생된 애니메이션을 다시 뒤로 재생함 따라서 위로 내려온 애니메이션이 위로 올라가게됨
        ease: Power1.easeInOut, //ease 함수를 이용해서 부드럽게 움직이도록
        delay: random(0, delay)  //몇초 뒤에 애니메이션을 실행할 것인지 지연시간 지정
    });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);



/**
 * 요소가 화면에 보여짐 여부에 따른 요소 관리
 */
// 관리할 요소들 검색!
const spyEls = document.querySelectorAll('section.scroll-spy')
// 요소들 반복 처리!
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({ // 감시할 장면(Scene)을 추가
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부 감시
    })
    .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()) // 컨트롤러에 장면을 할당(필수!)
})

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); 
