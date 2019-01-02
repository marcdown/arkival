import React from 'react';
import FileUploader from './components/FileUploader';
import './App.css';

const App = () => (
  <div className="App">
    <header className="mb5">
        <h1 className="f3 f1-m f-headline-l">arkival</h1>
        <h2 className="f5 gray fw2 ttu tracked">Archive your files using IPFS</h2>
    </header>
    <FileUploader />
  </div>
)

export default App;
