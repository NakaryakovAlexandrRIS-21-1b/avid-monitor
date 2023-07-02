<template>
  <v-card class="wrapper" style="padding: 10px;">
    <div>
      <div style="display: flex; flex-wrap: nowrap; text-align: center;">
        <v-container style="text-align: center;">
          <v-icon icon="mdi-identifier"></v-icon>
          <v-card-title>{{ content.ID }}</v-card-title>
        </v-container>
        <v-container>
          <v-progress-circular :indeterminate="this.content.CPU ? false : true"
            :model-value="this.content.CPU?.replace('%', '') / 20" size="64" color="success">{{ this.content.CPU
            }}</v-progress-circular>
        </v-container>
        <v-container>
          <v-progress-circular :indeterminate="this.content.RAM ? false : true"
            :model-value="this.content.RAM?.replace('Gb', '') / 0.6" size="64" color="warning">
            {{ this.content.RAM }}
          </v-progress-circular>
        </v-container>
      </div>
      <div>
        <v-divider style="margin-top: 5px; margin-bottom: 5px;"></v-divider>
        SLAVES: {{ content.SLAVES }}
        <v-divider style="margin-top: 5px; margin-bottom: 5px;"></v-divider>
        <div style="display: flex; text-align: center; justify-content: space-around;">
          SWAP: {{ content.SWAP }}
          <v-divider vertical style="margin-left: 5px; margin-right: 5px;"></v-divider>
          MASTER: {{ content.MASTER }}
          <v-divider vertical style="margin-left: 5px; margin-right: 5px;"></v-divider>
          NODES: {{ content.NODES }}
        </div>
        <v-divider style="margin-top: 5px; margin-bottom: 5px;"></v-divider>
        <div style="display: flex; justify-content: space-around;">
          <div>
            <p>TASKS:</p>
            <li v-for="t in content.TASKS?.split(',')">{{ t }}</li>
          </div>

          <v-divider style="margin-left: 5px; margin-right: 5px;" vertical></v-divider>
          <div>
            <p>JOBNAME:</p>
            <p v-for="t in content.JOBNAME?.split('/')">{{ t }}/</p>
          </div>

        </div>

      </div>
    </div>






  </v-card>
</template>

<script>
export default {
  props: ['content'],
}
</script>

<style lang="scss" scoped></style>