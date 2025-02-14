// Firebaseの設定情報（Firebaseコンソールで取得）
const firebaseConfig = {
    apiKey: "あなたのAPIキー",
    authDomain: "
OsisnsID.firebaseapp.com",
    projectId: "あなたのプロジェクトID",
    storageBucket: "あなたのプロジェクトID.appspot.com",
    messagingSenderId: "送信者ID",
    appId: "アプリID"
};

// Firebaseの初期化
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc };
