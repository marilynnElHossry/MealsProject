import sql from "better-sqlite3"

const db = sql( "meals.db" )

export async function getMeals() {
    await new Promise( ( resolve ) => setTimeout( resolve, 1000 ) )
    // throw new Error( 'Loading Meals Failed' )
    return db.prepare(
        'SELECT * FROM meals'

    ).all()
    //getting all rows
}

//To prevent injection attach
export function getMeal( slug ) {
    // throw new Error( 'Loading Meals Failed' )
    return db.prepare(
        'SELECT * FROM meals WHERE slug = ?'

    ).get( slug )
    //getting all rows
}