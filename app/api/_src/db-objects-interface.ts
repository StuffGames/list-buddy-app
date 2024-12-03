/**
 * Represents an Object that is transformed from data in a specific Database
 */
interface IDB_Object {
    // id: Number;

    /**
     * Returns the unique ID of this object
     */
    getId(): Number;
    
    // fromJSON(obj: Object);

    /**
     * Returns this object as a JSON object that is correct to its database representation
     */
    toJSON(): Object;
}

/**
 * Represents an Object that is transformed from data in a specific Database
 */
abstract class DB_Object {
    protected _id: number;

    /**
     * Returns the unique ID of this object
     */
    abstract get id(): number;
    
    // fromJSON(obj: Object);

    /**
     * Returns this object as a JSON object that is correct to its database representation
     */
    abstract toJSON(): Object;
}