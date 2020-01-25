import React, {Component} from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './App.css';

const MyContext = React.createContext();

class HasilForm extends Component {
  render() {
    return (
      <MyContext.Consumer>
        {(context)=>(
          <h1>{context.namaLengkap}</h1>
        )}    
      </MyContext.Consumer>
    )
  }
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barangInput: '',
      listBelanja: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addBelanjaan = this.addBelanjaan.bind(this);
    this.doneTodos = this.doneTodos.bind(this);
  }

  handleChange(event) {
    this.setState({barangInput: event.target.value});
  }
  handleSubmit(event) {
    this.addBelanjaan(this.state.barangInput);
    event.preventDefault();
  }

  addBelanjaan(barang) {
    if (barang === '') return alert('Belanjaan tidak boleh kosong')
    let belanjaan = this.state.listBelanja
    belanjaan.push({
      namaBarang: barang,
      done: null
    })
    this.setState({
      barangInput: '',
      listBelanja: belanjaan
    })
  }

  doneTodos(index) {
    let listBelanja = this.state.listBelanja
    listBelanja[index].done = true
    this.setState({
      listBelanja: listBelanja
    })
  }
  delTodos(index) {
    let listBelanja = this.state.listBelanja
    listBelanja[index].done = false
    this.setState({
      listBelanja: listBelanja
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input className="input" maxLength="13" type="text" placeholder="Input Belanjaan Kamu" value={this.state.barangInput} onChange={this.handleChange} />
          <input className="btnSubmit" type="submit" value="Submit" />
        </form>
        <div className="listView">
          <ul>
          {this.state.listBelanja.map((item, index) => {
            return  <li className={item.done?"listItem done":"listItem"} key={index}>
                      <span className="text">{item.namaBarang}</span>
                      <div>
                        <button disabled={item.done} onClick={this.doneTodos.bind(this, index)}>Sudah</button>
                        <button disabled={!item.done} onClick={this.delTodos.bind(this, index)}>Belum</button>
                      </div>
                    </li>;
          })}
          </ul>
        </div>
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <MyContext.Consumer>
        {(context)=>(
          <div className="contentView">
            <Form/>
            <HasilForm/>
          </div>
        )}
      </MyContext.Consumer>
    )
  }
}

class App extends Component {
  state = {
    namaLengkap: ""
  }
  render() {
    return (
      <MyContext.Provider value={this.state}>
        <Header/>
        <Content/>
        <Footer/>
      </MyContext.Provider>
    )
  }
}



export default App;
