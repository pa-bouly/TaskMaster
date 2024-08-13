import { initializeApp } from 'firebase/app'

// Those are the Firebase SDK config values
// It's only here for the demo, in production it will be in environment variables
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBsPJu1f_9sfmLHAVUgOYbgrA6IlaygYuc',
  authDomain: 'taskmaster-4c0d3.firebaseapp.com',
  projectId: 'taskmaster-4c0d3',
  storageBucket: 'taskmaster-4c0d3.appspot.com',
  messagingSenderId: '911704237014',
  appId: '1:911704237014:web:2fcf4e7665972d71b73a77',
  measurementId: 'G-JM5ES11JJN'
})

export default firebaseApp
