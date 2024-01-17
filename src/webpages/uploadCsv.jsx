import React from 'react';
import { Upload } from '@douyinfe/semi-ui';
import UploadIcon from '../assets/upload.png'; 


export const UploadCsv = ({ onUploadSuccess }) => {
    
    let limit = 1;
    let onChange = props => {
        // Assuming props.fileList is an array of objects
        props.fileList.forEach((file) => {
            console.log('aaaaa:', file.status);
            // Access the 'status' key of each file object
            if(file.status === 'success'){
                console.log('Upload successful-file', file);
                // Ask the user if they want to proceed
                const makeChoice = window.confirm('File uploaded successfully. Do you want to go to the Upload TXT page?');
                //if yes, choice -true,  if cancle, choice can be false.
                console.log('choice:',makeChoice);
                if (makeChoice === true) {
                    onUploadSuccess(); // Call the function passed from App
                    // Optionally, call a function passed from the parent component
                } else {
                   // do nothing, stay in current page
                }
            }
        });
    };
    // if (uploadSuccess) {
    //     return <UploadTxt/>;
    // }
        return (
            <div style={{ paddingBottom: '100px' }}>
            <Upload
            action="https://api.semi.design/upload"
            draggable={true}
            accept=".csv"
            limit={limit}
            onChange={onChange}
            dragIcon
            dragMainText={
                <div>
                    <div style={{ fontSize: '27px', fontWeight: 'bold', marginTop:'50px',marginBottom:'30px'}}>
                        Upload Your Rubric
                    </div>
                    <img src={UploadIcon} alt="Upload Icon" style={{ width: '50px', height: '50px', margin: '0 auto 10px' }} />
                    <div style={{ margin: '40px 60px' }}>Click to upload files or drag files here</div>
                </div>
            }
            dragSubText={
                <div style={{ fontSize: '15px', marginTop: '30px', marginBottom:'30px' }}>
                    Only .csv file
                </div>
            }
        ></Upload> 
        </div>
        );
    
};
