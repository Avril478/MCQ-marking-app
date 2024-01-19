import React from 'react';
import { Upload } from '@douyinfe/semi-ui';
import UploadIcon from '../assets/upload.png'; 

//how to find which objects in the props?
//go to App.jsx find <UploadCsv tag content. found 'onContinueAfterUpload', so props including 1 object
//which is onContinueAfterUpload
export const UploadCsv = (props ) => {
    //name   props or {onContinueAfterUpload}, do not have ()
    let limit = 1;
    function onChange(event) {
        console.log('event.fileList.length:', event.fileList.length)
        // React event.fileList is an array of objects
        event.fileList.forEach((file) => {
            console.log('aaaaa-file.status:', file.status);
            // Access the 'status' key of each file object
            if(file.status === 'success'){
                console.log('Upload successful-file', file);
                console.log('Upload successful-file.name', file.name);
                // Ask the user if they want to proceed
                const wantToContinue = window.confirm('File uploaded successfully. Do you want to go to the Upload TXT page?');
                //if yes, choice -true,  if cancle, choice can be false.
                console.log('choice:',wantToContinue);
                if (wantToContinue === true) {
                    props.onContinueAfterUpload();
                    //or onContinueAfterUpload();   
                    // means Call the 'function' passed from App.jsx so have ()
                } else {
                   // do nothing, stay in current page
                }
            }
        });
    };
    
        return (
            <div style={{ paddingBottom: '100px' }}>
            <Upload
            action="https://api.semi.design/upload"
            draggable={true}
            accept=".csv"
            limit={limit}
            onChange={onChange}
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
