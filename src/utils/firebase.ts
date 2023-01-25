import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";

type YoutubeLive = {
    isRecording: boolean;
    id: string;
};

const firebaseConfig = {
    apiKey: "AIzaSyA55W6-qsRUgwMIIV26Q0yrUXhJsBLGvBw",
    authDomain: "zeug-5c731.firebaseapp.com",
    databaseURL:
        "https://zeug-5c731-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "zeug-5c731",
    storageBucket: "zeug-5c731.appspot.com",
    messagingSenderId: "22938962843",
    appId: "1:22938962843:web:9150796c847afbbd6aef3e",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export const getYoutubeLive = async (): Promise<YoutubeLive> => {
    const youtubeLiveRef = ref(database, "youtubeLive");
    const youtubeLiveSnapshot = await get(youtubeLiveRef);
    const youtubeLiveValue = youtubeLiveSnapshot.val();

    return youtubeLiveValue;
};
