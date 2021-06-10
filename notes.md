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
