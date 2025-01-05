const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
      // данные атрибута доступны у элемента инпута через ключевое слово dataset.
      // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
      // HTML мы писали в kebab-case, это не опечатка)
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
  inputElement.setCustomValidity("");
}

if (!inputElement.validity.valid) {
  showInputError(formElement, inputElement, inputElement.validationMessage);
} else {
  hideInputError(formElement, inputElement);
}
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};



export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset)
    });
  });
};

const hasInvalidInput = (inputList) => {

  return inputList.some((input) =>{

    return !input.validity.valid;
}
);
};

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add('button_inactive');
  } else {
    buttonElement.classList.remove('button_inactive');
  }
}


//Нужно изменить
// const isValid = (formElement, inputElement) => {
//   if (inputElement.validity.patternMismatch) {
//       // данные атрибута доступны у элемента инпута через ключевое слово dataset.
//       // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
//       // HTML мы писали в kebab-case, это не опечатка)
//   inputElement.setCustomValidity(inputElement.dataset.errorMessage);
// } else {
//   inputElement.setCustomValidity("");
// }

// if (!inputElement.validity.valid) {
//   showInputError(formElement, inputElement, inputElement.validationMessage);
// } else {
//   hideInputError(formElement, inputElement);
// }
// };

