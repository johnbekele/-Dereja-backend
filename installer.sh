@echo off
echo ================================
echo Starting installer
echo ================================

echo ================================
echo Setting up express server package installation
echo ================================

npm install express
npm install body-parser
npm install mongoose
npm install cors
npm install dotenv
npm install nodemon --save-dev
npm install bcryptjs
npm install jsonwebtoken
npm install multer
npm install cloudinary
npm install express-validator
npm install cookie-parser
npm install morgan
npm install helmet
npm install passport
npm install socket.io

echo ================================
echo Installation complete!
echo Run server with: npx nodemon src\server.js
echo ================================
