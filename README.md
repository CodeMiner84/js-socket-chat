# Node.js + React.js + Socket.io chat app

# Local environment

Build dependencies
```shell script
docker-compose run server yarn install
docker-compose run ui yarn install
```
or just run `sh ./install.sh`

Build docker images
```shell script
docker-compose build
```

Run application

```shell script
docker-compose up -d
```
UI is available on [http://localhost:3000](http://localhost:3000)

TODO:
- [ ] Kepp logged user in cookie or localStorage
- [ ] Store online / offline user in redis
- [ ] Show online / offline users in user list
- [ ] Show user only connected to selected room
- [ ] Add typing mechanism when someone is typing message
- [ ] Inform in chate message window who is joining/leaving room
- [ ] Disable message button when use is not connected to room
- [ ] Keep selected room when new room is added
- [ ] Possibility to remove created rooms
- [x] Change redis user table from string to set
- [x] Change redis room table from string to set
- [ ] Optimize redis
- [ ] Add logging of every action made in server
