# 🚀 LingoBoost - Interactive Language Learning Platform

## 🌟 Project Overview

LingoBoost is a modern web application that makes language learning fun and engaging through gamified experiences. It offers various interactive modules to help users master vocabulary in multiple languages.


<p align="center">
  <img src="screenshots/home_dark.png" alt="LingoBoost Homepage Dark Mode" width="45%">
  <img src="screenshots/home_light.png" alt="LingoBoost Homepage Light Mode" width="45%">
</p>


---

## 🛠️ Technology Stack

### Frontend Technologies

| Technology       | Purpose                 | Badge                                                                 |
|------------------|-------------------------|-----------------------------------------------------------------------|
| HTML5            | Structure & Content     | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) |
| CSS3             | Styling & Layout        | ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) |
| JavaScript (ES6+)| Interactivity & Logic   | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) |
| Font Awesome     | Icons                   | ![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=flat&logo=font-awesome&logoColor=white) |

### Backend Technologies

| Technology       | Purpose                 | Badge                                                                 |
|------------------|-------------------------|-----------------------------------------------------------------------|
| Node.js          | Runtime Environment     | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) |
| Express.js       | API Framework           | ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) |
| MongoDB          | Database                | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) |

### Third-Party Services

| Service          | Purpose                 | Badge                                                                 |
|------------------|-------------------------|-----------------------------------------------------------------------|
| EmailJS          | Contact Form Handling   | ![EmailJS](https://img.shields.io/badge/EmailJS-FF4136?style=flat) |
| YouTube API      | Video Lessons           | ![YouTube API](https://img.shields.io/badge/YouTube_API-FF0000?style=flat&logo=youtube&logoColor=white) |

---

## 🏃‍♂️ How to Run the Project

### Prerequisites
✔ Modern web browser (Chrome, Firefox, Edge, Safari)  
✔ Internet connection (for API access)

### Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zwezdica/lingoboost_frontend.git
   cd lingoboost

## 🏃‍♂️ Development Setup

### Prerequisites
- Node.js (v14 or higher)
- Modern web browser (Chrome, Firefox, Edge)

### Running Locally

1. **Install dependencies**:
   ```bash
   npm install
Start development server:

2. **Start development server**:
   ```bash
   npm start

3. **or using http-server**:
  ```bash
  npx http-server
```

4. **Access the application**:
Open http://localhost:5000 in your browser



## 📂 Project Structure
lingoboost-module/    
├── public/        
│ ├── css/          
│ ├── img/          
│ ├── src/              
│ │ ├── auth/              
│ │ │ ├── admin/               
│ │ │ │ ├── admin.api.js                 
│ │ │ │ ├── admin.events.js              
│ │ │ │ ├── admin.ui.js            
│ │ │ │ └── admin.js            
│ │ │ ├── login/               
│ │ │ ├── register/                    
│ │ │ ├── auth.api.js                 
│ │ │ ├── auth.constants.js                    
│ │ │ ├── auth.events.js               
│ │ │ └── auth.ui.js                     
│ │ └── features/                                      
│ │ ├── bingo/
│ │ │ ├── bingo.api.js                 
│ │ │ ├── bingo.constants.js                 
│ │ │ ├── bingo.events.js                     
│ │ │ ├── bingo.game.js                      
│ │ │ ├── bingo.ui.js                     
│ │ │ └── bingo.utils.js                   
│ │ ├── dictionary/                         
│ │ ├── dragdrops/                    
│ │ ├── flashcards/                      
│ │ ├── guesswords/                      
│ │ ├── home/                      
│ │ └── quiz/                      
│ ├── admin.html                          
│ ├── bingo.html                        
│ ├── dictionary.html                        
│ ├── dragdrops.html                      
│ ├── flashcards.html                           
│ ├── guesswords.html                          
│ ├── index.html                      
│ ├── login.html                   
│ ├── quiz.html                 
│ └── register.html                       

     

## ✨ Features

### 🎮 Interactive Learning Games
- 🎲 Bingo vocabulary game
- 🖱️ Drag & Drop matching
- 🔤 Digital flashcards
- ❓ Word guessing challenges
- 📝 Language quizzes
  <p align="center">
  <img src="screenshots/quiz_dark.png" alt="Quiz Module Dark Mode" width="45%">
  <img src="screenshots/quiz_light.png" alt="Quiz Module Light Mode" width="45%">    
      <br>
  <em>Language quiz interface in both color modes</em>
</p>


### 📚 Comprehensive Dictionary
- 🔍 Word search functionality
- 🌐 Multiple language support

<p align="center">
  <img src="screenshots/dictionary_dark.png" alt="Dictionary Feature Dark Mode" width="45%">
  <img src="screenshots/dictionary_light.png" alt="Dictionary Feature Light Mode" width="45%">  
    <br>
  <em>Dictionary search results comparison</em>
</p>

### 👤 User System
- 🔐 Secure authentication
- ⚙️ Admin dashboard

  <p align="center">
  <img src="screenshots/register_dark.png" alt="Registration Form Dark Mode" width="45%">
  <img src="screenshots/register_light.png" alt="Registration Form Light Mode" width="45%">   
      <br>
  <em>User registration form with password requirements</em>
</p>


## ➕ Additional Features
- 🌙 Dark/light mode toggle

- 🌐 Language selector (persists across sessions)

- 📱 Responsive design

- 💫 Interactive UI elements

- ✉️ Contact form with email integration
