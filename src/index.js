document.addEventListener('DOMContentLoaded', function() {
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(function(data) {
    //advanced method using a function to create arrays of the key names
    function findProp(obj, prop) {
        let result = [];
        function recursivelyFindProp(o, keyName) {
          Object.keys(o).forEach(function(key) {
            if(typeof o[key] === 'object') {
              recursivelyFindProp(o[key], keyName);
            } else {
              if (key === keyName) result.push(o[key]);
            }
          });
        }
        recursivelyFindProp(obj, prop);
        return result;
      }
      let dogNames = findProp(data, "name")
      let isGoodBad = findProp(data, "isGoodDog")
      let dogImg = findProp(data, "image")

      //console.log(dogNames, isGoodBad, dogImg) //c log to see if data is pulling correctly

      let dogBar = document.querySelector("#dog-bar")
      
      //renders the animals and good/bad button
      for (i = 0; i< data.length; i++) {
          let span = document.createElement('span')
          span.innerText = dogNames[i]
          document.querySelector('#dog-bar').append(span)
          span.addEventListener('click', (e) => {
            let span = e.target
            let index = dogNames.findIndex(x => x === `${span.innerText}`)
            //console.log(index) //test to see if findIndex works
            let currentBtn = document.createElement('button')
            if(isGoodBad[index] == true) {
                currentBtn.innerText = "Good Dog"
            } else {
                currentBtn.innerText = "Bad Dog"
            }
            document.querySelector('#dog-info').innerHTML = `
            <img src=${dogImg[index]} />
            <h2>${dogNames[index]}</h2>
            `
            document.querySelector('#dog-info').append(currentBtn) //grabs Good or bad dog

            currentBtn.addEventListener('click', (e) =>{
                let currentBtn = e.target
                if (currentBtn.innerText = "Good Dog") {
                    let status = true
                }   else {
                    let status = false
                }

                fetch('http://localhost:3000/pups', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        isGoodDog: `${status}`
                    })
                })
                .then(resp => resp.json())
                .then(data => console.log(data))
            })

        }) //end of display dogs event listener
      } //end of for loop



    }) //end of .then




}) //end of DOMContent