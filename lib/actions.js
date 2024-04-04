'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

export async function shareMeal( prevState, formData ) {
    const meal = {
        title: formData.get( 'title' ), //based on the name given to the input
        summary: formData.get( 'summary' ),
        instructions: formData.get( 'instructions' ),
        image: formData.get( 'image' ),
        creator: formData.get( 'name' ),
        creator_email: formData.get( 'email' ),
    };
    if ( meal?.creator_email !== "" ) {
        await saveMeal( meal )
        revalidatePath( '/meals', "page" )//default value (only this page)
        revalidatePath( '/meals', 'layout' ) //this page and its nested paths
        revalidatePath( '/', 'layout' ) //all website pages
        redirect( '/meals' )
    }
    else {
        return { message: 'Invalid Input' }
    }


}