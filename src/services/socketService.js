import io from "socket.io-client";

const NAME = process.env.REACT_APP_NAME;
const ENDPOINT = process.env.REACT_APP_SOCKET_SERVER_URL;
console.log(NAME + " // end point : " + ENDPOINT);
// console.log(process.env);
// console.log(process.env.NODE_ENV);
const socket = io(ENDPOINT, {
    withCredentials: false,
    // extraHeaders: {
    //     "Access-Control-Allow-Origin": "*",
    // },
});

socket.on("reconnect_attempt", (attempt) => {
    console.log("reconnect attempt" + attempt);
});

socket.on("reconnect_error", (error) => {
    // ...
    console.log("reconnect error" + error);
});
socket.on("error", (error) => {
    // ...
    console.log(" error" + error);
});

socket.on("connect_error", (error) => {
    console.log(" connect_error", error);
    console.log(`connect_error due to ${error.message}`);
});

export default socket;
