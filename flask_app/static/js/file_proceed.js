const addFileChangeListener = (inputId, spanId, stepNumber) => {
  const fileInput = document.getElementById(inputId);
  const spanElement = document.getElementById(spanId);
  
  fileInput.addEventListener('change', function() {
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      spanElement.textContent = fileName;
      markStepComplete(stepNumber); // Call function to mark step as complete
    } else {
      spanElement.textContent = '';
    }
  });
};

const markStepComplete = (stepNumber) => {
  const circles = document.querySelectorAll(`#step${stepNumber} .step-circle`);
  circles.forEach((circle) => {
    circle.innerHTML = `<img src="/static/image/correct.svg" alt="">`;
    circle.style.backgroundColor = "#81689D";
  });

  const stepLine = document.querySelector(`#step${stepNumber} .step-line`);
  stepLine.style.backgroundColor = "#81689D";
};

addFileChangeListener('reconed-file', 'reconed-file-span', 1); // Pass step number 1 for reconed file
addFileChangeListener('bank-file', 'bank-file-span', 2); // Pass step number 2 for bank file
addFileChangeListener('merchant-file', 'merchant-file-span', 3); // Pass step number 3 for bank file
addFileChangeListener('ledger-report-file', 'ledger-report-file-span', 4); // Pass step number 4 for ledger report file
addFileChangeListener('lms-report-file', 'lms-report-file-span', 5); // Pass step number 5 for LMS report file

let currentStep = 1;
const steps = document.querySelectorAll(".step");

function showStep(stepNumber) {
  steps.forEach((step) => step.classList.remove("active"));
  document.getElementById(`step${stepNumber}`).classList.add("active");
}

function updateProgressStep(stepName) {
  // Assuming 'Calendar Date' is the name of the step for selecting a date
  if (stepName === 'Calendar Date') {
    markStepComplete(6); // Mark the fifth step as complete
  }
}


// Open_Modal
// $(document).ready(function () {
//   $("#openModalBtn").click(function () {
//     $("#fileInfoModal").modal("show");
//   });
// });
$(document).ready(function () {
  // Initialize DataTable
  var table = $("#datatable").DataTable({
    responsive: true,
    dom:
      "<'row'<'col-sm-12 col-md-4 d-flex align-items-center'f><'col-sm-12 col-md-4 filter-buttons'><'col-sm-12 col-md-4 d-flex justify-content-end'B>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    buttons: [
      {
        extend: "excelHtml5",
        text: '<span>Download<img src="/static/image/download.svg" alt="" class="ms-3"></span>',
        title: "Download",
        className: "no-border",
      },
    ],
    language: {
      search: "", // Removes the 'Search' label
      searchPlaceholder: "Search...",
    },
    // Custom search function for date range filtering
    initComplete: function () {
      var api = this.api();
      $(".date-range-filter input").on(
        "apply.daterangepicker",
        function (ev, picker) {
          var startDate = picker.startDate;
          var endDate = picker.endDate;
          $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
            var date = moment(data[0], "MM/DD/YYYY");
            if (startDate <= date && date <= endDate) {
              return true;
            }
            return false;
          });
          table.draw();
        }
      );

      $(".date-range-filter input").on(
        "cancel.daterangepicker",
        function (ev, picker) {
          $(this).val("");
          $.fn.dataTable.ext.search.pop();
          table.draw();
        }
      );
    },
  });

  $(".dataTables_filter").addClass("float-start");
  $(".dt-buttons").addClass("float-end");

  // Add Date Range Picker next to the DataTable search input
  $(
    "<div class='date-range-filter float-start ms-2'><input type='text' class='date-range-input-with-icon' readonly placeholder='Select date range'></div>"
  ).insertAfter(".dataTables_filter");

  // Initialize Date Range Picker
  $(".date-range-filter input").daterangepicker({
    autoUpdateInput: false,
    locale: {
      cancelLabel: "Clear"
    },
  });
});
