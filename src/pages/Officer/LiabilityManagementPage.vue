<template>
  <q-page class="q-pa-lg">
    <div class="row items-center q-mb-md">
      <div class="col-12 col-md-6">
        <div class="text-h4 text-primary">Manage All Student Liabilities</div>
        <div class="text-subtitle1 text-grey-7">
          Comprehensive view of all active and paid liabilities in the system.
        </div>
      </div>

      <div class="col-12 col-md-6 text-right">
        <q-btn
          color="green"
          icon="add"
          label="Add New Liability"
          class="q-px-md"
          @click="showAddLiabilityDialog = true"
        />
      </div>
    </div>

    <q-separator class="q-mb-lg" />

    <q-card flat bordered class="q-pa-md q-mb-lg">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-input
            v-model="searchQuery"
            label="Search Student ID or Name"
            dense
            clearable
            @update:model-value="handleFilterChange"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div class="col-6 col-md-3">
          <q-select
            v-model="filterType"
            :options="['All', 'tuition', 'fee', 'fine', 'other']"
            label="Filter by Type"
            dense
            clearable
            @update:model-value="handleFilterChange"
          />
        </div>

        <div class="col-6 col-md-3">
          <q-select
            v-model="filterStatus"
            :options="['All', 'Unpaid', 'Paid', 'Cancelled']"
            label="Filter by Status"
            dense
            clearable
            @update:model-value="handleFilterChange"
          />
        </div>

        <div class="col-12 col-md-2">
          <q-input
            v-model="filterDueDate"
            label="Filter by Due Date"
            type="date"
            dense
            @update:model-value="handleFilterChange"
          />
        </div>
      </div>
    </q-card>

    <q-table
      title="All Liabilities"
      :rows="allLiabilities"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :pagination="pagination"
      @request="onRequest"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="edit"
            size="sm"
            flat
            dense
            color="primary"
            @click="editLiability(props.row)"
          />
          <q-btn
            v-if="props.row.status === 'Unpaid'"
            icon="paid"
            size="sm"
            flat
            dense
            color="green"
            @click="markAsPaid(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showAddLiabilityDialog">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Add New Liability Form</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>Form to create a new liability record will be implemented here (Sprint 3).</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn label="Save Liability" color="green" disabled />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useLiabilityStore } from 'src/stores/liability-store';
import { storeToRefs } from 'pinia';
import type { QTableProps } from 'quasar';
import { useQuasar } from 'quasar';
import type {
  Liability,
  LiabilityControllerFindAllStatusEnum,
  LiabilityControllerFindAllSortOrderEnum,
} from 'src/services/sdk';

// --- TYPE DEFINITIONS FOR FIXING ERRORS ---
// FIX: Define the parameter type for onRequest using the correct utility type
type RequestProp = NonNullable<Parameters<NonNullable<QTableProps['onRequest']>>[0]>;

// FIX: Define the required structure for manual onRequest calls
type MinimalRequestProps = Pick<RequestProp, 'pagination' | 'getCellValue'> & { filter?: unknown };

// Define the precise type for the columns array
const columns: QTableProps['columns'] = [
  {
    name: 'studentUsername',
    required: true,
    label: 'Student ID',
    align: 'left',
    field: (row: Liability) => row.student.username,
    sortable: true,
  },
  {
    name: 'studentName',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row: Liability) => `${row.student.firstName} ${row.student.lastName}`,
    sortable: true,
  },
  { name: 'type', label: 'Type', align: 'left', field: 'type', sortable: true },
  {
    name: 'amount',
    label: 'Amount',
    align: 'right',
    field: 'amount',
    sortable: true,
    format: (val: number) => `₱ ${val.toFixed(2)}`,
  },
  { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true },
  {
    name: 'dueDate',
    label: 'Due Date',
    align: 'left',
    field: 'dueDate',
    sortable: true,
    format: (val: string) => (val ? new Date(val).toLocaleDateString() : 'N/A'),
  },
  { name: 'actions', label: 'Actions', align: 'center', field: 'actions' },
];

export default defineComponent({
  name: 'LiabilityManagementPage',
  setup() {
    const $q = useQuasar();
    const liabilityStore = useLiabilityStore();
    const { liabilities: allLiabilities, loading } = storeToRefs(liabilityStore);

    // State for Search and Filter
    const searchQuery = ref('');
    const filterType = ref('All');
    const filterStatus = ref('All');
    const filterDueDate = ref(null);

    const showAddLiabilityDialog = ref(false);

    // State for pagination (Must be number for rowsNumber)
    const pagination = ref({
      sortBy: 'createdAt',
      descending: true,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 100, // Initialize with a number
    });

    const fetchLiabilities = (props: { pagination: QTableProps['pagination'] }) => {
      const { page, rowsPerPage, sortBy, descending } = props.pagination || {};

      const statusFilterValue = filterStatus.value === 'All' ? undefined : filterStatus.value;
      const sortOrderValue = descending ? 'DESC' : 'ASC';

      const queryParams = {
        page: page || 1,
        limit: rowsPerPage || 10,
        sortBy: sortBy as string,

        sortOrder: sortOrderValue as LiabilityControllerFindAllSortOrderEnum,

        studentUsername: searchQuery.value,
        status: statusFilterValue as LiabilityControllerFindAllStatusEnum | undefined,
      };

      liabilityStore
        .fetchAllLiabilities(queryParams)
        .then(() => {
          // Handle total count update if API provides it
        })
        .catch((error) => {
          $q.notify({
            type: 'negative',
            message: 'Failed to load liabilities.',
            caption: error.message,
          });
        });
    };

    // Handler for Q-Table request (pagination and sorting)
    const onRequest: QTableProps['onRequest'] = (props) => {
      // FIX 1: Use spread operator and nullish coalescence to safely update pagination.
      // This ensures the strict 'rowsNumber: number' property is always satisfied.
      pagination.value = {
        ...(props.pagination || {}),
        rowsNumber: props.pagination?.rowsNumber || pagination.value.rowsNumber,
      };

      fetchLiabilities(props);
    };

    // Handler for manual filter changes (FIX for Error 2)
    const handleFilterChange = () => {
      pagination.value.page = 1;

      // FIX for Errors 2 & 3: Create the minimal required properties object
      const minimalProps: MinimalRequestProps = {
        pagination: pagination.value,
        getCellValue: () => null,
      };

      // Use the proper Quasar type for the call
      onRequest(minimalProps as RequestProp);
    };

    // Actions for buttons (Placeholder for future implementation)
    const editLiability = (liability: Liability) => {
      $q.notify({ message: `Editing Liability ID: ${liability.id}` });
    };

    const markAsPaid = (liability: Liability) => {
      $q.notify({ message: `Marking Liability ID: ${liability.id} as Paid (TODO: API Call)` });
    };

    // Fetch initial data on component load (FIX for Error 3)
    onMounted(() => {
      const minimalProps: MinimalRequestProps = {
        pagination: pagination.value,
        getCellValue: () => null,
      };
      onRequest(minimalProps as RequestProp);
    });

    return {
      columns,
      allLiabilities,
      loading,
      pagination,
      onRequest,
      searchQuery,
      filterType,
      filterStatus,
      filterDueDate,
      handleFilterChange,
      editLiability,
      markAsPaid,
      showAddLiabilityDialog,
    };
  },
});
</script>

<style scoped>
.dashboard-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>
