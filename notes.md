# Notes

### Initial Setup

1. Created separate directories for frontend and backend.
2. Frontend part was created using, `npx create frontend`.
3. For backend, I just created the folder backend, and ran a `npm init` inside
    it.
4. I deleted any .git directories that were present, (create-react-app creates
    one )

### Backend
1. "/:<name>" - the "name" in the route should not have hypends in it. For
    example, ":/meet-id", will not work as a route.


### Setup of react (with react router) and express:
1. refer: https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3

    - basically, add the line "  "proxy": "http://localhost:5000", at the very
        end of package.json of client/ dir.
    - run `npm run build`, to make sure a build dir is present in client/
    - add the following lines in server.js:
    ```
    app.use(express.static(path.join(__dirname, '/../frontend/build')))

    //over here, api routes should come

    //any other url is handled by react routers
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/../frontend/build/index.html'))
    })


    ```
2. During development, I let my server.js run (after the npm build in client/).
    BUT, i then i go to client/, and run `npm start`, so now I can open
    the react app with hot reload, but there is also my server running, so
    any connections my react app makes (remember proxy in package.json), it
    gets served by the server.

### Peerjs
1. For server: `npm i peer` - installs PeerServer
2. For client: `npm i peerjs`

# Deployment
1. I had to change the project structure to what it currently is. The
    backend itself contains the frontend directory.
2. The package.json of backend had to be modified to allow a "heroku-postbuild"
    script where we make npm install and build commands to run inside frontned
    directory.
3. Install heroku-cli, I did using snap. Inside the project folder, run
    `heroku create react-vid-app`. This adds two extra remotes under the
    name heroku.
4. Run `git push heroku main`. This pushes the latest commit in local main
    branch to heroku remote assigned to us. After that, an automatic build
    happens and web is live and running.
5. heroku requires a "package.json" file in root directory to identify the
    webpack with which the project should be built. In our case, it's node.
