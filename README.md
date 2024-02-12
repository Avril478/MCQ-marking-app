Welcome to Avril's App!!!!!!
This is an offline desktop app which is for UOA lecturers to automatically mark students' MCQ questions.

Figma link: <https://www.figma.com/file/vJwX7KJFHcVs1ErbDmjfkt/MCQ-app?type=design&node-id=0%3studentAnswerArr&mode=dev&t=sqe2vsWOxzDW8ACh-1>

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

1. Run npm run build in this folder, it will create a "dist" folder with your production-ready webapp
2. Navigate into ebuild folder
3. Run npm install in the ebuild folder to install Electron dependencies (only need to do this the first time)
4. Copy the dist folder into the ebuild folder (delete the old ebuild dist folder first)
5. Run npm run make in the ebuild folder to build the desktop app

Instructions:

1. upload csv file -->rubric, which should be the same format as src/assets/rubric.csv or rubric.png
2. upload txt file -->students answer, which should be the same format as src/assets/data-example.txt
3. there should be a space between ID and name, also a space between test version and answers.
4. version should be between 00000001 and 99999999
5. the txt format should make 3 conditions all true, otherwise it will show the error toast.
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
eg: 01013881863 JFMMMMMMMMMMMNBRENNNN36700000002 020116010416080204020408

The app is also built as zip, you can directly download zip and use it without any npm stuff.
