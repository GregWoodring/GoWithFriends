
class GameController{
    constructor(gameNsp, roomId, gameName, gameTime, users){
        this.roomId = roomId;
        this.gameName = gameName;
        this.gameTime = gameTime;
        this.users = users;
        this.timestamp = 0;
        this.userCount = 1;
        this.gameNsp = gameNsp

        let user = Object.keys(users)[0];
        if(user.role === "black"){
            this.HasBlack = true;
            this.HasWhite = false;
        } else if(user.role === "white"){
            this.HasBlack = false;
            this.HasWhite = true;   
        } else{
            this.HasBlack = false;
            this.HasWhite = false;
        }
        
        // this.checkChanges = this.checkChanges.bind(this);
        this.updateUsers = this.updateUsers.bind(this);

        // setInterval(() => this.checkChanges(this.gameNsp).bind(this), 1000);
        
    }

    // checkChanges(gameNsp){
    //     //if(gameNsp.rooms[roomId]){ maybe want this
    //         gameNsp.to(this.roomId).emit('checkChanges', this.timestamp);
        
    // }

    updateUsers(userId, data, deleteItem){
        
        //Delete a users
        if(deleteItem){
            if(this.users[userId]){
                if(this.users[userId].role = "black"){
                    this.HasBlack = false;
                } else if(this.users[userId] = "white"){
                    this.HasWhite = false;
                }
                delete this.users[userId];
            } else {
                throw new Error(`Users ${userId} does not exist`)
            }
        //Update or Add User
        } else {
            //If Updating user just update the object to reflec
            //the new user data, should probably add error checking
            //here.
            if(this.users[userId]){
                this.users[userId] = data;
            } else {
                //New User joins

                //Check what role they are joining as, update
                //the data on whether the black or white role
                //is taken, if trying to take a role that already
                //is taken throw an error
                if(data.role === "black" && !this.HasBlack){
                    this.HasBlack = true;
                } else if(data.role === "white" && !this.HasWhite){
                    this.HasWhite = true;
                } else if(data.role !== "viewer"){
                    throw new Error(`Cannot join game with role ${data.role}. That role already exists`)
                }

                //Add user to user Object and increment the usercount
                this.user[userId] = data;
                this.userCount++;
            }
        }
    }
}


module.exports = GameController;