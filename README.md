How to set up and run?
1.	Clone the Repository: Run the following command to clone the repository:
```bash
git clone https://github.com/janmesh1814/Briskk.git
```

3.	Change to the Product Directory: Navigate to the cloned repository's product directory:
```bash
 cd product
 ```

3.	Set Up the Backend: Change to the backend directory and install the necessary dependencies:
```bash
cd backend
npm install express mongoose cors dotenv body-parser nodemon
```

4.	Set Up the Frontend: Change back to the frontend directory and install the required packages:
```bash
cd ..
cd frontend
npm install react-router-dom axios dotenv
```

5.	Run the Application: Open two terminal windows to run the frontend and backend simultaneously:
             In the first terminal, navigate to the frontend directory and start the React application:
```bash
cd frontend
npm run dev
```
6.    In the second terminal, navigate to the backend directory and start the Node.js server using nodemon:
```bash
cd backend
nodemon app.js
```
Now, your Briskk application should be up and running, and you can access it through your web browser.

