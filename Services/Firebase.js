import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, deleteDoc, doc } from 'firebase/firestore/lite';
const firebaseConfig = {
  apiKey: "AIzaSyDeLIh3Q_6xwf84HYzhyQkK8VWfiXPSwE0",
  authDomain: "gif-searcher-dec48.firebaseapp.com",
  databaseURL: "https://gif-searcher-dec48-default-rtdb.firebaseio.com",
  projectId: "gif-searcher-dec48",
  storageBucket: "gif-searcher-dec48.appspot.com",
  messagingSenderId: "1003172168623",
  appId: "1:1003172168623:web:2f20b3ff8ccf03e364655a"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getFavorite() {
  const favoritesCol = collection(db, 'favorites');
  const favoritesSnapshot = await getDocs(favoritesCol);
  const favorites = favoritesSnapshot.docs.map(doc => doc.data());
  return favorites;
}

export async function addFavorite(data) {
  await setDoc(doc(db, "favorites", data.id), data);
  return;
}

export async function removeFavorite(data) {
  await deleteDoc(doc(db, "favorites", data.id));
  return;
}