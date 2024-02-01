import React, { useState } from 'react';
import styles from "./uploadFile.module.css";

/**
 * A component which allows users to drag and drop files. Exposes an onFilesDropped event
 * which can be handled in order to process those files.
 *
 * Adapted from code found on MDN.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
 *
 * @param {{onFilesDropped: function(File[])}} props component props.
 */
export function UploadFile(props) {
    const [isError, setError] = useState(false);
    const [isDragging, setDragging] = useState(false);

    // Reference to the hidden file input element
    const fileInputRef = React.createRef();

    // Simulates a click on the file input when the container is clicked
    function handleContainerClick() {
        fileInputRef.current.value = null;
        fileInputRef.current.click();
    }

    // Handles files dropped onto the component
    function handleFileDropped(file) {
        console.log('file', file);
        setError(false);


        const reader = new FileReader();
        //FileReader.readAsText must be an instance, so file must be an instance not a array
        reader.readAsText(file, "UTF-8");
        reader.onload = handleReadSuccess;
        reader.onerror = () => setError(true);
    }

    function handleReadSuccess(e) {

        console.log('your uploaded content details:', e.target.result);


        props.goToNextStep(e.target.result);
    }

    function handleDrop(e) {
        e.preventDefault();
        setDragging(false);

        // Array to store files which have been dropped
        let files = [];

        // Check the "items" list in the event. Goes through and adds all files here to the array.

        //why do we need this if? prefer delete if condition
        //codes are from the mozilla, so no need to worried a lot
        if (e.dataTransfer.items) {
            const items = [...e.dataTransfer.items];
            //items means everything in array-files(pdf,svg,txt,svc...), buttons...
            console.log('items:', items);
            //[DataTransferItem, DataTransferItem, DataTransferItem] means [button, pdf,csv..]
            items.forEach((i) => {
                if (i.kind === "file") {
                    const file = i.getAsFile();
                    //file is not null / undefined && type is svc/txt
                    if (file && file.type === props.fileType) {
                        files.push(file);
                    }
                }
            });
            console.log('file go into for each', files)
        }
        //files is [.svc,.svc,.svc....]
        console.log('file else', files)

        // Check the "files" list in the event.
        // else {
        //     console.log('else Files, before filter', files);
        //     files = [...e.dataTransfer.files].filter(file => file.type === props.fileType);
        //     console.log('else Files after filter', files);

        // }

        // Raise our onFilesDropped event to be handled by the parent.

        if (files.length === 1) {
            handleFileDropped(files[0]);
            // parameter should not be array, should be element in array, so can not use files.
        } else {
            // Alert the user and reset state
            alert(`Please drag and drop only one ${props.fileExt} file!`);
            setError(false);
        }
    }


    /**
     * Essentially this component is a div which handles the appropriate drag events.
     *
     * onDragEnter and onDragLeave will turn "on" and "off" the "isDragging" CSS class,
     * so we can style differently depending on if the user is hovering over the component
     * with a file.
     *
     * onDragOver we don't want to do anything, so we use preventDefault().
     *
     * onDrop is the one we want to handle, so we do that with the function above.
     */
    return (
        <>

            <div
                className={
                    isDragging
                        ? `${styles.container} ${styles.isDragging}`
                        : styles.container
                }
                //click
                onClick={handleContainerClick}
                //drag drop
                onDragEnter={() => setDragging(true)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onDragLeave={() => setDragging(false)}
            >
                {props.children}
            </div>
            {
                isError ? (
                    <p className={styles.error}>There was an error processing the file!</p>
                ) : undefined
            }

            <input
                ref={fileInputRef}
                type="file"
                accept={props.fileType}
                style={{ display: 'none' }}
                onChange={(e) => handleFileDropped(e.target.files[0])}
            />


        </>
    );
}
