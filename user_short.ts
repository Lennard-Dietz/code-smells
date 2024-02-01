import { MySQLDatabase } from "./database";

const https = require("https");

export class UserService {
  public getUserBySession(session_ids: string) {
    // imagine we would derive the user by session id here and create the fitting instance
    return new User();
  }
}

class User {
  private username: string;

  public getUserDataFromDatabase() {
    const myDatabase = this.db()
    return myDatabase.query(
      "SELECT * FROM user WHERE username = " + this.username + " LIMIT 1"
    );
  }

  public selectuser() {
    const myDatabase = this.db()
    return myDatabase.query(
      "SELECT created_at FROM user WHERE username = " + this.username + " LIMIT 1"
    );
  }

  public getStreetByCoords(callback_when_request_ready, current_coords) {
    https.get("https://api.maps.google.com?api_key=a321sd8da4fg698rev43qwe8f43se4fw3&coords=" + current_coords, resp => {
      let data = "";

      resp.on("data", chunk => {
        data += chunk;
      });

      resp.on("end", () => {
        callback_when_request_ready(JSON.parse(data).streetname);
      });
    })
      .on("error", err => {
        console.log("Error: " + err.message);
      });
  }

  public getPostCodeByCoords(callback_when_request_ready, current_coords) {
    https.get("https://api.maps.google.com?api_key=a321sd8da4fg698rev43qwe8f43se4fw3&coords=" + current_coords, resp => {
      let data = "";

      resp.on("data", chunk => {
        data += chunk;
      });

      resp.on("end", () => {
        callback_when_request_ready(JSON.parse(data).postcode);
      });
    })
      .on("error", err => {
        console.log("Error: " + err.message);
      });
  }

  private db() {
    return new MySQLDatabase("localhost", "todomvc");
  }
}
