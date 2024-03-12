export default function Meal( { params } ) {

    return (
        <h1>{ `Meal ${ params?.mealSlug }` }</h1>
    )
}