import React, { Component } from "react";
//import { Switch, Route} from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
//import crud from "./components/crud";
import { PersonasService } from './service/personas.service';
import "./App.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personas: [],
      persona: {
        id: null,
        nombre: "",
        apellido: "",
        status: true
      },
      selectedpersona: {

      }
    }

    this.PersonasService = new PersonasService();
    this.save = this.save.bind(this);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeApellido = this.onChangeApellido.bind(this);

  }

  componentDidMount() {
    this.getListPerson(); 
    this.setState({
      visible: false
    });
  }

  getListPerson(){
    this.PersonasService.getAll()
    .then(res => this.setState({ personas: res }))
    .catch(e=>{
      console.log(e)
    })
  }

  onChangeNombre(e) {
    this.setState({
      nombre: e.target.value
    });
  }

  onChangeApellido(e) {
    this.setState({
      apellido: this.state.selectedpersona.apellido
    });
  }

  save() {
    var data = {
      name: this.state.nombre,
      lastname: this.state.apellido
    }
    this.PersonasService.create(data)
    .then(response => {
      this.setState({
        id: response.data.id,
        nombre: response.data.nombre,
        apellido: response.data.apellido,
      })
      console.log(response)
    })
    .catch(e => {
      console.log(e);
    });
    this.getListPerson();
  }

  delete(){
console.log();
  }

  showSaveModal(){
    this.setState({
      visible: false
    });
  }

  render() {
    return (
      <div style={{ width: '80%', margin: '0 auto', marginTop: '2em' }}>


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
        <Button label="Crear" className="p-button-success" onClick={this.save} />
        <Button label="Editar" className="p-button-warning" onClick={this.save} />
        <Button label="Eliminar" className="p-button-info" onClick={this.delete} />
 


        <Panel header="TABLA PERSONAS" >
          <DataTable value={this.state.personas} selectionMode= "single" selection= {this.state.selectedpersona}
          onSelectionChange={e => this.setState({ selectedperdona: e.value })}>

           
            <Column field="id" header="id"></Column>
            <Column field="name" header="Nombre"></Column>
            <Column field="lastname" header="Apellido"></Column>
          </DataTable>
        </Panel>
        <Dialog header="Nueno registro" visible={this.state.visible} style={{width: '60%'}} modal={true} onHide={()=>this.setState({visible:false})}>
        <span className="p-float-label">
          <InputText id="name" value={this.state.persona.nombre} onChange={(e) => {this.setState(prevState => {
            let val = e.target.value
            let persona = Object.assign({},prevState.persona);
             persona.name= val
             return {persona};
             })}}
              />
          <label htmlhtmlFor="apellido">Nombre</label>
        </span>
        <span className="p-float-label">
          <InputText id="name" value={this.state.persona.nombre} onChange={(e) => {this.setState(prevState => {
            let val = e.target.value
            let persona = Object.assign({},prevState.persona);
             persona.name= val
             return {persona};
             })}}
              />
          <label htmlhtmlFor="apellido">Nombre</label>
        </span>

        <Button label="Click" onClick={this.handleClick} />
        </Dialog>
      </div>
    );
  }

  


}