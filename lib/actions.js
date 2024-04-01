'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

export async function shareMeal( formData ) {
    const meal = {
        title: formData.get( 'title' ), //based on the name given to the input
        summary: formData.get( 'summary' ),
        instructions: formData.get( 'instructions' ),
        image: formData.get( 'image' ),
        creator: formData.get( 'name' ),
        creator_email: formData.get( 'email' ),
    };
    await saveMeal( meal )
    redirect( '/meals' )

}