// 모든 명소에 대한 정보를 한 곳에서 관리합니다.
const allAttractions = [
    { name: '첨성대', image: 'https://www.gjne.go.kr/upload/boardManagement/contents/202102/20210203050047_67812.jpg', description: '신라 시대에 별을 관측하던 곳' },
    { name: '불국사', image: 'https://www.gjne.go.kr/upload/boardManagement/contents/202102/20210203050018_96504.jpg', description: '아름다운 신라의 절' },
    { name: '동궁과 월지', image: 'https://www.gyeongju.go.kr/open_content/images/tour/tour_heritage_img04.jpg', description: '밤에 보면 더욱 아름다운 연못' },
    { name: '석굴암', image: 'https://images.chosun.com/resizer/lHq-sL5G2j-3y8L-Mv-iS6D_PlE=/616x0/filters:focal(294x191:304x201)/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/J627Y47FR5CFZPVX2QFYAF7D4E.jpg', description: '돌 동굴 속 거대한 부처님' },
    { name: '대릉원', image: 'https://www.heritage.go.kr/images/content/palace/royal_tomb_pl_img0201_2.jpg', description: '왕들의 커다란 무덤이 모인 공원' },
    { name: '국립경주박물관', image: 'https://www.museum.go.kr/gyeongju/upload/ckeditor/2022091410114056299.jpg', description: '신라 시대의 보물을 볼 수 있는 곳' },
    { name: '월정교', image: 'https://www.gyeongju.go.kr/open_content/images/tour/rest_img01.jpg', description: '밤에 불 켜지면 정말 예쁜 다리' },
    { name: '황리단길', image: 'https://a.cdn-hotels.com/gdcs/production163/d26/89461149-a2e5-4e33-89a1-71337c73a30c.jpg', description: '예쁜 가게와 맛집이 많은 거리' },
    { name: '양동마을', image: 'https://www.gyeongju.go.kr/open_content/images/tour/tour_heritage_img02.jpg', description: '옛날 양반들이 살던 민속 마을' },
    { name: '양남 주상절리', image: 'https://www.gyeongju.go.kr/open_content/images/tour/tour_nature_img02.jpg', description: '부채꼴 모양의 신기한 바위' },
    { name: '문무대왕릉', image: 'https://www.gyeongju.go.kr/open_content/images/tour/tour_heritage_img09.jpg', description: '바다에 잠들어 나라를 지키는 왕' },
    { name: '경주월드', image: 'https://www.gyeongju.go.kr/open_content/images/tour/amusement_img01.jpg', description: '스릴 넘치는 놀이기구가 가득!' },
    { name: '보문관광단지', image: 'https://www.gyeongju.go.kr/open_content/images/tour/rest_img03.jpg', description: '벚꽃이 아름다운 호수 공원' },
    { name: '교촌마을', image: 'https://www.gyeongju.go.kr/open_content/images/tour/tour_village_img01.jpg', description: '한복 입고 체험하기 좋은 한옥마을' },
    { name: '포석정', image: 'https://www.gyeongju.go.kr/open_content/images/tour/tour_heritage_img12.jpg', description: '흐르는 물에 술잔을 띄우던 곳' },
    { name: '김유신장군묘', image: 'https://www.gyeongju.go.kr/open_content/images/tour/tour_heritage_img14.jpg', description: '삼국통일을 이룬 장군의 무덤' }
];