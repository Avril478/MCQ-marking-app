Welcome to Avril's App!!!!!!
This is an offline desktop app which is for UOA lecturers to automatically mark students' MCQ questions.

Quick Start!

1. you should have already installed NodeJs
2. to check if you have node: node -v
3. to check npm: npm -v
4. navigate into the app folder, then run npm install to install dependencies
5. then npm run dev to start the dev server (which supports hot reloading).
6. It should create a server running on localhost:5173.
7. if you are a macOS user, press command+click URL to open the application window.

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

The app is also built as zip, you can directly download zip and use it without any npm stuff.
