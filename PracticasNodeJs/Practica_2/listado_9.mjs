//USO DE LA API DE EVENTOS
const target = new EventTarget();

target.addEventListener('customEvent', (event) => {
    console.log(`${event.type} was triggered`);
});

const event = new Event('customEvent');
target.dispatchEvent(event);