/* <a href="/index/course"></a> */

const ListAllCourseTemplate =
  ` {{#each course}}
  <div class='card-container col-lg-4' data-id="{{id}}">
      <div class="card" >
          <img class="card-img-top" src="./lego.jpeg" alt="card-img-cap">
          <div class="card-body" >
          <a href="/index/course" class="course-title"> <h5 class="card-title">{{title}}</h5></a>
              <h6 class="card-subtitle mb-2 text-muted">{{category}}</h6>
              <div>
                  <span class="card-text float-left"><i class="far fa-clock"></i>&nbsp;&nbsp;{{duration}} Hours</span>
                  <span class="card-text float-right"> HKD{{price}}</span>
              </div>
          </div>
      </div>
  </div>
  {{/each}}`;
  const ListAllCourseFunction = Handlebars.compile(ListAllCourseTemplate);

  const ListOneCourseTemplate=
  `
  


  <div class="container">
      <div class="row course">
          <div class="col-lg-8 col-sm-12 ">
              <!-- Title + Fav Row -->
              <div class="row course_head">
                  <div class="title col-lg-11"><h4 class="courseinfo_h4">{{title}}</h4></div>
                  <div class="fav_icon col-lg-1"><i class="far fa-heart"></i></div>
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
                  </div>
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
                              <td class="info_col">{{timeEnd}} - {{timeStart}}</td>
                          </tr>
                          <tr>
                              <td class="icon_col"><i class="fas fa-tag courseinfo_i"></i></td>
                              <td class="info_col">HKD{{price}}</td>
                          </tr>
                          </tbody>
                      </table>
                      <button type="button" class="booknow btn">BOOK NOW</button>
                  </div>
              </div>
          </div>

      </div>

`

const ListOneCourseFunction = Handlebars.compile(ListOneCourseTemplate)


  const displayIndexCourses = (data) => {
    $('#All_course_card').html(ListAllCourseFunction({ course: data }))
}

const displayOneCourses = (data) => {
  $('#Section2').html(ListOneCourseFunction(data))
}

const edittedTime = (res_data) => {
    return res_data.map((x) => {
        x.date = x.date.split("T")[0];
        x.timeStart = x.timeStart.split(':').map((x) => parseInt(x));
        x.timeEnd = x.timeEnd.split(":").map((x) => parseInt(x));
        let min =
            (x.timeEnd[0] - x.timeStart[0]) * 60 +
            (x.timeEnd[1] - x.timeStart[1]);
        let hour = min / 60;
        x.duration = hour;
        return x;
    });
}


$(() => {
    axios
        .get("/display")
        .then((res) => {
            // overall info at the top

            //insert data into handlebars
            displayIndexCourses(edittedTime(res.data))
                // console.log(res.data);
        })

        // .catch((err) => console.log(err));





    
    
 
      .catch((err) => console.log(err));
    
      $("#All_course_card").on("click",'.card .course-title', (event) => {
          let course_id = $(event.currentTarget).closest(".card-container").data("id");
          console.log('courseid', course_id)
        sessionStorage.setItem("course_id", course_id);
        
          // window.location.href = '/index/course';
      }); 
      axios.
        get(`/display/${sessionStorage.getItem("course_id")}`)
        .then((res) => {
          // $('#Section2').html('hello')
            displayOneCourses(res.data[0]);
            console.log("i am here")
            console.log(res.data);
        })
          .catch((err) => console.log(err));
        });
 
   
    //   $('#All_course_card').on('click', '.card-title', (event) => {
    //       console.log('hi')
    //     let course_id = $(event.currentTarget).closest('.card-body').data('id')
    //     console.log(course_id)
    //     sessionStorage.setItem('course_id', course_id)
    // })
    // console.log(sessionStorage.getItem("course_id"))
    // window.location.href = '/signup';
    console.log('the id is',sessionStorage.getItem("course_id"))
  //   axios.
  //   get(`/display/${sessionStorage.getItem("course_id")}`)
  //   .then((res) => {
  //       displayOneCourses(res.data);
  //       console.log("i am here")
  //       console.log(res.data);
  //   })
  //     .catch((err) => console.log(err));
  // });
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
            // console.log(`in axios books`);
            res.data = res.data.map((x) => {
                x.date = x.date.split("T")[0];
                x.timeStart = x.timeStart.slice(0, -3);
                x.timeEnd = x.timeEnd.slice(0, -3);
                return x;
            });
            //insert data into handlebars
            displayBookedCourses(res.data);
            // console.log("res data", res.data);
        })
        .catch((err) => console.log(err));

    axios.get("/mycourse/users/fav").then((res) => {
        // overall info at the top
        // console.log(`in axios`);
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
            // .catch((err) => console.log(err));
    });
});