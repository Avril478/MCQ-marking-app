export function processFiles(csvFile, txtFile) {
    console.log(csvFile, txtFile);

    const result = [];
    let container = [];

    const linesRubric = csvFile.split('\n');
    const linesMCQ = txtFile.split('\n');
    let filteredLinesMCQ = [];


    linesMCQ.forEach(m => {
        let first11Chars = m.substring(0, 11);
        let atLeastOneDigit = /\d/.test(first11Chars);
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



        for (let i = 0; i < eachVersionAnswerArr.length; i++) {

            if (a1[i] && a1[i] === eachVersionAnswerArr[i]) {
                a1[i] = markArr[i];
            } else {
                a1[i] = 0;
            }
        }

        const secondPart = a1.slice(0, markArr.length);
        //[1,2,0,0.5,0,1]


        const total = secondPart.reduce((acc, curr) => acc + curr, 0);

        const lineResult = [...firstPart, ...secondPart, total];
        result.push(lineResult);

        container = markArr;
    }



    const title1 = ['Id', 'Surname', 'Name', 'Version'];
    // Create qList based on the number of questions
    const qList = [...Array(numberOfQuestions).keys()].map(i => `Q${i + 1}`);

    const title2 = ['Total'];
    const wholeTitle = [...title1, ...qList, ...title2];
    result.unshift(wholeTitle);
    console.log('result:', result)
    //console.log('container:', container) 
    return result;
}

export function isValidTxtFile(txtFile) {
    const lines = txtFile.split('\n');
    let errorMessages = [];

    lines.forEach((line, index) => {
        // 定义错误检查逻辑
        let isSpaceAfterID = line[11] === " ";
        let versionValid = ['1', '2', '3', '4'].includes(line[43]);
        let isSpaceBeforeAnswers = line[44] === " ";

        // 收集错误原因
        let reasons = [];
        if (!isSpaceAfterID) reasons.push("There should a space between ID and surname");
        if (!isSpaceBeforeAnswers) reasons.push("There should a space between version and answers ");
        if (!versionValid) reasons.push("unvalid version");

        // 如果有错误，添加到错误消息列表中
        if (reasons.length > 0) {
            errorMessages.push(`Line${index + 1}error：${line.trim()} - Reason：${reasons.join(", ")}`);
        }
    });

    //如果有错误消息，抛出错误
    if (errorMessages.length > 0) {
        throw (errorMessages.join("\n"));// Return an object with 'test'
    }

}
export function histogramData(result) {
    //how to access container here?

    const titles = result[0].slice(4, -1); // except you need to trim the first few and the last one

    const values = new Array(titles.length).fill(0);
    result.slice(1).forEach(row => {
        row.slice(4, -1).forEach((score, index) => {
            values[index] += Number(score);
        });
    });
    const finalValues = values.map((value, index) => value / container[index]);

    console.log('value:', finalValues)
    return { titles, finalValues };
}