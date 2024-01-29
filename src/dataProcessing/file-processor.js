export function processFiles(csvFile, txtFile) {
    console.log(csvFile, txtFile);

    const linesMCQ = txtFile.split('\n');
    const linesRubric = csvFile.split('\n');
    const result = [];

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

    for (const line of linesMCQ) {
        let studentAnswerArea = line.substring(45);
        const id = line.substring(2, 11).trim();
        const surname = line.substring(12, 20).trim();
        const familyName = line.substring(25, 30).trim();
        const version = line.substring(43, 44);
        const firstPart = [id, surname, familyName, version];

        for (const [old, newVal] of Object.entries(replacements)) {
            studentAnswerArea = studentAnswerArea.replaceAll(old, newVal);
        }

        const a1 = studentAnswerArea.split('');
        const eachVersionAnswerArr = [];
        const markArr = [];

        for (const lineRubric of linesRubric.slice(1)) {
            const lineArr = lineRubric.split(',');
            const eachQuestionAnswer = lineArr[parseInt(version)];
            eachVersionAnswerArr.push(eachQuestionAnswer);
            const eachQuestionMark = parseFloat(lineArr[0]);
            markArr.push(eachQuestionMark);
        }

        for (let i = 0; i < eachVersionAnswerArr.length; i++) {
            if (a1[i] === eachVersionAnswerArr[i]) {
                a1[i] = markArr[i];
            } else {
                a1[i] = 0;
            }
        }

        const secondPart = a1.slice(0, markArr.length);
        const marks = secondPart.filter(j => typeof j === 'float');
        const total = marks.reduce((acc, curr) => acc + curr, 0);

        const lineResult = [...firstPart, ...secondPart, total];
        result.push(lineResult);
    }

    const title1 = ['id', 'surname', 'name', 'version'];
    // Create qList based on the number of questions
    const qList = [...Array(numberOfQuestions).keys()].map(i => `Q${i + 1}`);
    const title2 = ['Total'];
    const wholeTitle = [...title1, ...qList, ...title2];
    result.unshift(wholeTitle);
    console.log('processor:', result)
    return result;
}
