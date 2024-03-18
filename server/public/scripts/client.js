let selectedRow = null;
let selectedId = "";
displayKoalla();
function preventDefault(event) {
  event.preventDefault();
}

function handleData() {
  if (selectedRow === null) {
    insertData();
    displayKoalla();
  } else {
    updateRecord();
    displayKoalla();
  }
}
function insertData() {
  if (checkEmpty()) {
    let errorMessageElement = document.querySelector(".empty p"); // Use querySelector for a single element
    errorMessageElement.innerHTML = "* Empty Fields not allowed"; // Set innerHTML of the element
  } else {https://l.facebook.com/l.php?u=AT2i63qY2dUzIU3RQaTWMMIMxLpoW2vVwGD-m_Saw7L_nEqB2s8U_MsdzM2k-2xijN39vMbDdgoESAtZ3YdUXv8VgkLfkaC2yIehpnhZM1wv2eIffWHlWCEtdD115ZKaN__tIYT_Dbo2wVWt5cE0377XWYdfPUmrHSvIHSkji8NM7MkodI6YFhkiGRYdQaX2KiDKcPh3E-jrJ7MRM3URFzf9no4Fx1Dddh_Fgtg-M72hnO2yoPTQWJn0_rCwI2dgs8EDF8a1798Q2cR2TvsGq4QOMjUehTvB8zJN8OCDjom1uzhBOkxCxbt5HkIXcZnn0k1eUPOV9kTxIvioy54l6SBhzm7n5LI2D_yxVoqa2q-GnS14OpSk7RqWeInfyHqCEUFV7kt1DiaZDQKo3CKB0GUhcLE_oxWbtsMtXE59zwsonQ&h=AT3YyTchGvYvfSRj4QLrUN8Gnw3ckte2GZS3R11FkEXKgiOGaDYzL_Ilo1w2osw0RstNGFSvBwCnqCC3oBeu3iLjoWnei10yTAGqw5tha_w_h9SmCCK60lEHAaZ5vL8X6dZ8b2gURsNV&__cft__%5B0%5D=AZU3sppolnU3vdZdLRkN-n67obh-IZn1QXNLJzkxCbL7msfgsDvow3aAyavdawVU4Tn54GoTjJ_PPB-Axb5Ao6sR2bwJ3tQVaL0_3g_La3pNid3v2wiucnPXFfeJImXEH7l8ybP1teGZk9Kk6pe9QPDX4edQiKIQNfJZGJSOFAfh84TImcCp_Soe3dF3sl0ShuNUoWD10-OmQ2aM3zfXer9rvtzuhd20NFiJwblqg7ZCbaSyB_T_A0i_-m3AmdbS1Ck3j7zigkaw9fk6s_YeXCDewZZB9yOCEg3rnW8vbX8W6Xujf0bG6Rf6ryaadr7KUwE&__tn__=H-R
    let ResidentName = document.getElementById("residentName").value;
    let FavoriteColor = document.getElementById("residentFavoriteColor").value;
    let Age = document.getElementById("residentAge").value;
    let Ready_transfer = document.getElementById("readyForTransfer").value;
    let Notes = document.getElementById("residentNote").value;
    let addtoKoala = {
      ResidentName,
      FavoriteColor,
      Age,
      Ready_transfer,
      Notes,
    };
    axios
      .post("/koala", addtoKoala)
      .then((response) => {
        console.log(response.data);
        displayKoalla(response.data);
      })
      .catch((error) => {
        console.log("Error Adding Data to Koala DB", error);
      });
  }
  clear();
}

function checkEmpty() {
  let residentName = document.getElementById("residentName").value;
  let residentAge = document.getElementById("residentAge").value;
  let residentFavoriteColor = document.getElementById(
    "residentFavoriteColor"
  ).value;
  let readyForTransfer = document.getElementById("readyForTransfer").value;
  let residentNotes = document.getElementById("residentNote").value;

  if (
    residentName === "" ||
    residentAge === "" ||
    residentFavoriteColor === "" ||
    readyForTransfer === "" ||
    residentNotes === ""
  ) {
    return true;
  }
}

