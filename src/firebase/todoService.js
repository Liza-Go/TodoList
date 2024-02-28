import {
  collection,
  onSnapshot,
  serverTimestamp,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase.config";

const todoCollectionName = "todos";

/* fetch all todo items from the Firestore database */
export async function getTodos() {
  const querySnapshot = await getDocs(collection(db, todoCollectionName));
  querySnapshot.forEach((doc) => {
    // Log each todo item
    console.log(doc.id, " => ", doc.data());
  });
}

/**
 * Function to add a new todo item to the Firestore database.
 * @param {string} uid - User ID associated with the todo item.
 * @param {string} task - Task description.
 */

export function addTask(uid, task) {
  return addDoc(collection(db, todoCollectionName), {
    uid,
    task,
    completed: false,
    created: serverTimestamp(),
    updated: serverTimestamp(),
  });
}

/**
 * Function to update a todo item in the Firestore database.
 * @param {string} id - ID of the todo item to be updated.
 * @param {Object} data - Data to be updated.
 */

export function updateTask(id, data) {
  const taskRef = doc(db, todoCollectionName, id);
  return updateDoc(taskRef, {
    ...data,
    updated: serverTimestamp(),
  });
}

export async function updateTaskStatus(id, completed) {
  const taskRef = doc(db, todoCollectionName, id);
  await updateDoc(taskRef, { completed });
}

/**
 * Function to listen for changes to todo items in the Firestore database for a specific user.
 * @param {string} uid - User ID to filter todo items.
 * @param {string} input - Search term to filter todo items.
 * @param {function} callback - Callb ack function to handle updated todo items.
 */

export function getTasksListener(uid, input, mode, callback) {
  const q = query(collection(db, todoCollectionName), where("uid", "==", uid)); // selects all documents (by uid)
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredTasks = input
      ? tasks.filter(({ task }) => task.includes(input))
      : tasks;

    let displayTasks;
    if (mode === "completed") {
      displayTasks = filteredTasks.filter(({ completed }) => completed);
    } else if (mode === "incomplete") {
      displayTasks = filteredTasks.filter(({ completed }) => !completed);
    } else {
      displayTasks = filteredTasks;
    }

    const sortedTasks = displayTasks.sort((a, b) => b.created - a.created);
    callback(sortedTasks);
  });
}

/**
 * Function to delete a todo item from the Firestore database.
 * @param {string} id - ID of the todo item to be deleted.
 */

export function deleteTask(id) {
  return deleteDoc(doc(db, todoCollectionName, id));
}
