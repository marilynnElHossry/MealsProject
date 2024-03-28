import Image from "next/image"
import classes from "./page.module.css"
import { getMeal } from "@/lib/meals"
import { notFound } from "next/navigation"
export default function Meal( { params } ) {
    const meal = getMeal( params?.mealSlug )
    if ( !meal ) {
        /*NOTES:
        will stop that component from executing
        and show the closest not found or error page
        */
        notFound()
    }
    return (
        <>
            <header className={ classes.header }>
                <div className={ classes.image }>
                    <Image fill src={ meal?.image } />
                </div>
                <div className={ classes.headerText }>
                    <h1>{ `Meal ${ meal?.title }` }</h1>
                    <p className={ classes.creator }>By <a href={ `mailto:${ meal?.creator_email }` }>{ meal?.creator }</a></p>
                    <p className={ classes.summary }>
                        { meal?.summary }
                    </p>
                </div>

            </header>
            <main>
                <p className={ classes.instructions } dangerouslySetInnerHTML={ { __html: meal?.instructions } }></p>
            </main>
        </>
    )
}