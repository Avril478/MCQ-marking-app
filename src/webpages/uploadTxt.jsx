import React from 'react';
import { Upload } from '@douyinfe/semi-ui';
import UploadIcon from '../assets/upload.png'; 

export const UploadTxt = () => {
    let limit = 1;
    let onChange = props => {
        console.log(props.fileList);}
        return (
            <div style={{ paddingBottom: '100px' }}>
            <Upload
            action="https://api.semi.design/upload"
            draggable={true}
            accept=".txt"
            limit={limit}
            onChange={onChange}
            dragIcon
            dragMainText={
                <div>
                    <div style={{ fontSize: '27px', fontWeight: 'bold', marginTop:'50px',marginBottom:'30px'}}>
                        Upload MCQ Results
                    </div>
                    <img src={UploadIcon} alt="Upload Icon" style={{ width: '50px', height: '50px', margin: '0 auto 10px' }} />
                    <div style={{ margin: '40px 60px' }}>Click to upload files or drag files here</div>
                </div>
            }
            dragSubText={
                <div style={{ fontSize: '15px', marginTop: '30px', marginBottom:'30px' }}>
                    Only .txt file
                </div>
            }
        ></Upload> </div>
        );
    
};