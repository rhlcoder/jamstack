const productos = document.querySelector('#productos');
const deseados = document.querySelector('#deseados');

const productoYaAgregado = (currentButton) => {
  currentButton.firstChild.replaceWith('El producto ya fue agregado');
  currentButton.style.setProperty('background', '#f98');
  setTimeout(() => {
    currentButton.firstChild.replaceWith('Agregar a la lista de deseados');
    currentButton.removeAttribute('style');
  }, 300);
};

// Para agragar a la lista de deseados uso el parent node como base
// y con un if, selecciono el children
productos.addEventListener('click', (event) => {
  if (event.target.nodeName === 'BUTTON') {
    const idProducto = `#${event.target.parentElement.id}`;
    const producto = document.querySelector(idProducto);
    if (document.querySelector(`${idProducto}-deseado`)) {
      const currentButton = event.target;
      productoYaAgregado(currentButton);
    } else {
      const copy = producto.cloneNode(true);
      copy.id += '-deseado';
      deseados.append(copy);
      copy.lastChild.textContent = 'Quitar de la lista de deseados';
    }
  }
});

const prioritySort = (event, item) => {
  if (item.nextSibling && event.shiftKey) {
    // deseados.insertBefore(item.nextSibling, item);
    item.nextSibling.after(item);
  } else if (item.previousSibling && !event.shiftKey) {
    // deseados.insertBefore(item, item.previousSibling);
    item.previousSibling.before(item);
  }
};

deseados.addEventListener('click', (event) => {
  // Para remover de la lista de deseados
  if (event.target.nodeName === 'BUTTON') {
    document.querySelector(`#${event.target.parentElement.id}`).remove();
  }

  // Para ordenar por prioridad
  if (event.target.nodeName === 'LI') {
    const item = document.querySelector(`#${event.target.id}`);
    prioritySort(event, item);
  }
});

// Modifico una variable en css, que se aplica al campo correspondiente
// Para cambiar el cursor cuando se aprieta shift
document.addEventListener('keydown', (event) => {
  if (event.shiftKey) {
    document.documentElement.style.setProperty('--cursor', 'url(down.png)');
  }
});

document.addEventListener('keyup', () => {
  document.documentElement.style.setProperty('--cursor', 'url(up.png)');
});

/* // Para cambiar el icono cuando se aprieta shift
document.addEventListener('keydown', (event) => {
  if (event.shiftKey) {
    document.documentElement.style.setProperty('--icono', '"⬇️"');
  }
});

document.addEventListener('keyup', () => {
  document.documentElement.style.setProperty('--icono', '"⬆️"');
}); */

// Para saber el valor de una variable en CSS, uso este codigo:
// console.log(getComputedStyle(document.documentElement).getPropertyValue('--icono'))
