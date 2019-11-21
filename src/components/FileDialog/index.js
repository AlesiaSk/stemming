import React, { useState } from 'react';
import axios from 'axios';


const FileDialog = () => {
    const [file, setFile] = useState('');
    const [message, setMessage] = useState('Choose a file...');
    const [loaded, setLoaded] = useState('');
    const [isUpload, setIsUpload] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setLoaded(0);
        setMessage(e.target.files[0].name)
    };

    const handleUpload = () => {
        if(isUpload){
            return;
        }

        if(!file) {
            setMessage('Select a file first');
            return;
        }

        setIsUpload(true);
        sendFile();
    };
    const sendFile = () => {
        const data = new FormData();
        data.append('file', file);
        axios.post("http://localhost:8000/upload", data, {
            onUploadProgress: ProgressEvent => {
                setLoaded(Math.round(ProgressEvent.loaded/ProgressEvent.total)*100)
            }
        }).then(res => {
                setFile(null);
                setMessage('Uploaded successfully');
                setIsUpload(false);
            }).catch(err => {
                setIsUpload(false);
                setMessage('Failed to upload');
        });
    };


    return (
        <>
            <input type="file" name="file" id="file" accept=".pdf" onChange={(e)=>handleFileChange(e)}/>
            <label htmlFor="file">
                <figure>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                    >
                        <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                    </svg>
                </figure>
                <span>
            {isUpload
                ? loaded + "%"
                : message}
          </span>
            </label>
            <a className="button" href="" onClick={handleUpload}>Submit</a>
        </>
    );
};
export default FileDialog;
