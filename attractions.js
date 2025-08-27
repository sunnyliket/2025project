function searchAttractions() {
    let searchText = document.getElementById('searchInput').value.toLowerCase();
    let attractionItems = document.querySelectorAll('.attraction-item');

    attractionItems.forEach(function(item) {
        let title = item.querySelector('h2').textContent.toLowerCase();
        if (title.includes(searchText)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// --- 팝업 관련 코드 ---
const modal = document.getElementById('attractionModal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalReview = document.getElementById('modal-review');
const saveBtn = document.getElementById('save-btn');
let currentAttractionName = ''; 

function openAttractionModal(name, imageUrl) {
    currentAttractionName = name; 
    modalImg.src = imageUrl;
    modalTitle.textContent = name;
    const savedReview = localStorage.getItem(`review_${name}`);
    modalReview.value = savedReview || '';
    modal.style.display = 'block';
}

function closeAttractionModal() {
    modal.style.display = 'none';
}

saveBtn.onclick = function() {
    const reviewText = modalReview.value;
    localStorage.setItem(`review_${currentAttractionName}`, reviewText);
    alert('소감이 저장되었습니다!');
    closeAttractionModal();
}

// --- 즐겨찾기 관련 코드 ---
function toggleFavorite(name, event) {
    event.stopPropagation(); 

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const starButton = event.target;

    if (favorites.includes(name)) {
        favorites = favorites.filter(fav => fav !== name);
        starButton.classList.remove('favorited');
    } else {
        favorites.push(name);
        starButton.classList.add('favorited');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function updateFavoriteStars() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const attractionItems = document.querySelectorAll('.attraction-item');

    attractionItems.forEach(item => {
        const name = item.querySelector('h2').textContent;
        const starButton = item.querySelector('.favorite-btn');
        
        if (favorites.includes(name)) {
            starButton.classList.add('favorited');
        } else {
            starButton.classList.remove('favorited');
        }
    });
}

// 페이지가 처음 로드될 때 즐겨찾기 상태를 업데이트
document.addEventListener('DOMContentLoaded', updateFavoriteStars);

// 팝업 바깥 클릭 시 닫기 (이벤트 리스너 중복 방지)
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        closeAttractionModal();
    }
});
