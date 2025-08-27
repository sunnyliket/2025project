/* global L */ // Leaflet.js를 외부에서 불러온다고 VS Code에 알려줍니다.

let map = null; // 지도 객체를 저장할 변수

// (사이드바, 도움말 관련 함수들은 이전과 동일합니다)
function openNav() {
    document.getElementById("sideNav").style.width = "250px";
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
}

const helpModal = document.getElementById("helpModal");
const helpBtnOpen = document.getElementById("help-btn-open");
const helpBtnClose = document.getElementById("help-btn-close");

function openHelpModal() {
    helpModal.style.display = "block";
    helpBtnOpen.style.display = "none";
    helpBtnClose.style.display = "flex";
    setTimeout(positionHelpItems, 10);
}

function closeHelpModal() {
    helpModal.style.display = "none";
    helpBtnOpen.style.display = "flex";
    helpBtnClose.style.display = "none";
}

window.onclick = function(event) {
    // 이제 지도 팝업이 없으므로 해당 코드는 삭제합니다.
    if (event.target == helpModal) {
        closeHelpModal();
    }
};

function positionHelpItems() {
    const helpItems = document.querySelectorAll('.help-item');
    const viewportPadding = 10;

    helpItems.forEach(item => {
        const targetSelector = item.dataset.target;
        const targetElement = document.querySelector(targetSelector);

        if (targetElement) {
            const targetRect = targetElement.getBoundingClientRect();
            
            // ==================== 이 부분이 수정되었습니다 ====================
            // 도움말 상자 자체의 크기를 정확히 알기 위해 잠시 투명하게 보이도록 처리
            item.style.visibility = 'hidden';
            item.style.display = 'flex';
            const itemRect = item.getBoundingClientRect();
            item.style.display = '';
            item.style.visibility = '';
            // ==========================================================
            
            let top, left;

            if (targetSelector.startsWith('.dashboard-menu')) {
                left = targetRect.left + targetRect.width / 2;
                top = targetRect.top;
                item.classList.add('arrow-bottom');
            } else {
                left = targetRect.left + targetRect.width / 2;
                top = targetRect.bottom;
                item.classList.remove('arrow-bottom');
            }

            const halfItemWidth = itemRect.width / 2;
            if (left - halfItemWidth < viewportPadding) {
                left = halfItemWidth + viewportPadding;
            }
            if (left + halfItemWidth > window.innerWidth - viewportPadding) {
                left = window.innerWidth - halfItemWidth - viewportPadding;
            }
            
            item.style.left = `${left}px`;
            item.style.top = `${top}px`;
        }
    });
}

window.addEventListener('resize', positionHelpItems);


document.addEventListener('DOMContentLoaded', function() {
    // 음성 안내 스위치 기능
    const voiceToggle = document.getElementById('voice-toggle');
    if (voiceToggle) {
        const isVoiceEnabled = localStorage.getItem('voiceGuideEnabled') === 'true';
        voiceToggle.checked = isVoiceEnabled;
        voiceToggle.addEventListener('change', (event) => {
            localStorage.setItem('voiceGuideEnabled', event.target.checked);
        });
    }

    // 지도 생성 로직
    map = L.map('map').setView([35.8562, 129.2247], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 날씨 위젯 기능 (실시간 API 연동)
    async function fetchWeather() {
        const lat = 35.85;
        const lon = 129.22;
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&timezone=Asia/Seoul`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error("날씨 정보를 가져오는 데 실패했습니다:", error);
            document.getElementById('weather-comment').textContent = "날씨 정보를 불러올 수 없습니다.";
        }
    }

    function getWeatherInfo(code) {
        if (code === 0) return { icon: '☀️', comment: '햇살이 좋아 여행하기 완벽한 날이에요!', condition: '맑음' };
        if (code === 1) return { icon: '🌤️', comment: '대체로 맑은 날씨입니다.', condition: '대체로 맑음' };
        if (code === 2) return { icon: '⛅', comment: '구름이 햇볕을 가려주어 걷기 좋은 날씨네요.', condition: '구름조금' };
        if (code === 3) return { icon: '☁️', comment: '조금 흐리지만, 시원하게 여행을 즐겨보세요.', condition: '흐림' };
        if (code >= 51 && code <= 67) return { icon: '🌧️', comment: '비가 오니 박물관 같은 실내 코스는 어떠세요?', condition: '비' };
        if (code >= 71 && code <= 77) return { icon: '❄️', comment: '눈이 와요! 따뜻하게 입으세요.', condition: '눈' };
        if (code >= 95 && code <= 99) return { icon: '⛈️', comment: '천둥번개가 칠 수 있으니 조심하세요!', condition: '뇌우' };
        return { icon: '❓', comment: '경주 여행을 떠나볼까요?', condition: '알 수 없음' };
    }

    function updateTime() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes} KST`;
        }
    }

    function displayWeather(data) {
        const currentTemp = data.current.temperature_2m;
        const currentCode = data.current.weather_code;
        const currentInfo = getWeatherInfo(currentCode);

        document.getElementById('weather-comment').textContent = currentInfo.comment;
        document.getElementById('current-temp').textContent = `${Math.round(currentTemp)}°C`;
        document.getElementById('current-icon').textContent = currentInfo.icon;
        document.getElementById('current-condition').textContent = currentInfo.condition;

        const hourlyContainer = document.getElementById('hourly-forecast');
        hourlyContainer.innerHTML = '';

        const now = new Date();
        const currentHour = now.getHours();
        let startIndex = data.hourly.time.findIndex(time => new Date(time).getHours() >= currentHour);
        if (startIndex === -1) startIndex = 0;

        for (let i = 0; i < 8; i++) {
            const forecastIndex = startIndex + i * 3;
            if (forecastIndex >= data.hourly.time.length) break;

            const timeStr = new Date(data.hourly.time[forecastIndex]).getHours() + '시';
            const temp = data.hourly.temperature_2m[forecastIndex];
            const code = data.hourly.weather_code[forecastIndex];
            const hourInfo = getWeatherInfo(code);

            const item = document.createElement('div');
            item.className = 'hourly-item';
            item.innerHTML = `
                <span class="time">${timeStr}</span>
                <span class="icon">${hourInfo.icon}</span>
                <span class="temp">${Math.round(temp)}°</span>
            `;
            hourlyContainer.appendChild(item);
        }
    }

    updateTime();
    setInterval(updateTime, 1000);
    fetchWeather();
});
