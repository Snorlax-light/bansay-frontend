<template>
  <q-page>
    <div class="row q-col-gutter-md q-mb-lg q-pa-md">
      <div class="col-12 col-sm-auto">
        <q-btn
          color="primary"
          icon="people"
          label="User Management"
          to="/admin/users"
          size="lg"
          no-caps
        />
      </div>
      <div class="col-12 col-sm-auto">
        <q-btn
          color="secondary"
          icon="history"
          label="Audit Logs"
          size="lg"
          disable
          no-caps
        >
          <q-tooltip>Coming Soon</q-tooltip>
        </q-btn>
      </div>
    </div>
    <div>
      <TopStudents />
    </div>
    <div>
      <TopLiabilities />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import TopStudents from './widgets/TopStudents.vue';
import TopLiabilities from './widgets/TopLiabilities.vue';
</script>
