/* global kakao */

// 카카오맵 스크립트를 동적으로 로드하도록 변경했으므로,
// HTML의 script 태그에서 autoload=false 옵션을 추가해야 합니다.

let map = null; // 지도 객체를 저장할 변수

// 지도 팝업을 열 때 실행되는 함수
function openMapModal() {
    const mapModal = document.getElementById('mapModal');
    mapModal.style.display = "block";

    // kakao.maps.load를 사용하여 스크립트가 로드된 후 지도 생성
    kakao.maps.load(function() {
        // 지도가 아직 생성되지 않았을 때만 새로 생성
        if (!map) {
            const mapContainer = document.getElementById('map-container');
            const options = { 
                center: new kakao.maps.LatLng(35.8562, 129.2247),
                level: 7 
            };
            map = new kakao.maps.Map(mapContainer, options);
        } else {
            // 이미 생성된 지도가 있다면, 크기를 다시 계산하여 제대로 표시되도록 함
            map.relayout();
        }
    });
}

// 지도 팝업을 닫는 함수
function closeMapModal() {
    const mapModal = document.getElementById('mapModal');
    mapModal.style.display = "none";
}


// (이하 사이드바, 도움말 팝업, 음성안내 관련 코드는 이전과 동일)

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
    // positionHelpItems(); // 이 함수는 이제 helpModal 전용이므로 그대로 둡니다.
}

function closeHelpModal() {
    helpModal.style.display = "none";
    helpBtnOpen.style.display = "flex";
    helpBtnClose.style.display = "none";
}

window.onclick = function(event) {
    const mapModal = document.getElementById('mapModal');
    if (event.target == helpModal) {
        closeHelpModal();
    }
    if (event.target == mapModal) {
        closeMapModal();
    }
};

function positionHelpItems() {
    // ... (이전과 동일한 내용)
}
window.addEventListener('resize', positionHelpItems);

document.addEventListener('DOMContentLoaded', function() {
    const voiceToggle = document.getElementById('voice-toggle');
    if (voiceToggle) {
        const isVoiceEnabled = localStorage.getItem('voiceGuideEnabled') === 'true';
        voiceToggle.checked = isVoiceEnabled;
        voiceToggle.addEventListener('change', (event) => {
            localStorage.setItem('voiceGuideEnabled', event.target.checked);
        });
    }
});