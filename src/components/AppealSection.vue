<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

type AppealStatus = 'pending' | 'approved' | 'rejected';

interface Liability {
  id: string;
  type: string;
  amount: number;
  issuer: string;
}

interface Appeal {
  id: string;
  liabilityId: string;
  liabilityType: string;
  amount: number;
  reason: string;
  submittedDate: string;
  status: AppealStatus;
  officerRemarks?: string;
}

const $q = useQuasar();

const unpaidLiabilities = ref<Liability[]>([]);

const selectedLiability = ref('');
const reason = ref('');

const myAppeals = ref<Appeal[]>([]);

const handleSubmit = () => {
  if (!selectedLiability.value || !reason.value.trim()) {
    $q.notify({
      type: 'negative',
      message: 'Please select a liability and provide a reason.',
    });
    return;
  }

  const liability = unpaidLiabilities.value.find((l) => l.id === selectedLiability.value);
  if (!liability) return;

  const newAppeal: Appeal = {
    id: Date.now().toString(),
    liabilityId: liability.id,
    liabilityType: liability.type,
    amount: liability.amount,
    reason: reason.value,
    submittedDate: new Date().toISOString().split('T')[0] ?? '',
    status: 'pending',
  };

  myAppeals.value.unshift(newAppeal);
  selectedLiability.value = '';
  reason.value = '';

  $q.notify({
    type: 'positive',
    message: 'Appeal submitted successfully!',
  });
};

const getBadgeColor = (status: AppealStatus) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'approved':
      return 'positive';
    case 'rejected':
      return 'negative';
  }
};
</script>

<template>
  <q-page class="q-pa-xl bg-grey-2">
    <div class="q-mb-md">
      <h4 class="text-dark">Submit Appeal</h4>
      <div class="text-grey-7">
        Request reconsideration for liabilities you believe are incorrect.
      </div>
    </div>

    <q-card class="q-pa-lg q-mb-xl">
      <div class="text-h6 text-dark q-mb-md">New Appeal Request</div>

      <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
        <div v-if="unpaidLiabilities.length === 0" class="text-center q-pa-md">
          <q-icon name="warning" size="40px" class="q-mb-sm" color="orange" />
          <div class="text-body1 text-grey-7">No liabilities available to appeal.</div>
          <div class="text-caption text-grey-6">Please wait for the assign liabilities.</div>
        </div>

        <div v-else>
          <div class="text-body2 text-dark q-mb-xs">Select Liability *</div>
          <q-select
            v-model="selectedLiability"
            :options="
              unpaidLiabilities.map((l) => ({
                label: `${l.type} - ₱${l.amount} (${l.issuer})`,
                value: l.id,
              }))
            "
            filled
            placeholder="Choose a liability"
          />
        </div>

        <div>
          <div class="text-body2 text-dark q-mb-xs">Reason for Appeal *</div>
          <q-input
            v-model="reason"
            type="textarea"
            filled
            autogrow
            placeholder="Explain your reason..."
            :disable="unpaidLiabilities.length === 0"
          />
        </div>

        <q-banner
          v-if="unpaidLiabilities.length > 0"
          class="bg-blue-2 text-blue-9 q-pa-md rounded-borders"
        >
          Your appeal will be reviewed by the officer who issued the liability.
        </q-banner>

        <q-btn
          type="submit"
          color="indigo"
          label="Submit Appeal"
          class="full-width"
          unelevated
          :disable="unpaidLiabilities.length === 0"
        />
      </q-form>
    </q-card>

    <div class="text-h6 text-dark q-mb-md">My Appeals</div>

    <div v-if="myAppeals.length > 0" class="column q-gutter-md">
      <q-card v-for="appeal in myAppeals" :key="appeal.id" class="q-pa-lg">
        <div class="row items-start justify-between">
          <div>
            <div class="row items-center q-gutter-sm">
              <div class="text-h6 text-dark">{{ appeal.liabilityType }}</div>
              <q-badge :color="getBadgeColor(appeal.status)">
                {{ appeal.status }}
              </q-badge>
            </div>
            <div class="text-body2 text-grey-7">Amount: ₱{{ appeal.amount.toLocaleString() }}</div>
          </div>

          <div class="text-grey-6 text-caption">Submitted: {{ appeal.submittedDate }}</div>
        </div>

        <div class="q-mt-md">
          <div class="text-grey-7 text-body2 q-mb-xs">Your Reason:</div>
          <div class="text-dark">{{ appeal.reason }}</div>
        </div>

        <div v-if="appeal.officerRemarks" class="q-mt-md">
          <q-banner
            :class="appeal.status === 'approved' ? 'bg-green-2' : 'bg-red-2'"
            class="q-pa-md"
          >
            <div class="text-dark">
              <strong>Officer's Response:</strong><br />
              {{ appeal.officerRemarks }}
            </div>
          </q-banner>
        </div>
      </q-card>
    </div>

    <q-card v-else class="q-pa-xl text-center">
      <q-icon name="description" size="50px" color="grey-5" class="q-mb-md" />
      <div class="text-h6">No Appeals Yet</div>
      <div class="text-grey-7 q-mt-sm">
        Submit an appeal if you believe a liability was issued incorrectly.
      </div>
    </q-card>
  </q-page>
</template>
