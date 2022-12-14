# Module3 Project Gamma

# Group Name

Travel^2

# Group Members

Muhammad Rahman
Lena Zhang
Sarah Ahn
Rosario Davi

## Design

## Intended market

Travel^2 is a social traveling based application that is aimed to connect travelers and help expand their itinerary with suggestions on places they have never thought about exploring before. Our website contains an explore page where users can follow other users and be notified of their most recent venue post along with a trending page for reviews on a venue. Users can utilize the search bar to narrow down recommendations by city and state of the location they intend on visiting. In addition, users can also make post in regards to asking for recommendations and have other users reply in the form of comments.

## Built With

React
Redux
Bootstrap
Fast API
Python
JavaScript
PostgreSQL

## Functionality

Main Page/Home (Currently not functional until explore and trending functions are converted to Redux): Page is intended for users to search locations by state and city by redirecting to explore after submission.
Navigation bar: For users to sign up, login, and logout. In addition to navigating to other pages such as the explore, trending, and request page.
Explore: Venue cards with the ability to check out reviews for the venue and creating a review if logged in.
Trending: A page that populates all the most recent reviews made for a venue
Request: Making a request for recommendations with the access to viewing and making comments if user is logged in.
Unapproved venues: Admins will be able to approve or deny newly created venues before they show up for the first time based on accuracy and appropriateness.
Categories: Only admins are able to generate new categories for venues.

To make an admin account and approve submitted venues, when signing up, make the username "admin".

## Stretch Goals Functionality

Photo uploads, following follow system (have the tables setup so I know how that system would work with redux), add photos to go along with each category so venue cards show a different picture for its given category (since we don’t have photos being submitted with a create venue). Currently, the dashboard link in the admin view is blank, so we hope to consolidate unapproved venues and categories pages into that one dashboard page. The home page currently is not functional. We plan to convert the explore and trending GET requests into Redux functions so that inputting the city and state into the page page would redirect to the explore page with the submitted information being used for the first GET request. JWTDown for FastAPI uses third-party cookies to work, which Safari blocks by default. This means it won't work on iPhone as well, unless the user goes to their settings and manually changes the setting.

## Testing

fastapi-traveltwo\tests\test_account.py - Muhammad Rahman
fastapi-traveltwo\tests\test_request.py - Lena Zhang
fastapi-traveltwo\tests\test_review.py - Sarah Ahn
fastapi-traveltwo\tests\test_venue.py - Rosario Davi

## Start up

To grab the project:

Fork and clone the repository from https://gitlab.com/travel-two/module3-project-gamma.

You can open the project in VScode to see the code.

To review the running project:

Start by opening docker and your terminal.

Run these commands in this order:

docker volume create postgres-data
docker volume create pg-admin

For PC run docker-compose build
For Mac run DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build

Lastly, run docker-compose up.

All containers should be running now.

Once containers are up and running, visit localhost:3000 to view the website.

To run tests:

Run the command:

python -m pytest inside the travel-squared container.

## Getting started

You have a project repository, now what? The next section
lists all of the deliverables that are due at the end of the
week. Below is some guidance for getting started on the
tasks for this week.

## Install Extensions

- Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
- Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

- [ ] Wire-frame diagrams
- [ ] API documentation
- [ ] Project is deployed to Render.com/GitLab-pages
- [ ] GitLab issue board is setup and in use
- [ ] Journals

## Project layout

The layout of the project is just like all of the projects
you did with `docker-compose` in module #2. You will create
a directory in the root of the repository for each service
that you add to your project just like those previous
projects were setup.

### Directories

Several directories have been added to your project. The
directories `docs` and `journals` are places for you and
your team-mates to, respectively, put any documentation
about your project that you create and to put your
project-journal entries. See the _README.md_ file in each
directory for more info.

The other directories, `ghi` and `sample_service`, are
sample services, that you can start building off of or use
as a reference point.

Inside of `ghi` is a minimal React app that has an "under
construction" page. It is setup similarly to all of the
other React projects that you have worked on.

Inside of `sample_service` is a minimal FastAPI application.
"Where are all the files?" you might ask? Well, the
`main.py` file is the whole thing, and go take look inside
of it... There's not even much in there..., hmm? That is
FastAPI, we'll learn more about it in the coming days. Can
you figure out what this little web-application does even
though you haven't learned about FastAPI yet?

Also in `sample_service` is a directory for your migrations.
If you choose to use PostgreSQL, then you'll want to use
migrations to control your database. Unlike Django, where
migrations were automatically created for you, you'll write
yours by hand using DDL. Don't worry about not knowing what
DDL means; we have you covered. There's a sample migration
in there that creates two tables so you can see what they
look like.

The sample Dockerfile and Dockerfile.dev run your migrations
for you automatically.

### Other files

The following project files have been created as a minimal
starting point. Please follow the guidance for each one for
a most successful project.

- `docker-compose.yaml`: there isn't much in here, just a
  **really** simple UI and FastAPI service. Add services
  (like a database) to this file as you did with previous
  projects in module #2.
- `.gitlab-ci.yml`: This is your "ci/cd" file where you will
  configure automated unit tests, code quality checks, and
  the building and deployment of your production system.
  Currently, all it does is deploy an "under construction"
  page to your production UI on GitLab and a sample backend
  to Render.com. We will learn much more about this file.
- `.gitignore`: This is a file that prevents unwanted files
  from getting added to your repository, files like
  `pyc` files, `__pycache__`, etc. We've set it up so that
  it has a good default configuration for Python projects.

## How to complete the initial deploy

There will be further guidance on completing the initial
deployment, but it just consists of these steps:

### Setup GitLab repo/project

- make sure this project is in a group. If it isn't, stop
  now and move it to a GitLab group
- remove the fork relationship: In GitLab go to:

  Settings -> General -> Advanced -> Remove fork relationship

- add these GitLab CI/CD variables:
  - PUBLIC_URL : this is your gitlab pages URL
  - SAMPLE_SERVICE_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME

### Create render.com account and application

- create account on render.com
- one person create a group and invite all other members
- create a new "Web Service"
  - authenticate with GitLab and choose your project
  - Enter fields:
    - Name: name of your service
    - Root Directory: the directory of your service in your git repo.
      For this example use "sample_service".
    - Environment: Docker
    - Plan Type: Free
  - click the "Create Web Service" button to create it
  - the build will succeed and it will look like the server is running,
    most likely, in 6-10 minutes, it will fail.
  - click "Manual Deploy" -> "Deploy latest commit" and the service
    should deploy successfully.

### Update GitLab CI/CD variables

Copy the service URL for your new render.com service and then paste
that into the value for the SAMPLE_SERVICE_API_HOST CI/CD variable
in GitLab.

### Deploy it

Merge a change into main to kick off the initial deploy. Once the build pipeline
finishes you should be able to see an "under construction" page on your GitLab
pages site.
