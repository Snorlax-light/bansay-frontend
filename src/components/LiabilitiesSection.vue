<template>
  <q-page padding class="bg-grey-2">
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-3" v-for="card in summaryCards" :key="card.id">
        <q-card class="q-pa-md dashboard-card" :class="card.color">
          <div class="text-h6 text-white">{{ card.title }}</div>
          <div class="text-h5 text-bold text-white q-mt-sm">{{ card.value }}</div>
        </q-card>
      </div>
    </div>

    <q-table
      :rows="liabilities"
      :columns="columns"
      row-key="id"
      flat
      bordered
      separator="horizontal"
    >
      <template v-slot:body-cell-action="props">
        <q-td align="center">
          <q-btn
            v-if="props.row.status === 'unpaid'"
            flat
            color="green"
            label="Mark as Paid"
            @click="openMarkPaid(props.row)"
          />
          <q-btn v-if="props.row.status !== 'paid'" flat color="primary" label="File Appeal" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showPaidModal">
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">Mark Liability as Paid</div>
          <div class="text-body2 q-mt-sm">
            This action will mark the selected liability as paid. Please ensure that the payment has
            been settled.
          </div>

          <div class="q-mt-md">
            <p><b>Type:</b> {{ selected?.type }}</p>
            <p><b>Issuer:</b> {{ selected?.issuer }}</p>
            <p><b>Amount:</b> {{ selected?.amount }}</p>
          </div>

          <div class="text-body2">
            Are you sure you want to mark this liability as paid? This action indicates you have
            settled this payment.
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn flat label="Confirm Payment" color="green" @click="confirmPaid" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
interface Liability {
  id: number;
  type: string;
  issuer: string;
  amount?: string;
  status: string;
  dueDate?: string;
  remarks?: string;
}

interface SummaryCard {
  id: number;
  title: string;
  value: string;
  color: string;
}

export default {
  data() {
    return {
      showPaidModal: false,
      selected: null as Liability | null,

      summaryCards: [
        { id: 1, title: 'Total Liabilities', value: '', color: 'bg-blue-7' },
        { id: 2, title: 'Unpaid Count', value: '', color: 'bg-indigo-7' },
        { id: 3, title: 'Outstanding Balance', value: '', color: 'bg-grey-7' },
        { id: 4, title: 'Paid Total', value: '', color: 'bg-blue-grey-7' },
      ] as SummaryCard[],

      liabilities: [] as Liability[],

      columns: [
        { name: 'type', label: 'Type', field: 'type' },
        { name: 'issuer', label: 'Issuer', field: 'issuer' },
        { name: 'amount', label: 'Amount', field: 'amount' },
        { name: 'status', label: 'Status', field: 'status' },
        { name: 'dueDate', label: 'Due Date', field: 'dueDate' },
        { name: 'remarks', label: 'Remarks', field: 'remarks' },
        { name: 'action', label: 'Action', field: 'action' },
      ],
    };
  },

  methods: {
    openMarkPaid(row: Liability) {
      this.selected = row;
      this.showPaidModal = true;
    },

    confirmPaid() {
      if (this.selected) {
        this.selected.status = 'paid';
      }
      this.showPaidModal = false;
    },
  },
};
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
</style>