function displayKoalla() {
  axios
    .get("/koala")
    .then((response) => {
      let display = response.data;
      let table = document
        .querySelector(".displaydata")
        .getElementsByTagName("tbody")[0];
      //Clear Exisiting rows
      table.innerHTML = "";
      display.forEach((item) => {
        let newRow = table.insertRow(table.length);
        let cellResidentID = newRow.insertCell(0);
        cellResidentID.innerHTML = `${item.id}`;
        let cellResidentName = newRow.insertCell(1);
        cellResidentName.innerHTML = `${item.ResidentName}`;
        let cellResidentFavColor = newRow.insertCell(2);
        cellResidentFavColor.innerHTML = `${item.FavoriteColor}`;
        let cellResidentAge = newRow.insertCell(3);
        cellResidentAge.innerHTML = `${item.Age}`;
        let cellResidentReadyTransfer = newRow.insertCell(4);
        let transfer = "";
        if (item.Ready_transfer === true) {
          transfer = "Y";
        } else {
          transfer = "N";
        }
        cellResidentReadyTransfer.innerHTML = `${transfer}`;
        let cellResidentNote = newRow.insertCell(5);
        cellResidentNote.innerHTML = `${item.Notes}`;
        let cellreadyTransfer = newRow.insertCell(6);

        if (item.Ready_transfer === true) {
          cellreadyTransfer.innerHTML = `<button  style="visibility:hidden"s class="Rtransferbtn">Ready for transfer</button>`;
        } else {
          cellreadyTransfer.innerHTML = `<button class="Rtransferbtn"; onClick="markReady(${item.id})">Ready for transfer</button>`;
        }
        let cellDelete = newRow.insertCell(7);
        cellDelete.innerHTML = `<button onClick="onDelete(${item.id})"; class = btndell >Delete</button>`;
        let cellEdit = newRow.insertCell(8);
        cellEdit.innerHTML = `<button onClick ="onEdit(this)"; class="editbtn">Edit</button>`;
      });
    })
    .catch((error) => {
      console.log("Unable to Retrieve Data from Database", error);
    });
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  selectedId = selectedRow.cells[0].innerHTML;
  document.getElementById("residentName").value =
    selectedRow.cells[1].innerHTML;
  document.getElementById("residentFavoriteColor").value =
    selectedRow.cells[2].innerHTML;
  document.getElementById("residentAge").value = selectedRow.cells[3].innerHTML;
  document.getElementById("readyForTransfer").value =
    selectedRow.cells[4].innerHTML;
  document.getElementById("residentNote").value =
    selectedRow.cells[5].innerHTML;
}

function clear() {
  document.getElementById("residentName").value = "";
  document.getElementById("residentAge").value = "";
  document.getElementById("residentFavoriteColor").value = "";
  document.getElementById("readyForTransfer").value = "";
  document.getElementById("residentNote").value = "";
  selectedRow = null;
}

function updateRecord() {
  console.log("Updated");
  let residentName = document.getElementById("residentName").value;
  let favoriteColor = document.getElementById("residentFavoriteColor").value;
  let age = document.getElementById("residentAge").value;
  let ready_transfer = document.getElementById("readyForTransfer").value;
  let notes = document.getElementById("residentNote").value;

  let updateRows = {
    selectedId,
    residentName,
    favoriteColor,
    age,
    ready_transfer,
    notes,
  };
  console.log(updateRows);
  axios
    .put(`/koala/${selectedId}`, updateRows)
    .then((response) => {
      console.log("Koala data updated successfully:", response.data);
      // Call displayKoalla or any other function to update the displayed data
      displayKoalla();
    })
    .catch((error) => {
      console.error("Error updating koala data:", error);
    });
}

function onDelete(koalaid) {
  if (confirm("Are you sure you want to delete this record ?")) {
    axios
      .delete(`/koala/delete/${koalaid}`)
      .then((response) => {
        console.log(response.send);
        displayKoalla();
      })

      .catch((error) => {
        console.log("Error unable to Delete", error);
      });
  }
}

function markReady(KoalaID) {
  axios
    .put(`/koala/transfer/${KoalaID}`)
    .then((response) => {
      console.log("Koala data transfered successfully:", response.data);
      // Call displayKoalla or any other function to update the displayed data
      displayKoalla();
    })
    .catch((error) => {
      console.error("Unable to  transfer koala data:", error);
    });
}
