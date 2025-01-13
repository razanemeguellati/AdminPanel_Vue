import Pusher from "pusher-js";

// Initialize Pusher with your credentials
var pusher = new Pusher("key", {
  cluster: "eu", // Replace with your cluster (e.g., "mt1")

});

export default pusher;
