// 명소 목록 데이터에 위도(lat), 경도(lon) 추가
const attractions = [
    { name: '첨성대', id: 'cheomseongdae', lat: 35.8346, lon: 129.2190 },
    { name: '불국사', id: 'bulguksa', lat: 35.7903, lon: 129.3321 },
    { name: '동궁과 월지', id: 'donggung', lat: 35.8350, lon: 129.2248 },
    { name: '석굴암', id: 'seokguram', lat: 35.7937, lon: 129.3491 },
    { name: '대릉원', id: 'daereungwon', lat: 35.8375, lon: 129.2132 },
    { name: '국립경주박물관', id: 'museum', lat: 35.8318, lon: 129.2291 },
    { name: '월정교', id: 'woljeonggyo', lat: 35.8312, lon: 129.2154 },
    { name: '황리단길', id: 'hwangridangil', lat: 35.8383, lon: 129.2117 },
    { name: '양동마을', id: 'yangdong', lat: 35.9922, lon: 129.2562 },
    { name: '양남 주상절리', id: 'jusangjeolli', lat: 35.6888, lon: 129.4752 },
    { name: '문무대왕릉', id: 'munmu', lat: 35.7584, lon: 129.4674 },
    { name: '경주월드', id: 'gyeongjuworld', lat: 35.8488, lon: 129.2842 },
    { name: '보문관광단지', id: 'bomun', lat: 35.8455, lon: 129.2801 },
    { name: '교촌마을', id: 'gyochon', lat: 35.8315, lon: 129.2137 },
    { name: '포석정', id: 'poseokjeong', lat: 35.8117, lon: 129.2081 },
    { name: '김유신장군묘', id: 'kimyushin', lat: 35.8502, lon: 129.2111 },
    // ==================== 이스터에그 스탬프 추가 ====================
    { name: '경주 전문가', id: 'expert', isEasterEgg: true }
];

const stampGrid = document.getElementById('stamp-grid');

// 명소 목록을 바탕으로 스탬프 카드 생성
attractions.forEach(attraction => {
    const card = document.createElement('div');
    card.classList.add('stamp-card');

    const placeholder = document.createElement('div');
    placeholder.classList.add('stamp-placeholder');
    placeholder.id = `stamp-${attraction.id}`;

    const name = document.createElement('h3');
    name.textContent = attraction.name;

    card.appendChild(placeholder);
    card.appendChild(name);

    // ==================== 이스터에그 처리 로직 ====================
    if (attraction.isEasterEgg) {
        const isUnlocked = localStorage.getItem('gyeongjuExpertUnlocked') === 'true';
        if (isUnlocked) {
            placeholder.textContent = '🏆'; // 잠금 해제 시 아이콘
            placeholder.classList.add('green');
        } else {
            placeholder.textContent = '❓'; // 잠금 상태 아이콘
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                alert('이스터에그를 찾아보세요!');
            });
        }
    } else {
        // 일반 스탬프 처리
        placeholder.textContent = '?';
        const stampButton = document.createElement('button');
        stampButton.classList.add('stamp-btn');
        stampButton.textContent = '스탬프 찍기';
        card.appendChild(stampButton);
        stampButton.addEventListener('click', () => {
            checkLocation(attraction);
        });
    }
    // ==========================================================

    stampGrid.appendChild(card);
});

// (이하 위치 확인 및 거리 계산 함수는 이전과 동일)
function checkLocation(attraction) { /* ... */ }
function getDistance(lat1, lon1, lat2, lon2) { /* ... */ }
function deg2rad(deg) { /* ... */ }
