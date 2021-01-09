import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAtDxz_MtsRyLmoZLBJNPBwnnq5_SsTcEo",
  authDomain: "crowndb-db36a.firebaseapp.com",
  databaseURL: "https://crowndb-db36a.firebaseio.com",
  projectId: "crowndb-db36a",
  storageBucket: "crowndb-db36a.appspot.com",
  messagingSenderId: "612875353103",
  appId: "1:612875353103:web:9b9f49c42ff89ba695f77a",
  measurementId: "G-EGPTKQMNTW",
};

firebase.initializeApp(config);
export const firestore = firebase.firestore();

export const addToFirestore = async (
  collectionKey,
  collectionsValues,
  setProgress,
  progress
) => {
  setProgress({
    ...progress,
    isLoad: true,
  });

  try {
    const r = await firestore
      .collection(collectionKey)
      .doc()
      .set(collectionsValues);
    setProgress({
      ...progress,
      isLoad: false,
      isSuccess: true,
      isFailed: false,
    });
  } catch (error) {
    setProgress({
      ...progress,
      isLoad: false,
      isSuccess: false,
      isFailed: true,
    });
  }
};
