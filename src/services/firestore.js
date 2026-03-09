import { doc, setDoc, onSnapshot } from 'firebase/firestore'
import { db, isFirebaseEnabled } from '../firebase'

const DOC_ID = 'niko-dashboard'
const COLLECTION = 'dashboard'

/**
 * Save full dashboard state to Firestore.
 * Merges with existing doc so partial updates don't wipe data.
 */
export async function saveDashboardState(taskState, bgState, dailyLog) {
  if (!isFirebaseEnabled()) return

  try {
    const ref = doc(db, COLLECTION, DOC_ID)
    await setDoc(ref, {
      taskState,
      bgState,
      dailyLog,
      updatedAt: new Date().toISOString(),
    }, { merge: true })
  } catch (err) {
    console.warn('[Firestore] Save failed:', err.message)
  }
}

/**
 * Subscribe to real-time updates from Firestore.
 * Returns an unsubscribe function.
 * Callback receives { taskState, bgState, dailyLog } or null if no doc.
 */
export function subscribeToDashboard(callback) {
  if (!isFirebaseEnabled()) return () => {}

  const ref = doc(db, COLLECTION, DOC_ID)

  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      const data = snap.data()
      callback({
        taskState: data.taskState || {},
        bgState: data.bgState || {},
        dailyLog: data.dailyLog || {},
      })
    } else {
      callback(null)
    }
  }, (err) => {
    console.warn('[Firestore] Listener error:', err.message)
  })
}
