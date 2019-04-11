// Put custom repo GitHub URLs in this object, keyed by nameWithOwner repo name.
var customGithubURL = {
    "twitter/pants": "https://github.com/pantsbuild/pants",
}

var getGithubURL = function(project) {
    return customGithubURL[project.nameWithOwner] || 'https://github.com/' + project.nameWithOwner
}


// Put custom repo Website URLs in this object, keyed by nameWithOwner repo name
var customWebsiteURL = {
    "twitter/pants": "https://www.pantsbuild.org/",
}

var getHomepageURL = function(project) {
    return customWebsiteURL[project.nameWithOwner] || project.homepageURL
}

/* Create project cards */
var renderProjects = function(projectsList, searchString="") {
    // Parent div to hold all the project cards
    var mainDiv = document.getElementsByClassName("all-projects")[0]

    // Refer this for DOM manipulation with JS https://stackoverflow.com/questions/14094697/how-to-create-new-div-dynamically-change-it-move-it-modify-it-in-every-way-po
    if (projectsList.length > 0) {
        for (var project of projectsList) {
            // Div for each project
            var projectDiv = document.createElement('div')
            projectDiv.className = "Grid-cell u-size1of3 project-card"

            var projectCard = document.createElement('div');
            projectCard.className = "project-card-inner";

            // Members
            var memberDiv = document.createElement('div')
            memberDiv.className = "line-member"

            if(project.name == 'BTB'){
                var member1 = document.createElement('img')
                member1.setAttribute('src', '/assets/members/Kalyan-V-1.jpg')
                member1.setAttribute('alt', 'Kalyan Veeramachaneni')
                member1.setAttribute('title', 'Kalyan Veeramachaneni')
                memberDiv.appendChild(member1)

                var member2 = document.createElement('img')
                member2.setAttribute('src', '/assets/members/Micah-J-Smith.jpg')
                member2.setAttribute('alt', 'Micah J Smith')
                member2.setAttribute('title', 'Micah J Smith')
                memberDiv.appendChild(member2)

                var member3 = document.createElement('img')
                member3.setAttribute('src', '/assets/members/carles_sala-1.jpg')
                member3.setAttribute('alt', 'Carles Sala')
                member3.setAttribute('title', 'Carles Sala')
                memberDiv.appendChild(member3)

                var member4 = document.createElement('img')
                member4.setAttribute('src', '/assets/members/AlexGeiger.png')
                member4.setAttribute('alt', 'Alex Geiger')
                member4.setAttribute('title', 'Alex Geiger')
                memberDiv.appendChild(member4)
            }else{
                var member1 = document.createElement('img')
                member1.setAttribute('src', '/assets/members/default.png')
                memberDiv.appendChild(member1)

                var member2 = document.createElement('img')
                member2.setAttribute('src', '/assets/members/default.png')
                memberDiv.appendChild(member2)

                var member3 = document.createElement('img')
                member3.setAttribute('src', '/assets/members/default.png')
                memberDiv.appendChild(member3)

                var member4 = document.createElement('img')
                member4.setAttribute('src', '/assets/members/default.png')
                memberDiv.appendChild(member4)
            }

            projectCard.appendChild(memberDiv)

            // Project Name
            var lineName = document.createElement('div');
            lineName.className = "line-title"

            var nameDiv = document.createElement('h1')
            nameDiv.className = "project-name"
            nameDiv.innerHTML = project.name
            var iconRepo = document.createElement('img')
            iconRepo.setAttribute('src', '/assets/repositories/btb@3x.png')

            lineName.appendChild(nameDiv)
            lineName.appendChild(iconRepo)
            projectCard.appendChild(lineName)

            // Project Description (HTML version)
            var descriptionDiv = document.createElement('div')
            descriptionDiv.className = "project-description"
            descriptionDiv.innerHTML = project.description
            projectCard.appendChild(descriptionDiv)

            // Tags
            var tagsDiv = document.createElement('div')
            tagsDiv.className = "line-tags"
            
            var tags1 = document.createElement('div');
            tags1.className = "tag-first"
            tags1.innerHTML = "AutoML"
            tagsDiv.appendChild(tags1)

            var tags2 = document.createElement('div');
            tags2.className = "tag-second"
            tags2.innerHTML = "OpenSource"
            tagsDiv.appendChild(tags2)

            projectCard.appendChild(tagsDiv)

            // Primary Language
            var languageDiv = document.createElement('p')
            languageDiv.className = "project-language"
            languageDiv.innerHTML = project.primaryLanguage
            //projectCard.appendChild(languageDiv)

            // Whitespace
            var whitespaceDiv = document.createElement('div')
            whitespaceDiv.className = "whitespace"
            //projectCard.appendChild(whitespaceDiv)

            // Project Links
            var projectLinksDiv = document.createElement('div')
            projectLinksDiv.className = "project-links"

            // GitHub link
            var githubLink = document.createElement('a')
            githubLink.href = getGithubURL(project)
            githubLink.innerHTML = "GitHub"
            githubLink.target = "_blank"
            //projectLinksDiv.appendChild(githubLink)

            // Website link (with clause)
            var homepageURL = getHomepageURL(project)
            if (homepageURL != "") {
                var websiteLink = document.createElement('a')
                websiteLink.href = homepageURL
                websiteLink.innerHTML = "Website"
                websiteLink.target = "_blank"
                projectLinksDiv.appendChild(websiteLink)
            }

            //projectCard.appendChild(projectLinksDiv)

            // Metrics button
            var metricsButton = document.createElement('button')
            metricsButton.setAttribute("onclick", "window.open('/metrics/" + project.nameWithOwner + "/WEEKLY')")
            metricsButton.type = "button"
            metricsButton.className = "Button Button--tertiary"
            metricsButton.innerHTML = "Metrics"
            //projectCard.appendChild(metricsButton)

            projectDiv.appendChild(projectCard)
            /* Finally Add the project card to the page */
            mainDiv.appendChild(projectDiv)
        }
    } else {
        var noResultDiv = document.createElement('div')
        noResultDiv.className = 'no-results'

        var noResultPara = document.createElement('p')
        noResultPara.innerHTML = "No results for " + '<b>' + searchString + '</b>'
        noResultDiv.appendChild(noResultPara)

        var noResultContainer = document.getElementsByClassName("no-results-container")[0]
        noResultContainer.appendChild(noResultDiv)
    }
    // Apply functions that determine how many columns
    if (matchMedia) {
        var mq3 = window.matchMedia("(min-width: 1236px)")
        var mq2 = window.matchMedia("(max-width: 1236px) and (min-width: 850px)")
        var mq1 = window.matchMedia("(max-width: 850px)")
        threeColumn(mq3)
        twoColumn(mq2)
        oneColumn(mq1)
    }
}

