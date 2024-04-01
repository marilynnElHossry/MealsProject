import sql from "better-sqlite3"
import slugify from "slugify"
import xss from "xss"
const db = sql( "meals.db" )
import fs from 'node:fs'

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

export async function saveMeal( meal ) {
    meal.slug = slugify( meal?.title, { lower: true } )
    meal.instructions = xss( meal?.instructions )
    const extension = meal?.image?.name?.split( '.' ).pop()
    const fileName = `${ meal?.slug }.${ extension }`
    //A stream is a sequence of bytes
    const stream = fs.createWriteStream( `public/images/${ fileName }` )
    //we added await because arrayBuffer is returning a promise
    const bufferedImage = await meal?.image?.arrayBuffer()
    stream.write( Buffer.from( bufferedImage ), ( error ) => {
        if ( error ) {
            throw new Error( 'saving image failed' )
        }

    } )
    meal.image = `/images/${ fileName }`
    db.prepare( `
    INSERT INTO MEALS
    (title,summary,instructions,creator,creator_email , image,slug)
    VALUES(
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
    )

    `).run( meal )
}