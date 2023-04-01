<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title
          class="d-flex justify-space-between text-h5 primary white--text"
        >
          Generate MR
          <v-icon
            id="mrClose"
            @click="
              resetField();
              $emit('closeModal');
            "
            color="white"
            >mdi-close</v-icon
          >
        </v-card-title>
        <v-card-text class="d-flex flex-column justify-center"> </v-card-text>

        <div v-if="error" class="d-flex flex-column pa-5">
          Property selected needs to be transfer/lend first.
        </div>
        <div v-if="!error" class="d-flex flex-column pa-5">
          <v-text-field
            class="mt-3 mr-3"
            label="Name"
            hide-details
            v-model="name"
          ></v-text-field>
          <v-text-field
            class="mt-3 mr-3"
            label="Department"
            hide-details
            v-model="department"
          ></v-text-field>

          <v-text-field
            class="mt-3 mr-3"
            label="Bldg. or Room No."
            hide-details
            v-model="building_number"
          ></v-text-field>

          <v-text-field
            class="mt-3 mr-3"
            label="School Year"
            hide-details
            v-model="school_year"
          ></v-text-field>

          <!-- <v-text-field
            v-if="selectedRow.length == 1"
            class="mt-3 mr-3"
            label="M.R.No."
            disabled
            hide-details
            v-model="mr_number"
          ></v-text-field>

          <v-text-field
            v-if="selectedRow.length == 1"
            class="mt-3 mr-3"
            label="Date"
            disabled
            hide-details
            v-model="date"
          ></v-text-field> -->

          <v-text-field
            class="mt-3 mr-3"
            label="Issued by"
            hide-details
            v-model="issued_by"
          ></v-text-field>

          <v-text-field
            class="mt-3 mr-3"
            label="Approved by"
            hide-details
            v-model="approved_by"
          ></v-text-field>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="error" @click="$emit('closeModal')" color="primary">
            Go Back
          </v-btn>
          <v-btn v-if="!error" @click="print()" color="primary">
            <v-icon start small class="mr-1"> mdi-printer-pos</v-icon>
            Generate
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
export default {
  props: {
    dialog: Boolean,
    selectedRow: [Object, Array],
  },
  data: () => ({
    error: false,
    name: null,
    department: null,
    building_number: null,
    school_year: null,
    mr_number: null,
    date: null,
    issued_by: null,
    approved_by: null,

    data: [],
    body: [],
  }),

  methods: {
    generate() {
      const imageData = "/header.png";
      const doc = new jsPDF();

      doc.addImage(imageData, "png", 45, 0, 125, 25, "header");
      doc.text("Memorandum Receipt for IT Equipment", 55, 30);

      doc.setFontSize(9);
      doc.text("Department: " + this.department, 14, 40);
      doc.text("Bldg. Room No.: " + this.building_number, 14, 45);
      doc.text("School Year: " + this.school_year, 14, 50);

      doc.text("M.R. No.: " + this.mr_number, 155, 40);
      doc.text("DATE: " + this.date, 155, 45);

      this.body.push(
        [
          {
            content: this.issued_by + "\nComputer Laboratory-In-Charge",
            colSpan: 2,
            styles: { halign: "center", valign: "center", minCellHeight: 30 },
          },
          {
            content:
              "I hereby certify that I receive the above item/s complete and in good condition and that I am liable / accountable for the equipment/s and its peripherals issued to me in case of loss or damage due to negligence.\n\n\n\n" +
              this.name +
              "\n" +
              this.department,
            colSpan: 4,
            rowSpan: 3,
            styles: { halign: "center", minCellHeight: 30, cellPadding: 5 },
          },
        ],
        [
          {
            content: this.approved_by + "\nComputer Laboratory-In-Charge",
            colSpan: 2,
            styles: { halign: "center", valign: "center", minCellHeight: 30 },
          },
        ]
      );
      autoTable(doc, {
        theme: "plain",
        margin: { top: 57 },
        headStyles: {
          lineWidth: 1,
          lineColor: 1,
          valign: "middle",
          halign: "center",
        },
        bodyStyles: {
          font: "times",
          lineWidth: 1,
          lineColor: 1,
          minCellWidth: 15,
        },
        head: [
          [
            {
              content: "ITEM",
            },
            {
              content: "Description",
            },
            {
              content: "QTY",
            },
            {
              content: "UNIT COST",
            },
            {
              content: "AMOUNT",
            },
            {
              content: "REMARKS",
            },
          ],
        ],
        body: this.body,
      });

      doc.save("Memorandum Receipt.pdf");

      this.$emit("closeModal");

      this.$toast.success("M.R. Generated!");
    },
    resetField() {
      this.name = null;
      this.department = null;
      this.building_number = null;
      this.school_year = null;
      this.mr_number = null;
      this.date = null;
      this.issued_by = null;
      this.approved_by = null;
      this.data = [];
      this.body = [];
    },

    computeProperty(array) {
      // Create an empty object to store merged rows
      const mergedRows = {};

      // Loop through each row in the original array
      array.forEach((row) => {
        const [category, description, price, quantity, subtotal, remarks] = row;
        const key = `${category}-${description}-${price}`;

        // Check if a row with the same category, description, and price has already been merged
        if (mergedRows[key]) {
          // If so, add the subtotal to the existing merged row and increment the quantity
          mergedRows[key][4] += subtotal;
          mergedRows[key][3]++;
        } else {
          // Otherwise, create a new merged row with the subtotal and quantity from the original row
          mergedRows[key] = [
            category,
            description,
            quantity,
            price,
            subtotal,
            remarks,
          ];
        }
      });

      // Convert the merged rows object back to an array
      const mergedArray = Object.values(mergedRows);

      return mergedArray;
    },

    print() {
      this.selectedRow.forEach((element) => {
        this.mr_number = element.mr_number;
        this.date = element.f_date;
        let body_data = [];
        element.selected.forEach((property) => {
          // if (property.status == "On Stock") {
          //   this.error = true;
          //   this.$toast.error("Selected item/s not yet issued!");
          // }
          body_data.push([
            property.category,
            property.description,
            // JSON.stringify(
            //   property.unit_cost.toLocaleString("en-US", {
            //     style: "currency",
            //     currency: "PHP",
            //   })
            // ),
            property.unit_cost,
            1,
            property.unit_cost,
            "asdasd",
          ]);
        });
        this.body = this.computeProperty(body_data);
        this.generate();
        body_data = [];
      });

      this.resetField();
    },
    test() {
      console.log(this.selectedRow);
    },
  },

  mounted() {
    this.test();
  },
};
</script>
