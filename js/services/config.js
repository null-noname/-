export const firebaseConfig = {
    apiKey: "AIzaSyCi6X...", // 実際のキーは既存ファイルを流用
    authDomain: "null-noname.firebaseapp.com",
    databaseURL: "https://null-noname-default-rtdb.firebaseio.com",
    projectId: "null-noname",
    storageBucket: "null-noname.appspot.com",
    messagingSenderId: "36733363321",
    appId: "1:36733363321:web:530a2164f9f7d4310d54a2"
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
