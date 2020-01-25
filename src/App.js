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
      value: '',
      namaAkhir: ' Insan P',
      namaLengkap: '',
      barangInput: '',
      listBelanja: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addBelanjaan = this.addBelanjaan.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    this.addBelanjaan(this.state.value);
    event.preventDefault();
  }

  addBelanjaan(barang) {
    if (this.state.value === '') return alert('Belanjaan tidak boleh kosong')
    let belanjaan = this.state.listBelanja
    belanjaan.push(barang)
    this.setState({
      value: '',
      listBelanja: belanjaan,
      namaAkhir: barang
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input className="input" type="text" placeholder="Input Belanjaan Kamu" value={this.state.value} onChange={this.handleChange} />
        <input className="btnSubmit" type="submit" value="Submit" />
        <div className="listView">
          <ul>
          {this.state.listBelanja.map(item => {
            return <li>{item}</li>;
          })}
          </ul>
        </div>
      </form>
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
