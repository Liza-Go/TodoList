import {
  collection,
  onSnapshot,
  serverTimestamp,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";

const todoCollectionName = "todos";

export function addTask(task) {
  return addDoc(collection(db, todoCollectionName), {
    task,
    completed: false,
    created: serverTimestamp(),
    updated: serverTimestamp(),
  });
}

export function updateTask(id, data) {
  const taskRef = doc(db, todoCollectionName, id);
  return updateDoc(taskRef, {
    ...data,
    updated: serverTimestamp(),
  });
}

export function getTasksListener(input, callback) {
  return onSnapshot(collection(db, todoCollectionName), (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const filteredTasks = input
      ? tasks.filter(({ task }) => task.includes(input))
      : tasks;
    const sortedTasks = filteredTasks.sort((a, b) => {
      return b.created - a.created; // Sort by creation timestamp
    });
    callback(sortedTasks);
  });
}

export function deleteTask(id) {
  return deleteDoc(doc(db, todoCollectionName, id));
}
