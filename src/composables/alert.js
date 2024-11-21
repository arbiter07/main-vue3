import { useAlertStore } from '@/stores/alert';
import { storeToRefs } from 'pinia';

export function useAlert() {
  const { alerts } = storeToRefs(useAlertStore());
  const { vAleart, vSuccess } = useAlertStore();
  return {
    alerts,
    vSuccess,
    vAleart,
  };
}
