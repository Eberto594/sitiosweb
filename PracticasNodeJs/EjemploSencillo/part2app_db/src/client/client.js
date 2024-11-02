import { validate } from "./client_validation";

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("age_form").onsubmit = (ev => {
        const data = new FormData(ev.target);
    const nameValid = validate("name", data).required();
    const lastnameValid = validate("lastname", data).required();
    const phoneValid = validate("phone", data).required().exactLength(10);

    const allValid = [nameValid, lastnameValid, phoneValid].flatMap((v_result) =>
        Object.entries(v_result.results).map(([test, valid]) => {
            const e = document.getElementById(`err_${v_result.propertyName}_${test}`);
            if (e) {  // Verifica si el elemento existe
                e.classList.add("bg-dark-subtle");
                e.style.display = valid ? "none" : "block";
            }
            return valid;
        })
    ).every((v) => v === true);

    if (!allValid) {
        ev.preventDefault();
    } else {
        console.log("Form is valid, allowing submission.");
    }
    });

    

    // Confirmación de borrado
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const contactId = this.dataset.id; // Obtén el id del contacto del dataset
            const confirmed = confirm("¿Estás seguro de que deseas eliminar este contacto?");
            if (confirmed) {
                document.getElementById(`delete-form-${contactId}`).submit();
            }
            // Si se cancela, simplemente no se hace nada
        });
    });
});