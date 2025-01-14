import Pusher from "pusher-js";

// Initialize Pusher with your credentials
var pusher = new Pusher("1a9e1b88fcbdd25d7a99", {
  cluster: "eu", // Replace with your cluster (e.g., "mt1")

});

export default pusher;
