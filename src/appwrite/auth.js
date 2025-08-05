import conf from '../config/config'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name) //appwrite authentication expects only four parameters out of which three are necessary. name is optional
            if (userAccount) {
                //call another method
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async login({ email, password }) {
        try {
            const user = await this.account.createEmailPasswordSession(//returns a session 
                email,
                password
            );
            console.log("Session created:", user);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get(); //gives use info about currently logged in user
        } catch (error) {
            console.log("Appwrite service:: getCurrentUser :: error", error);
        }

        return null;
    }
    async logout() {
        try {
            await this.account.deleteSessions(); //this deletes all the sessions from all devices
        } catch (error) {
            throw error;
        }
    }
    async googleLogin() {
        try {
            // Replace this with your post-login URL
            const redirectUrl =
                window.location.hostname === "localhost"
                    ? "http://localhost:5173/"
                    : "https://blog-web-application-1-szeb.onrender.com/";

            this.account.createOAuth2Session("google", redirectUrl, redirectUrl);
        } catch (error) {
            console.error("Google Login Error", error);
        }
    }
}

const authService = new AuthService();

export default authService;