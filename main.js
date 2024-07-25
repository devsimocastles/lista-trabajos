const jobsContainer = document.getElementById("jobs-container");
let clearBtn 

let jobs
let promiseSuccess = false



let filters = []
let filtersWrapper
let filtersContainer 
let filterName

let displayFilterWrapper = false

if (displayFilterWrapper == false) {
    document.querySelector(".filters-wrapper").classList.add("active")
}





function createJob(j){
    const createTag = c => `<span class="filter-tag">${c}</span>` 
    // Creating tags 
    let tags = "";
    tags += createTag(j.role)
    tags += createTag(j.level)
    
    for(let l in j.languages) tags+= createTag(j.languages[l])
    for(let t in j.tools) tags += createTag(j.tools[t])

    const jobCardHTML = 
    `<article class="job-card ${j.new && j.featured ? "new" : ""}">
        <div class="slicer">
            <div class="job-pic">
            <img src="${j.logo}" alt="${j.company}">
        </div>
        <div class="job-features-wrapper">
                        <div class="job-name">
            <h3>${j.company}</h3>
            ${j.new ? "<span class='new'>NEW!</span>":""}
            ${j.featured ? "<span class='featured'>FEATURED!</span>":""}
        </div>
        <div class="job-position">
            <h2>${j.position}</h2>
        </div>
        <div class="job-features">
            <span class="posted-at">${j.postedAt}</span> ·
            <span class="contract">${j.contract}</span> ·
            <span class="location">${j.location}</span>
        </div>
        </div>
        </div>
        

        <div class="tags-container">
            ${tags}
        </div>
    </article>
    `

    jobsContainer.innerHTML += jobCardHTML
}

function filterJobs(){


    let filteredJobs = []
    jobs.forEach(j => {
        let objectValues = Object.values(j).flat()

        if (filters.every(f => objectValues.includes(f))) {
            filteredJobs.push(j)
        }
    })
    
    renderJobs(filteredJobs)
}


function manageClearBtn(e){
    filters = []
   filtersWrapper = document.querySelector(".filters-wrapper")
   filtersTabs = document.querySelectorAll(".filter_span")
   filtersTabs.forEach(f => filtersContainer.removeChild(f))
   filtersWrapper.classList.add("active")
   jobsContainer.innerHTML = ""
   renderJobs(jobs)
}

function handleRemove(e){
    filtersWrapper = document.querySelector(".filters-wrapper")
    let filtersTabs = document.querySelectorAll(".filter_span")
    const currentClickedFilter = e.target.parentNode.parentNode.innerText

     filtersTabs.forEach(tab => {
            if (tab.textContent == currentClickedFilter) {
                filtersContainer.removeChild(tab)
                filters = filters.filter(f => f != currentClickedFilter)
                filterJobs()
            }
        })
    
    if (filters.length == 0) {
        filtersWrapper.classList.add("active")
        renderJobs(jobs)
    }
}

function manageTag(e){

    filtersContainer = document.querySelector(".filters-container")
    filtersWrapper = document.querySelector(".filters-wrapper")
    clearBtn = document.getElementById("clear-btn")
    displayFilterWrapper = true;
    filtersWrapper.classList.remove("active");
    filterName = e.target.innerText

    if (filters.includes(filterName)) {
      return
    }

    filters.push(filterName)

   
    let filterDiv = document.createElement("div")  // creating filter
 
    filterDiv.classList.add("filter_span") // Adding class to filter div
    
    let deleteFilterSpanButton = document.createElement("span") // creating remove button for filter tab
    
    deleteFilterSpanButton.classList.add("remove_icon_container","remove_icon") // adding a class to remove button
    deleteFilterSpanButton.innerHTML = `<img src="./images/icon-remove.svg" alt="icon-remove">`

    console.log(filters);


    filterDiv.textContent = filterName
    filterDiv.append(deleteFilterSpanButton)
    filtersContainer.append(filterDiv)

    filterJobs()

    document.querySelectorAll(".remove_icon")
        .forEach(icon => icon.addEventListener("click",handleRemove))
    clearBtn.addEventListener("click", manageClearBtn)
}

function renderJobs(jobs){
       jobsContainer.innerHTML=""
    jobs.forEach(j => createJob(j))

    // adding eventlistener to filter tags 
    const filterTags = document.querySelectorAll(".filter-tag")

    filterTags.forEach(t => {
        t.addEventListener("click",manageTag)
    })
}


fetch("./data.json")
.then(response => response.json())
.then(data => {
    jobs = data
    renderJobs(jobs)
}).catch(err => alert(err))





