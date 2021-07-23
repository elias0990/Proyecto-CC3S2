import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import firebase from '../firebase_connection.js';
export default class NotesList extends Component {

    state = {
        notes: [],
        notes2:[],
    }

    async componentDidMount() {
        this.getNotes();
    }

    getNotes = async () => {
        const res = await axios.get('http://localhost:4000/api/notes')
        
            this.setState({
                    notes: res.data,
                    notes2: res.data
            });
        
    }
    function_filter = (categoria,elemento_busqueda) => {
        if(categoria == 'Categorias' && elemento_busqueda == ''){
            this.setState({
                notes: this.state.notes2
            });
        }
        else if(categoria != 'Categorias' && elemento_busqueda == ''){            
            this.setState({
                notes: this.state.notes2.filter(notes2 => notes2.categoria == categoria)
            });
        }
        else if (categoria == 'Categorias' && elemento_busqueda != ''){
            this.setState({
                //notes: this.state.notes2.filter(notes2 => notes2.categoria == categoria),
                notes: this.state.notes2.filter(notes2 => notes2.title == elemento_busqueda)
            });
        }
        else{
            //alert("ss");
            this.setState({
                notes: this.state.notes2.filter(notes2 => notes2.categoria == categoria && notes2.title == elemento_busqueda),
            });
        }
    }

    deleteNote = async (noteId) => {
        await axios.delete('http://localhost:4000/api/notes/' + noteId);
        this.getNotes();
    }
    onsubmit = (event) => {
        //this.getNotes();
        const categoria = document.getElementById("exampleFormControlSelect1").value;
        const elemento_busqueda = document.getElementById("search").value;
        event.preventDefault();
        this.function_filter(categoria,elemento_busqueda);
        
        //alert("You are submitting " + this.state.username);
      }
    

    descarga = (e) => {
        console.log(e);
        const storageRef = firebase.storage().ref()
        const starsRef = storageRef.child('miniaturas/'+e);

            // Get the download URL
            const url2 = starsRef.getDownloadURL().then(function(url) {
                const url3 = url;
                console.log(url);
                document.getElementById(e).src=url;
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
            <div>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-md-12 p-2 mx-auto" >
                        
                        <div className="card " style={{width: "70rem"}}>
                                 
                            
                        


























                            <div class="container">
                            <div class="row">
                                <div class="col-lg-12 card-margin">
                                    <div class="card search-form">
                                        <div class="card-body p-0">
                                            <form id="search-form">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="row no-gutters">
                                                            <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                                                <select class="form-control" id="exampleFormControlSelect1">
                                                                    <option value = "Categorias" >Categoria</option>
                                                                    <option value = "Fotografia">Foografias</option>
                                                                    <option value = "Imagen Vectorial" > Imagenes vectoriales</option>
                                                                    <option value = "Pagina Web">Paginas web</option>
                                                                    
                                                                </select>
                                                            </div>
                                                            <div class="col-lg-8 col-md-6 col-sm-12 p-0">
                                                                <input type="text" placeholder="Search..." class="form-control" id="search" name="search"/>
                                                            </div>
                                                            <div class="col-lg-1 col-md-3 col-sm-12 p-0">
                                                                <button onClick={this.onsubmit} type="submit" class="btn btn-base">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                    <div class="col-12">
                                        <div class="card card-margin">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>






















                    
                    </div>
                </div>
                <div className="row flex-nowrap">
                    
                    
                    <div className="">
                        <div className="col-md-12 p-2 mx-auto" >
                            <div className="card " style={{width: "70rem"}}>
                                <div className="card-header d-flex justify-content-between">
                                    <h5></h5>
                                </div>
                                                        <div class="container">
                                                            
                                                            <div class="row">
                                                            {
                                                                this.state.notes.map(note => (
                                                                    <div class="col-4">
                                                                        <div class="card my-4" style={{width: "18rem"}} key={note._id}>
                                                                                <div class="card-body">
                                                                                    
                                                                                    <Link to={"/elemento/" + note._id}>
                                                                                        <h5 class="card-title">Titulo: {note.title}</h5>
                                                                                            
                                                                                    </Link>
                                                                                    <h6 class="card-subtitle mb-2 text-muted">Autor: {note.author}</h6>
                                                                                    <h6 class="card-subtitle mb-2 text-muted">Comentarios: {note.content}</h6>
                                                                                    <img id={note.miniatura_url} className="img-fluid" src={this.descarga(note.miniatura_url)}/>
                                                                                    <p>{format(note.createdAt)}</p>
                                                                                    <p>Categoria: {note.categoria}</p>
                                                                                    
                                                                                    
                                                                                    
                                                                                </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                            ))}
                                                                    
                                                                    
                                                            </div>
                                                        </div>
                                        
                                        
                                <div className="card-footer">
                                    
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
