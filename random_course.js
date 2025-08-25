// HTML 문서가 완전히 준비되면, 이 안의 코드를 실행하라는 안전장치
document.addEventListener('DOMContentLoaded', function() {

    // 경주 명소 데이터 (이름과 위도, 경도 좌표)
    const attractions = [
        { name: '불국사', lat: 35.790, lon: 129.332 },
        { name: '석굴암', lat: 35.793, lon: 129.349 },
        { name: '첨성대', lat: 35.834, lon: 129.219 },
        { name: '동궁과월지', lat: 35.835, lon: 129.225 },
        { name: '대릉원', lat: 35.837, lon: 129.213 },
        { name: '황리단길', lat: 35.838, lon: 129.211 },
        { name: '월정교', lat: 35.831, lon: 129.215 },
        { name: '교촌마을', lat: 35.831, lon: 129.214 }
    ];

    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spinBtn');
    const resultContainer = document.getElementById('result-container');
    const primaryAttractionElem = document.getElementById('primary-attraction');
    const secondaryAttractionElem = document.getElementById('secondary-attraction');

    let isSpinning = false;

    spinBtn.onclick = function() {
        if (isSpinning) return;
        isSpinning = true;
        resultContainer.classList.add('hidden');

        // 360도 * 5바퀴 + 랜덤 각도
        const randomRotation = 360 * 5 + Math.ceil(Math.random() * 360);
        wheel.style.transform = `rotate(${randomRotation}deg)`;

        // 회전이 끝난 후 결과 처리
        setTimeout(showResult, 5500, randomRotation);
    }

    function showResult(totalRotation) {
        const actualRotation = totalRotation % 360; // 실제 멈춘 각도
        const sectorAngle = 360 / attractions.length; // 한 칸의 각도
        const winningIndex = Math.floor((360 - actualRotation + sectorAngle / 2) % 360 / sectorAngle);
        
        const primary = attractions[winningIndex];
        const secondary = findNearbyAttraction(primary);

        primaryAttractionElem.textContent = primary.name;
        secondaryAttractionElem.textContent = secondary.name;
        resultContainer.classList.remove('hidden');
        isSpinning = false;
    }

    function findNearbyAttraction(primary) {
        let closest = null;
        let minDistance = Infinity;

        attractions.forEach(attraction => {
            if (attraction.name === primary.name) return; // 자기 자신은 제외

            const distance = getDistance(primary.lat, primary.lon, attraction.lat, attraction.lon);
            if (distance < minDistance) {
                minDistance = distance;
                closest = attraction;
            }
        });
        return closest;
    }

    // 두 지점 사이의 거리를 계산하는 함수 (단순 계산)
    function getDistance(lat1, lon1, lat2, lon2) {
        const dLat = lat2 - lat1;
        const dLon = lon2 - lon1;
        return Math.sqrt(dLat * dLat + dLon * dLon);
    }

    function spinAgain() {
        resultContainer.classList.add('hidden');
    }

});