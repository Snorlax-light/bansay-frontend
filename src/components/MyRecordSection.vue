<template>
  <div class="q-pa-lg column q-gutter-y-lg">
    <div class="row items-center justify-between">
      <div>
        <div class="text-h5 text-primary">My Records</div>
        <div class="text-grey-7">View your complete liability and payment history</div>
      </div>

      <q-btn
        color="primary"
        unelevated
        icon="download"
        label="Download Complete Statement"
        @click="handleDownloadStatement"
      />
    </div>

    <div class="row q-gutter-md q-mb-xl">
      <q-card flat bordered class="col-12 col-md-3 q-pa-xs bg-indigo-1">
        <div class="text-grey-7 text-subtitle2">Total Liabilities</div>
        <div class="text-h6">{{ liabilityHistory.length }}</div>
      </q-card>

      <q-card flat bordered class="col-12 col-md-3 q-pa-xs bg-indigo-2">
        <div class="text-grey-7 text-subtitle2">Total Paid</div>
        <div class="text-h6 text-positive">₱{{ totalPaid }}</div>
      </q-card>

      <q-card flat bordered class="col-12 col-md-3 q-pa-xs bg-indigo-3">
        <div class="text-grey-7 text-subtitle2">Outstanding Balance</div>
        <div class="text-h6 text-negative">₱{{ totalUnpaid }}</div>
      </q-card>
    </div>

    <q-card flat bordered class="q-pa-md">
      <q-tabs v-model="tab" dense>
        <q-tab name="liabilities" label="Liability History" />
        <q-tab name="payments" label="Payment History" />
        <q-tab name="appeals" label="Appeal History" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="liabilities">
          <q-table
            :rows="liabilityHistory"
            :columns="liabilityColumns"
            row-key="date"
            flat
            bordered
            separator="horizontal"
          >
            <template #body-cell-status="props">
              <q-td>
                <q-badge :color="getStatusColor(props.value)">
                  {{ props.value }}
                </q-badge>
              </q-td>
            </template>
          </q-table>
        </q-tab-panel>

        <q-tab-panel name="payments">
          <div v-if="paymentHistory.length">
            <q-card
              v-for="(p, index) in paymentHistory"
              :key="index"
              flat
              bordered
              class="q-pa-md q-mb-md"
            >
              <div class="row justify-between items-start">
                <div>
                  <div class="text-subtitle1">{{ p.liabilityType }}</div>
                  <div class="text-grey-7">₱{{ p.amount }}</div>
                </div>

                <q-badge :color="getStatusColor(p.status)">
                  {{ p.status }}
                </q-badge>
              </div>

              <div class="row q-col-gutter-md q-mt-md text-body2">
                <div class="col-6 col-md-3"><b>Payment Method:</b> {{ p.paymentMethod }}</div>
                <div class="col-6 col-md-3"><b>Reference:</b> {{ p.referenceNumber }}</div>
                <div class="col-6 col-md-3"><b>Paid:</b> {{ p.paymentDate }}</div>
                <div class="col-6 col-md-3"><b>Verified:</b> {{ p.verifiedDate }}</div>
              </div>
            </q-card>
          </div>

          <div v-else class="text-center q-pa-lg text-grey-6">No payment history yet.</div>
        </q-tab-panel>

        <q-tab-panel name="appeals">
          <div v-if="appealHistory.length">
            <q-card
              v-for="(a, index) in appealHistory"
              :key="index"
              flat
              bordered
              class="q-pa-md q-mb-md"
            >
              <div class="row justify-between">
                <div>
                  <div class="text-subtitle1">{{ a.liabilityType }}</div>
                  <div class="text-grey-7">₱{{ a.amount }}</div>
                </div>

                <q-badge :color="getStatusColor(a.status)">
                  {{ a.status }}
                </q-badge>
              </div>

              <div class="q-mt-md">
                <b>Your Reason:</b>
                <div class="text-grey-7">{{ a.reason }}</div>
              </div>

              <q-card
                flat
                class="q-pa-sm q-mt-md"
                :class="a.status === 'approved' ? 'bg-green-1' : 'bg-red-1'"
              >
                <b>Officer's Response:</b>
                <div>{{ a.officerRemarks }}</div>
              </q-card>

              <div class="row items-center q-mt-md text-grey-7 text-caption">
                <q-icon name="event" size="16px" class="q-mr-sm" />
                Submitted: {{ a.submittedDate }}
              </div>
            </q-card>
          </div>

          <div v-else class="text-center q-pa-lg text-grey-6">No appeal history yet.</div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import type { QTableColumn } from 'quasar';

