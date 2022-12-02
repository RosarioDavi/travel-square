12/01/22
- after discussing with the team, I'll be responsible for the CSS for the home page. I'm excited to get better at CSS and gain a better understanding how to make website look nice
- spent the day going over the React hooks exploration and reading documentation
- still unsure on what my Review Form needs to look like, but I've started with the inputs I need
- didn't get to modals today so I'll review them tomorrow

11/30/22
- started working on the front-end of reviews. I don't remember much about React hooks from the previous exploration so I spent part of the day refreshing my memory. I put placeholder code for now in ReviewForm.js
- wanted to get some more practice with React and CSS so I looked through some Codepen styling submissions for inspiration. Lena and Rosario started on the home page, so I commented out their code and used a Codepen template that I liked. The template uses flexbox, which I need to read more about after I get my reviews front-end working
- also need to learn about modals tomorrow to incorporate that on the reviews page

11/29/22
- changed various parts of the reviews queries code and got different errors, which I'm working through to understand. Got a validation error and a type error
- pairprogrammed with Muhammad and found that I had the wrong except block on the get_all_reviews query
- also found that I added an unnecessary comma after the last SQL query column. I also needed additional arguments in the get_one_review_for_venue query
- all of the review queries and routers are finally working in FastAPI, and I'm in disbelief. Hope it still works tomorrow

11/28/22
- gained a better understanding of what needs to be done for the review inner joins by pairprogramming with Muhammad; reviews will have an inner joins with accounts and venues through their ids
- using trial and error to test out the reviews code in FastAPI. I added more fields in the ReviewOut model and SQL queries but I'm not sure where the bug is. I keep getting a validation error
- ended the day with the reviews code still not working

11/23/22
- after pushing my changes this morning, I realized that my reviews methods are showing up on FastAPI. I'm not exactly sure what caused the changed, but it may be due to updating main.py to include the reviews router after speaking to the team
- after discussing with Muhammad, I added the placeholder for the get_all_reviews method so that we will be able to filter by city and state later in queries and routers folders
- I feel that I am understanding queries and routers much better today than I did earlier this week

11/22/22
- still not feeling well
- talked to Lena and gained a much better understanding what needs to be done
- had previously renamed variables that I changed back to match the table
- still ended the day with reviews not showing up on the FastAPI page. Will ask the team tomorrow for help with the bug

11/21/22
- feeling sick today so not able to work at 100%
- spent the day trying to understand what code needs to go under queries and routers
- watched a tutorial but still unsure
- ended the day with reviews still not showing up on the FastAPI page

11/18/22
- the team discussed using Postgres instead of MongoDB due to MongoDB potentially being unable to handle the relationships between our models
- we have divided the work to complete queries and routers files, and I've been assigned the reviews. I struggled for a while to get the port 8000 docker container to work, and it turns out that I had been using the wrong git command
- I plan to review the FastAPI videos again to gain a better understanding

11/17/22
- the team moved forward with MongoDB, and we split up the queries and routers files. We spent the day filling out our files while Muhammad set up models.py
- I'm still getting more familiarized with Mongo and Postres, but I think I'm getting the hang of git in a group setting
- Muhammad mentioned that we may need to go back to Postres so we will visit that tomorrow

11/16/22
- reviewed the Trello workspace with the team, and everyone agreed to use it for project management
- the team chose to use Postres but after further discussion we may go with MongoDB. We will consult an instructor tomorrow regarding this
- we worked on mapping out the models in Excalidraw and then created SQL tables based on those models
- need to learn more about MongoDB tonight

11/15/22
- the team discussed whether we should put Accounts in its own microservice. We concluded that we'd like to consult Dalonte for this tomorrow. We also discussed whether we should use Postgres or MongoDB, and we are leaning towards Postgres
- reviewed exploration materials for user stories and created a Trello workspace for Travel Squared that contains the user stories, bug tracker, and stand-up board we'll use daily. Each board has a sample post in case someone isn't sure what to write. I plan to review all of the boards and receive feedback from the team tomorrow

11/14/22
- in the D5 exploration, learned about user stories, Agile methodologies, and bug tracking
- reviewed our previous night's exploration on FastAPI
- tomorrow, we should agree on a project management system with bug tracking and how to prioritize our work
- last Thursday, I pushed my updates to doc/api-design.md
