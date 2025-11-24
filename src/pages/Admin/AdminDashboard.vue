<template>
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
