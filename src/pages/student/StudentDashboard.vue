<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="leftDrawer = !leftDrawer" />
        <q-toolbar-title>Student Dashboard</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawer" show-if-above bordered class="bg-grey-1">
      <q-scroll-area class="fit">
        <div class="q-pa-md">
          <q-card
            class="dashboard-card q-mb-md"
            clickable
            v-ripple
            @click="selectCard('Liabilities')"
          ></q-card>

          <div class="col-12 col-md-4">
            <q-card class="dashboard-card">
              <q-card-section>
                <div class="text-h6">Liabilities</div>
                <div class="text-caption text-grey-7">
                  View your assigned liabilities and details.
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn color="primary" label="View Liabilities" flat />
              </q-card-actions>
            </q-card>
          </div>

          <q-card
            class="dashboard-card q-mb-md"
            clickable
            v-ripple
            @click="selectCard('File Appeal')"
          >
          </q-card>
          <div class="col-12 col-md-4">
            <q-card class="dashboard-card">
              <q-card-section>
                <div class="text-h6">File Appeal</div>
                <div class="text-caption text-grey-7">Request reconsideration for a liability.</div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn color="warning" label="File Appeal" flat />
              </q-card-actions>
            </q-card>
          </div>

          <q-card
            class="dashboard-card q-mb-md"
            clickable
            v-ripple
            @click="selectCard('Proof of Payment')"
          >
          </q-card>

          <div class="col-12 col-md-4">
            <q-card class="dashboard-card">
              <q-card-section>
                <div class="text-h6">Proof of Payment</div>
                <div class="text-caption text-grey-7">Submit proof for online settlement.</div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn color="secondary" label="Submit Proof" flat />
              </q-card-actions>
            </q-card>
          </div>
        </div>

        <q-card
          class="dashboard-card q-mb-md"
          clickable
          v-ripple
          @click="selectCard('Status Updates')"
        >
          <div class="q-mt-xl">
            <div class="text-subtitle1 q-mb-sm">Status Updates</div>

            <q-card>
              <q-card-section>
                <div class="text-body2 text-grey-7">
                  Track your payment and appeal statuses here.
                </div>
              </q-card-section>

              <q-separator />

              <q-list bordered separator>
                <q-item>
                  <q-item-section>
                    <div class="text-body1">Payment</div>
                    <div class="text-caption text-positive">Status: Verified</div>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <div class="text-body1">Appeal</div>
                    <div class="text-caption text-warning">Status: Pending Review</div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </q-card>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page padding class="bg-grey-1 flex flex-center flex-column">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-card class="dashboard-card">
              <q-card-section>
                <div class="text-h6">Liabilities</div>
                <div class="text-caption text-grey-7">
                  View your assigned liabilities and details.
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn color="primary" label="View Liabilities" flat />
              </q-card-actions>
            </q-card>
          </div>

          <div class="col-12 col-md-4">
            <q-card class="dashboard-card">
              <q-card-section>
                <div class="text-h6">File Appeal</div>
                <div class="text-caption text-grey-7">Request reconsideration for a liability.</div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn color="warning" label="File Appeal" flat />
              </q-card-actions>
            </q-card>
          </div>

          <div class="col-12 col-md-4">
            <q-card class="dashboard-card">
              <q-card-section>
                <div class="text-h6">Proof of Payment</div>
                <div class="text-caption text-grey-7">Submit proof for online settlement.</div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn color="secondary" label="Submit Proof" flat />
              </q-card-actions>
            </q-card>
          </div>
        </div>

        <div class="q-mt-xl">
          <div class="text-subtitle1 q-mb-sm">Status Updates</div>

          <q-card>
            <q-card-section>
              <div class="text-body2 text-grey-7">Track your payment and appeal statuses here.</div>
            </q-card-section>

            <q-separator />

            <q-list bordered separator>
              <q-item>
                <q-item-section>
                  <div class="text-body1">Payment</div>
                  <div class="text-caption text-positive">Status: Verified</div>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <div class="text-body1">Appeal</div>
                  <div class="text-caption text-warning">Status: Pending Review</div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'StudentDashboard',
  setup() {
    const leftDrawer = ref(false);

    function selectCard(name: string) {
      alert(`You clicked ${name}!`);
    }

    return { leftDrawer, selectCard };
  },
});
</script>

<style scoped>
.dashboard-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}
</style>
