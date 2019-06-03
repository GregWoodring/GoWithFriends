
class GameController{ 
    constructor(roomId, gameName, gameTime, users){
        this.roomId = roomId;
        this.gameName = gameName;
        this.gameTime = gameTime;
        this.users = users;
        this.timestamp = 0;
        this.blackUser = null;
        this.whiteUser = null;
        this.history = [[
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]];
        this.positions = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  
        ];
        this.blacksTurn= true;
        this.turnNumber= 0;
        this.blackScore= 0;
        this.whiteScore= 0;
        this.whitePass= false;
        this.blackPass= false;
        this.gameEnd= false;
        this.whiteKo= [];
        this.blackKo= [];

        this.messages = [];
        // this.userCount = 1;

        let user = Object.keys(users)[0];
        user = users[user];

        if(user.role === "black"){
            this.blackUser = user;
        } else if(user.role === "white"){
            this.whiteUser = user;
        } 
        
        this.updateUsers = this.updateUsers.bind(this);
        this.returnUsers = this.returnUsers.bind(this);
        this.returnData = this.returnData.bind(this);
    }

    returnUsers(){
        return Object.keys(this.users).length;
    }

    returnData(){
        let viewers = [];
        let blackUser = this.blackUser;
        let whiteUser = this.whiteUser;
        let roomId = this.roomId;
        let gameName = this.gameName;
        let gameTime = this.gameTime;
        let userCount = this.returnUsers();
        let timestamp = this.timestamp;
        let history = this.history;
        let positions = this.positions;
        let blacksTurn = this.blacksTurn;
        let turnNumber = this.turnNumber;
        let blackScore = this.blackScore;
        let whiteScore = this.whiteScore;
        let whitePass = this.whitePass;
        let blackPass = this.blackPass;
        let gameEnd = this.gameEnd;
        let whiteKo = this.whiteKo;
        let blackKo = this.blackKo;
        let usersArr = [];

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

        return {
            blackUser,
            whiteUser,
            viewers,
            roomId,
            gameName,
            gameTime,
            userCount,
            timestamp,
            history,
            positions,
            blacksTurn,
            turnNumber,
            blackScore,
            whiteScore,
            whitePass,
            blackPass,
            gameEnd,
            whiteKo,
            blackKo, 
            users: usersArr
        }
    }

    addMessage(cookie, text){
        //TODO
    }

    syncUser(userId){
        if(this.users[userId]){
            this.users[userId].inSync = true;
            this.users[userId].desyncCount = 0;
        }
    }

    checkUserSync(userId){
        if(this.users[userId]){
            if(!this.users[userId].inSync){
                this.users[userId].desyncCount++;
                if(this.users[userId].desyncCount > 10){
                    return true;
                }
            }
            this.users[userId].inSync =  false;
        }
    }

    updateUsers(userId, data, deleteItem){
        
        //Delete a users
        if(deleteItem){
            if(this.users[userId]){
                if(this.users[userId].role === "black"){
                    this.blackUser = null;
                } else if(this.users[userId].role === "white"){
                    this.whiteUser = null;
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
                this.users[userId].inSync = true;
                this.users[userId].desyncCount = 0;
            } else {
                //New User joins

                //Check what role they are joining as, update
                //the data on whether the black or white role
                //is taken, if trying to take a role that already
                //is taken throw an error
                if(data.role === "black" && !this.blackUser){
                    this.blackUser = data;
                } else if(data.role === "white" && !this.whiteUser){
                    this.whiteUser = data;
                } else if(data.role !== "viewer"){
                    throw new Error(`Cannot join game with role ${data.role}. That role already exists`)
                }

                //Add user to user Object and increment the usercount
                this.users[userId] = data;
                this.users[userId].inSync = true;
                this.users[userId].desyncCount = 0;
            }
        }
        this.timestamp++;
    }

    handlePass(cookie){
        if((this.blacksTurn && this.users[cookie].role != "black")
            || !this.blacksTurn && this.users[cookie].role != "white"){
                return;
        }

        //check End of Game
        if((this.blacksTurn && this.whitePass) || (!this.blacksTurn && this.blackPass)){
            this.gameEnd = true;
            this.timestamp++;
            return;
        }

        //this code is similar to handle play, except there is no piece spliced in so no need to check for captures
        let positions = [...this.positions.map(item => [...item])]
        let history = [...this.history.map(item => [...item.map(item => [...item])])]
        history.push(positions);
        
        this.whitePass = !this.blacksTurn,
        this.blackPass = this.blacksTurn,
        this.turnNumber = this.turnNumber + 1,
        this.blacksTurn = !this.blacksTurn,
        this.positions = positions
        this.history = history;
    }

    //This function is used to check if an X and Y position are equal to annother, I store
    //these as nested arrays which .includes() does not support
    checkIncludes(checkArr, compareArr){
        for(let i = 0; i < checkArr.length; i++){
            let item = checkArr[i];

            if(item[0] === compareArr[0] && item[1] === compareArr[1]){
                return true;
            }
        }
        return false;
    }

    //This function will recursively check if stones are captured
    //In go stones that are touching share liberties, which means that for a stone to be captured
    //every position next to it must be filled by an opponent's piece, OR it can be completely surrounded
    //by opposing pieces and a friendly piece that is also completely surrounded.
    checkCapture(posX, posY, captureArr, val, positions){
        //first check if the position that was passed is empty
        //TODO: Add proper error handling into this app
        if(val === 0){
            return undefined;
        }
        //push the current X and Y coordinates into the captureArr
        //this is used to check if a stone has been checked already,
        //which prevents infinite loops, we ask for it to be passed in
        //so that if capture is true every captured stone can be removed
        //by handleCapture below
        let toPush = [posX, posY]
        captureArr.push(toPush);

        //Check every direction next to the current position (up, down, left, right)
        //First check if the position has already been checked
        if(!this.checkIncludes(captureArr, [posX, posY + 1])){
            //Then check that the position is not off of the board
            if(posY < positions.length - 1){
                //then check if the position is empty, if it is the stones are not captured and we return false
                if(positions[posY + 1][posX] === 0){
                    return false;
                    //else, if the position contains a friendly stone check if that stone is captured
                } else if( positions[posY + 1][posX] === val){
                    //if that stone finds and empty space the entire group is not captured, return false
                    if(!this.checkCapture(posX, posY + 1, captureArr, val, positions)){
                        return false;
                    }
                }
            } 
        }
        if(!this.checkIncludes(captureArr, [posX, posY - 1])){
            if(posY > 0){
                if(positions[posY - 1][posX] === 0){
                    return false;
                } else if( positions[posY - 1][posX] === val){
                    if(!this.checkCapture(posX, posY - 1, captureArr, val, positions)){
                        return false;
                    }
                } 
            }
        }
        if(!this.checkIncludes(captureArr, [posX + 1, posY ])){
            if(posX < positions[0].length - 1){
                if(positions[posY][posX + 1] === 0){
                    return false;
                } else if( positions[posY][posX + 1] === val){
                    if(!this.checkCapture(posX + 1, posY, captureArr, val, positions)){
                        return false;
                    }
                } 
            }
        }
        if(!this.checkIncludes(captureArr, [posX - 1, posY])){
            if(posX > 0){
                if(positions[posY][posX - 1] === 0){
                    return false;
                } else if( positions[posY][posX - 1] === val){
                    if(!this.checkCapture(posX - 1, posY, captureArr, val, positions)){
                        return false;
                    }
                } 
            }
        }
        //if we have not returned false by this point the stones are captured, return true
        return true;
    }



    //This function will call the recursive checkCapture function to check if a given position is captured, if it is
    //it will then 'capture' those pieces by setting their position in the matrix to 0 and adds the count to the appropriate 
    //player's score
    handleCapture(posX, posY, positions, piece){
        //start by initializing an emptry array to keep track of captured stones
        //must be scoped to this function so that it can be looped through later
        let captureArr = [];
        //check to make sure that the position which was passed is not out of bounds
        if(posX < 0
            || posX > positions[0].length -1
            || posY < 0
            || posY > positions.length - 1){
            return;
        }
        //get the value of the current piece
        let val = positions[posY][posX];
        //if the value is 0 (empty) or equal to the current player's piece return
        //you cannot capture your own pieces
        if(val === piece || val === 0){
            return;
        }
        //Call the recursive check capture function, it will return true if the given piece is captured
        if(this.checkCapture(posX, posY, captureArr, val, positions)){
            //initialize count at 0 to keep track of the amount of captured stones
            let count = 0;
            //loop through the array we passed into checkCapture, the checkCapture function will fill this
            //array with every stone connected to the stone we passed into it
            //if checkCapture returns true, that means every piece in this array was captured
            captureArr.forEach((item) => {
                let [posX, posY] = item;
                positions[posY].splice(posX, 1, 0);
                count++;
            });

            //create Ko, it is stored as null in state if there is no ko so we must set this to an empty array if
            //empty or to a copy of the appropriate ko tracker from state. If it is white's turn then we are tracking
            //black's ko, and vice versa
            let ko;
            if(!this.blacksTurn){ 
                ko = this.blackKo ? [...this.blackKo] : [];
            } else {
                ko = this.whiteKo ? [...this.whiteKo] : [];
            }

            //The rule of ko only applies if only 1 stone was captured
            if(captureArr.length === 1){
                ko.push([posX, posY])
            }
            //update state with the score change, updated ko tracker, and positions
            if(this.blacksTurn){
                this.positions = positions;
                this.blackScore += count;
                this.whiteKo = ko;     
            } else{
                this.positions = positions;
                this.whiteScore += count,
                this.blackKo = ko;
            } 

        }
    }

    /*Several things must be done everytime a play is made
    - Check that position is empty and that the game has not ended
    - Check that players are not attempting to play in a space restricted by the rule of Ko
    - Make a copy of history that ends at the current turn -- not keeping track of alternate histories
    - Make a copy of positions, useful if move ends up not being valid later
    - Based on what turn it is the current play was either black(1) or white(2)
    - In copy splice in the new piece
    - Check if placing piece caused any pieces to be captured
        - Only pieces adjacent to the placed piece can be captured, so check all 4 directions
          which recursively checks if it's captured.
    - Check if move would capture itself, if it would return because the move isn't valid
    - Push modified positions into copy of history
    - In state: alternate the turn, increase the turn number, update positions and history
    */

    handlePlay(posX, posY, cookie){
        console.log('play')
        if((this.blacksTurn && this.users[cookie].role != "black")
            || !this.blacksTurn && this.users[cookie].role != "white"){
                return;
            }
        // Check that position is empty and that the game has not ended
        if(this.positions[posY][posX] === 0 && !this.gameEnd){
            //Check that players are not attempting to play in a space restricted by the rule of Ko
            if((this.blacksTurn && this.blackKo && this.checkIncludes(this.blackKo, [posX, posY]))
            || (!this.blacksTurn && this.whiteKo && this.checkIncludes(this.whiteKo, [posX, posY]))){
                return;
            }
            //Rule of Ko only persists for one turn, so set both Ko trackers to null
            this.blackKo = null;
            this.whiteKo = null;

            //Make a copy of history that ends at the current turn -- not keeping track of alternate histories
            let history = this.history.map(item => [...item.map(item2 => [...item2])]).slice(0, this.turnNumber + 1);
            //Make a copy of positions, useful if move ends up not being valid later
            let positions = [...this.positions.map(item => [...item])];
            //Based on what turn it is the current play was either black(1) or white(2)
            let piece = this.blacksTurn ? 1 : 2;
            //In copy splice in the new piece
            positions[posY].splice(posX, 1, piece);

            //Check if placing piece caused any pieces to be captured
            //  - Only pieces adjacent to the placed piece can be captured, so check all 4 directions
            //    which recursively checks if it's captured.
            this.handleCapture(posX, posY +1, positions, piece);
            this.handleCapture(posX, posY -1, positions, piece);
            this.handleCapture(posX +1, posY, positions, piece);
            this.handleCapture(posX -1, posY, positions, piece);

            //Check if move would capture itself, if it would return because the move isn't valid
            if(this.checkCapture(posX, posY, [], piece, positions)){
                return;
            }
            //Push modified positions into copy of history
            history.push(positions);

            this.blacksTurn = !this.blacksTurn;
            this.turnNumber++;
            this.positions = positions;
            this.history = history;
            this.timestamp++;
        }
    }

}


module.exports = GameController;


//