interface Liability {
  type: string;
  amount: number;
  status: string;
  date: string;
  issuer: string;
}

interface Payment {
  liabilityType: string;
  amount: number;
  paymentMethod: string;
  referenceNumber: string;
  paymentDate: string;
  verifiedDate: string;
  status: string;
}

interface Appeal {
  liabilityType: string;
  amount: number;
  reason: string;
  submittedDate: string;
  status: string;
  officerRemarks: string;
}

export default defineComponent({
  name: 'MyRecordSection',

  setup() {
    const tab = ref('liabilities');

    const liabilityHistory = ref<Liability[]>([]);
    const paymentHistory = ref<Payment[]>([]);
    const appealHistory = ref<Appeal[]>([]);

    const liabilityColumns: QTableColumn<Liability>[] = [
      { name: 'date', label: 'Date', field: 'date', align: 'left' },
      { name: 'type', label: 'Type', field: 'type', align: 'left' },
      { name: 'issuer', label: 'Issuer', field: 'issuer', align: 'left' },
      {
        name: 'amount',
        label: 'Amount',
        field: 'amount',
        align: 'right',
        format: (v: number) => `₱${v}`,
      },
      { name: 'status', label: 'Status', field: 'status', align: 'center' },
    ];

    const paymentColumns: QTableColumn<Payment>[] = [
      { name: 'liabilityType', label: 'Liability Type', field: 'liabilityType', align: 'left' },
      {
        name: 'amount',
        label: 'Amount',
        field: 'amount',
        align: 'right',
        format: (v: number) => `₱${v}`,
      },
      { name: 'paymentMethod', label: 'Method', field: 'paymentMethod', align: 'left' },
      { name: 'referenceNumber', label: 'Reference #', field: 'referenceNumber', align: 'left' },
      { name: 'paymentDate', label: 'Payment Date', field: 'paymentDate', align: 'left' },
      { name: 'status', label: 'Status', field: 'status', align: 'center' },
    ];

    const appealColumns: QTableColumn<Appeal>[] = [
      { name: 'liabilityType', label: 'Liability Type', field: 'liabilityType', align: 'left' },
      {
        name: 'amount',
        label: 'Amount',
        field: 'amount',
        align: 'right',
        format: (v: number) => `₱${v}`,
      },
      { name: 'reason', label: 'Reason', field: 'reason', align: 'left' },
      { name: 'submittedDate', label: 'Submitted', field: 'submittedDate', align: 'left' },
      { name: 'status', label: 'Status', field: 'status', align: 'center' },
    ];

    const totalPaid = computed(() =>
      liabilityHistory.value.filter((l) => l.status === 'paid').reduce((s, l) => s + l.amount, 0),
    );

    const totalUnpaid = computed(() =>
      liabilityHistory.value.filter((l) => l.status !== 'paid').reduce((s, l) => s + l.amount, 0),
    );

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'paid':
        case 'verified':
        case 'approved':
          return 'green';
        case 'unpaid':
        case 'rejected':
          return 'red';
        case 'pending':
          return 'blue';
        default:
          return 'grey';
      }
    };

    const handleDownloadStatement = () => {
      alert('Downloading your complete liability statement...');
    };

    return {
      tab,
      liabilityHistory,
      paymentHistory,
      appealHistory,
      liabilityColumns,
      paymentColumns,
      appealColumns,
      totalPaid,
      totalUnpaid,
      getStatusColor,
      handleDownloadStatement,
    };
  },
});
</script>
