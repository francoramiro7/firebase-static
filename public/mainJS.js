/**
 * Created by franc on 03/10/2017.
 */
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBOhkeVBt6MzqgMM4ERBZNuMKB5J2zgyec",
    authDomain: "franco-profile.firebaseapp.com",
    databaseURL: "https://franco-profile.firebaseio.com",
    projectId: "franco-profile",
    storageBucket: "gs://franco-profile.appspot.com/",
    messagingSenderId: "982218724231"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();

function start() {
    readUserData();
}

function setImage() {

    var storage = firebase.storage();
    var storageRef = storage.ref();
    var starsRef = storageRef.child('1112.jpg');

// Get the download URL
    starsRef.getDownloadURL().then(function(url) {
        var img = document.getElementById("img1");
        img.src = url;
    }).catch(function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/object_not_found':
                // File doesn't exist
                break;

            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

            case 'storage/canceled':
                // User canceled the upload
                break;

            case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;

            default:
                break;
        }
    });
}

function writeUserData() {
    firebase.database().ref('user/'+1).set({
        text: "casa",
        años: 34,
        perros: true
    });
}

function readUserData() {
    var user = firebase.database().ref('user/' +1);
    user.on('value', function(snapshot) {
        var i = snapshot.val();
        document.getElementById("text").innerHTML = i.text;
    });
}

messaging.onMessage(function(payload) {
    console.log("Message received. ", payload);
    // ...
});