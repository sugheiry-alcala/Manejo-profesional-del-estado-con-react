import React from "react";


const SEGURITY_CODE = 'petunias';

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
    delete: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState({
      ...state,
      loading: false,
      confirmed: true,
    });
  };
  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  };
  const onWrite = (newValue) => {
    setState({
      ...state,
      error: false,
      value: newValue,
    });
  };
  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
  };
  const onDelete =() => {
    setState({
      ...state,
      delete: true,
    });
  };
  const onReset = () =>{
    setState({
      ...state,
      confirmed: false,
      delete:false,
      value: '',
    });
  };

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
          onChange={(event) => {
            onWrite(event.target.value);
          }} />
        <button onClick={() => {
          onCheck();
        }}
        >Comprobar</button>

      </div>
    );
  } else if (!!state.confirmed && !state.delete) {
    return (
      <React.Fragment>
        <p>Pedimos confirmación. ¿Estas seguro?</p>
        <button onClick={() => {
          onDelete();
        }}
        >
          Si, Eliminar
        </button>
        <button onClick={() => {
          onReset();
        }}
        >No, Volver
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito!!!</p>
        <button onClick={() => {
          onReset();
        }}
        >
          Resetear, volver atrás
        </button>
      </React.Fragment>
    );
  }
}
export { UseState };