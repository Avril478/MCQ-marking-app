Welcome to Avril's App!!!!!!
This is an offline desktop app which is for UOA lecturers to automatically mark students' MCQ questions.

Figma link: <https://www.figma.com/file/vJwX7KJFHcVs1ErbDmjfkt/MCQ-app?type=design&node-id=0%3A1&mode=dev&t=sqe2vsWOxzDW8ACh-1>

my email: kwan380@aucklanduni.ac.nz

Quick Start!

1. you should have already installed NodeJs
2. to check if you have node: node -v
3. to check npm: npm -v
4. Run npm install in this folder to install dependencies
5. then npm run dev to start the dev server (which supports hot reloading).
6. It should create a server running on localhost:5173.
7. if you are a macOS user, press command+click URL to open the application window.

Building for production:

1. Run npm run build in this folder:MCQ-MARKING-APP, it will create a "dist" folder under this folder
2. If you see "some chunks are larger than 500 kb after minification..", just ignore!
3. Navigate into ebuild folder
4. Run npm install in the ebuild folder to install Electron dependencies (only need to do this the first time)
5. Drag the dist folder which you created in step 1 into the ebuild folder (if there is a n old dist folder in the ebuild folder, delete the old one first, only keep the new dist folder in the ebuild)
6. Run npm run make in the ebuild folder to build the desktop app
7. You will see a path in the terminal, follow the path and navigate to ebuild/out/MCQ-APP-darwin-arm64 in your local PC, double click MCQ-APP.app(in mac) or MCQ-APP.exe(in windows), it will pop out the app.

Instructions:

1. upload csv file -->rubric, which should be the same format as my codes: src/assets/rubric.csv or rubric.png important!!!!!!
2. upload txt file -->students answer, which should be the same format as my codes: src/assets/data-example.txt
3. there should be a space between ID and name, also a space between test version and answers.
4. version should be between 00000001 and 99999999
5. the txt format should make 3 conditions all true, otherwise it will show the error.
6. you can also click the histogram icon to open the data analysis.
7. click download button to download result as csv file.
8. you can also click steps bar to go back to previous pages, but you can not skip steps.
9. if you click NO in the final pop out window, the application will automatically close.

id : between index 2 and index 10;
surname : between index 12 and 24;
familyName : between index 25 and 32;
version : between index 36 and 43;
studentAnswerString : starts from index 45;
your space must be in 2 places:
One is index 11
The other is index 44

correct format data should be same as src/assets/data-example.txt:
01013881863 JFMMMMMMMMMMMNBRENNNN36700000002 020116010416080204020408

wrong format data example:

version error- should be consistent with rubric-test.csv
and 2 spaces error(index 11 and 44 are not spaces):
01 07045900DCGZLZT PSMU 36700000008 010408020204040801040208
version error:
01004837115 KMTO DTQ 3670000000A 020804040408040408010404

The app is also built as zip, you can directly download zip and use it without any npm stuff.
