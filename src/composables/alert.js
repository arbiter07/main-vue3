import { ref } from 'vue';

const alerts = ref([]);
export function useAlert() {
  //alert
  const vAleart = (message, type = 'error') => {
    alerts.value.push({ message, type });
    setTimeout(() => {
      alerts.value.shift();
    }, 2000);
  };
  const vSuccess = message => {
    vAleart(message, 'success');
  };
  return {
    alerts,
    vSuccess,
    vAleart,
  };
}
