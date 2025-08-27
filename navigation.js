document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([35.8562, 129.2247], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const startPointInput = document.getElementById('startPoint');
    const endPointInput = document.getElementById('endPoint');
    const attractionListDiv = document.getElementById('attraction-list');

    // 지도에 마커(핀) 추가하는 로직
    allAttractions.forEach(attraction => {
        if (attraction.lat && attraction.lon) {
            const marker = L.marker([attraction.lat, attraction.lon]).addTo(map);
            const popupContent = `
                <b>${attraction.name}</b><br>
                <button class="popup-btn" onclick="setPoint('start', '${attraction.name}')">출발지로 설정</button>
                <button class="popup-btn" onclick="setPoint('end', '${attraction.name}')">도착지로 설정</button>
            `;
            marker.bindPopup(popupContent);
        }
    });

    // ==================== 명소 목록 생성 및 클릭 이벤트 추가 ====================
    allAttractions.forEach(attraction => {
        const item = document.createElement('div');
        item.className = 'attraction-list-item';
        item.textContent = attraction.name;
        
        // 목록의 항목을 클릭했을 때
        item.addEventListener('click', () => {
            // 출발지가 비어있으면 출발지에, 아니면 도착지에 자동 입력
            if (startPointInput.value === '') {
                startPointInput.value = attraction.name;
            } else {
                endPointInput.value = attraction.name;
            }
        });
        
        attractionListDiv.appendChild(item);
    });
    // =====================================================================

    // 전역 함수로 setPoint를 만들어 HTML에서 호출할 수 있게 함
    window.setPoint = function(type, name) {
        if (type === 'start') {
            startPointInput.value = name;
        } else {
            endPointInput.value = name;
        }
        map.closePopup();
    };
});
