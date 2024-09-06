import { init, tx, id } from "@instantdb/react";

// ID for app: marketing-lab
const APP_ID = "3db1f0f5-d368-4a2b-9656-c72c6fdc64d4";

const db = init({ appId: APP_ID });

// Sign up a new user
export const signUp = async (email: string, password: string, role: string) => {
  const userId = id(); // Generate a unique user ID

  try {
    await db.transact(
      tx.users[userId].update({
        id: userId,
        email: email,
        password: password,
        role: role,
      })
    );
    return { success: true, userId };
  } catch (error) {
    console.error("Error signing up:", error);
    return { success: false, error};
  }
};

// Sign in a user
export const signIn = async (email: string) => {
  try {
    await db.auth.sendMagicCode({ email });
    console.log("Magic code sent to:", email);
  } catch (error) {
    console.error("Error sending magic code:", error);
    alert("Uh oh: " + error);
  }
};


export { db };
