import { processFiles } from "./file-processor.js";

const txtFile = `01723647626 SURNAMEX     NAMEX   76100000004 04  040801                                                                                                                                                                                                 
01823748762 SURNAMEY     NAMEY   76100000003 0402081601                                                                                                                                                                                                 
01893749857 SURNAMEZ     NAMEZ   76100000002 021616  08                              
01376473643 SURNAMEW     NAMEW   76100000001 0102080208`


const csvFile = `mark,version 1,version 2,version 3,version 4
0.5,A,B,A,E
1,B,B,B,C
1,D,A,E,E
1,B,A,C,D
1.5,D,B,A,A
2,A,A,A,A,
3,B,B,B,B,
3,C,C,C,C`;

const result = processFiles(csvFile, txtFile);
console.log("Processing result");
console.log(result);