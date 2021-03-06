import {Collection, Ref, Client} from 'faunadb';


// @ts-ignore
// export var client = new Client({
//     secret: 'fnAEbqCmntAAR9gdue3MMJ7lQnqRUmB1mSq52jaN',
//     domain: 'db.us.fauna.com',
//     // NOTE: Use the correct domain for your database's Region Group.
//     port: 443,
//     scheme: 'https',
// })



import Signal from 'mini-signals';
export default class FaunaStream {
    constructor (client, ID, type) {

        if(type === "Server") {
            this.documentRef = Ref(Collection("Server"), ID);
        }
        else {
            this.documentRef = Ref(Collection("Channel"), ID);
        }
        this.client = new Client({
            secret: 'fnAEbqCmntAAR9gdue3MMJ7lQnqRUmB1mSq52jaN',
            domain: 'db.us.fauna.com',
            // NOTE: Use the correct domain for your database's Region Group.
            port: 443,
            scheme: 'https',
        });
        this.onUpdate = new Signal();
        this.initStream();
    }

    initStream () {
        this.stream = this.client.stream.document(this.documentRef);

        this.stream.on('snapshot', (data, event) => {
            this.onUpdate.dispatch(data);
        });

        this.stream.on('version', (data, event) => {
            this.onUpdate.dispatch(data.document);
        });

        this.stream.on('error', (data, event) => {
            this.stream.close();
            setTimeout(() => {
                this.initStream();
            }, 250);
        });

        this.stream.start();
    }

    destroy () {
        this.stream.close();
        this.onUpdate.detachAll();
    }
}

// export const chatRoomStream = new FaunaStream(client, "319380215416488007");