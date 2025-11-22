<template>
  <q-page class="q-pa-md bg-grey-1">
    <div class="row q-mb-md items-center">
      <div class="col">
        <div class="text-h5 text-blue-10 text-weight-bold">Dashboard Overview</div>
        <div class="text-subtitle2 text-grey-7">Welcome back, Administrator!</div>
      </div>
      <div class="col-auto">
        <q-btn color="primary" icon="add" label="New Liability" no-caps unelevated />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-4">
        <q-card class="my-card text-white bg-gradient-blue">
          <q-card-section>
            <div class="text-h6">Total Students</div>
            <div class="text-h3 text-weight-bolder q-mt-sm">1,245</div>
          </q-card-section>
          <q-card-section class="row items-center justify-end q-pt-none">
            <q-icon name="school" size="4em" style="opacity: 0.3" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <q-card class="my-card bg-white text-primary shadow-2">
          <q-card-section>
            <div class="text-h6 text-grey-8">Active Liabilities</div>
            <div class="text-h3 text-weight-bolder text-red-8 q-mt-sm">₱ 45,200</div>
          </q-card-section>
          <q-card-section class="row items-center justify-end q-pt-none">
            <q-icon name="money_off" color="red-8" size="4em" style="opacity: 0.2" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <q-card class="my-card bg-white text-primary shadow-2">
          <q-card-section>
            <div class="text-h6 text-grey-8">Pending Appeals</div>
            <div class="text-h3 text-weight-bolder text-orange-8 q-mt-sm">18</div>
          </q-card-section>
          <q-card-section class="row items-center justify-end q-pt-none">
            <q-icon name="pending_actions" color="orange-8" size="4em" style="opacity: 0.2" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <q-card class="shadow-2">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6 text-blue-9">User Management</div>
            <q-space />
            <q-input
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search User..."
              color="primary"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn color="primary" icon="person_add" label="Add User" flat class="q-ml-md" />
          </q-card-section>

          <q-card-section>
            <q-table
              :rows="users"
              :columns="columns"
              row-key="id"
              :filter="filter"
              flat
              bordered
              :pagination="pagination"
            >
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-badge :color="props.row.status === 'Active' ? 'green' : 'red'">
                    {{ props.row.status }}
                  </q-badge>
                </q-td>
              </template>

              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn flat round color="blue" icon="edit" size="sm">
                    <q-tooltip>Edit User</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    color="red"
                    icon="block"
                    size="sm"
                    @click="deactivateUser(props.row)"
                  >
                    <q-tooltip>Deactivate</q-tooltip>
                  </q-btn>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar, type QTableColumn } from 'quasar';

// --- DATA TYPES ---
interface User {
  id: number;
  studentId: string;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
}

// --- VARIABLES ---
const $q = useQuasar();
const filter = ref(''); // For the search bar

// REMOVED: "leftDrawerOpen" and "toggleLeftDrawer" (MainLayout handles this now!)

// --- TABLE CONFIG ---
const columns: QTableColumn[] = [
  { name: 'id', align: 'left', label: 'ID Number', field: 'studentId', sortable: true },
  { name: 'name', align: 'left', label: 'Full Name', field: 'name', sortable: true },
  { name: 'role', align: 'left', label: 'Role', field: 'role', sortable: true },
  { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
  { name: 'actions', align: 'center', label: 'Actions', field: 'studentId' },
];

const pagination = ref({
  rowsPerPage: 5,
});

const users = ref<User[]>([
  { id: 1, studentId: '2021-00123', name: 'Juan Dela Cruz', role: 'Student', status: 'Active' },
  { id: 2, studentId: '2020-04512', name: 'Maria Clara', role: 'Student', status: 'Active' },
  { id: 3, studentId: 'EMP-9921', name: 'Mr. Pedro Santos', role: 'Officer', status: 'Active' },
  {
    id: 4,
    studentId: '2022-00111',
    name: 'Crisostomo Ibarra',
    role: 'Student',
    status: 'Inactive',
  },
  { id: 5, studentId: 'EMP-1102', name: 'Ms. Sisa Baliw', role: 'Officer', status: 'Active' },
]);

// --- FUNCTIONS ---
function deactivateUser(row: User) {
  $q.dialog({
    title: 'Confirm Deactivation',
    message: `Are you sure you want to deactivate ${row.name}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    row.status = 'Inactive';
    $q.notify({
      color: 'negative',
      message: `${row.name} has been deactivated`,
      icon: 'report_off',
    });
  });
}
</script>

<style scoped>
.my-card {
  transition: transform 0.3s;
}
.my-card:hover {
  transform: translateY(-5px);
}
.bg-gradient-blue {
  background: linear-gradient(135deg, #1976d2 0%, #0d47a1 100%);
}
</style>