// Sort the projects
var sortFunction = function(a, b) {
    // Sort by Name
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    // Sort by recently pushedAt
    var deltaA = (new Date) - Date.parse(a.pushedAt)
    var deltaB = (new Date) - Date.parse(b.pushedAt)
    return (textA < textB) ? -1 : (textA > textB) ? 1 : (deltaA>=deltaB?1:-1)
}

// Sort and Render
allProjects.sort(sortFunction)
renderProjects(allProjects)


/* Search implementation starts */
var searchResult = allProjects  // Search Result initialization

function findMatches(query, repos) {
  if (query === '') {
      return repos
  } else {
      var options = {
        findAllMatches: true,
        threshold: 0.2,
        location: 0,
        distance: 50,
        maxPatternLength: 50,
        minMatchCharLength: 1,
        keys: [
          "name",
          "languages",
          "description"
        ]
      }
      var fuse = new Fuse(repos, options)
      var result = fuse.search(query)

      // Sort
      result.sort(sortFunction)

      return result
  }
}

var searchBox = document.getElementsByClassName('search-box')[0]

document.addEventListener('keyup', function(event) {
    /* Update the list of results with the search results */
    var newProjectsList = []
    var searchString = searchBox.value.trim()
    searchResult = findMatches(searchString, allProjects)

    // Remove all the projects
    var mainDiv = document.getElementsByClassName("all-projects")[0]
    while (mainDiv.firstChild) {
        mainDiv.removeChild(mainDiv.firstChild)
    }

    var noResultContainer = document.getElementsByClassName("no-results-container")[0]
    while (noResultContainer.firstChild) {
        noResultContainer.removeChild(noResultContainer.firstChild)
    }

    for (var item of searchResult) {
        newProjectsList.push(item)
    }
    renderProjects(newProjectsList, searchString=searchBox.value)
})

/* Search implementation ends */

// Media queries for projects grid
if (matchMedia) {
    var mediaQueryThreeColumn = window.matchMedia("(min-width: 1236px)")
    threeColumn(mediaQueryThreeColumn)
    mediaQueryThreeColumn.addListener(threeColumn)

    var mediaQueryTwoColumn = window.matchMedia("(max-width: 1236px) and (min-width: 850px)")
    twoColumn(mediaQueryTwoColumn)
    mediaQueryTwoColumn.addListener(twoColumn)

    var mediaQueryOneColumn = window.matchMedia("(max-width: 850px)")
    oneColumn(mediaQueryOneColumn)
    mediaQueryOneColumn.addListener(oneColumn)
}

// 3 columns
function threeColumn(mediaQuery) {
    if (mediaQuery.matches) {
        addClassByClass("project-card", "u-size1of3")
        removeClassByClass("project-card", "u-size1of2")
    } else {
        removeClassByClass("project-card", "u-size1of3")
    }
}

// 2 columns
function twoColumn(mediaQuery) {
    if (mediaQuery.matches) {
        addClassByClass("project-card", "u-size1of2")
        removeClassByClass("project-card", "u-size1of3")
    } else {
        removeClassByClass("project-card", "u-size1of2")
    }
}

// 1 column
function oneColumn(mediaQuery) {
    if (mediaQuery.matches) {
        removeClassByClass("project-card", "u-size1of3")
        removeClassByClass("project-card", "u-size1of2")
    }
}

