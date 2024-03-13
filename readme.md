> create virutal environment
> activate virtual environment
> go to root directory - flask_app.
> run pip install -r requirements.txt to install packages from that txt file.

<!-- skip, if you already know. -->
> install sqlite or sqlite viewer extension in vscode to see the db tables
> delete and re create db if you want.
    > run python command in terminal inside root directory - (flask_app) not the project directory (flask_app) and enter below lines
    > from flask_app import app, db
    > app.app_context().push() #this will create emtpy instance folder in root
    > db.create_all() #this will add site.db file inside instance folder
    > if you want to delete all the tables from db, enter below command.
    > db.drop_all()
<!-- skip, if you already know. -->

> run python run.py to start the server inside root directory


# project structure
- flask_app > - root directory
    - flask_app > - project directory
        - templates >
            - base.html
            - files.html
            - about.html
        - __init__.py
        - forms.py
        - models.py
        - routes.py
    - instance >
        - site.db
    - run.py



#for tailwindcss style

>install nodejs

#follow the steps.
> https://tailwindcss.com/docs/installation

#keep this command running in separate terminal. this will watch all the changes done in the class="" of html files. check tailwind.config.js file. I have metioned required html files.

> npx tailwindcss -i ./flask_app/static/input.css -o ./flask_app/static/output.css --watch 

#once all the desiging is done, run below command. this command will remove all the unnecessary styling from output.css. our output file size is now less than 10kb.

> npx tailwindcss -i ./flask_app/static/input.css -o ./flask_app/static/output.css --minify