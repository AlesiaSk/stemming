import React, {useState} from 'react';

const Help = () => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <a onClick={() =>setIsVisible(!isVisible)} href='' className='help_button'>Help</a>
        {isVisible && <div className='help'>
            <p>Для выбора файла нажмите на область Choose a file</p>
            <p>Для отправки файла нажмите на кнопку Submit</p>
        </div>}
        </>
    );
};

export default Help;