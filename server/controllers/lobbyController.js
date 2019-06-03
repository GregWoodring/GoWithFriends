const GameController = require('./gameController')

let lobbyData = {
    rooms: {},
    users: {},
    messages: [],
    timestamp: 0,

    get Data(){
        let roomsArr = [];
        let usersArr = [];


        for(let room in this.rooms){
            let {
                gameName,
                gameTime,
                roomId,
                blackUser, 
                whiteUser,
            } = this.rooms[room]
            let hasBlack = blackUser ? true : false;
            let hasWhite = whiteUser ? true : false;
            let userCount = this.rooms[room].returnUsers();
            roomsArr.push({
                gameName,
                gameTime,
                roomId,
                userCount,
                hasBlack,
                hasWhite
            })
        }
        for(let user in this.users){
            let {userId, 
                userName,
                ranking} = this.users[user]
            usersArr.push({
                userId, 
                userName,
                ranking
            });
        }

        return {roomsArr,
                usersArr,
                timestamp: this.timestamp,
                messages: this.messages}
    },

    syncUser(userId){
        if(this.users[userId]){
            this.users[userId].inSync = true;
            this.users[userId].desyncCount = 0;
        }
    },

    checkUserSync(userId){
        if(!this.users[userId].inSync){
            this.users[userId].desyncCount++;
            
            if(this.users[userId].desyncCount > 5){
                this.updateUsers(userId, {}, true);
                return;
            }
        }
        this.users[userId].inSync = false;

    },

    updateUsers: function(cookie, data, deleteItem){
        if(deleteItem){
            if(this.users[cookie]){
                delete this.users[cookie];
                this.timestamp++;
                return true;
            } else {
                return false;
            }
        } else {
            let exists = false
            if(this.users[cookie]) exists = true;

            this.users[cookie] = data;
            this.users[cookie].inSync = true;
            this.users[cookie].desyncCount = 0;
            this.timestamp++;

            return exists;
        }
    },

    updateRooms: function(roomId, data, deleteItem){
        if(deleteItem){
            if(this.rooms[roomId]){
                delete this.rooms[roomId];
                this.timestamp++;
                return true;
            } else {
                return false;
            }
        } else {
            let exists = false
            if(this.rooms[roomId]) exists = true;

            this.rooms[roomId] = data;
            this.timestamp++;

            return exists;
        }
    },

    updateMessages: function(messageId, data, deleteItem){
        
        let index = this.messages.findIndex(item => {
            return item.messageId === messageId
        })
        if(deleteItem){
            if(index > 0){
                this.messages.splice(index, 1);
                this.timestamp++;
            } else{
                console.log('deleteItem not found');
                throw Error(`Cannot delete message that does not exist at index: ${index}`)
            }
        } else {
            if(index > 0){
                this.messages[index] = data;
                this.timestamp++;
                return true;
            } else {
                this.messages.push(data);
                if(this.messages.length > 100){
                    this.messages = this.messages.slice(0, 100);
                }
                this.timestamp++;
                return false;
            }
        }
 
    },

    createRoom: function(roomId, gameName, gameTime, role, cookie){
        if(this.rooms[roomId]) throw new Error(`Game ${gameName} with roomId: ${roomId} already exists, cannot create.`);
        
        let user = this.users[cookie];
        user.role = role;
        let users = {};
        users[cookie] = user;

        this.rooms[roomId] = new GameController(roomId, gameName, gameTime, users);
        this.timestamp++;
    }
}

module.exports = lobbyData;