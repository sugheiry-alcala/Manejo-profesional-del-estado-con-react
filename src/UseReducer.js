import React from "react";


const SEGURITY_CODE = 'petunias';

function UseReducer({ name }) {
  const [state, dispactch] = React.useReducer(reducer, initialState);

  const onConfirm = () => dispactch({ type: actionTypes.confirm });
  const onError = () => dispactch({ type: actionTypes.error });
  const onCheck = () => dispactch({ type: actionTypes.check });
  const onDelete = () => dispactch({ type: actionTypes.delete });
  const onReset = () => dispactch({ type: actionTypes.reset });
  const onWrite = (event) => {
    dispactch({ type: actionTypes.write, payload: event.target.value });
  }

  React.useEffect(() => {
    console.log("Empezando el efecto")

    if (!!state.loading) {
      setTimeout(() => {
        console.log("haciendo la validación")

        if (state.value === SEGURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }

        console.log("Terminado la validación")
      }, 3000);
    }
    console.log("terminando el efecto")
  }, [state.loading]);

  if (!state.delete && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>
          Por favor, escribe el código de seguridad para comprobar que quieres eliminar
        </p>
        {(state.error && !state.loading) && (
          <p>Error: el código es incorrecto</p>
        )}
        {state.loading && (
          <p>Cargando...</p>
        )}
        <input
          placeholder="Código de Seguridad"
          value={state.value}
          onChange={onWrite}
          />
        <button onClick={onCheck}>
          Comprobar</button>
      </div>
    );
  } else if (!!state.confirmed && !state.delete) {
    return (
      <React.Fragment>
        <p>Pedimos confirmación. ¿Estas seguro?</p>
        <button onClick={onDelete}>
          Si, Eliminar
        </button>
        <button onClick={onReset}>
          No, Volver
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito!!!</p>
        <button onClick={onReset}>
          Resetear, volver atrás
        </button>
      </React.Fragment>
    );
  }
}
const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  delete: 'DELETE',
  write: 'WRITE',
  reset: 'Reset',
  check: 'CHECK',
};

const initialState = {
  value: '',
  error: false,
  loading: false,
  delete: false,
  confirmed: false,
};

// const reducer= (state, action) =>{

// };

// const reducer = (state, action) => {
//   if (action.type === 'ERROR') {
//     return {
//       ...state,
//       error: true,
//       loading: false,
//     };
//   } else if (action.type === 'CHECK') {
//     return {
//       ...state,
//       loading: true,
//     };
//   } else {
//     return {
//       ...state,
//     };
//   }
// };

// const reducerSwitch = (state, action) => {
//   switch (action.type) {
//     case 'ERROR':
//       return {
//         ...state,
//         error: true,
//         loading: false,
//       };
//     case 'CHECK':
//       return {
//         ...state,
//         error: true,
//         loading: true,
//       };
//     default:
//       return {
//         ...state,
//       };
//   }
// };

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.delete]: {
    ...state,
    delete: true,
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    delete: false,
    value: '',
  }
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};


export { UseReducer };