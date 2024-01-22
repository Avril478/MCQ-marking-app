import React from 'react';
import { Upload } from '@douyinfe/semi-ui';
import UploadIcon from '../assets/upload.png';

export const UploadTxt = (props) => {

    let limit = 1;
    function onChange(event) {
        // Assuming props.fileList is an array of objects
        console.log('event.fileList.length:', event.fileList.length)

        event.fileList.forEach((file) => {
            console.log('bbbbbb-file.status', file.status);


            // Access the 'status' key of each file object
            if (file.status === 'success') {
                console.log('Upload successful-file(obj)', file);
                console.log('Upload successful-file.name', file.name);
                // //Ask the user if they want to proceed
                // const wantToContinue = window.confirm('Do you want to go to the Marking page?');
                // //if yes, choice -true,  if cancle, choice can be false.
                // console.log('choice:',wantToContinue);
                //if (wantToContinue === true) {
                //     onContinueAfterUpload();// Call the function passed from App
                //     // Optionally, call a function passed from the parent component
                // } else {
                //    // do nothing, stay in current page
                // }
                props.goToNextStep();
            }
        }
        )
    }
    return (
        <div style={{ paddingBottom: '100px' }}>
            <Upload
                action="https://api.semi.design/upload"
                draggable={true}
                accept=".txt"
                limit={limit}
                onChange={onChange}
                dragMainText={
                    <div>
                        <div style={{ fontSize: '27px', fontWeight: 'bold', marginTop: '50px', marginBottom: '30px' }}>
                            Upload MCQ Results
                        </div>
                        <img src={UploadIcon} alt="Upload Icon" style={{ width: '50px', height: '50px', margin: '0 auto 10px' }} />
                        <div style={{ margin: '40px 60px' }}>Click to upload files or drag files here</div>
                    </div>
                }
                dragSubText={
                    <div style={{ fontSize: '15px', marginTop: '30px', marginBottom: '30px' }}>
                        Only .txt file
                    </div>
                }
            ></Upload> </div>
    );

};