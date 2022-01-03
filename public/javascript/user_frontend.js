const ListAllCourseTemplate = ` 
{{#each course}}
  <div class='card-container col-lg-4' data-id="{{id}}">
  <a href="/index/course" class="course-title"> 
      <div class="card" >
          <img class="card-img-top" src="./lego.jpeg" alt="card-img-cap">
          <div class="card-body" >
          <div class='d-flex justify-content-between'>
                    <span class="card-text"><h5 class="card-title">{{title}}</h5></span>
                 
                </div>
              <h6 class="card-subtitle mb-2 text-muted">{{category}}</h6>
              <h6><i class="far fa-calendar-alt"></i>&nbsp;&nbsp;&nbsp;{{date}}</h6>
              <div>
                  <span class="card-text float-left"><i class="far fa-clock"></i>&nbsp;&nbsp;{{duration}} Hours</span>
                  <span class="card-text float-right"> HKD{{price}}</span>
              </div>
          </div>
      </div>
      </a>  
  </div>
  {{/each}}`;
const ListAllCourseFunction = Handlebars.compile(ListAllCourseTemplate);

const ListOneCourseTemplate = `  
<div class="container">
    <div class="row course">
        <div class="col-lg-8 col-sm-12 ">
            <!-- Title + Fav Row -->
            <div class="row course_head">
                <div class="title col-lg-11"><h4 class="courseinfo_h4">{{title}}</h4></div>
                <div class="col-lg-1">
                    <div class="fav_icon "><i class="far fa-heart notfavCourse"></i></div>
                    <div class="fav_icon "><i class="fas fa-heart favCourse"></i></div>
                </div>
            </div>
            <div class="course_feature">
                <div class="row">
                    <div class="col-lg-6 ">
                        <i class="fas fa-users courseinfo_i"></i>
                        <span>Age Range: {{ageRange}}</span>
                    </div>
                    <div class="col-lg-6 ">
                        <i class="fas fa-chart-pie courseinfo_i"></i>
                        <span>Quota: {{quota}}</span>
                    </div>
                </div>
            </div>
            <div class="course_para">
                
            </div>

            <div>
                <div class="row">
                    <div class="col-lg-12">
                        <p class="course_specialnote_text">{{specialNote}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-sm-12 courseInfo">
            <div class="courseInfo_container">
                <div class="courseInfo_title">Course Details</div>
                    <table class="courseInfo_content">
                        <tbody>
                        <tr>
                            <td class="icon_col"><i class="fas fa-calendar courseinfo_i"></i></td>
                            <td class="info_col">{{date}}</td>
                        </tr>
                        <tr>
                            <td class="icon_col"><i class="fas fa-clock courseinfo_i"></i></td>
                            <td class="info_col">{{timeStart}} - {{timeEnd}}</td>
                        </tr>
                        <tr>
                            <td class="icon_col"><i class="fas fa-tag courseinfo_i"></i></td>
                            <td class="info_col">HKD$ {{price}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <button type="button" class="booknow btn">BOOK NOW</button>
                    <button type="button" class="unbook btn">BOOKED</button>
                </div>
            </div>
        </div>
    </div>
</div>`;

const ListOneCourseFunction = Handlebars.compile(ListOneCourseTemplate);

const displayIndexCourses = (data) => {
  $("#All_course_card").html(ListAllCourseFunction({ course: data }));
};

const displayOneCourses = (data) => {
  $("#Section2").html(ListOneCourseFunction(data));
};

const coursePara2Template = `
<div class="course_about">
  <div class="row">
    <div class="col-lg-12">
        <p class="course_about_text">{{about}}</p>
    </div>
  </div>
</div>
                    
<div class="course_specialnote">
  <div class="row">
    <div class="col-lg-6 course_specialnote_title">
      <i class="fas fa-comment courseinfo_i"></i>
        <span>Special Notes</span>
        </div>
        <p>{{specialNote}}</p>
    </div>
</div>`;

