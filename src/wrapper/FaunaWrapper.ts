import {Client} from "faunadb";

let authorizationHeader:string = "Bearer fnAEbqCmntAAR9gdue3MMJ7lQnqRUmB1mSq52jaN";
let endpoint:string = "https://graphql.us.fauna.com/graphql";


let client = new Client({
    secret: 'fnAEbqCmntAAR9gdue3MMJ7lQnqRUmB1mSq52jaN',
    domain: 'db.us.fauna.com',
    // NOTE: Use the correct domain for your database's Region Group.
    port: 443,
    scheme: 'https',
});

/**
 * Function throws error if a invalid json is passed and returns null
 * @param queryJson - a Json defining the query, the arguments, and the function to process
 * @returns {Promise<any>} - a promise that resolves when the json request goes through to the internet.
 */
export async function doPost (queryJson:any) {
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Authorization' : authorizationHeader},
        body: JSON.stringify(
            queryJson
        )
    })

    const json = await res.json()
    const result = json;
    console.log(JSON.stringify(result));
    return result;
}

export class Pagnatable {
    /**
     * @private cursor - is whatever comes next in the pagnation request
     */
    protected afterCursor:string = null;
    private pagnateFunctionName:string;
    protected documentID:string;
    private pagnatedObjects = [];
    private defaultPagnationQuerySize:number = 4;
    private isPagnating = false;
    constructor(pagnateFunctionName, documentID){
        this.pagnateFunctionName = pagnateFunctionName;
        this.documentID = documentID;
    }

    private async getJsonFromPagnation(size:number, cursor:string) {
        return (await(this.doPagnationRequest(size, cursor)))["data"][this.pagnateFunctionName];
    }
    protected comparisonFunction(object1, object2) :boolean {
        return false;
    }
    /**
     updatedObjects - Called when a subscription lets us know that there are objects to read from the server to add to our list.
     */
    async updateObjects() {
        return; //TODO:REMOVE
        if(this.pagnatedObjects.length === 0 || this.isPagnating) {
            return;
            // //TODO:idk if this works.
            // console.log("size is 0");
            // this.pagnateForObjects(this.defaultPagnationQuerySize).then();
            // return;
        }
        let latestKnownObject = this.pagnatedObjects[this.pagnatedObjects.length-1];
        let otherLatestKnownObject = this.pagnatedObjects[0];
        let bottomUpCursor:string = null;

        while(this.isPagnating){}
        this.isPagnating = true;
        let objectsToAdd = [];
        while(true) {
            let jsonQueryResult = (await this.getJsonFromPagnation(this.defaultPagnationQuerySize, bottomUpCursor));
            let objects = jsonQueryResult["data"];
            bottomUpCursor = jsonQueryResult["after"];
            for(let i = objects.length-1; i != -1; i--) {
                if(this.pagnatedObjects.includes(objects[i]) || this.comparisonFunction(objects[i], latestKnownObject) || objects[i]===latestKnownObject || this.comparisonFunction(objects[i], otherLatestKnownObject) || objects[i] === otherLatestKnownObject) {
                    this.isPagnating = false;
                    this.pagnatedObjects = [...this.pagnatedObjects, ...objectsToAdd];
                    return;
                } else {
                    if(!objectsToAdd.includes(objects[i])) {
                        objectsToAdd.push(objects[i]);
                    }
                }
            }
        }
    }


    /**
     * Called when we have a object we are adding client side
     * @param object
     */
    addObject(object) {
        this.pagnatedObjects = [...this.pagnatedObjects, object];
    }
    getPagnatedObjects() {
        return [];//TODO:REMOVE
        return this.pagnatedObjects;
    }

    /**
     * handles all the logic of moving the cursor around and adding data to the objects. Does this all with push instead of spread, so one needs to trigger updates manually.
     * @private
     */
    public async pagnateForObjects(size:number) {
        return;//TODO:REMOVE
        while(this.isPagnating) {}
        this.isPagnating = true;
        let jsonPagnationResult = (await (this.getJsonFromPagnation(size, this.afterCursor)));
        //To save the cursors position for checking.
        console.log(jsonPagnationResult);
        this.afterCursor = (<string>(jsonPagnationResult["after"]));
        let listOfNewObjects = jsonPagnationResult["data"];
        console.log("the list of new objects is : " + listOfNewObjects);
        this.pagnatedObjects = [...listOfNewObjects, ...this.pagnatedObjects];
        this.isPagnating = false;
    }

    /**
     * Checks if the pagnation happend such that we started from the beginning.
     * @param jsonPagnationResult
     * @private
     */
    private isStartingAtBeginning(jsonPagnationResult:any):boolean {
        return jsonPagnationResult[this.pagnateFunctionName].before == null;
    }
    protected async doPagnationRequest(size:number, cursor:string) {}
}
export class PagnatableMessages extends Pagnatable {
    constructor(documentID:string) {
        super('getMessagesInChannel', documentID);
    }
    protected comparisonFunction(object1, object2): boolean {
        return object1._id === object2._id;
    }

    protected async doPagnationRequest(size, cursor) {
        return this.getMessagesInChannel(this.documentID, size, cursor)
    }
    private async getMessagesInChannel(channelID:string, size:number, cursor:string) {
        if(channelID === "0") {
            return new Promise(function (resolve, reject) {}); //This is to wait until it actually works but idk if we need this now.
        }
        let jsonQueryWithCursor = {
            "query": "query getMessagesFromChannel($arg1: ID! $arg2: Int! $arg3: String!) { getMessagesInChannel(channel: $arg1 _size: $arg2 _cursor: $arg3) { data { _id } before after } }",
            "operationName": "getMessagesFromChannel",
            "variables": {"arg1": channelID, "arg2": size, "arg3": cursor}
        };
        let jsonQuery = {
            "query": "query getMessagesFromChannel($arg1: ID! $arg2: Int!) { getMessagesInChannel(channel: $arg1 _size: $arg2) { data { _id } before after } }",
            "operationName": "getMessagesFromChannel",
            "variables": {"arg1": channelID, "arg2": size}
        };
        if(cursor !== null) {
            console.log("cursor is : " + cursor);
            console.log("doing json query with cursor");
            return (await doPost(jsonQueryWithCursor));
        }
        console.log("doing json query without cursor");
        return ((await doPost(jsonQuery)));
    }
}