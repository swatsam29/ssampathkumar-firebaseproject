import { modalInfobox } from "./elements.js";
export function info(tittle, body, closeModal){
    if (closeModal) closeModal.hide();
    modalInfobox.tittle.innerHTML = tittle;
    modalInfobox.body.innerHTML = body;
    modalInfobox.modal.show();
}

export function disableButton(button) {
    button.disabled = true;
    const orginalLabel = button.innerHTML ; 
    button.innerHTML = 'Wait...';
    return orginalLabel ;
}
export function enableButton(button, label) {
    if (label) button.innerHTML = label ;
    button.disabled = false ;
}