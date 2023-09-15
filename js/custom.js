
const Page = gsap.utils.toArray('#main');
const Pages = gsap.utils.toArray('.stck');
const tops = Pages.map(Page => ScrollTrigger.create({ trigger: Page, start: "top top" }));

const ICON = document.querySelector('.icon');
const HDT = document.querySelector('.header_top');
const Quick = document.querySelector('.quick');
const ACTa = gsap.utils.toArray('.quick li');
const ACTb = document.querySelectorAll('.quick li');
const up = document.querySelector('.arrow .up');
const down = document.querySelector('.arrow .down');

const Nav = gsap.utils.toArray('.gnb a');
const PT = document.querySelector('.gnb .MT')
const Nav1 = document.querySelectorAll('.gnb li');

const NUM = document.querySelector('.n')
const PG_TEXT = document.querySelector('.page_num .txt span')
const PG_TITLE = document.querySelector('.page_num .txt .bold')

const MIcon = document.querySelector('.mobile_con');
const GNB = document.querySelector('.gnb');

const Pagi = [
    { name: 'main_cover', num: '0', text: 'INTRO', page: 'BOX ─ LINE' },
    { name: 'port1', num: '1', text: '종합 병원', page: '인천 세종 병원' },
    { name: 'port2', num: '2', text: '웨딩 부케 전문 업체', page: 'Blooms' },
    { name: 'port3', num: '3', text: '시계 브랜드', page: 'Breguet' },
    { name: 'port4', num: '4', text: '모터사이클 브랜드', page: 'Harley Davidson' },
    { name: 'port5', num: '5', text: '협회 사이트 리뉴얼', page: '울산광역시 태권도협회' },
    { name: 'port6', num: '6', text: '주방용품 브랜드', page: 'Kitchen Art' },
    { name: 'training', num: '7', text: '실습작', page: 'training' },
    { name: 'footer', num: '8', text: 'with me', page: 'Contact' },
]





//-------------------------------------------------------------





//자동 스크롤 복원 방지
if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
    console.log(
        "The location on the page is not restored, user will need to scroll manually.",
    );
}


ICON.addEventListener('click', () => {
    ICON.classList.toggle('on');
    Quick.classList.toggle('on');
    HDT.classList.toggle('on');

});

//페이지 애니메이션
Pages.forEach((it, idx, arry) => {
    const pg = ScrollTrigger.create({
        trigger: it,
        start: () => it.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
        pin: true,
        pinSpacing: false,
        onUpdate: ({ progress, direction, isActive }) => {
            NUM.innerHTML = Pagi[idx].num;
            PG_TEXT.innerHTML = Pagi[idx].text;
            PG_TITLE.innerHTML = Pagi[idx].page;
        },
        onLeave: ({ progress, direction, isActive }) => {
            NUM.innerHTML = Pagi[idx + 1].num;
            PG_TEXT.innerHTML = Pagi[idx + 1].text;
            PG_TITLE.innerHTML = Pagi[idx + 1].page;
            Pages.forEach(it => it.classList.remove('on'));
            it.classList.add('on');
        },
        onLeaveBack: ({ progress, direction, isActive }) => {
            NUM.innerHTML = Pagi[idx].num;
            PG_TEXT.innerHTML = Pagi[idx].text;
            PG_TITLE.innerHTML = Pagi[idx].page;
            Pages.forEach(it => it.classList.remove('on'));
            it.classList.add('on');
        },
    });

    up.addEventListener("click", (e) => {
        e.preventDefault();
        gsap.to(window, {
            scrollTo: "main",
            duration: 1.2,
        });
    });
    down.addEventListener("click", (e) => {
        e.preventDefault();
        const por = "#port" + idx;
        console.log(por)
        gsap.to(window, {
            scrollTo: {
                y: por,
                offsetY: 0
            },
            duration: 1.5,
        });
    })
});

//네비게이션
Nav.forEach((link, idx) => {
    // const TG = e.target.hash;
    const elem = document.querySelector(link.getAttribute("href"));

    const linkST = ScrollTrigger.create({
        trigger: elem,
        start: "top top"
    });

    ScrollTrigger.create({
        trigger: elem,
        start: "top center",
        end: "bottom center",
        onToggle: self => setActive(link)
    });

    //클릭했을시 페이지 이동
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const TG = linkST.start;
        gsap.to(window, {
            duration: 0.8,
            scrollTo: TG,
            ease: 'expo',
            overwrite: "auto",
        });
        GNB.classList.remove('on');
        MIcon.classList.remove('on');
    });

});
function setActive(link, idx) {
    // 모든 것에서 on을 떼어버림
    Nav.forEach(el => el.classList.remove("on"));

    //on을 붙인다
    link.classList.add("on");
}

PT.addEventListener('click', e => {
    e.preventDefault();
    gsap.to(window, {
        scrollTo: -100,
        duration: 0.8,
    });
});

MIcon.addEventListener('click', function () {
    MIcon.classList.toggle('on');
    GNB.classList.toggle('on');
});

window.addEventListener('resize', function () {
    GNB.classList.remove('on');
});

GNB.addEventListener('wheel', function (e) {
    if (GNB.classList.contains('on')) {
        e.preventDefault();
    };
});


ACTb.forEach((it, idx, arry) => {
    it.addEventListener('click', (e) => {
        e.preventDefault();
        const por1 = "#port" + (idx + 1);
        const por2 = "#port" + (idx);
        const tg = e.target.hash;
        console.log(por1)
        gsap.fromTo(window, {
            scrollTo: por1,
            ease: 'expo',
            duration: 0.8
        }, {
            scrollTo: por2,
            ease: 'expo',
            duration: 0.8
        });
        Quick.classList.remove('on')
        ICON.classList.remove('on')
        HDT.classList.remove('on')
    })
})