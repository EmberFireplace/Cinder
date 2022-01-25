import {Client, query} from "faunadb";
import {storedUserClient, storedUserID} from "../store";


const q = query;
//This is a token all people get so they can login or create an account.
//It is given the most minimum of perms just to do that, and is only used so the user can get their actual token.
let universalUserToken:string ='fnAEdmXHK8AARUSKHyvCLYJrw0AqlRDwuFHD9nHl';

let universalClient = new Client({
    secret: universalUserToken,
    domain: 'db.us.fauna.com',
    // NOTE: Use the correct domain for your database's Region Group.
    port: 443,
    scheme: 'https',
});
let userClient = null;
storedUserClient.subscribe((val) => userClient=val);
export class UserAuth {
    static defaultMissingTextureCube:string = 'https://media.discordapp.net/attachments/934689367354638356/934689389420883978/output-onlinepngtools.png';
    static async loginUser(email:string, password:string) {
        console.log("logging in user : " + email);
        return (await universalClient.query(
            q.Login(
                q.Match(
                    q.Index("UsersByEmail"), email
                ),
                {password: password },
            )
        ))
    }
    static async logoutUser() {
        storedUserClient.set(null);
        storedUserID.set(null);
        return (await userClient.query(
            q.Logout(true)
        ))
    }
    static async createNewUser(username:string, email:string, password:string, profileIconURL:string) {
        if(profileIconURL == null) {
            console.log("profileIconURL was null, setting to default Missing Texture Cube");
            profileIconURL = UserAuth.defaultMissingTextureCube;
        }
        console.log("creating new user");
        return (await universalClient.query(
            q.Create(
                q.Collection("Users"),
                {
                    credentials: { password: password },
                    data: {
                        username: username,
                        email: email,
                        profileIconURL: profileIconURL,
                    }
                }
            )
        ))
    }
}
let actualClient = null;
export function runTempToLogin() {
    UserAuth.loginUser("pocmalek@gmail.com", "password").then((response) => {
        actualClient =
            new Client({
                secret: response['secret'],
                domain: 'db.us.fauna.com',
                // NOTE: Use the correct domain for your database's Region Group.
                port: 443,
                scheme: 'https',
            });
        storedUserClient.set(actualClient);
        actualClient.query(
            q.Map(
                q.Paginate(
                    q.Match(q.Index("UsersByEmail"), "pocmalek@gmail.com")
                ),
                q.Lambda(
                    "person",
                    q.Get(q.Var("person"))
                )
            )
        ).then((val) => {
            storedUserID.set(val['data'][0]['ref']['id'])
        })

    })
}
