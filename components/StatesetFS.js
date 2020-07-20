import React from 'react';
import axios from 'axios';
import querystring from 'querystring';


class StatesetFS extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      hash: this.props.hash,
      pass: '',
      decryptedData: [],
      addr: null,
      id: null,
      cid: null,
      version: null,
      protocol_version: null,
      added_file_hash: null,
      added_file_contents: null,
      file: null,
      policy:'',
      message: ''
    }

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.connect = this.connect.bind(this)
    this.handlePolicyChange = this.handlePolicyChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.multiaddr = React.createRef()
  }

  onFormSubmit(e){
    e.preventDefault()
    this.handleUpload(this.state.file).then((response)=>{
      this.setState({ message: 'Success.'})
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  handlePolicyChange(e) {
    this.setState({ policy: e.target.value });
  }

  handleHashChange = event => {
    this.setState({ hash: event.target.value });
  }

  handlePasswordChange = event => {
    this.setState({ pass: event.target.value });
  }

  async connect () {
    const ipfs = ipfsClient(this.multiaddr.current.value)
    const id = await ipfs.id()

    this.setState({
      id: id.id,
      version: id.agentVersion,
      protocol_version: id.protocolVersion
    })

    const file = await ipfs.add(stringToUse)
    const hash = file.cid
    this.setState({ added_file_hash: hash.toString() })

    const source = ipfs.cat(hash)
    let contents = ''
    const decoder = new TextDecoder('utf-8')

    for await (const chunk of source) {
      contents += decoder.decode(chunk, {
        stream: true
      })
    }

    contents += decoder.decode()

    this.setState({ added_file_contents: contents })
  }

  handleUpload(file){

    const policy = this.state.policy;

    const url = `https://cid.stateset.io/file/${cid}/upload`;
    const formData = new FormData();
    formData.append('policy', 'policy1')
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,GET,OPTIONS, PUT, DELETE"
        }
    }
    return  post(url, formData, config)
  }

  handleDecrypt = event => {
    event.preventDefault();

    const hash = this.state.hash;

    const pass = this.state.pass;

    let axiosConfig = {
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,GET,OPTIONS, PUT, DELETE"
      }
    };

    axios.post(`https://cid.stateset.io/file/${cid}/decrypt`, querystring.stringify({ hash: hash, pass: pass}),  axiosConfig)
    .then(res => {

      const decryptedData = res.data;
      this.setState({ decryptedData });
      console.log(res.data);
    })
}

render () {
  if (this.state.id) {
    return (
      <div style={{ textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <label>
           <h4> Hash:</h4>
            <input name="hash" value={this.props.hash ? this.state.hash : null} onChange={this.handleHashChange} />
          </label>
          <br/>
          <label>
           <h4>Password:</h4>
            <input type="password" name="pass" onChange={this.handlePasswordChange} />
          </label>
          <br/>
          <br/>
          <button type="submit">Decrypt</button><img className="center" height="28" width="28" align="middle" alt=""/>
        </form>
        <br/>
        <style jsx>{`
        `}</style>
        </div>
      )
    }
  }
}

export default StatesetFS;