<template>
  <q-page class="q-pa-lg">
    <div class="row items-center q-mb-md">
      <div class="col-12">
        <div class="text-h4 text-primary">Review Student Appeals</div>
        <div class="text-subtitle1 text-grey-7">
          View, approve, or reject student requests for reconsideration.
        </div>
      </div>
    </div>

    <q-separator class="q-mb-lg" />

    <q-card flat bordered class="q-pa-md q-mb-lg">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-input
            v-model="searchQuery"
            label="Search Student ID or Appeal ID"
            dense
            clearable
            @update:model-value="handleFilterChange"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div class="col-6 col-md-4">
          <q-select
            v-model="filterStatus"
            :options="['Pending', 'Approved', 'Rejected']"
            label="Filter by Status"
            dense
            clearable
            @update:model-value="handleFilterChange"
          />
        </div>

        <div class="col-6 col-md-4">
          <q-input
            v-model="filterDate"
            label="Filter by Submission Date"
            type="date"
            dense
            @update:model-value="handleFilterChange"
          />
        </div>
      </div>
    </q-card>

    <q-table
      title="Pending Appeals List"
      :rows="appeals"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :pagination="pagination"
      @request="onRequest"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge :color="getStatusColor(props.row.status)">
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="visibility"
            size="sm"
            flat
            dense
            color="primary"
            label="Review"
            @click="openReviewDialog(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showReviewDialog">
      <q-card style="width: 800px; max-width: 90vw">
        <div v-if="currentAppeal">
          <q-card-section>
            <div class="text-h6">Review Appeal #{{ currentAppeal.id }}</div>
            <div class="text-subtitle1 text-grey-6">
              {{ currentAppeal.studentName }} - {{ currentAppeal.liabilityType }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-scroll-area style="height: 300px; max-width: 750px" class="q-mb-md">
              <div class="text-subtitle2">Student's Reason:</div>
              <q-card flat bordered class="q-pa-sm q-mb-md">{{ currentAppeal.reason }}</q-card>

              <div class="text-subtitle2">Officer Remarks (Required for Reject/Approve):</div>
              <q-input
                v-model="officerRemarks"
                type="textarea"
                filled
                dense
                rows="3"
                placeholder="Add remarks or notes for transparency."
              />
            </q-scroll-area>
          </q-card-section>
        </div>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            label="Reject Appeal"
            color="red"
            @click="processAppeal('Rejected')"
            :disable="!officerRemarks || !currentAppeal"
          />
          <q-btn
            label="Approve Appeal"
            color="green"
            @click="processAppeal('Approved')"
            :disable="!officerRemarks || !currentAppeal"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import type { QTableProps } from 'quasar';
import { useQuasar } from 'quasar';
import type { LiabilityStatusEnum } from 'src/services/sdk';

// --- TYPE DEFINITIONS FOR FIXING ERRORS ---
type RequestProp = NonNullable<Parameters<NonNullable<QTableProps['onRequest']>>[0]>;
type MinimalRequestProps = Pick<RequestProp, 'pagination' | 'getCellValue'> & { filter?: unknown };

// Placeholder interface matching the required table structure
interface AppealRecord {
  id: number;
  studentId: string;
  studentName: string;
  liabilityType: string;
  submissionDate: string;
  status: LiabilityStatusEnum | 'Pending' | 'Approved' | 'Rejected';
  reason: string;
}

// Table columns for Q-Table
const columns: QTableProps['columns'] = [
  { name: 'id', label: 'Appeal ID', align: 'left', field: 'id', sortable: true },
  { name: 'studentId', label: 'Student ID', align: 'left', field: 'studentId', sortable: true },
  {
    name: 'studentName',
    label: 'Student Name',
    align: 'left',
    field: 'studentName',
    sortable: true,
  },
  {
    name: 'liabilityType',
    label: 'Liability Type',
    align: 'left',
    field: 'liabilityType',
    sortable: true,
  },
  {
    name: 'submissionDate',
    label: 'Submitted On',
    align: 'left',
    field: 'submissionDate',
    sortable: true,
    format: (val: string) => new Date(val).toLocaleDateString(),
  },
  { name: 'status', label: 'Status', align: 'center', field: 'status', sortable: true },
  { name: 'actions', label: 'Actions', align: 'center', field: 'actions' },
];

export default defineComponent({
  name: 'AppealReviewPage',
  setup() {
    const $q = useQuasar();

    // Placeholder data
    const appeals = ref<AppealRecord[]>([
      {
        id: 101,
        studentId: 'S12345',
        studentName: 'Juan Dela Cruz',
        liabilityType: 'fine',
        submissionDate: new Date().toISOString(),
        status: 'Pending',
        reason: 'I was present during the event. The fine was wrongly assigned.',
      },
      {
        id: 102,
        studentId: 'S67890',
        studentName: 'Maria Santos',
        liabilityType: 'tuition',
        submissionDate: new Date().toISOString(),
        status: 'Pending',
        reason: 'My scholarship fully covers this fee.',
      },
      {
        id: 103,
        studentId: 'S11223',
        studentName: 'Chris Evans',
        liabilityType: 'fee',
        submissionDate: new Date().toISOString(),
        status: 'Approved',
        reason: 'Fee was duplicated in the system.',
      },
    ]);

    // State for Filter/Search
    const searchQuery = ref('');
    const filterStatus = ref('Pending');
    const filterDate = ref(null);

    // State for Dialog
    const showReviewDialog = ref(false);
    const currentAppeal = ref<AppealRecord | null>(null);
    const officerRemarks = ref('');

    // State for Table
    const loading = ref(false);
    const pagination = ref({
      sortBy: 'submissionDate',
      descending: true,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 3,
    });

    // Helper to determine badge color
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Pending':
          return 'orange';
        case 'Approved':
          return 'green';
        case 'Rejected':
          return 'red';
        default:
          return 'grey';
      }
    };

    // Function to open the dialog and load appeal details
    const openReviewDialog = (appeal: AppealRecord) => {
      currentAppeal.value = appeal;
      officerRemarks.value = ''; // Clear previous remarks
      showReviewDialog.value = true;
    };

    // Function to process the approval/rejection action
    const processAppeal = (action: 'Approved' | 'Rejected') => {
      if (!currentAppeal.value) return;

      if (!officerRemarks.value) {
        $q.notify({
          type: 'negative',
          message: `Remarks are required to ${action.toLowerCase()} elucidate the appeal process.`,
        });
        return;
      }

      // Find the index using the ID of the appeal currently being reviewed
      const index = appeals.value.findIndex((a) => a.id === currentAppeal.value?.id);

      // Check if item was found and update its status
      if (index !== -1) {
        // Ensure the retrieved element is not undefined before updating
        const appealToUpdate = appeals.value[index];
        if (appealToUpdate) {
          appealToUpdate.status = action; // Status update (Mock)
        }
      }

      showReviewDialog.value = false;
      officerRemarks.value = '';
    };

    // Placeholder functions for Q-Table data loading
    // FIX: Removed the unused parameter to resolve the "Expected 0 arguments, but got 1" error
    const fetchAppeals = () => {
      // Implementation for API call goes here

      // Mock delay
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 500);
    };

    const onRequest: QTableProps['onRequest'] = (props) => {
      // Safely assign pagination using spread operator to maintain 'rowsNumber: number'
      pagination.value = {
        ...(props.pagination || {}),
        rowsNumber: props.pagination?.rowsNumber || pagination.value.rowsNumber,
      };
      // FIX: The function signature is correctly defined here.
      fetchAppeals(); // Call without arguments
    };

    const handleFilterChange = () => {
      pagination.value.page = 1;

      // Create the minimal required properties object for manual calls
      const minimalProps: MinimalRequestProps = {
        pagination: pagination.value,
        getCellValue: () => null,
      };
      onRequest(minimalProps as RequestProp);
    };

    // Load initial data upon mounting
    onMounted(() => {
      // Create the minimal required properties object for initial call
      const minimalProps: MinimalRequestProps = {
        pagination: pagination.value,
        getCellValue: () => null,
      };
      onRequest(minimalProps as RequestProp);
    });

    return {
      appeals,
      columns,
      loading,
      pagination,
      searchQuery,
      filterStatus,
      filterDate,
      getStatusColor,
      openReviewDialog,
      processAppeal,
      showReviewDialog,
      currentAppeal,
      officerRemarks,
      onRequest,
      handleFilterChange,
    };
  },
});
</script>
