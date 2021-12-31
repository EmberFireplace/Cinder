import {Collection, Ref, Client} from 'faunadb';


// @ts-ignore
var client = new Client({
    secret: 'fnAEbqCmntAAR9gdue3MMJ7lQnqRUmB1mSq52jaN',
    domain: 'https://graphql.us.fauna.com/graphql',
    // NOTE: Use the correct domain for your database's Region Group.
    port: 443,
    scheme: 'https',
})



import Signal from 'mini-signals';
export default class FaunaStream {
    constructor (client, ID) {
        this.documentRef = Ref(Collection("Channel"), ID);
        this.client = client;
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

export const chatRoomStream = new FaunaStream(client, "319380215416488007");