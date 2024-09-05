import { init, tx, id } from '@instantdb/react';

// ID for app: marketing-lab
const APP_ID = '3db1f0f5-d368-4a2b-9656-c72c6fdc64d4';

const db = init({ appId: APP_ID });

// Sign up a new user
export const signUp = async (email: string, password: string, role: string) => {
    const userId = id(); // Generate a unique user ID

    try {
        await db.transact(
            tx.users.update({
                id: userId,
                email: email,
                password: password,
                role: role
            })
        );
        return { success: true, userId };
    } catch (error) {
        console.error('Error signing up:', error);
        return { success: false, error: error.message };
    }
};

// Retrieve all users
export const allUsers = async () => {
    try {
        const query = {
            users: {
                roles: {}
            }
        };

        const { data } = await db.useQuery(query);
        console.log('All Users Data:', data);
        return { data };
    } catch (error) {
        console.error('Error fetching users:', error);
        return { data: [], error: error.message };
    }
};

// Sign in a user
export const signIn = async (email: string) => {
    try {
        await db.auth.sendMagicCode({ email });
        console.log('Magic code sent to:', email);
    } catch (error) {
        console.error('Error sending magic code:', error);
        alert('Uh oh: ' + error.message);
    }
};

// Verify magic code and sign in
export const verifyCode = async (email: string, code: string) => {
    try {
        await db.auth.signInWithMagicCode({ email, code });
        console.log('User signed in with email:', email);
    } catch (error) {
        console.error('Error verifying code:', error);
        alert('Uh oh: ' + error.message);
    }
};


export { db };
