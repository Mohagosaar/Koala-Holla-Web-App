console.log("js");

function getKoalas() {
  axios
    .get("/koala")
    .then((response) => {
      saveKoala(response.data);
      console.log("in getKoalas");
    })
    .catch((error) => {
      console.log(error);
    });
  // axios call to server to get koalas
}

function saveKoala(koalas) {
  let table = document.getElementById("displaydata");
  koalas.forEach((koala) => {
    table.innerHTML += `<tr>
                          <td>${koala.id}</td>
                          <td>${koala.name}</td>
                          <td>${koala.favorite_color}</td>
                          <td>${koala.age}</td>
                          <td>${koala.ready_to_transer}</td>
                          <td>${koala.notes}</td>
                        </tr>`;
  });
  console.log("in saveKoala");
}

getKoalas();
