// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { collection, getFirestore, addDoc, getDocs, 
        onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCtDf1wHYB0_2FY8Vqr0p3MvEAfD8_GAVo",
    authDomain: "crudjs-a6cc9.firebaseapp.com",
    projectId: "crudjs-a6cc9",
    storageBucket: "crudjs-a6cc9.appspot.com",
    messagingSenderId: "794940294376",
    appId: "1:794940294376:web:d4a5cb7fdcce2d4893f55d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage(app);

export const saveTask = (title, description, imageName, imageUrl) => addDoc
(collection(db, 'tasks'), { title, description, imageName, imageUrl });

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = callback => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = id => deleteDoc(doc(db, 'tasks', id));

export const getTask = id => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);

export const saveImage = file => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    document.querySelector('progress').value = progress;
    },
    (error) => {
        // Handle unsuccessful uploads
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //console.log('File available at', downloadURL);
        document.querySelector('#image').src = downloadURL;
        });
    }
    );
}