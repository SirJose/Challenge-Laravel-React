# Take-Home Challenge FullStack
## _Newsfeed_
This challenge consists of two projects: "_newsfeed-backend_"(Laravel) and "_newsfeed-frontend_"(React.js). Both need to be running in order for the website to work. 
Please follow the steps below in order to run the project.

## Steps
1. Download and install [Docker](https://www.docker.com/). Once installed open the app.
2. Use git to clone the [project](https://github.com/SirJose/Challenge-Laravel-React) or [download](https://github.com/SirJose/Challenge-Laravel-React/archive/refs/heads/master.zip) it directly to your computer as a .zip file (in this case you must extract the .zip contents).
3. Open the project folder "_Challenge-Laravel-React_".
4. Open a new command prompt inside this folder.
5. Execute the following command:
    ```sh
    docker-compose up -d
    ```
6. Wait for it to finish executing. Once it's done executing the app should be up and running.
7. Navigate to the following address in your preferred browser to access the main website:
    ```sh
    locahost:80
    ```
8. Done! you are now able to access the newsfeed project website :) 
9. _(Optional)_ Access the following address in your preferred browser to verify the backend is running properly:
    ```sh
    localhost:8000
    ```

## Useful links
- Docker: https://www.docker.com/
- Project repository: https://github.com/SirJose/Challenge-Laravel-React
- Project direct download link: https://github.com/SirJose/Challenge-Laravel-React/archive/refs/heads/master.zip

## Additional notes
___
- Make sure _Docker_ is properly installed on your computer. It is necessary for the project to run. 
- Feel free to contact me if you are unable to run the project and I'll help you solve the issue as soon as possible.
- The backend is consuming APIs with limited amounts of requests available, so the possibility of being unable to access the news articles does exist. It shouldn't be an issue for our use case. 