import { NextResponse, userAgent } from "next/server";
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers'
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017/');
let sessionID = 0;

async function authenticate(rusername, rpassword) {
    let ret;
    try {
        // Connect the client
        await client.connect();
        
        const coll = client.db('workoutAppBackend').collection('users');
        const userRecord = await coll.findOne({username: rusername})
        ret = userRecord !== null && (await bcrypt.compare(rpassword, userRecord.password));
        // console.log(userRecord)
        // ret = await coll.countDocuments({username: rusername, password: bcrypt.hash(rpassword)}, {limit: 1}) > 0;
    } catch (error) {
        console.error(error);
    } finally {
      await client.close();
    }
    return ret;
}

async function storeSession(username, expirery) {
    const session = await bcrypt.hash(`${sessionID++}`, 0);
    try {
        // Connect the client
        await client.connect();
        
        const coll = client.db('workoutAppBackend').collection('sessions');
        await coll.insertOne(
            { session: session, username: username, expirery: expirery },
        );
    } catch (error) {
        console.error(error);
    } finally {
      await client.close();
    }
    return session;
}

async function validateSession(session) {
    console.log('adfa');
    if (session === undefined) return false;
    console.log('fa');
    let ret = false;
    try {
        // Connect the client
        await client.connect();
        
        const coll = client.db('workoutAppBackend').collection('sessions');
        
        ret = await coll.findOne(
            { session: session }
        ) !== null;
    } catch (error) {
        console.error(error);
    } finally {
      await client.close();
    }
    return ret;
}

export async function POST(request) {
    const cookieStore = await cookies();
    if (await validateSession(cookieStore.get('session')?.value)) {
        return new Response("", {status: 303, headers: {Location: "/"}});
    }
    console.log('dafa')
    let data = Object.fromEntries(await request.formData());
    console.log("User login by " + data.username);
    if (await authenticate(data.username, data.password)) {
        console.log('authed');
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
         const session = await storeSession(data.username, expiresAt);
        cookieStore.set('session', session, {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: 'lax',
            path: '/',
        });
        return new Response("", {status: 303, headers: {Location: "/"}});
    } else {
        console.log("failed auth");
        return new Response("", {status: 303, headers: {Location: "/login"}});
    }
}