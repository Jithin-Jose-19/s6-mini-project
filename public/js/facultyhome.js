var batchSelected = "";

$(document).ready(function () {
  //Open Drop Down
  $(".custom-select").click(function (e) {
    console.log("Drop Dwon");
    e.preventDefault();

    if ($(".custom-select-wrapper").hasClass("open-dropdown")) {
      $(".custom-select-wrapper").removeClass("open-dropdown");
      $(this).parent().parent().toggleClass("open-dropdown");
    } else {
      $(this).parent().parent().toggleClass("open-dropdown");
    }
  });

  // On click get Current Selected tag Value

  $(".batchspan").click(function (e) {
    if ($(".custom-select-wrapper").hasClass("open-dropdown")) {
      var current_value = $(this).text();
      console.log(current_value);
      $(".open-dropdown .custom-select").val(current_value);
      $(".custom-select-wrapper").removeClass("open-dropdown");
      batchSelected = current_value;
      (async () => {
        const response = await fetch("http://localhost:3000/faculty/getClass", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ batch: current_value }),
        });
        const body = await response.json();
        const classNames = new Set();
        body.forEach((element) => {
          element["classes"].forEach((ele) => {
            classNames.add(ele);
          });
        });
        console.log(classNames);
        var ul = document.getElementById("classlist");
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }
        classNames.forEach(function (val) {
          var span = document.createElement("span");
          span.textContent = val;
          span.onclick = classSelected;
          var li = document.createElement("li");
          li.appendChild(span);
          ul.appendChild(li);
        });
      })();
    }
  });

  function classSelected() {
    console.log("batch:" + batchSelected);
    $(".open-dropdown .custom-select").val(this.textContent);
    (async () => {
      const response = await fetch("http://localhost:3000/faculty/getCourses", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ batch: batchSelected, class: this.textContent }),
      });
      const body = await response.json();
      body.forEach((element) => {
        var ul = document.getElementById("courselist");
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }
        var span = document.createElement("span");
        span.textContent = element['courseCode']+"-"+element['courseName'];
        span.onclick = courseSelected;
        var li = document.createElement("li");
        li.appendChild(span);
        ul.appendChild(li);
      });
    })();
  }

  function courseSelected(){
    console.log("Selected Course  : "+this.textContent);
    $(".open-dropdown .custom-select").val(this.textContent);
    (async () => {
      const response = await fetch("http://localhost:3000/faculty/getExperiments", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({courseCode:this.textContent}),
      });
      const body = await response.json();
      console.log("Experiments : "+body);
      var ul = document.getElementById("experiment-list");
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
      body.forEach((element) => {
        element['experiments'].forEach((exp)=>{
          console.log(exp['experimentName']);
        
        let numberSpan = document.createElement("span");
        numberSpan.className="number";
        numberSpan.textContent = exp['experimentNumber'];

        let nameSpan = document.createElement("span");
        nameSpan.className="name";
        nameSpan.textContent = exp['experimentName'];

        let gearSpan = document.createElement("span");
        gearSpan.className="gearicon";
        let geara=document.createElement("a");
        geara.style="color:inherit;"
        let course={"courseCode":this.textContent,"experimentNumber":numberSpan.textContent};
        geara.href="/faculty/testcasesetup?courseCode="+this.textContent.split('-')[0]+"&experimentNumber="+numberSpan.textContent;
        let geari=document.createElement("i");
        geari.innerHTML ="&#xf013;";
        geari.style="font-size:24px";
        geari.className="fa";
       
        //span.onclick = courseSelected;
        var li = document.createElement("li");
       li.appendChild(numberSpan);
        li.appendChild(nameSpan);
        geara.appendChild(geari)
        gearSpan.appendChild(geara);
        li.appendChild(gearSpan);
        ul.appendChild(li);
        })
        
      });
    })();
  }
  // close when click on Body
  $("html").click(function (event) {
    if ($(event.target).closest(".custom-select").length === 0) {
      $(".custom-select-wrapper").removeClass("open-dropdown");
    }
  });
});

