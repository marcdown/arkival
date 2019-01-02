import React, { Component } from 'react';
import { BeatLoader } from 'react-spinners';
import ipfs from '../utils/ipfs';
import './FileUploader.css';

class FileUploader extends Component {
  constructor(props) {
		super(props);

		this.state = {
      buffer: null,
      ipfsUrl: null,
      loading: false,
      generated: false
		};
	};

  captureFile = (event) => {
		event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
		let reader = new window.FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = () => this.convertToBuffer(reader); 
	};

	convertToBuffer = async (reader) => {
		const buffer = await Buffer.from(reader.result);
		this.setState({ buffer: buffer });
	};

  onSubmit = async (event) => {
		event.preventDefault();

    // Save file to IPFS and set file hash
    if (this.state.buffer != null) {
      this.setState({
        loading: true,
        generated: false
      });
      const files = await ipfs.add(this.state.buffer);
      const hash = files[0].hash;
      const url = 'https://ipfs.io/ipfs/' + hash
      
      this.setState({ 
        ipfsUrl: url,
        loading: false,
        generated: true
      });
    }
	};

  render() {
    return (
      <div className="fl w-70 pv4 ba border-box">
        <div>
          <input type="file" name="file" id="file" onChange={this.captureFile}/>
          <label className="f5 center no-underline black bg-animate pointer hover-bg-black hover-white inline-flex items-center pa3 mt3 ba border-box" htmlFor="file">
            <svg width="20" height="17" viewBox="0 0 20 17" style={{fill: 'currentcolor'}}>
              <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/>
            </svg>
            <span className="pl1">Choose a file...</span>
          </label>
        </div>
        <div>
          <button className="f4 link pointer dim br2 ph4 pv2 mt4 dib white bg-near-black" onClick={this.onSubmit}>Upload</button>
        </div>
        <div className="mt4">
          <BeatLoader sizeUnit={"px"} size={30} color={'#999999'} loading={this.state.loading}/>
        </div>
        <div className={this.state.generated ? '' : 'hidden'}>
          <p className="f4 lh-copy measure center">
            <a className="black" href={this.state.ipfsUrl} rel="noopener noreferrer" target="_blank">Archived</a> using <a className="black" href="https://arkival.io" rel="noopener noreferrer" target="_blank">arkival.io</a>
          </p>
        </div>
      </div>
    );
  }
};

export default FileUploader;