const coursePara2Function = Handlebars.compile(coursePara2Template);

const edittedTime = (res_data) => {
  return res_data.map((x) => {
    x.date = x.date.split("T")[0];
    x.timeStart = x.timeStart.split(":").map((x) => parseInt(x));
    x.timeEnd = x.timeEnd.split(":").map((x) => parseInt(x));
    let min =
      (x.timeEnd[0] - x.timeStart[0]) * 60 + (x.timeEnd[1] - x.timeStart[1]);
    let hour = min / 60;
    x.duration = hour;
    return x;
  });
};

function edittedTime2(data) {
  data.price = data.price.split(".")[0];
  data.date = data.date.split("T")[0];
  data.timeStart = data.timeStart.slice(-8, -3);
  data.timeEnd = data.timeEnd.slice(-8, -3);
  console.log("In edittedTime2 function", data);
  return data;
}

$(() => {
  axios
    .get("/display")
    .then((res) => {
      // overall info at the top
      //insert data into handlebars
      displayIndexCourses(edittedTime(res.data));
      // console.log(res.data);
    })
    .catch((err) => console.log(err));

  $("#All_course_card").on("click", ".course-title", (event) => {
    let course_id = $(event.currentTarget)
      .closest(".card-container")
      .data("id");
    console.log("courseid", course_id);
    sessionStorage.setItem("course_id", course_id);

    // window.location.href = '/index/course';
  });

  // get course id on my Course
  $("#section1").on("click", ".card-container .nostyle", (event) => {
    let course_id = $(event.currentTarget)
      .closest(".card-container")
      .data("id");
    console.log("courseid", course_id);
    sessionStorage.setItem("course_id", course_id);

    // window.location.href = '/index/course';
  });

  axios
    .get(`/display/${sessionStorage.getItem("course_id")}`)
    .then((res) => {
      displayOneCourses(edittedTime2(res.data[0]));

      console.log(res.data[0]);
    })
    .catch((err) => console.log(err));

  // =================================================================
  // Check Booked or not - change button depends on paid status
  // =================================================================
  axios
    .get(`/book/users/${sessionStorage.getItem("course_id")}`)
    .then((res) => {
      console.log(`Check Booked or not`, res.data);
      if (res.data != false) {
        $(".booknow").hide();
        $(".unbook").show();
      } else if (res.data == false) {
        console.log("gohome");
        $(".booknow").show();
        $(".unbook").hide();
      }
    })
    .catch((err) => console.log(err));

  //   Book button -> post request
  $("#Section2").on("click", ".booknow", (event) => {
    axios
      .post(`/book/users/${sessionStorage.getItem("course_id")}`)
      .then(() => {
        axios
          .get(`/book/users/${sessionStorage.getItem("course_id")}`)
          .then((res) => {
            console.log(`Check Booked or not`, res.data);
            if (res.data != false) {
              $(".booknow").hide();
              $(".unbook").show();
            } else if (res.data == false) {
              $(".booknow").show();
              $(".unbook").hide();
            }
          });
      })
      .catch((err) => console.log(err));
  });

  // Unbook button -> detele request
  $("#Section2").on("click", ".unbook", (event) => {
    axios
      .delete(`/book/users/${sessionStorage.getItem("course_id")}`)
      .then(() => {
        axios
          .get(`/book/users/${sessionStorage.getItem("course_id")}`)
          .then((res) => {
            console.log(`Check Booked or not`, res.data);
            if (res.data === undefined) {
              $(".booknow").hide();
              $(".unbook").show();
            } else {
              $(".booknow").show();
              $(".unbook").hide();
            }
          });
      })
      .catch((err) => console.log(err));
  });

  // =================================================================
  // Check Fav-ed or not - change button depends on paid status
  // =================================================================
  axios
    .get(`/fav/users/${sessionStorage.getItem("course_id")}`)
    .then((res) => {
      console.log(`Check fav-ed or not`, res.data);
      //   fav-ed
      if (res.data.length > 0) {
        $(".favCourse").show();
        $(".notfavCourse").hide();
      } else if (res.data == false) {
        $(".favCourse").hide();
        $(".notfavCourse").show();
      }
    })
    .catch((err) => console.log(err));

  //   Fav button -> post request
  $("#Section2").on("click", ".notfavCourse", (event) => {
    axios
      .post(`/fav/users/${sessionStorage.getItem("course_id")}`)
      .then(() => {
        axios
          .get(`/fav/users/${sessionStorage.getItem("course_id")}`)
          .then((res) => {
            console.log(`Check Fav-ed or not`, res.data);
            if (res.data.length > 0) {
              $(".favCourse").show();
              $(".notfavCourse").hide();
            } else if (res.data == false) {
              $(".favCourse").hide();
              $(".notfavCourse").show();
            }
          });
      })
      .catch((err) => console.log(err));
  });

  //   Fav button -> delete request
  $("#Section2").on("click", ".favCourse", (event) => {
    axios
      .delete(`/fav/users/${sessionStorage.getItem("course_id")}`)
      .then(() => {
        axios
          .get(`/fav/users/${sessionStorage.getItem("course_id")}`)
          .then((res) => {
            console.log(`Check Fav-ed or not`, res.data);
            if (res.data.length === undefined) {
              $(".favCourse").hide();
              $(".notfavCourse").show();
            } else {
              $(".favCourse").show();
              $(".notfavCourse").hide();
            }
          });
      })
      .catch((err) => console.log(err));
  });

  //get one course para
  axios
    .get(`/host/course_para/${sessionStorage.getItem("course_id")}`)
    .then((res) => {
      // displayOneCourses(res.data[0]);
      $(".course_para").html(coursePara2Function(res.data[0]));
    })
    .catch((err) => console.log(err));
});
console.log("the id is", sessionStorage.getItem("course_id"));

