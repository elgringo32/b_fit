const deleteButton = document.querySelectorAll('.fa-trash')

Array.from(deleteButton).forEach((element)=>{
    element.addEventListener('click', deleteExercise)
})

const likeButton = document.querySelectorAll('.fa-thumbs-up')

Array.from(likeButton).forEach((element)=>{
    element.addEventListener('click', updateExercise)
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

async function updateExercise() {
    const exerciseId = this.parentNode.dataset.exerciseId
    const currentLikesCount = Number(this.parentNode.querySelector('.current-likes').innerText)
    console.log(currentLikesCount)
    try {
        const response = await fetch('api/updateExercise', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              '_id': exerciseId,
              'currentLikes': currentLikesCount
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
