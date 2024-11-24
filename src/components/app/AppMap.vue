<script setup>
import { ref, onMounted } from 'vue';
const { VITE_KAKAO_MAP_KEY } = import.meta.env;

const mapContainer = ref(null);

onMounted(() => {
  if (!mapContainer.value) {
    console.error('Map container is not defined.');
    return;
  }
  loadKakaoMap(mapContainer.value);
});

const loadKakaoMap = container => {
  const script = document.createElement('script');
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${VITE_KAKAO_MAP_KEY}&autoload=false`;
  document.head.appendChild(script);

  script.onload = () => {
    console.log('script load');
    window.kakao.maps.load(() => {
      console.log('kakaoload');
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
        level: 3, // 지도 확대 레벨
        maxLevel: 5, // 지도 축소 제한 레벨
      };
      // const mapInstance =
      new window.kakao.maps.Map(container, options); // 지도 생성
    });
  };

  script.onerror = () => {
    console.error('Failed to load Kakao Map script.');
  };
};
</script>

<template>
  <div ref="mapContainer" style="width: 100%; height: 70vh"></div>
</template>
