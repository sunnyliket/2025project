// 모든 명소에 대한 정보 (이 목록은 attractions.html과 항상 같아야 함)
const allAttractions = [
    { name: '첨성대', image: 'https://www.gjne.go.kr/upload/boardManagement/contents/202102/20210203050047_67812.jpg', description: '신라 시대에 별을 관측하던 곳' },
    { name: '불국사', image: 'https://www.gjne.go.kr/upload/boardManagement/contents/202102/20210203050018_96504.jpg', description: '아름다운 신라의 절' },
    { name: '동궁과 월지', image: 'https://www.gyeongju.go.kr/open_content/images/tour/tour_heritage_img04.jpg', description: '밤에 보면 더욱 아름다운 연못' },
    { name: '석굴암', image: 'https://images.chosun.com/resizer/lHq-sL5G2j-3y8L-Mv-iS6D_PlE=/616x0/filters:focal(294x191:304x201)/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/J627Y47FR5CFZPVX2QFYAF7D4E.jpg', description: '돌 동굴 속 거대한 부처님' },
    { name: '대릉원', image: 'https://www.heritage.go.kr/images/content/palace/royal_tomb_pl_img0201_2.jpg', description: '왕들의 커다란 무덤이 모인 공원' },
    // ... 나머지 모든 명소 정보도 여기에 추가 ...
];

document.addEventListener('DOMContentLoaded', function() {
    const favoritesList = document.getElementById('favorites-list');
    
    // 1. localStorage에서 즐겨찾기 목록(이름만)을 가져옴
    const favoriteNames = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favoriteNames.length === 0) {
        favoritesList.innerHTML = '<p class="empty-message">아직 즐겨찾기 한 명소가 없어요! 명소 목록에서 ⭐를 눌러 추가해보세요.</p>';
        return;
    }

    // 2. 전체 명소 목록에서, 이름이 즐겨찾기 목록에 포함된 명소만 골라냄
    const favoriteAttractions = allAttractions.filter(attraction => favoriteNames.includes(attraction.name));

    // 3. 골라낸 명소들을 화면에 카드로 만들어 보여줌
    favoriteAttractions.forEach(attraction => {
        const item = document.createElement('div');
        item.className = 'attraction-item';
        // 즐겨찾기 페이지에서는 팝업 기능 없이, 별 버튼도 없이 만듦
        item.innerHTML = `
            <img src="${attraction.image}" alt="${attraction.name} 사진">
            <h2>${attraction.name}</h2>
            <p>${attraction.description}</p>
        `;
        favoritesList.appendChild(item);
    });
});