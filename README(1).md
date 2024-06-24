
# Debuggeur

Ce jeux est inspiré du jeux du démineur, il à été revisité afin de pouvoir changer le thème et donc devenir un jeux avec comme thème la cybersécurité. Le but de ce jeux est de faire le meilleur score possible en trouvant les bugs qui sont caché sur la carte mère, vous aurez des indices suivant les cases au alentour.


## Installation

On clone le projet et install les dépendences  : 

```bash
  git clone https://github.com/Lhy-x/Debugger.git
  cd Debugger/front
  npm i
  cd api
  npm i
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/Lhy-x/Debugger.git
```

Go to the project front directory

```bash
  cd Debugger/front
```

Install dependencies

```bash
  npm install
```

Go to the project api directory

```bash
  cd api
```
Install dependencies

```bash
  npm install
  npx prisma migrate dev --name init
```
Go to the .env file 
```bash
DATABASE_URL="mysql://root:yourpassword@localhost:3306/api"
```
Start the api
```bash
  npm run dev
```