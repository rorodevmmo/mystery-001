/*
  OPTIONNEL — V2
  Pour synchroniser réellement trois téléphones différents, créez un projet
  Firebase Realtime Database et placez ici votre configuration.

  Cette V1 fonctionne volontairement sans compte ni serveur grâce à localStorage.
  localStorage est propre à chaque téléphone : la synchronisation multi-appareils
  nécessite donc un backend partagé.
*/
const FIREBASE_CONFIG = {
  apiKey: "REMPLACER",
  authDomain: "REMPLACER.firebaseapp.com",
  databaseURL: "https://REMPLACER-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "REMPLACER",
  storageBucket: "REMPLACER.firebasestorage.app",
  messagingSenderId: "REMPLACER",
  appId: "REMPLACER"
};