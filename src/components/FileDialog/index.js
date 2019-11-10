import React, { useState } from 'react';
import axios from 'axios';

// const createFileSelector = () => {
//     const fileSelector = document.createElement('input');
//     fileSelector.setAttribute('type', 'file');
//     fileSelector.setAttribute('accept', '.pdf');
//     fileSelector.id = 'fileSelector';
//     return fileSelector;
// };

const FileDialog = () => {
    //const fileSelector = createFileSelector();
    const [file, setFile] = useState('');

    const passFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    };

    const sendFile = () => {
        const data = new FormData();
        data.append('file', file);
        axios.post("http://localhost:8000/upload", data, {
            // receive two    parameter endpoint url ,form data
        }).then(res => { // then print response status
                console.log(res.statusText)
            })
    };


    return (
        <>
            <label htmlFor="file">Choose file to upload</label>
            <input type="file" accept=".pdf" onChange={(e)=>passFile(e)}/>
            <a className="button" href="" onClick={sendFile}>Submit</a>
        </>
    );
};
export default FileDialog;
