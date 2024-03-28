
import MealsGrid from "@/components/meals/meals-grid"
import classes from "./page.module.css"
import Link from "next/link"
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

async function Meals() {
    const meals = await getMeals();

    return (
        <MealsGrid meals={ meals } />

    )
}
export default function MealsPage() {


    return (
        <>
            <header className={ classes.header }>
                <h1>Delicious Meal Created By <span className={ classes.highlight }>You</span></h1>
                <p>Choose your favorite recipe and cook it yourself</p>
                <p className={ classes.cta }>
                    <Link href={ `/meals/share` }>Share your favorite recipe</Link>

                </p>
            </header>
            <main className={ classes.main }>
                <Suspense fallback={ <p className={ classes.loading }>Fetching Meals...</p> }>
                    <Meals />
                </Suspense>

            </main>
        </>
    )
}