import axios from "axios";
import React, { Component } from "react";
import { Button, InputGroup, Form, Badge } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKaryawan: [],
      edit: false,
      dataPost: {
        id: 0,
        nama_karyawan: "",
        jabatan: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
      },
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount() {
    this.reloadData();
  }

  handleRemove = (e) => {
    console.log(e.target.value);
    fetch(`http://localhost:3001/posts/${e.target.value}`, {
      method: "DELETE",
    }).then((res) => this.reloadData());
  };

  reloadData() {
    axios.get("http://localhost:3001/posts").then((res) => {
      this.setState({
        dataKaryawan: res.data,
        edit: false,
      });
    });
  }

  inputChange = (e) => {
    let newdataPost = {...this.state.dataPost };
    if (this.state.edit === false) {
      newdataPost["id"] = new Date().getTime();
    }
    newdataPost[e.target.name] = e.target.value;

    this.setState(
      {
        dataPost: newdataPost,
      },
      () => console.log(this.state.dataPost)
    );
  };

  clearData = () => {
    let newdataPost = { ...this.state.dataPost };
    newdataPost["id"] = "";
    newdataPost["nama_karyawan"] = "";
    newdataPost["jabatan"] = "";
    newdataPost["jenis_kelamin"] = "";
    newdataPost["tanggal_lahir"] = "";

    this.setState({
      dataPost: newdataPost,
    });
  };

  onSubmitForm() {
    if (this.state.edit === false) {
      axios
        .post("http://localhost:3001/posts/", this.state.dataPost)
        .then(() => {
          this.reloadData();
          this.clearData();
        });
    } else {
      axios
        .put(
          `http://localhost:3001/posts/${this.state.dataPost.id}`,
          this.state.dataPost
        )
        .then(() => {
          this.reloadData();
          this.clearData();
        });
    }
  }

  getDataId = (e) => {
    axios.get(`http://localhost:3001/posts/${e.target.value}`).then((res) => {
      this.setState({
        dataPost: res.data,
        edit: true
      });
    });
  };

  render() {
    return (
      <div style={{ margin: "10px" }}>
        <p />
        <div style={{ backgroundColor: "blue", color: "white", borderRadius: '10px' }}>
          <h2 style={{ textAlign: "center" }}>Data<span style={{color:'gold'}}>Karyawan</span> <Badge pill bg="light" text="dark">PT.CAHAYA ABADI</Badge></h2>
        </div>
        <div>
          <InputGroup>
            <Form.Control
              type="text"
              name="nama_karyawan"
              value={this.state.dataPost.nama_karyawan}
              placeholder="Masukkan Nama Karyawan"
              onChange={this.inputChange}
            />
            <Form.Control
              type="text"
              name="jabatan"
              value={this.state.dataPost.jabatan}
              placeholder="Masukkan Jabatan"
              onChange={this.inputChange}
            />
            <Form.Control
              type="text"
              name="jenis_kelamin"
              value={this.state.dataPost.jenis_kelamin}
              placeholder="Masukkan Jenis Kelamin"
              onChange={this.inputChange}
            />
            <Form.Control
              type="date"
              name="tanggal_lahir"
              value={this.state.dataPost.tanggal_lahir}
              onChange={this.inputChange}
            />
            <Button type="submit" variant="success" onClick={this.onSubmitForm}>
              Save Data
            </Button>
          </InputGroup>
        </div>
        <br />
        <div>
          {this.state.dataKaryawan.map((dat, index) => {
            return (
              <div key={index}>
                <div style={{ border: "solid", borderRadius: "10px", padding: '10px', marginRight: '1000px', backgroundColor: 'yellow' }}>
                  <p>
                    <b>Nama : </b>
                    <Badge>{dat.nama_karyawan}</Badge>
                  </p>
                  <p>
                    <b>Jabatan : </b>
                    <Badge>{dat.jabatan}</Badge>
                  </p>
                  <p>
                    <b>Jenis Kelamin : </b>
                    <Badge>{dat.jenis_kelamin}</Badge>
                  </p>
                  <p>
                    <b>Tanggal Lahir : </b>
                    <Badge>{dat.tanggal_lahir}</Badge>
                  </p>
                  <Button
                    variant="success"
                    value={dat.id}
                    onClick={this.getDataId}
                  >
                    Edit Data
                  </Button>
                  <Button
                    variant="danger"
                    value={dat.id}
                    onClick={this.handleRemove}
                  >
                    Delete
                  </Button>
                </div>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
