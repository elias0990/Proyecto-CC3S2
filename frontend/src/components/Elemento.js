import React, { Component } from 'react'
import firebase from '../firebase_connection.js';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class Elemento extends Component {


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
            //console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
            //console.log(res.data)
            this.setState({
                author:res.data.author,
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                img: res.data.img,
                userSelected: res.data.author,
                miniatura_url:res.data.miniatura_url,
                file_url:res.data.file_url,
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
            };
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, updatedNote);
        } else {
            const newNote = {
                title: this.state.title,
                content: this.state.content,
                author: this.state.userSelected,
                date: this.state.date,
                img: this.state.img,
            };
            axios.post('http://localhost:4000/api/notes', newNote);
        }
        window.location.href = '/userPanel3';

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
    onCompra = () => {
        //verificacion
        alert("Compra realizada con exito");
    }



    //descarga imagen
    descarga = (e) => {
        //console.log(e);
        const storageRef = firebase.storage().ref()
        const starsRef = storageRef.child('miniaturas/'+e);

            // Get the download URL
            const url2 = starsRef.getDownloadURL().then(function(url) {
                const url3 = url;
                //console.log(url);
                document.getElementById(e).src=url;
                //return(url);
            // Insert url into an <img> tag to "download"
            }).catch(function(error) {
                switch (error.code) {
                    case 'storage/object-not-found':
                    //console.log('// File doesnt exist');
                    break;

                    case 'storage/unauthorized':
                    //console.log('// User doesnt have permission to access the object');
                    break;

                    case 'storage/canceled':
                    //console.log('// User canceled the upload');
                    break;

                    
                    case 'storage/unknown':
                    //console.log('Unknown error occurred, inspect the server response');
                    break;
                }
            });
            //console.log("111111111111111111111111111111111111111111111111111111111111"+url);
    }
    //descarga recurso
    descarga_archivo = (e) => {
        //console.log(e.file_url);
        const storageRef2 = firebase.storage().ref()
        const starsRef2 = storageRef2.child('file/'+e);

            // Get the download URL
            starsRef2.getDownloadURL().then(function(url) {
                console.log(url);
                //document.getElementById(e).src=url;
                document.getElementById(e).setAttribute("href", url);
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
    }


    render() {
        return (
            <div className="row">
                <div className="col-md-12 offset-md-3 mx-auto">
                
                    <div className="card " style={{width: "70rem"}}>
                    <div className="row">

                            <div className="col-md-8  ">
                                <div class="col-4">
                                        <div class="card my-4 " style={{width: "40rem"}}>
                                                    <div class="card-header mb-2 font-weight-bold text-muted"><h3>{this.state.title}</h3></div>
                                                    <div class="card-body">
                                                                                                            
                                                                                                            
                                                                
                                                                <div class=" mb-2 text-muted">Autor: {this.state.author}</div>
                                                                {//<div class="card my-4 mx-auto " style={{width: "30rpm"}}><img class="card-img" alt="Image not found"/> </div>
                                                                }
                                                                <img id={this.state.miniatura_url} className="img-fluid" src={this.descarga(this.state.miniatura_url)}/>
                                                                <h6 class="card-subtitle my-2">Comentarios: {this.state.content}</h6>
                                                                <p>Categoria: {this.state.categoria}</p>
                                                                                                            
                                                                
                                                                                                            
                                                    </div>
                                        </div>
                                </div>
                            </div>
                                
                            <div className="col-md-4 offset  ">
                                        <div class="card my-4 " style={{width: "20rem"}}>
                                                    <div class="card-body">
                                                                                                            
                                                                
                                                                <h4 class="card-subtitle mb-2 "> Adquirir esta imagen </h4>
                                                                <br/>                                   
                                                                <h6 class="card-subtitle mb-2 text-muted"> Creditos: 13 </h6>
                                                                

                                                                <br/>
                                                                <div class="custom-control custom-radio">
                                                                    <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input"/>
                                                                    <label class="custom-control-label font-weight-bold" for="customRadio1">10 creditos por esta imagen</label>
                                                                </div>
                                                                <div class="custom-control custom-radio">
                                                                    <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input"/>
                                                                    <label class="custom-control-label font-weight-bold" for="customRadio2">9 creditos con suscripcion mensual</label>
                                                                </div>
                                                                <div class="custom-control custom-radio">
                                                                    <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input"/>
                                                                    <label class="custom-control-label font-weight-bold" for="customRadio3">6 creditos con suscripcion anual</label>
                                                                </div>
                                                                <br/><br/>
                                                                
                                                                
                                                                <a href={this.descarga_archivo(this.state.file_url)} download="descarga.zip" id={this.state.file_url} ><button type="button" onClick={this.onCompra.bind()} className="btn btn-primary w-100">Comprar</button></a>
                                                                                                            
                                                                
                                                                                                            
                                                    </div>
                                        </div>
                            </div>
                    </div>

                        

                        
                    </div>
                    
                </div>

            </div>
        )
    }
}
