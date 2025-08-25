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
    { name: '김유신장군묘', id: 'kimyushin', lat: 35.8502, lon: 129.2111 }
];

const stampGrid = document.getElementById('stamp-grid');

// 명소 목록을 바탕으로 스탬프 카드 생성
attractions.forEach(attraction => {
    const card = document.createElement('div');
    card.classList.add('stamp-card');

    const placeholder = document.createElement('div');
    placeholder.classList.add('stamp-placeholder');
    placeholder.textContent = '?';
    placeholder.id = `stamp-${attraction.id}`;

    const name = document.createElement('h3');
    name.textContent = attraction.name;

    // '스탬프 찍기' 버튼 생성
    const stampButton = document.createElement('button');
    stampButton.classList.add('stamp-btn');
    stampButton.textContent = '스탬프 찍기';

    card.appendChild(placeholder);
    card.appendChild(name);
    card.appendChild(stampButton);

    stampGrid.appendChild(card);

    // 각 스탬프 찍기 버튼에 클릭 이벤트 추가
    stampButton.addEventListener('click', () => {
        checkLocation(attraction);
    });
});

// 위치 확인 함수
function checkLocation(attraction) {
    if (!navigator.geolocation) {
        alert("이 브라우저에서는 위치 확인 기능을 사용할 수 없어요.");
        return;
    }

    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(
        (position) => {
            // 위치 가져오기 성공
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            
            // 사용자와 명소 사이의 거리 계산 (km 단위)
            const distance = getDistance(userLat, userLon, attraction.lat, attraction.lon);
            const stampElement = document.getElementById(`stamp-${attraction.id}`);
            
            // 거리가 100m (0.1km) 이내인지 확인
            if (distance <= 0.1) {
                stampElement.classList.remove('red');
                stampElement.classList.add('green');
                stampElement.textContent = '✅';
                alert(`${attraction.name} 스탬프 획득 성공!`);
            } else {
                stampElement.classList.remove('green');
                stampElement.classList.add('red');
                stampElement.textContent = '❌';
                alert(`아직 ${attraction.name}에 도착하지 않았어요! (현재 약 ${Math.round(distance * 1000)}m 떨어져 있어요)`);
            }
        },
        () => {
            // 위치 가져오기 실패
            alert("위치 정보를 가져오는 데 실패했어요. 위치 접근 권한을 확인해주세요.");
        }
    );
}

// 두 지점의 위도, 경도를 바탕으로 실제 거리를 계산하는 함수 (Haversine 공식)
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 지구의 반지름 (km)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // 최종 거리 (km)
    return distance;
}

// 각도를 라디안으로 변환하는 함수
function deg2rad(deg) {
    return deg * (Math.PI/180);
}