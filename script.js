// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAz6eAnwG6WVPRkgU4iYas0WEDpOGPNOs",
    authDomain: "iot-control-69481.firebaseapp.com",
    databaseURL: "https://iot-control-69481-default-rtdb.firebaseio.com",
    projectId: "iot-control-69481",
    storageBucket: "iot-control-69481.firebasestorage.app",
    messagingSenderId: "99924635491",
    appId: "1:99924635491:web:3a2e1232a8f572b4222d56",
    measurementId: "G-5T96LRQWE2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const ledRef = database.ref("LED_STATUS");

let isOn = false;

// Function to update the LED state in the UI
function updateLEDUI(status) {
    isOn = status === "ON";
    document.getElementById("led").src = isOn ? "led-on.png" : "led-off.png";
}

// Fetch initial LED state from Firebase and listen for changes
ledRef.on("value", (snapshot) => {
    if (snapshot.exists()) {
        updateLEDUI(snapshot.val());
    } else {
        ledRef.set("OFF"); // Set default state if not found
    }
});

// Function to toggle the LED state
function toggleLED() {
    const newState = isOn ? "OFF" : "ON";
    ledRef.set(newState); // Update Firebase with the new state
}

// Add click event listener to the image
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("led").addEventListener("click", toggleLED);
});
