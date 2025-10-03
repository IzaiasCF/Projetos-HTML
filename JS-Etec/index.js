function meuCallback(response) {
  // Quando o $.ajax finalizar
  // a requisição, este método
  // será executado

  // TODO faz alguma coisa
  console.log(response);
}

$.ajax({
  dataType: "json",
  url: url,
  data: data,
  success: meuCallback, // << callback
});
