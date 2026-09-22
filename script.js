document.addEventListener("DOMContentLoaded", () => {

  /*
    Permite marcar solamente una opción
    dentro de cada grupo de casillas.
  */

  document.querySelectorAll("[data-check]").forEach(box => {

    box.addEventListener("change", () => {

      if (box.checked) {

        document
          .querySelectorAll(
            `[data-check="${box.dataset.check}"]`
          )
          .forEach(x => {

            if (x !== box) {
              x.checked = false;
            }

          });

      }

    });

  });

});


/*
  Función para imprimir o guardar
  la solicitud como PDF.
*/

function imprimir() {
  window.print();
}
