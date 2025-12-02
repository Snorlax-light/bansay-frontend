<template>
  <q-page padding class="bg-grey-2">
    <div class="row q-col-gutter-md q-mb-xl">
      <div class="col-12 col-sm-6 col-md-3" v-for="card in summaryCards" :key="card.title">
        <q-card class="q-pa-md dashboard-card" :class="card.color">
          <div class="text-subtitle1 text-white">{{ card.title }}</div>
          <div class="text-h5 text-bold text-white q-mt-sm">{{ card.value }}</div>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-xl">
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md indigo-card">
          <div class="text-h6 text-white q-mb-md">Recent Liabilities</div>
          <q-list bordered separator>
            <q-item v-for="(item, i) in recentLiabilities" :key="i">
              <q-item-section>{{ item }}</q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card class="q-pa-md blue-card">
          <div class="text-h6 text-white q-mb-md">Upcoming Due Dates</div>
          <q-list bordered separator>
            <q-item v-for="(item, i) in upcomingDue" :key="i">
              <q-item-section>{{ item }}</q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <div class="row justify-center q-gutter-md q-mt-xl">
      <q-btn color="indigo-7" label="Submit Payment Proof" size="lg" />
      <q-btn color="blue-grey-7" outline label="File an Appeal" size="lg" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StudentDashboard',

  props: {
    studentSummary: {
      type: Object,
      required: false,
      default: () => ({
        totalBalance: '₱0',
        unpaidLiabilities: 0,
        pendingAppeals: 0,
        pendingPayment: '₱0',
      }),
    },

    recentLiabilities: {
      type: Array,
      required: false,
      default: () => [],
    },

    upcomingDue: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  computed: {
    summaryCards() {
      return [
        { title: 'Total Balance', value: this.studentSummary.totalBalance, color: 'bg-blue-7' },
        {
          title: 'Unpaid Liabilities',
          value: this.studentSummary.unpaidLiabilities,
          color: 'bg-grey-7',
        },
        {
          title: 'Pending Appeals',
          value: this.studentSummary.pendingAppeals,
          color: 'bg-indigo-7',
        },
        {
          title: 'Pending Payment',
          value: this.studentSummary.pendingPayment,
          color: 'bg-blue-grey-7',
        },
      ];
    },
  },
});
</script>

<style scoped>
.dashboard-card {
  border-radius: 14px;
  transition: 0.2s ease;
}
.dashboard-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
.indigo-card {
  background: #3f51b5;
  color: white;
}
.blue-card {
  background: #1e88e5;
  color: white;
}
</style>
