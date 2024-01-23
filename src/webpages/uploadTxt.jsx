import React, { useState } from 'react';
//import UploadIcon from '../assets/upload.png';
import styles from "./uploadCsv.module.css";

export function UploadTxt(props) {
    const [fileContents, setFileContents] = useState("");
    const [isError, setError] = useState(false);
    const [isDragging, setDragging] = useState(false);
    /**
     * Handles a "drop" event onto this component.
     *
     * @param {React.DragEvent<HTMLDivElement>} e
     */
    function handleFilesDropped(files) {
        setError(false);
        setFileContents("");
        //why still reset value again? clear fileContents after each successful drag?

        const firstFile = files[0];

        // Read the first file which was dropped
        const reader = new FileReader();
        reader.readAsText(firstFile, "UTF-8");
        reader.onload = handleReadSuccess;
        reader.onerror = () => setError(true);
    }

    function handleReadSuccess(e) {
        setFileContents(e.target.result);
        console.log('your uploaded txt:', e.target.result);
        //if read success, it will trigger goToNextStep function in app.jsx
        props.goToNextStep();
    }

    function handleDrop(e) {
        e.preventDefault();
        setDragging(false);

        // Array to store files which have been dropped
        let files = [];

        // Check the "items" list in the event. Goes through and adds all files here to the array.
        if (e.dataTransfer.items) {
            const items = [...e.dataTransfer.items];
            items.forEach((i) => {
                if (i.kind === "file") files.push(i.getAsFile());
            });
        }

        // Check the "files" list in the event.
        else {
            files = [...e.dataTransfer.files];
        }

        // Raise our onFilesDropped event to be handled by the parent.
        //change comment line to new codes to call handleFilesDropped
        // if (onFilesDropped) onFilesDropped(files);
        if (handleFilesDropped) {
            handleFilesDropped(files);
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

                onDragEnter={() => setDragging(true)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onDragLeave={() => setDragging(false)}
            >
                Drag your MCQ.txt to upload!
            </div>
            {
                isError ? (
                    <p className={styles.error}>There was an error processing the file!</p>
                ) : undefined
            }

            <h2>File contents:</h2>
            <pre className={styles.fileContentsViewer}>{fileContents}</pre>
        </>
    );
}
