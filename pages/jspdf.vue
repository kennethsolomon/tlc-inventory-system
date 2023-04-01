<template>
  <div>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default {
  data: () => ({
    data: [],
    body: [
      [
        "1",
        "EPSON WorkForce DS-1630 EPSON WorkForce DS-1630EPSON WorkForce DS-1630",
        "1 pc.",
        "24,000",
        "24,000",
        "Brand New",
      ],
      [
        "2",
        "Dell LED Monitor, Genius USB Keyboard & PS2 Mouse Black Silver Powerlogic System Unit Delkin AVR, Secure AVR Asus H61M-C Motherboard, Core i3 Processor , 8GB DDR3 Memory Card 500GB HHD",
        "1 set",
        "24,000",
        "24,000",
        "Brand New",
      ],
    ],
  }),
  computed: {},
  methods: {
    print() {
      const imageData = "/header.png";
      const doc = new jsPDF();

      doc.addImage(imageData, "png", 45, 0, 125, 25, "header");
      doc.text("Memorandum Receipt for IT Equipment", 55, 30);

      doc.setFontSize(9);
      doc.text("Department: Bed Registrar", 14, 40);
      doc.text("Bldg. Room No.: FJN BED Registrar's Office", 14, 45);
      doc.text("School Year: 2021-2022", 14, 50);

      doc.text("M.R. No.: MIS-2021-001", 155, 40);
      doc.text("DATE: 10/14/2023", 155, 45);

      this.body.push(
        [
          {
            content: "TIMOTHY JOSHUA C. PANGAN\nComputer Laboratory-In-Charge",
            colSpan: 2,
            styles: { halign: "center", valign: "center", minCellHeight: 30 },
          },
          {
            content:
              "I hereby certify that I receive the above item/s complete and in good condition and that I am liable / accountable for the equipment/s and its peripherals issued to me in case of loss or damage due to negligence.\n\n\n\nANALYN F. MANDANE\nBED Registrar",
            colSpan: 4,
            rowSpan: 3,
            styles: { halign: "center", minCellHeight: 30, cellPadding: 5 },
          },
        ],
        [
          {
            content:
              "MICHAEL ANGELO D. BROGADA\nDirector of Administrative Services",
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

      doc.save("table.pdf");
    },
  },
  mounted() {
    this.data = [
      {
        id: 2,
        property_code: "TLC-2023-001",
        serial_number: "123",
        purchase_date: "2023-03-26",
        brand: "test",
        model: "test",
        category: "test",
        description: "test",
        assigned_to: null,
        location: null,
        status: "On Stock",
        maintenance: "Quarterly",
        maintenance_description: "change oil",
        pending_lend: 0,
        init_transfer: 0,
        created_at: "2023-03-25T18:50:37.000000Z",
        deleted_at: null,
        updated_at: "2023-03-25T18:50:37.000000Z",
      },
    ];

    console.log(this.data, "data");

    this.print();
  },
};
</script>
