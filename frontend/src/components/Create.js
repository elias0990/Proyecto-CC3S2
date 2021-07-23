import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class Create extends Component {

    state = {
        title: '',
        content: '',
        date: new Date(),
        img: '',
        userSelected: '',
        users: [],
        editing: false,
        categoria:'',
        _id: ''
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
                userSelected: res.data.author,
                _id: res.data._id,
                categoria: res.data.categoria,
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
                categoria: this.state.categoria,
            };
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, updatedNote);
        } else {
            const newNote = {
                title: this.state.title,
                content: this.state.content,
                author: this.state.userSelected,
                date: this.state.date,
                img: this.state.img,
                categoria: this.data.categoria,
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

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Editar</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* SELECT THE USER */}
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.userSelected}
                                onChange={this.onInputChange}
                                name="userSelected"
                                required>
                                {
                                    this.state.users.map(user => (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* Note Title */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Title"
                                onChange={this.onInputChange}
                                name="title"
                                value={this.state.title}
                                required />
                        </div>
                        {/* Note Content */}
                        <div className="form-group">
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Content"
                                name="content"
                                onChange={this.onInputChange}
                                value={this.state.content}
                                required>
                            </textarea>
                        </div>
                        {/* Note Date */}
                        <div className="form-group">
                            <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate} />
                        </div>

                        {/* Note Otro*/}
                        <div className="form-group">


                            <label className="input-group-text " htmlFor="inputGroupSelect01"   value={this.state.categoria}>Options</label>
                            <select className="custom-select" id="inputGroupSelect01" name="categoria" onChange={this.onInputChange} value={this.state.categoria} >
                                <option defaultValue>Escoger...</option>
                                <option value="Fotografia">Fotografia</option>
                                <option value="Pagina web">Pagina web</option>
                                <option value="Imagen Vectorial">Imagen vectorial</option>
                            </select>

                                {/*
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Otro"
                                name="img"
                                onChange={this.onInputChange}
                                value={this.state.img}
                                required>
                            </textarea>
                                */}
                        </div>



                        <button className="btn btn-primary">
                            Save <i className="material-icons">
                                assignment
                                    </i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
