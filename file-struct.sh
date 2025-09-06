# bash

mvc_model() {
    echo "Model-View-Controller (MVC) is a software architectural pattern that separates an application into three main components: Model, View, and Controller. This separation helps in organizing code, improving maintainability, and facilitating collaboration among developers. 
    Here's a brief overview of each component:"
    inpute=$choice
    current_dir=$(pwd)
    read -p "please enter your issue number (if any): " issue_number

    echo "starting creating the MVC structure in :${current_dir} "
    echo "===================================="
    mkdir -p src/{models,views,controllers,routes,config} 
    touch .prettierrc .gitignore README.md

    if [ $? -eq 0 ]; then
        echo "MVC structure created successfully."
        echo "staging the created files"
        git add .
        if [ $? -eq 0 ]; then
            echo "Files staged successfully."
            if [ -n "$issue_number" ]; then
                git commit -m "#Resolves Folder structure: models/, routes/, controllers/, middleware/, config/ set up MVC structure for issue #$issue_number"
                if [ $? -eq 0 ]; then 
                    echo "Files committed successfully with issue number #$issue_number."
                    echo "===================================="
                    echo "pushing to remote repository"
                    git push origin main
                    if [ $? -eq 0 ]; then
                        echo "Pushed to remote repository successfully."
                        echo "issue #$issue_number folder structure created and pushed successfully."
                    else
                        echo "Failed to push to remote repository."
                        2>> error.log
                    fi
                else
                    echo "Failed to commit files."
                    2>> error.log
                fi
            else
                echo "No issue number provided. Files staged but not committed."
            fi
        else
            echo "Failed to stage files."
            2>> error.log
        fi
    fi
}

simple_model() {
    echo "A simple model in the context of software development typically refers to a basic representation of data or an entity within an application. It is often used in applications that follow the Model-View-Controller (MVC) architectural pattern, where the model represents the data and business logic of the application."
   
    current_dir=$(pwd)
    echo "starting creating the Simple Model structure in :${current_dir} "
    echo "===================================="
    touch .prettierrc .gitignore README.md Server.js app.js config.js

    if [ $? -eq 0 ]; then
        echo "Simple Model structure created successfully."
    else
        echo "Failed to create Simple Model structure."
        2>> error.log
    fi
}

main() {
    read -p "enter your project type (mvc/simple): " choice
    if [ "$choice" == "mvc" ]; then
        mvc_model
    elif [ "$choice" == "simple" ]; then
        simple_model
    else
        echo "Invalid choice. Please enter 'mvc' or 'simple'."
    fi
}

main