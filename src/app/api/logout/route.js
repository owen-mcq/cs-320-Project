import { cookies } from 'next/headers';
const { MongoClient } = require('mongodb');

export async function GET(request) {
    const client = new MongoClient('mongodb://localhost:27017');
    const cookieStore = await cookies();
    let ret;
    try {
        // Connect the client
        await client.connect();
        console.log(cookieStore.get('session'))
        const coll = client.db('workoutAppBackend').collection('sessions');
        ret = await coll.findOneAndDelete(
            { session: cookieStore.get('session').value }
        );
        cookieStore.set('session', '', {
            httpOnly: true,
            secure: true,
            expires: new Date(0),
            sameSite: 'lax',
            path: '/',
        });
    } catch (error) {
        console.error(error);
    } finally {
      await client.close();
    }
    return new Response("", {status: 303, headers: {Location: "/login"}});
}
