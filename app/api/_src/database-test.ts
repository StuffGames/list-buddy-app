import { Database } from './database';

function main() {
    const db = Database.instance;

    const user_id = '67353156bcba5c329c823317';
    db.getUser(user_id);
}
main();