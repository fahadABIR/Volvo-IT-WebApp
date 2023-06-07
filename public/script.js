window.onload = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/get-data', true);

  xhr.onload = function() {
      if (this.status == 200) {
          var response = JSON.parse(this.responseText);
          if (response.error) {
              console.error(response.error);
              // TODO: Display an error message to the user
          } else {
              populateTable(response);
          }window.onload = function () {
            fetchData();
          };
          
          function fetchData() {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/get-data', true);
          
            xhr.onload = function () {
              if (this.status == 200) {
                var response = JSON.parse(this.responseText);
                if (response.error) {
                  console.error(response.error);
                  // TODO: Display an error message to the user
                } else {
                  populateTable(response);
                }
              }
            };
          
            xhr.send();
          }
          
          function populateTable(data) {
            var tableBody = document.querySelector("#data-table tbody");
            tableBody.innerHTML = "";
          
            data.forEach(function (row) {
              var newRow = document.createElement("tr");
              newRow.innerHTML = `
                <td>${row.customerName}</td>
                <td>${row.itemID}</td>
                <td>${row.dateTime}</td>
                <td>${row.comments}</td>
                <td>${row.emailPhone}</td>
                <td>${row.technician}</td>
              `;
          
              tableBody.appendChild(newRow);
            });
          }
          
      }
  }

  xhr.send();
}

function populateTable(data) {
  var tableBody = document.querySelector("#data-table tbody");

  data.forEach(function (row) {
      var newRow = document.createElement("tr");
      newRow.innerHTML = `
          <td>${row.customerName}</td>
          <td>${row.itemID}</td>
          <td>${row.dateTime}</td>
          <td>${row.comments}</td>
          <td>${row.emailPhone}</td>
          <td>${row.technician}</td>
      `;

      tableBody.appendChild(newRow);
  });
}
