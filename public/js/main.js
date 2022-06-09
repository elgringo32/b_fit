const deleteButton = document.querySelectorAll('.fa-trash')

Array.from(deleteButton).forEach((element)=>{
    element.addEventListener('click', deleteExercise)
})

async function deleteExercise() {
    const exerciseId = this.parentNode.dataset.exerciseId
    try {
        const response = await fetch('api/deleteExercise', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              '_id': exerciseId
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
