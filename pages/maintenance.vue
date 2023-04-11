<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <!-- <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item> -->
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <!-- <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item> -->
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon>
                <v-icon>mdi-note</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <!-- <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn> -->
              <!-- <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn> -->
            </v-toolbar>
            <v-card-text>
              <div class="my-1">
                <strong>Name: </strong><span v-html="selectedEvent.name"></span>
              </div>
              <div class="my-1">
                <strong>Part: </strong><span v-html="selectedEvent.part"></span>
              </div>
              <div class="my-1">
                <strong>Description: </strong
                ><span v-html="selectedEvent.details"></span>
              </div>
              <div class="my-1">
                <strong>Notes: </strong
                ><span v-html="selectedEvent.notes"></span>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="selectedEvent.color == 'green' ? true : false"
                class="success text-white"
                @click="changeMaintenanceStatus(1)"
              >
                <v-icon>mdi-check</v-icon> Done
              </v-btn>
              <v-btn
                :disabled="selectedEvent.color == 'red' ? true : false"
                class="warning text-white"
                @click="changeMaintenanceStatus(0)"
              >
                <v-icon>mdi-redo</v-icon> Undo
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        console.log(event, "event");
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange() {
      const events = [];

      this.$store.dispatch("getMaintenances").then((result) => {
        result.forEach((maintenance) => {
          events.push({
            id: maintenance.id,
            name: maintenance.property_code,
            start: new Date(maintenance.start_date),
            end: new Date(maintenance.end_date),
            details: maintenance.description,
            notes: maintenance.notes,
            part: maintenance.part,
            color: maintenance.has_been_fixed == 1 ? "green" : "red",
            timed: false,
          });
        });

        // result.available.forEach((maintenance) => {
        //   events.push({
        //     name: maintenance.property_code,
        //     start: new Date(maintenance.start_date),
        //     end: new Date(maintenance.start_end),
        //     details: maintenance.description,
        //     color: "red",
        //     timed: false,
        //   });
        // });
      });

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },

    async changeMaintenanceStatus(status) {
      await this.$axios
        .$post(`change-status/${this.selectedEvent.id}`, {
          has_been_fixed: status,
        })
        .then(async (result) => {
          this.updateRange();
          this.selectedOpen = false;
          this.$toast.success(`Property status has been changed.`);
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
  },
};
</script>

<style scoped></style>
