import express, { Application } from "express";

console.log('call');

const app = express();


 app.listen(3001, () => {
   console.log(`Server is running on http://localhost:3001`);
 });