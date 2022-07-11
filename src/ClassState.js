import React from "react";
import { Loading } from './Loading';

const SEGURITY_CODE = 'petunias';


class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      error: false,
      loading: false,
    };
  }
  // UNSAFE_componentWillMount() {
  //   console.log("componentWillMount")
  // }
  // componentDidMount() {
  //   console.log("componentDidMount")
  // }
  componentDidUpdate() {
    console.log("Actualización");

    if (!!this.state.loading) {
      setTimeout(() => {
        console.log("haciendo la validación")

        if (SEGURITY_CODE === this.state.value) {
          this.setState({error:false,  loading: false });
        } else {
          this.setState({ error: true, loading: false })
        }
        console.log("Terminado la validación")
      }, 3000);
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>
          Por favor, escribe el código de seguridad para comprobar que quieres eliminar
        </p>
        {(this.state.error && !this.state.loading) && (
          <p>Error: el código es incorrecto</p>
        )}
        {this.state.loading && (
          <Loading />
        )}
        <input placeholder="Código de Seguridad"
          value={this.state.value}
          onChange={(event) => {
            this.setState({ value: event.target.value });
          }}
        />
        <button
          onClick={() => this.setState({ loading: true })}
        >Comprobar</button>
      </div>
    );
  }
}
export { ClassState };