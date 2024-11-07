import Form from "../components/exerciseList";
const { MongoClient } = require('mongodb');
import styles from "./page.module.css";

export default async function Home() {

    async function exerciseFromDB() {
        const client = new MongoClient('mongodb://localhost:27017');
        await client.connect();

        const coll = client.db('workoutAppBackend').collection('workouts');
        const ret = await coll.findOne({date: 0});
        await client.close();
        return ret.exercises;
    }

    return (
        <>
            <main className={styles.main}><Form exercises={await exerciseFromDB()} /></main>   
        </>
    );
}