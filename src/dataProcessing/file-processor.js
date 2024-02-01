export function processFiles(csvFile, txtFile) {
    console.log(csvFile, txtFile);

    const result = [];

    const linesRubric = csvFile.split('\n');
    const linesMCQ = txtFile.split('\n');

    let filteredLinesMCQ = [];
    linesMCQ.forEach(m => {
        let first11Chars = m.substring(0, 11);
        let atLeastOneDigit = /\d/.test(first11Chars); // Regular expression to check if all are digits

        if (atLeastOneDigit) {
            filteredLinesMCQ.push(m);
        }
    });


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
        let studentAnswerArea = line.substring(45);
        const id = line.substring(2, 11).trim();


        const surname = line.substring(12, 25).trim();
        const familyName = line.substring(25, 33).trim();

        const version = line[43];


        const firstPart = [id, surname, familyName, version];

        for (const [old, newVal] of Object.entries(replacements)) {
            studentAnswerArea = studentAnswerArea.replaceAll(old, newVal);
        }

        const a1 = studentAnswerArea.split('');
        const eachVersionAnswerArr = [];
        const markArr = [];

        for (const lineRubric of linesRubric.slice(1)) {
            const lineArr = lineRubric.split(',');
            let eachQuestionAnswer = lineArr[parseInt(version)];
            //delete the lines break \r  change "A\r" to "A" in rubric
            eachQuestionAnswer = eachQuestionAnswer.replace(/(\r\n|\n|\r)/gm, "")
            eachVersionAnswerArr.push(eachQuestionAnswer);
            const eachQuestionMark = parseFloat(lineArr[0]);
            markArr.push(eachQuestionMark);
        }

        // console.log('111111:', [...a1]);

        for (let i = 0; i < eachVersionAnswerArr.length; i++) {

            if (a1[i] && a1[i] === eachVersionAnswerArr[i]) {
                a1[i] = markArr[i];
            } else {
                a1[i] = 0;
            }
        }

        // console.log('aaaaa', [...a1]);

        const secondPart = a1.slice(0, markArr.length);
        const marks = secondPart.filter(j => typeof j === 'number');
        const total = marks.reduce((acc, curr) => acc + curr, 0);

        const lineResult = [...firstPart, ...secondPart, total];
        result.push(lineResult);
    }

    const title1 = ['Id', 'Surname', 'Name', 'Version'];
    // Create qList based on the number of questions
    const qList = [...Array(numberOfQuestions).keys()].map(i => `Q${i + 1}`);

    const title2 = ['Total'];
    const wholeTitle = [...title1, ...qList, ...title2];
    result.unshift(wholeTitle);
    return result;
}

// export function isValidCSVFile(csvFileContents) {
//     for (const line of filteredLinesMCQ) {
//         let isSpaceAfterID = line[11] == " ";
//         let versionValid = ['1', '2', '3', '4'].includes(line[43]);
//         let IsSpaceAfterVersion = line[44] == " ";




//     }
//     // loop thru every line in file contents
//     // each line must have space after id
//     // each line must have space before answers
//     // each line must have valid version
//     const x = 400;
//     throw `Line ${x}: Must have a space after id`;
// }