import React, { Component } from 'react'

//import 'react-datepicker/dist/react-datepicker.css'


export default class UserPanel1 extends Component {
    render() {
        return (
        <div>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-3 px-sm-2 px-0 p-2 ">
                        <div className="card " style={{width: ""}}>
                            <div className="card-header d-flex justify-content-between"><h5>Menu</h5></div>
                            <div className="card-body">
                                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                        <li className="nav-item">
                                            <a href="/userPanel1" className="nav-link align-middle px-0"><span className="ms-1 d-none d-sm-inline">Cuenta</span></a>
                                        </li>
                                        <li>
                                            <a href="/userPanel2" className="nav-link px-0 align-middle">
                                            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Agregar Contenido</span> </a>
                                        </li>
                                        <li>
                                            <a href="userPanel3" className="nav-link px-0 align-middle">
                                            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Mi Biblioteca</span> </a>
                                        </li>
                                    </ul>
                            </div>
                        </div>     
                    </div>
                    
                    

                    <div className="col py-0">
                        <div className="col-md-4 p-2" >
                            <div className="card " style={{width: "60rem"}}>
                                <div className="card-header d-flex justify-content-between">
                                    <h5>Datos Personales</h5>
                                </div>
                                <div className="card-body">
                                                <div class="input-group mb-3">
                                                        <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Nombres:</span></div>
                                                        <input type = "text"class="form-control" placeholder="Ususario1" ></input>
                                                </div>
                                                <div class="input-group mb-3">
                                                        <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Apellidos:</span></div>
                                                        <input type = "text"class="form-control" placeholder="Apellidos" ></input>
                                                </div>
                                                <div class="input-group mb-3">
                                                        <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Correo:</span></div>
                                                        <input type = "text"class="form-control" placeholder="Correo@hotmail.com" ></input>
                                                </div>
                                                <div class="input-group mb-3">
                                                        <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Direccion:</span></div>
                                                        <input type = "text"class="form-control" placeholder="Av ejemplo 345" ></input>
                                                </div>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-primary">
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        )};
}
