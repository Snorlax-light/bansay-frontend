<template>
  <q-page class="q-pa-md">
    <div class="user-management">
      <div class="management-content">
        <q-card class="users-section">
          <q-card-section>
            <div class="section-header">
              <div class="text-h5 text-primary">System Users</div>
              <div class="header-controls">
                <div class="search-container">
                  <q-input
                    v-model="searchQuery"
                    outlined
                    dense
                    placeholder="Search users..."
                    class="search-input"
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
                <q-btn
                  color="primary"
                  label="Refresh"
                  icon="refresh"
                  no-caps
                />
              </div>
            </div>

            <div class="users-table q-mt-md">
              <q-table
                flat
                bordered
                :rows="[]"
                :columns="columns"
                row-key="id"
                :rows-per-page-options="[5, 10, 20]"
              >
                <template v-slot:body>
                  <q-tr>
                    <q-td colspan="100%" class="text-center text-grey-6">
                      No users found
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchQuery = ref('')

const columns = [
  {
    name: 'username',
    required: true,
    label: 'Username',
    align: 'left' as const,
    field: 'username',
    sortable: true
  },
  {
    name: 'email',
    label: 'Email',
    align: 'left' as const,
    field: 'email',
    sortable: true
  },
  {
    name: 'role',
    label: 'Role',
    align: 'left' as const,
    field: 'role',
    sortable: true
  },
  {
    name: 'joined',
    label: 'Joined',
    align: 'left' as const,
    field: 'joined',
    sortable: true
  },
  {
    name: 'actions',
    label: 'Actions',
    align: 'center' as const,
    field: 'actions'
  }
]
</script>

<style scoped>
.user-management {
  max-width: 1200px;
  margin: 0 auto;
}

.users-section {
  border: 1px solid #e0e0e0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.search-container {
  min-width: 250px;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .search-container {
    width: 100%;
  }
}
</style>
