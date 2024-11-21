import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: [],
  }),
  actions: {
    vAleart(message, type = 'error') {
      this.alerts.push({ message, type });
      setTimeout(() => {
        this.alerts.shift();
      }, 2000);
    },
    vSuccess(message) {
      this.vAleart(message, 'success');
    },
  },
});
