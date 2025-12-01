import { defineStore, acceptHMRUpdate } from 'pinia';
import { BansayService, type QueryLiabilityParams, type UpdateLiabilityDto } from 'src/services/bansay-service';
import { type Liability, type CreateLiabilityDto, type MyLiabilitiesResponseDto } from 'src/services/sdk';

export interface LiabilityState {
  liabilities: Liability[];
  myLiabilities: Liability[];
  totalOutstandingBalance: number;
  currentLiability: Liability | null;
  loading: boolean;
}

export const useLiabilityStore = defineStore('liability', {
  state: (): LiabilityState => ({
    liabilities: [],
    myLiabilities: [],
    totalOutstandingBalance: 0,
    currentLiability: null,
    loading: false,
  }),

  getters: {
    unpaidLiabilities: (state) => state.myLiabilities.filter((l) => l.status === 'Unpaid'),
    paidLiabilities: (state) => state.myLiabilities.filter((l) => l.status === 'Paid'),
  },

  actions: {
    // Officer only: Create a new liability
    async createLiability(payload: CreateLiabilityDto): Promise<Liability> {
      return await BansayService.getInstance().createLiability(payload);
    },

    // Student only: Get my liabilities
    async fetchMyLiabilities(): Promise<MyLiabilitiesResponseDto> {
      this.loading = true;
      try {
        const response = await BansayService.getInstance().getMyLiabilities();
        this.myLiabilities = response.liabilities;
        this.totalOutstandingBalance = response.totalOutstandingBalance;
        return response;
      } finally {
        this.loading = false;
      }
    },

    // Officer/Admin: Get all liabilities with optional filters
    async fetchAllLiabilities(query?: QueryLiabilityParams): Promise<Liability[]> {
      this.loading = true;
      try {
        const response = await BansayService.getInstance().getAllLiabilities(query);
        this.liabilities = response;
        return response;
      } finally {
        this.loading = false;
      }
    },

    // Officer/Admin: Get single liability by ID
    async fetchLiabilityById(id: number): Promise<Liability> {
      this.loading = true;
      try {
        const response = await BansayService.getInstance().getLiabilityById(id);
        this.currentLiability = response;
        return response;
      } finally {
        this.loading = false;
      }
    },

    // Officer/Admin: Update a liability
    async updateLiability(id: number, payload: UpdateLiabilityDto): Promise<Liability> {
      return await BansayService.getInstance().updateLiability(id, payload);
    },

    // Officer/Admin: Soft delete a liability
    async deleteLiability(id: number): Promise<void> {
      await BansayService.getInstance().deleteLiability(id);
    },

    // Clear store state
    clearLiabilities() {
      this.liabilities = [];
      this.myLiabilities = [];
      this.totalOutstandingBalance = 0;
      this.currentLiability = null;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLiabilityStore, import.meta.hot));
}
