import React, { useState, useRef } from 'react';
import profileIconTransparent from '../images/UserProfileTransparent.png';


const ImageUpload = () => {
    const [image, setImage] = useState("");
    const inputFile = useRef(null);

    const handleFileUpload = e => {
        const { files } = e.target;
        if (files && files.length) {
            const filename = files[0].name;

            var parts = filename.split(".")
            const fileType = parts[parts.length - 1];
            console.log('fileType', fileType);
            console.log(files[0]);

            setImage(files[0]);
        }
    };

    const onButtonClick = () => {
        inputFile.current.click();
    };

    console.log("imageimage", image);
    return (
        <div>
            <input
                type="file"
                ref={inputFile}
                accept='.png, .jpg, .jpeg'
                style={{ display: "none" }}
                onChange={handleFileUpload}
            />
           <img src={image} alt="" width='100px' height='100px' onClick={onButtonClick}/>
        </div>
    );
};

export default ImageUpload;
