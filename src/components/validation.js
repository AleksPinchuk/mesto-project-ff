const showInputError = ({
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
  errorMessage,
}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = ({
  formElement,
  inputElement,
  errorClass,
  inputErrorClass,
}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = ({
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
}) => {
  if (inputElement.validity.patternMismatch) {
    // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
    // HTML мы писали в kebab-case, это не опечатка)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError({
      formElement,
      inputElement,
      errorMessage: inputElement.validationMessage,
      errorClass,
      inputErrorClass,
    });
  } else {
    hideInputError({
      formElement,
      inputElement,
      errorClass,
      inputErrorClass,
    });
  }
};

const setEventListeners = ({
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState({
    inputList,
    submitButtonElement,
    inactiveButtonClass,
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity({
        formElement,
        inputElement,
        inputErrorClass,
        errorClass,
      });
      // чтобы проверять его при изменении любого из полей
      toggleButtonState({
        inputList,
        submitButtonElement,
        inactiveButtonClass,
      });
    });
  });
};

export const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners({
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    })
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  }
  );
};

const toggleButtonState = ({
  inputList,
  submitButtonElement,
  inactiveButtonClass,
}) => {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.classList.add(inactiveButtonClass);
    submitButtonElement.disabled = true;
  } else {
    submitButtonElement.classList.remove(inactiveButtonClass);
    submitButtonElement.disabled = false;
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


// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

