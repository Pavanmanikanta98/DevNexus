# DevNexus

DevNexus is a social platform designed for developers to connect, share knowledge, and collaboratively solve real-world problems, similar to LinkedIn. The application facilitates user interactions through profiles, connections, and a dedicated post section for problem-solving discussions.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Default.json](#Default.json)
- [Contributing](#contributing)
- [License](#license)


## Sample Images

Here are a few sample images showcasing the DevNexus application:


*DevNexus Landing Page*
![Screenshot from 2024-08-10 11-38-05](https://github.com/user-attachments/assets/981088fb-66ee-4db1-b28f-9603e86ad7a8)




*DevNexus Dashboard / user Profile*
![Screenshot from 2024-08-10 11-44-04](https://github.com/user-attachments/assets/4c711ae6-d5d5-4b53-b8b1-102f6a820451)



*DevNexus Developers Profile*
![Screenshot from 2024-08-10 11-45-33](https://github.com/user-attachments/assets/57c01363-0ec1-41de-88f0-93b1a847b60d)



*DevNexus Post Section*
![Screenshot from 2024-08-10 11-44-59](https://github.com/user-attachments/assets/ac0d2971-a88a-4103-9704-ba8d4f6d8926)




*DevNexus Developers Page*
![Screenshot from 2024-08-10 11-44-29](https://github.com/user-attachments/assets/c2a2c5ed-367d-4a63-838e-1970e6977f1d)



## Features

- **User Profiles**: Create and manage user profiles to showcase skills and experiences.
- **Connections**: Connect with other developers to expand your professional network.
- **Post Section**: Share posts, ask questions, and provide solutions to foster a collaborative community.
- **Responsive Design**: Ensures a seamless user experience across various devices.

## Technologies Used

- **Frontend**: React, Redux
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Version Control**: Git

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.



## Default.json
The default.json file is essential for configuring your application, specifying important settings such as the MongoDB connection string, JWT secret, and GitHub credentials. Below is a sample structure of the default.json file:
   ```bash
  {
  "mongoURI": "Add your MongoDB connection string",
  "jwtSecret": "Add your JWT secret",
  "github": {
    "clientID": "Add your client ID here (Get one for GitHub)",
    "clientSecret": "Add your client secret here"
  }
}
```


## Installation
To set up the DevNexus project locally, follow these steps:

 Clone the repository:
 ```bash
   git clone https://github.com/Pavanmanikanta98/DevNexus.git
   cd DevNexus
```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Have look on sample-default.json [Default.json](#Default.json)
     ```bash
     npm run dev
     ```






## License
This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit) file for details.












