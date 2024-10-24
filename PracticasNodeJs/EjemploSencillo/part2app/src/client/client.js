import { validate } from "./client_validation";

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("age_form").onsubmit = (ev => {
        const data = new FormData(ev.target);
        const nameValid = validate("name", data)
            .required()
            .minLength(3);
            
        const ageValid = validate("age", data)
            .isInteger();

        const phoneValid = validate("phone", data)
            .required()
            .minLength(10);

        const allValid = [nameValid, ageValid, phoneValid].flatMap(v_result =>
            Object.entries(v_result.results).map(([test, valid]) => {
                const e = document.getElementById(
                    `err_${v_result.propertyName}_${test}`);
                e.classList.add("bg-dark-subtle");
                e.style.display = valid ? "none" : "block";
                return valid
            })).every(v => v === true);
        if (!allValid) {
            ev.preventDefault();
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