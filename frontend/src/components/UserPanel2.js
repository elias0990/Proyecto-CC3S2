import React, { Component } from 'react'
//import firebase from 'firebase'
import firebase from '../firebase_connection.js';
//import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

const config = {}

//firebase.initializeApp(config)
export default class UserPanel2 extends Component {
    
    state = {
        title: '',
        content: '',
        date: new Date(),
        img: '',
        file_url:'',
        miniatura_url:'',
        userSelected: '',
        users: [],
        editing: false,
        categoria:'',
        _id: '',
        
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/users');
        if (res.data.length > 0) {
            this.setState({
                users: res.data.map(user => user.username),
                userSelected: res.data[0].username
            })
        }
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
            console.log(res.data)
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                img: res.data.img,
                file_url:res.data.file_url,
                miniatura_url:res.data.miniatura_url,
                userSelected: res.data.author,
                _id: res.data._id,
                categoria:res.data.categoria,
                
                editing: true
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedNote = {
                title: this.state.title,
                content: this.state.content,
                author: this.state.userSelected,
                date: this.state.date,
                img: this.state.img,
                file_url:this.state.file_url,
                miniatura_url:this.state.miniatura_url,
                categoria:this.state.categoria,
            };
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, updatedNote);
        } else {
            //this.subirArchivoFirebase(this.state.miniatura_url);

            //codigo para subir una imagen a firebase
            const file_miniatura = document.getElementById('miniatura_url').files[0];
            const file_file = document.getElementById('file_url').files[0];
            const ruta_miniatura = 'miniaturas/'+this.state.miniatura_url;
            const ruta_file = 'file/'+this.state.file_url;
            const storageRef_min = firebase.storage().ref();
            const storageRef_file = firebase.storage().ref();
            const fileRef_min = storageRef_min.child(ruta_miniatura);
            const fileRef_file = storageRef_file.child(ruta_file);
            fileRef_min.put(file_miniatura).then(() => {console.log("Uploaded a file")})
            fileRef_file.put(file_file,'zip').then(() => {console.log("Uploaded a file")})


            const newNote = {
                title: this.state.title,
                content: this.state.content,
                author: this.state.userSelected,
                date: this.state.date,
                img: this.state.img,
                file_url:this.state.file_url,
                miniatura_url:this.state.miniatura_url,
                categoria:this.state.categoria
            };
            axios.post('http://localhost:4000/api/notes', newNote);
        }
        alert("Archivo subido satisfactoriamente");
        //window.location.href = '/userPanel3';

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        //console.log(this.state.img)
        //console.log(e.target.value)
    }

    onChangeDate = date => {
        this.setState({ date });
    }

    
    
    onChangeOtro = img => {
        this.setState({ img });
    }
    onInputChange2 = (e) => {
        this.setState({
            [this.state.img]: e.target.value
        })
        console.log(this.state.img)
    }
    onMiniaturaChange = (e) => {
        const date = Date(); 
        this.setState({
            [e.target.name]: date 
        })
    }
    subirArchivoFirebase = (date) => {
        const file = document.getElementById('miniatura').files[0];
        console.log("miniatura");
        const ruta = 'imagenes/'+date;
        const storageRef = firebase.storage().ref()
        const fileRef = storageRef.child(ruta)
        fileRef.put(file).then(() => {
            console.log("Uploaded a file")
          })
    }

    //al cambiar el contenido de una imagen se sube contenido a la base de datos de firebase
    onChange = (e) => {
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref()
        
        const ruta = 'imagenes/'+Date();
        const fileRef = storageRef.child(ruta)
        console.log(ruta);
        fileRef.put(file).then(() => {
          console.log("Uploaded a file")
        })
    }

    //link para descargar una imagen
    descarga = (e) => {
        const storageRef = firebase.storage().ref()
        const starsRef = storageRef.child(e);

            // Get the download URL
            const url2 = starsRef.getDownloadURL().then(function(url) {
                const url3 = url;
                //console.log(url);
                document.getElementById('name').src=url;
                //return(url);
            // Insert url into an <img> tag to "download"
            }).catch(function(error) {
                switch (error.code) {
                    case 'storage/object-not-found':
                    console.log('// File doesnt exist');
                    break;

                    case 'storage/unauthorized':
                    console.log('// User doesnt have permission to access the object');
                    break;

                    case 'storage/canceled':
                    console.log('// User canceled the upload');
                    break;

                    
                    case 'storage/unknown':
                    console.log('Unknown error occurred, inspect the server response');
                    break;
                }
            });
            //console.log("111111111111111111111111111111111111111111111111111111111111"+url);
            //console.log(url2);
            
            
            
    }
      
    render() {
        return (
            
        <div>
        <a href={this.descarga('imagenes/descarga.jpg')} download><img src={this.descarga('imagenes/descarga.jpg')} alt={this.descarga('imagenes/descarga.jpg')}/></a>
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
                    <form onSubmit={this.onSubmit}>
                        <div className="col-md-4 p-2" >
                            <div className="card " style={{width: "60rem"}}>
                                <div className="card-header d-flex justify-content-between">
                                    <h5>Agregar contenido</h5>
                                </div>
                                
                                <div className="card-body">
                                                <div>
                                                            {/* SELECT THE USER */}
                                                            Usuario : {this.state.userSelected = "usuario1"}

                                                </div>
                                                <div className="input-group mb-3">
                                                        
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text" id="basic-addon1">Titulo:</span>
                                                        </div>
                                                        
                                                        {/* Title */}
                                                        {/*<input type = "text" className="form-control" placeholder="Titulo" ></input>*/}
                                                        
                                                            <input className="form-control"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Titulo"
                                                                onChange={this.onInputChange}
                                                                name="title"
                                                                value={this.state.title}
                                                                required />

                                                </div>
                                                
                                                {/*<div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                            <label class="input-group-text" htmlFor="inputGroupSelect01">Tipo de contenido</label>
                                                        </div>
                                                        <select class="custom-select" id="inputGroupSelect01">
                                                            <option selected>Escoger...</option>
                                                            <option value="1">Fotografia</option>
                                                            <option value="2">Pagina Web</option>
                                                            <option value="3">Imagen Vectorial</option>
                                                        </select>
                                                    </div>
                                                */}
                                                {/* Tippo de contenido (categoria)*/}
                                                
                                                <div className="form-group input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <label className="input-group-text " htmlFor="inputGroupSelect07"   value={this.state.categoria}>Categoria</label>
                                                        </div>
                                                        
                                                        <select className="custom-select" id="inputGroupSelect07" name="categoria" onChange={this.onInputChange} value={this.state.categoria} >
                                                            <option defaultValue>Escoger...</option>
                                                            <option value="Fotografia">Fotografia</option>
                                                            <option value="Pagina Web">Pagina Web</option>
                                                            <option value="Imagen Vectorial">Imagen Vectorial</option>
                                                        </select>
                                                </div>




                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend"><label className="input-group-text" htmlFor="ejemplo_archivo_1">Miniatura: </label>
                                                    </div>
                                                </div>
                                                <input className=" mx-4 mb-4" type="file" id="miniatura_url" name="miniatura_url" onChange={this.onMiniaturaChange}/>
                                                {//<input   className=" mx-4 mb-4" type="file" id="ejemplo_archivo_1"/>
                                                }
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend"><label className="input-group-text" htmlFor="ejemplo_archivo_1">Archivo: </label>
                                                    </div>
                                                </div>
                                                <input className=" mx-4 mb-4" type="file" id="file_url" name="file_url" onChange={this.onMiniaturaChange}/>
                                                {//<input   className=" mx-4 mb-4" type="file" id="ejemplo_archivo_1"/>
                                                }
                                                <div className="input-group mb-3">
                                                        <div classame="input-group-prepend"><span className="input-group-text" id="basic-addon1">Comentarios:</span>
                                                        </div>

                                                        {/*<input type = "text"class="form-control" placeholder="Comentarios" ></input>*/}
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Comentario"
                                                                name="content"
                                                                onChange={this.onInputChange}
                                                                value={this.state.content}
                                                                required/>
                                                            
                                                        
                                                </div>
                                                
                                </div>
                                        <div className="card-footer">
                                            <button className="btn btn-danger">
                                                Guardar
                                            </button>
                                        </div>
                            </div>
                            
                            
                            
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        
        
        )};
}
