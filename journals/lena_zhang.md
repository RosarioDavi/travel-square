November, 29 2022
Today I reviewed my navbar with Rosario and showed him how to input the bootstrap stylesheet. I spent the rest of the day learning React hooks. I got started on my create a request component and will continue to work on it tomorrow. I did get a CORS issue and will try to fix it tomorrow.

November 28, 2022
Today I worked on getting all of comments to show up. I pair programmed with Muhammad and he was able to help me debug on what the issues were. Afterwards I retested my request and comments endpoints to make sure it all works. Afterwards, I moved onto starting the react frontend. Rosario and I were getting started on the react and we split up the work with him creating the main page while I worked on the navbar using bootstrap. I plan on reviewing react Hooks and functional components before I start on my components tomorrow.

November 23, 2022
Today I worked on adding the innerjoin for requests and comments. After adding the innerjoins I had some issue with creating and getting all of my requests to show up. I pair programmed with Muhammad to debug my issues and got both of the create and get all to work. I tried implementing the innerjoins for my comments as well. The create comment worked out fine. However, I am still struggling to have all my comments to show up because there is a comments id for each comment but the comment is correlated with a particular request with an id. My goal is to get all my comments to show up for the single request post by the id of which still needs to be worked on.

November 22, 2022
Today I worked on finishing up my comments queries and routers. After our stand up with the group, we mapped out all the endpoints and talked about it. This was helpful for me to see what correlations I needed to make. For instance, every comment goes on one request so I made sure to get add that to the api endpoints. I cleaned up my code for requests and tested to make sure that all of comments worked. For tomorrow, I will work on adding the Innerjoin of the tables of which I forgot to do for today.

November 21, 2022
Today I worked on: the requests queries and models. Once I was done with the requests queries and routers, I was ready to test the endpoints. For my request endpoints it was associated with a specific account so I waited on Muhammad to finish them. In the meantime, I started on the comments queries and routers. Once the accounts endpoints worked successfully, I was able to test out my requests. At first I had issues with the "created_at" dates in RequestIn and RequestOut since it was automatically defaulted. After I fixed that I struggled with a 400 error on creating a request. Even though creating the request worked and the RequestOut was just how it should have been I was constantly getting a response = 400. After a long struggle I realized that it was because the response.status.code was set to 400 but I was able to end the night with all my request endpoints working!

November 18, 2022
Today the team decided that we will be using Postgres. We worked on reverting the models, docker yaml files and the databases back to the previous working ones we had with Postgres. After some issues with the yaml file, we fixed and tested to make sure that the docker was running. We all split up the work on creating the queries and routers file for the different models. I am currently working on the requests queries file.

November 17, 2022
Today we have decided that we are going to use MONGODB as our database. We fixed the yaml file to update it with the MONGODB database and recreated the models.py. During this time, our group split up on starting the queries and routers for the models. I started working on the accounts model as it was similar to the library one given to us in class since we wanted to differentiate different roles and responsibilities. Afterwards, I worked on queries and routers files for comments and requests. I was still adjusting and learning MongoDB so there were many parts of the code I still didn't completely understand. However, upon discussion, our group is most likely going to revert our database back to PostgreSQL.

November 16, 2022
We started off stand up today going over trello and how we will use it to keep track of our developments and bugs that needs to be worked on. We decided with the help of Dalonte that we will just have two microservices: the frontend react and backend database. For our database, we first mapped out the models on Excalidraw and divided the creation of the tables using postgres SQL. We will review MongoDB's exploration tonight to see whether Postgres or MongoDB is more suitable for our project.

November 15, 2022
Today I created the Docker yaml file, relational-data directory and the fastAPI directory for the accounts. I was able to run the docker container with ports and pgAdmin successfully. Tomorrow during stand up I will share the updates with the team and discuss how many databases and microservices we would like to have.

November 14, 2022
Today we spent time reviewing the FastAPI and database explorations to solidify our understanding. I am re-reading and following along the exploration tutorial again to better my understanding of fastAPI. We will continue to work on our endpoints and think of how we can apply fastAPI to our project. I look forwards to start coding and building our project after the lecture on fastAPI tomorrow!
