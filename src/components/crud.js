import React, { Component } from "react";
import PersonasService from "../service/personas.service";

export default class crud extends Component {
  constructor(props) {
    super(props);
    
    this.retrieveTutorials = this.retrieveTutorials.bind(this);

    this.state = {
      clientes: [],
      currentIndex: -1,

    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  retrieveTutorials() {
    PersonasService.getAll()
      .then(response => {
        this.setState({
          clientes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { clientes, currentIndex } = this.state;

    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCliente}>
              Add
              </button>
          </div>
        ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  required
                  value={this.state.nombre}
                  onChange={this.onChangeNombre}
                  name="nombre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Apellido">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  required
                  value={this.state.apellido}
                  onChange={this.onChangeApellido}
                  name="apellido"
                />
              </div>

              <button onClick={this.saveTutorial} className="btn btn-success">
                Submit
              </button>

              <div className="col-md-6">
                <h4>lista de personas</h4>

                <ul className="list-group">
                  {clientes &&
                    clientes.map((cliente, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveTutorial(cliente, index)}
                        key={index}
                      >
                        {cliente.name}
                      </li>
                    ))}
                </ul>

                <button
                  className="m-3 btn btn-sm btn-danger"
                  onClick={this.removeAllTutorials}
                >
                  Remove All
          </button>
              </div>



            </div>
          )}
      </div>
    );
  }
}