// window.location.href = '/index/course';

// ================================================================
//  Get My Course user booked
// ================================================================

// Hanlebars compile
const myCourseInfoTemplate = `
{{#each course}}
    <div class='card-container col-lg-4' data-id="{{id}}">
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
    <div class='card-container col-lg-4' data-id="{{id}}">
    <a href='/index/course' class='nostyle'>
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
        </a>   
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
<form class="edit_member_info" id="edit_member_info">
  <div class="edit_member_title">Edit My Account</div>
  <div class="container">
      <div class="row">
          <div class="col-lg-6">
              <label for="fname">First Name</label><br>
              <input type="text" id="fname" name="firstName" value="{{firstName}}">
          </div>
          <div class="col-lg-6">
              <label for="sname">Surname</label><br>
              <input type="text" id="sname" name="surname" value="{{surname}}">
          </div>
      </div>
      <div class="row">
          <div class="col-lg-6">
              <label for="uname">Username</label><br>
              <input type="text" id="uname" name="username" value="{{username}}">
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
            <a href="/dashboard"><input type="submit" class="btn btnSubmit"></a>

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

    // member info Edit Form submit
    $("#edit_member_info").submit((e) => {
      e.preventDefault();
      console.log("enter to edit user submit");
      let serializeArray = $("#edit_member_info").serializeArray();
      // let generalInfo = serializeArray.slice(0, 8);
      // let paraInfo = serializeArray.slice(8);
      let editUser = serializeArray.reduce((obj, input) => {
        obj[input.name] = input.value;
        return obj;
      }, {});
      console.log(`edit user`, editUser);

      axios
        .put(`/info/users/`, {
          edit: editUser,
        })
        .then((res) => {
          $("#success_editUser_msg").html(
            `Your account '${editUser.username}' has been edited `
          );
        });
      window.location = "/";
    });
  });
});

// ================================================================
//  Fav/ unFav a course on courseDetail n my course
// ================================================================

// $(() => {
//   axios.post("/fav/users").then((res) => {});
// });

// ================================================================
//  book/ unbook a course on courseDetail n my course
// ================================================================
// check is the course is booked or not
