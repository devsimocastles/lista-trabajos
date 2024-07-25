let jobs2
const filters2 = ["CSS", "HTML"]

fetch("./data.json")
.then(response => response.json())
.then(data => {
    jobs2 = data
    a(jobs2)
})

function a (jobs){
    let filteredJobs = []
    jobs.forEach(j => {
        let objectValues = Object.values(j).flat()

        if (filters2.every(f => objectValues.includes(f))) {
            filteredJobs.push(j)
        }
    })
    console.log(filteredJobs);
}
