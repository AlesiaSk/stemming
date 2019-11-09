import React from 'react';

const createFileSelector = () => {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    fileSelector.id = 'fileSelector';
    return fileSelector;
};

const FileDialog = () => {
    const fileSelector = createFileSelector();

    const onClick = () => {
        fileSelector.click();
        console.log(document.getElementById('fileSelector').files[0]);
    };


    //
    // useEffect(() => {
    //    const fileSelector = createFileSelector();
    // });

    return (
        <>
            <label>Choose file to upload</label>
            <a className="button" href="" onClick={() => onClick()}>Choose file</a>
        </>
    );
};
export default FileDialog;
