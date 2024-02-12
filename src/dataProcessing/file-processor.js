export function processFiles(csvFile, txtFile) {
    console.log(csvFile, txtFile);
    const result = [];
    const linesRubric = csvFile.split('\n');
    const linesMCQ = txtFile.split('\n');
    let filteredLinesMCQ = filterMCQ(linesMCQ);
    let container = [];
    // Calculate the number of questions from the rubric
    const numberOfQuestions = linesRubric.length - 1;
    const replacements = {
        '01': 'A',
        '02': 'B',
        '04': 'C',
        '08': 'D',
        '16': 'E',
        '  ': ' '
    };

    for (const line of filteredLinesMCQ) {
        let studentAnswerString = line.substring(45);
        const id = line.substring(2, 11).trim();
        const surname = line.substring(12, 25).trim();
        const familyName = line.substring(25, 33).trim();
        const version = line.substring(36, 44).trim();
        const idNameVersionPart = [id, surname, familyName, version];

        //replace '01' to 'A', '02' to 'B'..
        for (const [old, newVal] of Object.entries(replacements)) {
            studentAnswerString = studentAnswerString.replaceAll(old, newVal);
        }
        const studentAnswerArr = studentAnswerString.split('');
        const eachVersionCorrectAnswer = [];
        const rubricMark = [];

        //exclude the first line of rubric
        for (const lineRubric of linesRubric.slice(1)) {
            const splitLineRubric = lineRubric.split(',');
            //version number is the index!!!! so version must be increasing sequence. 1 2 3 4 5..
            let eachValueInRubricMatrix = splitLineRubric[parseInt(version)];
            //delete the lines break \r  change "A\r" to "A" in rubric
            eachValueInRubricMatrix = eachValueInRubricMatrix.replace(/(\r\n|\n|\r)/gm, "")
            eachVersionCorrectAnswer.push(eachValueInRubricMatrix);
            const eachQRubricMark = parseFloat(splitLineRubric[0]);
            rubricMark.push(eachQRubricMark);
            //[0.5,0.5,1,1,1,2]
        }

        //rubricMark is in the loop, so make its' value can be accessed outside the loop
        container = rubricMark;
        for (let i = 0; i < eachVersionCorrectAnswer.length; i++) {
            //to check student'A'=== rubric answer 'B'
            if (studentAnswerArr[i] && studentAnswerArr[i] === eachVersionCorrectAnswer[i]) {
                //change 'A' to the mark
                studentAnswerArr[i] = rubricMark[i];
            } else {
                studentAnswerArr[i] = 0;
            }
        }
        //[1,2,0,0.5,0,1，'','','','','']
        const studentMarkPart = studentAnswerArr.slice(0, rubricMark.length);
        //[1,2,0,0.5,0,1]
        const total = studentMarkPart.reduce((acc, curr) => acc + curr, 0);
        const eachLineResult = [...idNameVersionPart, ...studentMarkPart, total];
        result.push(eachLineResult);
    }

    const title1 = ['Id', 'Surname', 'Name', 'Version'];
    // Create qList based on the number of questions
    const qList = [...Array(numberOfQuestions).keys()].map(i => `Q${i + 1}`);
    const title2 = ['Total'];
    const wholeTitle = [...title1, ...qList, ...title2];
    result.unshift(wholeTitle);
    //console.log('result:', result)
    return { result, container };

}

//filtered out blank lines
function filterMCQ(linesMCQ) {
    const filteredLinesMCQ = [];
    linesMCQ.forEach(m => {
        let first11Chars = m.substring(0, 11);
        let atLeastOneDigit = /\d/.test(first11Chars);
        if (atLeastOneDigit) {
            filteredLinesMCQ.push(m);
        }
    });

    return filteredLinesMCQ;
}

//check if format is all correct
export function isValidTxtFile(txtFile) {
    const linesMCQ = txtFile.split('\n');
    let errorMessages = [];
    let filteredLinesMCQ = filterMCQ(linesMCQ);

    filteredLinesMCQ.forEach((line, index) => {
        let isSpaceAfterID = line[11] === " ";
        let versionSubstring = line.substring(36, 44);
        let versionNumber = parseInt(versionSubstring, 10); // Parses it as a base-10 integer
        let versionValid = versionNumber >= 1 && versionNumber <= 99999999;
        let isSpaceBeforeAnswers = line[44] === " ";
        let reasons = [];

        if (!isSpaceAfterID) reasons.push("should have a space after ID");
        if (!isSpaceBeforeAnswers) reasons.push("should have a space before answers ");
        if (!versionValid) reasons.push("invalid version");
        if (reasons.length > 0) {
            errorMessages.push(`Line ${index + 1} error：${line.trim()} - Reason：${reasons.join(", ")}`);
            console.log('errorMessage:', errorMessages)
        }
    });

    //if error, throw it, will be caught in app.jsx
    if (errorMessages.length > 0) {
        //['line1 error....', 'Line2 error...', 'line3 error...'];
        throw (errorMessages);
    }
}
export function histogramData(result, container) {

    //how to access container here?
    const titles = result[0].slice(4, -1);
    // except you need to trim the first few and the last one
    const values = new Array(titles.length).fill(0);
    result.slice(1).forEach(row => {
        row.slice(4, -1).forEach((score, index) => {
            values[index] += Number(score);
        });
    });

    const finalValues = values.map((value, index) => value / container[index]);
    return { titles, finalValues };
}