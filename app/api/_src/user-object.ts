class User {

    private id: Number;
    private star_count: Number;
    private username: String;
    private password: String;
    private tasks: Number[];


    constructor(id: Number, star_count: Number, username: String, password: String, tasks: Number[]) {
        this.id = id;
        this.star_count = star_count;
        this.username = username;
        this.password = password;
        this.tasks = tasks;
    }
}

export { User };