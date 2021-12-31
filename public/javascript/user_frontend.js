// ================================
//  Get My Course user booked
// ================================

// Hanlebars compile
const myCourseInfoTemplate = `
{{#each course}}
    <div class='card-container col-lg-4 data-id="{{id}}"'>
        <a href='/display' class='nostyle'>
            <div class="card">
                <img class="card-img-top" src="./lego.jpeg" alt="card-img-cap">
                <div class="card-body">
                    <h5 class="card-title">{{title}}</h5>
                    <h6><i class="far fa-calendar-alt"></i>&nbsp;&nbsp;&nbsp;{{date}}</h6>
                    <h6><i class="far fa-clock"></i>&nbsp;&nbsp;{{timeStart}} - {{timeEnd}}</h6>
                </div>
            </div>
        </a>    
    </div>
{{/each}}`;
const myCourseInfoFunction = Handlebars.compile(myCourseInfoTemplate);

//Define display courses info in myCourse at the table
const displayBookedCourses = (data) => {
  $("#mycourse_info_card").html(myCourseInfoFunction({ course: data }));
};

// ================================
//  Get My Fav
// ================================
// Hanlebars compile
const myFavInfoTemplate = `
{{#each course}}
    <div class='card-container col-lg-4 data-id="{{id}}"'>
        <div class="card">
            <img class="card-img-top" src="./lego.jpeg" alt="card-img-cap">
            <div class="card-body">
                <div class='d-flex justify-content-between'>
                    <span class="card-text"><h5 class="card-title">{{title}}</h5></span>
                    <span class="card-text"><i class="heart_icon fas fa-heart"></i></span>
                </div>
                <h6 class="card-subtitle mb-2 text-muted clearfix">{{category}}</h6>
                <h6><i class="far fa-calendar-alt"></i>&nbsp;&nbsp;&nbsp;{{date}}</h6>
                <div>
                    <span class="card-text float-left"><i class="far fa-clock"></i>&nbsp;&nbsp;{{duration}} hours</span>
                    <span class="card-text float-right"> $ {{price}}</span>
                </div>
            </div>
        </div>
    </div>
{{/each}}`;
const myFavInfoFunction = Handlebars.compile(myFavInfoTemplate);

//Define display courses info in myCourse at the table
const displayFavCourses = (data) => {
  $("#myfav_course_card").html(myFavInfoFunction({ course: data }));
};

// Document on ready function
$(() => {
  axios
    .get("/mycourse/users/book")
    .then((res) => {
      // overall info at the top
      console.log(`in axios books`);
      res.data = res.data.map((x) => {
        x.date = x.date.split("T")[0];
        x.timeStart = x.timeStart.slice(0, -3);
        x.timeEnd = x.timeEnd.slice(0, -3);
        return x;
      });
      //insert data into handlebars
      displayBookedCourses(res.data);
      console.log("res data", res.data);
    })
    .catch((err) => console.log(err));

  axios.get("/mycourse/users/fav").then((res) => {
    // overall info at the top
    console.log(`in axios`);
    res.data = res.data.map((x) => {
      // date format "yyyyy-mm-dd"
      x.date = x.date.split("T")[0];
      // duration
      x.timeStart = x.timeStart.split(":").map((x) => parseInt(x));
      x.timeEnd = x.timeEnd.split(":").map((x) => parseInt(x));
      let min =
        (x.timeEnd[0] - x.timeStart[0]) * 60 + (x.timeEnd[1] - x.timeStart[1]);
      let hour = min / 60;
      x.duration = hour;
      return x;
    });
    displayFavCourses(res.data);

    $("#mycourse_info_card").on("click", ".card-title", (event) => {
      let course_id = $(event.currentTarget)
        .closest(".card-container ")
        .data("id");
      sessionStorage.setItem("course_id", course_id);
    });

    $("#myfav_course_card")
      .on("click", ".card-title", (event) => {
        let course_id = $(event.currentTarget)
          .closest(".card-container ")
          .data("id");
        sessionStorage.setItem("course_id", course_id);
      })
      .catch((err) => console.log(err));
  });
});
