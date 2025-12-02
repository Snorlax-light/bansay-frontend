import { defineStore, acceptHMRUpdate } from 'pinia';
import { BansayService } from 'src/services/bansay-service';
import type { UserLoginDto, UserRegisterDto } from 'src/services/sdk';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null
  }),

  getters: {

  },

  actions: {
    async login(payload: UserLoginDto) {
      return await BansayService.getInstance().loginUser(payload);
    },
    async register(data: UserRegisterDto) {
      return await BansayService.getInstance().registerUser(data);
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
