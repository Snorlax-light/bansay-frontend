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
  <q-page class="q-pa-md">
    <div class="admin-dashboard">
      <div class="overview-grid">
        <q-card class="overview-card">
          <q-card-section class="flex items-center q-pa-md">
            <div class="card-content q-ml-md">
              <div class="text-h4 text-weight-bold">0</div>
              <div class="text-body2">Total Users</div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="overview-card">
          <q-card-section class="flex items-center q-pa-md">
            <div class="card-content q-ml-md">
              <div class="text-h4 text-weight-bold">0</div>
              <div class="text-body2">Pending Approvals</div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="overview-card">
          <q-card-section class="flex items-center q-pa-md">
            <div class="card-content q-ml-md">
              <div class="text-h4 text-weight-bold">0</div>
              <div class="text-body2">I dont know yet</div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="overview-card">
          <q-card-section class="flex items-center q-pa-md">
            <div class="card-content q-ml-md">
              <div class="text-h4 text-weight-bold">0</div>
              <div class="text-body2">I dont know yet</div>
            </div>
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
      <q-card class="admin-actions q-mt-lg">
        <q-card-section>
          <div class="text-h5 text-center text-primary q-mb-md">Admin Actions</div>

          <div class="action-grid">
            <q-card class="admin-action-card cursor-pointer" @click="navigateToUserManagement">
              <q-card-section class="text-center">
                <q-icon name="person" size="48px" color="primary" class="q-mb-sm" />
                <div class="text-h6 text-primary">User Management</div>
                <div class="text-body2 text-grey-7">Manage user roles and permissions</div>
              </q-card-section>
            </q-card>

            <q-card class="admin-action-card cursor-pointer" @click="navigateToPendingApprovals">
              <q-card-section class="text-center">
                <q-icon name="check_circle" size="48px" color="primary" class="q-mb-sm" />
                <div class="text-h6 text-primary">Pending Approvals</div>
                <div class="text-body2 text-grey-7">Review and approve Registrations</div>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="system-logs q-mt-lg">
        <q-card-section>
          <div class="text-h5 text-center text-primary q-mb-md">System Logs</div>

          <div class="logs-content">
            <p class="text-center text-grey-7">View system activity and logs</p>
          </div>
        </q-card-section>
      </q-card>
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
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToUserManagement = () => {
  router.push('/admin/user-management').catch(() => {

  })
}

const navigateToPendingApprovals = () => {
  router.push('/admin/pending-approvals').catch(() => {

  })
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
.admin-dashboard {
  max-width: 900px;
  margin: 0 auto;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.overview-card {
  background: linear-gradient(135deg, #1976D2, #1565C0);
  color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.overview-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(25, 118, 210, 0.4);
}


.card-content {
  color: white;
}

.admin-actions,
.system-logs {
  border: 1px solid #e0e0e0;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 18px;
}

.admin-action-card {
  border: 1.5px solid rgba(46, 139, 87, 0.2);
  transition: all 0.3s ease;
}

.admin-action-card:hover {
  transform: translateY(-3px);
  border-color: #2E8B57;
  box-shadow: 0 10px 25px rgba(46, 139, 87, 0.2);
}

.logs-content {
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
