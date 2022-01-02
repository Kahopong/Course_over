// ================================================================
//  Get ALL Course
// ================================================================

const ListAllshopTemplate = ` {{#each course}}
  <div class='card-container col-lg-4'>
      <div class="card">
          <img class="card-img-top" src="./lego.jpeg" alt="card-img-cap">
          <div class="card-body">
              <h5 class="card-title"><a href="/index/course">{{title}}</a></h5>
              <h6 class="card-subtitle mb-2 text-muted">{{category}}</h6>
              <div>
                  <span class="card-text float-left"><i class="far fa-clock"></i>&nbsp;&nbsp;{{duration}}</span>
                  <span class="card-text float-right"> {{price}}</span>
              </div>
          </div>
      </div>
  </div>
  {{/each}}`;
const ListAllShopFunction = Handlebars.compile(ListAllshopTemplate);

const displayIndexCourses = (data) => {
  $("#All_course_card").html(ListAllShopFunction({ course: data }));
};

$(() => {
  axios.get("/display").then((res) => {
    // overall info at the top
    res.data = res.data.map((x) => {
      x.date = x.date.split("T")[0];
      x.timeStart = x.timeStart.split(":").map((x) => parseInt(x));
      x.timeEnd = x.timeEnd.split(":").map((x) => parseInt(x));
      let min =
        (x.timeEnd[0] - x.timeStart[0]) * 60 + (x.timeEnd[1] - x.timeStart[1]);
      let hour = min / 60;
      x.duration = hour;
      // x.timeEnd = x.timeEnd.slice(0, -3);
      return x;
    });
    //insert data into handlebars
    displayIndexCourses(res.data);
    console.log(`Get all course display on index`, res.data);
  });
  $(".card-body")
    .on("click", ".card_title", (event) => {
      let course_id = $(event.currentTarget).closest(".table_row").data("id");
      sessionStorage.setItem("course_id", course_id);
    })
    .catch((err) => console.log(err));
});

// ================================================================
//  Get course booked in My Course
// ================================================================

// Hanlebars compile
const myCourseInfoTemplate = `
{{#each course}}
    <div class='card-container col-lg-4 data-id="{{id}}"'>
        <a href='/index/course' class='nostyle'>
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

$(() => {
  axios
    .get("/mycourse/users/book")
    .then((res) => {
      // overall info at the top
      res.data = res.data.map((x) => {
        x.date = x.date.split("T")[0];
        x.timeStart = x.timeStart.slice(0, -3);
        x.timeEnd = x.timeEnd.slice(0, -3);
        return x;
      });
      //insert data into handlebars
      displayBookedCourses(res.data);
      console.log("Get course booked in My Course", res.data);
    })
    .catch((err) => console.log(err));

  $("#mycourse_info_card").on("click", ".card-title", (event) => {
    let course_id = $(event.currentTarget)
      .closest(".card-container ")
      .data("id");
    sessionStorage.setItem("course_id", course_id);
  });
});

// ================================================================
//  Get course fav in My Course
// ================================================================
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
    .get("/mycourse/users/fav")
    .then((res) => {
      // overall info at the top
      res.data = res.data.map((x) => {
        // date format "yyyyy-mm-dd"
        x.date = x.date.split("T")[0];
        // duration
        x.timeStart = x.timeStart.split(":").map((x) => parseInt(x));
        x.timeEnd = x.timeEnd.split(":").map((x) => parseInt(x));
        let min =
          (x.timeEnd[0] - x.timeStart[0]) * 60 +
          (x.timeEnd[1] - x.timeStart[1]);
        let hour = min / 60;
        x.duration = hour;
        return x;
      });
      displayFavCourses(res.data);
      console.log("Get course fav in My Course", res.data);
    })
    .catch((err) => console.log(err));

  $("#myfav_course_card").on("click", ".card-title", (event) => {
    let course_id = $(event.currentTarget)
      .closest(".card-container ")
      .data("id");
    sessionStorage.setItem("course_id", course_id);
  });
});

// ================================================================
//  Edit member info in my account
// ================================================================
// Hanlebars compile
const editMemberInfoTemplate = `
<form action="/info/users" method="put" class="edit_member_info">
  <div class="edit_member_title">Edit My Account</div>
  <div class="container">
      <div class="row">
          <div class="col-lg-6">
              <label for="fname">First Name</label><br>
              <input type="text" id="fname" name="fname" value="{{firstName}}">
          </div>
          <div class="col-lg-6">
              <label for="sname">Surname</label><br>
              <input type="text" id="sname" name="sname" value="{{surname}}">
          </div>
      </div>
      <div class="row">
          <div class="col-lg-6">
              <label for="uname">Username</label><br>
              <input type="text" id="uname" name="uname" value="{{username}}">
          </div>
          <div class="col-lg-6">
              <label for="tel">Tel</label><br>
              <input type="tel" id="tel" name="tel" value="{{tel}}">
          </div>
      </div>
      <div class="row">
          <div class="col-lg-6">
              <label for="dob">Date of Birth</label><br>
              <input type="date" id="dob" name="dob" value="{{dob}}">
          </div>
          <div class="col-lg-6">
              <label for="sex">Sex</label><br>
              <input type="radio" value="male" id="sexb" class="sex" name="sex" checked>Male
              <input type="radio" value="female" id="sexg" class="sex" name="sex">Female
          </div>
      </div>
      <div class="row">
            <input type="submit" class="btn btnSubmit" value="Trial Submit button, still cannot submit">
      </div>
  </div>
</form>


`;

const editMemberInfoFunction = Handlebars.compile(editMemberInfoTemplate);

// Document on ready function
$(() => {
  axios.get("/info/users").then((res) => {
    res.data = res.data.map((x) => {
      // date format "yyyyy-mm-dd"
      x.dob = x.dob.split("T")[0];
      return x;
    });

    $("#edit_member_form").html(editMemberInfoFunction(res.data[0]));
  });
});

// ================================================================
//  Fav/ unFav a course on courseDetail n my course
// ================================================================

// $(() => {
//   axios.post("/fav/users").then((res) => {});
// });
