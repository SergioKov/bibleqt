//====================================================================//
//  F U N C T I O N S - 2
//====================================================================//

function removeInnerTagsOfElement(elemento) {
    // Obtener todos los elementos hijos del elemento dado
    let hijos = elemento.childNodes;

    // Recorrer los elementos hijos
    for (let i = 0; i < hijos.length; i++) {
        let hijo = hijos[i];
        
        // Verificar si el hijo es un elemento y es una etiqueta 'a' o 'span'
        if (hijo.nodeType === 1) {
            // Eliminar el hijo
            elemento.removeChild(hijo);
        } else if (hijo.nodeType === 1) {
            // Si el hijo es un elemento pero no es 'a' o 'span', llamar recursivamente a la función para continuar revisando sus hijos
            removeInnerTagsOfElement(hijo);
        }
    }
    return elemento;
}

function removeTagsOfElement(elemento, the_tagName) {
    // Obtener todos los elementos hijos del elemento dado
    let hijos = elemento.childNodes;

    // Recorrer los elementos hijos
    for (let i = 0; i < hijos.length; i++) {
        let hijo = hijos[i];
        
        // Verificar si el hijo es un elemento y es una etiqueta 'a' o 'span'
        if (hijo.nodeType === 1 && hijo.tagName === the_tagName) {
            // Eliminar el hijo
            elemento.removeChild(hijo);
        } else if (hijo.nodeType === 1) {
            // Si el hijo es un elemento pero no es 'S', llamar recursivamente a la función para continuar revisando sus hijos
            removeTagsOfElement(hijo,the_tagName);
        }
    }
    return elemento;
}












