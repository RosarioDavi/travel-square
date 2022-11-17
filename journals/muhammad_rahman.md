11/16
Today we started our Postgresql database and its tables. We were able to break down all the entities we have identified by far. It seems that a lot of tables are required to show complex relationships such as likes and follows. Based on my readings of implementations done by others, having separate tables for these actions that can be done to multiple items (reviews to be liked and users to be followed) makes the data compliant to RDBMS standards. We are wary about how this works with user accounts where there are two roles: admin and standard user. We will consult Riley in the morning. We have also identified two possible venue address validating APIs, YAddress (requires simple JSON) and the USPS Address Validator (requires complex XML). I believe YAddress simplifies most of the work in a easy to code fashion, but has up to 1000 free requests.

11/15
We're getting a better understanding of what tables our data will rely on. We are considering using the accounts feature as part of the main backend microservice instead of polling AccountVOs from a separate accounts microservice. The issue is understanding how we can assign users to their account profiles. We plan on going through more of the explorations, especially on authentication, and look into the Books demo project to see how accounts and roles were implemented.

11/14
Today we worked on finishing up the exploration on databases and FastAPI.
We have a solid understanding of what core features our application rely on.
We will continue to brush up on FastAPI in preparation for beginning our code
tomorrow. I really look forward to seeing how we break down our accounts microservice.
