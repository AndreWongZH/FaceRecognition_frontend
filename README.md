# SmartBrain Frontend

Background of application implemented with react-particles-js, to give a scientific look.
Application is able to signin and register through API call to backend @ https://smartbrains-backend.herokuapp.com/.
Once signed in, user can upload pictures onto the app and then the faces in the photos will be marked out in a blue border.
Sign in data of users will be captured and saved in our postgresql database in heroku.
Password of users will be hashed by bcrypt-nodejs and then saved in database for improved security protocol.

What I learnt most about this project is learning writing backend code using Express.js and connecting heroku with Postgresql. It was not easy as I struggled to understand how to set up the database on Heroku. There were other problems that I face, such as understanding Cross-Origin Resource Sharing(CORS) and how asynchronous calls to the backend sometimes will not cause react components to refresh. In the end, with the help from fellow programming community and serveral articles on these topics, I had a deeper understanding of these topics.